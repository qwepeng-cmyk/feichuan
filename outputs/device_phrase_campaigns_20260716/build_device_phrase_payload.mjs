import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const sourcePath = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/02_Keywords_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const reportPath = "C:/Users/admin/Downloads/搜索关键字报告 (22).xlsx";
const outputName = "C-UAS_3_Campaigns_Device_Phrase_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const stagingPath = path.join(outDir, "device_phrase_staging_artifact.xlsx");
const targetCampaigns = ["C-UAS 英语 短语", "C-UAS 中东 短语", "C-UAS 南美 短语"];

function normalizeKeyword(value) {
  return String(value ?? "").trim().replace(/^\"|\"$/g, "").trim().toLowerCase().replace(/\s+/g, " ");
}

const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sourceValues = sourceWb.worksheets.getItemAt(0).getUsedRange(true).values;
const headers = sourceValues[0].map((value) => String(value ?? ""));
const sourceIndex = new Map(headers.map((header, index) => [header, index]));
const requiredHeaders = ["Row Type", "Action", "Keyword status", "Campaign", "Ad group", "Keyword", "Type", "Label", "Final URL"];
const missingHeaders = requiredHeaders.filter((header) => !sourceIndex.has(header));
if (missingHeaders.length) throw new Error(`Source keyword file missing: ${missingHeaders.join(", ")}`);

const technicalPattern = /\b(capabilities?|specs?|specifications?|technology|technologies)\b/i;
const sourceRows = sourceValues.slice(1).map((row) => ({
  keyword: normalizeKeyword(row[sourceIndex.get("Keyword")]),
  sourceAdGroup: String(row[sourceIndex.get("Ad group")] ?? ""),
  url: String(row[sourceIndex.get("Final URL")] ?? ""),
}));
const excludedTechnical = sourceRows.filter((item) => technicalPattern.test(item.keyword));
const deviceCandidates = sourceRows.filter((item) => item.keyword && !technicalPattern.test(item.keyword));
const uniqueCandidates = [...new Map(deviceCandidates.map((item) => [item.keyword, item])).values()];

const reportWb = await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const reportValues = reportWb.worksheets.getItemAt(0).getUsedRange(true).values;
const reportHeaders = reportValues[2].map((value) => String(value ?? ""));
const reportIndex = new Map(reportHeaders.map((header, index) => [header, index]));
for (const header of ["关键字", "匹配类型", "广告系列", "广告组"]) {
  if (!reportIndex.has(header)) throw new Error(`Report missing header: ${header}`);
}

const existingPhrase = new Set();
const campaignGroups = new Map(targetCampaigns.map((campaign) => [campaign, new Set()]));
for (const row of reportValues.slice(3)) {
  const campaign = String(row[reportIndex.get("广告系列")] ?? "");
  if (!targetCampaigns.includes(campaign)) continue;
  const adGroup = String(row[reportIndex.get("广告组")] ?? "");
  campaignGroups.get(campaign).add(adGroup);
  const matchType = String(row[reportIndex.get("匹配类型")] ?? "");
  if (matchType.includes("词组")) {
    existingPhrase.add(`${campaign}\u0000${normalizeKeyword(row[reportIndex.get("关键字")])}`);
  }
}

for (const campaign of targetCampaigns) {
  for (const requiredGroup of ["Anti Drone Equipment", "Drone Detector Equipment"]) {
    if (!campaignGroups.get(campaign).has(requiredGroup)) {
      throw new Error(`${campaign} does not contain required ad group: ${requiredGroup}`);
    }
  }
}

const rows = [];
const skippedExisting = [];
for (const campaign of targetCampaigns) {
  for (const item of uniqueCandidates) {
    const duplicateKey = `${campaign}\u0000${item.keyword}`;
    if (existingPhrase.has(duplicateKey)) {
      skippedExisting.push({ campaign, keyword: item.keyword });
      continue;
    }
    const adGroup = item.url.endsWith("/drone-locator") ? "Drone Detector Equipment" : "Anti Drone Equipment";
    const row = Array(headers.length).fill(null);
    row[sourceIndex.get("Row Type")] = "Keyword";
    row[sourceIndex.get("Action")] = "Add";
    row[sourceIndex.get("Keyword status")] = "Enabled";
    row[sourceIndex.get("Campaign")] = campaign;
    row[sourceIndex.get("Ad group")] = adGroup;
    row[sourceIndex.get("Keyword")] = item.keyword;
    row[sourceIndex.get("Type")] = "Phrase match";
    row[sourceIndex.get("Label")] = "DEVICE_PHRASE_20260716";
    row[sourceIndex.get("Final URL")] = item.url;
    rows.push(row);
  }
}

const duplicateRows = [];
const dedupe = new Set();
for (const row of rows) {
  const key = [row[sourceIndex.get("Campaign")], row[sourceIndex.get("Ad group")], row[sourceIndex.get("Keyword")], row[sourceIndex.get("Type")]].join("\u0000");
  if (dedupe.has(key)) duplicateRows.push(key);
  dedupe.add(key);
}
if (duplicateRows.length) throw new Error(`Generated duplicate rows: ${duplicateRows.length}`);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Sheet0");
sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
await (await SpreadsheetFile.exportXlsx(workbook)).save(stagingPath);

const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(stagingPath));
const verifyValues = verify.worksheets.getItemAt(0).getUsedRange(true).values;
if (verifyValues.length !== rows.length + 1 || verifyValues[0][0] !== "Row Type" || verifyValues[0][1] !== "Action") {
  throw new Error("Artifact staging verification failed");
}

const payload = [{
  templateName: "keyword_template.xlsx",
  outputName,
  expectedRows: rows.length,
  expectedColumns: headers.length,
  headers,
  rows,
}];
const countsByCampaign = Object.fromEntries(targetCampaigns.map((campaign) => [campaign, rows.filter((row) => row[sourceIndex.get("Campaign")] === campaign).length]));
const countsByAdGroup = {};
for (const row of rows) {
  const key = `${row[sourceIndex.get("Campaign")]} / ${row[sourceIndex.get("Ad group")]}`;
  countsByAdGroup[key] = (countsByAdGroup[key] ?? 0) + 1;
}
const summary = {
  sourceRows: sourceRows.length,
  technicalExcluded: excludedTechnical.map((item) => item.keyword),
  deviceCandidateKeywords: uniqueCandidates.length,
  skippedExistingPhraseRows: skippedExisting,
  outputRows: rows.length,
  countsByCampaign,
  countsByAdGroup,
  typeValues: [...new Set(rows.map((row) => row[sourceIndex.get("Type")]))],
  campaigns: [...new Set(rows.map((row) => row[sourceIndex.get("Campaign")]))],
  duplicateRows,
};

await fs.writeFile(path.join(outDir, "device_phrase_payload.json"), JSON.stringify(payload), "utf8");
await fs.writeFile(path.join(outDir, "device_phrase_summary.json"), JSON.stringify(summary, null, 2), "utf8");
console.log(JSON.stringify(summary, null, 2));
