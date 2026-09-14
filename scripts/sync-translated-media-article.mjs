import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(scriptDir);
const id = process.argv[2];
if (!id || !/^[a-z0-9-]+$/.test(id)) {
  throw new Error('Usage: node scripts/sync-translated-media-article.mjs <article-id>');
}
const metadataPath = path.join(rootDir, 'data', 'content', 'translated-media', `${id}.json`);
const htmlPath = path.join(rootDir, 'data', 'content', 'articles', `${id}.html`);
const publicNewsPath = path.join(rootDir, 'public', 'media', 'news_data.json');
const dbPath = path.join(rootDir, 'data', 'ntet.db');

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const content = fs.readFileSync(htmlPath, 'utf8').trim();
const imagePath = path.join(rootDir, 'public', metadata.image.replace(/^\//, ''));

if (metadata.id !== id) {
  throw new Error(`Invalid translated media id: ${metadata.id}`);
}
if (!fs.existsSync(imagePath)) {
  throw new Error(`Missing translated media image: ${metadata.image}`);
}
if (!Array.isArray(metadata.required_chapters) || metadata.required_chapters.length === 0) {
  throw new Error('Translated article metadata must declare required_chapters.');
}
const missingChapters = metadata.required_chapters.filter(chapter => !content.includes(`<h2>${chapter}`));
if (missingChapters.length > 0) {
  throw new Error(`Translated article is missing required chapters: ${missingChapters.join(', ')}`);
}

const record = {
  ...metadata,
  content,
  content_en: content,
};

const publicNews = JSON.parse(fs.readFileSync(publicNewsPath, 'utf8'));
if (!Array.isArray(publicNews)) {
  throw new Error('Public media news source must be an array.');
}

const mergedPublicNews = [
  record,
  ...publicNews.filter(item => item.id !== id),
].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const db = new Database(dbPath);
const upsert = db.prepare(`
  INSERT INTO media (
    id, category, title, date, image, content,
    title_ru, content_ru, raw_json, updated_at, is_published,
    title_es, content_es, title_ar, content_ar
  ) VALUES (
    @id, @category, @title, @date, @image, @content,
    '', '', @raw_json, CURRENT_TIMESTAMP, 1,
    '', '', '', ''
  )
  ON CONFLICT(id) DO UPDATE SET
    category = excluded.category,
    title = excluded.title,
    date = excluded.date,
    image = excluded.image,
    content = excluded.content,
    raw_json = excluded.raw_json,
    updated_at = CURRENT_TIMESTAMP,
    is_published = 1
`);

const transaction = db.transaction(() => {
  upsert.run({
    id: record.id,
    category: record.category,
    title: record.title,
    date: record.date,
    image: record.image,
    content: record.content,
    raw_json: JSON.stringify(record),
  });
});

transaction();
db.close();
fs.writeFileSync(publicNewsPath, `${JSON.stringify(mergedPublicNews, null, 2)}\n`, 'utf8');

console.log(`Synced translated media article ${id} to SQLite and public news JSON.`);
