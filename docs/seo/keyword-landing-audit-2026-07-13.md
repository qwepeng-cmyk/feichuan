# 页面关键词落地审计

生成日期：2026-07-13
数据来源：.next/server/app
完整明细 CSV：docs/seo/keyword-landing-audit-2026-07-13.csv

## 审计范围

- 已审计公开静态 HTML 页面：224
- 已排除非 SEO / 后台 / thank-you / preview 等页面：22
- 关键词来源：每个页面渲染后的 `<meta name="keywords">`。
- 本地化规则：`/es` 页面按西语 meta keywords 检查，`/ru` 页面按俄语 meta keywords 检查，其余页面按英文关键词检查。
- 匹配方式：精确短语匹配，忽略大小写，并做基础词边界处理。
- 密度口径：正文中精确关键词短语出现次数 / 每 100 个正文词。

## 总览

- 强页面：220（98.2%）
- 部分落地页面：0（0.0%）
- 弱页面：4（1.8%）
- 缺少 meta keywords 的页面：4
- 缺少 H1 的页面：4
- 缺少 H2 的页面：4
- Title 命中关键词：220/224（98.2%）
- Description 命中关键词：137/224（61.2%）
- H1 命中关键词：220/224（98.2%）
- H2 命中关键词：220/224（98.2%）
- 正文精确关键词短语命中：220/224（98.2%）

## 语言分布

- en: strong 55, partial 0, weak 1, total 56
- es: strong 55, partial 0, weak 1, total 56
- ru: strong 55, partial 0, weak 1, total 56
- ar: strong 55, partial 0, weak 1, total 56

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
| /en/accessories/fc-bt1 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.268% | description 未命中关键词 |
| /en/accessories/fc-bt2 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.316% | description 未命中关键词 |
| /en/accessories/fc-bt3 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.304% | description 未命中关键词 |
| /en/accessories/fc-bt4 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.186% | description 未命中关键词 |
| /en/accessories/fc-btg | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.424% | description 未命中关键词 |
| /en/accessories/fc-c2d-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.764% | description 未命中关键词 |
| /en/accessories/fc-c2e-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.810% | description 未命中关键词 |
| /en/accessories/fc-c2t-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.785% | description 未命中关键词 |
| /en/accessories/fc-c2u-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.792% | description 未命中关键词 |
| /en/accessories/fc-c2ud-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.749% | description 未命中关键词 |
| /en/accessories/fc-mesh-100 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.619% | description 未命中关键词 |
| /en/accessories/fc-pab-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.774% | description 未命中关键词 |
| /en/accessories/fc-pad-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.774% | description 未命中关键词 |
| /en/accessories/fc-pae-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.769% | description 未命中关键词 |
| /en/accessories/fc-pbf-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.824% | description 未命中关键词 |
| /en/accessories/fc-sjl-100 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.712% | description 未命中关键词 |
| /en/accessories/fc-sjl-200 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.709% | description 未命中关键词 |
| /en/accessories/fc-sjl-30 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.692% | description 未命中关键词 |
| /en/accessories/fc-sjl-380 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.708% | description 未命中关键词 |
| /en/accessories/fc-sjl-50 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.694% | description 未命中关键词 |
| /en/accessories/fc-u10-pro | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.954% | description 未命中关键词 |
| /en/accessories/fc-u12 | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.975% | description 未命中关键词 |
| /en/accessories/fc-u9-ag | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.910% | description 未命中关键词 |
| /en/accessories/fc-w2u-propeller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.884% | description 未命中关键词 |
| /en/accessories/fc-yk24-remote-controller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.608% | description 未命中关键词 |
| /en/accessories/fc-yk32-remote-controller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.697% | description 未命中关键词 |
| /en/accessories/fc-ykrc7-remote-controller | en | 85 | 是 | 否 | 是 | 是 | 是 | 0.492% | description 未命中关键词 |
| /es/accessories/fc-bt1 | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.193% | description 未命中关键词 |
| /es/accessories/fc-bt2 | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.227% | description 未命中关键词 |
| /es/accessories/fc-bt3 | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.217% | description 未命中关键词 |
| /es/accessories/fc-bt4 | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.135% | description 未命中关键词 |
| /es/accessories/fc-btg | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.308% | description 未命中关键词 |
| /es/accessories/fc-c2d-propeller | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.484% | description 未命中关键词 |
| /es/accessories/fc-c2e-propeller | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.507% | description 未命中关键词 |
| /es/accessories/fc-c2t-propeller | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.492% | description 未命中关键词 |
| /es/accessories/fc-c2u-propeller | es | 85 | 是 | 否 | 是 | 是 | 是 | 0.502% | description 未命中关键词 |

## H1 未命中关键词页面

无。

## H2 未命中关键词页面

无。

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
