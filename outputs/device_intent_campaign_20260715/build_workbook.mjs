import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_intent_campaign_20260715";
const outputPath = `${outDir}/N-TET_设备采购意向词_新广告活动_20260715.xlsx`;
const analysis = JSON.parse(await fs.readFile(`${outDir}/analysis.json`, "utf8"));
const inspection = JSON.parse(await fs.readFile(`${outDir}/input_inspection.json`, "utf8"));

const COLORS = {
  blue: "#315BA4",
  dark: "#1A1A2E",
  lightBlue: "#EAF1FB",
  pale: "#F8F9FA",
  teal: "#167D8D",
  green: "#DDF4E8",
  orange: "#FFF0D6",
  red: "#FBE3E1",
  gray: "#667085",
  border: "#D0D5DD",
  white: "#FFFFFF",
};

function colName(n) {
  let out = "";
  while (n > 0) {
    n -= 1;
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26);
  }
  return out;
}

function sourceRows(values, needle, keyField) {
  const headerIndex = values.findIndex((row) => row.includes(needle));
  const headers = values[headerIndex];
  const rows = values.slice(headerIndex + 1).filter((row) => {
    const key = row[headers.indexOf(keyField)];
    return typeof key === "string" && key.trim() && !key.startsWith("总计");
  });
  return { headers, rows };
}

function writeTitle(sheet, range, title, subtitleRange, subtitle) {
  sheet.mergeCells(range);
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = {
    fill: COLORS.dark,
    font: { bold: true, color: COLORS.white, size: 20 },
    verticalAlignment: "center",
    horizontalAlignment: "left",
  };
  sheet.getRange(range).format.rowHeight = 36;
  sheet.mergeCells(subtitleRange);
  sheet.getRange(subtitleRange).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = {
    fill: COLORS.lightBlue,
    font: { color: COLORS.gray, size: 10 },
    verticalAlignment: "center",
    horizontalAlignment: "left",
    wrapText: true,
  };
  sheet.getRange(subtitleRange).format.rowHeight = 32;
}

function styleHeader(range) {
  range.format = {
    fill: COLORS.blue,
    font: { bold: true, color: COLORS.white },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: COLORS.blue },
  };
  range.format.rowHeight = 30;
}

function addTable(sheet, name, range) {
  const table = sheet.tables.add(range, true, name);
  table.style = "TableStyleMedium2";
  table.showFilterButton = true;
  table.showBandedRows = true;
  return table;
}

function makeCard(sheet, labelRange, valueRange, noteRange, label, formula, note, numberFormat) {
  sheet.mergeCells(labelRange);
  sheet.mergeCells(valueRange);
  sheet.mergeCells(noteRange);
  sheet.getRange(labelRange).values = [[label]];
  sheet.getRange(valueRange).formulas = [[formula]];
  sheet.getRange(noteRange).values = [[note]];
  sheet.getRange(labelRange).format = { fill: COLORS.lightBlue, font: { bold: true, color: COLORS.dark }, horizontalAlignment: "left", verticalAlignment: "center" };
  sheet.getRange(valueRange).format = { fill: COLORS.white, font: { bold: true, color: COLORS.blue, size: 18 }, horizontalAlignment: "left", verticalAlignment: "center", numberFormat };
  sheet.getRange(noteRange).format = { fill: COLORS.white, font: { color: COLORS.gray, size: 9 }, horizontalAlignment: "left", verticalAlignment: "top", wrapText: true, borders: { preset: "outside", style: "thin", color: COLORS.border } };
  sheet.getRange(valueRange).format.borders = { preset: "outside", style: "thin", color: COLORS.border };
}

const keywordSourceAll = sourceRows(inspection.keywords.allValues, "关键字状态", "关键字");
const keywordActivityColumns = ["展示次数", "点击次数", "费用", "转化次数"].map((name) => keywordSourceAll.headers.indexOf(name));
const keywordSource = {
  headers: keywordSourceAll.headers,
  rows: keywordSourceAll.rows.filter((row) => keywordActivityColumns.some((index) => Number(row[index] || 0) > 0)),
};
const termSource = sourceRows(inspection.terms.allValues, "搜索字词", "搜索字词");

