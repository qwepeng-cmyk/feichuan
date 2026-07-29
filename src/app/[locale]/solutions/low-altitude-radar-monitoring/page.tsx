import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { lowAltitudeRadarMonitoringLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(lowAltitudeRadarMonitoringLanding, params.locale);
}

export default function LowAltitudeRadarMonitoringPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={lowAltitudeRadarMonitoringLanding} locale={params.locale} />;
}
