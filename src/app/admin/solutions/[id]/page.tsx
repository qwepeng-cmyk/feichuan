'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';

const SOL_CATEGORIES = [
    { id: '01_BorderPatrol', name: 'Border Patrol' },
    { id: '02_InfrastructureProtection', name: 'Infrastructure Protection' },
    { id: '03_KeyAreaSecurity', name: 'Key Area Security' },
    { id: '04_EmergencyRescue', name: 'Emergency & Disaster Rescue' },
];

const s: Record<string, React.CSSProperties> = {
    card: { backgroundColor: '#fff', padding: '28px', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #e8ecf1', marginBottom: '20px' },
    title: { fontSize: '1.6rem', fontWeight: 600, color: '#334155', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #edf0f4' },
    label: { display: 'block', marginBottom: '6px', fontWeight: 500, color: '#5a6b7f', fontSize: '1.3rem', letterSpacing: '0.2px' },
    input: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #dde3eb', fontSize: '1.35rem', outline: 'none', color: '#334155', boxSizing: 'border-box' as const },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' },
};

/* ─── Grid Parameter Editor ─── */
function GridParamEditor({ data, onChange }: { 
    data: string[][]; 
    onChange: (newData: string[][]) => void 
}) {
    const grid = data && data.length > 0 ? data : [['Parameter', 'Value'], ['', '']];
    const updateCell = (ri: number, ci: number, val: string) => {
        const next = grid.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r);
        onChange(next);
    };
    const addRow = () => onChange([...grid, new Array(grid[0].length).fill('')]);
    const removeRow = (ri: number) => { if (grid.length <= 1) return; onChange(grid.filter((_, i) => i !== ri)); };
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
                                <input style={{ ...s.input, fontWeight: 'bold', backgroundColor: '#f8fafc' }} value={cell} onChange={e => updateCell(0, ci, e.target.value)} placeholder={`Col ${ci+1}`} />
                            </th>
                        ))}
                        <th style={{ width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {grid.slice(1).map((row, ri) => (
                        <tr key={ri + 1}>
                            {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: '4px 8px' }}><input style={s.input} value={cell} onChange={e => updateCell(ri + 1, ci, e.target.value)} /></td>
                            ))}
                            <td style={{ padding: '4px 8px' }}><button onClick={() => removeRow(ri + 1)} style={{ padding: '8px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Trash2 size={16} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#315ba4', border: '1px dashed #93c5fd', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1.3rem', marginTop: '10px', width: '100%', justifyContent: 'center' }}><Plus size={16} /> 增加行</button>
        </div>
    );
}

export default function SolutionEditPage({ params }: { params: { id: string } }) {
    const isNew = params.id === 'new';
    const router = useRouter();
    const [f, setF] = useState<any>({});
    const [paramsEn, setParamsEn] = useState<string[][]>([['Parameter', 'Value'], ['', '']]);
    const [paramsCn, setParamsCn] = useState<string[][]>([['参数', '值'], ['', '']]);
    const [showAdv, setShowAdv] = useState(false);
    const [rawJson, setRawJson] = useState('{}');
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [ok, setOk] = useState('');

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/admin/solutions/${params.id}`).then(r=>r.json()).then(({success,data})=>{
                if(!success){setLoading(false);return;}
                setF(data);
                setF(data);
                const pEn = data.parameters_en;
                if (pEn && !Array.isArray(pEn)) setParamsEn([['Parameter', 'Value'], ...Object.entries(pEn)]);
                else if (Array.isArray(pEn)) setParamsEn(pEn);
                
                const pCn = data.parameters;
                if (pCn && !Array.isArray(pCn)) setParamsCn([['参数', '值'], ...Object.entries(pCn)]);
                else if (Array.isArray(pCn)) setParamsCn(pCn);
                setRawJson(JSON.stringify(data,null,2));
                setLoading(false);
            });
        }
    }, [params.id, isNew]);

    const upd = (k:string,v:any) => setF((p:any)=>({...p,[k]:v}));

    const build = () => ({
        ...f,
        parameters: paramsCn,
        parameters_en: paramsEn,
        recommended_products: typeof f.recommended_products==='string' ? f.recommended_products.split(',').map((s:string)=>s.trim()).filter(Boolean) : (f.recommended_products||[]),
    });

    const save = async () => {
        setSaving(true); setError(''); setOk('');
        let d; if(showAdv){try{d=JSON.parse(rawJson)}catch{setError('Invalid JSON');setSaving(false);return;}} else d=build();
        const url = isNew ? '/api/admin/solutions' : `/api/admin/solutions/${params.id}`;
        try {
            const r = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
            const j = await r.json();
            if (j.success) {
                setOk('Saved successfully!');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => router.push('/admin/solutions'), 1500);
            } else setError(j.error || 'Failed')
        } catch { setError('Server error') } finally { setSaving(false) }
    };

    if (loading) return <div style={{padding:'60px',textAlign:'center',color:'#94a3b8',fontSize:'1.4rem'}}>加载中...</div>;

    const catId = SOL_CATEGORIES.find(c=>c.name===f.category_name||c.id===f.category_id)?.id || f.category_id || '';

    return (
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
            <button onClick={()=>router.push('/admin/solutions')} style={{display:'flex',alignItems:'center',gap:'6px',background:'none',border:'none',color:'#6b87b5',cursor:'pointer',fontSize:'1.3rem',fontWeight:500,marginBottom:'18px',padding:0}}><ArrowLeft size={18}/> 返回方案列表</button>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
                <h1 style={{fontSize:'2.0rem',color:'#1e293b',fontWeight:700,margin:0,letterSpacing:'-0.2px'}}>{isNew?'新增方案':'编辑方案'}</h1>
                <button onClick={save} disabled={saving} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 22px',backgroundColor:saving?'#93b5f0':'#3b82f6',color:'#fff',border:'none',borderRadius:'8px',cursor:saving?'not-allowed':'pointer',fontWeight:600,fontSize:'1.3rem',boxShadow:'0 1px 3px rgba(59,130,246,0.3)',transition:'all 0.2s'}}><Save size={18}/> {saving?'保存中...':'保存方案'}</button>
            </div>
            {error && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '12px', border: '1px solid #fed7d7', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>⚠️</span> {error}</div>}
            {ok && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '12px', border: '1px solid #c6f6d5', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>✅</span> {ok}</div>}

            <div style={s.card}><h2 style={s.title}>🛡️ Solution Identity</h2>
                {isNew&&<div style={{marginBottom:'20px'}}><label style={s.label}>URL Handle</label><input style={s.input} value={f.handle||''} onChange={e=>upd('handle',e.target.value)}/></div>}
                <div style={s.twoCol}>
                    <div><label style={s.label}>Name (EN)</label><input style={s.input} value={f.product_name_en||''} onChange={e=>upd('product_name_en',e.target.value)}/></div>
                    <div><label style={s.label}>名称 (中文)</label><input style={s.input} value={f.product_name||''} onChange={e=>upd('product_name',e.target.value)}/></div>
                </div>
                <div style={{...s.twoCol,marginTop:'20px'}}>
                    <div><label style={s.label}>Category</label>
                        <select style={{...s.input,appearance:'auto'as const}} value={catId} onChange={e=>{const c=SOL_CATEGORIES.find(x=>x.id===e.target.value);upd('category_id',e.target.value);upd('category_name',c?.name||'');}}>
                            <option value="">-- Select --</option>{SOL_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                        </select></div>
                    <div><label style={s.label}>Category Slug</label><input style={s.input} value={f.category_primary||''} onChange={e=>upd('category_primary',e.target.value)}/></div>
                </div>
                <div style={{marginTop:'20px'}}><label style={s.label}>Main Image</label>
                    <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
                        <input style={{...s.input,flex:1}} value={f.main_image||''} onChange={e=>upd('main_image',e.target.value)}/>
                        {f.main_image?<img src={f.main_image} alt="" style={{width:'120px',height:'90px',objectFit:'contain',borderRadius:'8px',border:'1px solid #e2e8f0',backgroundColor:'#f8fafc'}}/>:<div style={{width:'120px',height:'90px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'8px',border:'1px dashed #cbd5e1',color:'#94a3b8',backgroundColor:'#f8fafc'}}><ImageIcon size={28}/></div>}
                    </div></div>
            </div>

            <div style={s.card}><h2 style={s.title}>📝 Summary</h2>
                <div style={s.twoCol}>
                    <div><label style={s.label}>Summary (EN)</label><textarea style={{...s.input,resize:'vertical'as const,height:'160px',lineHeight:'1.6'}} value={f.summary_en||''} onChange={e=>upd('summary_en',e.target.value)}/></div>
                    <div><label style={s.label}>简介 (中文)</label><textarea style={{...s.input,resize:'vertical'as const,height:'160px',lineHeight:'1.6'}} value={f.summary||''} onChange={e=>upd('summary',e.target.value)}/></div>
                </div></div>

            <div style={s.card}><h2 style={s.title}>🎯 Key Application & Params</h2>
                <div style={s.twoCol}>
                    <div><label style={s.label}>Application (EN)</label><textarea style={{...s.input,resize:'vertical'as const,height:'100px',lineHeight:'1.6'}} value={f.key_application_en||''} onChange={e=>upd('key_application_en',e.target.value)}/></div>
                    <div><label style={s.label}>应用 (中文)</label><textarea style={{...s.input,resize:'vertical'as const,height:'100px',lineHeight:'1.6'}} value={f.key_application||''} onChange={e=>upd('key_application',e.target.value)}/></div>
                </div>
                <div style={{...s.twoCol,marginTop:'16px'}}><div><label style={s.label}>Key Param #1 (EN)</label><input style={s.input} value={f.key_parameter_1_en||''} onChange={e=>upd('key_parameter_1_en',e.target.value)}/></div><div><label style={s.label}>核心参数 #1</label><input style={s.input} value={f.key_parameter_1||''} onChange={e=>upd('key_parameter_1',e.target.value)}/></div></div>
                <div style={{...s.twoCol,marginTop:'12px'}}>
                    <div><label style={s.label}>Key Param #2 (EN)</label><input style={s.input} value={f.key_parameter_2_en||''} onChange={e=>upd('key_parameter_2_en',e.target.value)}/></div>
                    <div><label style={s.label}>核心参数 #2</label><input style={s.input} value={f.key_parameter_2||''} onChange={e=>upd('key_parameter_2',e.target.value)}/></div>
                </div>
            </div>

            <div style={s.card}><h2 style={s.title}>⚙️ Parameters (EN)</h2>
                <GridParamEditor data={paramsEn} onChange={setParamsEn} />
            </div>
            <div style={s.card}><h2 style={s.title}>⚙️ 参数 (中文)</h2>
                <GridParamEditor data={paramsCn} onChange={setParamsCn} />
            </div>

            <div style={s.card}><h2 style={s.title}>📄 Detail Content (HTML)</h2>
                <div style={s.twoCol}>
                    <div>
                        <label style={s.label}>Detail (EN)</label>
                        <RichTextEditor value={f.detail_html_en||''} onChange={v=>upd('detail_html_en',v)} height={300} />
                    </div>
                    <div>
                        <label style={s.label}>详情 (中文)</label>
                        <RichTextEditor value={f.detail_html||''} onChange={v=>upd('detail_html',v)} height={300} />
                    </div>
                </div></div>

            <div style={s.card}><h2 style={s.title}>🔗 Recommended Products</h2>
                <input style={s.input} value={Array.isArray(f.recommended_products)?f.recommended_products.join(', '):(f.recommended_products||'')} onChange={e=>upd('recommended_products',e.target.value)} placeholder="handle1, handle2"/>
            </div>

            <div style={{...s.card,backgroundColor:showAdv?'#fffbeb':'#fff'}}>
                <button onClick={()=>{if(!showAdv)setRawJson(JSON.stringify(build(),null,2));setShowAdv(!showAdv)}} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',background:'none',border:'none',cursor:'pointer',padding:0}}>
                    <h2 style={{...s.title,marginBottom:0,paddingBottom:0,borderBottom:'none',color:'#92400e'}}>🔧 Advanced JSON</h2>
                    {showAdv?<ChevronUp size={22} color="#92400e"/>:<ChevronDown size={22} color="#92400e"/>}
                </button>
                {showAdv&&<div style={{marginTop:'16px'}}><p style={{color:'#b45309',fontSize:'1.3rem',marginBottom:'12px'}}>⚠️ Overrides all fields above.</p><textarea value={rawJson} onChange={e=>setRawJson(e.target.value)} style={{width:'100%',height:'400px',padding:'16px',fontFamily:'monospace',fontSize:'1.4rem',borderRadius:'8px',border:'1px solid #fbbf24',backgroundColor:'#fffef5',resize:'vertical',boxSizing:'border-box'}} spellCheck={false}/></div>}
            </div>

            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'60px'}}>
                <button onClick={save} disabled={saving} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 22px',backgroundColor:saving?'#93b5f0':'#3b82f6',color:'#fff',border:'none',borderRadius:'8px',cursor:saving?'not-allowed':'pointer',fontWeight:600,fontSize:'1.3rem',boxShadow:'0 1px 3px rgba(59,130,246,0.3)',transition:'all 0.2s'}}><Save size={18}/> {saving?'保存中...':'保存方案'}</button>
            </div>
        </div>
    );
}
