import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = String.raw`D:\fc-cuas`;
const templateDir = path.join(root, "ads", "广告上传模板");
const outputDir = path.join(root, "outputs", "ads_url_relevance_20260715");
const previewDir = path.join(outputDir, "exact_template_previews");
await fs.mkdir(previewDir, { recursive: true });

const files = [
  path.join(templateDir, "keyword_template.xlsx"),
  path.join(templateDir, "responsive_search_ad_template.xlsx"),
  path.join(outputDir, "NTET_Keyword_Final_URL_Edit_STRICT_Official_Template_20260715.xlsx"),
  path.join(outputDir, "NTET_RSA_Final_URL_Edit_STRICT_Official_Template_20260715.xlsx"),
];

const summaries = [];
for (const file of files) {
  console.error(`IMPORT ${file}`);
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
  console.error(`IMPORTED ${file}`);
  const sheets = workbook.worksheets.items;
  const sheetSummaries = [];
  for (const sheet of sheets) {
    const used = sheet.getUsedRange();
    const values = used?.values ?? [];
    const rowCount = values.length;
    const colCount = values.reduce((m, row) => Math.max(m, row.length), 0);
    const firstRows = values.slice(0, 7).map((row) => row.slice(0, 60));
    sheetSummaries.push({ sheet: sheet.name, rowCount, colCount, firstRows });
  }
  summaries.push({ file, sheets: sheetSummaries });
}

await fs.writeFile(path.join(outputDir, "exact_template_structure.json"), JSON.stringify(summaries, null, 2), "utf8");
console.log(JSON.stringify(summaries, null, 2));

function colName(n) {
  let s = "";
  while (n > 0) {
    n--;
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s || "A";
}
