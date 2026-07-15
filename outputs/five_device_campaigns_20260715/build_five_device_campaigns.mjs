import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/five_device_campaigns_20260715";
const inspection = JSON.parse(await fs.readFile(path.join(outDir, "source_inspection.json"), "utf8"));

const URLs = {
  detector: "https://n-tet.com/solutions/drone-detector",
  radar: "https://n-tet.com/solutions/drone-radar-detection",
  portable: "https://n-tet.com/solutions/portable-drone-detection",
  monitoring: "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
};

const campaigns = [
  {
    name: "Device - Drone Detector - English",
    budget: 250,
    source: "drone-detector",
    rationale: "主扩量活动；承接 detector、radar、portable 等明确设备意图。",
    groups: [
      {
        name: "Drone Detector Equipment",
        defaultText: "Drone Detector",
        url: URLs.detector,
        path1: "drone-detector",
        path2: "equipment",
        concepts: [
          "drone detector",
          "drone detectors",
          "anti drone detector",
          "drone detection device",
          "drone detection equipment",
          "uav detector",
          "uav detection equipment",
          "drone detector for sale",
          "drone detector price",
          "drone detector supplier",
          "drone detector manufacturer",
        ],
      },
      {
        name: "Drone Radar Detector",
        defaultText: "Radar Detector",
        url: URLs.radar,
        path1: "drone-radar",
        path2: "detection",
        concepts: [
          "anti drone radar detector",
          "drone radar detector",
          "drone detection radar",
          "radar drone detector",
          "uav detection radar",
          "drone detection radar system",
          "counter drone radar",
          "drone radar system",
        ],
      },
      {
        name: "Portable Drone Detector",
        defaultText: "Portable Detector",
        url: URLs.portable,
        path1: "portable",
        path2: "drone-detector",
        concepts: [
          "portable drone detector",
          "handheld drone detector",
          "drone detector handheld",
          "portable uav detector",
          "handheld uav detector",
          "portable rf drone detector",
        ],
      },
    ],
  },
  {
    name: "Device - Drone Locator - English",
    budget: 70,
    source: "drone-locator",
    rationale: "只承接反无人机定位、追踪、测向设备；不投 lost drone、delivery location 或 app。",
    groups: [
      {
        name: "Drone Tracking Equipment",
        defaultText: "Drone Tracker",
        url: URLs.monitoring,
        path1: "drone-tracking",
        path2: "equipment",
        concepts: [
          "drone tracking system",
          "drone tracking equipment",
          "anti drone tracking system",
          "uav tracking system",
          "uav tracking equipment",
          "counter drone tracking system",
        ],
      },
      {
        name: "Drone Location Detection",
        defaultText: "Location Detector",
        url: URLs.detector,
        path1: "drone-location",
        path2: "detection",
        concepts: [
          "drone location detection system",
          "drone location detector",
          "drone localization system",
          "uav location detection",
          "drone position detection system",
        ],
      },
      {
        name: "RF Direction Finding",
        defaultText: "Direction Finder",
        url: URLs.detector,
        path1: "rf-direction",
        path2: "finding",
        concepts: [
          "drone direction finder",
          "uav direction finder",
          "rf direction finding drone detection",
          "drone rf direction finder",
        ],
      },
    ],
  },
  {
    name: "Device - Airspace Shield - English",
    budget: 40,
    source: "drone-shield",
    rationale: "将 shield 重构为站点空域防护设备意图；排除 DroneShield、Shield AI、股票和游戏。",
    groups: [
      {
        name: "Airspace Protection Equipment",
        defaultText: "Airspace Shield",
        url: URLs.monitoring,
        path1: "airspace",
        path2: "protection",
        concepts: [
          "airspace protection system",
          "airspace security equipment",
          "drone intrusion detection system",
          "perimeter drone detection system",
          "critical infrastructure drone detection",
          "site drone detection system",
        ],
      },
      {
        name: "Anti Drone Shield Equipment",
        defaultText: "Site Protection",
        url: URLs.monitoring,
        path1: "anti-drone",
        path2: "site-security",
        concepts: [
          "anti drone shield system",
          "anti-drone shield equipment",
          "drone detection shield system",
          "counter drone protection system",
          "counter uas site protection",
          "anti drone site protection",
        ],
      },
    ],
  },
  {
    name: "Device - Drone Defense - English",
    budget: 50,
    source: "drone-defender",
    rationale: "只投非主动、非武器化的设备/系统采购词；排除 Battelle DroneDefender、gun、rifle、jammer。",
    groups: [
      {
        name: "Drone Defense Equipment",
        defaultText: "Drone Defense",
        url: URLs.monitoring,
        path1: "drone-defense",
        path2: "equipment",
        concepts: [
          "drone defense equipment",
          "anti drone defense system",
          "counter drone defense equipment",
          "uav defense system",
          "drone defense system",
          "drone defense device",
        ],
      },
      {
        name: "Critical Site Drone Defense",
        defaultText: "Site Drone Defense",
        url: URLs.monitoring,
        path1: "critical-site",
        path2: "drone-defense",
        concepts: [
          "airport drone defense system",
          "critical infrastructure drone defense",
          "facility drone defense system",
          "critical site drone detection",
          "industrial site drone detection",
          "border drone detection system",
        ],
      },
    ],
  },
  {
    name: "Device - RF Drone Detection - English",
    budget: 140,
    source: "drone-jammer (safe replacement)",
    rationale: "替代 jammer 活动；只投被动 RF/信号探测设备，jammer、jamming、spoofing 全部否定。",
    groups: [
      {
        name: "RF Drone Detection Equipment",
        defaultText: "RF Drone Detector",
        url: URLs.detector,
        path1: "rf-drone",
        path2: "detection",
        concepts: [
          "rf drone detector",
          "rf drone detection system",
          "anti-drone rf detector",
          "radio frequency drone detector",
          "long range rf drone detector",
          "passive rf drone detection",
        ],
      },
      {
        name: "Drone Signal Detection",
        defaultText: "Signal Detector",
        url: URLs.detector,
        path1: "drone-signal",
        path2: "detection",
        concepts: [
          "drone signal detector",
          "uav signal detector",
          "drone frequency detector",
          "drone rf sensor",
          "drone signal detection equipment",
          "rf spectrum drone detector",
        ],
      },
    ],
  },
];

