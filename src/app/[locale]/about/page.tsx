import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Eye, Settings } from 'lucide-react';
import MobileAboutUs from '@/components/mobile/MobileAboutUs';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}} />

            <div className="pc_only">
                <div className="about-page" style={{ paddingTop: '112px', backgroundColor: '#fff' }}>
                    <main>
                        {/* 1. Breadcrumb Row */}
                        <div className="product-breadcrumb-nav" style={{ borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
                            <div className="container">
                                <div className="breadcrumb-path" style={{ fontSize: '1.4rem', color: '#666' }}>
                                    <Link href={`/${locale}`} style={{ color: '#315ba4', textDecoration: 'none' }}>{dict.nav.home}</Link> &gt; {dict.nav.about}
                                </div>
                            </div>
                        </div>

                        {/* 2. Banner Section */}
                        <section className="product-banner" style={{
                            height: '40vh',
                            minHeight: '320px',
                            maxHeight: '450px',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            borderBottom: '1px solid #e1e8f0'
                        }}>
                            <Image src="/about/about_banner.jpg" fill style={{ objectFit: 'cover' }} priority alt={dict.about.bannerTitle} />
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>
                            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ maxWidth: '800px' }}>
                                    <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{dict.about.bannerTitle}</h1>
                                    <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.5, opacity: 0.95 }}>
                                        {dict.about.bannerDesc}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Company Profile Section */}
                        <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
                            <div className="container">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                                    <div className="profile-image-wrap">
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            backgroundColor: '#f8fafc',
                                            position: 'relative',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                        }}>
                                            <Image src="/about/about_company.jpg" fill style={{ objectFit: 'cover' }} alt={dict.about.companyProfile} />
                                        </div>
                                    </div>
                                    <div className="profile-text-content">
                                        <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '30px', position: 'relative' }}>
                                            {dict.about.companyProfile}
                                            <span style={{ display: 'block', width: '60px', height: '4px', background: '#315ba4', marginTop: '15px' }}></span>
                                        </h2>
                                        <div style={{ fontSize: '1.8rem', color: '#475569', lineHeight: 1.8, textAlign: 'left' }}>
                                            <p style={{ marginBottom: '20px' }}>
                                                {dict.about.companyDesc1}
                                            </p>
                                            <p style={{ marginBottom: '20px' }}>
                                                {dict.about.companyDesc2}
                                            </p>
                                            <p>
                                                {dict.about.companyDesc3}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. R&D Team Section */}
                        <section style={{ padding: '100px 0', backgroundColor: '#f8fafc' }}>
                            <div className="container">
                                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                                    <h2 style={{ fontSize: '3.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '15px' }}>{dict.about.rdTeam}</h2>
                                    <p style={{ fontSize: '1.8rem', color: '#64748b' }}>{dict.about.rdTeamDesc}</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '60px' }}>
                                    <div style={{
                                        background: '#315ba4',
                                        color: '#fff',
                                        padding: '50px 40px',
                                        borderRadius: '12px',
                                        boxShadow: '0 20px 40px rgba(49, 91, 164, 0.2)'
                                    }}>
                                        <div style={{ fontSize: '7.2rem', fontWeight: 900, marginBottom: '10px' }}>70%</div>
                                        <h3 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '30px' }}>{dict.about.rdRatio}</h3>
                                        <p style={{ fontSize: '1.6rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '40px' }}>
                                            {dict.about.rdExperience}
                                        </p>
                                        <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                                            <h4 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Settings size={20} /> {dict.about.rdSystem}
                                            </h4>
                                            <p style={{ fontSize: '1.5rem', opacity: 0.85, lineHeight: 1.5 }}>
                                                {dict.about.rdSystemDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
                                        <h3 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>{dict.about.coreCapabilities}</h3>
                                        
                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                            <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                                <Shield size={32} />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{dict.about.uavReliability}</h4>
                                                <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                                    {dict.about.uavReliabilityDesc}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                            <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                                <Zap size={32} />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{dict.about.intelligentAlgo}</h4>
                                                <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                                    {dict.about.intelligentAlgoDesc}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                                            <div style={{ minWidth: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#315ba4' }}>
                                                <Eye size={32} />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{dict.about.aiRecognition}</h4>
                                                <p style={{ fontSize: '1.6rem', color: '#475569', lineHeight: 1.6 }}>
                                                    {dict.about.aiRecognitionDesc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <div className="mobile_only">
                <MobileAboutUs dict={dict} />
            </div>
        </>
    );
}
