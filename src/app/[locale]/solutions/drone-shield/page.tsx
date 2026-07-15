import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneShieldLanding } from '@/lib/keywordIntentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${droneShieldLanding.handle}`,
    fallbackTitle: droneShieldLanding.h1,
    fallbackDescription: droneShieldLanding.purpose,
    image: droneShieldLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${droneShieldLanding.handle}`,
      languages: {
        en: `/solutions/${droneShieldLanding.handle}`,
        'x-default': `/solutions/${droneShieldLanding.handle}`,
      },
    },
  };
}

export default function DroneShieldPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneShieldLanding} locale={params.locale} />;
}
