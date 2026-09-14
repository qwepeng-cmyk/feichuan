import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  CONTENT_TYPES,
  SITE_URL,
  getAllPublishedContent,
  openDb,
  publicUrl,
  readTextFileIfExists,
  todayStamp,
  writeTextFile,
} from './ntet-seo-utils.mjs';

const REPORT_DIR = join(process.cwd(), 'docs', 'seo-monitoring');
const HISTORY_DIR = join(REPORT_DIR, 'history');
const SNAPSHOT_DATE = todayStamp();

const KEY_SOURCE_FILES = {
  siteLayout: 'src/app/[locale]/layout.tsx',
  productDetail: 'src/app/[locale]/products/[handle]/page.tsx',
  catalogDetailContent: 'src/components/products/CatalogDetailContent.tsx',
  solutionDetail: 'src/app/[locale]/solutions/[id]/page.tsx',
  caseDetail: 'src/app/[locale]/cases/[handle]/page.tsx',
  mediaDetail: 'src/app/[locale]/media/[id]/page.tsx',
  structuredData: 'src/lib/structuredData.ts',
};

const KEY_BUILD_HTML = [
  {
    label: 'home',
    path: '.next/server/app/en.html',
  },
  {
    label: 'products index',
    path: '.next/server/app/en/products.html',
  },
  {
    label: 'bailey bridge product',
    path: '.next/server/app/en/products/bailey-bridge.html',
  },
  {
    label: 'airport security solution',
    path: '.next/server/app/en/solutions/airport-security-protection.html',
  },
  {
    label: 'media sample',
    path: '.next/server/app/en/media/industrial-uav-redundancy-2026.html',
  },
];

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function extractUrls(text) {
  return Array.from(new Set(Array.from(text.matchAll(/https?:\/\/[^\s)]+/g)).map((match) => match[0])));
}

function parseRobots(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    hasSitemap: lines.some((line) => /^Sitemap:/i.test(line)),
    sitemapUrls: lines
      .filter((line) => /^Sitemap:/i.test(line))
      .map((line) => line.replace(/^Sitemap:\s*/i, '').trim()),
    disallowsAdmin: lines.some((line) => /^Disallow:\s*\/admin\/?/i.test(line)),
    disallowsApi: lines.some((line) => /^Disallow:\s*\/api\/?/i.test(line)),
    disallowsPreview: lines.some((line) => /^Disallow:\s*\/\*\/preview/i.test(line)),
    aiCrawlers: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].filter(
      (crawler) => text.includes(`User-agent: ${crawler}`)
    ),
  };
}

function countByTypeAndTier(rows) {
  const counts = {};
  for (const type of Object.keys(CONTENT_TYPES)) {
    counts[type] = { public: 0, total: 0 };
  }

  for (const row of rows) {
    counts[row.type].total += 1;
    counts[row.type].public += 1;
  }

  return counts;
}

function readSourceCheck(filePath) {
  const absPath = join(process.cwd(), filePath);
  const content = readTextFileIfExists(absPath);
  return {
    path: filePath,
    exists: existsSync(absPath),
    hasJsonLd: /<JsonLd\b/.test(content),
    importsJsonLd: /import\s+JsonLd/.test(content),
    hasGenerateMetadata: /export\s+async\s+function\s+generateMetadata/.test(content),
    bytes: existsSync(absPath) ? statSync(absPath).size : 0,
  };
}

function getBuildHtmlSizes() {
  return KEY_BUILD_HTML.map((item) => {
    const absPath = join(process.cwd(), item.path);
    if (!existsSync(absPath)) {
      return { ...item, exists: false, bytes: 0, jsonLdScripts: 0 };
    }

    const html = readFileSync(absPath, 'utf8');
    return {
      ...item,
      exists: true,
      bytes: statSync(absPath).size,
      jsonLdScripts: (html.match(/type="application\/ld\+json"/g) || []).length,
    };
  });
}

