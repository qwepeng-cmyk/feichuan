'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, ToggleLeft, ToggleRight } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MainImageUploader from '@/components/admin/MainImageUploader';

const CATEGORIES = [
    { value: 'uav-drone-systems', label: 'UAV Drone Systems (无人机系统)' },
    { value: 'drone-detection', label: 'Drone Detection / Airspace Monitoring (无人机探测与空域监控)' },
    { value: 'security-screening', label: 'Security Screening (安检设备)' },
    { value: 'defense-engineering', label: 'Defense Engineering (防御工程)' },
    { value: 'field-hospitals', label: 'Field Hospitals (野战医院)' },
    { value: 'perimeter-intelligence', label: 'Perimeter Intelligence (周界智能防护)' },
];

/* ─── Reusable Styles ─── */
const sectionCard: React.CSSProperties = {
    backgroundColor: '#fff', padding: '28px', borderRadius: '12px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #e8ecf1',
    marginBottom: '20px',
};
const sectionTitle: React.CSSProperties = {
    fontSize: '1.6rem', fontWeight: 600, color: '#334155',
    marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #edf0f4',
};
const fieldLabel: React.CSSProperties = {
    display: 'block', marginBottom: '6px', fontWeight: 500,
    color: '#5a6b7f', fontSize: '1.3rem', letterSpacing: '0.2px',
};
const textInput: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #dde3eb', fontSize: '1.35rem', outline: 'none', color: '#334155',
    transition: 'border-color 0.2s', boxSizing: 'border-box' as const,
};
const textArea: React.CSSProperties = {
    ...textInput, resize: 'vertical' as const, lineHeight: '1.6',
};
const twoCol: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px',
};

