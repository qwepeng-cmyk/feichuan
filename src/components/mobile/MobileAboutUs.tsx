'use client';

import React from 'react';
import styles from './MobileAboutUs.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import { Shield, Zap, Eye, Settings } from 'lucide-react';

export default function MobileAboutUs() {
    return (
        <div className={styles.wrapper}>
            {/* 1. Mini Banner */}
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <h1>ABOUT US</h1>
                </div>
            </section>

            {/* 2. Company Profile */}
            <section className={styles.section}>
                <div className={styles.titleBox}>
                    <h2>Company Profile</h2>
                    <span className={styles.titleLine}></span>
                </div>

                <div 
                    className={styles.profileImage} 
                    style={{ backgroundImage: 'url("/about/about_company.jpg")' }}
                ></div>

                <div className={styles.profileText}>
                    <p>
                        Beijing Feichuan Equipment Technology Co., Ltd. is headquartered in the Lize Financial Business District of Beijing. It is a high-tech enterprise focusing on the field of unmanned systems and intelligent security.
                    </p>
                    <p>
                        Based on technological innovation, the company integrates global high-quality resources and market networks, and is committed to building an efficient and collaborative industrial ecosystem. Adhering to the development concept of "Connecting Technology with Applications, Integrating Domestic and International Markets", the company continues to provide leading intelligent security solutions for global customers and strives to become a technology enterprise with international influence.
                    </p>
                    <p>
                        We uphold the development mission of "Connecting Technology with Applications, Integrating Domestic and International Markets" to provide top-tier integrated security services for global customers.
                    </p>
                </div>
            </section>

            {/* 3. R&D Team */}
            <section className={styles.rdSection}>
                <div className={styles.rdHeader}>
                    <h2>R&D Team</h2>
                    <p>Driving innovation with technical expertise and deep industry experience.</p>
                </div>

                {/* Left Box: Team Stats (Mobile View) */}
                <div className={styles.statsCard}>
                    <div className={styles.statsNumber}>70%</div>
                    <h3 className={styles.statsTitle}>R&D Team Ratio</h3>
                    <p className={styles.statsDesc}>
                        The core R&D team is led by 10+ senior industry experts, with an average of over 15 years of experience, possessing both deep technical accumulation and mature civil scenario implementation capabilities.
                    </p>
                    <div className={styles.rdSystem}>
                        <h4><Settings size={20} /> R&D System</h4>
                        <p>
                            A reliability design system built based on intelligent industrial standards, adapted to civil market needs.
                        </p>
                    </div>
                </div>

                {/* Right Section: Core Capabilities (Mobile View) */}
                <div className={styles.capabilities}>
                    <h3>Core Capabilities</h3>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Shield size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>UAV Reliability Design</h4>
                            <p>
                                Adopting redundant flight control architecture, combined with lightweight materials and adaptive control algorithms, ensuring stable operation of UAVs in complex environments.
                            </p>
                        </div>
                    </div>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Zap size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>Intelligent Algorithms</h4>
                            <p>
                                Technology based on multi-sensor fusion, achieving fast threat identification and dynamic interference strategy optimization, effectively dealing with UAV intrusions.
                            </p>
                        </div>
                    </div>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Eye size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>AI Recognition Tech</h4>
                            <p>
                                AI-based image analysis and processing technology, providing comprehensive optical visual system solutions in all-weather and complex environments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <MobileInquiryForm />
        </div>
    );
}
