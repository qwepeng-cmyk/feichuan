'use client';

import { ArrowUp, MessageCircle, PencilLine } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import WhatsAppLeadButton from './WhatsAppLeadButton';
import styles from './DesktopFloatingContact.module.css';
import { cuasText } from '@/lib/cuasLocaleCopy';

declare global {
  interface Window {
    openZoosUrl?: (url?: string, data?: string) => void;
    LR_showminiDiv?: (islrminimin?: number, data?: string) => void;
    lrminiMax?: () => void;
    LR_HideInvite?: () => void;
    clickopenmini?: number;
    LiveReceptionCode_isonline?: boolean;
    LR_robot?: string;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" width="25" height="25" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.6 2.33A7.85 7.85 0 0 0 7.99 0C3.63 0 .07 3.56.06 7.93c0 1.4.37 2.76 1.06 3.96L0 16l4.2-1.1a7.93 7.93 0 0 0 3.79.96h.01c4.37 0 7.92-3.55 7.93-7.93a7.9 7.9 0 0 0-2.33-5.6ZM8 14.52a6.57 6.57 0 0 1-3.36-.92l-.24-.14-2.49.65.66-2.43-.15-.25a6.56 6.56 0 0 1-1.01-3.5A6.6 6.6 0 0 1 8 1.34a6.55 6.55 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.66A6.6 6.6 0 0 1 8 14.52Zm3.61-4.93c-.2-.1-1.17-.58-1.35-.65-.18-.06-.32-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.59-.99-.59-.52-.99-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.07-.61-1.47-.16-.39-.32-.34-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.69.68-.69 1.65 0 .98.71 1.92.81 2.05.1.13 1.39 2.13 3.38 2.99.47.2.84.33 1.13.42.48.15.9.13 1.25.08.38-.06 1.17-.48 1.34-.94.16-.47.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z"
      />
    </svg>
  );
}

const floatingCopy: Record<string, { quickContact: string; consult: string; openChat: string; leaveMessage: string; leaveMessageLabel: string; top: string; topLabel: string }> = {
  ru: { quickContact: 'Быстрый контакт', consult: 'Консультация', openChat: 'Открыть бизнес-чат', leaveMessage: 'Оставить сообщение', leaveMessageLabel: 'Оставить сообщение', top: 'Наверх', topLabel: 'Вернуться наверх' },
  es: { quickContact: 'Contacto rápido', consult: 'Consulta', openChat: 'Abrir chat comercial', leaveMessage: 'Dejar mensaje', leaveMessageLabel: 'Dejar un mensaje', top: 'Arriba', topLabel: 'Volver arriba' },
  ar: { quickContact: 'اتصال سريع', consult: 'استشارة', openChat: 'فتح محادثة الأعمال', leaveMessage: 'ترك رسالة', leaveMessageLabel: 'ترك رسالة', top: 'أعلى', topLabel: 'العودة إلى الأعلى' },
};

export default function DesktopFloatingContact({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname();
  const copy = floatingCopy[locale] || { quickContact: 'Quick contact', consult: 'Consult', openChat: 'Open business chat', leaveMessage: 'Leave Message', leaveMessageLabel: 'Leave a message', top: 'Top', topLabel: 'Back to top' };
  const [isBusinessChatEnabled, setIsBusinessChatEnabled] = useState(false);
  const [isBusinessChatOnline, setIsBusinessChatOnline] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/site/chat-settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;
        setIsBusinessChatEnabled(Boolean(json?.success && json?.data?.zoosnetEnabled));
      })
      .catch(() => {
        if (isMounted) setIsBusinessChatEnabled(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateOnlineState = () => {
      const hasOnlineAgent = window.LiveReceptionCode_isonline === true;
      const hasRobotFallback = typeof window.LR_robot === 'string' && window.LR_robot.length > 0;
      setIsBusinessChatOnline(hasOnlineAgent || hasRobotFallback);
    };

    updateOnlineState();
    const timer = window.setInterval(updateOnlineState, 2000);
    return () => window.clearInterval(timer);
  }, []);

  const contactPath = (() => {
    const localeSegment = pathname.split('/').filter(Boolean)[0];
    const localePrefix = ['ru', 'es', 'ar'].includes(localeSegment) ? `/${localeSegment}` : '';
    return `${localePrefix}/contact#inquiry`;
  })();

  const jumpToInquiry = () => {
    const target = document.querySelector<HTMLElement>('#inquiry, .contact-form-area .inquiry-container, .inquiry-container');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        const field = target.querySelector<HTMLElement>('textarea[name="message"], input[name="name"], textarea, input');
        field?.focus({ preventScroll: true });
      }, 450);
      return;
    }

    window.location.href = contactPath;
  };

  const openBusinessChat = () => {
    if (typeof window === 'undefined') return;
    if (!isBusinessChatEnabled) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ntet_business_chat_open',
      event_category: 'lead',
      event_label: 'desktop_floating_business_chat',
      page_path: pathname,
    });

    const hideInvitePanels = () => {
      window.LR_HideInvite?.();
      ['LRfloater0', 'LRfloater1', 'LRdiv0', 'LRdiv1'].forEach((id) => {
        const panel = document.getElementById(id);
        if (panel) {
          panel.style.display = 'none';
        }
      });
    };

    const openMiniChat = () => {
      if (typeof window.LR_showminiDiv !== 'function') {
        return false;
      }

      window.clickopenmini = 1;
      hideInvitePanels();
      window.LR_showminiDiv(0);
      window.lrminiMax?.();
      hideInvitePanels();
      window.setTimeout(() => window.lrminiMax?.(), 400);
      window.setTimeout(hideInvitePanels, 500);
      window.setTimeout(hideInvitePanels, 1200);
      return true;
    };

    if (openMiniChat()) return;

    let attempts = 0;
    const retryTimer = window.setInterval(() => {
      attempts += 1;
      if (openMiniChat() || attempts >= 8) {
        window.clearInterval(retryTimer);
      }
    }, 250);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className={styles.shell} aria-label={copy.quickContact}>
      <div className={styles.actions}>
        {isBusinessChatEnabled && (
          <button
            type="button"
            className={`${styles.actionButton} ${styles.consult} ${isBusinessChatOnline ? styles.consultOnline : ''}`}
            onClick={openBusinessChat}
            aria-label={copy.openChat}
          >
            <MessageCircle size={25} strokeWidth={2.5} />
            <span>{copy.consult}</span>
          </button>
        )}

        <WhatsAppLeadButton
          sourceLabel="desktop_floating_whatsapp"
          className={`${styles.actionButton} ${styles.whatsapp}`}
          ariaLabel={cuasText(locale, 'Open WhatsApp contact')}
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </WhatsAppLeadButton>

        <button
          type="button"
          className={`${styles.actionButton} ${styles.message}`}
          onClick={jumpToInquiry}
          aria-label={copy.leaveMessageLabel}
        >
          <PencilLine size={25} strokeWidth={2.4} />
          <span>{copy.leaveMessage}</span>
        </button>

        <button
          type="button"
          className={`${styles.actionButton} ${styles.top}`}
          onClick={scrollToTop}
          aria-label={copy.topLabel}
        >
          <ArrowUp size={24} strokeWidth={2.6} />
          <span>{copy.top}</span>
        </button>
      </div>
    </aside>
  );
}
