# 广告合规纯净版落地页方案

## 2026-05-19 执行状态

第一阶段主站合规改造已执行到可本地验收状态：

- 已创建改造前 Git tag：`pre-ad-compliance-2026-05-19`。
- 已完成本地备份：`backups/2026-05-19-pre-ad-compliance/`，并已将 `backups/` 加入 `.gitignore`，不会进入 `.next` 部署包。
- 已新增 `src/lib/complianceTaxonomy.ts`，集中维护 `normal / neutral_seo / restricted` 分级、红线词替换、公开分类映射。
- 已从主站公开产品/方案/案例/媒体数据层过滤 `restricted` 内容；主动反制类产品、主动反制方案、当前高危案例和高危媒体文章不再进入公开列表和详情页。
- 已清理首页、导航、footer、产品中心、分类页、表单占位文案、metadata、媒体 JSON、案例 JSON 与重点俄文红线表达。
- 已完成首轮图片清洗与审计记录：`docs/ad-compliance-image-audit.csv`。
- 已新增公开风险审计脚本：`scripts/audit-public-site-risk.mjs`，并加入 `package.json` 的 `audit:public-risk`。
- 已执行干净构建：先删除 `.next/`，再运行 `npm run build`，构建通过。
- 已执行静态产物审计：`AUDIT_STATIC_DIR=.next/server/app node scripts/audit-public-site-risk.mjs`，结果通过。
- 第二阶段后台可视化基础版已开始执行：新增 `/admin/compliance`、`/api/admin/compliance`、`compliance_terms` 与 `compliance_content_rules` SQLite 表。
- 按当前运营需求，后台广告合规页面先只展示“屏蔽词管理”；产品/方案/案例/媒体分级暂时仍由代码规则控制，后续如需要再合并进各自管理页。

当前策略状态：

- 公开主站先作为 Google/Yandex 可扫描的安全版本使用。
- `/lp/` 广告专用入口仍放到第三阶段，暂不执行。
- 第二阶段后续可继续补图片审计可视化、审计结果查看和高危放开复核流程，但不作为当前必做项。

更新时间：2026-05-19

## 目标

为 N-TET 的工业无人机、反无人机/低空安防、安检、工程材料、监控设备等品类切出一套公开可访问、内容一致、面向广告审核的纯净版落地页，用于 Google Ads 中东投放与 Yandex Direct 俄语/CIS 投放。

核心原则：

- 不做 cloaking，不按 GoogleBot/YandexBot/User-Agent 展示不同内容；广告审核员、普通访客、搜索引擎看到同一版页面。
- 不把“违规产品换词硬卖”。涉及主动干扰、压制、诱骗、枪型设备、武器化表达的产品，在广告版中下架或改为“咨询型/能力边界说明”，不直接做付费广告落地页。
- 广告版 URL 与主站常规产品页隔离，但不能把隔离当作规避审核。Google/Yandex 可能扫描广告最终 URL、同域名可达页面、sitemap、导航、footer、结构化数据和公开媒体内容；因此需要同时做“广告入口干净化”和“全站风险分层”。
- 广告文案、关键词、落地页、图片、表单占位文案、SEO metadata、OpenGraph、结构化数据统一清洗。

## 政策依据与边界

参考：

- Google Ads Dangerous products or services：广告和落地页不得推广会造成伤害、损害或伤人的产品/服务；武器、枪支相关、其他用于伤害的武器类产品受限或禁止。
  https://support.google.com/adspolicy/answer/6014299?hl=en
- Google Ads Enabling dishonest behavior：不得推广帮助用户未经授权访问、改变系统/设备/财产的产品；示例包含 radar jammers。
  https://support.google.com/adspolicy/answer/6016086?hl=en
- Yandex Direct 武器/军品限制：俄罗斯投放中，不能推广军用产品和各类武器。
  https://yandex.ru/support/direct/ru/moderation/categories/weapons-restr
- Yandex Direct 类似武器构造产品：可投放但限制较多，页面不得称为武器，不得暗示狩猎/攻击用途；产品外观像武器时图片必须让人明显看出不是武器，部分国家需要合格证明。
  https://yandex.ru/support/direct/en/moderation/categories/weapons-pseudoweapon
- Yandex Direct 医疗器械：俄罗斯投放医疗设备需要医疗设备登记证书副本；野战医院/移动医疗舱在没有文件前不进 Yandex 俄区广告版。
  https://yandex.ru/support/direct/zh/moderation/categories/medicine-medical-devices

结合 Yandex 审核反馈：

- 六类无人机产品可以在 Yandex 投放，但定位必须是民用工业设备。
- 防无人机/无人飞行器防护产品容易被认定为军用商品，俄区广告页应仅保留“探测、监控、分析、告警、记录、空域管理”类表达，暂不推广主动反制设备。
- 工程材料、金属探测器、便携式探测器、检测设备、监控摄像头、测量仪器等可作为安全品类优先投放。
- 野战医院如投放俄罗斯，需要先准备医疗设备登记证书。

## 当前站内风险点

已初步扫描 `src/`、`public/` 与 `data/ntet.db`，广告审核风险主要来自：

- 静态文案：`src/dictionaries/en.json`、`src/dictionaries/ru.json`、`src/constants/homeData.ts`、`src/components/home/*`、`src/components/pc/DesktopHeader.tsx`、`src/components/mobile/*`。
- 数据库内容：`products`、`solutions`、`cases`、`media` 表内含 `jammer`、`jamming`、`spoofing`、`gun`、`intercept`、`defeat`、`military`、`tactical`、`defense`、`anti-UAV`、`C-UAS` 等词。
- 高风险产品 handles：
  - `directional-rf-jammer`
  - `omni-directional-rf-jammer`
  - `portable-anti-drone-jammer-shield`
  - `portable-anti-drone-jammer-shield-pro`
  - `portable-integrated-detection-jamming-pro-c-uas`
  - `portable-integrated-detection-jamming-c-uas-basic`
  - `stationary-active-rf-defense-system`
  - `uav-navigation-spoofing-system`
  - `portable-active-rf-defense-system`
  - `handheld-integrated-sdr-c-uas`
  - `handheld-integrated-multi-band-jammer-gun`
- 高风险方案/案例：
  - `/solutions/*anti-uav*`
  - `/solutions/*protection*` 中涉及反制、干扰、诱骗、拦截的段落
  - `/cases/*anti-uav*`
  - 媒体文章中 C-UAS、jamming、military、spoofing 讨论内容
