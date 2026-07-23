import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneShieldLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(droneShieldLanding, params.locale);
}

export default function DroneShieldPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneShieldLanding} locale={params.locale} />;
}
