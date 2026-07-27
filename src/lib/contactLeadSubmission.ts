import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/inquiryEmail';
import type { ContactChannelId } from '@/lib/contactSettings';
import {
  getPhoneCountry,
  getPhoneCountryByDialCode,
  normalizeInternationalPhone,
} from '@/lib/phoneCountryCodes';

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
    const submittedCountryIso = cleanText(body.countryIso).toUpperCase();
    const requestCountryIso = cleanText(
      request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country')
    ).toUpperCase();
    const submittedCountryCode = cleanText(body.countryCode);
    const explicitCountry = getPhoneCountryByDialCode(submittedCountryCode);
    const countryIso = explicitCountry?.iso || (getPhoneCountry(submittedCountryIso)
      ? submittedCountryIso
      : requestCountryIso);
    const countryCode = submittedCountryCode
      || getPhoneCountry(countryIso)?.dialCode
      || '';
    const phone = normalizeInternationalPhone(cleanText(body.phone), countryIso, countryCode);
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

    const displayPhone = phone;
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
      '',
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
          countryCode: '',
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
