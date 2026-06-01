'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MobileSolutionDetail.module.css';
import OptimizedRichText from '../common/OptimizedRichText';
import MobileInquiryForm from './MobileInquiryForm';
import { localePath } from '@/lib/localePath';

interface SolutionProps {
    solution: any;
    recommendedProducts: any[];
    recommendedCases?: any[];
    locale: string;
    dict: any;
}

function renderParameterValue(value: unknown): React.ReactNode {
    if (value === null || value === undefined || value === '') return '-';

    if (Array.isArray(value)) {
        return (
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
                {value.map((item, index) => (
                    <li key={index} style={{ marginBottom: index === value.length - 1 ? 0 : '6px' }}>
                        {renderParameterValue(item)}
                    </li>
                ))}
            </ul>
        );
    }

    if (typeof value === 'object') {
        const record = value as Record<string, unknown>;
        const title = record.name || record.title;
        const description = record.description || record.role || record.status;
        const titleText = title === null || title === undefined ? '' : String(title);
        const descriptionText = description === null || description === undefined ? '' : String(description);

        if (titleText || descriptionText) {
            return (
                <span>
                    {titleText && <strong>{titleText}</strong>}
                    {titleText && descriptionText && <br />}
                    {descriptionText && <span>{descriptionText}</span>}
                </span>
            );
        }

        return (
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
                {Object.entries(record).map(([key, val]) => (
                    <li key={key}>
                        <strong>{key}: </strong>{renderParameterValue(val)}
                    </li>
                ))}
            </ul>
        );
    }

    return String(value);
}

function parseJsonObject(value: unknown): Record<string, any> {
    if (!value) return {};
    if (typeof value === 'object') return value as Record<string, any>;
    if (typeof value !== 'string') return {};
    try {
        return JSON.parse(value);
    } catch {
        return {};
    }
}

function normalizeTextItems(value: unknown): string[] {
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [];
}

function normalizeObjectItems(value: unknown): Array<{ name?: string; title?: string; description?: string; role?: string; status?: string; handle?: string; image?: string }> {
    return Array.isArray(value) ? value.filter((item) => item && typeof item === 'object') as Array<{ name?: string; title?: string; description?: string; role?: string; status?: string; handle?: string; image?: string }> : [];
}

const uavSolutionScenes = {
    powerLine: '/solutions/uav-detail/power-line-inspection.webp',
    highRiseFirefighting: '/solutions/uav-detail/high-rise-firefighting.webp',
    waterConservancy: '/solutions/uav-detail/water-conservancy-monitoring.webp',
    nightLighting: '/solutions/uav-detail/night-emergency-lighting.webp',
    searchRescue: '/solutions/uav-detail/disaster-search-rescue.webp',
    emergencyCommunication: '/solutions/uav-detail/emergency-communication.webp',
    smartSubstation: '/solutions/uav-detail/smart-substation-inspection.webp',
    smartSubstationDrone: '/solutions/uav-detail/smart-substation-automatic-inspection-drone.webp',
    smartSubstationPlatform: '/solutions/uav-detail/smart-substation-ai-control-platform.webp',
    smartSubstationInstrument: '/solutions/uav-detail/smart-substation-instrument-reading.webp',
    smartSubstationWireThermal: '/solutions/uav-detail/smart-substation-wire-thermal-anomaly.webp',
    smartSubstationSwitchThermal: '/solutions/uav-detail/smart-substation-switch-thermal-monitoring.webp',
    maritimePatrol: '/solutions/uav-detail/maritime-patrol.webp',
    tetheredMonitoring: '/solutions/uav-detail/tethered-monitoring.webp',
    powerLineDocPayload: '/solutions/power-line-uav-intelligent-inspection-solution/power-grid-inspection-01.webp',
    powerLineDocCorridor: '/solutions/power-line-uav-intelligent-inspection-solution/power-grid-inspection-02.webp',
    powerLineDocPointCloud: '/solutions/power-line-uav-intelligent-inspection-solution/power-grid-inspection-03.webp',
    powerLineDocLidar: '/solutions/power-line-uav-intelligent-inspection-solution/power-grid-inspection-04.webp',
    powerLineDocTowerDrone: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-02.webp',
    powerLineDocTowerFlight: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-03.webp',
    powerLineDocThermal: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-04.webp',
    powerLineDocHardware: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-05.webp',
    powerLineDocWire: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-06.webp',
    powerLineDocInsulator: '/solutions/power-line-uav-intelligent-inspection-solution/tower-inspection-07.webp',
    firefightingPainPoint: '/solutions/urban-high-rise-firefighting-emergency-uav-solution/high-rise-fire-drill.webp',
    firefightingSpray: '/solutions/urban-high-rise-firefighting-emergency-uav-solution/high-rise-water-spray.webp',
    firefightingForest: '/solutions/urban-high-rise-firefighting-emergency-uav-solution/forest-fire-support.webp',
    firefightingBuilding: '/solutions/urban-high-rise-firefighting-emergency-uav-solution/building-fire-rescue.webp',
    firefightingWindow: '/solutions/urban-high-rise-firefighting-emergency-uav-solution/high-rise-window-breaking.webp',
};

