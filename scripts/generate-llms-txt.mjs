import { join } from 'node:path';
import {
  LOCALES,
  SITE_URL,
  excerpt,
  getAllPublishedContent,
  openDb,
  publicUrl,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const db = openDb();
const rows = getAllPublishedContent(db);
const publicRows = rows.filter((row) => row.tier !== 'restricted');

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
    handle: 'drone-detector',
    title: 'Drone Detector Systems for Critical Sites',
    summary: 'Compare RF sensing, low-altitude radar, Remote ID and EO/IR confirmation in a site-specific detection and authorized-response workflow.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'drone-radar-detection',
    title: 'Drone Detection Radar for Low-Altitude Site Monitoring',
    summary: 'Compare Ku-band and X-band radar options for early warning, target tracking and handoff to RF and EO/IR confirmation.',
    tier: 'normal',
  },
  {
    type: 'solution',
    route: 'solutions',
    handle: 'portable-drone-detection',
    title: 'Portable C-UAS Systems for Handheld, Integrated and Vehicle-Mounted Deployment',
    summary: 'Compare handheld detectors, hand-carried RF systems, integrated C-UAS field kits and vehicle-mounted configurations for temporary, patrol and mobile operations.',
    tier: 'normal',
  },
];

const staticHandles = new Set(staticIntentPages.map((page) => `${page.type}:${page.handle}`));
const allPublicRows = [
  ...publicRows.filter((row) => !staticHandles.has(`${row.type}:${row.handle}`)),
  ...staticIntentPages,
];
const groups = Object.groupBy(allPublicRows, (row) => row.type);

const labels = {
  product: 'Products',
  solution: 'Solutions',
  case: 'Cases',
  media: 'Media and Insights',
};

const corePages = [
  ['Home', ''],
  ['Products', 'products'],
  ['Solutions', 'solutions'],
  ['Cases', 'cases'],
  ['Media', 'media'],
  ['Contact', 'contact'],
];

function localizedPageUrl(locale, path = '') {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const suffix = path ? `/${path}` : '';
  return `${SITE_URL}${prefix}${suffix || '/'}`;
}

const lines = [
  '# N-TET',
  '',
  '> N-TET provides UAV systems, low-altitude monitoring, industrial security, and engineering-material content for international buyers and project teams.',
  '',
  `Canonical site: ${SITE_URL}`,
  `Generated: ${todayStamp()}`,
  '',
  'Compliance boundary: this file excludes restricted C-tier content, admin routes, preview routes, and advertising-unsafe paths. B-tier neutral SEO content may appear only as informational public content.',
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
    const tierNote = item.tier === 'neutral_seo' ? ' [neutral SEO]' : '';
    const summary = excerpt(item.summary, 150);
    lines.push(`- [${item.title || item.handle}](${publicUrl('en', item.route, item.handle)})${tierNote}${summary ? ` - ${summary}` : ''}`);
  }
  lines.push('');
}

lines.push('## Locales', '');
for (const locale of LOCALES) {
  const home = locale === 'en' ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;
  lines.push(`- ${locale}: ${home}`);
}

writeTextFile(join(process.cwd(), 'public', 'llms.txt'), lines.join('\n'));
console.log(`Generated public/llms.txt with ${allPublicRows.length} public records; excluded ${rows.length - publicRows.length} restricted records.`);
