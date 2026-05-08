import db from './db';

export interface Solution {
    id: string;
    handle: string;
    category_id: string;
    category_name: string;
    category_primary?: string;
    product_name_en: string; 
    product_name_ru?: string;
    title_en: string;
    summary_en: string;
    summary_ru?: string;
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

export async function getAllSolutions(): Promise<Solution[]> {
    const rows = db.prepare('SELECT * FROM solutions').all() as any[];
    
    return rows.map(row => {
        let data: any = {};
        try {
            data = JSON.parse(row.raw_json);
        } catch (e) {}

        return {
            ...data,
            ...row,
            id: row.handle,
            title_en: row.product_name_en,
            category_id: row.category_id,
            category_name: row.category_name,
        } as Solution;
    });
}

export async function getSolutionById(id: string): Promise<Solution | null> {
    const row = db.prepare('SELECT * FROM solutions WHERE handle = ?').get(id) as any;
    if (!row) return null;

    let data: any = {};
    try {
        data = JSON.parse(row.raw_json);
    } catch (e) {}

    return {
        ...data,
        ...row,
        id: id,
        title_en: row.product_name_en,
        category_id: row.category_id,
        category_name: row.category_name,
    } as Solution;
}

export async function getAllSolutionHandles(): Promise<string[]> {
    const rows = db.prepare('SELECT handle FROM solutions').all() as any[];
    return rows.map(r => r.handle);
}
