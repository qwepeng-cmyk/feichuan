import type { MetadataRoute } from 'next';
import db from '@/lib/db';
import { i18n, type Locale } from '@/i18n/config';
import {
  CUAS_CATALOG_SOLUTION_HANDLES,
  isCuasCaseHandle,
  isCuasMediaHandle,
  isCuasProductCategory,
  isCuasSolutionHandle,
} from '@/lib/cuasIndexability';

const SITE_URL = 'https://n-tet.com';
const STATIC_PATHS = ['/', '/products', '/solutions', '/cases', '/media', '/about', '/contact', '/privacy-policy'];
const EN_RU_INTENT_PATHS = [
  '/solutions/low-altitude-airspace-monitoring',
  '/solutions/drone-detector',
  '/solutions/drone-radar-detection',
  '/solutions/portable-drone-detection',
  '/solutions/drone-defender',
  '/solutions/drone-locator',
  '/solutions/drone-shield',
  '/solutions/drone-jammer',
];

type ContentType = 'product' | 'solution' | 'case' | 'media';

const CONTENT_CONFIG: Record<ContentType, { table: string; route: string; handleColumn: string }> = {
  product: { table: 'products', route: 'products', handleColumn: 'handle' },
  solution: { table: 'solutions', route: 'solutions', handleColumn: 'handle' },
  case: { table: 'cases', route: 'cases', handleColumn: 'handle' },
  media: { table: 'media', route: 'media', handleColumn: 'id' },
};

function urlFor(locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}${normalizedPath}`;
}

function sitemapEntry(locale: Locale, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: urlFor(locale, path),
  };
}

function publishedHandles(type: ContentType) {
  const config = CONTENT_CONFIG[type];
  const categoryColumn =
    type === 'product' ? 'category_primary' :
    type === 'solution' ? 'category_id' :
    type === 'case' ? 'solution_category_id' :
    'category';
  const rows = db
    .prepare(
      `SELECT ${config.handleColumn} AS handle, ${categoryColumn} AS category
       FROM ${config.table}
       WHERE COALESCE(is_published, 1) = 1
       ORDER BY ${config.handleColumn} COLLATE NOCASE`
    )
    .all() as Array<{ handle?: string | null; category?: string | null }>;

  return rows
    .filter((row) => {
      if (!row.handle) return false;
      if (type === 'product') return isCuasProductCategory(row.category);
      if (type === 'solution') return isCuasSolutionHandle(row.handle);
      if (type === 'case') return isCuasCaseHandle(row.handle);
      return isCuasMediaHandle(row.handle);
    })
    .map((row) => row.handle as string);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const path of STATIC_PATHS) {
      entries.push(sitemapEntry(locale, path));
    }

    if (['en', 'ru'].includes(locale)) {
      for (const path of EN_RU_INTENT_PATHS) {
        entries.push(sitemapEntry(locale, path));
      }
    }

    for (const [type, config] of Object.entries(CONTENT_CONFIG) as Array<[ContentType, (typeof CONTENT_CONFIG)[ContentType]]>) {
      const handles = type === 'solution'
        ? Array.from(new Set([...publishedHandles(type), ...CUAS_CATALOG_SOLUTION_HANDLES]))
        : publishedHandles(type);
      for (const handle of handles) {
        entries.push(sitemapEntry(locale, `/${config.route}/${handle}`));
      }
    }
  }

  return entries;
}
