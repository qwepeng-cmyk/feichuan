import fs from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";

const outDir = "D:/fc-cuas/outputs/lead_gap_diagnostic_20260715";
const generatedAt = "2026-07-15T09:10:00+08:00";

const confirmedClicks = 42;
const confirmedSpend = 360.57 + 11.09 + 87.90;
const pZero = (rate) => (1 - rate) ** confirmedClicks;

const headline = [{
  confirmedClicks,
  confirmedSpend,
  recordedLeads: 0,
  zeroLeadProbabilityAt1Pct: pZero(0.01),
  southAmericaClickShare: 62 / 68,
  genericLandingClickShare: 66 / 68,
}];

const regionalConcentration = [
  { region: "南美系列", clicks: 62, share: 62 / 68, spend: 697.33 },
  { region: "中东系列", clicks: 6, share: 6 / 68, spend: 73.01 },
];

const zeroLeadProbability = [0.005, 0.01, 0.015, 0.02, 0.03].map((rate) => ({
  assumedLeadRate: rate,
  assumedLeadRateLabel: `${(rate * 100).toFixed(1)}%`,
  expectedLeads: confirmedClicks * rate,
  probabilityOfZero: pZero(rate),
}));

const funnelEvidence = [
  {
    stage: "点击样本",
    evidence: "7月6日至14日可确认42次点击、花费约¥459.56、0次Ads转化；7月3日至5日缺少按日报告。",
    diagnosis: "量还不足以单独证明异常。假设真实询盘率1%，42次点击零询盘概率仍约65.6%。",
    confidence: "高",
  },
  {
    stage: "搜索意图",
    evidence: "30天68次点击中，精准匹配56次，但历史搜索词仍出现普通无人机、竞品、软件、online radar及西语/葡语变体。",
    diagnosis: "“精准匹配”只控制匹配接近度，不等于采购意图精准；设备采购与研究/导航意图仍混在一起。",
    confidence: "中高（同期搜索词缺失）",
  },
  {
    stage: "地区与语言",
    evidence: "30天68次点击中62次来自南美系列，占91.2%。",
    diagnosis: "英语广告与英语通用页面承接南美本地语言查询，信息理解和信任成本更高。",
    confidence: "高",
  },
  {
    stage: "落地页匹配",
    evidence: "66/68次点击（97.1%）进入同一个low-altitude通用页；只有1次进入具体RF产品页。",
    diagnosis: "detector、radar、portable/handheld与宽泛C-UAS被同一首屏承接，用户难以快速确认产品是否匹配。",
    confidence: "高",
  },
  {
    stage: "页面与表单",
    evidence: "公开HTML约200KB，表单靠近长页面底部并在客户端加载；Name、Email、Phone/WhatsApp、Message四项必填。",
    diagnosis: "移动端冷流量需要先读长页面，再完成高摩擦表单，容易在提交前流失。",
    confidence: "高",
  },
  {
    stage: "转化测量",
    evidence: "GA4报告中/thank-you有6次浏览、4名活跃用户，但关键事件仍为0；感谢页打开即触发Ads转化。",
    diagnosis: "GA4关键事件配置不完整；Ads触发又缺少提交令牌，当前“0转化”不能等同于“0真实询盘”。",
    confidence: "高",
  },
  {
    stage: "通知链路",
    evidence: "API先写入SQLite，再发邮件；邮件失败会被捕获，但接口仍返回success并跳转感谢页。",
    diagnosis: "如果只查看邮箱，可能漏掉已写入后台但通知失败的询盘。必须先核对/admin/inquiries。",
    confidence: "高（生产库尚未读取）",
  },
];

const landingMap = [
  { intent: "Broad C-UAS / anti drone system", destination: "/solutions/low-altitude-airspace-monitoring", action: "保留为宽泛系统意图页；首屏明确监测能力、应用场景、Get Specs和Request Quote。" },
  { intent: "Drone detector / detection equipment", destination: "/solutions/drone-detector", action: "专门承接detector设备词，首屏给设备形态、探测方式、部署方式和询价入口。" },
  { intent: "Drone radar / UAV detection radar", destination: "/solutions/drone-radar-detection", action: "承接radar词，首屏突出探测对象、覆盖条件、RF/EO协同和规格索取。" },
  { intent: "Portable / handheld drone detector", destination: "/solutions/portable-drone-detection", action: "承接便携设备词，首屏突出重量、续航、部署时间、使用流程和限制条件。" },
];

