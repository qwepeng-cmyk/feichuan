import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/quality_score_diagnostic_20260714";
const files = {
  current: "C:/Users/admin/Downloads/\u641c\u7d22\u5173\u952e\u5b57\u62a5\u544a (1).csv",
  prior7: "C:/Users/admin/Downloads/\u641c\u7d22\u5173\u952e\u5b57\u62a5\u544a (18).xlsx",
  prior30: "C:/Users/admin/Downloads/\u641c\u7d22\u5173\u952e\u5b57\u62a5\u544a (17).xlsx",
};

const H = {
  keyword: "\u5173\u952e\u5b57",
  matchType: "\u5339\u914d\u7c7b\u578b",
  campaign: "\u5e7f\u544a\u7cfb\u5217",
  adGroup: "\u5e7f\u544a\u7ec4",
  impressions: "\u5c55\u793a\u6b21\u6570",
  clicks: "\u70b9\u51fb\u6b21\u6570",
  searchIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u83b7\u5f97\u7684\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  lostRankIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u56e0\u8bc4\u7ea7\u800c\u9519\u5931\u7684\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  topIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u83b7\u5f97\u7684\u9875\u9996\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  absTopIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e0a\u83b7\u5f97\u7684\u7edd\u5bf9\u9876\u90e8\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  lostTopRankIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u56e0\u8bc4\u7ea7\u800c\u9519\u5931\u7684\u9875\u9996\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  lostAbsTopRankIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u56e0\u8bc4\u7ea7\u800c\u9519\u5931\u7684\u7edd\u5bf9\u9875\u9996\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  exactMatchIS: "\u5728\u641c\u7d22\u7f51\u7edc\u4e2d\u83b7\u5f97\u7684\u5b8c\u5168\u5339\u914d\u5c55\u793a\u6b21\u6570\u4efd\u989d",
  clickShare: "\u70b9\u51fb\u6b21\u6570\u4efd\u989d",
};

const shareFields = [
  "searchIS", "lostRankIS", "topIS", "absTopIS",
  "lostTopRankIS", "lostAbsTopRankIS", "exactMatchIS", "clickShare",
];

function text(value) {
  return String(value ?? "").trim();
}

function number(value) {
  const s = text(value).replaceAll(",", "");
  if (!s || /^(--|—|-)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function percent(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    const n = value >= 0 && value <= 1 ? value * 100 : value;
    return { raw: `${n.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}%`, op: "", value: n, midpoint: n };
  }
  const raw = text(value).replaceAll(" ", "");
  if (!raw || /^(--|—|-)$/.test(raw)) return null;
  const match = raw.match(/^([<>≤≥]?)([0-9.]+)%$/);
  if (!match) return null;
  const n = Number(match[2]);
  if (!Number.isFinite(n)) return null;
  const op = match[1];
  const midpoint = op === "<" || op === "≤" ? n / 2 : op === ">" || op === "≥" ? (n + 100) / 2 : n;
  return { raw, op, value: n, midpoint };
}

function formattedPercent(value) {
  return percent(value)?.raw ?? null;
}

function reportFromValues(values, source) {
  const headerRow = values.findIndex((row) => row.some((cell) => text(cell) === H.keyword));
  if (headerRow < 0) throw new Error(`Header not found for ${source}`);
  const headers = values[headerRow].map(text);
  const index = Object.fromEntries(headers.map((name, i) => [name, i]));
  const rows = values.slice(headerRow + 1)
    .filter((row) => text(row[index[H.keyword]]) && !text(row[index[H.keyword]]).startsWith("\u603b\u8ba1"))
    .map((row) => Object.fromEntries(headers.map((name, i) => [name, row[i] ?? ""])));
  const meta = values.slice(0, headerRow).flat().map(text).filter(Boolean);
  return { source, headers, meta, rows };
}

async function loadCurrent() {
  const buffer = await fs.readFile(files.current);
  const raw = buffer[0] === 0xff && buffer[1] === 0xfe
    ? new TextDecoder("utf-16le").decode(buffer.subarray(2))
    : new TextDecoder("utf-8").decode(buffer);
  const values = raw.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.length).map((line) => line.split("\t"));
  return reportFromValues(values, "current");
}