const commonNegatives = [
  ["app", "Phrase match", "应用程序/消费软件意图"],
  ["free", "Phrase match", "免费工具意图"],
  ["android", "Phrase match", "手机应用意图"],
  ["iphone", "Phrase match", "手机应用意图"],
  ["diy", "Phrase match", "DIY研究意图"],
  ["github", "Phrase match", "开发/开源研究意图"],
  ["online", "Phrase match", "在线工具意图"],
  ["game", "Phrase match", "游戏噪音"],
  ["youtube", "Phrase match", "视频研究意图"],
  ["manual", "Phrase match", "说明书/售后意图"],
  ["stock", "Phrase match", "股票投资意图"],
  ["share price", "Phrase match", "股票投资意图"],
  ["jammer", "Phrase match", "主动干扰能力词，合规排除"],
  ["jamming", "Phrase match", "主动干扰能力词，合规排除"],
  ["spoofing", "Phrase match", "主动诱骗能力词，合规排除"],
  ["gun", "Phrase match", "武器/枪型设备词，合规排除"],
  ["rifle", "Phrase match", "武器/枪型设备词，合规排除"],
  ["weapon", "Phrase match", "武器化意图，合规排除"],
];

const campaignSpecificNegatives = {
  "Device - Drone Detector - English": [
    ["metal detector", "Phrase match", "找金属探测无人机，方向相反"],
    ["gold detector", "Phrase match", "找金/寻宝设备噪音"],
    ["mine detector", "Phrase match", "排雷无人机噪音"],
    ["radiation detector", "Phrase match", "辐射探测无人机噪音"],
    ["bulat", "Phrase match", "竞品/品牌导航"],
    ["chuyka", "Phrase match", "竞品/品牌导航"],
    ["dzyga", "Phrase match", "竞品/品牌导航"],
    ["tsukorok", "Phrase match", "竞品/品牌导航"],
  ],
  "Device - Drone Locator - English": [
    ["lost drone", "Phrase match", "寻找丢失的自有无人机"],
    ["find my drone", "Phrase match", "寻找丢失的自有无人机"],
    ["delivery location", "Phrase match", "无人机配送地点"],
    ["delivery locations", "Phrase match", "无人机配送地点"],
    ["amazon", "Phrase match", "配送/购物噪音"],
    ["walmart", "Phrase match", "配送地点噪音"],
    ["zipline", "Phrase match", "配送品牌/地点"],
    ["maxis", "Phrase match", "游戏噪音"],
    ["slime rancher", "Phrase match", "游戏噪音"],
    ["ghost recon", "Phrase match", "游戏噪音"],
    ["near me", "Phrase match", "消费地点查询"],
  ],
  "Device - Airspace Shield - English": [
    ["droneshield", "Phrase match", "竞品品牌导航/股票"],
    ["drone shield stock", "Phrase match", "股票投资意图"],
    ["shield ai", "Phrase match", "其他品牌普通无人机"],
    ["asx", "Phrase match", "股票投资意图"],
    ["investor", "Phrase match", "股票投资意图"],
    ["tau", "Phrase match", "Warhammer游戏噪音"],
    ["warhammer", "Phrase match", "游戏噪音"],
    ["warframe", "Phrase match", "游戏噪音"],
  ],
  "Device - Drone Defense - English": [
    ["battelle", "Phrase match", "DroneDefender品牌导航"],
    ["dedrone", "Phrase match", "竞品品牌导航"],
    ["vivitar", "Phrase match", "消费无人机品牌"],
    ["division 2", "Phrase match", "游戏噪音"],
    ["nerf", "Phrase match", "玩具/游戏噪音"],
    ["drone defender", "Exact match", "品牌/主动设备歧义；仅投 defense equipment 长尾"],
  ],
  "Device - RF Drone Detection - English": [
    ["blocker", "Phrase match", "主动阻断能力词"],
    ["hackrf", "Phrase match", "DIY/开发意图"],
    ["homemade", "Phrase match", "DIY制作意图"],
    ["how to build", "Phrase match", "DIY制作意图"],
    ["how to make", "Phrase match", "DIY制作意图"],
  ],
};

