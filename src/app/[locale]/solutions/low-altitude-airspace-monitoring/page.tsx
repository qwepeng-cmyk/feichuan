import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Contact,
  Eye,
  FileClock,
  Monitor,
  Network,
  Radio,
  RadioTower,
  Radar,
  ScanSearch,
  Target,
} from 'lucide-react';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import { type Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { breadcrumbSchema, pageUrl } from '@/lib/structuredData';
import styles from './LowAltitudeAirspaceMonitoring.module.css';

const pageHandle = 'low-altitude-airspace-monitoring';
const pageTitle = 'Low-Altitude Airspace Monitoring';
const pageDescription =
  'Detect low-altitude activity, verify targets, generate alerts, and keep event records for coordinated site security response.';

const systemLayers = [
  {
    title: 'RF Monitoring',
    text: 'Monitor wireless signals and identify airspace activity.',
    icon: RadioTower,
  },
  {
    title: 'Radar Detection',
    text: 'Detect and locate low-altitude objects in real time.',
    icon: Target,
  },
  {
    title: 'Optical Tracking',
    text: 'Verify and track targets with high-resolution imaging.',
    icon: ScanSearch,
  },
  {
    title: 'Remote ID',
    text: 'Capture and analyze available Remote ID information.',
    icon: Contact,
  },
  {
    title: 'Command Linkage',
    text: 'Integrate with command systems for coordination.',
    icon: Monitor,
  },
  {
    title: 'Event Records',
    text: 'Record events and export comprehensive logs.',
    icon: FileClock,
  },
];

const workflow = [
  {
    title: 'Detect',
    text: 'Monitor the airspace and detect low-altitude activity.',
    icon: Radio,
  },
  {
    title: 'Verify',
    text: 'Classify and verify targets with multi-sensor fusion.',
    icon: Target,
  },
  {
    title: 'Track',
    text: 'Track movement and generate real-time alerts.',
    icon: ScanSearch,
  },
  {
    title: 'Record',
    text: 'Record events and support post-event analysis.',
    icon: ClipboardList,
  },
];

const packages = [
  {
    title: 'Fixed Industrial Site',
    meta: 'Energy, chemical, logistics, and industrial parks',
    image: '/cases/brazil-refinery-airspace-monitoring/main.webp?v=2026060102',
    points: ['RF Monitoring', 'Radar Detection', 'Optical Tracking', 'Command Linkage', 'Event Records'],
  },
  {
    title: 'Public Venue',
    meta: 'Event, stadium, transport, and key-area operations',
    image: '/cases/asian-games-security/main-home.webp',
    points: ['RF Monitoring', 'Radar Detection', 'Optical Tracking', 'Command Linkage', 'Event Records'],
  },
  {
    title: 'Airport / Large Perimeter',
    meta: 'Wide boundary monitoring and layered airspace awareness',
    image: '/cases/airport-security-application/main.webp?v=2026060102',
    points: ['RF Monitoring', 'Radar Detection', 'Optical Tracking', 'Command Linkage', 'Event Records'],
  },
];

const relatedEquipment = [
  {
    title: 'Stationary RF Detection System',
    role: 'RF monitoring layer',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    href: '/products/stationary-rf-detection-system',
    imageClass: 'equipmentImageRf',
  },
  {
    title: 'Low-Altitude Detection Radar',
    role: 'Radar detection layer',
    image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
    href: '/products/low-altitude-detection-radar-ku-band',
    imageClass: 'equipmentImageRadar',
  },
  {
    title: 'Electro-Optical Tracking System',
    role: 'Visual verification layer',
    image: '/products/02-drone-detection/electro-optical-tracking-system.webp',
    href: '/products/composite-electro-optical-tracking-system',
    imageClass: 'equipmentImageOptical',
  },
  {
    title: 'UAV Remote ID Monitoring System',
    role: 'Identity monitoring layer',
    image: '/products/02-drone-detection/portable-rf-detection-case.webp',
    href: '/products/uav-remote-id-monitoring-system',
    imageClass: 'equipmentImagePortable',
  },
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${pageHandle}`,
    fallbackTitle: `${pageTitle} | N-TET`,
    fallbackDescription: pageDescription,
    fallbackKeywords: [
      'low-altitude airspace monitoring',
      'drone detection equipment',
      'RF monitoring system',
      'low-altitude detection radar',
      'electro-optical tracking system',
    ],
    image: '/products/02-drone-detection/drone-detection-home.webp',
  });
}

function Breadcrumbs({
  locale,
  homeLabel,
  solutionsLabel,
}: {
  locale: Locale;
  homeLabel: string;
  solutionsLabel: string;
}) {
  return (
    <nav className="product-breadcrumb-nav" aria-label="Breadcrumb">
      <div className="container">
        <div className="breadcrumb-path">
          <Link prefetch={false} href={localePath(locale, '/')}>{homeLabel}</Link>
          <span>&gt;</span>
          <Link prefetch={false} href={localePath(locale, '/solutions')}>{solutionsLabel}</Link>
          <span>&gt;</span>
          <span>{pageTitle}</span>
        </div>
      </div>
    </nav>
  );
}

function HeroVisual() {
  return (
    <div className={styles.heroVisual} aria-label="Low-altitude monitoring equipment composition">
      <Image
        src="/products/02-drone-detection/stationary-rf-detection-system.webp"
        alt="Stationary RF detection unit"
        width={300}
        height={210}
        className={`${styles.deviceImage} ${styles.deviceRf}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/low-altitude-detection-radar.webp"
        alt="Low-altitude detection radar"
        width={360}
        height={230}
        className={`${styles.deviceImage} ${styles.deviceRadar}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/electro-optical-tracking-system.webp"
        alt="Electro-optical tracking unit"
        width={260}
        height={220}
        className={`${styles.deviceImage} ${styles.deviceOptical}`}
        priority
      />
      <Image
        src="/products/02-drone-detection/portable-rf-detection-case.webp"
        alt="Portable RF detection case"
        width={290}
        height={220}
        className={`${styles.deviceImage} ${styles.devicePortable}`}
        priority
      />
    </div>
  );
}

function DesktopLanding({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.desktopPage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <h1><span className={styles.nowrap}>Low-Altitude</span> Airspace Monitoring</h1>
          <p>
            Detect low-altitude activity, verify targets, generate alerts, and support coordinated site response
            through RF monitoring, radar detection, optical tracking, and event records.
          </p>
          <div className={styles.heroActions}>
            <Link prefetch={false} href="#inquiry" className={styles.primaryCta}>
              Request Site Assessment
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link prefetch={false} href="#equipment" className={styles.secondaryCta}>
              View Monitoring Equipment
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section id="equipment" className={styles.layerSection}>
        <div className={styles.layerGrid}>
          {systemLayers.map((item) => {
            const Icon = item.icon;
            return (
              <article className={styles.layerCard} key={item.title}>
                <div className={styles.layerIcon}>
                  <Icon size={52} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.sectionHeader}>
          <h2>Related Equipment</h2>
        </div>
        <div className={styles.equipmentGrid}>
          {relatedEquipment.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.equipmentCard} key={item.title}>
              <div className={styles.equipmentImageWrap}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280}
                  height={180}
                  className={`${styles.equipmentImage} ${styles[item.imageClass]}`}
                />
              </div>
              <div className={styles.equipmentBody}>
                <span>{item.role}</span>
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.sectionHeader}>
          <h2>From Discovery to Coordinated Response</h2>
        </div>
        <div className={styles.workflowTrack}>
          {workflow.map((item, index) => (
            <article className={styles.workflowStep} key={item.title}>
              <div className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</div>
              <div className={styles.workflowIcon}>
                <item.icon size={52} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.packageSection}>
        <div className={styles.sectionHeader}>
          <h2>Solutions for Different Sites</h2>
        </div>
        <div className={styles.packageGrid}>
          {packages.map((item) => (
            <article className={styles.packageCard} key={item.title}>
              <Image src={item.image} alt="" width={420} height={230} className={styles.packageImage} />
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link prefetch={false} href="#inquiry" className={styles.learnMore}>
                Learn More
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="inquiry" className={styles.inquirySection}>
        <InquiryForm dict={dict} />
      </section>
    </main>
  );
}

function MobileLanding({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.mobilePage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.mobileHero}>
        <h1>
          <span className={styles.nowrap}>Low-Altitude</span>
          <span className={styles.mobileTitleLine}>Airspace</span>
          <span className={styles.mobileTitleLine}>Monitoring</span>
        </h1>
        <p>Detect low-altitude activity, verify targets, generate alerts, and keep event records for coordinated site response.</p>
        <HeroVisual />
        <div className={styles.mobileActions}>
          <Link prefetch={false} href="#mobile-inquiry" className={styles.primaryCta}>
            Request Site Assessment
          </Link>
          <Link prefetch={false} href="#mobile-equipment" className={styles.secondaryCta}>
            View Equipment
          </Link>
        </div>
      </section>

      <section id="mobile-equipment" className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>System Layers</span>
          <h2>Monitoring Architecture</h2>
        </div>
        <div className={styles.mobileLayerGrid}>
          {systemLayers.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={styles.mobileLayerCard}>
                <Icon size={34} strokeWidth={1.9} aria-hidden="true" />
                <h3>{item.title}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <h2>Related Equipment</h2>
        </div>
        <div className={styles.mobileEquipmentGrid}>
          {relatedEquipment.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.mobileEquipmentCard} key={item.title}>
              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={120}
                className={`${styles.mobileEquipmentImage} ${styles[item.imageClass]}`}
              />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>Workflow</span>
          <h2>Discovery to Records</h2>
        </div>
        <div className={styles.mobileTimeline}>
          {workflow.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={styles.mobileStep}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <div className={styles.mobileStepIcon}>
                  <Icon size={30} strokeWidth={1.9} aria-hidden="true" />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>Site Packages</span>
          <h2>Choose by Site Type</h2>
        </div>
        <div className={styles.mobilePackages}>
          {packages.map((item) => (
            <article key={item.title} className={styles.mobilePackageCard}>
              <Image src={item.image} alt={item.title} width={420} height={205} className={styles.mobilePackageImage} />
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
              <ul>
                {item.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="mobile-inquiry" className={styles.mobileInquirySection}>
        <MobileInquiryForm dict={dict} />
      </section>
    </main>
  );
}

export default async function LowAltitudeAirspaceMonitoringPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = await getDictionary(locale);
  const breadcrumbs = [
    { name: dict.nav.home || 'Home', url: pageUrl(locale, '/') },
    { name: dict.nav.solutions || 'Solutions', url: pageUrl(locale, '/solutions') },
    { name: pageTitle, url: pageUrl(locale, `/solutions/${pageHandle}`) },
  ];

  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema(breadcrumbs)] }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}} />
      <div className="pc_only">
        <DesktopLanding locale={locale} dict={dict} />
      </div>
      <div className="mobile_only">
        <MobileLanding locale={locale} dict={dict} />
      </div>
    </>
  );
}
