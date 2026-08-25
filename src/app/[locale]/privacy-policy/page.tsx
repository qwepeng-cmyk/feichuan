import type { Metadata } from 'next';
import DesktopPrivacyPolicy from '@/components/legal/DesktopPrivacyPolicy';
import MobilePrivacyPolicy from '@/components/legal/MobilePrivacyPolicy';
import type { Locale } from '@/i18n/config';
import { getPrivacyPolicyContent } from '@/lib/privacyPolicyContent';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const content = getPrivacyPolicyContent(params.locale);

  return buildSeoMetadata({
    locale: params.locale,
    path: '/privacy-policy',
    fallbackTitle: `${content.title} | N-TET`,
    fallbackDescription: content.summary,
  });
}

export default function PrivacyPolicyPage({ params }: { params: { locale: Locale } }) {
  const content = getPrivacyPolicyContent(params.locale);

  return (
    <>
      <div className="pc_only">
        <DesktopPrivacyPolicy locale={params.locale} content={content} />
      </div>
      <div className="mobile_only">
        <MobilePrivacyPolicy locale={params.locale} content={content} />
      </div>
    </>
  );
}
