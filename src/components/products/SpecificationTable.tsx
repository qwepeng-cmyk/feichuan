import React from 'react';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function stringifySpecValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== null && item !== undefined && String(item).trim())
      .map((item) => String(item).trim())
      .join(' / ');
  }
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
}

function hasSpecValue(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasSpecValue);
  if (isPlainObject(value)) return Object.values(value).some(hasSpecValue);
  return stringifySpecValue(value).trim().length > 0;
}

function isMatrix(value: unknown): value is unknown[][] {
  return Array.isArray(value) && value.length > 0 && value.every((row) =>
    Array.isArray(row) && row.every((cell) => !Array.isArray(cell) && !isPlainObject(cell))
  );
}

function isPrimitiveList(value: unknown[]): boolean {
  return value.every((item) => !Array.isArray(item) && !isPlainObject(item));
}

function isAuxiliaryKey(key: string) {
  return ['原图文件', '审计', '_sections', 'Source Image', 'Исходное изображение', 'Imagen original', 'Audit', 'Проверка', 'Auditoría'].includes(key);
}

function isTableDataKey(key: string) {
  return ['表格数据', 'Table Data', 'Табличные данные', 'Datos de tabla'].includes(key);
}

function sectionTitleStyle(): React.CSSProperties {
  return {
    margin: '0 0 18px',
    color: '#1f2a44',
    fontSize: '2.1rem',
    fontWeight: 800,
    borderLeft: '4px solid #315ba4',
    paddingLeft: '14px',
  };
}