const wb = Workbook.create();
console.log("stage:workbook-created");
const summary = wb.worksheets.add("Summary");
const intent = wb.worksheets.add("Intent Analysis");
const campaign = wb.worksheets.add("Device Campaign");
const audit = wb.worksheets.add("Device Keyword Audit");
const negatives = wb.worksheets.add("Negative Keywords");
const sourceKeywords = wb.worksheets.add("Source Keywords");
const sourceTerms = wb.worksheets.add("Source Search Terms");

for (const sheet of [summary, intent, campaign, audit, negatives, sourceKeywords, sourceTerms]) sheet.showGridLines = false;
console.log("stage:sheets-created");

// Source sheets: keep source rows unchanged, with report title/date rows removed only for clean tabular use.
sourceKeywords.getRangeByIndexes(0, 0, 1, keywordSource.headers.length).values = [keywordSource.headers];
sourceKeywords.getRangeByIndexes(1, 0, keywordSource.rows.length, keywordSource.headers.length).values = keywordSource.rows;
styleHeader(sourceKeywords.getRangeByIndexes(0, 0, 1, keywordSource.headers.length));
sourceKeywords.freezePanes.freezeRows(1);
sourceKeywords.freezePanes.freezeColumns(2);
sourceKeywords.getUsedRange().format.font = { size: 9 };
sourceKeywords.getUsedRange().format.verticalAlignment = "center";
sourceKeywords.getRangeByIndexes(1, 0, keywordSource.rows.length, keywordSource.headers.length).format.wrapText = false;
sourceKeywords.getRange(`B1:B${keywordSource.rows.length + 1}`).format.columnWidth = 32;
sourceKeywords.getRange(`D1:E${keywordSource.rows.length + 1}`).format.columnWidth = 24;
sourceKeywords.getRange(`J1:J${keywordSource.rows.length + 1}`).format.columnWidth = 42;
sourceKeywords.getRange(`K1:AJ${keywordSource.rows.length + 1}`).format.columnWidth = 14;

sourceTerms.getRangeByIndexes(0, 0, 1, termSource.headers.length).values = [termSource.headers];
sourceTerms.getRangeByIndexes(1, 0, termSource.rows.length, termSource.headers.length).values = termSource.rows;
styleHeader(sourceTerms.getRangeByIndexes(0, 0, 1, termSource.headers.length));
sourceTerms.freezePanes.freezeRows(1);
sourceTerms.freezePanes.freezeColumns(1);
sourceTerms.getUsedRange().format.font = { size: 9 };
sourceTerms.getRange(`A1:A${termSource.rows.length + 1}`).format.columnWidth = 34;
sourceTerms.getRange(`D1:E${termSource.rows.length + 1}`).format.columnWidth = 24;
sourceTerms.getRange(`M1:M${termSource.rows.length + 1}`).format.columnWidth = 32;
console.log("stage:sources-written");

// Intent analysis with formula-backed category summary.
writeTitle(intent, "A1:N1", "7天搜索字词采购意向分析", "A2:N2", "数据范围：2026-07-08 至 2026-07-14。搜索字词报告只覆盖30/51次点击；所有占比都以可见30次点击为分母。来源：搜索字词报告 (9).xlsx。 ");
const categories = ["设备采购意向", "方案采购意向", "非采购/研究", "竞品/受限/非目标", "宽泛待验证"];
intent.getRange("A4:I4").values = [["意向分类", "搜索词行数", "展示", "点击", "可见点击占比", "费用", "可见费用占比", "CTR", "平均CPC"]];
styleHeader(intent.getRange("A4:I4"));
intent.getRange("A5:A9").values = categories.map((value) => [value]);

