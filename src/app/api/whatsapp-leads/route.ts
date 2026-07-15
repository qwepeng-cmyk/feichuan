import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function cleanText(value: unknown) {
  return String(value ?? '').trim();
}

function cleanShortMessage(value: unknown) {
  return cleanText(value).slice(0, 500);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = cleanText(body.name);
    const countryCode = cleanText(body.countryCode);
    const phone = cleanText(body.phone);
    const leadMessage = cleanShortMessage(body.message);
    const sourceLabel = cleanText(body.sourceLabel) || 'whatsapp_cta';
    const pagePath = cleanText(body.pagePath);
    const productName = cleanText(body.productName);
    const productHandle = cleanText(body.productHandle);
    const ctaLocation = cleanText(body.ctaLocation);
    const referer = request.headers.get('referer') || pagePath || 'Direct';

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp phone is required' },
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
      productName ? `Product/configuration: ${productName}` : '',
      productHandle ? `Product handle: ${productHandle}` : '',
      ctaLocation ? `CTA location: ${ctaLocation}` : '',
      `Visitor WhatsApp/phone: ${displayPhone || 'Not provided'}`,
      leadMessage ? `Visitor message: ${leadMessage}` : '',
    ].filter(Boolean).join('\n');

    const insert = db.prepare(`
      INSERT INTO inquiries (
        name, company, email, contact_method, country_code,
        phone, demands, message, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name || 'WhatsApp visitor',
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
        name: name || 'WhatsApp visitor',
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
