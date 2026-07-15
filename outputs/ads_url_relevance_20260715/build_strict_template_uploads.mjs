import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = String.raw`D:\fc-cuas`;
const templateDir = path.join(root, "ads", "广告上传模板");
const outputDir = path.join(root, "outputs", "ads_url_relevance_20260715");
const previewDir = path.join(outputDir, "strict_template_previews");
await fs.mkdir(previewDir, { recursive: true });

const jobs = [
  {
    kind: "keyword",
    template: path.join(templateDir, "keyword_template.xlsx"),
    source: path.join(outputDir, "NTET_Keyword_Final_URL_Edit_WebUpload_ActionFirst_20260715.xlsx"),
    headerRow: 1,
    dataStartRow: 3,
    output: path.join(outputDir, "NTET_Keyword_Final_URL_Edit_STRICT_Official_Template_20260715.xlsx"),
  },
  {
    kind: "rsa",
    template: path.join(templateDir, "responsive_search_ad_template.xlsx"),
    source: path.join(outputDir, "NTET_RSA_Final_URL_Edit_WebUpload_ActionFirst_20260715.xlsx"),
    headerRow: 3,
    dataStartRow: 5,
    output: path.join(outputDir, "NTET_RSA_Final_URL_Edit_STRICT_Official_Template_20260715.xlsx"),
  },
];

const qa = [];
for (const job of jobs) {
  const templateWb = await SpreadsheetFile.importXlsx(await FileBlob.load(job.template));
  const sourceWb = await SpreadsheetFile.importXlsx(await FileBlob.load(job.source));
  const templateSheet = templateWb.worksheets.getItemAt(0);
  const sourceSheet = sourceWb.worksheets.getItemAt(0);

  const templateValues = templateSheet.getUsedRange().values;
  const sourceValues = sourceSheet.getUsedRange().values;
  const templateHeaders = templateValues[job.headerRow - 1];
  const sourceHeaders = sourceValues[0];
  const sourceIndex = new Map(sourceHeaders.map((header, index) => [header, index]));

  const missing = templateHeaders.filter((header) => !sourceIndex.has(header));
  if (missing.length) throw new Error(`${job.kind}: source is missing template fields: ${missing.join(", ")}`);

  const dataRows = sourceValues.slice(1).map((row) =>
    templateHeaders.map((header) => row[sourceIndex.get(header)] ?? null),
  );

  // Preserve the official template workbook, sheet name, note rows, header row,
  // help/instruction row and exact column order. Only append data in the first
  // official data row.
  templateSheet
    .getRangeByIndexes(job.dataStartRow - 1, 0, dataRows.length, templateHeaders.length)
    .values = dataRows;

  const exported = await SpreadsheetFile.exportXlsx(templateWb);
  await exported.save(job.output);

  const verifyWb = await SpreadsheetFile.importXlsx(await FileBlob.load(job.output));
  const verifySheet = verifyWb.worksheets.getItemAt(0);
  const verifyValues = verifySheet.getUsedRange().values;
  const exactTemplatePrefix = JSON.stringify(verifyValues.slice(0, job.dataStartRow - 1)) ===
    JSON.stringify(templateValues.slice(0, job.dataStartRow - 1));
  const outputHeaders = verifyValues[job.headerRow - 1];
  const exactHeaders = JSON.stringify(outputHeaders) === JSON.stringify(templateHeaders);
  const firstData = verifyValues[job.dataStartRow - 1];
  const actionCol = templateHeaders.indexOf("Action");
  const rowTypeCol = templateHeaders.indexOf("Row Type");
  const finalUrlCol = templateHeaders.indexOf("Final URL");
  const formulaErrors = await verifyWb.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 50 },
    summary: `${job.kind} formula error scan`,
  });

  qa.push({
    kind: job.kind,
    output: job.output,
    sheetNames: verifyWb.worksheets.items.map((s) => s.name),
    templateHeaderRow: job.headerRow,
    dataStartRow: job.dataStartRow,
    exactTemplatePrefix,
    exactHeaders,
    rowCount: verifyValues.length,
    columnCount: outputHeaders.length,
    dataRowCount: verifyValues.length - (job.dataStartRow - 1),
    firstDataRowType: firstData[rowTypeCol],
    firstDataAction: firstData[actionCol],
    firstDataFinalUrl: firstData[finalUrlCol],
    formulaErrorScan: formulaErrors.ndjson,
  });

}

await fs.writeFile(path.join(outputDir, "strict_official_template_qa.json"), JSON.stringify(qa, null, 2), "utf8");
console.log(JSON.stringify(qa, null, 2));

function colName(n) {
  let s = "";
  while (n > 0) {
    n--;
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s || "A";
}
