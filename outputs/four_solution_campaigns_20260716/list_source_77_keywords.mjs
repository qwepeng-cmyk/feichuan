import fs from "node:fs/promises";
const payload = JSON.parse(await fs.readFile("D:/fc-cuas/outputs/four_solution_campaigns_20260716/native_template_payload.json", "utf8"));
const job = payload.find((item) => item.inputName.startsWith("02_Keywords"));
const index = new Map(job.headers.map((header, i) => [header, i]));
const rows = job.rows.map((row) => ({
  campaign: row[index.get("Campaign")],
  adGroup: row[index.get("Ad group")],
  keyword: row[index.get("Keyword")],
  type: row[index.get("Type")],
  url: row[index.get("Final URL")],
}));
console.log(JSON.stringify(rows, null, 2));
