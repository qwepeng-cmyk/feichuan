export function getPublicProductCategory(category?: string | null): string {
  if (category === 'anti-drone-cuas') return 'drone-detection';
  if (category === 'defense-engineering') return 'engineering-materials';
  return category || '';
}
