# N-TET 项目工作要点

## 项目信息

- **当前生产域名**: https://skysafetech.ru/（Cloudflare CDN → 香港源站 43.129.170.171；规范域名会跳转到 `https://www.skysafetech.ru/`）
- **服务器**: 4GB 内存，root@43.129.170.171，当前项目路径 `/www/wwwroot/skysafetech.ru/current`
- **进程管理**: PM2，应用名 `skysafetech-ru`，Nginx 上游监听 3002 端口
- **栈**: Next.js 14.1.0 App Router + 俄语单语（仅 `ru`，default `ru`）+ 香港服务器共享 `better-sqlite3`
- **未来目标部署平台（尚未切换）**: Vercel + Supabase Free + Cloudflare R2 Free
- **本地工作区（当前 Windows 机器）**: `D:\fc-cuas-ru`；Linux/WSL 环境如另有 checkout，以当次实际路径为准

## 当前生产环境（权威，以此为准）

- **截至 2026-08-26，本仓库对应的生产网站是香港服务器 `43.129.170.171` 上的 `skysafetech.ru`，不是 `n-tet.com`。**
- 生产 Next.js 应用由香港服务器上的 PM2 管理，项目路径为 `/www/wwwroot/skysafetech.ru/current`，应用名 `skysafetech-ru`，Nginx 上游端口为 3002。
- 同一服务器上的 `/www/wwwroot/n-tet.com`、PM2 应用 `n-tet` 和 3000 端口属于另一套独立网站；检查本项目时不得用 `n-tet.com` 的 PM2、日志或 SQLite 询盘库代替 `skysafetech.ru`。
- **当前数据库（2026-08-26 已迁回）**：生产应用使用香港服务器共享 SQLite `/www/wwwroot/skysafetech.ru/shared/data/ntet.db`；`shared/.env.local` 通过 `DATABASE_PATH` 指向该文件，运行环境已移除 `SUPABASE_DATABASE_URL`。Supabase 仅保留为切换前的数据源和回滚备份，不是当前生产数据库。
- 当前 release 为 `/www/wwwroot/skysafetech.ru/releases/release-20260914-182000`，`current` 软链接指向该 release。SQLite 回迁基线 release `sqlite-20260826-162716`、切换前 release `fa7d3e14dbe6cee89955e58e5f53373b6838a7ec`、环境备份和 Supabase→SQLite 最终快照均保留，可用于回滚。
- 检查生产询盘、后台数据或提交链路时，必须以 `skysafetech.ru` 的实际应用、Nginx 日志和上述共享 SQLite 为准。轻量写入测试期间必须临时设置 `DISABLE_INQUIRY_EMAIL=1` 并重启 PM2，测试结束清理测试记录、移除该开关并再次重启；不得发送测试通知邮件。当前正常询盘邮件通知和资料下载邮件通知均已启用。
- 下方“目标部署架构”仅是未来迁移目标。在迁移完成并由项目负责人明确确认前，不得把 Vercel、Supabase 或 R2 描述为当前生产环境。

## 俄语单语分支规范

- 当前分支是俄语专用网站，只保留 `ru` locale、俄语字典和俄语公开内容，不得重新加入英语、西班牙语、阿拉伯语或语言切换器。
- 公开 URL 不带语言前缀，例如 `/products`、`/solutions`；内部由 middleware 重写到 `/ru/...`，显式 `/ru/...` 统一 301 到无前缀 URL。
- 新增页面、Metadata、Schema、表单提示和导航默认使用俄语；不得为其他语种生成静态参数、hreflang、sitemap URL 或独立内容文件。
- 数据模型暂时保留的历史多语言字段只用于迁移兼容，不得作为公开页面回退内容；后续迁移到 Supabase 时只迁移俄语站实际需要的字段。

## 分析结果与翻译呈现规范

