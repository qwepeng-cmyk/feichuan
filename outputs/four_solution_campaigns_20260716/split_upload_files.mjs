import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const sourcePath = path.join(outDir, "N-TET_4_MiddleEast_Exact_Campaign_Upload_Formats_20260716.xlsx");
const source = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));

const jobs = [
  ["01 Ad Groups", "01_Ad_Groups_UPLOAD_Formats_20260716.xlsx", 21],
  ["02 Keywords", "02_Keywords_UPLOAD_Formats_20260716.xlsx", 18],
  ["03 RSA", "03_RSA_DKI_UPLOAD_Formats_20260716.xlsx", 55],
  ["04 Negatives", "04_Negative_Keywords_UPLOAD_Formats_20260716.xlsx", 11],
];

const COLORS = { blue: "#315BA4", white: "#FFFFFF", border: "#D0D5DD" };

function colName(n) {
  let result = "";
  while (n > 0) {
    n -= 1;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result || "A";
}

function styleSheet(sheet, headers, rowCount) {
  const last = colName(headers.length);
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  sheet.getRange(`A1:${last}1`).format = {
    fill: COLORS.blue,
    font: { bold: true, color: COLORS.white, size: 10 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: COLORS.blue },
  };
  sheet.getRange(`A1:${last}1`).format.rowHeight = 30;
  if (rowCount) {
    sheet.getRange(`A2:${last}${rowCount + 1}`).format = {
      font: { size: 9 },
      verticalAlignment: "center",
      borders: { insideHorizontal: { style: "thin", color: COLORS.border } },
    };
  }
  headers.forEach((header, index) => {
    const column = colName(index + 1);
    let width = 16;
    if (header === "Campaign") width = 32;
    if (header === "Ad group") width = 30;
    if (["Keyword", "Negative keyword"].includes(header)) width = 36;
    if (["Final URL", "Mobile final URL"].includes(header)) width = 52;
    if (/^Headline \d+$/.test(header)) width = 26;
    if (/^Description \d+$/.test(header)) width = 52;
    sheet.getRange(`${column}1:${column}${rowCount + 1}`).format.columnWidth = width;
  });
}

const results = [];
for (const [sourceSheetName, fileName, expectedColumns] of jobs) {
  const values = source.worksheets.getItem(sourceSheetName).getUsedRange(true).values;
  const headers = values[0];
  const rows = values.slice(1);
  if (headers.length !== expectedColumns) throw new Error(`${sourceSheetName}: expected ${expectedColumns} columns, got ${headers.length}`);

  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add("Sheet0");
  sheet.getRangeByIndexes(0, 0, values.length, headers.length).values = values;
  styleSheet(sheet, headers, rows.length);
  const outputPath = path.join(outDir, fileName);
  await (await SpreadsheetFile.exportXlsx(workbook)).save(outputPath);

  const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
  const verifyValues = verify.worksheets.getItem("Sheet0").getUsedRange(true).values;
  const errors = await verify.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 50 },
    summary: `${fileName} error scan`,
  });
  const result = {
    fileName,
    outputPath,
    sheet: "Sheet0",
    headersExact: JSON.stringify(verifyValues[0]) === JSON.stringify(headers),
    firstRowIsHeader: verifyValues[0][0] === headers[0],
    secondRowIsData: verifyValues[1][0] !== null,
    rows: verifyValues.length - 1,
    columns: verifyValues[0].length,
    formulaErrors: errors.ndjson,
  };
  if (!result.headersExact || !result.firstRowIsHeader || !result.secondRowIsData || result.rows !== rows.length || result.columns !== expectedColumns) {
    throw new Error(`Verification failed: ${JSON.stringify(result, null, 2)}`);
  }
  results.push(result);
}

await fs.writeFile(path.join(outDir, "split_upload_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results, null, 2));
