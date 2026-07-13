'use client';

import React from 'react';
import Image from 'next/image';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';
import CategoryNav from '@/components/products/CategoryNav';
import InquiryForm from '@/components/products/InquiryForm';
import ProductGridCard from '@/components/products/ProductGridCard';
import { cuasText } from '@/lib/cuasLocaleCopy';
import styles from './CuasProductCenter.module.css';

type ProductSummary = {
  name: string;
  handle: string;
  image: string;
};

type ProductGroup = {
  id: string;
  title: string;
  description: string;
  handles?: string[];
  icon: React.ReactNode;
};

const portableHandles = [
  'handheld-rf-detection-system-mini',
  'portable-rf-detection-case',
  'portable-low-altitude-monitoring-event-logging-shield',
  'portable-integrated-detection-event-logging-low-altitude-monitoring-basic',
];

const fixedSiteHandles = [
  'stationary-rf-detection-system',
  'low-altitude-detection-radar-ku-band',
  'low-altitude-3d-pulse-doppler-radar',
  'composite-electro-optical-tracking-system',
  'uav-remote-id-monitoring-system',
  'uav-navigation-airspace-data-verification-system',
];

function PortableIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="10" width="24" height="28" rx="3" fill="rgba(49, 91, 164, 0.06)" />
      <path d="M18 16h12M18 21h9M18 30h12M24 38v4M18 42h12" />
      <circle cx="32" cy="22" r="2.2" fill="#315ba4" stroke="none" />
      <path d="M36 14c3 3.2 3 12.4 0 15.6M39 11c5 5.6 5 16.8 0 22.4" strokeOpacity="0.55" />
    </svg>
  );
}

function FixedSiteIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
      <path d="M10 24h28M14 27h20M24 27v5M18 42l6-10 6 10M20 37h8" />
      <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
      <circle cx="24" cy="18" r="2" fill="#315ba4" stroke="none" />
    </svg>
  );
}

function OpticalIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
      <circle cx="24" cy="28" r="10" />
      <circle cx="24" cy="28" r="4" fill="#315ba4" stroke="none" />
      <circle cx="26" cy="26" r="1" fill="#fff" stroke="none" />
      <path d="M14 28h20M24 18v20" strokeOpacity="0.22" />
      <rect x="20" y="38" width="8" height="4" />
      <path d="M12 22h24" strokeWidth="2" />
    </svg>
  );
}

function VehicleIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 29h29l5 6H7z" fill="rgba(49, 91, 164, 0.06)" />
      <path d="M12 29l4-8h14l6 8M18 21v-6M15 15h6M28 21l4-6M29 15h7" />
      <circle cx="15" cy="37" r="3" />
      <circle cx="34" cy="37" r="3" />
      <path d="M5 37h38" />
    </svg>
  );
}

function PlatformIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="32" height="24" rx="2" fill="rgba(49, 91, 164, 0.06)" />
      <path d="M13 17h10M13 23h7M27 17h8M27 23h8M13 29h22M18 38h12M24 34v4" />
      <circle cx="32" cy="23" r="2.2" fill="#315ba4" stroke="none" />
    </svg>
  );
}

const groups: ProductGroup[] = [
  {
    id: 'portable-cuas-devices',
    title: 'Portable C-UAS Devices',
    description: 'Hand-carried RF identification and field monitoring equipment for patrol teams, temporary sites and event security.',
    handles: portableHandles,
    icon: <PortableIcon />,
  },
  {
    id: 'fixed-site-cuas-systems',
    title: 'Fixed-Site C-UAS Systems',
    description: 'Fixed RF, radar, EO tracking, Remote ID and signal verification equipment for continuous low-altitude monitoring.',
    handles: fixedSiteHandles,
    icon: <FixedSiteIcon />,
  },
  {
    id: 'vehicle-mounted-cuas',
    title: 'Vehicle-Mounted C-UAS',
    description: 'Custom vehicle-mounted monitoring configurations for mobile patrol and rapid repositioning.',
    icon: <VehicleIcon />,
  },
  {
    id: 'cuas-control-platform',
    title: 'C-UAS Control Platform',
    description: 'Custom command platform configuration for multi-source access, map awareness, alerts and device management.',
    icon: <PlatformIcon />,
  },
  {
    id: 'electro-optical-products',
    title: 'EO/IR Tracking & Verification',
    description: 'EO/IR PTZ, thermal imaging, laser camera and radar-vision products for visual confirmation and perimeter awareness.',
    icon: <OpticalIcon />,
  },
];

const customConfigurations = [
  {
    id: 'vehicle-mounted-cuas',
    title: 'Vehicle-Mounted C-UAS',
    image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
    text: 'Configured for mobile patrol, temporary protection zones and project-specific operating sites.',
  },
  {
    id: 'cuas-control-platform',
    title: 'C-UAS Control Platform',
    image: '/solutions/low-altitude-airspace-monitoring/ppt-platform-interface.webp',
    text: 'Configured for multi-source access, map-based awareness, alerts and connected equipment management.',
  },
];