/* ─── Grid Parameter Editor ─── */
function GridParamEditor({ data, onChange }: { 
    data: string[][]; 
    onChange: (newData: string[][]) => void 
}) {
    // Ensure data is at least a 2x2 grid if empty
    const grid = data && data.length > 0 ? data : [['Parameter', 'Value'], ['', '']];

    const updateCell = (ri: number, ci: number, val: string) => {
        const next = grid.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r);
        onChange(next);
    };

    const addRow = () => onChange([...grid, new Array(grid[0].length).fill('')]);
    const removeRow = (ri: number) => {
        if (grid.length <= 1) return;
        onChange(grid.filter((_, i) => i !== ri));
    };

    const addCol = () => onChange(grid.map(r => [...r, '']));
    const removeCol = () => {
        if (grid[0].length <= 1) return;
        if (window.confirm(`确定要删除最后一列 ("${grid[0][grid[0].length - 1] || '未命名'}") 吗？此操作将丢失该列所有数据。`)) {
            onChange(grid.map(r => r.slice(0, -1)));
        }
    };

    return (
        <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
                <button onClick={addCol} style={{ padding: '6px 12px', fontSize: '1.2rem', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer' }}>+ 增加列</button>
                <button onClick={removeCol} style={{ padding: '6px 12px', fontSize: '1.2rem', backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '6px', cursor: 'pointer' }}>- 删除末列</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {grid[0].map((cell, ci) => (
                            <th key={ci} style={{ padding: '8px' }}>
                                <input 
                                    style={{ ...textInput, fontWeight: 'bold', backgroundColor: '#f8fafc' }} 
                                    value={cell} 
                                    onChange={e => updateCell(0, ci, e.target.value)} 
                                    placeholder={`Column ${ci+1}`}
                                />
                            </th>
                        ))}
                        <th style={{ width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {grid.slice(1).map((row, ri) => (
                        <tr key={ri + 1}>
                            {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: '4px 8px' }}>
                                    <input 
                                        style={textInput} 
                                        value={cell} 
                                        onChange={e => updateCell(ri + 1, ci, e.target.value)} 
                                    />
                                </td>
                            ))}
                            <td style={{ padding: '4px 8px' }}>
                                <button onClick={() => removeRow(ri + 1)} style={{ padding: '8px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#315ba4', border: '1px dashed #93c5fd', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1.3rem', marginTop: '10px', width: '100%', justifyContent: 'center' }}><Plus size={16} /> 增加行</button>
        </div>
    );
}

/* ─── Main Page ─── */
export default function ProductEditPage({ params }: { params: { handle: string } }) {
    const isNew = params.handle === 'new';
    const router = useRouter();

    /* ── Form State ── */
    const [handle, setHandle] = useState('');
    const [productNameEn, setProductNameEn] = useState('');
    const [productNameCn, setProductNameCn] = useState('');
    const [productNameRu, setProductNameRu] = useState('');
    const [categoryPrimary, setCategoryPrimary] = useState('');
    const [categorySecondary, setCategorySecondary] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    const [summaryEn, setSummaryEn] = useState('');
    const [summaryCn, setSummaryCn] = useState('');
    const [summaryRu, setSummaryRu] = useState('');
    const [keyAppEn, setKeyAppEn] = useState('');
    const [keyAppCn, setKeyAppCn] = useState('');
    const [keyAppRu, setKeyAppRu] = useState('');
    const [keyParam1En, setKeyParam1En] = useState('');
    const [keyParam1Cn, setKeyParam1Cn] = useState('');
    const [keyParam1Ru, setKeyParam1Ru] = useState('');
    const [keyParam2En, setKeyParam2En] = useState('');
    const [keyParam2Cn, setKeyParam2Cn] = useState('');
    const [keyParam2Ru, setKeyParam2Ru] = useState('');
    const [detailHtmlEn, setDetailHtmlEn] = useState('');
    const [detailHtmlCn, setDetailHtmlCn] = useState('');
    const [detailHtmlRu, setDetailHtmlRu] = useState('');

    /* Parameters - Array of Arrays for Grid */
    const [paramsEn, setParamsEn] = useState<string[][]>([['Parameter', 'Value'], ['', '']]);
    const [paramsCn, setParamsCn] = useState<string[][]>([['参数', '值'], ['', '']]);
    const [paramsRu, setParamsRu] = useState<string[][]>([['Параметр', 'Значение'], ['', '']]);

    /* Advanced JSON (collapsible) */
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [rawJsonStr, setRawJsonStr] = useState('{}');

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    /* ── Load Data ── */
    useEffect(() => {
        if (!isNew) {
            fetch(`/api/admin/products/${params.handle}`)
                .then(r => r.json())
                .then(({ success, data }) => {
                    if (!success) { setLoading(false); return; }
                    setHandle(data.handle || '');
                    setProductNameEn(data.product_name_en || '');
                    setProductNameCn(data.product_name || '');
                    setProductNameRu(data.product_name_ru || '');
                    setCategoryPrimary(data.category_primary || '');
                    setCategorySecondary(data.category_secondary || '');
                    setMainImage(data.main_image || '');
                    setIsPublished(data.is_published !== 0 && data.is_published !== false);
                    setSummaryEn(data.summary_en || '');
                    setSummaryCn(data.summary || '');
                    setSummaryRu(data.summary_ru || '');
                    setKeyAppEn(data.key_application_en || '');
                    setKeyAppCn(data.key_application || '');
                    setKeyAppRu(data.key_application_ru || '');
                    setKeyParam1En(data.key_parameter_1_en || '');
                    setKeyParam1Cn(data.key_parameter_1 || '');
                    setKeyParam1Ru(data.key_parameter_1_ru || '');
                    setKeyParam2En(data.key_parameter_2_en || '');
                    setKeyParam2Cn(data.key_parameter_2 || '');
                    setKeyParam2Ru(data.key_parameter_2_ru || '');
                    setDetailHtmlEn(data.detail_html_en || '');
                    setDetailHtmlCn(data.detail_html || '');
                    setDetailHtmlRu(data.detail_html_ru || '');
                    
                    // Convert old object format to new array grid format if needed
                    const pEn = data.parameters_en;
                    if (pEn && !Array.isArray(pEn)) {
                        setParamsEn([['Parameter', 'Value'], ...(Object.entries(pEn) as string[][])]);
                    } else if (Array.isArray(pEn)) {
                        setParamsEn(pEn);
                    }

                    const pCn = data.parameters;
                    if (pCn && !Array.isArray(pCn)) {
                        setParamsCn([['参数', '值'], ...(Object.entries(pCn) as string[][])]);
                    } else if (Array.isArray(pCn)) {
                        setParamsCn(pCn);
                    }

                    const pRu = data.parameters_ru;
                    if (pRu && !Array.isArray(pRu)) {
                        setParamsRu([['Параметр', 'Значение'], ...(Object.entries(pRu) as string[][])]);
                    } else if (Array.isArray(pRu)) {
                        setParamsRu(pRu);
                    }

                    setRawJsonStr(JSON.stringify(data, null, 2));
                    setLoading(false);
                });
        }
    }, [params.handle, isNew]);

    /* ── Assemble Final JSON ── */
    const buildPayload = () => ({
        handle: handle || params.handle,
        product_name: productNameCn,
        product_name_en: productNameEn,
        product_name_ru: productNameRu,
        category_primary: categoryPrimary,
        category_secondary: categorySecondary,
        main_image: mainImage,
        is_published: isPublished ? 1 : 0,
        summary: summaryCn,
        summary_en: summaryEn,
        summary_ru: summaryRu,
        key_application: keyAppCn,
        key_application_en: keyAppEn,
        key_application_ru: keyAppRu,
        key_parameter_1: keyParam1Cn,
        key_parameter_1_en: keyParam1En,
        key_parameter_1_ru: keyParam1Ru,
        key_parameter_2: keyParam2Cn,
        key_parameter_2_en: keyParam2En,
        key_parameter_2_ru: keyParam2Ru,
        detail_html: detailHtmlCn,
        detail_html_en: detailHtmlEn,
        detail_html_ru: detailHtmlRu,
        parameters: paramsCn,
        parameters_en: paramsEn,
        parameters_ru: paramsRu,
    });

    /* ── Save ── */
    const handleSave = async () => {
        setSaving(true); setError(''); setSuccessMsg('');

        // If advanced editor is open and user may have edited raw JSON, use that
        let finalData;
        if (showAdvanced) {
            try {
                finalData = JSON.parse(rawJsonStr);
            } catch {
                setError('Advanced JSON editor contains invalid JSON. Please fix or close it.');
                setSaving(false); return;
            }
        } else {
            finalData = buildPayload();
        }

        const url = isNew ? '/api/admin/products' : `/api/admin/products/${params.handle}`;
        const method = isNew ? 'POST' : 'PUT';

        try {
            const res = await fetch(url, {
                method, headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg('Product saved successfully!');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => router.push('/admin/products'), 1500);
            } else {
                setError(data.error || 'Save failed');
            }
        } catch {
            setError('Server connection error');
        } finally {
            setSaving(false);
        }
    };

    // Grid helpers are now part of the GridParamEditor component logic


    if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div>;

    const threeCol: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '18px',
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* ── Top Bar ── */}
            <button onClick={() => router.push('/admin/products')} style={{
                display: 'flex', alignItems: 'center', gap: '6px', background: 'none',
                border: 'none', color: '#6b87b5', cursor: 'pointer', fontSize: '1.3rem',
                fontWeight: 500, marginBottom: '18px', padding: 0,
            }}>
                <ArrowLeft size={18} /> 返回产品列表
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '2.0rem', color: '#1e293b', fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>
                    {isNew ? '新增产品' : '编辑产品'}
                </h1>
                <button onClick={handleSave} disabled={saving} style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 22px',
                    backgroundColor: saving ? '#93b5f0' : '#3b82f6', color: '#fff', border: 'none',
                    borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer',
                    fontWeight: 600, fontSize: '1.3rem', transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(59,130,246,0.3)',
                }}>
                    <Save size={18} /> {saving ? '保存中...' : '保存产品'}
                </button>
            </div>

            {error && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '12px', border: '1px solid #fed7d7', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>⚠️</span> {error}</div>}
            {successMsg && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '12px', border: '1px solid #c6f6d5', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>✅</span> {successMsg}</div>}

            {/* ═══════════ SECTION 1: Identity ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>📦 Product Identity</h2>

                {isNew && (
                    <div style={{ marginBottom: '20px' }}>
                        <label style={fieldLabel}>URL Handle <span style={{ color: '#94a3b8', fontWeight: 400 }}>(unique slug)</span></label>
                        <input style={textInput} value={handle} onChange={e => setHandle(e.target.value)} placeholder="e.g. fc-ttvc-intelligent-camera" />
                    </div>
                )}

                <div style={threeCol}>
                    <div>
                        <label style={fieldLabel}>Product Name (English)</label>
                        <input style={textInput} value={productNameEn} onChange={e => setProductNameEn(e.target.value)} placeholder="English product name" />
                    </div>
                    <div>
                        <label style={fieldLabel}>产品名称 (中文)</label>
                        <input style={textInput} value={productNameCn} onChange={e => setProductNameCn(e.target.value)} placeholder="中文产品名称" />
                    </div>
                    <div>
                        <label style={fieldLabel}>Название продукта (Russian)</label>
                        <input style={textInput} value={productNameRu} onChange={e => setProductNameRu(e.target.value)} placeholder="Русское название продукта" />
                    </div>
                </div>

                <div style={{ ...twoCol, marginTop: '20px' }}>
                    <div>
                        <label style={fieldLabel}>Primary Category</label>
                        <select style={{ ...textInput, appearance: 'auto' as const }} value={categoryPrimary} onChange={e => setCategoryPrimary(e.target.value)}>
                            <option value="">-- Select Category --</option>
                            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={fieldLabel}>Secondary Category <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label>
                        <input style={textInput} value={categorySecondary} onChange={e => setCategorySecondary(e.target.value)} placeholder="Sub-category name" />
                    </div>
                </div>

                <div style={{
                    marginTop: '20px',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${isPublished ? '#bbf7d0' : '#fed7d7'}`,
                    backgroundColor: isPublished ? '#f0fdf4' : '#fff5f5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 700, color: isPublished ? '#166534' : '#991b1b' }}>
                            Product status: {isPublished ? 'Published' : 'Unpublished'}
                        </div>
                        <div style={{ fontSize: '1.18rem', color: '#64748b', marginTop: '4px', lineHeight: 1.5 }}>
                            Unpublished products are hidden from public product lists, detail pages, and related product cards.
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const nextPublished = !isPublished;
                            const actionText = nextPublished ? '上架' : '下架';
                            const productName = productNameEn || handle || params.handle;
                            if (window.confirm(`确认要${actionText}这个产品吗？\n\n${productName}`)) {
                                setIsPublished(nextPublished);
                            }
                        }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '9px 14px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: isPublished ? '#16a34a' : '#dc2626',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {isPublished ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        {isPublished ? 'Set offline' : 'Publish'}
                    </button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label style={fieldLabel}>Main Image URL</label>
                    <MainImageUploader
                        resourceType="products"
                        value={mainImage}
                        onChange={setMainImage}
                        entityHandle={handle || params.handle}
                        entityName={productNameEn || productNameCn}
                        previewFit="contain"
                        placeholder="/products/product-handle/product-handle-main.webp"
                    />
                </div>
            </div>

            {/* ═══════════ SECTION 2: Summary ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>📝 Product Summary</h2>
                <div style={threeCol}>
                    <div>
                        <label style={fieldLabel}>Summary (English)</label>
                        <textarea style={{ ...textArea, height: '160px' }} value={summaryEn} onChange={e => setSummaryEn(e.target.value)} placeholder="English product summary..." />
                    </div>
                    <div>
                        <label style={fieldLabel}>产品简介 (中文)</label>
                        <textarea style={{ ...textArea, height: '160px' }} value={summaryCn} onChange={e => setSummaryCn(e.target.value)} placeholder="中文产品简介..." />
                    </div>
                    <div>
                        <label style={fieldLabel}>Краткое описание (Russian)</label>
                        <textarea style={{ ...textArea, height: '160px' }} value={summaryRu} onChange={e => setSummaryRu(e.target.value)} placeholder="Русское описание..." />
                    </div>
                </div>
            </div>

            {/* ═══════════ SECTION 3: Key Application ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>🎯 Key Application</h2>
                <div style={threeCol}>
                    <div>
                        <label style={fieldLabel}>Application (English)</label>
                        <textarea style={{ ...textArea, height: '120px' }} value={keyAppEn} onChange={e => setKeyAppEn(e.target.value)} placeholder="Key use cases..." />
                    </div>
                    <div>
                        <label style={fieldLabel}>应用领域 (中文)</label>
                        <textarea style={{ ...textArea, height: '120px' }} value={keyAppCn} onChange={e => setKeyAppCn(e.target.value)} placeholder="应用领域描述..." />
                    </div>
                    <div>
                        <label style={fieldLabel}>Применение (Russian)</label>
                        <textarea style={{ ...textArea, height: '120px' }} value={keyAppRu} onChange={e => setKeyAppRu(e.target.value)} placeholder="Области применения..." />
                    </div>
                </div>
                <div style={{ ...threeCol, marginTop: '20px' }}>
                    <div>
                        <label style={fieldLabel}>Highlight Param #1 (EN)</label>
                        <input style={textInput} value={keyParam1En} onChange={e => setKeyParam1En(e.target.value)} />
                    </div>
                    <div>
                        <label style={fieldLabel}>核心参数 #1 (中文)</label>
                        <input style={textInput} value={keyParam1Cn} onChange={e => setKeyParam1Cn(e.target.value)} />
                    </div>
                    <div>
                        <label style={fieldLabel}>Ключевой параметр #1 (RU)</label>
                        <input style={textInput} value={keyParam1Ru} onChange={e => setKeyParam1Ru(e.target.value)} />
                    </div>
                </div>
                <div style={{ ...threeCol, marginTop: '12px' }}>
                    <div>
                        <label style={fieldLabel}>Highlight Param #2 (EN)</label>
                        <input style={textInput} value={keyParam2En} onChange={e => setKeyParam2En(e.target.value)} />
                    </div>
                    <div>
                        <label style={fieldLabel}>核心参数 #2 (中文)</label>
                        <input style={textInput} value={keyParam2Cn} onChange={e => setKeyParam2Cn(e.target.value)} />
                    </div>
                    <div>
                        <label style={fieldLabel}>Ключевой параметр #2 (RU)</label>
                        <input style={textInput} value={keyParam2Ru} onChange={e => setKeyParam2Ru(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* ═══════════ SECTION 4: Parameters Table (EN) ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>⚙️ Technical Parameters (English)</h2>
                <GridParamEditor data={paramsEn} onChange={setParamsEn} />
            </div>

            {/* ═══════════ SECTION 5: Parameters Table (CN) ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>⚙️ 技术参数 (中文)</h2>
                <GridParamEditor data={paramsCn} onChange={setParamsCn} />
            </div>

            {/* ═══════════ SECTION 6: Parameters Table (RU) ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>⚙️ Технические параметры (Russian)</h2>
                <GridParamEditor data={paramsRu} onChange={setParamsRu} />
            </div>

            {/* ═══════════ SECTION 7: Detail HTML ═══════════ */}
            <div style={sectionCard}>
                <h2 style={sectionTitle}>📄 Detail Page Content (HTML)</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div>
                        <label style={fieldLabel}>Detail Content (English)</label>
                        <RichTextEditor 
                            value={detailHtmlEn} 
                            onChange={setDetailHtmlEn} 
                            placeholder="English features and details..." 
                            height={300} 
                        />
                    </div>
                    <div>
                        <label style={fieldLabel}>详情正文 (中文)</label>
                        <RichTextEditor 
                            value={detailHtmlCn} 
                            onChange={setDetailHtmlCn} 
                            placeholder="中文功能特点与详情..." 
                            height={300} 
                        />
                    </div>
                    <div>
                        <label style={fieldLabel}>Подробное описание (Russian)</label>
                        <RichTextEditor 
                            value={detailHtmlRu} 
                            onChange={setDetailHtmlRu} 
                            placeholder="Подробности на русском..." 
                            height={300} 
                        />
                    </div>
                </div>
            </div>

            {/* ═══════════ SECTION 7: Advanced Raw JSON (collapsed) ═══════════ */}
            <div style={{ ...sectionCard, backgroundColor: showAdvanced ? '#fffbeb' : '#fff' }}>
                <button onClick={() => {
                    if (!showAdvanced) {
                        // Sync current form into the JSON editor
                        setRawJsonStr(JSON.stringify(buildPayload(), null, 2));
                    }
                    setShowAdvanced(!showAdvanced);
                }} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                    <h2 style={{ ...sectionTitle, marginBottom: 0, paddingBottom: 0, borderBottom: 'none', color: '#92400e' }}>
                        🔧 Advanced: Raw JSON Editor
                    </h2>
                    {showAdvanced ? <ChevronUp size={22} color="#92400e" /> : <ChevronDown size={22} color="#92400e" />}
                </button>
                {showAdvanced && (
                    <div style={{ marginTop: '16px' }}>
                        <p style={{ color: '#b45309', fontSize: '1.3rem', marginBottom: '12px', fontWeight: 500 }}>
                            ⚠️ Warning: Editing here will override all form fields above when saving. Use only if you need full control.
                        </p>
                        <textarea
                            value={rawJsonStr}
                            onChange={e => setRawJsonStr(e.target.value)}
                            style={{
                                width: '100%', height: '500px', padding: '16px',
                                fontFamily: 'monospace', fontSize: '1.4rem', lineHeight: '1.5',
                                borderRadius: '8px', border: '1px solid #fbbf24',
                                backgroundColor: '#fffef5', resize: 'vertical', boxSizing: 'border-box',
                            }}
                            spellCheck={false}
                        />
                    </div>
                )}
            </div>

            {/* ── Bottom Save ── */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px', marginTop: '10px' }}>
                <button onClick={handleSave} disabled={saving} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 32px',
                    backgroundColor: saving ? '#9ab4df' : '#315ba4', color: '#fff', border: 'none',
                    borderRadius: '10px', cursor: saving ? 'not-allowed' : 'pointer',
                    fontWeight: 700, fontSize: '1.4rem',
                }}>
                    <Save size={20} /> {saving ? 'Saving...' : 'Save Product'}
                </button>
            </div>
        </div>
    );
}
