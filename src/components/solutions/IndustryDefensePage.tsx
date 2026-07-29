import Image from 'next/image';
import Link from 'next/link';
import InquiryForm from '@/components/products/InquiryForm';
import type { Solution } from '@/lib/solutions';
import type { defenseIndustryPageData, defenseProductSet } from '@/lib/industryPageData';
import { localePath } from '@/lib/localePath';
import { defenseText, localizedefenseTree, localizedefenseValue } from '@/lib/localeCopy';
import styles from './CriticalInfrastructureDefensePage.module.css';

type FeaturedProduct = {
  handle: string;
  name: string;
  image: string;
};

const productSets: Record<defenseProductSet, readonly FeaturedProduct[]> = {
  fixed: [
    {
      handle: 'stationary-rf-detection-system',
      name: 'Stationary RF Identification System',
      image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
    },
    {
      handle: 'low-altitude-detection-radar-ku-band',
      name: 'Low-Altitude Early-Warning Radar (Ku-Band)',
      image: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
    },
    {
      handle: 'composite-electro-optical-tracking-system',
      name: 'Electro-Optical (EO) Tracking System',
      image: '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
    },
  ],
  mobile: [
    {
      handle: 'stationary-active-rf-defense-system',
      name: 'Fixed Low-Altitude Defense Site Unit',
      image: '/products/rf-systems/stationary-rf-analysis-unit.webp',
    },
    {
      handle: 'portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
      name: 'Integrated Low-Altitude Defense Field Kit (Pro)',
      image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
    },
    {
      handle: 'portable-active-rf-defense-system',
      name: 'Portable Low-Altitude Defense Field Unit',
      image: '/products/rf-systems/portable-navigation-signal-analysis-unit.webp',
    },
  ],
};

type TechnicalPoint = {
  title: string;
  description?: string;
};

function readTechnicalContent(solution: Solution) {
  let parameters: Record<string, unknown> = {};

  try {
    parameters = typeof solution.parameters_en === 'string'
      ? JSON.parse(solution.parameters_en)
      : (solution.parameters_en || {});
  } catch {
    parameters = {};
  }

  const rawPoints = Array.isArray(parameters.industry_pain_points)
    ? parameters.industry_pain_points.filter((item): item is string => typeof item === 'string')
    : [];
  const [introduction = '', ...items] = rawPoints;
  const points: TechnicalPoint[] = items.map((item) => {
    const separator = item.indexOf(':');
    if (separator < 0) return { title: item };

    return {
      title: item.slice(0, separator).trim(),
      description: item.slice(separator + 1).trim(),
    };
  });

  return {
    title: typeof parameters.industry_pain_points_title === 'string'
      ? parameters.industry_pain_points_title
      : 'Key Technical Points for Construction',
    introduction,
    points,
  };
}

function FeaturedProducts({ products, locale }: { products: readonly FeaturedProduct[]; locale: string }) {
  const localizedProducts = localizedefenseValue(locale, products);
  return localizedefenseTree(locale, (
    <div className={styles.productsBlock}>
      <h3>Featured Perimeter Defense Systems Products</h3>
      <p className={styles.swipeHint}>Swipe to view more products</p>
      <div className={styles.productGrid} aria-label="Swipe horizontally to view more featured products">
        {localizedProducts.map((product) => (
          <Link
            key={product.handle}
            href={localePath(locale, `/products/${product.handle}`)}
            className={styles.productCard}
            prefetch={false}
          >
            <span className={styles.productImage}>
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 72vw, 300px" />
            </span>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productLink}>View product <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  ));
}

function DefensePanel({
  title,
  description,
  background,
  productSet,
  locale,
}: {
  title: string;
  description: string;
  background: string;
  productSet: defenseProductSet;
  locale: string;
}) {
  return (
    <article className={styles.defensePanel} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.defenseOverlay} />
      <div className={styles.defenseContent}>
        <div className={styles.defenseCopy}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <FeaturedProducts products={productSets[productSet]} locale={locale} />
      </div>
    </article>
  );
}

export default function IndustryDefensePage({
  solution,
  pageData,
  locale,
  dict,
}: {
  solution: Solution;
  pageData: defenseIndustryPageData;
  locale: string;
  dict: any;
}) {
  const handle = solution.handle;
  const assetRoot = `/solutions/defense-applications/${handle}`;
  const technical = readTechnicalContent(solution);
  const title = solution.product_name_en || solution.title_en;
  const summary = solution.summary_en;
  const formDict = {
    ...dict,
    inquiry: {
      ...(dict?.inquiry || {}),
      title: defenseText(locale, 'Get Expert Platform Defense'),
      subtitle: defenseText(locale, 'Tell us about your site, airspace risks, coverage requirements and integration needs. Our specialists will help you plan the right platform defense solution.'),
    },
  };

  return localizedefenseTree(locale, (
    <main className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.container}>
          <Link href={localePath(locale)} prefetch={false}>Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={localePath(locale, '/solutions')} prefetch={false}>Solutions</Link>
          <span aria-hidden="true">/</span>
          <span>{pageData.breadcrumbLabel}</span>
        </div>
      </nav>

      <section className={styles.hero}>
        <Image src={`${assetRoot}/hero.webp`} alt={title} fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={`${styles.container} ${styles.heroContent}`}>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
      </section>

      <section className={styles.keySection}>
        <div className={styles.keyGrid}>
          <div className={styles.keyImage}>
            <Image
              src={`${assetRoot}/construction.webp`}
              alt={technical.title}
              fill
              sizes="(max-width: 991px) 100vw, 48vw"
            />
          </div>
          <div className={styles.keyContent}>
            <h2>{technical.title}</h2>
            {technical.introduction && <p className={styles.keyIntro}>{technical.introduction}</p>}
            {technical.points.length > 0 && (
              <div className={styles.keyPoints}>
                {technical.points.map((point, index) => (
                  <article key={`${point.title}-${index}`} className={styles.keyPoint}>
                    <div>
                      <h3>{point.title}</h3>
                      {point.description && <p>{point.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.defenseSection}>
        <div className={`${styles.container} ${styles.defenseHeading}`}>
          <h2>How We Defend Against Platform Interference</h2>
        </div>
        <div className={styles.defenseStack}>
          {pageData.stages.map((stage) => (
            <DefensePanel key={stage.title} {...stage} locale={locale} />
          ))}
        </div>
      </section>

      <section className={styles.formSection} id="inquiry">
        <div className={styles.formShell}>
          <InquiryForm dict={formDict} />
        </div>
      </section>
    </main>
  ));
}
