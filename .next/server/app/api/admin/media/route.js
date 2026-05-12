"use strict";(()=>{var e={};e.id=5457,e.ids=[5457],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},27703:(e,T,a)=>{a.r(T),a.d(T,{headerHooks:()=>I,originalPathname:()=>R,patchFetch:()=>L,requestAsyncStorage:()=>p,routeModule:()=>m,serverHooks:()=>l,staticGenerationAsyncStorage:()=>N,staticGenerationBailout:()=>A});var E={};a.r(E),a.d(E,{GET:()=>u,POST:()=>X});var t=a(95419),r=a(69108),i=a(99678),n=a(78070),s=a(29976),o=a(57147),_=a.n(o),d=a(71017),c=a.n(d);async function u(){try{let e=s.Z.prepare("SELECT id, title, image, category, date FROM media ORDER BY created_at DESC").all();return n.Z.json({success:!0,data:e})}catch(e){return n.Z.json({success:!1,error:"Failed to fetch media"},{status:500})}}async function X(e){try{let T=await e.json(),a=T.id||T.title.toLowerCase().replace(/\\s+/g,"-");return T.id=a,s.Z.prepare("INSERT INTO media (id, title, image, category, date, raw_json) VALUES (?, ?, ?, ?, ?, ?)").run(a,T.title,T.image||"",T.category||"",T.date||"",JSON.stringify(T)),function(){let e=s.Z.prepare("SELECT raw_json FROM media").all().map(e=>JSON.parse(e.raw_json)),T=c().join(process.cwd(),"public/media/news_data.json");_().writeFileSync(T,JSON.stringify(e,null,4))}(),n.Z.json({success:!0,handle:a})}catch(e){return n.Z.json({success:!1,error:"Create failed"},{status:500})}}let m=new t.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/admin/media/route",pathname:"/api/admin/media",filename:"route",bundlePath:"app/api/admin/media/route"},resolvedPagePath:"/Users/mattchyi/Documents/Project/fc/src/app/api/admin/media/route.ts",nextConfigOutput:"",userland:E}),{requestAsyncStorage:p,staticGenerationAsyncStorage:N,serverHooks:l,headerHooks:I,staticGenerationBailout:A}=m,R="/api/admin/media/route";function L(){return(0,i.patchFetch)({serverHooks:l,staticGenerationAsyncStorage:N})}},29976:(e,T,a)=>{a.d(T,{Z:()=>c});let E=require("better-sqlite3");var t=a.n(E),r=a(71017),i=a.n(r),n=a(57147),s=a.n(n);let o=i().join(process.cwd(),"data");s().existsSync(o)||s().mkdirSync(o,{recursive:!0});let _=process.env.DATABASE_URL?i().resolve(process.cwd(),process.env.DATABASE_URL):i().join(o,"ntet.db"),d=new(t())(_,{verbose:void 0});d.exec(`
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
`);let c=d}};var T=require("../../../../webpack-runtime.js");T.C(e);var a=e=>T(T.s=e),E=T.X(0,[1638,6206],()=>a(27703));module.exports=E})();