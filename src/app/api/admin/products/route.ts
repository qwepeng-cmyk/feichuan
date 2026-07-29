import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import { createHandle } from '@/lib/admin-utils';
import { getPublicProductCategory } from '@/lib/productCategory';

export async function GET() {
    try {
        const rows = await db.prepare('SELECT handle, product_name_en, category_primary, main_image, COALESCE(is_published, 1) AS is_published FROM products ORDER BY id DESC').all() as any[];
        const data = rows.map((product) => ({
            ...product,
            public_category: getPublicProductCategory(product.category_primary),
            is_public_visible: product.is_published !== 0,
        }));

        return NextResponse.json({ success: true, data });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = createHandle(body.handle || body.product_name_en, 'product');
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const rawData = { ...body, is_published: isPublished };
        
        await db.prepare(`
            INSERT INTO products (
                handle, product_name_en, product_name_ru, category_primary, summary_en, summary_ru,
                key_application_en, key_application_ru, key_parameter_1_en, key_parameter_1_ru, 
                key_parameter_2_en, key_parameter_2_ru, parameters_en, parameters_ru, 
                detail_html_en, detail_html_ru, main_image, is_published, raw_json, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(handle) DO UPDATE SET
                product_name_en = excluded.product_name_en,
                product_name_ru = excluded.product_name_ru,
                category_primary = excluded.category_primary,
                summary_en = excluded.summary_en,
                summary_ru = excluded.summary_ru,
                key_application_en = excluded.key_application_en,
                key_application_ru = excluded.key_application_ru,
                key_parameter_1_en = excluded.key_parameter_1_en,
                key_parameter_1_ru = excluded.key_parameter_1_ru,
                key_parameter_2_en = excluded.key_parameter_2_en,
                key_parameter_2_ru = excluded.key_parameter_2_ru,
                parameters_en = excluded.parameters_en,
                parameters_ru = excluded.parameters_ru,
                detail_html_en = excluded.detail_html_en,
                detail_html_ru = excluded.detail_html_ru,
                main_image = excluded.main_image,
                is_published = excluded.is_published,
                raw_json = excluded.raw_json,
                updated_at = CURRENT_TIMESTAMP
        `).run(
            handle, 
            body.product_name_en,
            body.product_name_ru || '',
            body.category_primary,
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
            body.main_image || '',
            isPublished,
            JSON.stringify(rawData)
        );
        revalidateTag('products');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
