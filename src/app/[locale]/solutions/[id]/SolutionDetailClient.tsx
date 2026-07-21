'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InPageNav from '@/components/products/InPageNav';
import InquiryForm from '@/components/products/InquiryForm';
import UniversalGallery from '@/components/common/UniversalGallery';
import ProductGridCard from '@/components/products/ProductGridCard';
import OptimizedRichText from '@/components/common/OptimizedRichText';
import SolutionFaqSection from '@/components/solutions/SolutionFaqSection';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import PrimaryContactButton from '@/components/contact/PrimaryContactButton';
import { buildKeywordIntro, getSeoKeywordTarget } from '@/lib/seoKeywordTargets';
import { getArabicTechnicalHighlight, getArabicTechnicalParameters, hasBrokenArabicTechnicalCopy } from '@/lib/arabicTechnicalCopy';

function renderParameterValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined || value === '') return '-';

  if (Array.isArray(value)) {
    return (
      <ul style={{ margin: 0, paddingLeft: '18px' }}>
        {value.map((item, index) => (
          <li key={index} style={{ marginBottom: index === value.length - 1 ? 0 : '8px' }}>
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
      <ul style={{ margin: 0, paddingLeft: '18px' }}>
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

function parseOverviewLine(value?: string | null, fallbackLabel?: string) {
  const text = value?.trim();
  if (!text) return null;

  const separatorIndex = text.indexOf(':');
  if (separatorIndex > 0) {
    const label = text.slice(0, separatorIndex).trim();
    const itemValue = text.slice(separatorIndex + 1).trim();
    if (!label || !itemValue) return null;
    return { label, value: itemValue };
  }

  if (!fallbackLabel) return null;
  return { label: fallbackLabel, value: text };
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

const defaultSolutionImages = [
  uavSolutionScenes.tetheredMonitoring,
  uavSolutionScenes.powerLine,
  uavSolutionScenes.searchRescue,
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
      '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
      '/products/02-drone-detection/stationary-rf-detection-system.webp',
      '/products/02-drone-detection/electro-optical-tracking-system.webp',
      '/products/02-drone-detection/low-altitude-detection-radar.webp',
      '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
    ],
  },
  {
    match: 'airport-security-protection',
    images: [
      '/cases/airport-security-application/main-home.webp',
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
      '/cases/asian-games-security/main.webp',
      '/products/02-drone-detection/stationary-rf-detection-system.webp',
      '/products/security/FC-H-Smart-Phone-Detection-Gate.webp',
      '/products/security/FC6550D-Dual-View-X-Ray-Scanner.webp',
      '/products/security/FC1800T-Desktop-Explosives-Narcotics-Detector.webp',
    ],
  },
];

function getSolutionVisuals(handle: string, mainImage?: string) {
  const matchedSet = solutionVisualSets.find((item) => handle.includes(item.match));
  const sceneImages = handle.includes('water-conservancy') ? waterSolutionImages : matchedSet?.images || defaultSolutionImages;
  return Array.from(new Set([...(mainImage ? [mainImage] : []), ...sceneImages]));
}
function getSolutionLabels(locale: string) {
  if (locale === 'ar') {
    return {
      solutionDetails: 'تفاصيل الحل',
      industryEyebrow: 'السياق التشغيلي',
      industryPainPoints: 'احتياجات القطاع',
      upgradeEyebrow: 'تطوير العمليات بالطائرات بدون طيار',
      upgradeTitle: 'كيف ترفع الطائرات بدون طيار كفاءة العمليات',
      modulesEyebrow: 'بنية الحل',
      solutionModules: 'وحدات الحل',
      modulesIntro: 'ينظم الحل حول مهام ميدانية واضحة، وليس حول نموذج واحد فقط من الطائرات بدون طيار. يمكن لفرق التشغيل والطوارئ الجمع بين الدوريات والمراقبة والاستجابة والإدارة المحلية حسب السيناريو.',
      relatedCases: 'حالات ذات صلة',
      solutionOverview: 'نظرة عامة على الحل',
    };
  }

  if (locale === 'es') {
    return {
      solutionDetails: 'Detalles de la solución',
      industryEyebrow: 'Contexto operativo',
      industryPainPoints: 'Necesidades de la industria',
      upgradeEyebrow: 'Actualización operativa con UAV',
      upgradeTitle: 'Cómo los UAV mejoran la eficiencia operativa',
      modulesEyebrow: 'Arquitectura de la solución',
      solutionModules: 'Módulos de la solución',
      modulesIntro: 'La solución se organiza alrededor de tareas de campo, no de un solo modelo de UAV. Los equipos operativos y de emergencia pueden combinar patrullaje, monitoreo, respuesta y gestión local según el escenario.',
      relatedCases: 'Casos relacionados',
      solutionOverview: 'Resumen de la solución',
    };
  }

  if (locale === 'ru') {
    return {
      solutionDetails: 'Детали решения',
      industryEyebrow: 'Отраслевая ситуация',
      industryPainPoints: 'Отраслевые проблемы',
      upgradeEyebrow: 'Модернизация операций с БПЛА',
      upgradeTitle: 'Как БПЛА повышают эффективность работ',
      modulesEyebrow: 'Сценарное решение',
      solutionModules: 'Модули решения',
      modulesIntro: 'Решение построено вокруг полевых задач, а не вокруг одной модели БПЛА, поэтому эксплуатационные и аварийные команды могут сочетать патрулирование, мониторинг, реагирование и управление на месте.',
      relatedCases: 'Связанные кейсы',
      solutionOverview: 'Обзор решения',
    };
  }

  return {
    solutionDetails: 'Solution Details',
    industryEyebrow: 'Industry Situation',
    industryPainPoints: 'Industry Pain Points',
    upgradeEyebrow: 'UAV Operation Upgrade',
    upgradeTitle: 'How UAVs Upgrade Operations',
    modulesEyebrow: 'Scenario-Based Solution',
    solutionModules: 'Solution Modules',
    modulesIntro: 'The solution is organized around field tasks, not around a single UAV model, so operators can combine patrol, monitoring, response, and on-site command operations.',
    relatedCases: 'Related Cases',
    solutionOverview: 'Solution Overview',
  };
}

function SectionList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '14px' }}>
      {items.map((item, index) => (
        <li key={index} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: '12px', alignItems: 'start', fontSize: '1.7rem', lineHeight: 1.7, color: '#334155' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e6effb', color: '#315ba4', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function SolutionVisualSection({
  id,
  eyebrow,
  title,
  items,
  image,
  reverse = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: string[];
  image: string;
  reverse?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <section id={id} style={{ padding: '86px 0', background: reverse ? '#fff' : '#f6f9fd' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: reverse ? '0.92fr 1.08fr' : '1.08fr 0.92fr',
          gap: '56px',
          alignItems: 'center',
        }}>
          <div style={{ order: reverse ? 2 : 1 }}>
            <div style={{ color: '#315ba4', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>{eyebrow}</div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '28px', fontSize: '4.2rem' }}>{title}</h2>
            <SectionList items={items} />
          </div>
          <div style={{ order: reverse ? 1 : 2, position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#e5edf7' }}>
            <Image src={withStaticAssetVersion(image)} alt={title} fill style={{ objectFit: 'cover' }} sizes="42vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
function UpgradeCards({ items, labels }: { items: string[]; labels: ReturnType<typeof getSolutionLabels> }) {
  if (items.length === 0) return null;

  return (
    <section style={{ padding: '86px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ maxWidth: '760px', marginBottom: '34px' }}>
          <div style={{ color: '#315ba4', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>{labels.upgradeEyebrow}</div>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '0', fontSize: '4.2rem' }}>{labels.upgradeTitle}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
          {items.slice(0, 3).map((item, index) => (
            <article key={index} style={{ minHeight: '210px', padding: '30px', background: '#f8fbff', border: '1px solid #dbe7f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#315ba4', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 850, marginBottom: '24px' }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <p style={{ margin: 0, color: '#334155', fontSize: '1.7rem', lineHeight: 1.75 }}>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionModuleRows({
  modules,
  visuals,
  labels,
}: {
  modules: Array<{ name?: string; title?: string; description?: string; role?: string; status?: string; handle?: string; image?: string }>;
  visuals: string[];
  labels: ReturnType<typeof getSolutionLabels>;
}) {
  if (modules.length === 0) return null;

  return (
    <section style={{ padding: '90px 0', background: '#f6f9fd' }}>
      <div className="container">
        <div style={{ width: '100%', marginBottom: '46px' }}>
          <div style={{ color: '#315ba4', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>{labels.modulesEyebrow}</div>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '18px', fontSize: '4.2rem' }}>{labels.solutionModules}</h2>
          <p style={{ fontSize: '1.8rem', lineHeight: 1.8, color: '#52606d', margin: 0 }}>
            {labels.modulesIntro}
          </p>
        </div>

        <div style={{ display: 'grid', gap: '34px' }}>
          {modules.map((module, index) => {
            const reverse = index % 2 === 1;
            const title = module.name || module.title || 'Solution module';
            const description = module.description || module.role || module.status || '';
            const image = module.image || visuals[index + 2] || visuals[index + 1] || visuals[0];

            return (
              <article key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', border: '1px solid #e5edf7', boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)' }}>
                <div style={{ order: reverse ? 2 : 1, position: 'relative', minHeight: '340px', background: '#e5edf7' }}>
                  <Image src={withStaticAssetVersion(image)} alt={title} fill style={{ objectFit: 'cover' }} sizes="48vw" />
                </div>
                <div style={{ order: reverse ? 1 : 2, padding: '44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: '#315ba4', fontSize: '1.35rem', fontWeight: 850, marginBottom: '14px' }}>{String(index + 1).padStart(2, '0')}</div>
                  <h3 style={{ fontSize: '3rem', lineHeight: 1.2, color: '#0f172a', margin: '0 0 18px', fontWeight: 900 }}>{title}</h3>
                  <p style={{ fontSize: '1.7rem', lineHeight: 1.8, color: '#52606d', margin: 0 }}>{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RelatedCaseCard({ item, locale }: { item: any; locale: string }) {
  const title = item[`title_${locale}`] || item.title_en || item.title || item.handle;
  const image = item.main_image || item.image || '/images/solutions/placeholder.jpg';

  return (
    <Link prefetch={false}
      href={localePath(locale, `/cases/${item.handle}`)}
      className="p-card-sbm"
      style={{
        display: 'block',
        background: '#fff',
        border: '1px solid #f0f0f0',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '1.618 / 1',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        isolation: 'isolate'
      }}>
        <Image
          src={withStaticAssetVersion(image)}
          alt={title}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      <div style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid #eee' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', margin: 0, lineHeight: 1.4 }}>{title}</h3>
      </div>
    </Link>
  );
}

function StructuredSolutionContent({
  solution,
  parameters,
  locale,
}: {
  solution: any;
  parameters: Record<string, any>;
  locale: string;
}) {
  const rawJson = parseJsonObject(solution.raw_json);
  const detailSections = rawJson.detail_sections && typeof rawJson.detail_sections === 'object' ? rawJson.detail_sections : {};
  const sectionData = { ...detailSections, ...parameters };
  const visuals = getSolutionVisuals(solution.handle || '', solution.main_image);
  const baseLabels = getSolutionLabels(locale);
  const seoTarget = getSeoKeywordTarget({
    route: `/solutions/${solution.handle || solution.id}`,
    title: solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en,
    category: solution.category_id,
    pageKind: 'solution_detail',
    locale,
  });
  const labels = {
    ...baseLabels,
    industryEyebrow: typeof sectionData.industry_pain_points_eyebrow === 'string' ? sectionData.industry_pain_points_eyebrow : baseLabels.industryEyebrow,
    industryPainPoints: typeof sectionData.industry_pain_points_title === 'string'
      ? sectionData.industry_pain_points_title
      : seoTarget.overviewHeading || baseLabels.industryPainPoints,
    upgradeEyebrow: typeof sectionData.operation_upgrade_eyebrow === 'string' ? sectionData.operation_upgrade_eyebrow : baseLabels.upgradeEyebrow,
    upgradeTitle: typeof sectionData.operation_upgrade_title === 'string' ? sectionData.operation_upgrade_title : baseLabels.upgradeTitle,
    modulesEyebrow: typeof sectionData.solution_modules_eyebrow === 'string' ? sectionData.solution_modules_eyebrow : baseLabels.modulesEyebrow,
    solutionModules: typeof sectionData.solution_modules_title === 'string' ? sectionData.solution_modules_title : baseLabels.solutionModules,
    modulesIntro: typeof sectionData.solution_modules_intro === 'string' ? sectionData.solution_modules_intro : baseLabels.modulesIntro,
  };

  const painPoints = normalizeTextItems(sectionData.industry_pain_points);
  const upgradeItems = normalizeTextItems(sectionData.uav_industry_upgrade);
  const modules = normalizeObjectItems(sectionData.solution_modules);
  const painPointsImage = typeof sectionData.industry_pain_points_image === 'string'
    ? sectionData.industry_pain_points_image
    : visuals[1] || visuals[0];

  const hasStructuredContent = painPoints.length > 0 || upgradeItems.length > 0 || modules.length > 0;
  if (!hasStructuredContent) return null;

  return (
    <>
      <SolutionVisualSection
        id="details"
        eyebrow={labels.industryEyebrow}
        title={labels.industryPainPoints}
        items={painPoints}
        image={painPointsImage}
      />

      <UpgradeCards items={upgradeItems} labels={labels} />

      <SolutionModuleRows modules={modules} visuals={visuals} labels={labels} />

    </>
  );
}

export default function SolutionDetailClient({ 
    solution, 
    recommendedProducts,
    recommendedCases = [],
    locale,
    dict
}: { 
    solution: any, 
    recommendedProducts: any[],
    recommendedCases?: any[],
    locale: string,
    dict: any
}) {
  // Localized field selection
  const name = solution[`product_name_${locale}`] || solution.product_name_en || solution.title_en;
  const summary = solution[`summary_${locale}`] || solution.summary_en;
  const keyApp = solution[`key_application_${locale}`] || solution.key_application_en;
  const keyParam1 = getArabicTechnicalHighlight(solution, 'key_parameter_1', locale);
  const keyParam2 = getArabicTechnicalHighlight(solution, 'key_parameter_2', locale);
  const detailHtml = solution[`detail_html_${locale}`] || solution.detail_html_en;
  
  let parameters: any = null;
  const hasBrokenArabicParameters = locale === 'ar' && hasBrokenArabicTechnicalCopy(solution.parameters_ar);
  try {
      const rawParams = hasBrokenArabicParameters ? {} : getArabicTechnicalParameters(solution, locale);
      parameters = typeof rawParams === 'string' ? JSON.parse(rawParams) : rawParams;
  } catch (e) {
      parameters = {};
  }
  const rawJson = parseJsonObject(solution.raw_json);
  const detailSections = locale !== 'ar' && rawJson.detail_sections && typeof rawJson.detail_sections === 'object' ? rawJson.detail_sections : {};
  const hasStructuredSolutionContent = Object.keys(detailSections).length > 0 || Boolean(parameters?.industry_pain_points || parameters?.uav_industry_upgrade || parameters?.solution_modules);
  const solutionLabels = getSolutionLabels(locale);
  const seoTarget = getSeoKeywordTarget({
    route: `/solutions/${solution.handle || solution.id}`,
    title: name,
    category: solution.category_id,
    pageKind: 'solution_detail',
    locale,
  });
  const displayName = seoTarget.h1 || name;
  const overviewHeading = seoTarget.overviewHeading || solutionLabels.solutionOverview;
  const keywordIntro = buildKeywordIntro(seoTarget, name, locale);
  const solutionOverviewItems = [
    parseOverviewLine(keyApp, 'Application'),
    parseOverviewLine(keyParam1, 'Key Parameter'),
    parseOverviewLine(keyParam2, 'Key Parameter'),
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const images = getSolutionVisuals(solution.handle || '', solution.main_image);
  const heroImages = [(solution.main_image || images[0] || '/logo1-small.webp')].filter(Boolean);

  const navItems = [
    { id: 'overview', label: dict.products.overview },
    { id: hasStructuredSolutionContent ? 'details' : 'features', label: solutionLabels.solutionDetails },
    ...(recommendedProducts.length > 0
      ? [{ id: 'products', label: dict.products.relatedEquipment || 'Related Equipment' }]
      : []),
    ...(recommendedCases.length > 0
      ? [{ id: 'cases', label: solutionLabels.relatedCases }]
      : []),
    { id: 'faq', label: 'FAQ' },
    { id: 'inquiry', label: dict.nav.contact },
  ];

  return (
    <div className="solution-detail-page" style={{ paddingTop: '112px' }}>
      <main>
        {/* 1. Breadcrumb Row */}
        <div className="product-breadcrumb-nav">
          <div className="container">
            <div className="breadcrumb-path">
              <Link href={localePath(locale)}>{dict.nav.home}</Link> &gt; <Link href={localePath(locale, '/solutions')}>{dict.nav.solutions}</Link> &gt; <Link href={localePath(locale, `/solutions/category/${solution.category_id}`)}>{solution.category_name}</Link> &gt; {displayName}
            </div>
          </div>
        </div>

        {/* 2. Hero Section */}
        <section id="overview" className="product-hero" style={{ padding: '40px 0 20px', background: '#fff' }}>
          <div className="container">
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.98fr) minmax(380px, 0.72fr)', gap: '56px', alignItems: 'start' }}>

              {/* Image Gallery Area */}
              <div className="gallery-main-area solution-hero-gallery">
                <UniversalGallery images={heroImages} alt={displayName} fit="cover" aspectRatio="16 / 10" />
              </div>

              {/* Info Area */}
              <div className="product-info" style={{ minWidth: 0 }}>
                <h1 style={{ fontSize: '4.2rem', fontWeight: '900', marginBottom: '24px', lineHeight: '1.12', color: '#263241', letterSpacing: 0 }}>
                  {displayName}
                </h1>

                {solutionOverviewItems.length > 0 && (
                  <div className="solution-overview-card" style={{ marginBottom: '34px', borderTop: '1px solid #dfe8f4', borderBottom: '1px solid #dfe8f4', padding: '24px 0' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#315ba4', marginBottom: '15px' }}>
                      {solutionLabels.solutionOverview}
                    </div>
                    {solutionOverviewItems.map((item, idx) => (
                      <div key={`${item.label}-${idx}`} style={{ fontSize: '1.62rem', lineHeight: '1.65', marginBottom: idx === solutionOverviewItems.length - 1 ? 0 : '16px' }}>
                        <div style={{ color: '#6b7280', fontWeight: 800, marginBottom: '6px' }}>{item.label}</div>
                        <div style={{ color: '#263241', fontWeight: 600 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                  )}

                <div className="cta-group" style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                  <a href="#inquiry" className="btn-cta" style={{ background: '#b45309', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', textDecoration: 'none' }}>
                    {dict.products.getQuotation}
                  </a>
                  <PrimaryContactButton sourceLabel="solution_detail_whatsapp" className="btn-cta" style={{ background: 'var(--contact-channel-accent)', color: '#fff', borderRadius: '4px', textTransform: 'none', fontSize: '2rem', flex: 1, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', fontWeight: '700', textDecoration: 'none' }}>
                    {dict.products.whatsapp}
                  </PrimaryContactButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 Summary Intro */}
        <section className="product-intro-section" style={{ padding: '60px 0', background: '#fff' }}>
          <div className="container">
            <div className="product-intro-text" style={{ fontSize: '1.8rem', color: '#444', lineHeight: '1.8', borderTop: '1px solid #eee', paddingTop: '40px' }}>
              {keywordIntro && <p style={{ margin: '0 0 18px', color: '#263241', fontWeight: 650 }}>{keywordIntro}</p>}
              {summary}
            </div>
          </div>
        </section>

        {/* 3. Sticky Nav */}
        <InPageNav items={navItems} />

        {/* 4. Solution Details */}
        {hasStructuredSolutionContent ? (
          <StructuredSolutionContent solution={solution} parameters={parameters || {}} locale={locale} />
        ) : detailHtml && (
          <section id="features" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '50px' }}>{overviewHeading}</h2>
              <OptimizedRichText
                className="rich-content"
                html={detailHtml}
              />
            </div>
          </section>
        )}

        {/* 5. Parameters Table */}
        {!hasStructuredSolutionContent && parameters && Object.keys(parameters).length > 0 && (
          <section id="specs" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.products.technicalSpecs}</h2>
              <div style={{ border: '1px solid #eee' }}>
                <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f4f7fa', borderBottom: '2px solid #315ba4' }}>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.parameter}</th>
                      <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{dict.products.description}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(parameters).map(([param, val], idx) => (
                      <tr key={idx} style={{
                        background: idx % 2 === 0 ? '#fff' : '#fcfcfc',
                        borderBottom: '1px solid #eee'
                      }}>
                        <td style={{ padding: '20px 30px', fontWeight: 'bold', width: '40%', fontSize: '1.5rem' }}>{param}</td>
                        <td style={{ padding: '20px 30px', fontSize: '1.5rem', lineHeight: 1.6 }}>{renderParameterValue(val)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 5.5 Related Products Section */}
        {recommendedProducts.length > 0 && (
          <section id="products" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#f4f7fa' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{dict.products.relatedEquipment || 'Related Equipment'}</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px' 
              }}>
                {recommendedProducts.map((product, idx) => (
                  <ProductGridCard key={idx} product={product} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        {recommendedCases.length > 0 && (
          <section id="cases" className="detail-section" style={{ padding: '100px 0', backgroundColor: '#fff' }}>
            <div className="container">
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '50px' }}>{solutionLabels.relatedCases}</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                {recommendedCases.map((item) => (
                  <RelatedCaseCard key={item.handle} item={item} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        <SolutionFaqSection locale={locale} subject={displayName} target={seoTarget} />

        {/* 6. Contact Form */}
        <section id="inquiry" className="detail-section alt">
          <div className="container" style={{ maxWidth: '1200px' }}>
            <InquiryForm dict={dict} />
          </div>
        </section>
      </main>
    </div>
  );
}