const waterSolutionImages = [
    uavSolutionScenes.waterConservancy,
    uavSolutionScenes.searchRescue,
    uavSolutionScenes.emergencyCommunication,
];

const solutionVisualSets: Array<{ match: string; images: string[] }> = [
    {
        match: 'urban-high-rise-firefighting',
        images: [
            uavSolutionScenes.firefightingPainPoint,
            uavSolutionScenes.firefightingSpray,
            uavSolutionScenes.firefightingForest,
            uavSolutionScenes.firefightingBuilding,
            uavSolutionScenes.firefightingWindow,
        ],
    },
    {
        match: 'high-rise-firefighting',
        images: [
            uavSolutionScenes.firefightingPainPoint,
            uavSolutionScenes.firefightingSpray,
            uavSolutionScenes.firefightingForest,
            uavSolutionScenes.firefightingBuilding,
            uavSolutionScenes.firefightingWindow,
        ],
    },
    {
        match: 'night-emergency-lighting',
        images: [
            uavSolutionScenes.nightLighting,
            uavSolutionScenes.emergencyCommunication,
            uavSolutionScenes.tetheredMonitoring,
        ],
    },
    {
        match: 'tethered-lighting',
        images: [
            uavSolutionScenes.nightLighting,
            uavSolutionScenes.tetheredMonitoring,
            uavSolutionScenes.emergencyCommunication,
        ],
    },
    {
        match: 'post-disaster-emergency-communication',
        images: [
            uavSolutionScenes.emergencyCommunication,
            uavSolutionScenes.searchRescue,
            uavSolutionScenes.nightLighting,
        ],
    },
    {
        match: 'emergency-communication',
        images: [
            uavSolutionScenes.emergencyCommunication,
            uavSolutionScenes.tetheredMonitoring,
            uavSolutionScenes.searchRescue,
        ],
    },
    {
        match: 'disaster-site-search-rescue',
        images: [
            uavSolutionScenes.searchRescue,
            uavSolutionScenes.nightLighting,
            uavSolutionScenes.emergencyCommunication,
        ],
    },
    {
        match: 'emergency-search-rescue',
        images: [
            uavSolutionScenes.searchRescue,
            uavSolutionScenes.nightLighting,
            uavSolutionScenes.emergencyCommunication,
        ],
    },
    {
        match: 'power-line-uav',
        images: [
            uavSolutionScenes.powerLineDocPayload,
            uavSolutionScenes.powerLineDocCorridor,
            uavSolutionScenes.powerLineDocTowerFlight,
            uavSolutionScenes.powerLineDocThermal,
            uavSolutionScenes.powerLineDocPointCloud,
            uavSolutionScenes.powerLineDocInsulator,
        ],
    },
    {
        match: 'power-tower-inspection',
        images: [
            uavSolutionScenes.powerLineDocTowerDrone,
            uavSolutionScenes.powerLineDocTowerFlight,
            uavSolutionScenes.powerLineDocThermal,
            uavSolutionScenes.powerLineDocHardware,
            uavSolutionScenes.powerLineDocWire,
            uavSolutionScenes.powerLineDocInsulator,
        ],
    },
    {
        match: 'smart-substation',
        images: [
            uavSolutionScenes.smartSubstationPlatform,
            uavSolutionScenes.smartSubstationInstrument,
            uavSolutionScenes.smartSubstationWireThermal,
            uavSolutionScenes.smartSubstationSwitchThermal,
        ],
    },
    {
        match: 'uav-maritime-patrol',
        images: [
            uavSolutionScenes.maritimePatrol,
            uavSolutionScenes.emergencyCommunication,
            uavSolutionScenes.searchRescue,
        ],
    },
    {
        match: 'oil-production-base-protection',
        images: [
            '/products/02-drone-detection/drone-detection-home.webp',
            '/products/02-drone-detection/stationary-rf-detection-system.webp',
            '/products/02-drone-detection/electro-optical-tracking-system.webp',
            '/products/02-drone-detection/low-altitude-detection-radar.webp',
            '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
        ],
    },
    {
        match: 'airport-security-protection',
        images: [
            '/solutions/solutions/Airport Security Protection.webp',
            '/products/02-drone-detection/stationary-rf-detection-system.webp',
            '/products/security/FC-H-Smart-Phone-Detection-Gate.webp',
            '/products/security/FC6550D-Dual-View-X-Ray-Scanner.webp',
            '/products/security/FC1800T-Desktop-Explosives-Narcotics-Detector.webp',
        ],
    },
    {
        match: 'judicial-sector-security',
        images: [
            '/solutions/solutions/Judicial Sector Security.webp',
            '/products/02-drone-detection/stationary-rf-detection-system.webp',
            '/products/security/FC-H-Smart-Phone-Detection-Gate.webp',
            '/products/security/FC6550D-Dual-View-X-Ray-Scanner.webp',
            '/products/security/FC1800T-Desktop-Explosives-Narcotics-Detector.webp',
        ],
    },
    {
        match: 'sports-event-security',
        images: [
            '/solutions/solutions/Large Sports Event Security.webp',
            '/products/02-drone-detection/stationary-rf-detection-system.webp',
            '/products/security/FC-H-Smart-Phone-Detection-Gate.webp',
            '/products/security/FC6550D-Dual-View-X-Ray-Scanner.webp',
            '/products/security/FC1800T-Desktop-Explosives-Narcotics-Detector.webp',
        ],
    },
];

