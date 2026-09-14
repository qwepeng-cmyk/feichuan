import type { Locale } from '@/i18n/config';

export const CONTACT_WHATSAPP_NUMBER = '8615903019526';
export const CONTACT_WHATSAPP_DISPLAY = '+86 159 0301 9526';
export const CONTACT_WHATSAPP_MESSAGE =
  'Здравствуйте! Меня интересует оборудование N-TET для мониторинга малых высот. Пожалуйста, отправьте информацию о продукции и помогите подобрать подходящую конфигурацию.';
export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_WHATSAPP_MESSAGE)}`;
export const CONTACT_VK_URL = 'https://vk.ru/id948875824';
export const CONTACT_VK_DISPLAY = 'vk.ru/id948875824';
export const CONTACT_EMAIL = 'info@n-tetbj.cn';
export const CONTACT_PHONE_DISPLAY = '+86 010 8362 2127';

export type ContactChannelId = 'whatsapp' | 'vk';

export type ContactChannel = {
  id: ContactChannelId;
  label: string;
  display: string;
  url: string;
  accent: string;
  accentHover: string;
  openLabel: string;
  usesLeadCapture: boolean;
};

export const CONTACT_CHANNELS: Record<ContactChannelId, ContactChannel> = {
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    display: CONTACT_WHATSAPP_DISPLAY,
    url: CONTACT_WHATSAPP_URL,
    accent: '#25D366',
    accentHover: '#11A20B',
    openLabel: 'Открыть WhatsApp',
    usesLeadCapture: true,
  },
  vk: {
    id: 'vk',
    label: 'VK',
    display: CONTACT_VK_DISPLAY,
    url: CONTACT_VK_URL,
    accent: '#0077FF',
    accentHover: '#0066D6',
    openLabel: 'Открыть VK',
    usesLeadCapture: true,
  },
};

/**
 * The only locale-to-channel switch used by the public site.
 * Change this map when a market should use a different primary messenger.
 */
export const PRIMARY_CONTACT_CHANNEL_BY_LOCALE: Record<Locale, ContactChannelId> = {
  ru: 'vk',
};

export function getPrimaryContactChannel(locale: Locale): ContactChannel {
  return CONTACT_CHANNELS[PRIMARY_CONTACT_CHANNEL_BY_LOCALE[locale]];
}
