import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MobileCasesProps {
    locale: string;
    dict: any;
    homeCases: any[];
}

export default function MobileCases({ locale, dict, homeCases }: MobileCasesProps) {
    if (homeCases.length === 0) {
        return null;
    }

    return (
        <section style={{ padding: '40px 15px', background: '#fff', minHeight: '800px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '25px', color: '#003f98', fontWeight: 800 }}>{dict.home.sections.cases}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {homeCases.slice(0, 3).map((item, idx) => {
                    const caseTitle = locale === 'ru' ? item.title_ru : item.title;
                    return (
                        <Link key={idx} href={`/${locale}/cases/${item.handle}`} style={{ 
                            position: 'relative', 
                            height: '280px', 
                            overflow: 'hidden',
                            borderRadius: '0',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                            <Image 
                                src={item.img} 
                                alt={caseTitle} 
                                fill 
                                style={{ objectFit: 'cover' }}
                                sizes="95vw"
                            />
                            <div style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '20px'
                            }}>
                                <div style={{ width: '100%' }}>
                                    <span style={{ color: '#ff9800', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px', display: 'block', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{dict.home.labels.successCase}</span>
                                    <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: 0, lineHeight: 1.2, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{caseTitle}</h3>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
