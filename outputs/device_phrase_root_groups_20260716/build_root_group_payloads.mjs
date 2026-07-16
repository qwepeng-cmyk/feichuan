import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_root_groups_20260716";
const sourceKeywordFile = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/02_Keywords_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const adGroupTemplateSource = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/01_Ad_Groups_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const rsaTemplateSource = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/03_RSA_DKI_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const reportPath = "C:/Users/admin/Downloads/搜索关键字报告 (22).xlsx";
const campaigns = ["C-UAS 英语 短语", "C-UAS 中东 短语", "C-UAS 南美 短语"];

const groupMap = new Map([
  ["Drone Defender Core", "Drone Defender"],
  ["Drone Defender Purchase", "Drone Defender Purchase"],
  ["Drone Defender Specifications", "Drone Defender"],
  ["Drone Locator Systems", "Drone Locator"],
  ["Drone Location Tracking", "Drone Location Tracker"],
  ["Drone Shield Systems", "Drone Shield"],
  ["Drone Shield Purchase", "Drone Shield Purchase"],
  ["Drone Jammer Systems", "Drone Jammer"],
  ["RF Drone Jammer", "RF Drone Jammer"],
  ["Fixed Directional Jammer", "Directional Drone Jammer"],
  ["Portable Drone Jammer", "Portable Drone Jammer"],
  ["Handheld Drone Jammer", "Handheld Drone Jammer"],
  ["Backpack Drone Jammer", "Backpack Drone Jammer"],
  ["Vehicle Drone Jammer", "Vehicle Drone Jammer"],
  ["Drone Jammer Purchase", "Drone Jammer Purchase"],
]);

