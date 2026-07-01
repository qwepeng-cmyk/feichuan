import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileClock,
  Landmark,
  Plane,
  RadioTower,
  Route,
  ScanSearch,
  Ship,
  Target,
  Zap,
} from 'lucide-react';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import InquiryForm from '@/components/products/InquiryForm';
import MobileInquiryForm from '@/components/mobile/MobileInquiryForm';
import JsonLd from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n/getDictionary';
import { type Locale } from '@/i18n/config';
import { localePath } from '@/lib/localePath';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import { breadcrumbSchema, pageUrl } from '@/lib/structuredData';
import OpenLinksInNewTab from './OpenLinksInNewTab';
import styles from './LowAltitudeAirspaceMonitoring.module.css';

const pageHandle = 'low-altitude-airspace-monitoring';
const pageTitle = 'Low-Altitude Airspace Security & C-UAS';
const pageDescription =
  'Low-altitude airspace security and C-UAS site plans for anti drone early warning, identification, positioning, tracking, EO verification, response coordination, and event records.';

const heroPoints = [
  'Site airspace security architecture for critical facilities',
  'RF, radar, EO, and Remote ID inputs in one plan',
  'Alert review, response coordination, and event records',
  'Site-based layout, equipment list, and quotation',
];

const incidentGallery = [
  {
    caption: 'Public-site night event',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/public-site-night-event.webp',
  },
  {
    caption: 'Aircraft operation disruption',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/aircraft-operation-disruption.webp',
  },
  {
    caption: 'Maritime critical-operation exposure',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/maritime-critical-operation.webp',
  },
  {
    caption: 'Energy facility exposure',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/energy-facility-exposure.webp',
  },
  {
    caption: 'Perimeter overflight',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/perimeter-overflight.webp',
  },
  {
    caption: 'Restricted airspace intrusion',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/restricted-airspace-intrusion.webp',
  },
  {
    caption: 'Utility corridor incident',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/utility-corridor-incident.webp',
  },
  {
    caption: 'Public-building drone sighting',
    image: '/solutions/low-altitude-airspace-monitoring/incident-gallery/public-building-sighting.webp',
  },
];

const systemLayers = [
  {
    title: 'Site Plan',
    text: 'Define perimeter zones, key areas, operator roles, alert contacts, and a practical C-UAS layout before equipment selection.',
    icon: ClipboardList,
  },
  {
    title: 'Early Warning',
    text: 'Use RF, radar, EO, and Remote ID inputs to raise early warning when low-altitude activity appears near the site.',
    icon: RadioTower,
  },
  {
    title: 'Identification',
    text: 'Compare signal, position, visual, and available identity clues so operators can classify the event before escalation.',
    icon: ScanSearch,
  },
  {
    title: 'Positioning',
    text: 'Show the target position and activity area on the map to support command-room review and field coordination.',
    icon: Target,
  },
  {
    title: 'Tracking',
    text: 'Keep the movement path, status changes, and review notes visible as the event moves across the perimeter.',
    icon: Route,
  },
  {
    title: 'Response Review',
    text: 'Link alerts, operator actions, and event records for on-site response, reporting, and later system optimization.',
    icon: FileClock,
  },
];

const compositionCards = [
  {
    title: 'Airspace Sensing Layer',
    points: ['RF signal awareness', 'Low-altitude radar coverage', 'Electro-optical verification'],
    images: [
      {
        src: '/products/02-drone-detection/stationary-rf-detection-system.webp',
        alt: 'Stationary RF awareness unit',
        href: '/products/stationary-rf-detection-system',
      },
      {
        src: '/products/02-drone-detection/low-altitude-detection-radar.webp',
        alt: 'Low-altitude radar unit',
        href: '/products/low-altitude-detection-radar-ku-band',
      },
      {
        src: '/products/02-drone-detection/electro-optical-tracking-system.webp',
        alt: 'Electro-optical verification unit',
        href: '/products/composite-electro-optical-tracking-system',
      },
    ],
  },
  {
    title: 'Review & Linkage Layer',
    points: ['Multi-source alert review', 'Visual confirmation workflow', 'Patrol and command-room coordination'],
    images: [
      {
        src: '/products/02-drone-detection/portable-rf-detection-case.webp',
        alt: 'Portable field C-UAS kit',
        href: '/products/portable-rf-detection-case',
      },
      {
        src: '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
        alt: 'Remote ID review equipment',
        href: '/products/uav-remote-id-monitoring-system',
      },
    ],
  },
  {
    title: 'Low-Altitude Management Platform',
    points: ['Fixed command workstation', 'Mobile operator access', 'Map, alert, and record management'],
    images: [
      {
        src: '/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp',
        alt: 'Low-altitude management platform interface',
      },
    ],
  },
];

