import fs from "node:fs/promises";

const outDir = "D:/fc-cuas/outputs/device_intent_campaign_20260715";
const input = JSON.parse(await fs.readFile(`${outDir}/input_inspection.json`, "utf8"));

function rowsFrom(values, headerNeedle) {
  const headerIndex = values.findIndex((row) => row.includes(headerNeedle));
  const headers = values[headerIndex];
  return values.slice(headerIndex + 1)
    .map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i]])))
    .filter((row) => Object.values(row).some((value) => value !== null && value !== ""));
}

const number = (value) => typeof value === "number" ? value : Number(value) || 0;
const clean = (value) => String(value ?? "").toLowerCase().replace(/^[\[\"]|[\]\"]$/g, "").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

const searchTerms = rowsFrom(input.terms.allValues, "搜索字词")
  .filter((row) => typeof row["搜索字词"] === "string" && !row["搜索字词"].startsWith("总计"));
const keywordRows = rowsFrom(input.keywords.allValues, "关键字状态")
  .filter((row) => typeof row["关键字"] === "string" && !row["关键字"].startsWith("总计"));

const manualTermClass = new Map([
  ["c uas", ["方案采购意向", "行业类别词，专业但不是具体设备"]],
  ["c uas system", ["方案采购意向", "明确系统方案意图"]],
  ["drone radar", ["设备采购意向", "明确雷达设备词"]],
  ["radar uav", ["设备采购意向", "明确雷达设备词"]],
  ["radar drone", ["设备采购意向", "明确雷达设备词"]],
  ["drone detection radar", ["设备采购意向", "明确探测雷达设备词"]],
  ["detector drones", ["设备采购意向", "明确探测器设备词，语序为本地语言变体"]],
  ["detector drone", ["设备采购意向", "明确探测器设备词，语序为本地语言变体"]],
  ["drone detector", ["设备采购意向", "明确探测器设备词"]],
  ["handheld drone detector", ["设备采购意向", "明确手持设备词"]],
  ["anti drone fence saudi arabia", ["方案采购意向", "场景化反无人机系统意图"]],
  ["drone defense", ["方案采购意向", "方案类别意图，但设备形态不明确"]],
  ["sistema anti drone", ["方案采购意向", "西语反无人机系统词"]],
  ["anti uav system", ["方案采购意向", "系统方案词"]],
  ["can drone be detected by radar", ["非采购/研究", "问题型信息查询"]],
  ["security drone system", ["非采购/研究", "可能是使用无人机做安防，并非反无人机设备"]],
  ["anti drone technology", ["非采购/研究", "技术研究词，未体现设备采购"]],
  ["counter small unmanned aircraft systems strategy", ["非采购/研究", "strategy信息查询"]],
  ["remote id drone", ["非采购/研究", "可能查询法规/功能，未出现receiver或detector"]],
  ["esp32 drone detector", ["非采购/研究", "DIY开发板项目意图"]],
  ["uas", ["非采购/研究", "过度宽泛，仅为行业缩写"]],
  ["antidrone", ["宽泛待验证", "单一类别词，无法确认设备或采购意图"]],
  ["jammer anti drone", ["竞品/受限/非目标", "主动干扰设备词，当前广告合规排除"]],
  ["droneshield 360", ["竞品/受限/非目标", "竞品导航/研究意图"]],
  ["elvira drone detection radar", ["竞品/受限/非目标", "竞品型号/品牌词"]],
]);

const classifiedTerms = searchTerms.map((row) => {
  const term = clean(row["搜索字词"]);
  let [intentClass, reason] = manualTermClass.get(term) ?? ["未分类", "7天内无点击或需人工复核"];
  return {
    searchTerm: row["搜索字词"],
    intentClass,
    reason,
    matchType: row["匹配类型"],
    campaign: row["广告系列"],
    adGroup: row["广告组"],
    matchedKeyword: row["关键字"],
    addedExcluded: row["已添加/已排除"],
    impressions: number(row["展示次数"]),
    clicks: number(row["点击次数"]),
    ctr: number(row["点击率"]),
    avgCpc: number(row["平均每次点击费用"]),
    cost: number(row["费用"]),
    conversions: number(row["转化次数"]),
  };
});

const clickedTerms = classifiedTerms.filter((row) => row.clicks > 0);
const categorySummary = [...new Set(clickedTerms.map((row) => row.intentClass))].map((intentClass) => {
  const rows = clickedTerms.filter((row) => row.intentClass === intentClass);
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const cost = rows.reduce((sum, row) => sum + row.cost, 0);
  return { intentClass, terms: rows.length, impressions, clicks, clickShareVisible: clicks / clickedTerms.reduce((sum, row) => sum + row.clicks, 0), cost, costShareVisible: cost / clickedTerms.reduce((sum, row) => sum + row.cost, 0), ctr: impressions ? clicks / impressions : 0, avgCpc: clicks ? cost / clicks : 0 };
}).sort((a, b) => b.clicks - a.clicks);

const excludePattern = /\b(what|how|can|does|do|why|meaning|definition|strategy|technology|pdf|wiki|software|app|online|diy|esp32|arduino|raspberry|droneshield|elvira|aeroscope|drone deploy|dronedeploy|uas$)\b/i;
const restrictedPattern = /\b(jammer|jamming|spoof|spoofing|weapon|gun|rifle|laser|shoot|kill|disable|forced landing)\b/i;
const purchaseModifierPattern = /\b(manufacturer|supplier|vendor|factory|price|cost|buy|purchase|quotation|quote|for sale|equipment|device|hardware)\b/i;

function classifyKeyword(keyword) {
  const k = clean(keyword);
  if (restrictedPattern.test(k)) return { group: "排除", reason: "主动干扰/武器化或受限词" };
  if (excludePattern.test(k)) return { group: "排除", reason: "信息、软件、DIY或竞品意图" };
  if (/\b(portable|handheld|hand held|mobile|vehicle mounted|vehicle-mounted|wearable)\b/.test(k) && /\b(drone|uav|uas)\b/.test(k) && /\b(detector|detection|radar|receiver|sensor|equipment|device|system)\b/.test(k)) return { group: "Portable & Handheld", reason: "便携/手持设备意图" };
  if (/\bradar\b/.test(k) && /\b(drone|uav|uas|anti-drone|anti drone|counter drone)\b/.test(k)) return { group: "Drone Detection Radar", reason: "雷达设备意图" };
  if (/\b(remote id|remote identification)\b/.test(k) && /\b(receiver|detector|sensor|monitor|monitoring|system|device|equipment)\b/.test(k)) return { group: "Remote ID Equipment", reason: "Remote ID接收/监测设备意图" };
  if (/\b(rf|radio frequency|spectrum|direction finder|direction finding|signal detector|frequency detector)\b/.test(k) && /\b(drone|uav|uas|anti drone|counter drone)\b/.test(k)) return { group: "RF Detection Equipment", reason: "RF/频谱/测向设备意图" };
  if (/\b(drone|uav|uas|anti drone|anti-drone|counter drone|counter uas|c-uas|c uas)\b/.test(k) && /\b(detector|detectors|detection equipment|detection device|detection system|sensor|equipment|device)\b/.test(k)) return { group: "Drone Detector Equipment", reason: "探测器/探测设备意图" };
  if (/\b(c-uas|c uas|counter uas|counter-uav|counter uav|anti drone|anti-drone|anti uav|counter drone)\b/.test(k) && purchaseModifierPattern.test(k)) return { group: "C-UAS Equipment", reason: "类别词带设备或采购修饰词" };
  return { group: "非严格设备词", reason: "未出现明确设备形态或采购修饰词" };
}

const classifiedKeywords = keywordRows.map((row) => {
  const classification = classifyKeyword(row["关键字"]);
  return {
    keyword: row["关键字"],
    normalizedKeyword: clean(row["关键字"]),
    matchType: row["匹配类型"],
    campaign: row["广告系列"],
    adGroup: row["广告组"],
    keywordStatus: row["关键字状态"],
    servingStatus: row["状态"],
    finalUrl: row["最终到达网址"],
    deviceGroup: classification.group,
    reason: classification.reason,
    impressions: number(row["展示次数"]),
    clicks: number(row["点击次数"]),
    ctr: number(row["互动率"]),
    cost: number(row["费用"]),
    avgCpc: number(row["平均每次点击费用"]),
    qualityScore: number(row["质量得分"]),
    searchImpressionShare: number(row["在搜索网络中获得的展示次数份额"]),
    rankLostShare: number(row["在搜索网络中因评级而错失的展示次数份额"]),
  };
});

const strictDeviceKeywords = classifiedKeywords.filter((row) => !["排除", "非严格设备词"].includes(row.deviceGroup));
const aggregateMap = new Map();
for (const row of strictDeviceKeywords) {
  const key = `${row.normalizedKeyword}|||${row.matchType}`;
  const current = aggregateMap.get(key) ?? {
    keyword: row.normalizedKeyword,
    matchType: row.matchType,
    deviceGroup: row.deviceGroup,
    reason: row.reason,
    source: "现有关键词报告",
    existingRows: 0,
    impressions7d: 0,
    clicks7d: 0,
    cost7d: 0,
    campaigns: new Set(),
    currentUrls: new Set(),
  };
  current.existingRows += 1;
  current.impressions7d += row.impressions;
  current.clicks7d += row.clicks;
  current.cost7d += row.cost;
  current.campaigns.add(row.campaign);
  if (row.finalUrl) current.currentUrls.add(row.finalUrl);
  aggregateMap.set(key, current);
}

const destinationByGroup = {
  "Drone Detection Radar": "https://n-tet.com/solutions/drone-radar-detection",
  "Portable & Handheld": "https://n-tet.com/solutions/portable-drone-detection",
  "Drone Detector Equipment": "https://n-tet.com/solutions/drone-detector",
  "RF Detection Equipment": "https://n-tet.com/solutions/drone-detector",
  "Remote ID Equipment": "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
  "C-UAS Equipment": "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
};

const existingCandidates = [...aggregateMap.values()].map((row) => ({
  ...row,
  campaigns: [...row.campaigns].join(" | "),
  currentUrls: [...row.currentUrls].join(" | "),
  finalUrl: destinationByGroup[row.deviceGroup],
  avgCpc7d: row.clicks7d ? row.cost7d / row.clicks7d : 0,
  priority: row.clicks7d > 0 ? "Tier 1 已有点击" : row.impressions7d >= 3 ? "Tier 1 已有展示" : "Tier 2 高意图测试",
})).sort((a, b) => b.clicks7d - a.clicks7d || b.impressions7d - a.impressions7d || a.keyword.localeCompare(b.keyword));

const supplementalSeeds = [
  ["Drone Detector Equipment", "drone detector equipment"],
  ["Drone Detector Equipment", "drone detection equipment"],
  ["Drone Detector Equipment", "uav detector equipment"],
  ["Drone Detector Equipment", "anti drone detection equipment"],
  ["Drone Detector Equipment", "counter drone detection equipment"],
  ["Drone Detector Equipment", "drone detection sensor"],
  ["Drone Detector Equipment", "fixed site drone detector"],
  ["Drone Detector Equipment", "stationary drone detector"],
  ["Drone Detection Radar", "drone radar detector"],
  ["Drone Detection Radar", "counter drone radar"],
  ["Drone Detection Radar", "anti drone radar system"],
  ["Drone Detection Radar", "low altitude drone detection radar"],
  ["Drone Detection Radar", "short range drone detection radar"],
  ["Drone Detection Radar", "drone tracking radar system"],
  ["RF Detection Equipment", "rf drone detector"],
  ["RF Detection Equipment", "radio frequency drone detector"],
  ["RF Detection Equipment", "drone signal detector"],
  ["RF Detection Equipment", "uav signal detector"],
  ["RF Detection Equipment", "drone direction finder"],
  ["RF Detection Equipment", "rf direction finding drone detection"],
  ["Portable & Handheld", "portable drone detector"],
  ["Portable & Handheld", "portable rf drone detector"],
  ["Portable & Handheld", "handheld rf drone detector"],
  ["Portable & Handheld", "mobile drone detection system"],
  ["Portable & Handheld", "vehicle mounted drone detector"],
  ["Remote ID Equipment", "remote id drone receiver"],
  ["Remote ID Equipment", "drone remote id detector"],
  ["Remote ID Equipment", "remote id monitoring device"],
  ["C-UAS Equipment", "c uas equipment"],
  ["C-UAS Equipment", "counter uas equipment"],
  ["C-UAS Equipment", "anti drone equipment manufacturer"],
  ["C-UAS Equipment", "counter drone equipment supplier"],
  ["Drone Detector Equipment", "drone detector manufacturer"],
  ["Drone Detector Equipment", "drone detector supplier"],
  ["Drone Detection Radar", "drone radar manufacturer"],
  ["Portable & Handheld", "portable drone detector supplier"],
  ["Drone Detector Equipment", "drone detector price"],
  ["Drone Detector Equipment", "drone detection system price"],
  ["Drone Detection Radar", "drone radar price"],
  ["Drone Detector Equipment", "buy drone detector"],
];

const existingNormalized = new Set(existingCandidates.map((row) => row.keyword));
const supplemental = supplementalSeeds
  .filter(([, keyword]) => !existingNormalized.has(keyword))
  .flatMap(([deviceGroup, keyword]) => ["完全匹配", "词组匹配"].map((matchType) => ({
    keyword,
    matchType,
    deviceGroup,
    reason: /manufacturer|supplier|price|buy/.test(keyword) ? "新增商业采购修饰词" : "新增设备长尾词",
    source: "补充建议",
    existingRows: 0,
    impressions7d: 0,
    clicks7d: 0,
    cost7d: 0,
    campaigns: "",
    currentUrls: "",
    finalUrl: destinationByGroup[deviceGroup],
    avgCpc7d: 0,
    priority: /manufacturer|supplier|price|buy/.test(keyword) ? "Tier 1 高采购意图" : "Tier 2 扩量测试",
  })));

const launchCandidates = [...existingCandidates.filter((row) => row.impressions7d > 0), ...supplemental];
const campaignRows = launchCandidates.map((row) => ({
  campaign: "Device Intent - English",
  adGroup: row.deviceGroup,
  keyword: row.keyword,
  matchType: row.matchType,
  finalUrl: row.finalUrl,
  priority: row.priority,
  source: row.source,
  impressions7d: row.impressions7d,
  clicks7d: row.clicks7d,
  cost7d: row.cost7d,
  avgCpc7d: row.avgCpc7d,
  reason: row.reason,
}));

const keywordTotals = keywordRows.reduce((acc, row) => ({ impressions: acc.impressions + number(row["展示次数"]), clicks: acc.clicks + number(row["点击次数"]), cost: acc.cost + number(row["费用"]) }), { impressions: 0, clicks: 0, cost: 0 });
const visibleTotals = classifiedTerms.reduce((acc, row) => ({ impressions: acc.impressions + row.impressions, clicks: acc.clicks + row.clicks, cost: acc.cost + row.cost }), { impressions: 0, clicks: 0, cost: 0 });
const deviceKeywordTotals = strictDeviceKeywords.reduce((acc, row) => ({ impressions: acc.impressions + row.impressions, clicks: acc.clicks + row.clicks, cost: acc.cost + row.cost }), { impressions: 0, clicks: 0, cost: 0 });
const currentCtr = keywordTotals.clicks / keywordTotals.impressions;
const currentAvgCpc = keywordTotals.cost / keywordTotals.clicks;
const deviceCtr = deviceKeywordTotals.clicks / deviceKeywordTotals.impressions;
const deviceAvgCpc = deviceKeywordTotals.cost / deviceKeywordTotals.clicks;
const targetClicksPerDay = 50;
const targetPlan = {
  targetClicksPerDay,
  currentClicksPerDay: keywordTotals.clicks / 7,
  trafficMultipleNeeded: targetClicksPerDay / (keywordTotals.clicks / 7),
  currentCtr,
  currentAvgCpc,
  impressionsPerDayAtCurrentCtr: targetClicksPerDay / currentCtr,
  weeklyImpressionsAtCurrentCtr: targetClicksPerDay * 7 / currentCtr,
  dailyBudgetAtCurrentCpc: targetClicksPerDay * currentAvgCpc,
  weeklyBudgetAtCurrentCpc: targetClicksPerDay * 7 * currentAvgCpc,
  currentDeviceClicksPerDay: deviceKeywordTotals.clicks / 7,
  deviceTrafficMultipleNeeded: targetClicksPerDay / (deviceKeywordTotals.clicks / 7),
  currentDeviceCtr: deviceCtr,
  currentDeviceAvgCpc: deviceAvgCpc,
  deviceImpressionsPerDayForTarget: targetClicksPerDay / deviceCtr,
  deviceDailyBudgetAtCurrentCpc: targetClicksPerDay * deviceAvgCpc,
};

const negativeKeywords = [
  ["can drone be detected by radar", "完全匹配否定", "问题型研究词，本周已花费¥15.88"],
  ["security drone system", "完全匹配否定", "可能寻找安防巡逻无人机，而非反无人机设备"],
  ["counter small unmanned aircraft systems strategy", "完全匹配否定", "strategy信息查询"],
  ["remote id drone", "完全匹配否定", "过宽；保留remote id receiver/detector等设备长尾"],
  ["uas", "完全匹配否定", "单独缩写过宽"],
  ["esp32", "词组否定", "DIY开发板项目"],
  ["arduino", "词组否定", "DIY开发意图"],
  ["raspberry pi", "词组否定", "DIY开发意图"],
  ["jammer", "词组否定", "主动干扰能力词，当前广告合规排除"],
  ["jamming", "词组否定", "主动干扰能力词，当前广告合规排除"],
  ["spoofing", "词组否定", "主动诱骗能力词，当前广告合规排除"],
  ["droneshield", "词组否定", "竞品导航/研究词"],
  ["elvira", "词组否定", "竞品型号/品牌词"],
  ["diy", "词组否定", "DIY研究意图"],
  ["software", "词组否定", "纯软件意图，除非后续单独建软件产品活动"],
  ["app", "词组否定", "应用程序意图"],
  ["online", "词组否定", "在线工具/地图意图"],
].map(([negativeKeyword, negativeMatchType, reason]) => ({ campaign: "Device Intent - English", negativeKeyword, negativeMatchType, reason }));

const output = {
  period: "2026-07-08 to 2026-07-14",
  keywordTotals,
  visibleTotals,
  searchTermCoverage: {
    impressionCoverage: visibleTotals.impressions / keywordTotals.impressions,
    clickCoverage: visibleTotals.clicks / keywordTotals.clicks,
    costCoverage: visibleTotals.cost / keywordTotals.cost,
  },
  categorySummary,
  clickedTerms,
  allClassifiedTerms: classifiedTerms,
  deviceKeywordTotals,
  existingCandidates,
  supplemental,
  campaignRows,
  negativeKeywords,
  targetPlan,
  methodology: {
    purchaseIntentDefinition: "明确出现detector/radar/handheld/portable/RF receiver/equipment等设备形态，或明确C-UAS系统采购意图。",
    nonPurchaseDefinition: "问题型、strategy/technology、DIY、过宽缩写、普通安防无人机、竞品导航，以及当前合规排除的主动干扰词。",
    caveat: "搜索字词报告只覆盖30/51次点击；非采购占比仅以可见搜索字词点击为分母，不能代表全部7天点击。",
  },
};

await fs.writeFile(`${outDir}/analysis.json`, JSON.stringify(output, null, 2), "utf8");
console.log(JSON.stringify({
  period: output.period,
  keywordTotals,
  visibleTotals,
  searchTermCoverage: output.searchTermCoverage,
  categorySummary,
  deviceKeywordTotals,
  candidates: existingCandidates.length,
  supplemental: supplemental.length,
  targetPlan,
}, null, 2));
