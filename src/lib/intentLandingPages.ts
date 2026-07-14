export type IntentProduct = {
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  facts: string[];
};

export type IntentComparisonRow = {
  label: string;
  values: string[];
};

export type IntentWorkflowStep = {
  title: string;
  summary: string;
};

export type IntentSolutionScenario = {
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  points: string[];
};

export type IntentFaq = {
  question: string;
  answer: string;
};

export type IntentLandingConfig = {
  handle: string;
  eyebrow: string;
  h1: string;
  purpose: string;
  heroImage: string;
  heroImageAlt: string;
  heroFacts: string[];
  applicationHeading: string;
  answerBlock: string;
  applications: Array<{ title: string; summary: string }>;
  productsHeading: string;
  productsIntro: string;
  products: IntentProduct[];
  comparisonHeading: string;
  comparisonIntro: string;
  comparisonColumns: string[];
  comparisonRows: IntentComparisonRow[];
  workflowHeading: string;
  workflowIntro: string;
  workflow: IntentWorkflowStep[];
  scenariosHeading: string;
  scenariosIntro: string;
  scenarios: [IntentSolutionScenario, IntentSolutionScenario];
  faqHeading: string;
  faqs: IntentFaq[];
  inquiryHeading: string;
  inquiryIntro: string;
  ctaLabel: string;
};

const authorizedResponse =
  'The platform escalates the confirmed event, notifies the responsible team, supports the operator\'s approved site procedure, and preserves the decision and outcome for review.';

