import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import { createHandle } from '@/lib/admin-utils';

export async function GET() {
    try {
        const rows = await db.prepare('SELECT id, title, image, category, date, COALESCE(is_published, 1) AS is_published FROM media ORDER BY created_at DESC').all() as any[];
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

        await db.prepare(`
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
        
        revalidateTag('media');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
