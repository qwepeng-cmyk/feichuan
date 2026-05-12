"use strict";(()=>{var T={};T.id=7981,T.ids=[7981],T.modules={30517:T=>{T.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:T=>{T.exports=require("fs")},71017:T=>{T.exports=require("path")},4625:(T,e,E)=>{E.r(e),E.d(e,{headerHooks:()=>X,originalPathname:()=>p,patchFetch:()=>m,requestAsyncStorage:()=>d,routeModule:()=>o,serverHooks:()=>c,staticGenerationAsyncStorage:()=>u,staticGenerationBailout:()=>N});var r={};E.r(r),E.d(r,{GET:()=>s});var a=E(95419),t=E(69108),i=E(99678),n=E(78070),_=E(29976);async function s(){try{let T=_.Z.prepare("SELECT id, name, company, email, created_at, is_read FROM inquiries ORDER BY created_at DESC").all();return n.Z.json({success:!0,data:T})}catch(T){return n.Z.json({success:!1,error:"Failed to fetch inquiries"},{status:500})}}let o=new a.AppRouteRouteModule({definition:{kind:t.x.APP_ROUTE,page:"/api/admin/inquiries/route",pathname:"/api/admin/inquiries",filename:"route",bundlePath:"app/api/admin/inquiries/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/inquiries/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:d,staticGenerationAsyncStorage:u,serverHooks:c,headerHooks:X,staticGenerationBailout:N}=o,p="/api/admin/inquiries/route";function m(){return(0,i.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:u})}},29976:(T,e,E)=>{E.d(e,{Z:()=>u});let r=require("better-sqlite3");var a=E.n(r),t=E(71017),i=E.n(t),n=E(57147),_=E.n(n);let s=i().join(process.cwd(),"data");_().existsSync(s)||_().mkdirSync(s,{recursive:!0});let o=process.env.DATABASE_URL?i().resolve(process.cwd(),process.env.DATABASE_URL):i().join(s,"ntet.db"),d=new(a())(o,{verbose:void 0});d.exec(`
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
`);let u=d}};var e=require("../../../../webpack-runtime.js");e.C(T);var E=T=>e(e.s=T),r=e.X(0,[1638,6206],()=>E(4625));module.exports=r})();