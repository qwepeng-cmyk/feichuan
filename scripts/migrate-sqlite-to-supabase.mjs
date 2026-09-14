import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Database from 'better-sqlite3';
import postgres from 'postgres';

const root = process.cwd();
const envPath = path.join(root, '.env.local');

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
}

const databaseUrl = process.env.SUPABASE_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('SUPABASE_DATABASE_URL is required.');
}

const sqlitePath = path.join(root, 'data', 'ntet.db');
const migrationPath = path.join(
  root,
  'supabase',
  'migrations',
  '202607290001_initial_ntet.sql',
);

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

const conflictColumns = {
  products: 'handle',
  solutions: 'handle',
  cases: 'handle',
  media: 'id',
  inquiries: 'id',
  site_settings: 'key',
};

function quoteIdentifier(value) {
  return `"${value.replaceAll('"', '""')}"`;
}

const sqlite = new Database(sqlitePath, { readonly: true });
const sql = postgres(databaseUrl, {
  max: 1,
  connect_timeout: 15,
  prepare: false,
});

try {
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');
  await sql.unsafe(migrationSql);

  const summary = {};

  await sql.begin(async (transaction) => {
    for (const [table, columns] of Object.entries(tableColumns)) {
      const availableColumns = new Set(
        sqlite.prepare(`PRAGMA table_info(${quoteIdentifier(table)})`).all()
          .map((column) => column.name),
      );
      const selectedColumns = columns.filter((column) => availableColumns.has(column));
      const rows = sqlite.prepare(
        `SELECT ${selectedColumns.map(quoteIdentifier).join(', ')} FROM ${quoteIdentifier(table)}`,
      ).all();

      const conflictColumn = conflictColumns[table];
      const updateColumns = selectedColumns.filter(
        (column) => column !== conflictColumn && column !== 'id',
      );
      const placeholders = selectedColumns.map((_, index) => `$${index + 1}`);
      const statement = `
        INSERT INTO ${quoteIdentifier(table)}
          (${selectedColumns.map(quoteIdentifier).join(', ')})
        VALUES (${placeholders.join(', ')})
        ON CONFLICT (${quoteIdentifier(conflictColumn)}) DO UPDATE SET
          ${updateColumns.map((column) =>
            `${quoteIdentifier(column)} = EXCLUDED.${quoteIdentifier(column)}`,
          ).join(', ')}
      `;

      for (const row of rows) {
        await transaction.unsafe(
          statement,
          selectedColumns.map((column) => row[column]),
        );
      }

      summary[table] = rows.length;
    }

    for (const table of ['products', 'solutions', 'cases', 'inquiries']) {
      await transaction.unsafe(`
        SELECT setval(
          pg_get_serial_sequence('${table}', 'id'),
          COALESCE((SELECT MAX(id) FROM ${quoteIdentifier(table)}), 1),
          (SELECT COUNT(*) > 0 FROM ${quoteIdentifier(table)})
        )
      `);
    }
  });

  console.log(JSON.stringify({ migrated: true, tables: summary }, null, 2));
} finally {
  sqlite.close();
  await sql.end({ timeout: 2 });
}
