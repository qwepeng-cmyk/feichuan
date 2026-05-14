import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Helper to double-write to JSON
function syncMediaToJson() {
    const rows = db.prepare('SELECT raw_json FROM media').all() as any[];
    const jsonData = rows.map(r => JSON.parse(r.raw_json));
    const filePath = path.join(process.cwd(), 'public/media/news_data.json');
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
}

export async function GET() {
    try {
        const rows = db.prepare('SELECT id, title, image, category, date FROM media ORDER BY created_at DESC').all();
        return NextResponse.json({ success: true, data: rows });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = body.id || body.title.toLowerCase().replace(/\\s+/g, '-');
        
        // Ensure id is present in body
        body.id = handle;

        db.prepare('INSERT INTO media (id, title, image, category, date, raw_json) VALUES (?, ?, ?, ?, ?, ?)').run(
            handle, body.title, body.image || '', body.category || '', body.date || '', JSON.stringify(body)
        );
        
        syncMediaToJson();
        revalidateTag('media');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
