import db from './db';

export type ComplianceTier = 'normal' | 'neutral_seo' | 'restricted';
export type ComplianceContentType = 'product' | 'solution' | 'case' | 'media';

const PRODUCT_TIERS: Record<string, ComplianceTier> = {
  'stationary-rf-detection-system': 'neutral_seo',
  'directional-rf-event-logging': 'neutral_seo',
  'portable-rf-detection-case': 'neutral_seo',
  'omni-directional-rf-event-logging': 'neutral_seo',
  'portable-low-altitude-monitoring-event-logging-shield': 'neutral_seo',
  'portable-low-altitude-monitoring-event-logging-shield-pro': 'neutral_seo',
  'portable-integrated-detection-event-logging-c-uas-basic': 'neutral_seo',
  'portable-integrated-detection-event-logging-c-uas-pro': 'neutral_seo',
  'portable-integrated-detection-event-logging-low-altitude-monitoring-basic': 'neutral_seo',
  'portable-integrated-detection-event-logging-pro-low-altitude-monitoring': 'neutral_seo',
  'stationary-active-rf-defense-system': 'neutral_seo',
  'uav-navigation-airspace-data-verification-system': 'neutral_seo',
  'portable-active-rf-defense-system': 'neutral_seo',
  'composite-electro-optical-tracking-system': 'neutral_seo',
  'uav-remote-id-monitoring-system': 'neutral_seo',
  'handheld-rf-detection-system-mini': 'neutral_seo',
  'low-altitude-detection-radar-ku-band': 'neutral_seo',
  'low-altitude-3d-pulse-doppler-radar': 'neutral_seo',

  'directional-rf-jammer': 'restricted',
  'omni-directional-rf-jammer': 'restricted',
  'portable-anti-drone-jammer-shield': 'restricted',
  'portable-anti-drone-jammer-shield-pro': 'restricted',
  'portable-integrated-detection-jamming-c-uas-basic': 'restricted',
  'portable-integrated-detection-jamming-pro-c-uas': 'restricted',
  'uav-navigation-spoofing-system': 'restricted',
  'handheld-integrated-sdr-c-uas': 'restricted',
  'handheld-integrated-sdr-low-altitude-monitoring': 'restricted',
  'handheld-integrated-multi-band-event-logging-directional-antenna-unit': 'restricted',
  'handheld-integrated-multi-band-jammer-gun': 'restricted',
};

const SOLUTION_TIERS: Record<string, ComplianceTier> = {
  'low-altitude-airspace-monitoring': 'normal',
  'drone-detector': 'normal',
  'drone-radar-detection': 'normal',
  'portable-drone-detection': 'normal',
  'critical-infrastructure-airspace-monitoring': 'neutral_seo',
  'power-plant-airspace-monitoring': 'neutral_seo',
  'border-airspace-monitoring': 'neutral_seo',
  'public-safety-airspace-monitoring': 'neutral_seo',
  'correctional-facility-airspace-monitoring': 'neutral_seo',
  'port-airspace-monitoring': 'neutral_seo',
  'mass-event-airspace-monitoring': 'neutral_seo',
  'vip-private-property-airspace-monitoring': 'neutral_seo',
  'enterprise-airspace-monitoring': 'neutral_seo',
  'chemical-plant-protection': 'neutral_seo',
  'hydroelectric-dam-protection': 'neutral_seo',
  'oil-production-base-protection': 'neutral_seo',
  'power-generation-facility-anti-uav': 'restricted',
  'airport-security-protection': 'neutral_seo',
  'judicial-sector-security': 'neutral_seo',
  'sports-event-security': 'neutral_seo',

  'airport-anti-uav': 'restricted',
};

const CASE_TIERS: Record<string, ComplianceTier> = {
  'airport-security-application': 'neutral_seo',
  'asian-games-security': 'neutral_seo',
  'water-conservancy-security': 'neutral_seo',
  'pakistan-power-plant-low-altitude-monitoring': 'neutral_seo',
  'brazil-refinery-low-altitude-monitoring': 'neutral_seo',
  'nigeria-factory-low-altitude-monitoring': 'neutral_seo',
  'pakistan-power-plant-anti-uav': 'restricted',
  'brazil-refinery-anti-uav': 'restricted',
  'nigeria-factory-anti-uav': 'restricted',
};

