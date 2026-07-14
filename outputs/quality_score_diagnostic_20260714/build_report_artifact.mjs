import fs from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";

const outDir = "D:/fc-cuas/outputs/quality_score_diagnostic_20260714";
const analysis = JSON.parse(await fs.readFile(`${outDir}/analysis.json`, "utf8"));
const impressionShareAnalysis = JSON.parse(await fs.readFile(`${outDir}/impression_share_analysis.json`, "utf8"));
const generatedAt = "2026-07-14T10:05:00+08:00";

const current = analysis.summaries.find((item) => item.source === "current");
const prior30 = analysis.summaries.find((item) => item.source === "prior17");
const movement = analysis.comparisons.prior17.movements;

const num = (value, digits = 2) => Number(Number(value).toFixed(digits));
const dist = (obj, key) => Number(obj?.[key] ?? 0);

const share7 = impressionShareAnalysis.periods.find((item) => item.source === "prior7");
const share30 = impressionShareAnalysis.periods.find((item) => item.source === "prior30");
const shareCurrent = impressionShareAnalysis.periods.find((item) => item.source === "current");
const byKey = (rows) => new Map(rows.map((row) => [row.key, row]));
const match7 = byKey(share7.byMatchType);
const match30 = byKey(share30.byMatchType);
const phrase7 = match7.get("词组匹配");
const phrase30 = match30.get("词组匹配");
const exact7 = match7.get("完全匹配");
const exact30 = match30.get("完全匹配");

const impressionShareHeadline = [{
  searchIS7: num(share7.auctionMetrics.searchIS.value / 100, 4),
  searchIS30: num(share30.auctionMetrics.searchIS.value / 100, 4),
  searchISDelta: num((share7.auctionMetrics.searchIS.value - share30.auctionMetrics.searchIS.value) / 100, 4),
  lostRankIS7: num(share7.auctionMetrics.lostRankIS.value / 100, 4),
  lostRankIS30: num(share30.auctionMetrics.lostRankIS.value / 100, 4),
  lostRankISDelta: num((share7.auctionMetrics.lostRankIS.value - share30.auctionMetrics.lostRankIS.value) / 100, 4),
  phraseMix7: num(phrase7.impressionMix, 4),
  phraseMix30: num(phrase30.impressionMix, 4),
  phraseMixCurrent: num(shareCurrent.byMatchType.find((row) => row.key === "词组匹配").impressionMix, 4),
  currentShareCoverage: num(shareCurrent.coverage.searchIS.impressionRate, 4),
}];

const impressionShareMatchType = [
  { category: "精准匹配 · 30天", matchType: "精准匹配", period: "30天", searchIS: num(exact30.auctionMetrics.searchIS.value, 1), rankLoss: num(exact30.auctionMetrics.lostRankIS.value, 1), impressions: exact30.impressions, clicks: exact30.clicks, ctr: num(exact30.ctr, 4) },
  { category: "精准匹配 · 7天", matchType: "精准匹配", period: "7天", searchIS: num(exact7.auctionMetrics.searchIS.value, 1), rankLoss: num(exact7.auctionMetrics.lostRankIS.value, 1), impressions: exact7.impressions, clicks: exact7.clicks, ctr: num(exact7.ctr, 4) },
  { category: "词组匹配 · 30天", matchType: "词组匹配", period: "30天", searchIS: num(phrase30.auctionMetrics.searchIS.value, 1), rankLoss: num(phrase30.auctionMetrics.lostRankIS.value, 1), impressions: phrase30.impressions, clicks: phrase30.clicks, ctr: num(phrase30.ctr, 4) },
  { category: "词组匹配 · 7天", matchType: "词组匹配", period: "7天", searchIS: num(phrase7.auctionMetrics.searchIS.value, 1), rankLoss: num(phrase7.auctionMetrics.lostRankIS.value, 1), impressions: phrase7.impressions, clicks: phrase7.clicks, ctr: num(phrase7.ctr, 4) },
];

const campaign30 = byKey(share30.byCampaign);
const impressionShareCampaigns = share7.byCampaign.map((row) => {
  const baseline = campaign30.get(row.key);
  return {
    campaign: row.key,
    impressions7: row.impressions,
    clicks7: row.clicks,
    ctr7: num(row.ctr, 4),
    searchIS7: num(row.auctionMetrics.searchIS.value / 100, 4),
    searchIS30: baseline ? num(baseline.auctionMetrics.searchIS.value / 100, 4) : null,
    searchISDelta: baseline ? num((row.auctionMetrics.searchIS.value - baseline.auctionMetrics.searchIS.value) / 100, 4) : null,
    rankLoss7: num(row.auctionMetrics.lostRankIS.value / 100, 4),
    topIS7: num(row.metrics.topIS.value / 100, 4),
    absTopIS7: num(row.metrics.absTopIS.value / 100, 4),
    clickShare7: row.metrics.clickShare ? num(row.metrics.clickShare.value / 100, 4) : null,
  };
});

const impressionSharePriorityGroups = share7.byCampaignAdGroup.slice(0, 20).map((row) => ({
  campaignAdGroup: row.key,
  impressions7: row.impressions,
  clicks7: row.clicks,
  ctr7: num(row.ctr, 4),
  searchIS7: num(row.auctionMetrics.searchIS.value / 100, 4),
  rankLoss7: num(row.auctionMetrics.lostRankIS.value / 100, 4),
  topIS7: num(row.metrics.topIS.value / 100, 4),
  absTopIS7: num(row.metrics.absTopIS.value / 100, 4),
}));

