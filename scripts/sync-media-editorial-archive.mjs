import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(scriptDir);
const sourcePath = path.join(rootDir, 'data', 'content', 'media-archive-2025-2026.json');
const localeSourcePath = path.join(rootDir, 'data', 'content', 'media-locales.json');
const dbPath = path.join(rootDir, 'data', 'ntet.db');
const publicNewsPath = path.join(rootDir, 'public', 'media', 'news_data.json');
const allowedCategories = new Set(['corporate', 'industry', 'product']);

const localeById = JSON.parse(fs.readFileSync(localeSourcePath, 'utf8'));
const applyLocales = item => ({ ...item, ...(localeById[item.id] || {}) });
const items = JSON.parse(fs.readFileSync(sourcePath, 'utf8')).map(applyLocales);
if (!Array.isArray(items) || items.length === 0) {
  throw new Error('Editorial archive source must contain at least one article.');
}

const publicNews = JSON.parse(fs.readFileSync(publicNewsPath, 'utf8')).map(applyLocales);
if (!Array.isArray(publicNews)) {
  throw new Error('Public media news source must be an array.');
}

const archiveIds = new Set(items.map(item => item.id));
const mergedPublicNews = [
  ...publicNews.filter(item => !archiveIds.has(item.id)),
  ...items,
].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const seenIds = new Set();
for (const item of items) {
  if (!item.id || !/^[a-z0-9-]+$/.test(item.id)) throw new Error(`Invalid media id: ${item.id}`);
  if (seenIds.has(item.id)) throw new Error(`Duplicate media id: ${item.id}`);
  seenIds.add(item.id);

  if (!allowedCategories.has(item.category)) throw new Error(`Invalid category for ${item.id}`);
  if (!item.title_en || !item.content_en || !item.summary_en || !item.date || !item.image) {
    throw new Error(`Missing required English fields for ${item.id}`);
  }
  if (Number.isNaN(Date.parse(item.date))) throw new Error(`Invalid date for ${item.id}: ${item.date}`);

  const imagePath = path.join(rootDir, 'public', item.image.replace(/^\//, ''));
  if (!fs.existsSync(imagePath)) throw new Error(`Missing image for ${item.id}: ${item.image}`);

}

const db = new Database(dbPath);
const upsertMedia = db.prepare(`
  INSERT INTO media (
    id, category, title, date, image, content,
    title_ru, content_ru, raw_json, updated_at, is_published,
    title_es, content_es, title_ar, content_ar
  ) VALUES (
    @id, @category, @title, @date, @image, @content,
    @title_ru, @content_ru, @raw_json, CURRENT_TIMESTAMP, 1,
    @title_es, @content_es, @title_ar, @content_ar
  )
  ON CONFLICT(id) DO UPDATE SET
    category = excluded.category,
    title = excluded.title,
    date = excluded.date,
    image = excluded.image,
    content = excluded.content,
    title_ru = excluded.title_ru,
    content_ru = excluded.content_ru,
    title_es = excluded.title_es,
    content_es = excluded.content_es,
    title_ar = excluded.title_ar,
    content_ar = excluded.content_ar,
    raw_json = excluded.raw_json,
    updated_at = CURRENT_TIMESTAMP,
    is_published = 1
`);
const updateLocalizedRecord = db.prepare(`
  UPDATE media SET
    title_ru = CASE WHEN @title_ru <> '' THEN @title_ru ELSE title_ru END,
    content_ru = CASE WHEN @content_ru <> '' THEN @content_ru ELSE content_ru END,
    title_es = CASE WHEN @title_es <> '' THEN @title_es ELSE title_es END,
    content_es = CASE WHEN @content_es <> '' THEN @content_es ELSE content_es END,
    title_ar = CASE WHEN @title_ar <> '' THEN @title_ar ELSE title_ar END,
    content_ar = CASE WHEN @content_ar <> '' THEN @content_ar ELSE content_ar END,
    raw_json = @raw_json,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = @id
`);

const sync = db.transaction(records => {
  for (const item of records) {
    const record = {
      ...item,
      title: item.title_en,
      content: item.content_en,
      is_published: 1,
    };
    upsertMedia.run({
      id: record.id,
      category: record.category,
      title: record.title,
      date: record.date,
      image: record.image,
      content: record.content,
      title_ru: record.title_ru || '',
      content_ru: record.content_ru || '',
      title_es: record.title_es || '',
      content_es: record.content_es || '',
      title_ar: record.title_ar || '',
      content_ar: record.content_ar || '',
      raw_json: JSON.stringify(record),
    });
  }
});

sync(items);
const syncLocales = db.transaction(records => {
  for (const item of records) {
    if (!localeById[item.id]) continue;
    updateLocalizedRecord.run({
      id: item.id,
      title_ru: item.title_ru || '',
      content_ru: item.content_ru || '',
      title_es: item.title_es || '',
      content_es: item.content_es || '',
      title_ar: item.title_ar || '',
      content_ar: item.content_ar || '',
      raw_json: JSON.stringify(item),
    });
  }
});
syncLocales(mergedPublicNews);
db.close();
fs.writeFileSync(publicNewsPath, `${JSON.stringify(mergedPublicNews, null, 2)}\n`, 'utf8');
console.log(`Synced ${items.length} evidence-based media articles to SQLite and public news JSON.`);
