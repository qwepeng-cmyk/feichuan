'use client';

interface ProductSummary {
  name: string;
  handle: string;
  image: string;
  [key: string]: any;
}

type ProductCategories = Record<string, ProductSummary[]>;
const PRODUCTS_API_VERSION = 'cuas-public-copy-pl280h-main-image-v2-20260701';

declare global {
  interface Window {
    __ntetProductsRequestCache?: Map<string, Promise<ProductCategories>>;
  }
}

function getProductsRequestCache() {
  if (typeof window === 'undefined') {
    return new Map<string, Promise<ProductCategories>>();
  }

  if (!window.__ntetProductsRequestCache) {
    window.__ntetProductsRequestCache = new Map<string, Promise<ProductCategories>>();
  }

  return window.__ntetProductsRequestCache;
}

export function fetchProductsForClient(locale: string) {
  const cacheKey = `${locale || 'en'}:${PRODUCTS_API_VERSION}`;
  const localeParam = locale || 'en';
  const productsRequestCache = getProductsRequestCache();
  const cached = productsRequestCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const request = fetch(`/api/products?locale=${encodeURIComponent(localeParam)}&v=${PRODUCTS_API_VERSION}`, {
    cache: 'no-store',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`);
      }
      return response.json() as Promise<ProductCategories>;
    })
    .catch(() => ({} as ProductCategories));

  productsRequestCache.set(cacheKey, request);
  return request;
}
