'use client';

import React, { useEffect, useState } from 'react';
import { Plus, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';

interface ComplianceTerm {
  id: number;
  term: string;
  replacement: string;
  locale: string;
  severity: string;
  is_enabled: number;
  note?: string;
}

export default function ComplianceAdminPage() {
  const [terms, setTerms] = useState<ComplianceTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTerm, setNewTerm] = useState({ term: '', replacement: '', locale: 'all', note: '' });

  const loadData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/compliance');
    const data = await res.json();
    if (data.success) {
      setTerms(data.data.terms);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTerm = async () => {
    if (!newTerm.term.trim()) return;
    setSaving(true);
    await fetch('/api/admin/compliance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'term', ...newTerm }),
    });
    setNewTerm({ term: '', replacement: '', locale: 'all', note: '' });
    await loadData();
    setSaving(false);
  };

  const toggleTerm = async (term: ComplianceTerm) => {
    setSaving(true);
    await fetch('/api/admin/compliance', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'term', ...term, is_enabled: term.is_enabled ? 0 : 1 }),
    });
    await loadData();
    setSaving(false);
  };

  const deleteTerm = async (id: number) => {
    if (!window.confirm('Delete this blocked term?')) return;
    setSaving(true);
    await fetch(`/api/admin/compliance?id=${id}`, { method: 'DELETE' });
    await loadData();
    setSaving(false);
  };

  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#1e293b', fontWeight: 700, margin: 0 }}>广告合规</h1>
          <p style={{ color: '#64748b', fontSize: '1.3rem', marginTop: '8px' }}>
            管理公开页面的屏蔽词与替换词。修改后需要重新 build/deploy 才会进入线上页面。
          </p>
        </div>
        <button onClick={loadData} disabled={saving} style={buttonStyle('#f8fafc', '#334155', '#dbe3ef')}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <section style={panelStyle}>
        <h2 style={sectionTitleStyle}><ShieldCheck size={18} /> 屏蔽词管理</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 1.2fr auto', gap: '10px', marginBottom: '14px' }}>
          <input value={newTerm.term} onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })} placeholder="屏蔽词，如 jammer" style={inputStyle} />
          <input value={newTerm.replacement} onChange={(e) => setNewTerm({ ...newTerm, replacement: e.target.value })} placeholder="替换词，如 RF scanner" style={inputStyle} />
          <select value={newTerm.locale} onChange={(e) => setNewTerm({ ...newTerm, locale: e.target.value })} style={inputStyle}>
            <option value="all">All</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
          <input value={newTerm.note} onChange={(e) => setNewTerm({ ...newTerm, note: e.target.value })} placeholder="备注" style={inputStyle} />
          <button onClick={addTerm} disabled={saving} style={buttonStyle('#2563eb', '#fff', '#2563eb')}>
            <Plus size={16} /> Add
          </button>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <Th>屏蔽词</Th>
              <Th>替换词</Th>
              <Th>语言</Th>
              <Th>备注</Th>
              <Th>状态</Th>
              <Th align="right">操作</Th>
            </tr>
          </thead>
          <tbody>
            {terms.map((term) => (
              <tr key={term.id} style={rowStyle}>
                <Td>{term.term}</Td>
                <Td>{term.replacement || '-'}</Td>
                <Td>{term.locale}</Td>
                <Td>{term.note || '-'}</Td>
                <Td>
                  <button onClick={() => toggleTerm(term)} style={pillStyle(term.is_enabled ? 'enabled' : 'disabled')}>
                    {term.is_enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </Td>
                <Td align="right">
                  <button onClick={() => deleteTerm(term.id)} style={iconButtonStyle} aria-label="Delete term">
                    <Trash2 size={15} />
                  </button>
                </Td>
              </tr>
            ))}
            {terms.length === 0 && (
              <tr style={rowStyle}>
                <Td>暂无自定义屏蔽词</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td align="right">-</Td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <th style={{ padding: '12px 14px', color: '#64748b', fontWeight: 700, fontSize: '1.2rem', textAlign: align }}>{children}</th>;
}

function Td({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return <td style={{ padding: '12px 14px', color: '#334155', fontSize: '1.25rem', textAlign: align, verticalAlign: 'middle' }}>{children}</td>;
}

const panelStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e8ecf1',
  borderRadius: '12px',
  boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
  padding: '18px',
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '1.55rem',
  color: '#1e293b',
  margin: '0 0 16px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '38px',
  border: '1px solid #dbe3ef',
  borderRadius: '8px',
  padding: '0 10px',
  color: '#334155',
  background: '#fff',
  fontSize: '1.25rem',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
};

const rowStyle: React.CSSProperties = {
  borderTop: '1px solid #eef2f7',
};

const iconButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '34px',
  height: '34px',
  border: '1px solid #fecdd3',
  color: '#be123c',
  background: '#fff1f2',
  borderRadius: '8px',
  cursor: 'pointer',
};

function buttonStyle(background: string, color: string, border: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    minWidth: '88px',
    height: '38px',
    padding: '0 14px',
    background,
    color,
    border: `1px solid ${border}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.25rem',
    fontWeight: 700,
  };
}

function pillStyle(status: 'enabled' | 'disabled'): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '92px',
    height: '28px',
    padding: '0 10px',
    borderRadius: '999px',
    border: `1px solid ${status === 'enabled' ? '#bbf7d0' : '#fecdd3'}`,
    background: status === 'enabled' ? '#f0fdf4' : '#fff1f2',
    color: status === 'enabled' ? '#15803d' : '#be123c',
    fontSize: '1.15rem',
    fontWeight: 700,
  };
}
