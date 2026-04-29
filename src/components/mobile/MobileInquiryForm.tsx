'use client';

import React, { useState } from 'react';
import styles from './MobileProductCenter.module.css';

export default function MobileInquiryForm() {
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

    const demandOptions = [
        'Product Pricing & Quotation',
        'Request a Custom Solution',
        'Product Brochures & Tech Specs',
        'Partnership / Distributor Application',
        'Technical & After-Sales Support'
    ];

    const toggleDemand = (opt: string) => {
        setFormData(prev => ({
            ...prev,
            demands: prev.demands.includes(opt)
                ? prev.demands.filter(d => d !== opt)
                : [...prev.demands, opt]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will contact you soon.');
    };

    return (
        <div className={styles.inquiryContainer}>
            <h2 className={styles.formTitle}>Get Solution & Quotation</h2>
            <p className={styles.formSubtitle}>
                Please fill out the form below, and we can satisfy any of your needs including equipment selection, custom solution design, technical support, or after-sales service. We will contact you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>Name
                    </label>
                    <input
                        type="text"
                        required
                        className={styles.formInput}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>Company Name</label>
                    <input
                        type="text"
                        className={styles.formInput}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Optional"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>E-mail
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
                    <label className={styles.formLabel}>Contact Method</label>
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
                        <span>*</span>Country Code
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
                        <span>*</span>Phone Number
                    </label>
                    <input
                        type="tel"
                        required
                        className={styles.formInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Number"
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formLabel}>
                        <span>*</span>Inquiry Type
                    </label>
                    <div className={styles.formCheckboxGroup}>
                        {demandOptions.map(opt => (
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
                        <span>*</span>Project Details
                    </label>
                    <textarea
                        required
                        className={styles.formTextarea}
                        placeholder="Please tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button type="submit" className={styles.formSubmit}>
                    SUBMIT INQUIRY
                </button>
            </form>
        </div>
    );
}
