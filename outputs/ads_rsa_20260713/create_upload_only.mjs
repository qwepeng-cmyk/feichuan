import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = "D:/fc-cuas/outputs/ads_rsa_20260713";
const inputFile = `${root}/NTET_RSA_DKI_Exact_RSATemplate_No_AdType_20260714.xlsx`;
const templateFile = "D:/fc-cuas/ads/广告上传模板/responsive_search_ad_template.xlsx";
const outputFile = `${root}/NTET_RSA_DKI_Retry_2_Errors_20260714.xlsx`;
const previewDir = `${root}/previews_retry_2_errors_20260714`;
const retryAdIds = new Set(["813725980303", "814736466466"]);

async function renderSegments(workbook, prefix, lastRow) {
  await fs.mkdir(previewDir, { recursive: true });
  const segments = [
    ["A", "P"],
    ["Q", "AF"],
    ["AG", "AV"],
    ["AW", "BC"],
  ];
  for (const [start, end] of segments) {
    const preview = await workbook.render({
      sheetName: workbook.worksheets.getItemAt(0).name,
      range: `${start}1:${end}${lastRow}`,
      scale: 1,
      format: "png",
    });
    await fs.writeFile(
      `${previewDir}/${prefix}_${start.toLowerCase()}_${end.toLowerCase()}.png`,
      new Uint8Array(await preview.arrayBuffer()),
    );
  }
}

async function validate(file, renderPrefix = null) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = workbook.worksheets.getItemAt(0);
  const used = sheet.getUsedRange().values;
  const headers = used[2].map((value) => String(value ?? ""));
  const rows = used.slice(4).filter((row) => row.some((value) => value != null && String(value).trim() !== ""));
  const adIdIndex = headers.indexOf("Ad ID");
  const rowTypeIndex = headers.indexOf("Row Type");
  const actionIndex = headers.indexOf("Action");
  const adTypeIndex = headers.indexOf("Ad type");
  const finalUrlIndex = headers.indexOf("Final URL");
  const assetIndexes = [
    ...Array.from({ length: 15 }, (_, i) => headers.indexOf(`Headline ${i + 1}`)),
    ...Array.from({ length: 4 }, (_, i) => headers.indexOf(`Description ${i + 1}`)),
  ];

  const rowIds = rows.map((row) => String(row[adIdIndex] ?? ""));
  const missingDki = [];
  const invalidRows = [];
  for (const row of rows) {
    const adId = String(row[adIdIndex] ?? "");
    for (const index of assetIndexes) {
      if (index < 0 || !/\{KeyWord:[^}]+\}/.test(String(row[index] ?? ""))) {
        missingDki.push(adId);
        break;
      }
    }
    if (
      String(row[rowTypeIndex] ?? "") !== "Ad" ||
      String(row[actionIndex] ?? "").toLowerCase() !== "edit" ||
      String(row[adTypeIndex] ?? "").trim() !== "" ||
      !String(row[finalUrlIndex] ?? "").trim()
    ) {
      invalidRows.push(adId);
    }
  }

  const formulaErrorPattern = /#REF!|#DIV\/0!|#VALUE!|#NAME\?|#N\/A/;
  const formulaErrors = used.flat().filter((value) => formulaErrorPattern.test(String(value ?? "")));
  const exactIds = rowIds.length === 2 && rowIds.every((id) => retryAdIds.has(id)) && retryAdIds.size === new Set(rowIds).size;
  if (
    workbook.worksheets.items.length !== 1 ||
    used.length !== 6 ||
    headers.length !== 55 ||
    !exactIds ||
    missingDki.length ||
    invalidRows.length ||
    formulaErrors.length
  ) {
    throw new Error(JSON.stringify({
      sheets: workbook.worksheets.items.length,
      usedRows: used.length,
      headers: headers.length,
      rowIds,
      exactIds,
      missingDki,
      invalidRows,
      formulaErrors,
    }));
  }
  if (renderPrefix) await renderSegments(workbook, renderPrefix, 6);
  const keyRange = await workbook.inspect({
    kind: "table",
    sheetId: sheet.name,
    range: "A3:BC6",
    include: "values,formulas",
    tableMaxRows: 4,
    tableMaxCols: 55,
    maxChars: 12000,
  });
  return { sheets: 1, usedRange: "A1:BC6", rows: rows.length, rowIds, missingDki: 0, invalidRows: 0, formulaErrors: 0, inspected: Boolean(keyRange.ndjson) };
}

if (process.argv[2] === "verify") {
  console.log(JSON.stringify(await validate(outputFile), null, 2));
  process.exit(0);
}

const sourceWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputFile));
const sourceSheet = sourceWorkbook.worksheets.getItemAt(0);
const sourceValues = sourceSheet.getUsedRange().values;
const sourceHeaders = sourceValues[2].map((value) => String(value ?? ""));
const sourceAdIdIndex = sourceHeaders.indexOf("Ad ID");
const sourceAdTypeIndex = sourceHeaders.indexOf("Ad type");
const sourceActionIndex = sourceHeaders.indexOf("Action");
const sourceRows = sourceValues
  .slice(4)
  .filter((row) => retryAdIds.has(String(row[sourceAdIdIndex] ?? "")));

if (sourceRows.length !== 2) {
  throw new Error(`Expected 2 retry rows, found ${sourceRows.length}`);
}
for (const row of sourceRows) {
  if (String(row[sourceActionIndex] ?? "").toLowerCase() === "edit") row[sourceAdTypeIndex] = null;
}

const outputWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(templateFile));
const outputSheet = outputWorkbook.worksheets.getItemAt(0);
outputSheet.getRangeByIndexes(4, 0, 2, 55).values = sourceRows;
outputSheet.getRangeByIndexes(4, 0, 2, 55).format.numberFormat = "@";
outputSheet.freezePanes.freezeRows(4);

const output = await SpreadsheetFile.exportXlsx(outputWorkbook);
await output.save(outputFile);
console.log(JSON.stringify(await validate(outputFile), null, 2));
