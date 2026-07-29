import { join } from 'node:path';
import { openDb, todayStamp, writeTextFile } from './ntet-seo-utils.mjs';
import { cuasIndexabilityPolicy, isCuasIndexableRow } from './cuas-indexability.mjs';

function parseHandles(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  const text = String(value).trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
  } catch {
    // Fall through to delimited text.
  }
  return text.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}

const db = openDb();
const products = new Map(
  db
    .prepare('SELECT handle FROM products WHERE COALESCE(is_published, 1) = 1')
    .all()
    .map((row) => [row.handle, row])
);

const cases = db
  .prepare('SELECT handle, recommended_product_handles FROM cases WHERE COALESCE(is_published, 1) = 1 ORDER BY handle')
  .all()
  .filter((row) => isCuasIndexableRow({ type: 'case', handle: row.handle, category: '' }));
const solutions = db
  .prepare('SELECT handle, recommended_products FROM solutions WHERE COALESCE(is_published, 1) = 1 ORDER BY handle')
  .all()
  .filter((row) =>
    isCuasIndexableRow({ type: 'solution', handle: row.handle, category: '' }) &&
    !cuasIndexabilityPolicy.catalogSolutions.some((solution) => solution.handle === row.handle)
  );

const issues = [];
for (const item of [...cases, ...solutions]) {
  const field = item.recommended_product_handles ?? item.recommended_products;
  for (const handle of parseHandles(field)) {
    const product = products.get(handle);
    if (!product) {
      issues.push(`${item.handle} links to missing product: ${handle}`);
    }
  }
}

const report = [
  '# N-TET 内链审计',
  '',
  `生成日期：${todayStamp()}`,
  '',
  '## 发现',
  '',
  ...(issues.length ? issues.map((item) => `- ${item}`) : ['- 未发现缺失的推荐产品链接。']),
];

const reportPath = join(process.cwd(), 'docs', 'seo', `internal-link-audit-${todayStamp()}.md`);
writeTextFile(reportPath, report.join('\n'));
console.log(`Wrote ${reportPath}`);

if (issues.length) {
  console.error(`Internal link audit found ${issues.length} issue(s).`);
  process.exit(1);
}
