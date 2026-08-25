import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { portableDetectionSystemLanding } from '@/lib/intentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(portableDetectionSystemLanding, params.locale);
}

export default function PortableDetectionSystemPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={portableDetectionSystemLanding} locale={params.locale} />;
}
