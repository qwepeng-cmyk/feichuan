'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Send, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  CONTACT_CHANNELS,
  CONTACT_WHATSAPP_MESSAGE,
  CONTACT_WHATSAPP_NUMBER,
  type ContactChannelId,
} from '@/lib/contactSettings';
import { trackGoogleAdsFormConversion } from '@/components/tracking/googleAdsConversion';
import { getInquiryFormUxCopy } from '@/lib/inquiryFormUx';
import styles from './WhatsAppLeadButton.module.css';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export interface WhatsAppLeadButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sourceLabel?: string;
  ariaLabel?: string;
  productName?: string;
  productHandle?: string;
  ctaLocation?: string;
  initiallyOpen?: boolean;
  renderTrigger?: boolean;
  channel?: ContactChannelId;
}

const vkModalCopy = {
  eyebrow: 'Консультация во ВКонтакте',
  title: 'Оставьте контактные данные',
  helper: 'Оставьте номер телефона. Мы сохраним ваш запрос и откроем страницу менеджера N-TET во ВКонтакте.',
  nameLabel: 'Имя *',
  phoneLabel: 'Телефон *',
  countryCodeAria: 'Код страны',
  countryCodePlaceholder: 'например, +7',
  phonePlaceholder: 'Номер телефона',
  saving: 'Сохранение...',
  submit: 'Открыть ВКонтакте',
  note: 'После сохранения откроется страница менеджера N-TET во ВКонтакте.',
  close: 'Закрыть форму связи',
  nameError: 'Введите имя перед продолжением.',
  phoneError: 'Введите номер телефона, чтобы продолжить.',
  countryCodeError: 'Укажите код страны или введите полный номер с символом +.',
};

const modalCopy = {
  en: {
    eyebrow: 'C-UAS Product Consultation',
    title: 'Talk to a C-UAS Product Specialist',
    helper: "Enter your WhatsApp number first. We'll open WhatsApp with a ready-to-send message.",
    nameLabel: 'Name *',
    phoneLabel: 'WhatsApp / Phone *',
    countryCodeAria: 'Country code',
    countryCodePlaceholder: 'Country Code',
    phonePlaceholder: 'WhatsApp number, or full number with +',
    saving: 'Saving...',
    submit: 'Open WhatsApp',
    note: 'The message is pre-filled; you still need to press Send in WhatsApp.',
    close: 'Close WhatsApp contact form',
    nameError: 'Please enter your name before opening WhatsApp.',
    phoneError: 'Please enter your WhatsApp number before continuing.',
    countryCodeError: 'Please enter a country code, or enter the full number with +.',
  },
  ru: {
    eyebrow: 'Консультация в WhatsApp',
    title: 'Подтвердите контактные данные',
    helper: 'Оставьте номер WhatsApp. Затем мы откроем WhatsApp с готовым сообщением.',
    nameLabel: 'Имя *',
    phoneLabel: 'WhatsApp / телефон *',
    countryCodeAria: 'Код страны',
    countryCodePlaceholder: 'например +1',
    phonePlaceholder: 'Номер WhatsApp или полный номер с +',
    saving: 'Сохранение...',
    submit: 'Открыть WhatsApp',
    note: 'Сообщение WhatsApp уже подготовлено, но посетителю все равно нужно нажать Send.',
    close: 'Закрыть форму WhatsApp',
    nameError: 'Введите имя перед открытием WhatsApp.',
    phoneError: 'Введите номер WhatsApp, чтобы продолжить.',
    countryCodeError: 'Введите код страны или полный номер с +.',
  },
  es: {
    eyebrow: 'Consulta por WhatsApp',
    title: 'Confirme sus datos de contacto',
    helper: 'Deje primero su numero de WhatsApp. Luego abriremos WhatsApp con un mensaje listo para enviar.',
    nameLabel: 'Nombre *',
    phoneLabel: 'WhatsApp / telefono *',
    countryCodeAria: 'Codigo de pais',
    countryCodePlaceholder: 'ej. +1',
    phonePlaceholder: 'Numero de WhatsApp o numero completo con +',
    saving: 'Guardando...',
    submit: 'Abrir WhatsApp',
    note: 'El mensaje de WhatsApp ya esta preparado, pero el visitante aun debe pulsar Enviar.',
    close: 'Cerrar formulario de WhatsApp',
    nameError: 'Ingrese su nombre antes de abrir WhatsApp.',
    phoneError: 'Ingrese su numero de WhatsApp para continuar.',
    countryCodeError: 'Ingrese un codigo de pais o el numero completo con +.',
  },
  ar: {
    eyebrow: 'استشارة عبر WhatsApp',
    title: 'أكد بيانات التواصل',
    helper: 'اترك رقم WhatsApp اولا. بعد ذلك سنفتح WhatsApp برسالة جاهزة للارسال.',
    nameLabel: 'الاسم *',
    phoneLabel: 'WhatsApp / الهاتف *',
    countryCodeAria: 'رمز الدولة',
    countryCodePlaceholder: 'مثال +1',
    phonePlaceholder: 'رقم WhatsApp او الرقم الكامل مع +',
    saving: 'جار الحفظ...',
    submit: 'فتح WhatsApp',
    note: 'رسالة WhatsApp جاهزة مسبقا، لكن على الزائر الضغط على Send.',
    close: 'اغلاق نموذج WhatsApp',
    nameError: 'يرجى ادخال الاسم قبل فتح WhatsApp.',
    phoneError: 'يرجى ادخال رقم WhatsApp للمتابعة.',
    countryCodeError: 'يرجى ادخال رمز الدولة او الرقم الكامل مع +.',
  },
};

