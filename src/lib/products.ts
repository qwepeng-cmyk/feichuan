import db from './db';
import { unstable_cache } from 'next/cache';
import {
  getComplianceTier,
  getPublicProductCategory,
  isPublicComplianceContent,
  sanitizeRecordForTier,
} from './complianceTaxonomy';

export interface ProductMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
  name_ru?: string;
  flightPlatform?: string;
  missionApplication?: string;
  catalogOrder?: number;
}

const HIDDEN_PRODUCT_HANDLES = new Set([
  'medium-long-range-uav-inspection-system',
]);

function parseProductRawJson(rawJson?: string | null) {
  if (!rawJson) return {};

  try {
    return JSON.parse(rawJson);
  } catch (error) {
    return {};
  }
}

function cleanCatalogGroup(value?: string | null) {
  if (!value) return '';
  return value.replace(/\s*\([^)]*[\u4e00-\u9fff][^)]*\)/g, '').trim();
}

function readCatalogOrder(value: unknown) {
  const order = Number(value);
  return Number.isFinite(order) ? order : 9999;
}

function pruneProductDetailPayload<T extends Record<string, any>>(product: T) {
  const next = { ...product };
  delete next.raw_json;
  delete next.detail_html;
  delete next.parameter_tables;
  delete next.parameter_tables_en;
  delete next.parameter_tables_ru;
  return next;
}

export const getAllProducts = unstable_cache(
  async (locale: string = 'en') => {
    const categories: Record<string, ProductMetadata[]> = {
      'uav-drone-systems': [],
      'drone-detection': [],
      'security-screening': [],
      'engineering-materials': [],
      'field-hospitals': [],
      'perimeter-intelligence': []
    };

    const rows = db.prepare(`
      SELECT handle, product_name_en, product_name_ru, main_image, category_primary, raw_json
      FROM products
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];

    for (const row of rows) {
      if (HIDDEN_PRODUCT_HANDLES.has(row.handle)) {
        continue;
      }

      if (!isPublicComplianceContent('product', row.handle)) {
        continue;
      }

      const publicCategory = getPublicProductCategory(row.category_primary);

      if (categories[publicCategory]) {
        const raw = parseProductRawJson(row.raw_json) as Record<string, unknown>;
        const tier = getComplianceTier('product', row.handle);
        const product = sanitizeRecordForTier({
          name: locale === 'ru' && row.product_name_ru ? row.product_name_ru : row.product_name_en,
          handle: row.handle,
          image: row.main_image,
          category: publicCategory,
          flightPlatform: cleanCatalogGroup(raw.category_by_flight_platform as string | undefined),
          missionApplication: cleanCatalogGroup(raw.category_by_mission_application as string | undefined),
          catalogOrder: readCatalogOrder(raw.catalog_order)
        }, tier);

        categories[publicCategory].push(product);
      }
    }

    for (const products of Object.values(categories)) {
      products.sort((a, b) => (a.catalogOrder ?? 9999) - (b.catalogOrder ?? 9999) || a.name.localeCompare(b.name));
    }

    return categories;
  },
  ['all-products-uav-refresh-20260526-mission-first-path-safe-v3'],
  { revalidate: 3600, tags: ['products'] }
);

export const getAllProductHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM products WHERE COALESCE(is_published, 1) = 1').all() as any[];
    return rows
      .map(r => r.handle)
      .filter(handle => !HIDDEN_PRODUCT_HANDLES.has(handle) && isPublicComplianceContent('product', handle));
  },
  ['product-handles-uav-refresh-20260526-mission-first-path-safe-v3'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM products WHERE handle = ? AND COALESCE(is_published, 1) = 1').get(handle) as any;
    if (!row) return null;
    if (HIDDEN_PRODUCT_HANDLES.has(handle)) return null;
    if (!isPublicComplianceContent('product', handle)) return null;
    
    try {
      const base = JSON.parse(row.raw_json);
      const product = {
        ...base,
        ...row 
      };
      return sanitizeRecordForTier(pruneProductDetailPayload(product), getComplianceTier('product', handle));
    } catch (e) {
      return sanitizeRecordForTier(pruneProductDetailPayload(row), getComplianceTier('product', handle));
    }
  },
  ['product-detail-uav-refresh-20260527-sljc-scenarios-v7'],
  { revalidate: 3600, tags: ['products'] }
);
