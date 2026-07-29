interface CaseDisplayItem {
  handle?: string;
  title_en?: string;
}

const AERIAL_PLATFORM_CASE_ORDER = [
  'anhui-flood-season-aerial-patrol',
  'ice-snow-emergency-aerial-inspection',
  'lidar-tree-obstruction-aerial-inspection',
  'southern-grid-wildfire-aerial-inspection',
  'wildfire-emergency-transmission-line-aerial-patrol',
  'zhaoqing-long-distance-power-line-aerial-inspection',
];

const CRITICAL_INFRASTRUCTURE_CASE_ORDER = [
  'water-conservancy-security',
  'pakistan-power-plant-low-altitude-monitoring',
  'pakistan-power-plant-airspace-monitoring',
  'brazil-refinery-low-altitude-monitoring',
  'brazil-refinery-airspace-monitoring',
  'nigeria-factory-low-altitude-monitoring',
  'nigeria-factory-airspace-monitoring',
];

const KEY_AREA_SECURITY_CASE_ORDER = [
  'airport-security-application',
  'asian-games-security',
];

const CASE_DISPLAY_ORDER = new Map<string, number>(
  [...CRITICAL_INFRASTRUCTURE_CASE_ORDER, ...KEY_AREA_SECURITY_CASE_ORDER, ...AERIAL_PLATFORM_CASE_ORDER].map((handle, index) => [handle, index])
);

export function getCaseDisplayRank(item: CaseDisplayItem) {
  if (!item.handle) return 1000;
  return CASE_DISPLAY_ORDER.get(item.handle) ?? 1000;
}

export function orderCasesForCasesPage<T extends CaseDisplayItem>(items: T[]) {
  return [...items].sort((a, b) => {
    const rankDiff = getCaseDisplayRank(a) - getCaseDisplayRank(b);
    if (rankDiff !== 0) return rankDiff;

    return (a.title_en || a.handle || '').localeCompare(b.title_en || b.handle || '');
  });
}