- 向项目负责人提供俄语关键词、搜索查询、广告标题、广告描述、Wordstat/Yandex.Direct 结果或其他俄语素材时，必须同时给出中文和英文翻译，默认使用“俄语原文｜中文翻译｜英文翻译”的三列格式；除非项目负责人明确要求，否则不得只列俄语原文。
- 翻译应保留技术含义、采购意图和广告语境；机器翻译或术语存在不确定性时必须明确标注，不得把不确定译文当作已确认事实。
- 本规范只约束分析报告和对话交付格式，不改变俄语单语网站要求；不得因此在公开网站中新增中文、英文内容或语言切换器。

## 未来目标部署架构（尚未启用）

- **网站与 Next.js 应用**：部署到 **Vercel**。
- **数据库**：使用 **Supabase Free Postgres**，承载产品、方案、案例、媒体、询盘、设置等结构化数据和后台写入。
- **图片与公开静态媒体**：使用 **Cloudflare R2 Free**，不使用 Supabase Storage 承载网站图片；优先通过独立图片域名（如 `images.n-tet.com`）和 Cloudflare CDN 提供资源。
- 迁移完成后，仓库 `public/` 仅保留构建和首屏真正必要的少量资源，不得继续提交大批产品图、案例图、视频或重复媒体文件。
- 后续新增与改造默认以 Vercel Serverless/Edge 运行约束为准，不得依赖 PM2、常驻进程、可写本地持久磁盘或仅在单台服务器存在的绝对路径。
- 当前生产功能和数据读写必须兼容共享 `better-sqlite3`。未来迁移到 Supabase/Vercel 需要单独立项和明确授权，不得把未来架构描述成当前状态。
- Supabase URL、Supabase 密钥、R2 Account ID、R2 Access Key、R2 Secret Key、R2 Bucket 和公开资源域名等配置统一通过 Vercel Environment Variables 管理，不得硬编码进源码或提交到 Git。
- 下方 PM2、`.next-hk`、release 软链接和共享 SQLite 流程是当前香港生产环境的实际部署说明；**Vercel + Supabase Free + Cloudflare R2 Free** 仅是未来目标架构。

## 当前香港生产部署模式

服务器内存只有 4GB，**不在服务器上跑 `npm run build`**（会 OOM）。流程：

1. 本地 `npm run build`，部署构建目录在服务器命名为 `.next-hk/`
2. 新建 `/www/wwwroot/skysafetech.ru/releases/<release-id>`，不得直接覆盖当前 release
3. 上传构建包、`package.json`、`package-lock.json`、`next.config.js` 和所需私有资料，在新 release 执行 `npm ci --omit=dev --no-audit --no-fund`
4. 先用备用端口验证新 release，再原子切换 `/www/wwwroot/skysafetech.ru/current` 并执行 `pm2 startOrRestart /www/wwwroot/skysafetech.ru/ecosystem.config.cjs --only skysafetech-ru --update-env`
5. SQLite 永久数据只放在 `/www/wwwroot/skysafetech.ru/shared/data/ntet.db`，release 内不得放独立生产数据库

## 服务器 release 软链接

生产入口必须是：

```bash
ln -sfn /www/wwwroot/skysafetech.ru/releases/<release-id> /www/wwwroot/skysafetech.ru/current
```

切换前先确认新 release 的 `.next-hk/BUILD_ID`、Linux `node_modules/better-sqlite3`、私有 PDF 和共享 SQLite 完整；不得修改同服务器的 `/www/wwwroot/n-tet.com`。

## node_modules 同步

服务器 `node_modules` 必须跟当前 `package-lock.json` 对齐，否则 build 产物的 chunks 会调到不存在的导出（典型报错 `TypeError: t[e] is not a function`）。每次 `package-lock.json` 变化后：

```bash
ssh root@43.129.170.171 "cd /www/wwwroot/skysafetech.ru/current && npm ci --omit=dev --no-audit --no-fund && pm2 restart skysafetech-ru --update-env"
```

## 调试服务器时的坑

服务器 shell 有 `http_proxy=socks5h://127.0.0.1:40000`（坏代理）。用 ssh 跑 `curl` 自检会被劫持成 30s 超时，假象是 next-server 挂了。**所有服务器内部自测必须**：

