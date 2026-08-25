# 低空监测着陆页本地性能优化报告

- 生成时间：2026-07-14 15:06（Asia/Shanghai）
- 页面：`/solutions/low-altitude-airspace-monitoring`
- 验证范围：本地源码、Next.js 生产构建与本地生产预览
- 未执行：生产部署、Cloudflare Cache Rule、线上 TTFB 复测

## 结论

优先级 1 和本地可完成的优先级 2/3 已收口。页面现在只输出一套响应式语义 DOM；询盘表单、WhatsApp 留资弹窗、Zoosnet 和浮动留言框均不再进入首屏业务代码；目标页废弃的双端 CSS 已清理。

Next.js 14.1.0 生产构建以退出码 0 完成，共生成 870/870 个静态页面。英文目标页继续通过关键词承接审计（strong/100），公开风险门禁对目标页返回 `ok`。

## 前后指标

| 指标 | 原始审计 | 第一轮本地优化 | 最终本地构建 |
|---|---:|---:|---:|
| HTML | 291,746 B | 200,198 B | 199,029 B |
| 初始脚本数 | 16 | 15 | 14 |
| Next.js First Load JS | 未记录 | 105 KB | 99.9 KB |
| 目标页 CSS | 未记录 | 63,644 B | 43,549 B |
| 首包 H1 | 重复 | 1 | 1 |
| 首包表单 | 2 套页面表单 | 0 | 0 |

最终 HTML 比原始审计减少 92,717 B，约 31.8%。目标页 CSS 比第一轮构建减少 20,095 B，约 31.6%。

## JavaScript 拆分

以下功能已成为按需加载 chunk，不在目标页初始 14 个脚本中：

- WhatsApp 留资弹窗与提交/Ads 转化逻辑：12,366 B，仅首次点击 WhatsApp CTA 后加载。
- 浮动留言框：7,827 B，在浏览器空闲后加载，原 20 秒展示计时保持以页面访问时间为准。
- Zoosnet 业务聊天加载器：2,029 B，在浏览器空闲或用户主动打开业务聊天时加载。
- 页面底部询盘表单：继续使用 IntersectionObserver，在接近询盘区时加载。

Google Ads 转化口径未改变：`/api/whatsapp-leads` 成功返回 `inquiryId` 后，原 `trackGoogleAdsFormConversion` 才执行。普通 WhatsApp 点击仍不计作表单转化。

## 响应式与交互验证

- 430 px 本地浏览器：1 个 H1、0 个初始表单、无横向溢出。
- WhatsApp 首次点击后弹窗成功出现。
- 关闭弹窗后再次点击可重新打开。
- 点击 `Get Site Layout & Quote` 后，延迟询盘表单成功加载。
- 未提交测试询盘，避免向本地数据库写入虚假线索。

## 本地响应

生产预览 5 次 warm curl 的 TTFB 为 42.7、17.6、17.0、16.2、16.0 ms，中位数约 17.0 ms。该结果只代表本机应用层，不等同于公网或 Cloudflare TTFB。

## 门禁结果

- TypeScript：通过。
- `next build`：退出码 0，870/870 页面完成。
- SEO audit：0 warnings。
- Schema audit：184 个公开候选。
- Keyword landing audit：英文目标页 strong/100。
- Public risk：目标页 en/ru/ar 均为 `ok`；全站仍有 3 个其他既有页面命中受限模式。
- Internal links：仍有 3 条既有数据引用问题，与本次着陆页性能改动无关。
- E-E-A-T：1 条其他产品短摘要警告，与目标页无关。

## 上传后仍需人工完成

1. 按项目既有方式上传本地 `.next/`，不要在 4 GB 服务器上构建。
2. 上线后确认目标页 HTML 约 199,029 B、1 个 H1、0 个初始表单、14 个初始脚本。
3. 如需完成优先级 2 的线上部分，为该着陆页及 `ru/es/ar` 版本启用 Cloudflare HTML Edge Cache，并排除 RSC、prefetch、API、admin 与表单 POST。
4. 连续访问同一 URL，确认 `CF-Cache-Status: MISS` 后转为 `HIT`，并出现 `Age` 响应头。
5. 再测公网 TTFB；不要用本地约 17 ms 代替线上结果。
6. 上线后手工复核 WhatsApp 弹窗、询盘提交成功、GA4/Ads 转化及移动端 430 px 页面。

## Core Web Vitals 限制

本轮没有新的 CrUX 或 Lighthouse 数据，因此不编造 LCP、INP、CLS。代码体积、构建输出和本地 TTFB应与真实用户 CWV 分开解读。
