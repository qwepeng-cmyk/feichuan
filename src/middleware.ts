import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';

const restrictedPublicHandles = new Set([
    'directional-rf-jammer',
    'omni-directional-rf-jammer',
    'portable-anti-drone-jammer-shield',
    'portable-anti-drone-jammer-shield-pro',
    'portable-integrated-detection-jamming-c-uas-basic',
    'portable-integrated-detection-jamming-pro-c-uas',
    'stationary-active-rf-defense-system',
    'uav-navigation-spoofing-system',
    'portable-active-rf-defense-system',
    'handheld-integrated-sdr-c-uas',
    'handheld-integrated-multi-band-jammer-gun',
    'power-generation-facility-anti-uav',
    'airport-anti-uav',
    'airport-security-application',
    'asian-games-security',
    'water-conservancy-security',
    'pakistan-power-plant-anti-uav',
    'brazil-refinery-anti-uav',
    'nigeria-factory-anti-uav',
    'multi-sensor-cuas-architecture-2026',
    'cuas-critical-infrastructure-deployment-2026',
]);

function publicPathSegments(pathname: string) {
    return pathname.split('/').filter(Boolean).filter((part, index) => {
        return !(index === 0 && i18n.locales.includes(part as any));
    });
}

function isRestrictedPublicPath(pathname: string) {
    const segments = publicPathSegments(pathname);
    const section = segments[0];
    const handle = segments[1];

    return Boolean(
        handle &&
        ['products', 'solutions', 'cases', 'media'].includes(section) &&
        restrictedPublicHandles.has(handle)
    );
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isInternalDefaultLocaleRewrite =
        request.nextUrl.searchParams.get('ntetDefaultLocale') === '1' ||
        request.headers.get('x-ntet-default-locale') === '1';

    // --- Admin Authentication Protection ---
    // Protect all /admin/* routes EXCEPT /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        const secret = process.env.ADMIN_SECRET || 'default_secret';

        if (!token || token !== secret) {
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

    if (isRestrictedPublicPath(pathname)) {
        return new NextResponse('Gone', {
            status: 410,
            headers: {
                'content-type': 'text/plain; charset=utf-8',
                'x-robots-tag': 'noindex, nofollow',
                'cache-control': 'public, max-age=3600',
            },
        });
    }

    // --- i18n Locale Routing ---
    const { locales, defaultLocale } = i18n;

    // 1. If it starts with the default locale prefix (/en), REDIRECT to prefix-less version
    if (!isInternalDefaultLocaleRewrite && (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`)) {
        const newPathname = pathname === `/${defaultLocale}` 
            ? '/' 
            : pathname.replace(`/${defaultLocale}/`, '/');
        return NextResponse.redirect(new URL(newPathname, request.url), { status: 301 });
    }

    if (isInternalDefaultLocaleRewrite) {
        const nextUrl = request.nextUrl.clone();
        nextUrl.searchParams.delete('ntetDefaultLocale');
        return NextResponse.rewrite(nextUrl);
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
    const defaultLocalePathname = pathname === '/'
        ? `/${defaultLocale}`
        : `/${defaultLocale}${pathname}`;
    const defaultLocaleUrl = new URL(defaultLocalePathname, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
        defaultLocaleUrl.searchParams.set(key, value);
    });
    defaultLocaleUrl.searchParams.set('ntetDefaultLocale', '1');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-ntet-default-locale', '1');

    return NextResponse.rewrite(defaultLocaleUrl, {
        request: {
            headers: requestHeaders,
        },
    });
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