const MEDIA_TIERS: Record<string, ComplianceTier> = {
  'multi-sensor-cuas-architecture-2026': 'restricted',
  'cuas-critical-infrastructure-deployment-2026': 'restricted',
  'remote-id-rf-detection-complementary-2025': 'neutral_seo',
  'ntet-portable-fixed-vehicle-cuas-review-2025': 'neutral_seo',
  'cuas-site-survey-critical-infrastructure-2025': 'neutral_seo',
  'ntet-equipment-bench-checks-2025': 'neutral_seo',
  'weather-terrain-urban-clutter-drone-detection-2025': 'neutral_seo',
  'ntet-cuas-technical-documentation-2025': 'neutral_seo',
  'drone-detection-range-site-coverage-2025': 'neutral_seo',
  'ntet-multi-sensor-configuration-method-2025': 'neutral_seo',
  'cuas-event-logging-data-retention-2026': 'neutral_seo',
  'ntet-uav-engineering-cuas-perspective-2026': 'neutral_seo',
  'industrial-uav-redundancy-2026': 'neutral_seo',
  'project-inquiry-review-low-altitude-monitoring-2026': 'neutral_seo',
  'site-photo-review-before-system-layout-2026': 'neutral_seo',
  'radar-rf-optical-nuisance-alert-reduction-2026': 'neutral_seo',
  'critical-infrastructure-monitoring-record-chain-2026': 'neutral_seo',
  'low-altitude-economy-2026-outlook': 'neutral_seo',
  'low-altitude-economy-operations-owner-2026': 'neutral_seo',
  'eo-ir-payload-selection-field-note-2026': 'neutral_seo',
  'tethered-uav-persistent-surveillance-2026': 'neutral_seo',
  'border-surveillance-uav-network-2026': 'neutral_seo',
};

const TIER_MAPS: Record<ComplianceContentType, Record<string, ComplianceTier>> = {
  product: PRODUCT_TIERS,
  solution: SOLUTION_TIERS,
  case: CASE_TIERS,
  media: MEDIA_TIERS,
};

const VALID_TIERS = new Set<ComplianceTier>(['normal', 'neutral_seo', 'restricted']);

interface DbComplianceTerm {
  term: string;
  replacement: string;
}

const TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bAnti[-\s]?UAV\b/gi, 'C-UAS'],
  [/\bAnti[-\s]?Drone\b/gi, 'anti drone'],
  [/\bJammers?\b/gi, 'RF scanners'],
  [/\bJamming\b/gi, 'RF signal analysis'],
  [/\bSignal Blockers?\b/gi, 'RF signal analyzers'],
  [/\bSpoofing\b/gi, 'signal verification'],
  [/\bNavigation\s+Deception\b/gi, 'signal verification'],
  [/\bDeception\b/gi, 'signal verification'],
  [/\bIntercept(?:ion|s|ed|ing)?\b/gi, 'detect'],
  [/\bInterference\b/gi, 'RF noise'],
  [/\bInterfere\b/gi, 'affect'],
  [/\bSuppression\b/gi, 'event management'],
  [/\bCountermeasures?\b/gi, 'response protocols'],
  [/\bNeutraliz(?:e|es|ed|ing|ation)\b/gi, 'coordinate response'],
  [/\bForced?\s+Landing\b/gi, 'incident response'],
  [/\bEmergency\s+Landing\b/gi, 'incident response'],
  [/\bReturn\s+to\s+Home\b/gi, 'incident response'],
  [/\bPrecision\s+Strike\b/gi, 'focused event handling'],
  [/\bStrike\s+down\b/gi, 'detect'],
  [/\bStrike\b/gi, 'event handling'],
  [/\bDefeat\b/gi, 'manage'],
  [/\bDestroy\b/gi, 'remove from service'],
  [/\bShoot\s+down\b/gi, 'detect'],
  [/\bKiller\b/gi, 'safety'],
  [/\bGun\b/gi, 'directional antenna unit'],
  [/\bWeapon\b/gi, 'prohibited item'],
  [/\bMilitary\s+grade\b/gi, 'industrial-grade'],
  [/\bMilitary\b/gi, 'industrial'],
  [/\bTactical\b/gi, 'field'],
  [/\bDefense\s+Engineering\b/gi, 'Engineering Materials'],
  [/\bDefense\s+department\b/gi, 'public-sector operator'],
  [/\bDefense\b/gi, 'Security'],
  [/\u53cd\u65e0\u4eba\u673a/gi, '\u4f4e\u7a7a\u76d1\u6d4b'],
  [/\u53cd\u5236\u67aa/gi, '\u5b9a\u5411\u5929\u7ebf\u5355\u5143'],
  [/\u53cd\u5236/gi, '\u5408\u89c4\u54cd\u5e94'],
  [/\u5e72\u6270/gi, '\u5c04\u9891\u566a\u58f0'],
  [/\u538b\u5236/gi, '\u4e8b\u4ef6\u7ba1\u7406'],
  [/\u8bf1\u9a97/gi, '\u5bfc\u822a\u4fe1\u53f7\u5206\u6790'],
  [/\u5bfc\u822a\u6b3a\u9a97/gi, '\u5bfc\u822a\u4fe1\u53f7\u5206\u6790'],
  [/\u6253\u51fb/gi, '\u4e8b\u4ef6\u5904\u7406'],
  [/\u8feb\u964d/gi, '\u4e8b\u4ef6\u54cd\u5e94'],
  [/\u7981\u98de\u533a/gi, '\u7ba1\u63a7\u533a\u57df'],
  [/\u5bdf\u6253\u4e00\u4f53/gi, '\u4f4e\u7a7a\u76d1\u6d4b'],
  [/\u65e0\u7ebf\u7535\u4e3b\u52a8\u9632\u5fa1/gi, '\u5c04\u9891\u6001\u52bf\u5206\u6790'],
  [/\u6b66\u5668/gi, '\u7ba1\u5236\u7269\u54c1'],
  [/противодейств[а-яё]*(?:\s+БПЛА)?/gi, 'мониторинг воздушного пространства'],
  [/защит[аыуеой]*\s+от\s+БПЛА/gi, 'мониторинг воздушного пространства'],
  [/подав[а-яё]*/gi, 'анализ сигналов'],
  [/подавител[а-яё]*/gi, 'анализатор сигналов'],
  [/помех[а-яё]*/gi, 'радиочастотный анализ'],
  [/глуш[а-яё]*/gi, 'радиочастотный анализ'],
  [/блокировк[а-яё]*\s+сигнал[а-яё]*/gi, 'анализ сигналов'],
  [/спуф[а-яё]*/gi, 'анализ навигационных сигналов'],
  [/десепц[а-яё]*/gi, 'анализ навигационных сигналов'],
  [/перехват[а-яё]*/gi, 'обнаружение'],
  [/нейтрализ[а-яё]*/gi, 'управление событием'],
  [/оруж[а-яё]*/gi, 'оборудование'],
  [/ружь[а-яё]*/gi, 'направленная антенна'],
  [/военн[а-яё]*/gi, 'промышленный'],
  [/тактич[а-яё]*/gi, 'полевой'],
  [/оборон[а-яё]*/gi, 'безопасность'],
  [/комплекс(?:ы|ов|ами)?\s+борьбы\s+с\s+дронами/gi, 'системы мониторинга воздушного пространства'],
];

export const RESTRICTED_TERMS: RegExp[] = [
  /\bjammer\b/i,
  /\bjamming\b/i,
  /\bsignal blocker\b/i,
  /\bspoofing\b/i,
  /\bdeception\b/i,
  /\bnavigation\s+deception\b/i,
  /\bintercept\b/i,
  /\bneutraliz(?:e|es|ed|ing|ation)\b/i,
  /\bforced?\s+landing\b/i,
  /\bemergency\s+landing\b/i,
  /\breturn\s+to\s+home\b/i,
  /\bprecision\s+strike\b/i,
  /\bstrike\b/i,
  /\bweapon\b/i,
  /\bgun\b/i,
  /\bshoot down\b/i,
  /\bdestroy\b/i,
  /\bmilitary grade\b/i,
  /\btactical weapon\b/i,
  /\u53cd\u65e0\u4eba\u673a/i,
  /\u53cd\u5236/i,
  /\u5e72\u6270/i,
  /\u538b\u5236/i,
  /\u8bf1\u9a97/i,
  /\u6253\u51fb/i,
  /\u6b66\u5668/i,
];

