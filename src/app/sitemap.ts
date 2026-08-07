import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { supabase } from '@/lib/supabase';
import { i18n, type Locale } from '@/i18n/config';
import {
  defense_CATALOG_SOLUTION_HANDLES,
  isIndexableCaseHandle,
  isIndexableMediaHandle,
  isIndexableProductCategory,
  isIndexableSolutionHandle,
} from '@/lib/indexability';
import {
  isHiddenPublicMediaHandle,
  isHiddenPublicProductHandle,
  isHiddenPublicSolutionHandle,
  isPassiveDetectionProductHandle,
} from '@/lib/publicCatalogPolicy';

const STATIC_PATHS = ['/', '/products', '/solutions', '/cases', '/media', '/about', '/contact', '/privacy-policy'];
const INTENT_PATHS = [
  '/solutions/multi-sensor-detection',
  '/solutions/low-altitude-radar-monitoring',
  '/solutions/portable-detection-system',
  '/solutions/perimeter-defense-system',
  '/solutions/rf-target-positioning',
  '/solutions/layered-site-protection',
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
  return `${SITE_URL}${normalizedPath}`;
}

function sitemapEntry(locale: Locale, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: urlFor(locale, path),
  };
}

async function publishedHandles(type: ContentType) {
  const config = CONTENT_CONFIG[type];
  const categoryColumn =
    type === 'product' ? 'category_primary' :
    type === 'solution' ? 'category_id' :
    type === 'case' ? 'solution_category_id' :
    'category';
  const { data, error } = await supabase
    .from(config.table)
    .select(`${config.handleColumn}, ${categoryColumn}`)
    .eq('is_published', 1)
    .order(config.handleColumn, { ascending: true });
  if (error) throw error;
  const rows = ((data || []) as unknown as Array<Record<string, unknown>>).map((row) => ({
    handle: row[config.handleColumn] as string | null | undefined,
    category: row[categoryColumn] as string | null | undefined,
  }));

  return rows
    .filter((row) => {
      if (!row.handle) return false;
      if (type === 'product') {
        return !isHiddenPublicProductHandle(row.handle) &&
          isPassiveDetectionProductHandle(row.handle) &&
          isIndexableProductCategory(row.category);
      }
      if (type === 'solution') {
        return !isHiddenPublicSolutionHandle(row.handle) && isIndexableSolutionHandle(row.handle);
      }
      if (type === 'case') return isIndexableCaseHandle(row.handle);
      if (type === 'media') return !isHiddenPublicMediaHandle(row.handle) && isIndexableMediaHandle(row.handle);
      return isIndexableMediaHandle(row.handle);
    })
    .map((row) => row.handle as string);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const path of STATIC_PATHS) {
      entries.push(sitemapEntry(locale, path));
    }

    for (const path of INTENT_PATHS) {
      entries.push(sitemapEntry(locale, path));
    }

    for (const [type, config] of Object.entries(CONTENT_CONFIG) as Array<[ContentType, (typeof CONTENT_CONFIG)[ContentType]]>) {
      const published = await publishedHandles(type);
      const handles = type === 'solution'
        ? Array.from(new Set([...published, ...defense_CATALOG_SOLUTION_HANDLES]))
        : published;
      for (const handle of handles) {
        entries.push(sitemapEntry(locale, `/${config.route}/${handle}`));
      }
    }
  }

  return entries;
}
