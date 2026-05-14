import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { handle: string } }) {
    try {
        const row = db.prepare('SELECT raw_json FROM products WHERE handle = ?').get(params.handle) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: JSON.parse(row.raw_json) });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { handle: string } }) {
    try {
        const body = await request.json();
        const raw_json = JSON.stringify(body);
        
        // Update both the specific columns and the raw JSON
        db.prepare(`
            UPDATE products 
            SET product_name_en = ?, product_name_ru = ?, category_primary = ?, main_image = ?, 
                summary_en = ?, summary_ru = ?, key_application_en = ?, key_application_ru = ?,
                key_parameter_1_en = ?, key_parameter_1_ru = ?, key_parameter_2_en = ?, key_parameter_2_ru = ?,
                parameters_en = ?, parameters_ru = ?, detail_html_en = ?, detail_html_ru = ?,
                raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(
            body.product_name_en || body.product_name, 
            body.product_name_ru || '',
            body.category_primary, 
            body.main_image, 
            body.summary_en || '',
            body.summary_ru || '',
            body.key_application_en || '',
            body.key_application_ru || '',
            body.key_parameter_1_en || '',
            body.key_parameter_1_ru || '',
            body.key_parameter_2_en || '',
            body.key_parameter_2_ru || '',
            JSON.stringify(body.parameters_en || {}),
            JSON.stringify(body.parameters_ru || {}),
            body.detail_html_en || '',
            body.detail_html_ru || '',
            raw_json, 
            params.handle
        );
        
        revalidateTag('products');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { handle: string } }) {
    try {
        db.prepare('DELETE FROM products WHERE handle = ?').run(params.handle);
        revalidateTag('products');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
