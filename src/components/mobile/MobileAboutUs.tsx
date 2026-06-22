'use client';

import React from 'react';
import styles from './MobileAboutUs.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import Image from 'next/image';
import { Shield, Zap, Eye, Settings } from 'lucide-react';

export default function MobileAboutUs({ dict }: { dict?: any }) {
    const d = dict?.about || {
        // ... omitted defaults for brevity if tool handles it, but better provide full
        pageTitle: "Company Profile",
        bannerTitle: "ABOUT US",
        companyProfile: "Company Profile",
        companyDesc1: "Beijing Non-traditional Equipment Technology Co., Ltd. is headquartered in the Lize Financial Business District of Beijing. It is a high-tech enterprise focusing on the field of unmanned systems and intelligent security.",
        companyDesc2: "Based on technological innovation, the company integrates global high-quality resources and market networks, and is committed to building an efficient and collaborative industrial ecosystem.",
        companyDesc3: "We uphold the development mission of \"Connecting Technology with Applications, Integrating Domestic and International Markets\" to provide top-tier integrated security services for global customers.",
        rdTeam: "R&D Team",
        rdTeamDesc: "Driving innovation with technical expertise and deep industry experience.",
        rdRatio: "R&D Team Ratio",
        rdExperience: "The core R&D team is led by 10+ senior industry experts, with an average of over 15 years of experience.",
        rdSystem: "R&D System",
        rdSystemDesc: "A reliability design system built based on intelligent industrial standards.",
        coreCapabilities: "Core Capabilities",
        uavReliability: "UAV Reliability Design",
        uavReliabilityDesc: "Adopting redundant flight control architecture, combined with lightweight materials and adaptive control algorithms, ensuring stable operation of UAVs in complex environments.",
        intelligentAlgo: "Intelligent Algorithms",
        intelligentAlgoDesc: "Technology based on multi-sensor fusion, achieving fast threat identification and dynamic interference strategy optimization, effectively dealing with UAV intrusions.",
        aiRecognition: "AI Recognition Tech",
        aiRecognitionDesc: "AI-based image analysis and processing technology, providing comprehensive optical visual system solutions in all-weather and complex environments."
    };

    return (
        <div className={styles.wrapper}>
            {/* 1. Mini Banner */}
            <section className={styles.banner}>
                <div className={styles.bannerOverlay}></div>
                <div className={styles.bannerContent}>
                    <div className={styles.bannerTitle}>{d.bannerTitle}</div>
                </div>
            </section>

            {/* 2. Company Profile */}
            <section className={styles.section}>
                <div className={styles.titleBox}>
                    <h2>{d.companyProfile}</h2>
                    <span className={styles.titleLine}></span>
                </div>

                <div className={styles.profileImage} style={{ position: 'relative', overflow: 'hidden' }}>
                    <Image src="/about/about_company.jpg" alt={d.companyProfile} fill style={{ objectFit: 'cover' }} />
                </div>

                <div className={styles.profileText}>
                    <p>{d.companyDesc1}</p>
                    <p>{d.companyDesc2}</p>
                    <p>{d.companyDesc3}</p>
                </div>
            </section>

            {/* 3. R&D Team */}
            <section className={styles.rdSection}>
                <div className={styles.rdHeader}>
                    <h2>{d.rdTeam}</h2>
                    <p>{d.rdTeamDesc}</p>
                </div>

                {/* Left Box: Team Stats (Mobile View) */}
                <div className={styles.statsCard}>
                    <div className={styles.statsNumber}>70%</div>
                    <h3 className={styles.statsTitle}>{d.rdRatio}</h3>
                    <p className={styles.statsDesc}>
                        {d.rdExperience}
                    </p>
                    <div className={styles.rdSystem}>
                        <h4><Settings size={20} /> {d.rdSystem}</h4>
                        <p>
                            {d.rdSystemDesc}
                        </p>
                    </div>
                </div>

                {/* Right Section: Core Capabilities (Mobile View) */}
                <div className={styles.capabilities}>
                    <h3>{d.coreCapabilities}</h3>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Shield size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>{d.uavReliability}</h4>
                            <p>
                                {d.uavReliabilityDesc}
                            </p>
                        </div>
                    </div>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Zap size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>{d.intelligentAlgo}</h4>
                            <p>
                                {d.intelligentAlgoDesc}
                            </p>
                        </div>
                    </div>

                    <div className={styles.capItem}>
                        <div className={styles.iconCircle}>
                            <Eye size={28} />
                        </div>
                        <div className={styles.capText}>
                            <h4>{d.aiRecognition}</h4>
                            <p>
                                {d.aiRecognitionDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <MobileInquiryForm dict={dict} />
        </div>
    );
}