function loadPreviousSnapshot() {
  if (!existsSync(HISTORY_DIR)) return null;

  const files = readdirSync(HISTORY_DIR)
    .filter((file) => /^seo-monitoring-snapshot-\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .filter((file) => !file.includes(SNAPSHOT_DATE))
    .sort();

  if (!files.length) return null;

  const lastFile = files[files.length - 1];
  try {
    return JSON.parse(readFileSync(join(HISTORY_DIR, lastFile), 'utf8'));
  } catch {
    return null;
  }
}

function diffCounts(current, previous) {
  if (!previous) return null;

  return {
    publicRecords: current.content.publicRecords - previous.content.publicRecords,
    llmsUrls: current.llms.urlCount - previous.llms.urlCount,
    schemaCoveredRecords: current.schema.coveredPublicRecords - previous.schema.coveredPublicRecords,
    schemaMissingRecords: current.schema.missingPublicRecords - previous.schema.missingPublicRecords,
  };
}

function formatDelta(value) {
  if (value === null || value === undefined) return 'n/a';
  if (value > 0) return `+${value}`;
  return String(value);
}

function makeReport(snapshot, previous, diff) {
  const lines = [
    '# N-TET SEO Monitoring Snapshot',
    '',
    `生成日期：${snapshot.date}`,
    `站点：${snapshot.siteUrl}`,
    '',
    '## 总览',
    '',
    '| 指标 | 当前 | 较上次 |',
    '|---|---:|---:|',
    `| 公开内容记录 | ${snapshot.content.publicRecords} | ${formatDelta(diff?.publicRecords)} |`,
    `| llms.txt URL 数 | ${snapshot.llms.urlCount} | ${formatDelta(diff?.llmsUrls)} |`,
    `| Schema 覆盖公开记录 | ${snapshot.schema.coveredPublicRecords} | ${formatDelta(diff?.schemaCoveredRecords)} |`,
    `| Schema 缺失公开记录 | ${snapshot.schema.missingPublicRecords} | ${formatDelta(diff?.schemaMissingRecords)} |`,
    '',
    previous ? `上次快照：${previous.date}` : '上次快照：无，这是第一次生成。',
    '',
    '## 已发布内容分布',
    '',
    '| Type | Published |',
    '|---|---:|',
    ...Object.entries(snapshot.content.byTypeAndTier).map(
      ([type, counts]) =>
        `| ${type} | ${counts.total} |`
    ),
    '',
    '## llms.txt',
    '',
    `- 文件存在：${snapshot.llms.exists ? 'yes' : 'no'}`,
    `- URL 数：${snapshot.llms.urlCount}`,
    `- admin/preview/API URL：${snapshot.llms.privatePathLeaks.length ? 'found' : 'none'}`,
    '',
    '## robots.txt',
    '',
    `- 文件存在：${snapshot.robots.exists ? 'yes' : 'no'}`,
    `- Sitemap 声明：${snapshot.robots.hasSitemap ? 'yes' : 'no'}`,
    `- 禁止 /admin：${snapshot.robots.disallowsAdmin ? 'yes' : 'no'}`,
    `- 禁止 /api：${snapshot.robots.disallowsApi ? 'yes' : 'no'}`,
    `- 禁止 /*/preview：${snapshot.robots.disallowsPreview ? 'yes' : 'no'}`,
    `- AI crawler 显式规则：${snapshot.robots.aiCrawlers.join(', ') || 'none'}`,
    '',
    '## Sitemap',
    '',
    `- robots 声明 URL：${snapshot.sitemap.declaredUrls.join(', ') || 'none'}`,
    `- 本地 public/sitemap.xml：${snapshot.sitemap.localFileExists ? 'exists' : 'missing'}`,
    '',
    '## Schema 源码覆盖',
    '',
    '| Source | Exists | Imports JsonLd | Uses JsonLd | generateMetadata |',
    '|---|---:|---:|---:|---:|',
    ...Object.values(snapshot.sourceChecks).map(
      (item) =>
        `| ${item.path} | ${item.exists ? 'yes' : 'no'} | ${item.importsJsonLd ? 'yes' : 'no'} | ${item.hasJsonLd ? 'yes' : 'no'} | ${item.hasGenerateMetadata ? 'yes' : 'no'} |`
    ),
    '',
    '## 构建 HTML 抽样',
    '',
    '| Page | Exists | KB | JSON-LD scripts |',
    '|---|---:|---:|---:|',
    ...snapshot.buildHtml.map(
      (item) =>
        `| ${item.label} | ${item.exists ? 'yes' : 'no'} | ${(item.bytes / 1024).toFixed(1)} | ${item.jsonLdScripts} |`
    ),
    '',
    '## 风险项',
    '',
    ...(snapshot.risks.length ? snapshot.risks.map((risk) => `- ${risk}`) : ['- 无']),
    '',
    '## 后续接入',
    '',
    '- Google Search Console：点击、曝光、CTR、平均排名、索引状态。',
    '- Yandex Webmaster：俄文页面索引与搜索表现。',
    '- Cloudflare / Nginx logs：bot 抓取、状态码、缓存命中、页面类型抓取量。',
    '- DataForSEO：关键词排名、竞品 SERP、搜索量、KD。',
  ];

  return lines.join('\n');
}

const db = openDb();
const rows = getAllPublishedContent(db);
const publicRows = rows;

const llmsPath = join(process.cwd(), 'public', 'llms.txt');
const robotsPath = join(process.cwd(), 'public', 'robots.txt');
const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
const nextSitemapPath = join(process.cwd(), 'src', 'app', 'sitemap.ts');
const llms = readTextFileIfExists(llmsPath);
const robots = readTextFileIfExists(robotsPath);
const llmsUrls = extractUrls(llms);
const robotsInfo = parseRobots(robots);

const publicUrlSet = new Set(publicRows.map((row) => publicUrl('en', row.route, row.handle)));
const privatePathLeaks = llmsUrls.filter((url) => /\/admin\b|\/api\b|preview\b/i.test(url));

const sourceChecks = Object.fromEntries(
  Object.entries(KEY_SOURCE_FILES).map(([key, filePath]) => [key, readSourceCheck(filePath)])
);

const schemaSupportedByType = {
  product: sourceChecks.productDetail.hasJsonLd || sourceChecks.catalogDetailContent.hasJsonLd,
  solution: sourceChecks.solutionDetail.hasJsonLd,
  case: sourceChecks.caseDetail.hasJsonLd,
  media: sourceChecks.mediaDetail.hasJsonLd,
};

const schemaCoveredPublicRecords = publicRows.filter((row) => schemaSupportedByType[row.type]).length;
const schemaMissingPublicRecords = publicRows.length - schemaCoveredPublicRecords;

const risks = [];
if (!existsSync(llmsPath)) risks.push('public/llms.txt 缺失。');
if (!existsSync(robotsPath)) risks.push('public/robots.txt 缺失。');
if (!robotsInfo.hasSitemap) risks.push('robots.txt 没有 Sitemap 声明。');
if (!robotsInfo.disallowsAdmin) risks.push('robots.txt 没有禁止 /admin。');
if (!robotsInfo.disallowsApi) risks.push('robots.txt 没有禁止 /api。');
if (!robotsInfo.disallowsPreview) risks.push('robots.txt 没有禁止 /*/preview。');
if (privatePathLeaks.length) risks.push(`llms.txt 包含 ${privatePathLeaks.length} 个 admin/API/preview URL。`);
if (schemaMissingPublicRecords) risks.push(`${schemaMissingPublicRecords} 条公开记录没有源码级 Schema 覆盖。`);
const hasLocalSitemap = existsSync(sitemapPath) || existsSync(nextSitemapPath);
if (!hasLocalSitemap) risks.push('本地 sitemap 缺失；需要 public/sitemap.xml 或 src/app/sitemap.ts。');
if (publicRows.some((row) => !publicUrlSet.has(publicUrl('en', row.route, row.handle)))) {
  risks.push('公开 URL 集合存在异常。');
}

const snapshot = {
  date: SNAPSHOT_DATE,
  generatedAt: new Date().toISOString(),
  siteUrl: SITE_URL,
  content: {
    totalPublishedRecords: rows.length,
    publicRecords: publicRows.length,
    byTypeAndTier: countByTypeAndTier(rows),
  },
  llms: {
    exists: existsSync(llmsPath),
    path: relative(process.cwd(), llmsPath),
    urlCount: llmsUrls.length,
    privatePathLeaks,
  },
  robots: {
    exists: existsSync(robotsPath),
    path: relative(process.cwd(), robotsPath),
    ...robotsInfo,
  },
  sitemap: {
    declaredUrls: robotsInfo.sitemapUrls,
    localFileExists: existsSync(sitemapPath),
    localPath: relative(process.cwd(), sitemapPath),
    nextRouteExists: existsSync(nextSitemapPath),
    nextRoutePath: relative(process.cwd(), nextSitemapPath),
  },
  schema: {
    siteGraphInLayout: sourceChecks.siteLayout.hasJsonLd,
    supportedByType: schemaSupportedByType,
    coveredPublicRecords: schemaCoveredPublicRecords,
    missingPublicRecords: schemaMissingPublicRecords,
  },
  sourceChecks,
  buildHtml: getBuildHtmlSizes(),
  risks,
};

ensureDir(HISTORY_DIR);
const previous = loadPreviousSnapshot();
const diff = diffCounts(snapshot, previous);
const jsonPath = join(HISTORY_DIR, `seo-monitoring-snapshot-${SNAPSHOT_DATE}.json`);
const reportPath = join(REPORT_DIR, `snapshot-${SNAPSHOT_DATE}.md`);

writeFileSync(jsonPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
writeTextFile(reportPath, makeReport(snapshot, previous, diff));

console.log(`Wrote ${relative(process.cwd(), jsonPath)}`);
console.log(`Wrote ${relative(process.cwd(), reportPath)}`);

if (risks.some((risk) => /admin\/API\/preview/.test(risk))) {
  console.error('SEO monitoring found public visibility leakage.');
  process.exit(1);
}
