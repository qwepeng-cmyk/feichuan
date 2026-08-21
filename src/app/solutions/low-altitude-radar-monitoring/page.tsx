import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { lowAltitudeRadarMonitoringLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(lowAltitudeRadarMonitoringLanding, 'ru');
}

export default function LowAltitudeRadarMonitoringPage() {
  return <IntentLandingRoute config={lowAltitudeRadarMonitoringLanding} locale="ru" />;
}