function normalizeKeyword(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/^\[|\]$/g, "")
    .replace(/^"|"$/g, "")
    .replace(/[–—_]/g, " ")
    .replace(/-/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function researchIndex(key) {
  const values = inspection[key].data[0].allValues;
  const headers = values[0];
  const keywordIndex = headers.indexOf("Keyword");
  const volumeIndex = headers.indexOf("Volume");
  const intentIndex = headers.indexOf("Intent");
  const cpcIndex = headers.indexOf("CPC (USD)");
  const map = new Map();
  for (const row of values.slice(1)) {
    const keyword = String(row[keywordIndex] ?? "").trim();
    if (!keyword) continue;
    const normalized = normalizeKeyword(keyword);
    const item = { keyword, normalized, volume: Number(row[volumeIndex] ?? 0), intent: row[intentIndex] ?? "", cpc: Number(row[cpcIndex] ?? 0) };
    const prior = map.get(normalized);
    if (!prior || item.volume > prior.volume) map.set(normalized, item);
  }
  return { map, rows: [...map.values()] };
}

const sourceIndexes = {
  defender: researchIndex("defender"),
  locator: researchIndex("locator"),
  shield: researchIndex("shield"),
  jammer: researchIndex("jammer"),
  detector: researchIndex("detector"),
};

function sourceKeyForCampaign(campaign) {
  if (campaign.source.startsWith("drone-detector")) return "detector";
  if (campaign.source.startsWith("drone-locator")) return "locator";
  if (campaign.source.startsWith("drone-shield")) return "shield";
  if (campaign.source.startsWith("drone-defender")) return "defender";
  return "jammer";
}

const selectedConcepts = [];
const keywordRows = [];
for (const campaign of campaigns) {
  const sourceKey = sourceKeyForCampaign(campaign);
  const sourceMap = sourceIndexes[sourceKey].map;
  for (const group of campaign.groups) {
    for (const concept of group.concepts) {
      const normalized = normalizeKeyword(concept);
      const research = sourceMap.get(normalized);
      const conceptRow = {
        campaign: campaign.name,
        adGroup: group.name,
        keyword: concept,
        normalized,
        finalUrl: group.url,
        sourceFile: campaign.source,
        sourceStatus: research ? "Found in supplied research" : "Supplemental device-intent expansion",
        volumeUS: research?.volume ?? 0,
        intent: research?.intent ?? "",
        cpcUSD: research?.cpc ?? 0,
      };
      selectedConcepts.push(conceptRow);
      for (const matchType of ["Exact match", "Phrase match"]) {
        keywordRows.push({ ...conceptRow, matchType });
      }
    }
  }
}

const conceptKeys = new Set(selectedConcepts.map((row) => row.normalized));
const duplicateConcepts = selectedConcepts.filter((row, i, all) => all.findIndex((x) => x.normalized === row.normalized) !== i);
if (duplicateConcepts.length) throw new Error(`Duplicate concepts across campaigns: ${duplicateConcepts.map((x) => x.keyword).join(", ")}`);

// Find enabled legacy keyword rows that are exactly migrated into the new campaigns.
const accountValues = inspection.accountKeywords.data[0].allValues;
const accountHeaderRow = accountValues.findIndex((row) => row.includes("关键字状态") && row.includes("关键字"));
const accountHeaders = accountValues[accountHeaderRow];
const col = (name) => accountHeaders.indexOf(name);
const oldPauseRows = [];
const oldPauseKeys = new Set();
for (const row of accountValues.slice(accountHeaderRow + 1)) {
  const rawKeyword = row[col("关键字")];
  if (typeof rawKeyword !== "string" || !rawKeyword.trim()) continue;
  if (String(row[col("关键字状态")] ?? "") !== "已启用") continue;
  const normalized = normalizeKeyword(rawKeyword);
  if (!conceptKeys.has(normalized)) continue;
  const campaign = String(row[col("广告系列")] ?? "");
  if (campaign.startsWith("Device - ")) continue;
  const matchTypeZh = String(row[col("匹配类型")] ?? "");
  const matchType = matchTypeZh.includes("完全") ? "Exact match" : matchTypeZh.includes("词组") ? "Phrase match" : "Broad match";
  const migrated = selectedConcepts.find((item) => item.normalized === normalized);
  const originalKeyword = rawKeyword.trim().replace(/^\[|\]$/g, "").replace(/^"|"$/g, "");
  const oldPauseKey = `${campaign}|${String(row[col("广告组")] ?? "")}|${originalKeyword.toLowerCase()}|${matchType}`;
  if (oldPauseKeys.has(oldPauseKey)) continue;
  oldPauseKeys.add(oldPauseKey);
  oldPauseRows.push({
    campaign,
    adGroup: String(row[col("广告组")] ?? ""),
    keyword: originalKeyword,
    matchType,
    newCampaign: migrated.campaign,
    newAdGroup: migrated.adGroup,
    impressions: Number(row[col("展示次数")] ?? 0),
    clicks: Number(row[col("点击次数")] ?? 0),
    cost: Number(row[col("费用")] ?? 0),
    currentUrl: String(row[col("最终到达网址")] ?? ""),
    newUrl: migrated.finalUrl,
  });
}

// Research-file quality summary. Selected counts are exact source terms, not generated variants.
const restrictedPattern = /\b(jammer|jamming|gun|rifle|weapon|shoot down|spoofing|forced landing|blocker)\b/;
const brandNoisePattern = /\b(battelle|dedrone|vivitar|division 2|droneshield|shield ai|tau|warhammer|warframe|amazon|walmart|zipline|maxis|slime rancher|ghost recon|bulat|chuyka|dzyga|tsukorok|asel|bluebird|dronetag|3mx)\b|\b(stock|share price|asx|investor|market cap)\b/;
const consumerNoisePattern = /\b(app|android|iphone|free|diy|github|online|manual|youtube|near me|delivery location|delivery locations|lost drone|find my drone|game|review|pdf|news)\b|^(how|what|can|is|where|why)\b/;
const researchSummary = [];
for (const [key, index] of Object.entries(sourceIndexes)) {
  const counts = { selected: 0, restricted: 0, brandNoise: 0, consumerInfoNoise: 0, otherHold: 0 };
  const topExcluded = [];
  for (const item of index.rows) {
    let classification;
    if (conceptKeys.has(item.normalized)) classification = "selected";
    else if (restrictedPattern.test(item.normalized)) classification = "restricted";
    else if (brandNoisePattern.test(item.normalized)) classification = "brandNoise";
    else if (consumerNoisePattern.test(item.normalized)) classification = "consumerInfoNoise";
    else classification = "otherHold";
    counts[classification] += 1;
    if (classification !== "selected" && item.volume > 0) topExcluded.push({ ...item, classification });
  }
  topExcluded.sort((a, b) => b.volume - a.volume);
  researchSummary.push({ source: key, totalUnique: index.rows.length, ...counts, topExcluded: topExcluded.slice(0, 12) });
}

const campaignHeaders = inspection.campaignTemplate.data[0].allValues[0];
const adGroupHeaders = inspection.adGroupTemplate.data[0].allValues[0];
const keywordHeaders = inspection.keywordTemplate.data[0].allValues[0];
const rsaHeaders = inspection.rsaTemplate.data[0].allValues[2];
const negativeHeaders = inspection.negativeTemplate.data[0].allValues[0];

function blankRow(headers) {
  return Object.fromEntries(headers.map((header) => [header, null]));
}

const campaignUpload = campaigns.map((campaign) => ({
  ...blankRow(campaignHeaders),
  "Row Type": "Campaign",
  Action: "Add",
  "Campaign status": "Paused",
  Campaign: campaign.name,
  "Campaign type": "Search",
  Networks: "Google search",
  Budget: campaign.budget,
  "Delivery method": "Standard",
  "Budget type": "Daily",
  "Bid strategy type": "Manual CPC",
  Language: "en",
  Label: "DEVICE_20260715; LOCATION_REVIEW_REQUIRED",
  "EU political ads": "No",
}));

const adGroupUpload = campaigns.flatMap((campaign) => campaign.groups.map((group) => ({
  ...blankRow(adGroupHeaders),
  "Row Type": "Ad group",
  Action: "Add",
  "Ad group status": "Enabled",
  Campaign: campaign.name,
  "Ad group": group.name,
  "Ad group type": "Standard",
  "Ad rotation": "Optimize",
  "Default max. CPC": group.name.includes("Radar") || group.name.includes("Portable") ? 14 : 12,
  Label: "DEVICE_20260715",
})));

const keywordUpload = keywordRows.map((row) => ({
  ...blankRow(keywordHeaders),
  "Row Type": "Keyword",
  Action: "Add",
  "Keyword status": "Enabled",
  Campaign: row.campaign,
  "Ad group": row.adGroup,
  Keyword: row.keyword,
  Type: row.matchType,
  Label: row.matchType === "Exact match" ? "DEVICE_EXACT_20260715" : "DEVICE_PHRASE_20260715",
  "Final URL": row.finalUrl,
}));

function dki(defaultText) {
  return `{KeyWord:${defaultText}}`;
}

function rendered(value) {
  return value.replace(/\{KeyWord:([^}]+)\}/g, "$1");
}

