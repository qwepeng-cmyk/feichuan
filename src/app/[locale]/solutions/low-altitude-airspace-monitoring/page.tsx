import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Contact,
  Factory,
  FileClock,
  Landmark,
  Monitor,
  Plane,
  Radio,
  RadioTower,
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
const pageTitle = 'Low-Altitude Airspace Security & C-UAS Monitoring';
const pageDescription =
  'Low-altitude airspace monitoring, C-UAS sensing layers, visual verification, command linkage, and event records for airports, refineries, power plants, ports, controlled facilities, and large perimeter sites.';

const heroPoints = [
  'Site airspace security architecture for critical facilities',
  'RF, radar, EO, and Remote ID inputs in one plan',
  'Alert review, command linkage, and event records',
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
    title: 'RF Awareness',
    text: 'Monitor drone control and video signals for early warning and source analysis.',
    icon: RadioTower,
  },
  {
    title: 'Low-Altitude Radar Coverage',
    text: 'Locate low-altitude activity across wide areas and long perimeters.',
    icon: Target,
  },
  {
    title: 'Visual Verification',
    text: 'Confirm and follow targets with high-resolution electro-optical imaging.',
    icon: ScanSearch,
  },
  {
    title: 'Remote ID Monitoring',
    text: 'Read available Remote ID broadcasts for identity clues and operator review.',
    icon: Contact,
  },
  {
    title: 'Command Linkage',
    text: 'Connect alerts and target status with command-room coordination workflows.',
    icon: Monitor,
  },
  {
    title: 'Event Records',
    text: 'Record alerts, target tracks, review notes, and exportable event logs.',
    icon: FileClock,
  },
];

const architectureSteps = [
  {
    title: 'Airspace Sensing Layer',
    text: 'RF, radar, optical, and Remote ID inputs are selected according to site size, perimeter shape, and operating risk.',
    icon: Radio,
  },
  {
    title: 'Fusion & Review Layer',
    text: 'The system helps operators compare signal, position, and visual clues before raising an actionable alert.',
    icon: Target,
  },
  {
    title: 'Command Linkage',
    text: 'Alarm outputs, map views, and event status can support command rooms, patrol teams, and existing security workflows.',
    icon: Monitor,
  },
  {
    title: 'Evidence Records',
    text: 'Event records support review, reporting, procurement justification, and later system optimization.',
    icon: ClipboardList,
  },
];

const workflow = [
  {
    title: 'Monitor',
    text: 'Build low-altitude awareness with RF, radar, EO, and Remote ID inputs.',
    icon: Radio,
  },
  {
    title: 'Verify',
    text: 'Classify and confirm targets with visual and multi-sensor review.',
    icon: Target,
  },
  {
    title: 'Coordinate',
    text: 'Link alerts, maps, and target status to the operator workflow.',
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
    points: ['Tank farm and perimeter monitoring', 'RF + radar + EO verification', 'Command-room alert records'],
  },
  {
    title: 'Public Venue',
    meta: 'Event, stadium, transport, and controlled-site operations',
    image: '/cases/asian-games-security/main-home.webp',
    points: ['Temporary or fixed deployment', 'Crowd-area airspace awareness', 'Event-time alert review'],
  },
  {
    title: 'Airport / Large Perimeter',
    meta: 'Wide boundary coverage and layered airspace awareness',
    image: '/cases/airport-security-application/main.webp?v=2026060102',
    points: ['Runway and apron boundary coverage', 'Wide-area radar coverage', 'Visual target verification'],
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
    text: 'Monitor low-altitude activity around process units, tank farms, loading areas, and logistics gates.',
    icon: Factory,
  },
  {
    title: 'Power Plant & Substation Protection',
    text: 'Support early warning, alert review, and command workflows for critical energy facilities.',
    icon: Zap,
  },
  {
    title: 'Port & Border Perimeter Monitoring',
    text: 'Build wide-area awareness for docks, storage yards, border zones, and long perimeters.',
    icon: Ship,
  },
  {
    title: 'Controlled Facility / Key Area Security',
    text: 'Monitor and verify low-altitude activity around controlled zones and high-value facilities.',
    icon: Landmark,
  },
  {
    title: 'Stadium & Event Airspace Monitoring',
    text: 'Support temporary or fixed monitoring for venues, events, and public operations.',
    icon: Building2,
  },
];

