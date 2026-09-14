import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const row = await db.prepare('SELECT * FROM media WHERE id = ?').get(params.id) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        
        return NextResponse.json({
            success: true,
            data: {
                ...JSON.parse(row.raw_json || '{}'),
                id: row.id,
                title: row.title,
                title_ru: row.title_ru,
                image: row.image,
                category: row.category,
                date: row.date,
                content: row.content,
                content_ru: row.content_ru,
                is_published: row.is_published,
            },
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        body.id = body.id || params.id;
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        body.is_published = isPublished;
        const raw_json = JSON.stringify(body);
        
        await db.prepare(`
            UPDATE media
            SET title = ?, title_ru = ?, image = ?, category = ?, date = ?,
                content = ?, content_ru = ?, is_published = ?, raw_json = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(
            body.title, 
            body.title_ru || '',
            body.image || '', 
            body.category || '',
            body.date || '',
            body.content || '',
            body.content_ru || '',
            isPublished,
            raw_json, 
            params.id
        );
        
        revalidateTag('media');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const row = await db.prepare('SELECT raw_json FROM media WHERE id = ?').get(params.id) as any;

        if (!row) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }

        let rawData: any = {};
        try {
            rawData = JSON.parse(row.raw_json || '{}');
        } catch {
            rawData = {};
        }
        rawData.is_published = isPublished;

        await db.prepare(`
            UPDATE media
            SET is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `).run(isPublished, JSON.stringify(rawData), params.id);

        revalidateTag('media');
        return NextResponse.json({ success: true, is_published: isPublished });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await db.prepare('DELETE FROM media WHERE id = ?').run(params.id);
        revalidateTag('media');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
