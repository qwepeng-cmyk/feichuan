'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';

const MEDIA_CATS = ['Company News', 'Industry Analysis', 'Product Update', 'Event'];

const s: Record<string, React.CSSProperties> = {
    card: { backgroundColor: '#fff', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #e8ecf1', marginBottom: '20px' },
    title: { fontSize: '1.6rem', fontWeight: 600, color: '#334155', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #edf0f4' },
    label: { display: 'block', marginBottom: '6px', fontWeight: 500, color: '#5a6b7f', fontSize: '1.3rem', letterSpacing: '0.2px' },
    input: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #dde3eb', fontSize: '1.35rem', outline: 'none', color: '#334155', boxSizing: 'border-box' as const },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' },
};

export default function MediaEditPage({ params }: { params: { id: string } }) {
    const isNew = params.id === 'new';
    const router = useRouter();
    const [f, setF] = useState<any>({ id: '', title: '', date: '', image: '', category: '', content: '' });
    const [showAdv, setShowAdv] = useState(false);
    const [rawJson, setRawJson] = useState('{}');
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [ok, setOk] = useState('');

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/admin/media/${params.id}`).then(r => r.json()).then(({ success, data }) => {
                if (success) { setF(data); setRawJson(JSON.stringify(data, null, 2)); }
                setLoading(false);
            });
        }
    }, [params.id, isNew]);

    const upd = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

    const save = async () => {
        setSaving(true); setError(''); setOk('');
        let d;
        if (showAdv) { try { d = JSON.parse(rawJson); } catch { setError('Invalid JSON'); setSaving(false); return; } }
        else d = { ...f };

        const url = isNew ? '/api/admin/media' : `/api/admin/media/${params.id}`;
        try {
            const r = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
            const j = await r.json();
            if (j.success) { setOk('Saved!'); setTimeout(() => router.push('/admin/media'), 1200); }
            else setError(j.error || 'Failed');
        } catch { setError('Server error'); } finally { setSaving(false); }
    };

    if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button onClick={() => router.push('/admin/media')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6b87b5', cursor: 'pointer', fontSize: '1.3rem', fontWeight: 500, marginBottom: '18px', padding: 0 }}><ArrowLeft size={18} /> 返回新闻列表</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2.0rem', color: '#1e293b', fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>{isNew ? '新增文章' : '编辑文章'}</h1>
                <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px', backgroundColor: saving ? '#93b5f0' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1.3rem', boxShadow: '0 1px 3px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}><Save size={18} /> {saving ? '保存中...' : '保存文章'}</button>
            </div>
            {error && <div style={{ padding: '12px 18px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '10px', marginBottom: '16px', border: '1px solid #fed7d7', fontSize: '1.3rem' }}>{error}</div>}
            {ok && <div style={{ padding: '12px 18px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '10px', marginBottom: '16px', border: '1px solid #c6f6d5', fontSize: '1.3rem' }}>{ok}</div>}

            <div style={s.card}><h2 style={s.title}>📰 Article Info</h2>
                {isNew && <div style={{ marginBottom: '20px' }}><label style={s.label}>Article ID (Handle)</label><input style={s.input} value={f.id || ''} onChange={e => upd('id', e.target.value)} placeholder="unique-article-id" /></div>}
                <div><label style={s.label}>Title</label><input style={s.input} value={f.title || ''} onChange={e => upd('title', e.target.value)} /></div>
                <div style={{ ...s.twoCol, marginTop: '20px' }}>
                    <div><label style={s.label}>Date</label><input style={s.input} value={f.date || ''} onChange={e => upd('date', e.target.value)} placeholder="November 3, 2025" /></div>
                    <div><label style={s.label}>Category</label>
                        <select style={{ ...s.input, appearance: 'auto' as const }} value={f.category || ''} onChange={e => upd('category', e.target.value)}>
                            <option value="">-- Select --</option>
                            {MEDIA_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}><label style={s.label}>Cover Image URL</label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <input style={{ ...s.input, flex: 1 }} value={f.image || ''} onChange={e => upd('image', e.target.value)} />
                        {f.image ? <img src={f.image} alt="" style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} /> : <div style={{ width: '160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px dashed #cbd5e1', color: '#94a3b8', backgroundColor: '#f8fafc' }}><ImageIcon size={28} /></div>}
                    </div>
                </div>
            </div>

            <div style={s.card}><h2 style={s.title}>📝 Article Content</h2>
                <RichTextEditor value={f.content || ''} onChange={v => upd('content', v)} placeholder="Write the full article content here..." height={500} />
            </div>

            <div style={{ ...s.card, backgroundColor: showAdv ? '#fffbeb' : '#fff' }}>
                <button onClick={() => { if (!showAdv) setRawJson(JSON.stringify(f, null, 2)); setShowAdv(!showAdv); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <h2 style={{ ...s.title, marginBottom: 0, paddingBottom: 0, borderBottom: 'none', color: '#92400e' }}>🔧 Advanced JSON</h2>
                    {showAdv ? <ChevronUp size={22} color="#92400e" /> : <ChevronDown size={22} color="#92400e" />}
                </button>
                {showAdv && <div style={{ marginTop: '16px' }}><textarea value={rawJson} onChange={e => setRawJson(e.target.value)} style={{ width: '100%', height: '300px', padding: '16px', fontFamily: 'monospace', fontSize: '1.4rem', borderRadius: '8px', border: '1px solid #fbbf24', backgroundColor: '#fffef5', resize: 'vertical', boxSizing: 'border-box' }} spellCheck={false} /></div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px' }}>
                <button onClick={save} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px', backgroundColor: saving ? '#93b5f0' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1.3rem', boxShadow: '0 1px 3px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}><Save size={18} /> {saving ? '保存中...' : '保存文章'}</button>
            </div>
        </div>
    );
}
