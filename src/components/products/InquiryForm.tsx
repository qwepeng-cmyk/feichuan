'use client';

import { useState } from 'react';

export default function InquiryForm({ dict }: { dict?: any }) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(dict?.common?.thankYou || 'Thank you for your inquiry!');
    };

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
                        <select className="form-input" style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '54px' }}>
                            <option>WhatsApp</option>
                            <option>Phone</option>
                            <option>WeChat</option>
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
                            <option value="">Select Code...</option>
                            
                            <optgroup label="Asia & Middle East">
                                <option value="+86">China (+86)</option>
                                <option value="+971">UAE (+971)</option>
                                <option value="+966">Saudi Arabia (+966)</option>
                                <option value="+98">Iran (+98)</option>
                                <option value="+90">Turkey (+90)</option>
                                <option value="+974">Qatar (+974)</option>
                                <option value="+968">Oman (+968)</option>
                                <option value="+965">Kuwait (+965)</option>
                                <option value="+964">Iraq (+964)</option>
                                <option value="+91">India (+91)</option>
                                <option value="+81">Japan (+81)</option>
                                <option value="+82">South Korea (+82)</option>
                                <option value="+65">Singapore (+65)</option>
                                <option value="+60">Malaysia (+60)</option>
                                <option value="+998">Uzbekistan (+998)</option>
                            </optgroup>

                            <optgroup label="Europe & CIS">
                                <option value="+7">Russia / Kazakhstan (+7)</option>
                                <option value="+375">Belarus (+375)</option>
                                <option value="+44">United Kingdom (+44)</option>
                                <option value="+49">Germany (+49)</option>
                                <option value="+33">France (+33)</option>
                                <option value="+39">Italy (+39)</option>
                                <option value="+34">Spain (+34)</option>
                            </optgroup>

                            <optgroup label="South America">
                                <option value="+55">Brazil (+55)</option>
                                <option value="+54">Argentina (+54)</option>
                                <option value="+57">Colombia (+57)</option>
                                <option value="+56">Chile (+56)</option>
                                <option value="+51">Peru (+51)</option>
                                <option value="+593">Ecuador (+593)</option>
                                <option value="+58">Venezuela (+58)</option>
                            </optgroup>

                            <optgroup label="Africa">
                                <option value="+20">Egypt (+20)</option>
                                <option value="+213">Algeria (+213)</option>
                                <option value="+212">Morocco (+212)</option>
                                <option value="+234">Nigeria (+234)</option>
                                <option value="+27">South Africa (+27)</option>
                                <option value="+254">Kenya (+254)</option>
                                <option value="+251">Ethiopia (+251)</option>
                            </optgroup>

                            <optgroup label="North America & Oceania">
                                <option value="+1">USA / Canada (+1)</option>
                                <option value="+52">Mexico (+52)</option>
                                <option value="+61">Australia (+61)</option>
                                <option value="+64">New Zealand (+64)</option>
                            </optgroup>

                            <option value="other">Other (Please add in message)</option>
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

                <button type="submit" className="btn-submit" style={{ borderRadius: '0', background: 'var(--accent)', textTransform: 'uppercase' }}>
                    {d.submit}
                </button>
            </form>
        </div>
    );
}

