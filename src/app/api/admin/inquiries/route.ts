import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const rows = db.prepare('SELECT id, name, company, email, created_at, is_read FROM inquiries ORDER BY created_at DESC').all();
        return NextResponse.json({ success: true, data: rows });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}
