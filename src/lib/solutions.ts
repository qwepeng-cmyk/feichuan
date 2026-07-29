import { supabase } from './supabase';
import { unstable_cache } from 'next/cache';
import { sanitizePublicRecord } from './publicCopy';
import { isHiddenPublicSolutionHandle } from './publicCatalogPolicy';

export interface Solution {
    id: string;
    handle: string;
    category_id: string;
    category_name: string;
    category_primary?: string;
    product_name_en: string; 
    product_name_ru?: string;
    product_name_es?: string;
    product_name_ar?: string;
    title_en: string;
    summary_en: string;
    summary_ru?: string;
    summary_es?: string;
    summary_ar?: string;
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
        const { data, error } = await supabase
            .from('solutions')
            .select('handle, category_id, category_name, product_name_en, product_name_ru, summary_en, summary_ru, main_image')
            .eq('is_published', 1);
        if (error) throw error;
        const rows = (data || []) as any[];
        
        return rows
            .filter((row) => !isHiddenPublicSolutionHandle(row.handle))
            .map(row => sanitizePublicRecord({
                ...row,
                id: row.handle,
                title_en: row.product_name_en,
                category_id: row.category_id,
                category_name: row.category_name,
            } as Solution));
    },
    ['all-solutions-yandex-copy-20260728-v2'],
    { revalidate: 3600, tags: ['solutions'] }
);

export const getSolutionById = unstable_cache(
    async (id: string): Promise<Solution | null> => {
        const { data: row, error } = await supabase
            .from('solutions')
            .select('*')
            .eq('handle', id)
            .eq('is_published', 1)
            .maybeSingle();
        if (error) throw error;
        if (!row) return null;
        if (isHiddenPublicSolutionHandle(id)) return null;

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

        return sanitizePublicRecord(solution);
    },
    ['solution-detail-yandex-copy-20260728-v2'],
    { revalidate: 3600, tags: ['solutions'] }
);

export const getAllSolutionHandles = unstable_cache(
    async (): Promise<string[]> => {
        const { data, error } = await supabase
            .from('solutions')
            .select('handle')
            .eq('is_published', 1);
        if (error) throw error;
        const rows = (data || []) as any[];
        return rows
            .map(r => r.handle)
            .filter((handle) => !isHiddenPublicSolutionHandle(handle));
    },
    ['solution-handles-yandex-copy-20260728-v2'],
    { revalidate: 3600, tags: ['solutions'] }
);
