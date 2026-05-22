import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONTENT_TYPES,
  SITE_URL,
  getAllPublishedContent,
  openDb,
  publicUrl,
  readTextFileIfExists,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const db = openDb();
const rows = getAllPublishedContent(db);
const llmsPath = join(process.cwd(), 'public', 'llms.txt');
const robotsPath = join(process.cwd(), 'public', 'robots.txt');
const llms = readTextFileIfExists(llmsPath);
const robots = readTextFileIfExists(robotsPath);
const failures = [];
const warnings = [];
const llmsUrls = Array.from(llms.matchAll(/https?:\/\/[^\s)]+/g)).map((match) => match[0]);

if (!existsSync(llmsPath)) {
  failures.push('public/llms.txt is missing. Run `npm run generate:llms`.');
}

if (!robots.includes('Sitemap:')) {
  warnings.push('public/robots.txt does not declare a Sitemap URL.');
}

if (llmsUrls.some((url) => /\/admin\b|preview\b/i.test(url))) {
  failures.push('public/llms.txt contains admin or preview paths.');
}

for (const row of rows.filter((item) => item.tier === 'restricted')) {
  const url = publicUrl('en', row.route, row.handle);
  if (llmsUrls.includes(url)) {
    failures.push(`Restricted C-tier URL leaked into llms.txt: ${url}`);
  }
}

const byTypeAndTier = {};
for (const type of Object.keys(CONTENT_TYPES)) {
  byTypeAndTier[type] = { normal: 0, neutral_seo: 0, restricted: 0 };
}
for (const row of rows) {
  byTypeAndTier[row.type][row.tier] += 1;
  if (row.tier !== 'restricted' && !row.title) {
    warnings.push(`${row.type}/${row.handle} is public but has no English title.`);
  }
  if (row.tier !== 'restricted' && !row.summary) {
    warnings.push(`${row.type}/${row.handle} is public but has no summary/description.`);
  }
}

const report = [
  '# N-TET SEO 审计',
  '',
  `生成日期：${todayStamp()}`,
  `站点：${SITE_URL}`,
  '',
  '## 合规分布',
  '',
  '| Type | A normal | B neutral SEO | C restricted |',
  '| --- | ---: | ---: | ---: |',
  ...Object.entries(byTypeAndTier).map(
    ([type, counts]) => `| ${type} | ${counts.normal} | ${counts.neutral_seo} | ${counts.restricted} |`
  ),
  '',
  '## 检查项',
  '',
  `- \`llms.txt\` 存在：${existsSync(llmsPath) ? 'yes' : 'no'}`,
  `- \`robots.txt\` 存在：${existsSync(robotsPath) ? 'yes' : 'no'}`,
  `- \`llms.txt\` 中 restricted URL：${failures.some((item) => item.includes('Restricted C-tier')) ? 'found' : 'none'}`,
  `- \`llms.txt\` 中 admin/preview URL：${llmsUrls.some((url) => /\/admin\b|preview\b/i.test(url)) ? 'found' : 'none'}`,
  '',
  '## 失败项',
  '',
  ...(failures.length ? failures.map((item) => `- ${item}`) : ['- 无']),
  '',
  '## 警告项',
  '',
  ...(warnings.length ? warnings.map((item) => `- ${item}`) : ['- 无']),
  '',
  '## 下一步',
  '',
  '- 可继续使用已安装的 `seo` / `seo-geo` skills 做页面级分析，但必须保留本项目审计脚本作为 N-TET 合规门禁。',
  '- 不要把 C 层记录加入 sitemap、`llms.txt`、Schema 或公开广告路径。',
];

const reportPath = join(process.cwd(), 'docs', 'seo', `seo-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath}`);

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(`SEO audit passed with ${warnings.length} warning(s).`);