const termHeaders = ["搜索字词", "意向分类", "分类理由", "匹配类型", "广告系列", "广告组", "触发关键词", "添加/排除", "展示", "点击", "CTR", "平均CPC", "费用", "转化"];
const clicked = analysis.clickedTerms;
intent.getRange("A13:N13").values = [termHeaders];
styleHeader(intent.getRange("A13:N13"));
intent.getRangeByIndexes(13, 0, clicked.length, termHeaders.length).values = clicked.map((row) => [row.searchTerm, row.intentClass, row.reason, row.matchType, row.campaign, row.adGroup, row.matchedKeyword, row.addedExcluded, row.impressions, row.clicks, row.ctr, row.avgCpc, row.cost, row.conversions]);
const clickedEnd = 14 + clicked.length - 1;
for (let r = 5; r <= 9; r += 1) {
  intent.getRange(`B${r}`).formulas = [[`=COUNTIF($B$14:$B$${clickedEnd},A${r})`]];
  intent.getRange(`C${r}`).formulas = [[`=SUMIF($B$14:$B$${clickedEnd},A${r},$I$14:$I$${clickedEnd})`]];
  intent.getRange(`D${r}`).formulas = [[`=SUMIF($B$14:$B$${clickedEnd},A${r},$J$14:$J$${clickedEnd})`]];
  intent.getRange(`E${r}`).formulas = [[`=D${r}/SUM($D$5:$D$9)`]];
  intent.getRange(`F${r}`).formulas = [[`=SUMIF($B$14:$B$${clickedEnd},A${r},$M$14:$M$${clickedEnd})`]];
  intent.getRange(`G${r}`).formulas = [[`=F${r}/SUM($F$5:$F$9)`]];
  intent.getRange(`H${r}`).formulas = [[`=IFERROR(D${r}/C${r},0)`]];
  intent.getRange(`I${r}`).formulas = [[`=IFERROR(F${r}/D${r},0)`]];
}
intent.getRange("E5:E9").format.numberFormat = "0.0%";
intent.getRange("F5:F9").format.numberFormat = "¥#,##0.00";
intent.getRange("G5:H9").format.numberFormat = "0.0%";
intent.getRange("I5:I9").format.numberFormat = "¥#,##0.00";
intent.getRange("K4:L4").values = [["意向分类", "点击"]];
intent.getRange("K5:K9").formulas = categories.map((_, i) => [`=A${5 + i}`]);
intent.getRange("L5:L9").formulas = categories.map((_, i) => [`=D${5 + i}`]);
styleHeader(intent.getRange("K4:L4"));
intent.getRange("B14:B40").format.wrapText = true;
intent.getRange("C14:C40").format.wrapText = true;
intent.getRange(`A1:A${clickedEnd}`).format.columnWidth = 30;
intent.getRange(`B1:B${clickedEnd}`).format.columnWidth = 20;
intent.getRange(`C1:C${clickedEnd}`).format.columnWidth = 42;
intent.getRange(`D1:H${clickedEnd}`).format.columnWidth = 22;
intent.getRange(`I1:N${clickedEnd}`).format.columnWidth = 13;
intent.freezePanes.freezeRows(13);
addTable(intent, "ClickedTermsAudit", `A13:N${clickedEnd}`);
console.log("stage:intent-written");

