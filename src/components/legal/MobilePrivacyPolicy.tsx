import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import type { PrivacyPolicyContent } from '@/lib/privacyPolicyContent';
import PrivacyPolicySections from './PrivacyPolicySections';

export default function MobilePrivacyPolicy({
  locale,
  content,
}: {
  locale: string;
  content: PrivacyPolicyContent;
}) {
  return (
    <main className="privacy-policy-page privacy-policy-mobile">
      <header className="privacy-policy-mobile-hero">
        <div className="privacy-policy-mobile-lines" aria-hidden="true" />
        <div className="privacy-policy-mobile-hero-content">
          <Link prefetch={false} href={localePath(locale)} className="privacy-policy-mobile-back">
            <span aria-hidden="true">←</span> {content.homeLabel}
          </Link>
          <p className="privacy-policy-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="privacy-policy-summary">{content.summary}</p>
          <p className="privacy-policy-date">
            <span>{content.lastUpdatedLabel}</span>
            <strong>{content.lastUpdated}</strong>
          </p>
        </div>
      </header>

      <article className="privacy-policy-mobile-article">
        <PrivacyPolicySections content={content} idPrefix="mobile" />
      </article>
    </main>
  );
}
