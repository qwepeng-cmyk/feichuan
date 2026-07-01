interface CaseDisplayItem {
  handle?: string;
  title_en?: string;
}

const UAV_CASE_ORDER = [
  'anhui-flood-season-uav-patrol',
  'ice-snow-emergency-uav-inspection',
  'lidar-tree-obstruction-uav-inspection',
  'southern-grid-wildfire-uav-inspection',
  'wildfire-emergency-transmission-line-uav-patrol',
  'zhaoqing-long-distance-power-line-uav-inspection',
];

const DETECTION_CASE_ORDER = [
  'airport-security-application',
  'asian-games-security',
  'water-conservancy-security',
  'pakistan-power-plant-low-altitude-monitoring',
  'brazil-refinery-low-altitude-monitoring',
  'nigeria-factory-low-altitude-monitoring',
  'pakistan-power-plant-anti-uav',
  'brazil-refinery-anti-uav',
  'nigeria-factory-anti-uav',
];

const CASE_DISPLAY_ORDER = new Map<string, number>(
  [...DETECTION_CASE_ORDER, ...UAV_CASE_ORDER].map((handle, index) => [handle, index])
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
