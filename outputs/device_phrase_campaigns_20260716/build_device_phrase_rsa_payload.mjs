import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const templateSource = "D:/fc-cuas/outputs/four_solution_campaigns_20260716/03_RSA_DKI_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const outputName = "C-UAS_3_Campaigns_Device_Phrase_RSA_DKI_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const campaigns = ["C-UAS 英语 短语", "C-UAS 中东 短语", "C-UAS 南美 短语"];

const antiDroneAssets = {
  adGroup: "Anti Drone Equipment",
  url: "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
  path1: "anti-drone",
  path2: "equipment",
  headlines: [
    "{KeyWord:Anti Drone Gear}",
    "Buy {KeyWord:C-UAS Equipment}",
    "{KeyWord:Anti Drone Device} Quote",
    "{KeyWord:C-UAS Device} Supplier",
    "{KeyWord:Drone Defense Gear} Price",
    "Explore {KeyWord:Anti Drone Gear}",
    "N-TET {KeyWord:C-UAS Equipment}",
    "Pro {KeyWord:Anti Drone Device}",
    "Custom {KeyWord:C-UAS Device}",
    "{KeyWord:Anti Drone System} OEM",
    "{KeyWord:C-UAS Equipment} Export",
    "Compare {KeyWord:Anti Drone Gear}",
    "{KeyWord:Drone Defense Gear} Sale",
    "Get {KeyWord:C-UAS Device}",
    "Project {KeyWord:Anti Drone Gear}",
  ],
  descriptions: [
    "Request a quote for {KeyWord:anti drone equipment} for airports and critical sites.",
    "Compare portable and fixed {KeyWord:C-UAS device} options with N-TET project support.",
    "Discuss {KeyWord:anti drone systems} for industrial sites, facilities and airspace security.",
    "Explore professional {KeyWord:drone defense equipment} with supplier and project options.",
  ],
};

const locatorAssets = {
  adGroup: "Drone Detector Equipment",
  url: "https://n-tet.com/solutions/drone-locator",
  path1: "drone-locator",
  path2: "equipment",
  headlines: [
    "{KeyWord:Drone Locator}",
    "Buy {KeyWord:Drone Locator}",
    "{KeyWord:Drone Detection Gear}",
    "{KeyWord:Drone Locator} Supplier",
    "{KeyWord:Drone Locator Device}",
    "{KeyWord:Drone Tracker} Quote",
    "Portable {KeyWord:Drone Detector}",
    "{KeyWord:Drone Finder} System",
    "{KeyWord:UAV Locator} Equipment",
    "Pro {KeyWord:Drone Tracker}",
    "{KeyWord:Drone Locator} Factory",
    "{KeyWord:Drone Tracking Gear}",
    "{KeyWord:Drone Locator} Price",
    "Custom {KeyWord:Drone Tracker}",
    "{KeyWord:Drone Locator} Export",
  ],
  descriptions: [
    "Request a quote for {KeyWord:drone locator equipment} for airports and critical sites.",
    "Compare portable and fixed {KeyWord:drone detection devices} with N-TET project support.",
    "Discuss {KeyWord:drone tracking systems} for industrial sites and managed facilities.",
    "Explore professional {KeyWord:drone locator devices} with supplier and project options.",
  ],
};

function renderedDki(value) {
  return String(value).replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

function validateAssets(name, assets) {
  if (assets.headlines.length !== 15 || assets.descriptions.length !== 4) throw new Error(`${name}: wrong asset count`);
  const all = [...assets.headlines, ...assets.descriptions];
  const missingDki = all.filter((value) => !/\{KeyWord:[^}]+\}/.test(value));
  const longHeadlines = assets.headlines.filter((value) => renderedDki(value).length > 30);
  const longDescriptions = assets.descriptions.filter((value) => renderedDki(value).length > 90);
  const duplicateHeadlines = assets.headlines.filter((value, index, array) => array.indexOf(value) !== index);
  const duplicateDescriptions = assets.descriptions.filter((value, index, array) => array.indexOf(value) !== index);
  if (missingDki.length || longHeadlines.length || longDescriptions.length || duplicateHeadlines.length || duplicateDescriptions.length) {
    throw new Error(`${name}: ${JSON.stringify({ missingDki, longHeadlines, longDescriptions, duplicateHeadlines, duplicateDescriptions })}`);
  }
}