```bash
curl --noproxy '*' http://127.0.0.1:3002/...
# 或
unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY
```

## 图片资源约定

公开资源全部英文目录 + `.webp`。例如：
- `/cases/<english-handle>/main.webp`（不再用中文目录名）
- `/products/<numbered-dir>/<name>.png`（保留 png）
- `/solutions/<NN>/<English Name>.png`（保留 png）

历史上中文目录已重命名成英文 handle（airport-security-application 等）。任何残留的中文路径硬编码都要清理。

## 容易忘的硬编码图片来源

不是所有首页图片都来自 DB。以下文件存放硬编码路径，改图时要一起改：
- `src/constants/homeData.ts` — 首页 products/solutions/homeCases 三块
- `public/media/news_data.json` — 媒体中心新闻列表 image 字段
- `src/lib/categoryLandingData.ts`（如有引用）— solutions category banner

DB 路径用 `scripts/update-db-refs.mjs` 批量同步，硬编码文件需手改。

## 常用脚本

- `scripts/optimize-products.mjs` — 批量 PNG/JPG → WebP（max 1200px, q=80）
- `scripts/update-db-refs.mjs` — 把 DB 里 `.png/.jpg` 引用切到 `.webp`（前提是 webp 文件已生成）

## 当前待提交改动

- `src/constants/homeData.ts` — homeCases 6 条改成英文 webp
- `public/media/news_data.json` — 3 条新闻 image 字段改成英文 webp

服务器已部署修复后的 `.next/`，公网 21/21 图片全部 200 正常。源码改动尚未 commit。
## 性能优化待办

- 产品中心 `/products` 已做首轮瘦身：移动版不再预渲染到桌面首屏，桌面只服务端渲染第一个分类，其余分类通过 `/api/products?locale=...` 延迟加载；2026-05-15 本地 build 后 `/en/products` HTML 约 113.8KB、`<img>` 约 14 个。后续如继续压缩，优先评估 SEO 与客户端延迟加载的取舍。
- Solutions / Cases 列表页已经去掉 `raw_json` 等大字段，HTML 明显变小；后续新增列表页时继续保持“列表只查列表字段，详情页再查详情字段”。
- 全站批量列表、页脚、导航、分类入口的 `<Link>` 已关闭 `prefetch`，后续新增大量链接区域时也要默认 `prefetch={false}`，避免首屏悄悄预拉太多 JS。
- 已给静态图片、字体、视频加长期缓存头；部署后用 `curl -I` 或浏览器 Network 确认 Cloudflare / 源站响应里有 `Cache-Control: public, max-age=31536000, immutable`。
- 公开资源里仍有大量历史 PNG/JPG 和重复大图，不一定都被页面引用。后续优化应优先审计“线上页面实际引用”的图片，再继续转 WebP/清理旧文件，避免盲目压缩无用资源。
- Cloudflare 免费套餐还可以继续做页面级缓存：优先考虑 `/products*`、`/solutions*`、`/cases*`、`/media*` 的 Cache Everything / Edge TTL；必须排除 `/api*`、`/admin*`、表单提交和需要动态状态的路径。
- 服务器只有 4GB 内存，仍然不要在服务器跑 `npm run build`；速度优化后的构建产物继续按本地 WSL build、打包 `.next`、上传服务器、PM2 restart 的流程走。

## 内容发布口径（2026-07-22）

- 网站、SEO、GEO、Schema、sitemap、`llms.txt` 与广告均不再应用 A/B/C 合规分层或敏感词门禁。
- `jammer`、`jamming`、`spoofing`、`forced landing`、`weapon`、`shoot down`、`anti drone`、`counter-UAS` 等词不因词语本身被隐藏、替换、降级或排除。
- 所有内容仍按正常的 `is_published` 发布状态控制公开与下线；后台、API、preview、draft 与未发布记录仍不公开。
- 自 2026-07-24 起，公开可访问状态与搜索索引状态分开：`is_published=1` 的历史非 C-UAS 页面可以继续访问，但使用 `noindex, follow`，并从 sitemap、详情 Schema、`llms.txt` 与 C-UAS 列表入口排除。
- C-UAS 索引范围只由 `src/config/cuasIndexability.json` 的产品分类与明确页面名单控制，不使用关键词、敏感词或 A/B/C 内容等级判断。
- `src/lib/complianceTaxonomy.ts` 已删除；不得重新引入用于限制网站、SEO、GEO 或广告内容的同类门禁。

