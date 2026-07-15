import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneDefenderLanding } from '@/lib/keywordIntentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${droneDefenderLanding.handle}`,
    fallbackTitle: droneDefenderLanding.h1,
    fallbackDescription: droneDefenderLanding.purpose,
    image: droneDefenderLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${droneDefenderLanding.handle}`,
      languages: {
        en: `/solutions/${droneDefenderLanding.handle}`,
        'x-default': `/solutions/${droneDefenderLanding.handle}`,
      },
    },
  };
}

export default function DroneDefenderPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneDefenderLanding} locale={params.locale} />;
}
