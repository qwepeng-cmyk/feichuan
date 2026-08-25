'use client';

import { ArrowUp, MessageCircle, PencilLine } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PrimaryContactButton, { PrimaryContactIcon } from './PrimaryContactButton';
import styles from './DesktopFloatingContact.module.css';
import { defenseText } from '@/lib/localeCopy';

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

const floatingCopy: Record<string, { quickContact: string; consult: string; openChat: string; leaveMessage: string; leaveMessageLabel: string; top: string; topLabel: string }> = {
  ru: { quickContact: 'Быстрый контакт', consult: 'Консультация', openChat: 'Открыть бизнес-чат', leaveMessage: 'Оставить сообщение', leaveMessageLabel: 'Оставить сообщение', top: 'Наверх', topLabel: 'Вернуться наверх' },
  es: { quickContact: 'Contacto rápido', consult: 'Consulta', openChat: 'Abrir chat comercial', leaveMessage: 'Dejar mensaje', leaveMessageLabel: 'Dejar un mensaje', top: 'Arriba', topLabel: 'Volver arriba' },
  ar: { quickContact: 'اتصال سريع', consult: 'استشارة', openChat: 'فتح محادثة الأعمال', leaveMessage: 'ترك رسالة', leaveMessageLabel: 'ترك رسالة', top: 'أعلى', topLabel: 'العودة إلى الأعلى' },
};

export default function DesktopFloatingContact({ locale = 'ru' }: { locale?: string }) {
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

    window.dispatchEvent(new Event('ntet:load-business-chat'));

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

        <PrimaryContactButton
          sourceLabel="desktop_floating_whatsapp"
          className={`${styles.actionButton} ${styles.whatsapp}`}
          ariaLabel={defenseText(locale, 'Get Datasheet & Pricing on WhatsApp')}
        >
          <PrimaryContactIcon size={25} />
          <span>{defenseText(locale, 'Get Datasheet & Pricing on WhatsApp')}</span>
        </PrimaryContactButton>

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
          data-floating-action="back-to-top"
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
