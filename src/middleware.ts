import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';

function firstForwardedValue(value: string | null) {
    return value?.split(',')[0]?.trim() || '';
}

function publicRequestOrigin(request: NextRequest) {
    const forwardedHost = firstForwardedValue(request.headers.get('x-forwarded-host'));
    const requestHost = firstForwardedValue(request.headers.get('host'));
    const forwardedProto = firstForwardedValue(request.headers.get('x-forwarded-proto'));
    const protocol = forwardedProto === 'http' || forwardedProto === 'https'
        ? forwardedProto
        : 'https';

    for (const candidate of [
        process.env.NEXT_PUBLIC_SITE_URL || '',
        forwardedHost ? `${protocol}://${forwardedHost}` : '',
        requestHost ? `${protocol}://${requestHost}` : '',
        request.nextUrl.origin,
    ]) {
        if (!candidate) continue;

        try {
            const url = new URL(candidate);
            if (!isLocalHostname(url.hostname)) {
                return url.origin;
            }
        } catch {
            // Ignore malformed proxy headers and continue to the configured origin.
        }
    }

    return request.nextUrl.origin;
}

function publicPathSegments(pathname: string) {
    return pathname.split('/').filter(Boolean).filter((part, index) => {
        return !(index === 0 && i18n.locales.includes(part as any));
    });
}

function isProtectedFrontendPreview(pathname: string) {
    const segments = publicPathSegments(pathname);
    return segments[0] === 'preview-products';
}

const WITHDRAWN_PUBLIC_ROUTES = new Set([
    'products/low-altitude-airspace-monitoring',
    'solutions/low-altitude-airspace-monitoring',
]);

const DIRECT_RU_PUBLIC_ROUTES = new Set([
    '/solutions/layered-site-protection',
    '/solutions/low-altitude-radar-monitoring',
    '/solutions/multi-sensor-detection',
    '/solutions/perimeter-defense-system',
    '/solutions/portable-detection-system',
    '/solutions/rf-target-positioning',
]);

function isWithdrawnPublicRoute(pathname: string) {
    return WITHDRAWN_PUBLIC_ROUTES.has(publicPathSegments(pathname).join('/'));
}

function isLocalHostname(hostname: string) {
    const cleanHostname = hostname.replace(/^\[/, '').replace(/\]$/, '').split(':')[0];
    const parts = cleanHostname.split('.').map((part) => Number(part));
    const isPrivateIpv4 =
        parts[0] === 10 ||
        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168);

    return cleanHostname === 'localhost' ||
        cleanHostname === '127.0.0.1' ||
        cleanHostname === '0.0.0.0' ||
        cleanHostname === '::1' ||
        isPrivateIpv4;
}

const LEGACY_SOLUTION_REDIRECTS: Record<string, string> = {};

const LEGACY_PRODUCT_REDIRECTS: Record<string, string> = {
  'uav-remote-id-monitoring-system': '/products/aerial-remote-id-monitoring-system',
};

function legacyProductPath(pathname: string) {
    const segments = publicPathSegments(pathname);
    if (segments[0] === 'products' && segments[1] && LEGACY_PRODUCT_REDIRECTS[segments[1]]) {
        return LEGACY_PRODUCT_REDIRECTS[segments[1]];
    }

    return '';
}

function legacySolutionPath(pathname: string) {
    const segments = publicPathSegments(pathname);
    if (segments[0] === 'solutions' && segments[1] && LEGACY_SOLUTION_REDIRECTS[segments[1]]) {
        return LEGACY_SOLUTION_REDIRECTS[segments[1]];
    }

    return '';
}

function normalizedBrandPath(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] && i18n.locales.includes(segments[0] as any) ? segments[0] : '';
    const offset = locale ? 1 : 0;
    const section = segments[offset];
    const handle = segments[offset + 1];

    if (!section || !handle) return '';

    let nextHandle = handle;
    if (section === 'products' && handle.startsWith('yuchai-yc')) {
        nextHandle = handle.replace(/^yuchai-yc/, 'n-tet-fc');
    }
    if (nextHandle === handle) return '';

    const nextSegments = [...segments];
    nextSegments[offset + 1] = nextHandle;
    return `/${nextSegments.join('/')}`;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const publicOrigin = publicRequestOrigin(request);
    const isInternalDefaultLocaleRewrite =
        request.nextUrl.searchParams.get('ntetDefaultLocale') === '1';

    if (isProtectedFrontendPreview(pathname)) {
        const token = request.cookies.get('admin_token')?.value;
        const secret = process.env.ADMIN_SECRET || 'default_secret';

        if (!isLocalHostname(request.nextUrl.hostname) && (!token || token !== secret)) {
            const loginUrl = new URL('/admin/login', publicOrigin);
            return NextResponse.redirect(loginUrl);
        }
    }

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

    if (isWithdrawnPublicRoute(pathname)) {
        return new NextResponse(null, {
            status: 404,
            headers: {
                'Cache-Control': 'public, max-age=0, must-revalidate',
                'X-Robots-Tag': 'noindex, nofollow',
            },
        });
    }

    const brandPath = normalizedBrandPath(pathname);
    if (brandPath) {
        return NextResponse.redirect(new URL(brandPath, publicOrigin), { status: 301 });
    }

    const solutionPath = legacySolutionPath(pathname);
    if (solutionPath) {
        return NextResponse.redirect(new URL(solutionPath, publicOrigin), { status: 301 });
    }

    const productPath = legacyProductPath(pathname);
    if (productPath) {
        return NextResponse.redirect(new URL(productPath, publicOrigin), { status: 301 });
    }

    // These Russian advertising landing pages have direct App Router entries.
    // Serving them without a locale rewrite keeps internal proxy URLs out of
    // the public response and removes an unnecessary middleware round trip.
    if (DIRECT_RU_PUBLIC_ROUTES.has(pathname)) {
        return NextResponse.next();
    }

    // --- i18n Locale Routing ---
    const { locales, defaultLocale } = i18n;

    // 1. If it starts with the default locale prefix (/en), REDIRECT to prefix-less version
    if (!isInternalDefaultLocaleRewrite && (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`)) {
        const newPathname = pathname === `/${defaultLocale}` 
            ? '/' 
            : pathname.replace(`/${defaultLocale}/`, '/');
        return NextResponse.redirect(new URL(newPathname, publicOrigin), { status: 301 });
    }

    if (isInternalDefaultLocaleRewrite) {
        return NextResponse.next();
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

    return NextResponse.rewrite(defaultLocaleUrl);
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
