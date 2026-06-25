import React from 'react';
import Image from 'next/image';
import InquiryForm from '@/components/products/InquiryForm';
import CategoryNav from '@/components/products/CategoryNav';
import ProductGridCard from '@/components/products/ProductGridCard';
import DeferredProductSections from '@/components/products/DeferredProductSections';
import { getSeoKeywordTarget } from '@/lib/seoKeywordTargets';
import { getVisibleProductCategoryIds } from '@/lib/productCategoryVisibility';

interface ProductSummary {
    name: string;
    handle: string;
    image: string;
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
const ACCESSORIES_CATEGORY_ID = 'drone-accessories';

function getMissionDisplayName(product: ProductSummary, dict: any) {
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
    products: ProductSummary[],
    field: 'flightPlatform' | 'missionApplication',
    groupOrder: string[],
    allowedHandles: Set<string>
) {
    const grouped = products.reduce<Record<string, ProductSummary[]>>((acc, product) => {
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

function UavGroupedCatalog({
    title,
    products,
    field,
    groupOrder,
    allowedHandles,
    locale,
    dict
}: {
    title: string;
    products: ProductSummary[];
    field: 'flightPlatform' | 'missionApplication';
    groupOrder: string[];
    allowedHandles: Set<string>;
    locale: string;
    dict: any;
}) {
    const groups = groupProducts(products, field, groupOrder, allowedHandles);

    return (
        <div style={{ marginBottom: '70px' }}>
            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#1f2a44', margin: 0 }}>{title}</h3>
                <div style={{ height: '1px', flex: 1, background: '#d9e2ef' }} />
            </div>

            <div style={{ display: 'grid', gap: '44px' }}>
                {groups.map((group, groupIndex) => (
                    <div key={group.name}>
                        <h4 style={{
                            fontSize: '1.8rem',
                            fontWeight: 800,
                            color: '#315ba4',
                            margin: '0 0 20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0'
                        }}>
                            {group.name}
                        </h4>
                        <div className="product-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px'
                        }}>
                            {group.items.map((product, idx) => (
                                <ProductGridCard
                                    key={`${field}-${group.name}-${product.handle}`}
                                    product={product}
                                    locale={locale}
                                    dict={dict}
                                    priority={field === 'missionApplication' && groupIndex === 0 && idx < 3}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MissionApplicationCatalog({
    title,
    products,
    locale,
    dict
}: {
    title: string;
    products: ProductSummary[];
    locale: string;
    dict: any;
}) {
    const missionProducts = products
        .filter(product => MISSION_APPLICATION_HANDLES.has(product.handle))
        .map(product => ({ ...product, name: getMissionDisplayName(product, dict) }))
        .sort((a, b) => MISSION_APPLICATION_ORDER.indexOf(a.handle) - MISSION_APPLICATION_ORDER.indexOf(b.handle));

    return (
        <div style={{ marginBottom: '70px' }}>
            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#1f2a44', margin: 0 }}>{title}</h3>
                <div style={{ height: '1px', flex: 1, background: '#d9e2ef' }} />
            </div>
            <div className="product-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '30px'
            }}>
                {missionProducts.map((product, idx) => (
                    <ProductGridCard
                        key={`mission-${product.handle}`}
                        product={product}
                        locale={locale}
                        dict={dict}
                        priority={idx < 3}
                    />
                ))}
            </div>
        </div>
    );
}

export default function DesktopProductCenter({ 
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

    const CATEGORY_ICONS: Record<string, React.ReactNode> = {
        'uav-drone-systems': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.2">
                {/* Hexacopter - Blades Perpendicular to Arms (Deployed State) */}
                {/* Central Body Hull */}
                <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />

                {/* 6 Arms */}
                <g strokeWidth="1.5" strokeLinecap="round">
                    <path d="M24 18V9M24 28v10" />
                    <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                </g>

                {/* Static Blades (Exactly 90° to Arms) */}
                <g fill="#315ba4" stroke="none">
                    {/* Top Motor (Vertical Arm -> Horizontal Blades) */}
                    <g transform="translate(24,9) rotate(0)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Motor (Vertical Arm -> Horizontal Blades) */}
                    <g transform="translate(24,38) rotate(0)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Top Left Motor (~30° from horizontal arm -> ~120°/60° perpendicular) */}
                    <g transform="translate(13,14.5) rotate(60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Right Motor (Parallel to TL -> 60°) */}
                    <g transform="translate(35,31.5) rotate(60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Bottom Left Motor (~30° down -> ~120°/-60°) */}
                    <g transform="translate(13,31.5) rotate(-60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                    {/* Top Right Motor (Parallel to BL -> -60°) */}
                    <g transform="translate(35,14.5) rotate(-60)">
                        <path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" />
                    </g>
                </g>

                {/* Hubs */}
                <circle cx="24" cy="9" r="1.2" fill="#315ba4" />
                <circle cx="24" cy="38" r="1.2" fill="#315ba4" />
                <circle cx="13" cy="14.5" r="1.2" fill="#315ba4" />
                <circle cx="35" cy="31.5" r="1.2" fill="#315ba4" />
                <circle cx="13" cy="31.5" r="1.2" fill="#315ba4" />
                <circle cx="35" cy="14.5" r="1.2" fill="#315ba4" />
            </svg>
        ),
        [ACCESSORIES_CATEGORY_ID]: (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 20c-2.6-7.2-1.3-12.2 3.8-15 2.5 5.4 1.1 10-3.8 15z" fill="rgba(49, 91, 164, 0.18)" />
                <path d="M28 24c7.2-2.6 12.2-1.3 15 3.8-5.4 2.5-10 1.1-15-3.8z" fill="rgba(49, 91, 164, 0.18)" />
                <path d="M24 28c2.6 7.2 1.3 12.2-3.8 15-2.5-5.4-1.1-10 3.8-15z" fill="rgba(49, 91, 164, 0.18)" />
                <path d="M20 24c-7.2 2.6-12.2 1.3-15-3.8 5.4-2.5 10-1.1 15 3.8z" fill="rgba(49, 91, 164, 0.18)" />
                <circle cx="24" cy="24" r="4.4" fill="#315ba4" stroke="none" />
                <circle cx="24" cy="24" r="8" />
                <path d="M24 12v-3M36 24h3M24 36v3M12 24H9" />
            </svg>
        ),
        'drone-detection': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Realistic RF Dome & Tripod */}
                <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M10 24h28M14 26h20v2H14z" />
                <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
                <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
            </svg>
        ),
        'security-screening': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Detailed Walk-through Metal Detector */}
                <path d="M12 6h24M12 42h24M12 6v36M36 6v36" />
                <path d="M16 6v36M32 6v36" strokeWidth="2" />
                <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                <circle cx="24" cy="11" r="1.5" fill="#315ba4" />
            </svg>
        ),
        'engineering-materials': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Heavy Duty Bailey Bridge Section */}
                <path d="M4 28h40M4 36h40" strokeWidth="2" />
                <path d="M6 28l6 8M16 28l6 8M26 28l6 8M36 28l6 8" />
                <path d="M12 28l-6 8M22 28l-6 8M32 28l-6 8M42 28l-6 8" />
                <path d="M4 27h40v2H4z" fill="#315ba4" />
                <path d="M8 32h32M8 33h32" strokeOpacity="0.5" />
            </svg>
        ),
        'field-hospitals': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* Industrial Medical Command Case */}
                <rect x="8" y="14" width="32" height="24" rx="2" />
                <path d="M18 14V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
                <path d="M8 22h32M24 18v16M18 26h12" strokeWidth="3" />
                <rect x="12" y="18" width="4" height="4" />
                <rect x="32" y="18" width="4" height="4" />
                <path d="M12 30h4v4h-4zM32 30h4v4h-4z" fill="rgba(49, 91, 164, 0.1)" />
            </svg>
        ),
        'perimeter-intelligence': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                {/* PTZ Surveillance Sentinel Camera */}
                <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
                <circle cx="24" cy="28" r="10" />
                {/* The "Eye" / Lens */}
                <circle cx="24" cy="28" r="4" fill="#315ba4" />
                <circle cx="26" cy="26" r="1" fill="#fff" />
                <path d="M14 28h20M24 18v20" strokeOpacity="0.2" />
                <rect x="20" y="38" width="8" height="4" />
                <path d="M12 22h24" strokeWidth="2" />
            </svg>
        ),
        'industrial-engine-microgrid': (
            <svg viewBox="0 0 48 48" fill="none" stroke="#315ba4" strokeWidth="1.5">
                <rect x="7" y="18" width="22" height="16" rx="2" fill="rgba(49, 91, 164, 0.05)" />
                <path d="M11 22h9M11 26h14M11 30h10" />
                <path d="M29 24h5l3 4h4v6H29z" fill="rgba(49, 91, 164, 0.08)" />
                <circle cx="15" cy="37" r="3" />
                <circle cx="35" cy="37" r="3" />
                <path d="M8 14h8M12 10v8M33 11v8M29 15h8M38 11v8M3 37h42" />
                <path d="M21 14c2.8-4.4 8.2-4.4 11 0" strokeDasharray="2 2" />
            </svg>
        )
    };

    const CATEGORY_NAMES: Record<string, string> = {
        'uav-drone-systems': dict.products.categories.uav,
        [ACCESSORIES_CATEGORY_ID]: dict?.accessories?.title || 'Drone Accessories',
        'drone-detection': dict.products.categories.droneDetection,
        'perimeter-intelligence': dict.products.categories.surveillance,
        'industrial-engine-microgrid': dict.products.categories.industrialEngineMicrogrid,
        'security-screening': dict.products.categories.security,
        'engineering-materials': dict.products.categories.engineeringMaterials,
        'field-hospitals': dict.products.categories.medical
    };

    const productCenterCategoryIds = getVisibleProductCategoryIds(categoriesData).flatMap((id) =>
        id === 'perimeter-intelligence' ? [id, ACCESSORIES_CATEGORY_ID] : [id]
    );

    const categoryList = productCenterCategoryIds.map(key => ({
        id: key,
        name: CATEGORY_NAMES[key],
        icon: CATEGORY_ICONS[key]
    }));
    const primaryCategory = categoryList[0];
    const deferredCategories = categoryList.slice(1).map(({ id, name }) => ({ id, name }));

    return (
        <div className="product-page-new" style={{ paddingTop: '112px' }}>
            {/* HERO BANNER (HALF HEIGHT) */}
            <section className="product-banner" style={{
                height: '40vh',
                minHeight: '320px',
                maxHeight: '450px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Image src="/solutions/solutions/power-line-uav-intelligent-inspection-banner-drone-clarity-v2.webp" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 38%', filter: 'saturate(1.04) contrast(1.05)' }} priority alt={bannerTitle} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(5,18,37,0.54) 0%, rgba(5,18,37,0.34) 36%, rgba(5,18,37,0.08) 66%, rgba(5,18,37,0.02) 100%)', zIndex: 1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '750px' }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{bannerTitle}</h1>
                        <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.9 }}>{dict.products.bannerDesc}</p>
                    </div>
                </div>
                {/* Visual Accent */}
                <div style={{ position: 'absolute', right: '5%', bottom: '-10%', opacity: 0.05, transform: 'scale(1.2)', width: '400px', height: '400px' }}>
                    <Image src="/logo1-small.webp" alt="N-TET industrial UAV systems emblem" fill style={{ objectFit: 'contain' }} />
                </div>
            </section>

            {/* STICKY CATEGORY NAV */}
            <CategoryNav categories={categoryList} />

            {/* PRODUCT LISTS */}
            <div className="product-lists-wrap" style={{ padding: '60px 0' }}>
                {primaryCategory && (
                <section key={primaryCategory.id} id={primaryCategory.id} style={{ marginBottom: '100px', scrollMarginTop: '300px' }}>
                    <div className="container">
                        <div className="section-title-wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>{primaryCategory.name}</h2>
                            <div style={{ width: '60px', height: '4px', background: '#315ba4', margin: '20px auto' }}></div>
                        </div>

                        <MissionApplicationCatalog
                            title={dict.megaMenu?.byMission || 'By Mission & Application'}
                            products={categoriesData[primaryCategory.id] || []}
                            locale={locale}
                            dict={dict}
                        />

                        <UavGroupedCatalog
                            title={dict.megaMenu?.byFlightPlatform || 'By Flight Platform'}
                            products={categoriesData[primaryCategory.id] || []}
                            field="flightPlatform"
                            groupOrder={FLIGHT_GROUP_ORDER}
                            allowedHandles={FLIGHT_PLATFORM_HANDLES}
                            locale={locale}
                            dict={dict}
                        />
                    </div>
                </section>
                )}
                <DeferredProductSections categories={deferredCategories} locale={locale} dict={dict} />
            </div>

            {/* INQUIRY FORM */}
            <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #eee' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <InquiryForm dict={dict} />
                </div>
            </section>
        </div>
    );
}
