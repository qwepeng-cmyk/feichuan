import React from 'react';

export default function Footer() {
    return (
        <footer className="footer" style={{ background: '#111', color: '#888', padding: '100px 0 40px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '80px', marginBottom: '60px' }}>
                    <div>
                        <img src="/logo.png" alt="Logo" style={{ height: '40px', marginBottom: '30px', filter: 'brightness(0) invert(1)' }} />
                        <p style={{ lineHeight: 1.6 }}>Global leader in delivering mission-critical defense and security solutions.</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px' }}>Solutions</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li>Border Patrol</li>
                            <li>Critical Infrastructure</li>
                            <li>Emergency Rescue</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px' }}>Products</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li>UAV Systems</li>
                            <li>C-UAS Technologies</li>
                            <li>Security Screening</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '25px' }}>Contact</h4>
                        <p>Email: info@n-tet.com</p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #222', paddingTop: '40px', textAlign: 'center', fontSize: '1.4rem' }}>
                    © 2026 N-TET Technology. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
