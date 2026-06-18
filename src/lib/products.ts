import db from './db';
import { unstable_cache } from 'next/cache';
import {
  getComplianceTier,
  getPublicProductCategory,
  isPublicComplianceContent,
  sanitizeRecordForTier,
} from './complianceTaxonomy';
import { localizedField } from './localization';

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

const ACCESSORY_CATEGORY = 'uav-accessories';

const FALLBACK_FLIGHT_PLATFORMS: Record<string, string> = {
  'multi-rotor-3kg-payload-uav': 'Multi-Rotor UAVs',
  'multi-rotor-8kg-payload-uav': 'Multi-Rotor UAVs',
  'multi-rotor-20kg-payload-uav': 'Multi-Rotor UAVs',
  'multi-rotor-50kg-payload-uav': 'Multi-Rotor UAVs',
  'vtol-14kg-mtow-uav': 'VTOL Fixed-Wing UAVs',
  'vtol-26kg-mtow-uav': 'VTOL Fixed-Wing UAVs',
  'vtol-40kg-mtow-uav': 'VTOL Fixed-Wing UAVs',
  'vtol-64kg-mtow-uav': 'VTOL Fixed-Wing UAVs',
  'vtol-135kg-mtow-uav': 'VTOL Fixed-Wing UAVs',
  'fc-yjtx-01-emergency-communication-drone': 'Tethered UAVs',
  'fc-yjzm-01-emergency-lighting-drone': 'Tethered UAVs',
  'fc-yjxf-01-aerial-firefighting-drone': 'Tethered UAVs',
};

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
      'perimeter-intelligence': [],
      'industrial-engine-microgrid': [],
      'security-screening': [],
      'engineering-materials': [],
      'field-hospitals': []
    };

    const rows = db.prepare(`
      SELECT handle, product_name_en, product_name_ru, product_name_es, product_name_ar, main_image, category_primary, raw_json
      FROM products
      WHERE COALESCE(is_published, 1) = 1
        AND category_primary <> ?
    `).all(ACCESSORY_CATEGORY) as any[];

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
          name: localizedField(row, 'product_name', locale),
          handle: row.handle,
          image: row.main_image,
          category: publicCategory,
          flightPlatform: cleanCatalogGroup(raw.category_by_flight_platform as string | undefined) || FALLBACK_FLIGHT_PLATFORMS[row.handle] || '',
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
  ['all-products-uav-refresh-20260526-mission-first-path-safe-v7-ntet-fc-20260618'],
  { revalidate: 3600, tags: ['products'] }
);

export const getAllProductHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM products WHERE COALESCE(is_published, 1) = 1 AND category_primary <> ?').all(ACCESSORY_CATEGORY) as any[];
    return rows
      .map(r => r.handle)
      .filter(handle => !HIDDEN_PRODUCT_HANDLES.has(handle) && isPublicComplianceContent('product', handle));
  },
  ['product-handles-uav-refresh-20260526-mission-first-path-safe-v6-ntet-fc-20260618'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM products WHERE handle = ? AND COALESCE(is_published, 1) = 1 AND category_primary <> ?').get(handle, ACCESSORY_CATEGORY) as any;
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
  ['product-detail-uav-refresh-20260527-sljc-scenarios-v11-ntet-fc-20260618'],
  { revalidate: 3600, tags: ['products'] }
);
