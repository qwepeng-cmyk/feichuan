import db from './db';

export interface Solution {
    id: string;
    handle: string;
    category_id: string;
    category_name: string;
    category_primary?: string;
    product_name_en: string; 
    title_en: string;
    summary_en: string;
    key_application_en: string;
    parameters_en: Record<string, string>;
    detail_html_en: string;
    key_parameter_1_en?: string;
    key_parameter_2_en?: string;
    main_image?: string;
    recommended_products?: string[];
    [key: string]: any; // Catch-all for extra raw JSON fields
}

export async function getAllSolutions(): Promise<Solution[]> {
    const rows = db.prepare('SELECT handle, category_id, category_name, raw_json FROM solutions').all() as any[];
    
    return rows.map(row => {
        let data: any = {};
        try {
            data = JSON.parse(row.raw_json);
        } catch (e) {}

        return {
            ...data,
            id: row.handle,
            title_en: data.product_name_en,
            category_id: row.category_id,
            category_name: row.category_name,
        } as Solution;
    });
}

export async function getSolutionById(id: string): Promise<Solution | null> {
    const row = db.prepare('SELECT category_id, category_name, raw_json FROM solutions WHERE handle = ?').get(id) as any;
    if (!row) return null;

    let data: any = {};
    try {
        data = JSON.parse(row.raw_json);
    } catch (e) {}

    return {
        ...data,
        id: id,
        title_en: data.product_name_en,
        category_id: row.category_id,
        category_name: row.category_name,
    } as Solution;
}

export async function getAllSolutionHandles(): Promise<string[]> {
    const rows = db.prepare('SELECT handle FROM solutions').all() as any[];
    return rows.map(r => r.handle);
}
