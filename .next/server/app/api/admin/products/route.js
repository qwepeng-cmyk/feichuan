"use strict";(()=>{var e={};e.id=2577,e.ids=[2577],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},13928:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>m,originalPathname:()=>N,patchFetch:()=>l,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>p,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>X});var a={};r.r(a),r.d(a,{GET:()=>o,POST:()=>s});var t=r(95419),E=r(69108),_=r(99678),n=r(78070),i=r(29976);async function o(){try{let e=i.Z.prepare("SELECT handle, product_name_en, category_primary, main_image FROM products ORDER BY id DESC").all();return n.Z.json({success:!0,data:e})}catch(e){return n.Z.json({success:!1,error:"Failed to fetch products"},{status:500})}}async function s(e){try{let T=await e.json(),r=T.handle||T.product_name_en.toLowerCase().replace(/\\s+/g,"-");return i.Z.prepare(`
            INSERT OR REPLACE INTO products (
                handle, product_name_en, product_name_ru, category_primary, summary_en, summary_ru,
                key_application_en, key_application_ru, key_parameter_1_en, key_parameter_1_ru, 
                key_parameter_2_en, key_parameter_2_ru, parameters_en, parameters_ru, 
                detail_html_en, detail_html_ru, main_image, raw_json, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).run(r,T.product_name_en,T.product_name_ru||"",T.category_primary,T.summary_en||"",T.summary_ru||"",T.key_application_en||"",T.key_application_ru||"",T.key_parameter_1_en||"",T.key_parameter_1_ru||"",T.key_parameter_2_en||"",T.key_parameter_2_ru||"",JSON.stringify(T.parameters_en||{}),JSON.stringify(T.parameters_ru||{}),T.detail_html_en||"",T.detail_html_ru||"",T.main_image||"",JSON.stringify(T)),n.Z.json({success:!0,handle:r})}catch(e){return n.Z.json({success:!1,error:"Create failed"},{status:500})}}let u=new t.AppRouteRouteModule({definition:{kind:E.x.APP_ROUTE,page:"/api/admin/products/route",pathname:"/api/admin/products",filename:"route",bundlePath:"app/api/admin/products/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/products/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:c,serverHooks:p,headerHooks:m,staticGenerationBailout:X}=u,N="/api/admin/products/route";function l(){return(0,_.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:c})}},29976:(e,T,r)=>{r.d(T,{Z:()=>d});let a=require("better-sqlite3");var t=r.n(a),E=r(71017),_=r.n(E),n=r(57147),i=r.n(n);let o=_().join(process.cwd(),"data");i().existsSync(o)||i().mkdirSync(o,{recursive:!0});let s=process.env.DATABASE_URL?_().resolve(process.cwd(),process.env.DATABASE_URL):_().join(o,"ntet.db"),u=new(t())(s,{verbose:void 0});u.exec(`
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
`);let d=u}};var T=require("../../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),a=T.X(0,[1638,6206],()=>r(13928));module.exports=a})();