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
        description: 'Uses continuous industrial sensing within documented power, network and environmental limits. Multi-sensor fusion helps filter industrial clutter, correlate tracks and provide location evidence for operator review.',
        background: asset('critical-infrastructure-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Emergency Response',
        description: 'Applies a documented escalation workflow in the core zone. Confirmed RF, radar and EO/IR observations are recorded and shared with authorized site teams for coordinated response under local procedures.',
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
        description: 'Provides a graduated monitoring workflow: passive RF sensing at the perimeter, radar tracking in managed sectors, EO/IR confirmation near critical assets and command-platform handoff for authorized response. Coverage and range depend on the documented test conditions and the final site layout.',
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
        description: 'Portable passive sensors supplement fixed airport infrastructure with flexible monitoring positions. Verified observations and location context help trained security personnel coordinate field checks under the airport response plan.',
        background: asset('airport-security-protection', 1),
        productSet: 'mobile',
      },
      {
        title: 'Strategic Foundation',
        description: 'The fixed-site architecture uses networked Remote ID, passive RF, radar and EO/IR sensors to reduce monitoring gaps. The command platform correlates observations and records operator decisions. Final coverage is established through an RF survey, line-of-sight review and acceptance testing; terrain, weather, target characteristics and local spectrum conditions can affect results.',
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
        description: 'Fixed monitoring nodes use passive RF and radar for wide-area observation, with EO/IR for visual verification. Automated alerts support operator review and documented coordination; usable range varies with terrain, mounting, weather, target signature and local RF conditions.',
        background: asset('border-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Agility',
        description: 'Vehicle-mounted and portable passive sensors support planned monitoring positions along remote stretches. They help field teams review gaps in fixed coverage and coordinate authorized checks using recorded observations.',
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
        description: 'Fixed RF, radar, EO/IR and Remote ID sensing nodes can support continuous urban monitoring within documented infrastructure limits. The network correlates observations in a command center for anomaly review, event records and coordinated early warning.',
        background: asset('public-safety-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Rapid Response',
        description: 'Vehicle-mounted and portable monitoring units give patrol teams local RF and visual context. When the command center confirms an event, it can dispatch the appropriate team and preserve the observation trail for authorized field response.',
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
        description: 'Uses fixed passive RF, radar and EO/IR sensors at reviewed elevations for facility monitoring and traceable event records.',
        background: asset('correctional-facility-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Units',
        description: 'Provides patrol teams with portable passive sensors to reduce monitoring gaps and review location evidence outside the prison perimeter. Results remain subject to site obstructions and local RF conditions.',
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
        description: 'Reviewed high-vantage positions support passive RF and radar observation with EO/IR confirmation. The command workflow records confirmed events for coordinated port response. Coverage depends on mounting, weather, sea clutter, target signature and acceptance-test conditions.',
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
        description: 'Semi-fixed monitoring stations can be placed at reviewed vantage points such as stadium rooftops or temporary towers and equipped with passive RF detectors, radar and EO/IR verification.',
        background: asset('mass-event-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Mobile Units',
        description: 'Vehicle-mounted command units and portable patrol sensors support temporary operating posts. The combination helps reduce coverage gaps, preserve event records and coordinate authorized response in high-density areas.',
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
        description: 'The mobile configuration links discreet vehicle-based command equipment with portable passive sensors for synchronized detection, verification and operator coordination.',
        background: asset('vip-private-property-airspace-monitoring', 1),
        productSet: 'mobile',
      },
      {
        title: 'Strategic Base',
        description: 'Passive RF, radar and EO/IR sensors can be installed at reviewed rooftop or perimeter positions for continuous monitoring within documented operating limits. Final placement follows a privacy, RF and line-of-sight survey.',
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
        description: 'Fixed passive sensors provide continuous campus monitoring within documented power, network and environmental limits. Rooftop or tower placement is confirmed by site survey and acceptance testing.',
        background: asset('enterprise-airspace-monitoring', 1),
        productSet: 'fixed',
      },
      {
        title: 'Tactical Support',
        description: 'Portable passive sensors provide flexible support for security patrols and help reduce monitoring gaps. Data synchronization gives teams location context and traceable records for coordinated field checks.',
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
