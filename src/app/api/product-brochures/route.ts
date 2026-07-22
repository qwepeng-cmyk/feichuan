import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';
import { getEmailSettings } from '@/lib/emailSettings';
import { getProductBrochure, getProductBrochurePath } from '@/lib/productBrochures';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function noStoreJson(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const handle = cleanText(body.handle, 180);
    const email = cleanText(body.email, 254).toLowerCase();
    const phone = cleanText(body.phone, 60);
    const honeypot = cleanText(body.website, 200);
    const brochure = getProductBrochure(handle);

    if (honeypot) {
      return noStoreJson({ success: false, error: 'Unable to process this request.' }, 400);
    }

    if (!brochure) {
      return noStoreJson({ success: false, error: 'This brochure is not available.' }, 404);
    }

    if (!EMAIL_PATTERN.test(email)) {
      return noStoreJson({ success: false, error: 'Please enter a valid email address.' }, 400);
    }

    const referer = request.headers.get('referer') || 'Direct';
    const sourcePage = cleanText(body.sourcePage, 500) || referer;
    const message = `Product brochure downloaded: ${brochure.productName} [${handle}]`;
    const demands = ['Product specifications / brochure', brochure.productName];

    const existing = db.prepare(`
      SELECT id
      FROM inquiries
      WHERE lower(email) = lower(?)
        AND message = ?
        AND created_at >= datetime('now', '-1 day')
      ORDER BY id DESC
      LIMIT 1
    `).get(email, message) as { id: number } | undefined;

    let inquiryId = existing?.id;

    if (!inquiryId) {
      const result = db.prepare(`
        INSERT INTO inquiries (
          name, company, email, contact_method, country_code,
          phone, demands, message, source_page
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        '',
        '',
        email,
        phone ? 'Email + Phone / WhatsApp' : 'Email',
        '',
        phone,
        JSON.stringify(demands),
        message,
        sourcePage
      );

      inquiryId = Number(result.lastInsertRowid);

      const shouldSendNotification =
        getEmailSettings().brochureNotificationsEnabled &&
        process.env.DISABLE_INQUIRY_EMAIL !== '1';

      if (shouldSendNotification) {
        try {
          await sendInquiryNotification({
            name: 'Product brochure visitor',
            email,
            phone,
            contactMethod: phone ? 'Email + Phone / WhatsApp' : 'Email',
            demands,
            message,
            sourcePage,
          });
        } catch (emailError) {
          console.error('Brochure lead saved, but email notification failed:', emailError);
        }
      }
    }

    const file = await readFile(getProductBrochurePath(brochure));

    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${brochure.downloadName}"`,
        'Content-Length': String(file.byteLength),
        'Cache-Control': 'no-store, private, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'X-Inquiry-Id': String(inquiryId),
        'X-Download-Filename': brochure.downloadName,
      },
    });
  } catch (error) {
    console.error('Product brochure download failed:', error);
    return noStoreJson(
      { success: false, error: 'We could not prepare the PDF. Please try again.' },
      500
    );
  }
}
