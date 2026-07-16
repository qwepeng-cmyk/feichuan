import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/four_solution_campaigns_20260716";
const jobs = [
  ["01_Ad_Groups_UPLOAD_Formats_20260716.xlsx", "ad_group_template.xlsx", "01_Ad_Groups_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", 15, 21],
  ["02_Keywords_UPLOAD_Formats_20260716.xlsx", "keyword_template.xlsx", "02_Keywords_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", 77, 18],
  ["03_RSA_DKI_UPLOAD_Formats_20260716.xlsx", "responsive_search_ad_template.xlsx", "03_RSA_DKI_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", 15, 55],
  ["04_Negative_Keywords_UPLOAD_Formats_20260716.xlsx", "ad_group_negative_keyword_template.xlsx", "04_Negatives_GOOGLE_NATIVE_TEMPLATE_20260716.xlsx", 86, 11],
];

const payload = [];
for (const [inputName, templateName, outputName, expectedRows, expectedColumns] of jobs) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, inputName)));
  const sheet = workbook.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const headers = values[0].map((value) => String(value ?? ""));
  const rows = values.slice(1);
  if (
    headers[0] !== "Row Type" ||
    headers[1] !== "Action" ||
    rows.length !== expectedRows ||
    headers.length !== expectedColumns
  ) {
    throw new Error(`${inputName}: source validation failed`);
  }
  payload.push({ inputName, templateName, outputName, expectedRows, expectedColumns, headers, rows });
}

await fs.writeFile(path.join(outDir, "native_template_payload.json"), JSON.stringify(payload), "utf8");
console.log(JSON.stringify(payload.map(({ rows, headers, ...job }) => ({ ...job, firstHeader: headers[0], secondHeader: headers[1] })), null, 2));
