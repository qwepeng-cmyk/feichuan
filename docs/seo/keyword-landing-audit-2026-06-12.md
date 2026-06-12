# 页面关键词落地审计

生成日期：2026-06-12
数据来源：.next/server/app
完整明细 CSV：docs/seo/keyword-landing-audit-2026-06-12.csv

## 审计范围

- 已审计公开静态 HTML 页面：652
- 已排除非 SEO / 后台 / thank-you / preview 等页面：22
- 关键词来源：每个页面渲染后的 `<meta name="keywords">`。
- 本地化规则：`/es` 页面按西语 meta keywords 检查，`/ru` 页面按俄语 meta keywords 检查，其余页面按英文关键词检查。
- 匹配方式：精确短语匹配，忽略大小写，并做基础词边界处理。
- 密度口径：正文中精确关键词短语出现次数 / 每 100 个正文词。

## 总览

- 强页面：625（95.9%）
- 部分落地页面：27（4.1%）
- 弱页面：0（0.0%）
- 缺少 meta keywords 的页面：0
- 缺少 H1 的页面：0
- 缺少 H2 的页面：0
- Title 命中关键词：647/652（99.2%）
- Description 命中关键词：515/652（79.0%）
- H1 命中关键词：650/652（99.7%）
- H2 命中关键词：585/652（89.7%）
- 正文精确关键词短语命中：652/652（100.0%）

## 语言分布

- en: strong 152, partial 11, weak 0, total 163
- es: strong 162, partial 1, weak 0, total 163
- ru: strong 150, partial 13, weak 0, total 163
- ar: strong 161, partial 2, weak 0, total 163

## 怎么看这份报告

- `Title` 和 `Description` 命中，表示页面基础 metadata 是否承接了至少一个目标关键词短语。
- `H1` 和 `H2` 命中，表示用户可见的语义标题是否承接目标关键词。
- `正文` 命中采用较严格的精确短语判断。未命中不代表页面完全不相关，但代表当前目标关键词没有明确落到正文里。
- 关键词密度要按页面类型判断。本审计把精确短语密度低于 0.05% 视为落地偏薄，高于 3% 视为可能存在堆词风险。

## 最弱页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/accessories | ar | 60 | 是 | 是 | 否 | 否 | 是 | 3.804% | H1 未命中关键词; H2 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |
| /es/solutions | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.337% | H1 未命中关键词; H2 未命中关键词 |
| /ar/about | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.060% | description 未命中关键词; H2 未命中关键词 |
| /en/media/border-surveillance-uav-network-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.532% | description 未命中关键词; H2 未命中关键词 |
| /en/media/industrial-uav-redundancy-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.394% | description 未命中关键词; H2 未命中关键词 |
| /en/media/low-altitude-economy-2026-outlook | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.369% | description 未命中关键词; H2 未命中关键词 |
| /en/media/tethered-uav-persistent-surveillance-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.484% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/emergency-communication-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.750% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/emergency-search-rescue-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.738% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/high-rise-firefighting-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.730% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/power-tower-inspection-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.730% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/smart-substation-autonomous-inspection-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.720% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/tethered-lighting-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.745% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/water-conservancy-monitoring-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.735% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/border-surveillance-uav-network-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.690% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/industrial-uav-redundancy-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.673% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/low-altitude-economy-2026-outlook | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.667% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/tethered-uav-persistent-surveillance-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.665% | description 未命中关键词; H2 未命中关键词 |
| /ru/products/fc-dlxj-01-power-grid-inspection-drone | ru | 70 | 否 | 否 | 是 | 是 | 是 | 0.210% | title 未命中关键词; description 未命中关键词 |
| /ru/products/fc-yqxj-01-utility-inspection-drone | ru | 70 | 否 | 否 | 是 | 是 | 是 | 0.208% | title 未命中关键词; description 未命中关键词 |
| /ru/solutions/emergency-communication-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.782% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/emergency-search-rescue-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.785% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/high-rise-firefighting-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.756% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/power-tower-inspection-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.754% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/smart-substation-autonomous-inspection-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.755% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/tethered-lighting-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.786% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/water-conservancy-monitoring-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.762% | description 未命中关键词; H2 未命中关键词 |
| /en/accessories | en | 80 | 是 | 否 | 是 | 是 | 是 | 4.585% | description 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |
| /es/accessories | es | 80 | 是 | 否 | 是 | 是 | 是 | 3.898% | description 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |
| /ar | ar | 85 | 是 | 是 | 是 | 否 | 是 | 0.309% | H2 未命中关键词 |
| /ar/cases | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.243% | H2 未命中关键词 |
| /ar/media/border-surveillance-uav-network-2026 | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.083% | H2 未命中关键词 |
| /ar/media/industrial-uav-redundancy-2026 | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.075% | H2 未命中关键词 |
| /ar/media/low-altitude-economy-2026-outlook | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.080% | H2 未命中关键词 |
| /ar/media/power-line-inspection-drone-guide-2026 | ar | 85 | 是 | 否 | 是 | 是 | 是 | 0.504% | description 未命中关键词 |
| /ar/media/tethered-uav-persistent-surveillance-2026 | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.100% | H2 未命中关键词 |
| /ar/solutions/category/02_InfrastructureProtection | ar | 85 | 是 | 是 | 是 | 否 | 是 | 0.625% | H2 未命中关键词 |
| /ar/solutions/category/04_EmergencyRescue | ar | 85 | 是 | 是 | 是 | 否 | 是 | 0.759% | H2 未命中关键词 |
| /ar/solutions/emergency-communication-uav-solution | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.092% | H2 未命中关键词 |
| /ar/solutions/emergency-search-rescue-uav-solution | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.975% | H2 未命中关键词 |

