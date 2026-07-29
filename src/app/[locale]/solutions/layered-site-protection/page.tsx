import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { layeredSiteProtectionLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(layeredSiteProtectionLanding, params.locale);
}

export default function LayeredSiteProtectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={layeredSiteProtectionLanding} locale={params.locale} />;
}