export const droneDetectorLanding: IntentLandingConfig = {
  handle: 'low-altitude-airspace-monitoring',
  eyebrow: 'DRONE DETECTOR SYSTEMS',
  h1: 'Drone Detector Systems for Critical Sites',
  purpose:
    'Plan a site-specific detection workflow using RF sensing, low-altitude radar, Remote ID and EO/IR confirmation—then connect verified alerts to an authorized response process.',
  heroImage: '/solutions/low-altitude-airspace-monitoring/ntet-radar-back-side-facing-viewer-front-to-drone.webp',
  heroImageAlt: 'N-TET low-altitude radar supporting a multi-sensor drone detector system',
  heroFacts: ['Multi-sensor evidence', 'Site-specific configuration', 'Authorized response workflow'],
  applicationHeading: 'Where does a drone detector system fit?',
  answerBlock:
    'A drone detector system is not one universal sensor. A practical site configuration assigns different jobs to RF sensing, radar, Remote ID and EO/IR. RF equipment can observe relevant radio activity and, where supported, add identity or direction information. Radar can maintain movement tracks, including targets that are not transmitting a recognizable control signal. Remote ID can help operators review compatible broadcast identity data. EO/IR provides visual evidence when line of sight, weather and target presentation allow it. The useful output is a shared event: time, source, position or track, available identity, image and operator status. After confirmation, the command workflow escalates the event to the responsible team and the operator follows the site\'s approved procedure. Coverage and identification performance remain dependent on target characteristics, terrain, buildings, RF conditions, mounting and local operating rules.',
  applications: [
    { title: 'Airports & transport hubs', summary: 'Review approach sectors, boundary zones, permitted activity and command-room handoff.' },
    { title: 'Energy & industrial sites', summary: 'Combine perimeter awareness with operator review around production and logistics areas.' },
    { title: 'Venues & temporary events', summary: 'Support time-bound deployment, patrol coordination and a traceable alert workflow.' },
    { title: 'Managed low-altitude areas', summary: 'Correlate cooperative identity, RF, radar and visual evidence in one operating picture.' },
  ],
  productsHeading: 'Reusable detection layers',
  productsIntro: 'Select layers by the evidence the operator needs; do not treat every detector as interchangeable.',
  products: [
    {
      name: 'Stationary RF Identification System',
      summary: 'A fixed-site passive RF layer for signal awareness, identification support, direction finding and event handoff.',
      image: '/products/02-drone-detection/stationary-rf-detection-system.webp',
      imageAlt: 'Stationary RF identification system for drone detection',
      href: '/products/stationary-rf-detection-system',
      facts: ['300 MHz–6 GHz', '360° horizontal coverage', 'IP66 fixed-site enclosure'],
    },
    {
      name: 'Low-Altitude Radar',
      summary: 'A movement-tracking layer for early warning, range and bearing, trajectory review and multi-sensor correlation.',
      image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude drone detection radar',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['Ku-band configuration', '360° azimuth', 'Track data for platform handoff'],
    },
    {
      name: 'UAV Remote ID Recognition System',
      summary: 'A cooperative identity layer for compatible Remote ID broadcasts and permitted-flight review.',
      image: '/products/uav-systems/UAV-Remote-ID-Monitoring-System.webp',
      imageAlt: 'Remote ID recognition system for cooperative drone identification',
      href: '/products/uav-remote-id-monitoring-system',
      facts: ['Remote ID and optional ADS-B modes', '2–3 second scan refresh', 'Multi-target monitoring'],
    },
    {
      name: 'Electro-Optical Tracking System',
      summary: 'Visible-light and thermal imaging for operator confirmation, target tracking and video evidence.',
      image: '/products/02-drone-detection/electro-optical-tracking-system.webp',
      imageAlt: 'Electro-optical and thermal tracking system for drone confirmation',
      href: '/products/composite-electro-optical-tracking-system',
      facts: ['Visible and thermal channels', 'Precision pan-tilt control', 'Radar-linkage support'],
    },
  ],
  comparisonHeading: 'Which detection layer answers which question?',
  comparisonIntro: 'The strongest configuration is the one that closes evidence gaps without hiding each sensor\'s limits.',
  comparisonColumns: ['RF sensing', 'Radar', 'Remote ID', 'EO / IR'],
  comparisonRows: [
    { label: 'Primary evidence', values: ['Radio activity and supported identity clues', 'Movement, range, bearing and track', 'Compatible broadcast identity and flight data', 'Visual and thermal imagery'] },
    { label: 'Best use', values: ['Early RF awareness and direction review', 'Track continuity and non-cooperative movement', 'Permitted-flight and identity review', 'Operator confirmation and video evidence'] },
    { label: 'Important limit', values: ['Quiet targets, unfamiliar waveforms and RF noise', 'Terrain, clutter, mounting and target characteristics', 'Requires a compatible broadcast that can be received', 'Line of sight, weather, lighting and target presentation'] },
    { label: 'Typical deployment', values: ['Fixed or portable', 'Fixed site or vehicle-supported', 'Fixed or networked receiver', 'Fixed site with platform cueing'] },
  ],
  workflowHeading: 'From detection to authorized response',
  workflowIntro: 'The workflow follows the sales reference\'s sensing–judgement–disposition logic while keeping public response language site-authorized and non-operational.',
  workflow: [
    { title: 'Detection', summary: 'RF, radar and Remote ID sources raise an observation with source, time and available position data.' },
    { title: 'Identification', summary: 'The platform compares signal, movement, identity and permitted-flight information without forcing uncertain evidence into a confident label.' },
    { title: 'Confirmation', summary: 'EO/IR cueing and operator review add visual context, status and notes before escalation.' },
    { title: 'Authorized Response', summary: authorizedResponse },
  ],
  scenariosHeading: 'Two solution scenarios',
  scenariosIntro: 'Use the same four-stage workflow, but change sensor placement, staffing and handoff rules by site.',
  scenarios: [
    {
      title: 'Airport Airspace Monitoring',
      summary: 'A fixed multi-sensor layout for approach sectors, boundary zones and operational areas, with permitted-flight review and command-room coordination.',
      image: '/cases/airport-security-application/main-home.webp',
      imageAlt: 'Airport airspace monitoring solution scenario',
      href: '/cases/airport-security-application',
      points: ['RF, radar, Remote ID and EO evidence', 'Operator confirmation before escalation', 'Traceable event status and handoff'],
    },
    {
      title: 'Energy & Industrial Perimeter',
      summary: 'A continuous monitoring layout for production areas, logistics routes and key perimeter sectors, connected to established site procedures.',
      image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
      imageAlt: 'Industrial refinery low-altitude monitoring scenario',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['Sector-based coverage planning', 'Alert review around normal site activity', 'Responsible-team notification and records'],
    },
  ],
  faqHeading: 'Drone detector planning FAQ',
  faqs: [
    { question: 'Is a drone detector one device?', answer: 'Not usually. RF, radar, Remote ID and EO/IR answer different questions, so the site configuration should be based on the evidence and coverage the operator needs.' },
    { question: 'Can one sensor guarantee complete coverage?', answer: 'No. Terrain, buildings, weather, RF conditions, target characteristics and mounting create different blind zones and confidence limits.' },
    { question: 'Does the workflow stop after an alert is recorded?', answer: 'No. After identification and confirmation, the platform escalates the event, notifies the responsible team and supports the operator\'s approved site procedure. The record preserves what was decided and what happened.' },
    { question: 'What information is needed for a site proposal?', answer: 'Provide the protected area, approach directions, operating hours, permitted flights, power and network constraints, mounting options, operator roles and required handoff procedure.' },
  ],
  inquiryHeading: 'Request a site detection plan',
  inquiryIntro: 'Share a site map, protected sectors, operating hours and the evidence your team needs. N-TET can return a reviewable sensor layout, equipment list and quotation scope.',
  ctaLabel: 'Request Site Plan',
};

