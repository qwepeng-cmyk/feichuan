import fs from "node:fs/promises";

const input = JSON.parse(await fs.readFile("D:/fc-cuas/outputs/device_intent_campaign_20260715/input_inspection.json", "utf8"));

function rowsFrom(values) {
  const headerIndex = values.findIndex((row) => row.some((cell) => cell === "搜索字词" || cell === "关键字状态"));
  const headers = values[headerIndex];
  return values.slice(headerIndex + 1).map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i]]))).filter((row) => Object.values(row).some((v) => v !== null && v !== ""));
}

const terms = rowsFrom(input.terms.allValues).filter((row) => typeof row["搜索字词"] === "string" && !row["搜索字词"].startsWith("总计"));
const keywords = rowsFrom(input.keywords.allValues).filter((row) => typeof row["关键字"] === "string" && !row["关键字"].startsWith("总计"));

const clicked = terms.filter((row) => Number(row["点击次数"] || 0) > 0).sort((a, b) => Number(b["点击次数"]) - Number(a["点击次数"]) || Number(b["费用"]) - Number(a["费用"]));
const termTotals = terms.reduce((acc, row) => {
  acc.rows += 1;
  acc.impressions += Number(row["展示次数"] || 0);
  acc.clicks += Number(row["点击次数"] || 0);
  acc.cost += Number(row["费用"] || 0);
  return acc;
}, { rows: 0, impressions: 0, clicks: 0, cost: 0 });
const keywordTotals = keywords.reduce((acc, row) => {
  acc.rows += 1;
  acc.impressions += Number(row["展示次数"] || 0);
  acc.clicks += Number(row["点击次数"] || 0);
  acc.cost += Number(row["费用"] || 0);
  return acc;
}, { rows: 0, impressions: 0, clicks: 0, cost: 0 });

console.log(JSON.stringify({ termTotals, keywordTotals, clickedCount: clicked.length, clicked: clicked.map((row) => ({
  term: row["搜索字词"], keyword: row["关键字"], match: row["匹配类型"], campaign: row["广告系列"], adGroup: row["广告组"], clicks: row["点击次数"], impressions: row["展示次数"], cost: row["费用"], added: row["已添加/已排除"],
})) }, null, 2));
