import {
  englishCuasSolutionCenterGroups,
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
  'uav-inspection-patrol',
  'uav-emergency-response',
]
  .map((id) => solutionCenterGroups.find((group) => group.id === id))
  .filter(Boolean) as typeof solutionCenterGroups[number][];
export const englishCuasCaseCenterSolutionGroups = englishCuasSolutionCenterGroups;

type EnglishCuasSolutionCenterGroupId = (typeof englishCuasSolutionCenterGroups)[number]['id'];

const CASE_GROUP_BY_HANDLE: Record<string, SolutionCenterGroupId> = {
  'anhui-flood-season-uav-patrol': 'uav-inspection-patrol',
  'ice-snow-emergency-uav-inspection': 'uav-inspection-patrol',
  'lidar-tree-obstruction-uav-inspection': 'uav-inspection-patrol',
  'southern-grid-wildfire-uav-inspection': 'uav-inspection-patrol',
  'wildfire-emergency-transmission-line-uav-patrol': 'uav-inspection-patrol',
  'zhaoqing-long-distance-power-line-uav-inspection': 'uav-inspection-patrol',
  'brazil-refinery-airspace-monitoring': 'critical-infrastructure-protection',
  'brazil-refinery-low-altitude-monitoring': 'critical-infrastructure-protection',
  'brazil-refinery-anti-uav': 'critical-infrastructure-protection',
  'nigeria-factory-airspace-monitoring': 'critical-infrastructure-protection',
  'nigeria-factory-low-altitude-monitoring': 'critical-infrastructure-protection',
  'nigeria-factory-anti-uav': 'critical-infrastructure-protection',
  'pakistan-power-plant-airspace-monitoring': 'critical-infrastructure-protection',
  'pakistan-power-plant-low-altitude-monitoring': 'critical-infrastructure-protection',
  'pakistan-power-plant-anti-uav': 'critical-infrastructure-protection',
  'water-conservancy-security': 'critical-infrastructure-protection',
  'airport-security-application': 'key-area-security',
  'asian-games-security': 'key-area-security',
};

const LEGACY_CATEGORY_TO_GROUP: Record<string, SolutionCenterGroupId> = {
  '01_BorderPatrol': 'uav-inspection-patrol',
  '02_InfrastructureProtection': 'critical-infrastructure-protection',
  '03_KeyAreaSecurity': 'key-area-security',
  '04_EmergencyRescue': 'uav-emergency-response',
};

const ENGLISH_CUAS_CASE_GROUP_BY_HANDLE: Record<string, EnglishCuasSolutionCenterGroupId> = {
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

export function getEnglishCuasCaseSolutionGroupId(item: CaseSolutionGroupInput): EnglishCuasSolutionCenterGroupId | undefined {
  if (!item.handle) return undefined;
  return ENGLISH_CUAS_CASE_GROUP_BY_HANDLE[item.handle];
}
