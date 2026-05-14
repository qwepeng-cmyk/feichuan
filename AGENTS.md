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
