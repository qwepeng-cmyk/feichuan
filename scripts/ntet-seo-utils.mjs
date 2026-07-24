import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { isCuasIndexableRow } from './cuas-indexability.mjs';

const require = createRequire(import.meta.url);
let Database = null;

try {
  Database = require('better-sqlite3');
} catch {
  const { DatabaseSync } = require('node:sqlite');
  Database = class NodeSqliteReadonlyDatabase extends DatabaseSync {
    constructor(dbPath) {
      super(dbPath, { readOnly: true });
    }
  };
}

export const SITE_URL = (process.env.SITE_URL || 'https://n-tet.com').replace(/\/+$/, '');
export const LOCALES = ['en', 'ru', 'es', 'ar'];

export const CONTENT_TYPES = {
  product: {
    table: 'products',
    route: 'products',
    handleColumn: 'handle',
    titleColumn: 'product_name_en',
    summaryColumn: 'summary_en',
    categoryColumn: 'category_primary',
  },
  solution: {
    table: 'solutions',
    route: 'solutions',
    handleColumn: 'handle',
    titleColumn: 'product_name_en',
    summaryColumn: 'summary_en',
    categoryColumn: 'category_id',
  },
  case: {
    table: 'cases',
    route: 'cases',
    handleColumn: 'handle',
    titleColumn: 'title_en',
    summaryColumn: 'description_en',
    categoryColumn: 'solution_category_id',
  },
  media: {
    table: 'media',
    route: 'media',
    handleColumn: 'id',
    titleColumn: 'title',
    summaryColumn: 'content',
    categoryColumn: 'category',
  },
};

export function getDbPath() {
  if (process.env.DATABASE_URL) return resolve(process.cwd(), process.env.DATABASE_URL);

  const primary = join(process.cwd(), 'data', 'ntet.db');
  if (existsSync(primary)) return primary;

  const legacy = join(process.cwd(), 'src', 'lib', 'ntet.db');
  if (existsSync(legacy)) return legacy;

  return primary;
}

export function openDb() {
  const dbPath = getDbPath();
  if (!existsSync(dbPath)) throw new Error(`Database not found: ${dbPath}`);
  return new Database(dbPath, { readonly: true });
}

export function getPublishedContent(db, type) {
  const config = CONTENT_TYPES[type];
  const rows = db
    .prepare(
      `SELECT ${config.handleColumn} AS handle, ${config.titleColumn} AS title, ${config.summaryColumn} AS summary,
              ${config.categoryColumn} AS category, is_published
       FROM ${config.table}
       WHERE COALESCE(is_published, 1) = 1
       ORDER BY title COLLATE NOCASE`
    )
    .all();

  return rows.map((row) => ({
    ...row,
    type,
    route: config.route,
  }));
}

export function getAllPublishedContent(db) {
  return Object.keys(CONTENT_TYPES).flatMap((type) => getPublishedContent(db, type));
}

export function getAllCuasIndexableContent(db) {
  return getAllPublishedContent(db).filter(isCuasIndexableRow);
}

export function publicUrl(locale, route, handle) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}/${route}/${handle}`;
}

export function stripHtml(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(value = '', maxLength = 180) {
  const clean = stripHtml(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}...`;
}

export function ensureParentDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

export function writeTextFile(filePath, content) {
  ensureParentDir(filePath);
  writeFileSync(filePath, `${content.trimEnd()}\n`, 'utf8');
}

export function readTextFileIfExists(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}