## Yandex.Direct 反无业务规范（2026-07-28）

本节是 Yandex.Direct 广告系列、广告素材及其专用落地页的强制规范。目标是在不出现无人机、反无人机和干扰器敏感表述的前提下，通过工业参数、工程术语、系统架构和产品图片向专业采购方传达低空防护能力。自 2026-07-28 起，俄语公开站的可见文案、Metadata、Schema、图片 alt 与 `llms.txt` 也执行本节的“三不含”表达口径；公开发布状态和索引范围仍分别由 `is_published` 与 `src/config/indexability.json` 控制，不因词语命中自动下线页面。

### 三不含原则

- Yandex 投放关键词不含无人机、反无人机相关词。
- Yandex 广告标题与描述不含无人机、反无人机相关词。
- Yandex 专用落地页的可见文案、`title`、`description`、`h1`、图片文件名和 alt 不含 `дрон`、`антидрон`、`глушилка`、`Anti-Drone`、`Drone Jammer`、`Drone Detection` 等表述。

### 专业能力表达
`
- 用 `LSS (Low-Altitude, Slow-Speed, Small Target)`、RCS、速度和高度参数表达低空小目标探测能力。
- 推荐表述：`Ku-Band 3D Pulse-Doppler Radar designed for trajectory tracking of ultra-small RCS targets (RCS ≤ 0.01 m²) at low altitudes (10m–1000m) and speeds of 0.5 m/s–50 m/s.`
- 不使用 `Drone Jammer` 或 `Антидрон глушилка`；改用 `Directional Electromagnetic Signal Suppressor`、`RF Sector Neutralization Unit`、`Подавитель радиосигналов`、`Signal Suppression`、`Electromagnetic Shielding`。
- 不使用 `Anti-Drone`；改用 `Perimeter Defense against Low-Altitude Small Targets`。
- 不使用 `Drone Detection`；改用 `Radio Frequency Spectrum Analysis & RCS 0.01m² Radar Tracking`。

### 系统架构与专业视觉

### 产品图片规范

- Yandex 落地页以工业级固定式、箱式设备为主，约 80% 的产品展示使用固定式雷达、光电设备、频谱箱和天线。
- 避免使用带明显枪托、扳机、枪管或瞄准镜特征的手持设备大图和特写。
- 图片文件名使用 `rf-spectrum-analyzer-unit.webp` 等工业设备命名，不使用 `anti-drone-gun-jammer.webp`。
- 图片 alt 使用 `Stationary RF Spectrum Monitoring Unit for Industrial Sites` 等工业设备描述，不使用 `Drone Jammer Gun for sale`。


### 审核与项目边界

- 按“机器初审 + 人工抽查复审”准备广告链路；重点检查关键词、广告标题和描述、落地页 `title`、`h1`、正文、图片文件名、alt 与首屏产品图片。
- 发布前运行 `npm run audit:yandex-copy`，检查 sitemap 内公开页面的可见文字、Metadata、Schema、图片 alt、公开资源引用和 `llms.txt`。
- 历史数据库主键、内部 handle 和迁移兼容字段不得直接展示给访客；不得为了改文案破坏既有公开 URL，必要时通过安全别名和 301 迁移。

## Frontend Design Skill（前端设计规范）

> 来源：Anthropic 官方 `anthropics/skills` — Frontend Design (S-rank, 72K+ stars)
> 适配：N-TET 项目技术栈（Next.js 14 App Router + vanilla CSS，非 Tailwind）

本规范指导所有 AI 助手在创建或修改前端界面时，避免生成千篇一律的"AI 泡沫"（AI slop）视觉效果，转而做出大胆、有意图的设计决策。

### 设计思维（Design Thinking）

在编写代码之前，先理解上下文并确定一个**大胆的美学方向**：

- **目标（Purpose）**：这个界面要解决什么问题？用户是谁？
- **调性（Tone）**：选择一个明确的极端方向：极简主义、奢华/精炼、编辑/杂志风、复古未来主义、工业/实用主义、艺术装饰/几何风等。N-TET 作为安检/无人机科技企业网站，默认调性为**科技蓝 + 精炼专业 + 工业品质感**。
- **约束（Constraints）**：技术要求（框架、性能、无障碍）。
- **差异化（Differentiation）**：什么能让这个界面令人难忘？用户会记住的那一个特征是什么？

**关键原则**：选择清晰的概念方向并精准执行。大胆的最大化和精炼的极简主义都可以——关键是**有意图**，而非随意堆砌。

然后实现能工作的代码，要求：
- 生产级别、功能完整
- 视觉冲击力强、令人印象深刻
- 统一连贯，有清晰的美学观点
- 每个细节都经过精心打磨

### 前端美学准则（Frontend Aesthetics Guidelines）

- **排版（Typography）**：选择美观、独特、有趣的字体。避免 Arial、Inter 等通用字体；选择能提升界面品质的有特色的字体搭配。将一个有辨识度的展示字体与一个精炼的正文字体配对。
- **色彩与主题（Color & Theme）**：坚持统一的美学体系。使用 CSS 变量保持一致性。主色调搭配锐利的强调色，远优于胆怯的、均匀分布的色盘。N-TET 品牌主色 `#315ba4`，搭配深灰 `#333`、浅灰 `#f8f9fa`。
- **动效（Motion）**：为交互效果使用动画和微交互。优先使用纯 CSS 方案。聚焦于高影响力时刻：一个精心编排的页面加载配合交错显示（`animation-delay`），比散乱的微交互更令人愉悦。利用滚动触发和出人意料的悬停状态。
- **空间构成（Spatial Composition）**：出人意料的布局、不对称、重叠、对角线流动、打破网格的元素、慷慨的负空间或可控的密度。
- **背景与视觉细节（Backgrounds & Visual Details）**：营造氛围和层次感，而非默认纯色。添加与整体美学匹配的上下文效果和纹理，如渐变网格、噪点纹理、几何图案、分层透明度、戏剧性阴影、装饰性边框和颗粒叠加层。

