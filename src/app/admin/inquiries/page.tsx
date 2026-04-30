'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Mail, Building, Clock } from 'lucide-react';

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/inquiries')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setInquiries(data.data);
                }
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2.0rem', color: '#1e293b', fontWeight: 700, letterSpacing: '-0.2px' }}>询价管理</h1>
                <div style={{ padding: '6px 14px', backgroundColor: '#eef2f7', borderRadius: '18px', fontSize: '1.25rem', fontWeight: 600, color: '#5a6b7f' }}>
                    共 {inquiries.length} 条
                </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #e8ecf1' }}>
                {loading ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div>
                ) : inquiries.length === 0 ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>暂无询价记录</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #edf0f4' }}>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>状态</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>联系人</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>公司</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px' }}>日期</th>
                                <th style={{ padding: '13px 22px', color: '#8896a6', fontWeight: 500, fontSize: '1.3rem', letterSpacing: '0.3px', textAlign: 'right' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map(inq => (
                                <tr key={inq.id} style={{ borderBottom: '1px solid #f4f6f8', backgroundColor: inq.is_read ? '#fff' : '#f8fbff', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = inq.is_read ? '#fafbfd' : '#f0f6ff')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = inq.is_read ? '#fff' : '#f8fbff')}>
                                    <td style={{ padding: '14px 22px' }}>
                                        {inq.is_read ? (
                                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></span>
                                        ) : (
                                            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)' }}></span>
                                        )}
                                    </td>
                                    <td style={{ padding: '14px 22px' }}>
                                        <div style={{ fontWeight: inq.is_read ? 500 : 600, color: '#334155', fontSize: '1.4rem', marginBottom: '3px' }}>
                                            {inq.name}
                                        </div>
                                        <div style={{ fontSize: '1.2rem', color: '#a0aec0', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Mail size={12} /> {inq.email}
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 22px', color: '#5a6b7f', fontSize: '1.3rem' }}>
                                        {inq.company ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={14} color="#a0aec0" /> {inq.company}</span>
                                        ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                                    </td>
                                    <td style={{ padding: '14px 22px', color: '#8896a6', fontSize: '1.3rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={14} /> 
                                            {new Date(inq.created_at).toLocaleDateString()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 22px', textAlign: 'right' }}>
                                        <Link href={`/admin/inquiries/${inq.id}`} style={{ 
                                            display: 'inline-flex', alignItems: 'center', gap: '5px', 
                                            padding: '7px 14px', backgroundColor: '#f0f4f8', 
                                            color: '#475569', borderRadius: '7px', textDecoration: 'none',
                                            fontSize: '1.25rem', fontWeight: 500, transition: 'all 0.15s'
                                        }}>
                                            <Eye size={14} /> 查看
                                        </Link>
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
