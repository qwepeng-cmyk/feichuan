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

const MEDIA_IMAGE_BY_ID: Record<string, string> = {
  'industrial-uav-redundancy-2026': '/case_banner/4-home.webp',
  'tethered-uav-persistent-surveillance-2026': '/cases/asian-games-security/main-home.webp',
  'border-surveillance-uav-network-2026': '/solutions/01/Drone Border Patrol-home.webp',
  'low-altitude-economy-2026-outlook': '/media/news/low-altitude-economy-2026-card.webp',
  'multi-sensor-cuas-architecture-2026': '/cases/airport-security-application/main-home.webp',
  'cuas-critical-infrastructure-deployment-2026': '/cases/pakistan-power-plant-anti-uav/main-home.webp',
};

function normalizeMediaItem(item: any) {
  if (!item || typeof item !== 'object') return item;

  return {
    ...item,
    image: MEDIA_IMAGE_BY_ID[item.id] || item.image,
  };
}

export const getAllMedia = unstable_cache(
  async function getAllMedia() {
    const rows = db.prepare('SELECT raw_json, COALESCE(is_published, 1) AS is_published FROM media WHERE COALESCE(is_published, 1) = 1 ORDER BY date DESC').all() as any[];
    return rows.map(r => {
      try {
        return normalizeMediaItem(JSON.parse(r.raw_json));
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
      const item = normalizeMediaItem(JSON.parse(row.raw_json));
      return sanitizeRecordForTier(item, getComplianceTier('media', id));
    } catch (e) {
      console.error("Error parsing media JSON for id:", id);
      return null;
    }
  },
  ['media-detail'],
  { revalidate: 3600, tags: ['media'] }
);