- 图片风险：
  - 枪型/盾牌型/便携式干扰设备图片不进入广告版。
  - 广告版优先使用工业无人机、雷达/相机、监控后台、安检门/X 光机、桥梁构件、普通工业场景图片。

## 全站分层策略

如果同一个 `n-tet.com` 既跑 Google/Yandex 广告，又公开保留大量 jammer、spoofing、gun、主动反制、军用/战术表达，广告审核仍可能沿同域名扫描发现风险。因此 URL 隔离只是必要条件，不是充分条件。

当前主策略应先直接改主站，把产品和内容资产分为三类，而不是先做一套 `/lp/` 特供入口：

- 正常产品：可以留在主站公开导航、产品中心、sitemap、广告可达路径中。
- 中性产品/中性内容：可以留在主站做 SEO，但不能写成主动反制销售页。
- 主动反制类：不应继续作为主站公开销售目录的一部分，也不应出现在广告可达路径中。

对应执行分层如下：

### A 层：正常产品，广告安全主站

保留在 `n-tet.com` 主导航、footer、sitemap、广告落地页可达路径中。

允许内容：

- 工业无人机：巡检、消防、通信、水利、环保、油气、电力。
- 被动探测与空域监控：Drone Detector、Airspace Monitor、RF Scanner、Signal Analyzer、Low-altitude Radar、EO/IR Tracking。
- 安检设备、金属探测器、X 光机、液体/辐射检测、监控摄像头、测量仪器。
- 工程材料、钢桥、桥梁构件、快速部署基础设施。

要求：

- 主导航、footer、首页、产品中心、solutions、cases、media 中不能直接暴露高风险销售页。
- 页面文案统一民用工业定位。
- 所有广告入口只链接 A 层页面。

### B 层：中性产品/中性 SEO 内容

可以仍在 `n-tet.com` 上，但不作为广告落地页，不从广告页链接过去，且文案必须是教育型/合规型。

适合承接的 SEO 主题：

- `drone detection system`
- `low-altitude airspace monitoring`
- `RF spectrum monitoring`
- `critical infrastructure airspace monitoring`
- `unauthorized drone detection`
- `remote ID monitoring`

要求：

- 不出现价格、购买按钮、主动干扰/诱骗/击落/压制能力。
- 不展示枪型、盾牌型、肩扛型设备图。
- CTA 只做“咨询合规方案/获取资料”，不直接引导购买高风险设备。
- 可以 `noindex` 或不进 sitemap，视广告账号风险承受度决定。

### C 层：主动反制类，敏感产品技术资料

包括主动干扰、导航诱骗、枪型/盾牌型、手持反制设备等。

推荐处理：

- 最稳妥：迁移到独立域名或独立技术资料站，不与 Google/Yandex 广告主站互链。
- 次稳妥：放在受控目录，不进主站导航/footer/sitemap，不从广告页、A 层、B 层链接过去。
- 页面必须有“仅面向依法授权机构、使用需遵守当地频谱/航空/进口/执法授权法规”的边界说明。
- 不放价格、购物车、操作教程、攻击性案例、击落/摧毁图。

不建议：

- 在同一个公开产品中心里同时放广告安全产品和 jammer/gun/spoofing 详情页。
- 通过 User-Agent、IP、参数给审核员和普通用户展示不同内容。
- 只洗广告落地页但保留全站可达的高风险导航和 sitemap。

## 初版分类清单

以下清单基于当前 `data/ntet.db` 的 `products`、`solutions`、`cases` 表。判定口径是当前公开页面的实际内容，而不是未来改写后的理想状态。

### Products / 正常产品

这些可以保留在主站公开产品中心、导航、footer、sitemap 和广告可达路径中，但仍需把 `Defense Engineering`、`defense`、`tactical`、`military` 等词改成更中性的工业/安防/基础设施表达。

工业无人机：

- `fc-dlxj-01-power-grid-inspection-drone` — Power Grid Inspection Drone
- `fc-sljc-01-water-conservancy-monitoring-drone` — Water Conservancy Monitoring Drone
- `fc-yjtx-01-emergency-communication-drone` — Emergency Communication Drone
- `fc-yjxf-01-aerial-firefighting-drone` — Aerial Firefighting Drone
- `fc-yjzc-01-emergency-reconnaissance-drone` — Emergency Response Drone
- `fc-yjzm-01-emergency-lighting-drone` — Emergency Lighting Drone
- `fc-yqxj-01-utility-inspection-drone` — Oil & Gas Pipeline Inspection Drone

安检/检测设备：

- `fc5030-compact-x-ray-baggage-scanner` — X-Ray Baggage Scanner FC5030
- `fc6550-standard-x-ray-baggage-scanner` — X-Ray Baggage Scanner FC6550
- `fc6550d-dual-view-baggage-scanner` — Dual-View X-Ray Baggage Scanner FC6550D
- `fc-c-deluxe-walk-through-metal-detector` — Walk-Through Metal Detector FC-C (Deluxe)
- `fc-c-lcd-walk-through-metal-detector` — Walk-Through Metal Detector FC-C (LCD, 12-Zone)
- `fc2088-handheld-metal-detector` — Handheld Metal Detector FC2088
- `fc-h-smart-phone-detection-gate` — Smart Phone Detection Gate FC-H
- `fc-h-smart-phone-detection-gate-29in` — Smart Phone Detection Gate FC-H (29-inch Display)
- `fc-3000-ferromagnetic-detection-column` — Intelligent Ferromagnetic Detection System FC-3000
- `fc1500-handheld-liquid-detector` — Handheld Liquid Detector FC1500
- `fc1500b-desktop-liquid-security-inspector` — Desktop Liquid Security Inspector FC1500B
- `fc1800b-portable-explosives-and-narcotics-detector` — Portable Explosives & Narcotics Detector FC1800B
- `fc1800t-desktop-explosives-narcotics-detector` — Desktop Explosives & Narcotics Detector FC1800T
- `fc-pd500-personal-radiation-dose-alarm` — FC-PD500 Personal Radiation Dose Alarm
- `fc902-personal-radiation-dose-alarm` — Radiation Dose Alarm FC902
- `fc4028-neutron-ambient-dose-rate-meter` — FC4028 Neutron Ambient Dose Equivalent Rate Meter
- `fbg-g15-fc06-explosion-containment-vessel` — Explosion Containment Vessel FBG-G1.5-FC06
- `fbt-fc09-explosion-protection-blanket` — Explosion Protection Blanket FBT-FC09
- `fc-smart-swing-turnstile` — Deluxe Smart Swing Turnstile

周界监控/光电设备：

