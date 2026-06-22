import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const rows = db.prepare('SELECT id, name, company, email, created_at, is_read FROM inquiries ORDER BY created_at DESC').all();
        return NextResponse.json(
            { success: true, data: rows },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            }
        );
    } catch (e) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch inquiries' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            }
        );
    }
}
