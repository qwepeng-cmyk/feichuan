import db from './db';
import { unstable_cache } from 'next/cache';

export const getAllCases = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT * FROM cases').all() as any[];
    return rows.map(row => {
        try {
            const data = JSON.parse(row.raw_json);
            return {
                ...data,
                ...row
            };
        } catch (e) {
            return row;
        }
    });
  },
  ['all-cases'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getAllCaseHandles = unstable_cache(
  async () => {
    const rows = db.prepare('SELECT handle FROM cases').all() as any[];
    return rows.map(r => r.handle).filter(Boolean);
  },
  ['case-handles'],
  { revalidate: 3600, tags: ['cases'] }
);

export const getCaseByHandle = unstable_cache(
  async (handle: string) => {
    const row = db.prepare('SELECT * FROM cases WHERE handle = ?').get(handle) as any;
    if (!row) return null;
    try {
        const data = JSON.parse(row.raw_json);
        return {
            ...data,
            ...row
        };
    } catch(e) {
        return row;
    }
  },
  ['case-detail'],
  { revalidate: 3600, tags: ['cases'] }
);
