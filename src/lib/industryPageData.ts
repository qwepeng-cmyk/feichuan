import { localizedefenseValue } from './localeCopy';

export type defenseProductSet = 'fixed' | 'mobile';

export type defenseDefenseStage = {
  title: string;
  description: string;
  background: string;
  productSet: defenseProductSet;
};

export type defenseIndustryPageData = {
  handle: string;
  breadcrumbLabel: string;
  stages: [defenseDefenseStage, defenseDefenseStage];
};

const asset = (handle: string, stage: 1 | 2) =>
  `/solutions/defense-applications/${handle}/stage-${stage}.webp`;

const pages: defenseIndustryPageData[] = [
  {
    handle: 'critical-infrastructure-airspace-monitoring',
    breadcrumbLabel: 'Critical Infrastructure',
    stages: [
      {
        title: 'Strategic Monitoring',
        description: 'Focuses on 24/7 industrial-grade sensing by merging warning and guard zones. It employs multi-sensor fusion to filter complex industrial clutter and pinpoints pilot coordinates, enabling threat neutralization at the source.',
        background: asset('critical-infrastructure-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Emergency Response',
        description: 'Secures the core zone with a "red-line" automation logic. By utilizing EMC-compliant navigation signal manipulation, it surgicality redirects threats away from critical assets, ensuring absolute operational integrity for key buildings.',
        background: asset('critical-infrastructure-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'power-plant-airspace-monitoring',
    breadcrumbLabel: 'Power Plants',
    stages: [
      {
        title: 'Perception Fusion',
        description: 'Our Perception System achieves integrated detection, identification, and tracking through multi-modal fusion. It utilizes low-altitude radar for 3D tracking, RF and ADS-B receivers for signal-based identification, and platform data access units for protocol analysis. Finally, video verification devices provide AI-driven visual confirmation, ensuring a robust and layered surveillance network.',
        background: asset('power-plant-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Defeat Units',
        description: 'We provides a graduated response: Directional suppressors at the perimeter force expulsion through signal suppression, while Navigation signal manipulation in core zones safely decoys platforms to avoid crash risks. Optional Lasers serve as a final line for surgical neutralization, ensuring absolute protection of critical infrastructure through this multi-tier, high-precision mitigation strategy.',
        background: asset('power-plant-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'airport-security-protection',
    breadcrumbLabel: 'Airports',
    stages: [
      {
        title: 'Tactical Agility',
        description: 'Serving as a vital supplement to fixed infrastructure, portable tactical units provide the essential mobility and rapid-response capabilities required for a dynamic airport security framework. Specialized "detect-and-strike-in-one" devices empower security personnel to move swiftly to the platform’s location for immediate field intervention.',
        background: asset('airport-security-protection', 1),
        productSet: 'mobile',
      },
      {
        title: 'Strategic Foundation',
        description: 'Our fixed-site infrastructure establishes a comprehensive multi-layered defense capability through a networked deployment that eliminates all surveillance blind spots. In the Outer Perimeter, we integrate Remote ID receivers with RF detection for routine, long-range monitoring and early warning. Within the Management Zone, we deploy multi-modal sensing—combining radar, EO/IR optical tracking, and RF detection—to achieve high-precision situational awareness, linked with electromagnetic suppression systems to rapidly neutralize threats. Finally, for the Core Protection Zone safeguarding critical assets like runways and terminals, we implement absolute countermeasures. This involves high-energy laser systems designed to provide instantaneous neutralization of imminent dangers.',
        background: asset('airport-security-protection', 2),
        productSet: 'fixed',
      },
    ],
  },
  {
    handle: 'border-airspace-monitoring',
    breadcrumbLabel: 'Border',
    stages: [
      {
        title: 'Strategic Foundation',
        description: "Fixed Strategic Nodes are deployed at high-vantage points or monitoring towers to provide persistent 24/7 unmanned surveillance. The system utilizes radar and RF for wide-area search and pilot localization, with EO/IR for night verification. For a 'zero-intrusion' objective, high-power interference and signal manipulation create an electronic shield, enabling automated alerts and decisive platform expulsion from core airspace.",
        background: asset('border-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Agility',
        description: 'Deploying vehicle-mounted and man-portable systems for dynamic coverage along remote stretches. These units bridge the gaps in static surveillance, providing the agility needed for rapid intervention and pilot apprehension in wilderness areas.',
        background: asset('border-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'public-safety-airspace-monitoring',
    breadcrumbLabel: 'Public Safety',
    stages: [
      {
        title: 'Fixed Strategic Grid',
        description: 'Fixed permanent sensing nodes—integrating RF, Radar, EO/IR, and RemoteID—are installed at landmarks and intersections to provide 24/7 urban monitoring. This networked grid feeds real-time data into a centralized Command Center (C2), creating an "electronic shield" for autonomous anomaly detection and city-wide early warning.',
        background: asset('public-safety-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Rapid Response',
        description: 'Patrol units utilize vehicle-mounted and man-portable "detect-and-strike" systems. When the grid triangulates a threat, the C2 Center dispatches the nearest mobile team. These units perform "last mile" intervention, surgically neutralizing platforms while apprehending pilots to eliminate unauthorized flights at the source.',
        background: asset('public-safety-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'correctional-facility-airspace-monitoring',
    breadcrumbLabel: 'Prison',
    stages: [
      {
        title: 'Strategic Base',
        description: 'Employs all-in-one detection and mitigation units mounted on strategic elevations for autonomous, facility-wide protection.',
        background: asset('correctional-facility-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Units',
        description: 'Provides patrol teams with portable devices to eliminate blind spots and leverage live pilot tracking for swift apprehension and source neutralization outside the prison walls.',
        background: asset('correctional-facility-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'port-airspace-monitoring',
    breadcrumbLabel: 'Port Security',
    stages: [
      {
        title: 'Fixed Infrastructure',
        description: 'Strategically mounted on high vantage points, this 24/7 all-weather foundation provides a tiered defense: detecting via radar/RF and confirming targets through EO/IR. It enables a graduated response, utilizing distributed RF interference and navigation signal manipulation to safely redirect or ground threats, ensuring comprehensive, non-kinetic protection for critical port assets.',
        background: asset('port-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Portable Reinforcement',
        description: 'Mobile units provide tactical agility through multi-carrier support, enabling rapid deployment on vehicles, vessels, or as man-portable devices. Every unit is networked to the central system, ensuring real-time coordination and a synchronized response across both land and sea.',
        background: asset('port-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'mass-event-airspace-monitoring',
    breadcrumbLabel: 'Mass Events',
    stages: [
      {
        title: 'Fixed Nodes',
        description: 'Semi-fixed tactical stations are strategically built at elevated vantage points—such as stadium rooftops, the upper floors of nearby hotels, or temporary onsite mobile towers—and are equipped as integrated units with RF detectors and RF interference.',
        background: asset('mass-event-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Mobile Units',
        description: 'Integrates vehicle-mounted command units—serving as temporary on-site command posts—with man-portable patrols equipped with handheld devices. This combination fills coverage gaps and delivers precision, non-kinetic intervention in high-density areas, ensuring seamless air security from wide-area surveillance to endpoint response.',
        background: asset('mass-event-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
  {
    handle: 'vip-private-property-airspace-monitoring',
    breadcrumbLabel: "VIP's and Private Property",
    stages: [
      {
        title: 'Tactical Support',
        description: 'Our Mobile Ensemble integrates covert systems into escort vehicles as hidden command hubs, paired with man-portable units. This enables rapid, synchronized platform detection and neutralization in a low-profile format.',
        background: asset('vip-private-property-airspace-monitoring', 1),
        productSet: 'mobile',
      },
      {
        title: 'Strategic Base',
        description: "RF platform sensors and omnidirectional suppressors are installed on rooftops or perimeter walls to create a 24/7 'Electronic Defense Dome.' This system ensure total privacy and automated protection without interfering with the VIP's domestic lifestyle.",
        background: asset('vip-private-property-airspace-monitoring', 2),
        productSet: 'fixed',
      },
    ],
  },
  {
    handle: 'enterprise-airspace-monitoring',
    breadcrumbLabel: 'Enterprises',
    stages: [
      {
        title: 'Strategic Base',
        description: "This is the 'Always-On' foundation for 24/7 campus protection. Strategically mounted on rooftops or dedicated towers, these units provide a persistent electronic 'dome' over the facility.",
        background: asset('enterprise-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Support',
        description: 'This provides "First Responder" flexibility for security patrols, utilizing man-portable devices to eliminate surveillance blind spots. Real-time data synchronization ensures teams can rapidly pinpoint pilot coordinates and neutralize threats at the source.',
        background: asset('enterprise-airspace-monitoring', 2),
        productSet: 'mobile',
      },
    ],
  },
];

const byHandle = new Map(pages.map((page) => [page.handle, page]));

export function getdefenseIndustryPageData(handle: string, locale = 'ru'): defenseIndustryPageData | null {
  const page = byHandle.get(handle);
  return page ? localizedefenseValue(locale, page) : null;
}

export const alldefenseIndustryPageHandles = pages.map((page) => page.handle);
