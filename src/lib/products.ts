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
      SELECT handle, product_name_en, product_name_ru, main_image, category_primary
      FROM products
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];

    for (const row of rows) {
      if (!isPublicComplianceContent('product', row.handle)) {
        continue;
      }

      const publicCategory = getPublicProductCategory(row.category_primary);

      if (categories[publicCategory]) {
        const tier = getComplianceTier('product', row.handle);
        const product = sanitizeRecordForTier({
          name: locale === 'ru' && row.product_name_ru ? row.product_name_ru : row.product_name_en,
          handle: row.handle,
          image: row.main_image,
          category: publicCategory
        }, tier);

        categories[publicCategory].push(product);
      }
    }

    return categories;
  },
  ['all-products'],
  { revalidate: 3600, tags: ['products'] }
);

export const getAllProductHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM products WHERE COALESCE(is_published, 1) = 1').all() as any[];
    return rows.map(r => r.handle).filter(handle => isPublicComplianceContent('product', handle));
  },
  ['product-handles'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM products WHERE handle = ? AND COALESCE(is_published, 1) = 1').get(handle) as any;
    if (!row) return null;
    if (!isPublicComplianceContent('product', handle)) return null;
    
    try {
      const base = JSON.parse(row.raw_json);
      const product = {
        ...base,
        ...row 
      };
      return sanitizeRecordForTier(product, getComplianceTier('product', handle));
    } catch (e) {
      return sanitizeRecordForTier(row, getComplianceTier('product', handle));
    }
  },
  ['product-detail'],
  { revalidate: 3600, tags: ['products'] }
);
