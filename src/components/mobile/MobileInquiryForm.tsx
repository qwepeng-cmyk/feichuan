'use client';

import React, { useId, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileProductCenter.module.css';
import { localePath } from '@/lib/localePath';
import { localeFromPathname } from '@/lib/localization';
import { getContactMethod, getInquiryFormUxCopy } from '@/lib/inquiryFormUx';

type FormStep = 1 | 2;

export default function MobileInquiryForm({ dict, variant = 'page' }: { dict?: any; variant?: 'page' | 'drawer' }) {
    const router = useRouter();
    const pathname = usePathname();
    const ux = getInquiryFormUxCopy(pathname);
    const formId = useId();
    const stepHeadingRef = useRef<HTMLHeadingElement>(null);
    const fieldIds = {
        application: `${formId}-application`,
        name: `${formId}-name`,
        company: `${formId}-company`,
        email: `${formId}-email`,
        phone: `${formId}-phone`,
        message: `${formId}-message`,
    };
    const d = dict?.inquiry || {
        title: 'Get Expert Drone Defense Advice',
        subtitle: 'Tell us the equipment, application or site you are reviewing. Our team can provide product information, technical documents, pricing and configuration support.',
        name: 'Name',
        company: 'Company Name',
        email: 'E-mail',
        phone: 'Phone / WhatsApp',
        phonePlaceholder: 'Include country code, e.g. +1 555 123 4567',
        submit: 'REQUEST EXPERT ADVICE',
        submitting: 'SUBMITTING...',
        failed: 'Failed to submit. Please try again.',
    };

    const [step, setStep] = useState<FormStep>(1);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [contactError, setContactError] = useState('');
    const [stepError, setStepError] = useState('');
    const [formData, setFormData] = useState({
        applicationScenario: '',
        deploymentType: '',
        name: '',
        company: '',
        email: '',
        countryCode: '',
        phone: '',
        message: '',
    });

    const isOtherScenario = formData.applicationScenario === 'Other';

    const focusStepHeading = () => {
        window.requestAnimationFrame(() => stepHeadingRef.current?.focus());
    };

    const advanceToContact = () => {
        if (!formData.applicationScenario) {
            setStepError(ux.applicationRequiredError);
            return;
        }
        if (!formData.deploymentType) {
            setStepError(ux.deploymentRequiredError);
            return;
        }
        if (isOtherScenario && !formData.message.trim()) {
            setStepError(ux.otherDetailsRequiredError);
            return;
        }

        setStepError('');
        setStep(2);
        focusStepHeading();
    };

    const returnToRequirements = () => {
        setContactError('');
        setStep(1);
        focusStepHeading();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (step === 1) {
            advanceToContact();
            return;
        }

        const name = formData.name.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();

        if (!name || !email || !phone) {
            setContactError(ux.contactRequiredError);
            return;
        }

        setContactError('');
        setSubmitStatus('loading');

        try {
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    company: formData.company.trim(),
                    email,
                    phone,
                    countryCode: formData.countryCode,
                    contactMethod: getContactMethod(email, phone),
                    demands: [
                        `Application: ${formData.applicationScenario}`,
                        `Deployment: ${formData.deploymentType}`,
                    ],
                    message: formData.message.trim(),
                    sourcePage: pathname,
                }),
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.success === true && result?.inquiryId) {
                router.push(localePath(localeFromPathname(pathname), '/thank-you'));
            } else {
                console.error('Inquiry submit failed:', result);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Inquiry submit error:', error);
            setSubmitStatus('error');
        }
    };

    return (
        <div className={`${styles.inquiryContainer} ${variant === 'drawer' ? styles.inquiryDrawer : ''}`}>
            {variant === 'page' && (
                <>
                    <h2 id="inquiry-title" className={styles.formTitle}>{d.title}</h2>
                    <p className={styles.formSubtitle}>{d.subtitle}</p>
                </>
            )}

            <form onSubmit={handleSubmit} autoComplete="on" className={styles.formWrapper}>
                <div className={styles.formStepHeader}>
                    <div className={styles.formStepMeta}>{ux.stepLabel(step)}</div>
                    <div
                        className={styles.formProgressTrack}
                        role="progressbar"
                        aria-label={ux.stepLabel(step)}
                        aria-valuemin={1}
                        aria-valuemax={2}
                        aria-valuenow={step}
                    >
                        <span className={styles.formProgressFill} style={{ width: step === 1 ? '50%' : '100%' }} />
                    </div>
                    <h3 ref={stepHeadingRef} className={styles.formStepTitle} tabIndex={-1}>
                        {step === 1 ? ux.requirementsTitle : ux.contactTitle}
                    </h3>
                </div>

                {step === 1 ? (
                    <div className={styles.formStepPanel}>
                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.application}>
                                <span>*</span>{ux.applicationLabel}
                            </label>
                            <select
                                id={fieldIds.application}
                                name="applicationScenario"
                                className={`${styles.formSelect} ${styles.scenarioSelect}`}
                                required
                                value={formData.applicationScenario}
                                onChange={(event) => {
                                    setFormData({ ...formData, applicationScenario: event.target.value });
                                    setStepError('');
                                }}
                            >
                                <option value="" disabled>{ux.applicationPlaceholder}</option>
                                {ux.applicationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <fieldset className={styles.deploymentFieldset}>
                            <legend className={styles.formLabel}><span>*</span>{ux.deploymentLabel}</legend>
                            <div className={styles.deploymentGrid}>
                                {ux.deploymentOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`${styles.deploymentOption} ${formData.deploymentType === option.value ? styles.deploymentOptionActive : ''}`}
                                        aria-pressed={formData.deploymentType === option.value}
                                        onClick={() => {
                                            setFormData({ ...formData, deploymentType: option.value });
                                            setStepError('');
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.message}>
                                {isOtherScenario && <span>*</span>}
                                {ux.detailsLabel}{!isOtherScenario && <> <small>({ux.optional})</small></>}
                            </label>
                            <textarea
                                id={fieldIds.message}
                                name="message"
                                className={styles.formTextarea}
                                required={isOtherScenario}
                                placeholder={ux.detailsPlaceholder}
                                value={formData.message}
                                onChange={(event) => {
                                    setFormData({ ...formData, message: event.target.value });
                                    if (event.target.value.trim()) setStepError('');
                                }}
                            />
                            <p className={styles.fieldHint}>{ux.detailsHint}</p>
                        </div>

                        {stepError && <p className={styles.formStepError} role="alert">{stepError}</p>}

                        <button type="submit" className={`${styles.formSubmit} ${styles.formPrimaryAction}`}>
                            {ux.continueLabel}
                        </button>
                    </div>
                ) : (
                    <div className={styles.formStepPanel}>
                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.name}><span>*</span>{d.name}</label>
                            <input
                                id={fieldIds.name}
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className={styles.formInput}
                                value={formData.name}
                                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.company}>
                                {d.company} <small>({ux.optional})</small>
                            </label>
                            <input
                                id={fieldIds.company}
                                name="organization"
                                type="text"
                                autoComplete="organization"
                                className={styles.formInput}
                                value={formData.company}
                                onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.email}><span>*</span>{d.email}</label>
                            <input
                                id={fieldIds.email}
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                inputMode="email"
                                className={styles.formInput}
                                value={formData.email}
                                onChange={(event) => {
                                    setFormData({ ...formData, email: event.target.value });
                                    setContactError('');
                                }}
                                onInvalid={(event) => {
                                    if (localeFromPathname(pathname) === 'en') event.currentTarget.setCustomValidity('Please enter a valid email address.');
                                }}
                                onInput={(event) => event.currentTarget.setCustomValidity('')}
                            />
                        </div>

                        <div className={styles.formField}>
                            <label className={styles.formLabel} htmlFor={fieldIds.phone}><span>*</span>{d.phone}</label>
                            <input
                                id={fieldIds.phone}
                                name="tel"
                                type="tel"
                                required
                                autoComplete="tel"
                                inputMode="tel"
                                className={styles.formInput}
                                value={formData.phone}
                                onChange={(event) => {
                                    setFormData({ ...formData, phone: event.target.value });
                                    setContactError('');
                                }}
                                placeholder={d.phonePlaceholder || 'Include country code, e.g. +1 555 123 4567'}
                                onInvalid={(event) => {
                                    if (localeFromPathname(pathname) === 'en') event.currentTarget.setCustomValidity('Please enter your Phone / WhatsApp number, including the country code.');
                                }}
                                onInput={(event) => event.currentTarget.setCustomValidity('')}
                            />
                            <p className={styles.fieldHint}>{ux.phoneHint}</p>
                        </div>

                        <p className={styles.contactRequirement}><span>*</span>{ux.contactRequirement}</p>
                        {contactError && <p className={styles.contactError} role="alert">{contactError}</p>}

                        <div className={styles.formStepActions}>
                            <button type="button" className={styles.formBackAction} onClick={returnToRequirements}>
                                {ux.backLabel}
                            </button>
                            <button
                                type="submit"
                                className={styles.formSubmit}
                                disabled={submitStatus === 'loading'}
                            >
                                {submitStatus === 'loading' ? d.submitting : d.submit}
                            </button>
                        </div>
                        <p className={styles.privacyNote}>{ux.privacyNote}</p>
                        {submitStatus === 'error' && <p className={styles.submitError} role="alert">{d.failed}</p>}
                    </div>
                )}
            </form>
        </div>
    );
}
