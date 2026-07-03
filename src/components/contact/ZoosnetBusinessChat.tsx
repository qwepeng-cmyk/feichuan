'use client';

import { useEffect, useState } from 'react';

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

    const scriptId = 'zoosnet-business-chat-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = 'https://drt.zoosnet.net/JS/LsJS.aspx?siteid=DRT78957152&float=1&lng=en';
      document.body.appendChild(script);
    }

    const pcSrc = 'https://drt.zoosnet.net/site/78957152/onlineimgsrc_en.png';
    const mobileSrc = 'https://drt.zoosnet.net/site/78957152/mobileonlineimgsrc_en.png';
    const mobileWidth = '68px';
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    const patchZoosnetImage = () => {
      const isMobile = mediaQuery.matches;
      const root = document.getElementById('LRdiv0');

      if (root) {
        if (isMobile) {
          root.style.width = '0';
          root.style.height = '0';
          root.style.maxWidth = '100vw';
          root.style.overflow = 'visible';
        } else {
          root.style.width = '';
          root.style.height = '';
          root.style.maxWidth = '';
          root.style.overflow = '';
        }
      }

      const images = document.querySelectorAll<HTMLImageElement>('#LRfloater0 img,#LRdiv0 img');
      images.forEach((img) => {
        if (!/onlineimgsrc_en\.png|mobileonlineimgsrc_en\.png/.test(img.src)) return;

        img.src = isMobile ? mobileSrc : pcSrc;
        if (isMobile) {
          img.style.width = mobileWidth;
          img.style.height = 'auto';
          img.style.maxWidth = mobileWidth;
          img.style.display = 'block';

          const floater = img.closest<HTMLElement>('#LRfloater0');
          if (floater) {
            floater.style.width = mobileWidth;
            floater.style.height = 'auto';
            floater.style.maxWidth = mobileWidth;
            floater.style.overflow = 'visible';
          }
        } else {
          img.style.width = '';
          img.style.height = '';
          img.style.maxWidth = '';
          img.style.display = '';

          const desktopFloater = img.closest<HTMLElement>('#LRfloater0');
          if (desktopFloater) {
            desktopFloater.style.width = '';
            desktopFloater.style.height = '';
            desktopFloater.style.maxWidth = '';
            desktopFloater.style.overflow = '';
          }
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
