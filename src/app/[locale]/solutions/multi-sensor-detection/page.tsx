import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { multiSensorDetectionLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(multiSensorDetectionLanding, params.locale);
}

export default function MultiSensorDetectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={multiSensorDetectionLanding} locale={params.locale} />;
}
