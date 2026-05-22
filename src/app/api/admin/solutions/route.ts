import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import { createHandle } from '@/lib/admin-utils';
import { getComplianceLayer, getComplianceTier } from '@/lib/complianceTaxonomy';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, category_name, product_name_en, main_image, COALESCE(is_published, 1) AS is_published FROM solutions ORDER BY id DESC').all() as any[];
        const data = rows.map((solution) => {
            const complianceTier = getComplianceTier('solution', solution.handle);
            const complianceLayer = getComplianceLayer(complianceTier);
            return {
                ...solution,
                compliance_tier: complianceTier,
                compliance_layer: complianceLayer.layer,
                compliance_layer_label: complianceLayer.label,
                compliance_layer_note: complianceLayer.note,
                is_ad_safe: complianceTier === 'normal',
                is_public_visible: solution.is_published !== 0 && complianceTier !== 'restricted',
            };
        });

        return NextResponse.json({ success: true, data });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch solutions' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = createHandle(body.handle || body.product_name_en, 'solution');
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const rawData = { ...body, is_published: isPublished };
        
        db.prepare(`
            INSERT INTO solutions (
                handle, category_id, category_name, product_name_en, product_name_ru, 
                summary_en, summary_ru, key_application_en, key_application_ru,
                parameters_en, parameters_ru, detail_html_en, detail_html_ru,
                main_image, recommended_products, is_published, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            handle, 
            body.category_id || 'new_category', 
            body.category_name || 'New Category', 
            body.product_name_en,
            body.product_name_ru || '',
            body.summary_en || '',
            body.summary_ru || '',
            body.key_application_en || '',
            body.key_application_ru || '',
            JSON.stringify(body.parameters_en || []),
            JSON.stringify(body.parameters_ru || []),
            body.detail_html_en || '',
            body.detail_html_ru || '',
            body.main_image || '',
            JSON.stringify(body.recommended_products || []),
            isPublished,
            JSON.stringify(rawData)
        );
        revalidateTag('solutions');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
