import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

function syncMediaToJson() {
    const rows = db.prepare('SELECT raw_json FROM media').all() as any[];
    const jsonData = rows.map(r => JSON.parse(r.raw_json));
    const filePath = path.join(process.cwd(), 'public/media/news_data.json');
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const row = db.prepare('SELECT raw_json FROM media WHERE id = ?').get(params.id) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: JSON.parse(row.raw_json) });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        body.id = body.id || params.id;
        const raw_json = JSON.stringify(body);
        
        db.prepare(`
            UPDATE media 
            SET title = ?, image = ?, category = ?, date = ?, raw_json = ? 
            WHERE id = ?
        `).run(
            body.title, 
            body.image || '', 
            body.category || '',
            body.date || '',
            raw_json, 
            params.id
        );
        
        syncMediaToJson();
        revalidateTag('media');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        db.prepare('DELETE FROM media WHERE id = ?').run(params.id);
        syncMediaToJson();
        revalidateTag('media');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
