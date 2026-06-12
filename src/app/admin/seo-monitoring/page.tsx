import { Activity, AlertTriangle, BarChart3, Bot, Braces, FileJson, FileText, SearchCheck, ShieldCheck } from 'lucide-react';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import styles from './seoMonitoring.module.css';

export const dynamic = 'force-dynamic';

type TierCounts = {
  normal: number;
  neutral_seo: number;
  restricted: number;
  public: number;
  total: number;
};

type SourceCheck = {
  path: string;
  exists: boolean;
  hasJsonLd: boolean;
  importsJsonLd: boolean;
  hasGenerateMetadata: boolean;
};

type BuildHtmlCheck = {
  label: string;
  path: string;
  exists: boolean;
  bytes: number;
  jsonLdScripts: number;
};

type SeoSnapshot = {
  date: string;
  generatedAt: string;
  siteUrl: string;
  content: {
    publicRecords: number;
    restrictedRecords: number;
    byTypeAndTier: Record<string, TierCounts>;
  };
  llms: {
    urlCount: number;
    privatePathLeaks: string[];
    restrictedLeaks: string[];
  };
  robots: {
    hasSitemap: boolean;
    disallowsAdmin: boolean;
    disallowsApi: boolean;
    disallowsPreview: boolean;
    aiCrawlers: string[];
  };
  sitemap: {
    declaredUrls: string[];
    localFileExists: boolean;
  };
  schema: {
    coveredPublicRecords: number;
    missingPublicRecords: number;
  };
  sourceChecks: Record<string, SourceCheck>;
  buildHtml: BuildHtmlCheck[];
  risks: string[];
};

type KeywordRow = {
  keyword: string;
  locale: string;
  target_url: string;
  intent: string;
  tier: string;
  priority: string;
  source: string;
  notes: string;
};

type DataSourceStatus = {
  module: string;
  primarySource: string;
  currentStatus: string;
  nextAction: string;
};

const DATA_SOURCE_STATUS: DataSourceStatus[] = [
  {
    module: '抓取监控',
    primarySource: 'Cloudflare GraphQL Analytics / Nginx access log / robots.txt / sitemap.xml',
    currentStatus: '站内 robots + sitemap 快照已可用；Cloudflare Token 待配置',
    nextAction: '配置 CLOUDFLARE_API_TOKEN、CLOUDFLARE_ZONE_ID 后拉取 Googlebot / Bingbot / AI crawler 抓取日志',
  },
  {
    module: '收录监控',
    primarySource: 'Google Search Console URL Inspection / Sitemaps；Yandex 暂不接',
    currentStatus: '本地公开 URL、llms.txt、Schema 覆盖已可用；GSC 凭证待接入',
    nextAction: '用 GSC 检查重点 URL indexStatusResult、sitemap 提交状态和新页面收录延迟',
  },
  {
    module: '排名监控',
    primarySource: '关键词目标表 / GSC Search Analytics / Semrush CSV / DataForSEO 空位',
    currentStatus: '已读取 docs/seo/page-seo-keyword-targets-2026-06-10.csv',
    nextAction: '先用 GSC 平均排名和 Semrush 批量导出补充 rank、volume、KD、competitor',
  },
  {
    module: '流量监控',
    primarySource: 'GSC / GA4 / Cloudflare Analytics / 询盘数据',
    currentStatus: '后台询盘数据已在系统内；自然搜索流量源待接入',
    nextAction: '按 URL 聚合 clicks、impressions、CTR、organic sessions、inquiries',
  },
];

function latestSnapshotPath() {
  const historyDir = join(process.cwd(), 'docs', 'seo-monitoring', 'history');
  if (!existsSync(historyDir)) return null;

  const files = readdirSync(historyDir)
    .filter((file) => /^seo-monitoring-snapshot-\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .sort();

  if (!files.length) return null;
  return join(historyDir, files[files.length - 1]);
}

function readLatestSnapshot() {
  const filePath = latestSnapshotPath();
  if (!filePath) return null;

  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as SeoSnapshot;
  } catch {
    return null;
  }
}

function readLatestReport(snapshot?: SeoSnapshot | null) {
  if (!snapshot) return '';
  const reportPath = join(process.cwd(), 'docs', 'seo-monitoring', `snapshot-${snapshot.date}.md`);
  return existsSync(reportPath) ? readFileSync(reportPath, 'utf8') : '';
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === ',' && !quoted) {
      cells.push(current);
      current = '';
      continue;
    }
    current += char;
  }

  cells.push(current);
  return cells;
}

