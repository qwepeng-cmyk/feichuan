import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/purchase_intent_campaigns_20260716";
const sourceCsv = "C:/Users/admin/Downloads/搜索关键字报告 (3).csv";
const templateDir = "D:/fc-cuas/ads/广告上传模板";
const label = "PURCHASE_INTENT_20260716";

const campaignConfigs = [
  { campaign: "C-UAS 英语区 采购意图 词组", region: "英语区", type: "Phrase match" },
  { campaign: "C-UAS 英语区 采购意图 精准", region: "英语区", type: "Exact match" },
  { campaign: "C-UAS 南美 采购意图 词组", region: "南美", type: "Phrase match" },
  { campaign: "C-UAS 南美 采购意图 精准", region: "南美", type: "Exact match" },
  { campaign: "C-UAS 中东 采购意图 词组", region: "中东", type: "Phrase match" },
  { campaign: "C-UAS 中东 采购意图 精准", region: "中东", type: "Exact match" },
];

const groupConfigs = [
  { key: "defender", adGroup: "Drone Defender Procurement", fallback: "Drone Defender", url: "https://n-tet.com/solutions/drone-defender", path1: "defender", path2: "quote" },
  { key: "detector", adGroup: "Drone Detector Procurement", fallback: "Drone Detector", url: "https://n-tet.com/solutions/drone-detector", path1: "detector", path2: "quote" },
  { key: "system", adGroup: "Anti Drone System Procurement", fallback: "Anti Drone System", url: "https://n-tet.com/solutions/low-altitude-airspace-monitoring", path1: "cuas-system", path2: "quote" },
  { key: "equipment", adGroup: "Anti Drone Equipment Procurement", fallback: "Anti Drone Equipment", url: "https://n-tet.com/solutions/low-altitude-airspace-monitoring", path1: "equipment", path2: "supplier" },
  { key: "locator", adGroup: "Drone Locator Procurement", fallback: "Drone Locator", url: "https://n-tet.com/solutions/drone-locator", path1: "locator", path2: "quote" },
  { key: "jammer", adGroup: "Drone Jammer Procurement", fallback: "Drone Jammer", url: "https://n-tet.com/solutions/drone-jammer", path1: "drone-jammer", path2: "quote" },
  { key: "shield", adGroup: "Drone Shield Procurement", fallback: "Drone Shield", url: "https://n-tet.com/solutions/drone-shield", path1: "drone-shield", path2: "quote" },
  { key: "c-uas", adGroup: "C-UAS Procurement", fallback: "C-UAS System", url: "https://n-tet.com/solutions/low-altitude-airspace-monitoring", path1: "cuas", path2: "supplier" },
  { key: "radar", adGroup: "Drone Radar Procurement", fallback: "Drone Radar", url: "https://n-tet.com/solutions/drone-radar-detection", path1: "drone-radar", path2: "quote" },
];
const configByKey = new Map(groupConfigs.map((item) => [item.key, item]));

const purchasePattern = /\b(price|pricing|manufacturer|manufacturers|supplier|suppliers|for sale|buy|procurement|provider|providers|cost|quote|quotation|vendor|vendors|factory|factories|distributor|distributors|purchase|purchasing)\b/i;
const forbiddenPattern = /\b(blocker|blocking|jamming|spoofing|deception|weapon|weapons|gun|guns|shoot down|destroy|neutraliz(?:e|es|ed|ing|ation)|forced landing|return to home|intercept(?:ion|s|ed|ing)?)\b/i;
const regionMismatchPattern = /\b(?:in|near)\s+(?:vietnam)\b/i;

function parseTsvLine(line) {
  const cells = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (char === "\t" && !quoted) {
      cells.push(value);
      value = "";
    } else value += char;
  }
  cells.push(value);
  return cells;
}

