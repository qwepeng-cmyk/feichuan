import db from './db';
import { unstable_cache } from 'next/cache';
import { isCuasCaseHandle } from './cuasIndexability';

export const getAllCases = unstable_cache(
  async () => {
    const rows = db.prepare(`
      SELECT
        handle,
        title_en,
        title_ru,
        title_es,
        title_ar,
        main_image,
        region_en,
        country_en,
        region_ru,
        country_ru,
        region_es,
        country_es,
        region_ar,
        country_ar,
        solution_category_id
      FROM cases
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];
    return rows.filter((row) => isCuasCaseHandle(row.handle));
  },
  ['all-cases-content-gates-retired-20260722-v1'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getAllCaseHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM cases WHERE COALESCE(is_published, 1) = 1').all() as any[];
    return rows.map(r => r.handle).filter(Boolean);
  },
  ['case-handles-content-gates-retired-20260722-v1'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getCaseByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM cases WHERE handle = ? AND COALESCE(is_published, 1) = 1').get(handle) as any;
    if (!row) return null;
    try {
        const data = JSON.parse(row.raw_json);
        const caseData = {
            ...data,
            ...row
        };
        return caseData;
    } catch(e) {
        return row;
    }
  },
  ['case-detail-content-gates-retired-20260722-v1'],
  { revalidate: 3600, tags: ['cases'] }
);
