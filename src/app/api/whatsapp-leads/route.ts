import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function cleanText(value: unknown) {
  return String(value ?? '').trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = cleanText(body.name);
    const countryCode = cleanText(body.countryCode);
    const phone = cleanText(body.phone);
    const sourceLabel = cleanText(body.sourceLabel) || 'whatsapp_cta';
    const pagePath = cleanText(body.pagePath);
    const referer = request.headers.get('referer') || pagePath || 'Direct';

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and WhatsApp phone are required' },
        { status: 400, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
      );
    }

    if (!phone.startsWith('+') && !/^\+\d{1,4}$/.test(countryCode)) {
      return NextResponse.json(
        { success: false, error: 'Country code is required unless the phone number starts with +' },
        { status: 400, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
      );
    }

    const displayPhone = phone.startsWith('+') ? phone : `${countryCode} ${phone}`;
    const storedEmail = 'whatsapp-lead@n-tet.com';
    const demands = ['WhatsApp pre-chat lead'];
    const message = [
      'WhatsApp lead captured before redirect.',
      '',
      `Source CTA: ${sourceLabel}`,
      `Page path: ${pagePath || referer}`,
      `Visitor WhatsApp/phone: ${displayPhone || 'Not provided'}`,
    ].join('\n');

    const insert = db.prepare(`
      INSERT INTO inquiries (
        name, company, email, contact_method, country_code,
        phone, demands, message, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name,
      '',
      storedEmail,
      'WhatsApp Pre-chat',
      phone.startsWith('+') ? '' : countryCode,
      phone,
      JSON.stringify(demands),
      message,
      referer
    );

    const inquiryId = Number(result.lastInsertRowid);

    try {
      await sendInquiryNotification({
        name,
        company: '',
        email: storedEmail,
        contactMethod: 'WhatsApp Pre-chat',
        countryCode: phone.startsWith('+') ? '' : countryCode,
        phone,
        demands,
        message,
        sourcePage: referer,
      });
    } catch (emailError) {
      console.error('WhatsApp lead saved, but email notification failed:', emailError);
    }

    return NextResponse.json(
      { success: true, inquiryId },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (error) {
    console.error('Failed to submit WhatsApp lead:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  }
}
