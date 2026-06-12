import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { todayStamp } from './ntet-seo-utils.mjs';

const DEFAULT_STATIC_DIR = join(process.cwd(), '.next', 'server', 'app');
const staticDir = resolve(process.env.AUDIT_STATIC_DIR || DEFAULT_STATIC_DIR);
const outputDir = join(process.cwd(), 'docs', 'seo');
const stamp = todayStamp();
const markdownPath = join(outputDir, `keyword-landing-audit-${stamp}.md`);
const csvPath = join(outputDir, `keyword-landing-audit-${stamp}.csv`);

const EXCLUDED_ROUTE_PATTERNS = [
  /^\/admin(?:\/|$)/,
  /^\/api(?:\/|$)/,
  /^\/_not-found$/,
  /\/home-rebuild-preview$/,
  /\/thank-you$/,
  /\/products\/product-detail$/,
  /\/preview(?:\/|$)/,
];

function walkHtmlFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const itemPath = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(itemPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [itemPath] : [];
  });
}

function routeFromHtmlFile(filePath) {
  const rel = relative(staticDir, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.html$/i, '');
  const route = `/${withoutExt.replace(/\/index$/i, '')}`;
  return route === '/index' ? '/' : route;
}

function keywordLocaleForRoute(route) {
  if (route === '/es' || route.startsWith('/es/')) return 'es';
  if (route === '/ru' || route.startsWith('/ru/')) return 'ru';
  if (route === '/ar' || route.startsWith('/ar/')) return 'ar';
  return 'en';
}

function isExcludedRoute(route) {
  return EXCLUDED_ROUTE_PATTERNS.some((pattern) => pattern.test(route));
}

