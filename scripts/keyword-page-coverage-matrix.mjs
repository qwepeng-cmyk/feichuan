import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ADS_KEYWORD_DIR = process.env.ADS_KEYWORD_DIR || 'D:\\fc-google-ads\\keywords';
const DATE_STAMP = process.env.AUDIT_DATE || new Date().toISOString().slice(0, 10);

const INPUTS = {
  audit: path.join(ROOT, 'docs', 'seo', `keyword-landing-audit-${DATE_STAMP}.csv`),
  plan: path.join(ROOT, 'docs', 'seo', `keyword-page-plan-${DATE_STAMP}.csv`),
  adsCluster: path.join(ADS_KEYWORD_DIR, 'upload', 'ntet_google_ads_upload_by_cluster_2026-06-04.csv'),
  adsDetail: path.join(ADS_KEYWORD_DIR, 'upload', 'ntet_google_ads_keyword_upload_detail_2026-06-04.csv'),
  cleanedMaster: path.join(ADS_KEYWORD_DIR, 'cleaned', 'ntet_keywords_cleaned_master_2026-06-01.csv'),
};

const OUTPUTS = {
  csv: path.join(ROOT, 'docs', 'seo', `keyword-page-coverage-matrix-${DATE_STAMP}.csv`),
  md: path.join(ROOT, 'docs', 'seo', `keyword-page-coverage-matrix-${DATE_STAMP}.md`),
};

function readText(file) {
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(value);
      if (row.some((cell) => cell !== '')) rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell !== '')) rows.push(row);

  if (rows.length === 0) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
}