function readKeywords() {
  const targetPath = join(process.cwd(), 'docs', 'seo', 'page-seo-keyword-targets-2026-06-10.csv');
  const seedPath = join(process.cwd(), 'docs', 'seo-monitoring', 'keywords.csv');
  const filePath = existsSync(targetPath) ? targetPath : seedPath;
  if (!existsSync(filePath)) return [];

  const rows = readCsvFile(filePath);
  if (filePath === targetPath) {
    return rows
      .filter((row) => row.primary_keyword && row.route)
      .slice(0, 80)
      .map((row) => ({
        keyword: row.primary_keyword,
        locale: row.locale || 'en',
        target_url: row.route,
        intent: row.page_type || 'page-target',
        tier: row.compliance_tier || 'normal',
        priority: Number(row.audit_score || 0) < 50 ? 'P0' : Number(row.audit_score || 0) < 70 ? 'P1' : 'P2',
        source: row.target_source || 'page-seo-keyword-targets',
        notes: `${row.audit_status || 'unknown'} / ${row.target_cluster || ''}`.trim(),
      }));
  }

  return rows as KeywordRow[];
}

function readCsvFile(filePath: string) {
  const lines = readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [headerLine, ...rows] = lines;
  if (!headerLine) return [];

  const headers = parseCsvLine(headerLine);
  return rows.map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ''])) as Record<string, string>;
  });
}

