import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const payload = JSON.parse(await fs.readFile(path.join(outDir, "native_template_payload.json"), "utf8"));
const results = [];

for (const job of payload) {
  const file = path.join(outDir, job.outputName);
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  const sheet = workbook.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const expected = [job.headers, ...job.rows];
  const normalizedActual = values.map((row) => Array.from({ length: job.expectedColumns }, (_, index) => row[index] ?? null));
  const normalizedExpected = expected.map((row) => Array.from({ length: job.expectedColumns }, (_, index) => row[index] ?? null));
  const errors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    summary: `${job.outputName} error scan`,
  });
  const topRows = await workbook.inspect({
    kind: "table",
    range: `${sheet.name}!A1:K5`,
    include: "values,formulas",
    tableMaxRows: 5,
    tableMaxCols: 11,
    maxChars: 8000,
  });
  const result = {
    file: job.outputName,
    sheets: workbook.worksheets.items.length,
    sheet: sheet.name,
    rows: values.length - 1,
    columns: values[0].length,
    firstHeader: String(values[0][0] ?? ""),
    secondHeader: String(values[0][1] ?? ""),
    firstRowType: String(values[1][0] ?? ""),
    firstAction: String(values[1][1] ?? ""),
    exactValues: JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected),
    formulaErrors: errors.ndjson,
    topRows: topRows.ndjson,
  };
  if (
    result.sheets !== 1 ||
    result.sheet !== "Sheet0" ||
    result.rows !== job.expectedRows ||
    result.columns !== job.expectedColumns ||
    result.firstHeader !== "Row Type" ||
    result.secondHeader !== "Action" ||
    result.firstAction !== "Add" ||
    !result.exactValues ||
    !result.formulaErrors.includes("matched 0 entries")
  ) {
    throw new Error(`Native template verification failed: ${JSON.stringify(result, null, 2)}`);
  }
  results.push(result);
}

await fs.writeFile(path.join(outDir, "native_template_output_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results.map(({ formulaErrors, topRows, ...rest }) => rest), null, 2));
