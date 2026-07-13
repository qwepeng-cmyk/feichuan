import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const outputFile = `${root}/N-TET_RSA_DKI_Ads_20260713.xlsx`;
const source = JSON.parse(await fs.readFile(`${root}/extracted_ads_data.json`, "utf8"));
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(`${root}/template.xlsx`));
const uploadSheet = workbook.worksheets.getItemAt(0);
const headers = uploadSheet.getRange("A3:BC3").values[0].map(String);

const headlineFields = Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`);
const descriptionFields = Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`);
const safeLandingUrl = "https://n-tet.com/solutions/low-altitude-airspace-monitoring";
const tierBUrls = new Set([
  "https://n-tet.com/products/stationary-rf-detection-system",
]);

function cleanCell(value) {
  if (value == null || value === "--") return "";
  return String(value);
}

function mapStatus(value) {
  const status = String(value ?? "");
  if (status.includes("暂停")) return "Paused";
  if (status.includes("移除")) return "Removed";
  if (status.includes("启用")) return "Enabled";
  return "";
}

const profiles = {
  radar: {
    defaults: ["Drone Radar", "UAV Radar", "Detection Radar"],
    path1: "drone-radar",
    path2: "detection",
    descriptions: [
      "{T} for low-altitude tracking and site surveillance. Request radar specifications.",
      "Compare {T} options for 3D detection, tracking and professional deployments.",
      "Build a {T} plan for critical sites with engineering and integration support.",
      "Need {T}? Review radar models, technical options and project-fit guidance.",
    ],
  },
  portable: {
    defaults: ["Drone Detector", "Portable Detector", "Handheld Detector"],
    path1: "drone-detector",
    path2: "portable",
    descriptions: [
      "{T} for rapid field deployment, RF monitoring and on-site drone awareness.",
      "Compare {T} options for handheld, suitcase and mobile site deployments.",
      "Take {T} from site survey to deployment with N-TET project support.",
      "Need {T}? Review portable models, specifications and quotation options.",
    ],
  },
  rf: {
    defaults: ["RF Detection", "RF Drone Detector", "RF Monitoring"],
    path1: "rf-detection",
    path2: "systems",
    descriptions: [
      "{T} for professional drone signal monitoring, alerts and site awareness.",
      "Compare {T} options for fixed, portable and multi-sensor deployments.",
      "Build an {T} plan with technical specifications and integration support.",
      "Need {T}? Review models, deployment options and project-fit guidance.",
    ],
  },
  remote: {
    defaults: ["Remote ID", "Drone Identification", "Remote ID System"],
    path1: "remote-id",
    path2: "monitoring",
    descriptions: [
      "{T} for drone identity signals, site awareness and monitoring workflows.",
      "Compare {T} options for identification, records and site integration.",
      "Build a {T} plan with technical guidance and project support.",
      "Need {T}? Review receiver options, specs and deployment guidance.",
    ],
  },
  tracking: {
    defaults: ["Drone Tracking", "UAV Tracking", "Tracking System"],
    path1: "drone-tracking",
    path2: "systems",
    descriptions: [
      "{T} for low-altitude awareness, target updates and professional sites.",
      "Compare {T} options across radar, RF and multi-sensor configurations.",
      "Build a {T} plan with system integration and project engineering support.",
      "Need {T}? Review technical options, deployment plans and quotation details.",
    ],
  },
  unauthorized: {
    defaults: ["Drone Alerts", "UAV Alerts", "Drone Detection"],
    path1: "drone-alerts",
    path2: "monitoring",
    descriptions: [
      "{T} for unauthorized activity, site awareness and operator workflows.",
      "Compare {T} options for critical facilities and low-altitude monitoring.",
      "Build a {T} plan with detection, identification and integration support.",
      "Need {T}? Review system options, specifications and project-fit guidance.",
    ],
  },
  mobile: {
    defaults: ["Mobile C-UAS", "Mobile Detection", "Vehicle C-UAS"],
    path1: "mobile-cuas",
    path2: "detection",
    descriptions: [
      "{T} for flexible site monitoring, alerts and rapid operational deployment.",
      "Compare {T} options for vehicle, portable and temporary site projects.",
      "Build a {T} plan with engineering, integration and deployment support.",
      "Need {T}? Review configurations, specifications and quotation options.",
    ],
  },
  anti: {
    defaults: ["Anti-Drone", "Anti-Drone System", "Anti-Drone Detection"],
    path1: "anti-drone",
    path2: "detection",
    descriptions: [
      "{T} for detection, identification, tracking and professional site awareness.",
      "Compare {T} options across RF, radar and portable system configurations.",
      "Build an {T} plan for critical sites with N-TET engineering support.",
      "Need {T}? Review equipment options, technical specs and project guidance.",
    ],
  },
  cuas: {
    defaults: ["C-UAS", "C-UAS System", "C-UAS Detection"],
    path1: "c-uas",
    path2: "detection",
    descriptions: [
      "{T} for detection, identification, tracking and critical-site awareness.",
      "Compare {T} options across RF, radar and portable system configurations.",
      "Build a {T} plan with site engineering, integration and project support.",
      "Need {T}? Review system options, specifications and quotation guidance.",
    ],
  },
  uav: {
    defaults: ["UAV Detection", "UAV Detector", "UAS Detection"],
    path1: "uav-detection",
    path2: "systems",
    descriptions: [
      "{T} for professional site monitoring, alerts and low-altitude awareness.",
      "Compare {T} options across RF, radar, fixed and portable deployments.",
      "Build a {T} plan with technical specifications and integration support.",
      "Need {T}? Review equipment, system options and project-fit guidance.",
    ],
  },
  general: {
    defaults: ["Drone Detection", "Drone Detector", "Detection System"],
    path1: "drone-detection",
    path2: "systems",
    descriptions: [
      "{T} for professional monitoring, alerts and low-altitude site awareness.",
      "Compare {T} options across RF, radar, fixed and portable deployments.",
      "Build a {T} plan with technical specifications and integration support.",
      "Need {T}? Review equipment, system options and project-fit guidance.",
    ],
  },
};

