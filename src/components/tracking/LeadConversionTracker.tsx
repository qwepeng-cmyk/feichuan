'use client';

import { useEffect } from 'react';
import { trackGoogleAdsFormConversion } from './googleAdsConversion';

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
        ym?: (counterId: number, method: string, ...args: unknown[]) => void;
        __ntetLeadConversionTracked?: boolean;
    }
}

export default function LeadConversionTracker() {
    useEffect(() => {
        if (window.__ntetLeadConversionTracked) {
            return;
        }

        window.__ntetLeadConversionTracked = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'ntet_form_submit',
            event_category: 'lead',
            event_label: 'public_inquiry',
            form_name: 'public_inquiry',
        });

        if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
                event_category: 'lead',
                event_label: 'public_inquiry',
            });
        }

        if (typeof window.ym === 'function' && document.documentElement.lang === 'ru') {
            window.ym(110881050, 'reachGoal', 'ntet_form_submit');
        }

        trackGoogleAdsFormConversion({
            conversion_source: 'thank_you_page',
            form_name: 'public_inquiry',
        });
    }, []);

    return null;
}
