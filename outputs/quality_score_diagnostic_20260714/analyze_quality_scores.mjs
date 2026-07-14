import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/quality_score_diagnostic_20260714";
const files = {
  current: "C:/Users/admin/Downloads/搜索关键字报告 (1).csv",
  prior17: "C:/Users/admin/Downloads/搜索关键字报告 (17).xlsx",
  prior18: "C:/Users/admin/Downloads/搜索关键字报告 (18).xlsx",
};

function rowsToCsv(rows) {
  return rows.map((row) => row.map((value) => {
    const s = String(value ?? "");
    return /[",\r\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
  }).join(",")).join("\n");
}

function normalizeText(value) {
  return String(value ?? "").trim().replace(/^"+|"+$/g, "").replace(/\s+/g, " ").toLowerCase();
}

function parseNumber(value) {
  const s = String(value ?? "").trim().replaceAll(",", "").replaceAll("%", "");
  if (!s || s === "--" || s === "—" || s === "-") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function isMissing(value) {
  const s = String(value ?? "").trim();
  return !s || s === "--" || s === "—" || s === "-";
}

function findHeaderRow(values) {
  return values.findIndex((row) => row.some((v) => String(v ?? "").trim() === "关键字"));
}

function getReport(values, sourceName) {
  const headerRow = findHeaderRow(values);
  if (headerRow < 0) throw new Error(`Header not found: ${sourceName}`);
  const headers = values[headerRow].map((v) => String(v ?? "").trim());
  const rows = values.slice(headerRow + 1).filter((row) => {
    const keywordIndex = headers.indexOf("关键字");
    const keyword = String(row[keywordIndex] ?? "").trim();
    return keyword && !keyword.startsWith("总计");
  });
  const meta = values.slice(0, headerRow).flat().filter((v) => String(v ?? "").trim()).map(String);
  return { sourceName, meta, headers, rows };
}

async function loadCurrent() {
  const buffer = await fs.readFile(files.current);
  const raw = buffer[0] === 0xff && buffer[1] === 0xfe
    ? new TextDecoder("utf-16le").decode(buffer.subarray(2))
    : new TextDecoder("utf-8").decode(buffer);
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/);
  const titleRows = lines.slice(0, 2).map((line) => [line]);
  const tabRows = lines.slice(2).filter((line) => line.length).map((line) => line.split("\t"));
  const normalizedCsv = rowsToCsv([...titleRows, ...tabRows]);
  const workbook = await Workbook.fromCSV(normalizedCsv, { sheetName: "Current" });
  const inspect = await workbook.inspect({ kind: "table", sheetId: "Current", range: "A1:AK8", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 37, maxChars: 10000 });
  return { report: getReport([...titleRows, ...tabRows], "current"), inspect: Boolean(inspect.ndjson) };
}

async function loadXlsx(path, sourceName) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
  const sheet = workbook.worksheets.getItemAt(0);
  const used = sheet.getUsedRange().values;
  const inspect = await workbook.inspect({ kind: "table", sheetId: sheet.name, range: "A1:AK8", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 37, maxChars: 10000 });
  return { report: getReport(used, sourceName), inspect: Boolean(inspect.ndjson), sheetName: sheet.name };
}

function summarize(report) {
  const h = Object.fromEntries(report.headers.map((name, index) => [name, index]));
  const metrics = ["质量得分", "质量得分（历史）", "着陆页体验", "着陆页体验（历史）", "广告相关性", "广告相关性（历史）", "预期点击率", "预期点击率（历史）"];
  const summary = { source: report.sourceName, meta: report.meta, rows: report.rows.length, columns: report.headers.length, metricCoverage: {}, impressions: 0, clicks: 0 };
  for (const metric of metrics) {
    const i = h[metric];
    if (i == null) continue;
    const present = report.rows.filter((row) => !isMissing(row[i]));
    const values = present.map((row) => parseNumber(row[i])).filter((v) => v != null);
    summary.metricCoverage[metric] = {
      present: present.length,
      rate: report.rows.length ? present.length / report.rows.length : 0,
      average: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null,
      distribution: Object.fromEntries([...new Set(present.map((row) => String(row[i]).trim()))].sort().map((v) => [v, present.filter((row) => String(row[i]).trim() === v).length])),
    };
  }
  for (const row of report.rows) {
    summary.impressions += parseNumber(row[h["展示次数"]]) ?? 0;
    summary.clicks += parseNumber(row[h["点击次数"]]) ?? 0;
  }
  return summary;
}