function decodeHtml(value = '') {
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(value = '') {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html) {
  return decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
}

function extractMeta(html, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+[^>]*name=["']${escapedName}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i');
  return decodeHtml(html.match(pattern)?.[1] || '').trim();
}

function extractHeadings(html, level) {
  const pattern = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi');
  return Array.from(html.matchAll(pattern), (match) => stripHtml(match[1])).filter(Boolean);
}

function extractBodyText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  return stripHtml(body);
}

function normalizeText(value = '') {
  return decodeHtml(value)
    .toLocaleLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function keywordOccurrences(text, keyword) {
  const haystack = normalizeText(text);
  const needle = normalizeText(keyword);
  if (!haystack || !needle) return 0;
  const boundaryLeft = /^[\p{L}\p{N}]/u.test(needle) ? '(?<![\\p{L}\\p{N}])' : '';
  const boundaryRight = /[\p{L}\p{N}]$/u.test(needle) ? '(?![\\p{L}\\p{N}])' : '';
  const pattern = new RegExp(`${boundaryLeft}${escapeRegex(needle)}${boundaryRight}`, 'gu');
  return Array.from(haystack.matchAll(pattern)).length;
}

function anyKeywordHit(text, keywords) {
  return keywords.some((keyword) => keywordOccurrences(text, keyword) > 0);
}

function splitKeywords(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function countWords(text) {
  const normalized = normalizeText(text);
  if (!normalized) return 0;
  return (normalized.match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*/gu) || []).length;
}

function scorePage(item) {
  let score = 0;
  if (item.keywords.length) score += 15;
  if (item.titleKeywordHit) score += 15;
  if (item.descriptionKeywordHit) score += 15;
  if (item.h1KeywordHit) score += 20;
  if (item.h2KeywordHit) score += 15;
  if (item.bodyKeywordHit) score += 15;
  if (item.keywordDensity >= 0.05 && item.keywordDensity <= 3) score += 5;
  return score;
}

function statusForScore(score) {
  if (score >= 80) return 'strong';
  if (score >= 55) return 'partial';
  return 'weak';
}

function issuesFor(item) {
  const issues = [];
  if (!item.keywords.length) issues.push('缺少 meta keywords');
  if (!item.title) issues.push('缺少 title');
  if (!item.description) issues.push('缺少 meta description');
  if (!item.h1Count) issues.push('缺少 H1');
  if (!item.h2Count) issues.push('缺少 H2');
  if (item.keywords.length && !item.titleKeywordHit) issues.push('title 未命中关键词');
  if (item.keywords.length && !item.descriptionKeywordHit) issues.push('description 未命中关键词');
  if (item.keywords.length && !item.h1KeywordHit) issues.push('H1 未命中关键词');
  if (item.keywords.length && !item.h2KeywordHit) issues.push('H2 未命中关键词');
  if (item.keywords.length && !item.bodyKeywordHit) issues.push('正文未命中精确关键词短语');
  if (item.bodyKeywordHit && item.keywordDensity < 0.05) issues.push('关键词密度偏低');
  if (item.keywordDensity > 3) issues.push('关键词密度偏高，需要检查堆砌风险');
  return issues;
}

function analyzeFile(filePath) {
  const html = readFileSync(filePath, 'utf8');
  const route = routeFromHtmlFile(filePath);
  const title = extractTitle(html);
  const description = extractMeta(html, 'description');
  const keywords = splitKeywords(extractMeta(html, 'keywords'));
  const h1 = extractHeadings(html, 1);
  const h2 = extractHeadings(html, 2);
  const bodyText = extractBodyText(html);
  const bodyWords = countWords(bodyText);
  const bodyKeywordOccurrences = keywords.reduce(
    (total, keyword) => total + keywordOccurrences(bodyText, keyword),
    0
  );
  const keywordDensity = bodyWords ? (bodyKeywordOccurrences / bodyWords) * 100 : 0;

  const item = {
    route,
    keywordLocale: keywordLocaleForRoute(route),
    file: relative(process.cwd(), filePath).replace(/\\/g, '/'),
    title,
    description,
    keywords,
    primaryKeyword: keywords[0] || '',
    h1,
    h2,
    h1Count: h1.length,
    h2Count: h2.length,
    bodyWords,
    bodyKeywordOccurrences,
    keywordDensity,
    titleKeywordHit: anyKeywordHit(title, keywords),
    descriptionKeywordHit: anyKeywordHit(description, keywords),
    h1KeywordHit: anyKeywordHit(h1.join(' | '), keywords),
    h2KeywordHit: anyKeywordHit(h2.join(' | '), keywords),
    bodyKeywordHit: bodyKeywordOccurrences > 0,
  };

  const score = scorePage(item);
  return {
    ...item,
    score,
    status: statusForScore(score),
    issues: issuesFor(item),
  };
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(rows) {
  const headers = [
    'route',
    'keyword_locale',
    'status',
    'score',
    'primary_keyword',
    'keyword_count',
    'title_hit',
    'description_hit',
    'h1_hit',
    'h2_hit',
    'body_hit',
    'body_words',
    'body_keyword_occurrences',
    'keyword_density_pct',
    'h1_count',
    'h2_count',
    'issues',
    'title',
    'description',
    'keywords',
    'h1',
    'h2',
    'file',
  ];

  const lines = [
    headers.join(','),
    ...rows.map((row) => [
      row.route,
      row.keywordLocale,
      row.status,
      row.score,
      row.primaryKeyword,
      row.keywords.length,
      row.titleKeywordHit,
      row.descriptionKeywordHit,
      row.h1KeywordHit,
      row.h2KeywordHit,
      row.bodyKeywordHit,
      row.bodyWords,
      row.bodyKeywordOccurrences,
      row.keywordDensity.toFixed(3),
      row.h1Count,
      row.h2Count,
      row.issues.join('; '),
      row.title,
      row.description,
      row.keywords,
      row.h1,
      row.h2,
      row.file,
    ].map(csvEscape).join(',')),
  ];

  writeFileSync(csvPath, `${lines.join('\n')}\n`, 'utf8');
}

function pct(part, total) {
  return total ? `${((part / total) * 100).toFixed(1)}%` : '0.0%';
}

function checkMark(value) {
  return value ? '是' : '否';
}

function markdownTable(rows) {
  if (!rows.length) return ['无。'];
  return [
    '| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |',
    '| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |',
    ...rows.map((row) => [
      row.route,
      row.keywordLocale,
      row.score,
      checkMark(row.titleKeywordHit),
      checkMark(row.descriptionKeywordHit),
      checkMark(row.h1KeywordHit),
      checkMark(row.h2KeywordHit),
      checkMark(row.bodyKeywordHit),
      `${row.keywordDensity.toFixed(3)}%`,
      row.issues.join('; ') || '无',
    ].map((cell) => String(cell).replace(/\|/g, '\\|')).join(' | ')).map((line) => `| ${line} |`),
  ];
}

function localeSummary(rows) {
  return ['en', 'es', 'ru', 'ar'].flatMap((locale) => {
    const scoped = rows.filter((row) => row.keywordLocale === locale);
    if (!scoped.length) return [];
    const strong = scoped.filter((row) => row.status === 'strong').length;
    const partial = scoped.filter((row) => row.status === 'partial').length;
    const weak = scoped.filter((row) => row.status === 'weak').length;
    return `- ${locale}: strong ${strong}, partial ${partial}, weak ${weak}, total ${scoped.length}`;
  });
}

function writeMarkdown(rows, excludedCount) {
  const total = rows.length;
  const strong = rows.filter((row) => row.status === 'strong').length;
  const partial = rows.filter((row) => row.status === 'partial').length;
  const weak = rows.filter((row) => row.status === 'weak').length;
  const missingKeywords = rows.filter((row) => !row.keywords.length).length;
  const titleHits = rows.filter((row) => row.titleKeywordHit).length;
  const descriptionHits = rows.filter((row) => row.descriptionKeywordHit).length;
  const h1Hits = rows.filter((row) => row.h1KeywordHit).length;
  const h2Hits = rows.filter((row) => row.h2KeywordHit).length;
  const bodyHits = rows.filter((row) => row.bodyKeywordHit).length;
  const noH1 = rows.filter((row) => !row.h1Count).length;
  const noH2 = rows.filter((row) => !row.h2Count).length;
  const weakestRows = [...rows].sort((a, b) => a.score - b.score || a.route.localeCompare(b.route)).slice(0, 40);
  const h1Misses = rows
    .filter((row) => row.keywords.length && !row.h1KeywordHit)
    .sort((a, b) => a.score - b.score || a.route.localeCompare(b.route))
    .slice(0, 30);
  const h2Misses = rows
    .filter((row) => row.keywords.length && !row.h2KeywordHit)
    .sort((a, b) => a.score - b.score || a.route.localeCompare(b.route))
    .slice(0, 30);
  const bodyMisses = rows
    .filter((row) => row.keywords.length && !row.bodyKeywordHit)
    .sort((a, b) => a.score - b.score || a.route.localeCompare(b.route))
    .slice(0, 30);

  const report = [
    '# 页面关键词落地审计',
    '',
    `生成日期：${stamp}`,
    `数据来源：${relative(process.cwd(), staticDir).replace(/\\/g, '/') || staticDir}`,
    `完整明细 CSV：${relative(process.cwd(), csvPath).replace(/\\/g, '/')}`,
    '',
    '## 审计范围',
    '',
    `- 已审计公开静态 HTML 页面：${total}`,
    `- 已排除非 SEO / 后台 / thank-you / preview 等页面：${excludedCount}`,
    '- 关键词来源：每个页面渲染后的 `<meta name="keywords">`。',
    '- 本地化规则：`/es` 页面按西语 meta keywords 检查，`/ru` 页面按俄语 meta keywords 检查，其余页面按英文关键词检查。',
    '- 匹配方式：精确短语匹配，忽略大小写，并做基础词边界处理。',
    '- 密度口径：正文中精确关键词短语出现次数 / 每 100 个正文词。',
    '',
    '## 总览',
    '',
    `- 强页面：${strong}（${pct(strong, total)}）`,
    `- 部分落地页面：${partial}（${pct(partial, total)}）`,
    `- 弱页面：${weak}（${pct(weak, total)}）`,
    `- 缺少 meta keywords 的页面：${missingKeywords}`,
    `- 缺少 H1 的页面：${noH1}`,
    `- 缺少 H2 的页面：${noH2}`,
    `- Title 命中关键词：${titleHits}/${total}（${pct(titleHits, total)}）`,
    `- Description 命中关键词：${descriptionHits}/${total}（${pct(descriptionHits, total)}）`,
    `- H1 命中关键词：${h1Hits}/${total}（${pct(h1Hits, total)}）`,
    `- H2 命中关键词：${h2Hits}/${total}（${pct(h2Hits, total)}）`,
    `- 正文精确关键词短语命中：${bodyHits}/${total}（${pct(bodyHits, total)}）`,
    '',
    '## 语言分布',
    '',
    ...localeSummary(rows),
    '',
    '## 怎么看这份报告',
    '',
    '- `Title` 和 `Description` 命中，表示页面基础 metadata 是否承接了至少一个目标关键词短语。',
    '- `H1` 和 `H2` 命中，表示用户可见的语义标题是否承接目标关键词。',
    '- `正文` 命中采用较严格的精确短语判断。未命中不代表页面完全不相关，但代表当前目标关键词没有明确落到正文里。',
    '- 关键词密度要按页面类型判断。本审计把精确短语密度低于 0.05% 视为落地偏薄，高于 3% 视为可能存在堆词风险。',
    '',
    '## 最弱页面',
    '',
    ...markdownTable(weakestRows),
    '',
    '## H1 未命中关键词页面',
    '',
    ...markdownTable(h1Misses),
    '',
    '## H2 未命中关键词页面',
    '',
    ...markdownTable(h2Misses),
    '',
    '## 正文未命中精确关键词短语页面',
    '',
    ...markdownTable(bodyMisses),
    '',
    '## 接下来怎么改',
    '',
    '优先处理同时存在 `H1 未命中` 和 `正文未命中` 的页面。修改时不要机械重复关键词，而是把目标关键词自然放进 H1/H2，以及一段能说明场景价值的正文或列表项。',
    '',
    '建议顺序：',
    '',
    '1. 先改英文重点方案页和栏目页，因为这些页面最接近 Google Ads / SEO 目标词。',
    '2. 每页只选 1 个主关键词、2-4 个辅助关键词，避免把所有 keywords 都塞进标题。',
    '3. H1 使用“主关键词 + 页面对象/场景”，例如 `Power Line UAV Inspection Solution for Utility Operators`。',
    '4. H2 使用“辅助关键词 + 模块含义”，例如把 `Overview` 改成 `UAV Inspection Workflow for Power Lines`。',
    '5. 正文增加 1-2 句自然说明，控制精确短语出现 1-3 次即可。',
    '6. 修改后重新运行 `npm run build` 和 `npm run audit:keywords`，确认 H1/H2/正文命中率提升。',
  ];

  writeFileSync(markdownPath, `${report.join('\n')}\n`, 'utf8');
}

if (!existsSync(staticDir)) {
  console.error(`Static app directory not found: ${staticDir}`);
  console.error('Run `npm run build` first, or set AUDIT_STATIC_DIR to a built .next/server/app directory.');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const allHtmlFiles = walkHtmlFiles(staticDir);
const publicFiles = allHtmlFiles.filter((filePath) => !isExcludedRoute(routeFromHtmlFile(filePath)));
const rows = publicFiles.map(analyzeFile).sort((a, b) => a.route.localeCompare(b.route));
const excludedCount = allHtmlFiles.length - publicFiles.length;

writeCsv(rows);
writeMarkdown(rows, excludedCount);

const weakCount = rows.filter((row) => row.status === 'weak').length;
const partialCount = rows.filter((row) => row.status === 'partial').length;
const strongCount = rows.filter((row) => row.status === 'strong').length;

console.log(`Wrote ${markdownPath}`);
console.log(`Wrote ${csvPath}`);
console.log(`Keyword landing audit: ${strongCount} strong, ${partialCount} partial, ${weakCount} weak.`);
