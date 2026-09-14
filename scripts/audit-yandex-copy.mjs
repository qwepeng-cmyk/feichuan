const baseUrl = (process.env.SOURCE_BASE_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '');

const utf8RestrictedPatterns = [
  ['forced landing', /\bforced[\s_-]*landing\b/gi],
  ['shoot down', /\bshoot[\s_-]*down\b/gi],
  ['weapon', /\bweapon(?:s)?\b/gi],
  ['anti-drone (ru)', /\u0430\u043d\u0442\u0438\u0434\u0440\u043e\u043d[\u0430-\u044f\u0451-]*/gi],
  ['drone (ru)', /\u0434\u0440\u043e\u043d[\u0430-\u044f\u0451-]*/gi],
  ['UAV (ru)', /\u0431\u043f\u043b\u0430/gi],
  ['unmanned (ru)', /\u0431\u0435\u0441\u043f\u0438\u043b\u043e\u0442\u043d[\u0430-\u044f\u0451-]*/gi],
  ['jammer (ru)', /\u0433\u043b\u0443\u0448\u0438\u043b\u043a[\u0430-\u044f\u0451-]*/gi],
  ['spoofing (ru)', /\u0441\u043f\u0443\u0444\u0438\u043d\u0433[\u0430-\u044f\u0451-]*/gi],
  ['forced landing (ru)', /\u043f\u0440\u0438\u043d\u0443\u0434\u0438\u0442\u0435\u043b\u044c\u043d[\u0430-\u044f\u0451-]*\s+\u043f\u043e\u0441\u0430\u0434\u043a[\u0430-\u044f\u0451-]*/gi],
  ['weapon (ru)', /\u043e\u0440\u0443\u0436\u0438[\u0430-\u044f\u0451-]*/gi],
  ['drone (zh)', /\u65e0\u4eba\u673a/g],
  ['anti-drone (zh)', /\u53cd\u65e0\u4eba\u673a|\u53cd\u65e0/g],
];

const restrictedPatterns = [
  ...utf8RestrictedPatterns,
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
