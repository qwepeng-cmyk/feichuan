import React from 'react';

export default function AboutPage() {
    return (
        <div className="about-page" style={{ paddingTop: '114px' }}>
            <main>
                {/* Banner */}
                <section className="about-banner" style={{ 
                    height: '40vh', 
                    background: 'linear-gradient(135deg, #1a2a44 0%, #315ba4 100%)', 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, marginBottom: '20px' }}>About N-TET</h1>
                        <p style={{ fontSize: '2rem', maxWidth: '800px', opacity: 0.9 }}>
                            A global leader in UAV systems and anti-drone security solutions, dedicated to world safety.
                        </p>
                    </div>
                    <div style={{ position: 'absolute', right: '-5%', bottom: '-10%', opacity: 0.1 }}>
                        <img src="/logo.png" alt="" style={{ height: '500px', filter: 'brightness(0) invert(1)' }} />
                    </div>
                </section>

                {/* Content Placeholder */}
                <section style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '3.6rem', marginBottom: '30px', color: '#333' }}>Driven by Innovation, Defined by Reliability</h2>
                        <p style={{ fontSize: '1.8rem', color: '#666', maxWidth: '900px', margin: '0 auto', lineHeight: 1.8 }}>
                            Founded with a mission to redefine low-altitude security, N-TET specializes in the R&D and manufacturing of professional-grade UAVs and C-UAS systems. Our solutions serve border defense, critical infrastructure, and emergency response sectors across the globe.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
