import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- Admin Authentication Protection ---
    // Protect all /admin/* routes EXCEPT /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        const validToken = process.env.ADMIN_SECRET || 'default_secret';

        if (!token || token !== validToken) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // Protect all /api/admin/* routes EXCEPT /api/admin/auth
    if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth') {
        const token = request.cookies.get('admin_token')?.value;
        const validToken = process.env.ADMIN_SECRET || 'default_secret';

        if (!token || token !== validToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.next();
    }

    // --- Skip paths that should NOT have locale prefix ---
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.includes('.') || // static files (.png, .css, .js, etc.)
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // --- i18n Locale Routing ---
    const { locales, defaultLocale } = i18n;

    // 1. If it starts with the default locale prefix (/en), REDIRECT to prefix-less version
    if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
        const newPathname = pathname === `/${defaultLocale}` 
            ? '/' 
            : pathname.replace(`/${defaultLocale}/`, '/');
        return NextResponse.redirect(new URL(newPathname, request.url), { status: 301 });
    }

    // 2. Check if the pathname has another valid locale prefix (e.g., /ru)
    const pathnameHasOtherLocale = locales
        .filter(l => l !== defaultLocale)
        .some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    if (pathnameHasOtherLocale) {
        return NextResponse.next();
    }

    // 3. If no locale prefix, it's the default locale (English).
    // We REWRITE internally so the URL stays clean (no /en) but App Router sees /[locale]
    return NextResponse.rewrite(
        new URL(`/${defaultLocale}${pathname}`, request.url)
    );
}

export const config = {
    matcher: [
        // Match admin routes for auth protection
        '/admin/:path*',
        '/api/admin/:path*',
        // Match all public pages for i18n (exclude static files, api, _next)
        '/((?!_next|api|admin|favicon.ico|.*\\..*).*)',
    ],
};
