import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outDir = "D:/fc-cuas/outputs/scenario_campaigns_20260716";
const jobs = JSON.parse(await fs.readFile(path.join(outDir, "scenario_payloads.json"), "utf8"));
const qa = JSON.parse(await fs.readFile(path.join(outDir, "scenario_build_qa.json"), "utf8"));
const expectedCampaigns = qa.campaigns.map((item) => item.campaign);
const expectedGroups = qa.scenarios.map((item) => item.adGroup);
const safeLandingUrl = qa.safeLandingUrl;
const forbiddenPattern = /\b(jammer|jamming|blocker|blocking|spoofing|deception|weapon|weapons|gun|guns|shoot down|destroy|neutraliz(?:e|es|ed|ing|ation)|forced landing|return to home|intercept(?:ion|s|ed|ing)?)\b/i;
const nonDeviceIntentPattern = /\bmonitor(?:ing)?\b/i;
const renderedDki = (value) => String(value).replace(/\{KeyWord:([^}]+)\}/g, "$1");
const results = [];

for (const job of jobs) {
  const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path.join(outDir, job.outputName)));
  const sheet = wb.worksheets.getItemAt(0);
  const values = sheet.getUsedRange(true).values;
  const normalized = (rows) => rows.map((row) => Array.from({ length: job.expectedColumns }, (_, i) => row[i] ?? null));
  const index = new Map(job.headers.map((header, i) => [header, i]));
  const data = values.slice(1);
  const isPause = job.outputName.startsWith("04_");
  const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: `${job.outputName} formula error scan` });
  const topRows = await wb.inspect({ kind: "table", range: `${sheet.name}!A1:${job.expectedColumns === 55 ? "BC" : job.expectedColumns === 21 ? "U" : "R"}4`, include: "values,formulas", tableMaxRows: 4, tableMaxCols: job.expectedColumns, maxChars: 16000 });
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
    result.countsByCampaign = Object.fromEntries(expectedCampaigns.map((campaign) => [campaign, data.filter((row) => row[index.get("Campaign")] === campaign).length]));
    result.countsByGroup = Object.fromEntries(expectedGroups.map((group) => [group, data.filter((row) => row[index.get("Ad group")] === group).length]));
    result.typesByCampaign = Object.fromEntries(expectedCampaigns.map((campaign) => [campaign, [...new Set(data.filter((row) => row[index.get("Campaign")] === campaign).map((row) => row[index.get("Type")]))]]));
    result.urlsSafe = data.every((row) => row[index.get("Final URL")] === safeLandingUrl);
    result.noForbiddenTerms = data.every((row) => !forbiddenPattern.test(String(row[index.get("Keyword")])));
    result.noMonitoringTerms = data.every((row) => !nonDeviceIntentPattern.test(String(row[index.get("Keyword")])));
    result.uniqueRows = new Set(data.map((row) => [row[index.get("Campaign")], row[index.get("Ad group")], row[index.get("Keyword")], row[index.get("Type")]].join("\u0000"))).size === data.length;
  }
  if (job.outputName.startsWith("03_")) {
    const headlines = data.flatMap((row) => Array.from({ length: 15 }, (_, i) => row[index.get(`Headline ${i + 1}`)]));
    const descriptions = data.flatMap((row) => Array.from({ length: 4 }, (_, i) => row[index.get(`Description ${i + 1}`)]));
    result.allHeadlineDki = headlines.every((value) => /\{KeyWord:[^}]+\}/.test(String(value)));
    result.allDescriptionDki = descriptions.every((value) => /\{KeyWord:[^}]+\}/.test(String(value)));
    result.maxRenderedHeadlineLength = Math.max(...headlines.map((value) => renderedDki(value).length));
    result.maxRenderedDescriptionLength = Math.max(...descriptions.map((value) => renderedDki(value).length));
    result.urlsSafe = data.every((row) => row[index.get("Final URL")] === safeLandingUrl);
    result.noMonitoringTerms = [...headlines, ...descriptions].every((value) => !nonDeviceIntentPattern.test(String(value)));
  }
  if (isPause) {
    result.actions = [...new Set(data.map((row) => row[index.get("Action")]))];
    result.statuses = [...new Set(data.map((row) => row[index.get("Keyword status")]))];
    result.finalUrlsBlank = data.every((row) => !row[index.get("Final URL")]);
    result.uniqueRows = new Set(data.map((row) => [row[index.get("Campaign")], row[index.get("Ad group")], row[index.get("Keyword")], row[index.get("Type")]].join("\u0000"))).size === data.length;
  }
  if (
    result.sheets !== 1 || result.sheet !== "Sheet0" || result.rows !== job.expectedRows || result.columns !== job.expectedColumns ||
    result.firstHeader !== "Row Type" || result.secondHeader !== "Action" || result.firstAction !== (isPause ? "Edit" : "Add") || !result.exactValues ||
    (!isPause && (result.campaigns.length !== 6 || expectedCampaigns.some((campaign) => !result.campaigns.includes(campaign)))) ||
    (!isPause && (result.adGroups.length !== 10 || expectedGroups.some((group) => !result.adGroups.includes(group)))) ||
    !result.formulaErrors.includes("matched 0 entries") ||
    (result.countsByCampaign && expectedCampaigns.some((campaign) => result.countsByCampaign[campaign] !== 80)) ||
    (result.countsByGroup && expectedGroups.some((group) => result.countsByGroup[group] !== 48)) ||
    (result.typesByCampaign && expectedCampaigns.some((campaign) => result.typesByCampaign[campaign].length !== 1 || result.typesByCampaign[campaign][0] !== (campaign.endsWith("精准") ? "Exact match" : "Phrase match"))) ||
    (result.urlsSafe === false || result.noForbiddenTerms === false || result.noMonitoringTerms === false || result.uniqueRows === false) ||
    (job.outputName.startsWith("03_") && (!result.allHeadlineDki || !result.allDescriptionDki || result.maxRenderedHeadlineLength > 30 || result.maxRenderedDescriptionLength > 90)) ||
    (isPause && (result.rows !== qa.pauseRows || result.actions.join("|") !== "Edit" || result.statuses.join("|") !== "Paused" || !result.finalUrlsBlank || !result.uniqueRows))
  ) throw new Error(`Verification failed: ${JSON.stringify(result, null, 2)}`);
  results.push(result);
}
await fs.writeFile(path.join(outDir, "scenario_outputs_qa.json"), JSON.stringify(results, null, 2), "utf8");
console.log(JSON.stringify(results.map(({ formulaErrors, topRows, ...result }) => ({ ...result, formulaErrors: 0, topRows: "verified" })), null, 2));
