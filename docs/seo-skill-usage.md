# N-TET SEO Skill 使用说明

## 已安装能力

- 成熟 SEO/GEO Skill：`AgriciDaniel/codex-seo`。
- 项目专属护栏：`ntet-seo-guardrails`，用于执行 N-TET 当前的发布状态、证据质量与抓取边界。
- Browser 插件：用于本地页面检查、截图、移动端/桌面端验证。
- Firecrawl MCP：已经配置，首次使用前需要重启 Codex。

## 日常怎么叫 Codex

可以直接用自然语言，不需要记复杂命令。例如：

- `对 https://n-tet.com 做一次完整 SEO 审计，必须遵守 N-TET guardrails。`
- `对 https://n-tet.com 做 GEO 审计，重点看 AI crawler、llms.txt、Schema、citability。`
- `用 Firecrawl map https://n-tet.com，排除 /admin、/api、preview、draft 和未发布 URL。`
- `检查 /products 页面 Schema 和 E-E-A-T 缺口。`
- `只在已发布公开页面之间找内链机会，不要链接 draft、preview 或未发布内容。`

## 本地固定门禁

通用 SEO/GEO Skill 做完分析后，本项目还要跑这些确定性脚本：

```powershell
npm run generate:llms
npm run audit:seo
npm run audit:geo
npm run audit:schema
npm run audit:links
npm run audit:eeat
```

如果 Codex Windows 沙箱里的默认 `node` 被拦截，可以用本机固定 Node 22 路径：

```powershell
& 'C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe' --no-warnings scripts\geo-audit.mjs
```

## Firecrawl 使用边界

允许抓取的公开区域：

- `/products*`
- `/solutions*`
- `/cases*`
- `/media*`
- `/ru/products*`
- `/ru/solutions*`
- `/ru/cases*`
- `/ru/media*`

必须排除：

- `/admin*`
- `/api*`
- preview URL
- draft URL
- 未发布记录对应的 URL

## 已加入的 GEO 检查项

项目新增了 `npm run audit:geo`，参考 `geo-seo-claude` 的 GEO-first 工作流，但做成了适合 N-TET 的本地门禁：

- AI crawler access：检查 GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、PerplexityBot、Google-Extended。
- `llms.txt`：检查文件是否存在、章节是否完整、URL 数量，以及是否泄漏未发布、admin、preview 或 API URL。
- Schema readiness：检查页面是否已有服务端 JSON-LD，并联动 `audit:schema` 候选报告。
- Citability：评估公开记录是否适合作为 AI 引用片段，并列出弱项页面。

当前结果：2026-05-22 跑分为 `85/100`。主要剩余缺口是页面还没有服务端 JSON-LD。

## Schema 公开规则

- 已发布产品、方案、案例和媒体内容可以生成并公开输出 Schema。
- Draft、preview 和未发布记录的 Schema 不得进入公开页面 HTML、`llms.txt`、sitemap 或 Firecrawl 抓取范围。
- 内容从未发布切换为已发布后，重新生成 Schema、`llms.txt` 与 sitemap，并复跑本地检查。

## 内容生产工作流

已新增两个项目专属 skill：

- `ntet-content-workflow`：关键词调研、topic cluster、内容 brief、E-E-A-T/GEO 初稿、Schema 和内链编排。
- `ntet-human-editorial-pass`：降低 AI 味、增强证据密度、加入行业细节和人工编辑感。

项目内说明见 `docs/content-workflow.md`，brief 模板见 `docs/content-briefs/brief-template.md`。
