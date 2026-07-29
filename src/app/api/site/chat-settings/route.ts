import { NextResponse } from 'next/server';
import { getChatSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const canLoadTawk = process.env.NEXT_PUBLIC_DISABLE_TAWK !== 'true';
    const canLoadZoosnet = process.env.NEXT_PUBLIC_DISABLE_ZOOSNET !== 'true';
    const settings = getChatSettings();
    const activeProvider =
      settings.businessChatProvider === 'tawk' && canLoadTawk
        ? 'tawk'
        : settings.businessChatProvider === 'zoosnet' && canLoadZoosnet
          ? 'zoosnet'
          : 'none';

    return NextResponse.json({
      success: true,
      data: {
        businessChatProvider: activeProvider,
        tawkEnabled: activeProvider === 'tawk',
        zoosnetEnabled: activeProvider === 'zoosnet',
        messageBoxEnabled: settings.messageBoxEnabled,
        messageBoxDelayMinutes: settings.messageBoxDelayMinutes,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load chat settings' }, { status: 500 });
  }
}
