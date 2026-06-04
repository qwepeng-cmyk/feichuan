import React from 'react';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function stringifySpecValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(', ');
  }
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
}

function hasSpecValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0;
  if (isPlainObject(value)) return Object.keys(value).length > 0;
  return stringifySpecValue(value).trim().length > 0;
}

function renderRows(parameters: Record<string, unknown>, depth = 0): React.ReactNode[] {
  return Object.entries(parameters)
    .filter(([, value]) => hasSpecValue(value))
    .flatMap(([param, value], idx) => {
      if (isPlainObject(value)) {
        return [
          <tr key={`${param}-group`} style={{ background: '#f4f7fa', borderBottom: '1px solid #e5ebf3' }}>
            <td
              colSpan={2}
              style={{
                padding: depth > 0 ? '16px 30px 16px 44px' : '18px 30px',
                fontSize: '1.55rem',
                fontWeight: 800,
                color: '#1f2a44',
              }}
            >
              {param}
            </td>
          </tr>,
          ...renderRows(value, depth + 1),
        ];
      }

      return [
        <tr key={`${param}-${idx}`} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #eee' }}>
          <td style={{ padding: '18px 30px', fontWeight: 700, width: '42%', fontSize: '1.45rem', color: '#263241' }}>{param}</td>
          <td style={{ padding: '18px 30px', fontSize: '1.45rem', color: '#475569' }}>{stringifySpecValue(value)}</td>
        </tr>,
      ];
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

  if (Array.isArray(parameters) && parameters.length > 0) {
    return (
      <div style={{ border: '1px solid #eee', overflowX: 'auto' }}>
        <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
              {(parameters[0] as unknown[]).map((cell, ci) => (
                <th key={ci} style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold', borderRight: '1px solid #eee' }}>{String(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parameters.slice(1, 80).map((row: unknown, ri: number) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #eee' }}>
                {(Array.isArray(row) ? row : [row]).map((cell, ci) => (
                  <td key={ci} style={{ padding: '18px 30px', fontSize: '1.45rem', borderRight: '1px solid #eee' }}>{String(cell ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!isPlainObject(parameters) || Object.keys(parameters).length === 0) {
    return null;
  }

  return (
    <div style={{ border: '1px solid #eee', overflowX: 'auto' }}>
      <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr style={{ background: '#f4f7fa', color: '#333', borderBottom: '2px solid #315ba4' }}>
            <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{parameterLabel}</th>
            <th style={{ padding: '20px 30px', textAlign: 'left', fontSize: '1.6rem', fontWeight: 'bold' }}>{descriptionLabel}</th>
          </tr>
        </thead>
        <tbody>{renderRows(parameters)}</tbody>
      </table>
    </div>
  );
}
