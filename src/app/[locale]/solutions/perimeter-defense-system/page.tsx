import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { perimeterDefenseLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildIntentLandingPageMetadata(perimeterDefenseLanding, params.locale);
}

export default function PerimeterDefensePage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={perimeterDefenseLanding} locale={params.locale} />;
}
