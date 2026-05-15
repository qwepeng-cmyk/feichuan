import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';
import { i18n, Locale } from '@/i18n/config';

export async function GET(request: NextRequest) {
    const requestedLocale = request.nextUrl.searchParams.get('locale') || i18n.defaultLocale;
    const locale = i18n.locales.includes(requestedLocale as Locale) ? requestedLocale as Locale : i18n.defaultLocale;
    const products = await getAllProducts(locale);

    return NextResponse.json(products, {
        headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
}
