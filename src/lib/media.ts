import { supabase } from './supabase';
import { unstable_cache } from 'next/cache';
import { isdefenseMediaHandle } from './indexability';
import { sanitizePublicRecord } from './publicCopy';

export interface MediaMetadata {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

const MEDIA_IMAGE_BY_ID: Record<string, string> = {
  'industrial-aerial-redundancy-2026': '/case_banner/4-home.webp',
  'tethered-aerial-persistent-surveillance-2026': '/cases/asian-games-security/main-home.webp',
  'border-surveillance-aerial-network-2026': '/solutions/01/Platform Border Patrol-home.webp',
  'low-altitude-economy-2026-outlook': '/solutions/infrastructure-protection/airport-airspace-monitoring/airport-airspace-monitoring.webp',
  'multi-sensor-defense-architecture-2026': '/cases/airport-security-application/main-home.webp',
  'defense-critical-infrastructure-deployment-2026': '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
  'eo-ir-payload-selection-field-note-2026': '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
  'ntet-multi-sensor-configuration-method-2025': '/cases/airport-security-application/main-home.webp',
  'ntet-equipment-bench-checks-2025': '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  'remote-id-rf-detection-complementary-2025': '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
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
    const { data, error } = await supabase
      .from('media')
      .select('raw_json, is_published')
      .eq('is_published', 1)
      .order('date', { ascending: false });
    if (error) throw error;
    const rows = (data || []) as any[];
    return rows.map(r => {
      try {
        return sanitizePublicRecord(normalizeMediaItem(JSON.parse(r.raw_json)));
      } catch (e) {
        return null;
      }
    }).filter((item) => item && isdefenseMediaHandle(item.id))
      .sort((a, b) => {
        const aTime = Date.parse(a.date || '');
        const bTime = Date.parse(b.date || '');
        if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
        return bTime - aTime;
      });
  },
  ['all-media-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['media'] }
);

export const getAllMediaIds = unstable_cache(
  async function getAllMediaIds() {
    const { data, error } = await supabase
      .from('media')
      .select('id')
      .eq('is_published', 1);
    if (error) throw error;
    const rows = (data || []) as any[];
    return rows.map(r => r.id);
  },
  ['media-ids-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['media'] }
);

export const getMediaById = unstable_cache(
  async function getMediaById(id: string) {
    const { data: row, error } = await supabase
      .from('media')
      .select('raw_json')
      .eq('id', id)
      .eq('is_published', 1)
      .maybeSingle();
    if (error) throw error;
    if (!row) return null;

    try {
      const item = normalizeMediaItem(JSON.parse(row.raw_json));
      return sanitizePublicRecord(item);
    } catch (e) {
      console.error("Error parsing media JSON for id:", id);
      return null;
    }
  },
  ['media-detail-yandex-copy-20260728-v2'],
  { revalidate: 3600, tags: ['media'] }
);
