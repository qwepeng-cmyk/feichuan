import { NextResponse } from 'next/server';
import { getChatSettings, isBusinessChatProvider, updateChatSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: getChatSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load chat settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!isBusinessChatProvider(body.businessChatProvider)) {
      return NextResponse.json(
        { success: false, error: 'Invalid business chat provider' },
        { status: 400 }
      );
    }

    updateChatSettings({
      businessChatProvider: body.businessChatProvider,
      messageBoxEnabled: Boolean(body.messageBoxEnabled),
      messageBoxDelayMinutes: Number(body.messageBoxDelayMinutes),
    });

    return NextResponse.json({ success: true, data: getChatSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save chat settings' }, { status: 500 });
  }
}