const actionPlan = [
  { priority: 1, timing: "今天", owner: "销售/网站管理员", action: "登录/admin/inquiries筛选7月3日至今，并与收件邮箱逐条核对。", success: "确认到底是0提交，还是有后台记录但SMTP通知失败。" },
  { priority: 2, timing: "今天", owner: "技术+投放", action: "做1次受控测试询盘：后台新增、邮件送达、GA4 DebugView generate_lead、Ads转化各验证一次。", success: "同一次真实提交只记录一次，四个环节证据一致。" },
  { priority: 3, timing: "1–2天", owner: "技术", action: "将GA4 generate_lead或ntet_form_submit标为关键事件；感谢页仅在成功提交带一次性标记时触发转化。", success: "直接访问/thank-you不再产生Ads转化，真实提交稳定计数。" },
  { priority: 4, timing: "1–3天", owner: "投放", action: "导出7月3日至今搜索字词，必须包含日期、国家、设备、匹配方式、关键词、最终网址和费用。", success: "能把每一笔点击按采购意图、语言、地区和页面归因。" },
  { priority: 5, timing: "本周", owner: "投放", action: "暂停/降价竞品、普通无人机、online、app、software等噪音；有效词组变体回收到精准匹配。", success: "设备采购意图点击占比提高，非采购查询费用下降。" },
  { priority: 6, timing: "本周", owner: "网站", action: "按detector、radar、portable/handheld拆分A层最终网址；通用词才留在low-altitude页。", success: "每个广告组只对应一个首屏意图，Google Ads着陆页体验逐步改善。" },
  { priority: 7, timing: "本周", owner: "网站", action: "首屏增加Get Specs / Request Quote / WhatsApp；首步仅保留姓名+邮箱或WhatsApp，详情改为可选或第二步。", success: "表单开始率、完成率和WhatsApp点击率可被单独测量。" },
];

const sourceCodeChecks = [
  { file: "src/components/products/InquiryForm.tsx", lines: "123–134, 203/228/241/271", finding: "提交API成功后跳转感谢页；四个字段required。" },
  { file: "src/app/api/inquiries/route.ts", lines: "24–68", finding: "先插入并回查SQLite；邮件通知失败只记录日志，仍返回success。" },
  { file: "src/components/tracking/LeadConversionTracker.tsx", lines: "14–39", finding: "打开感谢页即推送ntet_form_submit、generate_lead和Ads转化。" },
  { file: "src/components/tracking/googleAdsConversion.ts", lines: "10–27", finding: "通过gtag和dataLayer发送Google Ads conversion事件。" },
];

const sources = [
  { id: "ads_window", label: "Google Ads关键词报告：30天、7天及7月14日快照" },
  { id: "search_terms", label: "Google Ads搜索字词报告（所有时间，仅用于识别历史噪音类型）" },
  { id: "ga4_pages", label: "GA4网页和屏幕报告：2026-06-12至2026-07-08" },
  { id: "site_code", label: "N-TET表单、API和转化追踪源码" },
  { id: "live_page", label: "公开落地页HTTP与HTML只读检查", href: "https://n-tet.com/solutions/low-altitude-airspace-monitoring" },
];

