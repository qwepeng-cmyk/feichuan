'use client';

import { useEffect, useState } from 'react';

const ZOOSNET_SCRIPT_ID = 'zoosnet-business-chat-script';
const ZOOSNET_SCRIPT_SRC = 'https://drt.zoosnet.net/JS/LsJS.aspx?siteid=DRT78957152&float=1&lng=en';
const ZOOSNET_PC_IMAGE = 'https://drt.zoosnet.net/site/78957152/onlineimgsrc_en.png';
const ZOOSNET_MOBILE_IMAGE = 'https://drt.zoosnet.net/site/78957152/mobileonlineimgsrc_en.png';

export default function ZoosnetBusinessChat() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/site/chat-settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;
        setEnabled(Boolean(json?.success && json?.data?.zoosnetEnabled));
      })
      .catch(() => {
        if (isMounted) setEnabled(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (!document.getElementById(ZOOSNET_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = ZOOSNET_SCRIPT_ID;
      script.async = true;
      script.src = ZOOSNET_SCRIPT_SRC;
      document.body.appendChild(script);
    }

    const mobileWidth = '68px';
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    const patchZoosnetImage = () => {
      const isMobile = mediaQuery.matches;
      const root = document.getElementById('LRdiv0');

      if (root) {
        root.style.width = isMobile ? '0' : '';
        root.style.height = isMobile ? '0' : '';
        root.style.maxWidth = isMobile ? '100vw' : '';
        root.style.overflow = isMobile ? 'visible' : '';
      }

      const images = document.querySelectorAll<HTMLImageElement>('#LRfloater0 img,#LRdiv0 img');
      images.forEach((img) => {
        if (!/onlineimgsrc_en\.png|mobileonlineimgsrc_en\.png/.test(img.src)) return;

        img.src = isMobile ? ZOOSNET_MOBILE_IMAGE : ZOOSNET_PC_IMAGE;
        img.style.width = isMobile ? mobileWidth : '';
        img.style.height = isMobile ? 'auto' : '';
        img.style.maxWidth = isMobile ? mobileWidth : '';
        img.style.display = isMobile ? 'block' : '';

        const floater = img.closest<HTMLElement>('#LRfloater0');
        if (floater) {
          floater.style.width = isMobile ? mobileWidth : '';
          floater.style.height = isMobile ? 'auto' : '';
          floater.style.maxWidth = isMobile ? mobileWidth : '';
          floater.style.overflow = isMobile ? 'visible' : '';
        }
      });

      if (isMobile) {
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
      }
    };

    patchZoosnetImage();
    const timer = window.setInterval(patchZoosnetImage, 500);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', patchZoosnetImage);
    } else {
      mediaQuery.addListener(patchZoosnetImage);
    }

    return () => {
      window.clearInterval(timer);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', patchZoosnetImage);
      } else {
        mediaQuery.removeListener(patchZoosnetImage);
      }
    };
  }, [enabled]);

  return null;
}