async function loadXlsx(path, source) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
  const sheet = workbook.worksheets.getItemAt(0);
  const inspect = await workbook.inspect({
    kind: "table",
    sheetId: sheet.name,
    range: "A1:AK6",
    include: "values,formulas",
    tableMaxRows: 6,
    tableMaxCols: 37,
    maxChars: 6000,
  });
  if (!inspect.ndjson) throw new Error(`Inspection failed for ${source}`);
  return reportFromValues(sheet.getUsedRange().values, source);
}

function weightedPercent(rows, field) {
  let weighted = 0;
  let weight = 0;
  let thresholdRows = 0;
  for (const row of rows) {
    const p = percent(row[H[field]]);
    const impressions = number(row[H.impressions]) ?? 0;
    if (!p || impressions <= 0) continue;
    weighted += p.midpoint * impressions;
    weight += impressions;
    if (p.op) thresholdRows += 1;
  }
  return weight ? { value: weighted / weight, coveredImpressions: weight, thresholdRows } : null;
}

function auctionWeightedPercent(rows, field) {
  let weighted = 0;
  let eligible = 0;
  let actualImpressions = 0;
  let thresholdRows = 0;
  for (const row of rows) {
    const searchShare = percent(row[H.searchIS]);
    const target = percent(row[H[field]]);
    const impressions = number(row[H.impressions]) ?? 0;
    if (!searchShare || !target || impressions <= 0 || searchShare.midpoint <= 0) continue;
    const estimatedEligible = impressions / (searchShare.midpoint / 100);
    eligible += estimatedEligible;
    actualImpressions += impressions;
    weighted += target.midpoint * estimatedEligible;
    if (searchShare.op || target.op) thresholdRows += 1;
  }
  return eligible ? {
    value: weighted / eligible,
    coveredImpressions: actualImpressions,
    estimatedEligibleImpressions: eligible,
    thresholdRows,
  } : null;
}

function summarizeGroup(rows, key, periodImpressions) {
  const metrics = Object.fromEntries(shareFields.map((field) => [field, weightedPercent(rows, field)]));
  const auctionMetrics = {
    searchIS: auctionWeightedPercent(rows, "searchIS"),
    lostRankIS: auctionWeightedPercent(rows, "lostRankIS"),
  };
  const impressions = rows.reduce((sum, row) => sum + (number(row[H.impressions]) ?? 0), 0);
  const clicks = rows.reduce((sum, row) => sum + (number(row[H.clicks]) ?? 0), 0);
  return {
    key,
    keywords: rows.length,
    impressions,
    impressionMix: periodImpressions ? impressions / periodImpressions : 0,
    clicks,
    ctr: impressions ? clicks / impressions : 0,
    metrics,
    auctionMetrics,
  };
}