const deploymentModes = [
  {
    title: 'Fixed Site Coverage',
    subtitle: 'Always-on coverage for planned perimeters',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    alt: 'Fixed low-altitude C-UAS equipment',
    href: '/products/stationary-rf-detection-system',
    steps: ['Plan', 'Early Warning', 'Identification', 'Positioning', 'Tracking', 'Handling'],
  },
  {
    title: 'Vehicle-Mobile Option',
    subtitle: 'Mobile coverage for temporary or changing sites',
    image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
    alt: 'Vehicle-mobile C-UAS equipment',
    imageClass: 'deploymentVehicleImage',
    steps: ['Plan', 'Early Warning', 'Identification', 'Handling'],
  },
  {
    title: 'Portable Field Option',
    subtitle: 'Flexible support for field teams and short-term tasks',
    image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
    alt: 'Integrated C-UAS field kit pro',
    href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
    steps: ['Flexible Setup', 'Quick Response'],
  },
];

const packages = [
  {
    title: 'Industrial Site Safety Operations',
    meta: 'Energy, chemical, logistics, and industrial parks',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    points: ['Perimeter and key-area awareness', 'Low-altitude warning and visual review', 'Security, patrol, and event records'],
  },
  {
    title: 'Public Venue & Event Operations',
    meta: 'Event, stadium, transport, and controlled-site operations',
    image: '/cases/asian-games-security/main-home.webp',
    points: ['Temporary or fixed site plan', 'Crowd-area and perimeter awareness', 'Event-time response coordination'],
  },
  {
    title: 'Airport & Large Perimeter Operations',
    meta: 'Wide boundary coverage and layered airspace awareness',
    image: '/cases/airport-security-application/main-home.webp',
    points: ['Runway, apron, and boundary review', 'Wide-area positioning and tracking', 'Visual identification and records'],
  },
];

const caseReferences = [
  {
    title: 'Asian Games Low-Altitude C-UAS Application',
    image: '/cases/asian-games-security/main.webp',
    href: '/cases/asian-games-security',
  },
  {
    title: 'C-UAS Case of a Group Factory in Nigeria',
    image: '/cases/nigeria-factory-airspace-monitoring/main.webp',
    href: '/cases/nigeria-factory-low-altitude-monitoring',
  },
  {
    title: 'C-UAS Case of a Power Plant in Pakistan',
    image: '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
    href: '/cases/pakistan-power-plant-low-altitude-monitoring',
  },
  {
    title: 'C-UAS Case of a Refinery in Brazil',
    image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
    href: '/cases/brazil-refinery-low-altitude-monitoring',
  },
  {
    title: 'Airport C-UAS Application',
    image: '/cases/airport-security-application/main-home.webp',
    href: '/cases/airport-security-application',
  },
  {
    title: 'Water Conservancy Facility Low-Altitude C-UAS',
    image: '/cases/water-conservancy-security/main.webp',
    href: '/cases/water-conservancy-security',
  },
];

const siteScenarios = [
  {
    title: 'Airport / Runway Protection',
    text: 'Plan RF, radar, EO, and event records around runways, aprons, boundary roads, and operation zones.',
    icon: Plane,
  },
  {
    title: 'Oil & Gas / Refinery Protection',
    text: 'Support early warning, identification, and tracking around process units, tank farms, loading areas, and logistics gates.',
    icon: Factory,
  },
  {
    title: 'Power Plant & Substation Protection',
    text: 'Support early warning, alert review, and command workflows for critical energy facilities.',
    icon: Zap,
  },
  {
    title: 'Port & Border Perimeter Coverage',
    text: 'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.',
    icon: Ship,
  },
  {
    title: 'Controlled Facility / Key Area Security',
    text: 'Identify, locate, and review low-altitude activity around controlled zones and high-value facilities.',
    icon: Landmark,
  },
  {
    title: 'Stadium & Event Airspace Security',
    text: 'Support temporary or fixed C-UAS plans for venues, events, and public operations.',
    icon: Building2,
  },
];

