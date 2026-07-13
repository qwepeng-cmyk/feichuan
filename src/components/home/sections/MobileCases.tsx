import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/localePath';
import { withStaticAssetVersion } from '@/lib/assetVersion';
import { localizedField } from '@/lib/localization';

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
        <section style={{ padding: '40px 15px', background: '#fff' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '25px', color: '#315ba4', fontWeight: 800 }}>{dict.home.sections.cases}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                {homeCases.slice(0, 6).map((item, idx) => {
                    const caseTitle = localizedField(item, 'title', locale);
                    return (
                        <Link key={item.handle || idx} href={localePath(locale, `/cases/${item.handle}`)} style={{
                            position: 'relative',
                            aspectRatio: '5 / 4',
                            overflow: 'hidden',
                            borderRadius: '0',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            background: '#111827'
                        }}>
                            <Image
                                src={withStaticAssetVersion(item.img)}
                                alt={caseTitle}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="45vw"
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.32) 42%, transparent 72%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '10px'
                            }}>
                                <div style={{ width: '100%' }}>
                                    <span style={{ color: '#ff9800', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px', display: 'block', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{dict.home.labels.successCase}</span>
                                    <h3 style={{
                                        color: '#fff',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        margin: 0,
                                        lineHeight: 1.25,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        wordBreak: 'break-word'
                                    }}>{caseTitle}</h3>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
