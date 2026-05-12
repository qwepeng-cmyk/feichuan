"use strict";(()=>{var T={};T.id=6553,T.ids=[6553],T.modules={30517:T=>{T.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:T=>{T.exports=require("fs")},71017:T=>{T.exports=require("path")},14119:(T,e,E)=>{E.r(e),E.d(e,{headerHooks:()=>X,originalPathname:()=>N,patchFetch:()=>m,requestAsyncStorage:()=>u,routeModule:()=>_,serverHooks:()=>c,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>p});var t={};E.r(t),E.d(t,{GET:()=>i});var a=E(95419),r=E(69108),s=E(99678),n=E(78070),o=E(29976);async function i(){try{let T=o.Z.prepare("SELECT COUNT(*) as count FROM products").get(),e=o.Z.prepare("SELECT COUNT(*) as count FROM solutions").get(),E=o.Z.prepare("SELECT COUNT(*) as count FROM cases").get(),t=o.Z.prepare("SELECT COUNT(*) as count FROM media").get(),a=o.Z.prepare("SELECT COUNT(*) as count FROM inquiries").get(),r=o.Z.prepare("SELECT COUNT(*) as count FROM inquiries WHERE is_read = 0").get();return n.Z.json({success:!0,data:{products:T.count,solutions:e.count,cases:E.count,media:t.count,inquiries:a.count,unreadInquiries:r.count}})}catch(T){return n.Z.json({success:!1,error:"Failed to fetch stats"},{status:500})}}let _=new a.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/admin/stats/route",pathname:"/api/admin/stats",filename:"route",bundlePath:"app/api/admin/stats/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/stats/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:u,staticGenerationAsyncStorage:d,serverHooks:c,headerHooks:X,staticGenerationBailout:p}=_,N="/api/admin/stats/route";function m(){return(0,s.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:d})}},29976:(T,e,E)=>{E.d(e,{Z:()=>d});let t=require("better-sqlite3");var a=E.n(t),r=E(71017),s=E.n(r),n=E(57147),o=E.n(n);let i=s().join(process.cwd(),"data");o().existsSync(i)||o().mkdirSync(i,{recursive:!0});let _=process.env.DATABASE_URL?s().resolve(process.cwd(),process.env.DATABASE_URL):s().join(i,"ntet.db"),u=new(a())(_,{verbose:void 0});u.exec(`
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
`);let d=u}};var e=require("../../../../webpack-runtime.js");e.C(T);var E=T=>e(e.s=T),t=e.X(0,[1638,6206],()=>E(14119));module.exports=t})();