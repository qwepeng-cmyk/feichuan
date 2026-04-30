import db from './db';

export interface MediaMetadata {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

export async function getAllMedia() {
  const rows = db.prepare('SELECT raw_json FROM media ORDER BY date DESC').all() as any[];
  return rows.map(r => {
    try {
      return JSON.parse(r.raw_json);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
}

export async function getAllMediaIds() {
  const rows = db.prepare('SELECT id FROM media').all() as any[];
  return rows.map(r => r.id);
}

export async function getMediaById(id: string) {
  const row = db.prepare('SELECT raw_json FROM media WHERE id = ?').get(id) as any;
  if (!row) return null;
  
  try {
    return JSON.parse(row.raw_json);
  } catch (e) {
    console.error("Error parsing media JSON for id:", id);
    return null;
  }
}