- `fc-dma-long-range-optical-turntable` — FC-DMA Multi-Spectral EO/IR PTZ Turret
- `fc-dms10-smart-electronic-sentinel` — FC-DMS10 Series Smart Electronic Sentinel
- `fc-dtvc-dual-band-thermal-ptz` — FC-DTVC Series Dual-Band Thermal High-Speed Dome
- `fc-rc-series-hd-laser-camera` — FC-RC Series HD Long-Range Laser Camera
- `fc-rds500-4r-radar-vision-sentinel` — FC-RDS500-4R Radar-Vision Fusion System
- `fc-ttvc-intelligent-multi-band-camera` — FC-TTVC Series Intelligent Multi-Band Camera

工程/医疗：

- `bailey-bridge` — Bailey Steel Bridge Overview。主站命名改为 `Bailey Steel Bridge / Engineering Materials`，不要继续用 `Defense Engineering`。
- `containerized-medical-rescue-system` — Containerized Medical Rescue System。Google 可保留；Yandex 俄区需要医疗设备登记证书前不投放。
- `intelligent-mobile-cabin-hospital` — Intelligent Mobile Cabin Hospital。Google 可保留；Yandex 俄区需要医疗设备登记证书前不投放。

### Products / 中性产品

这些可以留在主站做 SEO 和询盘，但要改写成“被动探测/监控/识别/记录/空域管理”。不得在公开页写主动反制、干扰、诱骗、压制、击落、拦截，不展示枪型/盾牌型图，不从广告页直接链接。

- `stationary-rf-detection-system` — Stationary RF Detection System
- `portable-rf-detection-case` — Hand-carried RF Detection System
- `composite-electro-optical-tracking-system` — Electro-Optical (EO) Tracking System
- `uav-remote-id-monitoring-system` — UAV Remote ID Monitoring System
- `handheld-rf-detection-system-mini` — Handheld RF Detection System
- `low-altitude-detection-radar-ku-band` — Low-Altitude Detection Radar (Ku-Band)
- `low-altitude-3d-pulse-doppler-radar` — Low-Altitude Detection Radar (X-Band)

当前注意点：

- 上述部分详情页现在仍命中 `anti-drone`、`C-UAS`、`interference`、`jam`、`spoof` 等词，需要清洗后才适合放在主站 SEO 路径。
- 推荐统一命名方向：`Drone Detection`、`Low-Altitude Airspace Monitoring`、`RF Spectrum Monitoring`、`Remote ID Monitoring`、`EO/IR Tracking`。

### Products / 高危，主动反制类

这些不应继续出现在主站公开产品中心、导航、footer、sitemap、首页推荐、广告可达路径中。若保留，应迁移到 C 层独立技术资料资产或受控目录。

- `directional-rf-jammer` — Directional RF Jammer
- `omni-directional-rf-jammer` — Omni-directional RF Jammer
- `portable-anti-drone-jammer-shield` — Portable Anti-Drone Jammer Shield
- `portable-anti-drone-jammer-shield-pro` — Portable Anti-Drone Jammer Shield (Pro)
- `portable-integrated-detection-jamming-c-uas-basic` — Integrated Detection & Jamming C-UAS
- `portable-integrated-detection-jamming-pro-c-uas` — Integrated Detection & Jamming C-UAS (Pro)
- `stationary-active-rf-defense-system` — Stationary Active RF Defense System (Spoofing)
- `uav-navigation-spoofing-system` — UAV Navigation Spoofing System
- `portable-active-rf-defense-system` — Hand-held Active RF Defense System (Spoofing)
- `handheld-integrated-sdr-c-uas` — Handheld Integrated C-UAS System
- `handheld-integrated-multi-band-jammer-gun` — Multi-band Detection & Jamming Gun

### Solutions / 正常方案

这些可以保留在主站，但要清洗 `defense`、`border defense`、`military` 等表达，统一改成民用工业、监控、巡检、应急、安全管理。

- `land-based-maritime-surveillance` — Land-based Maritime Surveillance & Early Warning
- `uav-maritime-emergency-rescue` — UAV Maritime Emergency Rescue
- `uav-maritime-patrol` — UAV Maritime Patrol
- `emergency-communication-uav` — Emergency Communication UAV
- `emergency-lighting-uav` — Emergency Lighting UAV
- `emergency-reconnaissance-uav` — Emergency Reconnaissance UAV

### Solutions / 中性方案

这些当前业务方向可以改成中性 SEO 方案，但必须移除现有主动反制内容，只保留低空监测、事件记录、告警联动、周界态势管理。

- `chemical-plant-protection` — Chemical Plant Protection
- `hydroelectric-dam-protection` — Hydroelectric Dam Protection
- `oil-production-base-protection` — Oil Production Base Protection
- `power-generation-facility-anti-uav` — Power Generation Facility Anti-UAV，建议改名为 `Power Generation Facility Airspace Monitoring`
- `airport-security-protection` — Airport Security Protection
- `judicial-sector-security` — Judicial Sector Security Protection
- `sports-event-security` — Large Sports Event Security Protection

当前注意点：

- 这些页面现在普遍命中 `anti-UAV`、`c-uas`、`jamming`、`spoofing`、`countermeasure`、`intercept`、`gun` 等词。未清洗前按广告审核视角仍有高风险。
- 如果短期来不及改写，应先从导航、推荐位、sitemap 和广告可达路径移除。

### Solutions / 高危，主动反制类

这些当前页面主题直接包含 Anti-UAV / 反制，且详情命中主动反制词。第一阶段不进入主站广告安全路径。

- `airport-anti-uav` — Airport Anti-UAV Application

### Cases / 正常案例

当前 `cases` 表没有明显安全的正常案例。6 条案例都围绕低空安防/Anti-UAV，并在详情里命中干扰、诱骗、拦截、反制、C-UAS 等内容。

### Cases / 中性案例

可以从现有案例派生“中性版案例摘要”，用于主站 SEO，但不能直接复用当前正文。

可改写方向：

- `airport-security-application` -> `Airport Low-Altitude Airspace Monitoring Case`
- `asian-games-security` -> `Large Event Low-Altitude Monitoring Case`
- `water-conservancy-security` -> `Water Conservancy Facility Airspace Monitoring Case`
- `pakistan-power-plant-anti-uav` -> `Power Plant Airspace Monitoring Case`
- `brazil-refinery-anti-uav` -> `Refinery Airspace Monitoring Case`
- `nigeria-factory-anti-uav` -> `Industrial Park Airspace Monitoring Case`

要求：

