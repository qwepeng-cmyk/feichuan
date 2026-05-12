"use strict";(()=>{var e={};e.id=801,e.ids=[801],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},16715:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>X,originalPathname:()=>l,patchFetch:()=>I,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>N});var a={};r.r(a),r.d(a,{DELETE:()=>u,GET:()=>o,PUT:()=>i});var t=r(95419),E=r(69108),_=r(99678),n=r(78070),s=r(29976);async function o(e,{params:T}){try{let e=s.Z.prepare("SELECT raw_json FROM products WHERE handle = ?").get(T.handle);if(!e)return n.Z.json({success:!1,error:"Not found"},{status:404});return n.Z.json({success:!0,data:JSON.parse(e.raw_json)})}catch(e){return n.Z.json({success:!1,error:"Server error"},{status:500})}}async function i(e,{params:T}){try{let r=await e.json(),a=JSON.stringify(r);return s.Z.prepare(`
            UPDATE products 
            SET product_name_en = ?, product_name_ru = ?, category_primary = ?, main_image = ?, 
                summary_en = ?, summary_ru = ?, key_application_en = ?, key_application_ru = ?,
                key_parameter_1_en = ?, key_parameter_1_ru = ?, key_parameter_2_en = ?, key_parameter_2_ru = ?,
                parameters_en = ?, parameters_ru = ?, detail_html_en = ?, detail_html_ru = ?,
                raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(r.product_name_en||r.product_name,r.product_name_ru||"",r.category_primary,r.main_image,r.summary_en||"",r.summary_ru||"",r.key_application_en||"",r.key_application_ru||"",r.key_parameter_1_en||"",r.key_parameter_1_ru||"",r.key_parameter_2_en||"",r.key_parameter_2_ru||"",JSON.stringify(r.parameters_en||{}),JSON.stringify(r.parameters_ru||{}),r.detail_html_en||"",r.detail_html_ru||"",a,T.handle),n.Z.json({success:!0})}catch(e){return n.Z.json({success:!1},{status:500})}}async function u(e,{params:T}){try{return s.Z.prepare("DELETE FROM products WHERE handle = ?").run(T.handle),n.Z.json({success:!0})}catch(e){return n.Z.json({success:!1},{status:500})}}let d=new t.AppRouteRouteModule({definition:{kind:E.x.APP_ROUTE,page:"/api/admin/products/[handle]/route",pathname:"/api/admin/products/[handle]",filename:"route",bundlePath:"app/api/admin/products/[handle]/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/products/[handle]/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:c,staticGenerationAsyncStorage:p,serverHooks:m,headerHooks:X,staticGenerationBailout:N}=d,l="/api/admin/products/[handle]/route";function I(){return(0,_.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:p})}},29976:(e,T,r)=>{r.d(T,{Z:()=>d});let a=require("better-sqlite3");var t=r.n(a),E=r(71017),_=r.n(E),n=r(57147),s=r.n(n);let o=_().join(process.cwd(),"data");s().existsSync(o)||s().mkdirSync(o,{recursive:!0});let i=process.env.DATABASE_URL?_().resolve(process.cwd(),process.env.DATABASE_URL):_().join(o,"ntet.db"),u=new(t())(i,{verbose:void 0});u.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        handle TEXT UNIQUE NOT NULL,
        product_name_en TEXT NOT NULL,
        category_primary TEXT NOT NULL,
        summary_en TEXT,
        key_application_en TEXT,
        key_parameter_1_en TEXT,
        key_parameter_2_en TEXT,
        parameters_en TEXT,
        detail_html_en TEXT,
        product_name_ru TEXT,
        summary_ru TEXT,
        key_application_ru TEXT,
        key_parameter_1_ru TEXT,
        key_parameter_2_ru TEXT,
        parameters_ru TEXT,
        detail_html_ru TEXT,
        main_image TEXT,
        raw_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS solutions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        handle TEXT UNIQUE NOT NULL,
        category_id TEXT NOT NULL,
        category_name TEXT NOT NULL,
        product_name_en TEXT NOT NULL,
        summary_en TEXT,
        key_application_en TEXT,
        parameters_en TEXT,
        detail_html_en TEXT,
        product_name_ru TEXT,
        summary_ru TEXT,
        key_application_ru TEXT,
        key_parameter_1_ru TEXT,
        key_parameter_2_ru TEXT,
        parameters_ru TEXT,
        detail_html_ru TEXT,
        main_image TEXT,
        recommended_products TEXT,
        raw_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        handle TEXT UNIQUE NOT NULL,
        title_en TEXT NOT NULL,
        description_en TEXT,
        devices_en TEXT,
        parameters_en TEXT,
        title_ru TEXT,
        description_ru TEXT,
        devices_ru TEXT,
        parameters_ru TEXT,
        main_image TEXT,
        case_images TEXT,
        region_en TEXT,
        country_en TEXT,
        region_ru TEXT,
        country_ru TEXT,
        solution_category_id TEXT,
        recommended_product_handles TEXT,
        raw_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        image TEXT,
        content TEXT,
        title_ru TEXT,
        content_ru TEXT,
        raw_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        contact_method TEXT,
        country_code TEXT,
        phone TEXT,
        demands TEXT,
        message TEXT,
        source_page TEXT,
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Optimized Indexes for Performance
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_primary);
    CREATE INDEX IF NOT EXISTS idx_solutions_category ON solutions(category_id);
    CREATE INDEX IF NOT EXISTS idx_cases_solution_category ON cases(solution_category_id);
    CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
    CREATE INDEX IF NOT EXISTS idx_products_handle ON products(handle);
    CREATE INDEX IF NOT EXISTS idx_solutions_handle ON solutions(handle);
    CREATE INDEX IF NOT EXISTS idx_cases_handle ON cases(handle);
`);let d=u}};var T=require("../../../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),a=T.X(0,[1638,6206],()=>r(16715));module.exports=a})();