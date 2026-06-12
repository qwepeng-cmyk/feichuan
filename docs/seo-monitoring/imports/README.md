# SEO 监控导入目录

这个目录用于放第三方平台导出的原始数据或脚本采集快照。

建议目录：

- `cloudflare/`：Cloudflare GraphQL Analytics 或日志导出。
- `gsc/`：Google Search Console Search Analytics / URL Inspection 快照。
- `semrush/`：Semrush 批量导出的关键词、排名、竞品 CSV。
- `nginx/`：源站 access log 抽样或清洗后的 CSV。

凭证不要放在这里。API Token、OAuth JSON、服务账号 JSON 统一通过本机环境变量或 `.env.local` 管理。