- 只保留监测、识别、告警、值守、记录、联动响应。
- 删除使用设备中的 jammer、spoofing、active RF defense、gun、shield。
- 图片不展示枪型/盾牌型/便携式反制设备。

### Cases / 高危，主动反制类

以下是当前版本实际内容分类，未改写前应从主站广告安全路径、sitemap、首页推荐、列表推荐中移除：

- `airport-security-application` — Airport Low-Altitude Security Application
- `asian-games-security` — Asian Games Low-Altitude Security Application
- `water-conservancy-security` — Water Conservancy Facility Low-Altitude Security
- `pakistan-power-plant-anti-uav` — Anti-UAV Case of a Power Plant in Pakistan
- `brazil-refinery-anti-uav` — Anti-UAV Case of a Refinery in Brazil
- `nigeria-factory-anti-uav` — Anti-UAV Case of a Group Factory in Nigeria

## 投放入口 URL

这些 `/lp/` URL 不是必须先做。当前如果选择“直接改主站”，第一阶段应优先完成 A/B/C 分层、主导航清理、产品中心清理、sitemap 清理和文案清洗。

`/lp/` 的价值是后续投放优化，而不是审核隔离：

- 用于广告组一对一承接，提高转化率。
- 用于不同地区/平台的文案差异化。
- 用于单独统计 WhatsApp 点击、资料下载、询盘提交。
- 用于 A/B 测试表单和 CTA。

如果主站已经按 A/B/C 分层清理干净，可以不急着做 `/lp/`；广告可以先直接投主站的安全品类页，例如 `/en/products` 中的正常产品分类或未来重命名后的分类页。

后续如需要更高转化，再新增以下可选投放入口：

Google 中东英文广告入口：

- `/en/lp/gcc/industrial-uav`
- `/en/lp/gcc/drone-detection`
- `/en/lp/gcc/security-screening`
- `/en/lp/gcc/perimeter-surveillance`
- `/en/lp/gcc/engineering-materials`

Yandex 俄语/CIS 广告入口：

- `/ru/lp/yandex/industrial-uav`
- `/ru/lp/yandex/drone-detection`
- `/ru/lp/yandex/security-screening`
- `/ru/lp/yandex/perimeter-surveillance`
- `/ru/lp/yandex/engineering-materials`

暂不创建：

- `/ru/lp/yandex/field-hospital`，除非准备好俄罗斯医疗设备登记证书。
- 任何直接包含 `jammer`、`jamming`、`spoofing`、`gun`、`weapon`、`anti-uav`、`counter-uav` 的广告落地页 URL。

是否保留 `/lp/` 路径：

- 不是第一阶段必需。
- 主站未完成分层前，做 `/lp/` 也不能解决同域名扫描风险。
- 主站完成分层和后台可视化后，`/lp/` 可作为后续投放优化入口。

首期优先级：

- 第一阶段：直接改主站，完成正常产品/中性产品/主动反制类分层。
- 第二阶段：做后台可视化，管理屏蔽词、分级和图片审计。
- 第三阶段：可选投放测试；如果需要提高转化率，再做 `/lp/` 专用入口。
- `drone-detection` 必须等主动反制设备从公开可达链路中移除后再投放，并且页面只讲被动探测/监控。

## 分平台产品策略

### Google Ads / 中东

优先投放：

- 工业无人机：巡检、消防、应急通信、水利/环保监测、测绘、油气管线巡检。
- 无人机探测/空域监控：RF Scanner、Drone Detector、Airspace Monitor、Signal Analyzer、Low-altitude Radar、EO/IR Tracking。
- 安检设备：X-ray baggage scanner、walk-through metal detector、handheld detector、liquid detector、radiation detector。
- 周界监控：thermal camera、laser camera、radar-vision fusion、smart sentinel。
- 工程材料：prefabricated steel bridge、Bailey bridge、bridge components。

不在 Google 广告版推广：

- jammer/jamming 类产品。
- spoofing/navigation spoofing 类产品。
- gun/shield/handheld integrated countermeasure 类产品。
- 强调拦截、击落、摧毁、压制、反制的方案/案例。
- “military grade / tactical weapon / defense department”等军工语境。

可保留但需中性化：

- `C-UAS` 建议在 Google 广告版谨慎使用。若使用，只作为行业缩写出现在页脚或 FAQ，不作为 H1、标题、关键词核心。主推词改为 `Drone Detection System`、`Airspace Monitoring`、`RF Scanner`。

### Yandex Direct / 俄语

优先投放：

- 工业无人机，明确写成民用工业设备：巡检、救援、消防、通信、环境监测。
- 金属探测器、便携式探测器、检测设备、监控摄像头、测量仪器。
- 工程材料/钢桥构件，避免“军用工程”“战术保障”表述。
- 空域监控/无人机探测，仅保留探测、识别、告警、记录、态势管理。

不在 Yandex 俄区广告版推广：

- 任何主动干扰、诱骗、拦截、反制设备。
- 枪型、盾牌型、像武器的便携设备。
- “военный / оборонный / тактический / оружие / подавление / перехват”等俄语敏感表达。
- 野战医院/移动医疗舱，除非有 `регистрационное удостоверение`。

## 词汇清洗规则

全站广告版红线词，包含英文、俄文和中文同义表达：

- 干扰类：`Jammer`、`Jamming`、`Signal Blocker`、`Disruptor`、`Intercept`、`Interfere`、`Interference`、`Suppression`、`Spoofing`、`Countermeasure`。
- 攻击/武器类：`Weapon`、`Gun`、`Killer`、`Strike down`、`Shoot down`、`Destroy`、`Defeat`、`Kinetic`。
- 军工类：`Military grade`、`Tactical weapon`、`Defense department`、`Military logistics`、`combat`。
- 俄语：`оружие`、`военный`、`военного назначения`、`тактический`、`подавление`、`перехват`、`глушение`、`оборонный`。
- 中文：武器、军用、军工、战术、打击、击落、摧毁、拦截、干扰、压制、诱骗、反制。

安全替换方向：

- `Jammer / Jamming System` -> `RF Scanner`、`Signal Analyzer`、`Airspace Monitor`。
- `Anti-Drone / Counter-UAV` -> `Drone Detection`、`Low-Altitude Airspace Monitoring`。
- `Jamming Gun` -> 不进入广告版；如必须出现内部命名，改为 `Directional Antenna Unit` 并移除攻击/干扰功能描述。
- `Spoofing` -> 不进入广告版；如描述算法能力，改成 `navigation-signal analysis` 或 `airspace event analysis`。
- `Interference / Suppression / Defeat` -> `detection`、`alerting`、`classification`、`tracking`、`event logging`。
- `Defense Engineering` -> `Engineering Materials` 或 `Rapid-deployment Infrastructure`。
- `Field Hospital` -> Google 可写 `Modular Medical Cabin`；Yandex 俄区暂不投放，除非证书齐全。

