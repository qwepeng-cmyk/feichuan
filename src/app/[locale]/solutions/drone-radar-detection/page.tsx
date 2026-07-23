import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { radarDetectionLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(radarDetectionLanding, params.locale);
}

export default function DroneRadarDetectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={radarDetectionLanding} locale={params.locale} />;
}
