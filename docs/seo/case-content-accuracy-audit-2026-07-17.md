# N-TET 案例页面内容准确性审计与整改复核

审计日期：2026-07-17  
审计对象：整改前 `data/ntet.db` 中 12 条已发布案例，以及 `/cases` 列表页文案、案例详情页关联产品、`public/cases/*.json`、3 份案例原始 Word、本地产品资料与公开网页证据。  
整改复核：2026-07-17；当前为 11 条已发布案例，肇庆案例已取消发布。

## 结论先行

初始审计发现 12 条案例中：

- 1 条存在可确认的项目/产品归属错误：`zhaoqing-long-distance-power-line-uav-inspection`。**已取消发布，不改写成行业参考。**
- 8 条缺少能证明 N-TET 参与、项目年份、设备清单或量化成果的独立证据。
- 3 条有内部 Word 材料支持项目场景，但公开页曾把原资料中的设备替换成未被原资料支持的雷达、EO 或平台设备。**现已恢复原始设备类型与主动能力描述。**
- `/cases` 列表页声称案例“approved for external review”，但仓库内没有客户授权、对外发布批准或证据登记记录支持该说法。**按业务决定暂不修改。**
- 俄语、阿拉伯语曾存在内容不一致。**俄语英文回退、阿拉伯语关键事实缺失和多语言 Snapshot 已修复。**

初始综合内容准确性与 E-E-A-T 得分：**29/100**；初始 AI 引用就绪度：**22/100**。这两项为整改前基线，不因本次局部整改重新评分。8 条证据缺口及对外展示授权声明仍按业务决定暂不处理。

## 整改状态

- **已完成**：肇庆案例下架，并从 `llms.txt` 与公开生成链路移除；未采用“飞马机器人行业参考”等替代名称。
- **已完成**：机场、亚运会、水利案例恢复原始材料支持的 RF 侦测、RF 干扰、便携式反制与指挥协同信息，移除无来源的雷达/EO 替换。
- **已完成**：修复亚运会无效产品 handle；页面区分 `Equipment Used` 与 `Recommended Equipment`。
- **已完成**：修复俄语英文回退、阿拉伯语关键事实缺失、西班牙语 Snapshot 和部分术语问题。
- **暂不处理**：8 条案例的项目证据缺口。
- **暂不处理**：“approved for external review”声明缺少授权记录的问题。

## 评分

| 维度 | 得分 | 主要依据 |
|---|---:|---|
| Experience | 8/25 | 有图片和 3 份内部 Word，但多数项目缺少合同、验收、原始报告、照片元数据或客户批准 |
| Expertise | 12/25 | 技术叙述大体合理，但多处把方案能力写成项目事实，且为合规而替换设备类型 |
| Authoritativeness | 3/25 | 无客户/运营方/第三方引用；肇庆案例可追溯到另一厂商 |
| Trustworthiness | 6/25 | 有发布批准声明却无批准证据；年份、里程、架次、缺陷数普遍无证据登记 |

## 逐案例审计矩阵

| 案例 | 当前证据状态 | 风险 | 审计判断 |
|---|---|---:|---|
| Airport C-UAS Application | 内部 Word 部分支持 | 已整改 | 已恢复 RF 监测、定向干扰、便携设备与指挥平台；移除无来源的雷达/EO |
| Asian Games Low-Altitude C-UAS Application | 内部 Word 部分支持 | 已整改 | 已恢复 2023 亚运、多城协同、RF、干扰和便携设备；无效产品 handle 已修复 |
| Water Conservancy Facility Low-Altitude C-UAS | 内部 Word 部分支持 | 已整改 | 已恢复 RF 侦测 + RF 干扰；移除无来源的雷达/EO/平台设备 |
| C-UAS Case of a Refinery in Brazil | 无独立来源 | P1 | 2025 年、炼厂部署、设备清单只存在于 N-TET 自身 JSON/网页；公开检索只返回 N-TET 自身页面 |
| C-UAS Case of a Group Factory in Nigeria | 无独立来源 | P1 | 2025 年、工业园部署、移动监测设备均无仓库来源文档或独立公开来源 |
| C-UAS Case of a Power Plant in Pakistan | 无独立来源 | P1 | 2024 年、电厂部署、设备清单无仓库来源文档或独立公开来源 |
| Anhui Flood-Season Emergency UAV Patrol | 无 N-TET 项目证据 | P1 | 公开搜索能证明池州九华是电网无人机巡检场景，但不能证明“150+ 架次”或 N-TET 参与 |
| Ice and Snow Disaster Emergency UAV Inspection | 无 N-TET 项目证据 | P1 | -15 C、400 km、18 个起降点、12 处缺陷、12 份报告均未找到本地独立来源或公开交叉来源 |
| LiDAR Tree-Obstruction UAV Inspection | 无 N-TET 项目证据 | P1 | 2024、Southern Grid、N-TET VTOL 与 LiDAR 项目归属无来源；本地 Word 仅支持通用 LiDAR/树障能力 |
| Southern Grid Wildfire Prevention UAV Inspection | 无 N-TET 项目证据 | P1 | 280 km、4 天、8 架次、近 10 个风险点均无独立来源 |
| Wildfire Emergency Transmission-Line UAV Patrol | 无 N-TET 项目证据 | P1 | 2025、13 个地区、数万公里、State Grid 项目归属均无独立来源 |
| Zhaoqing Long-Distance Power-Line UAV Inspection | 已确认外部归属 | **已下架** | `is_published=0`，推荐产品已清空，已退出 `llms.txt`；不再作为 N-TET 案例或“行业参考”公开展示 |

