import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const row = db.prepare('SELECT raw_json, COALESCE(is_published, 1) AS is_published FROM solutions WHERE handle = ?').get(params.id) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: { ...JSON.parse(row.raw_json), is_published: row.is_published } });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const raw_json = JSON.stringify({ ...body, is_published: isPublished });
        
        db.prepare(`
            UPDATE solutions 
            SET product_name_en = ?, product_name_ru = ?, category_id = ?, category_name = ?, main_image = ?, 
                summary_en = ?, summary_ru = ?, key_application_en = ?, key_application_ru = ?,
                key_parameter_1_ru = ?, key_parameter_2_ru = ?,
                parameters_en = ?, parameters_ru = ?, detail_html_en = ?, detail_html_ru = ?, recommended_products = ?,
                is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(
            body.product_name_en || body.product_name, 
            body.product_name_ru || '',
            body.category_id || '',
            body.category_name || '',
            body.main_image || '', 
            body.summary_en || '',
            body.summary_ru || '',
            body.key_application_en || '',
            body.key_application_ru || '',
            body.key_parameter_1_ru || '',
            body.key_parameter_2_ru || '',
            JSON.stringify(body.parameters_en || []),
            JSON.stringify(body.parameters_ru || []),
            body.detail_html_en || '',
            body.detail_html_ru || '',
            JSON.stringify(body.recommended_products || []),
            isPublished,
            raw_json, 
            params.id
        );
        
        revalidateTag('solutions');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const row = db.prepare('SELECT raw_json FROM solutions WHERE handle = ?').get(params.id) as any;

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

        db.prepare(`
            UPDATE solutions
            SET is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(isPublished, JSON.stringify(rawData), params.id);

        revalidateTag('solutions');
        return NextResponse.json({ success: true, is_published: isPublished });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        db.prepare('DELETE FROM solutions WHERE handle = ?').run(params.id);
        revalidateTag('solutions');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
