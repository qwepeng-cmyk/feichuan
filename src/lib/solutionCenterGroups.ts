export const solutionCenterGroups = [
  {
    id: 'aerial-platform-inspection-patrol',
    labelKey: 'aerialInspectionPatrol',
    fallbackLabel: 'Aerial Platform Inspection & Patrol',
    eyebrowKey: 'aerialIndustryApplications',
    fallbackEyebrow: 'Aerial Platform Industry Applications',
    descriptionKey: 'aerialInspectionPatrolDesc',
    fallbackDescription: 'Recurring aerial patrol, corridor inspection, and field monitoring for utilities, water resources, coastal teams, and industrial assets.',
    categoryHref: undefined,
    handles: [
      'power-line-aerial-platform-intelligent-inspection-solution',
      'smart-substation-unattended-aerial-platform-inspection-solution',
      'water-conservancy-river-lake-aerial-platform-monitoring-solution',
      'aerial-platform-maritime-patrol',
    ],
  },
  {
    id: 'aerial-platform-emergency-response',
    labelKey: 'aerialEmergencyResponse',
    fallbackLabel: 'Aerial Platform Emergency Response',
    eyebrowKey: 'aerialIndustryApplications',
    fallbackEyebrow: 'Aerial Platform Industry Applications',
    descriptionKey: 'aerialEmergencyResponseDesc',
    fallbackDescription: 'Rapid aerial response for firefighting support, search and rescue, post-disaster communications, and night emergency lighting.',
    categoryHref: undefined,
    handles: [
      'urban-high-rise-firefighting-emergency-aerial-platform-solution',
      'disaster-site-search-rescue-reconnaissance-aerial-platform-solution',
      'post-disaster-emergency-communication-support-aerial-platform-solution',
      'night-emergency-lighting-support-aerial-platform-solution',
    ],
  },
  {
    id: 'critical-infrastructure-protection',
    labelKey: 'criticalInfrastructure',
    fallbackLabel: 'Critical Infrastructure Protection',
    eyebrowKey: 'infrastructure',
    fallbackEyebrow: 'Infrastructure Protection',
    descriptionKey: 'criticalInfrastructureDesc',
    fallbackDescription: 'Aerial platform inspection, airspace monitoring, and perimeter intelligence for energy, petrochemical, water-conservancy, and industrial facilities.',
    categoryHref: '/solutions/category/02_InfrastructureProtection',
    handles: [
      'chemical-plant-protection',
      'oil-production-base-protection',
      'hydroelectric-dam-protection',
    ],
  },
  {
    id: 'key-area-security',
    labelKey: 'keyAreaSecurity',
    fallbackLabel: 'Key Area Security',
    eyebrowKey: 'keyArea',
    fallbackEyebrow: 'Key Area Security',
    descriptionKey: 'keyAreaSecurityDesc',
    fallbackDescription: 'Security screening, EO/IR monitoring, and low-altitude airspace awareness for judicial sites, major events, airport checkpoints, and transport hubs.',
    categoryHref: '/solutions/category/03_KeyAreaSecurity',
    handles: [
      'judicial-sector-security',
      'sports-event-security',
      'airport-security-protection',
    ],
  },
] as const;

