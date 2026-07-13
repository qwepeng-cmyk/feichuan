'use client';

import React, { useId, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileProductCenter.module.css';
import { localePath } from '@/lib/localePath';
import { localeFromPathname } from '@/lib/localization';

export default function MobileInquiryForm({ dict }: { dict?: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const formId = useId();
    const fieldIds = {
        name: `${formId}-name`,
        company: `${formId}-company`,
        email: `${formId}-email`,
        phone: `${formId}-phone`,
        message: `${formId}-message`,
    };
    const d = dict?.inquiry || {
        title: "Get Expert Drone Defense!",
        subtitle: "Tell us the equipment, application or site you are reviewing. Our team can provide product information, technical documents, pricing and configuration support.",
        name: "Name",
        company: "Company Name",
        email: "E-mail",
        countryCode: "Country Code",
        phone: "Phone / WhatsApp",
        phonePlaceholder: "Include country code, e.g. +1 555 123 4567",
        inquiryType: "How can we help? (Optional)",
        messageLabel: "Message",
        messagePlaceholder: "Tell us the product type, application, quantity, or information you need. Example: brochure, specs, quotation, or help choosing the right equipment.",
        submit: "SUBMIT C-UAS INQUIRY",
        submitting: "SUBMITTING...",
        submitted: "SUBMITTED SUCCESSFULLY!",
        failed: "Failed to submit. Please try again.",
        types: [
            "Equipment Pricing / Quotation",
            "Product Specifications / Brochure",
            "System Configuration / Site Review",
            "Distributor / Partnership"
        ]
    };

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        contactMethod: 'Not specified',
        countryCode: '',
        phone: '',
        demands: [] as string[],
        message: '',
    });

    const toggleDemand = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            demands: prev.demands.includes(opt)
                ? prev.demands.filter(d => d !== opt)
                : [...prev.demands, opt]
        }));
    };

    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('loading');
        
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await res.json().catch(() => null);

            if (res.ok && result?.success === true && result?.inquiryId) {
                setFormData({
                    name: '', company: '', email: '', contactMethod: 'Not specified',
                    countryCode: '', phone: '', demands: [], message: ''
                });
                router.push(localePath(localeFromPathname(pathname), '/thank-you'));
            } else {
                console.error('Inquiry submit failed:', result);
                setSubmitStatus('error');
            }
        } catch(e) {
            console.error('Inquiry submit error:', e);
            setSubmitStatus('error');
        }
    };

    return (
        <div className={styles.inquiryContainer}>
            <h2 id="inquiry-title" className={styles.formTitle}>{d.title}</h2>
            <p className={styles.formSubtitle}>
                {d.subtitle}
            </p>

            <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor={fieldIds.name}>
                        <span>*</span>{d.name}
                    </label>
                    <input
                        id={fieldIds.name}
                        type="text"
                        required
                        className={styles.formInput}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder=""
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor={fieldIds.company}>{d.company}</label>
                    <input
                        id={fieldIds.company}
                        type="text"
                        className={styles.formInput}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder=""
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor={fieldIds.email}>
                        <span>*</span>{d.email}
                    </label>
                    <input
                        id={fieldIds.email}
                        type="email"
                        required
                        className={styles.formInput}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor={fieldIds.phone}>
                        <span>*</span>{d.phone}
                    </label>
                    <input
                        id={fieldIds.phone}
                        type="tel"
                        required
                        className={styles.formInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={d.phonePlaceholder ?? 'Include country code, e.g. +1 555 123 4567'}
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>{d.inquiryType}</label>
                    <div className={styles.formCheckboxGroup}>
                        {d.types.map((opt: string) => (
                            <label key={opt} className={styles.formCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.formCheckbox}
                                    checked={formData.demands.includes(opt)}
                                    onChange={() => toggleDemand(opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel} htmlFor={fieldIds.message}>
                        <span>*</span>{d.messageLabel}
                    </label>
                    <textarea
                        id={fieldIds.message}
                        required
                        className={styles.formTextarea}
                        placeholder={d.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button type="submit" className={styles.formSubmit} disabled={submitStatus === 'loading' || submitStatus === 'success'}>
                    {submitStatus === 'loading'
                        ? d.submitting
                        : submitStatus === 'success'
                            ? (typeof d.submitted === 'string' ? d.submitted : d.submitted?.title || 'SUBMITTED SUCCESSFULLY!')
                            : d.submit}
                </button>
                {submitStatus === 'error' && <div style={{color: 'red', marginTop: '10px', textAlign: 'center'}}>{d.failed}</div>}
            </form>
        </div>
    );
}

