import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Database from 'better-sqlite3';
import postgres from 'postgres';

const root = process.cwd();
const envPath = path.join(root, '.env.local');

if (fs.existsSync(envPath)) {
  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
}

const databaseUrl = process.env.SUPABASE_DATABASE_URL;
if (!databaseUrl) throw new Error('SUPABASE_DATABASE_URL is required for migration.');

const outputPath = path.resolve(
  root,
  process.env.SQLITE_MIGRATION_OUTPUT || path.join('scratch', 'skysafetech-ntet.db'),
);
if (fs.existsSync(outputPath) && process.env.MIGRATION_OVERWRITE !== '1') {
  throw new Error(`Migration output already exists: ${outputPath}`);
}
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
for (const suffix of ['', '-wal', '-shm']) {
  const candidate = `${outputPath}${suffix}`;
  if (fs.existsSync(candidate)) fs.rmSync(candidate);
}

const schema = `
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    product_name_en TEXT NOT NULL,
    category_primary TEXT NOT NULL,
    summary_en TEXT, key_application_en TEXT, key_parameter_1_en TEXT,
    key_parameter_2_en TEXT, parameters_en TEXT, detail_html_en TEXT,
    product_name_ru TEXT, summary_ru TEXT, key_application_ru TEXT,
    key_parameter_1_ru TEXT, key_parameter_2_ru TEXT, parameters_ru TEXT,
    detail_html_ru TEXT, main_image TEXT, is_published INTEGER DEFAULT 1,
    raw_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    product_name_en TEXT NOT NULL,
    summary_en TEXT, key_application_en TEXT, parameters_en TEXT,
    detail_html_en TEXT, product_name_ru TEXT, summary_ru TEXT,
    key_application_ru TEXT, key_parameter_1_ru TEXT, key_parameter_2_ru TEXT,
    parameters_ru TEXT, detail_html_ru TEXT, main_image TEXT,
    recommended_products TEXT, is_published INTEGER DEFAULT 1,
    raw_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    handle TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    description_en TEXT, devices_en TEXT, parameters_en TEXT,
    title_ru TEXT, description_ru TEXT, devices_ru TEXT, parameters_ru TEXT,
    main_image TEXT, case_images TEXT, region_en TEXT, country_en TEXT,
    region_ru TEXT, country_ru TEXT, solution_category_id TEXT,
    recommended_product_handles TEXT, is_published INTEGER DEFAULT 1,
    raw_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE media (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    image TEXT, content TEXT, title_ru TEXT, content_ru TEXT,
    is_published INTEGER DEFAULT 1, raw_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT, email TEXT NOT NULL, contact_method TEXT, country_code TEXT,
    phone TEXT, demands TEXT, message TEXT, source_page TEXT,
    is_read INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX idx_products_category ON products(category_primary);
  CREATE INDEX idx_products_handle ON products(handle);
  CREATE INDEX idx_products_published ON products(is_published);
  CREATE INDEX idx_solutions_category ON solutions(category_id);
  CREATE INDEX idx_solutions_handle ON solutions(handle);
  CREATE INDEX idx_solutions_published ON solutions(is_published);
  CREATE INDEX idx_cases_solution_category ON cases(solution_category_id);
  CREATE INDEX idx_cases_handle ON cases(handle);
  CREATE INDEX idx_cases_published ON cases(is_published);
  CREATE INDEX idx_media_category ON media(category);
  CREATE INDEX idx_media_published ON media(is_published);
  CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
`;

const tableColumns = {
  products: [
    'id', 'handle', 'product_name_en', 'category_primary', 'summary_en',
    'key_application_en', 'key_parameter_1_en', 'key_parameter_2_en',
    'parameters_en', 'detail_html_en', 'product_name_ru', 'summary_ru',
    'key_application_ru', 'key_parameter_1_ru', 'key_parameter_2_ru',
    'parameters_ru', 'detail_html_ru', 'main_image', 'is_published',
    'raw_json', 'created_at', 'updated_at',
  ],
  solutions: [
    'id', 'handle', 'category_id', 'category_name', 'product_name_en',
    'summary_en', 'key_application_en', 'parameters_en', 'detail_html_en',
    'product_name_ru', 'summary_ru', 'key_application_ru',
    'key_parameter_1_ru', 'key_parameter_2_ru', 'parameters_ru',
    'detail_html_ru', 'main_image', 'recommended_products', 'is_published',
    'raw_json', 'created_at', 'updated_at',
  ],
  cases: [
    'id', 'handle', 'title_en', 'description_en', 'devices_en',
    'parameters_en', 'title_ru', 'description_ru', 'devices_ru',
    'parameters_ru', 'main_image', 'case_images', 'region_en', 'country_en',
    'region_ru', 'country_ru', 'solution_category_id',
    'recommended_product_handles', 'is_published', 'raw_json', 'created_at',
    'updated_at',
  ],
  media: [
    'id', 'category', 'title', 'date', 'image', 'content', 'title_ru',
    'content_ru', 'is_published', 'raw_json', 'created_at', 'updated_at',
  ],
  inquiries: [
    'id', 'name', 'company', 'email', 'contact_method', 'country_code',
    'phone', 'demands', 'message', 'source_page', 'is_read', 'created_at',
  ],
  site_settings: ['key', 'value', 'updated_at'],
};

function sqliteValue(value) {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'bigint') return Number(value);
  if (value && typeof value === 'object') return JSON.stringify(value);
  return value;
}

const sql = postgres(databaseUrl, {
  max: 1,
  connect_timeout: 15,
  prepare: false,
});
const sqlite = new Database(outputPath);

try {
  sqlite.pragma('journal_mode = DELETE');
  sqlite.pragma('synchronous = FULL');
  sqlite.exec(schema);

  const summary = {};
  const migrate = sqlite.transaction((snapshots) => {
    for (const [table, rows] of Object.entries(snapshots)) {
      const columns = tableColumns[table];
      const placeholders = columns.map(() => '?').join(', ');
      const insert = sqlite.prepare(
        `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
      );
      for (const row of rows) {
        insert.run(...columns.map((column) => sqliteValue(row[column])));
      }
      summary[table] = rows.length;
    }
  });

  const snapshots = {};
  await sql.begin('isolation level repeatable read read only', async (tx) => {
    for (const table of Object.keys(tableColumns)) {
      snapshots[table] = await tx.unsafe(`SELECT * FROM ${table} ORDER BY 1`);
    }
  });
  migrate(snapshots);

  const integrity = sqlite.pragma('integrity_check', { simple: true });
  const counts = Object.fromEntries(
    Object.keys(tableColumns).map((table) => [
      table,
      sqlite.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count,
    ]),
  );
  console.log(JSON.stringify({ outputPath, integrity, sourceRows: summary, sqliteRows: counts }, null, 2));
} finally {
  sqlite.close();
  await sql.end({ timeout: 2 });
}
