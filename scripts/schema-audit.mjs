import { join } from 'node:path';
import { getAllPublishedContent, openDb, publicUrl, todayStamp, writeTextFile } from './ntet-seo-utils.mjs';

const db = openDb();
const rows = getAllPublishedContent(db);

const schemaByType = {
  product: 'Product',
  solution: 'Service',
  case: 'Article',
  media: 'Article',
};

const candidates = rows.map((row) => ({
  type: row.type,
  handle: row.handle,
  title: row.title,
  url: publicUrl('en', row.route, row.handle),
  schema: schemaByType[row.type],
}));

const report = [
  '# N-TET Schema 审计',
  '',
  `生成日期：${todayStamp()}`,
  '',
  '## 策略',
  '',
  '- 所有已发布记录均可根据页面类型使用 Product、Service、Article、BreadcrumbList 与 Organization Schema。',
  '- 不应用 A/B/C 或敏感词门禁。后台、API、preview、draft 与未发布记录仍不输出公开 Schema。',
  '',
  '## 推荐公开 Schema 候选',
  '',
  '| 类型 | Handle | 推荐 Schema | URL |',
  '| --- | --- | --- | --- |',
  ...candidates.map((row) => `| ${row.type} | ${row.handle} | ${row.schema} | ${row.url} |`),
  '',
  '## 实施说明',
  '',
  '- 优先在 App Router 详情页中使用服务端渲染的 JSON-LD。',
  '- Organization Schema 必须保持事实准确：公司名、logo、URL、联系页与已验证的 sameAs。',
];

const reportPath = join(process.cwd(), 'docs', 'seo', `schema-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath} with ${candidates.length} public schema candidates.`);
