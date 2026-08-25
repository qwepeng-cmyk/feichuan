# N-TET media archive batch: 2024-2026

## Brief

- Primary cluster: C-UAS monitoring planning and N-TET engineering review
- Secondary clusters: technology comparison; concept of operations; alert quality; interface review; requirements and assumptions; Remote ID and RF sensing; site survey; environmental limits; coverage planning; event records; portable/fixed/mobile configurations; bench checks; documentation; multi-sensor roles; UAV engineering perspective
- Search intent: informational and commercial investigation
- Recommended page type: engineering explainer / buyer checklist / company method note
- Funnel stage: awareness to evaluation
- Locale: English
- Tentative tier: B `neutral_seo` for all sixteen records
- Public output allowed: yes, informational only

## Keyword and page plan

| Date | Category | Primary keyword | Working title |
|---|---|---|---|
| Aug 22, 2024 | industry | compare C-UAS detection technologies | How to Compare C-UAS Detection Technologies Without a Single-Range Shortcut |
| Sep 19, 2024 | corporate | C-UAS requirements review | Inside N-TET: Turning C-UAS Requirements into a Reviewable Configuration |
| Oct 17, 2024 | industry | C-UAS concept of operations | What a C-UAS Concept of Operations Should Define Before Procurement |
| Nov 14, 2024 | corporate | C-UAS system interfaces | Inside N-TET: Reviewing Power, Network, and Mounting Interfaces |
| Dec 5, 2024 | industry | C-UAS alert quality | Why C-UAS Alert Quality Depends on Operator Context |
| Dec 19, 2024 | corporate | C-UAS assumptions register | Inside N-TET: Keeping Assumptions and Open Questions Visible |
| Jan 23, 2025 | industry | Remote ID vs RF detection | Remote ID and RF Detection: Why Low-Altitude Monitoring Needs Both |
| Feb 20, 2025 | corporate | portable vs fixed C-UAS | Inside N-TET: Comparing Portable, Fixed-Site, and Vehicle-Mounted C-UAS |
| Apr 17, 2025 | industry | C-UAS site survey checklist | C-UAS Site Survey Checklist for Critical Infrastructure |
| May 22, 2025 | corporate | C-UAS equipment bench checks | Inside N-TET: What Equipment Bench Checks Should Confirm |
| Jul 17, 2025 | industry | weather terrain drone detection | How Weather, Terrain, and Urban Clutter Affect Drone Detection |
| Aug 21, 2025 | corporate | C-UAS technical documentation | Inside N-TET: Technical Documentation Buyers Can Actually Review |
| Oct 16, 2025 | industry | drone detection range vs coverage | Drone Detection Range Is Not Site Coverage: A Buyer's Guide |
| Nov 20, 2025 | corporate | multi-sensor C-UAS configuration | Inside N-TET: How We Assign Roles in a Multi-Sensor C-UAS Configuration |
| Feb 19, 2026 | industry | C-UAS event logging | C-UAS Event Logging and Data Retention: What Operators Should Define |
| Mar 19, 2026 | corporate | UAV engineering for C-UAS | Inside N-TET: How UAV Engineering Informs C-UAS System Reviews |

The archive now spans August 2024 through March 2026, while existing media records continue the public timeline through June 2026. Keyword volume and SERP-overlap numbers are intentionally not claimed because no paid/live keyword dataset was used for this batch. The topics were selected from gaps in the current media inventory and from repeated buyer questions represented by the site's public products, solution descriptions and inquiry workflow.

## E-E-A-T evidence

- Product/spec evidence: public Remote ID, RF sensing, radar and EO/IR product records in `data/ntet.db`.
- Operating-context evidence: generic airport, energy-facility, industrial-site and major-venue conditions already described on public solution pages; no case record or project implementation narrative is used as evidence.
- Company evidence: `docs/rag/company/ntet-public-company-capability-baseline.md`.
- Solution evidence: `docs/rag/solutions/ntet-public-cuas-monitoring-baseline.md`.
- Date/freshness requirement: editorial archive dates are visible; no date is presented as a customer event, contract, delivery or certification date.
- Evidence not used: project implementation cases, named deployments and the two unrelated SEO-monitoring RAG files were rejected for this batch.
- Claims needing confirmation: named deployments, delivery outcomes, certifications, founding year, company scale and customer results remain excluded.

## GEO requirements

- Each article opens with a self-contained answer paragraph and uses question-led H2s where natural.
- Each article includes a practical checklist or comparison that can be extracted without the surrounding page.
- Entity mentions: N-TET, C-UAS, Remote ID, RF sensing, radar, EO/IR and low-altitude monitoring where relevant.
- llms.txt inclusion: yes, through the existing non-restricted media generator.

## Internal links

- Company method notes link to `/en/about`, `/en/products`, `/en/solutions` or `/en/contact` where useful.
- Industry notes link to the most relevant public product or solution page and to one adjacent media note.
- No link may point to a restricted product, solution, case, preview, admin or API route.

## Schema plan

- Type: Article with BreadcrumbList through the existing media detail implementation.
- Public Schema: yes.
- Date published/modified: use the article editorial date already stored in the media record.
- Publisher: N-TET through the existing structured-data helper.

## Compliance notes

- A/B/C rationale: all sixteen records discuss monitoring, planning, review and documentation without active response methods; assign B `neutral_seo` because they are C-UAS informational content.
- Editorial boundary: publish only company-method news and industry explainers. Do not create or alter case records, and do not recast a specific delivery, commissioning activity or acceptance result as news.
- Terms to avoid: active response details, restricted equipment terms, guaranteed range, zero false alerts, named customers and unsupported certifications.
- Publication gates: `generate:llms`, `audit:seo`, `audit:geo`, `audit:schema`, `audit:links`, `audit:eeat`, `audit:content-quality`, `audit:public-risk`.
