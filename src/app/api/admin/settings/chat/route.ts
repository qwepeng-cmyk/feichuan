import { NextResponse } from 'next/server';
import { getChatSettings, updateChatSettings } from '@/lib/siteSettings';

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

    updateChatSettings({
      zoosnetEnabled: Boolean(body.zoosnetEnabled),
    });

    return NextResponse.json({ success: true, data: getChatSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save chat settings' }, { status: 500 });
  }
}
