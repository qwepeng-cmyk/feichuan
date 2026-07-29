import {
  englishdefenseSolutionCenterGroups,
  solutionCenterGroups,
  type SolutionCenterGroupId,
} from './solutionCenterGroups';

interface CaseSolutionGroupInput {
  handle?: string;
  solution_category_id?: string;
}

export const caseSolutionGroups = solutionCenterGroups;
export const caseCenterSolutionGroups = [
  'critical-infrastructure-protection',
  'key-area-security',
  'aerial-platform-inspection-patrol',
  'aerial-platform-emergency-response',
]
  .map((id) => solutionCenterGroups.find((group) => group.id === id))
  .filter(Boolean) as typeof solutionCenterGroups[number][];
export const englishdefenseCaseCenterSolutionGroups = englishdefenseSolutionCenterGroups;

type EnglishdefenseSolutionCenterGroupId = (typeof englishdefenseSolutionCenterGroups)[number]['id'];

const CASE_GROUP_BY_HANDLE: Record<string, SolutionCenterGroupId> = {
  'anhui-flood-season-aerial-patrol': 'aerial-platform-inspection-patrol',
  'ice-snow-emergency-aerial-inspection': 'aerial-platform-inspection-patrol',
  'lidar-tree-obstruction-aerial-inspection': 'aerial-platform-inspection-patrol',
  'southern-grid-wildfire-aerial-inspection': 'aerial-platform-inspection-patrol',
  'wildfire-emergency-transmission-line-aerial-patrol': 'aerial-platform-inspection-patrol',
  'zhaoqing-long-distance-power-line-aerial-inspection': 'aerial-platform-inspection-patrol',
  'brazil-refinery-airspace-monitoring': 'critical-infrastructure-protection',
  'brazil-refinery-low-altitude-monitoring': 'critical-infrastructure-protection',
  'brazil-refinery-anti-aerial': 'critical-infrastructure-protection',
  'nigeria-factory-airspace-monitoring': 'critical-infrastructure-protection',
  'nigeria-factory-low-altitude-monitoring': 'critical-infrastructure-protection',
  'nigeria-factory-anti-aerial': 'critical-infrastructure-protection',
  'pakistan-power-plant-airspace-monitoring': 'critical-infrastructure-protection',
  'pakistan-power-plant-low-altitude-monitoring': 'critical-infrastructure-protection',
  'pakistan-power-plant-anti-aerial': 'critical-infrastructure-protection',
  'water-conservancy-security': 'critical-infrastructure-protection',
  'airport-security-application': 'key-area-security',
  'asian-games-security': 'key-area-security',
};

const LEGACY_CATEGORY_TO_GROUP: Record<string, SolutionCenterGroupId> = {
  '01_BorderPatrol': 'aerial-platform-inspection-patrol',
  '02_InfrastructureProtection': 'critical-infrastructure-protection',
  '03_KeyAreaSecurity': 'key-area-security',
  '04_EmergencyRescue': 'aerial-platform-emergency-response',
};

const ENGLISH_defense_CASE_GROUP_BY_HANDLE: Record<string, EnglishdefenseSolutionCenterGroupId> = {
  'airport-security-application': 'airports',
  'asian-games-security': 'mass-events',
  'water-conservancy-security': 'critical-infrastructure',
  'pakistan-power-plant-airspace-monitoring': 'power-plants',
  'pakistan-power-plant-low-altitude-monitoring': 'power-plants',
  'brazil-refinery-airspace-monitoring': 'critical-infrastructure',
  'brazil-refinery-low-altitude-monitoring': 'critical-infrastructure',
  'nigeria-factory-airspace-monitoring': 'enterprises',
  'nigeria-factory-low-altitude-monitoring': 'enterprises',
};

export function getCaseSolutionGroupId(item: CaseSolutionGroupInput): SolutionCenterGroupId | undefined {
  if (item.handle && CASE_GROUP_BY_HANDLE[item.handle]) {
    return CASE_GROUP_BY_HANDLE[item.handle];
  }

  const categoryId = item.solution_category_id;
  if (!categoryId) return undefined;

  if (solutionCenterGroups.some((group) => group.id === categoryId)) {
    return categoryId as SolutionCenterGroupId;
  }

  return LEGACY_CATEGORY_TO_GROUP[categoryId];
}

export function getEnglishdefenseCaseSolutionGroupId(item: CaseSolutionGroupInput): EnglishdefenseSolutionCenterGroupId | undefined {
  if (!item.handle) return undefined;
  return ENGLISH_defense_CASE_GROUP_BY_HANDLE[item.handle];
}
