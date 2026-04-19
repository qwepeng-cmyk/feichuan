'use client';

import React, { useState, useEffect } from 'react';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
    const [activeTab, setActiveTab] = useState(categories[0].id);

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            const offset = 240; // Header(114) + Nav(~100) + breathing space
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Update active tab on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => document.getElementById(cat.id));
            const scrollPos = window.scrollY + 250;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveTab(categories[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    return (
        <nav className="sticky-category-nav" style={{ 
            position: 'sticky', 
            top: '114px', 
            zIndex: 90, 
            background: '#f2f6ff', // SBM light blue background
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            borderBottom: '1px solid #e0e8f5'
        }}>
            <div className="container">
                <ul style={{ 
                    display: 'flex', 
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
                                padding: '20px 10px',
                                color: activeTab === cat.id ? '#315ba4' : '#666',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                flex: 1,
                                textAlign: 'center',
                                background: activeTab === cat.id ? '#fff' : 'transparent',
                                borderBottom: activeTab === cat.id ? '3px solid #315ba4' : '3px solid transparent'
                            }}
                        >
                            <div style={{ width: '54px', height: '54px', transition: 'transform 0.3s ease' }}>{cat.icon}</div>
                            <span style={{ 
                                fontSize: '1.2rem', 
                                fontWeight: 700, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.03em',
                                lineHeight: 1.2,
                                marginTop: '5px',
                                transition: 'color 0.3s'
                            }}>{cat.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
