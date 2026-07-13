import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const workDir = "D:/fc-cuas/outputs/019f5bfa-keyword-device";
const outputPath = `${workDir}/非RF设备词组关键词建议.xlsx`;
const source = JSON.parse(await fs.readFile(`${workDir}/sheet-1.json`, "utf8"));
const rows = source.values;
const sourcePeriod = String(rows[1]?.[0] || "2026年7月6日 - 2026年7月12日");

const normalize = (value) => String(value ?? "")
  .toLowerCase()
  .replace(/^['\"\[]+|['\"\]]+$/g, "")
  .replace(/[^a-z0-9+\- ]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const restrictedRegex = /\b(jammer|jamming|signal blocker|spoofing|deception|intercept|neutraliz\w*|weapon|gun|shoot down|destroy|counter uav|counter-uav)\b/i;
const rfRegex = /\b(rf|radio frequency|radio-frequency|spectrum)\b/i;
const deviceRegex = /\b(device|equipment|system|detector|detection|sensor|radar|camera|scanner|receiver|monitor|monitoring|tracker|tracking|station|terminal|platform|surveillance|identification|warning|alert)\b/i;

const records = rows.slice(3).filter((r) => r?.[1]).map((r, idx) => ({
  sourceRow: idx + 4,
  raw: String(r[1]),
  keyword: normalize(r[1]),
  matchType: String(r[2] ?? ""),
  campaign: String(r[3] ?? ""),
  adGroup: String(r[4] ?? ""),
  status: String(r[5] ?? ""),
  impressions: Number(r[10]) || 0,
  clicks: Number(r[31]) || 0,
  cost: Number(r[14]) || 0,
}));

const existing = new Set(records.map((r) => r.keyword));
const evidencePool = records.filter((r) => deviceRegex.test(r.keyword) && !rfRegex.test(r.keyword) && !restrictedRegex.test(r.keyword));
const tokenSet = (value) => new Set(value.split(/\s+/).filter(Boolean));
const similarity = (a, b) => {
  const aa = tokenSet(a);
  const bb = tokenSet(b);
  const shared = [...aa].filter((t) => bb.has(t)).length;
  const union = new Set([...aa, ...bb]).size || 1;
  return shared / union;
};
const closestEvidence = (candidate) => evidencePool
  .map((r) => ({ r, score: similarity(candidate, r.keyword) * 10000 + Math.min(r.impressions, 20) + r.clicks * 100 }))
  .sort((a, b) => b.score - a.score || b.r.clicks - a.r.clicks || b.r.impressions - a.r.impressions)[0]?.r;

const aCandidates = [
  ["portable uav detector", "便携式 UAV 探测器", "UAV Detector"],
  ["fixed uav detector", "固定式 UAV 探测器", "UAV Detector"],
  ["mobile uav detector", "移动式 UAV 探测器", "UAV Detector"],
  ["handheld uav detector", "手持式 UAV 探测器", "UAV Detector"],
  ["vehicle-mounted uav detector", "车载 UAV 探测器", "UAV Detector"],
  ["uav tracking device", "UAV 跟踪设备", "Drone Tracking"],
  ["drone tracking device", "无人机跟踪设备", "Drone Tracking"],
  ["uav monitoring device", "UAV 监测设备", "UAV Detection Equipment"],
  ["drone monitoring device", "无人机监测设备", "Drone Detector Equipment"],
  ["uav identification device", "UAV 识别设备", "UAV Detection Equipment"],
  ["drone identification device", "无人机识别设备", "Drone Detector Equipment"],
  ["unmanned aircraft detector", "无人驾驶航空器探测器", "UAV Detector"],
  ["commercial drone detector", "商用无人机探测器", "Drone Detector Equipment"],
  ["industrial drone detector", "工业无人机探测器", "Drone Detector Equipment"],
  ["fixed drone detector", "固定式无人机探测器", "Drone Detector Equipment"],
  ["vehicle-mounted drone detector", "车载无人机探测器", "Drone Detector Equipment"],
  ["drone detection sensor", "无人机探测传感器", "Drone Detection System"],
  ["uav detection sensor", "UAV 探测传感器", "UAV Detection Equipment"],
  ["drone surveillance equipment", "无人机监视设备", "Drone Detector Equipment"],
  ["uav surveillance equipment", "UAV 监视设备", "UAV Detection Equipment"],
  ["airspace monitoring device", "空域监测设备", "UAV Detection Equipment"],
  ["airspace surveillance device", "空域监视设备", "UAV Detection Equipment"],
  ["low-altitude monitoring equipment", "低空监测设备", "UAV Detection Equipment"],
  ["drone warning device", "无人机预警设备", "Drone Detection System"],
  ["uav warning device", "UAV 预警设备", "UAV Detection Equipment"],
  ["drone detection station", "无人机探测站", "Drone Detection System"],
  ["uav detection station", "UAV 探测站", "UAV Detection Equipment"],
  ["drone monitoring station", "无人机监测站", "Drone Detection System"],
  ["uav monitoring station", "UAV 监测站", "UAV Detection Equipment"],
  ["drone tracking station", "无人机跟踪站", "Drone Tracking"],
  ["uav tracking station", "UAV 跟踪站", "Drone Tracking"],
  ["cuas monitoring equipment", "C-UAS 监测设备", "C-UAS Systems"],
  ["cuas detection equipment", "C-UAS 探测设备", "C-UAS Systems"],
  ["c-uas monitoring equipment", "C-UAS 监测设备", "C-UAS Systems"],
  ["c-uas tracking equipment", "C-UAS 跟踪设备", "C-UAS Systems"],
  ["c-uas detection device", "C-UAS 探测设备", "C-UAS Systems"],
  ["drone identification system", "无人机识别系统", "Drone Detection System"],
  ["uav identification system", "UAV 识别系统", "UAV Detection Equipment"],
  ["drone alert system", "无人机告警系统", "Drone Detection System"],
  ["uav alert system", "UAV 告警系统", "UAV Detection Equipment"],
  ["aerial drone detector", "空中目标无人机探测器", "Drone Detector Equipment"],
  ["perimeter drone detector", "周界无人机探测器", "Drone Detector Equipment"],
  ["fixed-site drone detector", "固定站点无人机探测器", "Drone Detector Equipment"],
  ["portable detection station", "便携式探测站", "Drone Detection System"],
  ["mobile detection station", "移动式探测站", "Drone Detection System"],
  ["vehicle-mounted detection system", "车载探测系统", "Drone Detection System"],
  ["low-altitude detection device", "低空探测设备", "UAV Detection Equipment"],
];

const bCandidates = [
  ["drone tracking radar", "雷达设备属于 B 层 neutral_seo"],
  ["uav tracking radar", "雷达设备属于 B 层 neutral_seo"],
  ["drone surveillance radar", "雷达设备属于 B 层 neutral_seo"],
  ["uav surveillance radar", "雷达设备属于 B 层 neutral_seo"],
  ["drone monitoring radar", "雷达设备属于 B 层 neutral_seo"],
  ["uav monitoring radar", "雷达设备属于 B 层 neutral_seo"],
  ["portable drone radar", "雷达设备属于 B 层 neutral_seo"],
  ["mobile drone radar", "雷达设备属于 B 层 neutral_seo"],
  ["fixed drone radar", "雷达设备属于 B 层 neutral_seo"],
  ["low-altitude detection radar", "雷达设备属于 B 层 neutral_seo"],
  ["drone detection camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["uav detection camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["drone tracking camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["uav tracking camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["eo tracking camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["electro-optical tracking camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["thermal drone camera", "EO/IR 设备属于 B 层 neutral_seo"],
  ["optical drone detector", "EO/IR 设备属于 B 层 neutral_seo"],
  ["visual drone detector", "EO/IR 设备属于 B 层 neutral_seo"],
  ["remote id receiver", "Remote ID 设备属于 B 层 neutral_seo"],
  ["drone id receiver", "Remote ID 设备属于 B 层 neutral_seo"],
  ["uav id receiver", "Remote ID 设备属于 B 层 neutral_seo"],
  ["remote id scanner", "Remote ID 设备属于 B 层 neutral_seo"],
  ["uav remote-id receiver", "Remote ID 设备属于 B 层 neutral_seo"],
  ["radar vision system", "雷视融合设备仅适合 SEO 信息流量"],
  ["radar vision equipment", "雷视融合设备仅适合 SEO 信息流量"],
];

const recommended = aCandidates
  .map(([keyword, direction, adGroup]) => ({ keyword: normalize(keyword), direction, adGroup, evidence: closestEvidence(normalize(keyword)) }))
  .filter((x) => x.keyword && !existing.has(x.keyword) && !rfRegex.test(x.keyword) && !restrictedRegex.test(x.keyword))
  .sort((a, b) => {
    const aValue = (a.evidence?.clicks || 0) * 100 + (a.evidence?.impressions || 0) + similarity(a.keyword, a.evidence?.keyword || "") * 20;
    const bValue = (b.evidence?.clicks || 0) * 100 + (b.evidence?.impressions || 0) + similarity(b.keyword, b.evidence?.keyword || "") * 20;
    return bValue - aValue || a.keyword.localeCompare(b.keyword);
  });

const held = bCandidates
  .map(([keyword, reason]) => ({ keyword: normalize(keyword), reason, evidence: closestEvidence(normalize(keyword)) }))
  .filter((x) => x.keyword && !existing.has(x.keyword) && !rfRegex.test(x.keyword) && !restrictedRegex.test(x.keyword));

const workbook = Workbook.create();
const recSheet = workbook.worksheets.add("设备词组建议");
const holdSheet = workbook.worksheets.add("B层暂缓投放");
const sourceSheet = workbook.worksheets.add("源关键词索引");
const ruleSheet = workbook.worksheets.add("筛选规则");

const brand = "#315BA4";
const dark = "#1A1A2E";
const pale = "#EEF4FF";
const line = "#D7DFEA";
const green = "#DFF4E7";
const amber = "#FFF3CD";
const red = "#FDE2E1";

for (const sheet of [recSheet, holdSheet, sourceSheet, ruleSheet]) sheet.showGridLines = false;

recSheet.getRange("A1:M1").merge();
recSheet.getRange("A1").values = [["非 RF 设备词组关键词建议"]];
recSheet.getRange("A2:M2").merge();
recSheet.getRange("A2").values = [[`来源：搜索关键字报告 (18).xlsx｜数据周期：${sourcePeriod}`]];
recSheet.getRange("A3:M3").merge();
recSheet.getRange("A3").values = [["仅保留新增、设备型、约 3 个英文单词的候选词；已排除 RF / radio frequency / spectrum 及受限响应类词。"]];
recSheet.getRange("A5:M5").values = [["优先级", "词组匹配关键词", "纯关键词", "词数", "设备方向", "最接近现有词", "源行", "源展示", "源点击", "重复检查", "合规层级", "建议广告组", "建议落地页"]];

const recStart = 6;
const recValues = recommended.map((x) => [
  null,
  `\"${x.keyword}\"`,
  x.keyword,
  null,
  x.direction,
  x.evidence?.keyword || "",
  x.evidence?.sourceRow || null,
  x.evidence?.impressions || 0,
  x.evidence?.clicks || 0,
  null,
  "A｜可测试",
  x.adGroup,
  "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
]);
if (recValues.length) {
  recSheet.getRange(`A${recStart}:M${recStart + recValues.length - 1}`).values = recValues;
  recSheet.getRange(`A${recStart}:A${recStart + recValues.length - 1}`).formulas = recommended.map((_, i) => [`=IF(I${recStart + i}>=1,"高",IF(H${recStart + i}>=5,"中","测试"))`]);
  recSheet.getRange(`D${recStart}:D${recStart + recValues.length - 1}`).formulas = recommended.map((_, i) => [`=LEN(TRIM(C${recStart + i}))-LEN(SUBSTITUTE(TRIM(C${recStart + i})," ",""))+1`]);
  recSheet.getRange(`J${recStart}:J${recStart + recValues.length - 1}`).formulas = recommended.map((_, i) => [`=IF(COUNTIF('源关键词索引'!$B$2:$B$${records.length + 1},C${recStart + i})>0,"已存在","新增")`]);
}

recSheet.getRange("A1:M1").format = { fill: brand, font: { bold: true, color: "#FFFFFF", size: 18 }, verticalAlignment: "center" };
recSheet.getRange("A2:M2").format = { fill: dark, font: { color: "#FFFFFF", size: 10 }, verticalAlignment: "center" };
recSheet.getRange("A3:M3").format = { fill: pale, font: { color: dark, italic: true }, wrapText: true, verticalAlignment: "center" };
recSheet.getRange("A5:M5").format = { fill: brand, font: { bold: true, color: "#FFFFFF" }, wrapText: true, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: brand } };
if (recValues.length) {
  const dataRange = recSheet.getRange(`A${recStart}:M${recStart + recValues.length - 1}`);
  dataRange.format = { borders: { insideHorizontal: { style: "thin", color: line } }, verticalAlignment: "center" };
  recSheet.getRange(`A${recStart}:A${recStart + recValues.length - 1}`).format = { horizontalAlignment: "center", font: { bold: true } };
  recSheet.getRange(`B${recStart}:C${recStart + recValues.length - 1}`).format = { font: { color: dark }, wrapText: false };
  recSheet.getRange(`D${recStart}:D${recStart + recValues.length - 1}`).format = { horizontalAlignment: "center", numberFormat: "0" };
  recSheet.getRange(`G${recStart}:I${recStart + recValues.length - 1}`).format = { horizontalAlignment: "right", numberFormat: "#,##0" };
  recSheet.getRange(`J${recStart}:K${recStart + recValues.length - 1}`).format = { horizontalAlignment: "center" };
  recSheet.getRange(`M${recStart}:M${recStart + recValues.length - 1}`).format = { font: { color: brand }, wrapText: true };
  recSheet.getRange(`A${recStart}:A${recStart + recValues.length - 1}`).conditionalFormats.add("containsText", { text: "高", format: { fill: green, font: { color: "#176B3A", bold: true } } });
  recSheet.getRange(`A${recStart}:A${recStart + recValues.length - 1}`).conditionalFormats.add("containsText", { text: "中", format: { fill: amber, font: { color: "#856404", bold: true } } });
  recSheet.getRange(`J${recStart}:J${recStart + recValues.length - 1}`).conditionalFormats.add("containsText", { text: "新增", format: { fill: green, font: { color: "#176B3A" } } });
  const table = recSheet.tables.add(`A5:M${recStart + recValues.length - 1}`, true, "RecommendedKeywords");
  table.style = "TableStyleMedium2";
}
recSheet.getRange("A1:M3").format.rowHeight = 28;
recSheet.getRange("A5:M5").format.rowHeight = 34;
recSheet.getRange(`A${recStart}:M${recStart + Math.max(0, recValues.length - 1)}`).format.rowHeight = 24;
const recWidths = [10, 29, 27, 8, 24, 28, 9, 10, 10, 11, 13, 24, 48];
recWidths.forEach((w, i) => recSheet.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
recSheet.freezePanes.freezeRows(5);

holdSheet.getRange("A1:F1").merge();
holdSheet.getRange("A1").values = [["B 层设备词：保留做 SEO 研究，暂不作为广告词组投放"]];
holdSheet.getRange("A2:F2").merge();
holdSheet.getRange("A2").values = [["这些词不含 RF，但对应雷达、EO/IR 或 Remote ID 等 neutral_seo 产品层级。按 N‑TET 护栏，不能把 B 层产品页作为广告落地页。"]];
holdSheet.getRange("A4:F4").values = [["词组形式", "纯关键词", "词数", "暂缓原因", "最接近现有词", "允许用途"]];
const holdValues = held.map((x) => [`\"${x.keyword}\"`, x.keyword, null, x.reason, x.evidence?.keyword || "", "SEO / 内容研究"]);
if (holdValues.length) {
  holdSheet.getRange(`A5:F${4 + holdValues.length}`).values = holdValues;
  holdSheet.getRange(`C5:C${4 + holdValues.length}`).formulas = held.map((_, i) => [`=LEN(TRIM(B${5 + i}))-LEN(SUBSTITUTE(TRIM(B${5 + i})," ",""))+1`]);
  holdSheet.getRange(`A5:F${4 + holdValues.length}`).format = { borders: { insideHorizontal: { style: "thin", color: line } }, verticalAlignment: "center" };
  holdSheet.getRange(`D5:D${4 + holdValues.length}`).format = { fill: amber, wrapText: true };
  const table = holdSheet.tables.add(`A4:F${4 + holdValues.length}`, true, "HeldKeywords");
  table.style = "TableStyleMedium9";
}
holdSheet.getRange("A1:F1").format = { fill: dark, font: { bold: true, color: "#FFFFFF", size: 16 }, verticalAlignment: "center" };
holdSheet.getRange("A2:F2").format = { fill: amber, font: { color: dark }, wrapText: true, verticalAlignment: "center" };
holdSheet.getRange("A4:F4").format = { fill: "#B07A16", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
[28, 27, 8, 38, 28, 20].forEach((w, i) => holdSheet.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
holdSheet.getRange("A1:F2").format.rowHeight = 34;
holdSheet.freezePanes.freezeRows(4);

sourceSheet.getRange("A1:J1").values = [["源行", "标准化关键词", "原始关键词", "匹配类型", "广告系列", "广告组", "状态", "展示次数", "点击次数", "费用 (CNY)"]];
sourceSheet.getRange(`A2:J${records.length + 1}`).values = records.map((r) => [r.sourceRow, r.keyword, r.raw, r.matchType, r.campaign, r.adGroup, r.status, r.impressions, r.clicks, r.cost]);
sourceSheet.getRange("A1:J1").format = { fill: brand, font: { bold: true, color: "#FFFFFF" }, wrapText: true, horizontalAlignment: "center" };
sourceSheet.getRange(`A2:J${records.length + 1}`).format = { borders: { insideHorizontal: { style: "thin", color: "#E8EDF3" } }, verticalAlignment: "center" };
sourceSheet.getRange(`A2:A${records.length + 1}`).format.numberFormat = "0";
sourceSheet.getRange(`H2:I${records.length + 1}`).format.numberFormat = "#,##0";
sourceSheet.getRange(`J2:J${records.length + 1}`).format.numberFormat = "#,##0.00";
[9, 30, 30, 14, 27, 26, 13, 11, 11, 13].forEach((w, i) => sourceSheet.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
const sourceTable = sourceSheet.tables.add(`A1:J${records.length + 1}`, true, "SourceKeywordIndex");
sourceTable.style = "TableStyleMedium2";
sourceSheet.freezePanes.freezeRows(1);

ruleSheet.getRange("A1:F1").merge();
ruleSheet.getRange("A1").values = [["筛选口径与合规说明"]];
ruleSheet.getRange("A3:B10").values = [
  ["项目", "规则"],
  ["数据来源", `搜索关键字报告 (18).xlsx；${sourcePeriod}`],
  ["关键词范围", "仅设备型关键词；优先 3 个英文单词，允许连字符词作为 1 个单词。"],
  ["新增判断", "与源报告中的标准化关键词做精确去重；引号、方括号和大小写不影响判断。"],
  ["RF 排除", "排除含 RF、radio frequency、radio-frequency、spectrum 的词。"],
  ["受限词排除", "排除 jammer、jamming、gun、weapon、spoofing、intercept、neutralize、counter UAV 等词。"],
  ["优先级", "按最接近现有设备词的点击/展示信号排序；这不是搜索量预测。"],
  ["投放建议", "先小预算测试 A 层候选；每个广告组保持语义集中，并使用低空监测公共落地页。"],
];
ruleSheet.getRange("D3:F3").merge();
ruleSheet.getRange("D3").values = [["风险分栏"]];
ruleSheet.getRange("D4:F11").values = [
  ["类别", "结论", "说明"],
  ["广告合规风险", "已控制", "推荐表仅放 A 层设备意图；B 层单独暂缓，C 层不输出。"],
  ["SEO 风险", "中性", "B 层词可做信息型 SEO，但不可直接转为广告落地页。"],
  ["GEO / AI 可见性", "无新增风险", "本次只做内部关键词表，不发布公开内容。"],
  ["公开可见性泄漏", "无", "未改站点、Schema、sitemap、llms.txt 或公开页面。"],
  ["数据限制", "需注意", "报告周期仅 7 天，多数关键词低展示；候选应通过广告平台搜索词和否定词持续复核。"],
  ["B 层设备", "暂缓投放", "雷达、EO/IR、Remote ID 仅保留为 SEO / 内容研究候选。"],
  ["RF 设备", "完全排除", "按用户要求不输出 RF / spectrum 设备词。"],
];
ruleSheet.getRange("A1:F1").format = { fill: brand, font: { bold: true, color: "#FFFFFF", size: 17 }, verticalAlignment: "center" };
ruleSheet.getRange("A3:B3").format = { fill: dark, font: { bold: true, color: "#FFFFFF" } };
ruleSheet.getRange("A4:B10").format = { borders: { insideHorizontal: { style: "thin", color: line } }, wrapText: true, verticalAlignment: "top" };
ruleSheet.getRange("A4:A10").format = { fill: pale, font: { bold: true, color: dark } };
ruleSheet.getRange("D3:F3").format = { fill: dark, font: { bold: true, color: "#FFFFFF" } };
ruleSheet.getRange("D4:F4").format = { fill: brand, font: { bold: true, color: "#FFFFFF" } };
ruleSheet.getRange("D5:F11").format = { borders: { insideHorizontal: { style: "thin", color: line } }, wrapText: true, verticalAlignment: "top" };
ruleSheet.getRange("E5:E11").format = { horizontalAlignment: "center", font: { bold: true } };
ruleSheet.getRange("D5:F5").format.fill = green;
ruleSheet.getRange("D6:F6").format.fill = amber;
ruleSheet.getRange("D10:F11").format.fill = red;
[20, 58, 4, 22, 16, 50].forEach((w, i) => ruleSheet.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
ruleSheet.getRange("A1:F1").format.rowHeight = 32;
ruleSheet.getRange("A3:F11").format.rowHeight = 36;

await fs.mkdir(workDir, { recursive: true });
const inspect = await workbook.inspect({
  kind: "table",
  sheetId: "设备词组建议",
  range: `A1:M${Math.min(recStart + recommended.length, 24)}`,
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 13,
  maxChars: 12000,
});
console.log("RECOMMENDATION_CHECK");
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log("FORMULA_ERRORS");
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, recommended: recommended.length, held: held.length, sourceRows: records.length }));
