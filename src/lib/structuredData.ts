import type { Locale } from '@/i18n/config';

const SITE_URL = 'https://n-tet.com';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type BreadcrumbItem = {
  name: string;
  url: string;
};

function absoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, SITE_URL).toString();
  } catch {
    return undefined;
  }
}

function pagePath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? normalizedPath : `/${locale}${normalizedPath}`;
}

export function pageUrl(locale: Locale, path: string) {
  return `${SITE_URL}${pagePath(locale, path)}`;
}

export function stripHtml(value?: string | null) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactObject<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => {
      if (item === undefined || item === null || item === '') return false;
      if (Array.isArray(item) && item.length === 0) return false;
      return true;
    })
  ) as T;
}

export function organizationSchema(locale: Locale = 'en') {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'N-TET',
    url: SITE_URL,
    logo: `${SITE_URL}/logo1-small.webp`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: locale === 'ru' ? ['ru', 'en'] : ['en', 'ru'],
      url: pageUrl(locale, '/contact'),
    },
  });
}

export function websiteSchema(locale: Locale = 'en') {
  return compactObject({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'N-TET',
    url: SITE_URL,
    inLanguage: locale,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  });
}

export function siteGraphSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(locale), websiteSchema(locale)],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productJsonLd({
  locale,
  handle,
  name,
  description,
  image,
  category,
  basePath = '/products',
  breadcrumbs,
}: {
  locale: Locale;
  handle: string;
  name: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  basePath?: '/products' | '/accessories';
  breadcrumbs: BreadcrumbItem[];
}) {
  const url = pageUrl(locale, `${basePath}/${handle}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      compactObject({
        '@type': 'Product',
        '@id': `${url}#product`,
        name,
        description: stripHtml(description),
        image: absoluteUrl(image),
        category,
        brand: {
          '@id': ORGANIZATION_ID,
        },
        manufacturer: {
          '@id': ORGANIZATION_ID,
        },
        url,
        mainEntityOfPage: url,
      }),
      breadcrumbSchema(breadcrumbs),
    ],
  };
}

export function serviceJsonLd({
  locale,
  handle,
  name,
  description,
  image,
  serviceType,
  breadcrumbs,
}: {
  locale: Locale;
  handle: string;
  name: string;
  description?: string | null;
  image?: string | null;
  serviceType?: string | null;
  breadcrumbs: BreadcrumbItem[];
}) {
  const url = pageUrl(locale, `/solutions/${handle}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      compactObject({
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description: stripHtml(description),
        image: absoluteUrl(image),
        serviceType,
        provider: {
          '@id': ORGANIZATION_ID,
        },
        areaServed: 'Global',
        url,
        mainEntityOfPage: url,
      }),
      breadcrumbSchema(breadcrumbs),
    ],
  };
}

export function articleJsonLd({
  locale,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  breadcrumbs,
}: {
  locale: Locale;
  path: string;
  title: string;
  description?: string | null;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  breadcrumbs: BreadcrumbItem[];
}) {
  const url = pageUrl(locale, path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      compactObject({
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description: stripHtml(description),
        image: absoluteUrl(image),
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@id': ORGANIZATION_ID,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        mainEntityOfPage: url,
        url,
      }),
      breadcrumbSchema(breadcrumbs),
    ],
  };
}
