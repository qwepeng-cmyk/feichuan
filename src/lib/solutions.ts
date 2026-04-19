import fs from 'fs';
import path from 'path';

const SOLUTIONS_DIR = path.join(process.cwd(), '网站资料/08方案概括');

export interface Solution {
    id: string;      // We will map 'handle' to this
    handle: string;
    category_id: string;
    category_primary: string;
    product_name_en: string; 
    title_en: string; // Fallback to product_name_en
    summary_en: string;
    key_application_en: string;
    parameters_en: Record<string, string>;
    detail_html_en: string;
    key_parameter_1_en?: string;
    key_parameter_2_en?: string;
    main_image?: string;
}

const CATEGORY_MAP: Record<string, string> = {
    '01_BorderPatrol': 'Border Patrol',
    '02_InfrastructureProtection': 'Infrastructure Protection',
    '03_KeyAreaSecurity': 'Key Area Security',
    '04_EmergencyRescue': 'Emergency Rescue'
};

export async function getAllSolutions(): Promise<Solution[]> {
    const solutions: Solution[] = [];
    const categories = Object.keys(CATEGORY_MAP);

    for (const cat of categories) {
        const catPath = path.join(SOLUTIONS_DIR, cat);
        if (!fs.existsSync(catPath)) continue;

        const files = fs.readdirSync(catPath).filter(f => f.endsWith('.json'));
        for (const file of files) {
            const content = fs.readFileSync(path.join(catPath, file), 'utf8');
            const data = JSON.parse(content);
            
            // Map handle to id, and ensure basic titles exist
            const solution: Solution = {
                ...data,
                id: data.handle || file.replace('.json', ''),
                title_en: data.product_name_en, // In solutions JSON, it is product_name_en
                category_id: cat,
            };
            solutions.push(solution);
        }
    }
    return solutions;
}

export async function getSolutionById(id: string): Promise<Solution | null> {
    const all = await getAllSolutions();
    return all.find(s => s.id === id) || null;
}

export async function getAllSolutionHandles(): Promise<string[]> {
    const all = await getAllSolutions();
    return all.map(s => s.id);
}
