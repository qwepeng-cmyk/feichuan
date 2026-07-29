const baseUrl = (process.env.SOURCE_BASE_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '');

const restrictedPatterns = [
  ['counter-UAS', /\bcounter[\s_-]*u(?:as|av)\b/gi],
  ['C-UAS', /\bc[\s_-]*uas\b/gi],
  ['CUAS', /\bcuas\b/gi],
  ['anti-drone', /\banti[\s_-]*(?:drone|uav)\b/gi],
  ['drone', /\bdrone(?:s)?\b/gi],
  ['UAV', /\buav(?:s)?\b/gi],
  ['jammer', /\bjammer(?:s)?\b/gi],
  ['jamming', /\bjamming\b/gi],
  ['spoofing', /\bspoofing\b/gi],
  ['антидрон', /антидрон[а-яё-]*/gi],
  ['дрон', /дрон[а-яё-]*/gi],
  ['БПЛА', /бпла/gi],
  ['беспилотный', /беспилотн[а-яё-]*/gi],
  ['глушилка', /глушил[а-яё-]*/gi],
  ['无人机', /无人机/g],
  ['反无人机', /反无人机|反无/g],
];

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function decodeReference(value) {
  try {
    return decodeURIComponent(decodeHtml(value));
  } catch {
    return decodeHtml(value);
  }
}

function findRestricted(value) {
  const findings = [];
  for (const [label, pattern] of restrictedPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(value)) findings.push(label);
  }
  return findings;
}

function extractAttributeValues(html, attributeNames) {
  const names = attributeNames.join('|');
  const pattern = new RegExp(`\\b(?:${names})=(["'])(.*?)\\1`, 'gis');
  return Array.from(html.matchAll(pattern), (match) => decodeHtml(match[2]));
}

function inspectHtml(html) {
  const jsonLd = Array.from(
    html.matchAll(/<script\b[^>]*type=(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[2],
  ).join(' ');
  const withoutScripts = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ');
  const visibleText = decodeHtml(withoutScripts.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  const descriptiveAttributes = extractAttributeValues(withoutScripts, [
    'content',
    'alt',
    'title',
    'aria-label',
    'placeholder',
  ]).join(' ');
  const publicReferences = extractAttributeValues(withoutScripts, ['src', 'href', 'srcset'])
    .map(decodeReference)
    .filter((value) => !value.startsWith('/_next/'))
    .join(' ');

  return {
    visibleText: findRestricted(visibleText),
    descriptiveAttributes: findRestricted(descriptiveAttributes),
    jsonLd: findRestricted(jsonLd),
    publicReferences: findRestricted(publicReferences),
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'N-TET-Yandex-Copy-Audit/1.0' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
const productionUrls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), (match) => decodeHtml(match[1]));
const pagePaths = productionUrls.map((url) => {
  const parsed = new URL(url);
  return `${parsed.pathname}${parsed.search}`;
});

const failures = [];
for (const path of pagePaths) {
  try {
    const html = await fetchText(`${baseUrl}${path}`);
    const findings = inspectHtml(html);
    const affectedAreas = Object.entries(findings).filter(([, terms]) => terms.length);
    if (affectedAreas.length) {
      failures.push({
        path,
        areas: Object.fromEntries(affectedAreas),
      });
    }
  } catch (error) {
    failures.push({
      path,
      fetch: error instanceof Error ? error.message : String(error),
    });
  }
}

const llmsText = await fetchText(`${baseUrl}/llms.txt`);
const llmsFindings = findRestricted(llmsText);
if (llmsFindings.length) {
  failures.push({ path: '/llms.txt', areas: { copy: llmsFindings } });
}

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  console.error(`Yandex copy audit failed on ${failures.length} public target(s).`);
  process.exit(1);
}

console.log(`Yandex copy audit passed for ${pagePaths.length} sitemap pages and llms.txt.`);
