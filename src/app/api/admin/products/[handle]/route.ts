import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { handle: string } }) {
    try {
        const row = await db.prepare('SELECT * FROM products WHERE handle = ?').get(params.handle) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

        return NextResponse.json({
            success: true,
            data: {
                ...JSON.parse(row.raw_json || '{}'),
                handle: row.handle,
                product_name_en: row.product_name_en,
                product_name_ru: row.product_name_ru,
                category_primary: row.category_primary,
                summary_en: row.summary_en,
                summary_ru: row.summary_ru,
                key_application_en: row.key_application_en,
                key_application_ru: row.key_application_ru,
                key_parameter_1_en: row.key_parameter_1_en,
                key_parameter_1_ru: row.key_parameter_1_ru,
                key_parameter_2_en: row.key_parameter_2_en,
                key_parameter_2_ru: row.key_parameter_2_ru,
                detail_html_en: row.detail_html_en,
                detail_html_ru: row.detail_html_ru,
                main_image: row.main_image,
                is_published: row.is_published,
            },
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { handle: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const raw_json = JSON.stringify({ ...body, is_published: isPublished });
        
        // Update both the specific columns and the raw JSON
        await db.prepare(`
            UPDATE products 
            SET product_name_en = ?, product_name_ru = ?, category_primary = ?, main_image = ?, 
                summary_en = ?, summary_ru = ?, key_application_en = ?, key_application_ru = ?,
                key_parameter_1_en = ?, key_parameter_1_ru = ?, key_parameter_2_en = ?, key_parameter_2_ru = ?,
                parameters_en = ?, parameters_ru = ?, detail_html_en = ?, detail_html_ru = ?,
                is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
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
            isPublished,
            raw_json, 
            params.handle
        );
        
        revalidateTag('products');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { handle: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const row = await db.prepare('SELECT raw_json FROM products WHERE handle = ?').get(params.handle) as any;

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
            UPDATE products
            SET is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(isPublished, JSON.stringify(rawData), params.handle);

        revalidateTag('products');
        return NextResponse.json({ success: true, is_published: isPublished });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { handle: string } }) {
    try {
        await db.prepare('DELETE FROM products WHERE handle = ?').run(params.handle);
        revalidateTag('products');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
