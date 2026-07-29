import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { rfSignalSuppressionLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(rfSignalSuppressionLanding, params.locale);
}

export default function RfSignalSuppressionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={rfSignalSuppressionLanding} locale={params.locale} />;
}
