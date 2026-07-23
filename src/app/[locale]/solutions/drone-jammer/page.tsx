import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneJammerLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(droneJammerLanding, params.locale);
}

export default function DroneJammerPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneJammerLanding} locale={params.locale} />;
}
