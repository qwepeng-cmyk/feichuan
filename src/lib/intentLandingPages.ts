import type { Locale } from '@/i18n/config';

export interface IntentSolutionProduct {
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  facts: string[];
}

export interface IntentSolutionComparisonRow {
  label: string;
  values: string[];
}

export interface IntentSolutionWorkflowStep {
  title: string;
  summary: string;
}

export interface IntentSolutionScenario {
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel?: string;
  points: string[];
}

export interface IntentSolutionFaq {
  question: string;
  answer: string;
}

export interface IntentLandingConfig {
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
  products: IntentSolutionProduct[];
  comparisonHeading: string;
  comparisonIntro: string;
  comparisonColumns: string[];
  comparisonRows: IntentSolutionComparisonRow[];
  workflowHeading: string;
  workflowIntro: string;
  workflow: IntentSolutionWorkflowStep[];
  scenariosHeading: string;
  scenariosIntro: string;
  scenarios: IntentSolutionScenario[];
  faqHeading: string;
  faqs: IntentSolutionFaq[];
  ctaLabel: string;
}

const commandResponse =
  'The command platform correlates the confirmed track, displays sensor and device status, coordinates the configured response sequence, and records alarms, commands and outcomes.';

export const multiSensorDetectionLanding: IntentLandingConfig = {
  handle: 'multi-sensor-detection',
  eyebrow: 'MULTI-SENSOR TARGET DETECTION',
  h1: 'Target Detector: Multi-Sensor Detection & Identification',
  purpose:
    'Compare passive RF sensing, low-altitude target detection radar, Remote ID receivers and EO/IR tracking systems to build a practical target detector layer.',
  heroImage: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  heroImageAlt: 'Multi-sensor target detector configuration with RF and radar monitoring',
  heroFacts: ['Passive RF sensing & direction finding', 'Target detection radar', 'Remote ID and EO/IR confirmation'],
  applicationHeading: 'What makes a reliable target detector layer?',
  answerBlock:
    'No single sensor provides complete coverage under all conditions. Passive RF sensing identifies radio-control and video-downlink emissions, protocol clues and direction of arrival without active transmission. Target detection radar adds range, bearing, altitude, speed and continuous tracks, making it effective against silent or autonomous targets. Remote ID receivers extract cooperative identity and position broadcasts where supported by the target. EO/IR tracking systems provide visible and thermal imagery to confirm target presence and classification before an operator takes action. Selection depends on line of sight, terrain, buildings, local RF noise, weather, mounting options and required response speed. In an integrated Low-Altitude Defense workflow, observations from these four sensor layers are correlated on the command platform to present a single, reviewable track.',
  applications: [
    { title: 'Airport perimeter awareness', summary: 'Combine passive RF, low-altitude radar and Remote ID monitoring around approach corridors.' },
    { title: 'Energy & industrial facilities', summary: 'Detect and trace target activity around production zones, storage tanks and logistics areas.' },
    { title: 'Key venue & event security', summary: 'Deploy temporary RF and EO/IR monitoring positions with field-team handoff procedures.' },
    { title: 'Government & institutional sites', summary: 'Verify target signals, track history and visual evidence before escalating to response teams.' },
  ],
  productsHeading: 'Four target detector sensor options',
  productsIntro: 'Select the sensor combination that fits the protected area, operating environment and team workflow.',
  products: [
    {
      name: 'Stationary RF Identification System',
      summary: 'A fixed passive RF detector for continuous spectrum monitoring, signal identification and direction-finding support.',
      image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
      imageAlt: 'Stationary RF target identification system for fixed-site installation',
      href: '/products/stationary-rf-detection-system',
      facts: ['300 MHz-6 GHz frequency coverage', '360° horizontal direction finding', 'Ethernet command linkage'],
    },
    {
      name: 'Low-Altitude Early-Warning Radar (Ku-Band)',
      summary: 'A 3D pulse-Doppler radar for wide-area search, continuous target tracking and cueing of optical or countermeasure systems.',
      image: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude target detection radar',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['Reference range ≥5 km at RCS 0.01 m²', '360° search coverage', 'Multi-target track output'],
    },
    {
      name: 'Aerial Platform Remote ID Recognition System',
      summary: 'A cooperative identity layer for compatible Remote ID broadcasts and permitted-flight review.',
      image: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
      imageAlt: 'Remote ID recognition system for cooperative target identification',
      href: '/products/aerial-remote-id-monitoring-system',
      facts: ['Remote ID and optional ADS-B modes', '2–3 second scan refresh', 'Multi-target monitoring'],
    },
    {
      name: 'Composite Electro-Optical Tracking System',
      summary: 'A dual-sensor optical unit combining visible HD and thermal cameras for visual confirmation and track verification.',
      image: '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
      imageAlt: 'Electro-optical and thermal tracking system for target confirmation',
      href: '/products/composite-electro-optical-tracking-system',
      facts: ['Visible and thermal channels', 'Precision pan-tilt control', 'Radar-linkage support'],
    },
  ],
  comparisonHeading: 'Which detection layer answers which question?',
  comparisonIntro: 'The strongest configuration is the one that closes evidence gaps without hiding each sensor\'s limits.',
  comparisonColumns: ['RF sensing', 'Radar', 'Remote ID', 'EO / IR'],
  comparisonRows: [
    { label: 'Primary evidence', values: ['RF emissions and supported protocol or identity clues', 'Movement, range, bearing and track', 'Compatible broadcast identity and flight data', 'Visible-light and thermal imagery'] },
    { label: 'Best use', values: ['Early RF awareness and direction finding', 'Continuous tracking, including targets without compatible RF or Remote ID broadcasts', 'Cooperative identification and cross-checking against permitted-flight records', 'Operator confirmation using visible-light or thermal imagery'] },
    { label: 'Important limit', values: ['Quiet targets, unfamiliar waveforms and RF noise', 'Terrain, clutter, mounting and target characteristics', 'Requires a compatible broadcast that can be received', 'Line of sight, weather, lighting and target presentation'] },
    { label: 'Typical deployment', values: ['Fixed or portable', 'Fixed site or vehicle-supported', 'Fixed or networked receiver', 'Fixed-site deployment with radar or command-platform cueing'] },
  ],
  workflowHeading: 'Detection, identification, tracking and response',
  workflowIntro: 'Each stage adds target information and connects the confirmed track to the command platform and configured response equipment.',
  workflow: [
    { title: 'Detection', summary: 'RF, radar and Remote ID sources raise an observation with source, time and available position data.' },
    { title: 'Identification', summary: 'The platform compares signal, movement, identity and permitted-flight information without forcing uncertain evidence into a confident label.' },
    { title: 'Confirmation', summary: 'EO/IR cueing and operator review add visual context, status and notes before escalation.' },
    { title: 'Command & Response', summary: commandResponse },
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
      href: '/cases/brazil-refinery-airspace-monitoring',
      points: ['Sector-based coverage planning', 'Alert review around normal site activity', 'Responsible-team notification and records'],
    },
  ],
  faqHeading: 'Target detector planning FAQ',
  faqs: [
    { question: 'Is a target detector one device?', answer: 'Not usually. RF, radar, Remote ID and EO/IR answer different questions, so the site configuration should be based on the evidence and coverage the operator needs.' },
    { question: 'Can one sensor guarantee complete coverage?', answer: 'No. Terrain, buildings, weather, RF conditions, target characteristics and mounting create different blind zones and confidence limits.' },
    { question: 'Does the workflow stop after an alert is recorded?', answer: 'No. After identification and confirmation, the platform maintains the target track, displays sensor and device status, coordinates the configured response sequence and preserves the complete event record.' },
    { question: 'What information is needed for a site proposal?', answer: 'Provide the protected area, approach directions, operating hours, permitted flights, power and network constraints, mounting options, operator roles and required handoff procedure.' },
  ],
  ctaLabel: 'Request Site Plan',
};

