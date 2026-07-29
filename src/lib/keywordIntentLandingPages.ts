import type { IntentLandingConfig } from './intentLandingPages';

const commandResponse =
  'The command platform correlates the confirmed track, displays sensor and device status, coordinates the configured response sequence, and records alarms, commands and outcomes.';

export const perimeterDefenseLanding: IntentLandingConfig = {
  handle: 'perimeter-defense-system',
  eyebrow: 'PERIMETER DEFENSE & PROTECTION',
  h1: 'Perimeter Defense: Integrated Low-Altitude Site Protection',
  purpose:
    'Compare fixed and portable passive RF detection, low-altitude radar, Remote ID and EO/IR tracking for site perimeter monitoring.',
  heroImage: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
  heroImageAlt: 'Stationary passive RF monitoring equipment for perimeter awareness',
  heroFacts: ['Passive RF monitoring', 'Radar and EO/IR confirmation', 'Integrated command platform'],
  applicationHeading: 'What defines an effective perimeter defense configuration?',
  answerBlock:
    'Perimeter defense for low-altitude protection is a multi-layered site monitoring architecture. Fixed RF detectors and target detection radar monitor sector approach routes; Remote ID receivers log cooperative identity broadcasts; EO/IR tracking systems provide visual confirmation; and the command platform records evidence for authorized operator response. System selection depends on site boundaries, terrain, building obstruction, electromagnetic environment, power and network infrastructure, and required response workflows. Published ranges describe stated product test conditions and must be validated by a site survey and acceptance test.',
  applications: [
    { title: 'Industrial Facility Perimeter', summary: 'Continuous monitoring of approach sectors with fixed passive RF, radar and EO/IR layers.' },
    { title: 'Airport Boundary Protection', summary: 'Multi-sensor detection and Remote ID logging around flight paths and restricted airspace boundaries.' },
    { title: 'Critical Infrastructure Security', summary: 'Layered site coverage combining passive RF direction finding, radar tracking and EO visual confirmation.' },
    { title: 'Government & High-Security Posts', summary: 'Integrated post protection with portable field units and standing command-room escalation procedures.' },
  ],
  productsHeading: 'Core perimeter defense product options',
  productsIntro: 'Choose equipment configurations based on site geometry, mounting constraints and operational requirements.',
  products: [
    {
      name: 'Electro-Optical (EO) Tracking System',
      summary: 'EO/IR verification equipment for visual classification and correlated target tracking.',
      image: '/products/02-detection-monitoring/electro-optical-tracking-system.webp',
      imageAlt: 'EO IR tracking equipment for visual target confirmation',
      href: '/products/composite-electro-optical-tracking-system',
      facts: ['Visible and thermal channels', 'Track correlation', 'Operator confirmation'],
    },
    {
      name: 'Aerial Platform Remote ID Recognition System',
      summary: 'Passive Remote ID receiver for cooperative identity broadcasts, location context and event records.',
      image: '/products/aerial-systems/aerial-Remote-ID-Monitoring-System.webp',
      imageAlt: 'Remote ID receiver for cooperative target identification',
      href: '/products/aerial-remote-id-monitoring-system',
      facts: ['Passive identity reception', 'Map-based context', 'Traceable event records'],
    },
    {
      name: 'Stationary RF Identification System',
      summary: 'Fixed passive RF detector for continuous perimeter monitoring, signal classification and direction-finding support.',
      image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
      imageAlt: 'Stationary RF identification system for site perimeter awareness',
      href: '/products/stationary-rf-detection-system',
      facts: ['300 MHz-6 GHz frequency coverage', '360° horizontal direction finding', 'Ethernet command linkage'],
    },
    {
      name: 'Low-Altitude Early-Warning Radar (Ku-Band)',
      summary: 'A DBF 3D pulse-Doppler radar for wide perimeter search, target tracking and optical system cueing.',
      image: '/products/02-detection-monitoring/low-altitude-detection-radar.webp',
      imageAlt: 'Ku-band low-altitude target detection radar for perimeter defense',
      href: '/products/low-altitude-detection-radar-ku-band',
      facts: ['Reference range ≥5 km at RCS 0.01 m²', '360° search coverage', 'Multi-target track output'],
    },
  ],
  comparisonHeading: 'Passive RF monitoring vs. low-altitude radar',
  comparisonIntro: 'Compare the evidence each sensor contributes under documented site and environmental conditions.',
  comparisonColumns: ['Passive RF monitoring', 'Low-altitude radar'],
  comparisonRows: [
    { label: 'Primary Evidence', values: ['Spectrum activity, identity and bearing', 'Range, altitude, speed and track'] },
    { label: 'Operating Dependency', values: ['Target RF emissions and local spectrum noise', 'RCS, terrain, clutter and weather'] },
    { label: 'Site Planning Need', values: ['Antenna position, RF survey and obstruction review', 'Mounting height, line of sight and clutter survey'] },
    { label: 'Command Handoff', values: ['Correlated RF observation and event record', 'Correlated track and EO/IR cueing'] },
  ],
  workflowHeading: 'Perimeter detection, confirmation and response sequence',
  workflowIntro: 'Every alert follows a validated four-stage evidence and response escalation workflow.',
  workflow: [
    { title: 'Detection', summary: 'RF sensors and radar identify target presence and generate initial approach tracks.' },
    { title: 'Identification', summary: 'The platform compares signal profile, Remote ID broadcasts and permitted-flight schedules.' },
    { title: 'Confirmation', summary: 'EO/IR optical tracking confirms target visual classification and operator status.' },
    { title: 'Response & Records', summary: commandResponse },
  ],
  scenariosHeading: 'Perimeter defense deployment scenarios',
  scenariosIntro: 'System layout adapts to physical site characteristics, operating environment and team readiness.',
  scenarios: [
    {
      title: 'Refinery & Industrial Perimeter Defense',
      summary: 'Fixed passive RF sensors, radar and EO/IR equipment monitor production blocks and storage areas.',
      image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
      imageAlt: 'Refinery perimeter defense solution scenario',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['Multi-sector passive RF monitoring', 'Radar track generation', 'Standing command platform integration'],
    },
    {
      title: 'Major Transport Hub Boundary Protection',
      summary: 'Networked passive RF receivers and Remote ID loggers monitor approach corridors and relay verified events to central control.',
      image: '/cases/airport-security-application/main-home.webp',
      imageAlt: 'Airport boundary defense solution scenario',
      href: '/cases/airport-security-application',
      points: ['Approach corridor passive sensing', 'Permitted flight correlation', 'Traceable event logging'],
    },
  ],
  faqHeading: 'Perimeter Defense FAQ',
  faqs: [
    { question: 'What components are required for a perimeter defense system?', answer: 'A basic monitoring configuration combines passive RF detection, low-altitude radar, Remote ID, EO/IR verification and command software selected for site geometry.' },
    { question: 'How is false alarm risk managed?', answer: 'Multi-sensor evidence correlation combined with EO/IR visual confirmation helps operators review targets before following the site response procedure.' },
    { question: 'Can perimeter defense systems integrate with existing security management software?', answer: 'Yes. N-TET equipment supports standard network protocols and API interfaces for integration with site VMS, C2 platforms and alarm management systems.' },
    { question: 'How do weather and terrain affect perimeter defense?', answer: 'Heavy rain, fog, high terrain and building obstructions affect radar and optical range. Site surveys and coverage modeling define sensor placement and blind-zone mitigation.' },
  ],
  ctaLabel: 'Request Perimeter Plan',
};

