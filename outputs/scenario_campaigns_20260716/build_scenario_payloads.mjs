import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/scenario_campaigns_20260716";
const sourceCsv = "C:/Users/admin/Downloads/搜索关键字报告 (3).csv";
const templateDir = "D:/fc-cuas/ads/广告上传模板";
const safeLandingUrl = "https://n-tet.com/solutions/low-altitude-airspace-monitoring";
const label = "SCENARIO_FACILITIES_V2_20260716";

const campaignConfigs = [
  { campaign: "C-UAS 中东 场景词 精准", type: "Exact match" },
  { campaign: "C-UAS 中东 场景词 词组", type: "Phrase match" },
  { campaign: "C-UAS 南美 场景词 精准", type: "Exact match" },
  { campaign: "C-UAS 南美 场景词 词组", type: "Phrase match" },
  { campaign: "C-UAS 英语区 场景词 精准", type: "Exact match" },
  { campaign: "C-UAS 英语区 场景词 词组", type: "Phrase match" },
];

const scenarioConfigs = [
  {
    key: "critical-infrastructure",
    adGroup: "Critical Infrastructure",
    fallback: "Critical Site C-UAS",
    bHandle: "critical-infrastructure-airspace-monitoring",
    path1: "critical-infra",
    path2: "drone-security",
    concern: "Deploy {DKI} for critical facilities and national asset security.",
    keywords: [
      "government building anti drone",
      "data center drone detection",
      "telecom tower drone detector",
      "water treatment plant anti drone",
      "dam drone detection",
      "railway station anti drone",
      "metro station drone detector",
      "bridge c-uas",
    ],
  },
  {
    key: "power-plants",
    adGroup: "Power Plants",
    fallback: "Power Plant C-UAS",
    bHandle: "power-plant-airspace-monitoring",
    path1: "power-plants",
    path2: "drone-security",
    concern: "Deploy {DKI} for power plants, grids and energy site security.",
    keywords: [
      "nuclear power plant anti drone",
      "thermal power plant drone detection",
      "hydroelectric power plant drone detector",
      "solar farm anti drone",
      "wind farm drone detection",
      "power substation drone detector",
      "electric grid c-uas",
      "power station anti drone",
    ],
  },
  {
    key: "airports",
    adGroup: "Airports",
    fallback: "Airport C-UAS",
    bHandle: "airport-security-protection",
    path1: "airports",
    path2: "drone-security",
    concern: "Deploy {DKI} for runways, airfields and airport security.",
    keywords: [
      "airport anti drone",
      "air port anti drone",
      "runway drone detection",
      "airfield drone detector",
      "airport perimeter anti drone",
      "airport c-uas",
      "heliport drone detection",
      "aviation facility drone security",
    ],
  },
  {
    key: "border",
    adGroup: "Border",
    fallback: "Border C-UAS",
    bHandle: "border-airspace-monitoring",
    path1: "border",
    path2: "drone-security",
    concern: "Deploy {DKI} for border posts, checkpoints and patrol routes.",
    keywords: [
      "border checkpoint anti drone",
      "border post drone detection",
      "border patrol c-uas",
      "customs checkpoint drone detector",
      "land border anti drone",
      "coastal border drone detection",
      "remote border post drone security",
      "frontier drone detector",
    ],
  },
  {
    key: "public-safety",
    adGroup: "Public Safety",
    fallback: "Public Safety C-UAS",
    bHandle: "public-safety-airspace-monitoring",
    path1: "public-safety",
    path2: "drone-security",
    concern: "Deploy {DKI} for police, urban security and emergency response.",
    keywords: [
      "police station anti drone",
      "law enforcement drone detection",
      "emergency command center anti drone",
      "city center drone detector",
      "urban security c-uas",
      "public square drone detection",
      "fire department anti drone",
      "emergency response drone security",
    ],
  },
  {
    key: "prison",
    adGroup: "Prison",
    fallback: "Prison C-UAS",
    bHandle: "correctional-facility-airspace-monitoring",
    path1: "prison",
    path2: "drone-security",
    concern: "Deploy {DKI} for prison perimeter and contraband drone detection.",
    keywords: [
      "prison anti drone",
      "correctional facility drone detection",
      "jail drone detector",
      "detention center anti drone",
      "prison perimeter c-uas",
      "prison contraband drone detection",
      "penitentiary drone security",
      "prison drone locator",
    ],
  },
  {
    key: "port-security",
    adGroup: "Port Security",
    fallback: "Port Security C-UAS",
    bHandle: "port-airspace-monitoring",
    path1: "port-security",
    path2: "drone-system",
    concern: "Deploy {DKI} for ports, cargo terminals and logistics security.",
    keywords: [
      "seaport anti drone",
      "harbor drone detection",
      "container terminal drone detector",
      "cargo terminal anti drone",
      "oil port drone detection",
      "port warehouse drone security",
      "port c-uas",
      "shipping terminal drone detection",
    ],
  },
  {
    key: "mass-events",
    adGroup: "Mass Events",
    fallback: "Mass Event C-UAS",
    bHandle: "mass-event-airspace-monitoring",
    path1: "mass-events",
    path2: "drone-security",
    concern: "Deploy {DKI} for stadiums, concerts and major event security.",
    keywords: [
      "stadium anti drone",
      "football stadium drone detection",
      "sports event c-uas",
      "concert drone detector",
      "music festival anti drone",
      "convention center drone detection",
      "exhibition center anti drone",
      "large event drone security",
    ],
  },
  {
    key: "vip-private-property",
    adGroup: "VIPs Private Property",
    fallback: "VIP Property C-UAS",
    bHandle: "vip-private-property-airspace-monitoring",
    path1: "vip-property",
    path2: "drone-security",
    concern: "Deploy {DKI} for villas, convoys and private estate security.",
    keywords: [
      "villa anti drone",
      "luxury villa drone detection",
      "private estate drone detector",
      "mansion anti drone",
      "private residence c-uas",
      "vip convoy drone security",
      "yacht anti drone",
      "private ranch drone detection",
    ],
  },
  {
    key: "enterprises",
    adGroup: "Enterprises",
    fallback: "Enterprise C-UAS",
    bHandle: "enterprise-airspace-monitoring",
    path1: "enterprises",
    path2: "drone-security",
    concern: "Deploy {DKI} for mines, refineries and industrial site security.",
    keywords: [
      "mine anti drone",
      "mining site drone detection",
      "oil refinery anti drone",
      "oil field drone detector",
      "factory drone detection",
      "industrial park c-uas",
      "corporate headquarters anti drone",
      "warehouse drone security",
    ],
  },
];

