N-TET 专业 C-UAS 网站转化改版

总体方案
将英文站定位统一为 N-TET Professional C-UAS Equipment Manufacturer & System Supplier，第一屏只讲无人机探测、识别、跟踪和空域管理。
首期覆盖英文首页、导航、产品中心、重点产品详情、About 制造实力、案例入口和询盘链路；俄语、西语、阿语暂时保持现状。
工业无人机、安检、桥梁、医院等业务从英文首页和导航隐藏，原有 URL 保持可访问，避免历史流量和索引损失。
使用已授权的 PPT 产品、案例、研发、测试和车间图片，去除凡双标识；不展示证书、专利数量、产业园面积或无法由 N-TET 出示的资质。PPT 提供了完整的研发生产、产品矩阵和项目证据素材。凡双科技公司及产品介绍_销售.pptx (幻灯片 3) 凡双科技公司及产品介绍_销售.pptx (幻灯片 11)

页面与视觉改造
首页改用真实反无设备作为首屏主视觉，取消工业无人机巡检视频主导；采用石墨黑、工业白、N-TET 蓝和高对比 CTA，避免复制 fsain 的红黑视觉。
首屏固定文案方向：H1：Professional C-UAS Detection & Airspace Monitoring Equipment
主 CTA：Get Price & Brochure on WhatsApp
次 CTA：View C-UAS Equipment
副文案明确便携式、固定式、车载式和管理平台四种采购形态。

首页顺序调整为：反无定位 → 四类设备入口 → 热门型号 → 探测/识别/跟踪/管理能力链 → 制造测试证据 → 应用案例 → 采购与交付能力 → 短询盘。
About 增加 Manufacturing & Quality 区域，展示 RF/SDR 研发、暗室测试、环境测试、生产装配和系统联调；统一描述为“支持 N-TET 产品交付的 OEM 制造与测试基地”，不暗示厂房产权。
首页案例仅展示机场、发电厂、炼化设施、工厂和大型活动等现有 C-UAS 案例；新闻仅展示 C-UAS、雷达、RF、EO、Remote ID 和项目交付内容。PPT 案例素材用于增强可验证的部署氛围。凡双科技公司及产品介绍_销售.pptx (幻灯片 12)

产品与内容结构
新建英文 C-UAS 展示映射，将现有公开产品重组为：Portable C-UAS Devices：PL280H、便携 RF 识别、便携监测箱和现场套件。
Fixed-Site C-UAS Systems：固定 RF、低空雷达、EO 跟踪、Remote ID 和信号验证设备。
Vehicle-Mounted Monitoring：使用授权车载素材制作可配置系统卡。
C-UAS Control Platform：展示多源接入、地图态势、告警和设备管理能力。

车载系统和管理平台首期作为 Custom Configuration 采购卡，直接进入 WhatsApp，不创建含虚构参数的详情页；收到正式英文规格后再加入数据库和索引。

询盘与接口
WhatsApp 成为全站第一 CTA，按钮文案根据位置使用 Get Price on WhatsApp、Request Brochure 或 Ask About This Device。
WhatsApp 弹窗只要求姓名和 WhatsApp/电话；国际区号仅在号码没有 + 时要求，需求说明和邮箱均为可选。
自动把产品名称、handle、页面地址和 CTA 位置写入预填消息及询盘记录，采购商无需重复说明正在看的设备。
次级短表单采用姓名、WhatsApp/电话必填，邮箱、公司和需求说明可选；提交成功后继续进入 Thank You 页面。
扩展 InquiryForm 和 WhatsAppLeadButton 的产品上下文属性；两个 API 接受产品和来源字段，并复用现有 source_page、demands、message 存储，不修改询盘表结构。
分开记录 ntet_whatsapp_lead_open、ntet_whatsapp_lead_submit 和 ntet_short_inquiry_submit，仅在服务器成功保存线索后触发转化；事件携带 product_handle、cta_location 和 page_path。


