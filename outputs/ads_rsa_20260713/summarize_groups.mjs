import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("D:/fc-cuas/outputs/ads_rsa_20260713/extracted_ads_data.json", "utf8"));
const cleanGroups = data.groupSummary.filter((g) => g.campaign && g.campaign !== "--" && g.adGroup && g.adGroup !== "--");
const adGroups = new Map();
for (const row of data.ads) {
  const campaign = row["广告系列"];
  const adGroup = row["广告组"];
  if (!campaign || !adGroup) continue;
  const key = `${campaign}|||${adGroup}`;
  if (!adGroups.has(key)) adGroups.set(key, []);
  adGroups.get(key).push({
    adId: row["广告 ID"],
    status: row["广告状态"],
    finalUrl: row["最终到达网址"],
    adType: row["广告类型"],
    headlines: ["标题 1","标题 2","标题 3","第 4 个标题","标题 5","标题 6","标题 7","标题 8","标题 9","标题 10","标题 11","标题 12","标题 13","标题 14","标题 15"].map((h) => row[h]).filter(Boolean),
    descriptions: ["广告内容描述第 1 行","广告内容描述第 2 行","广告内容描述第 3 行","广告内容描述 4"].map((h) => row[h]).filter(Boolean),
  });
}

const summary = cleanGroups.map((g) => ({
  campaign: g.campaign,
  adGroup: g.adGroup,
  keywordCount: g.keywordCount,
  impressions: g.impressions,
  clicks: g.clicks,
  finalUrls: g.finalUrls,
  sampleKeywords: g.sampleKeywords.slice(0, 12),
  ads: adGroups.get(`${g.campaign}|||${g.adGroup}`) || [],
}));

await fs.writeFile("D:/fc-cuas/outputs/ads_rsa_20260713/group_ad_summary.json", JSON.stringify(summary, null, 2), "utf8");
console.log(JSON.stringify(summary.map((g) => ({ campaign: g.campaign, adGroup: g.adGroup, keywordCount: g.keywordCount, impressions: g.impressions, clicks: g.clicks, adCount: g.ads.length, sampleKeywords: g.sampleKeywords }))));
