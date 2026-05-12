"use strict";(()=>{var e={};e.id=3373,e.ids=[3373],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},95825:(e,T,r)=>{r.r(T),r.d(T,{headerHooks:()=>N,originalPathname:()=>l,patchFetch:()=>I,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>p,staticGenerationAsyncStorage:()=>X,staticGenerationBailout:()=>m});var a={};r.r(a),r.d(a,{DELETE:()=>c,GET:()=>i,PUT:()=>o});var t=r(95419),E=r(69108),n=r(99678),s=r(78070),_=r(29976);async function i(e,{params:T}){try{let e=_.Z.prepare("SELECT raw_json FROM cases WHERE handle = ?").get(T.handle);if(!e)return s.Z.json({success:!1,error:"Not found"},{status:404});return s.Z.json({success:!0,data:JSON.parse(e.raw_json)})}catch(e){return s.Z.json({success:!1,error:"Server error"},{status:500})}}async function o(e,{params:T}){try{let r=await e.json(),a=JSON.stringify(r);return _.Z.prepare(`
            UPDATE cases 
            SET title_en = ?, title_ru = ?, region_en = ?, region_ru = ?, country_en = ?, country_ru = ?, 
                solution_category_id = ?, main_image = ?, 
                description_en = ?, description_ru = ?, devices_en = ?, devices_ru = ?, 
                parameters_en = ?, parameters = ?, parameters_ru = ?,
                raw_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE handle = ?
        `).run(r.title_en||r.title,r.title_ru||"",r.region_en||"",r.region_ru||"",r.country_en||"",r.country_ru||"",r.solution_category_id||"",r.main_image||"",r.description_en||"",r.description_ru||"",r.devices_en||"",r.devices_ru||"",JSON.stringify(r.parameters_en||[]),JSON.stringify(r.parameters||[]),JSON.stringify(r.parameters_ru||[]),a,T.handle),s.Z.json({success:!0})}catch(e){return s.Z.json({success:!1},{status:500})}}async function c(e,{params:T}){try{return _.Z.prepare("DELETE FROM cases WHERE handle = ?").run(T.handle),s.Z.json({success:!0})}catch(e){return s.Z.json({success:!1},{status:500})}}let u=new t.AppRouteRouteModule({definition:{kind:E.x.APP_ROUTE,page:"/api/admin/cases/[handle]/route",pathname:"/api/admin/cases/[handle]",filename:"route",bundlePath:"app/api/admin/cases/[handle]/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/cases/[handle]/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:X,serverHooks:p,headerHooks:N,staticGenerationBailout:m}=u,l="/api/admin/cases/[handle]/route";function I(){return(0,n.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:X})}},29976:(e,T,r)=>{r.d(T,{Z:()=>u});let a=require("better-sqlite3");var t=r.n(a),E=r(71017),n=r.n(E),s=r(57147),_=r.n(s);let i=n().join(process.cwd(),"data");_().existsSync(i)||_().mkdirSync(i,{recursive:!0});let o=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(i,"ntet.db"),c=new(t())(o,{verbose:void 0});c.exec(`
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
`);let u=c}};var T=require("../../../../../webpack-runtime.js");T.C(e);var r=e=>T(T.s=e),a=T.X(0,[1638,6206],()=>r(95825));module.exports=a})();