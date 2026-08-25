import policy from '@/config/indexability.json';

const productCategories = new Set<string>(policy.productCategories);
const solutionHandles = new Set<string>([
  ...policy.legacySolutionHandles,
  ...policy.catalogSolutions.map((solution) => solution.handle),
  ...policy.intentSolutionHandles,
]);
const caseHandles = new Set<string>(policy.caseHandles);
const mediaHandles = new Set<string>(policy.mediaHandles);

export const INDEXABLE_CATALOG_SOLUTIONS = policy.catalogSolutions;
export const INDEXABLE_CATALOG_SOLUTION_HANDLES = policy.catalogSolutions.map((solution) => solution.handle);
export const INDEXABLE_INTENT_SOLUTION_HANDLES = policy.intentSolutionHandles;

export const defense_CATALOG_SOLUTIONS = INDEXABLE_CATALOG_SOLUTIONS;
export const defense_CATALOG_SOLUTION_HANDLES = INDEXABLE_CATALOG_SOLUTION_HANDLES;
export const defense_INTENT_SOLUTION_HANDLES = INDEXABLE_INTENT_SOLUTION_HANDLES;

export function isIndexableProductCategory(category?: string | null) {
  return Boolean(category && productCategories.has(category));
}

export function isIndexableSolutionHandle(handle?: string | null) {
  return Boolean(handle && solutionHandles.has(handle));
}

export function isIndexableCaseHandle(handle?: string | null) {
  return Boolean(handle && caseHandles.has(handle));
}

export function isIndexableMediaHandle(handle?: string | null) {
  return Boolean(handle && mediaHandles.has(handle));
}

export const isdefenseProductCategory = isIndexableProductCategory;
export const isdefenseSolutionHandle = isIndexableSolutionHandle;
export const isdefenseCaseHandle = isIndexableCaseHandle;
export const isdefenseMediaHandle = isIndexableMediaHandle;
