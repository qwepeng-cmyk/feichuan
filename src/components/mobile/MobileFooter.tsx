'use client';

import React from 'react';
import Link from 'next/link';

export default function MobileFooter() {
    return (
        <footer style={{ background: '#000f24', color: '#fff', padding: '50px 20px 120px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <img src="/logo1.png" alt="Logo" style={{ height: '48px', filter: 'brightness(0) invert(1)', marginBottom: '30px' }} />
                
                {/* Consultation 按钮 */}
                <a href="/contact" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'transparent',
                    color: '#fff',
                    height: '48px',
                    borderRadius: '24px',
                    border: '1px solid #fff',
                    textDecoration: 'none',
                    fontSize: '18px',
                    fontWeight: 700,
                    margin: '0 auto 40px',
                    width: '90%'
                }}>
                    <span style={{ fontSize: '20px' }}>🎧</span> Consultation
                </a>
            </div>

            {/* 详细链接区域 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* About Us 段落 */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>About Us</h4>
                    <p style={{ color: '#888', fontSize: '16px', lineHeight: '1.6' }}>
                        Leading provider of intelligent UAV systems and integrated C-UAS technologies, dedicated to delivering advanced defense and security solutions worldwide.
                    </p>
                </div>

                {/* Solutions 列表 */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>Solutions</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Link href="/solutions/category/01_BorderPatrol" style={{ color: '#888', fontSize: '16px' }}>Border Patrol</Link>
                        <Link href="/solutions/category/02_InfrastructureProtection" style={{ color: '#888', fontSize: '16px' }}>Infrastructure Protection</Link>
                        <Link href="/solutions/category/03_KeyAreaSecurity" style={{ color: '#888', fontSize: '16px' }}>Key Area Security</Link>
                        <Link href="/solutions/category/04_EmergencyRescue" style={{ color: '#888', fontSize: '16px' }}>Emergency Rescue</Link>
                    </div>
                </div>

                {/* Products 列表 */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>Products</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Link href="/products#uav-drone-systems" style={{ color: '#888', fontSize: '16px' }}>UAV Systems</Link>
                        <Link href="/products#anti-drone-cuas" style={{ color: '#888', fontSize: '16px' }}>C-UAS Technologies</Link>
                        <Link href="/products#security-screening" style={{ color: '#888', fontSize: '16px' }}>Security Screening</Link>
                        <Link href="/products#defense-engineering" style={{ color: '#888', fontSize: '16px' }}>Defense Engineering</Link>
                        <Link href="/products#field-hospitals" style={{ color: '#888', fontSize: '16px' }}>Field Hospitals</Link>
                        <Link href="/products#perimeter-intelligence" style={{ color: '#888', fontSize: '16px' }}>Perimeter Surveillance</Link>
                    </div>
                </div>

                {/* Contact Us 列表 */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>Contact Us</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>WhatsApp</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>+86 136 1371 4648</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>Email</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>info@n-tetbj.com</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>Sales Hotline</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>+86 010 8362 2127</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center', color: '#444', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <p>© 2026 N-TET Technology. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