function normalizeKeyword(value) {
  return String(value ?? "")
    .trim()
    .replace(/^\[|\]$/g, "")
    .replace(/^"|"$/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function classifyKeyword(keyword) {
  if (/\bradar\b/i.test(keyword)) return "radar";
  if (/\b(?:locator|location tracker|drone tracker)\b/i.test(keyword)) return "locator";
  if (/\bdefenders?\b/i.test(keyword)) return "defender";
  if (/\bshield\b/i.test(keyword)) return "shield";
  if (/\bjammer\b/i.test(keyword)) return "jammer";
  if (/\b(?:equipment|device)\b/i.test(keyword)) return "equipment";
  if (/\bsystems?\b/i.test(keyword)) return "system";
  if (/\b(?:detectors?|detection)\b/i.test(keyword)) return "detector";
  if (/\b(?:c[- ]?uas|cuas|counter[- ]?uas|counter[- ]?uav|anti[- ]?uav)\b/i.test(keyword)) return "c-uas";
  if (/\b(?:anti[- ]?drone|counter[- ]?drone)\b/i.test(keyword)) return "equipment";
  return null;
}

function renderedDki(value) {
  return String(value).replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

function makeAssets(fallback) {
  const dki = `{KeyWord:${fallback}}`;
  return {
    headlines: [
      dki,
      `Buy ${dki}`,
      `${dki} Price`,
      `${dki} Quote`,
      `${dki} Supplier`,
      `N-TET ${dki}`,
      `Get ${dki}`,
      `${dki} Options`,
      `${dki} Cost`,
      `${dki} Factory`,
      `Pro ${dki}`,
      `${dki} Export`,
      `${dki} Project`,
      `${dki} Support`,
      `${dki} Provider`,
    ],
    descriptions: [
      `Request pricing for ${dki} and discuss your project requirements.`,
      `Compare ${dki} options for sites, facilities and authorized projects.`,
      `Contact N-TET for ${dki} supply, documentation and deployment support.`,
      `Get a project quote for ${dki} with supplier and deployment support.`,
    ],
  };
}

const raw = await fs.readFile(sourceCsv);
const decoded = new TextDecoder("utf-16le").decode(raw).replace(/^\uFEFF/, "");
const lines = decoded.split(/\r?\n/).filter((line) => line.length > 0);
if (lines.length < 4) throw new Error("Source CSV has too few rows");
const csvHeaders = parseTsvLine(lines[2]);
const csvIndex = new Map(csvHeaders.map((header, i) => [header, i]));
for (const header of ["关键字", "匹配类型", "广告系列", "广告组", "最终到达网址"]) {
  if (!csvIndex.has(header)) throw new Error(`Source CSV missing header: ${header}`);
}
const sourceRows = lines.slice(3).map(parseTsvLine).filter((row) => row.some((value) => value !== ""));

const candidateMap = new Map();
const excluded = [];
for (const row of sourceRows) {
  const keyword = normalizeKeyword(row[csvIndex.get("关键字")]);
  if (!keyword || !purchasePattern.test(keyword)) continue;
  if (forbiddenPattern.test(keyword)) {
    excluded.push({ keyword, reason: "restricted active-capability term" });
    continue;
  }
  if (regionMismatchPattern.test(keyword)) {
    excluded.push({ keyword, reason: "country-specific mismatch for shared regional upload" });
    continue;
  }
  const key = classifyKeyword(keyword);
  if (!key) {
    excluded.push({ keyword, reason: "not mapped to requested device roots" });
    continue;
  }
  const dedupeKey = `${key}\u0000${keyword}`;
  if (!candidateMap.has(dedupeKey)) {
    candidateMap.set(dedupeKey, {
      key,
      keyword,
      origin: "existing account",
      sourceCampaign: String(row[csvIndex.get("广告系列")] ?? ""),
      sourceAdGroup: String(row[csvIndex.get("广告组")] ?? ""),
    });
  }
}

const supplementalByKey = {
  defender: ["drone defender price", "drone defender manufacturer", "drone defender supplier", "drone defender for sale", "buy drone defender", "drone defender procurement", "drone defender provider"],
  detector: ["drone detector price", "drone detector manufacturer", "drone detector supplier", "drone detector for sale", "buy drone detector", "drone detector procurement", "drone detector provider"],
  system: ["anti drone system price", "anti drone system manufacturer", "anti drone system supplier", "anti drone system for sale", "buy anti drone system", "anti drone system procurement", "anti drone system provider"],
  equipment: ["anti drone equipment price", "anti drone equipment manufacturer", "anti drone equipment supplier", "anti drone equipment for sale", "buy anti drone equipment", "anti drone equipment procurement", "anti drone equipment provider"],
  locator: ["drone locator price", "drone locator manufacturer", "drone locator supplier", "drone locator for sale", "buy drone locator", "drone locator procurement", "drone locator provider"],
  jammer: ["drone jammer price", "drone jammer manufacturer", "drone jammer supplier", "drone jammer for sale", "buy drone jammer", "drone jammer procurement", "drone jammer provider"],
  shield: ["drone shield price", "drone shield manufacturer", "drone shield supplier", "drone shield for sale", "buy drone shield", "drone shield procurement", "drone shield provider"],
  "c-uas": ["c-uas system price", "c-uas manufacturer", "c-uas supplier", "c-uas system for sale", "buy c-uas system", "c-uas procurement", "c-uas solution provider"],
  radar: ["drone radar price", "drone radar manufacturer", "drone radar supplier", "drone radar for sale", "buy drone radar", "drone radar procurement", "drone radar provider"],
};

const sourceCountsByKey = Object.fromEntries(groupConfigs.map((config) => [config.key, [...candidateMap.values()].filter((item) => item.key === config.key).length]));
const mandatoryCombinationRoots = new Set(["detector", "defender", "radar", "c-uas", "system", "jammer", "locator", "shield"]);
const supplementedRoots = [];
for (const config of groupConfigs) {
  if (!mandatoryCombinationRoots.has(config.key)) continue;
  let added = false;
  for (const keyword of supplementalByKey[config.key]) {
    const key = `${config.key}\u0000${keyword}`;
    if (candidateMap.has(key)) continue;
    candidateMap.set(key, { key: config.key, keyword, origin: "supplemented root combination", sourceCampaign: "", sourceAdGroup: "" });
    added = true;
  }
  if (added) supplementedRoots.push(config.key);
}

const keywordItems = [...candidateMap.values()].sort((a, b) => {
  const keyDiff = groupConfigs.findIndex((item) => item.key === a.key) - groupConfigs.findIndex((item) => item.key === b.key);
  return keyDiff || a.keyword.localeCompare(b.keyword);
});
const requiredRootCombinations = [...mandatoryCombinationRoots].flatMap((key) => supplementalByKey[key].map((keyword) => ({ key, keyword })));
for (const required of requiredRootCombinations) {
  if (!candidateMap.has(`${required.key}\u0000${required.keyword}`)) throw new Error(`Missing required root combination: ${required.key} / ${required.keyword}`);
}
for (const item of keywordItems) {
  if (!purchasePattern.test(item.keyword)) throw new Error(`Non-purchase keyword: ${item.keyword}`);
  if (forbiddenPattern.test(item.keyword)) throw new Error(`Restricted keyword: ${item.keyword}`);
}

const templateFiles = {
  adGroup: path.join(templateDir, "ad_group_template.xlsx"),
  keyword: path.join(templateDir, "keyword_template.xlsx"),
  rsa: path.join(templateDir, "responsive_search_ad_template.xlsx"),
};

async function inspectTemplate(kind, file, expectedColumns) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const overview = await wb.inspect({
    kind: "workbook,sheet,table,computedStyle",
    sheetId: sheet.name,
    range: `A1:${expectedColumns === 55 ? "BC" : expectedColumns === 21 ? "U" : "R"}4`,
    maxChars: 10000,
    tableMaxRows: 4,
    tableMaxCols: expectedColumns,
  });
  const headerRow = values.find((row) => String(row[0] ?? "") === "Row Type" && String(row[1] ?? "") === "Action");
  if (!headerRow) throw new Error(`${kind} template does not contain a Row Type / Action header row`);
  const headers = Array.from({ length: expectedColumns }, (_, i) => String(headerRow[i] ?? ""));
  if (headers.length !== expectedColumns || headers[0] !== "Row Type" || headers[1] !== "Action") {
    throw new Error(`${kind} template header mismatch: ${JSON.stringify(headers)}`);
  }
  return { headers, overview: overview.ndjson };
}

const adGroupTemplate = await inspectTemplate("ad group", templateFiles.adGroup, 21);
const keywordTemplate = await inspectTemplate("keyword", templateFiles.keyword, 18);
const rsaTemplate = await inspectTemplate("rsa", templateFiles.rsa, 55);
const adGroupHeaders = adGroupTemplate.headers;
const keywordHeaders = keywordTemplate.headers;
const rsaHeaders = rsaTemplate.headers;
const adGroupIndex = new Map(adGroupHeaders.map((header, i) => [header, i]));
const keywordIndex = new Map(keywordHeaders.map((header, i) => [header, i]));
const rsaIndex = new Map(rsaHeaders.map((header, i) => [header, i]));

const adGroupRows = [];
const keywordRows = [];
const rsaRows = [];
const pauseRows = [];
for (const campaignConfig of campaignConfigs) {
  for (const config of groupConfigs) {
    const adGroupRow = Array(adGroupHeaders.length).fill(null);
    adGroupRow[adGroupIndex.get("Row Type")] = "Ad group";
    adGroupRow[adGroupIndex.get("Action")] = "Add";
    adGroupRow[adGroupIndex.get("Ad group status")] = "Enabled";
    adGroupRow[adGroupIndex.get("Campaign")] = campaignConfig.campaign;
    adGroupRow[adGroupIndex.get("Ad group")] = config.adGroup;
    adGroupRow[adGroupIndex.get("Ad group type")] = "Standard";
    adGroupRow[adGroupIndex.get("Ad rotation")] = "Optimize";
    if (adGroupIndex.has("Label")) adGroupRow[adGroupIndex.get("Label")] = label;
    adGroupRows.push(adGroupRow);

    const assets = makeAssets(config.fallback);
    const headlineLengths = assets.headlines.map((value) => renderedDki(value).length);
    const descriptionLengths = assets.descriptions.map((value) => renderedDki(value).length);
    if (Math.max(...headlineLengths) > 30 || Math.max(...descriptionLengths) > 90) {
      throw new Error(`${config.adGroup}: RSA asset exceeds limits`);
    }
    const rsaRow = Array(rsaHeaders.length).fill(null);
    rsaRow[rsaIndex.get("Row Type")] = "Ad";
    rsaRow[rsaIndex.get("Action")] = "Add";
    rsaRow[rsaIndex.get("Ad status")] = "Enabled";
    rsaRow[rsaIndex.get("Campaign")] = campaignConfig.campaign;
    rsaRow[rsaIndex.get("Ad group")] = config.adGroup;
    rsaRow[rsaIndex.get("Ad type")] = "Responsive search ad";
    if (rsaIndex.has("Label")) rsaRow[rsaIndex.get("Label")] = label;
    assets.headlines.forEach((value, i) => { rsaRow[rsaIndex.get(`Headline ${i + 1}`)] = value; });
    assets.descriptions.forEach((value, i) => { rsaRow[rsaIndex.get(`Description ${i + 1}`)] = value; });
    rsaRow[rsaIndex.get("Path 1")] = config.path1;
    rsaRow[rsaIndex.get("Path 2")] = config.path2;
    rsaRow[rsaIndex.get("Final URL")] = config.url;
    rsaRows.push(rsaRow);
  }

  for (const item of keywordItems) {
    const config = configByKey.get(item.key);
    const keywordRow = Array(keywordHeaders.length).fill(null);
    keywordRow[keywordIndex.get("Row Type")] = "Keyword";
    keywordRow[keywordIndex.get("Action")] = "Add";
    keywordRow[keywordIndex.get("Keyword status")] = "Enabled";
    keywordRow[keywordIndex.get("Campaign")] = campaignConfig.campaign;
    keywordRow[keywordIndex.get("Ad group")] = config.adGroup;
    keywordRow[keywordIndex.get("Keyword")] = item.keyword;
    keywordRow[keywordIndex.get("Type")] = campaignConfig.type;
    if (keywordIndex.has("Label")) keywordRow[keywordIndex.get("Label")] = label;
    keywordRow[keywordIndex.get("Final URL")] = config.url;
    keywordRows.push(keywordRow);
  }
}

const includedExistingKeys = new Set(keywordItems.filter((item) => item.origin === "existing account").map((item) => `${item.key}\u0000${item.keyword}`));
const pauseDedupe = new Set();
for (const sourceRow of sourceRows) {
  const keyword = normalizeKeyword(sourceRow[csvIndex.get("关键字")]);
  const key = classifyKeyword(keyword);
  if (!key || !includedExistingKeys.has(`${key}\u0000${keyword}`)) continue;
  const campaign = String(sourceRow[csvIndex.get("广告系列")] ?? "").trim();
  const adGroup = String(sourceRow[csvIndex.get("广告组")] ?? "").trim();
  const sourceMatchType = String(sourceRow[csvIndex.get("匹配类型")] ?? "");
  const type = sourceMatchType.includes("词组") ? "Phrase match" : sourceMatchType.includes("完全") ? "Exact match" : sourceMatchType.includes("广泛") ? "Broad match" : null;
  if (!campaign || !adGroup || !type) throw new Error(`Cannot identify original keyword row: ${JSON.stringify({ campaign, adGroup, keyword, sourceMatchType })}`);
  const dedupeKey = [campaign, adGroup, keyword, type].join("\u0000");
  if (pauseDedupe.has(dedupeKey)) continue;
  pauseDedupe.add(dedupeKey);
  const pauseRow = Array(keywordHeaders.length).fill(null);
  pauseRow[keywordIndex.get("Row Type")] = "Keyword";
  pauseRow[keywordIndex.get("Action")] = "Edit";
  pauseRow[keywordIndex.get("Keyword status")] = "Paused";
  pauseRow[keywordIndex.get("Campaign")] = campaign;
  pauseRow[keywordIndex.get("Ad group")] = adGroup;
  pauseRow[keywordIndex.get("Keyword")] = keyword;
  pauseRow[keywordIndex.get("Type")] = type;
  pauseRow[keywordIndex.get("Final URL")] = String(sourceRow[csvIndex.get("最终到达网址")] ?? "").trim();
  pauseRows.push(pauseRow);
}
if (!pauseRows.length) throw new Error("No original purchase-intent keywords found to pause");

async function makeStaging(name, headers, rows) {
  const wb = Workbook.create();
  const sheet = wb.worksheets.add("Sheet0");
  sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
  sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
  const file = path.join(outDir, `${name}_staging_artifact.xlsx`);
  await (await SpreadsheetFile.exportXlsx(wb)).save(file);
  const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const verifySheet = verify.worksheets.getItemAt(0);
  const values = verifySheet.getUsedRange(true).values;
  const tableCheck = await verify.inspect({
    kind: "table",
    range: `${verifySheet.name}!A1:${headers.length === 55 ? "BC" : headers.length === 21 ? "U" : "R"}5`,
    include: "values,formulas",
    tableMaxRows: 5,
    tableMaxCols: headers.length,
    maxChars: 16000,
  });
  const errors = await verify.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    summary: `${name} formula error scan`,
  });
  if (values.length !== rows.length + 1 || values[0].length !== headers.length || !errors.ndjson.includes("matched 0 entries")) {
    throw new Error(`${name}: staging verification failed`);
  }
  return { tableCheck: tableCheck.ndjson, formulaErrors: errors.ndjson };
}

