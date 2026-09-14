import 'server-only';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

type QueryRow = Record<string, unknown>;

export interface RunResult {
  changes: number;
  lastInsertRowid?: number | string;
}

interface PreparedStatement {
  all(...parameters: any[]): QueryRow[];
  get(...parameters: any[]): QueryRow | undefined;
  run(...parameters: any[]): RunResult;
}

interface DatabaseAdapter {
  prepare(query: string): PreparedStatement;
  transaction<T>(callback: (transactionDb: DatabaseAdapter) => T): T;
}

function resolveDatabasePath() {
  const configuredPath = process.env.SQLITE_DATABASE_PATH || process.env.DATABASE_PATH;
  if (!configuredPath) return path.join(process.cwd(), 'data', 'ntet.db');
  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(process.cwd(), configuredPath);
}

const databasePath = resolveDatabasePath();
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const globalDatabase = globalThis as typeof globalThis & {
  ntetSqlite?: Database.Database;
};

const sqlite = globalDatabase.ntetSqlite ?? new Database(databasePath);
globalDatabase.ntetSqlite = sqlite;

sqlite.pragma('busy_timeout = 5000');
sqlite.pragma('foreign_keys = ON');
if (process.env.SQLITE_DISABLE_WAL !== '1') {
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
}

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    product_name_en TEXT NOT NULL,
    category_primary TEXT NOT NULL,
    summary_en TEXT,
    key_application_en TEXT,
    key_parameter_1_en TEXT,
    key_parameter_2_en TEXT,
    parameters_en TEXT,
    detail_html_en TEXT,
    product_name_ru TEXT,
    summary_ru TEXT,
    key_application_ru TEXT,
    key_parameter_1_ru TEXT,
    key_parameter_2_ru TEXT,
    parameters_ru TEXT,
    detail_html_ru TEXT,
    main_image TEXT,
    is_published INTEGER DEFAULT 1,
    raw_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    product_name_en TEXT NOT NULL,
    summary_en TEXT,
    key_application_en TEXT,
    parameters_en TEXT,
    detail_html_en TEXT,
    product_name_ru TEXT,
    summary_ru TEXT,
    key_application_ru TEXT,
    key_parameter_1_ru TEXT,
    key_parameter_2_ru TEXT,
    parameters_ru TEXT,
    detail_html_ru TEXT,
    main_image TEXT,
    recommended_products TEXT,
    is_published INTEGER DEFAULT 1,
    raw_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    description_en TEXT,
    devices_en TEXT,
    parameters_en TEXT,
    title_ru TEXT,
    description_ru TEXT,
    devices_ru TEXT,
    parameters_ru TEXT,
    main_image TEXT,
    case_images TEXT,
    region_en TEXT,
    country_en TEXT,
    region_ru TEXT,
    country_ru TEXT,
    solution_category_id TEXT,
    recommended_product_handles TEXT,
    is_published INTEGER DEFAULT 1,
    raw_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    image TEXT,
    content TEXT,
    title_ru TEXT,
    content_ru TEXT,
    is_published INTEGER DEFAULT 1,
    raw_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    contact_method TEXT,
    country_code TEXT,
    phone TEXT,
    demands TEXT,
    message TEXT,
    source_page TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_primary);
  CREATE INDEX IF NOT EXISTS idx_products_handle ON products(handle);
  CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);
  CREATE INDEX IF NOT EXISTS idx_solutions_category ON solutions(category_id);
  CREATE INDEX IF NOT EXISTS idx_solutions_handle ON solutions(handle);
  CREATE INDEX IF NOT EXISTS idx_solutions_published ON solutions(is_published);
  CREATE INDEX IF NOT EXISTS idx_cases_solution_category ON cases(solution_category_id);
  CREATE INDEX IF NOT EXISTS idx_cases_handle ON cases(handle);
  CREATE INDEX IF NOT EXISTS idx_cases_published ON cases(is_published);
  CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
  CREATE INDEX IF NOT EXISTS idx_media_published ON media(is_published);
  CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
`);

function wrapStatement(statement: Database.Statement): PreparedStatement {
  return {
    all(...parameters: any[]) {
      return statement.all(...parameters) as QueryRow[];
    },
    get(...parameters: any[]) {
      return statement.get(...parameters) as QueryRow | undefined;
    },
    run(...parameters: any[]) {
      const result = statement.run(...parameters);
      return {
        changes: result.changes,
        lastInsertRowid: typeof result.lastInsertRowid === 'bigint'
          ? result.lastInsertRowid.toString()
          : result.lastInsertRowid,
      };
    },
  };
}

const db: DatabaseAdapter = {
  prepare(query: string) {
    return wrapStatement(sqlite.prepare(query));
  },
  transaction<T>(callback: (transactionDb: DatabaseAdapter) => T) {
    return sqlite.transaction(() => callback(db))();
  },
};

export { databasePath };
export default db;