function rsaAssets(defaultText) {
  const token = dki(defaultText);
  const headlines = [
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
  const descriptions = [
    `${token} for site airspace monitoring, alert workflows and project integration.`,
    `Compare ${token} options for RF, radar and visual awareness at critical sites.`,
    `Plan ${token} coverage with specifications, guidance and project support.`,
    `Need ${token}? Discuss site conditions, alerts and integration with N-TET.`,
  ];
  return { headlines, descriptions };
}

const rsaUpload = campaigns.flatMap((campaign) => campaign.groups.map((group) => {
  const row = {
    ...blankRow(rsaHeaders),
    "Row Type": "Ad",
    Action: "Add",
    "Ad status": "Enabled",
    Campaign: campaign.name,
    "Ad group": group.name,
    "Ad type": "Responsive search ad",
    Label: "DKI_DEVICE_20260715",
    "Path 1": group.path1,
    "Path 2": group.path2,
    "Final URL": group.url,
  };
  const assets = rsaAssets(group.defaultText);
  assets.headlines.forEach((value, i) => { row[`Headline ${i + 1}`] = value; });
  assets.descriptions.forEach((value, i) => { row[`Description ${i + 1}`] = value; });
  return row;
}));

const negativeReview = [];
const negativeUpload = [];
for (const campaign of campaigns) {
  const all = [...commonNegatives, ...(campaignSpecificNegatives[campaign.name] ?? [])];
  const seen = new Set();
  for (const [negativeKeyword, type, reason] of all) {
    const key = `${normalizeKeyword(negativeKeyword)}|${type}`;
    if (seen.has(key)) continue;
    seen.add(key);
    negativeReview.push({ campaign: campaign.name, negativeKeyword, type, reason });
    negativeUpload.push({
      ...blankRow(negativeHeaders),
      "Row Type": "Negative keyword",
      Action: "Add",
      "Keyword status": "Enabled",
      Level: "Campaign",
      Campaign: campaign.name,
      "Negative keyword": negativeKeyword,
      Type: type,
    });
  }
}

const pauseUpload = oldPauseRows.map((row) => ({
  ...blankRow(keywordHeaders),
  "Row Type": "Keyword",
  Action: "Edit",
  "Keyword status": "Paused",
  Campaign: row.campaign,
  "Ad group": row.adGroup,
  Keyword: row.keyword,
  Type: row.matchType,
  Label: "MOVED_TO_DEVICE_20260715",
}));

const qa = {
  campaigns: campaignUpload.length,
  adGroups: adGroupUpload.length,
  keywordConcepts: selectedConcepts.length,
  keywordRows: keywordUpload.length,
  exactRows: keywordUpload.filter((x) => x.Type === "Exact match").length,
  phraseRows: keywordUpload.filter((x) => x.Type === "Phrase match").length,
  rsaRows: rsaUpload.length,
  negativeRows: negativeUpload.length,
  oldPauseRows: pauseUpload.length,
  totalDailyBudgetCNY: campaigns.reduce((sum, x) => sum + x.budget, 0),
  restrictedEnabledHits: [],
  headlineErrors: [],
  descriptionErrors: [],
};

for (const row of keywordUpload) {
  if (restrictedPattern.test(normalizeKeyword(row.Keyword))) qa.restrictedEnabledHits.push({ type: "keyword", campaign: row.Campaign, value: row.Keyword });
}
for (const row of rsaUpload) {
  for (let i = 1; i <= 15; i += 1) {
    const value = row[`Headline ${i}`];
    if (!value) continue;
    if (!/\{KeyWord:[^}]+\}/.test(value) || rendered(value).length > 30) qa.headlineErrors.push({ campaign: row.Campaign, adGroup: row["Ad group"], field: `Headline ${i}`, value, renderedLength: rendered(value).length });
    if (restrictedPattern.test(normalizeKeyword(rendered(value)))) qa.restrictedEnabledHits.push({ type: "headline", campaign: row.Campaign, value });
  }
  for (let i = 1; i <= 4; i += 1) {
    const value = row[`Description ${i}`];
    if (!value) continue;
    if (!/\{KeyWord:[^}]+\}/.test(value) || rendered(value).length > 90) qa.descriptionErrors.push({ campaign: row.Campaign, adGroup: row["Ad group"], field: `Description ${i}`, value, renderedLength: rendered(value).length });
    if (restrictedPattern.test(normalizeKeyword(rendered(value)))) qa.restrictedEnabledHits.push({ type: "description", campaign: row.Campaign, value });
  }
}

