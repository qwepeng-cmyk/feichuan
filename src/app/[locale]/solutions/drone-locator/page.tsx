import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneLocatorLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(droneLocatorLanding, params.locale);
}

export default function DroneLocatorPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneLocatorLanding} locale={params.locale} />;
}
