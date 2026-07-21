import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import JsonLd from '@/components/seo/JsonLd';
import { localePath } from '@/lib/localePath';
import { pageUrl, productJsonLd } from '@/lib/structuredData';
import type { Locale } from '@/i18n/config';
import styles from './DroneNetLauncherDetail.module.css';

type GalleryVideo = { src: string; kind?: string };

const COPY: Record<Locale, {
  eyebrow: string;
  quote: string;
  whatsapp: string;
  publishedSpeed: string;
  captureDistance: string;
  moduleWeight: string;
  netOptions: string;
  specifications: string;
  evidence: string;
  evidenceTitle: string;
  handheldDemo: string;
  multiDemo: string;
  photoLabels: string[];
}> = {
  en: {
    eyebrow: 'Handheld / physical capture',
    quote: 'Request configuration & pricing',
    whatsapp: 'Discuss your site',
    publishedSpeed: 'Published net speed',
    captureDistance: 'Capture distance',
    moduleWeight: 'Module weight',
    netOptions: 'Net coverage options',
    specifications: 'Technical specifications',
    evidence: 'Product evidence',
    evidenceTitle: 'See the module, deployed net and field demonstrations',
    handheldDemo: 'Handheld launch demonstration',
    multiDemo: 'Multi-scenario deployment demonstration',
    photoLabels: ['Handheld configuration', 'Net module side view', 'Deployed nylon net', 'Handheld field check'],
  },
  ru: {
    eyebrow: 'Ручное / физический захват',
    quote: 'Запросить конфигурацию и цену',
    whatsapp: 'Обсудить объект',
    publishedSpeed: 'Заявленная скорость сети',
    captureDistance: 'Дистанция захвата',
    moduleWeight: 'Масса модуля',
    netOptions: 'Варианты площади сети',
    specifications: 'Технические характеристики',
    evidence: 'Материалы о продукте',
    evidenceTitle: 'Модуль, раскрытая сеть и полевые демонстрации',
    handheldDemo: 'Демонстрация ручного запуска',
    multiDemo: 'Демонстрация в нескольких сценариях',
    photoLabels: ['Ручная конфигурация', 'Сетевой модуль, вид сбоку', 'Раскрытая нейлоновая сеть', 'Проверка ручной конфигурации'],
  },
  es: {
    eyebrow: 'Portátil / captura física',
    quote: 'Solicitar configuración y precio',
    whatsapp: 'Comentar su emplazamiento',
    publishedSpeed: 'Velocidad publicada de la red',
    captureDistance: 'Distancia de captura',
    moduleWeight: 'Peso del módulo',
    netOptions: 'Opciones de cobertura',
    specifications: 'Especificaciones técnicas',
    evidence: 'Evidencia del producto',
    evidenceTitle: 'Vea el módulo, la red desplegada y las demostraciones',
    handheldDemo: 'Demostración de lanzamiento portátil',
    multiDemo: 'Demostración en varios escenarios',
    photoLabels: ['Configuración portátil', 'Vista lateral del módulo', 'Red de nailon desplegada', 'Comprobación de campo'],
  },
  ar: {
    eyebrow: 'محمول / التقاط مادي',
    quote: 'اطلب التهيئة والسعر',
    whatsapp: 'ناقش موقعك',
    publishedSpeed: 'سرعة الشبكة المعلنة',
    captureDistance: 'مسافة الالتقاط',
    moduleWeight: 'وزن الوحدة',
    netOptions: 'خيارات مساحة الشبكة',
    specifications: 'المواصفات الفنية',
    evidence: 'أدلة المنتج',
    evidenceTitle: 'شاهد الوحدة والشبكة المنشورة والعروض الميدانية',
    handheldDemo: 'عرض الإطلاق المحمول',
    multiDemo: 'عرض النشر في سيناريوهات متعددة',
    photoLabels: ['التهيئة المحمولة', 'منظر جانبي لوحدة الشبكة', 'شبكة النايلون بعد النشر', 'فحص ميداني للتهيئة المحمولة'],
  },
};