const optionalMessageCopy = {
  en: {
    label: 'Message (optional)',
    placeholder: 'Add a short note about your requirements',
    whatsappPrefix: 'Message',
  },
  ru: {
    label: 'Сообщение (необязательно)',
    placeholder: 'Кратко опишите ваш запрос',
    whatsappPrefix: 'Message',
  },
  es: {
    label: 'Mensaje (opcional)',
    placeholder: 'Agregue una nota breve sobre su necesidad',
    whatsappPrefix: 'Message',
  },
  ar: {
    label: 'الرسالة (اختياري)',
    placeholder: 'اكتب ملاحظة قصيرة حول طلبك',
    whatsappPrefix: 'Message',
  },
};

const saveErrorCopy = {
  en: 'We could not save your contact details. Please check your connection and try again.',
  ru: 'Не удалось сохранить контактные данные. Проверьте соединение и повторите попытку.',
  es: 'No pudimos guardar sus datos. Revise la conexion e intentelo de nuevo.',
  ar: 'تعذر حفظ بيانات الاتصال. تحقق من الاتصال وحاول مرة أخرى.',
};

function getCopy(pathname: string, channel: ContactChannelId) {
  if (channel === 'vk') return vkModalCopy;
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'ru' || segment === 'es' || segment === 'ar') {
    return modalCopy[segment];
  }
  return modalCopy.en;
}

function getOptionalMessageCopy(pathname: string) {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'ru' || segment === 'es' || segment === 'ar') {
    return optionalMessageCopy[segment];
  }
  return optionalMessageCopy.en;
}

function getSaveErrorCopy(pathname: string) {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'ru' || segment === 'es' || segment === 'ar') {
    return saveErrorCopy[segment];
  }
  return saveErrorCopy.en;
}