// Device keyword audit.
writeTitle(audit, "A1:M1", "现有设备类关键词审计", "A2:M2", "严格设备词定义：明确出现detector/radar/handheld/portable/RF/receiver/equipment等设备形态；按标准化关键词+匹配方式合并不同地区系列。零展示词保留在审计中，但不默认放入首批新活动。 ");
const auditHeaders = ["关键词", "匹配类型", "设备组", "优先级", "来源", "7天展示", "7天点击", "7天费用", "平均CPC", "建议最终网址", "当前广告系列", "当前网址", "账户重复行数"];
audit.getRange("A4:M4").values = [auditHeaders];
styleHeader(audit.getRange("A4:M4"));
audit.getRangeByIndexes(4, 0, analysis.existingCandidates.length, auditHeaders.length).values = analysis.existingCandidates.map((row) => [row.keyword, row.matchType, row.deviceGroup, row.priority, row.source, row.impressions7d, row.clicks7d, row.cost7d, row.avgCpc7d, row.finalUrl, row.campaigns, row.currentUrls, row.existingRows]);
const auditEnd = 5 + analysis.existingCandidates.length - 1;
audit.getRange(`H5:I${auditEnd}`).format.numberFormat = "¥#,##0.00";
audit.getRange(`A1:A${auditEnd}`).format.columnWidth = 34;
audit.getRange(`B1:E${auditEnd}`).format.columnWidth = 22;
audit.getRange(`F1:I${auditEnd}`).format.columnWidth = 13;
audit.getRange(`J1:J${auditEnd}`).format.columnWidth = 50;
audit.getRange(`K1:L${auditEnd}`).format.columnWidth = 48;
audit.getRange(`M1:M${auditEnd}`).format.columnWidth = 15;
audit.freezePanes.freezeRows(4);
audit.freezePanes.freezeColumns(1);
addTable(audit, "DeviceKeywordAudit", `A4:M${auditEnd}`);
console.log("stage:audit-written");

// Launch campaign sheet: existing device keywords with any 7-day impressions + supplemental purchase-intent terms.
writeTitle(campaign, "A1:M1", "Device Intent - English｜新广告活动关键词", "A2:M2", "首批仅纳入7天内已有展示的严格设备词，再补充manufacturer/supplier/price/buy及设备长尾。建议一个独立活动、6个设备广告组；精准作为主干，词组作为受控扩量层。 ");
const campaignHeaders = ["Campaign", "Ad group", "Keyword", "Match type", "Final URL", "Priority", "Source", "7d Impressions", "7d Clicks", "7d Cost", "7d Avg CPC", "Intent reason", "Launch status"];
campaign.getRange("A4:M4").values = [campaignHeaders];
styleHeader(campaign.getRange("A4:M4"));
campaign.getRangeByIndexes(4, 0, analysis.campaignRows.length, campaignHeaders.length).values = analysis.campaignRows.map((row) => [row.campaign, row.adGroup, row.keyword, row.matchType, row.finalUrl, row.priority, row.source, row.impressions7d, row.clicks7d, row.cost7d, row.avgCpc7d, row.reason, "Launch"]);
const campaignEnd = 5 + analysis.campaignRows.length - 1;
campaign.getRange(`J5:K${campaignEnd}`).format.numberFormat = "¥#,##0.00";
campaign.getRange(`A1:A${campaignEnd}`).format.columnWidth = 27;
campaign.getRange(`B1:B${campaignEnd}`).format.columnWidth = 28;
campaign.getRange(`C1:C${campaignEnd}`).format.columnWidth = 38;
campaign.getRange(`D1:D${campaignEnd}`).format.columnWidth = 14;
campaign.getRange(`E1:E${campaignEnd}`).format.columnWidth = 52;
campaign.getRange(`F1:G${campaignEnd}`).format.columnWidth = 22;
campaign.getRange(`H1:K${campaignEnd}`).format.columnWidth = 13;
campaign.getRange(`L1:L${campaignEnd}`).format.columnWidth = 30;
campaign.getRange(`M1:M${campaignEnd}`).format.columnWidth = 14;
campaign.getRange(`L5:L${campaignEnd}`).format.wrapText = true;
campaign.freezePanes.freezeRows(4);
campaign.freezePanes.freezeColumns(3);
campaign.getRange(`M5:M${campaignEnd}`).dataValidation = { rule: { type: "list", values: ["Launch", "Hold", "Exclude"] } };
addTable(campaign, "DeviceCampaignBuild", `A4:M${campaignEnd}`);
console.log("stage:campaign-written");

