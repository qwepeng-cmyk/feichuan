'use client';

import { useId, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { localePath } from '@/lib/localePath';
import { localeFromPathname } from '@/lib/localization';
import { getContactMethod, getInquiryFormUxCopy } from '@/lib/inquiryFormUx';
import { trackPersistedInquiryConversion } from '@/components/tracking/googleAdsConversion';
import uxStyles from './InquiryForm.module.css';

type FormStep = 1 | 2;

export default function InquiryForm({ dict }: { dict?: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const ux = getInquiryFormUxCopy(pathname);
    const formId = useId();
    const stepHeadingRef = useRef<HTMLHeadingElement>(null);
    const submissionInFlightRef = useRef(false);
    const fieldIds = {
        application: `${formId}-application`,
        name: `${formId}-name`,
        company: `${formId}-company`,
        email: `${formId}-email`,
        phone: `${formId}-phone`,
        message: `${formId}-message`,
    };
    const d = dict?.inquiry || {
        title: 'Получить консультацию специалиста',
        subtitle: 'Расскажите об интересующем оборудовании, сценарии применения или объекте. Мы предоставим информацию о продукции, техническую документацию, цены и рекомендации по конфигурации.',
        name: 'Имя',
        company: 'Компания',
        email: 'E-mail',
        phone: 'Телефон / WhatsApp',
        phonePlaceholder: 'Укажите код страны, например +7 999 123-45-67',
        submit: 'ОТПРАВИТЬ ЗАПРОС',
        submitting: 'ОТПРАВКА...',
        failed: 'Не удалось отправить запрос. Повторите попытку или свяжитесь с нами напрямую.',
    };

    const [step, setStep] = useState<FormStep>(1);
    const [isSending, setIsSending] = useState(false);
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
        if (submissionInFlightRef.current) return;

        setContactError('');
        submissionInFlightRef.current = true;
        setIsSending(true);
        let submissionSucceeded = false;

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

            const inquiryId = Number(result?.inquiryId);

            if (response.ok && result?.success === true && Number.isSafeInteger(inquiryId) && inquiryId > 0) {
                submissionSucceeded = true;
                trackPersistedInquiryConversion({
                    inquiryId,
                    conversionSource: 'desktop_inquiry_form',
                    formName: 'public_inquiry',
                    pagePath: pathname,
                });
                router.push(localePath(localeFromPathname(pathname), '/thank-you'));
            } else {
                console.error('Inquiry submit failed:', result);
                alert(d.failed || 'Не удалось отправить запрос. Повторите попытку или свяжитесь с нами напрямую.');
            }
        } catch (error) {
            console.error('Inquiry error:', error);
            alert(d.failed || 'Произошла ошибка. Повторите попытку.');
        } finally {
            if (!submissionSucceeded) {
                submissionInFlightRef.current = false;
                setIsSending(false);
            }
        }
    };

    return (
        <div className="inquiry-container" style={{ borderRadius: '0', boxShadow: 'none', border: '1px solid #eee' }}>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>{d.title}</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1.6rem', maxWidth: '800px', margin: '0 auto 34px', lineHeight: '1.6' }}>
                {d.subtitle}
            </p>

            <form onSubmit={handleSubmit} autoComplete="on" style={{ textAlign: 'left' }}>
                <div className={uxStyles.stepHeader}>
                    <div className={uxStyles.stepMeta}>{ux.stepLabel(step)}</div>
                    <div
                        className={uxStyles.progressTrack}
                        role="progressbar"
                        aria-label={ux.stepLabel(step)}
                        aria-valuemin={1}
                        aria-valuemax={2}
                        aria-valuenow={step}
                    >
                        <span className={uxStyles.progressFill} style={{ width: step === 1 ? '50%' : '100%' }} />
                    </div>
                    <h3 ref={stepHeadingRef} className={uxStyles.stepTitle} tabIndex={-1}>
                        {step === 1 ? ux.requirementsTitle : ux.contactTitle}
                    </h3>
                </div>

                {step === 1 ? (
                    <div className={uxStyles.stepPanel}>
                        <div className="form-group">
                            <label className="form-label" htmlFor={fieldIds.application}>
                                <span className={uxStyles.requiredMark}>*</span>{ux.applicationLabel}
                            </label>
                            <select
                                id={fieldIds.application}
                                name="applicationScenario"
                                className={`form-input ${uxStyles.selectInput}`}
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

                        <fieldset className={uxStyles.deploymentFieldset}>
                            <legend className="form-label">
                                <span className={uxStyles.requiredMark}>*</span>{ux.deploymentLabel}
                            </legend>
                            <div className={uxStyles.deploymentGrid}>
                                {ux.deploymentOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`${uxStyles.deploymentOption} ${formData.deploymentType === option.value ? uxStyles.deploymentOptionActive : ''}`}
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

                        <div className="form-group">
                            <label className="form-label" htmlFor={fieldIds.message}>
                                {isOtherScenario && <span className={uxStyles.requiredMark}>*</span>}
                                {ux.detailsLabel}{!isOtherScenario && <> <small className={uxStyles.optional}>({ux.optional})</small></>}
                            </label>
                            <textarea
                                id={fieldIds.message}
                                name="message"
                                className="form-input form-textarea"
                                style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd', height: '132px' }}
                                required={isOtherScenario}
                                placeholder={ux.detailsPlaceholder}
                                value={formData.message}
                                onChange={(event) => {
                                    setFormData({ ...formData, message: event.target.value });
                                    if (event.target.value.trim()) setStepError('');
                                }}
                            />
                            <p className={uxStyles.fieldHint}>{ux.detailsHint}</p>
                        </div>

                        {stepError && <p className={uxStyles.stepError} role="alert">{stepError}</p>}

                        <button type="submit" className={`btn-submit ${uxStyles.primaryAction}`}>
                            {ux.continueLabel}
                        </button>
                    </div>
                ) : (
                    <div className={uxStyles.stepPanel}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor={fieldIds.name}>
                                    <span className={uxStyles.requiredMark}>*</span>{d.name}
                                </label>
                                <input
                                    id={fieldIds.name}
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="form-input"
                                    style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                                    value={formData.name}
                                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor={fieldIds.company}>
                                    {d.company} <small className={uxStyles.optional}>({ux.optional})</small>
                                </label>
                                <input
                                    id={fieldIds.company}
                                    name="organization"
                                    type="text"
                                    autoComplete="organization"
                                    className="form-input"
                                    style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                                    value={formData.company}
                                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor={fieldIds.email}>
                                    <span className={uxStyles.requiredMark}>*</span>{d.email}
                                </label>
                                <input
                                    id={fieldIds.email}
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    inputMode="email"
                                    className="form-input"
                                    style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                                    value={formData.email}
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value });
                                        setContactError('');
                                    }}
                                    onInvalid={(event) => {
                                        event.currentTarget.setCustomValidity('Введите корректный адрес электронной почты.');
                                    }}
                                    onInput={(event) => event.currentTarget.setCustomValidity('')}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor={fieldIds.phone}>
                                    <span className={uxStyles.requiredMark}>*</span>{d.phone}
                                </label>
                                <input
                                    id={fieldIds.phone}
                                    name="tel"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    inputMode="tel"
                                    className="form-input"
                                    style={{ borderRadius: '0', background: '#fff', border: '1px solid #ddd' }}
                                    value={formData.phone}
                                    onChange={(event) => {
                                        setFormData({ ...formData, phone: event.target.value });
                                        setContactError('');
                                    }}
                                    placeholder={d.phonePlaceholder || 'Укажите код страны, например +7 999 123-45-67'}
                                    onInvalid={(event) => {
                                        event.currentTarget.setCustomValidity('Введите номер телефона или WhatsApp с кодом страны.');
                                    }}
                                    onInput={(event) => event.currentTarget.setCustomValidity('')}
                                />
                                <p className={uxStyles.fieldHint}>{ux.phoneHint}</p>
                            </div>
                        </div>

                        <p className={uxStyles.contactRequirement}>
                            <span className={uxStyles.requiredMark}>*</span>{ux.contactRequirement}
                        </p>
                        {contactError && <p className={uxStyles.contactError} role="alert">{contactError}</p>}

                        <div className={uxStyles.stepActions}>
                            <button type="button" className={uxStyles.backAction} onClick={returnToRequirements}>
                                {ux.backLabel}
                            </button>
                            <button
                                type="submit"
                                disabled={isSending}
                                className={`btn-submit ${uxStyles.submitAction}`}
                            >
                                {isSending ? d.submitting : d.submit}
                            </button>
                        </div>
                        <p className={uxStyles.privacyNote}>{ux.privacyNote}</p>
                    </div>
                )}
            </form>
        </div>
    );
}