export const lowAltitudeRadarMonitoringLanding: IntentLandingConfig = {
  handle: 'low-altitude-radar-monitoring',
  eyebrow: 'TARGET DETECTION RADAR',
  h1: 'Target Detection Radar for Low-Altitude Site Monitoring',
  purpose:
    'Compare Ku-band and X-band radar options for early warning, target tracking and handoff to RF and EO/IR confirmation around critical sites.',
  heroImage: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
  heroImageAlt: 'Ku-band target detection radar for low-altitude monitoring',
  heroFacts: ['Ku-band and X-band options', 'Range, bearing and track data', 'RF and EO/IR handoff'],
  applicationHeading: 'When is radar the right detection layer?',
  answerBlock:
    'Target detection radar provides movement, range, bearing, altitude, speed and continuous track data without depending on a recognizable radio-control link or cooperative identity broadcast. It supports wide-area early warning, multi-target tracking and automatic cueing of EO/IR or RF sensors. Target radar cross-section, flight altitude, route, terrain, buildings, vegetation, weather, clutter, scan geometry, mounting height and close-in blind zones all affect usable coverage. Ku-band and X-band options also differ in reference range, elevation coverage, blind zone and track capacity, so selection should follow a site drawing and coverage simulation rather than the band name alone. In an integrated Low-Altitude Defense workflow, radar tracks are correlated with RF or Remote ID data, handed to EO/IR for visual confirmation and displayed on the command platform for coordinated response.',
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
      image: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude early-warning radar',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['15.9–16.2 GHz', 'Reference range ≥5 km at RCS 0.01 m²', '≥500 simultaneous tracks'],
    },
    {
      name: 'Low-Altitude Early-Warning Radar (X-Band)',
      summary: 'A 3D pulse-Doppler radar for 360° search, target tracking, alert review and event records.',
      image: '/products/02-detection-monitoring/low-altitude-detection-radar-x-band.webp',
      imageAlt: 'X-band 3D pulse-Doppler platform detection radar',
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
  workflowHeading: 'Radar detection, sensor cueing and coordinated response',
  workflowIntro: 'A usable radar track moves through evidence correlation, operator confirmation and a defined handoff to the responsible site team.',
  workflow: [
    { title: 'Detection', summary: 'Radar searches the planned sector and creates a track with time, range, bearing, altitude or speed fields supported by the configuration.' },
    { title: 'Identification', summary: 'The platform compares the track with RF, Remote ID, permitted-flight and map context.' },
    { title: 'Confirmation', summary: 'EO/IR cueing and operator review add visual evidence and a review status.' },
    { title: 'Command & Response', summary: commandResponse },
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
      imageAlt: 'Major sports venue platform radar monitoring scenario',
      href: '/cases/asian-games-security',
      points: ['Time-bound deployment plan', 'Radar and RF evidence correlation', 'Command and field-team coordination'],
    },
  ],
  faqHeading: 'Platform radar selection FAQ',
  faqs: [
    { question: 'Can radar detect every platform?', answer: 'No. Detectability depends on target characteristics, route, altitude, terrain, clutter, weather, scan geometry and mounting. Coverage should be reviewed against the real site.' },
    { question: 'How should Ku-band and X-band options be compared?', answer: 'Compare the stated range condition, blind zone, elevation coverage, target capacity, interface, mounting and the sectors that matter at the site—not the band label alone.' },
    { question: 'Why combine radar with RF and EO/IR?', answer: 'Radar contributes movement and track data; RF can add signal or identity clues; EO/IR can add visual confirmation. Correlation gives the operator a more reviewable event.' },
    { question: 'What happens after confirmation?', answer: 'The platform maintains the correlated track, presents the target and device status, coordinates the configured response sequence and records the complete event.' },
  ],
  ctaLabel: 'Request Radar Review',
};

