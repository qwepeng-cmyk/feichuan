import type { Solution } from './solutions';
import { localizedefenseValue } from './localeCopy';

type CatalogSeed = {
  handle: string;
  title: string;
  summary: string;
  application: string;
  sourceUrl: string;
  painPoints: string[];
  workflow: string[];
};

const assetPath = (handle: string, file: string) =>
  `/solutions/defense-applications/${handle}/${file}.webp`;

const seeds: CatalogSeed[] = [
  {
    handle: 'critical-infrastructure-airspace-monitoring',
    title: 'Critical Infrastructure Platform Defense',
    summary: 'Critical infrastructures such as data centers and water systems are the lifelines of the economy. The absence of a dedicated anti-platform system leaves these assets vulnerable to industrial espionage, physical sabotage, and asymmetric terrorist threats, potentially leading to catastrophic operational downtime and public crisis.',
    application: 'Data centers, water systems and other critical infrastructure',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-critical-infrastructure/',
    painPoints: [
      'Our solution employs a Three-Tiered Gradient Defense prioritizing operational continuity and asset integrity.',
      'High-Accuracy Identification: Ensures high-fidelity platform detection and stable tracking in high-clutter, interference-heavy industrial environments.',
      'Non-Kinetic Mitigation: Prioritizes EMC-compliant countermeasures to neutralize threats safely, ensuring no secondary disruption to facility operations or control systems.',
      'Unmanned Operation: Built for 24/7 autonomous surveillance.',
    ],
    workflow: [
      'Strategic Monitoring.',
      'Emergency Response: Focuses on 24/7 industrial-grade sensing by merging warning and guard zones. It employs multi-sensor fusion to filter complex industrial clutter and pinpoints pilot coordinates, enabling threat neutralization at the source.',
    ],
  },
  {
    handle: 'power-plant-airspace-monitoring',
    title: 'Power Plants Security Platform Defense',
    summary: 'The priority of Low-Altitude Defense construction at a nuclear power plant is a vital safeguard against catastrophic environmental disasters and the deliberate sabotage of cooling systems. Furthermore, proactive defense is essential to prevent industrial espionage and ensure the uninterrupted stability of the national power grid.',
    application: 'Nuclear and industrial power plants',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-power-plants/',
    painPoints: [
      "To ensure the absolute safety of nuclear facilities, the system adopts a 'Gradient Defense' approach, establishing a three-dimensional protection framework through three distinct security perimeters: the Warning Zone, Guard Zone, and Neutralization Zone.",
      'High-Accuracy Detection: Enables the rapid detection and persistent tracking of platforms even within complex, high-clutter industrial environments.',
      'Safe & Non-Kinetic Mitigation: Uses signal manipulation and interference to eliminate risks of secondary damage to sensitive infrastructure.',
      '24/7 All-Weather Operation: Designed for unmanned reliability, ensuring consistent performance in all weather and high-interference settings.',
    ],
    workflow: [
      'Our Perception System achieves integrated detection, identification, and tracking through multi-modal fusion. It utilizes low-altitude radar for 3D tracking, RF and ADS-B receivers for signal-based identification, and platform data access units for protocol analysis. Finally, video verification devices provide AI-driven visual confirmation, ensuring a robust and layered surveillance network.',
    ],
  },
  {
    handle: 'airport-security-protection',
    title: 'Airport Platform Defense',
    summary: 'Platform incursions represent a critical threat to global aviation, causing severe operational chaos and staggering financial losses. The incident at Brussels Airport on November 14, 2025, stands as one of the most representative examples of this risk; unauthorized platforms forced two full operational halts and diverted dozens of flights. This event has catalyzed the urgent prioritization of Low-Altitude Defense infrastructure.',
    application: 'Airports and aviation operating zones',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-airports/',
    painPoints: [
      "For the airport, we'll establish conventional surveillance, flight warning, and core protection zones with a multi-layered low-altitude defense system.",
      'Rapid and Precise Target Detection & Monitoring: Leveraging multi-sensor fusion for instantaneous localization.',
      'Electromagnetic Compatibility Assurance: Ensuring zero interference with aviation communication and navigation.',
      'All-Weather Reliability and Safe Countermeasures: Providing non-kinetic response options to force platforms away from flight paths without creating secondary risks.',
    ],
    workflow: [
      'Tactical Agility.',
      'Strategic Foundation.',
      "Serving as a vital supplement to fixed infrastructure, portable tactical units provide the essential mobility and rapid-response capabilities required for a dynamic airport security framework. Specialized 'detect-and-strike-in-one' devices empower security personnel to move swiftly to the platform's location for immediate field intervention.",
    ],
  },
  {
    handle: 'border-airspace-monitoring',
    title: 'Border Security Platform Defense',
    summary: 'Borders represent the first line of national defense, yet traditional physical barriers are powerless against the rising threat of platforms. Platform incursions now pose major risks, from espionage and reconnaissance to smuggling. Platform-based asymmetric attacks endanger outposts and personnel, making a multi-layered Low-Altitude Defense system essential to regain low-altitude control.',
    application: 'Borderlines, sensitive sites and complex border terrain',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-border/',
    painPoints: [
      'Given the challenges of extensive borderlines, numerous sensitive sites, and complex terrain, our Low-Altitude Defense deployment must strike a balance between cost-effectiveness and depth of defense.',
      '24/7 All-Weather Detection: Guaranteed situational awareness across rugged terrain and harsh environmental conditions.',
      'Strategic Localization: Real-time dual-tracking of platforms and operators to pinpoint coordinates for immediate law enforcement intervention.',
      "Tactical Mobility: Eliminate coverage blind spots and enable agile 'detect-and-strike' response in the field.",
    ],
    workflow: [
      'Strategic Foundation.',
      'Tactical Agility.',
      'Fixed Strategic Nodes are deployed at high-vantage points or monitoring towers to provide persistent 24/7 unmanned surveillance.',
      'The system utilizes radar and RF for wide-area search and pilot localization, with EO/IR for night verification.',
      "For a 'zero-intrusion' objective, high-power interference and signal manipulation create an electronic shield, enabling automated alerts and decisive platform expulsion from core airspace.",
    ],
  },
  {
    handle: 'public-safety-airspace-monitoring',
    title: 'Public Safety Platform Defense',
    summary: 'Today, unauthorized platforms have transitioned from simple nuisances to sophisticated public security threats. They are increasingly utilized for illegal aerial mapping and espionage against sensitive government units, and have even evolved into delivery platforms for urban terrorism capable of deploying hazardous payloads. To mitigate these escalating risks, our solution provides autonomous urban airspace management.',
    application: 'Urban public safety and city-wide airspace management',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-public-safety/',
    painPoints: [
      'Public safety requires a permanent, grid-based Low-Altitude Defense infrastructure that shifts from a reactive response model to proactive management, ensuring continuous maintenance of urban order.',
    ],
    workflow: [
      'Fixed Strategic Grid.',
      'Rapid Response.',
      'Fixed permanent sensing nodes—integrating RF, Radar, EO/IR, and RemoteID—are installed at landmarks and intersections to provide 24/7 urban monitoring. This networked grid feeds real-time data into a centralized Command Center (C2), creating an electronic shield for autonomous anomaly detection and city-wide early warning.',
    ],
  },
  {
    handle: 'correctional-facility-airspace-monitoring',
    title: 'Prison Platform Defense',
    summary: "Prisons face unique vulnerabilities to platform incursions, where unauthorized Aerial Platforms act as 'flying couriers' for contraband—drugs, weapons, mobile phones—and as covert platforms for hostile reconnaissance. High-profile cases, such as the Ohio prison riots triggered by platform-delivered narcotics, prove that traditional walls are no longer enough.",
    application: 'Prisons and correctional facilities',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-prison/',
    painPoints: [
      "Prison Low-Altitude Defense construction should centralize high-performance deployment instead of using redundant, low-tier sensors, with technology scaled to the facility's size.",
      "Precision Pilot Localization: Rapidly detects unauthorized platforms and triangulates the pilot's exact coordinates in real time.",
      '24/7 Fully Operation: Delivers round-the-clock protection with zero manual intervention.',
      'Forensic & Legal Accountability: Automatically logs flight trajectories and spectral fingerprints, creating an indisputable forensic chain of custody.',
    ],
    workflow: [
      'Strategic Base.',
      'Tactical Units: Employs all-in-one detection and mitigation units mounted on strategic elevations for autonomous, facility-wide protection.',
    ],
  },
  {
    handle: 'port-airspace-monitoring',
    title: 'Port Security Platform Defense',
    summary: "A harbor's reliance on precise scheduling means that even minor aerial intrusions can trigger a chain reaction of delays, endangering critical infrastructure such as gantry cranes, fuel terminals, and automated logistics systems. Proactive and early-stage deployment of anti-platform systems is vital to mitigate potential disruptions before they occur.",
    application: 'Harbors, terminals and maritime logistics infrastructure',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-port-security/',
    painPoints: [
      'Effective port platform defense hinges on the unification of sea-land-air situational awareness, necessitating a multi-layered, multidimensional protection framework to address escalating aerial threats.',
      '24/7 All-Weather Operation: High-performance detection and tracking through heavy sea fog, salt spray, rain, and total darkness.',
      'Electromagnetic Compatibility Assurance: Ensures zero interference with aviation communication and navigation.',
      'Cross-Domain Coordination: Frameworks to enable a synchronized, real-time response between land-based security teams and maritime patrols.',
    ],
    workflow: [
      'Fixed Infrastructure.',
      'Portable Reinforcement.',
      'Strategically mounted on high vantage points, this 24/7 all-weather foundation provides a tiered defense: detecting via radar/RF and confirming targets through EO/IR. It enables a graduated response, utilizing distributed RF interference and navigation signal manipulation to safely redirect or ground threats, ensuring comprehensive, non-kinetic protection for critical port assets.',
    ],
  },
  {
    handle: 'mass-event-airspace-monitoring',
    title: 'Mass Events Platform Defense',
    summary: 'The Paris 2024 Olympics served as a high-profile wake-up call when unauthorized platforms were caught clandestinely filming competitor training sessions, proving that aerial threats extend beyond physical safety to espionage and the compromise of event integrity. In high-density environments, unregulated platforms pose severe risks of mass panic, kinetic injury, and targeted sabotage.',
    application: 'Stadiums, festivals, exhibitions and mass events',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-mass-events/',
    painPoints: [
      'For Mass Events Security, Low-Altitude Defense infrastructure is a mission-critical necessity. Proactive detection and mitigation are essential to neutralize threats before they can disrupt the venue or the crowd.',
      'Rapid Deployment: Devices can be set up within hours at various venues, ensuring flexible coverage for temporary event durations.',
      'Platform Management: Support to distinguish authorized media or law enforcement platforms from threats.',
      'Non-Kinetic Intervention: Ensures threat neutralization without the risk of falling debris or collateral damage to the public below.',
    ],
    workflow: [
      'Integrates vehicle-mounted command units—serving as temporary on-site command posts—with man-portable patrols equipped with handheld devices. This combination fills coverage gaps and delivers precision, non-kinetic intervention in high-density areas, ensuring seamless air security from wide-area surveillance to endpoint response.',
    ],
  },
  {
    handle: 'vip-private-property-airspace-monitoring',
    title: "VIP's and Private Property Platform Defense",
    summary: "Our solution empowers security groups to offer 360-degree high-fidelity privacy protection. By integrating unobtrusive fixed sensing with tactical handheld response, we extend the executive protection perimeter from the ground to the sky. Our system ensures that clients remain 'invisible' to the air, providing a sophisticated, zero-tolerance defense against industrial espionage, intrusive paparazzi, and physical sabotage.",
    application: "VIPs, executive protection and private property",
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-vips-and-private-property/',
    painPoints: [
      'Platform defense is vital for VIP protection as platforms pose surveillance, attack, and disruption threats, risking safety in high-profile settings.',
      'Passive Stealthy Detection.',
      'Pilot Localization & Forensics.',
      'Non-Kinetic Mitigation.',
    ],
    workflow: [
      'Our Mobile Ensemble integrates covert systems into escort vehicles as hidden command hubs, paired with man-portable units.',
      'This enables rapid, synchronized platform detection and neutralization in a low-profile format.',
    ],
  },
  {
    handle: 'enterprise-airspace-monitoring',
    title: 'Enterprises Platform Defense',
    summary: "Modern platforms have evolved into sophisticated tools for intelligence theft. By hovering near R&D centers or office windows, they can conduct high-resolution visual spying or act as 'flying access points' to intercept wireless signals. These aerial platforms can bypass traditional ground security to steal trade secrets or inject malware directly into corporate networks.",
    application: 'R&D centers, offices, campuses and enterprise facilities',
    sourceUrl: 'https://www.fsain.com/anti-platform-solutions-for-enterprises/',
    painPoints: [
      'When implementing an anti-platform system, the following technical dimensions must be prioritized to ensure effectiveness and reliability.',
      'Precision Localization: Simultaneous tracking of platform and operator for immediate threat neutralization.',
      "Data Forensics: Full trajectory reconstruction to serve as a 'black box' for audits and legal evidence.",
      'Seamless Integration: Plugs into existing infrastructure to create a unified and automated security ecosystem.',
    ],
    workflow: [
      'Strategic Base.',
      'Tactical Support.',
      "This is the 'Always-On' foundation for 24/7 campus protection.",
      "Strategically mounted on rooftops or dedicated towers, these units provide a persistent electronic 'dome' over the facility.",
    ],
  },
];