if (qa.restrictedEnabledHits.length || qa.headlineErrors.length || qa.descriptionErrors.length) {
  throw new Error(`Pre-export QA failed: ${JSON.stringify(qa, null, 2)}`);
}

const COLORS = {
  blue: "#315BA4",
  dark: "#1A1A2E",
  light: "#EAF1FB",
  pale: "#F8F9FA",
  white: "#FFFFFF",
  gray: "#667085",
  green: "#DDF4E8",
  orange: "#FFF0D6",
  red: "#FBE3E1",
  border: "#D0D5DD",
};

function colName(n) {
  let out = "";
  while (n > 0) {
    n -= 1;
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26);
  }
  return out || "A";
}

function styleUploadSheet(sheet, headers, rowCount) {
  const last = colName(headers.length);
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  sheet.getRange(`A1:${last}1`).format = {
    fill: COLORS.blue,
    font: { bold: true, color: COLORS.white, size: 10 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  };
  sheet.getRange(`A1:${last}1`).format.rowHeight = 30;
  if (rowCount > 0) {
    sheet.getRange(`A2:${last}${rowCount + 1}`).format = {
      font: { size: 9 },
      verticalAlignment: "center",
      borders: { preset: "all", style: "thin", color: COLORS.border },
    };
  }
  for (let i = 1; i <= headers.length; i += 1) sheet.getRange(`${colName(i)}1:${colName(i)}${rowCount + 1}`).format.columnWidth = 18;
  const campaignCol = headers.indexOf("Campaign") + 1;
  const adGroupCol = headers.indexOf("Ad group") + 1;
  const keywordCol = headers.indexOf("Keyword") + 1;
  const finalUrlCol = headers.indexOf("Final URL") + 1;
  if (campaignCol > 0) sheet.getRange(`${colName(campaignCol)}1:${colName(campaignCol)}${rowCount + 1}`).format.columnWidth = 34;
  if (adGroupCol > 0) sheet.getRange(`${colName(adGroupCol)}1:${colName(adGroupCol)}${rowCount + 1}`).format.columnWidth = 30;
  if (keywordCol > 0) sheet.getRange(`${colName(keywordCol)}1:${colName(keywordCol)}${rowCount + 1}`).format.columnWidth = 34;
  if (finalUrlCol > 0) sheet.getRange(`${colName(finalUrlCol)}1:${colName(finalUrlCol)}${rowCount + 1}`).format.columnWidth = 54;
}

async function exportUpload(fileName, headers, objects) {
  const wb = Workbook.create();
  const sheet = wb.worksheets.add("Sheet0");
  const rows = objects.map((object) => headers.map((header) => object[header] ?? null));
  sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
  if (rows.length) sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
  styleUploadSheet(sheet, headers, rows.length);
  const outputPath = path.join(outDir, fileName);
  await (await SpreadsheetFile.exportXlsx(wb)).save(outputPath);
  const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
  const values = verify.worksheets.getItemAt(0).getUsedRange(true).values;
  const errors = await verify.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 50 }, summary: `${fileName} error scan` });
  return {
    fileName,
    outputPath,
    headersExact: JSON.stringify(values[0]) === JSON.stringify(headers),
    firstRowIsHeader: values[0][0] === headers[0],
    secondRowIsData: rows.length === 0 || values[1][0] === rows[0][0],
    rows: values.length - 1,
    columns: values[0].length,
    formulaErrors: errors.ndjson,
  };
}