## 图片清洗规则

广告版允许：

- 工业无人机正常巡检、消防、通信、监测场景。
- 雷达、EO/IR 云台、固定式探测箱、监控软件界面。
- 安检门、X 光机、手持金属探测器、辐射/液体检测仪。
- 钢桥、桥梁构件、工地/灾后交通恢复场景。

广告版禁用：

- 枪型、盾牌型、肩扛型、手持发射/指向设备。
- 明显军警、战场、迷彩、武器、爆炸、击落、无人机坠毁画面。
- 图片文件名或 alt 文案含 `jammer`、`gun`、`anti-uav`、`weapon`、`military`。

## 图片判定与清洗流程

图片不应该完全靠人肉逐张判断，也不能只靠文件名。建议采用“自动筛查 + 人工复核 + 代码落表”的流程。

### 谁来判断

Codex 可以先做 80% 的机械筛查：

- 从数据库和源码提取所有线上实际引用的图片 URL。
- 过滤掉未被页面引用的历史图片，避免浪费时间清理无用资产。
- 按引用页面所属分类自动继承风险等级：正常、中性、高危。
- 按文件路径、文件名、alt、产品 handle、页面文案做关键词命中。
- 生成图片审计表，标记 `allow`、`review`、`block` 初判。

必须由你或业务负责人最终确认的部分：

- 设备外观是否像枪、盾牌、肩扛发射器、便携式反制装备。
- 场景是否带军警、战场、迷彩、武装人员、爆炸、击落、坠毁等敏感视觉。
- 图片是否虽然文件名正常，但实际展示的是主动反制设备。
- 某些客户案例图是否涉及保密、授权、政治/军事场景。

原则：Codex 负责把风险图找出来并给理由；人工只复核 `review` 和关键 `block`，不用从零翻全部图片。

### 自动判定维度

1. 引用来源

- 被正常产品引用：默认 `allow`，但还要扫文件名和视觉特征。
- 被中性产品/中性 SEO 引用：默认 `review`，只允许探测、雷达、相机、软件界面、普通场景。
- 被高危主动反制产品引用：默认 `block`，除非人工确认只是通用环境图或非敏感配件图。
- 被高危案例/方案引用：默认 `review` 或 `block`，不能直接进入广告安全主站。

2. 文件路径和文件名

命中以下词，默认 `block`：

```text
jammer, jamming, gun, shield, spoofing, anti-uav, anti-drone, counter-uav, c-uas, weapon, military, tactical
```

命中以下词，默认 `review`：

```text
rf, radar, detection, tracking, airspace, security, protection, defense, sentinel
```

3. 页面上下文

同一张图如果出现在高危产品详情页，即使文件名安全，也先标记 `review`。如果图片同时被正常页面和高危页面共用，需要复制出一份安全命名版本，并只在正常页面使用。

4. 视觉内容

默认 `block`：

- 枪型、盾牌型、肩扛型、手持指向型设备。
- 设备对准无人机、飞机、人群、车辆、建筑的画面。
- 爆炸、火光、击落、坠毁、残骸。
- 武装人员、军服、迷彩、战场、装甲车辆、军事基地。
- UI 截图里出现 `jam`、`spoof`、`intercept`、`kill`、`defeat`、`attack` 等词。

默认 `review`：

- 雷达、RF 探测箱、天线阵列、云台相机。
- 监控平台/地图/告警界面。
- 机场、电厂、炼油厂、水坝、赛事等敏感设施远景。
- 手持设备但外形不像武器。

默认 `allow`：

- 工业无人机巡检、消防、通信、照明、监测场景。
- 安检门、X 光机、金属探测器、液体/辐射检测仪。
- 固定式监控相机、热成像云台、普通雷达外观。
- 钢桥、桥梁构件、施工/应急通行场景。
- 企业、工厂、仓库、实验室、普通产品白底图。

### 输出审计表

建议新增：

- `docs/ad-compliance-image-audit.csv`

字段：

```text
image_path,page_or_handle,content_type,initial_status,reason,final_status,action,replacement_path,notes
```

状态定义：

- `allow`：可继续用于广告安全主站。
- `review`：需要人工确认。
- `block`：从广告安全主站移除。
- `replace`：替换为安全图。
- `rename`：图本身安全，但文件名/alt 风险，需要改名或改 alt。

### 清洗动作

- `allow`：保留。
- `review`：人工确认后改为 `allow`、`replace` 或 `block`。
- `block`：从主站导航、产品中心、方案、案例、媒体、首页推荐和广告可达页面移除。
- `replace`：用安全图片替换，优先使用产品实拍中非武器化、非反制场景图。
- `rename`：如果图片本身安全但路径含敏感词，复制到安全路径，例如 `/products/drone-detection/...`，并更新引用。

### 是否只能人工判断

不是。人工不需要从零判断所有图片，只需要处理机器筛出的边界项。

建议分工：

- Codex：生成线上引用图片清单、初判风险、找出所有引用位置、给出替换建议、更新代码/数据库引用。
- 人工：确认外观和场景是否适合广告主站，尤其是 `review` 项和客户案例图。

### 第一阶段图片处理口径

第一阶段为了尽快降低广告审核风险：

- 高危主动反制产品下的图片全部从广告安全主站移除。
- 中性产品只保留雷达、RF 探测箱、EO/IR 云台、监控界面等非武器化图片。
- 案例图先全部从首页推荐和广告可达路径移除；后续只挑选无设备特写、无武器化画面的设施远景做中性案例。
- 文件名含 `jammer`、`gun`、`anti-uav`、`anti-drone` 的图片，即使视觉安全，也先改名或换路径后再用于主站。

## Next.js 实现方案

### 1. 主站产品分层数据层

建议先在现有产品/方案/案例数据上增加合规分层字段，或先用代码配置维护分层：

- `normal`：正常产品，允许进主站导航、列表页、sitemap 和广告可达路径。
- `neutral_seo`：中性 SEO 内容，允许公开但不作为广告落地页，不写主动反制销售表达。
- `restricted`：主动反制类/敏感技术资料，不进主站导航、footer、sitemap、广告可达路径。

第一阶段为了速度和安全，可以先用代码配置或数据库字段落地；第二阶段直接做后台可视化，让运营人员可以管理分级、屏蔽词和图片审计结果。小预算投放验证不作为必经阶段，放到后台能力完成之后再决定是否执行。

