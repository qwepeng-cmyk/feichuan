import db from './db';
import { unstable_cache } from 'next/cache';

export interface ProductMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
  name_ru?: string;
}

export const getAllProducts = unstable_cache(
  async (locale: string = 'en') => {
    const categories: Record<string, ProductMetadata[]> = {
      'uav-drone-systems': [],
      'anti-drone-cuas': [],
      'security-screening': [],
      'defense-engineering': [],
      'field-hospitals': [],
      'perimeter-intelligence': []
    };

    const rows = db.prepare('SELECT handle, product_name_en, product_name_ru, main_image, category_primary FROM products').all() as any[];

    for (const row of rows) {
      if (categories[row.category_primary]) {
        categories[row.category_primary].push({
          name: locale === 'ru' && row.product_name_ru ? row.product_name_ru : row.product_name_en,
          handle: row.handle,
          image: row.main_image,
          category: row.category_primary
        });
      }
    }

    return categories;
  },
  ['all-products'],
  { revalidate: 3600, tags: ['products'] }
);

export const getAllProductHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM products').all() as any[];
    return rows.map(r => r.handle);
  },
  ['product-handles'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM products WHERE handle = ?').get(handle) as any;
    if (!row) return null;
    
    try {
      const base = JSON.parse(row.raw_json);
      return {
        ...base,
        ...row 
      };
    } catch (e) {
      return row;
    }
  },
  ['product-detail'],
  { revalidate: 3600, tags: ['products'] }
);
