# 页面关键词落地审计

生成日期：2026-07-14
数据来源：.next/server/app
完整明细 CSV：docs/seo/keyword-landing-audit-2026-07-14.csv

## 审计范围

- 已审计公开静态 HTML 页面：832
- 已排除非 SEO / 后台 / thank-you / preview 等页面：22
- 关键词来源：每个页面渲染后的 `<meta name="keywords">`。
- 本地化规则：`/es` 页面按西语 meta keywords 检查，`/ru` 页面按俄语 meta keywords 检查，其余页面按英文关键词检查。
- 匹配方式：精确短语匹配，忽略大小写，并做基础词边界处理。
- 密度口径：正文中精确关键词短语出现次数 / 每 100 个正文词。

## 总览

- 强页面：680（81.7%）
- 部分落地页面：134（16.1%）
- 弱页面：18（2.2%）
- 缺少 meta keywords 的页面：4
- 缺少 H1 的页面：4
- 缺少 H2 的页面：4
- Title 命中关键词：816/832（98.1%）
- Description 命中关键词：572/832（68.8%）
- H1 命中关键词：807/832（97.0%）
- H2 命中关键词：642/832（77.2%）
- 正文精确关键词短语命中：817/832（98.2%）

## 语言分布

- en: strong 168, partial 35, weak 5, total 208
- es: strong 176, partial 28, weak 4, total 208
- ru: strong 163, partial 40, weak 5, total 208
- ar: strong 173, partial 31, weak 4, total 208

## 怎么看这份报告

- `Title` 和 `Description` 命中，表示页面基础 metadata 是否承接了至少一个目标关键词短语。
- `H1` 和 `H2` 命中，表示用户可见的语义标题是否承接目标关键词。
- `正文` 命中采用较严格的精确短语判断。未命中不代表页面完全不相关，但代表当前目标关键词没有明确落到正文里。
- 关键词密度要按页面类型判断。本审计把精确短语密度低于 0.05% 视为落地偏薄，高于 3% 视为可能存在堆词风险。

## 最弱页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/products/low-altitude-airspace-monitoring | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /en/products/low-altitude-airspace-monitoring | en | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/products/low-altitude-airspace-monitoring | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/products/low-altitude-airspace-monitoring | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.816% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/cases | en | 50 | 否 | 是 | 否 | 否 | 是 | 0.502% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/contact | en | 50 | 否 | 否 | 否 | 是 | 是 | 0.198% | title 未命中关键词; description 未命中关键词; H1 未命中关键词 |
| /es/media | es | 55 | 否 | 否 | 是 | 否 | 是 | 0.092% | title 未命中关键词; description 未命中关键词; H2 未命中关键词 |
| /ar/about | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.604% | H1 未命中关键词; H2 未命中关键词 |
| /ar/privacy-policy | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.754% | H1 未命中关键词; H2 未命中关键词 |
| /en/privacy-policy | en | 65 | 是 | 是 | 否 | 否 | 是 | 0.721% | H1 未命中关键词; H2 未命中关键词 |
| /es/about | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.456% | H1 未命中关键词; H2 未命中关键词 |
| /es/privacy-policy | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.672% | H1 未命中关键词; H2 未命中关键词 |
| /ru/privacy-policy | ru | 65 | 是 | 是 | 否 | 否 | 是 | 0.738% | H1 未命中关键词; H2 未命中关键词 |
| /ar/contact | ar | 70 | 否 | 否 | 是 | 是 | 是 | 0.691% | title 未命中关键词; description 未命中关键词 |
| /ar/media | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.108% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/critical-infrastructure-monitoring-record-chain-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.581% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-alert-quality-operator-context-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.490% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-concept-of-operations-before-procurement-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.606% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-detection-technology-comparison-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.483% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-event-logging-data-retention-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.378% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-site-survey-critical-infrastructure-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.387% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/dock-based-substation-uav-trial-checks-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.674% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/drone-detection-range-site-coverage-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.391% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/eo-ir-payload-selection-field-note-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.540% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/low-altitude-economy-operations-owner-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.552% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/overseas-uav-project-handover-checklist-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 1.542% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/radar-rf-optical-nuisance-alert-reduction-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.511% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/remote-id-rf-detection-complementary-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.394% | description 未命中关键词; H2 未命中关键词 |

