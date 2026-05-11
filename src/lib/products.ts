import db from './db';

export interface ProductMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
  name_ru?: string;
}

export async function getAllProducts(locale: string = 'en') {
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
}

export async function getAllProductHandles() {
  const rows = db.prepare('SELECT handle FROM products').all() as any[];
  return rows.map(r => r.handle);
}

export async function getProductByHandle(handle: string) {
  const row = db.prepare('SELECT * FROM products WHERE handle = ?').get(handle) as any;
  if (!row) return null;
  
  try {
    const base = JSON.parse(row.raw_json);
    return {
      ...base,
      ...row // Overwrite with DB columns to ensure latest data/translations
    };
  } catch (e) {
    return row;
  }
}
