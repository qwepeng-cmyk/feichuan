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
  linkLabel?: string;
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
  ctaLabel: string;
};

const authorizedResponse =
  'The platform escalates the confirmed event, notifies the responsible team, supports the operator\'s approved site procedure, and preserves the decision and outcome for review.';

export const droneDetectorLanding: IntentLandingConfig = {
  handle: 'drone-detector',
  eyebrow: 'DRONE DETECTOR',
  h1: 'Drone Detector for Critical Sites',
  purpose:
    'Plan a site-specific detection workflow using RF sensing, low-altitude radar, Remote ID and EO/IR confirmation—then connect verified alerts to an authorized response process.',
  heroImage: '/solutions/low-altitude-airspace-monitoring/ntet-radar-back-side-facing-viewer-front-to-drone.webp',
  heroImageAlt: 'N-TET low-altitude radar supporting a multi-sensor drone detection configuration',
  heroFacts: ['Multi-sensor evidence', 'Site-specific configuration', 'Authorized response workflow'],
  applicationHeading: 'Where does a drone detector fit?',
  answerBlock:
    'A drone detector is not necessarily one universal sensor. Buyers comparing an anti drone radar detector should treat radar as one evidence layer within the wider detection workflow. A practical site configuration assigns different jobs to RF sensing, radar, Remote ID and EO/IR. RF equipment can observe relevant radio activity and, where supported, add identity or direction information. Radar can maintain movement tracks, including targets that are not transmitting a recognizable control signal. Remote ID can help operators review compatible broadcast identity data. EO/IR provides visual evidence when line of sight, weather and target presentation allow it. The useful output is a shared event: time, source, position or track, available identity, image and operator status. After confirmation, the command workflow escalates the event to the responsible team and the operator follows the site\'s approved procedure. Coverage and identification performance remain dependent on target characteristics, terrain, buildings, RF conditions, mounting and local operating rules.',
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
  workflowIntro: 'Each stage adds evidence, assigns responsibility and prepares the confirmed event for the site\'s approved response procedure.',
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
    'Drone detection radar is used when an operator needs movement, range, bearing and track information that does not depend on a recognizable drone radio link or a cooperative identity broadcast. It can support early warning across planned sectors and cue other sensors for confirmation. Radar is still site-dependent: target radar cross-section, altitude, route, terrain, buildings, vegetation, weather, clutter, scan geometry, mounting height and close-in blind zones all affect usable coverage. The Ku-band and X-band options differ in range conditions, blind zones, elevation coverage and target capacity, so selection should follow a site drawing and coverage review rather than a band name alone. In an operating workflow, the radar track is correlated with RF or Remote ID evidence where available, handed to EO/IR for visual review, then escalated to the responsible team for an authorized site response and documented outcome.',
  applications: [
    { title: 'Wide perimeter early warning', summary: 'Maintain tracks across planned approach sectors before a target reaches the core area.' },
    { title: 'Quiet-target movement', summary: 'Add movement evidence when a recognizable RF or Remote ID source is unavailable.' },
    { title: 'EO/IR cueing', summary: 'Pass track position to visual systems for operator confirmation where line of sight permits.' },
    { title: 'Multi-site command view', summary: 'Send standardized track data to a shared platform for status and handoff.' },
  ],
  productsHeading: 'Two radar configuration options',
  productsIntro: 'Compare the stated specifications as a starting point; final coverage remains a site-engineering question.',
  products: [
    {
      name: 'Low-Altitude Early-Warning Radar (Ku-Band)',
      summary: 'A DBF radar for 360° low-altitude search, track generation and multi-sensor platform integration.',
      image: '/products/02-drone-detection/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude early-warning radar',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['15.9–16.2 GHz', 'Reference range ≥5 km at RCS 0.01 m²', '≥500 simultaneous tracks'],
    },
    {
      name: 'Low-Altitude Early-Warning Radar (X-Band)',
      summary: 'A 3D pulse-Doppler radar for 360° search, target tracking, alert review and event records.',
      image: '/products/02-drone-detection/low-altitude-detection-radar-x-band.webp',
      imageAlt: 'X-band 3D pulse-Doppler drone detection radar',
      href: '/products/low-altitude-3d-pulse-doppler-radar',
      facts: ['9–10.2 GHz', 'Reference range ≥10 km for Phantom 4 under stated conditions', '≥200 simultaneous tracks'],
    },
  ],
  comparisonHeading: 'Ku-band vs. X-band configuration',
  comparisonIntro: 'These values describe product test conditions, not guaranteed site coverage.',
  comparisonColumns: ['Ku-band radar', 'X-band radar'],
  comparisonRows: [
    { label: 'Reference range', values: ['≥5 km at RCS 0.01 m²', '≥10 km Phantom 4; ≥7 km egret at stated false-alarm condition'] },
    { label: 'Close-in blind zone', values: ['≤150 m', '≤200 m'] },
    { label: 'Coverage', values: ['360° azimuth; ≥60° pitch', '360° azimuth; 0–30° pitch'] },
    { label: 'Track capacity', values: ['≥500 tracks', '≥200 tracks'] },
    { label: 'Data / interface', values: ['2-second data rate', 'UDP over Gigabit Ethernet'] },
  ],
  workflowHeading: 'Radar detection to authorized response',
  workflowIntro: 'A usable radar track moves through evidence correlation, operator confirmation and a defined handoff to the responsible site team.',
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
    { question: 'How should Ku-band and X-band options be compared?', answer: 'Compare the stated range condition, blind zone, elevation coverage, target capacity, interface, mounting and the sectors that matter at the site—not the band label alone.' },
    { question: 'Why combine radar with RF and EO/IR?', answer: 'Radar contributes movement and track data; RF can add signal or identity clues; EO/IR can add visual confirmation. Correlation gives the operator a more reviewable event.' },
    { question: 'What happens after confirmation?', answer: 'The platform escalates the event to the responsible team, supports the site\'s approved procedure and records the decision and outcome.' },
  ],
  ctaLabel: 'Request Radar Review',
};

