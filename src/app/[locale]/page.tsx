import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';
import { buildSeoMetadata } from '@/lib/seoMetadata';
import HomeRebuildPreview from '@/components/home-preview/HomeRebuildPreview';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    return buildSeoMetadata({
        locale: params.locale,
        path: '/',
        fallbackTitle: 'Оборудование для низковысотного мониторинга и системная интеграция',
        fallbackDescription: 'N-TET поставляет RF-системы, радары, EO/IR, Remote ID и платформы управления для мониторинга воздушного пространства на малых высотах.',
    });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
    const dict = await getDictionary(params.locale);

    return <HomeRebuildPreview locale={params.locale} dict={dict} />;
}
