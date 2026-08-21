import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { multiSensorDetectionLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(multiSensorDetectionLanding, 'ru');
}

export default function MultiSensorDetectionPage() {
  return <IntentLandingRoute config={multiSensorDetectionLanding} locale="ru" />;
}