const stagingQa = {
  adGroup: await makeStaging("01_ad_groups", adGroupHeaders, adGroupRows),
  keyword: await makeStaging("02_keywords", keywordHeaders, keywordRows),
  rsa: await makeStaging("03_rsa", rsaHeaders, rsaRows),
  pause: await makeStaging("04_pause_original", keywordHeaders, pauseRows),
};

const outputNames = {
  adGroup: "01_Ad_Groups_Purchase_Intent_ROOT_COMBINATIONS_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  keyword: "02_Keywords_Purchase_Intent_ROOT_COMBINATIONS_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  rsa: "03_RSA_DKI_Purchase_Intent_ROOT_COMBINATIONS_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  pause: "04_Pause_Original_Purchase_Intent_Keywords_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
};
const payloads = [
  { templateName: "ad_group_template.xlsx", outputName: outputNames.adGroup, expectedRows: adGroupRows.length, expectedColumns: adGroupHeaders.length, headers: adGroupHeaders, rows: adGroupRows },
  { templateName: "keyword_template.xlsx", outputName: outputNames.keyword, expectedRows: keywordRows.length, expectedColumns: keywordHeaders.length, headers: keywordHeaders, rows: keywordRows },
  { templateName: "responsive_search_ad_template.xlsx", outputName: outputNames.rsa, expectedRows: rsaRows.length, expectedColumns: rsaHeaders.length, headers: rsaHeaders, rows: rsaRows },
  { templateName: "keyword_template.xlsx", outputName: outputNames.pause, expectedRows: pauseRows.length, expectedColumns: keywordHeaders.length, headers: keywordHeaders, rows: pauseRows },
];

