import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, category_name, product_name_en, main_image FROM solutions ORDER BY id DESC').all();
        return NextResponse.json({ success: true, data: rows });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch solutions' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = body.handle || body.product_name_en.toLowerCase().replace(/\\s+/g, '-');
        
        db.prepare('INSERT INTO solutions (handle, category_id, category_name, product_name_en, raw_json) VALUES (?, ?, ?, ?, ?)').run(
            handle, body.category_id || 'new_category', body.category_name || 'New Category', body.product_name_en, JSON.stringify(body)
        );
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
