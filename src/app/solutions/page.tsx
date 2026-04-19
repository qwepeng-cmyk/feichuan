import { getAllSolutions } from '@/lib/solutions';
import SolutionCenterClient from './SolutionCenterClient';

export default async function SolutionCenterPage() {
    const allSolutions = await getAllSolutions();
    
    // Convert to a plain object array for safety during serialization
    const serializedSolutions = allSolutions.map(s => ({
        id: s.id,
        title_en: s.title_en,
        main_image: s.main_image || null,
        category_id: s.category_id
    }));

    return <SolutionCenterClient allSolutions={serializedSolutions} />;
}
