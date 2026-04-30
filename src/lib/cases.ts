import db from './db';

export async function getAllCases() {
  const rows = db.prepare('SELECT raw_json FROM cases').all() as any[];
  return rows.map(r => {
      try {
          return JSON.parse(r.raw_json);
      } catch (e) {
          return {};
      }
  });
}

export async function getAllCaseHandles() {
  const rows = db.prepare('SELECT handle FROM cases').all() as any[];
  return rows.map(r => r.handle).filter(Boolean);
}

export async function getCaseByHandle(handle: string) {
  const row = db.prepare('SELECT raw_json FROM cases WHERE handle = ?').get(handle) as any;
  if (!row) return null;
  try {
      return JSON.parse(row.raw_json);
  } catch(e) {
      return null;
  }
}
