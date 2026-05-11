import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TARGET_DIR = './public';
const SIZE_THRESHOLD = 500 * 1024; // 500KB

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    try {
        const stats = await fs.stat(filePath);
        if (stats.size < SIZE_THRESHOLD) return;

        console.log(`\n[OPTIMIZING] ${filePath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);

        const webpPath = filePath.replace(ext, '.webp');
        
        // Convert to WebP with 80% quality
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        const newStats = await fs.stat(webpPath);
        const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
        
        console.log(`[SUCCESS] Created: ${webpPath} (${(newStats.size / 1024).toFixed(0)}KB) - Reduced by ${reduction}%`);
        
        // Optionally: You can delete the original file here if you are confident.
        // For safety, we will keep both for now and I will update code to point to .webp
    } catch (err) {
        console.error(`[ERROR] Processing ${filePath}:`, err.message);
    }
}

async function walkDir(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) {
            await walkDir(filePath);
        } else {
            await optimizeImage(filePath);
        }
    }
}

console.log('--- STARTING IMAGE OPTIMIZATION ---');
walkDir(TARGET_DIR).then(() => {
    console.log('\n--- OPTIMIZATION COMPLETE ---');
});