const deliverables = [
  'Recommended low-altitude airspace monitoring architecture',
  'Sensor and equipment list: RF / radar / EO / Remote ID',
  'Estimated coverage layout and deployment notes',
  'Quotation, product brochure, and matching datasheets',
  'Integration discussion for command systems',
];

const relatedEquipment = [
  {
    title: 'Stationary RF Detection System',
    role: 'RF awareness layer',
    image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
    href: '/products/stationary-rf-detection-system',
    imageClass: 'equipmentImageRf',
    points: ['Fixed-site signal monitoring', 'Early warning layer'],
  },
  {
    title: 'Low-Altitude Detection Radar',
    role: 'Radar coverage layer',
    image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
    href: '/products/low-altitude-detection-radar-ku-band',
    imageClass: 'equipmentImageRadar',
    points: ['Wide-area airspace coverage', 'Track and position support'],
  },
  {
    title: 'Electro-Optical Tracking System',
    role: 'Visual verification layer',
    image: '/products/02-drone-detection/electro-optical-tracking-system.webp',
    href: '/products/composite-electro-optical-tracking-system',
    imageClass: 'equipmentImageOptical',
    points: ['Visual target confirmation', 'Day and night tracking support'],
  },
  {
    title: 'UAV Remote ID Monitoring System',
    role: 'Identity awareness layer',
    image: '/products/02-drone-detection/portable-rf-detection-case.webp',
    href: '/products/uav-remote-id-monitoring-system',
    imageClass: 'equipmentImagePortable',
    points: ['Remote ID information reading', 'Portable field deployment'],
  },
];

