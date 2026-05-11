import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = './data/ntet.db';
const db = new Database(dbPath);

const tables = [
    { name: 'products', columns: ['main_image'] },
    { name: 'solutions', columns: ['main_image'] },
    { name: 'cases', columns: ['main_image', 'case_images'] },
    { name: 'media', columns: ['image'] }
];

function convertToWebp(originalPath) {
    if (!originalPath) return originalPath;
    
    // Handle JSON arrays (like in case_images)
    if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
        try {
            const paths = JSON.parse(originalPath);
            const newPaths = paths.map(p => convertToWebp(p));
            return JSON.stringify(newPaths);
        } catch (e) {
            return originalPath;
        }
    }

    const ext = path.extname(originalPath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return originalPath;

    const webpPath = originalPath.replace(ext, '.webp');
    const fullWebpPath = path.join('./public', webpPath);

    if (fs.existsSync(fullWebpPath)) {
        console.log(`[UPDATE] ${originalPath} -> ${webpPath}`);
        return webpPath;
    }
    return originalPath;
}

console.log('--- STARTING DATABASE REFERENCE UPDATE ---');

db.transaction(() => {
    for (const table of tables) {
        const rows = db.prepare(`SELECT id, ${table.columns.join(', ')} FROM ${table.name}`).all();
        for (const row of rows) {
            const updates = [];
            const values = [];
            for (const col of table.columns) {
                const newValue = convertToWebp(row[col]);
                if (newValue !== row[col]) {
                    updates.push(`${col} = ?`);
                    values.push(newValue);
                }
            }
            if (updates.length > 0) {
                values.push(row.id);
                db.prepare(`UPDATE ${table.name} SET ${updates.join(', ')} WHERE id = ?`).run(...values);
            }
        }
    }
})();

console.log('--- DATABASE UPDATE COMPLETE ---');
db.close();
