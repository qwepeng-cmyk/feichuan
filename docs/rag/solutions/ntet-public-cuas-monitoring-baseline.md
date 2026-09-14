---
title: N-TET Public C-UAS Monitoring Baseline
type: solution
visibility: public
date: 2026-07-13
topics:
  - Remote ID
  - RF detection
  - radar
  - EO/IR confirmation
  - event records
  - system configuration
---

# N-TET public C-UAS monitoring baseline

## Public sources used

- `data/ntet.db`, product `uav-remote-id-monitoring-system`: Remote ID monitoring can receive broadcast identity and flight information where compatible broadcasts are available.
- `data/ntet.db`, product `stationary-rf-detection-system`: RF sensing is presented as a passive awareness layer whose results depend on target signals and the local RF environment.
- `data/ntet.db`, products `low-altitude-detection-radar-ku-band` and `low-altitude-3d-pulse-doppler-radar`: radar is presented as a tracking layer for low-altitude targets, with coverage dependent on site geometry and target conditions.
- `data/ntet.db`, product `composite-electro-optical-tracking-system`: EO/IR is used for operator visual confirmation, subject to line of sight, lighting, weather and target presentation.
- Public solution and case records: the monitoring workflow combines detection, identification, confirmation, operator review and traceable event records.

## Claims allowed in public editorial content

- Remote ID, RF sensing, radar and EO/IR provide different types of evidence and have different limitations.
- Published detection distance is not the same as guaranteed site coverage.
- Buildings, terrain, weather, RF noise, mounting position and operator workflow affect monitoring performance.
- Site surveys should document boundaries, approach directions, blind zones, power, network, mounting positions and operating responsibilities.
- Event records should connect timestamps, sensor sources, tracks, images, operator notes and review status according to the operator's retention policy.

## Claims not allowed without new evidence

- Guaranteed detection or identification range for an unspecified site.
- Claims of universal target recognition, zero false alerts or complete coverage.
- Customer performance results, deployment outcomes or acceptance statistics.
- Active response methods, restricted equipment details or instructions that increase operational harm.

## Compliance boundary

All articles based on this file are B-layer `neutral_seo` informational content. They may support SEO, GEO, Article Schema and `llms.txt`, but they are not advertising landing pages. Restricted C-layer response methods stay out of public text, metadata, images, links and structured data.
