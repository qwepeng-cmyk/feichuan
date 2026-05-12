"use strict";(()=>{var e={};e.id=4458,e.ids=[4458],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},23750:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>p,originalPathname:()=>m,patchFetch:()=>l,requestAsyncStorage:()=>d,routeModule:()=>c,serverHooks:()=>X,staticGenerationAsyncStorage:()=>u,staticGenerationBailout:()=>N});var E={};r.r(E),r.d(E,{GET:()=>_,POST:()=>o});var a=r(95419),t=r(69108),n=r(99678),s=r(78070),i=r(29976);async function _(){try{let e=i.Z.prepare("SELECT handle, title_en, region_en, main_image FROM cases ORDER BY id DESC").all();return s.Z.json({success:!0,data:e})}catch(e){return s.Z.json({success:!1,error:"Failed to fetch cases"},{status:500})}}async function o(e){try{let T=await e.json(),r=T.handle||T.title_en.toLowerCase().replace(/\\s+/g,"-");return i.Z.prepare(`
            INSERT INTO cases (
                handle, title_en, title_ru, region_en, region_ru, 
                description_en, description_ru, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(r,T.title_en,T.title_ru||"",T.region_en||"Global",T.region_ru||"",T.description_en||"",T.description_ru||"",JSON.stringify(T)),s.Z.json({success:!0,handle:r})}catch(e){return s.Z.json({success:!1,error:"Create failed"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:t.x.APP_ROUTE,page:"/api/admin/cases/route",pathname:"/api/admin/cases",filename:"route",bundlePath:"app/api/admin/cases/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/cases/route.ts",nextConfigOutput:"",userland:E}),{requestAsyncStorage:d,staticGenerationAsyncStorage:u,serverHooks:X,headerHooks:p,staticGenerationBailout:N}=c,m="/api/admin/cases/route";function l(){return(0,n.patchFetch)({serverHooks:X,staticGenerationAsyncStorage:u})}},29976:(e,T,r)=>{r.d(T,{Z:()=>d});let E=require("better-sqlite3");var a=r.n(E),t=r(71017),n=r.n(t),s=r(57147),i=r.n(s);let _=n().join(process.cwd(),"data");i().existsSync(_)||i().mkdirSync(_,{recursive:!0});let o=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(_,"ntet.db"),c=new(a())(o,{verbose:void 0});c.exec(`
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
`);let d=c}};var T=require("../../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),E=T.X(0,[1638,6206],()=>r(23750));module.exports=E})();