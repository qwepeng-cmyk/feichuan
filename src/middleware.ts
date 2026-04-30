import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin/* routes EXCEPT /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        const validToken = process.env.ADMIN_SECRET || 'default_secret';

        if (!token || token !== validToken) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Protect all /api/admin/* routes EXCEPT /api/admin/auth
    if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth') {
        const token = request.cookies.get('admin_token')?.value;
        const validToken = process.env.ADMIN_SECRET || 'default_secret';

        if (!token || token !== validToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
