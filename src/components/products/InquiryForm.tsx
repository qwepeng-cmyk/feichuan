'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function InquiryForm({ dict }: { dict?: any }) {
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
        types: [
            "Product Pricing & Quotation",
            "Request a Custom Solution",
            "Product Brochures & Tech Specs",
            "Partnership / Distributor Application",
            "Technical & After-Sales Support"
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

            if (response.ok) {
                router.push(pathname?.startsWith('/ru') ? '/ru/thank-you' : '/thank-you');
                // Reset form
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    contactMethod: 'WhatsApp',
                    countryCode: '',
                    phone: '',
                    demands: [],
                    message: '',
                });
            } else {
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
                    {d.submitted?.subtitle || "Thank you for your inquiry. Our team will review your requirements and get back to you within 24 hours."}
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
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.name}</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">{d.company}</label>
                        <input
                            type="text"
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.email}</label>
                    <input
                        type="email"
                        required
                        className="form-input"
                        style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '20px', marginBottom: '30px' }}>
                    <div className="form-group">
                        <label className="form-label">{d.contactMethod}</label>
                        <select
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '54px' }}
                            value={formData.contactMethod}
                            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                        >
                            <option value="WhatsApp">{d.contactMethods.whatsapp}</option>
                            <option value="Phone">{d.contactMethods.phone}</option>
                            <option value="WeChat">{d.contactMethods.wechat}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.countryCode}</label>
                        <select
                            required
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '54px' }}
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        >
                            <option value="">{d.selectCode}</option>
                            
                            <optgroup label={d.regions.asia}>
                                <option value="+86">{d.countries.china} (+86)</option>
                                <option value="+971">{d.countries.uae} (+971)</option>
                                <option value="+966">{d.countries.saudiArabia} (+966)</option>
                                <option value="+98">{d.countries.iran} (+98)</option>
                                <option value="+90">{d.countries.turkey} (+90)</option>
                                <option value="+974">{d.countries.qatar} (+974)</option>
                                <option value="+968">{d.countries.oman} (+968)</option>
                                <option value="+965">{d.countries.kuwait} (+965)</option>
                                <option value="+964">{d.countries.iraq} (+964)</option>
                                <option value="+91">{d.countries.india} (+91)</option>
                                <option value="+81">{d.countries.japan} (+81)</option>
                                <option value="+82">{d.countries.southKorea} (+82)</option>
                                <option value="+65">{d.countries.singapore} (+65)</option>
                                <option value="+60">{d.countries.malaysia} (+60)</option>
                                <option value="+998">{d.countries.uzbekistan} (+998)</option>
                            </optgroup>

                            <optgroup label={d.regions.europe}>
                                <option value="+7">{d.countries.russiaKazakhstan} (+7)</option>
                                <option value="+375">{d.countries.belarus} (+375)</option>
                                <option value="+44">{d.countries.uk} (+44)</option>
                                <option value="+49">{d.countries.germany} (+49)</option>
                                <option value="+33">{d.countries.france} (+33)</option>
                                <option value="+39">{d.countries.italy} (+39)</option>
                                <option value="+34">{d.countries.spain} (+34)</option>
                            </optgroup>

                            <optgroup label={d.regions.southAmerica}>
                                <option value="+55">{d.countries.brazil} (+55)</option>
                                <option value="+54">{d.countries.argentina} (+54)</option>
                                <option value="+57">{d.countries.colombia} (+57)</option>
                                <option value="+56">{d.countries.chile} (+56)</option>
                                <option value="+51">{d.countries.peru} (+51)</option>
                                <option value="+593">{d.countries.ecuador} (+593)</option>
                                <option value="+58">{d.countries.venezuela} (+58)</option>
                            </optgroup>

                            <optgroup label={d.regions.africa}>
                                <option value="+20">{d.countries.egypt} (+20)</option>
                                <option value="+213">{d.countries.algeria} (+213)</option>
                                <option value="+212">{d.countries.morocco} (+212)</option>
                                <option value="+234">{d.countries.nigeria} (+234)</option>
                                <option value="+27">{d.countries.southAfrica} (+27)</option>
                                <option value="+254">{d.countries.kenya} (+254)</option>
                                <option value="+251">{d.countries.ethiopia} (+251)</option>
                            </optgroup>

                            <optgroup label={d.regions.northAmerica}>
                                <option value="+1">{d.countries.usaCanada} (+1)</option>
                                <option value="+52">{d.countries.mexico} (+52)</option>
                                <option value="+61">{d.countries.australia} (+61)</option>
                                <option value="+64">{d.countries.newZealand} (+64)</option>
                            </optgroup>

                            <option value="other">{d.regions.other}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.phone}</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.inquiryType}</label>
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
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> {d.messageLabel}</label>
                    <textarea
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
                        background: isSending ? '#999' : 'var(--accent)', 
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