export const rfTargetPositioningLanding: IntentLandingConfig = {
  handle: 'rf-target-positioning',
  eyebrow: 'RF TARGET POSITIONING & TRACKING',
  h1: 'RF Target Positioning: Spectrum Analysis & Direction Finding',
  purpose:
    'Compare portable and fixed RF target positioning equipment for spectrum monitoring, bearing estimation and multi-sensor target tracking.',
  heroImage: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
  heroImageAlt: 'Portable RF target positioning and spectrum analysis system',
  heroFacts: ['300 MHz-6 GHz spectrum scanning', 'Bearing & direction finding', 'Portable & fixed deployment'],
  applicationHeading: 'How does RF target positioning support low-altitude defense?',
  answerBlock:
    'RF target positioning detects radio signals transmitted by remote controls and video links to determine target direction and position clues. Handheld and portable field units allow patrol teams to locate signal sources during mobile operations. Fixed passive RF receivers provide continuous 360-degree direction finding across facility boundaries. When combined with target detection radar and EO/IR tracking, RF positioning provides critical early warning before visual contact is established.',
  applications: [
    { title: 'Mobile Patrol Positioning', summary: 'Field teams use portable detectors to locate signal sources during perimeter sweeps.' },
    { title: 'Fixed Site Direction Finding', summary: 'Installed RF arrays estimate target approach bearings across facility boundaries.' },
    { title: 'Event Security Monitoring', summary: 'Temporary spectrum monitoring positions log RF activity around temporary venues.' },
    { title: 'Multi-Sensor Handoff', summary: 'RF bearing data cues pan-tilt optical cameras for visual target confirmation.' },
  ],
  productsHeading: 'RF positioning product options',
  productsIntro: 'Select handheld, portable or fixed RF equipment depending on mobility and coverage needs.',
  products: [
    {
      name: 'Portable RF Identification System',
      summary: 'A 16 kg hand-carried spectrum analyzer with integrated display for field positioning and direction finding.',
      image: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
      imageAlt: 'Portable RF identification and positioning case',
      href: '/products/portable-rf-detection-case',
      facts: ['300 MHz-6 GHz frequency range', '13.3-inch touch screen', '5 hours rated battery life'],
    },
    {
      name: 'PL280H Handheld RF Detector',
      summary: 'A lightweight 350 g handheld RF monitor for individual patrol users requiring immediate signal alerting.',
      image: '/products/02-detection-monitoring/handheld-rf-detection-system-pl280h.webp',
      imageAlt: 'PL280H handheld RF target detector',
      href: '/products/handheld-rf-detection-system-mini',
      facts: ['Compact handheld format', 'Vibration, sound & visual alerts', 'Up to 6 hours operating time'],
    },
    {
      name: 'Stationary RF Identification System',
      summary: 'Fixed passive RF array for continuous 360-degree direction finding and multi-target bearing estimation.',
      image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
      imageAlt: 'Stationary RF direction finding system',
      href: '/products/stationary-rf-detection-system',
      facts: ['Fixed passive monitoring', '360° horizontal coverage', 'Networked command linkage'],
    },
  ],
  comparisonHeading: 'Handheld vs. Portable vs. Fixed RF Positioning',
  comparisonIntro: 'Compare mobility, display capabilities, direction-finding accuracy and power options.',
  comparisonColumns: ['Handheld (PL280H)', 'Portable Case', 'Stationary Array'],
  comparisonRows: [
    { label: 'Form Factor', values: ['350 g handheld unit', '16 kg hand-carried case', 'Fixed tower / mast mount'] },
    { label: 'Primary Role', values: ['Individual patrol alert', 'Temporary post / field team', 'Continuous facility protection'] },
    { label: 'Display & Interface', values: ['OLED screen + alerts', '13.3-inch interactive display', 'Remote command software'] },
    { label: 'Direction Accuracy', values: ['Basic sector alert', 'Direction-finding support', 'High-precision RF bearing'] },
  ],
  workflowHeading: 'RF positioning workflow sequence',
  workflowIntro: 'From initial signal detection to operator action and event logging.',
  workflow: [
    { title: 'Signal Detection', summary: 'RF receivers detect target transmission frequencies and log signal strength.' },
    { title: 'Bearing Estimation', summary: 'Direction-finding algorithms compute target approach bearing.' },
    { title: 'Optical Cueing', summary: 'Bearing data is relayed to EO/IR camera for visual confirmation.' },
    { title: 'Record & Handoff', summary: commandResponse },
  ],
  scenariosHeading: 'RF target positioning scenarios',
  scenariosIntro: 'Deployable solutions for fixed installations and mobile response teams.',
  scenarios: [
    {
      title: 'Patrol Team Field Positioning',
      summary: 'Mobile security officers use handheld and portable RF units to locate signal sources during field sweeps.',
      image: '/products/rf-systems/portable-rf-field-unit-pro.webp',
      imageAlt: 'Mobile team RF positioning scenario',
      href: '/solutions/portable-detection-system',
      points: ['Rapid field deployment', 'Real-time spectrum alerts', 'Command room status relay'],
    },
    {
      title: 'Industrial Perimeter Bearing Tracking',
      summary: 'Fixed RF arrays monitor boundary sectors and pass bearing coordinates to site security management.',
      image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
      imageAlt: 'Fixed RF positioning scenario at refinery',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['24/7 boundary monitoring', 'Multi-target bearing resolution', 'Automated optical cueing'],
    },
  ],
  faqHeading: 'RF Target Positioning FAQ',
  faqs: [
    { question: 'Does RF positioning work against silent targets?', answer: 'RF positioning relies on active radio emissions. Silent or autonomous targets without radio links require target detection radar for tracking.' },
    { question: 'What is the typical range of RF positioning equipment?', answer: 'Detection range depends on target transmitter power, frequency, antenna line-of-sight and background RF noise levels.' },
  ],
  ctaLabel: 'Request RF Positioning Review',
};