const forbiddenPattern = /\b(jammer|jamming|blocker|blocking|spoofing|deception|weapon|weapons|gun|guns|shoot down|destroy|neutraliz(?:e|es|ed|ing|ation)|forced landing|return to home|intercept(?:ion|s|ed|ing)?)\b/i;
const scenarioIndustryPattern = /\b(critical infrastructure|critical facilit(?:y|ies)|critical assets?|government building|data center|telecom tower|water treatment plant|dam|railway station|metro station|bridge|power plant|nuclear power plant|thermal power plant|hydroelectric power plant|power station|power grid|electric grid|power substation|substation|energy facility|solar farm|wind farm|airport|air port|runway|airfield|heliport|aviation facility|border|frontier|border patrol|border checkpoint|border post|customs checkpoint|land border|coastal border|public safety|law enforcement|police|police station|emergency response|emergency command center|city center|public square|fire department|urban|urban security|prison|correctional|jail|detention center|penitentiary|contraband|port|seaport|harbou?r|container terminal|cargo terminal|oil port|port warehouse|shipping terminal|mass event|stadium|football stadium|sports event|concert|music festival|convention center|exhibition center|large event|vip|villa|private property|private estate|mansion|private residence|convoy|yacht|private ranch|residential security|enterprise|mine|mining site|oil refinery|oil field|factory|industrial park|corporate headquarters|corporate campus|business campus|warehouse)\b/i;
const droneContextPattern = /\b(drone|drones|uav|uavs|uas|c-uas|cuas|anti[- ]?drone|counter[- ]?drone|airspace)\b/i;
const nonDeviceIntentPattern = /\bmonitor(?:ing)?\b/i;

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
  return String(value ?? "").trim().replace(/^\[|\]$/g, "").replace(/^"|"$/g, "").trim().toLowerCase().replace(/\s+/g, " ");
}

