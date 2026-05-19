import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;
        const hostname = new URL(request.url).hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const validUsername = process.env.ADMIN_USERNAME || 'admin';

        if (username === validUsername && password === process.env.ADMIN_PASSWORD) {
            cookies().set('admin_token', process.env.ADMIN_SECRET || 'default_secret', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' && !isLocalhost,
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
