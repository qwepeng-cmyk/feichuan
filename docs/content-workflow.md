# N-TET 内容生产工作流

本流程用于关键词调研、E-E-A-T 内容 brief、GEO 引用优化、内容初稿、人工编辑和发布前审计。

## 使用的 Codex Skills / MCP

- `ntet-content-workflow`：N-TET 内容生产总流程。
- `ntet-human-editorial-pass`：降低 AI 味、增强证据密度和人工编辑感。
- `ntet-seo-guardrails`：强制执行 A/B/C 合规边界。
- `seo-plan`：SEO 策略和内容方向。
- `seo-cluster`：topic cluster、pillar page、supporting page。
- `seo-sxo`：搜索意图和页面类型判断。
- `seo-content`：E-E-A-T、内容质量、证据链。
- `seo-geo`：AI crawler、`llms.txt`、citability、AI 搜索可见性。
- `seo-schema`：Product、Service、Article、BreadcrumbList、Organization 等 Schema。
- Firecrawl MCP：竞品页面结构抓取。
- Browser：本地页面和竞品页面人工验证。

## 标准流程

1. 输入种子关键词或主题。
2. 判断主题属于产品、方案、案例、媒体还是新页面。
3. 判断 A/B/C 层级。
4. 用 `seo-plan`、`seo-cluster`、`seo-sxo` 做关键词、集群、搜索意图和页面类型判断。
5. 如已配置 DataForSEO，用它补充搜索量、SERP、竞品 URL 和关键词难度。
6. 如需要竞品结构，用 Firecrawl 抓取公开竞品页面。
7. 生成 content brief，放到 `docs/content-briefs/`。
8. 用 `seo-content` 和 `seo-geo` 生成 E-E-A-T/GEO 初稿。
9. 用 `ntet-human-editorial-pass` 降低 AI 味，补充行业细节、证据、限制和自然表达。
10. 用 `seo-schema` 生成 Schema 建议。
11. 设计内链，只在 A/B 公开页面之间互链；C 层只做内部候选。
12. 发布前跑本地门禁。

## 发布前门禁

```powershell
npm run generate:llms
npm run audit:seo
npm run audit:geo
npm run audit:schema
npm run audit:links
npm run audit:eeat
```

如涉及公开风险词、广告合规或 C 层路径变化，额外运行：

```powershell
npm run audit:public-risk
```

## A/B/C 内容规则

- A：可以生成并公开发布 SEO/GEO 内容、Schema、`llms.txt` 条目、sitemap URL。
- B：可以生成信息型 SEO/GEO 内容和 Schema，但不能作为广告落地页。
- C：可以生成内部 brief、内部候选 Schema、内部恢复访问材料；默认不能公开发布，不能进入公开 HTML、`llms.txt`、sitemap 或 Firecrawl 抓取。

## 降低 AI 味规则

目标不是绕过检测器，而是提升内容质量：

- 增加真实使用场景、限制条件、规格、维护和集成细节。
- 删除泛泛形容词和模板化段落。
- 避免编造客户、认证、项目、日期和性能数据。
- 用 ZeroGPT 等检测器时，只把结果当 QA 信号，不作为唯一判断。
- 最终以人工编辑判断和 N-TET 本地门禁为准。