export const layeredSiteProtectionLanding: IntentLandingConfig = {
  handle: 'layered-site-protection',
  eyebrow: 'FIXED, PORTABLE & MOBILE LOW-ALTITUDE DEFENSE',
  h1: 'Site Protection for Fixed, Portable & Mobile Deployment',
  purpose:
    'Compare fixed-site, portable and vehicle-mounted Site Protection configurations for multi-sensor detection, target tracking, command and coordinated response.',
  heroImage: '/products/rf-systems/portable-rf-field-unit-pro.webp',
  heroImageAlt: 'Portable Low-Altitude Defense field unit in a layered Site Protection configuration',
  heroFacts: ['Fixed-site coverage', 'Portable field deployment', 'Vehicle-mounted mobility'],
  applicationHeading: 'What makes a practical Site Protection configuration?',
  answerBlock:
    'A practical Site Protection configuration is a layered monitoring architecture rather than a single product. Fixed passive RF, radar, Remote ID and EO/IR equipment provides detection, identification and tracking across planned sectors. Portable field units support temporary posts, patrol teams and event deployments. Vehicle-mounted configurations let teams reposition between operating points while maintaining sensor, platform and communications links. Confirmed events are recorded and handed to authorized operators through the documented site response procedure.',
  applications: [
    { title: 'Continuous fixed-site coverage', summary: 'Monitor planned sectors with installed sensors, network links and a standing command workflow.' },
    { title: 'Temporary field protection', summary: 'Set up a portable unit for short-duration events, worksites or temporary posts.' },
    { title: 'Rapid-deployment team', summary: 'Carry an integrated field kit that joins evidence, event records and command handoff.' },
    { title: 'Vehicle-mounted patrol', summary: 'Reposition a configured sensor package between reviewed operating points.' },
  ],
  productsHeading: 'Reusable monitoring configurations',
  productsIntro: 'Choose the deployment format first, then define passive sensors, power, network and command interfaces.',
  products: [
    {
      name: 'Portable RF Identification System',
      summary: 'A portable passive RF unit for temporary sites and patrol teams that need local early warning and event review.',
      image: '/products/02-detection-monitoring/portable-rf-detection-case.webp',
      imageAlt: 'Portable RF identification system for temporary site monitoring',
      href: '/products/portable-rf-detection-case',
      facts: ['Portable field deployment', 'Passive RF awareness', 'Temporary-site workflow'],
    },
    {
      name: 'Stationary RF Identification System',
      summary: 'A fixed passive RF layer for continuous site awareness, supported identification and direction finding.',
      image: '/products/02-detection-monitoring/stationary-rf-detection-system.webp',
      imageAlt: 'Stationary RF identification system for fixed site protection coverage',
      href: '/products/stationary-rf-detection-system',
      facts: ['Fixed-site passive monitoring', '360-degree horizontal coverage', 'Direction-finding support'],
    },
  ],
  comparisonHeading: 'Fixed, portable or vehicle-mounted?',
  comparisonIntro: 'Compare how the team operates before comparing individual product ranges.',
  comparisonColumns: ['Fixed-site system', 'Portable field unit', 'Vehicle-mounted system'],
  comparisonRows: [
    { label: 'Best fit', values: ['Continuous site monitoring', 'Temporary post or patrol', 'Mobile multi-sector patrol'] },
    { label: 'Readiness model', values: ['Installed and continuously available', 'Carry, position and start', 'Reposition and validate at each stop'] },
  ],
  workflowHeading: 'From Site Protection detection to coordinated response',
  workflowIntro: 'Every deployment format follows the same detection, identification, tracking, confirmation and command sequence.',
  workflow: [
    { title: 'Detection', summary: 'The selected fixed, portable or mobile sensor layer creates an observation with available time and position data.' },
    { title: 'Identification', summary: 'The operator reviews supported RF, identity, map, track and permitted-flight information.' },
    { title: 'Confirmation', summary: 'Visual context and correlated site information establish the event status before escalation.' },
    { title: 'Command & Response', summary: commandResponse },
  ],
  scenariosHeading: 'Two site protection scenarios',
  scenariosIntro: 'Choose between installed continuity and mobile flexibility according to the site and operating team.',
  scenarios: [
    {
      title: 'Fixed Industrial Site Shield',
      summary: 'Installed RF, radar and EO/IR layers monitor priority sectors and pass confirmed events into the site command procedure.',
      image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
      imageAlt: 'Fixed industrial site site protection solution scenario',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['Continuous priority-sector monitoring', 'Multi-sensor confirmation', 'Standing command and record workflow'],
    },
    {
      title: 'Mobile Event-Area Shield',
      summary: 'Portable and vehicle-supported equipment covers planned positions during a time-bound event deployment.',
      image: '/cases/asian-games-security/case_stadium.webp',
      imageAlt: 'Mobile major-event site protection solution scenario',
      href: '/cases/asian-games-security',
      points: ['Temporary operating positions', 'Field-team and command coordination', 'Defined setup and escalation checks'],
    },
  ],
  faqHeading: 'Site Protection FAQ',
  faqs: [
    { question: 'Is a Site Protection system one product?', answer: 'Not necessarily. A complete monitoring configuration can combine fixed, portable or mobile sensors with command software selected after a site survey.' },
  ],
  ctaLabel: 'Request Shield Comparison',
};