const groupConfigs = [
  ["Drone Defender", "Drone Defender", "https://n-tet.com/solutions/drone-defender", "defender", "systems"],
  ["Drone Defender Purchase", "Drone Defender", "https://n-tet.com/solutions/drone-defender", "defender", "purchase"],
  ["Drone Locator", "Drone Locator", "https://n-tet.com/solutions/drone-locator", "locator", "systems"],
  ["Drone Location Tracker", "Drone Tracker", "https://n-tet.com/solutions/drone-locator", "locator", "tracking"],
  ["Drone Shield", "Drone Shield", "https://n-tet.com/solutions/drone-shield", "shield", "systems"],
  ["Drone Shield Purchase", "Drone Shield", "https://n-tet.com/solutions/drone-shield", "shield", "purchase"],
  ["Drone Jammer", "Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "drone-jammer", "systems"],
  ["RF Drone Jammer", "RF Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "rf-jammer", "drones"],
  ["Directional Drone Jammer", "Directional Jammer", "https://n-tet.com/solutions/drone-jammer", "directional", "jammer"],
  ["Portable Drone Jammer", "Portable Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "portable", "jammer"],
  ["Handheld Drone Jammer", "Handheld Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "handheld", "jammer"],
  ["Backpack Drone Jammer", "Backpack Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "backpack", "jammer"],
  ["Vehicle Drone Jammer", "Vehicle Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "vehicle", "jammer"],
  ["Drone Jammer Purchase", "Drone Jammer", "https://n-tet.com/solutions/drone-jammer", "jammer", "purchase"],
].map(([adGroup, fallback, url, path1, path2]) => ({ adGroup, fallback, url, path1, path2 }));
const configByGroup = new Map(groupConfigs.map((item) => [item.adGroup, item]));

function normalize(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}
function renderedDki(value) {
  return String(value).replace(/\{KeyWord:([^}]+)\}/g, "$1");
}
function makeAssets(fallback) {
  const dki = `{KeyWord:${fallback}}`;
  return {
    headlines: [
      dki, `Buy ${dki}`, `Get ${dki}`, `${dki} Quote`, `${dki} Price`, `${dki} Supplier`,
      `N-TET ${dki}`, `Pro ${dki}`, `Custom ${dki}`, `Explore ${dki}`, `Compare ${dki}`,
      `${dki} Options`, `${dki} Export`, `${dki} Factory`, `Project ${dki}`,
    ],
    descriptions: [
      `Request a quote for ${dki} for authorized security projects.`,
      `Compare ${dki} options for airports, industrial sites and facilities.`,
      `Discuss ${dki} supply, deployment and project requirements with N-TET.`,
      `Explore professional ${dki} solutions with supplier and project support.`,
    ],
  };
}

const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourceKeywordFile));
const sourceValues = sourceWb.worksheets.getItemAt(0).getUsedRange(true).values;
const keywordHeaders = sourceValues[0].map((value) => String(value ?? ""));
const keywordIndex = new Map(keywordHeaders.map((header, i) => [header, i]));
const technicalPattern = /\b(capabilities?|specs?|specifications?|technology|technologies)\b/i;
const sourceDeviceRows = sourceValues.slice(1)
  .filter((row) => !technicalPattern.test(String(row[keywordIndex.get("Keyword")] ?? "")))
  .map((row) => ({
    keyword: normalize(row[keywordIndex.get("Keyword")]),
    sourceGroup: String(row[keywordIndex.get("Ad group")] ?? ""),
    url: String(row[keywordIndex.get("Final URL")] ?? ""),
  }));
if (sourceDeviceRows.length !== 74) throw new Error(`Expected 74 device keywords, got ${sourceDeviceRows.length}`);
for (const item of sourceDeviceRows) {
  if (!groupMap.has(item.sourceGroup)) throw new Error(`Unmapped source ad group: ${item.sourceGroup}`);
}

const reportWb = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const reportValues = reportWb.worksheets.getItemAt(0).getUsedRange(true).values;
const reportHeaders = reportValues[2].map((value) => String(value ?? ""));
const reportIndex = new Map(reportHeaders.map((header, i) => [header, i]));
const existingGroups = new Set(reportValues.slice(3).map((row) => `${row[reportIndex.get("广告系列")]}\u0000${row[reportIndex.get("广告组")]}`));
const groupConflicts = [];
for (const campaign of campaigns) {
  for (const config of groupConfigs) {
    if (existingGroups.has(`${campaign}\u0000${config.adGroup}`)) groupConflicts.push({ campaign, adGroup: config.adGroup });
  }
}
if (groupConflicts.length) throw new Error(`Target ad groups already exist: ${JSON.stringify(groupConflicts)}`);

const adGroupSource = await SpreadsheetFile.importXlsx(await FileBlob.load(adGroupTemplateSource));
const adGroupHeaders = adGroupSource.worksheets.getItemAt(0).getUsedRange(true).values[0].map((value) => String(value ?? ""));
const adGroupIndex = new Map(adGroupHeaders.map((header, i) => [header, i]));
const rsaSource = await SpreadsheetFile.importXlsx(await FileBlob.load(rsaTemplateSource));
const rsaHeaders = rsaSource.worksheets.getItemAt(0).getUsedRange(true).values[0].map((value) => String(value ?? ""));
const rsaIndex = new Map(rsaHeaders.map((header, i) => [header, i]));

const adGroupRows = [];
const keywordRows = [];
const rsaRows = [];
for (const campaign of campaigns) {
  for (const config of groupConfigs) {
    const row = Array(adGroupHeaders.length).fill(null);
    row[adGroupIndex.get("Row Type")] = "Ad group";
    row[adGroupIndex.get("Action")] = "Add";
    row[adGroupIndex.get("Ad group status")] = "Enabled";
    row[adGroupIndex.get("Campaign")] = campaign;
    row[adGroupIndex.get("Ad group")] = config.adGroup;
    row[adGroupIndex.get("Ad group type")] = "Standard";
    row[adGroupIndex.get("Ad rotation")] = "Optimize";
    row[adGroupIndex.get("Label")] = "DEVICE_ROOT_PHRASE_20260716";
    adGroupRows.push(row);

    const assets = makeAssets(config.fallback);
    const headlineLengths = assets.headlines.map((value) => renderedDki(value).length);
    const descriptionLengths = assets.descriptions.map((value) => renderedDki(value).length);
    if (Math.max(...headlineLengths) > 30 || Math.max(...descriptionLengths) > 90) {
      throw new Error(`${config.adGroup}: ad asset too long`);
    }
    const rsaRow = Array(rsaHeaders.length).fill(null);
    rsaRow[rsaIndex.get("Row Type")] = "Ad";
    rsaRow[rsaIndex.get("Action")] = "Add";
    rsaRow[rsaIndex.get("Ad status")] = "Enabled";
    rsaRow[rsaIndex.get("Campaign")] = campaign;
    rsaRow[rsaIndex.get("Ad group")] = config.adGroup;
    rsaRow[rsaIndex.get("Ad type")] = "Responsive search ad";
    rsaRow[rsaIndex.get("Label")] = "DEVICE_ROOT_RSA_DKI_20260716";
    assets.headlines.forEach((value, i) => { rsaRow[rsaIndex.get(`Headline ${i + 1}`)] = value; });
    assets.descriptions.forEach((value, i) => { rsaRow[rsaIndex.get(`Description ${i + 1}`)] = value; });
    rsaRow[rsaIndex.get("Path 1")] = config.path1;
    rsaRow[rsaIndex.get("Path 2")] = config.path2;
    rsaRow[rsaIndex.get("Final URL")] = config.url;
    rsaRows.push(rsaRow);
  }

  for (const item of sourceDeviceRows) {
    const adGroup = groupMap.get(item.sourceGroup);
    const row = Array(keywordHeaders.length).fill(null);
    row[keywordIndex.get("Row Type")] = "Keyword";
    row[keywordIndex.get("Action")] = "Add";
    row[keywordIndex.get("Keyword status")] = "Enabled";
    row[keywordIndex.get("Campaign")] = campaign;
    row[keywordIndex.get("Ad group")] = adGroup;
    row[keywordIndex.get("Keyword")] = item.keyword;
    row[keywordIndex.get("Type")] = "Phrase match";
    row[keywordIndex.get("Label")] = "DEVICE_ROOT_PHRASE_20260716";
    row[keywordIndex.get("Final URL")] = item.url;
    keywordRows.push(row);
  }
}

async function makeStaging(name, headers, rows) {
  const wb = Workbook.create();
  const sheet = wb.worksheets.add("Sheet0");
  sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
  sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
  const file = path.join(outDir, `${name}_staging_artifact.xlsx`);
  await (await SpreadsheetFile.exportXlsx(wb)).save(file);
  const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const values = verify.worksheets.getItemAt(0).getUsedRange(true).values;
  if (values.length !== rows.length + 1 || values[0].length !== headers.length) throw new Error(`${name}: staging verification failed`);
}

await makeStaging("01_ad_groups", adGroupHeaders, adGroupRows);
await makeStaging("02_keywords", keywordHeaders, keywordRows);
await makeStaging("03_rsa", rsaHeaders, rsaRows);

const payloads = [
  { templateName: "ad_group_template.xlsx", outputName: "01_Ad_Groups_Device_Roots_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", expectedRows: adGroupRows.length, expectedColumns: adGroupHeaders.length, headers: adGroupHeaders, rows: adGroupRows },
  { templateName: "keyword_template.xlsx", outputName: "02_Keywords_Device_Roots_Phrase_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", expectedRows: keywordRows.length, expectedColumns: keywordHeaders.length, headers: keywordHeaders, rows: keywordRows },
  { templateName: "responsive_search_ad_template.xlsx", outputName: "03_RSA_DKI_Device_Roots_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", expectedRows: rsaRows.length, expectedColumns: rsaHeaders.length, headers: rsaHeaders, rows: rsaRows },
];
const groupCounts = {};
for (const row of keywordRows) {
  const group = row[keywordIndex.get("Ad group")];
  groupCounts[group] = (groupCounts[group] ?? 0) + 1;
}
const qa = {
  campaigns,
  rootGroups: groupConfigs.map((item) => item.adGroup),
  adGroupRows: adGroupRows.length,
  keywordRows: keywordRows.length,
  rsaRows: rsaRows.length,
  uniqueKeywords: new Set(sourceDeviceRows.map((item) => item.keyword)).size,
  keywordType: [...new Set(keywordRows.map((row) => row[keywordIndex.get("Type")]))],
  groupCountsAcrossThreeCampaigns: groupCounts,
  allRsaHeadlinesDki: rsaRows.every((row) => Array.from({ length: 15 }, (_, i) => row[rsaIndex.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  allRsaDescriptionsDki: rsaRows.every((row) => Array.from({ length: 4 }, (_, i) => row[rsaIndex.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value)))),
  maxRenderedHeadlineLength: Math.max(...groupConfigs.flatMap((config) => makeAssets(config.fallback).headlines.map((value) => renderedDki(value).length))),
  maxRenderedDescriptionLength: Math.max(...groupConfigs.flatMap((config) => makeAssets(config.fallback).descriptions.map((value) => renderedDki(value).length))),
  groupConflicts,
};
await fs.writeFile(path.join(outDir, "root_group_payloads.json"), JSON.stringify(payloads), "utf8");
await fs.writeFile(path.join(outDir, "root_group_build_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify(qa, null, 2));
