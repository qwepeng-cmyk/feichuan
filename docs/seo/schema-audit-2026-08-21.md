# N-TET Schema 审计

生成日期：2026-08-21

## 策略

- C-UAS 可索引记录可根据页面类型使用 Product、Service、Article、BreadcrumbList 与 Organization Schema。
- 不应用 A/B/C 或敏感词门禁。后台、API、preview、draft、未发布记录与非 C-UAS 页面不输出公开详情 Schema。

## 推荐公开 Schema 候选

| 类型 | Handle | 推荐 Schema | URL |
| --- | --- | --- | --- |
| product | handheld-rf-detection-system-mini | Product | https://n-tet.com/products/handheld-rf-detection-system-mini |
| product | fc-dtvc-dual-band-thermal-ptz | Product | https://n-tet.com/products/fc-dtvc-dual-band-thermal-ptz |
| product | fc-ttvc-intelligent-multi-band-camera | Product | https://n-tet.com/products/fc-ttvc-intelligent-multi-band-camera |
| product | fc-rds500-4r-radar-vision-sentinel | Product | https://n-tet.com/products/fc-rds500-4r-radar-vision-sentinel |
| product | fc-dms10-smart-electronic-sentinel | Product | https://n-tet.com/products/fc-dms10-smart-electronic-sentinel |
| product | fc-dma-long-range-optical-turntable | Product | https://n-tet.com/products/fc-dma-long-range-optical-turntable |
| product | composite-electro-optical-tracking-system | Product | https://n-tet.com/products/composite-electro-optical-tracking-system |
| product | portable-rf-detection-case | Product | https://n-tet.com/products/portable-rf-detection-case |
| product | low-altitude-detection-radar-ku-band | Product | https://n-tet.com/products/low-altitude-detection-radar-ku-band |
| product | low-altitude-3d-pulse-doppler-radar | Product | https://n-tet.com/products/low-altitude-3d-pulse-doppler-radar |
| product | aerial-remote-id-monitoring-system | Product | https://n-tet.com/products/aerial-remote-id-monitoring-system |
| product | stationary-rf-detection-system | Product | https://n-tet.com/products/stationary-rf-detection-system |
| solution | airport-low-altitude-monitoring | Service | https://n-tet.com/solutions/airport-low-altitude-monitoring |
| solution | hydroelectric-dam-protection | Service | https://n-tet.com/solutions/hydroelectric-dam-protection |
| solution | chemical-plant-protection | Service | https://n-tet.com/solutions/chemical-plant-protection |
| solution | power-generation-facility-low-altitude-monitoring | Service | https://n-tet.com/solutions/power-generation-facility-low-altitude-monitoring |
| solution | oil-production-base-protection | Service | https://n-tet.com/solutions/oil-production-base-protection |
| case | nigeria-factory-low-altitude-monitoring | Article | https://n-tet.com/cases/nigeria-factory-low-altitude-monitoring |
| case | airport-security-application | Article | https://n-tet.com/cases/airport-security-application |
| case | asian-games-security | Article | https://n-tet.com/cases/asian-games-security |
| case | brazil-refinery-low-altitude-monitoring | Article | https://n-tet.com/cases/brazil-refinery-low-altitude-monitoring |
| case | water-conservancy-security | Article | https://n-tet.com/cases/water-conservancy-security |
| case | pakistan-power-plant-low-altitude-monitoring | Article | https://n-tet.com/cases/pakistan-power-plant-low-altitude-monitoring |
| media | remote-id-rf-detection-complementary-2025 | Article | https://n-tet.com/media/remote-id-rf-detection-complementary-2025 |
| media | ntet-equipment-bench-checks-2025 | Article | https://n-tet.com/media/ntet-equipment-bench-checks-2025 |
| media | site-photo-review-before-system-layout-2026 | Article | https://n-tet.com/media/site-photo-review-before-system-layout-2026 |
| media | ntet-multi-sensor-configuration-method-2025 | Article | https://n-tet.com/media/ntet-multi-sensor-configuration-method-2025 |
| media | project-inquiry-review-low-altitude-monitoring-2026 | Article | https://n-tet.com/media/project-inquiry-review-low-altitude-monitoring-2026 |
| media | eo-ir-payload-selection-field-note-2026 | Article | https://n-tet.com/media/eo-ir-payload-selection-field-note-2026 |
| media | critical-infrastructure-monitoring-record-chain-2026 | Article | https://n-tet.com/media/critical-infrastructure-monitoring-record-chain-2026 |
| media | low-altitude-economy-2026-outlook | Article | https://n-tet.com/media/low-altitude-economy-2026-outlook |
| media | low-altitude-economy-operations-owner-2026 | Article | https://n-tet.com/media/low-altitude-economy-operations-owner-2026 |
| media | radar-rf-optical-nuisance-alert-reduction-2026 | Article | https://n-tet.com/media/radar-rf-optical-nuisance-alert-reduction-2026 |
| solution | critical-infrastructure-airspace-monitoring | Service | https://n-tet.com/solutions/critical-infrastructure-airspace-monitoring |
| solution | power-plant-airspace-monitoring | Service | https://n-tet.com/solutions/power-plant-airspace-monitoring |
| solution | airport-security-protection | Service | https://n-tet.com/solutions/airport-security-protection |
| solution | border-airspace-monitoring | Service | https://n-tet.com/solutions/border-airspace-monitoring |
| solution | public-safety-airspace-monitoring | Service | https://n-tet.com/solutions/public-safety-airspace-monitoring |
| solution | correctional-facility-airspace-monitoring | Service | https://n-tet.com/solutions/correctional-facility-airspace-monitoring |
| solution | port-airspace-monitoring | Service | https://n-tet.com/solutions/port-airspace-monitoring |
| solution | mass-event-airspace-monitoring | Service | https://n-tet.com/solutions/mass-event-airspace-monitoring |
| solution | vip-private-property-airspace-monitoring | Service | https://n-tet.com/solutions/vip-private-property-airspace-monitoring |
| solution | enterprise-airspace-monitoring | Service | https://n-tet.com/solutions/enterprise-airspace-monitoring |

## 实施说明

- 优先在 App Router 详情页中使用服务端渲染的 JSON-LD。
- Organization Schema 必须保持事实准确：公司名、logo、URL、联系页与已验证的 sameAs。
