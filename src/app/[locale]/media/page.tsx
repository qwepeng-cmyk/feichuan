import type { Metadata } from 'next';
import { getAllMedia } from '@/lib/media';
import MediaClient from './MediaClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/media',
        fallbackTitle: 'Industrial UAV Insights & Low-Altitude Monitoring News',
        fallbackDescription: 'Read N-TET insights on industrial UAV operations, low-altitude economy trends, tethered UAV surveillance, redundancy, and infrastructure monitoring.',
    });
}

export default async function MediaPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);
    const newsData = await getAllMedia();
    
    return <MediaClient newsData={newsData} locale={locale} dict={dict} />;
}
