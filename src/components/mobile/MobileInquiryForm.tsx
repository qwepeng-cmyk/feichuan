'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileProductCenter.module.css';
import { localePath } from '@/lib/localePath';
import { localeFromPathname } from '@/lib/localization';

export default function MobileInquiryForm({ dict }: { dict?: any }) {
    const router = useRouter();
    const pathname = usePathname();
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
        messagePlaceholder: "Please provide details about your project, requirements, or any specific systems you are interested in (e.g., drone detection, security screening).",
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
                router.push(localePath(localeFromPathname(pathname), '/thank-you'));
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
                        <option value="WhatsApp">{d.contactMethods?.whatsapp ?? 'WhatsApp'}</option>
                        <option value="Phone">{d.contactMethods?.phone ?? 'Phone'}</option>
                        <option value="WeChat">{d.contactMethods?.wechat ?? 'WeChat'}</option>
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
                        <option value="">{d.selectCode ?? 'Select Code...'}</option>
                        <optgroup label={d.regions?.asia ?? 'Asia & Middle East'}>
                            <option value="+86">{d.countries?.china ?? 'China'} (+86)</option>
                            <option value="+971">{d.countries?.uae ?? 'UAE'} (+971)</option>
                            <option value="+966">{d.countries?.saudiArabia ?? 'Saudi Arabia'} (+966)</option>
                            <option value="+98">{d.countries?.iran ?? 'Iran'} (+98)</option>
                            <option value="+90">{d.countries?.turkey ?? 'Turkey'} (+90)</option>
                            <option value="+974">{d.countries?.qatar ?? 'Qatar'} (+974)</option>
                            <option value="+968">{d.countries?.oman ?? 'Oman'} (+968)</option>
                            <option value="+965">{d.countries?.kuwait ?? 'Kuwait'} (+965)</option>
                            <option value="+964">{d.countries?.iraq ?? 'Iraq'} (+964)</option>
                            <option value="+91">{d.countries?.india ?? 'India'} (+91)</option>
                            <option value="+81">{d.countries?.japan ?? 'Japan'} (+81)</option>
                            <option value="+82">{d.countries?.southKorea ?? 'South Korea'} (+82)</option>
                            <option value="+65">{d.countries?.singapore ?? 'Singapore'} (+65)</option>
                            <option value="+60">{d.countries?.malaysia ?? 'Malaysia'} (+60)</option>
                            <option value="+998">{d.countries?.uzbekistan ?? 'Uzbekistan'} (+998)</option>
                        </optgroup>
                        <optgroup label={d.regions?.europe ?? 'Europe & CIS'}>
                            <option value="+7">{d.countries?.russiaKazakhstan ?? 'Russia / Kazakhstan'} (+7)</option>
                            <option value="+375">{d.countries?.belarus ?? 'Belarus'} (+375)</option>
                            <option value="+44">{d.countries?.uk ?? 'United Kingdom'} (+44)</option>
                            <option value="+49">{d.countries?.germany ?? 'Germany'} (+49)</option>
                            <option value="+33">{d.countries?.france ?? 'France'} (+33)</option>
                            <option value="+39">{d.countries?.italy ?? 'Italy'} (+39)</option>
                            <option value="+34">{d.countries?.spain ?? 'Spain'} (+34)</option>
                        </optgroup>
                        <optgroup label={d.regions?.southAmerica ?? 'South America'}>
                            <option value="+55">{d.countries?.brazil ?? 'Brazil'} (+55)</option>
                            <option value="+54">{d.countries?.argentina ?? 'Argentina'} (+54)</option>
                            <option value="+57">{d.countries?.colombia ?? 'Colombia'} (+57)</option>
                            <option value="+56">{d.countries?.chile ?? 'Chile'} (+56)</option>
                            <option value="+51">{d.countries?.peru ?? 'Peru'} (+51)</option>
                            <option value="+593">{d.countries?.ecuador ?? 'Ecuador'} (+593)</option>
                            <option value="+58">{d.countries?.venezuela ?? 'Venezuela'} (+58)</option>
                            <option value="+52">{d.countries?.mexico ?? 'Mexico'} (+52)</option>
                        </optgroup>
                        <optgroup label={d.regions?.africa ?? 'Africa'}>
                            <option value="+20">{d.countries?.egypt ?? 'Egypt'} (+20)</option>
                            <option value="+213">{d.countries?.algeria ?? 'Algeria'} (+213)</option>
                            <option value="+212">{d.countries?.morocco ?? 'Morocco'} (+212)</option>
                            <option value="+234">{d.countries?.nigeria ?? 'Nigeria'} (+234)</option>
                            <option value="+27">{d.countries?.southAfrica ?? 'South Africa'} (+27)</option>
                            <option value="+254">{d.countries?.kenya ?? 'Kenya'} (+254)</option>
                            <option value="+251">{d.countries?.ethiopia ?? 'Ethiopia'} (+251)</option>
                        </optgroup>
                        <optgroup label={d.regions?.northAmerica ?? 'North America & Oceania'}>
                            <option value="+1">{d.countries?.usaCanada ?? 'USA / Canada'} (+1)</option>
                            <option value="+61">{d.countries?.australia ?? 'Australia'} (+61)</option>
                            <option value="+64">{d.countries?.newZealand ?? 'New Zealand'} (+64)</option>
                        </optgroup>
                        <option value="other">{d.regions?.other ?? 'Other'}</option>
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

