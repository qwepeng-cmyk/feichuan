# N-TET RAG 知识库规范

RAG 知识库用于支撑关键词调研、内容 brief、文章写作、E-E-A-T、GEO 引用块、Schema 和人工编辑。它的目标是让文章基于公司真实资料和行业证据，而不是只靠通用模型生成。

## 目录结构

建议把资料放在 `docs/rag/` 下：

```text
docs/rag/
  company/
  products/
  solutions/
  cases/
  industry/
  glossary/
  evidence-index.md
```

## 资料类型

- 公司资料：公司介绍、资质、出口经验、售后流程、团队能力、服务范围。
- 产品资料：规格书、参数表、安装要求、维护说明、产品图片说明、FAQ。
- 方案资料：系统架构、场景边界、设备组合、部署流程、运维要求。
- 案例资料：项目背景、交付范围、设备清单、可公开程度、图片授权。
- 行业资料：公开法规、协会资料、政府说明、标准摘要、行业报告。
- 术语资料：英文/俄文表达、项目统一口径、客户常见问法。

## 可见性标签

每份资料必须有可见性标签：

| 标签 | 含义 | 可否公开用于文章 |
|---|---|---|
| `public` | 可公开资料，可改写引用 | 可以 |
| `internal` | 内部资料，只能做事实核对或背景理解 | 需要人工确认 |
| `confidential` | 保密资料，只能做内部事实核验 | 未经授权不可以 |

内部或保密资料未经授权不能进入公开 HTML、Schema、`llms.txt`、sitemap、Firecrawl 抓取或对外文章。

## evidence-index.md 格式

```markdown
| ID | 标题 | 路径 | 类型 | 可见性 | 日期 | 适用主题 | 备注 |
|---|---|---|---|---|---|---|---|
| product-fc6550-spec | FC6550 Specification | docs/rag/products/fc6550-spec.md | product | public | 2026-05-22 | airport screening | 参数需人工确认 |
```

## 写作使用规则

1. 写 brief 前先检索 RAG。
2. 每个关键声明必须能追溯到 RAG 资料、站内公开页面或可信公开来源。
3. 性能、认证、客户、项目、数量、日期不能凭空生成。
4. 未获授权的内部或保密资料只能进入 `Evidence not used`，不能进入公开内容。
5. 如果 RAG 与竞品/SERP 信息冲突，以已核实的公司资料和项目发布规则优先。
6. 如果资料过期或缺失，在 brief 中标记 `Claims needing confirmation`。

## 未来向量库接入

当前先用文件目录 + evidence index 管理资料。后续可以接：

- 本地向量库：SQLite vec、LanceDB、Chroma、Qdrant。
- 云端知识库：Dify、LlamaIndex、LangChain、OpenAI vector stores。
- MCP 工具：文件检索 MCP、Firecrawl、DataForSEO、Browser。

推荐最小可行方案：

1. 先把资料整理成 Markdown。
2. 每个文件头部加 metadata：`title`、`type`、`visibility`、`date`、`topics`。
3. 写一个索引脚本生成 `docs/rag/evidence-index.md`。
4. 后续再把这些 Markdown 切块并写入向量库。