const uploadJobs = [];
uploadJobs.push(await exportUpload("01_Campaigns_UPLOAD.xlsx", campaignHeaders, campaignUpload));
uploadJobs.push(await exportUpload("02_Ad_Groups_UPLOAD.xlsx", adGroupHeaders, adGroupUpload));
uploadJobs.push(await exportUpload("03_Keywords_UPLOAD.xlsx", keywordHeaders, keywordUpload));
uploadJobs.push(await exportUpload("04_RSA_DKI_UPLOAD.xlsx", rsaHeaders, rsaUpload));
uploadJobs.push(await exportUpload("05_Negative_Keywords_UPLOAD.xlsx", negativeHeaders, negativeUpload));
uploadJobs.push(await exportUpload("06_Pause_Old_Keywords_AFTER_NEW_LIVE.xlsx", keywordHeaders, pauseUpload));

// Human review workbook. This is not an upload file.
const reviewWb = Workbook.create();
const summarySheet = reviewWb.worksheets.add("Summary");
const selectedSheet = reviewWb.worksheets.add("Selected Keywords");
const pauseSheet = reviewWb.worksheets.add("Old Keywords To Pause");
const negativeSheet = reviewWb.worksheets.add("Negative Review");
const researchSheet = reviewWb.worksheets.add("Research Quality");
for (const sheet of reviewWb.worksheets.items) sheet.showGridLines = false;

function title(sheet, range, text, subtitleRange, subtitle) {
  sheet.mergeCells(range);
  sheet.getRange(range).values = [[text]];
  sheet.getRange(range).format = { fill: COLORS.dark, font: { bold: true, color: COLORS.white, size: 18 }, verticalAlignment: "center" };
  sheet.getRange(range).format.rowHeight = 36;
  sheet.mergeCells(subtitleRange);
  sheet.getRange(subtitleRange).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = { fill: COLORS.light, font: { color: COLORS.gray, size: 10 }, wrapText: true, verticalAlignment: "center" };
  sheet.getRange(subtitleRange).format.rowHeight = 34;
}