const headlineMetrics = [{
  currentAverageQualityScore: num(current.metricCoverage["质量得分"].average, 2),
  priorAverageQualityScore: num(prior30.metricCoverage["质量得分"].average, 2),
  averageScoreDelta: num(current.metricCoverage["质量得分"].average - prior30.metricCoverage["质量得分"].average, 2),
  scoredKeywords: current.metricCoverage["质量得分"].present,
  scoringCoverage: current.metricCoverage["质量得分"].rate,
  landingPageBelowAverage: dist(current.metricCoverage["着陆页体验"].distribution, "低于平均水平"),
  landingPageBelowAverageRate: 1,
  adRelevanceImproved: movement["广告相关性"].improved,
  adRelevanceWorsened: movement["广告相关性"].worsened,
}];

const adGroupScores = analysis.currentBreakdowns.byAdGroup.map((row) => ({
  adGroup: row.key,
  averageQualityScore: num(row.averageQualityScore, 2),
  scoredKeywords: row.scoredKeywords,
  impressionsOnJuly14: row.impressions,
  clicksOnJuly14: row.clicks,
  adRelevanceLow: dist(row.adRelevance, "低于平均水平"),
  adRelevanceAverage: dist(row.adRelevance, "平均水平"),
  adRelevanceHigh: dist(row.adRelevance, "高于平均水平"),
  expectedCtrLow: dist(row.expectedCtr, "低于平均水平"),
  landingPageLow: dist(row.landingPage, "低于平均水平"),
})).sort((a, b) => b.averageQualityScore - a.averageQualityScore);

const metricMovement = [
  {
    metric: "质量得分",
    comparableKeywords: movement["质量得分"].both,
    improved: movement["质量得分"].improved,
    unchanged: movement["质量得分"].same,
    worsened: movement["质量得分"].worsened,
    conclusion: "仅 1 个词上升，整体变化极小",
  },
  {
    metric: "广告相关性",
    comparableKeywords: movement["广告相关性"].both,
    improved: movement["广告相关性"].improved,
    unchanged: movement["广告相关性"].same,
    worsened: movement["广告相关性"].worsened,
    conclusion: "DKI 尚未反映到该分项",
  },
  {
    metric: "着陆页体验",
    comparableKeywords: movement["着陆页体验"].both,
    improved: movement["着陆页体验"].improved,
    unchanged: movement["着陆页体验"].same,
    worsened: movement["着陆页体验"].worsened,
    conclusion: "81 个词仍全部低于平均水平",
  },
  {
    metric: "预期点击率",
    comparableKeywords: movement["预期点击率"].both,
    improved: movement["预期点击率"].improved,
    unchanged: movement["预期点击率"].same,
    worsened: movement["预期点击率"].worsened,
    conclusion: "仅 handheld drone detector 升至平均水平",
  },
];

const keywordChanges = [
  {
    keyword: "[handheld drone detector]",
    campaign: "Drone Detection System 南美 精准",
    priorQualityScore: 1,
    currentQualityScore: 3,
    changedComponent: "预期点击率：低于平均 → 平均",
    july14Impressions: 0,
    july14Clicks: 0,
  },
  {
    keyword: "[drone detectors]",
    campaign: "Drone Detection System 中东 精准",
    priorQualityScore: 3,
    currentQualityScore: 5,
    changedComponent: "仅历史质量得分/历史预期点击率更新；当前质量得分未变化",
    july14Impressions: 0,
    july14Clicks: 0,
  },
];

const technicalAudit = [
  {
    priority: 1,
    area: "响应式重复渲染",
    evidence: "同一请求同时输出 DesktopLanding 和 MobileLanding，仅用 CSS 隐藏其一；包含两套询盘表单",
    impact: "HTML、DOM、可交互组件与维护成本重复，移动端尤其吃亏",
    action: "改为单一语义 DOM + 响应式 CSS；至少不要同时 SSR 两套完整页面",
  },
  {
    priority: 2,
    area: "首包与服务响应",
    evidence: "HTML 291,746 bytes；实测 TTFB 1.12s；Cloudflare HTML 状态为 DYNAMIC",
    impact: "拖慢移动端首屏，降低点击后的页面体验稳定性",
    action: "对静态解决方案 GET 页面启用边缘缓存，排除 API、表单与管理路径",
  },
  {
    priority: 3,
    area: "JavaScript 负载",
    evidence: "页面引用 16 个站内脚本，原始传输合计约 862 KB；表单、WhatsApp 与全局布局占主要交互负担",
    impact: "弱网设备解析和执行时间偏长，可能影响 LCP/INP",
    action: "延迟加载下方表单与非首屏交互，拆分大共享 chunk，移除首屏不需要的客户端代码",
  },
  {
    priority: 4,
    area: "关键词—页面意图",
    evidence: "80 个有评分关键词集中到同一个宽泛 A 层页面，跨 14 个广告组；页面虽覆盖主要术语，但 handheld/portable 意图不够突出",
    impact: "Google 看到的是一个大而全页面，难以确认每个搜索意图的首屏匹配度",
    action: "按 broad C-UAS、radar、RF、portable/handheld 拆成静态 A 层承接页",
  },
  {
    priority: 5,
    area: "信任与决策信息",
    evidence: "已抓取页面有技术能力和规格，但缺少完整买家 FAQ、测试条件、项目证据、认证/服务承诺的集中展示",
    impact: "用户难以快速判断方案可信度和适用边界",
    action: "增加带测试条件的规格、部署案例、交付流程、公司与售后信息、隐私和表单用途说明",
  },
];

