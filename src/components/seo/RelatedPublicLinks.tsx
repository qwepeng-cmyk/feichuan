import Link from 'next/link';
import { localePath } from '@/lib/localePath';

export interface RelatedPublicLink {
  href: string;
  label: string;
  description?: string;
}

export default function RelatedPublicLinks({
  locale,
  links,
  title,
}: {
  locale: string;
  links: RelatedPublicLink[];
  title?: string;
}) {
  const uniqueLinks = links.filter(
    (link, index, list) => link.href && list.findIndex((item) => item.href === link.href) === index
  );

  if (!uniqueLinks.length) return null;
  const heading =
    title ||
    (locale === 'ru'
      ? 'Связанные страницы'
      : locale === 'es'
        ? 'Paginas relacionadas'
        : locale === 'ar'
          ? 'صفحات ذات صلة'
          : 'Related public pages');
  const showDescriptions = locale === 'en';

  return (
    <section style={{ padding: '56px 0', background: '#fff', borderTop: '1px solid #e8edf4' }}>
      <div className="container">
        <h2 style={{ margin: '0 0 18px', fontSize: '2.4rem', lineHeight: 1.2, color: '#1f2937' }}>{heading}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: '14px' }}>
          {uniqueLinks.map((link) => (
            <Link
              key={link.href}
              href={localePath(locale, link.href)}
              prefetch={false}
              style={{
                display: 'block',
                minHeight: showDescriptions ? '82px' : '58px',
                padding: '18px 20px',
                border: '1px solid #dbe4f0',
                borderRadius: '6px',
                background: '#f8fafc',
                color: '#1f2937',
                textDecoration: 'none',
              }}
            >
              <span style={{ display: 'block', fontSize: '1.55rem', fontWeight: 800, lineHeight: 1.3 }}>{link.label}</span>
              {showDescriptions && link.description && (
                <span style={{ display: 'block', marginTop: '6px', fontSize: '1.25rem', lineHeight: 1.45, color: '#64748b' }}>
                  {link.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
