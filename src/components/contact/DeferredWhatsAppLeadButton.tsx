'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CONTACT_WHATSAPP_URL } from '@/lib/contactSettings';
import type { WhatsAppLeadButtonProps } from './WhatsAppLeadButton';

type ModalComponent = React.ComponentType<WhatsAppLeadButtonProps>;

export default function DeferredWhatsAppLeadButton({
  children,
  className,
  style,
  sourceLabel = 'whatsapp_cta',
  ariaLabel,
  productName,
  productHandle,
  ctaLocation,
}: WhatsAppLeadButtonProps) {
  const pathname = usePathname();
  const [Modal, setModal] = useState<ModalComponent | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isLoading) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ntet_whatsapp_lead_open',
      event_category: 'lead',
      event_label: sourceLabel,
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
      console.error('Could not load the WhatsApp inquiry form:', error);
      window.location.href = CONTACT_WHATSAPP_URL;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a
        href={CONTACT_WHATSAPP_URL}
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
          initiallyOpen
          renderTrigger={false}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
