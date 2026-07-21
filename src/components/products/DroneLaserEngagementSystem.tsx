'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import content from '@/content/droneLaserEngagementSystem.json';
import styles from './DroneLaserEngagementSystem.module.css';

type VariantId = '2kw' | '3kw' | '5kw';
type PageMode = 'preview' | 'public';

interface DroneLaserEngagementSystemProps {
  mode?: PageMode;
  locale?: string;
}

const variantIds = new Set<VariantId>(['2kw', '3kw', '5kw']);

function isVariantId(value: string): value is VariantId {
  return variantIds.has(value as VariantId);
}

export default function DroneLaserEngagementSystem({
  mode = 'preview',
  locale = 'en',
}: DroneLaserEngagementSystemProps) {
  const [activeId, setActiveId] = useState<VariantId>('3kw');
  const activeVariant = useMemo(
    () => content.variants.find((variant) => variant.id === activeId) || content.variants[1],
    [activeId]
  );

  const selectVariant = (value: string) => {
    if (isVariantId(value)) setActiveId(value);
  };

  return (
    <div className={styles.page} data-mode={mode} data-locale={locale}>
      {mode === 'preview' && <PreviewBar />}

      <div className={styles.desktopOnly}>
        <DesktopPage
          activeId={activeId}
          activeVariant={activeVariant}
          selectVariant={selectVariant}
          mode={mode}
          locale={locale}
        />
      </div>

      <div className={styles.mobileOnly}>
        <MobilePage
          activeId={activeId}
          activeVariant={activeVariant}
          selectVariant={selectVariant}
          mode={mode}
          locale={locale}
        />
      </div>
    </div>
  );
}

function PreviewBar() {
  return (
    <div className={styles.previewBar}>
      <div className={styles.previewBarInner}>
        <div>
          <span className={styles.previewSignal} aria-hidden="true" />
          <strong>INTERNAL PRODUCT PREVIEW</strong>
          <span>C layer / unpublished / noindex</span>
        </div>
        <div className={styles.previewActions}>
          <Link href="/admin/products">Back to products</Link>
          <Link href={`/admin/products/${content.handle}`}>Edit record</Link>
        </div>
      </div>
    </div>
  );
}