建议新增：

- `src/lib/complianceTaxonomy.ts`
- `src/lib/publicNavigationFilters.ts`

`complianceTaxonomy.ts` 负责：

- 产品 handle 分层。
- solutions/cases/media 分层。
- 红线词与中性替换词表。
- Google/Yandex 平台差异规则。

`publicNavigationFilters.ts` 负责：

- 产品中心只展示 `normal`，必要时展示合规改写后的 `neutral_seo`。
- 主导航、footer、首页推荐、相关产品、案例推荐、媒体推荐过滤 `restricted`。
- sitemap 不输出 `restricted`。

### 2. 后台可视化合规管理

可行，而且推荐做。因为广告政策、审核尺度、SEO 策略会持续变化，如果所有分级和屏蔽词都写死在代码里，每次调整都要开发、build、部署，运营成本高。

建议在现有 admin 后台新增：

- `/admin/compliance`
- `/admin/compliance/keywords`
- `/admin/compliance/products`
- `/admin/compliance/solutions`
- `/admin/compliance/cases`
- `/admin/compliance/images`
- `/admin/compliance/audit`

#### 后台可管理内容

1. 屏蔽词/风险词

字段建议：

```text
id
term
language
risk_level
match_type
scope
replacement
note
is_active
created_at
updated_at
```

说明：

- `language`：`en`、`ru`、`zh`、`all`。
- `risk_level`：`block`、`review`、`warn`。
- `match_type`：`exact`、`contains`、`regex`。
- `scope`：`global`、`google`、`yandex`、`seo_only`、`image_filename`、`metadata`。
- `replacement`：建议替换词，例如 `Jammer -> RF Scanner`。

2. 产品/方案/案例分级

字段建议：

```text
content_type
content_id_or_handle
compliance_tier
ad_visibility
seo_visibility
sitemap_visibility
public_nav_visibility
reason
review_status
reviewed_by
reviewed_at
```

说明：

- `compliance_tier`：`normal`、`neutral_seo`、`restricted`。
- `ad_visibility`：是否允许广告可达。
- `seo_visibility`：是否允许自然搜索收录。
- `sitemap_visibility`：是否进入 sitemap。
- `public_nav_visibility`：是否进入主导航、footer、首页推荐、列表推荐。
- `review_status`：`draft`、`needs_review`、`approved`、`rejected`。

3. 图片审计

后台读取 `docs/ad-compliance-image-audit.csv` 或数据库表：

```text
image_path
page_or_handle
content_type
initial_status
reason
final_status
action
replacement_path
notes
reviewed_by
reviewed_at
```

运营可以把图片从 `review` 改成 `allow`、`replace`、`block`、`rename`。

4. 审计结果

后台展示：

- 当前全站红线词命中数。
- 按产品/方案/案例/媒体分组的风险命中。
- A 层页面是否链接到 C 层。
- sitemap 是否包含 restricted 页面。
- 图片风险命中。
- 最近一次审计时间和结果。

#### 建议新增数据库表

可以新增 4 张表：

```sql
compliance_keywords
compliance_content_rules
compliance_image_rules
compliance_audit_runs
```

也可以先轻量实现为 JSON 配置文件：

```text
data/compliance-keywords.json
data/compliance-content-rules.json
data/compliance-image-rules.json
```

但长期建议入 SQLite，方便后台编辑、留痕和回滚。

#### 权限与安全

后台可视化不能让所有人随便改。建议：

- 只有 admin 可编辑。
- 每次修改记录 `reviewed_by`、`reviewed_at`、`reason`。
- 删除屏蔽词不做硬删除，只设 `is_active = 0`。
- `restricted -> normal` 必须二次确认，因为风险最高。
- 支持导出当前合规配置 JSON，方便部署前备份。

#### 与页面渲染的关系

前台页面渲染时读取合规配置：

- 产品中心：只展示 `normal`，必要时展示 `neutral_seo`。
- 广告可达路径：只允许 `normal`。
- SEO 中性页：允许 `neutral_seo`，但自动隐藏购买型 CTA 和高危推荐。
- sitemap：排除 `restricted`，按配置决定是否包含 `neutral_seo`。
- 相关产品/推荐案例/媒体推荐：过滤 `restricted`。
- 图片组件或数据层：遇到 `block` 图片不输出，遇到 `replace` 输出替换图。

#### 与构建/缓存的关系

当前站是 Next.js 静态/缓存混合模式。后台修改合规配置后有两种路径：

- 简单稳妥：后台修改后提示“需要重新 build 部署”，适合第一版。
- 进阶方案：相关页面改为动态读取配置并触发 revalidate tag，例如 `revalidateTag('products')`、`revalidateTag('compliance')`。

第一阶段建议不要把后台做得太复杂，但第二阶段应优先后台可视化，而不是先投放测试：

1. 先用代码/JSON 配置把分级跑通。
2. 新增审计脚本验证主站风险。
3. 第二阶段做后台编辑页，把屏蔽词、分级、图片审计结果可视化。
4. 第三阶段再评估动态 revalidate 和投放测试。

#### 不建议后台开放的内容

以下不要让运营直接一键放开：

- 把 jammer/spoofing/gun/shield 类从 `restricted` 改成广告可达。
- 关闭核心红线词。
- 把 C 层加入 sitemap。
- 把高危案例加入首页推荐。

这些操作应保留开发或负责人复核，避免因为一次误操作导致广告账号风险。

### 3. 可选新增广告数据层

建议新增：

- `src/lib/adCompliance.ts`
- `src/lib/adLandingData.ts`
- `src/app/[locale]/lp/[channel]/[slug]/page.tsx`

`adCompliance.ts` 负责：

- 平台 profile：`google-gcc`、`yandex-ru`。
- 产品 allowlist / denylist。
- 词表扫描与替换。
- 图片 allowlist。
- 站内链接过滤。

`adLandingData.ts` 负责：

- 每个 slug 的 H1、摘要、卖点、产品卡片、FAQ、CTA、SEO metadata。
- 明确写死广告页要展示的产品 handles，不直接复用全站分类数据。

只有当主站 A/B/C 分层完成后，再做 `/lp/`。

### 4. 广告页布局

广告页只保留：

- 品类 H1。
- 民用/工业应用说明。
- 3-5 个安全卖点。
- 允许展示的产品卡片。
- 参数下载/询盘 CTA。
- 合规 FAQ，例如“产品使用需遵守当地频谱、航空和进口法规”。

广告页不展示：

