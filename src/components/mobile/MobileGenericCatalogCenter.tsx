'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileProductCenter.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import type { CatalogCategory } from '@/components/products/GenericCatalogCenter';

interface CatalogItem {
  name: string;
  handle: string;
  image: string;
}

function MobileCatalogCard({
  product,
  locale,
  basePath,
  priority,
}: {
  product: CatalogItem;
  locale: string;
  basePath: '/products' | '/accessories';
  priority?: boolean;
}) {
  return (
    <Link prefetch={false} href={localePath(locale, `${basePath}/${product.handle}`)} className={styles.productCard}>
      <div className={styles.imageBox} style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f5f5f5', isolation: 'isolate' }}>
        <Image
          src={withStaticAssetVersion(product.image || '/logo1-small.webp')}
          alt={product.name}
          fill
          style={{ objectFit: 'contain', padding: '10px' }}
          sizes="45vw"
          priority={priority}
        />
      </div>
      <div className={styles.cardInfo}>
        <h3>{product.name}</h3>
      </div>
    </Link>
  );
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="12" y="12" width="24" height="24" rx="3" />
      <path d="M18 18h12v12H18zM8 18h4m-4 12h4m36-12h-4m4 12h-4M18 8v4m12-4v4m-12 36v-4m12 4v-4" />
    </svg>
  );
}

export default function MobileGenericCatalogCenter({
  categoriesData,
  categories,
  locale,
  dict,
  bannerTitle,
  basePath,
}: {
  categoriesData: Record<string, CatalogItem[]>;
  categories: CatalogCategory[];
  locale: string;
  dict: any;
  bannerTitle: string;
  basePath: '/products' | '/accessories';
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [isFixed, setIsFixed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
        setIsFixed(bannerBottom <= 108);
      }

      const sections = categories.map(cat => document.getElementById(`mobile-${cat.id}`));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPos >= top - 200) {
            setActiveCategory(categories[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(`mobile-${id}`);
    if (!element) return;
    const totalOffset = 198;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - totalOffset, behavior: 'smooth' });
    setActiveCategory(id);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.banner} ref={bannerRef}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <div className={styles.bannerTitle}>{bannerTitle}</div>
        </div>
      </section>

      {isFixed && <div style={{ height: '80px' }} />}

      <div className={`${styles.stickyNav} ${isFixed ? styles.fixed : ''}`}>
        <div className={styles.tabTrack}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tabItem} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              <div className={styles.iconBox}><MobileIcon /></div>
              <span className={styles.tabText}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.listContainer}>
        {categories.map((category) => (
          <section key={category.id} id={`mobile-${category.id}`} className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h2>{category.name}</h2>
              <div className={styles.accentLine} />
            </div>
            <div className={styles.grid}>
              {(categoriesData[category.id] || []).map((product, idx) => (
                <MobileCatalogCard
                  key={product.handle}
                  product={product}
                  locale={locale}
                  basePath={basePath}
                  priority={idx < 2}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <MobileInquiryForm dict={dict} />
    </div>
  );
}
