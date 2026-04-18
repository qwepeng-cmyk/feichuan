'use client';

import { useState } from 'react';

export default function InquiryForm() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        countryCode: '',
        phone: '',
        demands: [] as string[],
        message: '',
    });

    const demandOptions = [
        'Equipment',
        'Materials (brochures, catalogs)',
        'To Be Our Agent',
        'After-sales Services & Spare Parts',
        'Operational Support'
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
        alert('Thank you for your inquiry!');
    };

    return (
        <div className="inquiry-container" style={{ borderRadius: '0', boxShadow: 'none', border: '1px solid #eee' }}>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>Get Solution & Quotation</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1.6rem', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                Please fill out the form below, and we can satisfy any of your needs including equipment selection, scheme design, technical support, or after-sales service. We will contact you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> Name</label>
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
                        <label className="form-label">Company Name</label>
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
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> E-mail</label>
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
                        <label className="form-label">Contact Method</label>
                        <select className="form-input" style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '54px' }}>
                            <option>WhatsApp</option>
                            <option>Phone</option>
                            <option>WeChat</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> Country Code</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                            placeholder="e.g. +86"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><span style={{ color: 'red' }}>*</span> Phone Number</label>
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
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> Demand:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
                        {demandOptions.map(opt => (
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
                    <label className="form-label"><span style={{ color: 'red' }}>*</span> What products or content are you interested in?</label>
                    <textarea
                        required
                        className="form-input form-textarea"
                        style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '120px' }}
                        placeholder="What problems have you encountered? The more detailed you write here, the more targeted solutions we can provide."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn-submit" style={{ borderRadius: '0', background: 'var(--accent)', textTransform: 'uppercase' }}>
                    SUBMIT INQUIRY
                </button>
            </form>
        </div>
    );
}
