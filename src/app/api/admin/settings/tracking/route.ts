import { NextResponse } from 'next/server';
import { getTrackingSettings, updateTrackingSettings } from '@/lib/siteSettings';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: await getTrackingSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    await updateTrackingSettings({
      gaMeasurementId: body.gaMeasurementId || '',
      gaEnabled: Boolean(body.gaEnabled),
      gtmContainerId: body.gtmContainerId || '',
      gtmEnabled: Boolean(body.gtmEnabled),
    });

    return NextResponse.json({ success: true, data: await getTrackingSettings() });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 });
  }
}
