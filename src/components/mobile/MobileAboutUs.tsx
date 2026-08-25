'use client';

import React from 'react';
import styles from './MobileAboutUs.module.css';
import FactoryShow from '@/components/about/FactoryShow';
import MobileInquiryForm from './MobileInquiryForm';
import Image from 'next/image';
import { Shield, Zap, Eye, Settings } from 'lucide-react';

export default function MobileAboutUs({ dict }: { dict?: any }) {
    const d = dict?.about || {
        // ... omitted defaults for brevity if tool handles it, but better provide full
        pageTitle: "Company Profile",
        bannerTitle: "ABOUT US",
        companyProfile: "Company Profile",
        companyDesc1: "N-TET focuses on Aerial Platform applications and low-altitude security. As a professional low-altitude security and Aerial Platform systems integrator, we provide comprehensive, intelligent industry solutions for customers worldwide. We combine RF sensing, visual multi-source perception, and AI intelligent algorithms across two core tracks: Aerial Platform industry operations and the prevention and management of unauthorized low-altitude targets. Backed by mature deployment experience across our full product portfolio, we support urban security, infrastructure protection, energy mapping, emergency rescue, and other scenarios with one-stop service from solution design and equipment delivery to onsite deployment, long-term operation and maintenance, and training.",
        rdTeam: "R&D Team",
        rdRatio: "R&D Team Ratio",
        rdExperience: "The core R&D team is led by 10+ senior industry experts, with an average of over 15 years of experience.",
        rdSystem: "R&D System",
        rdSystemDesc: "A reliability design system built based on intelligent industrial standards.",
        coreCapabilities: "Core Capabilities",
        aerialReliability: "Full-Scenario Coverage",
        aerialReliabilityDesc: "Defining a new level for industry applications. We work to make Aerial Platforms a core productivity tool across energy inspection, emergency rescue, smart city governance, and customized all-weather low-altitude operations.",
        intelligentAlgo: "Full-Dimensional Airspace Protection",
        intelligentAlgoDesc: "Reshaping low-altitude airspace management standards. For different site-security needs, we address unauthorized Aerial Platform activity, disorderly low-altitude flights, privacy exposure, and safety risks through integrated R&D, solution customization, deployment, and operation support.",
        aiRecognition: "Dual Aerial Platform & Low-Altitude Defense R&D Insight",
        aiRecognitionDesc: "Because we understand Aerial Platform development, we understand protection better. With both Aerial Platform engineering and Low-Altitude Defense capabilities, we use aircraft-design insight to strengthen low-altitude defense thinking and stay one step ahead of emerging site-security risks."
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
                </div>
            </section>

            <FactoryShow dict={dict} />

            {/* 3. R&D Team */}
            <section className={styles.rdSection}>
                <div className={styles.rdHeader}>
                    <h2>{d.rdTeam}</h2>
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
                            <h4>{d.aerialReliability}</h4>
                            <p>
                                {d.aerialReliabilityDesc}
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
