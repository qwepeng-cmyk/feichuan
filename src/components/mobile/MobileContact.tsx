'use client';

import React from 'react';
import styles from './MobileContact.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import PrimaryContactButton, { PrimaryContactIcon } from '@/components/contact/PrimaryContactButton';

export default function MobileContact({ dict }: { dict?: any }) {
    const d = dict?.contact || {
        bannerTitle: "CONTACT US",
        directContact: "Direct Contact",
        whatsapp: "WhatsApp",
        email: "Email",
        salesHotline: "Sales Hotline",
        companyAddress: "Company Address",
        address: "Jujie Financial Building, Lize Road, Fengtai District, Beijing, China"
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

            {/* 2. Inquiry Form (Main Focus on Mobile) */}
            <section className={styles.formSection}>
                <MobileInquiryForm dict={dict} />
            </section>

            {/* 3. Direct Contact Info */}
            <section className={styles.infoSection}>
                <h3 className={styles.sectionTitle}>{d.directContact}</h3>
                
                <div className={styles.infoList}>
                    {/* WhatsApp */}
                    <div className={styles.infoItem}>
                        <div className={`${styles.iconBox} ${styles.whatsapp}`}>
                            <PrimaryContactIcon size={24} />
                        </div>
                        <div className={styles.infoContent}>
                            <h4>{d.whatsapp}</h4>
                            <PrimaryContactButton sourceLabel="mobile_contact_whatsapp" className={`${styles.infoValue} ${styles.linkValue}`}>{CONTACT_WHATSAPP_DISPLAY}</PrimaryContactButton>
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles.infoItem}>
                        <div className={styles.iconBox}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        </div>
                        <div className={styles.infoContent}>
                            <h4>{d.email}</h4>
                            <a href={`mailto:${CONTACT_EMAIL}`} className={`${styles.infoValue} ${styles.linkValue}`}>{CONTACT_EMAIL}</a>
                        </div>
                    </div>

                    {/* Sales Hotline */}
                    <div className={styles.infoItem}>
                        <div className={styles.iconBox}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.81 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        </div>
                        <div className={styles.infoContent}>
                            <h4>{d.salesHotline}</h4>
                            <div className={styles.infoValue}>+86 010 8362 2127</div>
                        </div>
                    </div>

                    {/* Company Address */}
                    <div className={styles.infoItem}>
                        <div className={styles.iconBox}>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <div className={styles.infoContent}>
                            <h4>{d.companyAddress}</h4>
                            <div className={styles.infoValue}>
                                {d.address}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
