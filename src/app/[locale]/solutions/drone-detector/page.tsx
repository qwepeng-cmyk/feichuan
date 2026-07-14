import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { droneDetectorLanding } from '@/lib/intentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${droneDetectorLanding.handle}`,
    fallbackTitle: droneDetectorLanding.h1,
    fallbackDescription: droneDetectorLanding.purpose,
    image: droneDetectorLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${droneDetectorLanding.handle}`,
      languages: {
        en: `/solutions/${droneDetectorLanding.handle}`,
        'x-default': `/solutions/${droneDetectorLanding.handle}`,
      },
    },
  };
}

export default function DroneDetectorPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={droneDetectorLanding} locale={params.locale} />;
}
