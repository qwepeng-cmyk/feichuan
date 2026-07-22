import { NextResponse } from 'next/server';
import { getPublicEmailSettings, updateEmailSettings } from '@/lib/emailSettings';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: getPublicEmailSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load email settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const smtpPass = typeof body.smtpPass === 'string' ? body.smtpPass.trim() : '';

    updateEmailSettings({
      enabled: Boolean(body.enabled),
      brochureNotificationsEnabled: Boolean(body.brochureNotificationsEnabled),
      smtpHost: body.smtpHost || '',
      smtpPort: body.smtpPort,
      smtpSecure: Boolean(body.smtpSecure),
      smtpUser: body.smtpUser || '',
      smtpPass,
      fromEmail: body.fromEmail || '',
      receiverEmail: body.receiverEmail || '',
      keepExistingPassword: !smtpPass && Boolean(body.hasSmtpPass),
    });

    return NextResponse.json({ success: true, data: getPublicEmailSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save email settings' }, { status: 500 });
  }
}