function readJson<T>(value: unknown, fallback: T): T {
  if (!value) return fallback;
  if (typeof value !== 'string') return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function localized(product: any, field: string, locale: Locale) {
  return product[`${field}_${locale}`] || product[`${field}_en`] || '';
}

function ProductSpecs({ parameters }: { parameters: Record<string, unknown> }) {
  return (
    <div className={styles.specRows}>
      {Object.entries(parameters).map(([key, value]) => (
        <div className={styles.specRow} key={key}>
          <span className={styles.specKey}>{key}</span>
          <span className={styles.specValue}>{String(value)}</span>
        </div>
      ))}
    </div>
  );
}

function DesktopDetail({ product, locale, dict, name, summary, detailHtml, images, videos, parameters }: any) {
  const copy = COPY[locale as Locale];
  return (
    <div className={styles.desktop}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href={localePath(locale)}>{dict.nav.home}</Link> /{' '}
          <Link href={localePath(locale, '/products')}>{dict.nav.products}</Link> / {name}
        </div>
      </div>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.eyebrow}>{copy.eyebrow}</span>
              <h1>{name}</h1>
              <p className={styles.heroSummary}>{summary}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#net-launcher-inquiry">{copy.quote}</a>
                <PrimaryContactButton
                  sourceLabel="handheld_drone_net_launcher_hero"
                  productName={name}
                  productHandle="handheld-drone-net-launcher"
                  ctaLocation="product_hero"
                  className={styles.secondaryButton}
                >
                  {copy.whatsapp}
                </PrimaryContactButton>
              </div>
            </div>
            <div className={styles.productStage}>
              <Image className={styles.stageImage} src={images[0]} alt={name} fill priority sizes="(max-width: 991px) 100vw, 46vw" />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.statsBar}>
          <Stat value="50 m/s" label={copy.publishedSpeed} />
          <Stat value="10–20 m" label={copy.captureDistance} />
          <Stat value="370 g" label={copy.moduleWeight} />
          <Stat value="3.3 / 5 m" label={copy.netOptions} />
        </div>
      </div>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            <OptimizedRichText className={styles.richText} html={detailHtml} />
            <section className={styles.specPanel}>
              <h2>{copy.specifications}</h2>
              <ProductSpecs parameters={parameters} />
            </section>
          </div>
        </div>
      </section>

      <EvidenceSection copy={copy} images={images} videos={videos} name={name} />

      <section id="net-launcher-inquiry" className={styles.inquiry}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <InquiryForm dict={dict} />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function EvidenceSection({ copy, images, videos, name }: { copy: typeof COPY.en; images: string[]; videos: GalleryVideo[]; name: string }) {
  return (
    <section className={styles.mediaSection}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionEyebrow}>{copy.evidence}</span>
            <h2>{copy.evidenceTitle}</h2>
          </div>
        </div>
        <div className={styles.mediaGrid}>
          {(images as string[]).map((src: string, index: number) => (
            <figure className={styles.mediaCard} key={src}>
              <div className={styles.photo}>
                <Image src={src} alt={`${name} — ${copy.photoLabels[index] || index + 1}`} fill sizes="(max-width: 991px) 100vw, 47vw" />
              </div>
              <figcaption className={styles.mediaLabel}>{copy.photoLabels[index] || name}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <article className={styles.videoCard} key={video.src}>
              <video controls preload="none" playsInline>
                <source src={video.src} type="video/mp4" />
              </video>
              <h3>{index === 0 ? copy.handheldDemo : copy.multiDemo}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileDetail({ product, locale, dict, name, summary, detailHtml, images, videos, parameters }: any) {
  const copy = COPY[locale as Locale];
  return (
    <div className={styles.mobile}>
      <section className={styles.mobileHero}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <div className={styles.mobileTitle} role="heading" aria-level={1}>{name}</div>
        <p>{summary}</p>
        <div className={styles.mobileImage}>
          <Image src={images[0]} alt={name} fill priority sizes="100vw" />
        </div>
        <div className={styles.mobileStats}>
          <MobileStat value="50 m/s" label={copy.publishedSpeed} />
          <MobileStat value="10–20 m" label={copy.captureDistance} />
          <MobileStat value="370 g" label={copy.moduleWeight} />
          <MobileStat value="3.3 / 5 m" label={copy.netOptions} />
        </div>
        <a className={styles.primaryButton} href="#mobile-net-inquiry" style={{ width: '100%', marginTop: '18px' }}>{copy.quote}</a>
      </section>

      <section className={styles.mobileSection}>
        <OptimizedRichText className={styles.richText} html={detailHtml} />
      </section>

      <section className={styles.mobileSection}>
        <h2>{copy.specifications}</h2>
        <table className={styles.mobileTable}>
          <tbody>
            {Object.entries(parameters).map(([key, value]) => (
              <tr key={key}><th>{key}</th><td>{String(value)}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.mobileSection} style={{ background: '#0d1728', color: '#fff' }}>
        <span className={styles.sectionEyebrow}>{copy.evidence}</span>
        <h2>{copy.evidenceTitle}</h2>
        <div className={styles.mobileGallery}>
          {(images as string[]).map((src: string, index: number) => (
            <div className={styles.mobilePhoto} key={src}>
              <Image src={src} alt={`${name} — ${copy.photoLabels[index] || index + 1}`} fill sizes="100vw" />
            </div>
          ))}
        </div>
        {(videos as GalleryVideo[]).map((video: GalleryVideo) => (
          <div className={styles.mobileVideo} key={video.src}>
            <video controls preload="none" playsInline>
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </section>

      <section id="mobile-net-inquiry" className={styles.mobileSection}>
        <MobileInquiryForm dict={dict} />
      </section>
    </div>
  );
}

function MobileStat({ value, label }: { value: string; label: string }) {
  return <div className={styles.mobileStat}><strong>{value}</strong><span>{label}</span></div>;
}

export default function DroneNetLauncherDetail({ product, locale, dict }: { product: any; locale: Locale; dict: any }) {
  const name = localized(product, 'product_name', locale);
  const summary = localized(product, 'summary', locale);
  const detailHtml = localized(product, 'detail_html', locale);
  const parameters = readJson<Record<string, unknown>>(localized(product, 'parameters', locale), {});
  const images = readJson<string[]>(product.gallery_images, [product.main_image].filter(Boolean));
  const videos = readJson<GalleryVideo[]>(product.videos, []);
  const jsonLd = productJsonLd({
    locale,
    handle: product.handle,
    name,
    description: summary,
    image: product.main_image,
    category: product.category_primary,
    breadcrumbs: [
      { name: dict.nav.home, url: pageUrl(locale, '/') },
      { name: dict.nav.products, url: pageUrl(locale, '/products') },
      { name, url: pageUrl(locale, `/products/${product.handle}`) },
    ],
  });

  const props = { product, locale, dict, name, summary, detailHtml, images, videos, parameters };
  return (
    <div className={styles.page} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <JsonLd data={jsonLd} />
      <DesktopDetail {...props} />
      <MobileDetail {...props} />
    </div>
  );
}
