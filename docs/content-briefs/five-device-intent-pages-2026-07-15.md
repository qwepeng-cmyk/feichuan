# Five Device-Intent Landing Pages Brief

## Scope

- Locale: English
- Market: United States keyword reports
- Page type: A-layer Google Ads landing pages
- Structure: H1 and purpose; applications; reusable product cards; comparison table; Detection → Identification → Confirmation → Authorized Response; two scenarios; FAQ and inquiry form
- Source reports:
  - `drone-defender_broad-match_us_2026-07-15.xlsx`
  - `drone-locator_broad-match_us_2026-07-15.xlsx`
  - `drone-shield_broad-match_us_2026-07-15.xlsx`
  - `drone-jammer_broad-match_us_2026-07-15.xlsx`
  - `drone-detector_broad-match_us_2026-07-15.xlsx`

## Page map and keyword decisions

| Public page | Primary target | Secondary targets | Excluded or redirected intent |
| --- | --- | --- | --- |
| `/solutions/drone-defender` | drone defender | drone defender system; RF drone detection; drone detection radar; EO/IR tracking; drone jammer | Battelle and Dedrone brand queries; gun/rifle; military attack content; toys and games |
| `/solutions/drone-locator` | drone locator | mobile drone locator; handheld drone detector; portable RF locator; fixed RF and radar positioning; drone jammer | delivery locations; lost-drone recovery; consumer GPS; games; police news |
| `/solutions/drone-shield` | drone shield | anti drone shield; fixed-site C-UAS; portable field shield; mobile site protection | DroneShield stock/company navigation; Shield AI; games; military news |
| `/solutions/drone-jammer` | drone jammer | drone signal jammer; anti drone jammer; RF jammer for drones; directional RF jammer; omni-directional RF jammer | DIY/build instructions, apps, gun-shaped devices, military-news intent and other unapproved jammer products remain excluded. |
| `/solutions/drone-detector` | drone detector | drone detectors; anti drone radar detector; drone radar detector; multi-sensor drone detection; portable drone detector | detector apps; police apps; metal/mine/radiation detector drones; brands and military-news terms |

The source reports contain substantial ambiguous, navigational and consumer noise. Search volume was used as an intent signal, not as permission to reproduce irrelevant or restricted terms.

## Evidence pack

- `docs/rag/solutions/ntet-public-cuas-monitoring-baseline.md`: public sensor roles, site-dependent limits and claim boundaries.
- `docs/rag/company/ntet-public-company-capability-baseline.md`: fixed, portable and vehicle-mounted comparison; requirements review, equipment configuration, interfaces, documentation and test preparation.
- `data/ntet.db`: published product handles, names, images and public descriptions.
- Existing public airport, refinery and major-event case records: scenario framing and internal links.
- Existing intent landing template: seven-section page structure, Service/FAQ/Breadcrumb Schema and inquiry workflow.

## Claim and compliance rules

- Allowed industry categories: anti drone, counter drone, counter-UAS, counter-UAV and C-UAS.
- Public jammer-name exception is limited to the two existing A-layer handles `directional-rf-interference-device` and `omni-directional-rf-interference-device`, whose public names are `Directional RF Jammer` and `Omni-directional RF Jammer`.
- The approved names may appear in the Defender, Locator and Drone Jammer landing pages, metadata, Schema, sitemap and `llms.txt`; other jammer handles, gun-shaped products, spoofing and weaponized methods remain restricted.
- Public workflow language connects RF/radar detection and EO/IR confirmation to a responsible operator, the approved jammer geometry and a documented outcome. It does not provide build instructions or step-by-step operating methods.
- Product range values are reference conditions, not guaranteed site coverage.
- Site performance depends on target characteristics, terrain, buildings, weather, RF noise, mounting, interfaces and operator procedure.
- No unverified customer outcomes, certifications, market share, capacity or universal performance promises.

## Public page requirements

- One clear answer block per page.
- Reusable product links and scenario links open in a new window.
- Comparison tables remain horizontally scrollable on narrow screens.
- 06 FAQ and 07 Project Inquiry remain vertically stacked.
- Schema: Service, FAQPage and BreadcrumbList.
- English-only route with canonical and x-default pointing to the English page.

## Local gates

- `npm run generate:llms`
- `npm run build`
- Rendered checks for all five routes on desktop and mobile
- `npm run audit:seo`
- `npm run audit:geo`
- `npm run audit:schema`
- `npm run audit:links`
- `npm run audit:eeat`
- `npm run audit:public-risk`

Local implementation only. Do not commit, deploy or upload.
