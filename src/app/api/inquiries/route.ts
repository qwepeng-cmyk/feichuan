import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown) {
    return String(value ?? '').trim();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const name = cleanText(body.name);
        const company = cleanText(body.company);
        const email = cleanText(body.email);
        const phone = cleanText(body.phone);
        const message = cleanText(body.message);
        const contactMethod = cleanText(body.contactMethod);
        const countryCode = cleanText(body.countryCode)
            || cleanText(request.headers.get('cf-ipcountry'))
            || cleanText(request.headers.get('x-vercel-ip-country'));

        if (!email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Email and Phone / WhatsApp are required' },
                { status: 400, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
            );
        }
        if (!EMAIL_PATTERN.test(email)) {
            return NextResponse.json(
                { success: false, error: 'A valid email address is required' },
                { status: 400, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
            );
        }

        const referer = request.headers.get('referer') || 'Direct';
        const sourcePage = typeof body.sourcePage === 'string' && body.sourcePage.trim()
            ? body.sourcePage.trim()
            : referer;
        const demands = Array.isArray(body.demands) ? body.demands : [];

        const insert = db.prepare(`
            INSERT INTO inquiries (
                name, company, email, contact_method, country_code, 
                phone, demands, message, source_page
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = await insert.run(
            name,
            company,
            email,
            contactMethod,
            countryCode,
            phone,
            JSON.stringify(demands),
            message,
            sourcePage
        );
        const inquiryId = Number(result.lastInsertRowid);
        const savedInquiry = await db.prepare(`
            SELECT id, name, email, created_at
            FROM inquiries
            WHERE id = ?
        `).get(inquiryId) as { id: number; name: string; email: string; created_at: string } | undefined;

        if (!savedInquiry) {
            throw new Error(`Inquiry insert verification failed for id ${inquiryId}`);
        }

        try {
            await sendInquiryNotification({
                name,
                company,
                email,
                contactMethod,
                countryCode,
                phone,
                demands,
                message,
                sourcePage,
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
