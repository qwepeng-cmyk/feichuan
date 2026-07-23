import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { portableDetectionLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(portableDetectionLanding, params.locale);
}

export default function PortableDroneDetectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={portableDetectionLanding} locale={params.locale} />;
}
