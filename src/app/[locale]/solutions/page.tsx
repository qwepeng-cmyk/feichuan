import { getAllSolutions } from '@/lib/solutions';
import SolutionCenterClient from './SolutionCenterClient';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export default async function SolutionCenterPage({ params }: { params: { locale: Locale } }) {
    const { locale } = params;
    const allSolutions = await getAllSolutions();
    const dict = await getDictionary(locale);

    // Convert to a plain object array for safety during serialization
    const serializedSolutions = allSolutions.map(s => ({
        ...s,
        id: s.id,
        title_en: s.title_en,
        main_image: s.main_image || undefined,
        category_id: s.category_id
    }));

    return <SolutionCenterClient allSolutions={serializedSolutions} locale={locale} dict={dict} />;
}