function classify(adGroup) {
  const name = String(adGroup || "").toLowerCase();
  if (name.includes("radar")) return "radar";
  if (name.includes("remote id") || name.includes("identification")) return "remote";
  if (name.includes("rf spectrum") || name === "rf detection") return "rf";
  if (name.includes("tracking")) return "tracking";
  if (name.includes("unauthorized") || name.includes("intrusion")) return "unauthorized";
  if (name.includes("mobile")) return "mobile";
  if (name.includes("drone detector equipment")) return "portable";
  if (name.includes("countermeasure") || name.includes("defense") || name.includes("defender")) return "cuas";
  if (name.includes("c-uas") || name.includes("c-uav") || name.includes("counter uas") || name.includes("counter uav") || name.includes("counter drone")) return "cuas";
  if (name.includes("anti drone") || name.includes("anti uav")) return "anti";
  if (name.includes("uav") || name.includes("uas")) return "uav";
  return "general";
}

function keywordToken(defaultText) {
  return `{KeyWord:${defaultText}}`;
}

function displayDefault(text) {
  return text.replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

const headlinePatterns = [
  "{T}",
  "Get {T}",
  "View {T}",
  "Explore {T}",
  "Compare {T}",
  "Deploy {T}",
  "Choose {T}",
  "Upgrade To {T}",
  "N-TET {T}",
  "Pro {T}",
  "Site {T}",
  "{T} Now",
  "{T} Quote",
  "{T} Specs",
  "{T} Options",
  "{T} Experts",
  "{T} Supplier",
  "{T} Systems",
  "{T} Equipment",
  "Secure With {T}",
  "Built Around {T}",
  "Act Fast With {T}",
  "Airspace Ready: {T}",
  "Own Airspace: {T}",
];

function makeAssets(profileName, variantIndex) {
  const profile = profiles[profileName];
  const defaultText = profile.defaults[variantIndex % profile.defaults.length];
  const token = keywordToken(defaultText);
  const candidates = headlinePatterns
    .map((pattern) => pattern.replace("{T}", token))
    .filter((headline) => displayDefault(headline).length <= 30);
  const rotateBy = (variantIndex * 5) % candidates.length;
  const rotated = [...candidates.slice(rotateBy), ...candidates.slice(0, rotateBy)];
  const headlines = [];
  const seen = new Set();
  for (const headline of rotated) {
    const display = displayDefault(headline).toLowerCase();
    if (!seen.has(display)) {
      headlines.push(headline);
      seen.add(display);
    }
    if (headlines.length === 15) break;
  }
  if (headlines.length !== 15) throw new Error(`Not enough valid headlines for ${profileName}/${defaultText}`);
  const descriptions = profile.descriptions.map((pattern) => pattern.replace("{T}", token));
  return { profile, defaultText, headlines, descriptions };
}

const keywordMap = new Map();
for (const row of source.keywords) {
  const campaign = row["广告系列"];
  const adGroup = row["广告组"];
  const keyword = cleanCell(row["关键字"]);
  if (!campaign || !adGroup || !keyword) continue;
  const key = `${campaign}|||${adGroup}`;
  if (!keywordMap.has(key)) keywordMap.set(key, []);
  keywordMap.get(key).push(keyword);
}

const variantCounters = new Map();
const uploadObjects = [];
const validationRows = [];
let remappedUrls = 0;

for (const ad of source.ads) {
  const campaign = cleanCell(ad["广告系列"]);
  const adGroup = cleanCell(ad["广告组"]);
  const adId = cleanCell(ad["广告 ID"]);
  if (!campaign || !adGroup || !adId) continue;

  const key = `${campaign}|||${adGroup}`;
  const variantIndex = variantCounters.get(key) || 0;
  variantCounters.set(key, variantIndex + 1);
  const profileName = classify(adGroup);
  const assets = makeAssets(profileName, variantIndex);
  const sourceUrl = cleanCell(ad["最终到达网址"]) || safeLandingUrl;
  const finalUrl = tierBUrls.has(sourceUrl) ? safeLandingUrl : sourceUrl;
  if (finalUrl !== sourceUrl) remappedUrls += 1;

  const row = Object.fromEntries(headers.map((header) => [header, ""]));
  Object.assign(row, {
    "Row Type": "Ad",
    Action: "Edit",
    "Ad status": mapStatus(ad["广告状态"]),
    "Campaign ID": cleanCell(ad["广告系列 ID"]),
    Campaign: campaign,
    "Ad group ID": cleanCell(ad["广告组 ID"]),
    "Ad group": adGroup,
    "Ad ID": adId,
    "Ad type": "Responsive search ad",
    Label: "DKI_RSA_20260713",
    "Path 1": assets.profile.path1,
    "Path 2": assets.profile.path2,
    "Final URL": finalUrl,
    "Mobile final URL": cleanCell(ad["最终到达移动网址"]),
    "Tracking template": cleanCell(ad["跟踪模板"]),
    "Final URL suffix": cleanCell(ad["最终到达网址后缀"]),
    "Custom parameter": cleanCell(ad["自定义参数"]),
  });
  headlineFields.forEach((field, index) => { row[field] = assets.headlines[index]; });
  descriptionFields.forEach((field, index) => { row[field] = assets.descriptions[index]; });
  uploadObjects.push(row);

  const allAssets = [...assets.headlines, ...assets.descriptions];
  const missingDki = allAssets.filter((asset) => !/\{KeyWord:[^}]+\}/.test(asset));
  const headlineLengths = assets.headlines.map((asset) => displayDefault(asset).length);
  const descriptionLengths = assets.descriptions.map((asset) => displayDefault(asset).length);
  const duplicateHeadlines = assets.headlines.length - new Set(assets.headlines.map((asset) => displayDefault(asset).toLowerCase())).size;
  validationRows.push({
    campaign,
    adGroup,
    adId,
    profile: profileName,
    defaultText: assets.defaultText,
    sourceUrl,
    finalUrl,
    keywordCount: (keywordMap.get(key) || []).length,
    missingDki: missingDki.length,
    maxHeadline: Math.max(...headlineLengths),
    maxDescription: Math.max(...descriptionLengths),
    duplicateHeadlines,
  });
}

