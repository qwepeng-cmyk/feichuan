import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneDetectorLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(droneDetectorLanding, params.locale);
}

export default function DroneDetectorPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneDetectorLanding} locale={params.locale} />;
}
