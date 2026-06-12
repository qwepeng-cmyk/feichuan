# N-TET SEO 后台数据源接入说明

生成日期：2026-06-10

## 总体原则

SEO 后台分成两层：

- 数据采集层：定时脚本从 GSC、Cloudflare、Semrush CSV、站内数据库和询盘表生成 JSON/CSV 快照。
- 后台展示层：`/admin/seo-monitoring` 只读取本地快照，不在页面渲染时直接请求第三方 API。

这样做可以避免后台打开慢、第三方接口超时、服务器内存吃紧，也方便把历史数据沉淀下来。

## 1. 抓取监控

目标：看 Googlebot / Bingbot / YandexBot / AI crawler 有没有抓、抓了哪些 URL、状态码是否异常。

当前已可用：

- `public/robots.txt`
- `src/app/sitemap.ts` 或 `public/sitemap.xml`
- `docs/seo-monitoring/history/*.json`
- `npm run monitor:seo`

待接入：

- Cloudflare GraphQL Analytics API
- Nginx access log

需要配置的环境变量：

```bash
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ZONE_ID=
```

建议采集字段：

| 字段 | 说明 |
| --- | --- |
| date | 日期 |
| user_agent | Googlebot / Bingbot / YandexBot / GPTBot / ClaudeBot 等 |
| url | 被抓取 URL |
| status | HTTP 状态码 |
| edge_status | Cloudflare 边缘状态码 |
| cache_status | HIT / MISS / BYPASS |
| requests | 请求次数 |
| country | 来源国家 |

输出建议：

- `docs/seo-monitoring/imports/cloudflare-crawl-YYYY-MM-DD.csv`
- `docs/seo-monitoring/history/crawl-summary-YYYY-MM-DD.json`

## 2. 收录监控

目标：看重点页面是否被 Google 索引、sitemap 是否提交成功、新页面多久被收录。

当前已可用：

- 公开 A/B URL 集合
- C 层 restricted 泄漏检查
- `llms.txt` 泄漏检查
- Schema 覆盖检查

待接入：

- Google Search Console Search Console API
- URL Inspection API
- Sitemaps API

暂不接：

- Yandex Webmaster

需要配置的环境变量：

```bash
GOOGLE_APPLICATION_CREDENTIALS=
GSC_SITE_URL=https://n-tet.com/
```

建议采集字段：

| 字段 | 说明 |
| --- | --- |
| url | 检查 URL |
| inspection_date | 检查日期 |
| coverage_state | Google 返回的覆盖状态 |
| indexing_state | 是否可索引 / 已索引 |
| last_crawl_time | Google 最近抓取时间 |
| sitemap | 是否来自 sitemap |
| robots_allowed | robots 是否允许 |
| canonical | Google 选择的 canonical |

输出建议：

- `docs/seo-monitoring/history/index-coverage-YYYY-MM-DD.json`

## 3. 排名监控

目标：跟踪关键词排名、目标页、竞品、排名变化。

当前已可用：

- `docs/seo/page-seo-keyword-targets-2026-06-10.csv`
- `/admin/seo-monitoring` 会优先读取这张完整关键词目标表。

暂不接：

- DataForSEO

可人工导入：

- Semrush 批量导出
- Ahrefs 批量导出

Semrush CSV 建议放置目录：

```text
docs/seo-monitoring/imports/semrush/
```

建议采集字段：

| 字段 | 说明 |
| --- | --- |
| keyword | 关键词 |
| locale | en / ru / es |
| country | 目标国家 |
| target_url | 目标页 |
| current_rank | 当前排名 |
| previous_rank | 上次排名 |
| search_volume | 搜索量 |
| kd | 关键词难度 |
| serp_url | SERP URL |
| competitor_urls | 竞品 URL |
| source | GSC / Semrush / DataForSEO |

## 4. 流量监控

目标：看曝光、点击、CTR、自然流量、询盘转化。

优先接入：

- Google Search Console Search Analytics API
- 后台询盘数据
- Cloudflare Analytics

后续可接：

- GA4 Data API

建议采集字段：

| 字段 | 说明 |
| --- | --- |
| date | 日期 |
| page | 页面 URL |
| query | 搜索词 |
| clicks | 点击 |
| impressions | 曝光 |
| ctr | CTR |
| position | 平均排名 |
| organic_sessions | 自然搜索访问 |
| inquiries | 询盘数 |
| conversion_rate | 询盘转化率 |

## 凭证安全

- 不要把 API Token、OAuth JSON、GA4 key 写进 Git。
- `.env*` 已在 `.gitignore` 中忽略。
- GSC 服务账号 JSON 建议放在本机安全目录，用 `GOOGLE_APPLICATION_CREDENTIALS` 指向它。
- Cloudflare Token 只给 Analytics Read 权限，不给 DNS / Zone Edit 权限。
