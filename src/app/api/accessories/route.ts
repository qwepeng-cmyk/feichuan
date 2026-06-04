import { NextRequest, NextResponse } from 'next/server';
import { getAllAccessories } from '@/lib/accessories';
import { i18n, Locale } from '@/i18n/config';

export async function GET(request: NextRequest) {
  const requestedLocale = request.nextUrl.searchParams.get('locale') || i18n.defaultLocale;
  const locale = i18n.locales.includes(requestedLocale as Locale) ? requestedLocale as Locale : i18n.defaultLocale;
  const accessories = await getAllAccessories(locale);

  return NextResponse.json(accessories, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