// Negative keywords.
writeTitle(negatives, "A1:D1", "Device Intent活动否定关键词", "A2:D2", "包含本周已发生的非采购搜索词，以及DIY、主动干扰、竞品和软件类预防性否定。Remote ID只否定过宽的完全匹配词，保留receiver/detector设备长尾。 ");
negatives.getRange("A4:D4").values = [["Campaign", "Negative keyword", "Negative match type", "Reason"]];
styleHeader(negatives.getRange("A4:D4"));
negatives.getRangeByIndexes(4, 0, analysis.negativeKeywords.length, 4).values = analysis.negativeKeywords.map((row) => [row.campaign, row.negativeKeyword, row.negativeMatchType, row.reason]);
const negativesEnd = 5 + analysis.negativeKeywords.length - 1;
negatives.getRange(`A1:A${negativesEnd}`).format.columnWidth = 28;
negatives.getRange(`B1:B${negativesEnd}`).format.columnWidth = 48;
negatives.getRange(`C1:C${negativesEnd}`).format.columnWidth = 20;
negatives.getRange(`D1:D${negativesEnd}`).format.columnWidth = 52;
negatives.getRange(`D5:D${negativesEnd}`).format.wrapText = true;
negatives.freezePanes.freezeRows(4);
addTable(negatives, "DeviceCampaignNegatives", `A4:D${negativesEnd}`);
console.log("stage:negatives-written");

// Summary dashboard.
writeTitle(summary, "A1:Q1", "N-TET 设备采购意向词与独立预算方案", "A2:Q2", "Google Ads 7天数据：2026-07-08 至 2026-07-14。决策：是否将设备采购词独立建活动，并评估每天50点击的可行性。Source Keywords页仅保留有7天活动的207行；零活动行仍保留在原始文件。 ");
makeCard(summary, "A4:B4", "A5:B5", "A6:B6", "账户7天点击", `=SUM('Source Keywords'!AF2:AF${keywordSource.rows.length + 1})`, "全部关键词报告口径", "0");
makeCard(summary, "D4:E4", "D5:E5", "D6:E6", "搜索字词点击覆盖", `=SUM('Source Search Terms'!F2:F${termSource.rows.length + 1})/A5`, "仅30/51次点击披露具体搜索词", "0.0%");
makeCard(summary, "G4:H4", "G5:H5", "G6:H6", "明确非采购/非目标", `=('Intent Analysis'!D7+'Intent Analysis'!D8)/SUM('Intent Analysis'!D5:D9)`, "研究/噪音+竞品/受限；不含宽泛待验证", "0.0%");
makeCard(summary, "A8:B8", "A9:B9", "A10:B10", "设备词当前点击/日", `=SUM('Device Keyword Audit'!G5:G${auditEnd})/7`, "严格设备关键词报告口径", "0.0");
makeCard(summary, "D8:E8", "D9:E9", "D10:E10", "达到50点击所需倍数", `=50/A9`, "按当前设备词点击速度计算", "0.0x");
makeCard(summary, "G8:H8", "G9:H9", "G10:H10", "目标日预算估算", `=50*SUM('Device Keyword Audit'!H5:H${auditEnd})/SUM('Device Keyword Audit'!G5:G${auditEnd})`, "按当前设备词平均CPC；前提是有足够拍卖量", "¥#,##0");

summary.getRange("A13:H13").values = [["结论与执行建议", null, null, null, null, null, null, null]];
summary.mergeCells("A13:H13");
styleHeader(summary.getRange("A13:H13"));
summary.getRange("A14:H18").values = [[
  "1. 建议建独立Device Intent活动，但目的应是保护设备词预算和测量真实需求，不是把账户里所有设备相关词机械搬过去。",
  null, null, null, null, null, null, null,
], [
  "2. 可见搜索词中明确非采购/非目标占40.0%；加入宽泛待验证后风险占43.3%。设备采购+方案采购共56.7%。",
  null, null, null, null, null, null, null,
], [
  "3. 当前严格设备关键词只有15次点击/7天（约2.1次/日）。要达到50次/日，需要约23.3倍设备点击量、约867次设备展示/日；预算本身不能创造这些拍卖机会。",
  null, null, null, null, null, null, null,
], [
  "4. 建议起始预算¥150/日，精准约60%、词组约40%；每3天只有在设备采购搜索词占比≥80%且页面/转化正常时，才上调20%–30%。",
  null, null, null, null, null, null, null,
], [
  "5. 若目标坚持50点击/日，需要同步扩大英语国家、增加设备长尾和商业修饰词，并保持radar/detector/portable/RF页面分流；不能只靠提高现有出价。",
  null, null, null, null, null, null, null,
]];
for (let r = 14; r <= 18; r += 1) {
  summary.mergeCells(`A${r}:H${r}`);
  summary.getRange(`A${r}:H${r}`).format = { fill: r % 2 ? COLORS.pale : COLORS.white, font: { color: COLORS.dark, size: 10 }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: COLORS.border } };
  summary.getRange(`A${r}:H${r}`).format.rowHeight = 34;
}