function DesktopPage({
  activeId,
  activeVariant,
  selectVariant,
  mode,
  locale,
}: {
  activeId: VariantId;
  activeVariant: (typeof content.variants)[number];
  selectVariant: (id: string) => void;
  mode: PageMode;
  locale: string;
}) {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <ProductBreadcrumb locale={locale} />
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span>NTET / DES SERIES</span>
                <span>{content.eyebrow}</span>
              </div>
              <h1>{content.productName}</h1>
              <p className={styles.heroSummary}>{content.summary}</p>

              <PowerRail activeId={activeId} selectVariant={selectVariant} compact={false} />

              <div className={styles.activeConfiguration}>
                <div>
                  <span>Selected configuration</span>
                  <strong>{activeVariant.power}</strong>
                </div>
                <p>{activeVariant.positioning}</p>
              </div>

              <div className={styles.heroActions}>
                <a href="#configuration-data" className={styles.primaryAction}>Compare configurations</a>
                {mode === 'public' ? (
                  <a href="#laser-inquiry" className={styles.secondaryAction}>Request technical review</a>
                ) : (
                  <a href="#source-review" className={styles.secondaryAction}>Review source notes</a>
                )}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualHud} aria-hidden="true">
                <span className={styles.hudCornerTop} />
                <span className={styles.hudCornerBottom} />
                <span className={styles.hudAxisHorizontal} />
                <span className={styles.hudAxisVertical} />
                <span className={styles.hudRing} />
              </div>
              <div className={styles.visualIndex}>CONFIG / {activeVariant.power.toUpperCase()}</div>
              <Image
                key={activeVariant.image}
                src={activeVariant.image}
                alt={`${activeVariant.power} anti-drone laser defense configuration`}
                fill
                priority
                sizes="(min-width: 992px) 46vw, 100vw"
                className={styles.heroImage}
              />
              <div className={styles.metricRail}>
                {activeVariant.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.systemBand}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <div className={styles.sectionNumber}>01 / SYSTEM ARCHITECTURE</div>
            <h2>Sensor-to-effector architecture, scaled by output class.</h2>
            <p>{content.application}</p>
          </div>

          <div className={styles.architectureGrid}>
            {content.features.map((feature) => (
              <article key={feature.number}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="configuration-data" className={styles.comparisonSection}>
        <div className={styles.container}>
          <div className={styles.comparisonHeader}>
            <div>
              <div className={styles.sectionNumber}>02 / CONFIGURATION MATRIX</div>
              <h2>One platform. Three documented power classes.</h2>
            </div>
            <p>Every figure below retains its source qualifier. Blank source fields are shown as “Not specified.”</p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      <section className={styles.detailSection}>
        <div className={styles.container}>
          <div className={styles.detailHeader}>
            <div>
              <div className={styles.sectionNumber}>03 / DETAILED DATA</div>
              <h2>{activeVariant.power} configuration</h2>
              <p>{activeVariant.description}</p>
            </div>
            <PowerRail activeId={activeId} selectVariant={selectVariant} compact />
          </div>

          <div className={styles.detailLayout}>
            <VariantGallery variant={activeVariant} />
            <div className={styles.specGroups}>
              {activeVariant.specGroups.map((group) => (
                <SpecGroup key={group.title} group={group} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {mode === 'preview' && <SourceReview />}

      <section className={styles.finalBand}>
        <div className={styles.finalBandImage}>
          <Image src={content.conceptImage} alt="System deployment concept" fill sizes="100vw" />
        </div>
        <div className={styles.finalBandOverlay} />
        <div className={styles.container}>
          <div className={styles.finalBandCopy}>
            <span>{mode === 'preview' ? 'INTERNAL REVIEW GATE' : 'CONFIGURATION REVIEW'}</span>
            <h2>{mode === 'preview' ? 'Technical content is ready. Public release is not.' : 'Match output, sensing and integration to the site.'}</h2>
            <p>
              {mode === 'preview'
                ? 'The page remains behind the admin boundary until the compliance tier and publication state are deliberately changed.'
                : 'Request a documented configuration review for site conditions, integration scope and local authorization requirements.'}
            </p>
          </div>
        </div>
      </section>

      {mode === 'public' && (
        <section id="laser-inquiry" className={styles.inquirySection}>
          <div className={styles.inquiryContainer}>
            <InquiryForm />
          </div>
        </section>
      )}
    </main>
  );
}

function MobilePage({
  activeId,
  activeVariant,
  selectVariant,
  mode,
  locale,
}: {
  activeId: VariantId;
  activeVariant: (typeof content.variants)[number];
  selectVariant: (id: string) => void;
  mode: PageMode;
  locale: string;
}) {
  return (
    <main className={styles.mobileMain}>
      <section className={styles.mobileHero}>
        <ProductBreadcrumb locale={locale} />
        <div className={styles.mobileEyebrow}>{content.eyebrow}</div>
        <h1>{content.productName}</h1>
        <p>{content.summary}</p>
        <PowerRail activeId={activeId} selectVariant={selectVariant} compact={false} />

        <div className={styles.mobileProductStage}>
          <div className={styles.mobileTargetRing} aria-hidden="true" />
          <Image
            key={activeVariant.image}
            src={activeVariant.image}
            alt={`${activeVariant.power} anti-drone laser defense configuration`}
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.mobileMetrics}>
          {activeVariant.metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
        <a href="#mobile-configuration-data" className={styles.mobileAction}>View configuration data</a>
      </section>

      <section className={styles.mobileArchitecture}>
        <div className={styles.sectionNumber}>01 / SYSTEM ARCHITECTURE</div>
        <h2>Scaled optical architecture.</h2>
        {content.features.map((feature) => (
          <article key={feature.number}>
            <span>{feature.number}</span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="mobile-configuration-data" className={styles.mobileComparison}>
        <div className={styles.sectionNumber}>02 / CONFIGURATION MATRIX</div>
        <h2>2 / 3 / 5 kW at a glance.</h2>
        <MobileComparison />
      </section>

      <section className={styles.mobileDetails}>
        <div className={styles.sectionNumber}>03 / DETAILED DATA</div>
        <h2>{activeVariant.power} configuration</h2>
        <p>{activeVariant.description}</p>
        <PowerRail activeId={activeId} selectVariant={selectVariant} compact />
        <VariantGallery variant={activeVariant} />
        {activeVariant.specGroups.map((group) => (
          <SpecGroup key={group.title} group={group} />
        ))}
      </section>

      {mode === 'preview' && <SourceReview />}

      {mode === 'public' && (
        <section id="mobile-laser-inquiry" className={styles.mobileInquirySection}>
          <MobileInquiryForm />
        </section>
      )}
    </main>
  );
}

function localizedPath(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`;
}

function ProductBreadcrumb({ locale }: { locale: string }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href={localizedPath(locale, '/')} prefetch={false}>Home</Link>
      <span aria-hidden="true">/</span>
      <Link href={localizedPath(locale, '/products')} prefetch={false}>Products</Link>
      <span aria-hidden="true">/</span>
      <span className={styles.breadcrumbCurrent}>DES Series</span>
    </nav>
  );
}

function PowerRail({
  activeId,
  selectVariant,
  compact,
}: {
  activeId: VariantId;
  selectVariant: (id: string) => void;
  compact: boolean;
}) {
  return (
    <div className={`${styles.powerRail} ${compact ? styles.powerRailCompact : ''}`} role="tablist" aria-label="Power configuration">
      <div className={styles.powerRailLine} aria-hidden="true" />
      {content.variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          role="tab"
          aria-selected={activeId === variant.id}
          className={activeId === variant.id ? styles.powerActive : ''}
          onClick={() => selectVariant(variant.id)}
        >
          <span className={styles.powerNode} aria-hidden="true" />
          <strong>{variant.power}</strong>
          {!compact && <small>{variant.positioning}</small>}
        </button>
      ))}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className={styles.comparisonTableWrap}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>Parameter</th>
            {content.variants.map((variant) => (
              <th key={variant.id}>
                <span>{variant.power}</span>
                <small>{variant.positioning}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.comparisonGroups.flatMap((group) => [
            <tr key={`${group.title}-heading`} className={styles.comparisonGroupRow}>
              <th colSpan={4}>{group.title}</th>
            </tr>,
            ...group.rows.map((row) => (
              <tr key={`${group.title}-${row.label}`}>
                <th>{row.label}</th>
                <td>{row['2kw']}</td>
                <td>{row['3kw']}</td>
                <td>{row['5kw']}</td>
              </tr>
            )),
          ])}
        </tbody>
      </table>
    </div>
  );
}

function MobileComparison() {
  return (
    <div className={styles.mobileComparisonList}>
      {content.comparisonGroups.map((group) => (
        <div key={group.title} className={styles.mobileComparisonGroup}>
          <h3>{group.title}</h3>
          {group.rows.map((row) => (
            <article key={row.label}>
              <h4>{row.label}</h4>
              <dl>
                <div><dt>2 kW</dt><dd>{row['2kw']}</dd></div>
                <div><dt>3 kW</dt><dd>{row['3kw']}</dd></div>
                <div><dt>5 kW</dt><dd>{row['5kw']}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}

function VariantGallery({ variant }: { variant: (typeof content.variants)[number] }) {
  return (
    <div className={styles.variantGallery}>
      <div className={styles.variantMainImage}>
        <Image src={variant.gallery[0]} alt={`${variant.power} primary module`} fill sizes="(min-width: 992px) 38vw, 100vw" />
      </div>
      {variant.gallery.length > 1 && (
        <div className={styles.variantThumbs}>
          {variant.gallery.slice(1).map((image, index) => (
            <div key={image}>
              <Image src={image} alt={`${variant.power} component ${index + 2}`} fill sizes="(min-width: 992px) 12vw, 33vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecGroup({ group }: { group: (typeof content.variants)[number]['specGroups'][number] }) {
  return (
    <section className={styles.specGroup}>
      <h3>{group.title}</h3>
      <dl>
        {group.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SourceReview() {
  return (
    <section id="source-review" className={styles.sourceReview}>
      <div className={styles.container}>
        <div className={styles.sectionNumber}>04 / SOURCE & COMPLIANCE REVIEW</div>
        <div className={styles.sourceReviewLayout}>
          <div>
            <h2>Draft decisions kept visible.</h2>
            <p>These notes are part of the internal preview and are intentionally excluded from any future public presentation.</p>
          </div>
          <ol>
            {content.sourceNotes.map((note, index) => (
              <li key={note}><span>{String(index + 1).padStart(2, '0')}</span>{note}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
