import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function isLocalHostName(hostname: string) {
    const cleanHostname = hostname.replace(/^\[/, '').replace(/\]$/, '').split(':')[0];
    const [firstOctet, secondOctet] = cleanHostname.split('.').map((part) => Number(part));
    const isPrivateIpv4 =
        firstOctet === 10 ||
        (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
        (firstOctet === 192 && secondOctet === 168);

    return cleanHostname === 'localhost' || cleanHostname === '127.0.0.1' || cleanHostname === '::1' || isPrivateIpv4;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;
        const hostname = new URL(request.url).hostname;
        const hostHeader = request.headers.get('host') || '';
        const forwardedHostHeader = request.headers.get('x-forwarded-host') || '';
        const isLocalHost =
            isLocalHostName(hostname) ||
            isLocalHostName(hostHeader) ||
            forwardedHostHeader.split(',').some((host) => isLocalHostName(host.trim()));
        const validUsername = process.env.ADMIN_USERNAME || 'admin';
        const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (username === validUsername && password === validPassword) {
            cookies().set('admin_token', process.env.ADMIN_SECRET || 'default_secret', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' && !isLocalHost,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE() {
    cookies().delete('admin_token');
    return NextResponse.json({ success: true });
}