function writeCsv(file, rows) {
  const headers = Object.keys(rows[0] || {});
  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => quoteCsv(row[header])).join(',')),
  ];
  fs.writeFileSync(file, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function quoteCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function splitKeywords(value) {
  return String(value || '')
    .split(/\s*\|\s*|;\s*|,\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function localeFromRoute(route) {
  const match = route.match(/^\/(en|ru|es|ar)(?:\/|$)/);
  return match?.[1] || 'en';
}

function stripLocale(route) {
  const stripped = route.replace(/^\/(en|ru|es|ar)(?=\/|$)/, '');
  return stripped || '/';
}

function canonicalEnglishRoute(route) {
  const base = stripLocale(route);
  return base === '/' ? '/en' : `/en${base}`;
}

function pageType(route) {
  const base = stripLocale(route);
  if (base === '/') return 'home';
  if (base === '/products') return 'product_index';
  if (base.startsWith('/products/')) return 'product_detail';
  if (base === '/accessories') return 'accessory_index';
  if (base.startsWith('/accessories/')) return 'accessory_detail';
  if (base === '/solutions') return 'solution_index';
  if (base.startsWith('/solutions/category/')) return 'solution_category';
  if (base.startsWith('/solutions/')) return 'solution_detail';
  if (base === '/cases') return 'case_index';
  if (base.startsWith('/cases/')) return 'case_detail';
  if (base === '/media') return 'media_index';
  if (base.startsWith('/media/')) return 'media_detail';
  if (base === '/contact') return 'conversion';
  if (base === '/about') return 'brand';
  return 'other';
}

function pageTier(route, plannedTier) {
  if (plannedTier) return plannedTier;
  const base = stripLocale(route).replace(/^\/+/, '');
  if (/directional-rf-jammer|omni-directional-rf-jammer|spoofing|jammer|jamming/i.test(base)) return 'restricted';
  if (/chemical-plant-protection|hydroelectric-dam-protection|oil-production-base-protection|airport-security-protection|judicial-sector-security|sports-event-security|stationary-rf-detection-system|portable-rf-detection-case|composite-electro-optical-tracking-system|uav-remote-id-monitoring-system|low-altitude-detection-radar/i.test(base)) return 'neutral_seo';
  return 'normal';
}

function loadClusterSummary() {
  const rows = parseCsv(readText(INPUTS.adsCluster));
  const summary = new Map();
  for (const row of rows) {
    const cluster = row['Canonical keyword cluster'];
    if (!cluster) continue;
    const current = summary.get(cluster) || { rows: 0, countries: new Set(), matchTypes: new Set() };
    current.rows += Number(row['Keyword rows'] || 0);
    current.countries.add(row.Country);
    current.matchTypes.add(row['Match type']);
    summary.set(cluster, current);
  }
  return summary;
}

function addKeyword(index, keyword, source, cluster = '', group = '') {
  const key = normalize(keyword);
  if (!key) return;
  const entry = index.get(key) || { sources: new Set(), clusters: new Set(), groups: new Set(), raw: keyword };
  entry.sources.add(source);
  if (cluster) entry.clusters.add(cluster);
  if (group) entry.groups.add(group);
  index.set(key, entry);
}

function loadKeywordIndex(clusterSummary) {
  const index = new Map();

  for (const cluster of clusterSummary.keys()) {
    addKeyword(index, cluster, 'ads_cluster_name', cluster);
  }

  for (const row of parseCsv(readText(INPUTS.adsDetail))) {
    addKeyword(index, row.Keyword, 'ads_upload_detail', row.canonical_keyword_cluster);
  }

  for (const row of parseCsv(readText(INPUTS.cleanedMaster))) {
    addKeyword(index, row.keyword_clean, 'cleaned_master', '', row.business_group);
  }

  return index;
}

function loadPlanMap(clusterSummary) {
  const rows = fs.existsSync(INPUTS.plan) ? parseCsv(readText(INPUTS.plan)) : [];
  const map = new Map();
  for (const row of rows) {
    const target = row.target_url;
    if (!target) continue;
    const current = map.get(target) || [];
    const cluster = row.canonical_keyword_cluster;
    const clusterInfo = clusterSummary.get(cluster);
    current.push({
      priority: row.priority,
      cluster,
      keywordRows: row.keyword_rows || clusterInfo?.rows || '',
      primaryKeyword: row.primary_keyword,
      pageTier: row.page_tier,
      action: row.implementation_action,
      role: row.target_page_role,
    });
    map.set(target, current);
  }
  return map;
}

function matchKeywordLibrary(keywords, keywordIndex) {
  const matched = [];
  const sources = [];
  const clusters = [];
  const groups = [];

  for (const keyword of keywords) {
    const entry = keywordIndex.get(normalize(keyword));
    if (!entry) continue;
    matched.push(keyword);
    sources.push(...entry.sources);
    clusters.push(...entry.clusters);
    groups.push(...entry.groups);
  }

  return {
    matchedKeywords: uniq(matched),
    sources: uniq(sources),
    clusters: uniq(clusters),
    groups: uniq(groups),
  };
}

function mappingStatus({ planned, inheritedPlanned, libraryMatch, locale }) {
  if (planned.length) return 'planned_exact_mapping';
  if (inheritedPlanned.length && locale !== 'en') return 'inherits_en_mapping';
  if (libraryMatch.matchedKeywords.length) return 'keyword_library_hit_unplanned';
  return 'not_mapped_to_ads_keyword_library';
}

function actionFor({ status, auditStatus, pageKind, tier, planned, inheritedPlanned, libraryMatch }) {
  if (tier === 'restricted') return 'Keep unavailable publicly; exclude from ads, Schema, sitemap, and llms.txt.';
  if (planned.length || inheritedPlanned.length) {
    if (auditStatus === 'strong') return 'Keep mapping; continue E-E-A-T and internal-link strengthening.';
    return 'Optimize title, description, H1, H2, intro paragraph, and body sections around the planned primary keyword.';
  }
  if (libraryMatch.matchedKeywords.length) {
    return 'Add to keyword planning table and define primary landing page plus supporting terms.';
  }
  if (['brand', 'conversion', 'home'].includes(pageKind)) {
    return 'Treat as brand/conversion page; use a small set of core or brand terms.';
  }
  if (pageKind.endsWith('_detail')) {
    return 'Review whether long-tail keyword mapping is needed; low commercial value detail pages do not require forced ads mapping.';
  }
  return 'Manually decide whether keyword-library mapping is needed.';
}

function buildMatrix() {
  const clusterSummary = loadClusterSummary();
  const keywordIndex = loadKeywordIndex(clusterSummary);
  const planMap = loadPlanMap(clusterSummary);
  const auditRows = parseCsv(readText(INPUTS.audit));

  return auditRows.map((row) => {
    const route = row.route;
    const locale = localeFromRoute(route);
    const canonicalRoute = canonicalEnglishRoute(route);
    const planned = planMap.get(route) || [];
    const inheritedPlanned = route === canonicalRoute ? [] : (planMap.get(canonicalRoute) || []);
    const allKeywords = uniq([row.primary_keyword, ...splitKeywords(row.keywords)]);
    const libraryMatch = matchKeywordLibrary(allKeywords, keywordIndex);
    const planClusters = planned.length ? planned : inheritedPlanned;
    const clusterNames = uniq([...planClusters.map((item) => item.cluster), ...libraryMatch.clusters]);
    const clusterRows = clusterNames
      .map((cluster) => clusterSummary.get(cluster)?.rows || planClusters.find((item) => item.cluster === cluster)?.keywordRows || '')
      .filter(Boolean);
    const kind = pageType(route);
    const tier = pageTier(route, planClusters[0]?.pageTier);
    const status = mappingStatus({ planned, inheritedPlanned, libraryMatch, locale });

    return {
      route,
      locale,
      canonical_english_route: canonicalRoute,
      page_type: kind,
      compliance_tier: tier,
      audit_status: row.status,
      audit_score: row.score,
      primary_keyword: row.primary_keyword,
      keyword_count: row.keyword_count,
      meta_keywords: row.keywords,
      title_hit: row.title_hit,
      description_hit: row.description_hit,
      h1_hit: row.h1_hit,
      h2_hit: row.h2_hit,
      body_hit: row.body_hit,
      keyword_density_pct: row.keyword_density_pct,
      mapping_status: status,
      from_google_ads_keywords: status === 'not_mapped_to_ads_keyword_library' ? 'no' : 'yes',
      mapped_clusters: clusterNames.join(' | '),
      mapped_cluster_rows: uniq(clusterRows.map(String)).join(' | '),
      matched_business_groups: libraryMatch.groups.join(' | '),
      matched_ads_keywords: libraryMatch.matchedKeywords.join(' | '),
      keyword_sources: libraryMatch.sources.join(' | '),
      planned_priority: uniq(planClusters.map((item) => item.priority)).join(' | '),
      planned_page_role: uniq(planClusters.map((item) => item.role)).join(' | '),
      implementation_action: actionFor({
        status,
        auditStatus: row.status,
        pageKind: kind,
        tier,
        planned,
        inheritedPlanned,
        libraryMatch,
      }),
      issues: row.issues,
      title: row.title,
      description: row.description,
      file: row.file,
    };
  });
}

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    const value = row[key] || '(blank)';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function renderCountTable(counts) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([key, value]) => `| ${key} | ${value} |`)
    .join('\n');
}

function renderRows(rows, limit = 30) {
  if (!rows.length) return 'None.';
  return [
    '| Page | Audit | Score | Mapping | Primary keyword | Clusters | Next action |',
    '| --- | --- | ---: | --- | --- | --- | --- |',
    ...rows.slice(0, limit).map((row) => (
      `| ${row.route} | ${row.audit_status} | ${row.audit_score} | ${row.mapping_status} | ${row.primary_keyword} | ${row.mapped_clusters || '-'} | ${row.implementation_action} |`
    )),
  ].join('\n');
}

function writeMarkdown(rows) {
  const total = rows.length;
  const mapped = rows.filter((row) => row.from_google_ads_keywords === 'yes');
  const precise = rows.filter((row) => row.mapping_status === 'planned_exact_mapping');
  const inherited = rows.filter((row) => row.mapping_status === 'inherits_en_mapping');
  const libraryOnly = rows.filter((row) => row.mapping_status === 'keyword_library_hit_unplanned');
  const unmapped = rows.filter((row) => row.mapping_status === 'not_mapped_to_ads_keyword_library');
  const mappedWeak = rows.filter((row) => row.from_google_ads_keywords === 'yes' && row.audit_status !== 'strong');
  const p0 = rows.filter((row) => row.planned_priority.split(' | ').includes('P0') && row.audit_status !== 'strong');

  const body = `# Page-Keyword Coverage Matrix
Generated: ${DATE_STAMP}
Page source: ${path.relative(ROOT, INPUTS.audit)}
Keyword source: ${ADS_KEYWORD_DIR}
Full CSV: ${path.relative(ROOT, OUTPUTS.csv)}

## Overview

- Audited pages: ${total}
- Pages mapped to the ads keyword library: ${mapped.length} (${pct(mapped.length, total)})
- Planned exact canonical-cluster mappings: ${precise.length}
- Localized pages inheriting English mappings: ${inherited.length}
- Keyword-library hits without explicit planning: ${libraryOnly.length}
- Not mapped to ads keyword library: ${unmapped.length}
- Mapped pages that are not strong yet: ${mappedWeak.length}

## Mapping Status Distribution

| Mapping status | Pages |
| --- | ---: |
${renderCountTable(countBy(rows, 'mapping_status'))}

## Page Type Distribution

| Page type | Pages |
| --- | ---: |
${renderCountTable(countBy(rows, 'page_type'))}

## Audit Status Distribution

| Audit status | Pages |
| --- | ---: |
${renderCountTable(countBy(rows, 'audit_status'))}

## Priority Pages

These pages are already in keyword planning and are not strong yet. Update them first.

${renderRows(p0, 40)}

## Mapped Pages Still Needing Optimization

${renderRows(mappedWeak, 40)}

## Pages Not Mapped To Ads Keyword Library

Not every page must target ads keywords. Product details, accessory details, brand pages, and media pages can remain long-tail or supporting pages when commercial value is lower.

${renderRows(unmapped, 40)}

## Execution Rules

1. Prioritize P0 planned pages in batches of 3-4 pages.
2. Use 1 primary keyword and 3-5 supporting keywords per page.
3. Put the primary keyword in title, description, H1, and the intro paragraph.
4. Put supporting keywords in H2, scenario paragraphs, FAQ, and related links.
5. Localized pages should inherit the English mapping first, then use localized keyword wording.
6. neutral_seo pages are informational SEO/GEO pages, not default ad landing pages.
7. After changes, run npm run build and npm run audit:keywords; run public-risk audit when public compliance may change.
`;

  fs.writeFileSync(OUTPUTS.md, body, 'utf8');
}

function pct(value, total) {
  if (!total) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}

if (!fs.existsSync(INPUTS.plan)) {
  const latestPlan = fs.readdirSync(path.join(ROOT, 'docs', 'seo'))
    .filter((name) => /^keyword-page-plan-\d{4}-\d{2}-\d{2}\.csv$/.test(name))
    .sort()
    .pop();
  if (latestPlan) {
    INPUTS.plan = path.join(ROOT, 'docs', 'seo', latestPlan);
  }
}

for (const [name, file] of Object.entries(INPUTS)) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${name} input: ${file}`);
  }
}

const matrix = buildMatrix();
fs.mkdirSync(path.dirname(OUTPUTS.csv), { recursive: true });
writeCsv(OUTPUTS.csv, matrix);
writeMarkdown(matrix);

console.log(`Wrote ${OUTPUTS.csv}`);
console.log(`Wrote ${OUTPUTS.md}`);
console.log(`Keyword page coverage matrix: ${matrix.length} pages, ${matrix.filter((row) => row.from_google_ads_keywords === 'yes').length} mapped to ads keyword library.`);
