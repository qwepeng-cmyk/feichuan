import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const policyPath = join(process.cwd(), 'src', 'config', 'indexability.json');
export const cuasIndexabilityPolicy = JSON.parse(readFileSync(policyPath, 'utf8'));

const productCategories = new Set(cuasIndexabilityPolicy.productCategories);
const solutionHandles = new Set([
  ...cuasIndexabilityPolicy.legacySolutionHandles,
  ...cuasIndexabilityPolicy.catalogSolutions.map((solution) => solution.handle),
  ...cuasIndexabilityPolicy.intentSolutionHandles,
]);
const caseHandles = new Set(cuasIndexabilityPolicy.caseHandles);
const mediaHandles = new Set(cuasIndexabilityPolicy.mediaHandles);

export function isCuasIndexableRow(row) {
  if (!row) return false;
  if (row.type === 'product') return productCategories.has(row.category);
  if (row.type === 'solution') return solutionHandles.has(row.handle);
  if (row.type === 'case') return caseHandles.has(row.handle);
  if (row.type === 'media') return mediaHandles.has(row.handle);
  return false;
}

export function isCuasProductHandleRow(row) {
  return row?.type === 'product' && productCategories.has(row.category);
}
