import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const sourceReportFile = `${root}/ads.xlsx`;
const rewrittenFile = `${root}/N-TET_RSA_DKI_Ads_20260713.xlsx`;
const outputFile = `${root}/NTET_RSA_DKI_WebUpload_Action_FirstRow_20260713.xlsx`;

const reportWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourceReportFile));
const reportSheet = reportWorkbook.worksheets.getItemAt(0);
const reportUsed = reportSheet.getUsedRange().values;
const reportHeaders = reportUsed[2].map((value, index) => String(value ?? `Column_${index + 1}`));
const reportIndex = new Map(reportHeaders.map((header, index) => [header, index]));

const rewrittenWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(rewrittenFile));
const rewrittenSheet = rewrittenWorkbook.worksheets.getItem("Sheet0");
const rewrittenHeaders = rewrittenSheet.getRange("A3:BC3").values[0].map(String);
const rewrittenIndex = new Map(rewrittenHeaders.map((header, index) => [header, index]));
const rewrittenRows = rewrittenSheet.getRange("A5:BC86").values;

const requiredReportHeaders = [
  "广告状态", "最终到达网址", "标题 1", "广告内容描述第 1 行",
  "广告系列", "广告组", "广告类型", "广告系列 ID", "广告 ID", "广告组 ID",
];
const missingReportHeaders = requiredReportHeaders.filter((header) => !reportIndex.has(header));
if (missingReportHeaders.length) throw new Error(`源广告报告缺少字段: ${missingReportHeaders.join(", ")}`);

const requiredRewrittenHeaders = [
  "Campaign ID", "Campaign", "Ad group ID", "Ad group", "Ad ID", "Ad type",
  "Headline 1", "Headline 15", "Description 1", "Description 4", "Final URL",
];
const missingRewrittenHeaders = requiredRewrittenHeaders.filter((header) => !rewrittenIndex.has(header));
if (missingRewrittenHeaders.length) throw new Error(`改写文件缺少字段: ${missingRewrittenHeaders.join(", ")}`);

const reportAdIdIndex = reportIndex.get("广告 ID");
const originalByAdId = new Map();
for (const row of reportUsed.slice(3)) {
  const adId = String(row[reportAdIdIndex] ?? "").trim();
  if (adId && adId !== "--") originalByAdId.set(adId, row.slice());
}

const headlineReportHeaders = [
  "标题 1", "标题 2", "标题 3", "第 4 个标题", "标题 5", "标题 6", "标题 7",
  "标题 8", "标题 9", "标题 10", "标题 11", "标题 12", "标题 13", "标题 14", "标题 15",
];
const headlinePositionReportHeaders = [
  "标题 1 的位置", "标题 2 的位置", "标题 3 的位置", "标题 4 的位置", "标题 5 的位置",
  "标题 6 的位置", "标题 7 的位置", "标题 8 的位置", "标题 9 的位置", "标题 10 的位置",
  "标题 11 的位置", "标题 12 的位置", "标题 13 的位置", "标题 14 的位置", "标题 15 的位置",
];
const descriptionReportHeaders = [
  "广告内容描述第 1 行", "广告内容描述第 2 行", "广告内容描述第 3 行", "广告内容描述 4",
];
const descriptionPositionReportHeaders = [
  "广告内容描述第 1 行的位置", "广告内容描述第 2 行的位置", "广告内容描述 3 的位置", "广告内容描述 4 的位置",
];

function copyValue(target, targetHeader, source, sourceHeader, blankAsDash = false) {
  const targetColumn = reportIndex.get(targetHeader);
  const sourceColumn = rewrittenIndex.get(sourceHeader);
  if (targetColumn == null || sourceColumn == null) return;
  const value = source[sourceColumn];
  target[targetColumn] = blankAsDash && (value == null || value === "") ? "--" : value;
}

const outputRows = [];
let missingOriginal = 0;
let urlMismatches = 0;
let missingDki = 0;
let longHeadlines = 0;
let longDescriptions = 0;

function renderedDkiLength(value) {
  return String(value ?? "").replace(/\{KeyWord:([^}]+)\}/g, "$1").length;
}

