'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, LayoutGrid, FolderOpen, Newspaper, MessageSquare, Activity } from 'lucide-react';

type AdminStats = {
    products: number;
    solutions: number;
    cases: number;
    media: number;
    inquiries: number;
    unreadInquiries: number;
};

type DashboardCard = {
    title: string;
    value: React.ReactNode;
    subtitle?: string;
    icon: React.ReactNode;
    link: string;
    bg: string;
    highlight?: boolean;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const cards: DashboardCard[] = [
        { title: '产品总数', value: stats?.products || 0, icon: <Package size={22} color="#3b82f6" />, link: '/admin/products', bg: '#eff6ff' },
        { title: '解决方案', value: stats?.solutions || 0, icon: <LayoutGrid size={22} color="#ef4444" />, link: '/admin/solutions', bg: '#fef2f2' },
        { title: '全球案例', value: stats?.cases || 0, icon: <FolderOpen size={22} color="#10b981" />, link: '/admin/cases', bg: '#ecfdf5' },
        { title: '新闻资讯', value: stats?.media || 0, icon: <Newspaper size={22} color="#f59e0b" />, link: '/admin/media', bg: '#fffbeb' },
        { title: 'SEO 监控', value: 'Audit', icon: <Activity size={22} color="#2563eb" />, link: '/admin/seo-monitoring', bg: '#eff6ff' },
        {
            title: '客户询价',
            value: stats?.inquiries || 0,
            subtitle: stats?.unreadInquiries ? `${stats.unreadInquiries} 条未读` : '已全部处理',
            icon: <MessageSquare size={22} color="#8b5cf6" />,
            link: '/admin/inquiries',
            highlight: Boolean(stats?.unreadInquiries),
            bg: '#f5f3ff'
        },
    ];

    if (loading) {
        return <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem' }}>加载中...</div>;
    }

    return (
        <div>
            <h1 style={{ fontSize: '2.2rem', color: '#1e293b', marginBottom: '32px', fontWeight: 700, letterSpacing: 0 }}>欢迎回到 N-TET 管理系统</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {cards.map((card) => (
                    <Link href={card.link} key={card.link} style={{ textDecoration: 'none' }}>
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '22px',
                                borderRadius: '8px',
                                boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                border: card.highlight ? '1.5px solid #c4b5fd' : '1px solid #e8ecf1',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.04)'; }}
                        >
                            <div>
                                <div style={{ color: '#8896a6', fontSize: '1.3rem', fontWeight: 500, marginBottom: '10px', letterSpacing: 0 }}>
                                    {card.title}
                                </div>
                                <div style={{ color: '#1e293b', fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>
                                    {card.value}
                                </div>
                                {card.subtitle && (
                                    <div
                                        style={{
                                            color: card.highlight ? '#7c3aed' : '#a0aec0',
                                            fontSize: '1.15rem',
                                            fontWeight: 500,
                                            marginTop: '8px'
                                        }}
                                    >
                                        {card.subtitle}
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    padding: '12px',
                                    backgroundColor: card.bg,
                                    borderRadius: '8px'
                                }}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '26px 28px', borderRadius: '8px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #e8ecf1' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '16px', color: '#334155', fontWeight: 600 }}>快速指南</h2>
                <ul style={{ lineHeight: 2, color: '#5a6b7f', fontSize: '1.35rem', paddingLeft: '18px' }}>
                    <li><strong style={{ color: '#334155' }}>产品管理：</strong>管理全站产品，可修改中英文参数表、图片和所属分类。</li>
                    <li><strong style={{ color: '#334155' }}>客户询价：</strong>实时接收来自前台的询价表单，建议定期查看未读消息。</li>
                    <li><strong style={{ color: '#334155' }}>SEO 监控：</strong>查看本地 SEO/GEO 快照、llms.txt、Schema 和构建抽样。</li>
                    <li><strong style={{ color: '#334155' }}>新闻资讯：</strong>发布公司动态与行业资讯，保存后会同步到前台页面。</li>
                </ul>
            </div>
        </div>
    );
}
