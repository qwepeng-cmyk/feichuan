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
const groups = Object.groupBy(publicRows, (row) => row.type);

const labels = {
  product: 'Products',
  solution: 'Solutions',
  case: 'Cases',
  media: 'Media and Insights',
};

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
  `- [Home](${SITE_URL}/)`,
  `- [Products](${SITE_URL}/products)`,
  `- [Solutions](${SITE_URL}/solutions)`,
  `- [Cases](${SITE_URL}/cases)`,
  `- [Media](${SITE_URL}/media)`,
  `- [Contact](${SITE_URL}/contact)`,
  '',
];

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
console.log(`Generated public/llms.txt with ${publicRows.length} public records; excluded ${rows.length - publicRows.length} restricted records.`);
