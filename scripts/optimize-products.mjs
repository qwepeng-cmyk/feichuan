import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const TARGET_DIRS = [
    './public/products/uav-systems',
    './public/products/anti-drone',
    './public/products/security',
    './public/products/surveillance',
    './public/products/defense-eng',
    './public/products/field-hospitals',
    './public/solutions',
    './public/cases',
];

const MAX_WIDTH = 1200;
const QUALITY = 80;

let processed = 0;
let skipped = 0;
let totalOrigBytes = 0;
let totalNewBytes = 0;

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    const webpPath = filePath.replace(ext, '.webp');

    if (existsSync(webpPath)) {
        skipped++;
        return;
    }

    try {
        const stats = await fs.stat(filePath);
        const meta = await sharp(filePath).metadata();
        const targetWidth = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : meta.width;

        await sharp(filePath)
            .resize({ width: targetWidth, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(webpPath);

        const newStats = await fs.stat(webpPath);
        const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
        totalOrigBytes += stats.size;
        totalNewBytes += newStats.size;
        processed++;

        console.log(`[OK] ${path.basename(filePath)}: ${(stats.size/1024).toFixed(0)}KB -> ${(newStats.size/1024).toFixed(0)}KB (-${reduction}%)`);
    } catch (err) {
        console.error(`[ERR] ${filePath}: ${err.message}`);
    }
}

async function walkDir(dir) {
    if (!existsSync(dir)) return;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fp = path.join(dir, entry.name);
        if (entry.isDirectory()) await walkDir(fp);
        else await optimizeImage(fp);
    }
}

console.log('--- OPTIMIZING PRODUCT IMAGES TO WEBP ---');
console.log(`Max width: ${MAX_WIDTH}px, Quality: ${QUALITY}\n`);

(async () => {
    for (const dir of TARGET_DIRS) {
        await walkDir(dir);
    }
    const totalReduction = totalOrigBytes > 0
        ? ((1 - totalNewBytes / totalOrigBytes) * 100).toFixed(1)
        : '0';
    console.log(`\n--- DONE ---`);
    console.log(`Processed: ${processed}, Skipped (existing webp): ${skipped}`);
    console.log(`Total: ${(totalOrigBytes/1024/1024).toFixed(2)}MB -> ${(totalNewBytes/1024/1024).toFixed(2)}MB (-${totalReduction}%)`);
})();
