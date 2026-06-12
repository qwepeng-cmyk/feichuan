'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './MobileProductCenter.module.css';
import Link from 'next/link';
import Image from 'next/image';
import MobileInquiryForm from './MobileInquiryForm';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { getSeoKeywordTarget } from '@/lib/seoKeywordTargets';

interface Product {
    name: string;
    description?: string;
    image: string;
    specs?: Record<string, string>;
    handle: string;
    flightPlatform?: string;
    missionApplication?: string;
    catalogOrder?: number;
}

const FLIGHT_GROUP_ORDER = ['Multi-Rotor UAVs', 'VTOL Fixed-Wing UAVs', 'Tethered UAVs'];
const FLIGHT_PLATFORM_HANDLES = new Set([
    'multi-rotor-3kg-payload-uav',
    'multi-rotor-8kg-payload-uav',
    'multi-rotor-20kg-payload-uav',
    'multi-rotor-50kg-payload-uav',
    'vtol-14kg-mtow-uav',
    'vtol-26kg-mtow-uav',
    'vtol-40kg-mtow-uav',
    'vtol-64kg-mtow-uav',
    'vtol-135kg-mtow-uav',
    'fc-yjtx-01-emergency-communication-drone',
    'fc-yjzm-01-emergency-lighting-drone',
    'fc-yjxf-01-aerial-firefighting-drone',
]);
const MISSION_APPLICATION_ORDER = [
    'smart-substation-autonomous-inspection-system',
    'power-tower-inspection-drone',
    'fc-sljc-01-water-conservancy-monitoring-drone',
    'emergency-search-rescue-drone',
    'fc-yjtx-01-emergency-communication-drone',
    'fc-yjzm-01-emergency-lighting-drone',
    'fc-yjxf-01-aerial-firefighting-drone',
];
const MISSION_APPLICATION_HANDLES = new Set(MISSION_APPLICATION_ORDER);

function shouldBlendImageBackground(image?: string) {
    return Boolean(image?.includes('/products/uav-systems/'));
}

function getMissionDisplayName(product: Product, dict: any) {
    const labels: Record<string, string | undefined> = {
        'smart-substation-autonomous-inspection-system': dict?.megaMenu?.smartSubstationInspection,
        'power-tower-inspection-drone': dict?.megaMenu?.powerTowerInspection,
        'fc-sljc-01-water-conservancy-monitoring-drone': dict?.megaMenu?.waterConservancyMonitoring,
        'emergency-search-rescue-drone': dict?.megaMenu?.emergencySearchRescue,
        'fc-yjtx-01-emergency-communication-drone': dict?.megaMenu?.emergencyCommunicationUav,
        'fc-yjzm-01-emergency-lighting-drone': dict?.megaMenu?.tetheredLightingUav,
        'fc-yjxf-01-aerial-firefighting-drone': dict?.megaMenu?.highRiseFirefightingUav,
    };
    return labels[product.handle] || product.name;
}

function groupProducts(
    products: Product[],
    field: 'flightPlatform' | 'missionApplication',
    groupOrder: string[],
    allowedHandles: Set<string>
) {
    const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
        if (!allowedHandles.has(product.handle)) return acc;
        const groupName = product[field] || 'Other UAV Systems';
        if (!groupOrder.includes(groupName)) return acc;
        acc[groupName] = acc[groupName] || [];
        acc[groupName].push(product);
        return acc;
    }, {});

    return Object.entries(grouped)
        .map(([name, items]) => ({
            name,
            items: [...items].sort((a, b) => (a.catalogOrder ?? 9999) - (b.catalogOrder ?? 9999) || a.name.localeCompare(b.name))
        }))
        .sort((a, b) => {
            const orderA = groupOrder.indexOf(a.name);
            const orderB = groupOrder.indexOf(b.name);
            const normalizedA = orderA === -1 ? 999 : orderA;
            const normalizedB = orderB === -1 ? 999 : orderB;
            return normalizedA - normalizedB || a.name.localeCompare(b.name);
        });
}

