'use client';

import type { ReactNode } from 'react';
import MobileSolutionCenter from '@/components/mobile/MobileSolutionCenter';
import CategoryNav from '@/components/products/CategoryNav';
import InquiryForm from '@/components/products/InquiryForm';
import Link from 'next/link';
import Image from 'next/image';
import { localePath } from '@/lib/localePath';
import { solutionCenterGroups, solutionCenterImageByHandle } from '@/lib/solutionCenterGroups';

interface Solution {
    id: string;
    title_en: string;
    product_name_en?: string;
    product_name_ru?: string;
    summary_en?: string;
    summary_ru?: string;
    main_image?: string;
    category_id: string;
    [key: string]: any;
}

interface DisplayGroup {
    id: string;
    name: string;
    categoryHref?: string;
    icon: ReactNode;
    solutions: Solution[];
}

export default function SolutionCenterClient({
    allSolutions,
    locale,
    dict
}: {
    allSolutions: Solution[],
    locale: string,
    dict: any
}) {
    const ICON_CAMERA = (
        <g>
            <path d="M14 12h20l2 10H12l2-10z" fill="rgba(49, 91, 164, 0.05)" />
            <circle cx="24" cy="28" r="10" />
            <circle cx="24" cy="28" r="4" fill="#315ba4" stroke="none" />
            <path d="M14 28h20M24 18v20" strokeOpacity="0.2" />
            <rect x="20" y="38" width="8" height="4" />
            <path d="M12 22h24" strokeWidth="2" />
        </g>
    );

    const ICON_AIRSPACE = (
        <g>
            <path d="M10 24a14 14 0 0 1 28 0H10z" fill="rgba(49, 91, 164, 0.05)" />
            <path d="M10 24h28M14 26h20v2H14z" />
            <path d="M24 28v4M18 42l6-10 6 10M24 32v2M20 37l-4 5m12-5l4 5" />
            <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeDasharray="2 2" />
        </g>
    );

    const GROUP_ICONS: Record<string, ReactNode> = {
        'uav-inspection-patrol': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">
                    <path d="M24 10l2 24-2 4-2-4 2-24z" fill="rgba(49, 91, 164, 0.05)" />
                    <path d="M4 22l20-4 20 4-20 4L4 22z" strokeWidth="1.8" />
                    <path d="M18 36l6-2 6 2-6 2-6-2z" />
                    <g fill="#315ba4" stroke="none">
                        <rect x="10" y="16" width="1.5" height="12" rx="0.5" />
                        <rect x="37" y="16" width="1.5" height="12" rx="0.5" />
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        'uav-emergency-response': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.2" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M18 7c2-2 10-2 12 0M15 4c3-3 15-3 18 0M12 1c4-4 20-4 24 0" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <path d="M24 18l4 2v6l-4 3-4-3v-6l4-2z" fill="rgba(49, 91, 164, 0.1)" strokeWidth="1.5" />
                    <g strokeWidth="1.5" strokeLinecap="round">
                        <path d="M24 18V9M24 28v10" />
                        <path d="M21 19.5l-8-5M27 26.5l8 5M21 26.5l-8 5M27 19.5l8-5" />
                    </g>
                    <path d="M22 30l-10 16h24l-10-16z" fill="rgba(255, 152, 0, 0.25)" stroke="none" />
                    <path d="M18 42l-2 4M24 42v4M30 42l2 4" stroke="#ff9800" strokeWidth="1" strokeLinecap="round" />
                    <g fill="#315ba4" stroke="none">
                        <g transform="translate(24,9)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(24,38)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,14.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,31.5) rotate(60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(13,31.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                        <g transform="translate(35,14.5) rotate(-60)"><path d="M-6.5,-0.8 Q-4,0 -1,0 Q-4,0.8 -6.5,0.8 Z M6.5,0.8 Q4,0 1,0 Q4,-0.8 6.5,-0.8 Z" /></g>
                    </g>
                </g>
            </svg>
        ),
        'critical-infrastructure-protection': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">{ICON_AIRSPACE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">{ICON_CAMERA}</g>
            </svg>
        ),
        'key-area-security': (
            <svg viewBox="0 0 110 48" fill="none" stroke="#315ba4" strokeWidth="1.5" style={{ height: '48px', width: 'auto' }}>
                <g transform="translate(0, 0)">{ICON_AIRSPACE}</g>
                <path d="M52 24h6M55 21v6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(62, 0)">
                    <rect x="12" y="6" width="24" height="36" />
                    <path d="M16 6v36M32 6v36" strokeWidth="2" />
                    <rect x="18" y="8" width="12" height="6" fill="rgba(49, 91, 164, 0.1)" />
                    <path d="M12 18h24M12 24h24M12 30h24M12 36h24" strokeOpacity="0.3" />
                    <circle cx="24" cy="11" r="1.5" fill="#315ba4" stroke="none" />
                </g>
            </svg>
        )
    };

    const t = (group: typeof solutionCenterGroups[number], field: 'label' | 'eyebrow' | 'description') => {
        if (field === 'label') {
            return dict?.solutionCenterGroups?.[group.labelKey] || group.fallbackLabel;
        }
        if (field === 'eyebrow') {
            return dict?.megaMenu?.[group.eyebrowKey] || group.fallbackEyebrow;
        }
        return dict?.solutionCenterGroups?.[group.descriptionKey] || group.fallbackDescription;
    };

    const solutionsById = new Map(allSolutions.map((solution) => [solution.id, solution]));
    const displayGroups: DisplayGroup[] = solutionCenterGroups.map((group) => ({
        id: group.id,
        name: t(group, 'label'),
        categoryHref: group.categoryHref,
        icon: GROUP_ICONS[group.id],
        solutions: group.handles
            .map((handle) => solutionsById.get(handle))
            .filter(Boolean) as Solution[],
    }));

    const categoryList = displayGroups.map((group) => ({
        id: group.id,
        name: group.name,
        icon: group.icon
    }));

    const getSolutionTitle = (solution: Solution) => (
        locale === 'ru'
            ? (solution.product_name_ru || solution.product_name_en || solution.title_en)
            : (solution.product_name_en || solution.title_en)
    );

    const shouldUseProductImageTreatment = (image?: string) => (
        Boolean(image?.includes('/products/uav-systems/'))
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
                .solution-center-page {
                    background: #fff;
                }
                .solution-center-section {
                    position: relative;
                    scroll-margin-top: 300px;
                    margin-bottom: 100px;
                }
                .solution-center-section.priority {
                    padding: 8px 0 4px;
                }
                .solution-center-section-title {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .solution-center-title {
                    color: #333;
                    font-size: 3.4rem;
                    line-height: 1.2;
                    font-weight: 800;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .solution-center-accent {
                    width: 60px;
                    height: 4px;
                    background: #315ba4;
                    margin: 20px auto 0;
                }
                .solution-center-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 30px;
                }
                .solution-center-card {
                    min-width: 0;
                    display: block;
                    text-decoration: none;
                    color: inherit;
                    background: #fff;
                    border: 1px solid #f0f0f0;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .solution-center-card-media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1.618 / 1;
                    overflow: hidden;
                    background: #f8f9fa;
                    isolation: isolate;
                }
                .solution-center-card-media img {
                    transition: transform 0.5s ease;
                }
                .solution-center-card-body {
                    padding: 25px;
                    text-align: center;
                    border-top: 1px solid #eee;
                }
                .solution-center-card h3 {
                    color: #333;
                    font-size: 1.8rem;
                    line-height: 1.35;
                    font-weight: 700;
                    margin: 0;
                    transition: color 0.3s;
                }
                .solution-center-more-wrap {
                    display: flex;
                    justify-content: center;
                    margin-top: 32px;
                }
                .solution-center-more {
                    color: #315ba4;
                    border: 1px solid #315ba4;
                    padding: 12px 26px;
                    text-decoration: none;
                    font-size: 1.4rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .solution-center-more:hover {
                    background: #315ba4;
                    color: #fff;
                }
                @media (max-width: 1200px) {
                    .solution-center-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
            `}} />

            <div className="pc_only">
                <div className="solution-center-page" style={{ paddingTop: '112px' }}>
                    <section className="product-banner" style={{
                        height: '40vh',
                        minHeight: '320px',
                        maxHeight: '450px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Image src="/solutions/solution_banner.webp" fill style={{ objectFit: 'cover' }} priority alt={dict.solutions.bannerTitle} />
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.22)', zIndex: 1 }} />
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ maxWidth: '750px' }}>
                                <h1 style={{ fontSize: '5.2rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1 }}>{dict.solutions.bannerTitle}</h1>
                                <p style={{ fontSize: '2rem', color: '#fff', lineHeight: 1.55, opacity: 0.94, maxWidth: '690px' }}>{dict.solutions.bannerSubtitle}</p>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: '5%', bottom: '-10%', opacity: 0.05, transform: 'scale(1.2)', width: '400px', height: '400px' }}>
                            <Image src="/logo1-small.webp" alt="" fill style={{ objectFit: 'contain' }} />
                        </div>
                    </section>

                    <CategoryNav categories={categoryList} />

                    <div className="solution-lists-wrap" style={{ padding: '60px 0 20px' }}>
                        {displayGroups.map((group, groupIndex) => (
                            <section key={group.id} id={group.id} className={`solution-center-section ${groupIndex < 2 ? 'priority' : ''}`}>
                                <div className="container">
                                    <div className="solution-center-section-title">
                                        <h2 className="solution-center-title">{group.name}</h2>
                                        <div className="solution-center-accent"></div>
                                    </div>

                                    <div className="solution-center-grid">
                                        {group.solutions.map((sol, idx) => {
                                            const solTitle = getSolutionTitle(sol);
                                            const centerImage = solutionCenterImageByHandle[sol.id] || sol.main_image;
                                            const productImageTreatment = shouldUseProductImageTreatment(centerImage);

                                            return (
                                                <Link prefetch={false} href={localePath(locale, `/solutions/${sol.id}`)} key={sol.id} className="solution-center-card p-card-sbm">
                                                    <div className="solution-center-card-media p-card-img">
                                                        <Image
                                                            src={centerImage || '/images/solutions/placeholder.jpg'}
                                                            alt={solTitle}
                                                            fill
                                                            style={{
                                                                objectFit: productImageTreatment ? 'contain' : 'cover',
                                                                padding: productImageTreatment ? '5px' : 0,
                                                                mixBlendMode: productImageTreatment ? 'multiply' : 'normal'
                                                            }}
                                                            sizes="(max-width: 1200px) 50vw, 33vw"
                                                            priority={groupIndex === 0 && idx < 4}
                                                        />
                                                    </div>
                                                    <div className="solution-center-card-body p-card-content">
                                                        <h3>{solTitle}</h3>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    {group.categoryHref && (
                                        <div className="solution-center-more-wrap">
                                            <Link prefetch={false} href={localePath(locale, group.categoryHref)} className="solution-center-more">
                                                {dict.solutions.exploreAll}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>

                    <section id="inquiry" style={{ padding: '100px 0', background: '#f8f9fa', borderTop: '1px solid #e2e8f0' }}>
                        <div className="container" style={{ maxWidth: '1200px' }}>
                            <InquiryForm dict={dict} />
                        </div>
                    </section>
                </div>
            </div>

            <div className="mobile_only">
                <MobileSolutionCenter allSolutions={allSolutions} locale={locale} dict={dict} />
            </div>
        </>
    );
}