export const portableDetectionLanding: IntentLandingConfig = {
  handle: 'portable-drone-detection',
  eyebrow: 'PORTABLE & MOBILE C-UAS',
  h1: 'Portable C-UAS Systems for Handheld, Integrated & Vehicle-Mounted Deployment',
  purpose:
    'Compare handheld detectors, hand-carried identification systems, integrated field kits and vehicle-mounted C-UAS configurations for temporary, patrol and mobile operations.',
  heroImage: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
  heroImageAlt: 'Portable and vehicle-mounted C-UAS equipment for mobile field deployment',
  heroFacts: ['Handheld and hand-carried', 'Integrated field kits', 'Vehicle-mounted configurations'],
  applicationHeading: 'Which portable or mobile C-UAS format fits the task?',
  answerBlock:
    'Portable C-UAS is a deployment category, not a promise that every system has the same capability. A patrol may need only a handheld RF alert device. A temporary post may need a hand-carried identification system with a larger display. Another buyer may need an integrated field kit that combines detection, identification, tracking cues, event records and coordination with an approved response procedure. Vehicle-mounted configurations support teams that reposition between sectors, but they add power, mounting, vibration, network, startup-check and changing-horizon requirements. Selection should begin with the operator, movement pattern, readiness time, operating duration, evidence needed and local authorization—not only detection range. RF performance still depends on target radio activity, frequency coverage, local noise, antenna position and obstructions. Where radar, EO/IR or platform links are added, their coverage and interfaces must be reviewed separately. Any authorized response function requires a jurisdiction-specific compliance review.',
  applications: [
    { title: 'Individual patrol', summary: 'Issue a lightweight handheld detector when one operator needs local alerts while moving.' },
    { title: 'Temporary field post', summary: 'Use a hand-carried identification system with a larger display and repeatable setup procedure.' },
    { title: 'Integrated rapid deployment', summary: 'Combine detection, identification, tracking cues, records and command handoff in one field kit.' },
    { title: 'Vehicle-mounted patrol', summary: 'Move a configured sensor and platform package between planned operating sectors.' },
  ],
  productsHeading: 'Four portable and mobile deployment formats',
  productsIntro: 'Choose by operator role, readiness time, transport, power, sensor scope, evidence needs and response authorization.',
  products: [
    {
      name: 'PL280H Handheld RF Detection System',
      summary: 'A lightweight passive RF monitor with replaceable battery and vibration, audible and visual alerts for individual patrol users.',
      image: '/products/02-drone-detection/handheld-rf-detection-system-pl280h.webp',
      imageAlt: 'PL280H handheld RF drone detection system',
      href: '/products/handheld-rf-detection-system-mini',
      facts: ['300 MHz-6.2 GHz custom scanning', 'Up to 6 hours rated endurance', 'IP65 handheld enclosure'],
    },
    {
      name: 'Portable RF Identification System',
      summary: 'A 16 kg hand-carried system with integrated display for temporary monitoring, spectrum review and command-post use.',
      image: '/products/02-drone-detection/portable-rf-detection-case.webp',
      imageAlt: 'Hand-carried portable RF drone identification system',
      href: '/products/portable-rf-detection-case',
      facts: ['300 MHz-6 GHz', '5 hours rated endurance', '13.3-inch display and IP65'],
    },
    {
      name: 'Integrated C-UAS Field Kit (Pro)',
      summary: 'An 8 kg rapid-deployment kit for RF awareness, target identification, tracking cues, alert linkage, event records and platform coordination.',
      image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
      imageAlt: 'Portable integrated C-UAS field kit for rapid deployment',
      href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
      facts: ['Up to 3 km line-of-sight reference', '8 kg field kit', 'Tracking cues and event records'],
    },
    {
      name: 'Vehicle-Mounted C-UAS Configuration',
      summary: 'A project-configured mobile package for planned patrol routes, temporary operating positions and rapid repositioning.',
      image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
      imageAlt: 'Vehicle-mounted C-UAS configuration for mobile patrol',
      href: '/products#vehicle-mounted-cuas',
      facts: ['Mobile patrol and rapid repositioning', 'Project-specific power, network and mounting', 'Configurable sensor and platform interfaces'],
    },
  ],
  comparisonHeading: 'Handheld, hand-carried, integrated or vehicle-mounted?',
  comparisonIntro: 'Compare the operating model first. Product range values remain conditional on the stated target, environment and configuration.',
  comparisonColumns: ['Handheld detector', 'Hand-carried RF system', 'Integrated field kit', 'Vehicle-mounted configuration'],
  comparisonRows: [
    { label: 'Best fit', values: ['Individual patrol', 'Temporary field post', 'Rapid-deployment team', 'Mobile multi-sector patrol'] },
    { label: 'Primary scope', values: ['Local RF alerting', 'RF identification and review', 'Integrated evidence and command handoff', 'Configured mobile sensor package'] },
    { label: 'Mobility format', values: ['350 g class handheld', '16 kg hand-carried case', '8 kg field kit', 'Installed on project vehicle'] },
    { label: 'Power / endurance', values: ['Up to 6 hours; replaceable battery', '5 hours rated endurance', 'Confirm field power configuration', 'Vehicle power plus project backup plan'] },
    { label: 'Operator interface', values: ['Local screen, sound and vibration', '13.3-inch integrated display', 'Field kit and command-platform linkage', 'Onboard or remote command workflow'] },
  ],
  workflowHeading: 'Mobile detection to authorized response',
  workflowIntro: 'The selected deployment format changes the equipment, but every project still needs a defined evidence and responsibility chain.',
  workflow: [
    { title: 'Detection', summary: 'The handheld, field-kit or vehicle-mounted sensor layer creates an observation with available time, source, position or track data.' },
    { title: 'Identification', summary: 'The operator reviews supported RF, identity, map and permitted-flight information without treating uncertain evidence as confirmed.' },
    { title: 'Confirmation', summary: 'The field team adds location and visual context while the command workflow correlates other sensors or site information where available.' },
    { title: 'Authorized Response', summary: authorizedResponse },
  ],
  scenariosHeading: 'Two mobile C-UAS solution scenarios',
  scenariosIntro: 'Rapid-deployment kits and vehicle-mounted systems solve different movement, readiness, power and command requirements.',
  scenarios: [
    {
      title: 'Integrated Rapid-Deployment Post',
      summary: 'A field team carries one integrated kit to a temporary operating position and connects observations, identification clues and event records to the responsible command workflow.',
      image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
      imageAlt: 'Integrated portable C-UAS field kit at a temporary operating post',
      href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
      linkLabel: 'View integrated field kit',
      points: ['Repeatable setup and startup check', 'Integrated evidence and event records', 'Defined command and response authority'],
    },
    {
      title: 'Vehicle-Mounted Mobile Patrol',
      summary: 'A configured vehicle moves between planned sectors while the crew repeats positioning, power, network and sensor-validity checks at each operating point.',
      image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-cuas.webp',
      imageAlt: 'Vehicle-mounted C-UAS system for mobile multi-sector patrol',
      href: '/products#vehicle-mounted-cuas',
      linkLabel: 'View vehicle-mounted options',
      points: ['Planned operating positions and routes', 'Vehicle power, mounting and vibration review', 'Onboard or remote command handoff'],
    },
  ],
  faqHeading: 'Portable and vehicle-mounted C-UAS FAQ',
  faqs: [
    { question: 'Does portable C-UAS mean handheld only?', answer: 'No. Portable may describe an individual handheld detector, a hand-carried identification system or an integrated field kit. Vehicle-mounted equipment is a separate mobile format with its own power, mounting and operating-position requirements.' },
    { question: 'Can a portable system support an integrated detection-and-response requirement?', answer: 'Yes, where the buyer has the required legal authority. The project scope should identify the approved response function, responsible operator, safety conditions, interfaces and validation procedure before equipment selection.' },
    { question: 'When is a vehicle-mounted configuration appropriate?', answer: 'Choose vehicle-mounted equipment when a trained team must patrol several planned sectors or reposition quickly. The review should include vehicle power, payload, mounting, vibration, network options, safe operating positions and startup checks.' },
    { question: 'Are the stated RF ranges guaranteed?', answer: 'No. Target radio activity, antenna position, obstructions, local RF noise, configuration and test conditions affect usable range. Confirm the current datasheet and validate the planned operating environment.' },
    { question: 'Can portable and vehicle-mounted equipment use the same command platform?', answer: 'They can be designed around a shared platform when interfaces, network availability, user roles, map positions, event records and offline procedures are confirmed during project review.' },
  ],
  ctaLabel: 'Request Portable / Mobile Review',
};
