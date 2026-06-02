export type ParamGrid = string[][];

export function valueToParamCell(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return JSON.stringify(value);
}

function parseParamCell(value: string): unknown {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return value;

    try {
        return JSON.parse(trimmed);
    } catch {
        return value;
    }
}

export function paramsToGrid(value: unknown, headers: [string, string]): ParamGrid {
    if (Array.isArray(value)) {
        return value.length > 0
            ? value.map(row => Array.isArray(row) ? row.map(valueToParamCell) : [valueToParamCell(row)])
            : [headers, ['', '']];
    }

    if (value && typeof value === 'object') {
        return [
            headers,
            ...Object.entries(value as Record<string, unknown>).map(([key, cellValue]) => [
                key,
                valueToParamCell(cellValue),
            ]),
        ];
    }

    return [headers, ['', '']];
}

export function gridToParams(grid: ParamGrid): unknown {
    if (!Array.isArray(grid) || grid.length === 0) return {};
    const [, ...rows] = grid;

    if (grid[0]?.length === 2) {
        return rows.reduce<Record<string, unknown>>((acc, row) => {
            const key = row[0]?.trim();
            if (!key) return acc;
            acc[key] = parseParamCell(row[1] || '');
            return acc;
        }, {});
    }

    return grid.map(row => row.map(cell => parseParamCell(cell || '')));
}
