import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Database from 'better-sqlite3';

const root = process.cwd();
const db = new Database(join(root, 'data', 'ntet.db'));

const products = [
  {
    source: join(root, '网站资料', '02反无设备', '02无线电干扰设备（定向）.json'),
    publicHandle: 'directional-rf-interference-device',
    publicName: 'Directional RF Jammer',
    image: '/products/rf-systems/directional-rf-unit.webp',
  },
  {
    source: join(root, '网站资料', '02反无设备', '04无线电干扰设备 （全向）.json'),
    publicHandle: 'omni-directional-rf-interference-device',
    publicName: 'Omni-directional RF Jammer',
    image: '/products/rf-systems/omni-directional-rf-unit.webp',
  },
];

const legacyHandles = [
  'directional-rf-jammer',
  'omni-directional-rf-jammer',
];

const localeFields = [
  'product_name_en',
  'summary_en',
  'key_application_en',
  'key_parameter_1_en',
  'key_parameter_2_en',
  'parameters_en',
  'detail_html_en',
  'product_name_ru',
  'summary_ru',
  'key_application_ru',
  'key_parameter_1_ru',
  'key_parameter_2_ru',
  'parameters_ru',
  'detail_html_ru',
  'product_name_es',
  'summary_es',
  'key_application_es',
  'key_parameter_1_es',
  'key_parameter_2_es',
  'parameters_es',
  'detail_html_es',
  'product_name_ar',
  'summary_ar',
  'key_application_ar',
  'key_parameter_1_ar',
  'key_parameter_2_ar',
  'parameters_ar',
  'detail_html_ar',
];

function serialize(value) {
  if (value === undefined || value === null) return '';
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function publicWording(value) {
  if (Array.isArray(value)) return value.map(publicWording);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [publicWording(key), publicWording(item)]));
  }
  if (typeof value !== 'string') return value;

  return value
    .replace(/omni-directional-rf-jammer/gi, 'omni-directional-rf-interference-device')
    .replace(/directional-rf-jammer/gi, 'directional-rf-interference-device');
}

const upsertProduct = db.prepare(`
  INSERT INTO products (
    handle, product_name_en, category_primary, summary_en,
    key_application_en, key_parameter_1_en, key_parameter_2_en,
    parameters_en, detail_html_en,
    product_name_ru, summary_ru, key_application_ru,
    key_parameter_1_ru, key_parameter_2_ru, parameters_ru, detail_html_ru,
    main_image, raw_json, is_published,
    product_name_es, summary_es, key_application_es,
    key_parameter_1_es, key_parameter_2_es, parameters_es, detail_html_es,
    product_name_ar, summary_ar, key_application_ar,
    key_parameter_1_ar, key_parameter_2_ar, parameters_ar, detail_html_ar,
    updated_at
  ) VALUES (
    @handle, @product_name_en, @category_primary, @summary_en,
    @key_application_en, @key_parameter_1_en, @key_parameter_2_en,
    @parameters_en, @detail_html_en,
    @product_name_ru, @summary_ru, @key_application_ru,
    @key_parameter_1_ru, @key_parameter_2_ru, @parameters_ru, @detail_html_ru,
    @main_image, @raw_json, 1,
    @product_name_es, @summary_es, @key_application_es,
    @key_parameter_1_es, @key_parameter_2_es, @parameters_es, @detail_html_es,
    @product_name_ar, @summary_ar, @key_application_ar,
    @key_parameter_1_ar, @key_parameter_2_ar, @parameters_ar, @detail_html_ar,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT(handle) DO UPDATE SET
    product_name_en = excluded.product_name_en,
    category_primary = excluded.category_primary,
    summary_en = excluded.summary_en,
    key_application_en = excluded.key_application_en,
    key_parameter_1_en = excluded.key_parameter_1_en,
    key_parameter_2_en = excluded.key_parameter_2_en,
    parameters_en = excluded.parameters_en,
    detail_html_en = excluded.detail_html_en,
    product_name_ru = excluded.product_name_ru,
    summary_ru = excluded.summary_ru,
    key_application_ru = excluded.key_application_ru,
    key_parameter_1_ru = excluded.key_parameter_1_ru,
    key_parameter_2_ru = excluded.key_parameter_2_ru,
    parameters_ru = excluded.parameters_ru,
    detail_html_ru = excluded.detail_html_ru,
    main_image = excluded.main_image,
    raw_json = excluded.raw_json,
    is_published = 1,
    product_name_es = excluded.product_name_es,
    summary_es = excluded.summary_es,
    key_application_es = excluded.key_application_es,
    key_parameter_1_es = excluded.key_parameter_1_es,
    key_parameter_2_es = excluded.key_parameter_2_es,
    parameters_es = excluded.parameters_es,
    detail_html_es = excluded.detail_html_es,
    product_name_ar = excluded.product_name_ar,
    summary_ar = excluded.summary_ar,
    key_application_ar = excluded.key_application_ar,
    key_parameter_1_ar = excluded.key_parameter_1_ar,
    key_parameter_2_ar = excluded.key_parameter_2_ar,
    parameters_ar = excluded.parameters_ar,
    detail_html_ar = excluded.detail_html_ar,
    updated_at = CURRENT_TIMESTAMP
`);

const upsertTier = db.prepare(`
  INSERT INTO compliance_content_rules (content_type, handle, tier, note, updated_at)
  VALUES ('product', ?, 'normal', ?, CURRENT_TIMESTAMP)
  ON CONFLICT(content_type, handle) DO UPDATE SET
    tier = 'normal',
    note = excluded.note,
    updated_at = CURRENT_TIMESTAMP
`);

const restore = db.transaction(() => {
  const placeholders = legacyHandles.map(() => '?').join(', ');
  db.prepare(`DELETE FROM compliance_content_rules WHERE content_type = 'product' AND handle IN (${placeholders})`).run(...legacyHandles);
  db.prepare(`DELETE FROM products WHERE handle IN (${placeholders})`).run(...legacyHandles);

  for (const item of products) {
    const source = publicWording(JSON.parse(readFileSync(item.source, 'utf8')));
    source.handle = item.publicHandle;
    source.product_name_en = item.publicName;
    const raw = {
      handle: item.publicHandle,
      category_primary: 'drone-detection',
      category_secondary: 'RF Jamming & Suppression',
      category_tertiary: 'RF Jammers [Directional & Omni]',
      main_image: item.image,
      is_published: 1,
    };
    const record = {
      handle: item.publicHandle,
      category_primary: 'drone-detection',
      main_image: item.image,
    };

    for (const field of localeFields) {
      record[field] = serialize(source[field]);
      if (record[field]) raw[field] = source[field];
    }

    record.raw_json = JSON.stringify(raw);
    upsertProduct.run(record);
    upsertTier.run(
      item.publicHandle,
      'Explicit public A-tier jammer-name exception approved for these two fixed-site products on 2026-07-15.'
    );
  }
});

restore();

const restored = db.prepare(`
  SELECT p.handle, p.product_name_en, p.main_image, p.category_primary, p.is_published,
         r.tier
  FROM products p
  LEFT JOIN compliance_content_rules r
    ON r.content_type = 'product' AND r.handle = p.handle
  WHERE p.handle IN ('directional-rf-interference-device', 'omni-directional-rf-interference-device')
  ORDER BY p.handle
`).all();

console.log(JSON.stringify(restored, null, 2));
db.close();
