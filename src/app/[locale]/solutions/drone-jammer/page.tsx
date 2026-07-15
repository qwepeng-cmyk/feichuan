import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneJammerLanding } from '@/lib/keywordIntentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${droneJammerLanding.handle}`,
    fallbackTitle: droneJammerLanding.h1,
    fallbackDescription: droneJammerLanding.purpose,
    image: droneJammerLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${droneJammerLanding.handle}`,
      languages: {
        en: `/solutions/${droneJammerLanding.handle}`,
        'x-default': `/solutions/${droneJammerLanding.handle}`,
      },
    },
  };
}

export default function DroneJammerPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneJammerLanding} locale={params.locale} />;
}
