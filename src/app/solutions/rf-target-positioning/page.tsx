import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { rfTargetPositioningLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(rfTargetPositioningLanding, 'ru');
}

export default function RfTargetPositioningPage() {
  return <IntentLandingRoute config={rfTargetPositioningLanding} locale="ru" />;
}
