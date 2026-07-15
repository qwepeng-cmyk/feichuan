import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const templateDir = "D:/fc-cuas/ads/广告上传模板";
const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const jobs = [
  ["ad_group_template.xlsx", 0, "01_Ad_Groups_UPLOAD_Formats_20260716.xlsx", 21],
  ["keyword_template.xlsx", 0, "02_Keywords_UPLOAD_Formats_20260716.xlsx", 18],
  ["responsive_search_ad_template.xlsx", 2, "03_RSA_DKI_UPLOAD_Formats_20260716.xlsx", 55],
  ["ad_group_negative_keyword_template.xlsx", 0, "04_Negative_Keywords_UPLOAD_Formats_20260716.xlsx", 11],
];

const results = [];
for (const [templateFile, templateHeaderIndex, outputFile, expectedColumns] of jobs) {
  const template = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(templateDir, templateFile)));
  const output = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, outputFile)));
  const templateHeaders = template.worksheets.getItemAt(0).getUsedRange(true).values[templateHeaderIndex];
  const outputValues = output.worksheets.getItemAt(0).getUsedRange(true).values;
  const outputHeaders = outputValues[0];
  const missing = templateHeaders.filter((header) => !outputHeaders.includes(header));
  const extra = outputHeaders.filter((header) => !templateHeaders.includes(header));
  const orderMismatches = templateHeaders.map((header, index) => ({ index: index + 1, expected: header, actual: outputHeaders[index] })).filter((item) => item.expected !== item.actual);
  const result = {
    templateFile,
    outputFile,
    templateHeaderRow: templateHeaderIndex + 1,
    expectedColumns,
    templateColumns: templateHeaders.length,
    outputColumns: outputHeaders.length,
    exactHeaderArray: JSON.stringify(templateHeaders) === JSON.stringify(outputHeaders),
    firstRowIsHeader: outputHeaders[0] === templateHeaders[0],
    secondRowIsData: outputValues.length > 1 && outputValues[1][0] !== null,
    missing,
    extra,
    orderMismatches,
  };
  if (!result.exactHeaderArray || !result.firstRowIsHeader || !result.secondRowIsData || result.outputColumns !== expectedColumns) {
    throw new Error(`Template header mismatch: ${JSON.stringify(result, null, 2)}`);
  }
  results.push(result);
}

await fs.writeFile(path.join(outDir, "live_template_header_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results, null, 2));
