import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import { createHandle } from '@/lib/admin-utils';
import { getComplianceLayer, getComplianceTier, getPublicProductCategory } from '@/lib/complianceTaxonomy';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, product_name_en, category_primary, main_image, COALESCE(is_published, 1) AS is_published FROM products ORDER BY id DESC').all() as any[];
        const data = rows.map((product) => {
            const complianceTier = getComplianceTier('product', product.handle);
            const complianceLayer = getComplianceLayer(complianceTier);
            return {
                ...product,
                public_category: getPublicProductCategory(product.category_primary),
                compliance_tier: complianceTier,
                compliance_layer: complianceLayer.layer,
                compliance_layer_label: complianceLayer.label,
                compliance_layer_note: complianceLayer.note,
                is_ad_safe: complianceTier === 'normal',
                is_public_visible: product.is_published !== 0 && complianceTier !== 'restricted',
            };
        });

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
        
        db.prepare(`
            INSERT OR REPLACE INTO products (
                handle, product_name_en, product_name_ru, category_primary, summary_en, summary_ru,
                key_application_en, key_application_ru, key_parameter_1_en, key_parameter_1_ru, 
                key_parameter_2_en, key_parameter_2_ru, parameters_en, parameters_ru, 
                detail_html_en, detail_html_ru, main_image, is_published, raw_json, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
