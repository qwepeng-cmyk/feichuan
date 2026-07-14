import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { radarDetectionLanding } from '@/lib/intentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${radarDetectionLanding.handle}`,
    fallbackTitle: radarDetectionLanding.h1,
    fallbackDescription: radarDetectionLanding.purpose,
    image: radarDetectionLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${radarDetectionLanding.handle}`,
      languages: {
        en: `/solutions/${radarDetectionLanding.handle}`,
        'x-default': `/solutions/${radarDetectionLanding.handle}`,
      },
    },
  };
}

export default function DroneRadarDetectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={radarDetectionLanding} locale={params.locale} />;
}
