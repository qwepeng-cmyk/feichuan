# N-TET 线上速度审查

- 审查时间：2026-07-13（Asia/Shanghai）
- 目标站点：https://n-tet.com/
- 抽查页面：首页、产品中心、解决方案、案例中心、媒体中心
- 测量方式：每页 7 次线上 HTTPS 采样、响应头与静态资源检查、当前仓库实现核对
- 限制：PageSpeed Insights 当日配额返回 429；浏览器性能时间线受企业网络策略阻止，因此本报告不提供 Lighthouse 分数，也不推测 LCP、INP 或 CLS。

## 结论

网站不是不可用或严重卡死，Next.js 页面缓存和静态资源缓存都在工作；但冷访问仍有明显优化空间。当前主要瓶颈不是首方 JavaScript，而是 HTML 没有在 Cloudflare 边缘缓存、分析脚本重复加载、列表页高优先级图片过多，以及首页 3.06 MB 自动播放视频带来的加载尾部。

综合判断：**可用，但尚未达到稳定的“快站”水平，优先完成边缘 HTML 缓存与跟踪脚本去重。**

## 线上采样

以下为当前测量网络路径中的 7 次中位数；“总耗时”指 HTML 文档传输完成，不等于浏览器可交互时间。

| 页面 | TTFB 中位数 | TTFB 范围 | HTML 总耗时中位数 | gzip HTML | 原始 HTML 约 |
|---|---:|---:|---:|---:|---:|
| `/` | 0.626 s | 0.597–1.074 s | 0.821 s | 34.3 KB | 234 KB |
| `/products` | 0.641 s | 0.574–0.728 s | 0.796 s | 26.7 KB | 165 KB |
| `/solutions` | 0.628 s | 0.595–0.810 s | 0.878 s | 33.4 KB | 183 KB |
| `/cases` | 0.647 s | 0.595–0.832 s | 0.839 s | 25.8 KB | 149 KB |
| `/media` | 0.837 s | 0.620–1.078 s | 1.088 s | 42.2 KB | 210 KB |

首方静态代码体积处于中等水平：每页 16–19 个 JavaScript 文件，当前采样路径下合计约 178–195 KB；CSS 约 11–13 KB。它不是目前最大的矛盾。

## 主要问题

### P1：HTML 仍然动态回源

所有抽查页面都返回：

- `X-Nextjs-Cache: HIT`
- `Cache-Control: s-maxage=3600, stale-while-revalidate`
- `Cf-Cache-Status: DYNAMIC`

这说明应用层缓存命中，但 Cloudflare 没有缓存 HTML。每个冷访问仍需走到源站，导致 TTFB 基本停留在 0.6–0.8 秒。直连源站抽查也在约 0.64–1.16 秒区间，进一步说明边缘 HTML 缓存是最直接的杠杆。

建议为公开 GET 页面设置 Cache Rule / Cache Everything，Edge TTL 可先用 1 小时；至少覆盖 `/`、`/products*`、`/solutions*`、`/cases*`、`/media*`，明确排除 `/api*`、`/admin*`、表单提交及任何用户状态页面。发布后验证 `Cf-Cache-Status: HIT` 与 `Age`。

### P1：GTM 与独立 gtag 重复

线上同时加载：

- `gtm.js?id=GTM-PJN9QQWN`：本次响应体约 419 KB
- `gtag/js?id=G-ZS6XC2TFCG`：本次响应体约 550 KB

GTM 容器代码中已经包含同一个 `G-ZS6XC2TFCG`，因此当前 GA4 路径存在明确重复。两份响应在本次路径合计约 0.97 MB，还会增加解析、执行和第三方请求成本。

建议保留 GTM 作为唯一入口，确认 GA4 与 Ads 转化标签均由容器继续触发后，删除布局中的独立 gtag 加载。上线前后必须核对 GA4 实时流与 Google Ads 转化，避免数据中断或重复计数。

### P1：列表页图片优先级过量

| 页面 | `fetchpriority=high` 图片标签 | 唯一高优先级图片 | 唯一图片合计 |
|---|---:|---:|---:|
| `/products` | 7 | 5 | 714 KB |
| `/solutions` | 10 | 6 | 819 KB |
| `/cases` | 14 | 8 | 490 KB |

桌面和移动组件同时存在于服务端 HTML，仅靠 CSS 隐藏其中一套；两套组件又各自给多张卡片设置 `priority`。这会把本应延迟加载的图片推到首屏竞争队列，尤其不利于移动网络上的 LCP。

建议每个列表页只保留横幅/LCP 图片和最多 1 张真实首屏卡片为高优先级，目标是每页 1–2 个图片 preload。隐藏布局中的卡片不要设置 `priority`。

### P2：首页视频拖长加载尾部

线上首页使用 `/index_banner_bg_3.mp4`，文件 3,061,884 字节（约 3.06 MB）。它已正确获得一年 immutable 缓存且 Cloudflare 命中，但首次访问仍需下载。当前工作树拟使用的 `/index_banner_bg_5.mp4` 为 2,840,734 字节，约小 7%，仍接近 2.84 MB。

建议保留 poster，继续使用 `preload="metadata"`，并为移动端提供更低码率/更短版本或静态首屏；还可针对 `prefers-reduced-data` / `prefers-reduced-motion` 停止自动下载。不要通过磁盘裁剪破坏原图，适配继续由前端完成。

### P2：默认英文 `/en/*` 会多一次 301

站点英文默认路由是无前缀路径。`/en/products`、`/en/solutions`、`/en/cases`、`/en/media` 都先 301 到无前缀地址。广告、站内链接、邮件和外链应直接使用 `/products` 等 canonical URL，避免首访额外往返。

## 已做得好的部分

- 图片、视频等静态资源返回 `Cache-Control: public, max-age=31536000, immutable`。
- 抽查视频与 WebP 均为 `Cf-Cache-Status: HIT`，说明静态资源 CDN 缓存有效。
- HTML gzip 生效，首方 JS/CSS 体积不是当前首要问题。
- 在线聊天与浮动消息框当前均关闭，`/api/site/chat-settings` 返回两项 `false`，本轮没有把 Zoosnet 计入负载。

## 建议实施顺序

1. 配置 Cloudflare 公开页面 HTML 边缘缓存，并验证命中。
2. 合并跟踪链路：保留 GTM，移除重复 gtag，验证 GA4/Ads。
3. 把产品、解决方案、案例页图片 preload 压到每页 1–2 个。
4. 给移动首页提供轻量视频或静态首屏策略。
5. PageSpeed 配额恢复后重新测移动/桌面 Lighthouse；浏览器策略允许时补录真实 LCP、CLS 与交互 INP。

## Core Web Vitals 状态

- LCP：本轮不可测，不推测
- INP：本轮不可测，不以 TBT 代替
- CLS：本轮不可测，不推测
- CrUX 字段数据：PageSpeed API 429，未取得

