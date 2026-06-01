import db from './db';

export type ComplianceTier = 'normal' | 'neutral_seo' | 'restricted';
export type ComplianceContentType = 'product' | 'solution' | 'case' | 'media';

const PRODUCT_TIERS: Record<string, ComplianceTier> = {
  'stationary-rf-detection-system': 'neutral_seo',
  'portable-rf-detection-case': 'neutral_seo',
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
  'stationary-active-rf-defense-system': 'restricted',
  'uav-navigation-spoofing-system': 'restricted',
  'portable-active-rf-defense-system': 'restricted',
  'handheld-integrated-sdr-c-uas': 'restricted',
  'handheld-integrated-multi-band-jammer-gun': 'restricted',
};

const SOLUTION_TIERS: Record<string, ComplianceTier> = {
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
  'airport-security-application': 'restricted',
  'asian-games-security': 'restricted',
  'water-conservancy-security': 'restricted',
  'pakistan-power-plant-anti-uav': 'restricted',
  'brazil-refinery-anti-uav': 'restricted',
  'nigeria-factory-anti-uav': 'restricted',
};

const MEDIA_TIERS: Record<string, ComplianceTier> = {
  'multi-sensor-cuas-architecture-2026': 'restricted',
  'cuas-critical-infrastructure-deployment-2026': 'restricted',
  'industrial-uav-redundancy-2026': 'neutral_seo',
  'low-altitude-economy-2026-outlook': 'neutral_seo',
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
  [/\bAnti[-\s]?UAV\b/gi, 'Airspace Monitoring'],
  [/\bAnti[-\s]?Drone\b/gi, 'Drone Detection'],
  [/\bCounter[-\s]?UAV\b/gi, 'Drone Detection'],
  [/\bCounter[-\s]?UAS\b/gi, 'Airspace Monitoring'],
  [/\bC-UAS\b/gi, 'Airspace Monitoring'],
  [/\bCUAS\b/gi, 'Airspace Monitoring'],
  [/\bJammers?\b/gi, 'RF scanners'],
  [/\bJamming\b/gi, 'RF signal analysis'],
  [/\bSignal Blockers?\b/gi, 'RF signal analyzers'],
  [/\bSpoofing\b/gi, 'navigation-signal analysis'],
  [/\bIntercept(?:ion|s|ed|ing)?\b/gi, 'detect'],
  [/\bInterference\b/gi, 'RF noise'],
  [/\bInterfere\b/gi, 'affect'],
  [/\bSuppression\b/gi, 'event management'],
  [/\bCountermeasures?\b/gi, 'response protocols'],
  [/\bDefeat\b/gi, 'manage'],
  [/\bDestroy\b/gi, 'remove from service'],
  [/\bShoot\s+down\b/gi, 'detect'],
  [/\bStrike\s+down\b/gi, 'detect'],
  [/\bKiller\b/gi, 'safety'],
  [/\bGun\b/gi, 'directional antenna unit'],
  [/\bWeapon\b/gi, 'prohibited item'],
  [/\bMilitary\s+grade\b/gi, 'industrial-grade'],
  [/\bMilitary\b/gi, 'industrial'],
  [/\bTactical\b/gi, 'field'],
  [/\bDefense\s+Engineering\b/gi, 'Engineering Materials'],
  [/\bDefense\s+department\b/gi, 'public-sector operator'],
  [/\bDefense\b/gi, 'Security'],
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
  /\bintercept\b/i,
  /\bweapon\b/i,
  /\bgun\b/i,
  /\bshoot down\b/i,
  /\bdestroy\b/i,
  /\bmilitary grade\b/i,
  /\btactical weapon\b/i,
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

const STRUCTURAL_VALUE_KEY_PATTERN = /(^|_)(id|handle|slug|path|url|href|src|image|images|thumbnail|icon|file|files)($|_)/i;

function shouldPreserveStructuralValue(key?: string, value?: unknown) {
  if (key && STRUCTURAL_VALUE_KEY_PATTERN.test(key)) {
    return true;
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
