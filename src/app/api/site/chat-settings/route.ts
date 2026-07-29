import { NextResponse } from 'next/server';
import { getChatSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const canLoadZoosnet = process.env.NEXT_PUBLIC_DISABLE_ZOOSNET !== 'true';
    const settings = await getChatSettings();

    return NextResponse.json({
      success: true,
      data: {
        zoosnetEnabled: canLoadZoosnet && settings.zoosnetEnabled,
        messageBoxEnabled: settings.messageBoxEnabled,
        messageBoxDelayMinutes: settings.messageBoxDelayMinutes,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load chat settings' }, { status: 500 });
  }
}