for (const rewrittenRow of rewrittenRows) {
  const adId = String(rewrittenRow[rewrittenIndex.get("Ad ID")] ?? "").trim();
  const original = originalByAdId.get(adId);
  if (!original) {
    missingOriginal += 1;
    continue;
  }
  const target = original.slice();

  copyValue(target, "广告系列", rewrittenRow, "Campaign");
  copyValue(target, "广告组", rewrittenRow, "Ad group");
  copyValue(target, "广告系列 ID", rewrittenRow, "Campaign ID");
  copyValue(target, "广告组 ID", rewrittenRow, "Ad group ID");
  copyValue(target, "广告 ID", rewrittenRow, "Ad ID");
  copyValue(target, "路径 1", rewrittenRow, "Path 1", true);
  copyValue(target, "路径 2", rewrittenRow, "Path 2", true);
  copyValue(target, "跟踪模板", rewrittenRow, "Tracking template", true);
  copyValue(target, "最终到达网址后缀", rewrittenRow, "Final URL suffix", true);
  copyValue(target, "自定义参数", rewrittenRow, "Custom parameter");
  copyValue(target, "最终到达移动网址", rewrittenRow, "Mobile final URL");
  target[reportIndex.get("广告类型")] = "自适应搜索广告";

  for (let index = 0; index < 15; index += 1) {
    copyValue(target, headlineReportHeaders[index], rewrittenRow, `Headline ${index + 1}`);
    copyValue(target, headlinePositionReportHeaders[index], rewrittenRow, `Headline ${index + 1} position`, true);
    const headline = String(target[reportIndex.get(headlineReportHeaders[index])] ?? "");
    if (!/\{KeyWord:[^}]+\}/.test(headline)) missingDki += 1;
    if (renderedDkiLength(headline) > 30) longHeadlines += 1;
  }
  for (let index = 0; index < 4; index += 1) {
    copyValue(target, descriptionReportHeaders[index], rewrittenRow, `Description ${index + 1}`);
    copyValue(target, descriptionPositionReportHeaders[index], rewrittenRow, `Description ${index + 1} position`, true);
    const description = String(target[reportIndex.get(descriptionReportHeaders[index])] ?? "");
    if (!/\{KeyWord:[^}]+\}/.test(description)) missingDki += 1;
    if (renderedDkiLength(description) > 90) longDescriptions += 1;
  }

  const originalUrl = String(original[reportIndex.get("最终到达网址")] ?? "");
  const rewrittenUrl = String(rewrittenRow[rewrittenIndex.get("Final URL")] ?? "");
  target[reportIndex.get("最终到达网址")] = originalUrl;
  if (rewrittenUrl && originalUrl !== rewrittenUrl) urlMismatches += 1;

  outputRows.push(target);
}

if (missingOriginal || missingDki || longHeadlines || longDescriptions) {
  throw new Error(JSON.stringify({ missingOriginal, missingDki, longHeadlines, longDescriptions }));
}

// 网页批量上传：第 1 行必须直接是字段名，并明确指定 Action=Edit。
// 仅保留修改 RSA 必需的可编辑字段和定位字段，排除展示次数、费用、广告效力等只读报告列。
const selectedReportHeaders = [
  "广告状态",
  "最终到达网址",
  ...headlineReportHeaders.flatMap((header, index) => [header, headlinePositionReportHeaders[index]]),
  ...descriptionReportHeaders.flatMap((header, index) => [header, descriptionPositionReportHeaders[index]]),
  "路径 1",
  "路径 2",
  "跟踪模板",
  "最终到达网址后缀",
  "自定义参数",
  "广告系列",
  "广告组",
  "广告类型",
  "广告系列 ID",
  "广告 ID",
  "广告组 ID",
  "最终到达移动网址",
];
const uploadHeaders = ["Action", ...selectedReportHeaders];
const uploadRows = outputRows.map((row) => [
  "Edit",
  ...selectedReportHeaders.map((header) => row[reportIndex.get(header)] ?? null),
]);

const uploadWorkbook = Workbook.create();
const uploadSheet = uploadWorkbook.worksheets.add("Ads");
uploadSheet.getRangeByIndexes(0, 0, 1, uploadHeaders.length).values = [uploadHeaders];
uploadSheet.getRangeByIndexes(1, 0, uploadRows.length, uploadHeaders.length).values = uploadRows;

const output = await SpreadsheetFile.exportXlsx(uploadWorkbook);
await output.save(outputFile);

const verifyWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputFile));
const verifySheet = verifyWorkbook.worksheets.getItemAt(0);
const verifyUsed = verifySheet.getUsedRange().values;
const verifyHeaders = verifyUsed[0].map((value) => String(value ?? ""));
const formulaErrors = await verifyWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "Google Ads 网页上传文件公式错误扫描",
});
const keyRange = await verifyWorkbook.inspect({
  kind: "table",
  range: `${verifySheet.name}!A1:AZ6`,
  include: "values,formulas",
  tableMaxRows: 6,
  tableMaxCols: 52,
  maxChars: 12000,
});

if (
  verifyWorkbook.worksheets.items.length !== 1 ||
  verifyHeaders[0] !== "Action" ||
  verifyHeaders[1] !== "广告状态" ||
  verifyUsed[1][0] !== "Edit" ||
  verifyUsed.length !== 83
) {
  throw new Error("导出后的 Google Ads 首行字段或 Action=Edit 验证失败");
}

console.log(JSON.stringify({
  outputFile,
  rows: outputRows.length,
  sheets: verifyWorkbook.worksheets.items.length,
  firstHeader: verifyHeaders[0],
  secondHeader: verifyHeaders[1],
  firstAction: verifyUsed[1][0],
  campaignIdHeader: verifyHeaders.includes("广告系列 ID"),
  adIdHeader: verifyHeaders.includes("广告 ID"),
  missingOriginal,
  missingDki,
  longHeadlines,
  longDescriptions,
  preservedOriginalUrls: outputRows.length,
  rewrittenUrlDifferencesIgnored: urlMismatches,
  formulaErrors: formulaErrors.ndjson,
  keyRange: keyRange.ndjson,
}, null, 2));
