import type { Metadata } from 'next';
import IntentLandingRoute from '@/components/solutions/IntentLandingRoute';
import type { Locale } from '@/i18n/config';
import { portableDetectionLanding } from '@/lib/intentLandingPages';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  if (params.locale !== 'en') return { robots: { index: false, follow: false } };

  const metadata = buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${portableDetectionLanding.handle}`,
    fallbackTitle: portableDetectionLanding.h1,
    fallbackDescription: portableDetectionLanding.purpose,
    image: portableDetectionLanding.heroImage,
  });

  return {
    ...metadata,
    alternates: {
      canonical: `/solutions/${portableDetectionLanding.handle}`,
      languages: {
        en: `/solutions/${portableDetectionLanding.handle}`,
        'x-default': `/solutions/${portableDetectionLanding.handle}`,
      },
    },
  };
}

export default function PortableDroneDetectionPage({ params }: { params: { locale: Locale } }) {
  return <IntentLandingRoute config={portableDetectionLanding} locale={params.locale} />;
}
