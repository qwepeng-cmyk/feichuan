'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CONTACT_CHANNELS, type ContactChannelId } from '@/lib/contactSettings';
import type { WhatsAppLeadButtonProps } from './WhatsAppLeadButton';

type ModalComponent = React.ComponentType<WhatsAppLeadButtonProps>;

type DeferredContactLeadButtonProps = WhatsAppLeadButtonProps & {
  channel?: ContactChannelId;
};

export default function DeferredWhatsAppLeadButton({
  children,
  className,
  style,
  sourceLabel = 'whatsapp_cta',
  ariaLabel,
  productName,
  productHandle,
  ctaLocation,
  channel = 'whatsapp',
}: DeferredContactLeadButtonProps) {
  const pathname = usePathname();
  const channelConfig = CONTACT_CHANNELS[channel];
  const eventPrefix = channel === 'whatsapp' ? 'ntet_whatsapp_lead' : 'ntet_vk_lead';
  const [Modal, setModal] = useState<ModalComponent | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isLoading) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: `${eventPrefix}_open`,
      event_category: 'lead',
      event_label: sourceLabel,
      contact_channel: channel,
      page_path: pathname,
      product_handle: productHandle,
      cta_location: ctaLocation,
    });

    setIsLoading(true);
    try {
      const module = await import('./WhatsAppLeadButton');
      setModal(() => module.default);
      setModalKey((value) => value + 1);
    } catch (error) {
      console.error(`Could not load the ${channelConfig.label} inquiry form:`, error);
      window.location.href = channelConfig.url;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a
        href={channelConfig.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        aria-label={ariaLabel}
        aria-busy={isLoading || undefined}
        onClick={openModal}
      >
        {children}
      </a>

      {Modal && modalKey > 0 && (
        <Modal
          key={modalKey}
          sourceLabel={sourceLabel}
          productName={productName}
          productHandle={productHandle}
          ctaLocation={ctaLocation}
          channel={channel}
          initiallyOpen
          renderTrigger={false}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
