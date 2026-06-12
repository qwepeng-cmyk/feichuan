type FaqListItem = {
  question: string;
  answer: string;
};

type FaqListSectionProps = {
  title: string;
  items: FaqListItem[];
  eyebrow?: string;
  intro?: string;
  compact?: boolean;
  id?: string;
  className?: string;
  background?: string;
};

export default function FaqListSection({
  title,
  items,
  eyebrow,
  intro,
  compact = false,
  id,
  className,
  background = '#fff',
}: FaqListSectionProps) {
  if (!items.length) return null;

  return (
    <section
      id={id}
      className={className}
      style={{
        padding: compact ? '34px 16px' : '72px 0 76px',
        background,
        borderTop: '1px solid #e5edf7',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: compact ? 0 : '0 20px' }}>
        <div style={{ margin: compact ? '0 0 20px' : '0 auto 28px', maxWidth: '780px', textAlign: 'center' }}>
          {eyebrow && (
            <div style={{ color: '#315ba4', fontSize: compact ? '1.22rem' : '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              {eyebrow}
            </div>
          )}
          <h2 style={{ margin: 0, color: '#172033', fontSize: compact ? '2.15rem' : '3rem', lineHeight: 1.18, fontWeight: 900, letterSpacing: 0 }}>
            {title}
          </h2>
          {intro && (
            <p style={{ margin: compact ? '14px 0 0' : '16px 0 0', color: '#52606d', fontSize: compact ? '1.45rem' : '1.68rem', lineHeight: 1.75 }}>
              {intro}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gap: compact ? '14px' : '18px' }}>
          {items.map((item, index) => (
            <article
              key={item.question}
              style={{
                display: 'grid',
                gridTemplateColumns: compact ? '1fr' : '58px 1fr',
                gap: compact ? '10px' : '18px',
                padding: compact ? '18px 0' : '22px 0',
                borderTop: index === 0 ? '2px solid #315ba4' : '1px solid #dbe7f6',
              }}
            >
              <div style={{ color: '#315ba4', fontSize: compact ? '1.25rem' : '1.4rem', fontWeight: 900, letterSpacing: '0.08em' }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px', color: '#172033', fontSize: compact ? '1.62rem' : '1.9rem', lineHeight: 1.35, fontWeight: 850 }}>
                  {item.question}
                </h3>
                <p style={{ margin: 0, color: '#566174', fontSize: compact ? '1.42rem' : '1.56rem', lineHeight: 1.72 }}>
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
