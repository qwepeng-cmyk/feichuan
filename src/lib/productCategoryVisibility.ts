export const PRODUCT_CATEGORY_IDS = [
  'uav-drone-systems',
  'drone-detection',
  'perimeter-intelligence',
  'industrial-engine-microgrid',
  'security-screening',
  'engineering-materials',
  'field-hospitals',
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORY_IDS)[number];

type ProductCategories = Partial<Record<ProductCategoryId | string, unknown[]>>;

export function getVisibleProductCategoryIds(categoriesData?: ProductCategories | null): ProductCategoryId[] {
  if (!categoriesData) {
    return [];
  }

  return PRODUCT_CATEGORY_IDS.filter((id) => {
    const products = categoriesData[id];
    return Array.isArray(products) && products.length > 0;
  });
}

export function hasVisibleProductCategory(
  visibleCategoryIds: readonly ProductCategoryId[] | undefined,
  categoryId: ProductCategoryId
) {
  return visibleCategoryIds?.includes(categoryId) ?? true;
}
