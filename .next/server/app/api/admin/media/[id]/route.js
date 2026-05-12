"use strict";(()=>{var e={};e.id=4194,e.ids=[4194],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},53885:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>R,originalPathname:()=>L,patchFetch:()=>U,requestAsyncStorage:()=>I,routeModule:()=>m,serverHooks:()=>A,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>y});var E={};r.r(E),r.d(E,{DELETE:()=>N,GET:()=>X,PUT:()=>p});var a=r(95419),t=r(69108),n=r(99678),i=r(78070),s=r(29976),o=r(57147),d=r.n(o),_=r(71017),c=r.n(_);function u(){let e=s.Z.prepare("SELECT raw_json FROM media").all().map(e=>JSON.parse(e.raw_json)),T=c().join(process.cwd(),"public/media/news_data.json");d().writeFileSync(T,JSON.stringify(e,null,4))}async function X(e,{params:T}){try{let e=s.Z.prepare("SELECT raw_json FROM media WHERE id = ?").get(T.id);if(!e)return i.Z.json({success:!1,error:"Not found"},{status:404});return i.Z.json({success:!0,data:JSON.parse(e.raw_json)})}catch(e){return i.Z.json({success:!1,error:"Server error"},{status:500})}}async function p(e,{params:T}){try{let r=await e.json();r.id=r.id||T.id;let E=JSON.stringify(r);return s.Z.prepare(`
            UPDATE media 
            SET title = ?, image = ?, category = ?, date = ?, raw_json = ? 
            WHERE id = ?
        `).run(r.title,r.image||"",r.category||"",r.date||"",E,T.id),u(),i.Z.json({success:!0})}catch(e){return i.Z.json({success:!1},{status:500})}}async function N(e,{params:T}){try{return s.Z.prepare("DELETE FROM media WHERE id = ?").run(T.id),u(),i.Z.json({success:!0})}catch(e){return i.Z.json({success:!1},{status:500})}}let m=new a.AppRouteRouteModule({definition:{kind:t.x.APP_ROUTE,page:"/api/admin/media/[id]/route",pathname:"/api/admin/media/[id]",filename:"route",bundlePath:"app/api/admin/media/[id]/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/media/[id]/route.ts",nextConfigOutput:"",userland:E}),{requestAsyncStorage:I,staticGenerationAsyncStorage:l,serverHooks:A,headerHooks:R,staticGenerationBailout:y}=m,L="/api/admin/media/[id]/route";function U(){return(0,n.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:l})}},29976:(e,T,r)=>{r.d(T,{Z:()=>c});let E=require("better-sqlite3");var a=r.n(E),t=r(71017),n=r.n(t),i=r(57147),s=r.n(i);let o=n().join(process.cwd(),"data");s().existsSync(o)||s().mkdirSync(o,{recursive:!0});let d=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(o,"ntet.db"),_=new(a())(d,{verbose:void 0});_.exec(`
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
`);let c=_}};var T=require("../../../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),E=T.X(0,[1638,6206],()=>r(53885));module.exports=E})();