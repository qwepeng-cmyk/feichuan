import type { Metadata } from 'next';
import DroneLaserEngagementSystem from '@/components/products/DroneLaserEngagementSystem';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '3kW Anti-Drone Laser Defense System | Frontend Preview',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DroneLaserFrontendPreview({
  params,
}: {
  params: { locale: Locale };
}) {
  return <DroneLaserEngagementSystem mode="public" locale={params.locale} />;
}
