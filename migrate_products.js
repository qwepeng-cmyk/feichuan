const fs = require('fs');
const path = require('path');

const SQL_FILE = '/Users/mattchyi/Documents/Project/fc/cn源代码/1776325807125_dbexport_307500228/db_dump.sql';
const SOURCE_UPLOAD_DIR = '/Users/mattchyi/Documents/Project/fc/cn源代码/feichuan.feeyr.com_20260416_171449/uploadfile';
const TARGET_PRODUCT_DIR = '/Users/mattchyi/Documents/Project/fc/public/products';

// Mapping categories based on 产品中心.md
const categoryMapping = {
    '18': { slug: 'uav-platform', name_zh: '按硬件平台找', name_en: 'By Flight Platform' },
    '17': { slug: 'uav-mission', name_zh: '按行业任务找', name_en: 'By Mission & Application' },
    '7': { slug: 'anti-drone', name_zh: '反无人机系统', name_en: 'Anti-Drone Systems' },
    '11': { slug: 'surveillance', name_zh: '要地周边防护', name_en: 'Perimeter Surveillance' },
    '8': { slug: 'security', name_zh: '安检与智慧警务', name_en: 'Security Screening' },
};

function parseInsert(line) {
    const match = line.match(/INSERT INTO `(.+?)` \((.+?)\) VALUES (.+);/);
    if (!match) return null;
    const tableName = match[1];
    const columns = match[2].split(',').map(c => c.trim().replace(/`/g, ''));
    
    // Split values, handling commas inside quotes
    const valuesPart = match[3];
    const rows = [];
    let currentPos = 0;
    while (currentPos < valuesPart.length) {
        if (valuesPart[currentPos] === '(') {
            let endPos = currentPos;
            let inQuote = false;
            while (endPos < valuesPart.length) {
                if (valuesPart[endPos] === "'" && valuesPart[endPos - 1] !== "\\") inQuote = !inQuote;
                if (valuesPart[endPos] === ')' && !inQuote) break;
                endPos++;
            }
            const rowStr = valuesPart.slice(currentPos + 1, endPos);
            const rowValues = [];
            let valStart = 0;
            let valInQuote = false;
            for (let i = 0; i <= rowStr.length; i++) {
                if (rowStr[i] === "'" && rowStr[i-1] !== "\\") valInQuote = !valInQuote;
                if ((rowStr[i] === ',' || i === rowStr.length) && !valInQuote) {
                    let val = rowStr.slice(valStart, i).trim();
                    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
                    rowValues.push(val === 'NULL' ? null : val);
                    valStart = i + 1;
                }
            }
            const obj = {};
            columns.forEach((col, idx) => obj[col] = rowValues[idx]);
            rows.push(obj);
            currentPos = endPos + 1;
        } else {
            currentPos++;
        }
    }
    return { tableName, rows };
}

async function migrate() {
    console.log('Starting migration...');
    const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
    const lines = sqlContent.split('\n');

    const products = [];
    const productData = {};
    const attachments = {};
    const categories = {};

    for (const line of lines) {
        if (!line.startsWith('INSERT INTO')) continue;
        const parsed = parseInsert(line);
        if (!parsed) continue;

        if (parsed.tableName === 'dr_1_product') products.push(...parsed.rows);
        if (parsed.tableName === 'dr_1_product_data_0') parsed.rows.forEach(r => productData[r.id] = r);
        if (parsed.tableName === 'dr_attachment_data') parsed.rows.forEach(r => attachments[r.id] = r.attachment);
    }

    console.log(`Parsed ${products.length} products, ${Object.keys(attachments).length} attachments.`);

    if (!fs.existsSync(TARGET_PRODUCT_DIR)) fs.mkdirSync(TARGET_PRODUCT_DIR, { recursive: true });

    const migrationResults = [];

    for (const p of products) {
        const detail = productData[p.id] || {};
        const thumbPath = attachments[p.thumb];
        const category = categoryMapping[p.catid] || { slug: 'other', name_zh: '其他', name_en: 'Other' };

        const targetDir = path.join(TARGET_PRODUCT_DIR, category.slug);
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

        let newImagePath = null;
        if (thumbPath) {
            const sourceFile = path.join(SOURCE_UPLOAD_DIR, thumbPath);
            const ext = path.extname(thumbPath);
            const targetFileName = `${p.title.replace(/[\/\\?%*:|"<>]/g, '-')}${ext}`;
            const targetFile = path.join(targetDir, targetFileName);

            if (fs.existsSync(sourceFile)) {
                fs.copyFileSync(sourceFile, targetFile);
                newImagePath = `/products/${category.slug}/${targetFileName}`;
            } else {
                console.warn(`Source file not found: ${sourceFile} for product ${p.title}`);
            }
        }

        migrationResults.push({
            id: p.id,
            cat_slug: category.slug,
            cat_name_zh: category.name_zh,
            cat_name_en: category.name_en,
            title_zh: p.title,
            model: p.xinghao || '',
            image: newImagePath,
            keywords: p.keywords,
            desc: p.description,
            subtitle: p.sub_title,
            content: detail.content || ''
        });
    }

    fs.writeFileSync('/Users/mattchyi/Documents/Project/fc/migration_data.json', JSON.stringify(migrationResults, null, 2));
    console.log(`Migration complete. Metadata saved to migration_data.json`);
}

migrate().catch(console.error);
