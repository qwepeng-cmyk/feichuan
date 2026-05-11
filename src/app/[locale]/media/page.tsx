import React from 'react';
import { getAllMedia } from '@/lib/media';
import MediaClient from './MediaClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function MediaPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const newsData = await getAllMedia();
    const dict = await getDictionary(locale);
    
    return (
        <MediaClient newsData={newsData} locale={locale} dict={dict} />
    );
}