export const radarDetectionLanding: IntentLandingConfig = {
  handle: 'drone-radar-detection',
  eyebrow: 'DRONE DETECTION RADAR',
  h1: 'Drone Detection Radar for Low-Altitude Site Monitoring',
  purpose:
    'Compare Ku-band and X-band radar options for early warning, target tracking and handoff to RF and EO/IR confirmation around critical sites.',
  heroImage: '/products/02-drone-detection/low-altitude-detection-radar.webp',
  heroImageAlt: 'Ku-band drone detection radar for low-altitude monitoring',
  heroFacts: ['Ku-band and X-band options', 'Range, bearing and track data', 'RF and EO/IR handoff'],
  applicationHeading: 'When is radar the right detection layer?',
  answerBlock:
    'Drone detection radar is used when an operator needs movement, range, bearing and track information that does not depend on a recognizable drone radio link or a cooperative identity broadcast. It can support early warning across planned sectors and cue other sensors for confirmation. Radar is still site-dependent: target radar cross-section, altitude, route, terrain, buildings, vegetation, weather, clutter, scan geometry, mounting height and close-in blind zones all affect usable coverage. N-TET\'s published Ku-band and X-band products provide different range, blind-zone, elevation-coverage and target-capacity specifications, so selection should follow a site drawing and coverage review rather than a band name alone. In an operating workflow, the radar track is correlated with RF or Remote ID evidence where available, handed to EO/IR for visual review, then escalated to the responsible team for an authorized site response and documented outcome.',
  applications: [
    { title: 'Wide perimeter early warning', summary: 'Maintain tracks across planned approach sectors before a target reaches the core area.' },
    { title: 'Quiet-target movement', summary: 'Add movement evidence when a recognizable RF or Remote ID source is unavailable.' },
    { title: 'EO/IR cueing', summary: 'Pass track position to visual systems for operator confirmation where line of sight permits.' },
    { title: 'Multi-site command view', summary: 'Send standardized track data to a shared platform for status and handoff.' },
  ],
  productsHeading: 'Two published radar options',
  productsIntro: 'Use the public specifications as a starting point; final coverage remains a site-engineering question.',
  products: [
    {
      name: 'Low-Altitude Early-Warning Radar (Ku-Band)',
      summary: 'A DBF radar for 360° low-altitude search, track generation and multi-sensor platform integration.',
      image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude early-warning radar',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['15.9–16.2 GHz', 'Published ≥5 km at RCS 0.01 m²', '≥500 simultaneous tracks'],
    },
    {
      name: 'Low-Altitude Early-Warning Radar (X-Band)',
      summary: 'A 3D pulse-Doppler radar for 360° search, target tracking, alert review and event records.',
      image: '/products/02-drone-detection/low-altitude-detection-radar-x-band.webp',
      imageAlt: 'X-band 3D pulse-Doppler drone detection radar',
      href: '/products/low-altitude-3d-pulse-doppler-radar',
      facts: ['9–10.2 GHz', 'Published ≥10 km for Phantom 4 under stated conditions', '≥200 simultaneous tracks'],
    },
  ],
  comparisonHeading: 'Ku-band vs. X-band published configuration',
  comparisonIntro: 'These values describe product test conditions, not guaranteed site coverage.',
  comparisonColumns: ['Ku-band radar', 'X-band radar'],
  comparisonRows: [
    { label: 'Published reference range', values: ['≥5 km at RCS 0.01 m²', '≥10 km Phantom 4; ≥7 km egret at stated false-alarm condition'] },
    { label: 'Close-in blind zone', values: ['≤150 m', '≤200 m'] },
    { label: 'Coverage', values: ['360° azimuth; ≥60° pitch', '360° azimuth; 0–30° pitch'] },
    { label: 'Track capacity', values: ['≥500 tracks', '≥200 tracks'] },
    { label: 'Data / interface', values: ['2-second data rate', 'UDP over Gigabit Ethernet'] },
  ],
  workflowHeading: 'Radar detection to authorized response',
  workflowIntro: 'A radar page must show what happens after a track appears—not only the sensor specification.',
  workflow: [
    { title: 'Detection', summary: 'Radar searches the planned sector and creates a track with time, range, bearing, altitude or speed fields supported by the configuration.' },
    { title: 'Identification', summary: 'The platform compares the track with RF, Remote ID, permitted-flight and map context.' },
    { title: 'Confirmation', summary: 'EO/IR cueing and operator review add visual evidence and a review status.' },
    { title: 'Authorized Response', summary: authorizedResponse },
  ],
  scenariosHeading: 'Two radar solution scenarios',
  scenariosIntro: 'Radar placement and confirmation workflow change with the site geometry and operating team.',
  scenarios: [
    {
      title: 'Airport Approach & Boundary Sectors',
      summary: 'Radar tracks support early warning around approach routes and boundary zones, then cue RF and EO review before command-room escalation.',
      image: '/cases/airport-security-application/main-home.webp',
      imageAlt: 'Airport radar detection solution scenario',
      href: '/cases/airport-security-application',
      points: ['Sector and blind-zone review', 'Permitted-flight comparison', 'EO/IR handoff and operator status'],
    },
    {
      title: 'Major Venue Temporary Coverage',
      summary: 'A temporary radar and RF layout supports event-area awareness, mobile team coordination and a defined escalation path.',
      image: '/cases/asian-games-security/case_stadium.webp',
      imageAlt: 'Major sports venue drone radar monitoring scenario',
      href: '/cases/asian-games-security',
      points: ['Time-bound deployment plan', 'Radar and RF evidence correlation', 'Command and field-team coordination'],
    },
  ],
  faqHeading: 'Drone radar selection FAQ',
  faqs: [
    { question: 'Can radar detect every drone?', answer: 'No. Detectability depends on target characteristics, route, altitude, terrain, clutter, weather, scan geometry and mounting. Coverage should be reviewed against the real site.' },
    { question: 'How should Ku-band and X-band options be compared?', answer: 'Compare the published range condition, blind zone, elevation coverage, target capacity, interface, mounting and the sectors that matter at the site—not the band label alone.' },
    { question: 'Why combine radar with RF and EO/IR?', answer: 'Radar contributes movement and track data; RF can add signal or identity clues; EO/IR can add visual confirmation. Correlation gives the operator a more reviewable event.' },
    { question: 'What happens after confirmation?', answer: 'The platform escalates the event to the responsible team, supports the site\'s approved procedure and records the decision and outcome.' },
  ],
  inquiryHeading: 'Request a radar coverage review',
  inquiryIntro: 'Send the site boundary, priority sectors, expected target types, mounting options and required interfaces. N-TET can prepare a preliminary radar and confirmation layout.',
  ctaLabel: 'Request Radar Review',
};