function renderedDki(value) {
  return String(value).replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

function makeAssets(config) {
  const dki = `{KeyWord:${config.fallback}}`;
  return {
    headlines: [
      dki,
      `Get ${dki}`,
      `Explore ${dki}`,
      `${dki} Plan`,
      `${dki} Quote`,
      `${dki} Options`,
      `N-TET ${dki}`,
      `Pro ${dki}`,
      `${dki} Support`,
      `${dki} Project`,
      `${dki} System`,
      `${dki} Security`,
      `${dki} Equipment`,
      `${dki} Detection`,
      `${dki} Supplier`,
    ],
    descriptions: [
      config.concern.replace("{DKI}", dki),
      `Plan ${dki} coverage for fixed sites, portable teams and vehicles.`,
      `Discuss ${dki} sensors, site layout and project requirements with N-TET.`,
      `Request a ${dki} quote and deployment review for your security project.`,
    ],
  };
}

const allNewKeywords = scenarioConfigs.flatMap((config) => config.keywords.map((keyword) => ({ scenarioKey: config.key, adGroup: config.adGroup, keyword })));
if (scenarioConfigs.length !== 10 || allNewKeywords.length !== 80) throw new Error("Expected 10 scenarios and 80 base keywords");
if (new Set(allNewKeywords.map((item) => item.keyword)).size !== allNewKeywords.length) throw new Error("Duplicate scenario keywords found");
for (const item of allNewKeywords) {
  if (!scenarioIndustryPattern.test(item.keyword) || !droneContextPattern.test(item.keyword)) throw new Error(`Keyword lacks scenario or drone context: ${item.keyword}`);
  if (forbiddenPattern.test(item.keyword)) throw new Error(`Restricted keyword: ${item.keyword}`);
  if (nonDeviceIntentPattern.test(item.keyword)) throw new Error(`Non-device monitoring keyword: ${item.keyword}`);
}

const raw = await fs.readFile(sourceCsv);
const decoded = new TextDecoder("utf-16le").decode(raw).replace(/^\uFEFF/, "");
const lines = decoded.split(/\r?\n/).filter((line) => line.length > 0);
const csvHeaders = parseTsvLine(lines[2]);
const csvIndex = new Map(csvHeaders.map((header, i) => [header, i]));
for (const header of ["关键字", "匹配类型", "广告系列", "广告组"]) {
  if (!csvIndex.has(header)) throw new Error(`Source CSV missing header: ${header}`);
}
const sourceRows = lines.slice(3).map(parseTsvLine).filter((row) => row.some((value) => value !== ""));

async function inspectTemplate(kind, templateName, expectedColumns) {
  const file = path.join(templateDir, templateName);
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const headerRow = values.find((row) => String(row[0] ?? "") === "Row Type" && String(row[1] ?? "") === "Action");
  if (!headerRow) throw new Error(`${kind} template missing Row Type / Action header row`);
  const headers = Array.from({ length: expectedColumns }, (_, i) => String(headerRow[i] ?? ""));
  const overview = await wb.inspect({
    kind: "workbook,sheet,table,computedStyle",
    sheetId: sheet.name,
    range: `A1:${expectedColumns === 55 ? "BC" : expectedColumns === 21 ? "U" : "R"}4`,
    maxChars: 10000,
    tableMaxRows: 4,
    tableMaxCols: expectedColumns,
  });
  if (headers.length !== expectedColumns || headers[0] !== "Row Type" || headers[1] !== "Action") throw new Error(`${kind} template header mismatch`);
  return { headers, overview: overview.ndjson };
}

const adGroupTemplate = await inspectTemplate("ad group", "ad_group_template.xlsx", 21);
const keywordTemplate = await inspectTemplate("keyword", "keyword_template.xlsx", 18);
const rsaTemplate = await inspectTemplate("rsa", "responsive_search_ad_template.xlsx", 55);
const adGroupHeaders = adGroupTemplate.headers;
const keywordHeaders = keywordTemplate.headers;
const rsaHeaders = rsaTemplate.headers;
const adGroupIndex = new Map(adGroupHeaders.map((header, i) => [header, i]));
const keywordIndex = new Map(keywordHeaders.map((header, i) => [header, i]));
const rsaIndex = new Map(rsaHeaders.map((header, i) => [header, i]));

const adGroupRows = [];
const keywordRows = [];
const rsaRows = [];
for (const campaignConfig of campaignConfigs) {
  for (const config of scenarioConfigs) {
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

    for (const keyword of config.keywords) {
      const keywordRow = Array(keywordHeaders.length).fill(null);
      keywordRow[keywordIndex.get("Row Type")] = "Keyword";
      keywordRow[keywordIndex.get("Action")] = "Add";
      keywordRow[keywordIndex.get("Keyword status")] = "Enabled";
      keywordRow[keywordIndex.get("Campaign")] = campaignConfig.campaign;
      keywordRow[keywordIndex.get("Ad group")] = config.adGroup;
      keywordRow[keywordIndex.get("Keyword")] = keyword;
      keywordRow[keywordIndex.get("Type")] = campaignConfig.type;
      if (keywordIndex.has("Label")) keywordRow[keywordIndex.get("Label")] = label;
      keywordRow[keywordIndex.get("Final URL")] = safeLandingUrl;
      keywordRows.push(keywordRow);
    }

    const assets = makeAssets(config);
    const headlineLengths = assets.headlines.map((value) => renderedDki(value).length);
    const descriptionLengths = assets.descriptions.map((value) => renderedDki(value).length);
    if (Math.max(...headlineLengths) > 30 || Math.max(...descriptionLengths) > 90) throw new Error(`${config.adGroup}: RSA asset exceeds limits`);
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
    rsaRow[rsaIndex.get("Final URL")] = safeLandingUrl;
    rsaRows.push(rsaRow);
  }
}

const pauseRows = [];
const pauseDedupe = new Set();
for (const sourceRow of sourceRows) {
  const keyword = normalizeKeyword(sourceRow[csvIndex.get("关键字")]);
  if (!scenarioIndustryPattern.test(keyword) || !droneContextPattern.test(keyword)) continue;
  if (/\b(?:system|equipment)\s+factory$/.test(keyword)) continue;
  const campaign = String(sourceRow[csvIndex.get("广告系列")] ?? "").trim();
  const adGroup = String(sourceRow[csvIndex.get("广告组")] ?? "").trim();
  const sourceType = String(sourceRow[csvIndex.get("匹配类型")] ?? "");
  const type = sourceType.includes("词组") ? "Phrase match" : sourceType.includes("完全") ? "Exact match" : sourceType.includes("广泛") ? "Broad match" : null;
  if (!campaign || !adGroup || !type) throw new Error(`Cannot identify original scenario keyword row: ${JSON.stringify({ campaign, adGroup, keyword, sourceType })}`);
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
  pauseRows.push(pauseRow);
}
if (pauseRows.length < 63) throw new Error(`Expected at least 63 original scenario rows to pause, found ${pauseRows.length}`);

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
  const errors = await verify.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: `${name} formula error scan` });
  if (values.length !== rows.length + 1 || values[0].length !== headers.length || !errors.ndjson.includes("matched 0 entries")) throw new Error(`${name}: staging verification failed`);
  return { tableCheck: tableCheck.ndjson, formulaErrors: errors.ndjson };
}