summary.getRange("A21:H21").values = [["预算与流量校验", "当前设备词", "¥150/日起步", "50点击/日目标", "说明", null, null, null]];
summary.mergeCells("E21:H21");
styleHeader(summary.getRange("A21:H21"));
summary.getRange("A22:E25").values = [["点击/日", null, null, 50, "起步预算只是受控扩量，不保证获得理论点击数"], ["展示/日", null, null, null, "按当前设备词CTR 5.77%推算"], ["预算/日", null, 150, null, "按当前设备词平均CPC约¥9.45推算"], ["相对当前倍数", 1, null, null, "50点击/日需要约23.3倍设备流量"]];
summary.getRange("B22").formulas = [[`=SUM('Device Keyword Audit'!G5:G${auditEnd})/7`]];
summary.getRange("C22").formulas = [[`=C24/(SUM('Device Keyword Audit'!H5:H${auditEnd})/SUM('Device Keyword Audit'!G5:G${auditEnd}))`]];
summary.getRange("B23").formulas = [[`=SUM('Device Keyword Audit'!F5:F${auditEnd})/7`]];
summary.getRange("D23").formulas = [[`=D22/(SUM('Device Keyword Audit'!G5:G${auditEnd})/SUM('Device Keyword Audit'!F5:F${auditEnd}))`]];
summary.getRange("B24").formulas = [[`=SUM('Device Keyword Audit'!H5:H${auditEnd})/7`]];
summary.getRange("D24").formulas = [[`=D22*(SUM('Device Keyword Audit'!H5:H${auditEnd})/SUM('Device Keyword Audit'!G5:G${auditEnd}))`]];
summary.getRange("C25").formulas = [[`=C22/B22`]];
summary.getRange("D25").formulas = [[`=D22/B22`]];
summary.getRange("B22:D23").format.numberFormat = "0.0";
summary.getRange("B24:D24").format.numberFormat = "¥#,##0";
summary.getRange("B25:D25").format.numberFormat = "0.0x";
summary.getRange("A22:E25").format.borders = { preset: "all", style: "thin", color: COLORS.border };
summary.getRange("E22:E25").format.wrapText = true;

summary.getRange("J21:K21").values = [["意向分类", "点击"]];
summary.getRange("J22:J26").formulas = categories.map((_, i) => [`='Intent Analysis'!A${5 + i}`]);
summary.getRange("K22:K26").formulas = categories.map((_, i) => [`='Intent Analysis'!D${5 + i}`]);
styleHeader(summary.getRange("J21:K21"));
summary.getRange("J22:K26").format.borders = { preset: "all", style: "thin", color: COLORS.border };
summary.getRange("K22:K26").format.numberFormat = "0";

summary.getRange("A1:A31").format.columnWidth = 24;
summary.getRange("B1:B31").format.columnWidth = 13;
summary.getRange("C1:C31").format.columnWidth = 14;
summary.getRange("D1:D31").format.columnWidth = 16;
summary.getRange("E1:E31").format.columnWidth = 28;
summary.getRange("F1:H31").format.columnWidth = 14;
summary.getRange("J1:Q31").format.columnWidth = 12;
summary.freezePanes.freezeRows(2);
console.log("stage:summary-written");

