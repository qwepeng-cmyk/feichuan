import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, product_name_en, category_primary, main_image FROM products ORDER BY id DESC').all();
        return NextResponse.json({ success: true, data: rows });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = body.handle || body.product_name_en.toLowerCase().replace(/\\s+/g, '-');
        
        db.prepare(`
            INSERT OR REPLACE INTO products (
                handle, product_name_en, category_primary, summary_en, 
                key_application_en, key_parameter_1_en, key_parameter_2_en, 
                parameters_en, detail_html_en, main_image, raw_json, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).run(
            handle, 
            body.product_name_en, 
            body.category_primary,
            body.summary_en || '',
            body.key_application_en || '',
            body.key_parameter_1_en || '',
            body.key_parameter_2_en || '',
            JSON.stringify(body.parameters_en || {}),
            body.detail_html_en || '',
            body.main_image || '',
            JSON.stringify(body)
        );
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
