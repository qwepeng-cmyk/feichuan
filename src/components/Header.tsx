'use client';

import React, { useEffect, useState } from 'react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="site-header" className={scrolled ? 'scrolled' : ''}>
            <div className="container nav-container">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
                    <img src="/logo.png" alt="N-TET Logo" className="logo-dark" />
                </a>

                <nav className="main-nav">
                    <div className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                    </div>

                    <div className="nav-item">
                        <div className="nav-link">Products</div>
                        <div className="mega-menu">
                            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', width: '100%' }}>
                                <div className="mega-column">
                                    <h3 className="mega-title">UAV & Drone Systems</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">Multi-Rotor UAVs</a></li>
                                        <li><a href="#">VTOL Fixed-Wing</a></li>
                                        <li><a href="#">Tethered UAVs</a></li>
                                    </ul>
                                </div>
                                <div className="mega-column">
                                    <h3 className="mega-title">Anti-Drone / C-UAS</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">Detection Radars</a></li>
                                        <li><a href="#">RF Detection Systems</a></li>
                                    </ul>
                                </div>
                                <div className="mega-column">
                                    <h3 className="mega-title">Security Screening</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">X-Ray baggage scanners</a></li>
                                        <li><a href="#">Walk-through metal detectors</a></li>
                                    </ul>
                                </div>
                                <div className="mega-column">
                                    <h3 className="mega-title">Defense Logistics</h3>
                                    <ul className="mega-list">
                                        <li><a href="#">Prefabricated Steel Bridges</a></li>
                                        <li><a href="#">Containerized Medical Systems</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nav-item">
                        <div className="nav-link">Solutions</div>
                        <div className="mega-menu">
                            <div className="mega-column">
                                <h3 className="mega-title">Border Patrol</h3>
                                <ul className="mega-list">
                                    <li><a href="#">Drone Maritime Patrol</a></li>
                                </ul>
                            </div>
                            <div className="mega-column">
                                <h3 className="mega-title">Disaster Rescue</h3>
                                <ul className="mega-list">
                                    <li><a href="#">Emergency Communication</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="nav-item"><div className="nav-link">Cases</div></div>
                    <div className="nav-item"><div className="nav-link">News</div></div>
                    <div className="nav-item"><div className="nav-link">About</div></div>

                    <div className="lang-switch">
                        <div className="lang-switch-text">
                            English <svg style={{ width: '12px', height: '12px', marginLeft: '5px' }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35.8L492.2 729c9.4 11.5 28.1 11.5 37.5 0L858.9 335.8c12.2-15 1.2-35.8-18.5-35.8z"></path>
                            </svg>
                        </div>
                        <ul className="lang-dropdown">
                            <li>中文</li>
                            <li>Русский</li>
                            <li>Español</li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
