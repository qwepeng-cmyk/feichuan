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
        fallbackTitle: 'Inside N-TET: Low-Altitude Defense Engineering & Industry Notes',
        fallbackDescription: 'Read documented N-TET engineering notes, buyer guides and industry analysis on Low-Altitude Defense planning, sensor roles, testing, documentation and operator workflows.',
    });
}

export default async function MediaPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const dict = await getDictionary(locale);
    const newsData = await getAllMedia();
    
    return <MediaClient newsData={newsData} locale={locale} dict={dict} />;
}