const sourceSql = {
  ads_window: "SELECT * FROM headline; SELECT * FROM regional_concentration; SELECT * FROM zero_lead_probability;",
  search_terms: "SELECT * FROM funnel_evidence WHERE stage = '搜索意图';",
  ga4_pages: "SELECT * FROM funnel_evidence WHERE stage = '转化测量';",
  site_code: "SELECT * FROM source_code_checks; SELECT * FROM action_plan ORDER BY priority;",
  live_page: "SELECT * FROM funnel_evidence WHERE stage IN ('落地页匹配','页面与表单'); SELECT * FROM landing_map;",
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
    title: "搜索广告持续点击但零询盘：7月3日至今诊断",
    description: "重建广告点击—落地页—表单—后台—GA4/Google Ads转化链路，区分统计波动、流量质量和测量故障。",
    generatedAt,
    sources,
    cards: [
      { id: "card_clicks", dataset: "headline", description: "7月6日至14日可确认数据；7月3日至5日缺少按日报告。", sourceId: "ads_window", metrics: [{ label: "确认点击", field: "confirmedClicks", format: "number" }, { label: "确认花费", field: "confirmedSpend", format: "currency" }, { label: "Ads记录询盘", field: "recordedLeads", format: "number" }] },
      { id: "card_probability", dataset: "headline", description: "假设每次点击独立且真实询盘率为1%。", sourceId: "ads_window", metrics: [{ label: "42次点击零询盘概率", field: "zeroLeadProbabilityAt1Pct", format: "percent" }] },
      { id: "card_region", dataset: "headline", description: "30天关键词报告中的点击结构。", sourceId: "ads_window", metrics: [{ label: "南美点击占比", field: "southAmericaClickShare", format: "percent" }] },
      { id: "card_landing", dataset: "headline", description: "30天68次点击中66次进入同一通用页。", sourceId: "ads_window", metrics: [{ label: "通用页点击占比", field: "genericLandingClickShare", format: "percent" }] },
    ],
    charts: [
      {
        id: "chart_region",
        title: "点击量高度集中在南美系列",
        subtitle: "2026-06-13至2026-07-12，按系列区域汇总",
        intent: "comparison",
        question: "点击主要来自哪个地区系列？",
        rationale: "横向条形图直接显示地区集中度。",
        comparisonContext: { grain: "地区系列", denominator: "68次点击", unit: "clicks" },
        type: "horizontalBar",
        dataset: "regional_concentration",
        sourceId: "ads_window",
        encodings: {
          x: { field: "region", type: "nominal", aggregate: "none", label: "地区系列" },
          y: { field: "clicks", type: "quantitative", aggregate: "none", format: "number", label: "点击" },
          tooltip: [
            { field: "clicks", type: "quantitative", format: "number", label: "点击" },
            { field: "share", type: "quantitative", format: "percent", label: "点击占比" },
            { field: "spend", type: "quantitative", format: "currency", label: "花费" },
          ],
        },
        valueFormat: "number", unit: "clicks", layout: "full", labels: { values: "all" }, maxRows: 5,
        palette: { kind: "sequential" },
        settings: { orientation: "horizontal", sort: "descending", showValues: true, categoryLabelPolicy: "wrap" },
        surface: { surface: "export", viewMode: "both", showControls: false },
      },
      {
        id: "chart_probability",
        title: "42次点击仍可能自然出现零询盘",
        subtitle: "不同真实询盘率假设下，观察到0个询盘的概率",
        intent: "comparison",
        question: "42次点击、0询盘在统计上有多异常？",
        rationale: "概率条形图让样本量与询盘率的关系直观可见。",
        comparisonContext: { grain: "假设询盘率", denominator: "42次点击", unit: "probability" },
        type: "horizontalBar",
        dataset: "zero_lead_probability",
        sourceId: "ads_window",
        encodings: {
          x: { field: "assumedLeadRateLabel", type: "nominal", aggregate: "none", label: "假设询盘率" },
          y: { field: "probabilityOfZero", type: "quantitative", aggregate: "none", format: "percent", label: "零询盘概率" },
          tooltip: [
            { field: "probabilityOfZero", type: "quantitative", format: "percent", label: "零询盘概率" },
            { field: "expectedLeads", type: "quantitative", format: "number", label: "期望询盘数" },
          ],
        },
        valueFormat: "percent", unit: "probability", layout: "full", labels: { values: "all" }, maxRows: 10,
        palette: { kind: "sequential" },
        settings: { orientation: "horizontal", sort: "descending", showValues: true, categoryLabelPolicy: "wrap" },
        surface: { surface: "export", viewMode: "both", showControls: false },
      },
    ],
    tables: [
      { id: "table_funnel", title: "点击到询盘的七层证据", subtitle: "按漏斗顺序区分统计、意图、页面、表单和测量问题", dataset: "funnel_evidence", density: "spacious", sourceId: "ads_window", columns: [
        { field: "stage", label: "环节", type: "text" }, { field: "evidence", label: "证据", type: "text" }, { field: "diagnosis", label: "判断", type: "text" }, { field: "confidence", label: "置信度", type: "text" },
      ] },
      { id: "table_landing_map", title: "关键词意图—A层落地页映射", subtitle: "不再让97%的点击都进入同一个通用页面", dataset: "landing_map", density: "spacious", sourceId: "live_page", columns: [
        { field: "intent", label: "关键词意图", type: "text" }, { field: "destination", label: "建议最终网址", type: "text" }, { field: "action", label: "承接要求", type: "text" },
      ] },
      { id: "table_actions", title: "按优先级执行的整改清单", subtitle: "先确认是否真的零提交，再改测量、流量和页面", dataset: "action_plan", density: "spacious", sourceId: "site_code", defaultSort: { field: "priority", direction: "asc" }, columns: [
        { field: "priority", label: "优先级", format: "number" }, { field: "timing", label: "时间", type: "text" }, { field: "owner", label: "负责人", type: "text" }, { field: "action", label: "动作", type: "text" }, { field: "success", label: "完成标准", type: "text" },
      ] },
      { id: "table_code", title: "表单与转化代码核验", subtitle: "本地源码只读检查", dataset: "source_code_checks", density: "spacious", sourceId: "site_code", columns: [
        { field: "file", label: "文件", type: "text" }, { field: "lines", label: "行", type: "text" }, { field: "finding", label: "发现", type: "text" },
      ] },
    ],
    blocks: [
      { id: "title", type: "markdown", body: "# 搜索广告持续点击但零询盘：7月3日至今诊断" },
      { id: "executive_summary", type: "markdown", sourceId: "ads_window", body: "## Executive Summary\n\n- **这不是一个单一的‘广告失灵’问题。** 当前最合理的解释是：样本量仍小，加上搜索意图/语言错配、97%点击进入同一通用页、四项必填表单，以及不完整的转化测量共同叠加。\n- **零询盘还没有达到统计异常。** 7月6日至14日可确认42次点击；如果真实询盘率只有1%，零询盘概率仍约65.6%；即使询盘率2%，概率也约42.8%。\n- **但现在不能相信‘Ads 0转化 = 真实0询盘’。** GA4中感谢页有访问却没有关键事件；网站又允许邮件通知失败后仍返回成功。因此第一步不是继续加预算，而是核对后台询盘库和SMTP。\n- **流量与页面的主要结构问题已经明确。** 30天68次点击中91.2%来自南美系列，97.1%进入同一英语通用页；精准匹配也可能包含研究、竞品、普通无人机和本地语言意图。" },
      { id: "metrics", type: "metric-strip", cardIds: ["card_clicks", "card_probability", "card_region", "card_landing"] },
      { id: "probability_text", type: "markdown", sourceId: "ads_window", body: "## 先纠正一个直觉：花了钱不等于小样本必然出询盘\n\nB2B安防设备询盘率若只有0.5%–2%，几十次点击完全可能暂时为零。当前数据需要警惕，但还不能只凭42次点击断定账户或网站出现致命故障。真正需要追查的是：这些点击有多少是采购意图、访问后做了什么、提交是否进入后台、转化是否被正确记录。" },
      { id: "probability_chart", type: "chart", chartId: "chart_probability", layout: "full" },
      { id: "region_text", type: "markdown", sourceId: "ads_window", body: "## 最大的商业错配发生在南美流量与英语通用页之间\n\n南美系列贡献62/68次点击。即使当地采购商能使用英语，用户实际搜索仍可能是西语或葡语表达；当广告承诺、搜索词和页面首屏不是同一设备意图时，用户会把页面当成泛介绍页，而不是可快速索取规格和报价的采购入口。" },
      { id: "region_chart", type: "chart", chartId: "chart_region", layout: "full" },
      { id: "funnel_text", type: "markdown", body: "## 原因排序：样本量解释‘为什么可能为零’，其余六层解释‘为什么询盘率可能偏低’\n\n下面的证据不能全部量化为同一权重，但可以形成排查顺序：先确认是否真的没有提交，再检查测量链路；然后治理搜索意图和页面匹配，最后降低表单摩擦。" },
      { id: "funnel_table", type: "table", tableId: "table_funnel", layout: "full" },
      { id: "measurement_text", type: "markdown", sourceId: "site_code", body: "## 最优先排查的不是广告，而是‘后台已保存、邮件没收到’\n\n表单API会先把询盘写入SQLite并回查成功，再尝试发送通知邮件；邮件失败只写日志，接口仍返回success并跳转感谢页。因此如果你平时只通过邮箱判断有没有询盘，就存在漏判。与此同时，感谢页可直接访问，打开后即发送GA4和Ads转化，未来又可能误报。当前测量链路同时存在漏报和误报风险。" },
      { id: "code_table", type: "table", tableId: "table_code", layout: "full" },
      { id: "landing_text", type: "markdown", sourceId: "live_page", body: "## 页面策略：保留通用页，但把设备意图导向专门A层页面\n\n`anti drone`、`counter drone`、`C-UAS`等行业类别词可公开用于A层广告承接；主动干扰、诱骗、迫降和武器化表述仍限制。detector、radar、portable/handheld应分别进入与首屏承诺一致的页面，而不是继续全部塞入low-altitude通用页。" },
      { id: "landing_table", type: "table", tableId: "table_landing_map", layout: "full" },
      { id: "actions_text", type: "markdown", body: "## Recommended Next Steps\n\n执行顺序很重要：**先查后台、再做受控测试、再修测量，然后才扩预算或继续加词。** 否则即使产生真实询盘，也可能因为SMTP或事件配置问题继续显示为0。" },
      { id: "actions_table", type: "table", tableId: "table_actions", layout: "full" },
      { id: "further_questions", type: "markdown", body: "## Further Questions\n\n- `/admin/inquiries`中7月3日至今到底有多少条记录？这些记录与邮箱通知能否一一对应？\n- 7月3日至今的搜索字词按国家、设备、日期拆开后，真正的设备采购意图点击占比是多少？\n- 南美点击中西语、葡语和英语搜索各占多少？是否应先做西语/葡语首屏或至少本地化CTA？\n- 用户有多少到达表单、开始填写、触发校验错误并完成提交？目前缺少这组微转化事件。" },
      { id: "caveats", type: "markdown", sourceId: "ads_window", body: "## Caveats and Assumptions\n\n- 30天导出覆盖6月13日至7月12日，7天导出覆盖7月6日至12日；另有7月13日2次点击和7月14日8次点击。因此可确认7月6日至14日42次点击，但缺少7月3日至5日按日数据。\n- 搜索字词报告是所有时间口径，只能证明账户历史上出现过哪些噪音类型，不能直接断言它们在7月3日至今各占多少。\n- GA4页面报告覆盖6月12日至7月8日，与广告窗口不完全一致。\n- 无法通过SSH读取生产SQLite，因此尚未直接确认后台询盘数量、SMTP环境变量和服务器邮件日志。\n- 概率计算假设每次点击独立且询盘率固定，只用于说明样本不确定性，不代表真实账户询盘率。" },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: "ready",
    datasets: {
      headline,
      regional_concentration: regionalConcentration,
      zero_lead_probability: zeroLeadProbability,
      funnel_evidence: funnelEvidence,
      landing_map: landingMap,
      action_plan: actionPlan,
      source_code_checks: sourceCodeChecks,
    },
    accessIssues: [],
  },
  sources,
};

