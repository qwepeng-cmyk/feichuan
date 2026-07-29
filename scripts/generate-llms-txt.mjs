import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  LOCALES,
  SITE_URL,
  excerpt,
  getAllCuasIndexableContent,
  openDb,
  publicUrl,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';
import { cuasIndexabilityPolicy } from './cuas-indexability.mjs';

const db = openDb();
const rows = getAllCuasIndexableContent(db);
const publicCatalogPolicy = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'config', 'publicCatalogPolicy.json'), 'utf8'),
);
const passiveDetectionProductHandles = new Set(
  publicCatalogPolicy.passiveDetectionProductHandles,
);
const publicRows = rows.filter(
  (row) => row.type === 'product' && passiveDetectionProductHandles.has(row.handle),
);

const copyReplacements = [
  [/\blow[\s-]*altitude defense\b/giu, 'низковысотный мониторинг'],
  [/\bcounter[\s_-]*u(?:as|av)\b/giu, 'низковысотный мониторинг'],
  [/\bc[\s_-]*uas\b/giu, 'низковысотный мониторинг'],
  [/\bcuas\b/giu, 'низковысотный мониторинг'],
  [/\banti[\s_-]*(?:drone|uav)\b/giu, 'низковысотный мониторинг'],
  [/\bdrone(?:s)?\b/giu, 'низковысотная цель'],
  [/\buav(?:s)?\b/giu, 'low-altitude target'],
  [/антидрон\p{L}*/giu, 'комплекс низковысотного мониторинга'],
  [/дронами/giu, 'низковысотными целями'],
  [/дронов/giu, 'низковысотных целей'],
  [/дроны/giu, 'низковысотные цели'],
  [/дрона/giu, 'низковысотной цели'],
  [/дроном/giu, 'низковысотной целью'],
  [/дрон\p{L}*/giu, 'низковысотная цель'],
  [/бпла/giu, 'низковысотных целей'],
  [/беспилотн\p{L}*/giu, 'низковысотных целей'],
  [/\bjammer(?:s)?\b/giu, 'RF suppressor'],
  [/\bjamming\b/giu, 'signal suppression'],
  [/глушил\p{L}*/giu, 'подавление радиосигнала'],
  [/\bspoofing\b/giu, 'navigation signal analysis'],
];

function safeCopy(value = '') {
  return copyReplacements.reduce(
    (copy, [pattern, replacement]) => copy.replace(pattern, replacement),
    String(value),
  ).replace(
    /(выявляет|обнаруживает|идентифицирует|сопровождает)\s+низковысотных целей/giu,
    '$1 низковысотные цели',
  );
}

function russianSummary(value = '') {
  const sanitized = safeCopy(value);
  return /[А-Яа-яЁё]/u.test(sanitized) ? sanitized : '';
}

const staticIntentPages = [
  {
    type: 'solution',
    route: 'solutions',
    handle: 'multi-sensor-detection',
    title: 'Мультисенсорная система обнаружения низковысотных целей',
    summary: 'Сопоставление RF-обнаружения, маловысотного радара, Remote ID и EO/IR-сопровождения с корреляцией целей и интеграцией платформы управления.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'low-altitude-radar-monitoring',
    title: 'Радар обнаружения низковысотных целей Ku- и X-диапазона',
    summary: 'Сравнение радаров Ku- и X-диапазона для раннего предупреждения, сопровождения целей и передачи данных средствам RF и EO/IR.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'portable-detection-system',
    title: 'Переносные системы обнаружения низковысотных целей',
    summary: 'Сравнение ручных детекторов, переносных RF-комплексов, интегрированных полевых наборов и автомобильных конфигураций для временных и мобильных операций.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'perimeter-defense-system',
    title: 'Многоуровневая система защиты периметра',
    summary: 'Проектирование защиты объекта с RF-обнаружением, радаром, Remote ID, EO/IR-подтверждением и направленными либо всенаправленными средствами подавления радиосигнала.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'rf-target-positioning',
    title: 'RF-позиционирование низковысотных целей',
    summary: 'Сравнение RF-пеленгации, радарных трасс, совместимых данных Remote ID и EO/IR-подтверждения для контроля защищаемых объектов.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'layered-site-protection',
    title: 'Эшелонированная защита объекта',
    summary: 'Сравнение стационарных датчиков, переносных полевых блоков и автомобильных конфигураций Low-Altitude Defense для многоуровневого мониторинга.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'rf-signal-suppression',
    title: 'Направленное и всенаправленное подавление радиосигнала',
    summary: 'Сравнение направленных и всенаправленных RF-модулей для стационарной интеграции, связанного управления и координированного реагирования.',
    tier: 'normal',
  },
];

const catalogSolutionPages = cuasIndexabilityPolicy.catalogSolutions.map((solution) => ({
  type: 'solution',
  route: 'solutions',
  handle: solution.handle,
  title: safeCopy(solution.title),
  summary: safeCopy(solution.summary),
}));
const allPublicRows = publicRows;
const groups = Object.groupBy(allPublicRows, (row) => row.type);

const labels = {
  product: 'Оборудование',
  solution: 'Решения',
  case: 'Проекты',
  media: 'Материалы',
};

const corePages = [
  ['Оборудование', 'products'],
];

function localizedPageUrl(locale, path = '') {
  const suffix = path ? `/${path}` : '';
  return `${SITE_URL}${suffix || '/'}`;
}

const lines = [
  '# N-TET',
  '',
  '> N-TET поставляет пассивное оборудование для обнаружения, идентификации, сопровождения низковысотных целей и мониторинга воздушного пространства.',
  '',
  `Canonical site: ${SITE_URL}`,
  `Generated: ${todayStamp()}`,
  '',
  'Файл содержит только опубликованные страницы пассивного оборудования обнаружения и мониторинга. Решения активного воздействия, физического перехвата, административные, API, preview, draft и неопубликованные маршруты исключены.',
  '',
  '## Core Pages',
  '',
];

for (const locale of LOCALES) {
  for (const [label, path] of corePages) {
    lines.push(`- [${label} (${locale})](${localizedPageUrl(locale, path)})`);
  }
}
lines.push('');

for (const type of ['product', 'solution', 'case', 'media']) {
  const items = groups[type] || [];
  if (!items.length) continue;

  lines.push(`## ${labels[type]}`, '');
  for (const item of items) {
    const summary = excerpt(russianSummary(item.summary), 150);
    lines.push(`- [${safeCopy(item.title || item.handle)}](${publicUrl('ru', item.route, item.handle)})${summary ? ` - ${summary}` : ''}`);
  }
  lines.push('');
}

lines.push('## Locales', '');
for (const locale of LOCALES) {
  const home = `${SITE_URL}/`;
  lines.push(`- ${locale}: ${home}`);
}

writeTextFile(join(process.cwd(), 'public', 'llms.txt'), lines.join('\n'));
console.log(`Generated public/llms.txt with ${allPublicRows.length} passive monitoring records.`);
