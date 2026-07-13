import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import HomeRebuildPreview from '@/components/home-preview/HomeRebuildPreview';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/',
        fallbackTitle: 'Professional C-UAS Equipment Manufacturer & System Supplier',
        fallbackDescription: 'Industrial UAV platforms, C-UAS systems, early-warning equipment, and security screening systems for infrastructure and public-site operators.',
    });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
    const dict = await getDictionary(params.locale);

    return <HomeRebuildPreview locale={params.locale} dict={dict} />;
}
