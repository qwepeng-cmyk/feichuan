import db from './db';

export async function getAllCases() {
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
}

export async function getAllCaseHandles() {
  const rows = db.prepare('SELECT handle FROM cases').all() as any[];
  return rows.map(r => r.handle).filter(Boolean);
}

export async function getCaseByHandle(handle: string) {
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
}