const faqs = [
  {
    question: 'What is included in an N-TET low-altitude airspace security solution?',
    answer:
      'N-TET can combine RF monitoring, low-altitude radar, electro-optical verification, Remote ID monitoring, command linkage, and event records according to the site type and coverage requirement.',
  },
  {
    question: 'Which sites are suitable for this low-altitude airspace monitoring page?',
    answer:
      'Typical sites include airports, refineries, power plants, substations, ports, logistics parks, controlled facilities, stadiums, and temporary event venues.',
  },
  {
    question: 'Can N-TET provide a layout and quotation instead of only a product list?',
    answer:
      'Yes. Share the site type, country, perimeter condition, and preferred contact method, and N-TET can prepare a recommended architecture, equipment list, and quotation path.',
  },
  {
    question: 'How should RF monitoring, radar, EO tracking, and Remote ID be selected?',
    answer:
      'RF monitoring is useful for early signal awareness, radar supports wide-area positioning, EO tracking supports visual verification, and Remote ID can provide identity clues when broadcasts are available.',
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
      'Counter-UAS detection',
      'Counter-UAS technology',
      'C-UAS detection system',
      'drone detector',
      'drone radar',
      'UAV detection system',
      'C-UAS detection equipment',
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
    <div className={styles.heroVisual} aria-label="Low-altitude airspace monitoring equipment composition">
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
        <p>Select the operating environment closest to your site, then request a monitoring layout and quotation.</p>
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

function ConversionPrompt({ inquiryHref = '#inquiry' }: { inquiryHref?: string }) {
  return (
    <section className={styles.conversionSection}>
      <div className={styles.conversionGrid}>
        <div className={styles.conversionPanel}>
          <span className={styles.conversionEyebrow}>Site-based C-UAS quotation path</span>
          <h2>Get a Site Airspace Plan and Equipment Match</h2>
          <p>
            Share the site type, country, perimeter condition, and preferred contact method. N-TET can respond
            with a practical system recommendation instead of a generic product list.
          </p>
          <div className={styles.quickFields} aria-label="Recommended inquiry details">
            <span>Name / Company</span>
            <span>Email / WhatsApp</span>
            <span>Country</span>
            <span>Site Type</span>
          </div>
          <Link prefetch={false} href={inquiryHref} className={styles.primaryCta}>
            Request Assessment & Quotation
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.deliverablesPanel}>
          <h3>After submission, N-TET can provide:</h3>
          <ul>
            {deliverables.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
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
            C-UAS monitoring, RF awareness, drone radar, EO verification, Remote ID monitoring, command linkage,
            and event records for airports, refineries, power plants, ports, controlled facilities, and large perimeter sites.
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

      <ScenarioEntrance />

      <ConversionPrompt />

      <section id="equipment" className={styles.layerSection}>
        <div className={styles.sectionHeader}>
          <h2>Low-Altitude Airspace Security Architecture</h2>
          <p>Use the architecture to match search intent with a real procurement plan: site risk first, then sensing layers, alerts, command linkage, and records.</p>
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

      <section className={styles.architectureSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>System flow</span>
          <h2>From Sensor Inputs to Operator Decisions</h2>
        </div>
        <div className={styles.architectureGrid}>
          {architectureSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className={styles.architectureStep} key={item.title}>
                <div className={styles.architectureNumber}>{String(index + 1).padStart(2, '0')}</div>
                <Icon size={38} strokeWidth={1.8} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <div className={styles.sectionHeader}>
          <h2>Equipment Layers for Airspace Monitoring</h2>
          <p>Each equipment layer has a clear role in the complete site airspace security plan.</p>
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

      <section className={styles.workflowSection}>
        <div className={styles.sectionHeader}>
          <h2>From Airspace Awareness to Event Records</h2>
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
          <h2>Solutions for Different Critical Sites</h2>
          <p>These entry points help buyers choose the closest operating scene before sharing site details.</p>
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

      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Buyer questions</span>
          <h2>Low-Altitude Airspace Security FAQ</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
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
          <span className={styles.mobileTitleLine}>Airspace Security</span>
          <span className={styles.mobileTitleLine}>Monitoring</span>
        </h1>
        <p>C-UAS monitoring, RF awareness, drone radar, EO verification, Remote ID monitoring, and event records for critical sites.</p>
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

      <ScenarioEntrance />

      <ConversionPrompt inquiryHref="#mobile-inquiry" />

      <section id="mobile-equipment" className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>System Layers</span>
          <h2>Airspace Security Architecture</h2>
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
          <span>System Flow</span>
          <h2>Sensor Inputs to Decisions</h2>
        </div>
        <div className={styles.mobileArchitectureList}>
          {architectureSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className={styles.mobileArchitectureStep} key={item.title}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <Icon size={28} strokeWidth={1.9} aria-hidden="true" />
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
          <h2>Monitoring Equipment Layers</h2>
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
          <h2>Critical Site Packages</h2>
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

      <section className={styles.mobileBlock}>
        <div className={styles.mobileSectionTitle}>
          <span>FAQ</span>
          <h2>Airspace Security FAQ</h2>
        </div>
        <div className={styles.mobileFaqList}>
          {faqs.map((item) => (
            <article className={styles.faqItem} key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
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
  const pageAbsoluteUrl = pageUrl(locale, `/solutions/${pageHandle}`);
  const jsonLdGraph = [
    {
      '@type': 'Service',
      '@id': `${pageAbsoluteUrl}#service`,
      name: pageTitle,
      description: pageDescription,
      serviceType: 'low-altitude airspace security and C-UAS monitoring',
      provider: {
        '@type': 'Organization',
        name: 'N-TET',
        url: pageUrl(locale, '/'),
      },
      areaServed: 'Global',
      url: pageAbsoluteUrl,
      mainEntityOfPage: pageAbsoluteUrl,
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageAbsoluteUrl}#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
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
