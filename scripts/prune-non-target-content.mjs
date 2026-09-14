import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const databasePath = join(root, 'data', 'ntet.db');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = join(root, 'backups', `ntet-before-target-prune-${stamp}.db`);

const KEEP_PRODUCT_CATEGORIES = [
  'drone-detection',
  'anti-drone-cuas',
  'detection-monitoring',
  'perimeter-defense',
  'perimeter-intelligence',
];

const KEEP_SOLUTION_HANDLES = [
  'airport-low-altitude-monitoring',
  'airport-security-protection',
  'chemical-plant-protection',
  'hydroelectric-dam-protection',
  'oil-production-base-protection',
  'power-generation-facility-low-altitude-monitoring',
];

const KEEP_CASE_HANDLES = [
  'airport-security-application',
  'asian-games-security',
  'brazil-refinery-low-altitude-monitoring',
  'nigeria-factory-low-altitude-monitoring',
  'pakistan-power-plant-low-altitude-monitoring',
  'water-conservancy-security',
];

const KEEP_MEDIA_HANDLES = [
  'critical-infrastructure-monitoring-record-chain-2026',
  'eo-ir-payload-selection-field-note-2026',
  'low-altitude-economy-2026-outlook',
  'low-altitude-economy-operations-owner-2026',
  'ntet-equipment-bench-checks-2025',
  'ntet-multi-sensor-configuration-method-2025',
  'overseas-low-altitude-security-part-i-2026',
  'overseas-low-altitude-security-part-ii-2026',
  'project-inquiry-review-low-altitude-monitoring-2026',
  'radar-rf-optical-nuisance-alert-reduction-2026',
  'remote-id-rf-detection-complementary-2025',
  'site-photo-review-before-system-layout-2026',
];

function placeholders(values) {
  return values.map(() => '?').join(', ');
}

mkdirSync(dirname(backupPath), { recursive: true });
copyFileSync(databasePath, backupPath);

const db = new Database(databasePath);

try {
  const before = Object.fromEntries(
    ['products', 'solutions', 'cases', 'media', 'inquiries', 'site_settings'].map((table) => [
      table,
      db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count,
    ]),
  );

  db.transaction(() => {
    db.prepare(
      `DELETE FROM products WHERE category_primary NOT IN (${placeholders(KEEP_PRODUCT_CATEGORIES)})`,
    ).run(...KEEP_PRODUCT_CATEGORIES);

    db.prepare(`
      UPDATE products
      SET category_primary = 'detection-monitoring',
          updated_at = CURRENT_TIMESTAMP
      WHERE category_primary IN ('drone-detection', 'anti-drone-cuas', 'perimeter-defense')
    `).run();

    db.prepare(
      `DELETE FROM solutions WHERE handle NOT IN (${placeholders(KEEP_SOLUTION_HANDLES)})`,
    ).run(...KEEP_SOLUTION_HANDLES);

    db.prepare(
      `DELETE FROM cases WHERE handle NOT IN (${placeholders(KEEP_CASE_HANDLES)})`,
    ).run(...KEEP_CASE_HANDLES);

    db.prepare(
      `DELETE FROM media WHERE id NOT IN (${placeholders(KEEP_MEDIA_HANDLES)})`,
    ).run(...KEEP_MEDIA_HANDLES);

    db.exec(`
      DROP TABLE IF EXISTS compliance_content_rules;
      DROP TABLE IF EXISTS compliance_terms;
    `);
  })();

  db.exec('VACUUM');

  const after = Object.fromEntries(
    ['products', 'solutions', 'cases', 'media', 'inquiries', 'site_settings'].map((table) => [
      table,
      db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count,
    ]),
  );

  console.log(JSON.stringify({ backupPath, before, after }, null, 2));
} finally {
  db.close();
}
