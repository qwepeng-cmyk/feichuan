'use client';

import React, { useState, useEffect } from 'react';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
    const [activeTab, setActiveTab] = useState(categories[0]?.id || '');

    const getStickyOffset = () => {
        const nav = document.querySelector('.sticky-category-nav') as HTMLElement | null;
        const navTop = nav ? parseFloat(window.getComputedStyle(nav).top || '0') : 112;
        const navHeight = nav?.offsetHeight || 140;
        return navTop + navHeight + 48;
    };

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - getStickyOffset();

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (categories.length > 0 && !categories.some((category) => category.id === activeTab)) {
            setActiveTab(categories[0].id);
        }
    }, [activeTab, categories]);

    // Update active tab on scroll
    useEffect(() => {
        if (categories.length === 0) {
            return;
        }

        const handleScroll = () => {
            const sections = categories.map(cat => document.getElementById(cat.id));
            const scrollPos = window.scrollY + getStickyOffset();

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveTab(categories[i].id);
                    break;
                }
            }
        };

        let frame = 0;
        let timer = 0;

        if (!window.location.hash) {
            window.history.scrollRestoration = 'manual';
            const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

            resetScroll();
            frame = window.requestAnimationFrame(resetScroll);
            timer = window.setTimeout(resetScroll, 250);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            if (timer) window.clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [categories]);

    if (categories.length === 0) {
        return null;
    }

    return (
        <nav className="sticky-category-nav" style={{ 
            position: 'sticky', 
            top: '112px', 
            zIndex: 90, 
            background: '#f2f6ff', // SBM light blue background
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            borderBottom: '1px solid #e0e8f5'
        }}>
            <div className="container">
                <ul style={{ 
                    display: categories.length > 6 ? 'grid' : 'flex',
                    gridTemplateColumns: categories.length > 6 ? 'repeat(5, minmax(0, 1fr))' : undefined,
                    justifyContent: 'space-between', 
                    listStyle: 'none', 
                    padding: 0,
                    margin: 0
                }}>
                    {categories.map((cat) => (
                        <li 
                            key={cat.id} 
                            onClick={() => scrollToSection(cat.id)}
                            onMouseEnter={(e) => {
                                if (activeTab !== cat.id) {
                                    e.currentTarget.style.color = '#315ba4';
                                    e.currentTarget.style.background = '#fff';
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.style.transform = 'scale(1.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== cat.id) {
                                    e.currentTarget.style.color = '#666';
                                    e.currentTarget.style.background = 'transparent';
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.style.transform = 'scale(1)';
                                }
                            }}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                gap: '8px', 
                                cursor: 'pointer',
                                padding: categories.length > 6 ? '12px 10px' : '20px 10px',
                                color: activeTab === cat.id ? '#315ba4' : '#666',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                flex: 1,
                                minWidth: 0,
                                textAlign: 'center',
                                background: activeTab === cat.id ? '#fff' : 'transparent',
                                borderBottom: activeTab === cat.id ? '3px solid #315ba4' : '3px solid transparent'
                            }}
                        >
                            <div className="nav-icon-container" style={{ height: categories.length > 6 ? '44px' : '54px', minWidth: categories.length > 6 ? '44px' : '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease' }}>
                                {React.isValidElement(cat.icon) ? React.cloneElement(cat.icon as React.ReactElement, {
                                    style: { height: '100%', width: 'auto', display: 'block' }
                                }) : cat.icon}
                            </div>
                            <span style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: 700, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.03em',
                                lineHeight: 1.2,
                                marginTop: '5px',
                                transition: 'color 0.3s',
                                overflowWrap: 'anywhere'
                            }}>{cat.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
