import db from './db';

export interface ProductMetadata {
  name: string;
  handle: string;
  image: string;
  category: string;
}

export async function getAllProducts() {
  const categories: Record<string, ProductMetadata[]> = {
    'uav-drone-systems': [],
    'anti-drone-cuas': [],
    'security-screening': [],
    'defense-engineering': [],
    'field-hospitals': [],
    'perimeter-intelligence': []
  };

  const rows = db.prepare('SELECT handle, product_name_en, main_image, category_primary FROM products').all() as any[];

  for (const row of rows) {
    if (categories[row.category_primary]) {
      categories[row.category_primary].push({
        name: row.product_name_en,
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
  const row = db.prepare('SELECT raw_json FROM products WHERE handle = ?').get(handle) as any;
  if (!row) return null;
  
  try {
    return JSON.parse(row.raw_json);
  } catch (e) {
    console.error("Error parsing product JSON for handle:", handle);
    return null;
  }
}
