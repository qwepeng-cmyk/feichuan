import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, '网站资料', '激光打击系统');
const publicDir = join(root, 'public', 'products', 'drone-laser-engagement-system');
const contentPath = join(root, 'src', 'content', 'droneLaserEngagementSystem.json');
const databasePath = join(root, 'data', 'ntet.db');

const assets = [
  ['激光打击系统2KW.png', '2kw-module.webp'],
  ['激光打击系统3KW瞄准具和转台.png', '3kw-tracking-turret.webp'],
  ['激光打击系统3KW激光.png', '3kw-laser-source.webp'],
  ['激光打击系统3KW电池.png', '3kw-battery.webp'],
  ['激光打击系统3KW智能控制计算机.png', '3kw-control-computer.webp'],
  ['激光打击系统5KW.png', '5kw-module.webp'],
  ['激光打击示意图.png', 'system-concept.webp'],
  ['激光打击系统实景图1.png', 'site-stadium.webp'],
  ['激光打击系统实景图2.png', 'site-perimeter.webp'],
  ['激光打击系统实景图3.png', 'site-energy.webp'],
];

for (const [sourceName] of assets) {
  const sourcePath = join(sourceDir, sourceName);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing source image: ${sourcePath}`);
  }
}

mkdirSync(publicDir, { recursive: true });

for (const [sourceName, outputName] of assets) {
  const sourcePath = join(sourceDir, sourceName);
  const outputPath = join(publicDir, outputName);
  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 5, alphaQuality: 90 })
    .toFile(outputPath);
  console.log(`Prepared ${outputName}`);
}

const page = JSON.parse(readFileSync(contentPath, 'utf8'));
const parameters = Object.fromEntries(
  page.variants.map((variant) => [
    variant.power,
    Object.fromEntries(
      variant.specGroups.map((group) => [
        group.title,
        Object.fromEntries(group.items.map((item) => [item.label, item.value])),
      ])
    ),
  ])
);

const detailHtml = [
  '<h2>Configurable system architecture</h2>',
  `<p>${page.summary}</p>`,
  '<div class="feature-grid">',
  ...page.features.map((feature) => (
    `<div class="feature-item"><h3>${feature.title}</h3><p>${feature.body}</p></div>`
  )),
  '</div>',
].join('');

const rawJson = {
  handle: page.handle,
  product_name_en: page.productName,
  category_primary: 'anti-drone-cuas',
  category_by_flight_platform: 'Physical Interception Systems',
  category_by_mission_application: 'Laser Defense Systems',
  catalog_order: 80,
  summary_en: page.summary,
  key_application_en: `Application: ${page.application}`,
  key_parameter_1_en: 'Configurations: 2 kW / 3 kW / 5 kW',
  key_parameter_2_en: 'Architecture: EO/IR tracking with modular laser, power, cooling and control units',
  parameters_en: parameters,
  detail_html_en: detailHtml,
  main_image: page.heroImage,
  compliance_tier: 'normal',
  is_published: true,
  source_documents: [
    '15反无激光打击系统（2KW）.docx',
    '15反无激光打击系统（3KW）.docx',
    '15反无激光打击系统（5KW）.docx',
  ],
  product_page_data: page,
};

const record = {
  handle: page.handle,
  product_name_en: page.productName,
  category_primary: 'anti-drone-cuas',
  summary_en: page.summary,
  key_application_en: `Application: ${page.application}`,
  key_parameter_1_en: 'Configurations: 2 kW / 3 kW / 5 kW',
  key_parameter_2_en: 'Architecture: EO/IR tracking with modular laser, power, cooling and control units',
  parameters_en: JSON.stringify(parameters),
  detail_html_en: detailHtml,
  main_image: page.heroImage,
  raw_json: JSON.stringify(rawJson),
};

const db = new Database(databasePath);
const sync = db.transaction(() => {
  const existing = db.prepare('SELECT id FROM products WHERE handle = ?').get(record.handle);

  if (existing) {
    db.prepare(`
      UPDATE products
      SET product_name_en = @product_name_en,
          category_primary = @category_primary,
          summary_en = @summary_en,
          key_application_en = @key_application_en,
          key_parameter_1_en = @key_parameter_1_en,
          key_parameter_2_en = @key_parameter_2_en,
          parameters_en = @parameters_en,
          detail_html_en = @detail_html_en,
          main_image = @main_image,
          raw_json = @raw_json,
          is_published = 1,
          updated_at = CURRENT_TIMESTAMP
      WHERE handle = @handle
    `).run(record);
  } else {
    db.prepare(`
      INSERT INTO products (
        handle, product_name_en, category_primary, summary_en,
        key_application_en, key_parameter_1_en, key_parameter_2_en,
        parameters_en, detail_html_en, main_image, raw_json, is_published
      ) VALUES (
        @handle, @product_name_en, @category_primary, @summary_en,
        @key_application_en, @key_parameter_1_en, @key_parameter_2_en,
        @parameters_en, @detail_html_en, @main_image, @raw_json, 1
      )
    `).run(record);
  }

  db.prepare(`
    DELETE FROM compliance_content_rules
    WHERE content_type = 'product' AND handle = ?
  `).run(record.handle);

  db.prepare(`
    INSERT INTO compliance_content_rules (content_type, handle, tier, note, updated_at)
    VALUES ('product', ?, 'normal', ?, CURRENT_TIMESTAMP)
  `).run(
    record.handle,
    'Public product: include in product listings, detail routes, SEO, GEO, Schema and sitemap.'
  );
});

sync();
db.close();

console.log(`Synced public product ${record.handle}`);
console.log(`Assets: ${publicDir}`);
