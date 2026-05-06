'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';

// Trigger re-compilation to fix 404 issue after UI updates

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) setProducts(data.data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (handle: string) => {
        const confirmCode = prompt('⚠️ 数据一旦删除将无法恢复！\n如果您确定要删除此产品，请在下方输入大写字母 "DELETE"：');
        if (confirmCode !== 'DELETE') return;
        const res = await fetch(`/api/admin/products/${handle}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter(p => p.handle !== handle));
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2.0rem', color: '#1e293b', fontWeight: 700, letterSpacing: '-0.2px' }}>产品管理</h1>
                <Link href="/admin/products/new" style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    padding: '9px 18px', backgroundColor: '#3b82f6', color: '#fff', 
                    borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1.3rem',
                    boxShadow: '0 1px 3px rgba(59,130,246,0.3)', transition: 'all 0.2s'
                }}>
                    <Plus size={18} /> 新增产品
                </Link>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #e8ecf1' }}>
                {loading ? <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #edf0f4' }}>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>图片</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>产品名称</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>分类</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px', textAlign: 'right' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.handle} style={{ borderBottom: '1px solid #f4f6f8', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafbfd')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}>
                                    <td style={{ padding: '14px 22px' }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={p.main_image} alt={p.product_name_en} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #edf0f4' }} />
                                    </td>
                                    <td style={{ padding: '14px 22px' }}>
                                        <div style={{ fontWeight: 600, color: '#334155', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '3px' }}>
                                            {p.product_name_en}
                                        </div>
                                        <div style={{ fontSize: '1.2rem', color: '#a0aec0', fontWeight: 400 }}>{p.handle}</div>
                                    </td>
                                    <td style={{ padding: '14px 22px' }}>
                                        <span style={{ display: 'inline-block', padding: '4px 10px', backgroundColor: '#f0f4f8', color: '#5a6b7f', borderRadius: '6px', fontSize: '1.2rem', fontWeight: 500 }}>
                                            {p.category_primary}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 22px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Link href={`/products/${p.handle}`} target="_blank" style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '5px', 
                                                padding: '7px 14px', backgroundColor: '#f0f9ff', color: '#0284c7', 
                                                borderRadius: '7px', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 500,
                                                transition: 'all 0.15s'
                                            }}>
                                                <Eye size={14} /> 查看
                                            </Link>
                                            <Link href={`/admin/products/${p.handle}`} style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '5px', 
                                                padding: '7px 14px', backgroundColor: '#f0f4f8', color: '#475569', 
                                                borderRadius: '7px', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 500,
                                                transition: 'all 0.15s'
                                            }}>
                                                <Edit size={14} /> 编辑
                                            </Link>
                                            <button onClick={() => handleDelete(p.handle)} style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '5px', 
                                                padding: '7px 14px', backgroundColor: '#fff', color: '#e05252', 
                                                border: '1px solid #fddede', borderRadius: '7px', cursor: 'pointer',
                                                fontSize: '1.25rem', fontWeight: 500, transition: 'all 0.15s'
                                            }}>
                                                <Trash2 size={14} /> 删除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
