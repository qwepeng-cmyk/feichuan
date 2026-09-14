import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import type { PrivacyPolicyContent } from '@/lib/privacyPolicyContent';
import PrivacyPolicySections from './PrivacyPolicySections';

export default function DesktopPrivacyPolicy({
  locale,
  content,
}: {
  locale: string;
  content: PrivacyPolicyContent;
}) {
  return (
    <main className="privacy-policy-page privacy-policy-desktop">
      <div className="privacy-policy-breadcrumb">
        <div className="container">
          <Link prefetch={false} href={localePath(locale)}>{content.homeLabel}</Link>
          <span aria-hidden="true">/</span>
          <span>{content.title}</span>
        </div>
      </div>

      <header className="privacy-policy-hero">
        <div className="privacy-policy-hero-grid" aria-hidden="true" />
        <div className="container privacy-policy-hero-content">
          <p className="privacy-policy-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="privacy-policy-summary">{content.summary}</p>
          <p className="privacy-policy-date">
            <span>{content.lastUpdatedLabel}</span>
            <strong>{content.lastUpdated}</strong>
          </p>
        </div>
      </header>

      <div className="container privacy-policy-layout">
        <aside className="privacy-policy-toc" aria-label={content.contentsLabel}>
          <p>{content.contentsLabel}</p>
          <nav>
            {content.sections.map((section) => (
              <a href={`#desktop-${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </nav>
        </aside>
        <article className="privacy-policy-article">
          <PrivacyPolicySections content={content} idPrefix="desktop" />
        </article>
      </div>
    </main>
  );
}