export default function WhatsAppLeadButton({
  children,
  className,
  style,
  sourceLabel = 'whatsapp_cta',
  ariaLabel,
  productName,
  productHandle,
  ctaLocation,
  initiallyOpen = false,
  renderTrigger = true,
  channel = 'whatsapp',
}: WhatsAppLeadButtonProps) {
  const pathname = usePathname();
  const channelConfig = CONTACT_CHANNELS[channel];
  const copy = getCopy(pathname, channel);
  const ux = getInquiryFormUxCopy(pathname);
  const messageCopy = getOptionalMessageCopy(pathname);
  const saveError = getSaveErrorCopy(pathname);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '',
    phone: '',
    message: '',
  });

  const eventPrefix = channel === 'whatsapp' ? 'ntet_whatsapp_lead' : 'ntet_vk_lead';

  const track = (event: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      event_category: 'lead',
      event_label: sourceLabel,
      contact_channel: channel,
      page_path: pathname,
      ...payload,
    });
  };

  const openModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setError('');
    setIsOpen(true);
    track(`${eventPrefix}_open`, {
      product_handle: productHandle,
      cta_location: ctaLocation,
    });
  };

  const closeModal = () => {
    if (isSending) return;
    setIsOpen(false);
  };

  const openContactChannel = (leadMessage = '', reservedWindow?: Window | null) => {
    const cleanMessage = leadMessage.trim();
    const contextLines = [
      productName ? `Equipment: ${productName}` : '',
      productHandle ? `Reference: ${productHandle}` : '',
      `Page: ${pathname}`,
      cleanMessage ? `${messageCopy.whatsappPrefix}: ${cleanMessage}` : '',
    ].filter(Boolean);
    const message = `${CONTACT_WHATSAPP_MESSAGE}\n\n${contextLines.join('\n')}`;
    const url = channel === 'whatsapp'
      ? `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      : channelConfig.url;
    if (reservedWindow && !reservedWindow.closed) {
      reservedWindow.location.href = url;
      return;
    }

    const opened = window.open(url, '_blank');
    if (opened) {
      opened.opener = null;
    } else {
      window.location.href = url;
    }
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const countryCode = formData.countryCode.trim();
    const leadMessage = formData.message.trim();
    const hasInternationalPrefix = /^\+/.test(phone);
    const hasUsableCountryCode = /^\+\d{1,4}$/.test(countryCode);

    if (!phone) {
      setError(copy.phoneError);
      return;
    }

    if (!hasInternationalPrefix && !hasUsableCountryCode) {
      setError(copy.countryCodeError);
      return;
    }

    setIsSending(true);
    const reservedWindow = window.open('', '_blank');
    if (reservedWindow) {
      reservedWindow.opener = null;
    }

    try {
      const response = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          ...formData,
          channel,
          sourceLabel,
          pagePath: pathname,
          productName,
          productHandle,
          ctaLocation,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true || !result?.inquiryId) {
        throw new Error(result?.error || `Failed to save ${channel} lead`);
      }

      track(`${eventPrefix}_submit`, {
        inquiry_id: result.inquiryId,
        product_handle: productHandle,
        cta_location: ctaLocation,
      });
      trackGoogleAdsFormConversion({
        conversion_source: sourceLabel,
        form_name: channel === 'whatsapp' ? 'whatsapp_pre_chat' : 'vk_pre_contact',
        inquiry_id: result.inquiryId,
        page_path: pathname,
      });
      setIsOpen(false);
      openContactChannel(leadMessage, reservedWindow);
    } catch (err) {
      if (reservedWindow && !reservedWindow.closed) {
        reservedWindow.close();
      }
      console.error(`${channelConfig.label} lead capture failed:`, err);
      setError(saveError);
      track(`${eventPrefix}_error`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {renderTrigger && (
        <a
          href={channelConfig.url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          style={style}
          aria-label={ariaLabel}
          onClick={openModal}
        >
          {children}
        </a>
      )}

      {isOpen && createPortal(
        <div
          className={styles.modalBackdrop}
          role="presentation"
          style={{
            '--contact-channel-accent': channelConfig.accent,
            '--contact-channel-accent-hover': channelConfig.accentHover,
          } as React.CSSProperties}
        >
          <div className={styles.modalPanel} role="dialog" aria-modal="true" aria-labelledby="contact-lead-title">
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h2 id="contact-lead-title" className={styles.title}>{copy.title}</h2>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeModal} aria-label={copy.close}>
                <X size={18} />
              </button>
            </div>

            <form className={styles.form} onSubmit={submitLead}>
              <p className={styles.helper}>{copy.helper}</p>

              <label className={styles.field}>
                <span className={styles.label}>{copy.nameLabel.replace(/\s*\*$/, '')} <small>({ux.optional})</small></span>
                <input
                  className={styles.input}
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  autoComplete="name"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>{copy.phoneLabel}</span>
                <div className={styles.phoneRow}>
                  <div className={styles.countryCodeShell}>
                    <input
                      className={`${styles.input} ${styles.countryCodeInput}`}
                      value={formData.countryCode}
                      onChange={(event) => {
                        const rawValue = event.target.value.replace(/[^\d+]/g, '');
                        const normalizedValue = rawValue.startsWith('+') ? rawValue : `+${rawValue.replace(/\+/g, '')}`;
                        setFormData((prev) => ({ ...prev, countryCode: normalizedValue.slice(0, 5) }));
                      }}
                      inputMode="tel"
                      autoComplete="tel-country-code"
                      placeholder={copy.countryCodePlaceholder}
                      aria-label={copy.countryCodeAria}
                    />
                  </div>
                  <input
                    className={styles.input}
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    autoComplete="tel"
                    placeholder={copy.phonePlaceholder}
                  />
                </div>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>{messageCopy.label}</span>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value.slice(0, 500) }))}
                  placeholder={messageCopy.placeholder}
                  maxLength={500}
                />
              </label>

              {error && <p className={styles.error} role="alert">{error}</p>}

              <div className={styles.actions}>
                <button type="submit" className={styles.submitButton} disabled={isSending}>
                  {isSending ? copy.saving : copy.submit}
                  {!isSending && <Send size={16} />}
                </button>
                <span className={styles.note}>{copy.note}</span>
              </div>
              <p className={styles.privacyNote}>{ux.privacyNote}</p>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
