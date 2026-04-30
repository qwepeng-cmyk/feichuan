'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Building, Mail, Phone, Globe, MessageSquare, Tag } from 'lucide-react';

export default function InquiryDetailPage({ params }: { params: { id: string } }) {
    const [inquiry, setInquiry] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Fetch details and mark as read
        const fetchDetails = async () => {
            try {
                const res = await fetch(`/api/admin/inquiries/${params.id}`);
                const data = await res.json();
                
                if (data.success) {
                    setInquiry(data.data);
                    
                    // Mark as read if it's unread
                    if (data.data.is_read === 0) {
                        await fetch(`/api/admin/inquiries/${params.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ is_read: 1 })
                        });
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDetails();
    }, [params.id]);

    if (loading) return <div style={{ padding: '40px', color: '#666', fontSize: '1.4rem' }}>Loading inquiry details...</div>;
    if (!inquiry) return <div style={{ padding: '40px', color: '#e53e3e', fontSize: '1.4rem' }}>Inquiry not found.</div>;

    let demands = [];
    try {
        demands = JSON.parse(inquiry.demands);
    } catch(e) {}

    return (
        <div>
            <button 
                onClick={() => router.push('/admin/inquiries')}
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'none', border: 'none', color: '#315ba4', 
                    cursor: 'pointer', fontSize: '1.4rem', fontWeight: 600,
                    marginBottom: '24px', padding: 0
                }}
            >
                <ArrowLeft size={20} /> Back to List
            </button>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '24px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2.2rem', color: '#1e293b', fontWeight: 700, margin: 0 }}>
                        Inquiry #{inquiry.id}
                    </h1>
                    <div style={{ color: '#64748b', fontSize: '1.3rem' }}>
                        Submitted: {new Date(inquiry.created_at).toLocaleString()}
                    </div>
                </div>

                <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                    {/* Left Column: Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', color: '#475569', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
                            Contact Information
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <User size={20} color="#94a3b8" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2px' }}>Name</div>
                                    <div style={{ fontSize: '1.4rem', color: '#1e293b', fontWeight: 500 }}>{inquiry.name}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Building size={20} color="#94a3b8" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2px' }}>Company</div>
                                    <div style={{ fontSize: '1.4rem', color: '#1e293b', fontWeight: 500 }}>{inquiry.company || '-'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Mail size={20} color="#94a3b8" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2px' }}>Email</div>
                                    <a href={`mailto:${inquiry.email}`} style={{ fontSize: '1.4rem', color: '#315ba4', fontWeight: 500, textDecoration: 'none' }}>
                                        {inquiry.email}
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Phone size={20} color="#94a3b8" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2px' }}>
                                        Phone ({inquiry.contact_method || 'Phone'})
                                    </div>
                                    <div style={{ fontSize: '1.4rem', color: '#1e293b', fontWeight: 500 }}>
                                        {inquiry.country_code} {inquiry.phone}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <Globe size={20} color="#94a3b8" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2px' }}>Source Page</div>
                                    <div style={{ fontSize: '1.4rem', color: '#1e293b', wordBreak: 'break-all' }}>
                                        <a href={inquiry.source_page} target="_blank" rel="noreferrer" style={{ color: '#315ba4', textDecoration: 'none' }}>
                                            {inquiry.source_page}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Request Details */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', color: '#475569', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
                            Request Details
                        </h3>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Tag size={18} color="#64748b" />
                                <span style={{ fontSize: '1.4rem', color: '#64748b', fontWeight: 600 }}>Inquiry Types</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {demands.length > 0 ? demands.map((demand: string) => (
                                    <span key={demand} style={{ 
                                        padding: '6px 12px', backgroundColor: '#e0e7ff', color: '#4338ca', 
                                        borderRadius: '20px', fontSize: '1.2rem', fontWeight: 600 
                                    }}>
                                        {demand}
                                    </span>
                                )) : (
                                    <span style={{ color: '#94a3b8', fontSize: '1.3rem' }}>No specific type selected</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <MessageSquare size={18} color="#64748b" />
                                <span style={{ fontSize: '1.4rem', color: '#64748b', fontWeight: 600 }}>Project Details / Message</span>
                            </div>
                            <div style={{ 
                                padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', 
                                border: '1px solid #e2e8f0', fontSize: '1.4rem', color: '#334155',
                                lineHeight: '1.6', whiteSpace: 'pre-wrap', minHeight: '150px'
                            }}>
                                {inquiry.message || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No message provided.</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
