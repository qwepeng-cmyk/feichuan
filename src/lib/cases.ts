import db from './db';
import { unstable_cache } from 'next/cache';
import { isdefenseCaseHandle } from './indexability';
import { sanitizePublicRecord } from './publicCopy';

export const getAllCases = unstable_cache(
  async () => {
    const rows = db.prepare(`
      SELECT handle, title_en, title_ru, main_image, region_en, country_en,
             region_ru, country_ru, solution_category_id
      FROM cases
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];
    return rows
      .filter((row) => isdefenseCaseHandle(row.handle))
      .map((row) => sanitizePublicRecord(row));
  },
  ['all-cases-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getAllCaseHandles = unstable_cache(
  async () => {
    const rows = db.prepare(`
      SELECT handle
      FROM cases
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];
    return rows.map(r => r.handle).filter(Boolean);
  },
  ['case-handles-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getCaseByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare(`
      SELECT *
      FROM cases
      WHERE handle = ? AND COALESCE(is_published, 1) = 1
    `).get(handle) as any;
    if (!row) return null;
    try {
        const data = JSON.parse(row.raw_json);
        const caseData = {
            ...data,
            ...row
        };
        return sanitizePublicRecord(caseData);
    } catch(e) {
        return sanitizePublicRecord(row);
    }
  },
  ['case-detail-yandex-copy-20260729-v3'],
  { revalidate: 3600, tags: ['cases'] }
);
