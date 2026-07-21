import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';
import type { ContactChannelId } from '@/lib/contactSettings';

function cleanText(value: unknown) {
  return String(value ?? '').trim();
}

function cleanShortMessage(value: unknown) {
  return cleanText(value).slice(0, 500);
}

function resolveChannel(value: unknown): ContactChannelId {
  return cleanText(value).toLowerCase() === 'vk' ? 'vk' : 'whatsapp';
}

export async function handleContactLeadPost(request: Request) {
  try {
    const body = await request.json();
    const channel = resolveChannel(body.channel);
    const channelLabel = channel === 'vk' ? 'VK' : 'WhatsApp';
    const name = cleanText(body.name);
    const countryCode = cleanText(body.countryCode);
    const phone = cleanText(body.phone);
    const leadMessage = cleanShortMessage(body.message);
    const sourceLabel = cleanText(body.sourceLabel) || `${channel}_cta`;
    const pagePath = cleanText(body.pagePath);
    const productName = cleanText(body.productName);
    const productHandle = cleanText(body.productHandle);
    const ctaLocation = cleanText(body.ctaLocation);
    const referer = request.headers.get('referer') || pagePath || 'Direct';

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Contact phone is required' },
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
    const storedEmail = `${channel}-lead@n-tet.com`;
    const contactMethod = `${channelLabel} Pre-contact`;
    const demands = [`${channelLabel} pre-contact lead`];
    const message = [
      `${channelLabel} lead captured before redirect.`,
      '',
      `Source CTA: ${sourceLabel}`,
      `Page path: ${pagePath || referer}`,
      productName ? `Product/configuration: ${productName}` : '',
      productHandle ? `Product handle: ${productHandle}` : '',
      ctaLocation ? `CTA location: ${ctaLocation}` : '',
      `Visitor phone: ${displayPhone}`,
      leadMessage ? `Visitor message: ${leadMessage}` : '',
    ].filter(Boolean).join('\n');

    const insert = db.prepare(`
      INSERT INTO inquiries (
        name, company, email, contact_method, country_code,
        phone, demands, message, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name || `${channelLabel} visitor`,
      '',
      storedEmail,
      contactMethod,
      phone.startsWith('+') ? '' : countryCode,
      phone,
      JSON.stringify(demands),
      message,
      referer
    );

    const inquiryId = Number(result.lastInsertRowid);

    const notificationDisabled = process.env.DISABLE_INQUIRY_EMAIL === '1';

    if (!notificationDisabled) {
      try {
        await sendInquiryNotification({
          name: name || `${channelLabel} visitor`,
          company: '',
          email: storedEmail,
          contactMethod,
          countryCode: phone.startsWith('+') ? '' : countryCode,
          phone,
          demands,
          message,
          sourcePage: referer,
        });
      } catch (emailError) {
        console.error(`${channelLabel} lead saved, but email notification failed:`, emailError);
      }
    }

    return NextResponse.json(
      { success: true, inquiryId, channel, notificationDisabled },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (error) {
    console.error('Failed to submit contact-channel lead:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500, headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  }
}