function formatKb(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function statusBadge(ok: boolean, goodText = '正常', warnText = '需检查') {
  return <span className={`${styles.badge} ${ok ? styles.badgeGood : styles.badgeWarn}`}>{ok ? goodText : warnText}</span>;
}

function metric(label: string, value: string | number, helper?: string) {
  return (
    <div className={styles.metricRow}>
      <span className={styles.metricName}>
        {label}
        {helper ? <small>{helper}</small> : null}
      </span>
      <span className={styles.metricValue}>{value}</span>
    </div>
  );
}

export default function SeoMonitoringPage() {
  const snapshot = readLatestSnapshot();
  const report = readLatestReport(snapshot);
  const keywords = readKeywords();

  if (!snapshot) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>SEO Operations</div>
            <h1 className={styles.title}>SEO 监控</h1>
            <p className={styles.subtitle}>还没有监控快照。先在本地运行命令生成第一份报告。</p>
          </div>
          <code className={styles.command}>npm run monitor:seo</code>
        </div>
        <div className={styles.missing}>未找到 docs/seo-monitoring/history/*.json</div>
      </div>
    );
  }

  const hasLeaks = snapshot.llms.restrictedLeaks.length > 0 || snapshot.llms.privatePathLeaks.length > 0;
  const allRobotsGates =
    snapshot.robots.hasSitemap &&
    snapshot.robots.disallowsAdmin &&
    snapshot.robots.disallowsApi &&
    snapshot.robots.disallowsPreview;
  const buildHtmlOk = snapshot.buildHtml.every((item) => item.exists && item.jsonLdScripts > 0);

  const flowSteps = [
    { title: '抓取', value: snapshot.robots.aiCrawlers.length, unit: 'AI / 搜索爬虫规则', status: allRobotsGates ? '入口正常' : '入口需检查' },
    { title: '收录', value: snapshot.content.publicRecords, unit: '公开 A/B 记录', status: hasLeaks ? '存在泄漏风险' : '公开集合正常' },
    { title: '排名', value: keywords.length, unit: '关键词目标页', status: '等待 GSC / Semrush 排名数据' },
    { title: '流量', value: 'GSC', unit: '待接入', status: '等待 Search Console 凭证' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>SEO Operations</div>
          <h1 className={styles.title}>SEO 监控</h1>
          <p className={styles.subtitle}>
            按搜索引擎链路组织监控：先确认抓取，再看收录，然后跟踪排名，最后观察自然流量和转化。
          </p>
          <p className={styles.monoPath}>Latest snapshot: docs/seo-monitoring/history/seo-monitoring-snapshot-{snapshot.date}.json</p>
        </div>
        <code className={styles.command}>npm run monitor:seo</code>
      </div>

      <section className={styles.flowGrid}>
        {flowSteps.map((step, index) => (
          <div className={styles.flowCard} key={step.title}>
            <div className={styles.flowIndex}>{index + 1}</div>
            <div>
              <div className={styles.flowTitle}>{step.title}</div>
              <div className={styles.flowValue}>{step.value}</div>
              <div className={styles.flowUnit}>{step.unit}</div>
              <div className={styles.flowStatus}>{step.status}</div>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <Activity size={18} /> 数据源接入状态
          </h2>
          <span className={`${styles.badge} ${styles.badgeWarn}`}>凭证待接入</span>
        </div>
        <div className={styles.sourceGrid}>
          {DATA_SOURCE_STATUS.map((item) => (
            <div className={styles.sourceCard} key={item.module}>
              <div className={styles.sourceModule}>{item.module}</div>
              <div className={styles.sourceText}>{item.primarySource}</div>
              <div className={styles.sourceStatus}>{item.currentStatus}</div>
              <div className={styles.sourceNext}>{item.nextAction}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.panelGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <Bot size={18} /> 1. 抓取监控
            </h2>
            {statusBadge(allRobotsGates, 'Robots OK', '检查 robots')}
          </div>
          <div className={styles.metricList}>
            {metric('Sitemap 声明', snapshot.robots.hasSitemap ? 'yes' : 'no', 'robots 是否指向 sitemap')}
            {metric('禁止 /admin', snapshot.robots.disallowsAdmin ? 'yes' : 'no', '后台不能被抓取')}
            {metric('禁止 /api', snapshot.robots.disallowsApi ? 'yes' : 'no', '接口不能被抓取')}
            {metric('禁止 preview', snapshot.robots.disallowsPreview ? 'yes' : 'no', '预览路径不能公开')}
            {metric('AI crawler rules', snapshot.robots.aiCrawlers.length, 'GPTBot / ClaudeBot 等')}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <FileText size={18} /> 抓取 HTML 抽样
            </h2>
            {statusBadge(buildHtmlOk, 'HTML OK', '检查 HTML')}
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Exists</th>
                  <th>Size</th>
                  <th>JSON-LD</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.buildHtml.map((item) => (
                  <tr key={item.label}>
                    <td>{item.label}</td>
                    <td>{item.exists ? 'yes' : 'no'}</td>
                    <td>{formatKb(item.bytes)}</td>
                    <td>{item.jsonLdScripts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.panelGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <ShieldCheck size={18} /> 2. 收录监控
            </h2>
            {statusBadge(!hasLeaks, '公开集合正常', '泄漏风险')}
          </div>
          <div className={styles.metricList}>
            {metric('公开 A/B 记录', snapshot.content.publicRecords, '允许进入 SEO/GEO')}
            {metric('C 层 restricted', snapshot.content.restrictedRecords, '默认不公开输出')}
            {metric('llms.txt URL', snapshot.llms.urlCount, hasLeaks ? '存在泄漏风险' : '无 C 层泄漏')}
            {metric('本地 sitemap 文件', snapshot.sitemap.localFileExists ? 'exists' : 'missing', '线上可用时需复核')}
            {metric('Schema 覆盖', `${snapshot.schema.coveredPublicRecords}/${snapshot.content.publicRecords}`, '公开记录结构化数据')}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <Braces size={18} /> A/B/C 内容分布
            </h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>Public</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(snapshot.content.byTypeAndTier).map(([type, counts]) => (
                  <tr key={type}>
                    <td>{type}</td>
                    <td>{counts.normal}</td>
                    <td>{counts.neutral_seo}</td>
                    <td>{counts.restricted}</td>
                    <td>{counts.public}</td>
                    <td>{counts.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <SearchCheck size={18} /> 3. 排名监控
          </h2>
          <span className={`${styles.badge} ${styles.badgeGood}`}>{keywords.length} seeds</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Locale</th>
                <th>Target URL</th>
                <th>Intent</th>
                <th>Tier</th>
                <th>Priority</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((item) => (
                <tr key={`${item.keyword}-${item.target_url}`}>
                  <td>{item.keyword}</td>
                  <td>{item.locale}</td>
                  <td>{item.target_url}</td>
                  <td>{item.intent}</td>
                  <td>{item.tier}</td>
                  <td>{item.priority}</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panelGrid}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <BarChart3 size={18} /> 4. 流量监控
            </h2>
            <span className={`${styles.badge} ${styles.badgeWarn}`}>待接入</span>
          </div>
          <div className={styles.metricList}>
            {metric('Google Search Console', 'ready to connect', '自然搜索曝光 / 点击 / CTR / 平均排名')}
            {metric('Cloudflare Analytics', 'token needed', '请求量 / bot 抓取 / 状态码 / 缓存命中')}
            {metric('Semrush CSV', 'manual import', '关键词排名 / 竞品 / 搜索量 / KD')}
            {metric('DataForSEO', 'empty slot', '暂时没有账号，先保留字段')}
            {metric('询盘转化', 'admin data', '按 URL / 来源做后续归因')}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <AlertTriangle size={18} /> 风险项
            </h2>
            {statusBadge(snapshot.risks.length === 0, 'Clear', 'Review')}
          </div>
          <ul className={styles.riskList}>
            {snapshot.risks.length ? (
              snapshot.risks.map((risk) => (
                <li className={styles.riskItem} key={risk}>
                  {risk}
                </li>
              ))
            ) : (
              <li className={`${styles.riskItem} ${styles.emptyRisk}`}>当前快照没有公开泄漏或严重阻断项。</li>
            )}
          </ul>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <FileJson size={18} /> 原始 Markdown 报告
          </h2>
          <span className={styles.monoPath}>docs/seo-monitoring/snapshot-{snapshot.date}.md</span>
        </div>
        <pre className={styles.reportPreview}>{report || 'No markdown report found.'}</pre>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <Activity size={18} /> 后续数据源
          </h2>
        </div>
        <div className={styles.metricList}>
          {metric('抓取', 'Cloudflare / Nginx logs', 'Googlebot、Bingbot、YandexBot、AI crawler')}
          {metric('收录', 'GSC first', 'URL Inspection、sitemap、重点 URL 抽查；Yandex 暂缓')}
          {metric('排名', 'Targets + Semrush CSV', '核心词、型号词、场景词、长尾词；DataForSEO 暂缓')}
          {metric('流量', 'GSC / Cloudflare / admin data', '曝光、点击、CTR、自然询盘')}
        </div>
      </section>
    </div>
  );
}
