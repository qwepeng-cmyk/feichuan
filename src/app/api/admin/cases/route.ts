import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';
import { createHandle } from '@/lib/admin-utils';
import { getComplianceLayer, getComplianceTier } from '@/lib/complianceTaxonomy';

export async function GET() {
    try {
        const rows = db.prepare('SELECT handle, title_en, region_en, main_image, COALESCE(is_published, 1) AS is_published FROM cases ORDER BY id DESC').all() as any[];
        const data = rows.map((caseItem) => {
            const complianceTier = getComplianceTier('case', caseItem.handle);
            const complianceLayer = getComplianceLayer(complianceTier);
            return {
                ...caseItem,
                compliance_tier: complianceTier,
                compliance_layer: complianceLayer.layer,
                compliance_layer_label: complianceLayer.label,
                compliance_layer_note: complianceLayer.note,
                is_ad_safe: complianceTier === 'normal',
                is_public_visible: caseItem.is_published !== 0 && complianceTier !== 'restricted',
            };
        });

        return NextResponse.json({ success: true, data });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch cases' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const handle = createHandle(body.handle || body.title_en, 'case');
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const rawData = { ...body, is_published: isPublished };
        
        db.prepare(`
            INSERT INTO cases (
                handle, title_en, title_ru, region_en, region_ru, country_en, country_ru,
                solution_category_id, main_image, case_images, description_en, description_ru,
                devices_en, devices_ru, parameters_en, parameters_ru, recommended_product_handles,
                is_published, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            handle, 
            body.title_en,
            body.title_ru || '',
            body.region_en || 'Global',
            body.region_ru || '',
            body.country_en || '',
            body.country_ru || '',
            body.solution_category_id || '',
            body.main_image || '',
            JSON.stringify(body.case_images || []),
            body.description_en || '',
            body.description_ru || '',
            body.devices_en || '',
            body.devices_ru || '',
            JSON.stringify(body.parameters_en || []),
            JSON.stringify(body.parameters_ru || []),
            JSON.stringify(body.recommendedProductHandles || body.recommended_product_handles || []),
            isPublished,
            JSON.stringify(rawData)
        );
        revalidateTag('cases');
        return NextResponse.json({ success: true, handle });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Create failed' }, { status: 500 });
    }
}