function rowKey(report, row) {
  const h = Object.fromEntries(report.headers.map((name, index) => [name, index]));
  return ["广告系列", "广告组", "关键字", "匹配类型"].map((name) => normalizeText(row[h[name]])).join("|");
}

function compare(current, prior) {
  const hc = Object.fromEntries(current.headers.map((name, index) => [name, index]));
  const hp = Object.fromEntries(prior.headers.map((name, index) => [name, index]));
  const priorMap = new Map(prior.rows.map((row) => [rowKey(prior, row), row]));
  const matched = [];
  for (const row of current.rows) {
    const priorRow = priorMap.get(rowKey(current, row));
    if (!priorRow) continue;
    const record = {
      campaign: row[hc["广告系列"]],
      adGroup: row[hc["广告组"]],
      keyword: row[hc["关键字"]],
      matchType: row[hc["匹配类型"]],
      currentImpressions: parseNumber(row[hc["展示次数"]]) ?? 0,
      currentClicks: parseNumber(row[hc["点击次数"]]) ?? 0,
    };
    for (const metric of ["质量得分", "质量得分（历史）", "着陆页体验", "着陆页体验（历史）", "广告相关性", "广告相关性（历史）", "预期点击率", "预期点击率（历史）"]) {
      record[`current_${metric}`] = hc[metric] == null ? null : (isMissing(row[hc[metric]]) ? null : String(row[hc[metric]]).trim());
      record[`prior_${metric}`] = hp[metric] == null ? null : (isMissing(priorRow[hp[metric]]) ? null : String(priorRow[hp[metric]]).trim());
    }
    matched.push(record);
  }
  return { prior: prior.sourceName, matched: matched.length, currentRows: current.rows.length, priorRows: prior.rows.length, records: matched };
}

function qualityMovement(comparison) {
  const dimensions = ["质量得分", "质量得分（历史）", "着陆页体验", "着陆页体验（历史）", "广告相关性", "广告相关性（历史）", "预期点击率", "预期点击率（历史）"];
  const result = {};
  for (const metric of dimensions) {
    let both = 0, same = 0, improved = 0, worsened = 0, currentOnly = 0, priorOnly = 0, neither = 0;
    const examples = [];
    for (const row of comparison.records) {
      const c = row[`current_${metric}`];
      const p = row[`prior_${metric}`];
      if (c != null && p != null) {
        both += 1;
        if (metric.includes("质量得分")) {
          const cn = Number(c), pn = Number(p);
          if (cn > pn) improved += 1;
          else if (cn < pn) worsened += 1;
          else same += 1;
        } else {
          const rank = { "低于平均水平": 0, "平均水平": 1, "高于平均水平": 2 };
          if (rank[c] > rank[p]) improved += 1;
          else if (rank[c] < rank[p]) worsened += 1;
          else same += 1;
        }
        if (c !== p && examples.length < 10) examples.push({ keyword: row.keyword, campaign: row.campaign, prior: p, current: c, impressions: row.currentImpressions, clicks: row.currentClicks });
      } else if (c != null) currentOnly += 1;
      else if (p != null) priorOnly += 1;
      else neither += 1;
    }
    result[metric] = { both, same, improved, worsened, currentOnly, priorOnly, neither, examples };
  }
  return result;
}

function scoredDetail(report) {
  const h = Object.fromEntries(report.headers.map((name, index) => [name, index]));
  return report.rows.filter((row) => !isMissing(row[h["质量得分"]])).map((row) => ({
    campaign: String(row[h["广告系列"]] ?? ""),
    adGroup: String(row[h["广告组"]] ?? ""),
    keyword: String(row[h["关键字"]] ?? ""),
    matchType: String(row[h["匹配类型"]] ?? ""),
    finalUrl: String(row[h["最终到达网址"]] ?? ""),
    qualityScore: parseNumber(row[h["质量得分"]]),
    landingPage: String(row[h["着陆页体验"]] ?? ""),
    adRelevance: String(row[h["广告相关性"]] ?? ""),
    expectedCtr: String(row[h["预期点击率"]] ?? ""),
    impressions: parseNumber(row[h["展示次数"]]) ?? 0,
    clicks: parseNumber(row[h["点击次数"]]) ?? 0,
    cost: parseNumber(row[h["费用"]]) ?? 0,
  }));
}

