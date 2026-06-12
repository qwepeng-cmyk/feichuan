# N-TET 轻量 SEO 监控系统路线图

## 阶段 1：站内快照

目标：不用外部 API，也能每天/每周发现站内 SEO 与 GEO 风险。

已规划脚本：

```powershell
npm run monitor:seo
```

输出：

- `docs/seo-monitoring/snapshot-YYYY-MM-DD.md`
- `docs/seo-monitoring/history/seo-monitoring-snapshot-YYYY-MM-DD.json`

监控项：

- A/B/C 内容数量。
- 公开 URL 与 C 层 restricted URL 数量。
- `llms.txt` URL 数量和泄漏检查。
- `robots.txt` 是否禁止 `/admin`、`/api`、`/*/preview`。
- Sitemap 声明与本地文件状态。
- Schema 源码覆盖。
- 构建 HTML 抽样大小和 JSON-LD 脚本数量。

## 阶段 2：关键词库

先用完整关键词目标表管理关键词，不立即接付费 API。

当前后台优先读取：

- `docs/seo/page-seo-keyword-targets-2026-06-10.csv`

兜底种子表：

- `docs/seo-monitoring/keywords.csv`

字段：

- `keyword`
- `locale`
- `target_url`
- `intent`
- `tier`
- `priority`
- `source`
- `notes`

## 阶段 3：搜索平台数据

后续接入：

- Google Search Console：已具备账号权限，下一步配置 API 凭证，用 Search Analytics 拉曝光、点击、CTR、平均排名，用 URL Inspection 拉重点 URL 收录状态。
- Yandex Webmaster：暂不接入。
- Bing Webmaster Tools。
- Semrush：共享账户可用时先走批量 CSV 导入，不急着做 API。
- DataForSEO：暂时没有账号，先保留空位。

## 阶段 4：抓取日志

后续接入：

- Cloudflare logs / GraphQL Analytics API：需要配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ZONE_ID`。
- Nginx access logs。
- Googlebot / Bingbot / YandexBot / AI crawler 抓取统计。
- 状态码、页面类型、缓存命中、抓取量趋势。

详细字段和目录约定见：

- `docs/seo-monitoring/data-sources.md`

## 阶段 5：看板

数据量较小时继续用 Markdown + JSON。

数据量变大后再考虑：

- SQLite / DuckDB。
- Metabase / Grafana。
- OpenSearch / Elasticsearch + Kibana。

N-TET 生产服务器只有 4GB 内存，不建议直接在生产服务器跑重型 ELK。
