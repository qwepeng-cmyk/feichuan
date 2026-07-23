import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneDefenderLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(droneDefenderLanding, params.locale);
}

export default function DroneDefenderPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneDefenderLanding} locale={params.locale} />;
}