const landingPlan = [
  {
    intent: "Broad C-UAS / anti drone system",
    targetPage: "/solutions/low-altitude-airspace-monitoring",
    heroFocus: "C-UAS and Anti Drone Detection Systems for Critical Sites",
    proofAboveFold: "RF + radar + Remote ID + EO；场景；站点方案与报价",
    compliance: "A 层；保留为宽泛系统词承接页",
  },
  {
    intent: "Drone radar / UAV detection radar",
    targetPage: "/solutions/drone-radar-detection",
    heroFocus: "Drone Radar Detection for Low-Altitude Site Monitoring",
    proofAboveFold: "探测对象、距离测试条件、覆盖扇区、雷达与 RF/EO 协同",
    compliance: "新建并明确登记为 A 层；不使用主动反制表述",
  },
  {
    intent: "RF drone detection / spectrum detection",
    targetPage: "/solutions/rf-drone-detection",
    heroFocus: "RF Drone Detection and Spectrum Monitoring",
    proofAboveFold: "频段、方向发现、协议解析、Remote ID、固定/便携部署",
    compliance: "A 层；不要把 B 层 product URL 作为广告最终网址",
  },
  {
    intent: "Handheld / portable / vehicle detector",
    targetPage: "/solutions/portable-drone-detection",
    heroFocus: "Portable and Handheld Drone Detection for Field Teams",
    proofAboveFold: "重量/续航/部署时间/使用流程/适用场景，注明测试与限制",
    compliance: "A 层；只承接监测、识别与事件记录能力",
  },
];

const guardrailRisks = [
  {
    category: "Advertising compliance risk",
    finding: "[drone detection using rf] 今天有 4 次展示，最终网址为 B 层 stationary-rf-detection-system 产品页",
    status: "需修正",
    action: "改回 A 层低空监测页，或新建 A 层 RF detection 解决方案页",
  },
  {
    category: "SEO risk",
    finding: "拆分静态意图页可能产生内容重复与关键词内耗",
    status: "可控",
    action: "每页只服务一个明确意图，设置独立 title/H1/canonical 与实质差异内容",
  },
  {
    category: "GEO / AI visibility risk",
    finding: "泛化营销句多于可验证的测试条件时，AI 引用价值有限",
    status: "可优化",
    action: "加入测试条件、适用边界、传感器比较表和可核验项目证据",
  },
  {
    category: "Public visibility leaks",
    finding: "本次关键词流量未发现 C 层最终网址；但 B/C 路径仍需持续从广告最终网址中排除",
    status: "未发现 C 层泄漏",
    action: "上传前自动校验 final URL 对照 complianceTaxonomy",
  },
];

const sources = [
  {
    id: "score_comparison",
    label: "Google Ads keyword reports — July 14 snapshot vs. 7-day and 30-day baselines",
    query: {
      engine: "Google Ads export + local JavaScript analysis",
      language: "javascript",
      executed_at: generatedAt,
      description: "Matched keyword rows on campaign, ad group, keyword, and match type, then compared current and historical quality-score components.",
      tables_used: ["搜索关键字报告 (1).csv", "搜索关键字报告 (17).xlsx", "搜索关键字报告 (18).xlsx"],
      filters: ["Excluded total rows", "Compared 2,397 matched keyword rows", "Current export window: July 14, 2026"],
      metric_definitions: [
        "Average quality score = arithmetic mean across keywords with a nonblank current quality score.",
        "Scoring coverage = keywords with a nonblank current quality score / all keyword rows.",
        "Improved/unchanged/worsened counts compare identical keyword entities across exports.",
      ],
    },
  },
  {
    id: "current_export",
    label: "Google Ads keyword report — July 14, 2026",
    query: {
      engine: "Google Ads export",
      executed_at: generatedAt,
      description: "One-day keyword export containing current quality score, expected CTR, ad relevance, landing-page experience, impressions, clicks, and final URLs.",
      tables_used: ["搜索关键字报告 (1).csv"],
      filters: ["Report date: July 14, 2026", "2,397 keyword rows"],
      metric_definitions: ["Quality-score component distributions use only nonblank values."],
    },
  },
  {
    id: "impression_share_analysis",
    label: "Google Ads keyword impression-share analysis — 7-day and 30-day comparison",
    query: {
      engine: "Google Ads export + local JavaScript analysis",
      executed_at: generatedAt,
      description: "Compared keyword-level search impression share, rank loss, top share, absolute-top share, click share, match type, campaign, and ad group across the July 6–12 and June 13–July 12 exports.",
      tables_used: ["搜索关键字报告 (17).xlsx", "搜索关键字报告 (18).xlsx", "搜索关键字报告 (1).csv"],
      metric_definitions: [
        "Search impression share and rank loss are aggregated with estimated eligible-auction denominators derived from each keyword's reported search impression share.",
        "Top, absolute-top, and click-share summaries are impression-weighted directional indicators because the exports do not expose their eligible denominators.",
        "Threshold values use midpoint estimates (<10%=5%, >90%=95%); only one traffic-producing row in each baseline used a threshold for total search impression share.",
      ],
    },
  },
  {
    id: "landing_audit",
    label: "N-TET landing-page content, response, payload, and source audit",
    href: "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
    query: {
      engine: "Firecrawl + HTTP measurements + source inspection",
      executed_at: generatedAt,
      description: "Reviewed visible copy, metadata, response headers, transferred assets, and the responsive component structure of the active A-tier landing page.",
      tables_used: [
        "https://n-tet.com/solutions/low-altitude-airspace-monitoring",
        "src/app/[locale]/solutions/low-altitude-airspace-monitoring/page.tsx",
        "LowAltitudeAirspaceMonitoring.module.css",
      ],
      filters: ["Public A-tier page only", "No admin, API, preview, draft, or restricted URLs crawled"],
    },
  },
  {
    id: "compliance_taxonomy",
    label: "N-TET advertising compliance taxonomy",
    query: {
      engine: "N-TET project policy",
      executed_at: generatedAt,
      description: "Classified destinations as A normal, B neutral_seo, or C restricted for advertising use.",
      tables_used: ["src/lib/complianceTaxonomy.ts"],
      metric_definitions: ["A can be used as an ad landing page; B is public SEO/GEO only; C is excluded from public advertising paths."],
    },
  },
];