const failedRows = validationRows.filter((row) => row.missingDki || row.maxHeadline > 30 || row.maxDescription > 90 || row.duplicateHeadlines);
if (failedRows.length) throw new Error(`Asset validation failed: ${JSON.stringify(failedRows.slice(0, 10))}`);

const uploadRows = uploadObjects.map((row) => headers.map((header) => row[header] ?? ""));
uploadSheet.getRangeByIndexes(4, 0, uploadRows.length, headers.length).values = uploadRows;
uploadSheet.freezePanes.freezeRows(4);
uploadSheet.getRangeByIndexes(4, 0, uploadRows.length, headers.length).format.numberFormat = "@";

const qaSheet = workbook.worksheets.add("QA Summary");
qaSheet.showGridLines = false;
qaSheet.getRange("A1:D1").merge();
qaSheet.getRange("A1").values = [["N-TET RSA Dynamic Keyword Insertion — Upload QA"]];
qaSheet.getRange("A1:D1").format = {
  fill: "#315BA4",
  font: { bold: true, color: "#FFFFFF", fontSize: 15 },
  verticalAlignment: "center",
};
qaSheet.getRange("A1:D1").format.rowHeight = 30;
qaSheet.getRange("A3:D3").values = [["Check", "Result", "Status", "Notes"]];
const totalAssets = uploadRows.length * 19;
const qaRows = [
  ["RSA edit rows", uploadRows.length, "PASS", "Import only the Sheet0 worksheet in Google Ads Editor."],
  ["Dynamic assets", totalAssets, "PASS", "15 headlines and 4 descriptions per RSA; every asset contains {KeyWord:default}."],
  ["Max default headline length", Math.max(...validationRows.map((r) => r.maxHeadline)), "PASS", "Validated against the 30-character displayed-default limit."],
  ["Max default description length", Math.max(...validationRows.map((r) => r.maxDescription)), "PASS", "Validated against the 90-character displayed-default limit."],
  ["Duplicate default headlines", validationRows.reduce((sum, r) => sum + r.duplicateHeadlines, 0), "PASS", "No duplicates within each RSA after rendering the default text."],
  ["B-tier landing URLs remapped", remappedUrls, remappedUrls ? "REVIEW" : "PASS", "Stationary RF product URLs were changed to the A-tier airspace-monitoring landing page."],
  ["Source keyword report", "搜索关键字报告 (18).xlsx", "INFO", "2026-07-06 to 2026-07-12 account keyword structure."],
  ["Source ad report", "广告报告 (6).xlsx", "INFO", "Existing campaign, ad group, ad ID and final URL structure."],
];
qaSheet.getRangeByIndexes(3, 0, qaRows.length, 4).values = qaRows;
qaSheet.getRange("A3:D3").format = {
  fill: "#1A1A2E",
  font: { bold: true, color: "#FFFFFF" },
};
qaSheet.getRange(`A4:D${3 + qaRows.length}`).format = {
  font: { fontSize: 10 },
  verticalAlignment: "top",
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#D9E2F0" },
};
qaSheet.getRange(`C4:C${3 + qaRows.length}`).conditionalFormats.add("containsText", {
  text: "REVIEW",
  format: { fill: "#FFF2CC", font: { bold: true, color: "#8A5A00" } },
});
qaSheet.getRange(`A1:A${3 + qaRows.length}`).format.columnWidth = 28;
qaSheet.getRange(`B1:B${3 + qaRows.length}`).format.columnWidth = 24;
qaSheet.getRange(`C1:C${3 + qaRows.length}`).format.columnWidth = 12;
qaSheet.getRange(`D1:D${3 + qaRows.length}`).format.columnWidth = 70;
qaSheet.freezePanes.freezeRows(3);

