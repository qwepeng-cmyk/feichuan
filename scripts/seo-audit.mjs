import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONTENT_TYPES,
  SITE_URL,
  getAllCuasIndexableContent,
  openDb,
  readTextFileIfExists,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const db = openDb();
const rows = getAllCuasIndexableContent(db);
const llmsPath = join(process.cwd(), 'public', 'llms.txt');
const robotsPath = join(process.cwd(), 'public', 'robots.txt');
const llms = readTextFileIfExists(llmsPath);
const robots = readTextFileIfExists(robotsPath);
const failures = [];
const warnings = [];
const llmsUrls = Array.from(llms.matchAll(/https?:\/\/[^\s)]+/g)).map((match) => match[0]);

if (!existsSync(llmsPath)) failures.push('public/llms.txt is missing. Run `npm run generate:llms`.');
if (!robots.includes('Sitemap:')) warnings.push('public/robots.txt does not declare a Sitemap URL.');
if (llmsUrls.some((url) => /\/admin\b|\/api\b|preview\b/i.test(url))) {
  failures.push('public/llms.txt contains admin, API, or preview paths.');
}
if (llmsUrls.some((url) => /\/accessories(?:\/|$)/i.test(url))) {
  failures.push('public/llms.txt contains non-C-UAS accessory paths.');
}

const publishedByType = Object.fromEntries(Object.keys(CONTENT_TYPES).map((type) => [type, 0]));
for (const row of rows) {
  publishedByType[row.type] += 1;
  if (!row.title) warnings.push(`${row.type}/${row.handle} is published but has no English title.`);
  if (!row.summary) warnings.push(`${row.type}/${row.handle} is published but has no summary/description.`);
}

const report = [
  '# N-TET SEO 审计',
  '',
  `生成日期：${todayStamp()}`,
  `站点：${SITE_URL}`,
  '',
  '## C-UAS 可索引内容',
  '',
  '| Type | Indexable |',
  '| --- | ---: |',
  ...Object.entries(publishedByType).map(([type, count]) => `| ${type} | ${count} |`),
  '',
  '公开可访问状态仍由 is_published 控制；SEO/GEO 发现范围使用明确的 C-UAS 分类与页面名单，不应用 A/B/C 或敏感词门禁。',
  '',
  '## 检查项',
  '',
  `- \`llms.txt\` 存在：${existsSync(llmsPath) ? 'yes' : 'no'}`,
  `- \`robots.txt\` 存在：${existsSync(robotsPath) ? 'yes' : 'no'}`,
  `- \`llms.txt\` 中 admin/API/preview URL：${llmsUrls.some((url) => /\/admin\b|\/api\b|preview\b/i.test(url)) ? 'found' : 'none'}`,
  '',
  '## 失败项',
  '',
  ...(failures.length ? failures.map((item) => `- ${item}`) : ['- 无']),
  '',
  '## 警告项',
  '',
  ...(warnings.length ? warnings.map((item) => `- ${item}`) : ['- 无']),
];

const reportPath = join(process.cwd(), 'docs', 'seo', `seo-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath}`);

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`SEO audit passed with ${warnings.length} warning(s).`);
