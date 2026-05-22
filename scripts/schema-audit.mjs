import { join } from 'node:path';
import {
  getAllPublishedContent,
  openDb,
  publicUrl,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const db = openDb();
const rows = getAllPublishedContent(db);
const publicRows = rows.filter((row) => row.tier !== 'restricted');

const schemaByType = {
  product: 'Product',
  solution: 'Service',
  case: 'Article',
  media: 'Article',
};

const candidates = publicRows.map((row) => ({
  type: row.type,
  handle: row.handle,
  title: row.title,
  tier: row.tier,
  url: publicUrl('en', row.route, row.handle),
  schema: schemaByType[row.type],
}));

const restrictedCandidates = rows
  .filter((row) => row.tier === 'restricted')
  .map((row) => ({
    type: row.type,
    handle: row.handle,
    schema: schemaByType[row.type],
  }));

const report = [
  '# N-TET Schema 审计',
  '',
  `生成日期：${todayStamp()}`,
  '',
  '## 策略',
  '',
  '- A 层公开记录：在信息准确时，可以使用 Product、Service、Article、BreadcrumbList、Organization Schema。',
  '- B 层 neutral SEO 记录：只适合信息型 Schema，不要包装成广告落地页。',
  '- C 层 restricted 记录：可以生成内部候选 Schema，便于以后恢复访问；但必须排除在公开 Schema 输出之外。',
  '',
  '## 推荐公开 Schema 候选',
  '',
  '| 类型 | Handle | 层级 | 推荐 Schema | URL |',
  '| --- | --- | --- | --- | --- |',
  ...candidates.map((row) => `| ${row.type} | ${row.handle} | ${row.tier} | ${row.schema} | ${row.url} |`),
  '',
  '## C 层内部 Schema 候选',
  '',
  '以下记录只作为内部候选，不写入公开页面 HTML、`llms.txt`、sitemap，也不进入 Firecrawl 抓取范围。',
  '',
  '| 类型 | Handle | 内部候选 Schema | 默认公开输出 |',
  '| --- | --- | --- | --- |',
  ...(restrictedCandidates.length
    ? restrictedCandidates.map((row) => `| ${row.type} | ${row.handle} | ${row.schema} | no |`)
    : ['| - | - | - | - |']),
  '',
  '## 实施说明',
  '',
  '- 优先在 App Router 详情页里使用服务端渲染的 JSON-LD。',
  '- A/B 层可以公开输出 Schema；C 层只保留内部候选 Schema。',
  '- C 层候选转为公开 Schema 前，必须先调整合规层级并复跑 SEO/GEO/Schema/Links 门禁。',
  '- Organization Schema 必须保持事实性：公司名、logo、URL、联系页、已验证的 sameAs。',
  '- 公开 SEO/GEO 页面中避免出现暗示 weapon、jamming、interception、military-grade 能力的表述。',
];

const reportPath = join(process.cwd(), 'docs', 'seo', `schema-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath} with ${candidates.length} public schema candidates.`);
