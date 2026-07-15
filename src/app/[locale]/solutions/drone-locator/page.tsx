import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneLocatorLanding } from '@/lib/keywordIntentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${droneLocatorLanding.handle}`,
    fallbackTitle: droneLocatorLanding.h1,
    fallbackDescription: droneLocatorLanding.purpose,
    image: droneLocatorLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${droneLocatorLanding.handle}`,
      languages: {
        en: `/solutions/${droneLocatorLanding.handle}`,
        'x-default': `/solutions/${droneLocatorLanding.handle}`,
      },
    },
  };
}

export default function DroneLocatorPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneLocatorLanding} locale={params.locale} />;
}