function renderMatrixTable(rows: unknown[][], keyPrefix: string) {
  const maxCols = Math.max(...rows.map((row) => row.length));
  const normalized = rows
    .map((row) => [...row, ...Array(Math.max(0, maxCols - row.length)).fill('')])
    .filter((row) => row.some((cell) => stringifySpecValue(cell).trim()));

  if (!normalized.length) return null;
  const compactTable = maxCols > 8;

  return (
    <div key={keyPrefix} style={{ border: '1px solid #e5ebf3', marginBottom: '24px', overflow: 'hidden' }}>
      <table className="spec-table" style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
        <tbody>
          {normalized.slice(0, 120).map((row, rowIndex) => {
            const nonEmptyCount = row.filter((cell) => stringifySpecValue(cell).trim()).length;
            const isHeaderRow = rowIndex === 0 || nonEmptyCount >= Math.max(2, Math.floor(maxCols / 2));
            return (
              <tr key={`${keyPrefix}-${rowIndex}`} style={{ background: isHeaderRow ? '#f4f7fa' : rowIndex % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #e5ebf3' }}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      padding: compactTable ? '8px 6px' : '10px 8px',
                      fontSize: compactTable ? '1rem' : '1.2rem',
                      color: '#263241',
                      fontWeight: isHeaderRow ? 700 : 500,
                      borderRight: '1px solid #e5ebf3',
                      whiteSpace: 'normal',
                      overflowWrap: 'anywhere',
                      wordBreak: 'normal',
                      lineHeight: 1.35,
                      verticalAlign: 'middle',
                    }}
                  >
                    {stringifySpecValue(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function renderKeyValueTable(entries: [string, unknown][], keyPrefix: string, parameterLabel: string, descriptionLabel: string) {
  const rows = entries.filter(([key, value]) => !isAuxiliaryKey(key) && hasSpecValue(value));
  if (!rows.length) return null;

  return (
    <div key={keyPrefix} style={{ border: '1px solid #e5ebf3', overflow: 'hidden', marginBottom: '24px' }}>
      <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
            <th style={{ padding: '16px 22px', textAlign: 'left', fontSize: '1.45rem', fontWeight: 800, width: '34%', overflowWrap: 'anywhere', wordBreak: 'normal' }}>{parameterLabel}</th>
            <th style={{ padding: '16px 22px', textAlign: 'left', fontSize: '1.45rem', fontWeight: 800, overflowWrap: 'anywhere', wordBreak: 'normal' }}>{descriptionLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([param, value], idx) => (
            <tr key={`${keyPrefix}-${param}-${idx}`} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '15px 22px', fontWeight: 700, fontSize: '1.35rem', color: '#263241', verticalAlign: 'top', overflowWrap: 'anywhere', wordBreak: 'normal' }}>{param}</td>
              <td style={{ padding: '15px 22px', fontSize: '1.35rem', color: '#475569', lineHeight: 1.55, overflowWrap: 'anywhere', wordBreak: 'normal' }}>{renderValue(value, `${keyPrefix}-${param}`, parameterLabel, descriptionLabel)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderTestData(value: Record<string, unknown>, keyPrefix: string) {
  const tableEntry = Object.entries(value).find(([key]) => isTableDataKey(key));
  const tableData = tableEntry?.[1];
  if (!Array.isArray(tableData)) return null;

  if (isMatrix(tableData)) {
    return renderMatrixTable(tableData, keyPrefix);
  }

  return tableData
    .map((item, index) => {
      if (isMatrix(item)) return renderMatrixTable(item, `${keyPrefix}-${index}`);
      if (!isPlainObject(item)) return null;
      const rows = Object.entries(item).find(([key]) => isTableDataKey(key))?.[1];
      if (!isMatrix(rows)) return null;
      return renderMatrixTable(rows, `${keyPrefix}-${index}`);
    })
    .filter(Boolean);
}

function looksLikeTestData(value: unknown) {
  return isPlainObject(value) && Object.keys(value).some(isTableDataKey);
}

function renderValue(value: unknown, keyPrefix: string, parameterLabel: string, descriptionLabel: string): React.ReactNode {
  if (isMatrix(value)) return renderMatrixTable(value, keyPrefix);
  if (Array.isArray(value)) {
    if (isPrimitiveList(value)) return stringifySpecValue(value);
    return value
      .map((item, index) => renderValue(item, `${keyPrefix}-${index}`, parameterLabel, descriptionLabel))
      .filter(Boolean);
  }
  if (isPlainObject(value)) {
    const testData = renderTestData(value, keyPrefix);
    if (testData) return testData;
    return renderKeyValueTable(Object.entries(value), keyPrefix, parameterLabel, descriptionLabel);
  }
  return stringifySpecValue(value);
}

function renderSection(
  title: string,
  value: unknown,
  keyPrefix: string,
  parameterLabel: string,
  descriptionLabel: string
) {
  if (looksLikeTestData(value)) {
    const content = renderTestData(value as Record<string, unknown>, keyPrefix);
    if (!content) return null;
    return (
      <section key={keyPrefix} style={{ marginBottom: '42px' }}>
        <h3 style={sectionTitleStyle()}>{title}</h3>
        {content}
      </section>
    );
  }

  const content = renderValue(value, keyPrefix, parameterLabel, descriptionLabel);
  if (!content) return null;

  return (
    <section key={keyPrefix} style={{ marginBottom: '42px' }}>
      <h3 style={sectionTitleStyle()}>{title}</h3>
      {content}
    </section>
  );
}

function shouldRenderAsSections(parameters: Record<string, unknown>) {
  return Object.values(parameters).some((value) => {
    if (isMatrix(value)) return true;
    if (isPlainObject(value)) return true;
    return Array.isArray(value) && !isPrimitiveList(value);
  });
}

export default function SpecificationTable({
  parameters,
  parameterLabel,
  descriptionLabel,
}: {
  parameters: unknown;
  parameterLabel: string;
  descriptionLabel: string;
}) {
  if (!parameters) return null;

  if (isMatrix(parameters)) {
    return renderMatrixTable(parameters, 'matrix-root');
  }

  if (!isPlainObject(parameters) || Object.keys(parameters).length === 0) {
    return null;
  }

  if (!shouldRenderAsSections(parameters)) {
    return renderKeyValueTable(Object.entries(parameters), 'root', parameterLabel, descriptionLabel);
  }

  const sections = Object.entries(parameters)
    .filter(([, value]) => hasSpecValue(value))
    .map(([title, value], index) => renderSection(title, value, `section-${index}`, parameterLabel, descriptionLabel))
    .filter(Boolean);

  return <div>{sections}</div>;
}
