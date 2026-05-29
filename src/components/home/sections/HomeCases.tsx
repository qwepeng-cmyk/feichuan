import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';

interface HomeCasesProps {
    locale: string;
    dict: any;
    homeCases: any[];
}

export default function HomeCases({ locale, dict, homeCases }: HomeCasesProps) {
    if (homeCases.length === 0) {
        return null;
    }

    return (
        <section className="section-cases" style={{ padding: '80px 0 100px', background: '#fff', minHeight: '600px' }}>
            <div className="container-wide">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '3.6rem', fontWeight: 700 }}>{dict.home.sections.cases}</h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '20px auto' }}></div>
                </div>
                <div className="cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                    {homeCases.map((item, idx) => {
                        const localizedCaseTitle = locale === 'ru' ? item.title_ru : item.title;
                        return (
                            <Link
                                key={idx}
                                href={localePath(locale, `/cases/${item.handle}`)}
                                className="case-card-link"
                                style={{
                                    position: 'relative',
                                    borderRadius: '0',
                                    overflow: 'hidden',
                                    height: '320px',
                                    display: 'block',
                                    textDecoration: 'none',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    transition: 'all 0.4s ease'
                                }}
                            >
                                <Image 
                                    src={item.img} 
                                    alt={localizedCaseTitle} 
                                    fill 
                                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                                    sizes="(max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="case-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '30px',
                                    transition: 'background 0.4s ease'
                                }}>
                                    <span style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', display: 'block', letterSpacing: '0.1em', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{dict.home.labels.successCase}</span>
                                    <h3 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 700, margin: 0, lineHeight: 1.2, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{localizedCaseTitle}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <Link href={localePath(locale, '/cases')} className="btn btn-orange" style={{ padding: '15px 40px' }}>{dict.home.buttons.viewAllCases}</Link>
                </div>
            </div>
            <style jsx>{`
                .case-card-link:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                .case-card-link:hover :global(img) {
                    transform: scale(1.1);
                }
                .case-card-link:hover .case-overlay {
                    background: linear-gradient(to top, rgba(49, 91, 164, 0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                }
            `}</style>
        </section>
    );
}