function pickProducts(products: ProductSummary[], handles: string[]) {
  const productMap = new Map(products.map((product) => [product.handle, product]));
  return handles.map((handle) => productMap.get(handle)).filter((product): product is ProductSummary => Boolean(product));
}

export default function CuasProductCenter({
  products,
  opticalProducts,
  locale,
  dict,
}: {
  products: ProductSummary[];
  opticalProducts?: ProductSummary[];
  locale: string;
  dict: any;
}) {
  const t = (value: string) => cuasText(locale, value);
  const localizedGroups = groups.map((group) => ({
    ...group,
    title: t(group.title),
    description: t(group.description),
  }));
  const localizedConfigurations = customConfigurations.map((item) => ({
    ...item,
    title: t(item.title),
    text: t(item.text),
  }));
  const categoryList = localizedGroups.map(({ id, title, icon }) => ({ id, name: title, icon }));
  const portableProducts = pickProducts(products, portableHandles);
  const fixedProducts = pickProducts(products, fixedSiteHandles);
  const visibleOpticalProducts = opticalProducts || [];

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <Image
          src="/solutions/cuas-applications/banner/product_center_banner.webp"
          fill
          sizes="100vw"
          className={styles.bannerImage}
          priority
          alt={t('Professional C-UAS detection and airspace monitoring equipment')}
        />
        <div className={styles.bannerOverlay} />
        <div className="container">
          <div className={styles.bannerCopy}>
            <h1>{t('Professional C-UAS Equipment')}</h1>
            <p>{t('Browse N-TET portable, fixed-site, vehicle-mounted and platform-based C-UAS equipment for detection, identification, tracking and low-altitude airspace management.')}</p>
          </div>
        </div>
        <div className={styles.logoAccent}>
          <Image src="/logo1-small.webp" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
      </section>

      <CategoryNav categories={categoryList} />

      <div className={styles.productLists}>
        <section id="portable-cuas-devices" className={styles.categorySection}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>{localizedGroups[0].title}</h2>
              <div />
              <p>{localizedGroups[0].description}</p>
            </div>
            <div className={styles.productGrid}>
              {portableProducts.map((product) => (
                <ProductGridCard key={product.handle} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        <section id="fixed-site-cuas-systems" className={styles.categorySection}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>{localizedGroups[1].title}</h2>
              <div />
              <p>{localizedGroups[1].description}</p>
            </div>
            <div className={styles.productGrid}>
              {fixedProducts.map((product) => (
                <ProductGridCard key={product.handle} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        <section id="vehicle-mounted-cuas" className={styles.categorySection}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>{localizedGroups[2].title}</h2>
              <div />
              <p>{localizedGroups[2].description}</p>
            </div>
            <CustomConfigurationCard item={localizedConfigurations[0]} locale={locale} />
          </div>
        </section>

        <section id="cuas-control-platform" className={styles.categorySection}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>{localizedGroups[3].title}</h2>
              <div />
              <p>{localizedGroups[3].description}</p>
            </div>
            <CustomConfigurationCard item={localizedConfigurations[1]} locale={locale} />
          </div>
        </section>

        <section id="electro-optical-products" className={styles.categorySection}>
          <div className="container">
            <div className={styles.sectionTitle}>
              <h2>{localizedGroups[4].title}</h2>
              <div />
              <p>{localizedGroups[4].description}</p>
            </div>
            <div className={styles.productGrid}>
              {visibleOpticalProducts.map((product) => (
                <ProductGridCard key={product.handle} product={product} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section id="inquiry" className={styles.inquirySection}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <InquiryForm dict={dict} />
        </div>
      </section>
    </div>
  );
}

function CustomConfigurationCard({
  item,
  locale,
}: {
  item: {
    id: string;
    title: string;
    image: string;
    text: string;
  };
  locale: string;
}) {
  const useComputerFrame = item.id === 'cuas-control-platform';
  const t = (value: string) => cuasText(locale, value);

  return (
    <article className={styles.customCard}>
      <div className={`${styles.customImage} ${useComputerFrame ? styles.platformImage : ''}`}>
        {useComputerFrame ? (
          <div className={styles.platformComputer}>
            <div className={styles.platformDisplay}>
              <span className={styles.platformCamera} aria-hidden="true" />
              <div className={styles.platformScreenMedia}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 991px) 90vw, 48vw" />
              </div>
            </div>
            <span className={styles.platformStand} aria-hidden="true" />
            <span className={styles.platformBase} aria-hidden="true" />
          </div>
        ) : (
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 991px) 100vw, 50vw" />
        )}
      </div>
      <div className={styles.customBody}>
        <span>{t('Custom Configuration')}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <WhatsAppLeadButton
          sourceLabel={`product_center_${item.id}`}
          productName={item.title}
          productHandle={item.id}
          ctaLocation="product_center_custom_configuration"
          className={styles.whatsappButton}
        >
          {t('Ask About This Configuration')}
        </WhatsAppLeadButton>
      </div>
    </article>
  );
}