## P0：肇庆案例存在明确归属错误

N-TET 页面写道：110 kV、37.9 km、平均塔高 35 m、112 基杆塔、最大高差 440 m、10 架次、每架次后立即解算与拼接、拐点无重影、拼接处无错位，并称为 “our product”。

公开 PDF《8000 公里电力激光雷达巡线案例及拓展应用》第 5.2 节包含完全相同的数字和结果，并明确设备是 **飞马机器人 D300L + DLiDAR150**，项目时间为 2020 年。来源：

- https://cheesi-1251680498.file.myqcloud.com/wp-content/uploads/2020/12/8000%E5%85%AC%E9%87%8C%E7%94%B5%E5%8A%9B%E6%BF%80%E5%85%89%E9%9B%B7%E8%BE%BE%E5%B7%A1%E7%BA%BF%E6%A1%88%E4%BE%8B%E5%8F%8A%E6%8B%93%E5%B1%95%E5%BA%94%E7%94%A8-42.pdf

现有证据不能把该项目或成果归属于 N-TET。该页面继续作为 N-TET deployment case 发布，会构成客户/产品归属误导。

**整改结果：**该案例已直接取消发布，`is_published=0`，推荐产品关联已清空，并已从 `public/llms.txt` 和案例同步发布列表中移除。未采用“行业公开参考”或“飞马机器人行业参考”等替代名称。

## P1：合规降敏造成设备事实被替换

3 份本地原始 Word 的实际内容为：

- `public/cases/airport-security-application/机场低空安防应用.docx`：RF 频谱分析、定向 RF 干扰、便携式反制、指挥平台；未在正文中支持低空雷达或 EO 跟踪。
- `public/cases/asian-games-security/亚运会低空安防应用.docx`：无线电侦测、干扰设备、便携式反制盾、统一平台；未在正文中支持低空雷达或 EO 验证。
- `public/cases/water-conservancy-security/水利设施低空安保.docx`：RF 侦测 + RF 干扰；未在正文中支持雷达、EO 或额外平台设备。

公开页此前为了避免主动能力词，把设备写成了雷达、EO、监测平台等另一套设备，造成事实失真。

**整改结果：**已停止对这 3 条案例做设备类型降敏，恢复原始材料支持的 RF 侦测、定向/全向 RF 干扰、便携式反制与指挥协同描述，并同步更新 EN/RU/ES/AR 正文、设备列表和 Case Snapshot。

## P1：案例批准与保密声明缺少依据

`src/dictionaries/en.json` 当前声明：

> The cases shown here are selected references approved for external review.

仓库未发现客户发布授权、审批编号、批准日期或证据登记字段。该句会使读者合理相信每个客户/地点/指标都已获授权。

**处理决定：**按业务要求，本轮暂不修改该声明；风险保留在审计记录中。

## P1：关联产品与案例设备不一致

- Asian Games 原有的 `directional-rf-event logging` 含空格且在产品表中不存在。现已改为有效且已发布的 `directional-rf-interference-device`。
- Brazil 与 Pakistan 的正文只写监测、验证和记录，却关联主动 RF site units；没有证据证明这些设备属于该项目。
- 6 个电力案例统一关联两款 N-TET 电力巡检 UAV，但没有证据证明这些型号参与了对应项目；肇庆案例已知使用的是飞马 D300L。

