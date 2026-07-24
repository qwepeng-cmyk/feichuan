import policy from '@/config/cuasIndexability.json';

const productCategories = new Set<string>(policy.productCategories);
const solutionHandles = new Set<string>([
  ...policy.legacySolutionHandles,
  ...policy.catalogSolutions.map((solution) => solution.handle),
  ...policy.intentSolutionHandles,
]);
const caseHandles = new Set<string>(policy.caseHandles);
const mediaHandles = new Set<string>(policy.mediaHandles);

export const CUAS_CATALOG_SOLUTIONS = policy.catalogSolutions;
export const CUAS_CATALOG_SOLUTION_HANDLES = policy.catalogSolutions.map((solution) => solution.handle);
export const CUAS_INTENT_SOLUTION_HANDLES = policy.intentSolutionHandles;

export function isCuasProductCategory(category?: string | null) {
  return Boolean(category && productCategories.has(category));
}

export function isCuasSolutionHandle(handle?: string | null) {
  return Boolean(handle && solutionHandles.has(handle));
}

export function isCuasCaseHandle(handle?: string | null) {
  return Boolean(handle && caseHandles.has(handle));
}

export function isCuasMediaHandle(handle?: string | null) {
  return Boolean(handle && mediaHandles.has(handle));
}
