# N-TET SEO/GEO Agent 接入说明

本项目采用“成熟 Codex SEO skills + N-TET 项目护栏”的方式接入 SEO/GEO 能力。

## Codex 层已安装能力

- `AgriciDaniel/codex-seo` v1.9.6-codex.5 已安装到 `C:\Users\admin\.codex\skills`。
- SEO、GEO、Schema、E-E-A-T、技术 SEO 等核心工作流可用。
- Browser MCP / Browser 插件已启用，可用于本地页面检查、截图和 Playwright 类验证。
- Context7 MCP 已启用，可用于查询最新技术文档。
- Firecrawl MCP 已配置到 `C:\Users\admin\.codex\config.toml`，需要重启 Codex 后加载工具。
- Windows 下 PDF/OCR/部分视觉扩展可能降级，取决于 Playwright Chromium、WeasyPrint GTK、OCR DLL 等运行时是否齐全。

修改 Codex skill 或 MCP 配置后，需要重启 Codex 才能加载新工具。

## 项目护栏

N-TET 必须保留 A/B/C 内容边界：

- A `normal`：允许广告、SEO、GEO、Schema、sitemap、`llms.txt` 和公开落地页。
- B `neutral_seo`：允许信息型 SEO/GEO 和引用优化，但不能作为广告落地页。
- C `restricted`：不能进入广告可达路径、`llms.txt`、公开 Schema、sitemap 或自动内容扩展。

广告行业术语口径（2026-07-14）：

- `anti drone` / `anti-drone`、`counter drone`、`counter-UAS` / `counter-UAV`、`C-UAS` 允许用于 A 层广告承接页、广告文案、SEO/GEO 与公开 Schema；这些词本身不再构成 restricted 命中。
- `jammer` / `jamming`、`spoofing`、`forced landing`、`weapon`、`shoot down` 等主动干扰、诱骗、迫降或武器化能力词仍保持限制。
- 定向例外（2026-07-15，名称口径更新）：`directional-rf-interference-device` 与 `omni-directional-rf-interference-device` 为明确批准的 A 层公开产品，公开名称恢复为 `Directional RF Jammer` 与 `Omni-directional RF Jammer`，可进入 Fixed-Site 产品列表、公开详情页、Defender / Locator / Drone Jammer 解决方案、Schema、sitemap 与 `llms.txt`。旧的 `directional-rf-jammer` / `omni-directional-rf-jammer` handle 与其他主动能力 handle 继续保持 restricted。
- 路径或内容是否属于 B/C 层仍按具体能力与 `src/lib/complianceTaxonomy.ts` 的记录判断，不能仅凭 `anti-drone`、`counter` 或 `C-UAS` 字样判层。

Schema 生成规则：

- A/B：生成并公开输出 Schema，可以写入公开页面 HTML 中的服务端 JSON-LD。
- C：可以生成内部候选 Schema，便于以后恢复访问时复用；但默认不公开输出，不写入公开页面 HTML、`llms.txt`、sitemap，也不交给 Firecrawl 抓取。
- C 层从内部候选转为公开 Schema 前，必须先调整合规层级，并重新跑 `audit:seo`、`audit:geo`、`audit:schema`、`audit:links`。

规则源头是 `src/lib/complianceTaxonomy.ts`。项目脚本里有一份镜像基线，方便 Node 脚本在不加载 Next 应用的情况下运行审计。

## 项目脚本

- `npm run generate:llms`：从已发布且非 restricted 的记录重新生成 `public/llms.txt`。
- `npm run audit:seo`：检查 `llms.txt`、`robots.txt`、公开元信息基础状态和 C 层泄漏。
- `npm run audit:geo`：检查 AI crawler 访问、`llms.txt` 卫生、Schema 准备度和页面 citability。
- `npm run audit:schema`：生成公开 Schema 候选报告。
- `npm run audit:links`：检查推荐产品内链是否缺失或指向 restricted 产品。
- `npm run audit:eeat`：运行轻量 E-E-A-T 内容证据审计。
- `npm run audit:public-risk`：现有公开页面风险门禁，检查 restricted 术语和不可公开路径。

报告输出到 `docs/seo/`。

如果 Codex Windows 沙箱不能运行默认 `node`，用固定 Node 22 路径：

```powershell
& 'C:\tmp\node-v22.21.1-win-x64\node-v22.21.1-win-x64\node.exe' --no-warnings scripts\seo-audit.mjs
```

审计工具优先使用 `better-sqlite3`；如果本地 native addon 不可用，会回退到 Node 22 自带的 `node:sqlite` 只读检查。

## SEO Skill 怎么用

直接在 Codex 里用自然语言即可。只要提示里出现 SEO、GEO、Schema、E-E-A-T、Firecrawl 等关键词，对应 skill 会被调用。

示例：

- `对 https://n-tet.com 做一次 SEO 审计，并遵守 N-TET guardrails。`
- `用 seo-geo 检查 https://n-tet.com/products 的 AI visibility。`
- `用 seo-schema 检查产品详情页，并给出 JSON-LD 建议。`
- `用 seo-content 检查 /media 文章的 E-E-A-T。`
- `用 seo-firecrawl map https://n-tet.com，排除 /admin、/api、preview 和 C 层 URL。`

通用 skill 分析后，本项目仍要跑本地门禁：

```powershell
npm run generate:llms
npm run audit:seo
npm run audit:geo
npm run audit:schema
npm run audit:links
npm run audit:eeat
```

## Firecrawl MCP

Firecrawl 已使用 hosted MCP URL 配置到 `C:\Users\admin\.codex\config.toml`。重启 Codex 后会加载 `firecrawl_*` 工具。

不要让 Firecrawl 抓取 `/admin`、preview、API、draft 或 C 层 restricted 路径。

N-TET 推荐抓取边界：

- Include：`/products*`、`/solutions*`、`/cases*`、`/media*`、`/ru/products*`、`/ru/solutions*`、`/ru/cases*`、`/ru/media*`
- Exclude：`/admin*`、`/api*`、preview URL、draft URL、`src/lib/complianceTaxonomy.ts` 里的 C 层 restricted handle

## WordPress

当前没有安装 WordPress automation。N-TET 是 Next.js + SQLite 站点，内容流程优先走现有后台和数据层。只有存在单独 WordPress 内容站时，才建议再接 WordPress MCP。

## 内容生产 Skills

已新增两个项目专属 skill：

- `ntet-content-workflow`：编排关键词调研、topic cluster、E-E-A-T/GEO brief、内容初稿、Schema、内链和发布前门禁。
- `ntet-human-editorial-pass`：对生成内容做人工编辑感增强，降低模板化 AI 味，补充证据、限制和行业细节。

项目文档：

- `docs/content-workflow.md`
- `docs/content-briefs/brief-template.md`
- `docs/keyword-research/`

## 当前验证结果

验证日期：2026-05-22

- `generate:llms`：生成 `public/llms.txt`，纳入 58 条公开记录，排除 21 条 restricted 记录。
- `audit:seo`：通过，无 warnings。
- `audit:geo`：通过，得分 `85/100`；剩余 1 个 warning：缺少服务端 JSON-LD。
- `audit:schema`：生成 58 个公开 Schema 候选，并排除 C 层记录。
- `audit:links`：修复公开 solution 推荐 restricted 产品后通过。
- `audit:eeat`：基础启发式检查通过，无 warnings。
