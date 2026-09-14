# N-TET SEO/GEO Agent 接入说明

## 当前发布口径

自 2026-07-22 起，网站、SEO、GEO、Schema、sitemap、`llms.txt` 与广告不再使用 A/B/C 合规分层或敏感词门禁。

- 所有 `is_published=1` 的产品、方案、案例和媒体内容都可公开；是否进入搜索、AI 发现与广告范围按下方 C-UAS 索引口径控制。
- 不因 `jammer`、`jamming`、`spoofing`、`forced landing`、`weapon`、`shoot down`、`anti drone`、`counter-UAS` 等词隐藏、改写、降级或排除页面。
- 只排除 `/admin`、`/api`、preview、draft 与未发布记录。
- `src/lib/complianceTaxonomy.ts` 与后台合规配置入口已删除。
- 历史 `compliance_terms` 与 `compliance_content_rules` 数据不再被代码读取，不影响前台、SEO、GEO 或广告。

## C-UAS 搜索索引口径（2026-07-24）

- `is_published` 继续控制页面是否公开；搜索索引范围单独由 `src/config/cuasIndexability.json` 控制。
- 配置内的产品分类与明确页面名单进入 sitemap、详情 Schema、`llms.txt`、SEO/GEO 审计和公开聚合页。
- 已发布但不在 C-UAS 索引范围内的历史页面保持可访问，输出 `noindex, follow`，不使用 `robots.txt` 阻断抓取。
- 该策略按业务主题分类，不按敏感词或内容等级判断；反无人机探测、干扰、诱骗、迫降等正常公开内容不受限制。

## 项目脚本

- `npm run generate:llms`：从已发布且属于 C-UAS 索引范围的记录生成 `public/llms.txt`。
- `npm run audit:seo`：检查 `llms.txt`、robots、标题与摘要基础状态。
- `npm run audit:geo`：检查 AI crawler、`llms.txt`、Schema 与 citability。
- `npm run audit:schema`：为 C-UAS 可索引记录生成 Schema 候选报告。
- `npm run audit:links`：检查推荐内容是否指向缺失产品。
- `npm run audit:eeat`：检查 C-UAS 可索引记录的 E-E-A-T 基础信号。
- `npm run audit:public`：检查重点公开页面的可用性，不检查或屏蔽内容术语。

Windows 如无法直接运行 `node`，使用项目约定的 Node 22：

```powershell
& 'C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe' --no-warnings scripts\seo-audit.mjs
```

## 抓取边界

Firecrawl、浏览器自动化和其他 SEO/GEO 抓取工作流以 C-UAS 索引范围为公开发现目标，并排除后台、API、preview、draft、未发布路径和已标记 `noindex` 的历史非 C-UAS 页面。

## 发布前验证

```powershell
npm run generate:llms
npm run audit:seo
npm run audit:geo
npm run audit:schema
npm run audit:links
npm run audit:eeat
npm run build
```

报告默认输出到 `docs/seo/`。
