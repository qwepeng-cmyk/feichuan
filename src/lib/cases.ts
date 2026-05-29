import db from './db';
import { unstable_cache } from 'next/cache';
import {
  getComplianceTier,
  isPublicComplianceContent,
  sanitizeRecordForTier,
} from './complianceTaxonomy';

export const getAllCases = unstable_cache(
  async () => {
    const rows = db.prepare(`
      SELECT
        handle,
        title_en,
        title_ru,
        main_image,
        region_en,
        country_en,
        region_ru,
        country_ru,
        solution_category_id
      FROM cases
      WHERE COALESCE(is_published, 1) = 1
    `).all() as any[];
    return rows
      .filter(row => isPublicComplianceContent('case', row.handle))
      .map(row => sanitizeRecordForTier(row, getComplianceTier('case', row.handle)));
  },
  ['all-cases-uav-refresh-20260526'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getAllCaseHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM cases WHERE COALESCE(is_published, 1) = 1').all() as any[];
    return rows.map(r => r.handle).filter(handle => handle && isPublicComplianceContent('case', handle));
  },
  ['case-handles-uav-refresh-20260526'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getCaseByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM cases WHERE handle = ? AND COALESCE(is_published, 1) = 1').get(handle) as any;
    if (!row) return null;
    if (!isPublicComplianceContent('case', handle)) return null;
    try {
        const data = JSON.parse(row.raw_json);
        const caseData = {
            ...data,
            ...row
        };
        return sanitizeRecordForTier(caseData, getComplianceTier('case', handle));
    } catch(e) {
        return sanitizeRecordForTier(row, getComplianceTier('case', handle));
    }
  },
  ['case-detail-uav-refresh-20260526'],
  { revalidate: 3600, tags: ['cases'] }
);
