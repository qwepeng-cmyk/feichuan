import { CONTACT_EMAIL } from '@/lib/contactSettings';
import type { PrivacyPolicyContent } from '@/lib/privacyPolicyContent';

export default function PrivacyPolicySections({
  content,
  idPrefix,
}: {
  content: PrivacyPolicyContent;
  idPrefix: string;
}) {
  return (
    <div className="privacy-policy-sections">
      {content.sections.map((section) => (
        <section
          className="privacy-policy-section"
          id={`${idPrefix}-${section.id}`}
          key={section.id}
        >
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
          {section.showEmail && (
            <a className="privacy-policy-email" href={`mailto:${CONTACT_EMAIL}`}>
              <span>{content.contactEmailLabel}</span>
              <strong>{CONTACT_EMAIL}</strong>
            </a>
          )}
        </section>
      ))}
    </div>
  );
}