export const portableDetectionLanding: IntentLandingConfig = {
  handle: 'portable-drone-detection',
  eyebrow: 'PORTABLE DRONE DETECTION',
  h1: 'Portable & Handheld Drone Detection for Field Teams',
  purpose:
    'Compare hand-carried and handheld passive RF options for patrols, temporary events, site surveys and rapidly changing operating areas.',
  heroImage: '/products/02-drone-detection/portable-rf-detection-case.webp',
  heroImageAlt: 'Portable RF drone detection system for field deployment',
  heroFacts: ['Passive RF monitoring', 'Hand-carried and handheld options', 'Patrol-to-command handoff'],
  applicationHeading: 'What should a portable detector support?',
  answerBlock:
    'A portable drone detector should fit the team\'s movement, setup, endurance and evidence requirements—not only a maximum range claim. A hand-carried system can provide a larger display, broader review workflow and interfaces for temporary command posts. A lightweight handheld unit is easier to issue to patrol staff and can provide vibration, audible or visual alerts during field movement. Both published N-TET options use passive RF monitoring, so performance depends on the target\'s radio activity, frequency coverage, local RF noise, antenna position, obstructions and operator procedure. Portable equipment should also define what happens after an alert: the field user confirms the time and location, communicates the event to the responsible operator, adds visual or platform context where available, and follows the site\'s approved response process. Battery plans, charging, weather protection, training and record transfer belong in the deployment plan.',
  applications: [
    { title: 'Patrol teams', summary: 'Issue lightweight alerting equipment to staff moving across changing sectors.' },
    { title: 'Temporary events', summary: 'Deploy a hand-carried review station without building a permanent sensor site.' },
    { title: 'Site surveys', summary: 'Observe RF conditions and operating patterns before a fixed layout is finalized.' },
    { title: 'Mobile industrial coverage', summary: 'Move between production, logistics and perimeter areas as the task changes.' },
  ],
  productsHeading: 'Hand-carried or handheld?',
  productsIntro: 'Choose by operator role, display needs, endurance, protection and the handoff expected after an alert.',
  products: [
    {
      name: 'Portable RF Identification System',
      summary: 'A 16 kg hand-carried system with integrated display for temporary monitoring, spectrum review and command-post use.',
      image: '/products/02-drone-detection/portable-rf-detection-case.webp',
      imageAlt: 'Hand-carried portable RF drone identification system',
      href: '/products/portable-rf-detection-case',
      facts: ['300 MHz–6 GHz', '5-hour published endurance', '13.3-inch display and IP65'],
    },
    {
      name: 'PL280H Handheld RF Detection System',
      summary: 'A ≤350 g handheld monitor with replaceable battery and vibration, audible and visual alerts for field patrols.',
      image: '/products/02-drone-detection/handheld-rf-detection-system-pl280h.webp',
      imageAlt: 'PL280H handheld RF drone detection system',
      href: '/products/handheld-rf-detection-system-mini',
      facts: ['300 MHz–6.2 GHz custom scanning', 'Published endurance up to 6 hours', 'IP65 handheld enclosure'],
    },
  ],
  comparisonHeading: 'Portable detector selection table',
  comparisonIntro: 'Published range values require target, environment and configuration review before use in a site plan.',
  comparisonColumns: ['Hand-carried RF system', 'PL280H handheld'],
  comparisonRows: [
    { label: 'Operator format', values: ['Temporary station or mobile team', 'Individual patrol user'] },
    { label: 'Frequency coverage', values: ['300 MHz–6 GHz', '300 MHz–6.2 GHz custom scanning'] },
    { label: 'Published range note', values: ['DB summary lists 5 km; verify current configuration and site conditions', '1–2 km in open, unobstructed environments'] },
    { label: 'Endurance', values: ['5 hours', 'Up to 6 hours; replaceable battery'] },
    { label: 'Weight / interface', values: ['16 kg; 13.3-inch display', '≤350 g; 1.77-inch screen and local alerts'] },
  ],
  workflowHeading: 'Field alert to authorized response',
  workflowIntro: 'Portable equipment is useful only when the patrol and command handoff is defined.',
  workflow: [
    { title: 'Detection', summary: 'The portable or handheld receiver raises an RF observation with time, band and local alert information.' },
    { title: 'Identification', summary: 'The user reviews supported signal or protocol clues and checks whether the activity matches permitted operations.' },
    { title: 'Confirmation', summary: 'The field team reports location and visible context; a command operator correlates other sensors or site information where available.' },
    { title: 'Authorized Response', summary: authorizedResponse },
  ],
  scenariosHeading: 'Two portable solution scenarios',
  scenariosIntro: 'The equipment may be the same, but staffing, transport and handoff differ between an event and an industrial patrol.',
  scenarios: [
    {
      title: 'Major Event Temporary Deployment',
      summary: 'Hand-carried monitoring supports a temporary post while handheld units extend awareness to patrol teams and changing activity areas.',
      image: '/cases/asian-games-security/main-home.webp',
      imageAlt: 'Portable drone detection for a major sports event',
      href: '/cases/asian-games-security',
      points: ['Temporary post plus patrol coverage', 'Shift, charging and handover plan', 'Escalation to the event command team'],
    },
    {
      title: 'Mobile Industrial-Site Patrol',
      summary: 'Portable RF equipment can move between production, logistics and perimeter areas while alerts are reviewed in a shared site workflow.',
      image: '/cases/nigeria-factory-airspace-monitoring/main.webp',
      imageAlt: 'Mobile industrial-site portable drone detection scenario',
      href: '/cases/nigeria-factory-low-altitude-monitoring',
      points: ['Changing sectors and patrol routes', 'RF environment and obstruction review', 'Command handoff and event status'],
    },
  ],
  faqHeading: 'Portable drone detector FAQ',
  faqs: [
    { question: 'What is the difference between portable and handheld?', answer: 'The hand-carried system offers a larger display and temporary-station workflow. The PL280H is lighter and better suited to individual patrol alerting.' },
    { question: 'Are the published ranges guaranteed?', answer: 'No. RF activity, target type, antenna position, obstructions, local RF noise and configuration affect usable range. Confirm the current datasheet and test conditions.' },
    { question: 'Do these detectors transmit RF energy?', answer: 'The published product positioning describes passive RF monitoring. Site teams should still review electromagnetic compatibility, operating permissions and local procedures.' },
    { question: 'What should happen after a field alert?', answer: 'The user reports the time, location and available evidence; the responsible operator checks site context, confirms the event and coordinates the approved response procedure.' },
  ],
  inquiryHeading: 'Compare portable detector options',
  inquiryIntro: 'Tell us the patrol role, area size, operating hours, transport limit, preferred alert method and command handoff. N-TET can recommend a hand-carried, handheld or mixed field configuration.',
  ctaLabel: 'Request Portable Comparison',
};

