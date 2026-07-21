import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, 'data', 'ntet.db');
const CORRECTIONS_PATH = path.join(ROOT, 'data', 'content', 'case-editorial-corrections.json');
const CASE_DIR = path.join(ROOT, 'public', 'cases');

const corrections = JSON.parse(fs.readFileSync(CORRECTIONS_PATH, 'utf8'));
const aliasToHandle = new Map();
for (const [handle, correction] of Object.entries(corrections)) {
  aliasToHandle.set(handle, handle);
  for (const alias of correction.aliases || []) aliasToHandle.set(alias, handle);
}

const dbColumns = new Set([
  'title_en', 'description_en', 'devices_en',
  'title_ru', 'description_ru', 'devices_ru',
  'title_es', 'description_es', 'devices_es',
  'title_ar', 'description_ar', 'devices_ar',
  'recommended_product_handles', 'is_published',
]);
const jsonColumns = new Set(['devices_en', 'devices_ru', 'devices_es', 'devices_ar', 'recommended_product_handles']);

function writeSourceJson() {
  let changed = 0;
  for (const filename of fs.readdirSync(CASE_DIR)) {
    if (!filename.endsWith('.json') || filename === 'cases_data.json') continue;
    const fullPath = path.join(CASE_DIR, filename);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch {
      continue;
    }
    const canonical = aliasToHandle.get(data.handle);
    if (!canonical) continue;
    const correction = corrections[canonical];
    for (const [key, value] of Object.entries(correction)) {
      if (key === 'aliases') continue;
      data[key] = value;
    }
    if (correction.recommended_product_handles) {
      data.recommendedProductHandles = correction.recommended_product_handles;
    }
    fs.writeFileSync(fullPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    changed += 1;
  }
  return changed;
}

function updateDatabase() {
  const db = new Database(DB_PATH);
  const update = db.transaction(() => {
    for (const [handle, correction] of Object.entries(corrections)) {
      const row = db.prepare('SELECT rowid AS __rowid, raw_json FROM cases WHERE handle = ?').get(handle);
      if (!row) continue;
      let raw = {};
      try { raw = JSON.parse(row.raw_json || '{}'); } catch { raw = {}; }
      const assignments = [];
      const values = [];
      for (const [key, value] of Object.entries(correction)) {
        if (key === 'aliases') continue;
        raw[key] = value;
        if (!dbColumns.has(key)) continue;
        assignments.push(`${key} = ?`);
        values.push(jsonColumns.has(key) ? JSON.stringify(value) : (typeof value === 'boolean' ? Number(value) : value));
      }
      if (correction.recommended_product_handles) {
        raw.recommendedProductHandles = correction.recommended_product_handles;
      }
      assignments.push('raw_json = ?', 'updated_at = CURRENT_TIMESTAMP');
      values.push(JSON.stringify(raw), row.__rowid);
      db.prepare(`UPDATE cases SET ${assignments.join(', ')} WHERE rowid = ?`).run(...values);
    }
  });
  update();
  db.close();
}

const changedFiles = writeSourceJson();
updateDatabase();
console.log(`Applied case editorial corrections to ${changedFiles} JSON files and data/ntet.db.`);