function groupBy(rows, field, totalImpressions) {
  const map = new Map();
  for (const row of rows) {
    const key = text(row[H[field]]) || "(blank)";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return [...map.entries()]
    .map(([key, group]) => summarizeGroup(group, key, totalImpressions))
    .filter((group) => group.impressions > 0)
    .sort((a, b) => b.impressions - a.impressions);
}

function groupByCampaignAdGroup(rows, totalImpressions) {
  const map = new Map();
  for (const row of rows) {
    const campaign = text(row[H.campaign]) || "(blank)";
    const adGroup = text(row[H.adGroup]) || "(blank)";
    const key = `${campaign} | ${adGroup}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return [...map.entries()]
    .map(([key, group]) => summarizeGroup(group, key, totalImpressions))
    .filter((group) => group.impressions > 0)
    .sort((a, b) => b.impressions - a.impressions);
}

function metricCoverage(rows, field, totalImpressions) {
  const presentRows = rows.filter((row) => percent(row[H[field]]) != null);
  const coveredImpressions = presentRows.reduce((sum, row) => sum + (number(row[H.impressions]) ?? 0), 0);
  const thresholds = {};
  for (const row of presentRows) {
    const p = percent(row[H[field]]);
    if (p?.op) thresholds[p.raw] = (thresholds[p.raw] ?? 0) + 1;
  }
  return {
    presentRows: presentRows.length,
    rowRate: rows.length ? presentRows.length / rows.length : 0,
    coveredImpressions,
    impressionRate: totalImpressions ? coveredImpressions / totalImpressions : 0,
    thresholds,
    weighted: weightedPercent(rows, field),
  };
}

function keywordDetail(rows) {
  return rows
    .filter((row) => (number(row[H.impressions]) ?? 0) > 0)
    .map((row) => ({
      keyword: text(row[H.keyword]),
      matchType: text(row[H.matchType]),
      campaign: text(row[H.campaign]),
      adGroup: text(row[H.adGroup]),
      impressions: number(row[H.impressions]) ?? 0,
      clicks: number(row[H.clicks]) ?? 0,
      searchIS: formattedPercent(row[H.searchIS]),
      lostRankIS: formattedPercent(row[H.lostRankIS]),
      topIS: formattedPercent(row[H.topIS]),
      absTopIS: formattedPercent(row[H.absTopIS]),
      lostTopRankIS: formattedPercent(row[H.lostTopRankIS]),
      lostAbsTopRankIS: formattedPercent(row[H.lostAbsTopRankIS]),
      exactMatchIS: formattedPercent(row[H.exactMatchIS]),
      clickShare: formattedPercent(row[H.clickShare]),
    }))
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

function summarize(report) {
  const totalImpressions = report.rows.reduce((sum, row) => sum + (number(row[H.impressions]) ?? 0), 0);
  const totalClicks = report.rows.reduce((sum, row) => sum + (number(row[H.clicks]) ?? 0), 0);
  const coverage = Object.fromEntries(shareFields.map((field) => [field, metricCoverage(report.rows, field, totalImpressions)]));
  return {
    source: report.source,
    meta: report.meta,
    rows: report.rows.length,
    totalImpressions,
    totalClicks,
    ctr: totalImpressions ? totalClicks / totalImpressions : 0,
    coverage,
    auctionMetrics: {
      searchIS: auctionWeightedPercent(report.rows, "searchIS"),
      lostRankIS: auctionWeightedPercent(report.rows, "lostRankIS"),
    },
    byCampaign: groupBy(report.rows, "campaign", totalImpressions),
    byAdGroup: groupBy(report.rows, "adGroup", totalImpressions),
    byCampaignAdGroup: groupByCampaignAdGroup(report.rows, totalImpressions),
    byMatchType: groupBy(report.rows, "matchType", totalImpressions),
    keywordDetail: keywordDetail(report.rows),
  };
}

const [current, prior7, prior30] = await Promise.all([
  loadCurrent(),
  loadXlsx(files.prior7, "prior7"),
  loadXlsx(files.prior30, "prior30"),
]);

const result = {
  generatedAt: new Date().toISOString(),
  files,
  metricMethod: "Keyword-level percentages are summarized as impression-weighted directional indicators. Threshold values use midpoint estimates (<10%=5%, >90%=95%). These are not substitutes for Google Ads campaign-level impression share.",
  periods: [summarize(current), summarize(prior7), summarize(prior30)],
};

await fs.writeFile(`${outDir}/impression_share_analysis.json`, JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result.periods.map((p) => ({
  source: p.source,
  meta: p.meta,
  impressions: p.totalImpressions,
  clicks: p.totalClicks,
  coverage: Object.fromEntries(shareFields.map((field) => [field, p.coverage[field]])),
  matchTypes: p.byMatchType,
  topCampaigns: p.byCampaign.slice(0, 12),
})), null, 2));
