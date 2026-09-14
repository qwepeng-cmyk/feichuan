import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { portableDetectionSystemLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(portableDetectionSystemLanding, 'ru');
}

export default function PortableDetectionSystemPage() {
  return <IntentLandingRoute config={portableDetectionSystemLanding} locale="ru" />;
}
