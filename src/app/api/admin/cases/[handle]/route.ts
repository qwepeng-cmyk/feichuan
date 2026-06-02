import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { handle: string } }) {
    try {
        const row = db.prepare('SELECT * FROM cases WHERE handle = ?').get(params.handle) as any;
        if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        
        let caseImages: any = row.case_images;
        let recommendedProductHandles: any = row.recommended_product_handles;
        try {
            caseImages = row.case_images ? JSON.parse(row.case_images) : [];
        } catch {}
        try {
            recommendedProductHandles = row.recommended_product_handles ? JSON.parse(row.recommended_product_handles) : [];
        } catch {}

        return NextResponse.json({
            success: true,
            data: {
                ...JSON.parse(row.raw_json || '{}'),
                handle: row.handle,
                title_en: row.title_en,
                title_ru: row.title_ru,
                region_en: row.region_en,
                region_ru: row.region_ru,
                country_en: row.country_en,
                country_ru: row.country_ru,
                solution_category_id: row.solution_category_id,
                main_image: row.main_image,
                case_images: caseImages,
                description_en: row.description_en,
                description_ru: row.description_ru,
                devices_en: row.devices_en,
                devices_ru: row.devices_ru,
                recommendedProductHandles,
                recommended_product_handles: recommendedProductHandles,
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
        
        db.prepare(`
            UPDATE cases 
            SET title_en = ?, title_ru = ?, region_en = ?, region_ru = ?, country_en = ?, country_ru = ?, 
                solution_category_id = ?, main_image = ?, case_images = ?,
                description_en = ?, description_ru = ?, devices_en = ?, devices_ru = ?, 
                parameters_en = ?, parameters_ru = ?, recommended_product_handles = ?,
                is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(
            body.title_en || body.title, 
            body.title_ru || '',
            body.region_en || '',
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
            raw_json, 
            params.handle
        );
        
        revalidateTag('cases');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { handle: string } }) {
    try {
        const body = await request.json();
        const isPublished = body.is_published === false || body.is_published === 0 ? 0 : 1;
        const row = db.prepare('SELECT raw_json FROM cases WHERE handle = ?').get(params.handle) as any;

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
            UPDATE cases
            SET is_published = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(isPublished, JSON.stringify(rawData), params.handle);

        revalidateTag('cases');
        return NextResponse.json({ success: true, is_published: isPublished });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { handle: string } }) {
    try {
        db.prepare('DELETE FROM cases WHERE handle = ?').run(params.handle);
        revalidateTag('cases');
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
