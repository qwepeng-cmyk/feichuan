'use client';

import React, { useEffect, useState } from 'react';
import { Save, Settings } from 'lucide-react';

const card: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    border: '1px solid #e8ecf1',
    maxWidth: '860px',
};

const label: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#334155',
    fontSize: '1.3rem',
    fontWeight: 700,
};

const input: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #dbe3ee',
    borderRadius: '8px',
    color: '#0f172a',
    fontSize: '1.35rem',
    boxSizing: 'border-box',
};

export default function AdminSettingsPage() {
    const [form, setForm] = useState({
        gaMeasurementId: '',
        gaEnabled: true,
        gtmContainerId: '',
        gtmEnabled: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/admin/settings/tracking')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setForm(json.data);
                else setError(json.error || '加载设置失败');
            })
            .catch(() => setError('无法连接设置接口'))
            .finally(() => setLoading(false));
    }, []);

    const save = async () => {
        setSaving(true);
        setMessage('');
        setError('');

        try {
            const res = await fetch('/api/admin/settings/tracking', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                setForm(json.data);
                setMessage('跟踪代码设置已保存');
            } else {
                setError(json.error || '保存失败');
            }
        } catch {
            setError('无法保存设置');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '48px', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Settings size={24} color="#315ba4" />
                <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2.2rem', fontWeight: 800 }}>网站跟踪代码</h1>
            </div>

            <div style={card}>
                {message && <div style={{ marginBottom: '18px', color: '#047857', fontSize: '1.3rem', fontWeight: 700 }}>{message}</div>}
                {error && <div style={{ marginBottom: '18px', color: '#be123c', fontSize: '1.3rem', fontWeight: 700 }}>{error}</div>}

                <div style={{ display: 'grid', gap: '22px' }}>
                    <label>
                        <span style={label}>GA4 Measurement ID</span>
                        <input
                            style={input}
                            value={form.gaMeasurementId}
                            onChange={(e) => setForm((prev) => ({ ...prev, gaMeasurementId: e.target.value }))}
                            placeholder="G-ZS6XC2TFCG"
                        />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '1.3rem', fontWeight: 700 }}>
                        <input
                            type="checkbox"
                            checked={form.gaEnabled}
                            onChange={(e) => setForm((prev) => ({ ...prev, gaEnabled: e.target.checked }))}
                        />
                        启用 GA4 Google tag
                    </label>

                    <label>
                        <span style={label}>Google Tag Manager Container ID</span>
                        <input
                            style={input}
                            value={form.gtmContainerId}
                            onChange={(e) => setForm((prev) => ({ ...prev, gtmContainerId: e.target.value }))}
                            placeholder="GTM-PJN9QQWN"
                        />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '1.3rem', fontWeight: 700 }}>
                        <input
                            type="checkbox"
                            checked={form.gtmEnabled}
                            onChange={(e) => setForm((prev) => ({ ...prev, gtmEnabled: e.target.checked }))}
                        />
                        启用 Google Tag Manager
                    </label>
                </div>

                <div style={{ marginTop: '28px', padding: '16px', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontSize: '1.25rem', lineHeight: 1.7 }}>
                    当前设置只注入英文前台页面，不注入后台管理页。若 GTM 容器里也配置了 GA4，请关闭上面的 GA4 Google tag，避免统计重复。
                </div>

                <button
                    onClick={save}
                    disabled={saving}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '24px',
                        padding: '12px 24px',
                        border: 0,
                        borderRadius: '8px',
                        background: saving ? '#94a3b8' : '#315ba4',
                        color: '#fff',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        cursor: saving ? 'not-allowed' : 'pointer',
                    }}
                >
                    <Save size={18} />
                    {saving ? '保存中...' : '保存设置'}
                </button>
            </div>
        </div>
    );
}
