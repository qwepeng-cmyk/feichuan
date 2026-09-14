export function getPublicProductCategory(category?: string | null): string {
  if (
    category === 'drone-detection' ||
    category === 'anti-drone-cuas' ||
    category === 'perimeter-defense'
  ) {
    return 'detection-monitoring';
  }
  return category || '';
}
