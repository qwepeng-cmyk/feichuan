import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const referer = request.headers.get('referer') || 'Direct';
        const demands = Array.isArray(body.demands) ? body.demands : [];

        const insert = db.prepare(`
            INSERT INTO inquiries (
                name, company, email, contact_method, country_code, 
                phone, demands, message, source_page
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = insert.run(
            body.name,
            body.company || '',
            body.email,
            body.contactMethod || '',
            body.countryCode || '',
            body.phone || '',
            JSON.stringify(demands),
            body.message || '',
            referer
        );
        const inquiryId = Number(result.lastInsertRowid);
        const savedInquiry = db.prepare(`
            SELECT id, name, email, created_at
            FROM inquiries
            WHERE id = ?
        `).get(inquiryId) as { id: number; name: string; email: string; created_at: string } | undefined;

        if (!savedInquiry) {
            throw new Error(`Inquiry insert verification failed for id ${inquiryId}`);
        }

        try {
            await sendInquiryNotification({
                name: body.name,
                company: body.company || '',
                email: body.email,
                contactMethod: body.contactMethod || '',
                countryCode: body.countryCode || '',
                phone: body.phone || '',
                demands,
                message: body.message || '',
                sourcePage: referer,
            });
        } catch (emailError) {
            console.error('Inquiry saved, but email notification failed:', emailError);
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Inquiry submitted successfully',
                inquiryId: savedInquiry.id,
                savedAt: savedInquiry.created_at,
            },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            }
        );
    } catch (e) {
        console.error('Failed to submit inquiry:', e);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            }
        );
    }
}
