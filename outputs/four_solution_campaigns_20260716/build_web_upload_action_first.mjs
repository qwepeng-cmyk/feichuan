import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";

const jobs = [
  {
    input: "01_Ad_Groups_UPLOAD_Formats_20260716.xlsx",
    output: "01_Ad_Groups_WEB_UPLOAD_ActionFirst_20260716.xlsx",
    expectedRows: 15,
    expectedColumns: 21,
    expectedRowType: "Ad group",
  },
  {
    input: "02_Keywords_UPLOAD_Formats_20260716.xlsx",
    output: "02_Keywords_WEB_UPLOAD_ActionFirst_20260716.xlsx",
    expectedRows: 77,
    expectedColumns: 18,
    expectedRowType: "Keyword",
  },
  {
    input: "03_RSA_DKI_UPLOAD_Formats_20260716.xlsx",
    output: "03_RSA_DKI_WEB_UPLOAD_ActionFirst_20260716.xlsx",
    expectedRows: 15,
    expectedColumns: 55,
    expectedRowType: "Ad",
  },
  {
    input: "04_Negative_Keywords_UPLOAD_Formats_20260716.xlsx",
    output: "04_Negatives_WEB_UPLOAD_ActionFirst_20260716.xlsx",
    expectedRows: 86,
    expectedColumns: 11,
    expectedRowType: "Negative keyword",
  },
];

function colName(n) {
  let result = "";
  while (n > 0) {
    n -= 1;
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result || "A";
}

const qa = [];

for (const job of jobs) {
  const inputPath = path.join(outDir, job.input);
  const outputPath = path.join(outDir, job.output);
  const source = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
  const sourceSheet = source.worksheets.getItemAt(0);
  const sourceValues = sourceSheet.getUsedRange(true).values;
  const sourceHeaders = sourceValues[0].map((value) => String(value ?? "").trim());

  const actionIndex = sourceHeaders.indexOf("Action");
  const rowTypeIndex = sourceHeaders.indexOf("Row Type");
  if (actionIndex < 0 || rowTypeIndex < 0) {
    throw new Error(`${job.input}: missing Action or Row Type header`);
  }

  const reorderedIndexes = [
    actionIndex,
    rowTypeIndex,
    ...sourceHeaders.map((_, index) => index).filter((index) => index !== actionIndex && index !== rowTypeIndex),
  ];
  const headers = reorderedIndexes.map((index) => sourceHeaders[index]);
  const rows = sourceValues.slice(1).map((row) => reorderedIndexes.map((index) => row[index] ?? null));

  if (rows.length !== job.expectedRows || headers.length !== job.expectedColumns) {
    throw new Error(`${job.input}: unexpected shape ${rows.length} x ${headers.length}`);
  }

  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add("Sheet0");
  sheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
  sheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
  await (await SpreadsheetFile.exportXlsx(workbook)).save(outputPath);

  const verify = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
  const verifySheet = verify.worksheets.getItemAt(0);
  const verifyValues = verifySheet.getUsedRange(true).values;
  const verifyHeaders = verifyValues[0].map((value) => String(value ?? ""));
  const formulaErrors = await verify.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    summary: `${job.output} formula error scan`,
  });
  const firstRows = await verify.inspect({
    kind: "table",
    range: `${verifySheet.name}!A1:${colName(Math.min(headers.length, 15))}5`,
    include: "values,formulas",
    tableMaxRows: 5,
    tableMaxCols: 15,
    maxChars: 10000,
  });
  const result = {
    input: job.input,
    output: job.output,
    sourceFirstHeader: sourceHeaders[0],
    sourceActionColumn: actionIndex + 1,
    sourceRowTypeColumn: rowTypeIndex + 1,
    sheets: verify.worksheets.items.length,
    sheetName: verifySheet.name,
    rows: verifyValues.length - 1,
    columns: verifyHeaders.length,
    firstHeader: verifyHeaders[0],
    secondHeader: verifyHeaders[1],
    firstAction: String(verifyValues[1][0] ?? ""),
    firstRowType: String(verifyValues[1][1] ?? ""),
    exactDataPreserved: JSON.stringify(rows) === JSON.stringify(verifyValues.slice(1)),
    formulaErrors: formulaErrors.ndjson,
    firstRows: firstRows.ndjson,
  };

  if (
    result.sheets !== 1 ||
    result.sheetName !== "Sheet0" ||
    result.rows !== job.expectedRows ||
    result.columns !== job.expectedColumns ||
    result.firstHeader !== "Action" ||
    result.secondHeader !== "Row Type" ||
    !["Add", "Edit", "Remove"].includes(result.firstAction) ||
    result.firstRowType !== job.expectedRowType ||
    !result.exactDataPreserved ||
    !result.formulaErrors.includes("matched 0 entries")
  ) {
    throw new Error(`Verification failed for ${job.output}: ${JSON.stringify(result, null, 2)}`);
  }

  qa.push(result);
}

await fs.writeFile(path.join(outDir, "web_upload_action_first_20260716_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify(qa.map(({ firstRows, formulaErrors, ...rest }) => rest), null, 2));
