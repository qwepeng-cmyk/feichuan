import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const [job] = JSON.parse(await fs.readFile(path.join(outDir, "device_phrase_payload.json"), "utf8"));
const file = path.join(outDir, job.outputName);
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const sheet = wb.worksheets.getItemAt(0);
const values = sheet.getUsedRange(true).values;
const normalizeRows = (rows) => rows.map((row) => Array.from({ length: job.expectedColumns }, (_, index) => row[index] ?? null));
const expected = normalizeRows([job.headers, ...job.rows]);
const actual = normalizeRows(values);
const index = new Map(job.headers.map((header, i) => [header, i]));
const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "device phrase final formula error scan",
});
const topRows = await wb.inspect({
  kind: "table",
  range: `${sheet.name}!A1:R6`,
  include: "values,formulas",
  tableMaxRows: 6,
  tableMaxCols: 18,
  maxChars: 12000,
});
const campaigns = [...new Set(values.slice(1).map((row) => row[index.get("Campaign")]))];
const types = [...new Set(values.slice(1).map((row) => row[index.get("Type")]))];
const groups = [...new Set(values.slice(1).map((row) => row[index.get("Ad group")]))];
const result = {
  file: job.outputName,
  sheets: wb.worksheets.items.length,
  sheet: sheet.name,
  rows: values.length - 1,
  columns: values[0].length,
  firstHeader: values[0][0],
  secondHeader: values[0][1],
  firstDataRow: values[1].slice(0, 10),
  exactValues: JSON.stringify(actual) === JSON.stringify(expected),
  campaigns,
  types,
  groups,
  formulaErrors: errors.ndjson,
  topRows: topRows.ndjson,
};
if (
  result.sheets !== 1 ||
  result.sheet !== "Sheet0" ||
  result.rows !== job.expectedRows ||
  result.columns !== 18 ||
  result.firstHeader !== "Row Type" ||
  result.secondHeader !== "Action" ||
  !result.exactValues ||
  campaigns.length !== 3 ||
  types.length !== 1 ||
  types[0] !== "Phrase match" ||
  !result.formulaErrors.includes("matched 0 entries")
) {
  throw new Error(`Final verification failed: ${JSON.stringify(result, null, 2)}`);
}
await fs.writeFile(path.join(outDir, "device_phrase_native_qa.json"), JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify({ ...result, formulaErrors: "0", topRows: "verified" }, null, 2));
