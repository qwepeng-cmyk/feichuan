import { NextResponse } from 'next/server';
import { getChatSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const canLoadTawk = process.env.NEXT_PUBLIC_DISABLE_TAWK !== 'true';
    const settings = getChatSettings();

    return NextResponse.json({
      success: true,
      data: {
        tawkEnabled: canLoadTawk && settings.tawkEnabled,
        messageBoxEnabled: settings.messageBoxEnabled,
        messageBoxDelayMinutes: settings.messageBoxDelayMinutes,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load chat settings' }, { status: 500 });
  }
}
