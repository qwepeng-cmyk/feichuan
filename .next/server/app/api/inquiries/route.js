"use strict";(()=>{var e={};e.id=1986,e.ids=[1986],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},63439:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>X,originalPathname:()=>p,patchFetch:()=>m,requestAsyncStorage:()=>d,routeModule:()=>_,serverHooks:()=>c,staticGenerationAsyncStorage:()=>u,staticGenerationBailout:()=>N});var E={};r.r(E),r.d(E,{POST:()=>o});var t=r(95419),a=r(69108),n=r(99678),i=r(78070),s=r(29976);async function o(e){try{let T=await e.json(),r=e.headers.get("referer")||"Direct";return s.Z.prepare(`
            INSERT INTO inquiries (
                name, company, email, contact_method, country_code, 
                phone, demands, message, source_page
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(T.name,T.company||"",T.email,T.contactMethod||"",T.countryCode||"",T.phone||"",JSON.stringify(T.demands||[]),T.message||"",r),i.Z.json({success:!0,message:"Inquiry submitted successfully"})}catch(e){return console.error("Failed to submit inquiry:",e),i.Z.json({success:!1,error:"Server error"},{status:500})}}let _=new t.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/inquiries/route",pathname:"/api/inquiries",filename:"route",bundlePath:"app/api/inquiries/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/inquiries/route.ts",nextConfigOutput:"",userland:E}),{requestAsyncStorage:d,staticGenerationAsyncStorage:u,serverHooks:c,headerHooks:X,staticGenerationBailout:N}=_,p="/api/inquiries/route";function m(){return(0,n.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:u})}},29976:(e,T,r)=>{r.d(T,{Z:()=>u});let E=require("better-sqlite3");var t=r.n(E),a=r(71017),n=r.n(a),i=r(57147),s=r.n(i);let o=n().join(process.cwd(),"data");s().existsSync(o)||s().mkdirSync(o,{recursive:!0});let _=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(o,"ntet.db"),d=new(t())(_,{verbose:void 0});d.exec(`
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
`);let u=d}};var T=require("../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),E=T.X(0,[1638,6206],()=>r(63439));module.exports=E})();