function trafficDetail(report) {
  const h = Object.fromEntries(report.headers.map((name, index) => [name, index]));
  return report.rows.map((row) => ({
    campaign: String(row[h["广告系列"]] ?? ""),
    adGroup: String(row[h["广告组"]] ?? ""),
    keyword: String(row[h["关键字"]] ?? ""),
    matchType: String(row[h["匹配类型"]] ?? ""),
    finalUrl: String(row[h["最终到达网址"]] ?? ""),
    qualityScore: isMissing(row[h["质量得分"]]) ? null : parseNumber(row[h["质量得分"]]),
    landingPage: isMissing(row[h["着陆页体验"]]) ? null : String(row[h["着陆页体验"]]),
    adRelevance: isMissing(row[h["广告相关性"]]) ? null : String(row[h["广告相关性"]]),
    expectedCtr: isMissing(row[h["预期点击率"]]) ? null : String(row[h["预期点击率"]]),
    impressions: parseNumber(row[h["展示次数"]]) ?? 0,
    clicks: parseNumber(row[h["点击次数"]]) ?? 0,
    cost: parseNumber(row[h["费用"]]) ?? 0,
  })).filter((row) => row.impressions > 0 || row.clicks > 0).sort((a,b)=>b.clicks-a.clicks || b.impressions-a.impressions);
}

function aggregateScored(rows, field) {
  const groups = new Map();
  for (const row of rows) {
    const key = row[field] || "(blank)";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return [...groups.entries()].map(([key, items]) => ({
    key,
    scoredKeywords: items.length,
    impressions: items.reduce((sum, row) => sum + row.impressions, 0),
    clicks: items.reduce((sum, row) => sum + row.clicks, 0),
    averageQualityScore: items.reduce((sum, row) => sum + row.qualityScore, 0) / items.length,
    qualityDistribution: Object.fromEntries([...new Set(items.map((row) => row.qualityScore))].sort((a,b)=>a-b).map((v) => [v, items.filter((row) => row.qualityScore === v).length])),
    adRelevance: Object.fromEntries([...new Set(items.map((row) => row.adRelevance))].sort().map((v) => [v, items.filter((row) => row.adRelevance === v).length])),
    expectedCtr: Object.fromEntries([...new Set(items.map((row) => row.expectedCtr))].sort().map((v) => [v, items.filter((row) => row.expectedCtr === v).length])),
    landingPage: Object.fromEntries([...new Set(items.map((row) => row.landingPage))].sort().map((v) => [v, items.filter((row) => row.landingPage === v).length])),
    sampleKeywords: items.slice().sort((a,b)=>b.impressions-a.impressions).slice(0,8).map((row)=>({keyword:row.keyword,qualityScore:row.qualityScore,impressions:row.impressions,clicks:row.clicks})),
  })).sort((a,b)=>b.scoredKeywords-a.scoredKeywords || b.impressions-a.impressions);
}

const [currentLoaded, prior17Loaded, prior18Loaded] = await Promise.all([
  loadCurrent(),
  loadXlsx(files.prior17, "prior17"),
  loadXlsx(files.prior18, "prior18"),
]);

const current = currentLoaded.report;
const prior17 = prior17Loaded.report;
const prior18 = prior18Loaded.report;
const comparison17 = compare(current, prior17);
const comparison18 = compare(current, prior18);
const currentScored = scoredDetail(current);
const prior30Scored = scoredDetail(prior17);
const currentTraffic = trafficDetail(current);
const result = {
  files,
  inspected: { current: currentLoaded.inspect, prior17: prior17Loaded.inspect, prior18: prior18Loaded.inspect },
  summaries: [summarize(current), summarize(prior17), summarize(prior18)],
  comparisons: {
    prior17: { ...comparison17, movements: qualityMovement(comparison17), records: undefined },
    prior18: { ...comparison18, movements: qualityMovement(comparison18), records: undefined },
  },
  matchedRecords: { prior17: comparison17.records, prior18: comparison18.records },
  currentScored,
  currentTraffic,
  currentBreakdowns: {
    byFinalUrl: aggregateScored(currentScored, "finalUrl"),
    byAdGroup: aggregateScored(currentScored, "adGroup"),
    byCampaign: aggregateScored(currentScored, "campaign"),
  },
  prior30Breakdowns: {
    byFinalUrl: aggregateScored(prior30Scored, "finalUrl"),
  },
};

await fs.writeFile(`${outDir}/analysis.json`, JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify({ summaries: result.summaries, comparisons: result.comparisons, currentBreakdowns: result.currentBreakdowns }, null, 2));
