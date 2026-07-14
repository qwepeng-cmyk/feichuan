# N-TET 项目工作要点

## 项目信息

- **域名**: https://n-tet.com/（Cloudflare CDN → 源站 43.129.170.171）
- **服务器**: 4GB 内存，root@43.129.170.171，项目路径 `/www/wwwroot/n-tet.com`
- **进程管理**: PM2，应用名 `n-tet`，监听 3000 端口
- **栈**: Next.js 14.1.0 App Router + i18n（en/ru，default en）+ better-sqlite3
- **本地路径**: `/Users/mattchyi/Documents/Project/fc/`，Node 22，Git 远端 main

## 部署模式（重要）

服务器内存只有 4GB，**不在服务器上跑 `npm run build`**（会 OOM）。流程：

1. 本地 `npm run build` 产出 `.next/`
2. `tar -czf /tmp/next-deploy.tar.gz .next/` 打包
3. `scp` 到服务器 `/tmp/`
4. 服务器解包覆盖 `.next/`，`pm2 restart n-tet`

## 服务器上必须存在的软链接

本地 build 烧入了绝对路径 `/Users/mattchyi/Documents/Project/fc/...` 到 `.next/` 内部。服务器上必须有这条软链才能找到 node_modules：

```bash
ln -sfn /www/wwwroot/n-tet.com /Users/mattchyi/Documents/Project/fc
```

如果服务器系统重装/迁移，第一件事就是补回这条软链，否则 next-server 启动报 MODULE_NOT_FOUND。

## node_modules 同步

服务器 `node_modules` 必须跟当前 `package-lock.json` 对齐，否则 build 产物的 chunks 会调到不存在的导出（典型报错 `TypeError: t[e] is not a function`）。每次 `package-lock.json` 变化后：

```bash
ssh root@43.129.170.171 "cd /www/wwwroot/n-tet.com && pm2 stop n-tet && rm -rf node_modules && npm ci --omit=dev --no-audit --no-fund && pm2 restart n-tet"
```

## 调试服务器时的坑

服务器 shell 有 `http_proxy=socks5h://127.0.0.1:40000`（坏代理）。用 ssh 跑 `curl` 自检会被劫持成 30s 超时，假象是 next-server 挂了。**所有服务器内部自测必须**：

```bash
curl --noproxy '*' http://127.0.0.1:3000/...
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

## 广告合规术语口径（2026-07-14）

- `anti drone` / `anti-drone`、`counter drone`、`counter-UAS` / `counter-UAV`、`C-UAS` 是允许公开用于 A 层广告承接页、广告文案、SEO/GEO 与 Schema 的行业类别词，不能仅因命中这些词就判为 restricted。
- 放开行业类别词不等于放开主动能力词。`jammer` / `jamming`、`spoofing`、`forced landing`、`weapon`、`shoot down` 等主动干扰、诱骗、迫降或武器化表述继续按现有 A/B/C 规则限制。
- 内容层级仍以 `src/lib/complianceTaxonomy.ts` 为准；公开风险审计和关键词覆盖矩阵必须与上述术语口径保持一致。

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
