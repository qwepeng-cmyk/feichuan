# N-TET C-UAS Indexation Audit

Audit date: 2026-07-24  
Target: `https://n-tet.com/`  
Scope: live sitemap, indexability samples, local published-content database, `llms.txt`, and C-UAS route coverage.

## Executive conclusion

The live sitemap contains 840 localized URLs. It currently reflects the broad historical catalog rather than the site's current C-UAS positioning.

- 376 URLs are clearly unrelated product or accessory URLs:
  - 224 `/accessories` URLs, including 12 UAV engine product families across four locales.
  - 76 industrial UAV product URLs.
  - 76 security-screening product URLs.
- At least 132 additional localized solution, case, and media URLs are unrelated to C-UAS.
- 36 localized URLs for nine live C-UAS industry solution pages are missing from the sitemap.
- The strict C-UAS sitemap target is approximately 360 URLs, down from 840, after removing unrelated URLs and adding the missing C-UAS solution URLs.

Do not use `robots.txt` to block these pages. Pages that remain publicly accessible should return `200` with `noindex, follow`, be removed from sitemap/Schema/`llms.txt`, and remain crawlable until search engines process the `noindex`.

## Evidence collected

### Live sitemap

`https://n-tet.com/sitemap.xml` returned 840 URLs:

| Route family | URLs |
|---|---:|
| `/products` | 268 |
| `/accessories` | 224 |
| `/solutions` | 148 |
| `/media` | 136 |
| `/cases` | 48 |
| Other static pages | 16 |

All sitemap entries use effectively the same deployment-time `lastmod`. The current `priority` and `changefreq` values are ignored by Google and add no ranking value.

### Live indexability samples

The following representative unrelated pages returned `200`, a self-referencing canonical, and no robots meta tag:

- `/accessories/fc-fdj-111`
- `/products/emergency-search-rescue-drone`
- `/products/fc5030-compact-x-ray-baggage-scanner`
- `/solutions/power-line-uav-intelligent-inspection-solution`

They are currently indexable. Removing them only from the sitemap would not remove them from search results.

### Published database state

The local database contains these published product groups:

| Product group | Published records | C-UAS decision |
|---|---:|---|
| `anti-drone-cuas` | 1 | Keep indexed |
| `drone-detection` | 21 | Keep indexed |
| `perimeter-intelligence` | 6 | Keep indexed as C-UAS sensor/support equipment |
| `security-screening` | 19 | Noindex and remove from C-UAS discovery surfaces |
| `uav-drone-systems` | 19 | Noindex and remove from C-UAS discovery surfaces |
| `uav-accessories` | 55 | Noindex and remove from C-UAS discovery surfaces |

The 15 `industrial-engine-microgrid` records are already unpublished and are not in the current sitemap. The engine URLs seen in search discovery are the 12 published UAV engine records inside `uav-accessories`.

## URL decisions

### Products and accessories

Keep indexed:

- All published `anti-drone-cuas` products.
- All published `drone-detection` products.
- The six published `perimeter-intelligence` products because they support radar/EO/IR detection, visual confirmation, and tracking.
- The `/products` landing page, which is already presented as a C-UAS product center.

Remove from sitemap and apply `noindex, follow`:

- The `/accessories` landing page and all 55 accessory detail pages.
- All 19 published `uav-drone-systems` detail pages.
- All 19 published `security-screening` detail pages.

This removes 376 localized URLs.

### Solutions

Twenty published legacy solution records are clearly non-C-UAS and should be noindexed:

- `land-based-maritime-surveillance`
- `uav-maritime-emergency-rescue`
- `uav-maritime-patrol`
- `power-tower-inspection-uav-solution`
- `smart-substation-autonomous-inspection-solution`
- `water-conservancy-monitoring-uav-solution`
- `disaster-site-search-rescue-reconnaissance-uav-solution`
- `emergency-communication-uav`
- `emergency-communication-uav-solution`
- `emergency-lighting-uav`
- `emergency-reconnaissance-uav`
- `emergency-search-rescue-uav-solution`
- `high-rise-firefighting-uav-solution`
- `night-emergency-lighting-support-uav-solution`
- `post-disaster-emergency-communication-support-uav-solution`
- `power-line-uav-intelligent-inspection-solution`
- `smart-substation-unattended-uav-inspection-solution`
- `tethered-lighting-uav-solution`
- `urban-high-rise-firefighting-emergency-uav-solution`
- `water-conservancy-river-lake-uav-monitoring-solution`

The four legacy category pages should be removed from the C-UAS sitemap until they are refactored:

- `01_BorderPatrol` and `04_EmergencyRescue` are UAV-application categories.
- `02_InfrastructureProtection` mixes C-UAS and UAV inspection.
- `03_KeyAreaSecurity` mixes C-UAS and security-screening products.

Nine live C-UAS industry pages are missing from the sitemap and should be added for all four locales:

- `critical-infrastructure-airspace-monitoring`
- `power-plant-airspace-monitoring`
- `border-airspace-monitoring`
- `public-safety-airspace-monitoring`
- `correctional-facility-airspace-monitoring`
- `port-airspace-monitoring`
- `mass-event-airspace-monitoring`
- `vip-private-property-airspace-monitoring`
- `enterprise-airspace-monitoring`

`airport-security-protection` is the tenth page in the new C-UAS catalog and is already included through the database.

The following legacy C-UAS pages may remain indexed, but should later be checked for overlap with the new industry pages:

