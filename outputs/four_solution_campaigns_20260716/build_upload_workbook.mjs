import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const priorDir = "D:/fc-cuas/outputs/five_device_campaigns_20260715";
const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const source = JSON.parse(await fs.readFile(path.join(priorDir, "source_inspection.json"), "utf8"));

const definitions = [
  {
    campaign: "Drone Defender 中东 精准",
    sourceKey: "defender",
    sourceFile: "drone-defender_broad-match_us_2026-07-15.xlsx",
    url: "https://n-tet.com/solutions/drone-defender",
    groups: [
      {
        name: "Drone Defender Core",
        defaultText: "Drone Defender",
        path1: "drone-defender",
        path2: "systems",
        keywords: ["drone defender", "defender drone", "drone defender system", "defender drones", "drone defenders"],
      },
      {
        name: "Drone Defender Purchase",
        defaultText: "Defender System",
        path1: "drone-defender",
        path2: "quote",
        keywords: ["buy defender drone", "buy drone defender", "drone defender buy", "drone defender cost", "drone defender for sale", "drone defender price", "drone defender where to buy"],
      },
      {
        name: "Drone Defender Specifications",
        defaultText: "Defender Specs",
        path1: "drone-defender",
        path2: "specs",
        keywords: ["drone defender c uas device", "drone defender capabilities", "drone defender specs"],
      },
    ],
    negatives: [
      "battelle", "dedrone", "vivitar", "division 2", "rainbow six", "nerf", "game", "app", "diy", "pdf", "video", "gun", "rifle", "weapon", "amazon",
    ],
    copy: [
      "{TOKEN} systems with RF, radar and EO/IR layers for authorized site protection.",
      "Compare {TOKEN} for airports, industrial sites and managed facilities.",
      "Plan {TOKEN} coverage, sensor integration and operator workflows with N-TET.",
      "Request {TOKEN} specifications, project options and a site-based quotation.",
    ],
  },
  {
    campaign: "Drone Locator 中东 精准",
    sourceKey: "locator",
    sourceFile: "drone-locator_broad-match_us_2026-07-15.xlsx",
    url: "https://n-tet.com/solutions/drone-locator",
    groups: [
      {
        name: "Drone Locator Systems",
        defaultText: "Drone Locator",
        path1: "drone-locator",
        path2: "systems",
        keywords: ["drone locator", "drone locator device", "drone locators", "drone detection and location systems"],
      },
      {
        name: "Drone Location Tracking",
        defaultText: "Drone Tracker",
        path1: "drone-location",
        path2: "tracking",
        keywords: ["drone location tracker", "drone location finder", "drone tracking locator", "tracking drone locator"],
      },
    ],
    negatives: [
      "delivery", "locations", "lost drone", "find my drone", "gps", "beacon", "beeper", "tag", "app", "free", "near me", "destiny", "maxis", "slime rancher", "ghost recon", "warframe", "game", "dji", "amazon", "walmart", "zipline",
    ],
    copy: [
      "{TOKEN} systems for mobile RF, fixed RF, radar and EO/IR target positioning.",
      "Compare {TOKEN} options for patrol teams, temporary posts and fixed-site coverage.",
      "Plan {TOKEN} direction, track and confirmation workflows with N-TET engineers.",
      "Request {TOKEN} specifications, deployment options and a site-based quotation.",
    ],
  },
  {
    campaign: "Drone Shield 中东 精准",
    sourceKey: "shield",
    sourceFile: "drone-shield_broad-match_us_2026-07-15.xlsx",
    url: "https://n-tet.com/solutions/drone-shield",
    groups: [
      {
        name: "Drone Shield Systems",
        defaultText: "Drone Shield",
        path1: "drone-shield",
        path2: "systems",
        keywords: ["drone shield", "anti drone shield", "drone shields", "drone shield technology"],
      },
      {
        name: "Drone Shield Purchase",
        defaultText: "Shield System",
        path1: "drone-shield",
        path2: "quote",
        keywords: ["drone shield products", "drone shield price", "drone shield cost"],
      },
    ],
    negatives: [
      "droneshield", "shield ai", "stock", "share price", "asx", "investor", "market cap", "tau", "warhammer", "warframe", "destiny", "borderlands", "chernobyl", "game", "gun", "youtube", "news", "ceo", "logo", "ticker",
    ],
    copy: [
      "{TOKEN} systems for fixed, portable and vehicle-supported site monitoring.",
      "Compare {TOKEN} configurations for continuous sites and temporary field teams.",
      "Plan {TOKEN} sensors, command workflows and deployment formats with N-TET.",
      "Request {TOKEN} specifications, configuration options and a project quotation.",
    ],
  },
  {
    campaign: "Drone Jammer 中东 精准",
    sourceKey: "jammer",
    sourceFile: "drone-jammer_broad-match_us_2026-07-15.xlsx",
    url: "https://n-tet.com/solutions/drone-jammer",
    groups: [
      {
        name: "Drone Jammer Systems",
        defaultText: "Drone Jammer",
        path1: "drone-jammer",
        path2: "systems",
        keywords: ["drone jammer", "anti drone jammer", "drone signal jammer", "drone jammer system", "anti drone jammer system", "drone jammer device", "anti drone jammer device", "commercial drone jammer", "professional drone jammer"],
      },
      {
        name: "RF Drone Jammer",
        defaultText: "RF Drone Jammer",
        path1: "rf-jammer",
        path2: "drone",
        keywords: ["rf jammer for drones", "drone rf jammer", "rf drone jammer", "drone radio jammer", "drone frequency jammer", "drone radio frequency jammer", "radio frequency jammer for drones", "anti drone signal jammer"],
      },
      {
        name: "Fixed Directional Jammer",
        defaultText: "Directional Jammer",
        path1: "fixed-site",
        path2: "rf-jammer",
        keywords: ["directional drone jammer", "directional anti drone jammer", "omnidirectional anti drone jammer", "stationary drone jammer"],
      },
      {
        name: "Portable Drone Jammer",
        defaultText: "Portable Jammer",
        path1: "portable",
        path2: "drone-jammer",
        keywords: ["portable drone jammer", "portable anti drone jammer", "portable drone jammer for sale", "portable drone jammer price", "portable drone jammer system", "man portable drone jammer", "manpack drone jammer"],
        copy: [
          "Compare {TOKEN} options for field deployment and authorized C-UAS projects.",
          "Plan {TOKEN} integration after RF, radar and EO/IR target confirmation.",
          "Request {TOKEN} specifications, configurations and project requirements.",
          "Review {TOKEN} deployment, power, interfaces and authorization needs.",
        ],
      },
      {
        name: "Handheld Drone Jammer",
        defaultText: "Handheld Jammer",
        path1: "handheld",
        path2: "drone-jammer",
        keywords: ["handheld drone jammer", "handheld anti drone jammer"],
        copy: [
          "Compare {TOKEN} options for trained field teams and authorized projects.",
          "Plan {TOKEN} use after target detection, identification and confirmation.",
          "Request {TOKEN} specifications, interfaces and project requirements.",
          "Review {TOKEN} operation, power and authorization needs with N-TET.",
        ],
      },
      {
        name: "Backpack Drone Jammer",
        defaultText: "Backpack Jammer",
        path1: "backpack",
        path2: "drone-jammer",
        keywords: ["drone jammer backpack", "backpack drone jammer", "portable backpack drone jammer", "drone jammer pack"],
        copy: [
          "Compare {TOKEN} configurations for mobile field teams and site projects.",
          "Plan {TOKEN} use after RF, radar and EO/IR target confirmation.",
          "Request {TOKEN} specifications, endurance and project requirements.",
          "Review {TOKEN} deployment, power and authorization needs with N-TET.",
        ],
      },
      {
        name: "Vehicle Drone Jammer",
        defaultText: "Vehicle Jammer",
        path1: "vehicle",
        path2: "drone-jammer",
        keywords: ["mobile drone jammer", "vehicle drone jammer", "vehicle mounted drone jammer"],
        copy: [
          "Compare {TOKEN} configurations for mobile site protection projects.",
          "Plan {TOKEN} integration after RF, radar and EO/IR confirmation.",
          "Request {TOKEN} specifications, mounting and interface requirements.",
          "Review {TOKEN} power, deployment and authorization needs with N-TET.",
        ],
      },
      {
        name: "Drone Jammer Purchase",
        defaultText: "Jammer Quote",
        path1: "drone-jammer",
        path2: "quote",
        keywords: ["drone jammer for sale", "drone signal jammer for sale", "buy drone jammer", "buy a drone jammer", "drone jammer buy", "drone jammer price", "anti drone jammer price", "price of drone jammer", "drone jammer manufacturer", "drone jammer manufacturers"],
      },
    ],
    negatives: [
      "gun", "rifle", "weapon", "home", "civilian", "military", "navy", "ukraine", "ghost recon", "wildlands", "radio santa blanca", "game", "diy", "homemade", "how to build", "how to make", "circuit", "schematic", "arduino", "esp32", "raspberry pi", "app", "amazon", "ebay", "flipper zero", "hackrf", "droneshield", "skyfend", "hikvision", "cerbair",
    ],
    copy: [
      "Compare {TOKEN} options for directional or omni fixed-site authorized projects.",
      "Plan {TOKEN} after RF, radar and EO/IR confirmation and authority review.",
      "Request {TOKEN} specifications for an authorized fixed-site C-UAS project.",
      "Review {TOKEN} geometry, EMC, interfaces and site authorization requirements.",
    ],
  },
];

