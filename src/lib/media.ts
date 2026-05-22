import db from './db';
import { unstable_cache } from 'next/cache';
import {
  getComplianceTier,
  isPublicComplianceContent,
  sanitizeRecordForTier,
} from './complianceTaxonomy';

export interface MediaMetadata {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

export const getAllMedia = unstable_cache(
  async function getAllMedia() {
    const rows = db.prepare('SELECT raw_json, COALESCE(is_published, 1) AS is_published FROM media WHERE COALESCE(is_published, 1) = 1 ORDER BY date DESC').all() as any[];
    return rows.map(r => {
      try {
        return JSON.parse(r.raw_json);
      } catch (e) {
        return null;
      }
    }).filter(Boolean)
      .filter(item => isPublicComplianceContent('media', item.id))
      .map(item => sanitizeRecordForTier(item, getComplianceTier('media', item.id)));
  },
  ['all-media'],
  { revalidate: 3600, tags: ['media'] }
);

export const getAllMediaIds = unstable_cache(
  async function getAllMediaIds() {
    const rows = db.prepare('SELECT id FROM media WHERE COALESCE(is_published, 1) = 1').all() as any[];
    return rows.map(r => r.id).filter(id => isPublicComplianceContent('media', id));
  },
  ['media-ids'],
  { revalidate: 3600, tags: ['media'] }
);

export const getMediaById = unstable_cache(
  async function getMediaById(id: string) {
    const row = db.prepare('SELECT raw_json FROM media WHERE id = ? AND COALESCE(is_published, 1) = 1').get(id) as any;
    if (!row) return null;
    if (!isPublicComplianceContent('media', id)) return null;

    try {
      const item = JSON.parse(row.raw_json);
      return sanitizeRecordForTier(item, getComplianceTier('media', id));
    } catch (e) {
      console.error("Error parsing media JSON for id:", id);
      return null;
    }
  },
  ['media-detail'],
  { revalidate: 3600, tags: ['media'] }
);