export const rfSignalSuppressionLanding: IntentLandingConfig = {
  handle: 'rf-signal-suppression',
  eyebrow: 'DIRECTIONAL & OMNI RF SUPPRESSORS',
  h1: 'RF Suppressor: Directional & Omni-Directional Options',
  purpose:
    'Compare Directional RF Suppressor and Omni-directional RF Suppressor options for fixed-site Low-Altitude Defense integration, linked control and coordinated response.',
  heroImage: '/products/rf-systems/directional-rf-unit.webp',
  heroImageAlt: 'Directional RF Suppressor for fixed-site Low-Altitude Defense integration',
  heroFacts: ['Directional RF suppression', 'Omni-directional RF suppression', 'Detection and platform linkage'],
  applicationHeading: 'Where does an RF suppressor fit in the Low-Altitude Defense workflow?',
  answerBlock:
    'An RF Suppressor belongs downstream of detection, identification and target confirmation. Fixed RF detection provides spectrum and direction information, radar adds range, altitude, speed and continuous tracks, and EO/IR provides visible and thermal confirmation. The command platform then links the target track to a Directional RF Suppressor for focused approach-sector coverage or an Omni-directional RF Suppressor for 360-degree fixed-site coverage.',
  applications: [
    { title: 'Directional RF suppression', summary: 'Use a directional suppressor for focused coverage of selected approach sectors.' },
    { title: 'Omni-directional RF suppression', summary: 'Use an omni-directional suppressor for 360-degree fixed-site coverage.' },
    { title: 'Detection-led response', summary: 'Connect RF, radar and EO/IR confirmation to suppressor control and device status.' },
    { title: 'Command-platform integration', summary: 'Integrate target tracks, alarms, control commands, equipment status and event records.' },
  ],
  productsHeading: 'Two fixed-site RF suppressor options',
  productsIntro: 'Choose directional or omni-directional RF suppression by coverage geometry, mounting, nearby communications and platform interface.',
  products: [
    {
      name: 'Directional RF Suppressor',
      summary: 'A project-configured directional RF suppression layer for focused sector coverage and fixed-site integration.',
      image: '/products/rf-systems/directional-rf-unit.webp',
      imageAlt: 'Directional RF Suppressor',
      href: '/products/directional-rf-interference-device',
      facts: ['Directional sector geometry', 'Fixed-site project integration', 'Remote and linked control'],
    },
    {
      name: 'Omni-directional RF Suppressor',
      summary: 'A project-configured omni-directional RF suppression layer for 360-degree fixed-site coverage.',
      image: '/products/rf-systems/omni-directional-rf-unit.webp',
      imageAlt: 'Omni-directional RF Suppressor',
      href: '/products/omni-directional-rf-interference-device',
      facts: ['Omni-directional area geometry', 'Fixed-site project integration', 'Remote and linked control'],
    },
  ],
  comparisonHeading: 'Directional vs. omni-directional RF suppressor',
  comparisonIntro: 'Compare coverage geometry, installation, electromagnetic environment, command interfaces and operating mode.',
  comparisonColumns: ['Directional RF Suppressor', 'Omni-directional RF Suppressor'],
  comparisonRows: [
    { label: 'Coverage concept', values: ['Focused sector or approach direction', '360-degree area around a fixed installation'] },
    { label: 'Best fit', values: ['Sites that need directional coverage geometry', 'Sites that need omni-directional area coverage'] },
    { label: 'Planning inputs', values: ['Sector drawing, aiming, mounting and exclusion zones', 'Area boundary, mounting, nearby systems and exclusion zones'] },
    { label: 'Platform role', values: ['Target-track handoff, control and device status', 'Target-track handoff, control and device status'] },
  ],
  workflowHeading: 'Detection, confirmation and suppressor response',
  workflowIntro: 'The suppressor remains downstream of RF and radar detection, EO/IR confirmation and command-platform correlation.',
  workflow: [
    { title: 'Detection', summary: 'RF, radar or Remote ID sources create an observation with time and available position or track data.' },
    { title: 'Identification', summary: 'The platform correlates sensor, map, identity and permitted-flight evidence while preserving uncertainty.' },
    { title: 'Confirmation', summary: 'EO/IR and operator review establish the event status and the responsible decision-maker.' },
    { title: 'Suppressor Response', summary: 'The command platform links the confirmed target to the selected directional or omni-directional suppressor and records control commands, device status and outcomes.' },
  ],
  scenariosHeading: 'Two fixed-site suppressor configurations',
  scenariosIntro: 'Both configurations begin with multi-sensor confirmation and use command-platform linkage for control and event records.',
  scenarios: [
    {
      title: 'Directional Industrial Perimeter',
      summary: 'A selected approach sector uses a Directional RF Suppressor downstream of fixed RF, radar and EO/IR confirmation.',
      image: '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
      imageAlt: 'Directional RF Suppressor scenario at an industrial perimeter',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['Defined sector and aiming geometry', 'Multi-sensor target confirmation', 'Linked control and event record'],
    },
    {
      title: 'Omni-directional Protected Complex',
      summary: 'A fixed-site area uses an Omni-directional RF Suppressor after reviewing mounting, surrounding systems and communications interfaces.',
      image: '/cases/nigeria-factory-airspace-monitoring/main-home.webp',
      imageAlt: 'Industrial perimeter target locator solution scenario',
      href: '/cases/brazil-refinery-low-altitude-monitoring',
      points: ['Stationary RF and radar correlation', 'EO/IR confirmation', 'Directional or omni suppressor linkage'],
    },
  ],
  faqHeading: 'Target Suppressor FAQ',
  faqs: [
    { question: 'When should an RF suppressor be activated?', answer: 'RF suppressors are activated after multi-sensor detection and EO/IR visual confirmation by authorized operators according to site rules.' },
  ],
  ctaLabel: 'Request Suppressor Review',
};

export const platformDefenderLanding = perimeterDefenseLanding;
export const platformsuppressorLanding = rfSignalSuppressionLanding;
export const platformLocatorLanding = rfTargetPositioningLanding;
export const platformShieldLanding = layeredSiteProtectionLanding;