validateAssets("Anti Drone Equipment", antiDroneAssets);
validateAssets("Drone Detector Equipment", locatorAssets);

const source = await SpreadsheetFile.importXlsx(await FileBlob.load(templateSource));
const headers = source.worksheets.getItemAt(0).getUsedRange(true).values[0].map((value) => String(value ?? ""));
const index = new Map(headers.map((header, i) => [header, i]));
for (const required of ["Row Type", "Action", "Ad status", "Campaign", "Ad group", "Ad type", "Label", "Headline 1", "Headline 15", "Description 1", "Description 4", "Path 1", "Path 2", "Final URL"]) {
  if (!index.has(required)) throw new Error(`Missing RSA header: ${required}`);
}

const rows = [];
for (const campaign of campaigns) {
  for (const assets of [antiDroneAssets, locatorAssets]) {
    const row = Array(headers.length).fill(null);
    row[index.get("Row Type")] = "Ad";
    row[index.get("Action")] = "Add";
    row[index.get("Ad status")] = "Enabled";
    row[index.get("Campaign")] = campaign;
    row[index.get("Ad group")] = assets.adGroup;
    row[index.get("Ad type")] = "Responsive search ad";
    row[index.get("Label")] = "DEVICE_PHRASE_RSA_DKI_20260716";
    assets.headlines.forEach((value, i) => { row[index.get(`Headline ${i + 1}`)] = value; });
    assets.descriptions.forEach((value, i) => { row[index.get(`Description ${i + 1}`)] = value; });
    row[index.get("Path 1")] = assets.path1;
    row[index.get("Path 2")] = assets.path2;
    row[index.get("Final URL")] = assets.url;
    rows.push(row);
  }
}

const staging = Workbook.create();
const sheet = staging.worksheets.add("Sheet0");
sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
const stagingPath = path.join(outDir, "device_phrase_rsa_staging_artifact.xlsx");
await (await SpreadsheetFile.exportXlsx(staging)).save(stagingPath);

const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(stagingPath));
const verifyValues = verify.worksheets.getItemAt(0).getUsedRange(true).values;
if (verifyValues.length !== 7 || verifyValues[0].length !== 55 || verifyValues[0][0] !== "Row Type" || verifyValues[1][0] !== "Ad") {
  throw new Error("RSA staging verification failed");
}

const payload = [{
  templateName: "responsive_search_ad_template.xlsx",
  outputName,
  expectedRows: rows.length,
  expectedColumns: headers.length,
  headers,
  rows,
}];
const qa = {
  rows: rows.length,
  campaigns,
  adGroups: [antiDroneAssets.adGroup, locatorAssets.adGroup],
  allHeadlinesUseDki: rows.every((row) => Array.from({ length: 15 }, (_, i) => row[index.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(value))),
  allDescriptionsUseDki: rows.every((row) => Array.from({ length: 4 }, (_, i) => row[index.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(value))),
  maxRenderedHeadlineLength: Math.max(...[...antiDroneAssets.headlines, ...locatorAssets.headlines].map((value) => renderedDki(value).length)),
  maxRenderedDescriptionLength: Math.max(...[...antiDroneAssets.descriptions, ...locatorAssets.descriptions].map((value) => renderedDki(value).length)),
};
await fs.writeFile(path.join(outDir, "device_phrase_rsa_payload.json"), JSON.stringify(payload), "utf8");
await fs.writeFile(path.join(outDir, "device_phrase_rsa_copy_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify(qa, null, 2));
