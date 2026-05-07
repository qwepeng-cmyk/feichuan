import fs from 'fs';
import path from 'path';
import db from '../src/lib/db';

const DATA_DIR = path.join(process.cwd(), '网站资料');
const SOLUTIONS_DIR = path.join(DATA_DIR, '08方案概括');
const CASES_DIR = path.join(process.cwd(), 'public/cases');
const MEDIA_FILE = path.join(process.cwd(), 'public/media/news_data.json');

// Map for product categories based on original code
const DIR_MAP: Record<string, string> = {
  '01大无人机': 'uav-drone-systems',
  '02反无设备': 'anti-drone-cuas',
  '03智慧警务': 'security-screening',
  '04工程补给': 'defense-engineering',
  '05野战医院': 'field-hospitals',
  '06要地防护': 'perimeter-intelligence'
};

const CATEGORY_MAP: Record<string, string> = {
    '01_BorderPatrol': 'Border Patrol',
    '02_InfrastructureProtection': 'Infrastructure Protection',
    '03_KeyAreaSecurity': 'Key Area Security',
    '04_EmergencyRescue': 'Emergency & Disaster Rescue'
};

function migrateProducts() {
    console.log('Migrating products...');
    const insert = db.prepare(`
        INSERT OR REPLACE INTO products (
            handle, product_name_en, category_primary, summary_en, 
            key_application_en, key_parameter_1_en, key_parameter_2_en, 
            parameters_en, detail_html_en, 
            product_name_ru, summary_ru, key_application_ru, 
            key_parameter_1_ru, key_parameter_2_ru, parameters_ru, detail_html_ru,
            main_image, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let count = 0;
    const folders = Object.keys(DIR_MAP);

    for (const folder of folders) {
        const folderPath = path.join(DATA_DIR, folder);
        if (!fs.existsSync(folderPath)) continue;

        const items = fs.readdirSync(folderPath);
        for (const item of items) {
            const itemPath = path.join(folderPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                const subFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.json'));
                for (const file of subFiles) {
                    processProduct(path.join(itemPath, file), DIR_MAP[folder], insert, () => count++);
                }
            } else if (item.endsWith('.json')) {
                processProduct(itemPath, DIR_MAP[folder], insert, () => count++);
            }
        }
    }
    console.log(`Migrated ${count} products.`);
}

function processProduct(filePath: string, categoryId: string, stmt: any, inc: () => void) {
    try {
        const rawJson = fs.readFileSync(filePath, 'utf-8');
        const content = JSON.parse(rawJson);
        const handle = content.handle || path.basename(filePath, '.json').toLowerCase().replace(/\s+/g, '-');
        
        stmt.run(
            handle,
            content.product_name_en || content.Product_Name_en || content.product_name || path.basename(filePath, '.json'),
            categoryId,
            content.summary_en || '',
            content.key_application_en || '',
            content.key_parameter_1_en || '',
            content.key_parameter_2_en || '',
            JSON.stringify(content.parameters_en || content.parameters || {}),
            content.detail_html_en || '',
            content.product_name_ru || '',
            content.summary_ru || '',
            content.key_application_ru || '',
            content.key_parameter_1_ru || '',
            content.key_parameter_2_ru || '',
            JSON.stringify(content.parameters_ru || {}),
            content.detail_html_ru || '',
            content.main_image || (content.Product_Images && content.Product_Images[0]) || (content.product_images && content.product_images[0]) || '/placeholder.png',
            rawJson
        );
        inc();
    } catch (e) {
        console.error("Error parsing product file:", filePath, e);
    }
}

function migrateSolutions() {
    console.log('Migrating solutions...');
    const insert = db.prepare(`
        INSERT OR REPLACE INTO solutions (
            handle, category_id, category_name, product_name_en, 
            summary_en, key_application_en, parameters_en, detail_html_en, 
            product_name_ru, summary_ru, key_application_ru, 
            key_parameter_1_ru, key_parameter_2_ru, parameters_ru, detail_html_ru,
            main_image, recommended_products, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let count = 0;
    const categories = Object.keys(CATEGORY_MAP);

    for (const cat of categories) {
        const catPath = path.join(SOLUTIONS_DIR, cat);
        if (!fs.existsSync(catPath)) continue;

        const files = fs.readdirSync(catPath).filter(f => f.endsWith('.json'));
        for (const file of files) {
            try {
                const rawJson = fs.readFileSync(path.join(catPath, file), 'utf8');
                const data = JSON.parse(rawJson);
                const handle = data.handle || file.replace('.json', '');

                insert.run(
                    handle,
                    cat,
                    CATEGORY_MAP[cat],
                    data.product_name_en || '',
                    data.summary_en || '',
                    data.key_application_en || '',
                    JSON.stringify(data.parameters_en || {}),
                    data.detail_html_en || '',
                    data.product_name_ru || '',
                    data.summary_ru || '',
                    data.key_application_ru || '',
                    data.key_parameter_1_ru || '',
                    data.key_parameter_2_ru || '',
                    JSON.stringify(data.parameters_ru || {}),
                    data.detail_html_ru || '',
                    data.main_image || '',
                    JSON.stringify(data.recommended_products || []),
                    rawJson
                );
                count++;
            } catch (e) {
                console.error("Error parsing solution file:", file, e);
            }
        }
    }
    console.log(`Migrated ${count} solutions.`);
}

function migrateCases() {
    console.log('Migrating cases...');
    const insert = db.prepare(`
        INSERT OR REPLACE INTO cases (
            handle, title_en, description_en, devices_en, parameters_en,
            title_ru, description_ru, devices_ru, parameters_ru,
            main_image, case_images, region_en, country_en, 
            region_ru, country_ru,
            solution_category_id, recommended_product_handles, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    if (!fs.existsSync(CASES_DIR)) return;
    const fileNames = fs.readdirSync(CASES_DIR);
    let count = 0;

    for (const fileName of fileNames) {
        if (fileName.endsWith('.json') && fileName !== 'cases_data.json') {
            const fullPath = path.join(CASES_DIR, fileName);
            try {
                const rawJson = fs.readFileSync(fullPath, 'utf8');
                const data = JSON.parse(rawJson);
                
                insert.run(
                    data.handle,
                    data.title_en || '',
                    data.description_en || '',
                    JSON.stringify(data.devices_en || []),
                    JSON.stringify(data.parameters_en || []),
                    data.title_ru || '',
                    data.description_ru || '',
                    JSON.stringify(data.devices_ru || []),
                    JSON.stringify(data.parameters_ru || []),
                    data.main_image || '',
                    JSON.stringify(data.case_images || []),
                    data.region_en || '',
                    data.country_en || '',
                    data.region_ru || '',
                    data.country_ru || '',
                    data.solution_category_id || '',
                    JSON.stringify(data.recommendedProductHandles || []),
                    rawJson
                );
                count++;
            } catch (e) {
                console.error("Error parsing case file:", fileName, e);
            }
        }
    }
    console.log(`Migrated ${count} cases.`);
}

function migrateMedia() {
    console.log('Migrating media...');
    const insert = db.prepare(`
        INSERT OR REPLACE INTO media (
            id, category, title, date, image, content, 
            title_ru, content_ru, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    try {
        const rawJson = fs.readFileSync(MEDIA_FILE, 'utf8');
        const data = JSON.parse(rawJson);
        let count = 0;
        
        for (const item of data) {
            insert.run(
                item.id,
                item.category,
                item.title,
                item.date,
                item.image || '',
                item.content || '',
                item.title_ru || '',
                item.content_ru || '',
                JSON.stringify(item)
            );
            count++;
        }
        console.log(`Migrated ${count} media items.`);
    } catch (e) {
        console.error("Error parsing media file:", e);
    }
}

// Run all migrations
try {
    migrateProducts();
    migrateSolutions();
    migrateCases();
    migrateMedia();
    console.log('✅ Migration to SQLite completed successfully.');
} catch (e) {
    console.error('Migration failed:', e);
}
