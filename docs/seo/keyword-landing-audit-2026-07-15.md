# 页面关键词落地审计

生成日期：2026-07-15
数据来源：.next-five-pages-v2/server/app
完整明细 CSV：docs/seo/keyword-landing-audit-2026-07-15.csv

## 审计范围

- 已审计公开静态 HTML 页面：872
- 已排除非 SEO / 后台 / thank-you / preview 等页面：22
- 关键词来源：每个页面渲染后的 `<meta name="keywords">`。
- 本地化规则：`/es` 页面按西语 meta keywords 检查，`/ru` 页面按俄语 meta keywords 检查，其余页面按英文关键词检查。
- 匹配方式：精确短语匹配，忽略大小写，并做基础词边界处理。
- 密度口径：正文中精确关键词短语出现次数 / 每 100 个正文词。

## 总览

- 强页面：693（79.5%）
- 部分落地页面：133（15.3%）
- 弱页面：46（5.3%）
- 缺少 meta keywords 的页面：29
- 缺少 H1 的页面：29
- 缺少 H2 的页面：29
- Title 命中关键词：829/872（95.1%）
- Description 命中关键词：582/872（66.7%）
- H1 命中关键词：819/872（93.9%）
- H2 命中关键词：654/872（75.0%）
- 正文精确关键词短语命中：831/872（95.3%）

## 语言分布

- en: strong 176, partial 34, weak 8, total 218
- es: strong 178, partial 28, weak 12, total 218
- ru: strong 164, partial 41, weak 13, total 218
- ar: strong 175, partial 30, weak 13, total 218

## 怎么看这份报告

- `Title` 和 `Description` 命中，表示页面基础 metadata 是否承接了至少一个目标关键词短语。
- `H1` 和 `H2` 命中，表示用户可见的语义标题是否承接目标关键词。
- `正文` 命中采用较严格的精确短语判断。未命中不代表页面完全不相关，但代表当前目标关键词没有明确落到正文里。
- 关键词密度要按页面类型判断。本审计把精确短语密度低于 0.05% 视为落地偏薄，高于 3% 视为可能存在堆词风险。

## 最弱页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/products/low-altitude-airspace-monitoring | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-defender | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-detector | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-jammer | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-locator | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-radar-detection | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/drone-shield | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/portable-drone-detection | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/solutions/rf-interference-device | ar | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /en/products/low-altitude-airspace-monitoring | en | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /en/solutions/rf-interference-device | en | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/products/low-altitude-airspace-monitoring | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-defender | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-detector | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-jammer | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-locator | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-radar-detection | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/drone-shield | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/portable-drone-detection | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /es/solutions/rf-interference-device | es | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/products/low-altitude-airspace-monitoring | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-defender | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-detector | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-jammer | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-locator | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-radar-detection | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/drone-shield | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/portable-drone-detection | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ru/solutions/rf-interference-device | ru | 0 | 否 | 否 | 否 | 否 | 否 | 0.000% | 缺少 meta keywords; 缺少 H1; 缺少 H2 |
| /ar/media | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.344% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/low-altitude-airspace-monitoring | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.298% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/portable-drone-detection | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.144% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |

## H1 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/media | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.344% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/low-altitude-airspace-monitoring | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.298% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/portable-drone-detection | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.144% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/cases | en | 50 | 否 | 是 | 否 | 否 | 是 | 0.437% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/contact | en | 50 | 否 | 否 | 否 | 是 | 是 | 0.168% | title 未命中关键词; description 未命中关键词; H1 未命中关键词 |
| /ar/about | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.587% | H1 未命中关键词; H2 未命中关键词 |
| /ar/privacy-policy | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.744% | H1 未命中关键词; H2 未命中关键词 |
| /en/privacy-policy | en | 65 | 是 | 是 | 否 | 否 | 是 | 0.695% | H1 未命中关键词; H2 未命中关键词 |
| /es/about | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.447% | H1 未命中关键词; H2 未命中关键词 |
| /es/privacy-policy | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.666% | H1 未命中关键词; H2 未命中关键词 |
| /ru/privacy-policy | ru | 65 | 是 | 是 | 否 | 否 | 是 | 0.730% | H1 未命中关键词; H2 未命中关键词 |
| /ar/accessories | ar | 75 | 是 | 是 | 否 | 是 | 是 | 3.295% | H1 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |

## H2 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/media | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/solutions | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.344% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/low-altitude-airspace-monitoring | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.298% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /en/solutions/portable-drone-detection | en | 35 | 否 | 否 | 否 | 否 | 是 | 0.144% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /es/products | es | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/about | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/products | ru | 45 | 是 | 是 | 否 | 否 | 否 | 0.000% | H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/cases | en | 50 | 否 | 是 | 否 | 否 | 是 | 0.437% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词 |
| /ar/about | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.587% | H1 未命中关键词; H2 未命中关键词 |
| /ar/privacy-policy | ar | 65 | 是 | 是 | 否 | 否 | 是 | 0.744% | H1 未命中关键词; H2 未命中关键词 |
| /en/privacy-policy | en | 65 | 是 | 是 | 否 | 否 | 是 | 0.695% | H1 未命中关键词; H2 未命中关键词 |
| /es/about | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.447% | H1 未命中关键词; H2 未命中关键词 |
| /es/privacy-policy | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.666% | H1 未命中关键词; H2 未命中关键词 |
| /ru/privacy-policy | ru | 65 | 是 | 是 | 否 | 否 | 是 | 0.730% | H1 未命中关键词; H2 未命中关键词 |
| /ar/media/critical-infrastructure-monitoring-record-chain-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.555% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-alert-quality-operator-context-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.471% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-concept-of-operations-before-procurement-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.577% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-detection-technology-comparison-2024 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.465% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-event-logging-data-retention-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.367% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/cuas-site-survey-critical-infrastructure-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.375% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/dock-based-substation-uav-trial-checks-2026 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.639% | description 未命中关键词; H2 未命中关键词 |
| /ar/media/drone-detection-range-site-coverage-2025 | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.379% | description 未命中关键词; H2 未命中关键词 |

## 正文未命中精确关键词短语页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/media | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/solutions/low-altitude-airspace-monitoring | ar | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es/solutions/low-altitude-airspace-monitoring | es | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ru/solutions/low-altitude-airspace-monitoring | ru | 15 | 否 | 否 | 否 | 否 | 否 | 0.000% | title 未命中关键词; description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /ar/products | ar | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /en/media | en | 30 | 否 | 是 | 否 | 否 | 否 | 0.000% | title 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
| /es | es | 30 | 是 | 否 | 否 | 否 | 否 | 0.000% | description 未命中关键词; H1 未命中关键词; H2 未命中关键词; 正文未命中精确关键词短语 |
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
