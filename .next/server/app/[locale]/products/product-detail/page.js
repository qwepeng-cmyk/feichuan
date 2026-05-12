(()=>{var e={};e.id=4796,e.ids=[4796,9550],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},71017:e=>{"use strict";e.exports=require("path")},85581:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>T,pages:()=>d,routeModule:()=>u,tree:()=>c});var a=r(50482),n=r(69108),s=r(62563),i=r.n(s),o=r(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["[locale]",{children:["products",{children:["product-detail",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,87357)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/products/product-detail/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,95045)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,21342)),"/Users/mattchyi/Documents/Project/fc/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mattchyi/Documents/Project/fc/src/app/[locale]/products/product-detail/page.tsx"],T="/[locale]/products/product-detail/page",p={require:r,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/[locale]/products/product-detail/page",pathname:"/[locale]/products/product-detail",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},38723:(e,t,r)=>{Promise.resolve().then(r.bind(r,43298)),Promise.resolve().then(r.bind(r,91451)),Promise.resolve().then(r.bind(r,5381))},43298:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(95344),n=r(3729);function s({items:e}){let[t,r]=(0,n.useState)("");(0,n.useEffect)(()=>{let t=()=>{let t=window.scrollY+180;for(let a of e){let e=document.getElementById(a.id);if(e){let{offsetTop:n,offsetHeight:s}=e;if(t>=n&&t<n+s){r(a.id);break}}}};return window.addEventListener("scroll",t),t(),()=>window.removeEventListener("scroll",t)},[e]);let s=e=>{let t=document.getElementById(e);t&&window.scrollTo({top:t.offsetTop-180,behavior:"smooth"})};return a.jsx("nav",{className:"sticky-nav",children:a.jsx("div",{className:"container",children:a.jsx("ul",{className:"nav-list",style:{listStyle:"none",margin:0,padding:0},children:e.map(e=>a.jsx("li",{className:`nav-link-item ${t===e.id?"active":""}`,onClick:()=>s(e.id),children:e.label},e.id))})})})}},5381:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(95344),n=r(3729),s=r(89410);function i({images:e}){let[t,r]=(0,n.useState)(0);return e&&0!==e.length?(0,a.jsxs)("div",{className:"gallery-container",children:[(0,a.jsxs)("div",{className:"gallery-main",style:{position:"relative",width:"100%",height:"500px",background:"#f8f9fa"},children:[a.jsx(s.default,{src:e[t]||"/logo1.png",alt:"Main Product View",fill:!0,priority:!0,style:{objectFit:"contain",padding:"20px"},sizes:"(max-width: 1200px) 100vw, 50vw"}),a.jsx("button",{onClick:()=>{r(t=>0===t?e.length-1:t-1)},className:"gallery-nav-btn prev",style:{position:"absolute",left:"15px",top:"50%",transform:"translateY(-50%)",width:"40px",height:"110px",background:"rgba(235, 244, 255, 0.92)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10,transition:"all 0.3s",borderRadius:"8px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)"},children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#3b82f6",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M15 18l-6-6 6-6"})})}),a.jsx("button",{onClick:()=>{r(t=>t===e.length-1?0:t+1)},className:"gallery-nav-btn next",style:{position:"absolute",right:"15px",top:"50%",transform:"translateY(-50%)",width:"40px",height:"110px",background:"rgba(235, 244, 255, 0.92)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10,transition:"all 0.3s",borderRadius:"8px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)"},children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#3b82f6",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M9 18l6-6-6-6"})})})]}),a.jsx("div",{className:"gallery-thumbs",children:e.map((e,n)=>a.jsx("div",{className:`thumb-item ${t===n?"active":""}`,onClick:()=>r(n),style:{position:"relative"},children:a.jsx(s.default,{src:e||"/logo1.png",alt:`Thumbnail ${n+1}`,fill:!0,style:{objectFit:"cover"},sizes:"80px"})},n))})]}):null}},87357:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>p});var a=r(25036);r(40002);let n=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/products/ProductGallery.tsx`),{__esModule:s,$$typeof:i}=n,o=n.default;var l=r(55724),c=r(49550),d=r(90163),T=r(867);let p={title:"FC-YJTX-01 Emergency Communication Drone - FC Equipment",description:"High-end tethered mission drone system for ultra-long endurance emergency communications."};async function u(){let e=await (0,d.$h)("fc-yjtx-01-emergency-communication-drone");e||(0,T.notFound)();let t=e.main_image?[e.main_image]:[];return a.jsx("div",{className:"product-detail-page",children:(0,a.jsxs)("main",{children:[a.jsx("div",{className:"product-breadcrumb-nav",children:a.jsx("div",{className:"container",children:(0,a.jsxs)("div",{className:"breadcrumb-path",children:[a.jsx(Link,{href:"/",children:"Home"})," > ",a.jsx(Link,{href:"/products",children:"Product"})," > ",e.product_name_en]})})}),a.jsx("section",{id:"overview",className:"product-hero",style:{padding:"40px 0 20px"},children:a.jsx("div",{className:"container",children:(0,a.jsxs)("div",{className:"product-grid",children:[a.jsx("div",{className:"gallery-main-area",children:a.jsx(o,{images:t})}),(0,a.jsxs)("div",{className:"product-info",children:[a.jsx("h1",{style:{fontSize:"4.8rem",fontWeight:"900",marginBottom:"20px",lineHeight:"1.1"},children:e.product_name_en}),(0,a.jsxs)("div",{className:"drone-specs",style:{marginBottom:"40px"},children:[e.key_parameter_1_en&&a.jsx("div",{style:{fontSize:"1.8rem",color:"#525a66",marginBottom:"8px",lineHeight:"1.4"},children:e.key_parameter_1_en}),e.key_parameter_2_en&&a.jsx("div",{style:{fontSize:"1.8rem",color:"#525a66",marginBottom:"8px",lineHeight:"1.4"},children:e.key_parameter_2_en}),e.key_application_en&&a.jsx("div",{style:{fontSize:"1.8rem",color:"#525a66",lineHeight:"1.4"},children:e.key_application_en})]}),(0,a.jsxs)("div",{className:"cta-group",style:{display:"flex",gap:"20px",marginTop:"40px"},children:[a.jsx("button",{className:"btn-cta",style:{background:"#ff9800",color:"#fff",borderRadius:"4px",textTransform:"none",fontSize:"2rem",flex:1,height:"60px",border:"none",cursor:"pointer"},children:"Get quotation"}),a.jsx("a",{href:"https://wa.me/+8613761974616",className:"btn-cta",style:{background:"#ff9800",color:"#fff",borderRadius:"4px",textTransform:"none",fontSize:"2rem",flex:1,height:"60px",display:"flex",alignItems:"center",justifyContent:"center",border:"none"},children:"WhatsApp"})]})]})]})})}),a.jsx("section",{className:"product-intro-section",style:{paddingBottom:"60px"},children:a.jsx("div",{className:"container",children:a.jsx("div",{className:"product-intro-text",style:{fontSize:"1.8rem",color:"#444",lineHeight:"1.8",borderTop:"1px solid #eee",paddingTop:"40px"},children:e.summary_en})})}),a.jsx(l.ZP,{items:[{id:"overview",label:"Overview"},{id:"specs",label:"Technical Specifications"},{id:"inquiry",label:"Get Solution & Quotation"}]}),e.detail_html_en&&a.jsx("section",{id:"features",className:"detail-section",children:a.jsx("div",{className:"container",children:a.jsx("div",{className:"rich-content",dangerouslySetInnerHTML:{__html:e.detail_html_en}})})}),e.parameters_en&&Object.keys(e.parameters_en).length>0&&a.jsx("section",{id:"specs",className:"detail-section",children:(0,a.jsxs)("div",{className:"container",style:{maxWidth:"1200px"},children:[a.jsx("h2",{className:"section-title",children:"Technical Specifications"}),a.jsx("div",{style:{border:"1px solid #eee"},children:(0,a.jsxs)("table",{className:"spec-table",style:{width:"100%",borderCollapse:"collapse"},children:[a.jsx("thead",{children:(0,a.jsxs)("tr",{style:{background:"#f4f7fa",color:"var(--text-dark)",borderBottom:"2px solid var(--primary)"},children:[a.jsx("th",{style:{padding:"20px 30px",textAlign:"left",fontSize:"1.6rem",fontWeight:"bold"},children:"Parameter"}),a.jsx("th",{style:{padding:"20px 30px",textAlign:"left",fontSize:"1.6rem",fontWeight:"bold"},children:"Description"})]})}),a.jsx("tbody",{children:Object.entries(e.parameters_en).map(([e,t],r)=>(0,a.jsxs)("tr",{className:"spec-row-hover",style:{background:r%2==0?"#fff":"#fafafa",borderBottom:"1px solid #eee",transition:"background 0.2s"},children:[a.jsx("td",{style:{padding:"20px 30px",fontWeight:"bold",width:"45%",fontSize:"1.5rem"},children:e}),a.jsx("td",{style:{padding:"20px 30px",fontSize:"1.5rem"},children:t})]},r))})]})})]})}),a.jsx("section",{id:"inquiry",className:"detail-section alt",children:a.jsx("div",{className:"container",style:{maxWidth:"1200px"},children:a.jsx(c.default,{})})})]})})}},55724:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>i});let a=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/products/InPageNav.tsx`),{__esModule:n,$$typeof:s}=a,i=a.default},49550:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>s,__esModule:()=>n,default:()=>i});let a=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/products/InquiryForm.tsx`),{__esModule:n,$$typeof:s}=a,i=a.default},29976:(e,t,r)=>{"use strict";r.d(t,{Z:()=>p});let a=require("better-sqlite3");var n=r.n(a),s=r(71017),i=r.n(s),o=r(57147),l=r.n(o);let c=i().join(process.cwd(),"data");l().existsSync(c)||l().mkdirSync(c,{recursive:!0});let d=process.env.DATABASE_URL?i().resolve(process.cwd(),process.env.DATABASE_URL):i().join(c,"ntet.db"),T=new(n())(d,{verbose:void 0});T.exec(`
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
`);let p=T},90163:(e,t,r)=>{"use strict";r.d(t,{$h:()=>o,Dg:()=>s,H$:()=>i});var a=r(29976),n=r(66864);let s=(0,n.unstable_cache)(async(e="en")=>{let t={"uav-drone-systems":[],"anti-drone-cuas":[],"security-screening":[],"defense-engineering":[],"field-hospitals":[],"perimeter-intelligence":[]};for(let r of a.Z.prepare("SELECT handle, product_name_en, product_name_ru, main_image, category_primary FROM products").all())t[r.category_primary]&&t[r.category_primary].push({name:"ru"===e&&r.product_name_ru?r.product_name_ru:r.product_name_en,handle:r.handle,image:r.main_image,category:r.category_primary});return t},["all-products"],{revalidate:3600,tags:["products"]}),i=(0,n.unstable_cache)(async()=>a.Z.prepare("SELECT handle FROM products").all().map(e=>e.handle),["product-handles"],{revalidate:3600,tags:["products"]}),o=(0,n.unstable_cache)(async e=>{let t=a.Z.prepare("SELECT * FROM products WHERE handle = ?").get(e);if(!t)return null;try{return{...JSON.parse(t.raw_json),...t}}catch(e){return t}},["product-detail"],{revalidate:3600,tags:["products"]})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,554,6321,4300,6864,867,732,1451],()=>r(85581));module.exports=a})();