const riskPatterns = [
  { reason: "Competitor/trademark keyword — DKI can insert it into ad copy", regex: /\b(?:liteye|titan|madis|stupor|ninja|corian|auds|casic|icarus|cerbair|sting|centaur|bae systems|orion|xpeller|spotter|apolloshield|bumblebee|mesmer|hover|bulat|zov|pulsar|gemini)\b/i },
  { reason: "Restricted/action-oriented wording — review before enabling DKI", regex: /\b(?:jammer|jamming|spoofing|gun|weapon|interceptor|countermeasures?|neutraliz\w*|shoot down|forced landing|return to home|air defense|defen[cs]e|defender)\b/i },
  { reason: "Likely research or wrong-device intent", regex: /\b(?:what is|opencv|computer vision|forecast|malware|mine detection|motor fail\w*|vehicule detection by uav|class c airspace|radar on drone|anti radar|drone anti radar)\b/i },
];

const riskRows = [];
for (const row of source.keywords) {
  const campaign = cleanCell(row["广告系列"]);
  const adGroup = cleanCell(row["广告组"]);
  const keyword = cleanCell(row["关键字"]);
  if (!campaign || !adGroup || !keyword) continue;
  for (const pattern of riskPatterns) {
    if (pattern.regex.test(keyword)) {
      riskRows.push([campaign, adGroup, keyword, pattern.reason]);
      break;
    }
  }
}