已锁定假设
N-TET 获得 PPT 中产品、案例、工厂和测试图片的白牌使用授权，并允许移除凡双标识。
不使用证书图片，不声称凡双证书、专利、团队人数或产业园面积属于 N-TET。
首期目标是提高英文 C-UAS 采购流量的有效 WhatsApp/电话留资率，其他语言和旧业务不在本轮重写范围。
没有完整规格的 PPT 新产品只做采购入口，不编造参数、型号、认证或交付案例。

## 新对话使用方式



## 项目与范围

- 工作区：`D:\fc-cuas`
- 当前分支：`codex/cuas-professional-site`
- 技术栈：Next.js 14 App Router、React、CSS Modules、i18n
- 当前阶段只做本地预览，不执行生产部署。

## 核心目标

把 N-TET 首页调整为更专业、设备导向的反无人机设备供应商网站，提高采购询盘转化，同时尽量保留原网站的布局体系、导航、页宽、品牌蓝、橙色 CTA、页脚与 992px 响应式断点。

参考来源：

- 竞品参考：`fsain.com`
- 产品与公司资料：`C:\Users\admin\Documents\xwechat_files\qiweipeng_e3eb\msg\file\2026-07\凡双科技公司及产品介绍_销售.pptx`

## 已确认设计决策

- 首页首屏继续使用视频背景结构，不改变现有导航形式。
- 首屏视频文件：`public/index_banner_bg_5.mp4`
- 首屏主视觉与文案突出专业 C-UAS / anti-drone 设备，而不是工业无人机业务。
- 产品分为四类：
  - Portable C-UAS Devices
  - Fixed-Site C-UAS Systems
  - Vehicle-Mounted C-UAS
  - C-UAS Control Platform
- 产品区采用专业线性设备图标作为次导航，产品主体图保持大尺寸和清晰展示。
- 产品采购动作使用直接表达，例如 `Get Price on WhatsApp`、`Explore Device`、`Request Brochure`。
- 首页 Solutions 区域保留原首页的横向高卡片轮播样式，不改成产品中心式分类导航。
- 深色工业风只用于产品与技术区域，整站不全部改成暗黑风；继续保留 N-TET 蓝色与橙色 CTA。
- `Counter-Drone Projects` 当前显示 6 个案例，桌面端每行 3 个，共两行；移动端单列。
- `N-TET Delivery Evidence` 整个区域已按用户要求删除，不应恢复，除非用户重新明确提出。

## 当前页面顺序

1. 视频首屏
2. 原首页样式的 Solutions 横向卡片区
3. 四类 C-UAS 产品区
4. `See. Identify. Control.` 技术链
5. `Counter-Drone Projects` 六案例区
6. WhatsApp / Brochure 采购 CTA




当前预览页通过页面 metadata 设置：

- `noindex`
- `nofollow`

不得将隐藏预览加入 sitemap、Schema 或 `llms.txt`。

## 内容与证据边界

- 原型阶段可以使用 `anti-drone`、`counter-drone`、`jamming`、`jammer`、`spoofing`、`spoofer`、`C-UAS` 等术语。
- 不虚构或暗示 N-TET 无法出示的专利、证书、工厂面积、产能或自有制造能力。
- 案例、设备参数与交付能力文案应以项目中可验证资料为依据。

## 当前本地首页状态

- 2026-07-12 已将 `src/app/[locale]/page.tsx` 的页面主体切换为 `HomeRebuildPreview`。
- 本地访问 `/`、`/en` 等首页路由时显示当前 C-UAS 新版首页。
- `/home-rebuild-preview` 隐藏预览路由继续保留，便于对照与调试。
- 首页原有 SEO metadata 生成逻辑继续保留；只有隐藏预览路由设置 `noindex, nofollow`。
- 本次切换仅存在于 `D:\fc-cuas` 本地工作区，未提交生产部署，线上 `n-tet.com` 未改变。


