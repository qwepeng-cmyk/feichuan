import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import { perimeterDefenseLanding } from '@/lib/keywordIntentLandingPages';
import { buildIntentLandingPageMetadata } from '@/lib/intentLandingLocalization';

export function generateMetadata(): Metadata {
  return buildIntentLandingPageMetadata(perimeterDefenseLanding, 'ru');
}

export default function PerimeterDefenseSystemPage() {
  return <IntentLandingRoute config={perimeterDefenseLanding} locale="ru" />;
}