const countsByRoot = Object.fromEntries(groupConfigs.map((config) => [
  config.key,
  {
    existing: keywordItems.filter((item) => item.key === config.key && item.origin === "existing account").length,
    supplemented: keywordItems.filter((item) => item.key === config.key && item.origin !== "existing account").length,
    total: keywordItems.filter((item) => item.key === config.key).length,
  },
]));
const uniqueRowKeys = new Set(keywordRows.map((row) => [row[keywordIndex.get("Campaign")], row[keywordIndex.get("Ad group")], row[keywordIndex.get("Keyword")], row[keywordIndex.get("Type")]].join("\u0000")));
if (uniqueRowKeys.size !== keywordRows.length) throw new Error("Duplicate keyword upload rows generated");

const qa = {
  sourceCsv,
  sourceRows: sourceRows.length,
  purchaseCandidatesBeforeSafetyFilter: new Set(sourceRows.map((row) => normalizeKeyword(row[csvIndex.get("关键字")])).filter((keyword) => purchasePattern.test(keyword))).size,
  excluded: [...new Map(excluded.map((item) => [`${item.keyword}\u0000${item.reason}`, item])).values()],
  campaigns: campaignConfigs,
  adGroups: groupConfigs,
  countsByRoot,
  supplementedRoots,
  uniqueKeywords: keywordItems.length,
  existingKeywords: keywordItems.filter((item) => item.origin === "existing account").length,
  supplementedKeywords: keywordItems.filter((item) => item.origin !== "existing account").length,
  mandatoryCombinationRoots: [...mandatoryCombinationRoots],
  requiredRootCombinations,
  adGroupRows: adGroupRows.length,
  keywordRows: keywordRows.length,
  rsaRows: rsaRows.length,
  pauseRows: pauseRows.length,
  pauseCampaigns: [...new Set(pauseRows.map((row) => row[keywordIndex.get("Campaign")]))],
  pauseAdGroups: [...new Set(pauseRows.map((row) => row[keywordIndex.get("Ad group")]))],
  phraseRows: keywordRows.filter((row) => row[keywordIndex.get("Type")] === "Phrase match").length,
  exactRows: keywordRows.filter((row) => row[keywordIndex.get("Type")] === "Exact match").length,
  allRsaHeadlinesDki: rsaRows.every((row) => Array.from({ length: 15 }, (_, i) => row[rsaIndex.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  allRsaDescriptionsDki: rsaRows.every((row) => Array.from({ length: 4 }, (_, i) => row[rsaIndex.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  maxRenderedHeadlineLength: Math.max(...groupConfigs.flatMap((config) => makeAssets(config.fallback).headlines.map((value) => renderedDki(value).length))),
  maxRenderedDescriptionLength: Math.max(...groupConfigs.flatMap((config) => makeAssets(config.fallback).descriptions.map((value) => renderedDki(value).length))),
  templates: { adGroup: adGroupTemplate.overview, keyword: keywordTemplate.overview, rsa: rsaTemplate.overview },
  stagingQa,
  keywordItems,
};

await fs.writeFile(path.join(outDir, "purchase_intent_payloads.json"), JSON.stringify(payloads), "utf8");
await fs.writeFile(path.join(outDir, "purchase_intent_build_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify({ ...qa, templates: "inspected", stagingQa: "verified", keywordItems: "saved in QA file" }, null, 2));
