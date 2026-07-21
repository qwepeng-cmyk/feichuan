import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let Database = null;

try {
  Database = require('better-sqlite3');
} catch {
  const { DatabaseSync } = require('node:sqlite');
  Database = class NodeSqliteReadonlyDatabase extends DatabaseSync {
    constructor(dbPath) {
      super(dbPath, { readOnly: true });
    }
  };
}

export const SITE_URL = (process.env.SITE_URL || 'https://n-tet.com').replace(/\/+$/, '');
export const LOCALES = ['en', 'ru', 'es', 'ar'];

export const CONTENT_TYPES = {
  product: {
    table: 'products',
    route: 'products',
    handleColumn: 'handle',
    titleColumn: 'product_name_en',
    summaryColumn: 'summary_en',
  },
  solution: {
    table: 'solutions',
    route: 'solutions',
    handleColumn: 'handle',
    titleColumn: 'product_name_en',
    summaryColumn: 'summary_en',
  },
  case: {
    table: 'cases',
    route: 'cases',
    handleColumn: 'handle',
    titleColumn: 'title_en',
    summaryColumn: 'description_en',
  },
  media: {
    table: 'media',
    route: 'media',
    handleColumn: 'id',
    titleColumn: 'title',
    summaryColumn: 'content',
  },
};

const BASELINE_TIERS = {
  product: {
    'handheld-drone-net-launcher': 'normal',
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
    'directional-rf-interference-device': 'normal',
    'omni-directional-rf-interference-device': 'normal',
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
  },
  solution: {
    'low-altitude-airspace-monitoring': 'normal',
    'drone-detector': 'normal',
    'drone-radar-detection': 'normal',
    'portable-drone-detection': 'normal',
    'drone-defender': 'normal',
    'drone-locator': 'normal',
    'drone-shield': 'normal',
    'drone-jammer': 'normal',
    'rf-interference-device': 'normal',
    'chemical-plant-protection': 'neutral_seo',
    'hydroelectric-dam-protection': 'neutral_seo',
    'oil-production-base-protection': 'neutral_seo',
    'power-generation-facility-anti-uav': 'restricted',
    'airport-security-protection': 'neutral_seo',
    'judicial-sector-security': 'neutral_seo',
    'sports-event-security': 'neutral_seo',
    'airport-anti-uav': 'restricted',
  },
  case: {
    'airport-security-application': 'neutral_seo',
    'asian-games-security': 'neutral_seo',
    'water-conservancy-security': 'neutral_seo',
    'pakistan-power-plant-anti-uav': 'restricted',
    'brazil-refinery-anti-uav': 'restricted',
    'nigeria-factory-anti-uav': 'restricted',
  },
  media: {
    'multi-sensor-cuas-architecture-2026': 'restricted',
    'cuas-critical-infrastructure-deployment-2026': 'restricted',
    'industrial-uav-redundancy-2026': 'neutral_seo',
    'low-altitude-economy-2026-outlook': 'neutral_seo',
    'tethered-uav-persistent-surveillance-2026': 'neutral_seo',
    'border-surveillance-uav-network-2026': 'neutral_seo',
  },
};

export function getDbPath() {
  if (process.env.DATABASE_URL) {
    return resolve(process.cwd(), process.env.DATABASE_URL);
  }

  const primary = join(process.cwd(), 'data', 'ntet.db');
  if (existsSync(primary)) return primary;

  const legacy = join(process.cwd(), 'src', 'lib', 'ntet.db');
  if (existsSync(legacy)) return legacy;

  return primary;
}

export function openDb() {
  const dbPath = getDbPath();
  if (!existsSync(dbPath)) {
    throw new Error(`Database not found: ${dbPath}`);
  }
  return new Database(dbPath, { readonly: true });
}

export function getComplianceTier(db, type, handle) {
  if (!handle) return 'normal';

  try {
    const rule = db
      .prepare('SELECT tier FROM compliance_content_rules WHERE content_type = ? AND handle = ?')
      .get(type, handle);
    if (rule?.tier && ['normal', 'neutral_seo', 'restricted'].includes(rule.tier)) {
      return rule.tier;
    }
  } catch {
    // Older database snapshots may not have compliance_content_rules yet.
  }

  return BASELINE_TIERS[type]?.[handle] || 'normal';
}

export function getPublishedContent(db, type) {
  const config = CONTENT_TYPES[type];
  const rows = db
    .prepare(
      `SELECT ${config.handleColumn} AS handle, ${config.titleColumn} AS title, ${config.summaryColumn} AS summary, is_published
       FROM ${config.table}
       WHERE COALESCE(is_published, 1) = 1
       ORDER BY title COLLATE NOCASE`
    )
    .all();

  return rows.map((row) => ({
    ...row,
    type,
    tier: getComplianceTier(db, type, row.handle),
    route: config.route,
  }));
}

export function getAllPublishedContent(db) {
  return Object.keys(CONTENT_TYPES).flatMap((type) => getPublishedContent(db, type));
}

export function publicUrl(locale, route, handle) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}/${route}/${handle}`;
}

export function stripHtml(value = '') {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(value = '', maxLength = 180) {
  const clean = stripHtml(value);
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}...`;
}

export function ensureParentDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

export function writeTextFile(filePath, content) {
  ensureParentDir(filePath);
  writeFileSync(filePath, `${content.trimEnd()}\n`, 'utf8');
}

export function readTextFileIfExists(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}
