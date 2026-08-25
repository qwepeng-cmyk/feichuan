import { join } from 'node:path';
import { getAllCuasIndexableContent, openDb, stripHtml, todayStamp, writeTextFile } from './ntet-seo-utils.mjs';
import { isCuasIndexableRow } from './cuas-indexability.mjs';

const db = openDb();
const rows = getAllCuasIndexableContent(db);
const warnings = [];

for (const row of rows) {
  const summaryLength = stripHtml(row.summary || '').length;
  if (summaryLength < 80) {
    warnings.push(`${row.type}/${row.handle} has a short summary (${summaryLength} chars).`);
  }
}

const mediaRows = db
  .prepare('SELECT id, title, date, content, is_published FROM media WHERE COALESCE(is_published, 1) = 1 ORDER BY date DESC')
  .all()
  .filter((row) => isCuasIndexableRow({ type: 'media', handle: row.id, category: 'media' }));

for (const row of mediaRows) {
  if (!row.date) warnings.push(`media/${row.id} has no publication date.`);
  if (stripHtml(row.content || '').length < 600) warnings.push(`media/${row.id} has thin article content.`);
}

const report = [
  '# N-TET E-E-A-T 审计',
  '',
  `生成日期：${todayStamp()}`,
  '',
  '## 范围',
  '',
  '- 检查 C-UAS 可索引记录，不应用 A/B/C 分层或敏感词排除。',
  '',
  '## 启发式警告',
  '',
  ...(warnings.length ? warnings.map((item) => `- ${item}`) : ['- 未发现基础 E-E-A-T 警告。']),
  '',
  '## 人工复核问题',
  '',
  '- 每个战略页面是否说明了使用场景、采购方、运行环境和证据来源？',
  '- 页面声明是否绑定了可见规格、项目案例、认证或可联系的公司信息？',
  '- 标题、摘要、Schema、llms.txt 与页面正文是否准确反映产品和能力？',
];

const reportPath = join(process.cwd(), 'docs', 'seo', `eeat-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath} with ${warnings.length} warning(s).`);
