'use client';

import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, Save, Settings } from 'lucide-react';

type TrackingForm = {
    gaMeasurementId: string;
    gaEnabled: boolean;
    gtmContainerId: string;
    gtmEnabled: boolean;
};

type EmailForm = {
    enabled: boolean;
    brochureNotificationsEnabled: boolean;
    smtpHost: string;
    smtpPort: number;
    smtpSecure: boolean;
    smtpUser: string;
    smtpPass: string;
    hasSmtpPass: boolean;
    fromEmail: string;
    receiverEmail: string;
};

type ChatForm = {
    businessChatProvider: 'none' | 'tawk' | 'zoosnet';
    messageBoxEnabled: boolean;
    messageBoxDelayMinutes: number;
};

const card: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    border: '1px solid #e8ecf1',
};

const label: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#334155',
    fontSize: '1.3rem',
    fontWeight: 700,
};

const input: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #dbe3ee',
    borderRadius: '8px',
    color: '#0f172a',
    fontSize: '1.35rem',
    boxSizing: 'border-box',
};

const helper: React.CSSProperties = {
    marginTop: '7px',
    color: '#64748b',
    fontSize: '1.15rem',
    lineHeight: 1.5,
};

const checkboxLabel: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#334155',
    fontSize: '1.3rem',
    fontWeight: 700,
};

const emptyTracking: TrackingForm = {
    gaMeasurementId: '',
    gaEnabled: true,
    gtmContainerId: '',
    gtmEnabled: true,
};

const emptyEmail: EmailForm = {
    enabled: false,
    brochureNotificationsEnabled: false,
    smtpHost: '',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: '',
    smtpPass: '',
    hasSmtpPass: false,
    fromEmail: '',
    receiverEmail: '',
};

const emptyChat: ChatForm = {
    businessChatProvider: 'tawk',
    messageBoxEnabled: false,
    messageBoxDelayMinutes: 3,
};

