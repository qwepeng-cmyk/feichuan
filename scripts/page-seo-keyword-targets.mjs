import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATE_STAMP = process.env.AUDIT_DATE || new Date().toISOString().slice(0, 10);
const MATRIX_FILE = path.join(ROOT, 'docs', 'seo', `keyword-page-coverage-matrix-${DATE_STAMP}.csv`);
const OUT_CSV = path.join(ROOT, 'docs', 'seo', `page-seo-keyword-targets-${DATE_STAMP}.csv`);
const OUT_MD = path.join(ROOT, 'docs', 'seo', `page-seo-keyword-targets-${DATE_STAMP}.md`);

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

  const headers = rows[0].map((item) => item.trim());
  return rows.slice(1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ''])));
}

function quoteCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(file, rows) {
  const headers = Object.keys(rows[0] || {});
  const lines = [headers.join(','), ...rows.map((row) => headers.map((header) => quoteCsv(row[header])).join(','))];
  fs.writeFileSync(file, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function cleanPrimary(value, fallback) {
  return String(value || fallback || 'N-TET industrial equipment')
    .replace(/\s+\|\s+N-TET$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitList(value) {
  return String(value || '')
    .split(/\s*\|\s*|,\s*|;\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function titleCaseFallback(text) {
  return text
    .split(/\s+/)
    .map((word) => (word.length <= 3 && /[A-Z]/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

function targetSource(row) {
  if (row.mapping_status === '绮惧噯瑙勫垝鏄犲皠' || row.mapping_status === '缁ф壙鑻辨枃椤甸潰鏄犲皠') return 'google_ads_planned_cluster';
  if (row.mapping_status === '鍛戒腑鍏抽敭璇嶅簱浣嗘湭瑙勫垝') return 'google_ads_keyword_library_unplanned';
  return 'inferred_from_page_topic';
}

function targetCluster(row) {
  if (row.mapped_clusters) return row.mapped_clusters;
  if (row.matched_business_groups) return row.matched_business_groups;
  return inferCluster(row.page_type, row.primary_keyword);
}

function inferCluster(pageType, primary) {
  const p = String(primary || '').toLowerCase();
  if (p.includes('x-ray') || p.includes('metal detector') || p.includes('security')) return 'Security Screening Equipment';
  if (p.includes('bridge')) return 'Engineering Materials';
  if (p.includes('hospital') || p.includes('medical')) return 'Field Hospital Systems';
  if (p.includes('radiation') || p.includes('neutron')) return 'Radiation Detection Equipment';
  if (p.includes('camera') || p.includes('eo') || p.includes('radar') || p.includes('sentinel')) return 'Perimeter Intelligence';
  if (p.includes('uav') || p.includes('drone')) return 'Industrial UAV Systems';
  if (pageType.includes('case')) return 'Deployment Case Evidence';
  if (pageType.includes('media')) return 'Industry Insight Content';
  return 'Brand and Product Support';
}

function suggestedTitle(row, primary) {
  const suffix = '| N-TET';
  if (row.page_type === 'conversion') return `${titleCaseFallback(primary)} & Project Consultation ${suffix}`;
  if (row.page_type.includes('case')) return `${titleCaseFallback(primary)} Case ${suffix}`;
  if (row.page_type.includes('media')) return `${titleCaseFallback(primary)} Insights ${suffix}`;
  if (row.page_type.includes('category')) return `${titleCaseFallback(primary)} Solutions ${suffix}`;
  if (row.page_type.includes('solution')) return `${titleCaseFallback(primary)} Solution ${suffix}`;
  if (row.page_type.includes('product') || row.page_type.includes('accessory')) return `${titleCaseFallback(primary)} ${suffix}`;
  return `${titleCaseFallback(primary)} ${suffix}`;
}

function suggestedH2(row, primary) {
  if (row.page_type.includes('case')) return `${titleCaseFallback(primary)} Project Overview`;
  if (row.page_type.includes('media')) return `${titleCaseFallback(primary)} Insights`;
  if (row.page_type.includes('solution')) return `${titleCaseFallback(primary)} Operating Plan`;
  if (row.page_type.includes('product') || row.page_type.includes('accessory')) return `${titleCaseFallback(primary)} Technical Specifications`;
  return `${titleCaseFallback(primary)} Overview`;
}

function nextAction(row, source) {
  if (source === 'google_ads_planned_cluster') return '按广告关键词规划优化 title、description、H1、H2 和首段';
  if (source === 'google_ads_keyword_library_unplanned') return '补入关键词规划表，再决定页面优化方案';
  if (row.page_type.includes('product') || row.page_type.includes('accessory')) return '按产品名称和品类词优化长尾 SEO 与广告相关性';
  if (row.page_type.includes('case')) return '按案例场景词增强 E-E-A-T、SEO 与广告相关性';
  if (row.page_type.includes('media')) return '按文章主题词优化资讯 SEO 与 GEO 覆盖';
  return '人工确认是否需要新增关键词库映射';
}

if (!fs.existsSync(MATRIX_FILE)) {
  throw new Error(`Missing matrix file: ${MATRIX_FILE}`);
}

const matrix = parseCsv(fs.readFileSync(MATRIX_FILE, 'utf8').replace(/^\uFEFF/, ''));
const targets = matrix.map((row) => {
  const primary = cleanPrimary(row.primary_keyword, row.title);
  const secondary = splitList(row.meta_keywords).filter((item) => item.toLowerCase() !== primary.toLowerCase()).slice(0, 6);
  const source = targetSource(row);
  return {
    route: row.route,
    locale: row.locale,
    page_type: row.page_type,
    audit_status: row.audit_status,
    audit_score: row.audit_score,
    target_source: source,
    target_cluster: targetCluster(row),
    primary_keyword: primary,
    secondary_keywords: secondary.join(' | '),
    suggested_title: suggestedTitle(row, primary),
    suggested_h1: titleCaseFallback(primary),
    suggested_h2: suggestedH2(row, primary),
    current_title_hit: row.title_hit,
    current_h1_hit: row.h1_hit,
    current_h2_hit: row.h2_hit,
    current_body_hit: row.body_hit,
    next_action: nextAction(row, source),
  };
});

writeCsv(OUT_CSV, targets);

const counts = targets.reduce((acc, row) => {
  acc[row.target_source] = (acc[row.target_source] || 0) + 1;
  return acc;
}, {});

const p0 = targets.filter((row) => row.target_source === 'google_ads_planned_cluster' && row.audit_status !== 'strong');
const inferred = targets.filter((row) => row.target_source === 'inferred_from_page_topic');

const md = `# 鍏ㄧ珯椤甸潰 SEO 鍏抽敭璇嶅畾浣嶈〃

鐢熸垚鏃ユ湡锛?{DATE_STAMP}
鏉ユ簮鐭╅樀锛?{path.relative(ROOT, MATRIX_FILE)}
瀹屾暣 CSV锛?{path.relative(ROOT, OUT_CSV)}

## 鎬昏

| 鏉ユ簮 | 椤甸潰鏁?|
| --- | ---: |
${Object.entries(counts).map(([key, value]) => `| ${key} | ${value} |`).join('\n')}

## 浼樺厛鎵ц

| 椤甸潰 | 褰撳墠鐘舵€?| 鍒嗘暟 | 涓诲叧閿瘝 | 寤鸿 H1 | 寤鸿 H2 |
| --- | --- | ---: | --- | --- | --- |
${p0.slice(0, 50).map((row) => `| ${row.route} | ${row.audit_status} | ${row.audit_score} | ${row.primary_keyword} | ${row.suggested_h1} | ${row.suggested_h2} |`).join('\n')}

## 鎺ㄥ鍏抽敭璇嶉〉闈㈡牱渚?
| 椤甸潰 | 椤甸潰绫诲瀷 | 涓诲叧閿瘝 | 鎺ㄥ鍏抽敭璇嶇皣 | 涓嬩竴姝?|
| --- | --- | --- | --- | --- |
${inferred.slice(0, 80).map((row) => `| ${row.route} | ${row.page_type} | ${row.primary_keyword} | ${row.target_cluster} | ${row.next_action} |`).join('\n')}
`;

fs.writeFileSync(OUT_MD, md, 'utf8');

console.log(`Wrote ${OUT_CSV}`);
console.log(`Wrote ${OUT_MD}`);
console.log(`SEO keyword targets: ${targets.length} pages.`);
