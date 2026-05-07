'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

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

export default function CaseEditPage({ params }: { params: { handle: string } }) {
    const isNew = params.handle === 'new';
    const router = useRouter();
    const [f, setF] = useState<any>({});
    const [caseImages, setCaseImages] = useState<string[]>([]);
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
            fetch(`/api/admin/cases/${params.handle}`).then(r=>r.json()).then(({success,data})=>{
                if(!success){setLoading(false);return;}
                setF(data);
                setCaseImages(data.case_images||[]);
                const pEn = data.parameters_en;
                if (pEn && !Array.isArray(pEn)) setParamsEn([['Parameter', 'Value'], ...(Object.entries(pEn) as string[][])]);
                else if (Array.isArray(pEn)) setParamsEn(pEn);
                const pCn = data.parameters;
                if (pCn && !Array.isArray(pCn)) setParamsCn([['参数', '值'], ...(Object.entries(pCn) as string[][])]);
                else if (Array.isArray(pCn)) setParamsCn(pCn);
                setRawJson(JSON.stringify(data,null,2));
                setLoading(false);
            });
        }
    }, [params.handle, isNew]);

    const upd = (k:string,v:any) => setF((p:any)=>({...p,[k]:v}));

    const build = () => ({
        ...f,
        case_images: caseImages.filter(Boolean),
        parameters: paramsCn,
        parameters_en: paramsEn,
        recommendedProductHandles: typeof f.recommendedProductHandles==='string'
            ? f.recommendedProductHandles.split(',').map((s:string)=>s.trim()).filter(Boolean)
            : (f.recommendedProductHandles||[]),
    });

    const save = async () => {
        setSaving(true); setError(''); setOk('');
        let d; if(showAdv){try{d=JSON.parse(rawJson)}catch{setError('Invalid JSON');setSaving(false);return;}} else d=build();
        const url = isNew ? '/api/admin/cases' : `/api/admin/cases/${params.handle}`;
        try {
            const r = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
            const j = await r.json();
            if (j.success) {
                setOk('Saved successfully!');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => router.push('/admin/cases'), 1500);
            } else setError(j.error || 'Failed')
        } catch { setError('Server error') } finally { setSaving(false) }
    };

    if (loading) return <div style={{padding:'60px',textAlign:'center',color:'#94a3b8',fontSize:'1.4rem'}}>加载中...</div>;

    return (
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
            <button onClick={()=>router.push('/admin/cases')} style={{display:'flex',alignItems:'center',gap:'6px',background:'none',border:'none',color:'#6b87b5',cursor:'pointer',fontSize:'1.3rem',fontWeight:500,marginBottom:'18px',padding:0}}><ArrowLeft size={18}/> 返回案例列表</button>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
                <h1 style={{fontSize:'2.0rem',color:'#1e293b',fontWeight:700,margin:0,letterSpacing:'-0.2px'}}>{isNew?'新增案例':'编辑案例'}</h1>
                <button onClick={save} disabled={saving} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 22px',backgroundColor:saving?'#93b5f0':'#3b82f6',color:'#fff',border:'none',borderRadius:'8px',cursor:saving?'not-allowed':'pointer',fontWeight:600,fontSize:'1.3rem',boxShadow:'0 1px 3px rgba(59,130,246,0.3)',transition:'all 0.2s'}}><Save size={18}/> {saving?'保存中...':'保存案例'}</button>
            </div>
            {error && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '12px', border: '1px solid #fed7d7', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>⚠️</span> {error}</div>}
            {ok && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '14px 30px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '12px', border: '1px solid #c6f6d5', fontSize: '1.4rem', fontWeight: 600, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}><span>✅</span> {ok}</div>}

            {/* Identity */}
            <div style={s.card}><h2 style={s.title}>🌍 Case Identity</h2>
                {isNew&&<div style={{marginBottom:'20px'}}><label style={s.label}>URL Handle</label><input style={s.input} value={f.handle||''} onChange={e=>upd('handle',e.target.value)}/></div>}
                <div style={s.twoCol}>
                    <div><label style={s.label}>Title (EN)</label><input style={s.input} value={f.title_en||''} onChange={e=>upd('title_en',e.target.value)}/></div>
                    <div><label style={s.label}>标题 (中文)</label><input style={s.input} value={f.title||''} onChange={e=>upd('title',e.target.value)}/></div>
                </div>
                <div style={{...s.twoCol,marginTop:'20px'}}>
                    <div><label style={s.label}>Region</label><input style={s.input} value={f.region_en||''} onChange={e=>upd('region_en',e.target.value)} placeholder="e.g. Asia, Africa"/></div>
                    <div><label style={s.label}>Country</label><input style={s.input} value={f.country_en||''} onChange={e=>upd('country_en',e.target.value)} placeholder="e.g. Pakistan"/></div>
                </div>
                <div style={{marginTop:'20px'}}><label style={s.label}>Solution Category ID</label><input style={s.input} value={f.solution_category_id||''} onChange={e=>upd('solution_category_id',e.target.value)} placeholder="e.g. anti-drone"/></div>
            </div>

            {/* Images */}
            <div style={s.card}><h2 style={s.title}>🖼️ Images</h2>
                <div style={{marginBottom:'20px'}}>
                    <label style={s.label}>Main Image</label>
                    <div style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
                        <input style={{...s.input,flex:1}} value={f.main_image||''} onChange={e=>upd('main_image',e.target.value)}/>
                        {f.main_image?<img src={f.main_image} alt="" style={{width:'120px',height:'90px',objectFit:'contain',borderRadius:'8px',border:'1px solid #e2e8f0',backgroundColor:'#f8fafc'}}/>:<div style={{width:'120px',height:'90px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'8px',border:'1px dashed #cbd5e1',color:'#94a3b8',backgroundColor:'#f8fafc'}}><ImageIcon size={28}/></div>}
                    </div>
                </div>
                <label style={s.label}>Gallery Images</label>
                {caseImages.map((img,i)=>(
                    <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'10px'}}>
                        <input style={{...s.input,flex:1}} value={img} onChange={e=>{const c=[...caseImages];c[i]=e.target.value;setCaseImages(c)}} placeholder="/cases/image.jpg"/>
                        {img&&<img src={img} alt="" style={{width:'60px',height:'40px',objectFit:'cover',borderRadius:'4px',border:'1px solid #e2e8f0'}}/>}
                        <button onClick={()=>setCaseImages(caseImages.filter((_,j)=>j!==i))} style={{padding:'10px',background:'#fff5f5',border:'1px solid #fed7d7',borderRadius:'8px',cursor:'pointer',color:'#e53e3e'}}><Trash2 size={16}/></button>
                    </div>
                ))}
                <button onClick={()=>setCaseImages([...caseImages,''])} style={{display:'flex',alignItems:'center',gap:'6px',padding:'10px 16px',backgroundColor:'#f0f9ff',color:'#315ba4',border:'1px dashed #93c5fd',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'1.3rem'}}><Plus size={16}/> Add Image</button>
            </div>

            {/* Description */}
            <div style={s.card}><h2 style={s.title}>📝 Description</h2>
                <div style={s.twoCol}>
                    <div><label style={s.label}>Description (EN)</label><textarea style={{...s.input,height:'200px',resize:'vertical'as const,lineHeight:'1.6'}} value={f.description_en||''} onChange={e=>upd('description_en',e.target.value)}/></div>
                    <div><label style={s.label}>描述 (中文)</label><textarea style={{...s.input,height:'200px',resize:'vertical'as const,lineHeight:'1.6'}} value={f.description||''} onChange={e=>upd('description',e.target.value)}/></div>
                </div>
            </div>

            <div style={s.card}><h2 style={s.title}>⚙️ Parameters (EN)</h2>
                <GridParamEditor data={paramsEn} onChange={setParamsEn} />
            </div>
            <div style={s.card}><h2 style={s.title}>⚙️ 参数 (中文)</h2>
                <GridParamEditor data={paramsCn} onChange={setParamsCn} />
            </div>

            {/* Recommended */}
            <div style={s.card}><h2 style={s.title}>🔗 Recommended Products</h2>
                <input style={s.input} value={Array.isArray(f.recommendedProductHandles)?f.recommendedProductHandles.join(', '):(f.recommendedProductHandles||'')} onChange={e=>upd('recommendedProductHandles',e.target.value)} placeholder="handle1, handle2"/>
            </div>

            {/* Advanced */}
            <div style={{...s.card,backgroundColor:showAdv?'#fffbeb':'#fff'}}>
                <button onClick={()=>{if(!showAdv)setRawJson(JSON.stringify(build(),null,2));setShowAdv(!showAdv)}} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',background:'none',border:'none',cursor:'pointer',padding:0}}>
                    <h2 style={{...s.title,marginBottom:0,paddingBottom:0,borderBottom:'none',color:'#92400e'}}>🔧 Advanced JSON</h2>
                    {showAdv?<ChevronUp size={22} color="#92400e"/>:<ChevronDown size={22} color="#92400e"/>}
                </button>
                {showAdv&&<div style={{marginTop:'16px'}}><p style={{color:'#b45309',fontSize:'1.3rem',marginBottom:'12px'}}>⚠️ Overrides all fields above.</p><textarea value={rawJson} onChange={e=>setRawJson(e.target.value)} style={{width:'100%',height:'400px',padding:'16px',fontFamily:'monospace',fontSize:'1.4rem',borderRadius:'8px',border:'1px solid #fbbf24',backgroundColor:'#fffef5',resize:'vertical',boxSizing:'border-box'}} spellCheck={false}/></div>}
            </div>

            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'60px'}}>
                <button onClick={save} disabled={saving} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 22px',backgroundColor:saving?'#93b5f0':'#3b82f6',color:'#fff',border:'none',borderRadius:'8px',cursor:saving?'not-allowed':'pointer',fontWeight:600,fontSize:'1.3rem',boxShadow:'0 1px 3px rgba(59,130,246,0.3)',transition:'all 0.2s'}}><Save size={18}/> {saving?'保存中...':'保存案例'}</button>
            </div>
        </div>
    );
}
