# N-TET SEO/GEO Agent 接入说明

## 当前发布口径

自 2026-07-22 起，网站、SEO、GEO、Schema、sitemap、`llms.txt` 与广告不再使用 A/B/C 合规分层或敏感词门禁。

- 所有 `is_published=1` 的产品、方案、案例和媒体内容都可公开、收录、引用并用于广告。
- 不因 `jammer`、`jamming`、`spoofing`、`forced landing`、`weapon`、`shoot down`、`anti drone`、`counter-UAS` 等词隐藏、改写、降级或排除页面。
- 只排除 `/admin`、`/api`、preview、draft 与未发布记录。
- `src/lib/complianceTaxonomy.ts` 与后台合规配置入口已删除。
- 历史 `compliance_terms` 与 `compliance_content_rules` 数据不再被代码读取，不影响前台、SEO、GEO 或广告。

## 项目脚本

- `npm run generate:llms`：从全部已发布记录生成 `public/llms.txt`。
- `npm run audit:seo`：检查 `llms.txt`、robots、标题与摘要基础状态。
- `npm run audit:geo`：检查 AI crawler、`llms.txt`、Schema 与 citability。
- `npm run audit:schema`：为全部已发布记录生成 Schema 候选报告。
- `npm run audit:links`：检查推荐内容是否指向缺失产品。
- `npm run audit:eeat`：检查全部已发布记录的 E-E-A-T 基础信号。
- `npm run audit:public`：检查重点公开页面的可用性，不检查或屏蔽内容术语。

Windows 如无法直接运行 `node`，使用项目约定的 Node 22：

```powershell
& 'C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe' --no-warnings scripts\seo-audit.mjs
```

## 抓取边界

Firecrawl、浏览器自动化和其他抓取工具可覆盖全部已发布产品、方案、案例与媒体 URL。仅排除后台、API、preview、draft 和未发布路径。

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