// Add source notes at the bottom of Summary.
summary.getRange("A28:H31").values = [["数据与口径", null, null, null, null, null, null, null], ["来源1", "C:\\Users\\admin\\Downloads\\搜索关键字报告 (21).xlsx", "7天关键词数据；925展示、51点击、¥524.87。Source Keywords仅保留有活动行，零活动行在原文件。", null, null, null, null, null], ["来源2", "C:\\Users\\admin\\Downloads\\搜索字词报告 (9).xlsx", "7天搜索字词；仅披露489展示、30点击、¥328.09", null, null, null, null, null], ["限制", "搜索字词点击覆盖58.8%", "非采购占比只代表可见30次点击；剩余21次隐藏搜索词可能改变比例", null, null, null, null, null]];
summary.mergeCells("A28:H28");
styleHeader(summary.getRange("A28:H28"));
for (let r = 29; r <= 31; r += 1) {
  summary.mergeCells(`B${r}:C${r}`);
  summary.mergeCells(`D${r}:H${r}`);
  summary.getRange(`A${r}:H${r}`).format = { wrapText: true, borders: { preset: "outside", style: "thin", color: COLORS.border }, verticalAlignment: "center" };
  summary.getRange(`A${r}:H${r}`).format.rowHeight = 30;
}

// Consistent formats for numeric source fields.
sourceKeywords.getRange(`K2:O${keywordSource.rows.length + 1}`).format.numberFormat = "0.00";
sourceKeywords.getRange(`AF2:AJ${keywordSource.rows.length + 1}`).format.numberFormat = "0.00";
sourceTerms.getRange(`F2:K${termSource.rows.length + 1}`).format.numberFormat = "0.00";
sourceTerms.getRange(`N2:P${termSource.rows.length + 1}`).format.numberFormat = "0.00";

// Export and verify.
const inspectSummary = await wb.inspect({ kind: "table", range: "Summary!A1:H31", include: "values,formulas", tableMaxRows: 35, tableMaxCols: 8, maxChars: 16000 });
const inspectIntent = await wb.inspect({ kind: "table", range: `Intent Analysis!A4:I9`, include: "values,formulas", tableMaxRows: 10, tableMaxCols: 10, maxChars: 8000 });
const formulaErrors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan", maxChars: 10000 });
console.log("stage:inspected");

const previewSpecs = [
  ["Summary", "A1:Q31", "summary_preview.png"],
  ["Intent Analysis", `A1:N${Math.min(clickedEnd, 28)}`, "intent_preview.png"],
  ["Device Campaign", `A1:M${Math.min(campaignEnd, 28)}`, "campaign_preview.png"],
  ["Device Keyword Audit", "A1:M24", "audit_preview.png"],
  ["Negative Keywords", `A1:D${negativesEnd}`, "negative_preview.png"],
  ["Source Keywords", "A1:P18", "source_keywords_preview.png"],
  ["Source Search Terms", "A1:P18", "source_terms_preview.png"],
];
const xlsx = await SpreadsheetFile.exportXlsx(wb);
console.log("stage:exported");
await xlsx.save(outputPath);
for (const [sheetName, range, fileName] of previewSpecs) {
  console.log(`stage:render:${sheetName}`);
  const preview = await wb.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${outDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}
await fs.writeFile(`${outDir}/qa.json`, JSON.stringify({ summary: inspectSummary.ndjson, intent: inspectIntent.ndjson, errors: formulaErrors.ndjson, outputPath, sheets: previewSpecs.map(([name]) => name) }, null, 2), "utf8");
console.log(JSON.stringify({ outputPath, campaignRows: analysis.campaignRows.length, auditRows: analysis.existingCandidates.length, negativeRows: analysis.negativeKeywords.length, sourceKeywordRows: keywordSource.rows.length, sourceTermRows: termSource.rows.length, previews: previewSpecs.length }, null, 2));
