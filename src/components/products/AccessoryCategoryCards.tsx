import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { ACCESSORY_CATEGORY_CARDS, getAccessoryCategoryName } from '@/lib/accessoryCategoryCards';

export default function AccessoryCategoryCards({
  locale,
  dict,
  compact = false,
  showTitle = true,
}: {
  locale: string;
  dict: any;
  compact?: boolean;
  showTitle?: boolean;
}) {
  const gridColumns = compact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))';
  const title = dict?.accessories?.title || 'Drone Accessories';

  return (
    <div style={{ marginTop: compact ? '28px' : '46px' }}>
      {showTitle && <div style={{ marginBottom: compact ? '18px' : '24px', textAlign: 'center' }}>
        <h3 style={{
          margin: 0,
          color: '#1f2a44',
          fontSize: compact ? '16px' : '2.6rem',
          fontWeight: 900,
        }}>
          {title}
        </h3>
      </div>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        gap: compact ? '15px' : '30px',
      }}>
        {ACCESSORY_CATEGORY_CARDS.map((category) => {
          const name = getAccessoryCategoryName(dict, category);

          return (
            <Link
              key={category.id}
              prefetch={false}
              href={localePath(locale, `/accessories#${category.id}`)}
              className="p-card-sbm"
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid #edf1f6',
                color: 'inherit',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: compact ? '4 / 3' : '4 / 3',
                background: 'linear-gradient(135deg, #f8faff 0%, #eef4fb 100%)',
                overflow: 'hidden',
              }}>
                <Image
                  src={withStaticAssetVersion(category.image)}
                  alt={name}
                  fill
                  sizes={compact ? '50vw' : '(max-width: 1200px) 25vw, 20vw'}
                  style={{
                    objectFit: 'contain',
                    padding: compact ? '12px' : '14px',
                  }}
                />
              </div>
              <div style={{
                minHeight: compact ? '68px' : '72px',
                padding: compact ? '12px' : '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid #edf1f6',
              }}>
                <h4 style={{
                  margin: 0,
                  color: '#25344f',
                  fontSize: compact ? '12px' : '1.58rem',
                  fontWeight: 800,
                  lineHeight: 1.3,
                  textAlign: 'center',
                  overflowWrap: 'anywhere',
                }}>
                  {name}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
