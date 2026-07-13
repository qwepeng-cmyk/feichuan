'use client';

import { useId, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { localePath } from '@/lib/localePath';
import { localeFromPathname } from '@/lib/localization';

export default function InquiryForm({ dict }: { dict?: any }) {
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
        types: [
            "Equipment Pricing / Quotation",
            "Product Specifications / Brochure",
            "System Configuration / Site Review",
            "Distributor / Partnership"
        ],
        selectCode: "Select Code...",
        contactMethods: {
            whatsapp: "WhatsApp",
            phone: "Phone",
            wechat: "WeChat"
        },
        regions: {
            asia: "Asia & Middle East",
            europe: "Europe & CIS",
            southAmerica: "South America",
            africa: "Africa",
            northAmerica: "North America & Oceania",
            other: "Other (Please add in message)"
        },
        countries: {
            china: "China",
            uae: "UAE",
            saudiArabia: "Saudi Arabia",
            iran: "Iran",
            turkey: "Turkey",
            qatar: "Qatar",
            oman: "Oman",
            kuwait: "Kuwait",
            iraq: "Iraq",
            india: "India",
            japan: "Japan",
            southKorea: "South Korea",
            singapore: "Singapore",
            malaysia: "Malaysia",
            uzbekistan: "Uzbekistan",
            russiaKazakhstan: "Russia / Kazakhstan",
            belarus: "Belarus",
            uk: "United Kingdom",
            germany: "Germany",
            france: "France",
            italy: "Italy",
            spain: "Spain",
            brazil: "Brazil",
            argentina: "Argentina",
            colombia: "Colombia",
            chile: "Chile",
            peru: "Peru",
            ecuador: "Ecuador",
            venezuela: "Venezuela",
            egypt: "Egypt",
            algeria: "Algeria",
            morocco: "Morocco",
            nigeria: "Nigeria",
            southAfrica: "South Africa",
            kenya: "Kenya",
            ethiopia: "Ethiopia",
            usaCanada: "USA / Canada",
            mexico: "Mexico",
            australia: "Australia",
            newZealand: "New Zealand"
        }
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.success === true && result?.inquiryId) {
                router.push(localePath(localeFromPathname(pathname), '/thank-you'));
                // Reset form
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    contactMethod: 'Not specified',
                    countryCode: '',
                    phone: '',
                    demands: [],
                    message: '',
                });
            } else {
                console.error('Inquiry submit failed:', result);
                alert('Error sending inquiry. Please try again or contact us directly.');
            }
        } catch (error) {
            console.error('Inquiry error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="inquiry-container" style={{ borderRadius: '0', boxShadow: 'none', border: '1px solid #eee', padding: '80px 40px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4CAF50', color: '#fff', fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                    ✓
                </div>
                <h2 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#333', marginBottom: '15px' }}>
                    {d.submitted?.title || "SUBMITTED SUCCESSFULLY!"}
                </h2>
                <p style={{ fontSize: '1.8rem', color: '#666', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                    {d.submitted?.subtitle || "Thank you for your inquiry. Our C-UAS team will review the equipment and project information you provided."}
                </p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    style={{ 
                        padding: '12px 30px', 
                        backgroundColor: 'transparent', 
                        border: '1px solid #315ba4', 
                        color: '#315ba4', 
                        fontSize: '1.5rem', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {d.submitted?.backButton || "Send Another Message"}
                </button>
            </div>
        );
    }

    return (
        <div className="inquiry-container" style={{ borderRadius: '0', boxShadow: 'none', border: '1px solid #eee' }}>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>{d.title}</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1.6rem', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                {d.subtitle}
            </p>

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor={fieldIds.name}><span style={{ color: 'red' }}>*</span> {d.name}</label>
                        <input
                            id={fieldIds.name}
                            type="text"
                            required
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor={fieldIds.company}>{d.company}</label>
                        <input
                            id={fieldIds.company}
                            type="text"
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label className="form-label" htmlFor={fieldIds.email}><span style={{ color: 'red' }}>*</span> {d.email}</label>
                    <input
                        id={fieldIds.email}
                        type="email"
                        required
                        className="form-input"
                        style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label className="form-label" htmlFor={fieldIds.phone}><span style={{ color: 'red' }}>*</span> {d.phone}</label>
                    <input
                        id={fieldIds.phone}
                        type="tel"
                        required
                        className="form-input"
                        style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={d.phonePlaceholder || 'Include country code, e.g. +1 555 123 4567'}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label className="form-label">{d.inquiryType}</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
                        {d.types.map((opt: string) => (
                            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1.5rem', color: '#444' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.demands.includes(opt)}
                                    onChange={() => toggleDemand(opt)}
                                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor={fieldIds.message}><span style={{ color: 'red' }}>*</span> {d.messageLabel}</label>
                    <textarea
                        id={fieldIds.message}
                        required
                        className="form-input form-textarea"
                        style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '120px' }}
                        placeholder={d.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isSending}
                    className="btn-submit" 
                    style={{ 
                        borderRadius: '0', 
                        background: isSending ? '#999' : 'var(--cta)',
                        textTransform: 'uppercase',
                        cursor: isSending ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSending ? d.submitting : d.submit}
                </button>
            </form>
        </div>
    );
}

