import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { layeredSiteProtectionLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(layeredSiteProtectionLanding, 'ru');
}

export default function LayeredSiteProtectionPage() {
  return <IntentLandingRoute config={layeredSiteProtectionLanding} locale="ru" />;
}