export default function AdminSettingsPage() {
    const [trackingForm, setTrackingForm] = useState<TrackingForm>(emptyTracking);
    const [emailForm, setEmailForm] = useState<EmailForm>(emptyEmail);
    const [chatForm, setChatForm] = useState<ChatForm>(emptyChat);
    const [loading, setLoading] = useState(true);
    const [savingTracking, setSavingTracking] = useState(false);
    const [savingEmail, setSavingEmail] = useState(false);
    const [savingChat, setSavingChat] = useState(false);
    const [trackingMessage, setTrackingMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [trackingError, setTrackingError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [chatError, setChatError] = useState('');

    useEffect(() => {
        let isMounted = true;

        Promise.all([
            fetch('/api/admin/settings/tracking').then((res) => res.json()),
            fetch('/api/admin/settings/email').then((res) => res.json()),
            fetch('/api/admin/settings/chat').then((res) => res.json()),
        ])
            .then(([trackingJson, emailJson, chatJson]) => {
                if (!isMounted) return;

                if (trackingJson.success) {
                    setTrackingForm(trackingJson.data);
                } else {
                    setTrackingError(trackingJson.error || 'Failed to load tracking settings.');
                }

                if (emailJson.success) {
                    setEmailForm(emailJson.data);
                } else {
                    setEmailError(emailJson.error || 'Failed to load email settings.');
                }

                if (chatJson.success) {
                    setChatForm(chatJson.data);
                } else {
                    setChatError(chatJson.error || 'Failed to load chat settings.');
                }
            })
            .catch(() => {
                if (!isMounted) return;
                setTrackingError('Failed to connect to settings APIs.');
                setEmailError('Failed to connect to settings APIs.');
                setChatError('Failed to connect to settings APIs.');
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const saveTracking = async () => {
        setSavingTracking(true);
        setTrackingMessage('');
        setTrackingError('');

        try {
            const res = await fetch('/api/admin/settings/tracking', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trackingForm),
            });
            const json = await res.json();
            if (json.success) {
                setTrackingForm(json.data);
                setTrackingMessage('Tracking settings saved.');
            } else {
                setTrackingError(json.error || 'Failed to save tracking settings.');
            }
        } catch {
            setTrackingError('Failed to save tracking settings.');
        } finally {
            setSavingTracking(false);
        }
    };

    const saveEmail = async () => {
        setSavingEmail(true);
        setEmailMessage('');
        setEmailError('');

        try {
            const res = await fetch('/api/admin/settings/email', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailForm),
            });
            const json = await res.json();
            if (json.success) {
                setEmailForm(json.data);
                setEmailMessage('Email notification settings saved.');
            } else {
                setEmailError(json.error || 'Failed to save email settings.');
            }
        } catch {
            setEmailError('Failed to save email settings.');
        } finally {
            setSavingEmail(false);
        }
    };

    const saveChat = async () => {
        setSavingChat(true);
        setChatMessage('');
        setChatError('');

        try {
            const res = await fetch('/api/admin/settings/chat', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chatForm),
            });
            const json = await res.json();
            if (json.success) {
                setChatForm(json.data);
                setChatMessage('Business chat settings saved.');
            } else {
                setChatError(json.error || 'Failed to save chat settings.');
            }
        } catch {
            setChatError('Failed to save chat settings.');
        } finally {
            setSavingChat(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '48px', color: '#94a3b8', fontSize: '1.4rem' }}>Loading settings...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Settings size={24} color="#315ba4" />
                <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2.2rem', fontWeight: 800 }}>Website Settings</h1>
            </div>

            <div style={{ display: 'grid', gap: '24px', maxWidth: '960px' }}>
                <section style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                        <Settings size={20} color="#315ba4" />
                        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.7rem', fontWeight: 800 }}>Google Tracking</h2>
                    </div>

                    {trackingMessage && <div style={{ marginBottom: '18px', color: '#047857', fontSize: '1.3rem', fontWeight: 700 }}>{trackingMessage}</div>}
                    {trackingError && <div style={{ marginBottom: '18px', color: '#be123c', fontSize: '1.3rem', fontWeight: 700 }}>{trackingError}</div>}

                    <div style={{ display: 'grid', gap: '22px' }}>
                        <label>
                            <span style={label}>GA4 Measurement ID</span>
                            <input
                                style={input}
                                value={trackingForm.gaMeasurementId}
                                onChange={(e) => setTrackingForm((prev) => ({ ...prev, gaMeasurementId: e.target.value }))}
                                placeholder="G-ZS6XC2TFCG"
                            />
                        </label>

                        <label style={checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={trackingForm.gaEnabled}
                                onChange={(e) => setTrackingForm((prev) => ({ ...prev, gaEnabled: e.target.checked }))}
                            />
                            Enable GA4 Google tag
                        </label>

                        <label>
                            <span style={label}>Google Tag Manager Container ID</span>
                            <input
                                style={input}
                                value={trackingForm.gtmContainerId}
                                onChange={(e) => setTrackingForm((prev) => ({ ...prev, gtmContainerId: e.target.value }))}
                                placeholder="GTM-PJN9QQWN"
                            />
                        </label>

                        <label style={checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={trackingForm.gtmEnabled}
                                onChange={(e) => setTrackingForm((prev) => ({ ...prev, gtmEnabled: e.target.checked }))}
                            />
                            Enable Google Tag Manager
                        </label>
                    </div>

                    <div style={{ marginTop: '22px', padding: '14px 16px', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontSize: '1.25rem', lineHeight: 1.7 }}>
                        Conversion tracking is fired from the public Thank You page as a dataLayer event named <strong>ntet_form_submit</strong>.
                    </div>

                    <button
                        onClick={saveTracking}
                        disabled={savingTracking}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '24px',
                            padding: '12px 24px',
                            border: 0,
                            borderRadius: '8px',
                            background: savingTracking ? '#94a3b8' : '#315ba4',
                            color: '#fff',
                            fontSize: '1.35rem',
                            fontWeight: 800,
                            cursor: savingTracking ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <Save size={18} />
                        {savingTracking ? 'Saving...' : 'Save Tracking'}
                    </button>
                </section>

                <section style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                        <MessageCircle size={20} color="#315ba4" />
                        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.7rem', fontWeight: 800 }}>Business Chat</h2>
                    </div>

                    {chatMessage && <div style={{ marginBottom: '18px', color: '#047857', fontSize: '1.3rem', fontWeight: 700 }}>{chatMessage}</div>}
                    {chatError && <div style={{ marginBottom: '18px', color: '#be123c', fontSize: '1.3rem', fontWeight: 700 }}>{chatError}</div>}

                    <div style={{ display: 'grid', gap: '18px' }}>
                        <div>
                            <span style={label}>Active business chat provider</span>
                            <div
                                role="radiogroup"
                                aria-label="Active business chat provider"
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}
                            >
                                {[
                                    { value: 'tawk', title: 'Tawk.to', description: 'Global live-chat widget' },
                                    { value: 'zoosnet', title: '商务通 / Zoosnet', description: 'Original business-chat service' },
                                    { value: 'none', title: 'Disabled', description: 'Do not load either provider' },
                                ].map((option) => {
                                    const selected = chatForm.businessChatProvider === option.value;
                                    return (
                                        <label
                                            key={option.value}
                                            style={{
                                                position: 'relative',
                                                display: 'grid',
                                                gap: '5px',
                                                padding: '16px 18px 16px 44px',
                                                borderRadius: '10px',
                                                border: selected ? '2px solid #315ba4' : '1px solid #dbe3ee',
                                                background: selected ? '#eef4ff' : '#fff',
                                                boxShadow: selected ? '0 10px 24px rgba(49, 91, 164, 0.12)' : 'none',
                                                cursor: 'pointer',
                                                transition: 'border-color 180ms ease, background 180ms ease, box-shadow 180ms ease',
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="businessChatProvider"
                                                value={option.value}
                                                checked={selected}
                                                onChange={() => setChatForm((prev) => ({
                                                    ...prev,
                                                    businessChatProvider: option.value as ChatForm['businessChatProvider'],
                                                }))}
                                                style={{ position: 'absolute', left: '17px', top: '19px', accentColor: '#315ba4' }}
                                            />
                                            <strong style={{ color: '#1e293b', fontSize: '1.3rem' }}>{option.title}</strong>
                                            <span style={{ color: '#64748b', fontSize: '1.12rem', lineHeight: 1.45 }}>{option.description}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            <div style={helper}>Only one provider can be active. Saving this selection disables the other provider.</div>
                        </div>

                        <label style={checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={chatForm.messageBoxEnabled}
                                onChange={(e) => setChatForm((prev) => ({ ...prev, messageBoxEnabled: e.target.checked }))}
                            />
                            Enable floating message box
                        </label>

                        <label style={{ maxWidth: '360px', opacity: chatForm.messageBoxEnabled ? 1 : 0.58 }}>
                            <span style={label}>Auto-open delay (minutes)</span>
                            <input
                                type="number"
                                min={1}
                                max={60}
                                step={1}
                                style={input}
                                value={chatForm.messageBoxDelayMinutes}
                                disabled={!chatForm.messageBoxEnabled}
                                onChange={(e) => setChatForm((prev) => ({
                                    ...prev,
                                    messageBoxDelayMinutes: Number(e.target.value),
                                }))}
                                aria-describedby="message-box-delay-help"
                            />
                            <div id="message-box-delay-help" style={helper}>
                                The message box opens 1–60 minutes after the visitor arrives, then remains available during the browser session.
                            </div>
                        </label>

                        <div style={{ padding: '14px 16px', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontSize: '1.25rem', lineHeight: 1.7 }}>
                            The selected business-chat provider and the floating message box are controlled separately. The timer starts when the visitor enters the site and continues across page navigation.
                        </div>
                    </div>

                    <button
                        onClick={saveChat}
                        disabled={savingChat}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '24px',
                            padding: '12px 24px',
                            border: 0,
                            borderRadius: '8px',
                            background: savingChat ? '#94a3b8' : '#315ba4',
                            color: '#fff',
                            fontSize: '1.35rem',
                            fontWeight: 800,
                            cursor: savingChat ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <Save size={18} />
                        {savingChat ? 'Saving...' : 'Save Chat Settings'}
                    </button>
                </section>

                <section style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                        <Mail size={20} color="#315ba4" />
                        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.7rem', fontWeight: 800 }}>Email Notifications</h2>
                    </div>

                    {emailMessage && <div style={{ marginBottom: '18px', color: '#047857', fontSize: '1.3rem', fontWeight: 700 }}>{emailMessage}</div>}
                    {emailError && <div style={{ marginBottom: '18px', color: '#be123c', fontSize: '1.3rem', fontWeight: 700 }}>{emailError}</div>}

                    <div style={{ display: 'grid', gap: '22px' }}>
                        <div style={{ display: 'grid', gap: '14px', padding: '18px', border: '1px solid #dce6f3', borderRadius: '10px', background: 'linear-gradient(135deg, #f8fbff 0%, #f2f6fb 100%)' }}>
                            <label style={checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={emailForm.enabled}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, enabled: e.target.checked }))}
                                />
                                Send an email when a public inquiry is submitted
                            </label>

                            <label style={{ ...checkboxLabel, paddingLeft: '24px' }}>
                                <input
                                    type="checkbox"
                                    checked={emailForm.brochureNotificationsEnabled}
                                    disabled={!emailForm.enabled}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, brochureNotificationsEnabled: e.target.checked }))}
                                />
                                Send an email when a product brochure is downloaded
                            </label>

                            <div style={{ ...helper, marginTop: 0, paddingLeft: '24px' }}>
                                Brochure downloads are saved in the inquiry list. Enable this option to also notify the Receiver Email below. Repeat downloads from the same email and product within 24 hours do not send another notification.
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                            <label>
                                <span style={label}>SMTP Host</span>
                                <input
                                    style={input}
                                    value={emailForm.smtpHost}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, smtpHost: e.target.value }))}
                                    placeholder="smtp.example.com"
                                />
                            </label>

                            <label>
                                <span style={label}>Port</span>
                                <input
                                    type="number"
                                    style={input}
                                    value={emailForm.smtpPort}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, smtpPort: Number(e.target.value) }))}
                                    placeholder="587"
                                />
                            </label>

                            <label style={{ ...checkboxLabel, alignSelf: 'end', minHeight: '46px' }}>
                                <input
                                    type="checkbox"
                                    checked={emailForm.smtpSecure}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, smtpSecure: e.target.checked }))}
                                />
                                SSL/TLS
                            </label>
                        </div>

                        <label>
                            <span style={label}>SMTP Username</span>
                            <input
                                style={input}
                                value={emailForm.smtpUser}
                                onChange={(e) => setEmailForm((prev) => ({ ...prev, smtpUser: e.target.value }))}
                                placeholder="notice@example.com"
                            />
                        </label>

                        <label>
                            <span style={label}>SMTP Password</span>
                            <input
                                type="password"
                                style={input}
                                value={emailForm.smtpPass}
                                onChange={(e) => setEmailForm((prev) => ({ ...prev, smtpPass: e.target.value }))}
                                placeholder={emailForm.hasSmtpPass ? 'Password already saved. Leave blank to keep it.' : 'SMTP password or app password'}
                            />
                            <div style={helper}>The saved password is never shown in the browser.</div>
                        </label>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <label>
                                <span style={label}>From Email</span>
                                <input
                                    style={input}
                                    value={emailForm.fromEmail}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, fromEmail: e.target.value }))}
                                    placeholder="notice@example.com"
                                />
                                <div style={helper}>Usually the same mailbox as the SMTP username.</div>
                            </label>

                            <label>
                                <span style={label}>Receiver Email</span>
                                <input
                                    style={input}
                                    value={emailForm.receiverEmail}
                                    onChange={(e) => setEmailForm((prev) => ({ ...prev, receiverEmail: e.target.value }))}
                                    placeholder="sales@example.com"
                                />
                                <div style={helper}>New inquiries are sent here and still remain in the admin inquiry list.</div>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={saveEmail}
                        disabled={savingEmail}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '24px',
                            padding: '12px 24px',
                            border: 0,
                            borderRadius: '8px',
                            background: savingEmail ? '#94a3b8' : '#315ba4',
                            color: '#fff',
                            fontSize: '1.35rem',
                            fontWeight: 800,
                            cursor: savingEmail ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <Save size={18} />
                        {savingEmail ? 'Saving...' : 'Save Email Settings'}
                    </button>
                </section>
            </div>
        </div>
    );
}