export function getComplianceTier(type: ComplianceContentType, handleOrId?: string | null): ComplianceTier {
  if (!handleOrId) return 'normal';
  try {
    const rule = db.prepare(`
      SELECT tier
      FROM compliance_content_rules
      WHERE content_type = ? AND handle = ?
    `).get(type, handleOrId) as { tier?: string } | undefined;

    if (rule?.tier && VALID_TIERS.has(rule.tier as ComplianceTier)) {
      return rule.tier as ComplianceTier;
    }
  } catch (error) {
    // During early initialization or tests, fall back to the code-defined baseline.
  }

  return TIER_MAPS[type][handleOrId] || 'normal';
}

export function getPublicProductCategory(category?: string | null): string {
  if (category === 'anti-drone-cuas') return 'drone-detection';
  if (category === 'defense-engineering') return 'engineering-materials';
  return category || '';
}

export function isPublicComplianceContent(type: ComplianceContentType, handleOrId?: string | null) {
  return getComplianceTier(type, handleOrId) !== 'restricted';
}

export function sanitizeComplianceText(value: string): string {
  const sanitized = TEXT_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value
  );

  return getEnabledDbComplianceTerms().reduce(
    (text, item) => text.replace(new RegExp(escapeRegExp(item.term), 'gi'), item.replacement),
    sanitized
  );
}

const STRUCTURAL_VALUE_KEY_PATTERN = /(^|_)(id|handle|handles|slug|path|url|href|src|image|images|thumbnail|icon|file|files)($|_)/i;
const STRUCTURAL_LIST_KEY_PATTERN = /(^|_)(recommended_products|recommended_product_handles|recommended_cases|related_cases)($|_)/i;

function shouldPreserveStructuralValue(key?: string, value?: unknown) {
  if (key) {
    const normalizedKey = key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    if (STRUCTURAL_VALUE_KEY_PATTERN.test(normalizedKey) || STRUCTURAL_LIST_KEY_PATTERN.test(normalizedKey)) {
      return true;
    }
  }

  if (typeof value !== 'string') {
    return false;
  }

  return (
    value.startsWith('/') ||
    /^https?:\/\//i.test(value) ||
    /\.(?:avif|gif|jpe?g|json|pdf|png|svg|webp)(?:[?#].*)?$/i.test(value)
  );
}

export function sanitizeComplianceValue<T>(value: T, key?: string): T {
  if (shouldPreserveStructuralValue(key, value)) {
    return value;
  }

  if (typeof value === 'string') {
    return sanitizeComplianceText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map(item => sanitizeComplianceValue(item, key)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([itemKey, item]) => [itemKey, sanitizeComplianceValue(item, itemKey)])
    ) as T;
  }

  return value;
}

export function sanitizeRecordForTier<T>(record: T, tier: ComplianceTier): T {
  if (tier === 'normal') return record;
  return sanitizeComplianceValue(record);
}

export function getBaselineComplianceRules() {
  return TIER_MAPS;
}

export function getComplianceLayer(tier: ComplianceTier) {
  if (tier === 'restricted') {
    return {
      layer: 'C',
      label: 'C 层：高危/主动反制',
      note: '不进入广告可达路径，公开详情隐藏',
    };
  }

  if (tier === 'neutral_seo') {
    return {
      layer: 'B',
      label: 'B 层：中性 SEO',
      note: '可做中性内容，不作为广告落地页',
    };
  }

  return {
    layer: 'A',
    label: 'A 层：正常/广告安全',
    note: '允许进入广告安全主站路径',
  };
}

function getEnabledDbComplianceTerms(): DbComplianceTerm[] {
  try {
    return db.prepare(`
      SELECT term, replacement
      FROM compliance_terms
      WHERE is_enabled = 1 AND term <> ''
      ORDER BY LENGTH(term) DESC
    `).all() as DbComplianceTerm[];
  } catch (error) {
    return [];
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
