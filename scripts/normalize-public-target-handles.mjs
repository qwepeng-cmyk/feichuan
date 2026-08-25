import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const root = process.cwd();
const dbPath = path.join(root, 'data', 'ntet.db');
const backupDir = path.join(root, 'backups');
const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
const backupPath = path.join(backupDir, `ntet-before-public-handle-normalization-${stamp}.db`);

const replacements = [
  [
    '/products/handheld-drone-net-launcher/handheld-drone-net-launcher.webp',
    '/products/handheld-capture-launcher/handheld-capture-launcher.webp',
  ],
  [
    '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
    '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
  ],
  [
    '/products/uav-systems/UAV-Remote-ID-Monitoring-System.png',
    '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.png',
  ],
  ['/products/02-drone-detection/', '/products/02-detection-monitoring/'],
  ['/products/handheld-drone-net-launcher/', '/products/handheld-capture-launcher/'],
  ['/products/drone-laser-engagement-system/', '/products/directed-energy-system/'],
  ['/products/uav-systems/', '/products/aerial-systems/'],
  [
    '/solutions/chemical-plant-protection/industry-pain-points-tank-drone.webp',
    '/solutions/chemical-plant-protection/industry-pain-points-tank-low-altitude-target.webp',
  ],
  [
    '/about/factory-show/uav-detection-company-china.webp',
    '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  ],
  ['uav-navigation-airspace-data-verification-system', 'aerial-navigation-airspace-data-verification-system'],
  ['uav-remote-id-monitoring-system', 'aerial-remote-id-monitoring-system'],
  ['handheld-drone-net-launcher', 'handheld-capture-launcher'],
  ['drone-laser-engagement-system', 'directed-energy-system'],
];

fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync(dbPath, backupPath);

const db = new Database(dbPath);
const changedByTable = {};

const normalize = db.transaction(() => {
  const tables = ['products', 'solutions', 'cases', 'media', 'site_settings'];

  for (const table of tables) {
    const columns = db
      .prepare(`PRAGMA table_info("${table}")`)
      .all()
      .filter((column) => String(column.type || '').toUpperCase().includes('TEXT'))
      .map((column) => column.name);

    let tableChanges = 0;
    for (const column of columns) {
      for (const [from, to] of replacements) {
        const result = db
          .prepare(
            `UPDATE "${table}"
             SET "${column}" = replace("${column}", ?, ?)
             WHERE instr(COALESCE("${column}", ''), ?) > 0`,
          )
          .run(from, to, from);
        tableChanges += result.changes;
      }
    }
    if (tableChanges) changedByTable[table] = tableChanges;
  }
});

try {
  normalize();
  console.log('Backup:', backupPath);
  console.log('Changed cells by table:', changedByTable);
  console.log(
    'Normalized products:',
    db
      .prepare(
        `SELECT handle, main_image
         FROM products
         WHERE handle IN (
           'aerial-navigation-airspace-data-verification-system',
           'aerial-remote-id-monitoring-system',
           'handheld-capture-launcher',
           'directed-energy-system'
         )
         ORDER BY handle`,
      )
      .all(),
  );
} finally {
  db.close();
}
