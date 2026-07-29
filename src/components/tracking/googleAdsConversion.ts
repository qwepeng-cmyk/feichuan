export const GOOGLE_ADS_FORM_CONVERSION_SEND_TO = 'AW-18157207807/wPKvCJ3ajq8cEP-BhNJD';
export const GOOGLE_ADS_FORM_CONVERSION_VALUE = 1000;
export const GOOGLE_ADS_FORM_CONVERSION_CURRENCY = 'CNY';

const TRACKED_INQUIRY_KEY_PREFIX = 'ntet-google-ads-form-conversion:';
const trackedInquiryIds = new Set<number>();

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

type PersistedInquiryConversion = {
  inquiryId: number;
  conversionSource: string;
  formName: string;
  pagePath: string;
};

function wasAlreadyTracked(inquiryId: number) {
  if (trackedInquiryIds.has(inquiryId)) return true;

  try {
    return window.sessionStorage.getItem(`${TRACKED_INQUIRY_KEY_PREFIX}${inquiryId}`) === '1';
  } catch {
    return false;
  }
}

function rememberTrackedInquiry(inquiryId: number) {
  trackedInquiryIds.add(inquiryId);

  try {
    window.sessionStorage.setItem(`${TRACKED_INQUIRY_KEY_PREFIX}${inquiryId}`, '1');
  } catch {
    // In-memory de-duplication still protects this page session when storage is unavailable.
  }
}

export function trackPersistedInquiryConversion({
  inquiryId,
  conversionSource,
  formName,
  pagePath,
}: PersistedInquiryConversion) {
  if (
    typeof window === 'undefined'
    || !Number.isSafeInteger(inquiryId)
    || inquiryId <= 0
    || wasAlreadyTracked(inquiryId)
  ) {
    return false;
  }

  const transactionId = `inquiry-${inquiryId}`;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_FORM_CONVERSION_SEND_TO,
      value: GOOGLE_ADS_FORM_CONVERSION_VALUE,
      currency: GOOGLE_ADS_FORM_CONVERSION_CURRENCY,
      conversion_source: conversionSource,
      form_name: formName,
      inquiry_id: inquiryId,
      page_path: pagePath,
      transaction_id: transactionId,
    });
  }

  if (typeof window.ym === 'function' && document.documentElement.lang === 'ru') {
    window.ym(111120888, 'reachGoal', 'ntet_form_submit');
  }

  rememberTrackedInquiry(inquiryId);
  return true;
}