- 全站 mega menu。
- Footer 中高风险品类链接。
- Media/Cases 推荐。
- 反制案例、军警项目故事、主动干扰能力介绍。

可以使用简化 header/footer：

- Logo。
- 当前落地页同类安全导航。
- `Contact`。
- 法规提示。

### 5. 路由与 SEO

- 广告页 `metadata.title`、`description` 必须经过清洗。
- 不设置 canonical 到主站敏感产品页；canonical 指向自身。
- 页面可 `index`，但广告初期建议 `robots: { index: false, follow: false }`，先减少自然搜索误抓敏感语义；投放稳定后再评估是否开放索引。
- 所有广告页内链必须只指向同组广告页或联系表单，不链到主站高风险产品详情。

### 6. 表单与转化

广告版 CTA：

- `Request Datasheet`
- `Get Industrial Quote`
- `Talk to Sales on WhatsApp`

表单字段：

- Company
- Country/Region
- Work email
- Product category
- Application scenario
- Message

占位文案中不得出现 `Anti-Drone`、`Jammer`、`Gun`、`Countermeasure`。

后台应打点：

- PDF datasheet 下载。
- WhatsApp 点击。
- 表单提交。

## 首批页面内容方向

### `/en/lp/gcc/industrial-uav`

定位：Industrial UAV Systems for inspection, emergency response, firefighting, communication relay.

可展示：

- `fc-yqxj-01-utility-inspection-drone`
- `fc-dlxj-01-power-grid-inspection-drone`
- `fc-yjxf-01-aerial-firefighting-drone`
- `fc-yjtx-01-emergency-communication-drone`
- `fc-sljc-01-water-conservancy-monitoring-drone`

禁用词：combat、tactical、military、destroy。

### `/en/lp/gcc/drone-detection`

定位：Drone Detection and Low-Altitude Airspace Monitoring.

可展示：

- `stationary-rf-detection-system`
- `portable-rf-detection-case`
- `composite-electro-optical-tracking-system`
- `uav-remote-id-monitoring-system`
- `handheld-rf-detection-system-mini`
- `low-altitude-detection-radar-ku-band`
- `low-altitude-3d-pulse-doppler-radar`

不得展示：

- 所有 jammer、spoofing、gun、shield、active RF defense、integrated jamming 类产品。

### `/ru/lp/yandex/industrial-uav`

定位：гражданские промышленные БПЛА для инспекции, мониторинга, связи и аварийных работ.

要求：

- 俄语文案必须重新人工/模型翻译，不能复用当前乱码 `src/dictionaries/ru.json`。
- 不出现军用、战术、攻击、防御部门语义。

### `/ru/lp/yandex/drone-detection`

定位：мониторинг низковысотного воздушного пространства, обнаружение и регистрация событий.

要求：

- 只展示被动探测、识别、记录设备。
- 不出现 `подавление`、`глушение`、`перехват`、`оружие`。

## 验收清单

### 自动扫描

新增脚本：

- `scripts/audit-ad-landing-pages.mjs`
- `scripts/audit-public-site-risk.mjs`

扫描范围：

- `src/app/[locale]/lp/**`
- `src/lib/ad*.ts`
- 广告落地页生成后的 HTML。
- 主站公开可达路径清单：导航、footer、sitemap、robots、产品/方案/案例/媒体列表页。
- 数据库表：`products`、`solutions`、`cases`、`media`。

检查项：

- 红线词命中为 0。
- 图片 src/alt/title 命中为 0。
- `<a href>` 不指向 denylist handles。
- metadata、OpenGraph、JSON-LD 命中为 0。
- Yandex 俄语页不含英文敏感词和俄语敏感词。
- A 层广告安全路径中红线词为 0。
- A 层页面不得链接到 C 层敏感产品。
- C 层页面不得出现在主导航、footer、sitemap、广告页、首页推荐、媒体推荐中。
- B 层 SEO 页面如保留在主站，必须标记为教育型/合规型，不含价格、购买、主动反制能力和枪型图片。

建议命令：

```bash
npm run build
node scripts/audit-ad-landing-pages.mjs
```

### 人工验收

- 用浏览器打开所有广告页，确认无主站高风险导航。
- 从广告页逐个点击所有可见链接，确认不会进入 C 层敏感产品。
- 检查 `sitemap.xml`、`robots.txt`、首页、产品中心、solutions、cases、media 列表页，确认 C 层不被公开推荐。
- 查看页面源代码，确认隐藏文本、metadata、alt、schema 中无红线词。
- 用 Google Ads/Yandex 广告后台的最终 URL 预览检查。
- 对广告关键词、广告标题、广告描述、sitelink、callout、structured snippet 同步执行同一词表扫描。

## 实施步骤

### 第一阶段：立即执行，主站合规改造

0. 先做当前版本文案与数据库备份，确认备份目录不进入公开站点、不进入 `.next` 部署包。
1. 做 A/B/C 内容分层决策：正常产品、中性 SEO、主动反制类分别列清单。
2. 建立 `complianceTaxonomy` 词表、allowlist、denylist 和产品 handle 分层。
3. 清理主站导航、footer、sitemap、首页推荐、产品中心、solutions、cases、media 列表页，确保正常产品路径不会链接到主动反制类。
4. 改写主站公开文案：正常产品保持民用工业定位，中性 SEO 页面只讲探测/监控/合规，不写主动反制销售表达。
5. 做图片审计与第一轮图片清洗：高危主动反制图从广告安全主站移除，中性产品只保留非武器化图片。
6. 新增全站公开风险审计脚本，纳入每次投放前检查。
7. 本地 `npm run build`，按既有流程打包 `.next/` 上传服务器，服务器只解包并 `pm2 restart n-tet`。

### 第二阶段：后台可视化，后续执行

1. 新增 admin 合规管理入口。
2. 把屏蔽词、产品分级、方案分级、案例分级、图片审计结果迁移到 SQLite 表。
3. 后台支持新增/停用屏蔽词、调整 `normal / neutral_seo / restricted` 分级、查看审计结果。
4. 对高风险操作加二次确认和操作留痕。
5. 评估是否做动态 revalidate；第一版可以后台修改后仍要求重新 build 部署。

### 第三阶段：投放与转化优化，可选执行

1. 后台合规管理跑稳定后，再决定是否用主站安全分类页跑 Google/Yandex 小预算测试。
2. 根据审核反馈继续清理主站公开内容、关键词和图片。
3. 如果主站安全分类页转化率不够，再新增 `/lp/` 广告专用入口与简化表单。
4. 对 `/lp/` 做 A/B 测试、独立转化追踪、平台差异化文案。

