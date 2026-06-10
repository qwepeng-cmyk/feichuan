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
  const match = route.match(/^\/(en|ru|es)(?:\/|$)/);
  return match?.[1] || 'en';
}

function stripLocale(route) {
  const stripped = route.replace(/^\/(en|ru|es)(?=\/|$)/, '');
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
  if (/directional-rf-jammer|omni-directional-rf-jammer|spoofing|anti-uav|cuas|jammer|jamming/i.test(base)) return 'restricted';
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
  if (planned.length) return '绮惧噯瑙勫垝鏄犲皠';
  if (inheritedPlanned.length && locale !== 'en') return '缁ф壙鑻辨枃椤甸潰鏄犲皠';
  if (libraryMatch.matchedKeywords.length) return '鍛戒腑鍏抽敭璇嶅簱浣嗘湭瑙勫垝';
  return '鏈涓婂箍鍛婂叧閿瘝搴?;
}

function actionFor({ status, auditStatus, pageKind, tier, planned, inheritedPlanned, libraryMatch }) {
  if (tier === 'restricted') return '淇濇寔涓嶅彲鍏紑钀藉湴锛屼笉杩涘叆骞垮憡/Schema/llms.txt';
  if (planned.length || inheritedPlanned.length) {
    if (auditStatus === 'strong') return '淇濇寔鏄犲皠锛屽悗缁仛 E-E-A-T 鍜屽唴閾惧寮?;
    return '鎸夎鍒掍富璇嶄紭鍖?title銆乨escription銆丠1銆丠2銆侀娈靛拰姝ｆ枃灏忚妭';
  }
  if (libraryMatch.matchedKeywords.length) {
    return '琛ュ叆鍏抽敭璇嶈鍒掕〃锛屾槑纭富钀藉湴椤靛拰杈呭姪璇?;
  }
  if (['brand', 'conversion', 'home'].includes(pageKind)) {
    return '鏍囪涓哄搧鐗?杞寲椤甸潰锛岄€夋嫨灏戦噺鏍稿績璇嶆垨鍝佺墝璇嶆壙鎺?;
  }
  if (pageKind.endsWith('_detail')) {
    return '妫€鏌ユ槸鍚﹂渶瑕佷粠鍏抽敭璇嶅簱琛ラ暱灏捐瘝锛涗綆鍟嗕笟浠峰€奸〉鍙笉寮哄埗骞垮憡璇嶆槧灏?;
  }
  return '浜哄伐鍒ゅ畾鏄惁闇€瑕佸叧閿瘝搴撴槧灏?;
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
      from_google_ads_keywords: status === '鏈涓婂箍鍛婂叧閿瘝搴? ? '鍚? : '鏄?,
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
  if (!rows.length) return '鏃犮€?;
  return [
    '| 椤甸潰 | 鐘舵€?| 鍒嗘暟 | 鏄犲皠鐘舵€?| 涓诲叧閿瘝 | 鍏抽敭璇嶇皣 | 涓嬩竴姝?|',
    '| --- | --- | ---: | --- | --- | --- | --- |',
    ...rows.slice(0, limit).map((row) => (
      `| ${row.route} | ${row.audit_status} | ${row.audit_score} | ${row.mapping_status} | ${row.primary_keyword} | ${row.mapped_clusters || '-'} | ${row.implementation_action} |`
    )),
  ].join('\n');
}

