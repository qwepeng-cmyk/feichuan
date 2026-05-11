import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, title_en, region_en, main_image FROM cases ORDER BY id DESC').all();
        return NextResponse.json({ success: true, data: rows });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch cases' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = body.handle || body.title_en.toLowerCase().replace(/\\s+/g, '-');
        
        db.prepare(`
            INSERT INTO cases (
                handle, title_en, title_ru, region_en, region_ru, 
                description_en, description_ru, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            handle, 
            body.title_en,
            body.title_ru || '',
            body.region_en || 'Global',
            body.region_ru || '',
            body.description_en || '',
            body.description_ru || '',
            JSON.stringify(body)
        );
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
