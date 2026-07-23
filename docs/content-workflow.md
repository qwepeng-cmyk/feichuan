# N-TET 内容生产工作流

本流程用于关键词调研、Topic Cluster、RAG 证据检索、E-E-A-T 内容 brief、GEO 引用优化、内容初稿、人工编辑和发布前审计。

## 使用的 Codex Skills / MCP

- `ntet-content-workflow`：N-TET 内容生产总流程。
- `ntet-human-editorial-pass`：降低 AI 味，增强证据密度和人工编辑感。
- `ntet-seo-guardrails`：执行发布状态、证据质量和抓取边界。
- `seo-plan`：SEO 策略和内容方向。
- `seo-cluster`：Topic cluster、pillar page、supporting page。
- `seo-sxo`：搜索意图和页面类型判断。
- `seo-content`：E-E-A-T、内容质量、证据链。
- `seo-geo`：AI crawler、`llms.txt`、citability、AI 搜索可见性。
- `seo-schema`：Product、Service、Article、FAQPage、BreadcrumbList、Organization 等 Schema。
- Firecrawl MCP：竞品页面结构抓取。
- Browser：本地页面和竞品页面人工验证。
- RAG 知识库：公司文档、产品资料、项目经验、行业资料、FAQ、认证资料和术语库。

## RAG 知识库层

写文章之前必须先做 RAG 检索。RAG 不是替代 SEO 工具，而是给内容提供真实证据和公司语境。

知识库目录：

- `docs/rag/company/`：公司介绍、资质、出口经验、售后流程、团队能力。
- `docs/rag/products/`：产品规格书、参数、安装说明、图片说明、FAQ。
- `docs/rag/solutions/`：方案白皮书、场景说明、系统架构、部署边界。
- `docs/rag/cases/`：项目案例、交付记录、可公开和不可公开标记。
- `docs/rag/industry/`：行业法规、协会资料、公开研究、机场/安检/无人机/低空经济资料。
- `docs/rag/glossary/`：术语、英文/俄文表达和项目统一口径。
- `docs/rag/evidence-index.md`：证据索引表，记录每个资料的来源、日期、可公开级别和适用主题。

RAG 资料必须标注可见性：

- `public`：可公开引用或改写。
- `internal`：只能内部参考，不能直接公开。
- `confidential`：保密资料，只能内部核验，未经授权不能进入公开内容。

## 标准流程

1. 输入种子关键词或主题。
2. 判断主题属于产品、方案、案例、媒体还是新页面。
3. 确认计划发布状态：published、draft、preview-only 或 unpublished。
4. 运行 RAG 检索，收集公司证据、产品证据、行业证据和不可用证据。
5. 在 brief 中记录 RAG evidence pack：来源、可见性、可引用句、需要人工确认的声明。
6. 用 `seo-plan`、`seo-cluster`、`seo-sxo` 做关键词、集群、搜索意图和页面类型判断。
7. 如已配置 DataForSEO，用它补充搜索量、SERP、竞品 URL 和关键词难度。
8. 如需要竞品结构，用 Firecrawl 抓取公开竞品页面。
9. 生成 content brief，放到 `docs/content-briefs/`。
10. 用 `seo-content` 和 `seo-geo` 生成 E-E-A-T/GEO 初稿，但每个关键声明都要能回到 RAG 或公开资料。
11. 用 `ntet-human-editorial-pass` 降低 AI 味，补充行业细节、证据、限制和自然表达。
12. 用 `seo-schema` 生成 Schema 建议。
13. 设计内链，只在已发布公开页面之间互链。
14. 发布前跑本地门禁。

## RAG 检索输出要求

每篇文章或页面 brief 至少包含：

- `Evidence used`：实际用到的资料。
- `Evidence not used`：因为内部/保密限制、证据不足或过期而不能用的资料。
- `Claims needing confirmation`：发布前需要人工确认的性能、认证、客户、项目、日期和数量。
- `Source freshness`：资料日期和是否需要更新。
- `Citation candidates`：可作为 GEO/AI 引用块支撑的短事实。

## 发布前门禁

```powershell
npm run generate:llms
npm run audit:seo
npm run audit:geo
npm run audit:schema
npm run audit:links
npm run audit:eeat
```

如涉及公开页面可用性变化，额外运行：

```powershell
npm run audit:public
```

## 发布状态规则

- 已发布内容可以用于 SEO、GEO、广告、Schema、`llms.txt`、sitemap、内链和公开抓取。
- Draft、preview 与未发布记录不得进入公开 HTML、Schema、`llms.txt`、sitemap 或公开抓取范围。
- 不因技术词语本身隐藏、替换、降级或排除内容。

## 降低 AI 味规则

目标不是绕过检测器，而是提升内容质量：

- 增加真实使用场景、限制条件、规格、维护和集成细节。
- 删除泛泛形容词和模板化段落。
- 避免编造客户、认证、项目、日期和性能数据。
- 用 ZeroGPT 等检测器时，只把结果当 QA 信号，不作为唯一判断。
- 最终以人工编辑判断和 N-TET 本地门禁为准。