export const englishDefenseSolutionCenterGroups = [
  { id: 'critical-infrastructure', labelKey: 'defenseCriticalInfrastructure', fallbackLabel: 'Critical Infrastructure', eyebrowKey: 'infrastructure', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseCriticalInfrastructureDesc', fallbackDescription: 'Layered airspace awareness for essential facilities and complex industrial perimeters.', categoryHref: undefined, handles: ['critical-infrastructure-airspace-monitoring'] },
  { id: 'power-plants', labelKey: 'defensePowerPlants', fallbackLabel: 'Power Plants', eyebrowKey: 'infrastructure', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defensePowerPlantsDesc', fallbackDescription: 'Continuous monitoring for generation sites, switchyards, dams and renewable assets.', categoryHref: undefined, handles: ['power-plant-airspace-monitoring'] },
  { id: 'airports', labelKey: 'defenseAirports', fallbackLabel: 'Airports', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseAirportsDesc', fallbackDescription: 'Multi-sensor airport perimeter and approach-area awareness with operator verification.', categoryHref: undefined, handles: ['airport-security-protection'] },
  { id: 'borders', labelKey: 'defenseBorders', fallbackLabel: 'Borders', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseBordersDesc', fallbackDescription: 'Fixed, mobile and portable monitoring for remote sectors and changing field operations.', categoryHref: undefined, handles: ['border-airspace-monitoring'] },
  { id: 'public-safety', labelKey: 'defensePublicSafety', fallbackLabel: 'Public Safety', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defensePublicSafetyDesc', fallbackDescription: 'Deployable airspace awareness for municipal operations and temporary public-security zones.', categoryHref: undefined, handles: ['public-safety-airspace-monitoring'] },
  { id: 'prisons', labelKey: 'defensePrisons', fallbackLabel: 'Prisons', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defensePrisonsDesc', fallbackDescription: 'Persistent perimeter monitoring for correctional and detention facilities.', categoryHref: undefined, handles: ['correctional-facility-airspace-monitoring'] },
  { id: 'ports', labelKey: 'defensePorts', fallbackLabel: 'Port Security', eyebrowKey: 'infrastructure', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defensePortsDesc', fallbackDescription: 'Coastal and terminal airspace awareness for ports, harbors and logistics zones.', categoryHref: undefined, handles: ['port-airspace-monitoring'] },
  { id: 'mass-events', labelKey: 'defenseMassEvents', fallbackLabel: 'Mass Events', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseMassEventsDesc', fallbackDescription: 'Rapidly deployable monitoring for stadiums, festivals and major gatherings.', categoryHref: undefined, handles: ['mass-event-airspace-monitoring'] },
  { id: 'vip-private-property', labelKey: 'defenseVipPrivateProperty', fallbackLabel: 'VIP & Private Property', eyebrowKey: 'keyArea', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseVipPrivatePropertyDesc', fallbackDescription: 'Discreet fixed, portable or mobile awareness for private and temporary locations.', categoryHref: undefined, handles: ['vip-private-property-airspace-monitoring'] },
  { id: 'enterprises', labelKey: 'defenseEnterprises', fallbackLabel: 'Enterprises', eyebrowKey: 'infrastructure', fallbackEyebrow: 'Low-Altitude Defense Applications', descriptionKey: 'defenseEnterprisesDesc', fallbackDescription: 'Configurable monitoring for factories, campuses, warehouses and research facilities.', categoryHref: undefined, handles: ['enterprise-airspace-monitoring'] },
] as const;

export const englishdefenseSolutionCenterGroups = englishDefenseSolutionCenterGroups;

export type SolutionCenterGroupId = (typeof solutionCenterGroups)[number]['id'];

export const solutionCenterImageByHandle: Record<string, string> = {
  'power-line-aerial-platform-intelligent-inspection-solution': '/solutions/solutions/Power Line Aerial Platform Intelligent Inspection.webp',
  'smart-substation-unattended-aerial-platform-inspection-solution': '/solutions/solutions/Smart Substation Unattended Inspection.webp',
  'water-conservancy-river-lake-aerial-platform-monitoring-solution': '/solutions/solutions/Water Conservancy & River-Lake Monitoring.webp',
  'aerial-platform-maritime-patrol': '/solutions/solutions/border-patrol-coastal-monitoring.webp',
  'urban-high-rise-firefighting-emergency-aerial-platform-solution': '/solutions/solutions/Urban High-Rise Firefighting & Rescue.webp',
  'disaster-site-search-rescue-reconnaissance-aerial-platform-solution': '/solutions/solutions/Disaster-Site Search, Rescue & Reconnaissance.webp',
  'post-disaster-emergency-communication-support-aerial-platform-solution': '/solutions/solutions/Post-Disaster Emergency Communication Support.webp',
  'night-emergency-lighting-support-aerial-platform-solution': '/solutions/solutions/Night Emergency Lighting Support.webp',
  'chemical-plant-protection': '/cases/brazil-refinery-airspace-monitoring/main-home.webp',
  'oil-production-base-protection': '/cases/pakistan-power-plant-airspace-monitoring/main-home.webp',
  'sports-event-security': '/cases/asian-games-security/main.webp',
  'airport-security-protection': '/solutions/defense-applications/airport-security-protection/hero.webp',
  'critical-infrastructure-airspace-monitoring': '/solutions/defense-applications/critical-infrastructure-airspace-monitoring/hero.webp',
  'power-plant-airspace-monitoring': '/solutions/defense-applications/power-plant-airspace-monitoring/hero.webp',
  'border-airspace-monitoring': '/solutions/defense-applications/border-airspace-monitoring/hero.webp',
  'public-safety-airspace-monitoring': '/solutions/defense-applications/public-safety-airspace-monitoring/hero.webp',
  'correctional-facility-airspace-monitoring': '/solutions/defense-applications/correctional-facility-airspace-monitoring/hero.webp',
  'port-airspace-monitoring': '/solutions/defense-applications/port-airspace-monitoring/hero.webp',
  'mass-event-airspace-monitoring': '/solutions/defense-applications/mass-event-airspace-monitoring/hero.webp',
  'vip-private-property-airspace-monitoring': '/solutions/defense-applications/vip-private-property-airspace-monitoring/hero.webp',
  'enterprise-airspace-monitoring': '/solutions/defense-applications/enterprise-airspace-monitoring/hero.webp',
};

export const solutionCenterCardImageByHandle: Record<string, string> = {
  'critical-infrastructure-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/01 Critical Infrastructure.webp',
  'power-plant-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/02 Power Plants.webp',
  'airport-security-protection': '/solutions/defense-applications/defense_solution_center/03 Airports.webp',
  'border-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/04 Borders.webp',
  'public-safety-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/05 Public Safety.webp',
  'correctional-facility-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/06 Prisons.webp',
  'port-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/07 Ports.webp',
  'mass-event-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/08 Mass Events.webp',
  'vip-private-property-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/09 VIPs & Private Property.webp',
  'enterprise-airspace-monitoring': '/solutions/defense-applications/defense_solution_center/10 Enterprises.webp',
};
