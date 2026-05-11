import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const referer = request.headers.get('referer') || 'Direct';

        const insert = db.prepare(`
            INSERT INTO inquiries (
                name, company, email, contact_method, country_code, 
                phone, demands, message, source_page
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        insert.run(
            body.name,
            body.company || '',
            body.email,
            body.contactMethod || '',
            body.countryCode || '',
            body.phone || '',
            JSON.stringify(body.demands || []),
            body.message || '',
            referer
        );

        return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
    } catch (e) {
        console.error('Failed to submit inquiry:', e);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