function toSolution(seed: CatalogSeed, locale = 'ru'): Solution {
  const galleryTitle = seed.title.replace(' Platform Defense', '') + ' Gallery';
  const detailSections = {
    industry_pain_points_eyebrow: 'Solution Design',
    industry_pain_points_title: 'Key Technical Points for Construction',
    industry_pain_points: seed.painPoints,
    industry_pain_points_image: assetPath(seed.handle, 'construction'),
    aerial_industry_upgrade: seed.workflow,
    operation_upgrade_eyebrow: 'Defense Architecture',
    operation_upgrade_title: 'How We Defend Against Platform Interference',
    solution_modules_eyebrow: 'Application Scenes',
    solution_modules_title: galleryTitle,
    solution_modules_intro: '',
    solution_modules: [
      { name: `${galleryTitle} 01`, description: '', image: assetPath(seed.handle, 'gallery-1') },
      { name: `${galleryTitle} 02`, description: '', image: assetPath(seed.handle, 'gallery-2') },
    ],
    related_cases: [],
  };

  const localizedFields = locale === 'en' ? {} : {
    [`product_name_${locale}`]: seed.title,
    [`summary_${locale}`]: seed.summary,
    [`key_application_${locale}`]: seed.application,
    [`key_parameter_1_${locale}`]: seed.painPoints[1] || seed.painPoints[0],
    [`key_parameter_2_${locale}`]: seed.painPoints[2] || seed.workflow[0],
    [`parameters_${locale}`]: JSON.stringify(detailSections),
    [`detail_html_${locale}`]: '',
  };

  return {
    id: seed.handle,
    handle: seed.handle,
    category_id: 'defense-application-solutions',
    category_name: 'Low-Altitude Defense Application Solutions',
    product_name_en: seed.title,
    title_en: seed.title,
    summary_en: seed.summary,
    key_application_en: seed.application,
    key_parameter_1_en: seed.painPoints[1] || seed.painPoints[0],
    key_parameter_2_en: seed.painPoints[2] || seed.workflow[0],
    parameters_en: JSON.stringify(detailSections),
    detail_html_en: '',
    main_image: assetPath(seed.handle, 'hero'),
    recommended_products: [],
    recommended_cases: [],
    ...localizedFields,
    raw_json: JSON.stringify({
      detail_sections: detailSections,
      recommended_cases: [],
      source_reference: seed.sourceUrl,
    }),
  } as Solution;
}

export const englishdefenseSolutions = seeds.map((seed) => toSolution(seed));

const byHandle = new Map(englishdefenseSolutions.map((solution) => [solution.handle, solution]));

export function getEnglishdefenseSolution(handle: string): Solution | null {
  return byHandle.get(handle) || null;
}

export function getdefenseSolutions(locale = 'ru'): Solution[] {
  return seeds.map((seed) => toSolution(localizedefenseValue(locale, seed), locale));
}

export function getdefenseSolution(handle: string, locale = 'ru'): Solution | null {
  const seed = seeds.find((item) => item.handle === handle);
  return seed ? toSolution(localizedefenseValue(locale, seed), locale) : null;
}

export const englishdefenseSolutionHandles = englishdefenseSolutions.map((solution) => solution.handle);