## H1 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.816% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/cases | en | 50 | 否 | 是 | 否 | 否 | 是 | 0.502% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/contact | en | 50 | 否 | 否 | 否 | 是 | 是 | 0.198% | title 未命中关键词; description 未命中关键词; H1 未命中关键词 |
| /ar/about | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.604% | H1 未命中关键词; H2 未命中关键词 |
| /ar/privacy-policy | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.754% | H1 未命中关键词; H2 未命中关键词 |
| /en/privacy-policy | en | 65 | 是 | 是 | 否 | 否 | 是 | 0.721% | H1 未命中关键词; H2 未命中关键词 |
| /es/about | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.456% | H1 未命中关键词; H2 未命中关键词 |
| /es/privacy-policy | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.672% | H1 未命中关键词; H2 未命中关键词 |
| /ru/privacy-policy | ru | 65 | 是 | 是 | 否 | 否 | 是 | 0.738% | H1 未命中关键词; H2 未命中关键词 |
| /ar/accessories | ar | 75 | 是 | 是 | 否 | 是 | 是 | 3.424% | H1 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |

## H2 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.816% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/cases | en | 50 | 否 | 是 | 否 | 否 | 是 | 0.502% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/media | es | 55 | 否 | 否 | 是 | 否 | 是 | 0.092% | title 未命中关键词; description 未命中关键词; H2 未命中关键词 |
| /ar/about | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.604% | H1 未命中关键词; H2 未命中关键词 |
| /ar/privacy-policy | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.754% | H1 未命中关键词; H2 未命中关键词 |
| /en/privacy-policy | en | 65 | 是 | 是 | 否 | 否 | 是 | 0.721% | H1 未命中关键词; H2 未命中关键词 |
| /es/about | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.456% | H1 未命中关键词; H2 未命中关键词 |
| /es/privacy-policy | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.672% | H1 未命中关键词; H2 未命中关键词 |
| /ru/privacy-policy | ru | 65 | 是 | 是 | 否 | 否 | 是 | 0.738% | H1 未命中关键词; H2 未命中关键词 |
| /ar/media | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.108% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/critical-infrastructure-monitoring-record-chain-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.581% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-alert-quality-operator-context-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.490% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-concept-of-operations-before-procurement-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.606% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-detection-technology-comparison-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.483% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-event-logging-data-retention-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.378% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-site-survey-critical-infrastructure-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.387% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/dock-based-substation-uav-trial-checks-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.674% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/drone-detection-range-site-coverage-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.391% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/eo-ir-payload-selection-field-note-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.540% | description 未命中关键词; H2 未命中关键词 |

## 正文未命中精确关键词短语页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |

## 接下来怎么改

优先处理同时存在 `H1 未命中` 和 `正文未命中` 的页面。修改时不要机械重复关键词，而是把目标关键词自然放进 H1/H2，以及一段能说明场景价值的正文或列表项。

建议顺序：

1. 先改英文重点方案页和栏目页，因为这些页面最接近 Google Ads / SEO 目标词。
2. 每页只选 1 个主关键词、2-4 个辅助关键词，避免把所有 keywords 都塞进标题。
3. H1 使用“主关键词 + 页面对象/场景”，例如 `Power Line UAV Inspection Solution for Utility Operators`。
4. H2 使用“辅助关键词 + 模块含义”，例如把 `Overview` 改成 `UAV Inspection Workflow for Power Lines`。
5. 正文增加 1-2 句自然说明，控制精确短语出现 1-3 次即可。
6. 修改后重新运行 `npm run build` 和 `npm run audit:keywords`，确认 H1/H2/正文命中率提升。