function getSolutionVisuals(handle: string, mainImage?: string) {
    const defaultSolutionImages = [
        uavSolutionScenes.tetheredMonitoring,
        uavSolutionScenes.powerLine,
        uavSolutionScenes.searchRescue,
    ];
    const matchedSet = solutionVisualSets.find((item) => handle.includes(item.match));
    const sceneImages = handle.includes('water-conservancy') ? waterSolutionImages : matchedSet?.images || defaultSolutionImages;
    return Array.from(new Set([...(mainImage ? [mainImage] : []), ...sceneImages]));
}

function getSolutionLabels(locale: string) {
    if (locale === 'ru') {
        return {
            solutionDetails: 'Детали решения',
            industryPainPoints: 'Отраслевые проблемы',
            upgradeTitle: 'Как БПЛА повышают эффективность работ',
            solutionModules: 'Модули решения',
            relatedCases: 'Связанные кейсы',
        };
    }

    return {
        solutionDetails: 'Solution Details',
        industryPainPoints: 'Industry Pain Points',
        upgradeTitle: 'How UAVs Upgrade Operations',
        solutionModules: 'Solution Modules',
        relatedCases: 'Related Cases',
    };
}

function MobileNumberList({ items }: { items: string[] }) {
    return (
        <div style={{ display: 'grid', gap: '12px' }}>
            {items.map((item, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '26px 1fr', gap: '10px', alignItems: 'start' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#e6effb', color: '#315ba4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, marginTop: '2px' }}>{index + 1}</span>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.75, color: '#334155' }}>{item}</p>
                </div>
            ))}
        </div>
    );
}

