'use client';

import React from 'react';
import styles from './MobileContact.module.css';
import MobileInquiryForm from './MobileInquiryForm';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY } from '@/lib/contactSettings';
import WhatsAppLeadButton from '@/components/contact/WhatsAppLeadButton';

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
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.518.892-6.193 2.512-3.14 3.036-3.414 7.918-0.65 11.272l-1.01 3.518 3.65-0.941c1.332.71 2.825 1.082 4.343 1.083l0.005 0.001c4.545 0 8.245-3.627 8.247-8.087 0-2.161-0.854-4.191-2.406-5.717-1.551-1.527-3.615-2.369-5.811-2.371zM16.516 16.485c-0.247 0.686-1.443 1.253-1.99 1.341-0.547.087-1.253.134-3.193-0.627-2.396-0.939-3.943-3.328-4.06-3.483-0.12-0.155-0.976-1.275-0.976-2.433 0-1.159.605-1.728.823-1.954.218-0.226.478-0.283.637-0.283s.318.001.457.006c.142.005.333-0.053.523.402.193.466.66 1.58.717 1.693.056.113.1.245.021.396s-0.113.264-0.226.396c-0.113.132-0.239.294-0.342.396-0.113.113-0.231.237-0.1.458.132.221.584.949 1.257 1.536.866.755 1.597 0.991 1.82 1.093s.345.075.474-0.075c0.129-0.15 0.553-0.641.701-0.858.148-0.217.294-0.183.497-0.108.201.075 1.275.591 1.493.697s.361.16.415.253c.053.093.053.539-0.194 1.225z"/></svg>
                        </div>
                        <div className={styles.infoContent}>
                            <h4>{d.whatsapp}</h4>
                            <WhatsAppLeadButton sourceLabel="mobile_contact_whatsapp" className={`${styles.infoValue} ${styles.linkValue}`}>{CONTACT_WHATSAPP_DISPLAY}</WhatsAppLeadButton>
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
