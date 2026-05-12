"use strict";(()=>{var T={};T.id=4793,T.ids=[4793],T.modules={30517:T=>{T.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:T=>{T.exports=require("fs")},71017:T=>{T.exports=require("path")},22250:(T,e,E)=>{E.r(e),E.d(e,{headerHooks:()=>N,originalPathname:()=>m,patchFetch:()=>I,requestAsyncStorage:()=>u,routeModule:()=>d,serverHooks:()=>X,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>p});var r={};E.r(r),E.d(r,{GET:()=>_,PATCH:()=>o});var t=E(95419),a=E(69108),i=E(99678),n=E(78070),s=E(29976);async function _(T,{params:e}){try{let T=s.Z.prepare("SELECT * FROM inquiries WHERE id = ?").get(e.id);if(!T)return n.Z.json({success:!1,error:"Not found"},{status:404});return n.Z.json({success:!0,data:T})}catch(T){return n.Z.json({success:!1,error:"Server error"},{status:500})}}async function o(T,{params:e}){try{let E=await T.json();return void 0!==E.is_read&&s.Z.prepare("UPDATE inquiries SET is_read = ? WHERE id = ?").run(E.is_read?1:0,e.id),n.Z.json({success:!0})}catch(T){return n.Z.json({success:!1},{status:500})}}let d=new t.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/admin/inquiries/[id]/route",pathname:"/api/admin/inquiries/[id]",filename:"route",bundlePath:"app/api/admin/inquiries/[id]/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/inquiries/[id]/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:u,staticGenerationAsyncStorage:c,serverHooks:X,headerHooks:N,staticGenerationBailout:p}=d,m="/api/admin/inquiries/[id]/route";function I(){return(0,i.patchFetch)({serverHooks:X,staticGenerationAsyncStorage:c})}},29976:(T,e,E)=>{E.d(e,{Z:()=>u});let r=require("better-sqlite3");var t=E.n(r),a=E(71017),i=E.n(a),n=E(57147),s=E.n(n);let _=i().join(process.cwd(),"data");s().existsSync(_)||s().mkdirSync(_,{recursive:!0});let o=process.env.DATABASE_URL?i().resolve(process.cwd(),process.env.DATABASE_URL):i().join(_,"ntet.db"),d=new(t())(o,{verbose:void 0});d.exec(`
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
`);let u=d}};var e=require("../../../../../webpack-runtime.js");e.C(T);var E=T=>e(e.s=T),r=e.X(0,[1638,6206],()=>E(22250));module.exports=r})();