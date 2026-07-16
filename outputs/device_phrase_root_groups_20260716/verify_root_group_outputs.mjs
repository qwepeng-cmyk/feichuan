import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_root_groups_20260716";
const jobs = JSON.parse(await fs.readFile(path.join(outDir, "root_group_payloads.json"), "utf8"));
const results = [];

for (const job of jobs) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, job.outputName)));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const normalized = (rows) => rows.map((row) => Array.from({ length: job.expectedColumns }, (_, i) => row[i] ?? null));
  const index = new Map(job.headers.map((header, i) => [header, i]));
  const errors = await wb.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    summary: `${job.outputName} error scan`,
  });
  const topRows = await wb.inspect({
    kind: "table",
    range: `${sheet.name}!A1:${job.expectedColumns === 55 ? "BC" : job.expectedColumns === 21 ? "U" : "R"}4`,
    include: "values,formulas",
    tableMaxRows: 4,
    tableMaxCols: job.expectedColumns,
    maxChars: 16000,
  });
  const data = values.slice(1);
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
    exactValues: JSON.stringify(normalized(values)) === JSON.stringify(normalized([job.headers, ...job.rows])),
    campaigns: [...new Set(data.map((row) => row[index.get("Campaign")]))],
    adGroups: [...new Set(data.map((row) => row[index.get("Ad group")]))],
    formulaErrors: errors.ndjson,
    topRows: topRows.ndjson,
  };
  if (job.outputName.startsWith("02_")) {
    result.keywordTypes = [...new Set(data.map((row) => row[index.get("Type")]))];
  }
  if (job.outputName.startsWith("03_")) {
    result.allHeadlineDki = data.every((row) => Array.from({ length: 15 }, (_, i) => row[index.get(`Headline ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value))));
    result.allDescriptionDki = data.every((row) => Array.from({ length: 4 }, (_, i) => row[index.get(`Description ${i + 1}`)]).every((value) => /\{KeyWord:[^}]+\}/.test(String(value))));
  }
  if (
    result.sheets !== 1 || result.sheet !== "Sheet0" || result.rows !== job.expectedRows || result.columns !== job.expectedColumns ||
    result.firstHeader !== "Row Type" || result.secondHeader !== "Action" || result.firstAction !== "Add" || !result.exactValues ||
    result.campaigns.length !== 3 || result.adGroups.length !== 14 || !result.formulaErrors.includes("matched 0 entries") ||
    (result.keywordTypes && (result.keywordTypes.length !== 1 || result.keywordTypes[0] !== "Phrase match")) ||
    (job.outputName.startsWith("03_") && (!result.allHeadlineDki || !result.allDescriptionDki))
  ) throw new Error(`Verification failed: ${JSON.stringify(result, null, 2)}`);
  results.push(result);
}

await fs.writeFile(path.join(outDir, "root_group_outputs_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results.map(({ formulaErrors, topRows, ...result }) => ({ ...result, formulaErrors: 0, topRows: "verified" })), null, 2));
