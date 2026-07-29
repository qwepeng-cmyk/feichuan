import { supabase } from './supabase';
import { unstable_cache } from 'next/cache';
import { getPublicProductCategory } from './productCategory';
import { localizedField } from './localization';
import { sanitizePublicRecord } from './publicCopy';

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
  'medium-long-range-aerial-platform-inspection-system',
]);

const LOCAL_LASER_PREVIEW_HANDLE = 'directed-energy-system';

function isLocalLaserCatalogPreview(handle?: string | null) {
  return process.env.LOCAL_LASER_PREVIEW === '1' && handle === LOCAL_LASER_PREVIEW_HANDLE;
}

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
  async (locale: string = 'ru') => {
    const categories: Record<string, ProductMetadata[]> = {
      'detection-monitoring': [],
      'perimeter-intelligence': [],
    };

    const { data, error } = await supabase
      .from('products')
      .select('handle, product_name_en, product_name_ru, main_image, category_primary, raw_json')
      .eq('is_published', 1);
    if (error) throw error;
    const rows = (data || []) as any[];

    if (process.env.LOCAL_LASER_PREVIEW === '1' && !rows.some(row => row.handle === LOCAL_LASER_PREVIEW_HANDLE)) {
      const { data: localLaserProduct } = await supabase
        .from('products')
        .select('handle, product_name_en, product_name_ru, main_image, category_primary, raw_json')
        .eq('handle', LOCAL_LASER_PREVIEW_HANDLE)
        .maybeSingle();

      if (localLaserProduct) rows.push(localLaserProduct);
    }

    for (const row of rows) {
      if (HIDDEN_PRODUCT_HANDLES.has(row.handle)) {
        continue;
      }

      const localLaserPreview = isLocalLaserCatalogPreview(row.handle);

      const publicCategory = localLaserPreview
        ? 'detection-monitoring'
        : getPublicProductCategory(row.category_primary);

      if (categories[publicCategory]) {
        const raw = parseProductRawJson(row.raw_json) as Record<string, unknown>;
        const product = {
          name: localLaserPreview
            ? '3kW Directed Energy Defense System'
            : localizedField(row, 'product_name', locale),
          handle: row.handle,
          image: row.main_image,
          category: publicCategory,
          flightPlatform: localLaserPreview
            ? 'Physical Interception Systems'
            : cleanCatalogGroup(raw.category_by_flight_platform as string | undefined),
          missionApplication: localLaserPreview
            ? 'Laser Defense Systems'
            : cleanCatalogGroup(raw.category_by_mission_application as string | undefined),
          catalogOrder: localLaserPreview ? 80 : readCatalogOrder(raw.catalog_order)
        };

        categories[publicCategory].push(sanitizePublicRecord(product));
      }
    }

    for (const products of Object.values(categories)) {
      products.sort((a, b) => (a.catalogOrder ?? 9999) - (b.catalogOrder ?? 9999) || a.name.localeCompare(b.name));
    }

    return categories;
  },
  ['all-products-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['products'] }
);

export const getAllProductHandles = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('products')
      .select('handle')
      .eq('is_published', 1);
    if (error) throw error;
    const rows = (data || []) as any[];
    return rows
      .map(r => r.handle)
      .filter(handle => !HIDDEN_PRODUCT_HANDLES.has(handle));
  },
  ['product-handles-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductByHandle = unstable_cache(
  async (handle: string) => {
    const { data: row, error } = await supabase
      .from('products')
      .select('*')
      .eq('handle', handle)
      .eq('is_published', 1)
      .maybeSingle();
    if (error) throw error;
    if (!row) return null;
    if (HIDDEN_PRODUCT_HANDLES.has(handle)) return null;
    
    try {
      const base = JSON.parse(row.raw_json);
      const product = {
        ...base,
        ...row 
      };
      return sanitizePublicRecord(pruneProductDetailPayload(product));
    } catch (e) {
      return sanitizePublicRecord(pruneProductDetailPayload(row));
    }
  },
  ['product-detail-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['products'] }
);