export const portableDetectionSystemLanding: IntentLandingConfig = {
  handle: 'portable-detection-system',
  eyebrow: 'PORTABLE & MOBILE LOW-ALTITUDE DEFENSE',
  h1: 'Portable Low-Altitude Defense Systems for Handheld, Integrated & Vehicle-Mounted Deployment',
  purpose:
    'Compare handheld detectors, hand-carried identification systems, integrated field kits and vehicle-mounted Low-Altitude Defense configurations for temporary, patrol and mobile operations.',
  heroImage: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-defense.webp',
  heroImageAlt: 'Portable and vehicle-mounted Low-Altitude Defense equipment for mobile field deployment',
  heroFacts: ['Handheld and hand-carried', 'Integrated field kits', 'Vehicle-mounted configurations'],
  applicationHeading: 'Which portable or mobile Low-Altitude Defense format fits the task?',
  answerBlock:
    'Portable Low-Altitude Defense covers several deployment formats with different capabilities. A patrol team may need a lightweight handheld RF detector for local alerts. A temporary post may use a hand-carried identification system with a larger display, direction finding and positioning support. An integrated field kit combines detection, identification, tracking cues, alarm linkage, event records and command-platform coordination. Vehicle-mounted systems add multi-sensor integration and rapid repositioning between operating sectors, together with project-specific power, mounting, vibration and network requirements. Selection should begin with the mission, crew size, readiness time, operating duration, target information required and response mode—not detection range alone. RF performance depends on target radio activity, frequency coverage, local noise, antenna position and obstructions; radar, EO/IR and platform interfaces should be engineered as separate system layers.',
  applications: [
    { title: 'Individual patrol', summary: 'Issue a lightweight handheld detector when one operator needs local alerts while moving.' },
    { title: 'Temporary field post', summary: 'Use a hand-carried identification system with a larger display and repeatable setup procedure.' },
    { title: 'Integrated rapid deployment', summary: 'Combine detection, identification, tracking cues, records and command handoff in one field kit.' },
    { title: 'Vehicle-mounted patrol', summary: 'Move a configured sensor package between reviewed operating points.' },
  ],
  productsHeading: 'Four portable and mobile deployment formats',
  productsIntro: 'Choose by operator role, readiness time, transport, power, sensor scope, target information and response mode.',
  products: [
    {
      name: 'PL280H Handheld RF Detection System',
      summary: 'A lightweight passive RF monitor with replaceable battery and vibration, audible and visual alerts for individual patrol users.',
      image: '/products/02-detection-monitoring/handheld-rf-detection-system-pl280h.webp',
      imageAlt: 'PL280H handheld RF target detection system',
      href: '/products/handheld-rf-detection-system-mini',
      facts: ['300 MHz-6.2 GHz custom scanning', 'Up to 6 hours rated endurance', 'IP65 handheld enclosure'],
    },
    {
      name: 'Portable RF Identification System',
      summary: 'A 16 kg hand-carried system with integrated display for temporary monitoring, spectrum review and command-post use.',
      image: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
      imageAlt: 'Hand-carried portable RF target identification system',
      href: '/products/portable-rf-detection-case',
      facts: ['300 MHz-6 GHz', '5 hours rated endurance', '13.3-inch display and IP65'],
    },
    {
      name: 'Integrated Low-Altitude Defense Field Kit (Pro)',
      summary: 'An 8 kg rapid-deployment kit for RF awareness, target identification, tracking cues, alert linkage, event records and command coordination.',
      image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
      imageAlt: 'Portable integrated Low-Altitude Defense field kit for rapid deployment',
      href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
      facts: ['Up to 3 km line-of-sight reference', '8 kg field kit', 'Tracking cues and event records'],
    },
    {
      name: 'Vehicle-Mounted Low-Altitude Defense Configuration',
      summary: 'A project-configured mobile package for planned patrol routes, temporary operating positions and rapid repositioning.',
      image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-defense.webp',
      imageAlt: 'Vehicle-mounted Low-Altitude Defense configuration for mobile patrol',
      href: '/products#vehicle-mounted-low-altitude-defense',
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
  workflowHeading: 'Mobile detection, identification and coordinated response',
  workflowIntro: 'The selected deployment format changes the equipment, but every project still needs a defined evidence and responsibility chain.',
  workflow: [
    { title: 'Detection', summary: 'The handheld, field-kit or vehicle-mounted sensor layer creates an observation with available time, source, position or track data.' },
    { title: 'Identification', summary: 'The operator reviews supported RF, identity, map and permitted-flight information without treating uncertain evidence as confirmed.' },
    { title: 'Confirmation', summary: 'The field team adds location and visual context while the command workflow correlates other sensors or site information where available.' },
    { title: 'Command & Response', summary: commandResponse },
  ],
  scenariosHeading: 'Two mobile Low-Altitude Defense solution scenarios',
  scenariosIntro: 'Rapid-deployment kits and vehicle-mounted systems solve different movement, readiness, power and command requirements.',
  scenarios: [
    {
      title: 'Integrated Rapid-Deployment Post',
      summary: 'A field team carries one integrated kit to a temporary operating position and connects observations, identification clues and event records to the responsible command workflow.',
      image: '/products/rf-systems/portable-integrated-rf-analysis-pro.webp',
      imageAlt: 'Integrated portable Low-Altitude Defense field kit at a temporary operating post',
      href: '/products/portable-integrated-detection-event-logging-pro-low-altitude-monitoring',
      linkLabel: 'View integrated field kit',
      points: ['Repeatable setup and startup check', 'Integrated target data and event records', 'Command-platform and response linkage'],
    },
    {
      title: 'Vehicle-Mounted Mobile Patrol',
      summary: 'A configured vehicle moves between planned sectors while the crew repeats positioning, power, network and sensor-validity checks at each operating point.',
      image: '/solutions/low-altitude-airspace-monitoring/vehicle-mobile-defense.webp',
      imageAlt: 'Vehicle-mounted Low-Altitude Defense system for mobile multi-sector patrol',
      href: '/products#vehicle-mounted-low-altitude-defense',
      linkLabel: 'View vehicle-mounted options',
      points: ['Planned operating positions and routes', 'Vehicle power, mounting and vibration review', 'Onboard or remote command handoff'],
    },
  ],
  faqHeading: 'Portable and vehicle-mounted Low-Altitude Defense FAQ',
  faqs: [
    { question: 'Does portable Low-Altitude Defense mean handheld only?', answer: 'No. Portable may describe an individual handheld detector, a hand-carried identification system or an integrated field kit. Vehicle-mounted equipment is a separate mobile format with its own power, mounting and operating-position requirements.' },
    { question: 'Can a portable system support integrated detection and RF response?', answer: 'Yes. The project scope should define the required detection, identification, positioning, tracking and RF response functions, along with operator roles, equipment interfaces, power, communications and field validation.' },
    { question: 'When is a vehicle-mounted configuration appropriate?', answer: 'Choose vehicle-mounted equipment when a trained team must patrol several planned sectors or reposition quickly. The review should include vehicle power, payload, mounting, vibration, network options, safe operating positions and startup checks.' },
    { question: 'Are the stated RF ranges guaranteed?', answer: 'No. Target radio activity, antenna position, obstructions, local RF noise, configuration and test conditions affect usable range. Confirm the current datasheet and validate the planned operating environment.' },
    { question: 'Can portable and vehicle-mounted equipment use the same command platform?', answer: 'They can be designed around a shared platform when interfaces, network availability, user roles, map positions, event records and offline procedures are confirmed during project review.' },
  ],
  ctaLabel: 'Request Portable / Mobile Review',
};

export const platformDetectorLanding = multiSensorDetectionLanding;
export const radarDetectionLanding = lowAltitudeRadarMonitoringLanding;
export const portableDetectionLanding = portableDetectionSystemLanding;
