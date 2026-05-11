'use client';

import React, { useState } from 'react';
import styles from './MobileProductCenter.module.css';

export default function MobileInquiryForm({ dict }: { dict?: any }) {
    const d = dict?.inquiry || {
        title: "Get Solution & Quotation",
        subtitle: "Please fill out the form below, and we can satisfy any of your needs including equipment selection, custom solution design, technical support, or after-sales service. We will contact you as soon as possible.",
        name: "Name",
        company: "Company Name",
        email: "E-mail",
        contactMethod: "Contact Method",
        countryCode: "Country Code",
        phone: "Phone Number",
        inquiryType: "Inquiry Type:",
        messageLabel: "Project Details / Message",
        messagePlaceholder: "Please provide details about your project, requirements, or any specific systems you are interested in (e.g., Anti-Drone, Security Screening).",
        submit: "SUBMIT INQUIRY",
        submitting: "SUBMITTING...",
        submitted: "SUBMITTED SUCCESSFULLY!",
        failed: "Failed to submit. Please try again.",
        types: [
            "Product Pricing & Quotation",
            "Request a Custom Solution",
            "Product Brochures & Tech Specs",
            "Partnership / Distributor Application",
            "Technical & After-Sales Support"
        ]
    };

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        contactMethod: 'WhatsApp',
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
            
            if (res.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '', company: '', email: '', contactMethod: 'WhatsApp',
                    countryCode: '', phone: '', demands: [], message: ''
                });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch(e) {
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
                    <label className={styles.formLabel}>
                        <span>*</span>{d.name}
                    </label>
                    <input
                        type="text"
                        required
                        className={styles.formInput}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder=""
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>{d.company}</label>
                    <input
                        type="text"
                        className={styles.formInput}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder=""
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>{d.email}
                    </label>
                    <input
                        type="email"
                        required
                        className={styles.formInput}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>{d.contactMethod}</label>
                    <select 
                        className={styles.formSelect}
                        value={formData.contactMethod}
                        onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                    >
                        <option>WhatsApp</option>
                        <option>Phone</option>
                        <option>WeChat</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>{d.countryCode}
                    </label>
                    <select
                        required
                        className={styles.formSelect}
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    >
                        <option value="">Select Code...</option>
                        <optgroup label="Asia & Middle East">
                            <option value="+86">China (+86)</option>
                            <option value="+971">UAE (+971)</option>
                            <option value="+966">Saudi Arabia (+966)</option>
                        </optgroup>
                        <optgroup label="Europe & CIS">
                            <option value="+7">Russia / Kazakhstan (+7)</option>
                            <option value="+44">United Kingdom (+44)</option>
                        </optgroup>
                        <option value="+1">USA / Canada (+1)</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>{d.phone}
                    </label>
                    <input
                        type="tel"
                        required
                        className={styles.formInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder=""
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>{d.inquiryType}
                    </label>
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
                    <label className={styles.formLabel}>
                        <span>*</span>{d.messageLabel}
                    </label>
                    <textarea
                        required
                        className={styles.formTextarea}
                        placeholder={d.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button type="submit" className={styles.formSubmit} disabled={submitStatus === 'loading' || submitStatus === 'success'}>
                    {submitStatus === 'loading' ? d.submitting : submitStatus === 'success' ? d.submitted : d.submit}
                </button>
                {submitStatus === 'error' && <div style={{color: 'red', marginTop: '10px', textAlign: 'center'}}>{d.failed}</div>}
            </form>
        </div>
    );
}

