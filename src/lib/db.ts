import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DATABASE_URL 
    ? path.resolve(process.cwd(), process.env.DATABASE_URL)
    : path.join(dataDir, 'ntet.db');

// Create database instance
const db = new Database(dbPath, { verbose: undefined }); // Set verbose to console.log for debugging

// Initialize tables
db.exec(`
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

    CREATE TABLE IF NOT EXISTS compliance_terms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term TEXT NOT NULL UNIQUE,
        replacement TEXT NOT NULL DEFAULT '',
        locale TEXT NOT NULL DEFAULT 'all',
        severity TEXT NOT NULL DEFAULT 'restricted',
        is_enabled INTEGER DEFAULT 1,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS compliance_content_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_type TEXT NOT NULL,
        handle TEXT NOT NULL,
        tier TEXT NOT NULL,
        note TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(content_type, handle)
    );

    -- Optimized Indexes for Performance
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_primary);
    CREATE INDEX IF NOT EXISTS idx_solutions_category ON solutions(category_id);
    CREATE INDEX IF NOT EXISTS idx_cases_solution_category ON cases(solution_category_id);
    CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
    CREATE INDEX IF NOT EXISTS idx_products_handle ON products(handle);
    CREATE INDEX IF NOT EXISTS idx_solutions_handle ON solutions(handle);
    CREATE INDEX IF NOT EXISTS idx_cases_handle ON cases(handle);
    CREATE INDEX IF NOT EXISTS idx_compliance_terms_enabled ON compliance_terms(is_enabled);
    CREATE INDEX IF NOT EXISTS idx_compliance_rules_lookup ON compliance_content_rules(content_type, handle);
`);

function ensureColumn(table: string, column: string, definition: string) {
    const columns = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
    if (!columns.some((item) => item.name === column)) {
        try {
            db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
        } catch (error) {
            if (!(error instanceof Error) || !error.message.includes('duplicate column name')) {
                throw error;
            }
        }
    }
}

ensureColumn('products', 'is_published', 'INTEGER DEFAULT 1');
ensureColumn('solutions', 'is_published', 'INTEGER DEFAULT 1');
ensureColumn('cases', 'is_published', 'INTEGER DEFAULT 1');
ensureColumn('media', 'is_published', 'INTEGER DEFAULT 1');
db.exec(`
    CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);
    CREATE INDEX IF NOT EXISTS idx_solutions_published ON solutions(is_published);
    CREATE INDEX IF NOT EXISTS idx_cases_published ON cases(is_published);
    CREATE INDEX IF NOT EXISTS idx_media_published ON media(is_published);
`);

export default db;