function normalize(value) {
  return String(value ?? "").toLowerCase().trim().replace(/[–—_]/g, " ").replace(/-/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function sourceIndex(key) {
  const values = source[key].data[0].allValues;
  const headers = values[0];
  const keywordIndex = headers.indexOf("Keyword");
  const intentIndex = headers.indexOf("Intent");
  const volumeIndex = headers.indexOf("Volume");
  const cpcIndex = headers.indexOf("CPC (USD)");
  return new Map(values.slice(1).filter((row) => row[keywordIndex]).map((row) => [String(row[keywordIndex]).toLowerCase().trim(), {
    keyword: String(row[keywordIndex]).trim(),
    intent: row[intentIndex] ?? "",
    volume: Number(row[volumeIndex] ?? 0),
    cpc: Number(row[cpcIndex] ?? 0),
  }]));
}

const sourceIndexes = Object.fromEntries(["defender", "locator", "shield", "jammer"].map((key) => [key, sourceIndex(key)]));

const selectedRows = [];
const normalizedKeywordKeys = new Set();
for (const definition of definitions) {
  const index = sourceIndexes[definition.sourceKey];
  for (const group of definition.groups) {
    for (const keyword of group.keywords) {
      const found = index.get(keyword.toLowerCase());
      if (!found) throw new Error(`Keyword not found in ${definition.sourceFile}: ${keyword}`);
      const duplicateKey = `${definition.campaign}|${normalize(keyword)}`;
      if (normalizedKeywordKeys.has(duplicateKey)) throw new Error(`Normalized duplicate keyword: ${duplicateKey}`);
      normalizedKeywordKeys.add(duplicateKey);
      selectedRows.push({
        campaign: definition.campaign,
        adGroup: group.name,
        keyword: found.keyword,
        matchType: "Exact match",
        finalUrl: definition.url,
        sourceFile: definition.sourceFile,
        intent: found.intent,
        volume: found.volume,
        cpc: found.cpc,
      });
    }
  }
}

const adGroupHeaders = source.adGroupTemplate.data[0].allValues[0];
const keywordHeaders = source.keywordTemplate.data[0].allValues[0];
const rsaHeaders = source.rsaTemplate.data[0].allValues[2];
const negativeHeaders = source.negativeTemplate.data[0].allValues[0];

function blank(headers) {
  return Object.fromEntries(headers.map((header) => [header, null]));
}

const adGroupRows = definitions.flatMap((definition) => definition.groups.map((group) => ({
  ...blank(adGroupHeaders),
  "Row Type": "Ad group",
  Action: "Add",
  "Ad group status": "Enabled",
  Campaign: definition.campaign,
  "Ad group": group.name,
  "Ad group type": "Standard",
  "Ad rotation": "Optimize",
  "Default max. CPC": 12,
  Label: "SOURCE_EXACT_20260716",
})));

const keywordRows = selectedRows.map((row) => ({
  ...blank(keywordHeaders),
  "Row Type": "Keyword",
  Action: "Add",
  "Keyword status": "Enabled",
  Campaign: row.campaign,
  "Ad group": row.adGroup,
  Keyword: row.keyword,
  Type: "Exact match",
  Label: "SOURCE_EXACT_20260716",
  "Final URL": row.finalUrl,
}));

function dki(defaultText) {
  return `{KeyWord:${defaultText}}`;
}

function rendered(value) {
  return String(value ?? "").replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

function buildHeadlines(defaultText) {
  const token = dki(defaultText);
  return [
    token,
    `Get ${token}`,
    `View ${token}`,
    `Explore ${token}`,
    `Compare ${token}`,
    `Choose ${token}`,
    `N-TET ${token}`,
    `Pro ${token}`,
    `Site ${token}`,
    `${token} Quote`,
    `${token} Specs`,
    `${token} Options`,
    `Custom ${token}`,
    `Industrial ${token}`,
    `Project ${token}`,
  ];
}

const rsaRows = definitions.flatMap((definition) => definition.groups.map((group) => {
  const token = dki(group.defaultText);
  const row = {
    ...blank(rsaHeaders),
    "Row Type": "Ad",
    Action: "Add",
    "Ad status": "Enabled",
    Campaign: definition.campaign,
    "Ad group": group.name,
    "Ad type": "Responsive search ad",
    Label: "DKI_SOURCE_EXACT_20260716",
    "Path 1": group.path1,
    "Path 2": group.path2,
    "Final URL": definition.url,
  };
  buildHeadlines(group.defaultText).forEach((headline, index) => { row[`Headline ${index + 1}`] = headline; });
  (group.copy ?? definition.copy).map((text) => text.replace("{TOKEN}", token)).forEach((description, index) => { row[`Description ${index + 1}`] = description; });
  return row;
}));

const negativeReviewRows = [];
const negativeRows = [];
for (const definition of definitions) {
  const seen = new Set();
  for (const negativeKeyword of definition.negatives) {
    const key = normalize(negativeKeyword);
    if (seen.has(key)) continue;
    seen.add(key);
    negativeReviewRows.push({ campaign: definition.campaign, keyword: negativeKeyword, type: "Phrase match" });
    negativeRows.push({
      ...blank(negativeHeaders),
      "Row Type": "Negative keyword",
      Action: "Add",
      "Keyword status": "Enabled",
      Level: "Campaign",
      Campaign: definition.campaign,
      "Negative keyword": negativeKeyword,
      Type: "Phrase match",
    });
  }
}

const strongRestrictedPattern = /\b(gun|rifle|weapon|spoofing|forced landing|shoot down|destroy|neutralize)\b/i;
const qa = {
  campaigns: definitions.length,
  adGroups: adGroupRows.length,
  keywords: keywordRows.length,
  exactKeywords: keywordRows.filter((row) => row.Type === "Exact match").length,
  rsas: rsaRows.length,
  negatives: negativeRows.length,
  sourceMissing: [],
  duplicateKeywords: [],
  strongRestrictedEnabled: [],
  jammerFormatKeywords: [],
  headlineErrors: [],
  descriptionErrors: [],
};

for (const row of keywordRows) {
  if (strongRestrictedPattern.test(row.Keyword)) qa.strongRestrictedEnabled.push({ type: "keyword", campaign: row.Campaign, value: row.Keyword });
  if (row.Campaign === "Drone Jammer 中东 精准" && /\b(portable|handheld|backpack|mobile|vehicle|manpack)\b/i.test(row.Keyword)) qa.jammerFormatKeywords.push(row.Keyword);
  if (/\bjammer\b/i.test(row.Keyword) && (row.Campaign !== "Drone Jammer 中东 精准" || row["Final URL"] !== "https://n-tet.com/solutions/drone-jammer")) qa.strongRestrictedEnabled.push({ type: "jammer-context", campaign: row.Campaign, value: row.Keyword });
}

for (const row of rsaRows) {
  for (let i = 1; i <= 15; i += 1) {
    const value = row[`Headline ${i}`];
    if (!value || !/\{KeyWord:[^}]+\}/.test(value) || rendered(value).length > 30) qa.headlineErrors.push({ campaign: row.Campaign, adGroup: row["Ad group"], field: `Headline ${i}`, value, renderedLength: rendered(value).length });
    if (strongRestrictedPattern.test(rendered(value))) qa.strongRestrictedEnabled.push({ type: "headline", campaign: row.Campaign, value });
  }
  for (let i = 1; i <= 4; i += 1) {
    const value = row[`Description ${i}`];
    if (!value || !/\{KeyWord:[^}]+\}/.test(value) || rendered(value).length > 90) qa.descriptionErrors.push({ campaign: row.Campaign, adGroup: row["Ad group"], field: `Description ${i}`, value, renderedLength: rendered(value).length });
    if (strongRestrictedPattern.test(rendered(value))) qa.strongRestrictedEnabled.push({ type: "description", campaign: row.Campaign, value });
  }
}

if (qa.strongRestrictedEnabled.length || qa.headlineErrors.length || qa.descriptionErrors.length) {
  throw new Error(`Pre-export QA failed: ${JSON.stringify(qa, null, 2)}`);
}

const COLORS = {
  blue: "#315BA4",
  dark: "#1A1A2E",
  light: "#EAF1FB",
  white: "#FFFFFF",
  gray: "#667085",
  orange: "#FFF0D6",
  border: "#D0D5DD",
};

function colName(n) {
  let result = "";
  while (n > 0) {
    n -= 1;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result || "A";
}

function styleUpload(sheet, headers, rowCount) {
  const lastColumn = colName(headers.length);
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  sheet.getRange(`A1:${lastColumn}1`).format = {
    fill: COLORS.blue,
    font: { bold: true, color: COLORS.white, size: 10 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: COLORS.blue },
  };
  sheet.getRange(`A1:${lastColumn}1`).format.rowHeight = 30;
  if (rowCount) {
    sheet.getRange(`A2:${lastColumn}${rowCount + 1}`).format = {
      font: { size: 9 },
      verticalAlignment: "center",
      borders: { insideHorizontal: { style: "thin", color: COLORS.border } },
    };
  }
  headers.forEach((header, index) => {
    const column = colName(index + 1);
    let width = 16;
    if (header === "Campaign") width = 32;
    if (header === "Ad group") width = 30;
    if (["Keyword", "Negative keyword"].includes(header)) width = 36;
    if (["Final URL", "Mobile final URL"].includes(header)) width = 52;
    if (/^Headline \d+$/.test(header)) width = 26;
    if (/^Description \d+$/.test(header)) width = 52;
    sheet.getRange(`${column}1:${column}${rowCount + 1}`).format.columnWidth = width;
  });
}

function writeUploadSheet(workbook, sheetName, headers, objects) {
  const sheet = workbook.worksheets.add(sheetName);
  const rows = objects.map((object) => headers.map((header) => object[header] ?? null));
  sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
  if (rows.length) sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
  styleUpload(sheet, headers, rows.length);
  return sheet;
}

function writeTitle(sheet, range, title, subtitleRange, subtitle) {
  sheet.mergeCells(range);
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = { fill: COLORS.dark, font: { bold: true, color: COLORS.white, size: 18 }, verticalAlignment: "center" };
  sheet.getRange(range).format.rowHeight = 36;
  sheet.mergeCells(subtitleRange);
  sheet.getRange(subtitleRange).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = { fill: COLORS.light, font: { color: COLORS.gray, size: 10 }, wrapText: true, verticalAlignment: "center" };
  sheet.getRange(subtitleRange).format.rowHeight = 34;
}

function styleHeader(sheet, range) {
  sheet.getRange(range).format = { fill: COLORS.blue, font: { bold: true, color: COLORS.white }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
  sheet.getRange(range).format.rowHeight = 28;
}

const workbook = Workbook.create();
writeUploadSheet(workbook, "01 Ad Groups", adGroupHeaders, adGroupRows);
writeUploadSheet(workbook, "02 Keywords", keywordHeaders, keywordRows);
writeUploadSheet(workbook, "03 RSA", rsaHeaders, rsaRows);
writeUploadSheet(workbook, "04 Negatives", negativeHeaders, negativeRows);

const review = workbook.worksheets.add("05 Review");
review.showGridLines = false;
writeTitle(review, "A1:J1", "N-TET｜4个中东精准活动上传表（形态扩展版）", "A2:J2", "四个上传页均使用官方模板字段顺序：第一行是字段名，第二行即第一条数据。活动已在账户中建立，因此本包不重复创建 Campaign；按 01 → 04 顺序导入。所有关键词均来自用户提供的4份研究表。Jammer已加入便携、手持、背包、移动和车载设备形态。");
review.getRange("A4:J4").values = [["Campaign", "Landing URL", "Ad Groups", "Exact Keywords", "RSA", "Negatives", "Source File", "Source Volume Sum", "Max CPC USD", "Status"]];
styleHeader(review, "A4:J4");
const summaryRows = definitions.map((definition) => {
  const rows = selectedRows.filter((row) => row.campaign === definition.campaign);
  return [definition.campaign, definition.url, definition.groups.length, rows.length, definition.groups.length, definition.negatives.length, definition.sourceFile, rows.reduce((sum, row) => sum + row.volume, 0), Math.max(...rows.map((row) => row.cpc)), "Ready for upload"];
});
review.getRangeByIndexes(4, 0, summaryRows.length, 10).values = summaryRows;
review.getRange("A11:J11").values = [["Campaign", "Ad Group", "Keyword", "Match Type", "US Volume", "Intent", "CPC USD", "Final URL", "Source File", "Decision"]];
styleHeader(review, "A11:J11");
review.getRangeByIndexes(11, 0, selectedRows.length, 10).values = selectedRows.map((row) => [row.campaign, row.adGroup, row.keyword, row.matchType, row.volume, row.intent, row.cpc, row.finalUrl, row.sourceFile, "Include - source exact term"]);
review.freezePanes.freezeRows(11);
review.freezePanes.freezeColumns(3);
review.getRange(`A1:A${selectedRows.length + 11}`).format.columnWidth = 32;
review.getRange(`B1:B${selectedRows.length + 11}`).format.columnWidth = 48;
review.getRange(`C1:C${selectedRows.length + 11}`).format.columnWidth = 36;
review.getRange(`D1:G${selectedRows.length + 11}`).format.columnWidth = 16;
review.getRange(`H1:H${selectedRows.length + 11}`).format.columnWidth = 52;
review.getRange(`I1:I${selectedRows.length + 11}`).format.columnWidth = 45;
review.getRange(`J1:J${selectedRows.length + 11}`).format.columnWidth = 24;
review.getRange("A9:J9").merge();
review.getRange("A9").values = [["本版已加入 Portable、Handheld、Backpack、Mobile/Vehicle 与 Manpack Drone Jammer 精准词，并分别建立广告组和DKI RSA。枪型、武器、DIY、游戏和竞品词仍排除。启用前建议确认落地页同步展示这些设备形态，以保证广告相关性和着陆页体验。"]];
review.getRange("A9:J9").format = { fill: COLORS.orange, font: { bold: true, color: COLORS.dark }, wrapText: true, verticalAlignment: "center" };
review.getRange("A9:J9").format.rowHeight = 46;

const outputPath = path.join(outDir, "N-TET_4_MiddleEast_Exact_Campaign_Upload_Formats_20260716.xlsx");
await (await SpreadsheetFile.exportXlsx(workbook)).save(outputPath);

// Re-open the final file and verify the actual exported workbook, not only the in-memory object.
const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const expectedSheets = [
  ["01 Ad Groups", adGroupHeaders, adGroupRows.length],
  ["02 Keywords", keywordHeaders, keywordRows.length],
  ["03 RSA", rsaHeaders, rsaRows.length],
  ["04 Negatives", negativeHeaders, negativeRows.length],
];
const exportChecks = [];
for (const [sheetName, headers, rowCount] of expectedSheets) {
  const sheet = verify.worksheets.getItem(sheetName);
  const values = sheet.getUsedRange(true).values;
  exportChecks.push({
    sheet: sheetName,
    headersExact: JSON.stringify(values[0]) === JSON.stringify(headers),
    firstRowIsHeader: values[0][0] === headers[0],
    secondRowIsData: values[1][0] !== null,
    dataRows: values.length - 1,
    expectedRows: rowCount,
    columns: values[0].length,
  });
}
const formulaErrors = await verify.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "Final workbook formula error scan",
});
const reviewInspect = await verify.inspect({
  kind: "table",
  range: "05 Review!A1:J16",
  include: "values,formulas",
  tableMaxRows: 16,
  tableMaxCols: 10,
  maxChars: 12000,
});

if (exportChecks.some((check) => !check.headersExact || !check.firstRowIsHeader || !check.secondRowIsData || check.dataRows !== check.expectedRows)) {
  throw new Error(`Export verification failed: ${JSON.stringify(exportChecks, null, 2)}`);
}

const finalQa = { outputPath, qa, exportChecks, formulaErrors: formulaErrors.ndjson, reviewInspect: reviewInspect.ndjson };
await fs.writeFile(path.join(outDir, "final_qa.json"), JSON.stringify(finalQa, null, 2), "utf8");
console.log(JSON.stringify(finalQa, null, 2));
