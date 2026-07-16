import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const [job] = JSON.parse(await fs.readFile(path.join(outDir, "device_phrase_pause_payload.json"), "utf8"));
const file = path.join(outDir, job.outputName);
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const sheet = wb.worksheets.getItemAt(0);
const values = sheet.getUsedRange(true).values;
const normalizeRows = (rows) => rows.map((row) => Array.from({ length: job.expectedColumns }, (_, i) => row[i] ?? null));
const expected = normalizeRows([job.headers, ...job.rows]);
const actual = normalizeRows(values);
const index = new Map(job.headers.map((header, i) => [header, i]));
const data = values.slice(1);
const countsByCampaign = {};
for (const row of data) {
  const campaign = row[index.get("Campaign")];
  countsByCampaign[campaign] = (countsByCampaign[campaign] ?? 0) + 1;
}
const result = {
  file: job.outputName,
  sheets: wb.worksheets.items.length,
  sheet: sheet.name,
  rows: data.length,
  columns: values[0].length,
  firstHeader: values[0][0],
  secondHeader: values[0][1],
  exactValues: JSON.stringify(actual) === JSON.stringify(expected),
  countsByCampaign,
  campaigns: [...new Set(data.map((row) => row[index.get("Campaign")]))],
  groups: [...new Set(data.map((row) => row[index.get("Ad group")]))].sort(),
  actions: [...new Set(data.map((row) => row[index.get("Action")]))],
  statuses: [...new Set(data.map((row) => row[index.get("Keyword status")]))],
  types: [...new Set(data.map((row) => row[index.get("Type")]))],
};
if (
  result.sheets !== 1 || result.sheet !== "Sheet0" || result.rows !== 148 || result.columns !== 18 ||
  result.firstHeader !== "Row Type" || result.secondHeader !== "Action" || !result.exactValues ||
  result.campaigns.length !== 2 || result.campaigns.includes("C-UAS 英语 短语") ||
  result.countsByCampaign["C-UAS 中东 短语"] !== 74 || result.countsByCampaign["C-UAS 南美 短语"] !== 74 ||
  result.groups.join("|") !== "Anti Drone Equipment|Drone Detector Equipment" ||
  result.actions.join("|") !== "Edit" || result.statuses.join("|") !== "Paused" || result.types.join("|") !== "Phrase match"
) throw new Error(`Final verification failed: ${JSON.stringify(result, null, 2)}`);
await fs.writeFile(path.join(outDir, "device_phrase_pause_native_qa.json"), JSON.stringify(result, null, 2), "utf8");
console.log(JSON.stringify(result, null, 2));