function writeMarkdown(rows) {
  const total = rows.length;
  const mapped = rows.filter((row) => row.from_google_ads_keywords === '鏄?);
  const precise = rows.filter((row) => row.mapping_status === '绮惧噯瑙勫垝鏄犲皠');
  const inherited = rows.filter((row) => row.mapping_status === '缁ф壙鑻辨枃椤甸潰鏄犲皠');
  const libraryOnly = rows.filter((row) => row.mapping_status === '鍛戒腑鍏抽敭璇嶅簱浣嗘湭瑙勫垝');
  const unmapped = rows.filter((row) => row.mapping_status === '鏈涓婂箍鍛婂叧閿瘝搴?);
  const mappedWeak = rows.filter((row) => row.from_google_ads_keywords === '鏄? && row.audit_status !== 'strong');
  const p0 = rows.filter((row) => row.planned_priority.split(' | ').includes('P0') && row.audit_status !== 'strong');

  const body = `# 椤甸潰-鍏抽敭璇嶈鐩栫煩闃?
鐢熸垚鏃ユ湡锛?{DATE_STAMP}
椤甸潰鏉ユ簮锛?{path.relative(ROOT, INPUTS.audit)}
鍏抽敭璇嶆潵婧愶細${ADS_KEYWORD_DIR}
瀹屾暣鐭╅樀 CSV锛?{path.relative(ROOT, OUTPUTS.csv)}

## 鎬昏

- 瑕嗙洊椤甸潰鏁帮細${total}
- 宸插拰骞垮憡鍏抽敭璇嶅簱寤虹珛鍏崇郴鐨勯〉闈細${mapped.length}锛?{pct(mapped.length, total)}锛?- 宸茬簿鍑嗚鍒掑埌 canonical cluster 鐨勯〉闈細${precise.length}
- 缁ф壙鑻辨枃椤甸潰鏄犲皠鐨勫璇█椤甸潰锛?{inherited.length}
- 鍛戒腑鍏抽敭璇嶅簱浣嗚繕娌℃湁鏄庣‘瑙勫垝鐨勯〉闈細${libraryOnly.length}
- 灏氭湭瀵逛笂骞垮憡鍏抽敭璇嶅簱鐨勯〉闈細${unmapped.length}
- 宸叉槧灏勪絾褰撳墠杩樹笉鏄?strong 鐨勯〉闈細${mappedWeak.length}

## 鏄犲皠鐘舵€佸垎甯?
| 鏄犲皠鐘舵€?| 椤甸潰鏁?|
| --- | ---: |
${renderCountTable(countBy(rows, 'mapping_status'))}

## 椤甸潰绫诲瀷鍒嗗竷

| 椤甸潰绫诲瀷 | 椤甸潰鏁?|
| --- | ---: |
${renderCountTable(countBy(rows, 'page_type'))}

## 瀹¤鐘舵€佸垎甯?
| 瀹¤鐘舵€?| 椤甸潰鏁?|
| --- | ---: |
${renderCountTable(countBy(rows, 'audit_status'))}

## 浼樺厛澶勭悊椤甸潰

浠ヤ笅椤甸潰宸茬粡杩涘叆鍏抽敭璇嶈鍒掞紝涓斿綋鍓嶈繕娌℃湁杈惧埌 strong锛屼紭鍏堟寜瑙勫垝淇敼銆?
${renderRows(p0, 40)}

## 宸叉槧灏勪絾杩橀渶浼樺寲鐨勯〉闈?
${renderRows(mappedWeak, 40)}

## 灏氭湭瀵逛笂骞垮憡鍏抽敭璇嶅簱鐨勯〉闈?
杩欎簺椤甸潰涓嶆槸閮藉繀椤诲己鍒舵壙鎺ュ箍鍛婂叧閿瘝銆備骇鍝佽鎯呴〉銆侀厤浠惰鎯呴〉銆佸搧鐗岄〉銆佸獟浣撹鎯呴〉鍙互鏍规嵁鍟嗕笟浠峰€煎喅瀹氭槸鍚﹁ˉ鍏ュ叧閿瘝搴擄紝鎴栨爣璁颁负浜у搧闀垮熬/鍝佺墝鏀拺椤甸潰銆?
${renderRows(unmapped, 40)}

## 鎵ц瑙勫垯

1. P0 椤甸潰鍏堟敼锛屾瘡鎵?3-4 涓〉闈€?2. 姣忛〉鍙 1 涓富鍏抽敭璇嶏紝3-5 涓緟鍔╁叧閿瘝銆?3. 涓诲叧閿瘝杩涘叆 title銆乨escription銆丠1 鍜岄娈点€?4. 杈呭姪鍏抽敭璇嶈繘鍏?H2銆佸満鏅钀姐€丗AQ 鎴栫浉鍏抽摼鎺ャ€?5. 澶氳瑷€椤甸潰鍏堢户鎵胯嫳鏂囬〉闈㈡槧灏勶紝鍐嶅仛鏈湴鍖栧叧閿瘝锛屼笉鐩存帴濂楄嫳鏂囪瘝銆?6. \`neutral_seo\` 椤甸潰鍙仛淇℃伅鍨?SEO/GEO锛屼笉榛樿浣滀负骞垮憡钀藉湴椤点€?7. 鏀瑰畬杩愯 \`npm run build\`銆乗`npm run audit:keywords\`锛屾秹鍙婂叕寮€椋庨櫓鏃跺啀璺?\`audit-public-site-risk\`銆?`;

  fs.writeFileSync(OUTPUTS.md, body, 'utf8');
}

function pct(value, total) {
  if (!total) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
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
console.log(`Keyword page coverage matrix: ${matrix.length} pages, ${matrix.filter((row) => row.from_google_ads_keywords === '鏄?).length} mapped to ads keyword library.`);
