import db from './db';
import { unstable_cache } from 'next/cache';
import { localizedField } from './localization';

export interface AccessoryMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
  catalogOrder?: number;
}

export const ACCESSORY_CATEGORY_ORDER = [
  'flight-controllers',
  'uav-motors',
  'uav-propellers',
  'uav-batteries',
  'electro-optical-gimbals',
  'uav-engines',
  'uav-data-links',
  'uav-remote-controllers',
];

function parseRawJson(rawJson?: string | null) {
  if (!rawJson) return {};
  try {
    return JSON.parse(rawJson);
  } catch {
    return {};
  }
}

function readOrder(value: unknown) {
  const order = Number(value);
  return Number.isFinite(order) ? order : 9999;
}

function pruneAccessoryDetailPayload<T extends Record<string, any>>(product: T) {
  const next = { ...product };
  delete next.raw_json;
  return next;
}

export const getAllAccessories = unstable_cache(
  async (locale: string = 'en') => {
    const categories = Object.fromEntries(ACCESSORY_CATEGORY_ORDER.map((category) => [category, []])) as Record<string, AccessoryMetadata[]>;

    const rows = db.prepare(`
      SELECT handle, product_name_en, product_name_ru, product_name_es, main_image, raw_json
      FROM products
      WHERE COALESCE(is_published, 1) = 1
        AND category_primary = 'uav-accessories'
    `).all() as any[];

    for (const row of rows) {
      const raw = parseRawJson(row.raw_json) as Record<string, unknown>;
      const category = String(raw.accessory_category || '');
      if (!categories[category]) continue;

      categories[category].push({
        name: localizedField(row, 'product_name', locale),
        handle: row.handle,
        image: row.main_image,
        category,
        catalogOrder: readOrder(raw.catalog_order),
      });
    }

    for (const products of Object.values(categories)) {
      products.sort((a, b) => (a.catalogOrder ?? 9999) - (b.catalogOrder ?? 9999) || a.name.localeCompare(b.name));
    }

    return categories;
  },
  ['all-accessories-uav-20260605-v8'],
  { revalidate: 3600, tags: ['products', 'accessories'] }
);

export const getAllAccessoryHandles = unstable_cache(
  async () => {
    const rows = db.prepare(`
      SELECT handle
      FROM products
      WHERE COALESCE(is_published, 1) = 1
        AND category_primary = 'uav-accessories'
    `).all() as any[];
    return rows.map((row) => row.handle).filter(Boolean);
  },
  ['accessory-handles-20260605-v8'],
  { revalidate: 3600, tags: ['products', 'accessories'] }
);

export const getAccessoryByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare(`
      SELECT *
      FROM products
      WHERE handle = ?
        AND COALESCE(is_published, 1) = 1
        AND category_primary = 'uav-accessories'
    `).get(handle) as any;
    if (!row) return null;

    try {
      return pruneAccessoryDetailPayload({
        ...JSON.parse(row.raw_json || '{}'),
        ...row,
      });
    } catch {
      return pruneAccessoryDetailPayload(row);
    }
  },
  ['accessory-detail-20260605-v8'],
  { revalidate: 3600, tags: ['products', 'accessories'] }
);
