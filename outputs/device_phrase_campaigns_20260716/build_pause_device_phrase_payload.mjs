import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/device_phrase_campaigns_20260716";
const sourcePath = path.join(outDir, "C-UAS_3_Campaigns_Device_Phrase_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx");
const outputName = "C-UAS_MiddleEast_SouthAmerica_Device_Phrase_PAUSE_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx";
const stagingPath = path.join(outDir, "device_phrase_pause_staging_artifact.xlsx");
const payloadPath = path.join(outDir, "device_phrase_pause_payload.json");
const targetCampaigns = ["C-UAS 中东 短语", "C-UAS 南美 短语"];

console.error("checkpoint: importing source");
const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
console.error("checkpoint: source imported");
const sourceSheet = sourceWb.worksheets.getItemAt(0);
const used = sourceSheet.getUsedRange(true);
const sourceValues = used.values;
if (!sourceValues.length) throw new Error("Source workbook is empty");

const sourceOverview = await sourceWb.inspect({
  kind: "workbook,sheet,table,computedStyle",
  sheetId: sourceSheet.name,
  range: "A1:R6",
  maxChars: 12000,
  tableMaxRows: 6,
  tableMaxCols: 18,
});
console.error("checkpoint: source inspected");

const headers = sourceValues[0].map((value) => String(value ?? ""));
const index = new Map(headers.map((header, i) => [header, i]));
const required = ["Row Type", "Action", "Keyword status", "Campaign", "Ad group", "Keyword", "Type"];
const missing = required.filter((header) => !index.has(header));
if (missing.length) throw new Error(`Missing headers: ${missing.join(", ")}`);
if (headers.length !== 18 || headers[0] !== "Row Type" || headers[1] !== "Action") {
  throw new Error(`Unexpected template header structure: ${JSON.stringify(headers)}`);
}
console.error(`checkpoint: source campaigns ${JSON.stringify([...new Set(sourceValues.slice(1).map((row) => row[index.get("Campaign")]))])}`);

const sourceDeviceRows = [...new Map(
  sourceValues.slice(1).map((row) => {
    const key = [row[index.get("Ad group")], row[index.get("Keyword")], row[index.get("Type")]].join("\u0000");
    return [key, row];
  }),
).values()];
if (sourceDeviceRows.length !== 74) {
  throw new Error(`Expected 74 unique source device keywords, found ${sourceDeviceRows.length}`);
}
const rows = targetCampaigns.flatMap((campaign) =>
  sourceDeviceRows.map((sourceRow) => {
    const row = Array.from({ length: headers.length }, (_, i) => sourceRow[i] ?? null);
    row[index.get("Action")] = "Edit";
    row[index.get("Keyword status")] = "Paused";
    row[index.get("Campaign")] = campaign;
    return row;
  }),
);
console.error(`checkpoint: filtered ${rows.length} rows`);

const countsByCampaign = Object.fromEntries(
  targetCampaigns.map((campaign) => [
    campaign,
    rows.filter((row) => row[index.get("Campaign")] === campaign).length,
  ]),
);
const expectedPerCampaign = 74;
if (rows.length !== expectedPerCampaign * targetCampaigns.length) {
  throw new Error(`Expected 148 rows, found ${rows.length}: ${JSON.stringify(countsByCampaign)}`);
}
for (const campaign of targetCampaigns) {
  if (countsByCampaign[campaign] !== expectedPerCampaign) {
    throw new Error(`Expected ${expectedPerCampaign} rows for ${campaign}, found ${countsByCampaign[campaign]}`);
  }
}

const campaigns = [...new Set(rows.map((row) => row[index.get("Campaign")]))];
const groups = [...new Set(rows.map((row) => row[index.get("Ad group")]))].sort();
const actions = [...new Set(rows.map((row) => row[index.get("Action")]))];
const statuses = [...new Set(rows.map((row) => row[index.get("Keyword status")]))];
const types = [...new Set(rows.map((row) => row[index.get("Type")]))];
const uniqueKeys = new Set(
  rows.map((row) => [row[index.get("Campaign")], row[index.get("Ad group")], row[index.get("Keyword")], row[index.get("Type")]].join("\u0000")),
);
if (uniqueKeys.size !== rows.length) throw new Error("Duplicate campaign/ad group/keyword/type rows found");
if (actions.length !== 1 || actions[0] !== "Edit") throw new Error(`Invalid actions: ${actions}`);
if (statuses.length !== 1 || statuses[0] !== "Paused") throw new Error(`Invalid statuses: ${statuses}`);
if (types.length !== 1 || types[0] !== "Phrase match") throw new Error(`Invalid match types: ${types}`);
if (groups.join("|") !== "Anti Drone Equipment|Drone Detector Equipment") {
  throw new Error(`Unexpected ad groups: ${groups.join(", ")}`);
}

const stagingWb = Workbook.create();
const stagingSheet = stagingWb.worksheets.add("Sheet0");
stagingSheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
stagingSheet.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
await (await SpreadsheetFile.exportXlsx(stagingWb)).save(stagingPath);
console.error("checkpoint: staging exported");

const verifyWb = await SpreadsheetFile.importXlsx(await FileBlob.load(stagingPath));
const verifySheet = verifyWb.worksheets.getItemAt(0);
const verifyValues = verifySheet.getUsedRange(true).values;
const tableCheck = await verifyWb.inspect({
  kind: "table",
  range: "Sheet0!A1:R8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 18,
  maxChars: 16000,
});
const errors = await verifyWb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "pause upload formula error scan",
});
if (verifyValues.length !== rows.length + 1 || verifyValues[0][0] !== "Row Type" || verifyValues[0][1] !== "Action") {
  throw new Error("Artifact staging verification failed");
}
const payload = [{
  templateName: "keyword_template.xlsx",
  outputName,
  expectedRows: rows.length,
  expectedColumns: headers.length,
  headers,
  rows,
}];
await fs.writeFile(payloadPath, JSON.stringify(payload), "utf8");

const summary = {
  sourcePath,
  outputName,
  sourceRows: sourceValues.length - 1,
  outputRows: rows.length,
  countsByCampaign,
  campaigns,
  groups,
  actions,
  statuses,
  types,
  sourceOverview: sourceOverview.ndjson,
  tableCheck: tableCheck.ndjson,
  formulaErrors: errors.ndjson,
};
await fs.writeFile(path.join(outDir, "device_phrase_pause_summary.json"), JSON.stringify(summary, null, 2), "utf8");
console.log(JSON.stringify({ ...summary, sourceOverview: "verified", tableCheck: "verified", formulaErrors: errors.ndjson }, null, 2));