**整改结果：**案例页已区分 `Equipment Used` 与 `Recommended Equipment`，避免把相似产品推荐直接表述为项目实际使用设备。其余 8 条案例的产品证据缺口按业务要求暂不处理。

## 本地化准确性

- 俄语：Airport、Brazil、Pakistan 的英文回退已修复。
- 阿拉伯语：已补回与英文对应的日期、里程、架次和数量等关键事实。
- 西班牙语：已补齐 Snapshot，并将已发布案例中的 `incursiones` 调整为更中性的 `vuelos`。
- Case Snapshot：机场、亚运会、水利及其他目标案例已补齐对应语言版本，避免详情页回退到英文。

## SEO、GEO 与公开可见性风险

### SEO 风险

- 错误归属的肇庆页已取消发布，并退出公开生成链路。
- 公开页没有可见来源、证据状态、审核人或最近核验日期。

### GEO / AI 可见性风险

- `public/llms.txt` 已重新生成，肇庆 URL 和摘要均已移除。
- 其余 8 条未核验案例仍在公开内容中；该风险按业务决定暂不处理。

### Public visibility leaks

- 肇庆详情已取消发布；其余公开案例仍由当前发布状态控制。
- `src/lib/complianceTaxonomy.ts` 当前把旧 A/B/C 分层全部退役并允许所有内容公开；这与项目工作说明中仍要求的主动能力限制和两个定向例外口径冲突。该治理冲突会让自动审计无法阻止高风险内容或产品关联。

## 处理结果与保留项

### 已完成

1. 肇庆案例已取消发布，推荐产品已清空，并从 `llms.txt` 和同步发布列表中移除；不保留为行业参考。
2. Airport、Asian Games、Water Conservancy 已恢复原始材料支持的设备与主动能力描述。
3. 已修复无效产品 handle，并在页面上区分实际设备与推荐设备。
4. 已修复本轮发现的俄语、阿拉伯语、西班牙语和 Snapshot 不一致。

### 按业务决定暂不处理

1. 其余 8 个案例的 N-TET 参与、年份、设备清单或量化成果证据缺口。
2. “approved for external review”声明缺少授权记录支持的问题。

### 建立长期证据门槛

建议为 `cases` 增加并强制填写：

- `evidence_status`: `verified_public` / `verified_anonymous` / `scenario_only` / `unverified`
- `source_type`: contract / acceptance report / customer release / official news / internal memo
- `source_ref`
- `customer_approval_status` 与 `customer_approval_date`
- `equipment_used_handles`
- `metrics_definition`
- `verified_by` 与 `verified_at`

只有 `verified_public` 或具备内部证据与发布批准的 `verified_anonymous` 才能使用 “deployment case”、客户/地点、年份和量化成果。

## 整改验证

- 数据库：11 条案例已发布；肇庆是唯一 `is_published=0` 的案例，且推荐产品为空。
- 公开输出：肇庆详情最终响应为 404，sitemap 与 `public/llms.txt` 均不含肇庆；机场、亚运会、水利仍正常收录。
- 产品关联：3 条恢复案例的推荐产品 handle 均存在且已发布；无 `directional-rf-event logging` 残留。
- 本地化：3 条恢复案例的 EN/RU/ES/AR 正文和 Case Snapshot 均完整。
- 工程验证：TypeScript 检查与隔离目录生产构建通过；`audit:seo`、`audit:geo`、`audit:schema` 通过。
- 非本轮问题：`audit:links` 仍报告 2 条既有解决方案缺失产品链接；`audit:eeat` 仍报告 1 条产品摘要过短。
- 合规门禁：`audit:public-risk` 仍按旧主动能力词表报错，与本轮“不再合规降敏”及当前 `complianceTaxonomy.ts` 全公开行为冲突；本轮未为通过旧门禁而再次改写案例事实。

## 审计限制

- 公开检索不能证明某个保密项目不存在；“未找到”只表示当前仓库和公开来源不能验证。
- 原始 Word 渲染器因本机缺少 LibreOffice 未能生成页面图；本次对 Word 采用完整段落结构化提取，未把版式检查视为已通过。
- 本次未访问合同、验收报告、CRM、客户邮件或授权书；若这些材料存在，应按上述证据字段补录并重新审计。
