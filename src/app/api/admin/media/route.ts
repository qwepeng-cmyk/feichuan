import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { createHandle } from '@/lib/admin-utils';

// Helper to double-write to JSON
function syncMediaToJson() {
    const rows = db.prepare('SELECT raw_json FROM media WHERE COALESCE(is_published, 1) = 1 ORDER BY date DESC, created_at DESC').all() as any[];
    const jsonData = rows.map(r => JSON.parse(r.raw_json));
    const filePath = path.join(process.cwd(), 'public/media/news_data.json');
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
}

export async function GET() {
    try {
        const rows = db.prepare('SELECT id, title, image, category, date, COALESCE(is_published, 1) AS is_published FROM media ORDER BY created_at DESC').all() as any[];
        const data = rows.map((article) => ({
            ...article,
            is_public_visible: article.is_published !== 0,
        }));

        return NextResponse.json({ success: true, data });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = createHandle(body.id || body.title, 'media');
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        
        // Ensure id is present in body
        body.id = handle;
        body.is_published = isPublished;

        db.prepare(`
            INSERT INTO media (
                id, title, title_ru, image, category, date, content, content_ru, is_published, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            handle,
            body.title,
            body.title_ru || '',
            body.image || '',
            body.category || '',
            body.date || '',
            body.content || '',
            body.content_ru || '',
            isPublished,
            JSON.stringify(body)
        );
        
        syncMediaToJson();
        revalidateTag('media');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