- `airport-low-altitude-monitoring`
- `chemical-plant-protection`
- `hydroelectric-dam-protection`
- `oil-production-base-protection`
- `power-generation-facility-low-altitude-monitoring`
- `airport-security-protection`
- `judicial-sector-security`
- `sports-event-security`

Potential cannibalization pairs include power generation vs. power plants, judicial security vs. prison defense, and sports event security vs. mass-event defense.

### Cases

Keep the six published C-UAS cases:

- `airport-security-application`
- `asian-games-security`
- `brazil-refinery-low-altitude-monitoring`
- `nigeria-factory-low-altitude-monitoring`
- `pakistan-power-plant-low-altitude-monitoring`
- `water-conservancy-security`

Apply `noindex, follow` and remove from sitemap for these five UAV-operation cases:

- `anhui-flood-season-uav-patrol`
- `ice-snow-emergency-uav-inspection`
- `lidar-tree-obstruction-uav-inspection`
- `southern-grid-wildfire-uav-inspection`
- `wildfire-emergency-transmission-line-uav-patrol`

The public case-center UI already filters to C-UAS cases, but the sitemap still publishes the five hidden UAV cases.

### Media

Apply `noindex, follow` and remove from sitemap for these six non-C-UAS articles:

- `border-surveillance-uav-network-2026`
- `dock-based-substation-uav-trial-checks-2026`
- `industrial-uav-redundancy-2026`
- `overseas-uav-project-handover-checklist-2026`
- `power-line-inspection-drone-guide-2026`
- `tethered-uav-persistent-surveillance-2026`

Keep `ntet-uav-engineering-cuas-perspective-2026` indexed because the page explicitly uses UAV engineering to explain C-UAS review methodology.

## Content accuracy and evidence risk

- No evidence was found that unrelated content is leaking through admin, preview, draft, or unpublished routes in the sitemap.
- Category-based filtering is safer than keyword filtering. It avoids incorrectly hiding legitimate C-UAS pages containing terms such as `drone`, `jammer`, or `spoofing`.
- The six `perimeter-intelligence` products need a later editorial review to ensure each page explicitly explains its C-UAS role rather than presenting only generic perimeter surveillance claims.

## SEO risk

High:

- 508 currently indexed-candidate URLs are clearly outside the C-UAS topic when product, solution, case, media, and the two purely UAV category pages are combined.
- Unrelated pages are internally discoverable and have self-canonicals, so sitemap removal alone will not deindex them.
- Nine important C-UAS industry pages are absent from the sitemap.

Medium:

- Legacy and new C-UAS solution pages may compete for the same search intent.
- Mixed legacy category pages weaken the topical focus of the new C-UAS solution center.

Low:

- Sitemap `lastmod` is deployment time rather than content update time.
- `priority` and `changefreq` can be removed because Google ignores them.

## GEO / AI visibility risk

High:

- `public/llms.txt` describes N-TET as a provider of UAV systems, industrial security, and engineering materials instead of a focused C-UAS company.
- It includes all published UAV, accessory, security-screening, legacy solution, case, and media records.
- Accessory links are generated incorrectly under `/products/{handle}` even though their public canonical route is `/accessories/{handle}`.
- The nine new C-UAS industry pages missing from sitemap are also absent from the generated `llms.txt`.

Medium:

- Cloudflare-managed robots directives declare `Disallow: /` for several AI crawlers before later project rules declare `Allow: /`. Conflicting crawler groups should be normalized in Cloudflare so GEO crawler access is deterministic.

## Public visibility leaks

- `/admin`, `/api`, and preview paths were not found in the live sitemap.
- Published unrelated pages remain publicly accessible and indexable by design.
- If these products are no longer offered at all, the stronger action is to set `is_published=0` and return `404`/`410`. If they must remain accessible to existing customers, use `noindex, follow` instead.

## Recommended implementation order

1. Add one central C-UAS indexability policy based on explicit product categories and explicit solution/case/media handles.
2. Apply the same policy to page metadata, sitemap generation, Schema generation, `llms.txt`, and SEO audits.
3. Keep blocked pages crawlable and return `noindex, follow`; do not add them to `robots.txt`.
4. Add the nine missing C-UAS solution handles to sitemap and `llms.txt`.
5. Remove or refactor the four legacy solution-category pages.
6. Regenerate `llms.txt` and run all N-TET SEO/GEO validation scripts.
7. After deployment, request recrawl/removal through Google Search Console and monitor excluded-by-`noindex` status.

## Proposed sitemap size

Strict C-UAS scope:

- Current: 840 URLs.
- Remove unrelated and mixed legacy pages: 516 URLs.
- Add missing C-UAS industry pages: 36 URLs.
- Proposed total: approximately 360 URLs.

If the two mixed but mostly security-oriented category pages are refactored and retained, the total would be approximately 368 URLs.

## Implemented scope

Implemented on 2026-07-24:

- The generated sitemap now contains 352 URLs.
- UAV accessories, UAV systems, security-screening products, mixed legacy solution categories, five UAV-operation cases, and six non-C-UAS media pages are excluded.
- `judicial-sector-security` and `sports-event-security` were also excluded because their legacy pages mix C-UAS with security-screening products; the focused `correctional-facility-airspace-monitoring` and `mass-event-airspace-monitoring` pages replace their search intent.
- Published excluded pages remain accessible with `noindex, follow`.
- Detail Product, Service, and Article Schema is omitted from excluded pages.
- The nine missing C-UAS catalog solution handles are now included for all four locales.
- `public/llms.txt` now contains 84 C-UAS indexable records and no accessory URL paths.
