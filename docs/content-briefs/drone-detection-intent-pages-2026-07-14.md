# Drone Detection Intent Landing Pages Brief

## Basic information

- Primary themes: drone detector, drone detection radar, portable drone detector
- Search intent: commercial investigation and site-configuration inquiry
- Page type: three English A-layer advertising landing pages
- Audience: airport, energy, industrial, venue and mobile security teams
- Compliance tier: A `normal`
- Public publishing: allowed after project gates pass

## Page ownership

| Page | Primary intent | Secondary intent |
| --- | --- | --- |
| `/solutions/low-altitude-airspace-monitoring` | drone detector system | C-UAS detection system, RF/radar/Remote ID/EO selection |
| `/solutions/drone-radar-detection` | drone detection radar | UAV detection radar, Ku-band radar, X-band radar |
| `/solutions/portable-drone-detection` | portable drone detector | handheld drone detector, mobile and temporary deployment |

Each page uses the same seven-section structure: exact H1 and purpose, application contexts, reusable product cards, comparison table, Detection → Identification → Confirmation → Authorized Response workflow, two solution scenarios, and FAQ plus inquiry form.

## RAG evidence pack

- Retrieval date: 2026-07-14
- Public evidence used:
  - `docs/rag/solutions/ntet-public-cuas-monitoring-baseline.md`: sensor roles, site-dependent limits and public claim boundaries.
  - `data/ntet.db`: published Ku-band and X-band radar, stationary RF, Remote ID, EO, portable RF and PL280H product records.
  - `data/ntet.db`: published airport, Asian Games, refinery and Nigeria factory case records.
  - Existing public page `/solutions/low-altitude-airspace-monitoring`: product imagery, site framing and internal-link targets.
- Internal evidence used only for workflow framing:
  - `凡双科技公司及产品介绍_销售.pptx`, slides 6-10: sensing, judgement, disposition and command-platform coordination.
- Evidence rejected from public copy:
  - PPT slides 8-10 active interference, deception, forced-landing, physical interception and automated active-response details.
  - PPT customer counts, zero-incident claims, certifications and performance outcomes that are not corroborated in the public RAG baseline.
- Claims needing confirmation:
  - Site-specific range, coverage and false-alert performance.
  - Portable RF range inconsistency between summary and detailed product fields.
  - Customer names or deployment outcomes beyond the existing public case records.

## E-E-A-T and GEO requirements

- Use published specifications with their stated target/environment conditions.
- Explain that radar, RF, Remote ID and EO provide different evidence.
- Keep one self-contained answer block on each page.
- Use a comparison table for buyer selection and question-led FAQ headings.
- Public Schema: Service, BreadcrumbList and FAQPage.
- `llms.txt`: eligible as A-layer content once static-route support is added to the generator.

## Compliance notes

- `anti drone`, `counter drone`, `counter-UAS` and `C-UAS` may appear as industry category terms.
- Public disposition language is limited to alert escalation, operator verification, responsible-team coordination and approved site procedures.
- Avoid active capability terms including jammer, jamming, spoofing, forced landing, weapon and shoot down.
- Product pages remain B `neutral_seo`; they may be linked as evidence, but the A-layer solution pages are the advertising final URLs.

## Publish gates

- `npm run generate:llms`
- `npm run audit:seo`
- `npm run audit:geo`
- `npm run audit:schema`
- `npm run audit:links`
- `npm run audit:eeat`
- `npm run audit:public-risk`
