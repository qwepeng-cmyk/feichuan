import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { rfTargetPositioningLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(rfTargetPositioningLanding, params.locale);
}

export default function RfTargetPositioningPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={rfTargetPositioningLanding} locale={params.locale} />;
}
