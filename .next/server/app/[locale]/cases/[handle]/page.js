(()=>{var e={};e.id=1100,e.ids=[1100],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},71017:e=>{"use strict";e.exports=require("path")},33496:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>T,pages:()=>d,routeModule:()=>p,tree:()=>c});var s=a(50482),r=a(69108),i=a(62563),n=a.n(i),l=a(68300),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);a.d(t,o);let c=["",{children:["[locale]",{children:["cases",{children:["[handle]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,80299)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/cases/[handle]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,95045)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,21342)),"/Users/mattchyi/Documents/Project/fc/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,69361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mattchyi/Documents/Project/fc/src/app/[locale]/cases/[handle]/page.tsx"],T="/[locale]/cases/[handle]/page",m={require:a,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/[locale]/cases/[handle]/page",pathname:"/[locale]/cases/[handle]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},43881:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,61476,23)),Promise.resolve().then(a.bind(a,36404)),Promise.resolve().then(a.bind(a,50192))},36404:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var s=a(95344);function r({html:e,className:t,style:a}){if(!e)return null;let r=e.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)\/?>/g,(e,t,a,s)=>{if(a.startsWith("/_next/image")||a.startsWith("data:"))return e;let r=`/_next/image?url=${encodeURIComponent(a)}&w=1080&q=75`;return`<img${t}src="${r}"${s} loading="lazy" style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />`});return s.jsx("div",{className:t,style:a,dangerouslySetInnerHTML:{__html:r}})}a(3729)},50192:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var s=a(95344),r=a(3729),i=a(56506),n=a(89410),l=a(2641),o=a.n(l),c=a(97931);function d({caseData:e,recommendedProducts:t,locale:a,dict:l}){let[d,T]=(0,r.useState)(0),[m,p]=(0,r.useState)("overview"),u=e[`title_${a}`]||e.title_en,_=e[`description_${a}`]||e.description_en,E=[];try{let t=e[`devices_${a}`]||e.devices_en;E="string"==typeof t?JSON.parse(t):t||[]}catch(e){E=[]}let h=[];try{let t=e.case_images||[];h="string"==typeof t?JSON.parse(t):t||[]}catch(e){h=[]}let x=[e.main_image,...h].filter(Boolean);0===x.length&&x.push("/images/placeholder.jpg");let[g,y]=(0,r.useState)(null),[v,b]=(0,r.useState)(null),N=e=>{p(e);let t=document.getElementById(e);if(t){let e=t.getBoundingClientRect(),a=window.pageYOffset||document.documentElement.scrollTop,s=e.top+a-165;window.scrollTo({top:Math.max(0,s),behavior:"smooth"})}};return(0,s.jsxs)("div",{className:o().wrapper,children:[(0,s.jsxs)("div",{className:o().breadcrumb,children:[s.jsx(i.default,{href:`/${a}`,children:l.nav.home}),s.jsx("span",{className:o().breadcrumbSeparator,children:"/"}),s.jsx(i.default,{href:`/${a}/cases`,children:l.nav.cases}),s.jsx("span",{className:o().breadcrumbSeparator,children:"/"}),s.jsx("span",{className:o().breadcrumbActive,children:u})]}),(0,s.jsxs)("section",{className:o().heroSection,children:[(0,s.jsxs)("div",{className:o().gallery,children:[s.jsx("div",{className:o().mainImage,style:{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden",background:"#fff",marginBottom:"10px"},onTouchStart:e=>{b(null),y(e.targetTouches[0].clientX)},onTouchMove:e=>{b(e.targetTouches[0].clientX)},onTouchEnd:()=>{if(!g||!v)return;let e=g-v,t=e>50;(t||e<-50)&&(t?T(e=>e===x.length-1?0:e+1):T(e=>0===e?x.length-1:e-1))},children:s.jsx(n.default,{src:x[d],alt:u,fill:!0,style:{objectFit:"cover"},priority:!0,sizes:"100vw"})}),x.length>1&&s.jsx("div",{className:o().thumbTrack,children:x.map((e,t)=>s.jsx("div",{className:`${o().thumbItem} ${d===t?o().active:""}`,style:{position:"relative",flex:"0 0 70px",height:"52px"},onClick:()=>T(t),children:s.jsx(n.default,{src:e,alt:`Thumb ${t}`,fill:!0,style:{objectFit:"cover"},sizes:"20vw"})},t))})]}),s.jsx("h1",{className:o().title,children:u}),s.jsx("div",{className:o().infoContent,children:(0,s.jsxs)("div",{className:o().keyParams,children:[(0,s.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",color:"#315ba4",marginBottom:"5px"},children:[l.cases?.equipmentUsed||"Equipment Used",":"]}),E&&E.map((e,t)=>s.jsx("div",{className:o().paramItem,children:e},t))]})}),s.jsx("a",{href:"#inquiry",className:o().ctaButton,onClick:e=>{e.preventDefault(),N("inquiry-title")},children:l.products.getQuotation})]}),s.jsx("nav",{className:o().stickyNav,children:(0,s.jsxs)("div",{className:o().navTrack,children:[s.jsx("button",{className:`${o().navItem} ${"overview"===m?o().active:""}`,onClick:()=>N("overview-title"),children:l.products.overview}),s.jsx("button",{className:`${o().navItem} ${"products"===m?o().active:""}`,onClick:()=>N("products-title"),children:l.products.relatedEquipment||"Equipment"}),s.jsx("button",{className:`${o().navItem} ${"inquiry"===m?o().active:""}`,onClick:()=>N("inquiry-title"),children:l.nav.contact})]})}),(0,s.jsxs)("section",{className:o().section,children:[s.jsx("h2",{id:"overview-title",className:o().sectionTitleCenter,children:l.products.overview}),s.jsx("div",{className:o().richText,children:_&&_.split("\n").map((e,t)=>e.trim()?s.jsx("p",{style:{marginBottom:"15px"},children:e},t):null)})]}),t&&t.length>0&&(0,s.jsxs)("section",{className:o().section,style:{background:"#f8faff",paddingBottom:"30px"},children:[s.jsx("h2",{id:"products-title",className:o().sectionTitleCenter,children:l.products.relatedEquipment||"Related Equipment"}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"15px"},children:t.map((e,t)=>(0,s.jsxs)(i.default,{href:`/${a}/products/${e.handle}`,style:{textDecoration:"none",background:"#fff",border:"1px solid #f0f0f0",display:"flex",flexDirection:"column"},children:[s.jsx("div",{style:{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden"},children:s.jsx(n.default,{src:e.image,alt:e.name,fill:!0,style:{objectFit:"contain",padding:"10px"},sizes:"45vw"})}),s.jsx("div",{style:{padding:"12px",textAlign:"center"},children:s.jsx("h3",{style:{fontSize:"12px",fontWeight:"800",color:"#333",margin:0},children:e.name})})]},t))})]}),s.jsx("section",{id:"inquiry-title",className:o().section,style:{background:"#f8faff",paddingTop:"20px"},children:s.jsx(c.Z,{dict:l})})]})}},2641:e=>{e.exports={wrapper:"MobileCaseDetail_wrapper__qcVsK",breadcrumb:"MobileCaseDetail_breadcrumb__XmW8N",breadcrumbActive:"MobileCaseDetail_breadcrumbActive__65mH_",breadcrumbSeparator:"MobileCaseDetail_breadcrumbSeparator__JvwKQ",heroSection:"MobileCaseDetail_heroSection__peOA2",title:"MobileCaseDetail_title__ouS6k",infoContent:"MobileCaseDetail_infoContent___6G2w",keyParams:"MobileCaseDetail_keyParams__KHsPk",paramItem:"MobileCaseDetail_paramItem__sb160",ctaButton:"MobileCaseDetail_ctaButton__Qtpwu",gallery:"MobileCaseDetail_gallery__2BHsy",mainImage:"MobileCaseDetail_mainImage__Fv6hd",navArrow:"MobileCaseDetail_navArrow__6Eez9",prevArrow:"MobileCaseDetail_prevArrow__s_v62",nextArrow:"MobileCaseDetail_nextArrow__9XF8K",thumbTrack:"MobileCaseDetail_thumbTrack__0haGp",thumbItem:"MobileCaseDetail_thumbItem__gasfZ",active:"MobileCaseDetail_active__p7QC_",stickyNav:"MobileCaseDetail_stickyNav__GgSFX",navTrack:"MobileCaseDetail_navTrack__hEbO4",navItem:"MobileCaseDetail_navItem__HlH4Y",section:"MobileCaseDetail_section___3mg9",sectionTitleCenter:"MobileCaseDetail_sectionTitleCenter__alq6x",richText:"MobileCaseDetail_richText__He4mH",specsTable:"MobileCaseDetail_specsTable__ucpa1",specLabel:"MobileCaseDetail_specLabel__FB4uB",specValue:"MobileCaseDetail_specValue__0FvTs",summaryBox:"MobileCaseDetail_summaryBox__7xjv0"}},80299:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>h,generateStaticParams:()=>_,revalidate:()=>u});var s=a(25036),r=a(867),i=a(16274),n=a(40002),l=a(66961);let o=(0,a(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/mobile/MobileCaseDetail.tsx`),{__esModule:c,$$typeof:d}=o,T=o.default;var m=a(97803),p=a(76892);let u=3600;async function _(){return(await (0,l.oo)()).map(e=>({handle:e}))}async function E({handle:e,locale:t}){let a=await (0,m.R)(t),n=await (0,l.BY)(e);n||(0,r.notFound)();let o="ru"===t?n.title_ru:n.title,c="ru"===t?n.description_ru:n.description,d="ru"===t?n.detail_html_ru:n.detail_html;return(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{className:"pc_only",children:s.jsx("div",{className:"case-detail-page",style:{paddingTop:"112px"},children:(0,s.jsxs)("main",{children:[s.jsx("div",{className:"product-breadcrumb-nav",style:{borderBottom:"1px solid #f0f0f0",padding:"15px 0"},children:s.jsx("div",{className:"container",children:(0,s.jsxs)("div",{className:"breadcrumb-path",style:{fontSize:"1.4rem",color:"#666"},children:[s.jsx(i.default,{href:`/${t}`,style:{color:"#315ba4",textDecoration:"none"},children:a.nav.home})," > ",s.jsx(i.default,{href:`/${t}/cases`,style:{color:"#315ba4",textDecoration:"none"},children:a.nav.cases})," > ",o]})})}),s.jsx("section",{className:"case-hero",style:{padding:"60px 0",background:"#fff"},children:s.jsx("div",{className:"container",children:(0,s.jsxs)("div",{style:{maxWidth:"1000px",margin:"0 auto"},children:[s.jsx("h1",{style:{fontSize:"4.2rem",fontWeight:900,color:"#333",marginBottom:"30px",lineHeight:1.2},children:o}),s.jsx("div",{style:{fontSize:"1.8rem",color:"#666",lineHeight:1.8,marginBottom:"40px",paddingLeft:"20px",borderLeft:"4px solid #315ba4"},children:c}),n.image&&s.jsx("div",{style:{width:"100%",borderRadius:"8px",overflow:"hidden",boxShadow:"0 20px 40px rgba(0,0,0,0.1)"},children:s.jsx("img",{src:n.image,alt:o,style:{width:"100%",display:"block"}})})]})})}),s.jsx("section",{className:"case-content",style:{padding:"80px 0",background:"#f8fafc"},children:s.jsx("div",{className:"container",children:s.jsx("div",{style:{maxWidth:"1000px",margin:"0 auto",background:"#fff",padding:"60px",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.05)"},children:s.jsx(p.ZP,{className:"rich-content",html:d||""})})})})]})})}),s.jsx("div",{className:"mobile_only",children:s.jsx(T,{caseData:n,recommendedProducts:n.recommendedProducts||[],locale:t,dict:a})})]})}async function h({params:e}){let{handle:t,locale:a}=e;return(0,s.jsxs)(s.Fragment,{children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .mobile_only { display: none !important; }
        .pc_only { display: block !important; }
        @media (max-width: 991px) {
          .mobile_only { display: block !important; }
          .pc_only { display: none !important; }
        }
      `}}),s.jsx(n.Suspense,{fallback:s.jsx("div",{style:{paddingTop:"112px",minHeight:"100vh",backgroundColor:"#fff"},children:s.jsx("div",{className:"container",style:{padding:"60px 15px"},children:(0,s.jsxs)("div",{style:{maxWidth:"1000px",margin:"0 auto"},children:[s.jsx("div",{style:{height:"50px",backgroundColor:"#f0f0f0",width:"80%",marginBottom:"30px"}}),s.jsx("div",{style:{height:"24px",backgroundColor:"#f5f5f5",width:"100%",marginBottom:"15px"}}),s.jsx("div",{style:{height:"24px",backgroundColor:"#f5f5f5",width:"90%",marginBottom:"40px"}}),s.jsx("div",{style:{width:"100%",aspectRatio:"16/9",backgroundColor:"#f5f5f5",borderRadius:"8px"}})]})})}),children:s.jsx(E,{handle:t,locale:a})})]})}},76892:(e,t,a)=>{"use strict";a.d(t,{ZP:()=>n});let s=(0,a(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/common/OptimizedRichText.tsx`),{__esModule:r,$$typeof:i}=s,n=s.default},66961:(e,t,a)=>{"use strict";a.d(t,{BY:()=>l,oo:()=>n,wL:()=>i});var s=a(29976),r=a(66864);let i=(0,r.unstable_cache)(async()=>s.Z.prepare("SELECT * FROM cases").all().map(e=>{try{return{...JSON.parse(e.raw_json),...e}}catch(t){return e}}),["all-cases"],{revalidate:3600,tags:["cases"]}),n=(0,r.unstable_cache)(async()=>s.Z.prepare("SELECT handle FROM cases").all().map(e=>e.handle).filter(Boolean),["case-handles"],{revalidate:3600,tags:["cases"]}),l=(0,r.unstable_cache)(async e=>{let t=s.Z.prepare("SELECT * FROM cases WHERE handle = ?").get(e);if(!t)return null;try{return{...JSON.parse(t.raw_json),...t}}catch(e){return t}},["case-detail"],{revalidate:3600,tags:["cases"]})},29976:(e,t,a)=>{"use strict";a.d(t,{Z:()=>m});let s=require("better-sqlite3");var r=a.n(s),i=a(71017),n=a.n(i),l=a(57147),o=a.n(l);let c=n().join(process.cwd(),"data");o().existsSync(c)||o().mkdirSync(c,{recursive:!0});let d=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(c,"ntet.db"),T=new(r())(d,{verbose:void 0});T.exec(`
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
`);let m=T}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[1638,554,6321,4300,6864,867,732,7931],()=>a(33496));module.exports=s})();