## 备份策略

需要备份。接下来广告合规改造会改到产品名、详情、方案、案例、媒体文章、导航、SEO metadata 和图片引用。当前版本同时承载历史 SEO 文案和敏感产品描述，直接覆盖会导致后续很难完整回退。

### 备份目录

建议本地创建：

```text
backups/2026-05-19-pre-ad-compliance/
```

目录结构：

```text
backups/2026-05-19-pre-ad-compliance/
  README.md
  db/
  source-copy/
  rendered-html/
  exports/
```

### 必备备份内容

数据库：

- `data/ntet.db`
- `data/products.db`
- `data/site.db`

源码与静态文案：

- `src/dictionaries/en.json`
- `src/dictionaries/ru.json`
- `src/constants/homeData.ts`
- `src/lib/categoryLandingData.ts`
- `public/media/news_data.json`
- `public/cases/*.json`

当前线上/本地渲染 HTML 快照：

- `/en`
- `/ru`
- `/en/products`
- `/ru/products`
- 重点产品详情页
- solutions / cases / media 主要列表页和重点详情页

可选导出：

- 从 SQLite 导出 `products`、`solutions`、`cases`、`media` 表为 JSON 或 CSV，方便未来做新旧文案 diff。
- 截图保存重点页面首屏，方便视觉对比。

### 会不会导致网站变大

只要按下面规则做，备份不会让线上网站变大：

- 备份目录放在项目根目录 `backups/`，不要放进 `public/`。
- 不在页面代码里 import/read `backups/`。
- `.next` 部署包只打包 `.next/`，不打包 `backups/`。
- 如果未来打完整项目包上传服务器，必须在打包命令里排除 `backups/`、`scratch/`、`.git/`、`node_modules/`。
- 建议把 `backups/` 加进 `.gitignore`，除非明确要把备份纳入私有仓库。

备份会占用本地磁盘，但不影响线上首屏、JS 包体、图片加载和 Cloudflare 缓存。真正会让网站变大的，是把备份文件放进 `public/` 或部署时把整个项目目录连同备份一起上传。

### 建议执行方式

先做一个轻量完整备份：

1. 复制 SQLite 数据库和上述文案文件。
2. 导出关键表 JSON。
3. 抓取重点页面 HTML。
4. 写 `README.md` 记录备份时间、当前 git commit/branch、用途。

备份完成后再开始广告合规改造。后续每一轮大规模洗词前，都按日期再建一个新备份目录，而不是覆盖旧备份。

## 回滚策略

这次主站分级改造应视为“可回滚实验”，不要把旧版本不可逆地覆盖掉。上线后观察广告审核、自然 SEO 流量、询盘量和询盘质量。如果效果不好，可以恢复到改造前的不分级版本，或只恢复某些产品/方案/案例。

### 改造前必须做

1. 创建 Git tag 或保留分支：

```text
pre-ad-compliance-2026-05-19
```

2. 完成 `backups/2026-05-19-pre-ad-compliance/` 备份：

- SQLite 数据库。
- 静态文案文件。
- 关键页面 HTML 快照。
- SQLite 表 JSON/CSV 导出。

3. 在备份目录 `README.md` 记录：

- 当前 branch。
- 当前 commit hash。
- 备份时间。
- 本次改造目的。
- 数据库文件名和来源。
- 是否已部署到线上。

### 可恢复范围

整站恢复：

- 恢复旧源码。
- 恢复旧 SQLite 数据库。
- 重新本地 build。
- 按既有部署流程上传 `.next/` 并重启 PM2。

局部恢复：

- 只恢复某些产品的旧标题、摘要、详情、参数、图片。
- 只恢复某些 solutions/cases/media 的旧正文。
- 只恢复导航或首页推荐结构。
- 保留合规改造中有效的部分，例如图片 WebP、性能优化、缓存头。

### 什么时候触发回滚

建议观察 2-4 周，出现以下情况再考虑回滚或局部恢复：

- Google/Yandex 审核仍不过，且无法定位具体风险点。
- 自然搜索流量明显下滑，且主要来自被改写的高价值页面。
- 询盘量或高质量询盘明显下降。
- 客户反馈找不到原来的敏感产品信息，影响真实业务转化。
- 俄语/Yandex 版本因为文案重写导致表达不准确或转化下降。

### 推荐回滚方式

优先局部恢复，不优先整站回滚：

- 如果只是 SEO 流量下降，先恢复对应页面的中性 SEO 内容或增强内链。
- 如果只是广告审核失败，先继续清理主站公开可达路径、图片、sitemap、metadata。
- 如果询盘下降来自主动反制类不可见，考虑把 C 层技术资料迁移到独立资产，而不是直接把高危销售页放回广告主站。
- 只有当整体效果明显变差且短期无法修复时，再恢复到 `pre-ad-compliance-2026-05-19`。

### 回滚后的注意事项

- 如果恢复旧版主站，Google/Yandex 广告投放应暂停或重新评估，因为旧版仍可能被识别为高风险。
- 恢复旧版不等于解决广告审核，只是恢复 SEO/业务展示。
- 回滚后仍应保留备份和审计记录，方便以后重新设计独立站或独立技术资料资产。

## 投放前负面关键词

Google 中东建议先加通用否定词：

```text
toy, dji, consumer, hobby, photography, used, amazon, aliexpress, rent, cheap, home, diy
weapon, gun, jammer, jamming, spoofing, military, tactical, combat, shoot, kill, destroy
```

Yandex 俄区建议增加俄语否定词：

```text
оружие, военный, тактический, глушилка, подавление, перехват, сбить, атака, боевой
```

## 关键结论

最佳方案不是把现有页面“洗词后继续卖反制设备”，也不是先建一套 `/lp/` 特供页。应先直接改主站，完成正常产品/中性 SEO/主动反制类分层：

- Google：反无人机只推 `Drone Detection / Airspace Monitoring`，不推主动干扰/诱骗/枪型设备。
- Yandex：工业无人机和检测/监控/安检/工程材料优先；防无人机保护产品只保留被动探测与监控，不碰军品和武器语境。
- `/lp/` URL 不是第一阶段必需；它只用于后续投放转化优化和平台差异化文案。
- 站内主导航、footer、sitemap、案例、媒体文章、首页推荐都要处理，否则审核可能沿同域名公开路径发现高风险内容。
- 敏感产品若还要 SEO，引流应转为 B 层中性教育内容或迁移到 C 层独立技术资料资产，而不是继续放在广告主站公开销售目录里。
