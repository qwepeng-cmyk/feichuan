import policy from '@/config/publicCatalogPolicy.json';

const hiddenProductHandles = new Set<string>(policy.hiddenProductHandles);
const hiddenSolutionHandles = new Set<string>(policy.hiddenSolutionHandles);
const hiddenMediaHandles = new Set<string>(policy.hiddenMediaHandles);
const passiveDetectionProductHandles = new Set<string>(policy.passiveDetectionProductHandles);

export function isHiddenPublicProductHandle(handle?: string | null) {
  return Boolean(handle && hiddenProductHandles.has(handle));
}

export function isHiddenPublicSolutionHandle(handle?: string | null) {
  return Boolean(handle && hiddenSolutionHandles.has(handle));
}

export function isHiddenPublicMediaHandle(handle?: string | null) {
  return Boolean(handle && hiddenMediaHandles.has(handle));
}

export function isPassiveDetectionProductHandle(handle?: string | null) {
  return Boolean(handle && passiveDetectionProductHandles.has(handle));
}