const relatedEquipment = [
  {
    title: 'Stationary RF Identification System',
    role: 'Fixed RF early warning',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    href: '/products/stationary-rf-detection-system',
    imageClass: 'equipmentImageRf',
    points: ['Fixed-site RF awareness', 'Early warning and event records'],
  },
  {
    title: 'Low-Altitude Early-Warning Radar (Ku-Band)',
    role: 'Wide-area positioning',
    image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
    href: '/products/low-altitude-detection-radar-ku-band',
    imageClass: 'equipmentImageRadar',
    points: ['Wide-area low-altitude coverage', 'Positioning and tracking support'],
  },
  {
    title: 'Low-Altitude Early-Warning Radar (X-Band)',
    role: 'Extended radar option',
    image: '/products/02-drone-detection/low-altitude-detection-radar-x-band.webp',
    href: '/products/low-altitude-3d-pulse-doppler-radar',
    imageClass: 'equipmentImageRadar',
    points: ['3D target positioning support', 'Track review for larger perimeters'],
  },
  {
    title: 'Electro-Optical Tracking System',
    role: 'Visual identification',
    image: '/products/02-drone-detection/electro-optical-tracking-system.webp',
    href: '/products/composite-electro-optical-tracking-system',
    imageClass: 'equipmentImageOptical',
    points: ['Visual identification and review', 'Day and night tracking support'],
  },
  {
    title: 'UAV Remote ID Recognition System',
    role: 'Identity review',
    image: '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
    href: '/products/uav-remote-id-monitoring-system',
    imageClass: 'equipmentImagePortable',
    points: ['Remote ID information reading', 'Operator review and records'],
  },
  {
    title: 'Portable RF Identification System',
    role: 'Field verification',
    image: '/products/02-drone-detection/portable-rf-detection-case.webp',
    href: '/products/portable-rf-detection-case',
    imageClass: 'equipmentImagePortable',
    points: ['Portable field deployment', 'Event review and handover support'],
  },
  {
    title: 'Handheld RF Identification System',
    role: 'Mobile inspection',
    image: '/products/02-drone-detection/handheld-rf-detection-system-pl280h.webp',
    href: '/products/handheld-rf-detection-system-mini',
    imageClass: 'equipmentImageHandheld',
    points: ['Handheld signal identification', 'Flexible perimeter patrol support'],
  },
  {
    title: 'Directional RF C-UAS Site Unit',
    role: 'Directional RF site unit',
    image: '/products/rf-systems/directional-rf-unit.webp',
    href: '/products/directional-rf-event-logging',
    imageClass: 'equipmentImageDirectional',
    points: ['Directional RF event logging', 'Supports positioning and response review'],
  },
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildSeoMetadata({
    locale: params.locale,
    path: `/solutions/${pageHandle}`,
    fallbackTitle: `${pageTitle} | N-TET`,
    fallbackDescription: pageDescription,
    fallbackKeywords: [
      'C-UAS systems',
      'C-UAS technology',
      'anti drone',
      'anti drone solution',
      'Drone detection and tracking',
      'drone detector',
      'drone radar',
      'UAV detection system',
      'C-UAS equipment',
      'RF detection system',
      'low-altitude detection radar',
      'electro-optical tracking system',
      'detector de drone',
      'detector de drones',
      'radar de drone',
      'radar de drones',
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
    <div className={styles.heroVisual} aria-label="Low-altitude airspace C-UAS equipment composition">
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

function ScenarioEntrance() {
  return (
    <section className={styles.scenarioSection}>
      <div className={styles.sectionHeader}>
        <h2>Choose by Site Type</h2>
        <p>Select the operating environment closest to your site, then request a C-UAS layout and quotation.</p>
      </div>
      <div className={styles.scenarioGrid}>
        {siteScenarios.map((item) => {
          const Icon = item.icon;
          return (
            <article className={styles.scenarioCard} key={item.title}>
              <div className={styles.scenarioIcon}>
                <Icon size={28} strokeWidth={1.9} aria-hidden="true" />
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
  );
}

function SiteProblemSection() {
  return (
    <section className={styles.problemSection}>
      <div className={styles.problemIntro}>
        <h2>Unauthorized Drone Events Are Increasing</h2>
        <p>
          Patterns seen across controlled sites, transport areas, public buildings, utility corridors, and critical operations.
        </p>
      </div>
      <div className={styles.problemGrid}>
        {incidentGallery.map((item) => (
          <figure className={styles.problemCard} key={item.caption}>
            <Image
              src={item.image}
              alt={item.caption}
              width={420}
              height={240}
              sizes="(max-width: 640px) 100vw, (max-width: 991px) 50vw, 25vw"
            />
            <figcaption>
              <span aria-hidden="true">&bull;</span>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function SystemCompositionSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.compositionSection}>
      <div className={styles.compositionHeader}>
        <span className={styles.sectionEyebrow}>System composition</span>
        <h2>Low-Altitude Airspace Security System Composition</h2>
        <p>
          A practical site plan combines airspace sensing, operator review, field coordination, and platform-based
          records so buyers can compare coverage, workflow, and quotation details.
        </p>
      </div>
      <div className={styles.compositionFlow}>
        {compositionCards.map((item, index) => (
          <div className={styles.compositionNode} key={item.title}>
            <article className={styles.compositionCard}>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className={styles.compositionImages}>
                {item.images.map((image) => {
                  const imageElement = (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={260}
                      height={150}
                      className={styles.compositionImage}
                    />
                  );

                  if (!('href' in image)) {
                    return (
                      <div key={image.src} className={styles.compositionImageStatic}>
                        {imageElement}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={image.src}
                      prefetch={false}
                      href={localePath(locale, image.href)}
                      className={styles.compositionImageLink}
                      aria-label={`View ${image.alt}`}
                    >
                      {imageElement}
                    </Link>
                  );
                })}
              </div>
            </article>
            {index < compositionCards.length - 1 ? (
              <span className={styles.compositionPlus} aria-hidden="true">+</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function DeploymentModesSection({ locale }: { locale: Locale }) {
  return (
    <section className={styles.deploymentSection}>
      <div className={styles.deploymentHeader}>
        <span className={styles.sectionEyebrow}>Coverage modes</span>
        <h2>Fixed and Mobile Coverage Options</h2>
        <p>
          Different sites can choose a fixed, vehicle-mobile, or portable setup according to perimeter size,
          deployment time, and operator workflow.
        </p>
      </div>
      <div className={styles.deploymentGrid}>
        {deploymentModes.map((item) => (
          <article className={styles.deploymentCard} key={item.title}>
            <div className={styles.deploymentTitleBar}>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
            <div className={styles.deploymentImageWrap}>
              {'href' in item ? (
                <Link
                  prefetch={false}
                  href={localePath(locale, item.href)}
                  className={styles.deploymentImageLink}
                  aria-label={`View ${item.alt}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={360}
                    height={220}
                    className={styles.deploymentImage}
                  />
                </Link>
              ) : (
                <div className={styles.deploymentImageStatic}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={624}
                    height={416}
                    className={`${styles.deploymentImage} ${styles[item.imageClass]}`}
                  />
                </div>
              )}
            </div>
            <div className={styles.deploymentSteps}>
              {item.steps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesktopLanding({ locale, dict }: { locale: Locale; dict: any }) {
  return (
    <main className={`${styles.page} ${styles.desktopPage}`}>
      <Breadcrumbs locale={locale} homeLabel={dict.nav.home} solutionsLabel={dict.nav.solutions} />

      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <span className={styles.heroEyebrow}>Low-Altitude Airspace Security Plan</span>
          <h1>
            <span className={styles.titleLine}>Low-Altitude Airspace</span>
            <span className={styles.titleLine}>Security for Critical Sites</span>
          </h1>
          <p>
            C-UAS and anti drone site planning with RF awareness, drone radar, EO verification, Remote ID review,
            early warning, identification, positioning, tracking, response coordination, and event records for critical sites.
          </p>
          <ul className={styles.heroPoints}>
            {heroPoints.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link prefetch={false} href="#inquiry" className={styles.primaryCta}>
              Get Site Plan & Quote
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <WhatsAppLeadButton sourceLabel="low_altitude_landing_hero_whatsapp" className={`${styles.secondaryCta} ${styles.whatsappCta}`}>
              WhatsApp Chat
            </WhatsAppLeadButton>
          </div>
        </div>
        <HeroVisual />
      </section>

      <SiteProblemSection />

      <SystemCompositionSection locale={locale} />

      <DeploymentModesSection locale={locale} />

      <ScenarioEntrance />

      <section id="equipment" className={styles.layerSection}>
        <div className={styles.sectionHeader}>
          <h2>Low-Altitude C-UAS Workflow</h2>
          <p>Adapted from fixed and mobile operation patterns: plan the site, raise early warning, identify, position, track, coordinate response, and keep reviewable records.</p>
        </div>
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
          <h2>C-UAS Equipment for Site Plans</h2>
          <p>Choose fixed, mobile, radar, RF, EO, and Remote ID equipment according to the site plan, early warning, identification, positioning, tracking, response, and record requirements.</p>
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
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.packageSection}>
        <div className={styles.sectionHeader}>
          <h2>Low-Altitude Site Operations</h2>
          <p>Use these examples to plan low-altitude awareness, perimeter security, response coordination, and reviewable records for different operating sites.</p>
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
        <div className={styles.caseReferenceGrid}>
          {caseReferences.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.caseReferenceCard} key={item.href}>
              <div className={styles.caseReferenceImageBox}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 1200px) 33vw, 400px" className={styles.caseReferenceImage} />
              </div>
              <div className={styles.caseReferenceBody}>
                <h4>{item.title}</h4>
              </div>
            </Link>
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
          <span className={styles.mobileTitleLine}>Airspace Security</span>
          <span className={styles.mobileTitleLine}>C-UAS</span>
        </h1>
        <p>C-UAS and anti drone site planning with early warning, identification, positioning, tracking, EO verification, Remote ID review, and event records.</p>
        <ul className={styles.heroPoints}>
          {heroPoints.slice(0, 3).map((item) => (
            <li key={item}>
              <CheckCircle2 size={15} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <HeroVisual />
        <div className={styles.mobileActions}>
          <Link prefetch={false} href="#mobile-inquiry" className={styles.primaryCta}>
            Get Site Plan & Quote
          </Link>
          <WhatsAppLeadButton sourceLabel="low_altitude_mobile_hero_whatsapp" className={`${styles.secondaryCta} ${styles.whatsappCta}`}>
            WhatsApp Chat
          </WhatsAppLeadButton>
        </div>
      </section>

      <SiteProblemSection />

      <SystemCompositionSection locale={locale} />

      <DeploymentModesSection locale={locale} />

      <ScenarioEntrance />

      <section id="mobile-equipment" className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>Workflow</span>
          <h2>Low-Altitude C-UAS Workflow</h2>
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
          <h2>C-UAS Equipment Options</h2>
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
              <p>{item.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.mobileBlock} ${styles.mobileOperationsBlock}`}>
        <div className={styles.mobileSectionTitle}>
          <span>Site Operations</span>
          <h2>Low-Altitude Site Operations</h2>
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
        <div className={styles.mobileCaseReferences}>
          {caseReferences.map((item) => (
            <Link prefetch={false} href={localePath(locale, item.href)} className={styles.mobileCaseCard} key={item.href}>
              <div className={styles.mobileCaseImageBox}>
                <Image src={item.image} alt={item.title} fill sizes="50vw" className={styles.mobileCaseImage} />
              </div>
              <div className={styles.mobileCaseBody}>
                <h3>{item.title}</h3>
              </div>
            </Link>
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
  const pageAbsoluteUrl = pageUrl(locale, `/solutions/${pageHandle}`);
  const jsonLdGraph = [
    {
      '@type': 'Service',
      '@id': `${pageAbsoluteUrl}#service`,
      name: pageTitle,
      description: pageDescription,
      serviceType: 'low-altitude airspace security and C-UAS',
      provider: {
        '@type': 'Organization',
        name: 'N-TET',
        url: pageUrl(locale, '/'),
      },
      areaServed: 'Global',
      url: pageAbsoluteUrl,
      mainEntityOfPage: pageAbsoluteUrl,
    },
    breadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <OpenLinksInNewTab />
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': jsonLdGraph }} />
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
