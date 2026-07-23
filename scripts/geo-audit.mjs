import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import {
  SITE_URL,
  excerpt,
  getAllPublishedContent,
  openDb,
  publicUrl,
  readTextFileIfExists,
  stripHtml,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];
const IDEAL_CITATION_MIN = 134;
const IDEAL_CITATION_MAX = 167;
const USABLE_CITATION_MIN = 75;
const USABLE_CITATION_MAX = 220;

const db = openDb();
const rows = getAllPublishedContent(db);
const publicRows = rows;

const robotsPath = join(process.cwd(), 'public', 'robots.txt');
const llmsPath = join(process.cwd(), 'public', 'llms.txt');
const robots = readTextFileIfExists(robotsPath);
const llms = readTextFileIfExists(llmsPath);
const failures = [];
const warnings = [];

function getRobotsGroup(userAgent) {
  const lines = robots.split(/\r?\n/);
  const groups = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*/, '').trim();
    if (!line) {
      if (current) {
        groups.push(current);
        current = null;
      }
      continue;
    }

    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();

    if (key === 'user-agent') {
      if (!current || current.directives.length) {
        if (current) groups.push(current);
        current = { agents: [], directives: [] };
      }
      current.agents.push(value.toLowerCase());
    } else if (current) {
      current.directives.push({ key, value });
    }
  }

  if (current) groups.push(current);

  const exact = groups.find((group) => group.agents.includes(userAgent.toLowerCase()));
  return exact || groups.find((group) => group.agents.includes('*')) || null;
}

function isCrawlerAllowed(userAgent) {
  const group = getRobotsGroup(userAgent);
  if (!group) return true;
  return !group.directives.some((directive) => directive.key === 'disallow' && directive.value === '/');
}

function hasDisallow(userAgent, pathPrefix) {
  const group = getRobotsGroup(userAgent);
  if (!group) return false;
  return group.directives.some((directive) => directive.key === 'disallow' && directive.value.toLowerCase().startsWith(pathPrefix));
}

function collectFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function wordCount(value) {
  const text = stripHtml(value || '');
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function scoreCitability(row) {
  const words = wordCount(row.summary);
  let score = 0;
  if (words >= IDEAL_CITATION_MIN && words <= IDEAL_CITATION_MAX) score += 45;
  else if (words >= USABLE_CITATION_MIN && words <= USABLE_CITATION_MAX) score += 30;
  else if (words >= 40) score += 15;

  const text = stripHtml(row.summary || '');
  if (/\b\d+(?:[.,]\d+)?%?\b/.test(text)) score += 15;
  if (/[.;:]/.test(text) && words >= 25) score += 15;
  if (row.title && text.toLowerCase().includes(String(row.title).split(/\s+/)[0].toLowerCase())) score += 10;
  score += 10;

  return Math.min(score, 100);
}

if (!existsSync(robotsPath)) {
  failures.push('public/robots.txt is missing.');
}

for (const crawler of AI_CRAWLERS) {
  if (!isCrawlerAllowed(crawler)) {
    failures.push(`${crawler} is blocked by robots.txt.`);
  }
  if (!hasDisallow(crawler, '/admin') || !hasDisallow(crawler, '/api')) {
    warnings.push(`${crawler} does not have explicit /admin and /api exclusions in robots.txt.`);
  }
}

if (!existsSync(llmsPath)) {
  failures.push('public/llms.txt is missing. Run `npm run generate:llms`.');
}

const llmsUrls = Array.from(llms.matchAll(/https?:\/\/[^\s)]+/g)).map((match) => match[0]);
if (!llms.includes('# N-TET')) warnings.push('llms.txt is missing the expected site heading.');
for (const section of ['## Core Pages', '## Products', '## Solutions', '## Media and Insights', '## Locales']) {
  if (!llms.includes(section)) warnings.push(`llms.txt is missing ${section}.`);
}
if (llmsUrls.some((url) => /\/admin\b|\/api\b|preview\b/i.test(url))) {
  failures.push('llms.txt contains admin, API, or preview URLs.');
}
const appFiles = collectFiles(join(process.cwd(), 'src', 'app'));
const schemaFiles = appFiles.filter((file) => {
  const content = readFileSync(file, 'utf8');
  return /application\/ld\+json|schema\.org|@context|<JsonLd\b|from ['"]@\/components\/seo\/JsonLd['"]/.test(content);
});
if (!schemaFiles.length) {
  warnings.push('No server-rendered JSON-LD was detected under src/app.');
}

const citabilityRows = publicRows
  .map((row) => ({ ...row, words: wordCount(row.summary), score: scoreCitability(row) }))
  .sort((a, b) => a.score - b.score || a.words - b.words);
const weakCitability = citabilityRows.filter((row) => row.score < 45);
const strongCitability = citabilityRows.filter((row) => row.score >= 70);

const geoScore = Math.max(
  0,
  Math.min(
    100,
    Math.round(
      25 * (1 - Math.min(failures.filter((item) => item.includes('llms')).length, 3) / 3) +
        20 * (AI_CRAWLERS.filter(isCrawlerAllowed).length / AI_CRAWLERS.length) +
        20 * (1 - Math.min(weakCitability.length / Math.max(publicRows.length, 1), 1)) +
        15 * (schemaFiles.length ? 1 : 0.35) +
        20 * (1 - Math.min(warnings.length / 12, 1))
    )
  )
);

const report = [
  '# N-TET GEO 审计',
  '',
  `生成日期：${todayStamp()}`,
  `站点：${SITE_URL}`,
  `GEO readiness 得分：${geoScore}/100`,
  '',
  '## AI Crawler 访问',
  '',
  '| Crawler | 访问状态 | 已排除 Admin/API |',
  '| --- | --- | --- |',
  ...AI_CRAWLERS.map((crawler) => {
    const excluded = hasDisallow(crawler, '/admin') && hasDisallow(crawler, '/api');
    return `| ${crawler} | ${isCrawlerAllowed(crawler) ? 'allowed' : 'blocked'} | ${excluded ? 'yes' : 'no'} |`;
  }),
  '',
  '## llms.txt',
  '',
  `- 是否存在：${existsSync(llmsPath) ? 'yes' : 'no'}`,
  `- URL 数量：${llmsUrls.length}`,
  `- admin/API/preview 泄漏：${llmsUrls.some((url) => /\/admin\b|\/api\b|preview\b/i.test(url)) ? 'found' : 'none'}`,
  '',
  '## Schema / 实体准备度',
  '',
  `- 检测到服务端 JSON-LD 文件数：${schemaFiles.length}`,
  ...(schemaFiles.length ? schemaFiles.map((file) => `- ${file.replace(process.cwd() + '\\', '')}`) : ['- 当前 `src/app` 下未检测到 JSON-LD；可使用 `npm run audit:schema` 查看候选 Schema。']),
  '',
  '## Citability',
  '',
  `- 已检查公开记录：${publicRows.length}`,
  `- 强引用候选：${strongCitability.length}`,
  `- 弱引用候选：${weakCitability.length}`,
  '',
  '| 低分公开记录 | 词数 | 得分 | URL |',
  '| --- | ---: | ---: | --- |',
  ...citabilityRows
    .slice(0, 12)
    .map((row) => `| ${row.type}/${row.handle} | ${row.words} | ${row.score} | ${publicUrl('en', row.route, row.handle)} |`),
  '',
  '## 失败项',
  '',
  ...(failures.length ? failures.map((item) => `- ${item}`) : ['- 无']),
  '',
  '## 警告项',
  '',
  ...(warnings.length ? warnings.map((item) => `- ${item}`) : ['- 无']),
  '',
  '## GEO 下一步',
  '',
  '- 为产品、方案、媒体详情页增加服务端 Organization、WebSite、BreadcrumbList、Product、Service、Article JSON-LD。',
  '- 将弱引用页面改写成 134-167 词的自包含回答段，加入具体规格、日期和证据。',
  '- `llms.txt`、公开 Schema、sitemap 和 Firecrawl 应覆盖全部已发布内容。',
  '- Firecrawl 只需排除 admin、API、preview、draft 和未发布路径。',
];

const reportPath = join(process.cwd(), 'docs', 'seo', `geo-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath}`);

if (failures.length) {
  console.error(`GEO audit failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`GEO audit passed with ${warnings.length} warning(s). Score: ${geoScore}/100`);