### 绝对禁止的"AI 泡沫"（Anti-Slop Rules）

**永远不要**使用以下通用 AI 生成美学：
- 过度使用的字体族（Inter、Roboto、Arial、系统字体）
- 陈腐的配色方案（尤其是白底上的紫色渐变）
- 可预测的布局和组件模式
- 缺乏场景特色的千篇一律设计

要创造性地解读需求，做出出人意料的选择，让设计真正为特定上下文量身定制。每个设计都应该是独特的。在不同页面间变化明暗主题、字体和美学风格。**永远不要**在多次生成中收敛到相同的通用选择。

### N-TET 适配说明

- 本项目使用 **vanilla CSS**（`globals.css`），不使用 TailwindCSS。所有样式通过 inline style 或 CSS class 实现。
- 品牌色：主蓝 `#315ba4`，深黑 `#1a1a2e`，浅灰背景 `#f8f9fa`，白色 `#fff`。
- 图片处理：**绝对不做磁盘级裁剪**，所有图片适配通过前端 CSS（`object-fit`、`transform: scale()`、`mix-blend-mode: multiply`）非破坏性实现。
- 动效标准：使用 `transition` + `cubic-bezier(0.4, 0, 0.2, 1)` 贝塞尔曲线，悬停时卡片上浮 `translateY(-10px)` + 阴影扩散，图片平滑缩放。
- 响应式：桌面/移动端完全分离的组件体系（`DesktopXxx` / `MobileXxx`），断点 992px。