const stagingQa = {
  adGroups: await makeStaging("01_ad_groups", adGroupHeaders, adGroupRows),
  keywords: await makeStaging("02_keywords", keywordHeaders, keywordRows),
  rsa: await makeStaging("03_rsa", rsaHeaders, rsaRows),
  pause: await makeStaging("04_pause", keywordHeaders, pauseRows),
};

const outputNames = {
  adGroups: "01_Ad_Groups_10_Scenarios_SPECIFIC_FACILITIES_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  keywords: "02_Keywords_10_Scenarios_SPECIFIC_FACILITIES_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  rsa: "03_RSA_DKI_10_Scenarios_SPECIFIC_FACILITIES_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
  pause: "04_Pause_Original_Scenario_Keywords_SPECIFIC_FACILITIES_V2_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx",
};
const payloads = [
  { templateName: "ad_group_template.xlsx", outputName: outputNames.adGroups, expectedRows: adGroupRows.length, expectedColumns: adGroupHeaders.length, headers: adGroupHeaders, rows: adGroupRows },
  { templateName: "keyword_template.xlsx", outputName: outputNames.keywords, expectedRows: keywordRows.length, expectedColumns: keywordHeaders.length, headers: keywordHeaders, rows: keywordRows },
  { templateName: "responsive_search_ad_template.xlsx", outputName: outputNames.rsa, expectedRows: rsaRows.length, expectedColumns: rsaHeaders.length, headers: rsaHeaders, rows: rsaRows },
  { templateName: "keyword_template.xlsx", outputName: outputNames.pause, expectedRows: pauseRows.length, expectedColumns: keywordHeaders.length, headers: keywordHeaders, rows: pauseRows },
];