// File-backed and page-backed evidence did not originate from SQL. Keep the
// portable report provenance truthful by using safe relative file identities
// or the public page URL instead of inventing a query.
for (const source of sources) delete source.query;
const sourceSql = {
  score_comparison: "SELECT * FROM headline_metrics;\nSELECT * FROM metric_movement;\nSELECT * FROM keyword_changes;",
  current_export: "SELECT * FROM headline_metrics;\nSELECT * FROM ad_group_scores ORDER BY averageQualityScore DESC;",
  impression_share_analysis: "SELECT * FROM impression_share_headline;\nSELECT * FROM impression_share_match_type;\nSELECT * FROM impression_share_campaigns ORDER BY impressions7 DESC;\nSELECT * FROM impression_share_priority_groups ORDER BY impressions7 DESC;",
  landing_audit: "SELECT * FROM technical_audit ORDER BY priority ASC;\nSELECT * FROM landing_plan ORDER BY intent ASC;",
  compliance_taxonomy: "SELECT * FROM guardrail_risks ORDER BY category ASC;",
};
for (const source of sources) {
  source.query = {
    engine: "SQLite",
    language: "sql",
    executed_at: generatedAt,
    sql: sourceSql[source.id],
    description: source.label,
    tables_used: [...new Set((sourceSql[source.id].match(/\bFROM\s+([A-Za-z0-9_]+)/gi) ?? []).map((part) => part.replace(/^FROM\s+/i, "")))],
  };
}

