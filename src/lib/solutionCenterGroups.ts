export const solutionCenterGroups = [
  {
    id: 'uav-inspection-patrol',
    labelKey: 'uavInspectionPatrol',
    fallbackLabel: 'UAV Inspection & Patrol',
    eyebrowKey: 'uavIndustryApplications',
    fallbackEyebrow: 'UAV Industry Applications',
    descriptionKey: 'uavInspectionPatrolDesc',
    fallbackDescription: 'Recurring aerial patrol, corridor inspection, and field monitoring workflows for utilities, water resources, and coastal operations.',
    categoryHref: undefined,
    handles: [
      'power-line-uav-intelligent-inspection-solution',
      'smart-substation-unattended-uav-inspection-solution',
      'water-conservancy-river-lake-uav-monitoring-solution',
      'uav-maritime-patrol',
    ],
  },
  {
    id: 'uav-emergency-response',
    labelKey: 'uavEmergencyResponse',
    fallbackLabel: 'UAV Emergency Response',
    eyebrowKey: 'uavIndustryApplications',
    fallbackEyebrow: 'UAV Industry Applications',
    descriptionKey: 'uavEmergencyResponseDesc',
    fallbackDescription: 'Rapid aerial response for firefighting support, search and rescue, post-disaster communications, and night emergency lighting.',
    categoryHref: undefined,
    handles: [
      'urban-high-rise-firefighting-emergency-uav-solution',
      'disaster-site-search-rescue-reconnaissance-uav-solution',
      'post-disaster-emergency-communication-support-uav-solution',
      'night-emergency-lighting-support-uav-solution',
    ],
  },
  {
    id: 'critical-infrastructure-protection',
    labelKey: 'criticalInfrastructure',
    fallbackLabel: 'Critical Infrastructure Protection',
    eyebrowKey: 'infrastructure',
    fallbackEyebrow: 'Infrastructure Protection',
    descriptionKey: 'criticalInfrastructureDesc',
    fallbackDescription: 'Airspace monitoring and perimeter intelligence for energy, petrochemical, and water-conservancy facilities.',
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
    fallbackDescription: 'Integrated security workflows for judicial sites, major events, airport checkpoints, and transport hubs.',
    categoryHref: '/solutions/category/03_KeyAreaSecurity',
    handles: [
      'judicial-sector-security',
      'sports-event-security',
      'airport-security-protection',
    ],
  },
] as const;

export type SolutionCenterGroupId = (typeof solutionCenterGroups)[number]['id'];

export const solutionCenterImageByHandle: Record<string, string> = {
  'power-line-uav-intelligent-inspection-solution': '/solutions/solutions/Power Line UAV Intelligent Inspection.webp',
  'smart-substation-unattended-uav-inspection-solution': '/solutions/solutions/Smart Substation Unattended Inspection.webp',
  'water-conservancy-river-lake-uav-monitoring-solution': '/solutions/solutions/Water Conservancy & River-Lake Monitoring.webp',
  'uav-maritime-patrol': '/solutions/solutions/border-patrol-coastal-monitoring.webp',
  'urban-high-rise-firefighting-emergency-uav-solution': '/solutions/solutions/Urban High-Rise Firefighting & Rescue.webp',
  'disaster-site-search-rescue-reconnaissance-uav-solution': '/solutions/solutions/Disaster-Site Search, Rescue & Reconnaissance.webp',
  'post-disaster-emergency-communication-support-uav-solution': '/solutions/solutions/Post-Disaster Emergency Communication Support.webp',
  'night-emergency-lighting-support-uav-solution': '/solutions/solutions/Night Emergency Lighting Support.webp',
};
