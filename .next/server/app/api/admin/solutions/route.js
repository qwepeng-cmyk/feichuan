"use strict";(()=>{var e={};e.id=9814,e.ids=[9814],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},17711:(e,T,a)=>{a.r(T),a.d(T,{headerHooks:()=>p,originalPathname:()=>N,patchFetch:()=>l,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>X});var r={};a.r(r),a.d(r,{GET:()=>s,POST:()=>i});var t=a(95419),E=a(69108),n=a(99678),_=a(78070),o=a(29976);async function s(){try{let e=o.Z.prepare("SELECT handle, category_name, product_name_en, main_image FROM solutions ORDER BY id DESC").all();return _.Z.json({success:!0,data:e})}catch(e){return _.Z.json({success:!1,error:"Failed to fetch solutions"},{status:500})}}async function i(e){try{let T=await e.json(),a=T.handle||T.product_name_en.toLowerCase().replace(/\\s+/g,"-");return o.Z.prepare(`
            INSERT INTO solutions (
                handle, category_id, category_name, product_name_en, product_name_ru, 
                summary_en, summary_ru, key_application_en, key_application_ru,
                parameters_en, parameters_ru, detail_html_en, detail_html_ru,
                main_image, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(a,T.category_id||"new_category",T.category_name||"New Category",T.product_name_en,T.product_name_ru||"",T.summary_en||"",T.summary_ru||"",T.key_application_en||"",T.key_application_ru||"",JSON.stringify(T.parameters_en||[]),JSON.stringify(T.parameters_ru||[]),T.detail_html_en||"",T.detail_html_ru||"",T.main_image||"",JSON.stringify(T)),_.Z.json({success:!0,handle:a})}catch(e){return _.Z.json({success:!1,error:"Create failed"},{status:500})}}let u=new t.AppRouteRouteModule({definition:{kind:E.x.APP_ROUTE,page:"/api/admin/solutions/route",pathname:"/api/admin/solutions",filename:"route",bundlePath:"app/api/admin/solutions/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/solutions/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:c,serverHooks:m,headerHooks:p,staticGenerationBailout:X}=u,N="/api/admin/solutions/route";function l(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}},29976:(e,T,a)=>{a.d(T,{Z:()=>d});let r=require("better-sqlite3");var t=a.n(r),E=a(71017),n=a.n(E),_=a(57147),o=a.n(_);let s=n().join(process.cwd(),"data");o().existsSync(s)||o().mkdirSync(s,{recursive:!0});let i=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(s,"ntet.db"),u=new(t())(i,{verbose:void 0});u.exec(`
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
`);let d=u}};var T=require("../../../../webpack-runtime.js");T.C(e);var a=e=>T(T.s=e),r=T.X(0,[1638,6206],()=>a(17711));module.exports=r})();