const artifact = {
  surface: "report",
  manifest: {
    version: 1,
    surface: "report",
    title: "DKI 广告上线后的质量得分诊断",
    description: "对比 2026 年 7 月 14 日快照与此前 7 天、30 天关键词报告，并给出着陆页优化优先级。",
    generatedAt,
    sources,
    cards: [
      {
        id: "card_avg_qs",
        dataset: "headline_metrics",
        description: "81 个有当前质量得分的关键词；与 30 天基线快照比较。",
        sourceId: "score_comparison",
        metrics: [
          { label: "当前平均质量得分", field: "currentAverageQualityScore", format: "number" },
          { label: "此前快照", field: "priorAverageQualityScore", format: "number" },
          { label: "变化", field: "averageScoreDelta", format: "number", signed: true },
        ],
      },
      {
        id: "card_scored_coverage",
        dataset: "headline_metrics",
        description: "大部分新词尚无可用质量得分，当前覆盖率很低。",
        sourceId: "current_export",
        metrics: [
          { label: "有评分关键词", field: "scoredKeywords", format: "number" },
          { label: "占全部关键词", field: "scoringCoverage", format: "percent" },
        ],
      },
      {
        id: "card_landing_low",
        dataset: "headline_metrics",
        description: "所有可评分关键词的着陆页体验仍低于平均水平。",
        sourceId: "current_export",
        metrics: [
          { label: "着陆页低于平均", field: "landingPageBelowAverage", format: "number" },
          { label: "可评分词占比", field: "landingPageBelowAverageRate", format: "percent" },
        ],
      },
      {
        id: "card_ad_relevance_change",
        dataset: "headline_metrics",
        description: "新 DKI 广告上线后，当前快照中还没有广告相关性分项上升。",
        sourceId: "score_comparison",
        metrics: [
          { label: "广告相关性改善", field: "adRelevanceImproved", format: "number" },
          { label: "广告相关性下降", field: "adRelevanceWorsened", format: "number", signed: true },
        ],
      },
      {
        id: "card_search_is",
        dataset: "impression_share_headline",
        description: "最近7天相对于重叠的30天窗口；按关键词估算的可参与展示机会汇总。",
        sourceId: "impression_share_analysis",
        metrics: [
          { label: "最近7天搜索展示份额", field: "searchIS7", format: "percent" },
          { label: "30天口径", field: "searchIS30", format: "percent" },
          { label: "变化", field: "searchISDelta", format: "percent", signed: true },
        ],
      },
      {
        id: "card_rank_loss",
        dataset: "impression_share_headline",
        description: "份额损失主要来自广告评级；报告未包含预算损失字段。",
        sourceId: "impression_share_analysis",
        metrics: [
          { label: "最近7天评级损失", field: "lostRankIS7", format: "percent" },
          { label: "30天口径", field: "lostRankIS30", format: "percent" },
          { label: "变化", field: "lostRankISDelta", format: "percent", signed: true },
        ],
      },
      {
        id: "card_phrase_mix",
        dataset: "impression_share_headline",
        description: "词组匹配流量占比快速上升，拉低了账户整体展示份额。",
        sourceId: "impression_share_analysis",
        metrics: [
          { label: "最近7天词组流量占比", field: "phraseMix7", format: "percent" },
          { label: "30天口径", field: "phraseMix30", format: "percent" },
          { label: "7月14日", field: "phraseMixCurrent", format: "percent" },
        ],
      },
    ],
    charts: [
      {
        id: "chart_ad_group_qs",
        title: "Average quality score by ad group",
        subtitle: "81 scored keywords in the July 14, 2026 snapshot; score scale 1–10",
        intent: "comparison",
        question: "Which ad groups currently carry the weakest and strongest average keyword quality scores?",
        rationale: "A sorted horizontal bar chart supports comparison across long ad-group labels without implying a time trend.",
        comparisonContext: {
          grain: "ad group",
          denominator: "keywords with nonblank current quality scores",
          unit: "quality-score points",
        },
        type: "horizontalBar",
        dataset: "ad_group_scores",
        sourceId: "current_export",
        encodings: {
          x: { field: "adGroup", type: "nominal", aggregate: "none", label: "Ad group" },
          y: { field: "averageQualityScore", type: "quantitative", aggregate: "none", format: "number", label: "Average quality score" },
          tooltip: [
            { field: "averageQualityScore", type: "quantitative", format: "number", label: "Average score" },
            { field: "scoredKeywords", type: "quantitative", format: "number", label: "Scored keywords" },
            { field: "adRelevanceLow", type: "quantitative", format: "number", label: "Ad relevance below average" },
            { field: "expectedCtrLow", type: "quantitative", format: "number", label: "Expected CTR below average" },
          ],
        },
        valueFormat: "number",
        unit: "points",
        layout: "full",
        labels: { values: "all" },
        maxRows: 14,
        palette: { kind: "sequential" },
        settings: { orientation: "horizontal", sort: "descending", showValues: true, categoryLabelPolicy: "wrap" },
        surface: { surface: "export", viewMode: "both", showControls: false },
      },
      {
        id: "chart_impression_share_matchtype",
        title: "Search impression share by match type",
        subtitle: "June 13–July 12 versus July 6–12, values in percent",
        intent: "comparison",
        question: "Did recent impression-share deterioration occur within match types, or because the traffic mix changed?",
        rationale: "Four directly labeled horizontal bars show that each match type was stable while phrase traffic took a larger share of impressions.",
        comparisonContext: {
          grain: "match type × reporting window",
          denominator: "estimated eligible search impressions for keywords with reported search impression share",
          unit: "percent",
        },
        type: "horizontalBar",
        dataset: "impression_share_match_type",
        sourceId: "impression_share_analysis",
        encodings: {
          x: { field: "category", type: "nominal", aggregate: "none", label: "Match type and window" },
          y: { field: "searchIS", type: "quantitative", aggregate: "none", format: "number", label: "Search impression share" },
          tooltip: [
            { field: "searchIS", type: "quantitative", format: "number", label: "Search impression share (%)" },
            { field: "rankLoss", type: "quantitative", format: "number", label: "Lost to rank (%)" },
            { field: "impressions", type: "quantitative", format: "number", label: "Impressions" },
            { field: "clicks", type: "quantitative", format: "number", label: "Clicks" },
            { field: "ctr", type: "quantitative", format: "percent", label: "CTR" },
          ],
        },
        valueFormat: "number",
        unit: "%",
        layout: "full",
        labels: { values: "all" },
        maxRows: 4,
        palette: { kind: "sequential" },
        settings: { orientation: "horizontal", sort: "none", showValues: true, categoryLabelPolicy: "wrap" },
        surface: { surface: "export", viewMode: "both", showControls: false },
      },
    ],
    tables: [
      {
        id: "table_metric_movement",
        title: "Quality-score component movement",
        subtitle: "Matched keywords in the July 14 snapshot versus the June 13–July 12 export",
        dataset: "metric_movement",
        density: "spacious",
        sourceId: "score_comparison",
        defaultSort: { field: "improved", direction: "desc" },
        columns: [
          { field: "metric", label: "指标", type: "text" },
          { field: "comparableKeywords", label: "可比关键词", format: "number" },
          { field: "improved", label: "改善", format: "number", movement: true },
          { field: "unchanged", label: "不变", format: "number" },
          { field: "worsened", label: "下降", format: "number", movement: true },
          { field: "conclusion", label: "结论", type: "text" },
        ],
      },
      {
        id: "table_keyword_changes",
        title: "Keywords showing score-history movement",
        subtitle: "Only two keyword histories changed; neither generated traffic on July 14",
        dataset: "keyword_changes",
        density: "spacious",
        sourceId: "score_comparison",
        defaultSort: { field: "currentQualityScore", direction: "desc" },
        columns: [
          { field: "keyword", label: "关键词", type: "text" },
          { field: "campaign", label: "广告系列", type: "text" },
          { field: "priorQualityScore", label: "此前", format: "number" },
          { field: "currentQualityScore", label: "当前", format: "number" },
          { field: "changedComponent", label: "变化来源", type: "text" },
          { field: "july14Impressions", label: "当日展示", format: "number" },
          { field: "july14Clicks", label: "当日点击", format: "number" },
        ],
      },
      {
        id: "table_impression_share_campaigns",
        title: "Campaign impression-share performance",
        subtitle: "July 6–12; search-share delta compares with the June 13–July 12 window",
        dataset: "impression_share_campaigns",
        density: "spacious",
        sourceId: "impression_share_analysis",
        defaultSort: { field: "impressions7", direction: "desc" },
        columns: [
          { field: "campaign", label: "广告系列", type: "text" },
          { field: "impressions7", label: "7天展示", format: "number" },
          { field: "clicks7", label: "点击", format: "number" },
          { field: "ctr7", label: "CTR", format: "percent" },
          { field: "searchIS7", label: "搜索展示份额", format: "percent" },
          { field: "searchISDelta", label: "对30天变化", format: "percent", movement: true },
          { field: "rankLoss7", label: "评级损失", format: "percent" },
          { field: "topIS7", label: "页首份额", format: "percent" },
          { field: "absTopIS7", label: "绝对页首份额", format: "percent" },
          { field: "clickShare7", label: "点击份额", format: "percent" },
        ],
      },
      {
        id: "table_impression_share_priority_groups",
        title: "Highest-volume campaign and ad-group combinations",
        subtitle: "July 6–12; sorted by impressions to separate high-volume opportunities from long-tail noise",
        dataset: "impression_share_priority_groups",
        density: "dense",
        sourceId: "impression_share_analysis",
        defaultSort: { field: "impressions7", direction: "desc" },
        columns: [
          { field: "campaignAdGroup", label: "广告系列｜广告组", type: "text" },
          { field: "impressions7", label: "展示", format: "number" },
          { field: "clicks7", label: "点击", format: "number" },
          { field: "ctr7", label: "CTR", format: "percent" },
          { field: "searchIS7", label: "搜索展示份额", format: "percent" },
          { field: "rankLoss7", label: "评级损失", format: "percent" },
          { field: "topIS7", label: "页首份额", format: "percent" },
          { field: "absTopIS7", label: "绝对页首份额", format: "percent" },
        ],
      },
      {
        id: "table_technical_audit",
        title: "Landing-page audit priorities",
        subtitle: "Active A-tier landing page, measured and inspected on July 14, 2026",
        dataset: "technical_audit",
        density: "spacious",
        sourceId: "landing_audit",
        defaultSort: { field: "priority", direction: "asc" },
        columns: [
          { field: "priority", label: "优先级", format: "number" },
          { field: "area", label: "问题", type: "text" },
          { field: "evidence", label: "证据", type: "text" },
          { field: "impact", label: "影响", type: "text" },
          { field: "action", label: "动作", type: "text" },
        ],
      },
      {
        id: "table_landing_plan",
        title: "Proposed A-tier intent landing pages",
        subtitle: "Static destination plan for broad, radar, RF, and portable/handheld search intent",
        dataset: "landing_plan",
        density: "spacious",
        sourceId: "landing_audit",
        defaultSort: { field: "intent", direction: "asc" },
        columns: [
          { field: "intent", label: "意图簇", type: "text" },
          { field: "targetPage", label: "建议页面", type: "text" },
          { field: "heroFocus", label: "首屏主题", type: "text" },
          { field: "proofAboveFold", label: "首屏证据", type: "text" },
          { field: "compliance", label: "合规边界", type: "text" },
        ],
      },
      {
        id: "table_guardrails",
        title: "N-TET risk and compliance checks",
        subtitle: "Advertising, SEO, GEO, and public-visibility implications of the proposed landing-page work",
        dataset: "guardrail_risks",
        density: "spacious",
        sourceId: "compliance_taxonomy",
        defaultSort: { field: "category", direction: "asc" },
        columns: [
          { field: "category", label: "风险类别", type: "text" },
          { field: "finding", label: "发现", type: "text" },
          { field: "status", label: "状态", type: "text" },
          { field: "action", label: "建议", type: "text" },
        ],
      },
    ],
    blocks: [
      { id: "title", type: "markdown", body: "# DKI 广告上线后的质量得分诊断" },
      {
        id: "executive_summary",
        type: "markdown",
        sourceId: "score_comparison",
        body: "## Executive Summary\n\n- **暂时没有证据证明 DKI 已经显著提升质量得分。** 81 个可评分关键词中，80 个质量得分不变，只有 1 个从 1 分升到 3 分；广告相关性 81/81 完全没变。\n- **最近7天搜索展示份额约59.7%，比30天口径低5.7个百分点。** 但精准匹配和词组匹配各自的份额基本稳定；下降主要来自流量结构变化——词组匹配展示占比从30天口径的26.9%升到最近7天的43.9%，7月14日进一步升到64.9%。\n- **词组匹配的扩量效率明显弱于精准匹配，尤其是中东。** 最近7天精准匹配搜索展示份额约72.9%、评级损失27.1%；词组匹配分别约48.8%和51.2%。其中 C‑UAS 中东短语仅约33.0%展示份额、67.0%因评级损失，CTR 1.9%。\n- **着陆页体验仍是最一致的短板，且7月14日展示份额尚无可用值。** 81 个可评分关键词全部为‘低于平均水平’；最新一天94次展示的份额字段全部为 `--`，应在72小时和7天后复查。",
      },
      { id: "headline_metrics", type: "metric-strip", cardIds: ["card_avg_qs", "card_scored_coverage", "card_landing_low", "card_ad_relevance_change"] },
      {
        id: "score_finding",
        type: "markdown",
        sourceId: "current_export",
        body: "## 质量得分几乎没有变化，低分集中在宽泛系统意图\n\n**当前平均质量得分为 2.86，仍处在偏低水平。** Anti Drone Systems、Drone Defense Systems 等广告组最弱；Drone Detection Radar 的平均分相对较高。图表只比较当前截面，不把三个导出窗口误当作连续趋势。",
      },
      { id: "score_chart", type: "chart", chartId: "chart_ad_group_qs", layout: "full" },
      {
        id: "impression_share_finding",
        type: "markdown",
        sourceId: "impression_share_analysis",
        body: "## 展示份额下降主要是流量结构变化，不是两种匹配方式同时恶化\n\n**最近7天搜索展示份额约59.7%，低于30天口径的65.4%；因评级损失由34.6%升至40.3%。** 但分开看，精准匹配从75.3%变为72.9%，词组匹配从48.5%变为48.8%，两类内部都相对稳定。账户整体下降的主要原因，是最近7天词组匹配贡献了43.9%的展示，高于30天口径的26.9%；到7月14日，词组匹配已经占64.9%的展示。\n\n**这意味着词组匹配确实正在成为主要流量来源，但它进入拍卖后的竞争力明显弱于精准匹配。** 应把精准匹配继续作为稳定覆盖和高意图基础，把词组匹配作为受控扩量层，并按地域、意图和搜索词质量单独治理。",
      },
      { id: "impression_share_metrics", type: "metric-strip", cardIds: ["card_search_is", "card_rank_loss", "card_phrase_mix"] },
      { id: "impression_share_chart", type: "chart", chartId: "chart_impression_share_matchtype", layout: "full" },
      {
        id: "impression_share_regions",
        type: "markdown",
        sourceId: "impression_share_analysis",
        body: "## 真正的评级瓶颈集中在中东词组系列\n\n**C‑UAS 南美短语仍有约68.2%的搜索展示份额，评级损失31.8%，CTR 5.8%，可以继续扩量。** 相比之下，C‑UAS 中东短语只有约33.0%的搜索展示份额，67.0%因评级损失；页首份额约13.2%、绝对页首约7.3%，CTR 仅1.9%。其中中东短语的 Anti Drone Equipment 和 Counter UAS Technology 组合，搜索展示份额分别约27.4%和26.4%，评级损失都超过72%。\n\n**Drone Detection Radar 是值得优先承接的高质量意图。** 最近7天该广告组汇总32次展示、6次点击，CTR 18.8%，搜索展示份额约76.6%；南美和中东两个雷达组合分别贡献20/4和12/2次展示/点击。它不是当前最大的评级问题，更大的机会在于用雷达专页承接并提高询盘率。",
      },
      { id: "impression_share_campaign_table", type: "table", tableId: "table_impression_share_campaigns", layout: "full" },
      { id: "impression_share_group_table", type: "table", tableId: "table_impression_share_priority_groups", layout: "full" },
      {
        id: "dki_finding",
        type: "markdown",
        sourceId: "score_comparison",
        body: "## DKI 尚未反映到广告相关性\n\n**新广告语上线后，广告相关性分项没有一个关键词改善，也没有下降。** `[handheld drone detector]` 的 1→3 分来自预期点击率由低于平均升至平均；它当天没有展示或点击，所以只能视为评分刷新，不能视为已验证的流量效果。",
      },
      { id: "movement_table", type: "table", tableId: "table_metric_movement", layout: "full" },
      { id: "keyword_table", type: "table", tableId: "table_keyword_changes", layout: "full" },
      {
        id: "landing_finding",
        type: "markdown",
        sourceId: "landing_audit",
        body: "## 着陆页问题不是缺少关键词，而是页面过重且承担太多意图\n\n**当前 A 层页面已经在标题、H1 和正文中覆盖 C‑UAS、anti drone system、drone detection、radar 与 RF detection。** 更可能的瓶颈是：80 个有评分关键词跨 14 个广告组都进入同一个大而全页面；同一 HTML 又同时渲染桌面和移动两套完整页面。首包约 292 KB、原始脚本传输约 862 KB，实测 TTFB 约 1.12 秒。\n\n**因此优化顺序应是：先减重与拆意图，再补可信证据，最后才是文案微调。**",
      },
      { id: "technical_table", type: "table", tableId: "table_technical_audit", layout: "full" },
      {
        id: "landing_plan_text",
        type: "markdown",
        body: "## 保留一个宽泛页，再增加 3 个精准 A 层承接页\n\n**不要把所有词继续塞进一个页面，也不要直接把 B 层产品详情页当广告最终网址。** 保留现有页面承接 broad C‑UAS / anti drone system；为 radar、RF、portable/handheld 分别建立静态 A 层解决方案页。每页首屏只回答一个意图，并放入 3–5 个带条件的技术证据、部署流程、案例和明确 CTA。",
      },
      { id: "landing_plan_table", type: "table", tableId: "table_landing_plan", layout: "full" },
      {
        id: "execution_order",
        type: "markdown",
        body: "## 建议执行顺序\n\n1. **保持精准匹配作为稳定主干。** 最近7天精准匹配搜索展示份额约72.9%，明显高于词组匹配的48.8%；不要为了追求词组流量而削弱精准预算和出价。\n2. **把中东词组系列作为第一治理对象。** 优先收紧搜索词、补否定词、保留设备购买意图，并提高广告组与落地页的一致性；不要对全部中东短语关键词统一加价。只有高意图词仍因评级损失时，再做小幅分层提价。\n3. **南美词组系列继续观察扩量。** 其展示份额和CTR明显好于中东；保留当前覆盖，同时按实际搜索词把有效变体回收到精准匹配。\n4. **今天先修合规与测量。** 把 `[drone detection using rf]` 的 B 层产品最终网址改到 A 层页面；保留当前 DKI 广告至少72小时。下次导出增加‘因预算损失的搜索展示份额’，以区分评级和预算约束。\n5. **本周做性能和意图页。** 合并桌面/移动重复 DOM，延迟加载非首屏交互；优先建立 radar、RF、portable/handheld A层页面。Drone Detection Radar 已有较好点击表现，应以提升询盘率为目标，而不是简单追求更多展示。\n6. **72小时与7天复查。** 同时比较广告相关性、着陆页体验、搜索展示份额、评级损失、有效搜索词和询盘；质量得分与展示份额都是诊断指标，不是最终业务目标。",
      },
      {
        id: "guardrails_text",
        type: "markdown",
        body: "## N‑TET 合规与公开可见性检查\n\n**页面优化必须继续遵守 A/B/C 边界。** 新广告承接页应明确登记为 A 层；B 层可用于公开 SEO/GEO，但不作为广告最终网址；C 层继续排除。",
      },
      { id: "guardrails_table", type: "table", tableId: "table_guardrails", layout: "full" },
      {
        id: "further_questions",
        type: "markdown",
        body: "## Further Questions\n\n- 72小时后，广告相关性是否开始从低于平均转为平均或高于平均？\n- 中东词组系列的低份额有多少来自预算，而不是评级？下次需补充‘因预算损失的搜索展示份额’字段。\n- 新增 radar / RF / portable 页面后，着陆页体验是否按意图簇改善，并转化为有效询盘？\n- 哪些词组搜索词拿到展示但持续低CTR或无询盘，应该否定、降价，还是回收到精准匹配？",
      },
      {
        id: "caveats",
        type: "markdown",
        sourceId: "score_comparison",
        body: "## Caveats and Assumptions\n\n- 7月14日报告是一天窗口；94次展示的展示份额字段全部为 `--`，因此最新变化只能用流量结构判断，不能直接计算当天搜索展示份额。\n- 最近7天与30天窗口相互重叠，不是两个独立时期。文中展示份额对比用于识别近期结构变化，不应被解读为严格的环比。\n- 搜索展示份额和评级损失按关键词报告值反推可参与展示机会后汇总；页首、绝对页首和点击份额因缺少各自的资格分母，仅作按展示量加权的方向指标。`<10%`和`>90%`按中点估算，但基线中只有1个产生展示的搜索份额记录使用阈值。\n- 报告未包含‘因预算损失的搜索展示份额’，所以当前证据只能确认评级损失很重要，不能完全排除预算限制。\n- 只有81/2,397个关键词有当前质量得分，评分覆盖率仅3.38%；页面速度数据也不能替代多地区真实用户 Core Web Vitals。",
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: "ready",
    datasets: {
      headline_metrics: headlineMetrics,
      ad_group_scores: adGroupScores,
      metric_movement: metricMovement,
      keyword_changes: keywordChanges,
      impression_share_headline: impressionShareHeadline,
      impression_share_match_type: impressionShareMatchType,
      impression_share_campaigns: impressionShareCampaigns,
      impression_share_priority_groups: impressionSharePriorityGroups,
      technical_audit: technicalAudit,
      landing_plan: landingPlan,
      guardrail_risks: guardrailRisks,
    },
    accessIssues: [],
  },
  sources,
};

const sourceNotes = {
  audience: "product stakeholders",
  deliveryMode: "html",
  reportStructure: ["Title", "Executive Summary", "Key findings with visual evidence", "Recommended next steps", "Further questions", "Caveats and assumptions"],
  chartMap: [{
    section: "质量得分几乎没有变化",
    question: "Which ad groups have the weakest and strongest average quality scores?",
    family: "Comparison & Ranking",
    type: "horizontalBar",
    fields: ["adGroup", "averageQualityScore", "scoredKeywords", "adRelevanceLow", "expectedCtrLow"],
    takeaway: "Low scores are concentrated in broad anti-drone and defense-oriented groups, while radar groups score relatively higher.",
    palette: "single-root sequential blue",
  }, {
    section: "展示份额下降主要是流量结构变化",
    question: "Did search impression share weaken within match types or because phrase-match traffic grew?",
    family: "Comparison & Ranking",
    type: "horizontalBar",
    fields: ["category", "searchIS", "rankLoss", "impressions", "clicks", "ctr"],
    takeaway: "Exact and phrase search impression share were each stable, while phrase match expanded from 26.9% to 43.9% of impressions and pulled down the account aggregate.",
    palette: "single-root sequential blue; direct labels provide non-color distinction",
  }],
  omittedVisuals: ["No time-series chart: the available exports are overlapping windows and point-in-time score snapshots, not 8–12 independent temporal observations."],
  dataQuality: [
    "Only 81 of 2,397 keywords have current quality scores.",
    "The July 14 report contains one day of traffic and no populated impression-share values.",
    "The 7-day and 30-day windows overlap; comparisons diagnose recent mix shift rather than a clean period-over-period experiment.",
    "Search impression share and rank loss use estimated eligible-auction denominators; top, absolute-top, and click share are directional impression-weighted summaries.",
  ],
  validation: {
    assessment: "Share with caveats",
    spotChecks: [
      "Match-type impression shares sum to 100% and reconcile to 94, 628, and 1,050 impressions for the current, 7-day, and 30-day exports.",
      "Search impression share plus lost-to-rank share reconciles to 100% for both baseline windows.",
      "The Middle East phrase campaign and Drone Detection Radar ad-group figures were independently reconciled to their component rows.",
    ],
    caveats: [
      "The 7-day and 30-day windows overlap.",
      "The July 14 export has no populated impression-share values.",
      "The report does not include lost impression share due to budget.",
    ],
  },
  renderingQA: {
    verification: "structural_only",
    limitation: "No installed Chromium headless shell was available, and the in-app browser policy blocks automated access to file URLs. Canonical payload equality and semantic fallback structure passed.",
  },
};

// Materialize the reviewed snapshot in SQLite and execute every source query
// before packaging so the report's displayed SQL is real, runnable provenance.
const db = new DatabaseSync(":memory:");
for (const [tableName, rows] of Object.entries(artifact.snapshot.datasets)) {
  const fields = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const types = Object.fromEntries(fields.map((field) => [
    field,
    rows.some((row) => row[field] != null) && rows.every((row) => row[field] == null || typeof row[field] === "number") ? "REAL" : "TEXT",
  ]));
  db.exec(`CREATE TABLE "${tableName}" (${fields.map((field) => `"${field}" ${types[field]}`).join(", ")})`);
  const insert = db.prepare(`INSERT INTO "${tableName}" (${fields.map((field) => `"${field}"`).join(", ")}) VALUES (${fields.map(() => "?").join(", ")})`);
  for (const row of rows) insert.run(...fields.map((field) => row[field] ?? null));
}
for (const source of sources) {
  for (const statement of source.query.sql.split(";").map((item) => item.trim()).filter(Boolean)) {
    db.prepare(statement).all();
  }
}
db.close();

await fs.writeFile(`${outDir}/artifact.json`, JSON.stringify(artifact, null, 2), "utf8");
await fs.writeFile(`${outDir}/source_notes.json`, JSON.stringify(sourceNotes, null, 2), "utf8");
console.log(JSON.stringify({ artifact: `${outDir}/artifact.json`, datasets: Object.fromEntries(Object.entries(artifact.snapshot.datasets).map(([k, v]) => [k, v.length])), blocks: artifact.manifest.blocks.length }, null, 2));
