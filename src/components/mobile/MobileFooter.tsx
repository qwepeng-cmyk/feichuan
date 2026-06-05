'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { solutions as homeSolutions } from '@/constants/homeData';
import { localizedField } from '@/lib/localization';

export default function MobileFooter({ locale, dict }: { locale: string; dict: any }) {
    const l = (path: string) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
    const footerSolutions = homeSolutions.slice(0, 6);

    return (
        <footer style={{ background: '#000f24', color: '#fff', padding: '50px 20px 120px' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <Image src="/logo1-small.webp" alt="Logo" width={140} height={48} style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '30px' }} />
                
                {/* Consultation button */}
                <Link prefetch={false} href={l("/contact")} style={{
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
                    {dict.contact.consultation}
                </Link>
            </div>

            {/* Footer link sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* About us */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.aboutUs}</h4>
                    <p style={{ color: '#888', fontSize: '16px', lineHeight: '1.6' }}>
                        {dict.footer.tagline}
                    </p>
                </div>

                {/* Solutions */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.solutions}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {footerSolutions.map((solution) => {
                            const title = localizedField(solution, 'title', locale);
                            return (
                                <Link key={solution.id} prefetch={false} href={l(solution.link)} style={{ color: '#888', fontSize: '16px' }}>
                                    {title}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '15px' }}>{dict.nav.products}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Link prefetch={false} href={l("/products#uav-drone-systems")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.uavSystems}</Link>
                        <Link prefetch={false} href={l("/products")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.droneDetection}</Link>
                        <Link prefetch={false} href={l("/products#security-screening")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.securityScreening}</Link>
                        <Link prefetch={false} href={l("/products")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.engineeringMaterials}</Link>
                        <Link prefetch={false} href={l("/products#field-hospitals")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.fieldHospitals}</Link>
                        <Link prefetch={false} href={l("/products#perimeter-intelligence")} style={{ color: '#888', fontSize: '16px' }}>{dict.megaMenu.perimeterSurveillance}</Link>
                    </div>
                </div>


                {/* Contact us */}
                <div>
                    <h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>{dict.nav.contact}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.whatsapp}</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>+86 136 1371 4648</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.email}</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>info@n-tetbj.com</div>
                        </div>
                        <div>
                            <div style={{ color: '#666', marginBottom: '6px', fontSize: '13px', textTransform: 'uppercase' }}>{dict.contact.salesHotline}</div>
                            <div style={{ color: '#888', fontSize: '16px' }}>+86 010 8362 2127</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px', textAlign: 'center', color: '#444', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <p>{dict.footer.copyright}</p>
            </div>
        </footer>
    );
}


