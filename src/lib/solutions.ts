import db from './db';
import { unstable_cache } from 'next/cache';
import {
    getComplianceTier,
    isPublicComplianceContent,
    sanitizeRecordForTier,
} from './complianceTaxonomy';

export interface Solution {
    id: string;
    handle: string;
    category_id: string;
    category_name: string;
    category_primary?: string;
    product_name_en: string; 
    product_name_ru?: string;
    product_name_es?: string;
    title_en: string;
    summary_en: string;
    summary_ru?: string;
    summary_es?: string;
    key_application_en: string;
    key_application_ru?: string;
    parameters_en: any;
    parameters_ru?: any;
    detail_html_en: string;
    detail_html_ru?: string;
    key_parameter_1_en?: string;
    key_parameter_2_en?: string;
    main_image?: string;
    recommended_products?: string[];
    [key: string]: any; 
}

export const getAllSolutions = unstable_cache(
    async (): Promise<Solution[]> => {
        const rows = db.prepare(`
            SELECT
                handle,
                category_id,
                category_name,
                product_name_en,
                product_name_ru,
                product_name_es,
                summary_en,
                summary_ru,
                summary_es,
                main_image
            FROM solutions
            WHERE COALESCE(is_published, 1) = 1
        `).all() as any[];
        
        return rows
            .filter(row => isPublicComplianceContent('solution', row.handle))
            .map(row => sanitizeRecordForTier({
                ...row,
                id: row.handle,
                title_en: row.product_name_en,
                category_id: row.category_id,
                category_name: row.category_name,
            } as Solution, getComplianceTier('solution', row.handle)));
    },
    ['all-solutions-uav-refresh-20260602-hydro-flow-doc-aligned-v4'],
    { revalidate: 3600, tags: ['solutions'] }
);

export const getSolutionById = unstable_cache(
    async (id: string): Promise<Solution | null> => {
        const row = db.prepare('SELECT * FROM solutions WHERE handle = ? AND COALESCE(is_published, 1) = 1').get(id) as any;
        if (!row) return null;
        if (!isPublicComplianceContent('solution', id)) return null;

        let data: any = {};
        try {
            data = JSON.parse(row.raw_json);
        } catch (e) {}

        const solution = {
            ...data,
            ...row,
            id: id,
            title_en: row.product_name_en,
            category_id: row.category_id,
            category_name: row.category_name,
        } as Solution;

        return sanitizeRecordForTier(solution, getComplianceTier('solution', id));
    },
    ['solution-detail-uav-refresh-20260602-hydro-flow-doc-aligned-v4'],
    { revalidate: 3600, tags: ['solutions'] }
);

export const getAllSolutionHandles = unstable_cache(
    async (): Promise<string[]> => {
        const rows = db.prepare('SELECT handle FROM solutions WHERE COALESCE(is_published, 1) = 1').all() as any[];
        return rows.map(r => r.handle).filter(handle => isPublicComplianceContent('solution', handle));
    },
    ['solution-handles-uav-refresh-20260602-hydro-flow-doc-aligned-v4'],
    { revalidate: 3600, tags: ['solutions'] }
);
