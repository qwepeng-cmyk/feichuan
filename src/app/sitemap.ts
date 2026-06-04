import type { MetadataRoute } from 'next';
import db from '@/lib/db';
import { isPublicComplianceContent } from '@/lib/complianceTaxonomy';

const SITE_URL = 'https://n-tet.com';
const LOCALES = ['en', 'ru'] as const;
const STATIC_PATHS = ['/', '/products', '/accessories', '/solutions', '/cases', '/media', '/about', '/contact'];

type ContentType = 'product' | 'solution' | 'case' | 'media';

const CONTENT_CONFIG: Record<ContentType, { table: string; route: string; handleColumn: string }> = {
  product: { table: 'products', route: 'products', handleColumn: 'handle' },
  solution: { table: 'solutions', route: 'solutions', handleColumn: 'handle' },
  case: { table: 'cases', route: 'cases', handleColumn: 'handle' },
  media: { table: 'media', route: 'media', handleColumn: 'id' },
};

function urlFor(locale: (typeof LOCALES)[number], path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}${normalizedPath}`;
}

function sitemapEntry(locale: (typeof LOCALES)[number], path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: urlFor(locale, path),
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  };
}

function publishedHandles(type: ContentType) {
  const config = CONTENT_CONFIG[type];
  const productCategoryFilter = type === 'product' ? "AND category_primary <> 'uav-accessories'" : '';
  const rows = db
    .prepare(
      `SELECT ${config.handleColumn} AS handle
       FROM ${config.table}
       WHERE COALESCE(is_published, 1) = 1
       ${productCategoryFilter}
       ORDER BY ${config.handleColumn} COLLATE NOCASE`
    )
    .all() as Array<{ handle?: string | null }>;

  return rows
    .map((row) => row.handle)
    .filter((handle): handle is string => Boolean(handle && isPublicComplianceContent(type, handle)));
}

function accessoryHandles() {
  const rows = db
    .prepare(
      `SELECT handle
       FROM products
       WHERE COALESCE(is_published, 1) = 1
         AND category_primary = 'uav-accessories'
       ORDER BY handle COLLATE NOCASE`
    )
    .all() as Array<{ handle?: string | null }>;

  return rows.map((row) => row.handle).filter((handle): handle is string => Boolean(handle));
}

function solutionCategories() {
  const rows = db
    .prepare(
      `SELECT DISTINCT category_id
       FROM solutions
       WHERE COALESCE(is_published, 1) = 1
       ORDER BY category_id COLLATE NOCASE`
    )
    .all() as Array<{ category_id?: string | null }>;

  return rows.map((row) => row.category_id).filter((categoryId): categoryId is string => Boolean(categoryId));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push(sitemapEntry(locale, path, path === '/' ? 1 : 0.8));
    }

    for (const categoryId of solutionCategories()) {
      entries.push(sitemapEntry(locale, `/solutions/category/${categoryId}`, 0.65));
    }

    for (const [type, config] of Object.entries(CONTENT_CONFIG) as Array<[ContentType, (typeof CONTENT_CONFIG)[ContentType]]>) {
      for (const handle of publishedHandles(type)) {
        entries.push(sitemapEntry(locale, `/${config.route}/${handle}`, 0.7));
      }
    }

    for (const handle of accessoryHandles()) {
      entries.push(sitemapEntry(locale, `/accessories/${handle}`, 0.7));
    }
  }

  return entries;
}
