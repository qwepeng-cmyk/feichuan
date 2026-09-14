# 内容质量 + E-E-A-T + 搜索意图审计

生成日期：2026-07-13
HTML 来源：.next/server/app
关键词审计输入：docs/seo/keyword-landing-audit-2026-07-13.csv
完整 CSV：docs/seo/content-quality-eeat-audit-2026-07-13.csv

## 审计范围

- 全量公开页面扫描：224 个页面
- 重点审计页面：0 个页面
- 其中 partial 关键词页面：0 个页面
- 高价值英文 landing pages：0 个页面
- 排除范围：后台、API、preview、thank-you、restricted 不可公开页面。

## 总览结论

- 搜索意图覆盖均分：0.0/100
- 内容质量均分：0.0/100
- E-E-A-T 均分：0.0/100
- AI 引用准备度均分：0.0/100
- P0 合规复核：0
- P1 需要补内容：0
- P2 建议增强：0

## 主要内容缺口

- 薄内容 / 有效正文不足：0
- FAQ / 采购问题模块不足：0
- 媒体文章缺少作者或编辑责任信号：0
- 描述性内链不足：0
- 图片 alt 需要补强：0
- Schema 类型缺口：0

## P1 优先补内容页面

无。

## P2 建议增强页面

无。

## 25 个 partial 页面内容诊断

无。

## 高价值英文 Landing Pages 诊断

无。

## 怎么改

1. partial 页面不要继续只补关键词，先补正文深度、H2 结构和页面类型证据。
2. 产品/方案页优先补：应用场景、技术参数、选型注意事项、相关案例、FAQ、推荐产品内链。
3. 媒体文章优先补：作者/编辑责任、更新时间、数据点、引用来源、结论摘要和相关页面内链。
4. 英文高价值 landing pages 优先补 FAQ 和可引用短段落，提升 GEO / AI citation readiness。
5. 所有公开页面继续遵守 N-TET A/B/C guardrails；restricted 词和 restricted URL 不进入公开扩展。

## 风险分层

- Advertising compliance risk：本次脚本检查重点页面未发现 P0 公开风险词命中；仍建议每次内容扩展后跑 `audit:public-risk`。
- SEO risk：主要风险从“关键词未落地”转为“内容深度、页面类型证据和内链不足”。
- GEO / AI visibility risk：缺少 FAQ、数据点、作者/更新时间和结构化短答案的页面，不利于 AI 引用。
- Public visibility leaks：本审计读取 build 后公开 HTML，不包含后台/API/preview；restricted 页面仍应保持不可公开。