const riskSheet = workbook.worksheets.add("Keyword Risk Review");
riskSheet.showGridLines = false;
riskSheet.getRange("A1:D1").merge();
riskSheet.getRange("A1").values = [["Keywords to Review Before Enabling Dynamic Insertion"]];
riskSheet.getRange("A1:D1").format = {
  fill: "#315BA4",
  font: { bold: true, color: "#FFFFFF", fontSize: 14 },
};
riskSheet.getRange("A3:D3").values = [["Campaign", "Ad group", "Keyword", "Review reason"]];
riskSheet.getRange("A3:D3").format = {
  fill: "#1A1A2E",
  font: { bold: true, color: "#FFFFFF" },
};
if (riskRows.length) {
  riskSheet.getRangeByIndexes(3, 0, riskRows.length, 4).values = riskRows;
  riskSheet.getRangeByIndexes(3, 0, riskRows.length, 4).format = {
    font: { fontSize: 10 },
    verticalAlignment: "top",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#E6EAF0" },
  };
}
const riskLastRow = Math.max(3, 3 + riskRows.length);
riskSheet.getRange(`A1:A${riskLastRow}`).format.columnWidth = 32;
riskSheet.getRange(`B1:B${riskLastRow}`).format.columnWidth = 28;
riskSheet.getRange(`C1:C${riskLastRow}`).format.columnWidth = 44;
riskSheet.getRange(`D1:D${riskLastRow}`).format.columnWidth = 62;
riskSheet.freezePanes.freezeRows(3);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputFile);

await fs.writeFile(`${root}/build_summary.json`, JSON.stringify({
  outputFile,
  uploadRows: uploadRows.length,
  dynamicAssets: totalAssets,
  maxHeadline: Math.max(...validationRows.map((r) => r.maxHeadline)),
  maxDescription: Math.max(...validationRows.map((r) => r.maxDescription)),
  remappedUrls,
  riskKeywords: riskRows.length,
  validationRows,
}, null, 2), "utf8");

console.log(JSON.stringify({ outputFile, uploadRows: uploadRows.length, dynamicAssets: totalAssets, remappedUrls, riskKeywords: riskRows.length }));
