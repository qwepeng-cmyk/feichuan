'use client';

interface AccessorySummary {
  name: string;
  handle: string;
  image: string;
  [key: string]: any;
}

type AccessoryCategories = Record<string, AccessorySummary[]>;
const ACCESSORIES_API_VERSION = 'uav-accessories-v1';

declare global {
  interface Window {
    __ntetAccessoriesRequestCache?: Map<string, Promise<AccessoryCategories>>;
  }
}

function getAccessoriesRequestCache() {
  if (typeof window === 'undefined') {
    return new Map<string, Promise<AccessoryCategories>>();
  }

  if (!window.__ntetAccessoriesRequestCache) {
    window.__ntetAccessoriesRequestCache = new Map<string, Promise<AccessoryCategories>>();
  }

  return window.__ntetAccessoriesRequestCache;
}

export function fetchAccessoriesForClient(locale: string) {
  const cacheKey = `${locale || 'en'}:${ACCESSORIES_API_VERSION}`;
  const localeParam = locale || 'en';
  const requestCache = getAccessoriesRequestCache();
  const cached = requestCache.get(cacheKey);

  if (cached) return cached;

  const request = fetch(`/api/accessories?locale=${encodeURIComponent(localeParam)}&v=${ACCESSORIES_API_VERSION}`, {
    cache: 'no-store',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load accessories: ${response.status}`);
      }
      return response.json() as Promise<AccessoryCategories>;
    })
    .catch(() => ({} as AccessoryCategories));

  requestCache.set(cacheKey, request);
  return request;
}
