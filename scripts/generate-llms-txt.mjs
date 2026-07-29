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
const publicRows = rows;

const copyReplacements = [
  [/\bcounter[\s_-]*u(?:as|av)\b/giu, 'Low-Altitude Defense'],
  [/\bc[\s_-]*uas\b/giu, 'Low-Altitude Defense'],
  [/\bcuas\b/giu, 'Low-Altitude Defense'],
  [/\banti[\s_-]*(?:drone|uav)\b/giu, 'Low-Altitude Defense'],
  [/\bdrone(?:s)?\b/giu, 'низковысотная цель'],
  [/\buav(?:s)?\b/giu, 'воздушная платформа'],
  [/антидрон\p{L}*/giu, 'комплекс низковысотной защиты'],
  [/дрон\p{L}*/giu, 'низковысотная цель'],
  [/бпла/giu, 'воздушная платформа'],
  [/беспилотн\p{L}*/giu, 'воздушная платформа'],
  [/\bjammer(?:s)?\b/giu, 'RF suppressor'],
  [/\bjamming\b/giu, 'signal suppression'],
  [/глушил\p{L}*/giu, 'подавление радиосигнала'],
  [/\bspoofing\b/giu, 'navigation signal analysis'],
];

function safeCopy(value = '') {
  return copyReplacements.reduce(
    (copy, [pattern, replacement]) => copy.replace(pattern, replacement),
    String(value),
  );
}

const staticIntentPages = [
  {
    type: 'solution',
    route: 'solutions',
    handle: 'low-altitude-airspace-monitoring',
    title: 'Low-Altitude Airspace Monitoring Solution',
    summary: 'Plan low-altitude airspace monitoring for critical sites with RF sensing, radar, Remote ID, EO/IR verification, command coordination and authorized-response workflows.',
    tier: 'normal',
  },
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
const staticPages = [...catalogSolutionPages, ...staticIntentPages];
const staticHandles = new Set(staticPages.map((page) => `${page.type}:${page.handle}`));
const allPublicRows = [
  ...publicRows.filter((row) => !staticHandles.has(`${row.type}:${row.handle}`)),
  ...staticPages,
];
const groups = Object.groupBy(allPublicRows, (row) => row.type);

const labels = {
  product: 'Оборудование',
  solution: 'Решения',
  case: 'Проекты',
  media: 'Материалы',
};

const corePages = [
  ['Главная', ''],
  ['Оборудование', 'products'],
  ['Решения', 'solutions'],
  ['Проекты', 'cases'],
  ['Медиа', 'media'],
  ['Контакты', 'contact'],
];

function localizedPageUrl(locale, path = '') {
  const suffix = path ? `/${path}` : '';
  return `${SITE_URL}${suffix || '/'}`;
}

const lines = [
  '# N-TET',
  '',
  '> N-TET поставляет оборудование Low-Altitude Defense для обнаружения, идентификации и сопровождения низковысотных целей, мониторинга воздушного пространства и интеграции платформ управления.',
  '',
  `Canonical site: ${SITE_URL}`,
  `Generated: ${todayStamp()}`,
  '',
  'Файл содержит опубликованные страницы Low-Altitude Defense для поисковых систем и AI-платформ. Административные, API, preview, draft и неопубликованные маршруты исключены.',
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
    const summary = safeCopy(excerpt(item.summary, 150));
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
console.log(`Generated public/llms.txt with ${allPublicRows.length} Low-Altitude Defense records.`);
