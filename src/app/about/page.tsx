import React from 'react';

export default function AboutPage() {
    return (
        <div className="about-page" style={{ paddingTop: '114px' }}>
            <main>
                {/* 1. Breadcrumb Row - Consistency with other center pages */}
                <div className="product-breadcrumb-nav">
                    <div className="container">
                        <div className="breadcrumb-path">
                            <a href="/">Home</a> &gt; About Us
                        </div>
                    </div>
                </div>

                {/* 2. Banner Section */}
                <section className="about-banner" style={{ 
                    height: '40vh', 
                    minHeight: '320px',
                    background: "url('/about/about_banner.jpg') center center / cover no-repeat", 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#fff',
                    position: 'relative', 
                    overflow: 'hidden'
                }}>
                    {/* Visual Overlay - Darker for pure white text visibility */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', zIndex: 0 }}></div>
                    
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '5.2rem', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>About N-TET</h1>
                        <p style={{ fontSize: '2rem', maxWidth: '800px', opacity: 1, color: '#fff' }}>
                            A global leader in UAV systems and anti-drone security solutions, dedicated to world safety.
                        </p>
                    </div>
                </section>

                {/* 3. Content Section */}
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
