'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Eye, EyeOff, Plus, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';

const layerStyles: Record<string, { background: string; color: string; border: string }> = {
    A: { background: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    B: { background: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    C: { background: '#fff1f2', color: '#be123c', border: '#fecdd3' },
};

export default function CasesPage() {
    const [cases, setCases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/cases')
            .then(res => res.json())
            .then(data => {
                if (data.success) setCases(data.data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (handle: string) => {
        const confirmCode = prompt('This action cannot be undone. Type "DELETE" to remove this case.');
        if (confirmCode !== 'DELETE') return;
        const res = await fetch(`/api/admin/cases/${handle}`, { method: 'DELETE' });
        if (res.ok) {
            setCases(cases.filter(item => item.handle !== handle));
        }
    };

    const handleTogglePublished = async (caseItem: any, nextPublished: boolean) => {
        const itemName = caseItem.title_en || caseItem.handle;
        const actionText = nextPublished ? '上架' : '下架';
        const confirmed = window.confirm(`确认要${actionText}这个案例吗？\n\n${itemName}`);

        if (!confirmed) return;

        const res = await fetch(`/api/admin/cases/${caseItem.handle}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_published: nextPublished ? 1 : 0 }),
        });
        const data = await res.json();

        if (data.success) {
            setCases(cases.map((item) => (
                item.handle === caseItem.handle ? { ...item, is_published: data.is_published } : item
            )));
        } else {
            alert(data.error || 'Status update failed');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2.0rem', color: '#1e293b', fontWeight: 700, letterSpacing: '-0.2px' }}>Case Management</h1>
                <Link href="/admin/cases/new" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '9px 18px', backgroundColor: '#3b82f6', color: '#fff',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1.3rem',
                    boxShadow: '0 1px 3px rgba(59,130,246,0.3)', transition: 'all 0.2s'
                }}>
                    <Plus size={18} /> New Case
                </Link>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #e8ecf1' }}>
                {loading ? <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>Loading...</div> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #edf0f4' }}>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>Image</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>Case</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>Region</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>Compliance Layer</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>Status</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((caseItem) => {
                                const published = caseItem.is_published !== 0 && caseItem.is_published !== false;
                                const publicVisible = caseItem.is_public_visible !== false;
                                const restricted = caseItem.compliance_tier === 'restricted';
                                const layerStyle = layerStyles[caseItem.compliance_layer] || layerStyles.A;

                                return (
                                    <tr
                                        key={caseItem.handle}
                                        style={{ borderBottom: '1px solid #f4f6f8', transition: 'background 0.15s', opacity: published ? 1 : 0.72 }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafbfd')}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                    >
                                        <td style={{ padding: '14px 22px' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={caseItem.main_image || '/logo1-small.webp'} alt={caseItem.title_en} style={{ width: '72px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #edf0f4' }} />
                                        </td>
                                        <td style={{ padding: '14px 22px' }}>
                                            <div style={{ fontWeight: 600, color: '#334155', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '3px' }}>
                                                {caseItem.title_en}
                                            </div>
                                            <div style={{ fontSize: '1.2rem', color: '#a0aec0', fontWeight: 400 }}>{caseItem.handle}</div>
                                        </td>
                                        <td style={{ padding: '14px 22px' }}>
                                            <span style={{ display: 'inline-block', padding: '4px 10px', backgroundColor: '#f0f4f8', color: '#5a6b7f', borderRadius: '6px', fontSize: '1.2rem', fontWeight: 500 }}>
                                                {caseItem.region_en}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 22px' }}>
                                            <span title={caseItem.compliance_layer_note} style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 11px', borderRadius: '999px', border: `1px solid ${layerStyle.border}`, backgroundColor: layerStyle.background, color: layerStyle.color, fontSize: '1.2rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                {caseItem.compliance_layer_label}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 22px' }}>
                                            <span aria-label={publicVisible ? 'Case is visible publicly' : 'Case is hidden publicly'} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 11px', borderRadius: '999px', border: `1px solid ${publicVisible ? '#bbf7d0' : '#fecdd3'}`, backgroundColor: publicVisible ? '#f0fdf4' : '#fff1f2', color: publicVisible ? '#15803d' : '#be123c', fontSize: '1.2rem', fontWeight: 700 }}>
                                                {publicVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                                                {!published ? 'Offline' : restricted ? 'C layer hidden' : caseItem.is_ad_safe ? 'Ad safe' : 'SEO only'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 22px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                {publicVisible ? (
                                                    <Link href={`/cases/${caseItem.handle}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', backgroundColor: '#f0f9ff', color: '#0284c7', borderRadius: '7px', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 500, transition: 'all 0.15s' }}>
                                                        <Eye size={14} /> View
                                                    </Link>
                                                ) : (
                                                    <Link href={`/admin/cases/${caseItem.handle}/preview`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', backgroundColor: '#f8fafc', color: '#94a3b8', borderRadius: '7px', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 600 }}>
                                                        <Eye size={14} /> Preview
                                                    </Link>
                                                )}
                                                <button onClick={() => handleTogglePublished(caseItem, !published)} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', backgroundColor: published ? '#fff7ed' : '#f0fdf4', color: published ? '#c2410c' : '#15803d', border: `1px solid ${published ? '#fed7aa' : '#bbf7d0'}`, borderRadius: '7px', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 600, transition: 'all 0.15s' }}>
                                                    {published ? <ToggleLeft size={14} /> : <ToggleRight size={14} />}
                                                    {published ? 'Set offline' : 'Publish'}
                                                </button>
                                                <Link href={`/admin/cases/${caseItem.handle}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', backgroundColor: '#f0f4f8', color: '#475569', borderRadius: '7px', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 500, transition: 'all 0.15s' }}>
                                                    <Edit size={14} /> Edit
                                                </Link>
                                                <button onClick={() => handleDelete(caseItem.handle)} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '7px 14px', backgroundColor: '#fff', color: '#e05252', border: '1px solid #fddede', borderRadius: '7px', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 500, transition: 'all 0.15s' }}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