function MobileProductCard({
    product,
    locale,
    priority
}: {
    product: Product;
    locale: string;
    priority?: boolean;
}) {
    const blendImageBackground = shouldBlendImageBackground(product.image);

    return (
        <Link prefetch={false} href={localePath(locale, `/products/${product.handle}`)} className={styles.productCard}>
            <div className={styles.imageBox} style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f5f5f5', isolation: 'isolate' }}>
                <Image
                    src={withStaticAssetVersion(product.image)}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain', padding: '10px', mixBlendMode: blendImageBackground ? 'multiply' : 'normal' }}
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

function MobileUavGroupedCatalog({
    title,
    products,
    field,
    groupOrder,
    allowedHandles,
    locale,
}: {
    title: string;
    products: Product[];
    field: 'flightPlatform' | 'missionApplication';
    groupOrder: string[];
    allowedHandles: Set<string>;
    locale: string;
}) {
    const groups = groupProducts(products, field, groupOrder, allowedHandles);

    return (
        <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, color: '#1f2a44', fontSize: '16px', fontWeight: 900 }}>{title}</h3>
                <div style={{ height: '1px', background: '#d9e2ef', flex: 1 }} />
            </div>
            <div style={{ display: 'grid', gap: '26px' }}>
                {groups.map((group, groupIndex) => (
                    <div key={`${field}-${group.name}`}>
                        <h4 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 900, color: '#315ba4', textTransform: 'uppercase' }}>
                            {group.name}
                        </h4>
                        <div className={styles.grid}>
                            {group.items.map((product, idx) => (
                                <MobileProductCard
                                    key={`${field}-${group.name}-${product.handle}`}
                                    product={product}
                                    locale={locale}
                                    priority={field === 'missionApplication' && groupIndex === 0 && idx < 2}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MobileMissionApplicationCatalog({
    title,
    products,
    locale,
    dict
}: {
    title: string;
    products: Product[];
    locale: string;
    dict: any;
}) {
    const missionProducts = products
        .filter(product => MISSION_APPLICATION_HANDLES.has(product.handle))
        .map(product => ({ ...product, name: getMissionDisplayName(product, dict) }))
        .sort((a, b) => MISSION_APPLICATION_ORDER.indexOf(a.handle) - MISSION_APPLICATION_ORDER.indexOf(b.handle));

    return (
        <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, color: '#1f2a44', fontSize: '16px', fontWeight: 900 }}>{title}</h3>
                <div style={{ height: '1px', background: '#d9e2ef', flex: 1 }} />
            </div>
            <div className={styles.grid}>
                {missionProducts.map((product, idx) => (
                    <MobileProductCard
                        key={`mission-${product.handle}`}
                        product={product}
                        locale={locale}
                        priority={idx < 2}
                    />
                ))}
            </div>
        </div>
    );
}

export default function MobileProductCenter({ 
    categoriesData,
    locale,
    dict
}: { 
    categoriesData: any,
    locale: string,
    dict: any
}) {
    const seoTarget = getSeoKeywordTarget({
        route: '/products',
        title: dict.products.bannerTitle,
        pageKind: 'product_list',
        locale,
    });
    const bannerTitle = seoTarget.h1 || dict.products.bannerTitle;

    const CATEGORY_NAMES: Record<string, string> = {
        'uav-drone-systems': dict.products.categories.uav,
        'drone-detection': dict.products.categories.droneDetection,
        'security-screening': dict.products.categories.security,
        'engineering-materials': dict.products.categories.engineeringMaterials,
        'field-hospitals': dict.products.categories.medical,
        'perimeter-intelligence': dict.products.categories.surveillance
    };

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        'uav-drone-systems': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                <g strokeWidth="1.5" strokeLinecap="round"><path d="M24 18V9M24 28v10" /><path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" /></g>
                <g fill="currentColor" stroke="none">
                    <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                </g>
            </svg>
        ),
        'drone-detection': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M10 24h28M14 26h20v2H14z" /><path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
                <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
            </svg>
        ),
        'security-screening': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="12" y="6" width="24" height="36" />
                <path d="M16 6v36M32 6v36" strokeWidth="2" />
                <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                <circle cx="24" cy="11" r="1.5" fill="currentColor" />
            </svg>
        ),
        'engineering-materials': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 28h40M4 36h40" strokeWidth="2" /><path d="M6 28l6 8M16 28l6 8M26 28l6 8M36 28l6 8" /><path d="M12 28l-6 8M22 28l-6 8M32 28l-6 8M42 28l-6 8" />
                <path d="M4 27h40v2H4z" fill="currentColor" />
            </svg>
        ),
        'field-hospitals': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="14" width="32" height="24" rx="2" /><path d="M18 14V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" /><path d="M8 22h32M24 18v16M18 26h12" strokeWidth="3" />
            </svg>
        ),
        'perimeter-intelligence': (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
                <circle cx="24" cy="28" r="10" /><circle cx="24" cy="28" r="4" fill="currentColor" /><circle cx="26" cy="26" r="1" fill="#fff" /><path d="M12 22h24" strokeWidth="2" />
            </svg>
        )
    };

    const categoryList = Object.keys(CATEGORY_NAMES).map(key => ({
        id: key,
        name: CATEGORY_NAMES[key],
        icon: CATEGORY_ICONS[key]
    }));

    const [activeCategory, setActiveCategory] = useState(categoryList[0].id);
    const [isFixed, setIsFixed] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (bannerRef.current) {
                const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
                setIsFixed(bannerBottom <= 108);
            }

            const sections = categoryList.map(cat => document.getElementById(`mobile-${cat.id}`));
            const scrollPos = window.scrollY + 250;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section) {
                    const top = section.getBoundingClientRect().top + window.pageYOffset;
                    if (scrollPos >= top - 200) {
                        setActiveCategory(categoryList[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categoryList]);

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(`mobile-${id}`);
        if (element) {
            const totalOffset = 198;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - totalOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveCategory(id);
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.banner} ref={bannerRef}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{bannerTitle}</div>
                </div>
            </section>

            {/* Placeholder to prevent content jump */}
            {isFixed && <div style={{ height: '80px' }}></div>}

            <div className={`${styles.stickyNav} ${isFixed ? styles.fixed : ''}`}>
                <div className={styles.tabTrack}>
                    {categoryList.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.tabItem} ${activeCategory === cat.id ? styles.active : ''}`}
                            onClick={() => scrollToCategory(cat.id)}
                        >
                            <div className={styles.iconBox}>{cat.icon}</div>
                            <span className={styles.tabText}>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.listContainer}>
                {categoryList.map((category) => (
                    <section key={category.id} id={`mobile-${category.id}`} className={styles.categorySection}>
                        <div className={styles.sectionHeader}>
                            <h2>{CATEGORY_NAMES[category.id]}</h2>
                            <div className={styles.accentLine}></div>
                        </div>

                        {category.id === 'uav-drone-systems' ? (
                            <>
                                <MobileMissionApplicationCatalog
                                    title={dict.megaMenu?.byMission || 'By Mission & Application'}
                                    products={categoriesData[category.id] || []}
                                    locale={locale}
                                    dict={dict}
                                />
                                <MobileUavGroupedCatalog
                                    title={dict.megaMenu?.byFlightPlatform || 'By Flight Platform'}
                                    products={categoriesData[category.id] || []}
                                    field="flightPlatform"
                                    groupOrder={FLIGHT_GROUP_ORDER}
                                    allowedHandles={FLIGHT_PLATFORM_HANDLES}
                                    locale={locale}
                                />
                            </>
                        ) : (
                            <div className={styles.grid}>
                                {categoriesData[category.id]?.map((product: Product, idx: number) => (
                                    <MobileProductCard
                                        key={idx}
                                        product={product}
                                        locale={locale}
                                        priority={category.id === categoryList[0].id && idx < 2}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* Mobile Inquiry Form */}
            <MobileInquiryForm dict={dict} />
        </div>
    );
}