## H1 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/accessories | ar | 60 | 是 | 是 | 否 | 否 | 是 | 3.804% | H1 未命中关键词; H2 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |
| /es/solutions | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.337% | H1 未命中关键词; H2 未命中关键词 |

## H2 未命中关键词页面

| 页面 | 语言 | 分数 | Title | Desc | H1 | H2 | 正文 | 密度 | 问题 |
| --- | --- | ---: | --- | --- | --- | --- | --- | ---: | --- |
| /ar/accessories | ar | 60 | 是 | 是 | 否 | 否 | 是 | 3.804% | H1 未命中关键词; H2 未命中关键词; 关键词密度偏高，需要检查堆砌风险 |
| /es/solutions | es | 65 | 是 | 是 | 否 | 否 | 是 | 0.337% | H1 未命中关键词; H2 未命中关键词 |
| /ar/about | ar | 70 | 是 | 否 | 是 | 否 | 是 | 0.060% | description 未命中关键词; H2 未命中关键词 |
| /en/media/border-surveillance-uav-network-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.532% | description 未命中关键词; H2 未命中关键词 |
| /en/media/industrial-uav-redundancy-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.394% | description 未命中关键词; H2 未命中关键词 |
| /en/media/low-altitude-economy-2026-outlook | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.369% | description 未命中关键词; H2 未命中关键词 |
| /en/media/tethered-uav-persistent-surveillance-2026 | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.484% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/emergency-communication-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.750% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/emergency-search-rescue-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.738% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/high-rise-firefighting-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.730% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/power-tower-inspection-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.730% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/smart-substation-autonomous-inspection-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.720% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/tethered-lighting-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.745% | description 未命中关键词; H2 未命中关键词 |
| /en/solutions/water-conservancy-monitoring-uav-solution | en | 70 | 是 | 否 | 是 | 否 | 是 | 0.735% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/border-surveillance-uav-network-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.690% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/industrial-uav-redundancy-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.673% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/low-altitude-economy-2026-outlook | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.667% | description 未命中关键词; H2 未命中关键词 |
| /ru/media/tethered-uav-persistent-surveillance-2026 | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.665% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/emergency-communication-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.782% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/emergency-search-rescue-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.785% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/high-rise-firefighting-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.756% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/power-tower-inspection-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.754% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/smart-substation-autonomous-inspection-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.755% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/tethered-lighting-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.786% | description 未命中关键词; H2 未命中关键词 |
| /ru/solutions/water-conservancy-monitoring-uav-solution | ru | 70 | 是 | 否 | 是 | 否 | 是 | 0.762% | description 未命中关键词; H2 未命中关键词 |
| /ar | ar | 85 | 是 | 是 | 是 | 否 | 是 | 0.309% | H2 未命中关键词 |
| /ar/cases | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.243% | H2 未命中关键词 |
| /ar/media/border-surveillance-uav-network-2026 | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.083% | H2 未命中关键词 |
| /ar/media/industrial-uav-redundancy-2026 | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.075% | H2 未命中关键词 |
| /ar/media/low-altitude-economy-2026-outlook | ar | 85 | 是 | 是 | 是 | 否 | 是 | 1.080% | H2 未命中关键词 |

## 正文未命中精确关键词短语页面

无。

## 接下来怎么改

优先处理同时存在 `H1 未命中` 和 `正文未命中` 的页面。修改时不要机械重复关键词，而是把目标关键词自然放进 H1/H2，以及一段能说明场景价值的正文或列表项。

建议顺序：

1. 先改英文重点方案页和栏目页，因为这些页面最接近 Google Ads / SEO 目标词。
2. 每页只选 1 个主关键词、2-4 个辅助关键词，避免把所有 keywords 都塞进标题。
3. H1 使用“主关键词 + 页面对象/场景”，例如 `Power Line UAV Inspection Solution for Utility Operators`。
4. H2 使用“辅助关键词 + 模块含义”，例如把 `Overview` 改成 `UAV Inspection Workflow for Power Lines`。
5. 正文增加 1-2 句自然说明，控制精确短语出现 1-3 次即可。
6. 修改后重新运行 `npm run build` 和 `npm run audit:keywords`，确认 H1/H2/正文命中率提升。