const sourceNotes = {
  audience: "product stakeholders",
  deliveryMode: "html",
  reportStructure: ["Title", "Executive Summary", "Key findings with visual evidence", "Recommended next steps", "Further questions", "Caveats and assumptions"],
  chartMap: [
    { section: "零询盘的统计可能性", question: "42次点击、0询盘在不同真实询盘率下有多异常？", family: "Comparison & Ranking", type: "horizontalBar", fields: ["assumedLeadRateLabel", "probabilityOfZero", "expectedLeads"], takeaway: "At 1%–2% true lead rate, zero leads after 42 clicks remains plausible.", palette: "single-root sequential blue" },
    { section: "地区集中度", question: "68次点击主要来自哪个地区系列？", family: "Comparison & Ranking", type: "horizontalBar", fields: ["region", "clicks", "share", "spend"], takeaway: "South America generated 91.2% of clicks, magnifying language and intent mismatch risk.", palette: "single-root sequential blue" },
  ],
  omittedVisuals: ["No time-series chart: the available exports are overlapping windows and do not provide daily data for July 3–5."],
  dataQuality: [
    "July 3–5 daily data is missing.",
    "The search-term report is all-time, not restricted to the diagnostic window.",
    "The GA4 page report ends on July 8 and does not align perfectly with the ad windows.",
    "Production inquiry records and SMTP logs could not be queried over SSH.",
  ],
  validation: {
    assessment: "Share with caveats",
    spotChecks: [
      "Thirty-day click, cost, conversion, campaign-region, match-type, and final-URL totals reconcile to the source export.",
      "The July 6–14 confirmed click total reconciles as 32 + 2 + 8 = 42.",
      "Form submission, database persistence, email exception handling, thank-you redirect, and conversion events were checked in source code.",
    ],
    caveats: ["Production database and SMTP logs remain unverified."],
  },
};

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
  for (const statement of source.query.sql.split(";").map((item) => item.trim()).filter(Boolean)) db.prepare(statement).all();
}
db.close();

await fs.writeFile(`${outDir}/artifact.json`, JSON.stringify(artifact, null, 2), "utf8");
await fs.writeFile(`${outDir}/source_notes.json`, JSON.stringify(sourceNotes, null, 2), "utf8");
console.log(JSON.stringify({ artifact: `${outDir}/artifact.json`, blocks: artifact.manifest.blocks.length, datasets: Object.fromEntries(Object.entries(artifact.snapshot.datasets).map(([key, rows]) => [key, rows.length])) }, null, 2));