const qa = {
  sourceCsv,
  sourceRows: sourceRows.length,
  campaigns: campaignConfigs,
  scenarios: scenarioConfigs,
  bTierHandlesNotUsedAsLandingPages: scenarioConfigs.map((config) => config.bHandle),
  safeLandingUrl,
  uniqueBaseKeywords: allNewKeywords.length,
  keywordsPerScenario: Object.fromEntries(scenarioConfigs.map((config) => [config.adGroup, config.keywords.length])),
  adGroupRows: adGroupRows.length,
  keywordRows: keywordRows.length,
  rsaRows: rsaRows.length,
  pauseRows: pauseRows.length,
  pauseCampaigns: [...new Set(pauseRows.map((row) => row[keywordIndex.get("Campaign")]))],
  allRsaHeadlinesDki: rsaRows.every((row) => Array.from({ length: 15 }, (_, i) => row[rsaIndex.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  allRsaDescriptionsDki: rsaRows.every((row) => Array.from({ length: 4 }, (_, i) => row[rsaIndex.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  maxRenderedHeadlineLength: Math.max(...scenarioConfigs.flatMap((config) => makeAssets(config).headlines.map((value) => renderedDki(value).length))),
  maxRenderedDescriptionLength: Math.max(...scenarioConfigs.flatMap((config) => makeAssets(config).descriptions.map((value) => renderedDki(value).length))),
  templates: { adGroup: adGroupTemplate.overview, keyword: keywordTemplate.overview, rsa: rsaTemplate.overview },
  stagingQa,
};
await fs.writeFile(path.join(outDir, "scenario_payloads.json"), JSON.stringify(payloads), "utf8");
await fs.writeFile(path.join(outDir, "scenario_build_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify({ ...qa, templates: "inspected", stagingQa: "verified", scenarios: scenarioConfigs.map(({ keywords, concern, ...config }) => ({ ...config, keywordCount: keywords.length })) }, null, 2));