function header(sheet, range) {
  sheet.getRange(range).format = { fill: COLORS.blue, font: { bold: true, color: COLORS.white }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
  sheet.getRange(range).format.rowHeight = 28;
}

title(summarySheet, "A1:H1", "N-TET｜5个设备类广告活动上传包", "A2:H2", "所有上传文件第一行均为官方英文字段名，第二行即第一条数据。5个活动默认 Paused；复制现有英语/中东/南美的地区定位并核对预算后再启用。");
summarySheet.getRange("A4:H4").values = [["Campaign", "Daily Budget CNY", "Ad Groups", "Keyword Concepts", "Upload Rows", "Source", "Launch State", "Decision"]];
header(summarySheet, "A4:H4");
const campaignSummaryRows = campaigns.map((campaign) => {
  const conceptCount = campaign.groups.reduce((sum, group) => sum + group.concepts.length, 0);
  return [campaign.name, campaign.budget, campaign.groups.length, conceptCount, conceptCount * 2, campaign.source, "Paused until location review", campaign.rationale];
});
summarySheet.getRangeByIndexes(4, 0, campaignSummaryRows.length, 8).values = campaignSummaryRows;
summarySheet.getRange("A11:H11").values = [["Upload order", "File", "Rows", "Purpose", null, null, null, null]];
header(summarySheet, "A11:H11");
const purpose = ["Create 5 paused campaigns", "Create ad groups", "Add Exact + Phrase keywords", "Add DKI responsive search ads", "Add campaign negatives", "Pause migrated legacy keywords only after new geo targeting is correct"];
const uploadSummaryRows = uploadJobs.map((job, i) => [i + 1, job.fileName, job.rows, purpose[i], null, null, null, null]);
summarySheet.getRangeByIndexes(11, 0, uploadSummaryRows.length, 8).values = uploadSummaryRows;
summarySheet.mergeCells("A19:H19");
summarySheet.getRange("A19").values = [["重要：第6个暂停表必须最后上传。新活动没有复制好原英语/中东/南美地区定位之前，不要暂停旧词，也不要启用新活动。Jammer源文件只用于发现需求，不包含任何可启用jammer/jamming关键词。"]];
summarySheet.getRange("A19:H19").format = { fill: COLORS.orange, font: { bold: true, color: COLORS.dark }, wrapText: true, verticalAlignment: "center" };
summarySheet.getRange("A19:H19").format.rowHeight = 52;
summarySheet.getRange("A1:A20").format.columnWidth = 36;
summarySheet.getRange("B1:B20").format.columnWidth = 18;
summarySheet.getRange("C1:F20").format.columnWidth = 18;
summarySheet.getRange("G1:G20").format.columnWidth = 26;
summarySheet.getRange("H1:H20").format.columnWidth = 54;
summarySheet.getRange("H5:H9").format.wrapText = true;
summarySheet.freezePanes.freezeRows(4);

title(selectedSheet, "A1:L1", "可用设备关键词", "A2:L2", "每个概念同时生成 Exact 与 Phrase；Phrase 用于受控扩量，配合本包否定词。US Volume 仅来自用户提供的美国研究表，0 表示补充词或源表无量，不代表目标地区一定无搜索。");
const selectedHeaders = ["Campaign", "Ad Group", "Keyword", "Match Type", "Final URL", "Source File", "Source Status", "US Volume", "Intent", "CPC USD", "Priority", "Reason"];
selectedSheet.getRange("A4:L4").values = [selectedHeaders];
header(selectedSheet, "A4:L4");
const selectedRows = keywordRows.map((row) => [row.campaign, row.adGroup, row.keyword, row.matchType, row.finalUrl, row.sourceFile, row.sourceStatus, row.volumeUS, row.intent, row.cpcUSD, row.volumeUS > 0 ? "P1 source-backed" : "P2 controlled expansion", row.matchType === "Exact match" ? "精准主干" : "受控词组扩量"]);
selectedSheet.getRangeByIndexes(4, 0, selectedRows.length, selectedHeaders.length).values = selectedRows;
selectedSheet.freezePanes.freezeRows(4);
selectedSheet.freezePanes.freezeColumns(3);
selectedSheet.getRange(`A1:A${selectedRows.length + 4}`).format.columnWidth = 36;
selectedSheet.getRange(`B1:B${selectedRows.length + 4}`).format.columnWidth = 30;
selectedSheet.getRange(`C1:C${selectedRows.length + 4}`).format.columnWidth = 34;
selectedSheet.getRange(`D1:D${selectedRows.length + 4}`).format.columnWidth = 16;
selectedSheet.getRange(`E1:E${selectedRows.length + 4}`).format.columnWidth = 52;
selectedSheet.getRange(`F1:G${selectedRows.length + 4}`).format.columnWidth = 28;
selectedSheet.getRange(`H1:L${selectedRows.length + 4}`).format.columnWidth = 16;

title(pauseSheet, "A1:L1", "原广告活动需暂停并迁移的重复词", "A2:L2", "这些词与新活动概念完全相同。仅在5个新活动已经复制正确地区定位、预算和广告设置之后，上传第6个暂停表。未被新活动覆盖的旧词不会暂停。");
const pauseHeaders = ["Old Campaign", "Old Ad Group", "Keyword", "Match Type", "New Campaign", "New Ad Group", "7d Impressions", "7d Clicks", "7d Cost CNY", "Current URL", "New URL", "Action"];
pauseSheet.getRange("A4:L4").values = [pauseHeaders];
header(pauseSheet, "A4:L4");
const pauseReviewRows = oldPauseRows.map((row) => [row.campaign, row.adGroup, row.keyword, row.matchType, row.newCampaign, row.newAdGroup, row.impressions, row.clicks, row.cost, row.currentUrl, row.newUrl, "Pause after new campaign is live"]);
if (pauseReviewRows.length) pauseSheet.getRangeByIndexes(4, 0, pauseReviewRows.length, pauseHeaders.length).values = pauseReviewRows;
pauseSheet.freezePanes.freezeRows(4);
pauseSheet.freezePanes.freezeColumns(4);
pauseSheet.getRange(`A1:F${pauseReviewRows.length + 4}`).format.columnWidth = 32;
pauseSheet.getRange(`G1:I${pauseReviewRows.length + 4}`).format.columnWidth = 14;
pauseSheet.getRange(`J1:K${pauseReviewRows.length + 4}`).format.columnWidth = 52;
pauseSheet.getRange(`L1:L${pauseReviewRows.length + 4}`).format.columnWidth = 30;

title(negativeSheet, "A1:D1", "否定关键词审核", "A2:D2", "活动级否定词用于控制 Phrase 紧密变体和语义扩展。主动能力词、股票/品牌、游戏、丢失无人机、应用和DIY意图均已隔离。");
negativeSheet.getRange("A4:D4").values = [["Campaign", "Negative Keyword", "Type", "Reason"]];
header(negativeSheet, "A4:D4");
negativeSheet.getRangeByIndexes(4, 0, negativeReview.length, 4).values = negativeReview.map((row) => [row.campaign, row.negativeKeyword, row.type, row.reason]);
negativeSheet.freezePanes.freezeRows(4);
negativeSheet.getRange(`A1:A${negativeReview.length + 4}`).format.columnWidth = 36;
negativeSheet.getRange(`B1:B${negativeReview.length + 4}`).format.columnWidth = 34;
negativeSheet.getRange(`C1:C${negativeReview.length + 4}`).format.columnWidth = 18;
negativeSheet.getRange(`D1:D${negativeReview.length + 4}`).format.columnWidth = 48;

title(researchSheet, "A1:H1", "5份研究表质量与筛选结果", "A2:H2", "Selected 仅统计源表里与最终概念完全相同的词；补充设备长尾见 Selected Keywords。Other/Hold 包含低量、信息型、歧义或未达到首批上线标准的词。");
researchSheet.getRange("A4:H4").values = [["Source", "Unique Terms", "Selected in Source", "Restricted", "Brand/Stock/Game Noise", "Consumer/Info Noise", "Other/Hold", "Primary Decision"]];
header(researchSheet, "A4:H4");
const decisionBySource = {
  detector: "可直接扩量；排除 app、metal/gold/mine detector 和竞品。",
  locator: "原词大多是配送/丢失/游戏位置；仅用补充的反无人机定位设备长尾。",
  shield: "不投 drone shield 裸词；重构为空域防护系统词。",
  defender: "不投 DroneDefender 裸词；重构为非主动 drone defense equipment。",
  jammer: "不启用任何 jammer 词；替换为被动 RF/信号探测活动。",
};
researchSheet.getRangeByIndexes(4, 0, researchSummary.length, 8).values = researchSummary.map((row) => [row.source, row.totalUnique, row.selected, row.restricted, row.brandNoise, row.consumerInfoNoise, row.otherHold, decisionBySource[row.source]]);
researchSheet.getRange("A12:F12").values = [["Source", "Excluded Keyword", "US Volume", "Intent", "Classification", "Reason"]];
header(researchSheet, "A12:F12");
const topExcludedRows = researchSummary.flatMap((row) => row.topExcluded.map((item) => [row.source, item.keyword, item.volume, item.intent, item.classification, item.classification === "restricted" ? "合规受限" : item.classification === "brandNoise" ? "品牌/股票/游戏噪音" : item.classification === "consumerInfoNoise" ? "消费/信息型噪音" : "未达到首批上线标准"]));
researchSheet.getRangeByIndexes(12, 0, topExcludedRows.length, 6).values = topExcludedRows;
researchSheet.freezePanes.freezeRows(4);
researchSheet.getRange(`A1:A${topExcludedRows.length + 12}`).format.columnWidth = 18;
researchSheet.getRange(`B1:B${topExcludedRows.length + 12}`).format.columnWidth = 46;
researchSheet.getRange(`C1:E${topExcludedRows.length + 12}`).format.columnWidth = 18;
researchSheet.getRange(`F1:F${topExcludedRows.length + 12}`).format.columnWidth = 34;
researchSheet.getRange(`H1:H9`).format.columnWidth = 54;
researchSheet.getRange("H5:H9").format.wrapText = true;

const reviewPath = path.join(outDir, "N-TET_5_Device_Campaigns_Review_20260715.xlsx");
await (await SpreadsheetFile.exportXlsx(reviewWb)).save(reviewPath);
const reviewVerify = await SpreadsheetFile.importXlsx(await FileBlob.load(reviewPath));
const reviewErrors = await reviewVerify.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "Review workbook formula error scan" });

const finalQa = {
  generatedAt: new Date().toISOString(),
  qa,
  uploadJobs,
  reviewWorkbook: reviewPath,
  reviewSheets: reviewVerify.worksheets.items.map((sheet) => sheet.name),
  reviewFormulaErrors: reviewErrors.ndjson,
  researchSummary,
  legacyPauseSummary: {
    rows: oldPauseRows.length,
    campaigns: [...new Set(oldPauseRows.map((x) => x.campaign))].sort(),
    impressions7d: oldPauseRows.reduce((sum, x) => sum + x.impressions, 0),
    clicks7d: oldPauseRows.reduce((sum, x) => sum + x.clicks, 0),
    cost7d: oldPauseRows.reduce((sum, x) => sum + x.cost, 0),
  },
};

await fs.writeFile(path.join(outDir, "final_qa.json"), JSON.stringify(finalQa, null, 2), "utf8");
console.log(JSON.stringify(finalQa, null, 2));
