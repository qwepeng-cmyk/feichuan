import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const [job] = JSON.parse(await fs.readFile(path.join(outDir, "device_phrase_rsa_payload.json"), "utf8"));
const index = new Map(job.headers.map((header, i) => [header, i]));
const file = path.join(outDir, job.outputName);
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const sheet = wb.worksheets.getItemAt(0);
const values = sheet.getUsedRange(true).values;
const normalize = (rows) => rows.map((row) => Array.from({ length: 55 }, (_, i) => row[i] ?? null));
const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "device phrase RSA final error scan",
});
const topRows = await wb.inspect({
  kind: "table",
  range: `${sheet.name}!A1:BC4`,
  include: "values,formulas",
  tableMaxRows: 4,
  tableMaxCols: 55,
  maxChars: 20000,
});
const data = values.slice(1);
const allHeadlineDki = data.every((row) => Array.from({ length: 15 }, (_, i) => row[index.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value))));
const allDescriptionDki = data.every((row) => Array.from({ length: 4 }, (_, i) => row[index.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value))));
const result = {
  file: job.outputName,
  sheets: wb.worksheets.items.length,
  sheet: sheet.name,
  rows: data.length,
  columns: values[0].length,
  firstHeader: values[0][0],
  secondHeader: values[0][1],
  firstRowType: values[1][0],
  firstAction: values[1][1],
  exactValues: JSON.stringify(normalize(values)) === JSON.stringify(normalize([job.headers, ...job.rows])),
  campaigns: [...new Set(data.map((row) => row[index.get("Campaign")]))],
  adGroups: [...new Set(data.map((row) => row[index.get("Ad group")]))],
  allHeadlineDki,
  allDescriptionDki,
  formulaErrors: errors.ndjson,
  topRows: topRows.ndjson,
};
if (
  result.sheets !== 1 || result.sheet !== "Sheet0" || result.rows !== 6 || result.columns !== 55 ||
  result.firstHeader !== "Row Type" || result.secondHeader !== "Action" || result.firstRowType !== "Ad" ||
  result.firstAction !== "Add" || !result.exactValues || result.campaigns.length !== 3 || result.adGroups.length !== 2 ||
  !allHeadlineDki || !allDescriptionDki || !result.formulaErrors.includes("matched 0 entries")
) throw new Error(`RSA verification failed: ${JSON.stringify(result, null, 2)}`);

await fs.writeFile(path.join(outDir, "device_phrase_rsa_native_qa.json"), JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify({ ...result, formulaErrors: "0", topRows: "verified" }, null, 2));
