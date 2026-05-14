import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db from '@/lib/db';

export async function GET(request: Request, { params }: { params: { handle: string } }) {
    try {
        const row = db.prepare('SELECT raw_json FROM cases WHERE handle = ?').get(params.handle) as any;
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
        
        db.prepare(`
            UPDATE cases 
            SET title_en = ?, title_ru = ?, region_en = ?, region_ru = ?, country_en = ?, country_ru = ?, 
                solution_category_id = ?, main_image = ?, 
                description_en = ?, description_ru = ?, devices_en = ?, devices_ru = ?, 
                parameters_en = ?, parameters = ?, parameters_ru = ?,
                raw_json = ?, updated_at = CURRENT_TIMESTAMP
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
            body.description_en || '',
            body.description_ru || '',
            body.devices_en || '',
            body.devices_ru || '',
            JSON.stringify(body.parameters_en || []),
            JSON.stringify(body.parameters || []),
            JSON.stringify(body.parameters_ru || []),
            raw_json, 
            params.handle
        );
        
        revalidateTag('cases');
        return NextResponse.json({ success: true });
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