function MobileSceneSection({ title, items, image }: { title: string; items: string[]; image: string }) {
    if (items.length === 0) return null;

    return (
        <section className={styles.section}>
            <h2 id="solution-details-title" className={styles.sectionTitleCenter}>{title}</h2>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', background: '#e5edf7', marginBottom: '18px' }}>
                <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} sizes="100vw" />
            </div>
            <MobileNumberList items={items} />
        </section>
    );
}

function MobileUpgradeBlocks({ items, title }: { items: string[]; title: string }) {
    if (items.length === 0) return null;

    return (
        <section className={styles.section} style={{ background: '#f8faff' }}>
            <h2 className={styles.sectionTitleCenter}>{title}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
                {items.slice(0, 3).map((item, index) => (
                    <article key={index} style={{ background: '#fff', border: '1px solid #dbe7f6', padding: '18px' }}>
                        <div style={{ color: '#315ba4', fontSize: '13px', fontWeight: 900, marginBottom: '10px' }}>{String(index + 1).padStart(2, '0')}</div>
                        <p style={{ margin: 0, color: '#334155', fontSize: '15px', lineHeight: 1.75 }}>{item}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function MobileModuleRows({
    modules,
    visuals,
    title,
}: {
    modules: Array<{ name?: string; title?: string; description?: string; role?: string; status?: string; handle?: string; image?: string }>;
    visuals: string[];
    title: string;
}) {
    if (modules.length === 0) return null;

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitleCenter}>{title}</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
                {modules.map((module, index) => {
                    const title = module.name || module.title || 'Solution module';
                    const description = module.description || module.role || module.status || '';
                    const image = module.image || visuals[index + 2] || visuals[index + 1] || visuals[0];
                    return (
                        <article key={index} style={{ background: '#fff', border: '1px solid #e5edf7', boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)' }}>
                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', background: '#e5edf7' }}>
                                <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} sizes="100vw" />
                            </div>
                            <div style={{ padding: '18px' }}>
                                <div style={{ color: '#315ba4', fontSize: '13px', fontWeight: 900, marginBottom: '8px' }}>{String(index + 1).padStart(2, '0')}</div>
                                <h3 style={{ fontSize: '19px', color: '#0f172a', lineHeight: 1.25, margin: '0 0 10px', fontWeight: 900 }}>{title}</h3>
                                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#52606d', margin: 0 }}>{description}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

function MobileCaseCard({ item, locale }: { item: any; locale: string }) {
    const title = item[`title_${locale}`] || item.title_en || item.title || item.handle;
    const image = item.main_image || item.image || '/images/solutions/placeholder.jpg';

    return (
        <Link href={localePath(locale, `/cases/${item.handle}`)} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} sizes="45vw" />
            </div>
            <div style={{ padding: '12px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#333', margin: 0, lineHeight: 1.35 }}>{title}</h3>
            </div>
        </Link>
    );
}

export default function MobileSolutionDetail({ solution, recommendedProducts, recommendedCases = [], locale, dict }: SolutionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');
    const solutionLabels = getSolutionLabels(locale);

    // Localized field selection
    const name = solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en;
    const summary = solution[`summary_${locale}`] || solution.summary_en;
    const keyApp = solution[`key_application_${locale}`] || solution.key_application_en;
    const keyParam1 = solution[`key_parameter_1_${locale}`] || solution.key_parameter_1_en;
    const keyParam2 = solution[`key_parameter_2_${locale}`] || solution.key_parameter_2_en;
    const detailHtml = solution[`detail_html_${locale}`] || solution.detail_html_en;
    
    let parameters: any = null;
    try {
        const rawParams = solution[`parameters_${locale}`] || solution.parameters_en;
        parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
    } catch (e) {
        parameters = {};
    }

    const rawJson = parseJsonObject(solution.raw_json);
    const detailSections = rawJson.detail_sections && typeof rawJson.detail_sections === 'object' ? rawJson.detail_sections : {};
    const sectionData = { ...detailSections, ...(parameters || {}) };
    const painPoints = normalizeTextItems(sectionData.industry_pain_points);
    const upgradeItems = normalizeTextItems(sectionData.uav_industry_upgrade);
    const modules = normalizeObjectItems(sectionData.solution_modules);
    const visuals = getSolutionVisuals(solution.handle || '', solution.main_image);
    const painPointsImage = typeof sectionData.industry_pain_points_image === 'string'
        ? sectionData.industry_pain_points_image
        : visuals[1] || visuals[0];
    const hasStructuredSolutionContent = painPoints.length > 0 || upgradeItems.length > 0 || modules.length > 0;
    const contentLabels = {
        ...solutionLabels,
        upgradeTitle: typeof sectionData.operation_upgrade_title === 'string' ? sectionData.operation_upgrade_title : solutionLabels.upgradeTitle,
    };

    let gallery = [];
    try {
        const rawGallery = solution.solution_images || solution.Solution_Images || [];
        gallery = typeof rawGallery === 'string' ? JSON.parse(rawGallery) : (rawGallery || []);
    } catch (e) {
        gallery = [];
    }
    const mainImg = solution.main_image;
    
    // Touch swipe logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) {
                setActiveIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
            } else {
                setActiveIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
            }
        }
    };
    
    let displayImages = Array.from(new Set([mainImg, ...gallery])).filter(Boolean) as string[];
    if (displayImages.length === 0) displayImages = ['/images/solutions/placeholder.jpg'];

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 165;
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - headerOffset;
            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* 1. Breadcrumb - Clean Text Style */}
            <div className={styles.breadcrumb}>
                <Link href={localePath(locale)}>{dict.nav.home}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={localePath(locale, '/solutions')}>{dict.nav.solutions}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href={localePath(locale, `/solutions/category/${solution.category_id}`)}>{solution.category_name}</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>
                    {name}
                </span>
            </div>

            {/* 2. Main Hero Area */}
            <section className={styles.heroSection}>
                {/* Gallery First */}
                <div className={styles.gallery}>
                    <div 
                        className={styles.mainImage}
                        style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden', background: '#fff', marginBottom: '10px' }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndHandler}
                    >
                        <Image src={displayImages[activeIndex]} alt={name} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
                    </div>
                    {displayImages.length > 1 && (
                        <div className={styles.thumbTrack}>
                            {displayImages.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`${styles.thumbItem} ${activeIndex === idx ? styles.active : ''}`}
                                    style={{ position: 'relative', flex: '0 0 70px', height: '52px' }}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <Image src={img} alt={`Thumb ${idx}`} fill style={{ objectFit: 'cover' }} sizes="20vw" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title Second */}
                <h1 className={styles.title}>{name}</h1>

                {/* Info Content */}
                <div className={styles.infoContent}>
                    {/* Key Parameters */}
                    <div className={styles.keyParams}>
                        {keyApp && <div className={styles.paramItem}>{keyApp}</div>}
                        {keyParam1 && <div className={styles.paramItem}>{keyParam1}</div>}
                        {keyParam2 && <div className={styles.paramItem}>{keyParam2}</div>}
                    </div>
                </div>

                {/* Consolidated Button */}
                <a 
                    href="#inquiry" 
                    className={styles.ctaButton}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('inquiry-title');
                    }}
                >
                    {dict.products.getQuotation}
                </a>

                {/* Summary */}
                {summary && (
                    <div className={styles.summaryBox}>
                        {summary}
                    </div>
                )}
            </section>

            {/* 3. Sticky Sub-Nav */}
            <nav className={styles.stickyNav}>
                <div className={styles.navTrack}>
                    <button 
                        className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                        onClick={() => scrollToSection('overview-title')}
                    >
                        {dict.products.overview}
                    </button>
                    {hasStructuredSolutionContent ? (
                        <button
                            className={`${styles.navItem} ${activeTab === 'details' ? styles.active : ''}`}
                            onClick={() => scrollToSection('solution-details-title')}
                        >
                            {solutionLabels.solutionDetails}
                        </button>
                    ) : (
                        <button
                            className={`${styles.navItem} ${activeTab === 'specs' ? styles.active : ''}`}
                            onClick={() => scrollToSection('specs-title')}
                        >
                            {dict.products.technicalSpecs}
                        </button>
                    )}
                    {recommendedProducts && recommendedProducts.length > 0 && (
                        <button
                            className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
                            onClick={() => scrollToSection('products-title')}
                        >
                            {dict.products.relatedEquipment || 'Related Equipment'}
                        </button>
                    )}
                    {recommendedCases.length > 0 && (
                        <button
                            className={`${styles.navItem} ${activeTab === 'cases' ? styles.active : ''}`}
                            onClick={() => scrollToSection('cases-title')}
                        >
                            {solutionLabels.relatedCases}
                        </button>
                    )}
                    <button 
                        className={`${styles.navItem} ${activeTab === 'inquiry' ? styles.active : ''}`}
                        onClick={() => scrollToSection('inquiry-title')}
                    >
                        {dict.nav.contact}
                    </button>
                </div>
            </nav>

            {/* 4. Overview Section */}
            <section className={styles.section}>
                <h2 id="overview-title" className={styles.sectionTitleCenter}>{dict.products.overview}</h2>
                {hasStructuredSolutionContent ? (
                    <p className={styles.richText}>{summary || keyApp}</p>
                ) : detailHtml ? (
                    <OptimizedRichText 
                        className={styles.richText}
                        html={detailHtml}
                    />
                ) : (
                    <p className={styles.richText}>{dict.products.noDetail || "No detailed description available."}</p>
                )}
            </section>

            {hasStructuredSolutionContent && (
                <>
                    <MobileSceneSection title={contentLabels.industryPainPoints} items={painPoints} image={painPointsImage} />
                    <MobileUpgradeBlocks items={upgradeItems} title={contentLabels.upgradeTitle} />
                    <MobileModuleRows modules={modules} visuals={visuals} title={contentLabels.solutionModules} />
                </>
            )}

            {/* 5. Technical Specifications Section */}
            {!hasStructuredSolutionContent && parameters && Object.keys(parameters).length > 0 && (
                <section className={styles.section}>
                    <h2 id="specs-title" className={styles.sectionTitleCenter}>{dict.products.technicalSpecs}</h2>
                    <table className={styles.specsTable}>
                        <tbody>
                            {Object.entries(parameters).map(([param, val], idx) => (
                                <tr key={idx}>
                                    <td className={styles.specLabel}>{param}</td>
                                    <td className={styles.specValue}>{renderParameterValue(val)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* 5.5 Related Products */}
            {recommendedProducts && recommendedProducts.length > 0 && (
                <section className={styles.section} style={{ background: '#f8faff', paddingBottom: '30px' }}>
                    <h2 id="products-title" className={styles.sectionTitleCenter}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        {recommendedProducts.map((prod, idx) => (
                            <Link href={localePath(locale, `/products/${prod.handle}`)} key={idx} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                                    <Image src={prod.image} alt={prod.name} fill style={{ objectFit: 'contain', padding: '10px' }} sizes="45vw" />
                                </div>
                                <div style={{ padding: '12px', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#333', margin: 0 }}>{prod.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {recommendedCases && recommendedCases.length > 0 && (
                <section className={styles.section} style={{ background: '#fff', paddingBottom: '30px' }}>
                    <h2 id="cases-title" className={styles.sectionTitleCenter}>{solutionLabels.relatedCases}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        {recommendedCases.map((item) => (
                            <MobileCaseCard key={item.handle} item={item} locale={locale} />
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Inquiry Section */}
            <section id="inquiry-title" className={styles.section} style={{ background: '#f8faff', paddingTop: '20px' }}>
                <MobileInquiryForm dict={dict} />
            </section>
        </div>
    );
}

