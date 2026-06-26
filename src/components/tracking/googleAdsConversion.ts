export const GOOGLE_ADS_FORM_CONVERSION_SEND_TO = 'AW-18157207807/wPKvCJ3ajq8cEP-BhNJD';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleAdsFormConversion(payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ntet_google_ads_form_conversion',
    event_category: 'lead',
    event_label: 'submit_form_2026',
    send_to: GOOGLE_ADS_FORM_CONVERSION_SEND_TO,
    ...payload,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_FORM_CONVERSION_SEND_TO,
      ...payload,
    });
  }
}
