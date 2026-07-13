import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const inputFile = `${root}/N-TET_RSA_DKI_Ads_20260713.xlsx`;
const outputFile = `${root}/N-TET_RSA_DKI_仅上传_保留原网址_20260713.xlsx`;

const sourceWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputFile));
const sourceSheet = sourceWorkbook.worksheets.getItem("Sheet0");
const sourceHeaders = sourceSheet.getRange("A3:BC3").values[0].map(String);
const sourceRows = sourceSheet.getRange("A5:BC86").values;

const adReport = await SpreadsheetFile.importXlsx(await FileBlob.load(`${root}/ads.xlsx`));
const adSheet = adReport.worksheets.getItemAt(0);
const adValues = adSheet.getUsedRange().values;
const adHeaders = adValues[2].map((value, index) => String(value ?? `Column_${index + 1}`));
const adIdIndex = adHeaders.indexOf("广告 ID");
const adUrlIndex = adHeaders.indexOf("最终到达网址");
const originalUrls = new Map();
for (const row of adValues.slice(3)) {
  const adId = row[adIdIndex];
  const url = row[adUrlIndex];
  if (adId && adId !== "--" && url && url !== "--") originalUrls.set(String(adId), String(url));
}

const uploadAdIdIndex = sourceHeaders.indexOf("Ad ID");
const uploadFinalUrlIndex = sourceHeaders.indexOf("Final URL");
let restoredUrls = 0;
for (const row of sourceRows) {
  const adId = String(row[uploadAdIdIndex] ?? "");
  const originalUrl = originalUrls.get(adId);
  if (originalUrl && row[uploadFinalUrlIndex] !== originalUrl) {
    row[uploadFinalUrlIndex] = originalUrl;
    restoredUrls += 1;
  }
}

const outputWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(`${root}/template.xlsx`));
const outputSheet = outputWorkbook.worksheets.getItemAt(0);
outputSheet.getRangeByIndexes(4, 0, sourceRows.length, sourceHeaders.length).values = sourceRows;
outputSheet.getRangeByIndexes(4, 0, sourceRows.length, sourceHeaders.length).format.numberFormat = "@";
outputSheet.freezePanes.freezeRows(4);

const output = await SpreadsheetFile.exportXlsx(outputWorkbook);
await output.save(outputFile);

const verifyWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputFile));
const sheetInfo = await verifyWorkbook.inspect({ kind: "sheet", include: "id,name", maxChars: 4000 });
const verifySheet = verifyWorkbook.worksheets.getItemAt(0);
const verifyHeaders = verifySheet.getRange("A3:BC3").values[0].map(String);
const verifyRows = verifySheet.getRange("A5:BC86").values;
const verifyAdIdIndex = verifyHeaders.indexOf("Ad ID");
const verifyFinalUrlIndex = verifyHeaders.indexOf("Final URL");
const assetIndexes = [
  ...Array.from({ length: 15 }, (_, i) => verifyHeaders.indexOf(`Headline ${i + 1}`)),
  ...Array.from({ length: 4 }, (_, i) => verifyHeaders.indexOf(`Description ${i + 1}`)),
];
let missingDki = 0;
let urlMismatches = 0;
for (const row of verifyRows) {
  for (const index of assetIndexes) {
    if (!/\{KeyWord:[^}]+\}/.test(String(row[index] ?? ""))) missingDki += 1;
  }
  const originalUrl = originalUrls.get(String(row[verifyAdIdIndex] ?? ""));
  if (originalUrl && row[verifyFinalUrlIndex] !== originalUrl) urlMismatches += 1;
}
const errors = await verifyWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "upload-only formula error scan",
});
if (verifyWorkbook.worksheets.items.length !== 1 || missingDki || urlMismatches) {
  throw new Error(JSON.stringify({ sheets: verifyWorkbook.worksheets.items.length, missingDki, urlMismatches }));
}
console.log(JSON.stringify({
  outputFile,
  uploadRows: sourceRows.length,
  restoredUrls,
  sheets: verifyWorkbook.worksheets.items.length,
  missingDki,
  urlMismatches,
  sheetInfo: sheetInfo.ndjson,
  formulaErrors: errors.ndjson,
}));
