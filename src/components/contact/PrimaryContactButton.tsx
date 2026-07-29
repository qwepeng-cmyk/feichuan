'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getPrimaryContactChannel } from '@/lib/contactSettings';
import { localeFromPathname } from '@/lib/localization';
import DeferredWhatsAppLeadButton from './DeferredWhatsAppLeadButton';
import type { WhatsAppLeadButtonProps } from './WhatsAppLeadButton';

export type PrimaryContactButtonProps = WhatsAppLeadButtonProps;

type ChannelStyle = React.CSSProperties & {
  '--contact-channel-accent'?: string;
  '--contact-channel-accent-hover'?: string;
};

function localizeContactNode(node: React.ReactNode, display: string): React.ReactNode {
  if (typeof node === 'string') {
    if (node.trim() === '+86 159 0301 9526') return display;
    return node.replace(/WhatsApp/gi, 'VK');
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <React.Fragment key={index}>{localizeContactNode(child, display)}</React.Fragment>
    ));
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children !== undefined) {
    return React.cloneElement(node, undefined, localizeContactNode(node.props.children, display));
  }

  return node;
}

function channelSourceLabel(sourceLabel: string, channelId: string) {
  return sourceLabel.replace(/whatsapp/gi, channelId);
}

export default function PrimaryContactButton({
  children,
  className,
  style,
  sourceLabel = 'primary_contact_cta',
  ariaLabel,
  productName,
  productHandle,
  ctaLocation,
}: PrimaryContactButtonProps) {
  const pathname = usePathname();
  const channel = getPrimaryContactChannel(localeFromPathname(pathname));
  const channelStyle: ChannelStyle = {
    ...style,
    '--contact-channel-accent': channel.accent,
    '--contact-channel-accent-hover': channel.accentHover,
  };
  const localizedChildren = channel.id === 'vk'
    ? localizeContactNode(children, channel.display)
    : children;
  const localizedSourceLabel = channelSourceLabel(sourceLabel, channel.id);

  if (channel.usesLeadCapture) {
    return (
      <DeferredWhatsAppLeadButton
        className={className}
        style={channelStyle}
        sourceLabel={localizedSourceLabel}
        ariaLabel={(ariaLabel || channel.openLabel).replace(/WhatsApp/gi, channel.label)}
        productName={productName}
        productHandle={productHandle}
        ctaLocation={ctaLocation}
        channel={channel.id}
      >
        {localizedChildren}
      </DeferredWhatsAppLeadButton>
    );
  }

  const trackOpen = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ntet_contact_channel_open',
      event_category: 'lead',
      event_label: localizedSourceLabel,
      contact_channel: channel.id,
      page_path: pathname,
      product_handle: productHandle,
      cta_location: ctaLocation,
    });
  };

  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={channelStyle}
      aria-label={(ariaLabel || channel.openLabel).replace(/WhatsApp/gi, channel.label)}
      data-contact-channel={channel.id}
      data-contact-channel-label={channel.label}
      onClick={trackOpen}
    >
      {localizedChildren}
    </a>
  );
}

export function PrimaryContactIcon({ size = 24, className }: { size?: number; className?: string }) {
  const pathname = usePathname();
  const channel = getPrimaryContactChannel(localeFromPathname(pathname));

  if (channel.id === 'vk') {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} style={{ color: channel.accent }} aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.52 17.88h1.43s.43-.05.65-.29c.2-.22.2-.64.2-.64s-.03-1.95.88-2.24c.9-.28 2.05 1.89 3.28 2.72.93.63 1.64.49 1.64.49l3.29-.05s1.72-.11.91-1.46c-.07-.11-.47-.99-2.43-2.81-2.05-1.91-1.78-1.6.69-4.91 1.51-2.02 2.11-3.25 1.92-3.78-.18-.5-1.29-.37-1.29-.37l-3.7.02s-.28-.04-.48.08c-.2.12-.33.4-.33.4s-.58 1.55-1.36 2.87c-1.64 2.79-2.3 2.94-2.57 2.77-.63-.41-.47-1.66-.47-2.55 0-2.79.42-3.95-.83-4.25-.42-.1-.72-.17-1.79-.18-1.37-.01-2.53 0-3.19.33-.44.22-.78.72-.57.75.26.03.84.16 1.15.58.4.55.39 1.78.39 1.78s.23 3.39-.54 3.81c-.53.29-1.26-.3-2.82-2.81-.8-1.29-1.4-2.72-1.4-2.72s-.12-.29-.32-.44c-.25-.18-.59-.24-.59-.24L.78 4.56s-.81.02-1.11.37c-.27.31-.02.95-.02.95s2.8 6.55 5.97 9.85c2.91 3.03 6.21 2.83 6.21 2.83l.69-.68Z"
          transform="scale(.96) translate(.25 .7)"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 16 16" width={size} height={size} style={{ color: channel.accent }} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.6 2.33A7.85 7.85 0 0 0 7.99 0C3.63 0 .07 3.56.06 7.93c0 1.4.37 2.76 1.06 3.96L0 16l4.2-1.1a7.93 7.93 0 0 0 3.79.96h.01c4.37 0 7.92-3.55 7.93-7.93a7.9 7.9 0 0 0-2.33-5.6ZM8 14.52a6.57 6.57 0 0 1-3.36-.92l-.24-.14-2.49.65.66-2.43-.15-.25a6.56 6.56 0 0 1-1.01-3.5A6.6 6.6 0 0 1 8 1.34a6.55 6.55 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.66A6.6 6.6 0 0 1 8 14.52Zm3.61-4.93c-.2-.1-1.17-.58-1.35-.65-.18-.06-.32-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.59-.99-.59-.52-.99-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.07-.61-1.47-.16-.39-.32-.34-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.69.68-.69 1.65 0 .98.71 1.92.81 2.05.1.13 1.39 2.13 3.38 2.99.47.2.84.33 1.13.42.48.15.9.13 1.25.08.38-.06 1.17-.48 1.34-.94.16-.47.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z"
      />
    </svg>
  );
}
