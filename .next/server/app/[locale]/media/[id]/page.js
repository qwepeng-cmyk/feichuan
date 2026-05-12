(()=>{var e={};e.id=566,e.ids=[566,9550],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},71017:e=>{"use strict";e.exports=require("path")},48133:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>T,pages:()=>d,routeModule:()=>E,tree:()=>c});var a=r(50482),i=r(69108),n=r(62563),s=r.n(n),o=r(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["[locale]",{children:["media",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,38713)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/media/[id]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,95045)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,21342)),"/Users/mattchyi/Documents/Project/fc/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mattchyi/Documents/Project/fc/src/app/[locale]/media/[id]/page.tsx"],T="/[locale]/media/[id]/page",m={require:r,loadChunk:()=>Promise.resolve()},E=new a.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/[locale]/media/[id]/page",pathname:"/[locale]/media/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},62004:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,31900,23)),Promise.resolve().then(r.t.bind(r,61476,23)),Promise.resolve().then(r.bind(r,36404)),Promise.resolve().then(r.bind(r,92164)),Promise.resolve().then(r.bind(r,91451))},36404:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(95344);function i({html:e,className:t}){if(!e)return null;let r=e.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)\/?>/g,(e,t,r,a)=>{if(r.startsWith("/_next/image")||r.startsWith("data:"))return e;let i=`/_next/image?url=${encodeURIComponent(r)}&w=1080&q=75`;return`<img${t}src="${i}"${a} loading="lazy" style="max-width: 100%; height: auto; display: block; margin: 20px auto; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />`});return a.jsx("div",{className:t,dangerouslySetInnerHTML:{__html:r}})}r(3729)},92164:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(95344);r(3729);var i=r(56506),n=r(89410),s=r(94470),o=r.n(s),l=r(97931),c=r(36404);function d({news:e,locale:t,dict:r}){let s=e[`title_${t}`]||e.title_en||e.title,d=e[`content_${t}`]||e.content_en||e.content;return(0,a.jsxs)("div",{className:o().wrapper,children:[(0,a.jsxs)("section",{className:o().banner,children:[a.jsx("div",{className:o().bannerOverlay}),a.jsx("div",{className:o().bannerContent,children:a.jsx("h1",{children:r.nav.media.toUpperCase()})})]}),(0,a.jsxs)("div",{className:o().breadcrumb,children:[a.jsx(i.default,{href:`/${t}`,children:r.nav.home}),a.jsx("span",{className:o().breadcrumbSeparator,children:"/"}),a.jsx(i.default,{href:`/${t}/media`,children:r.nav.media}),a.jsx("span",{className:o().breadcrumbSeparator,children:"/"}),a.jsx("span",{className:o().breadcrumbActive,children:s})]}),(0,a.jsxs)("article",{className:o().articleContainer,children:[a.jsx("h1",{className:o().newsTitle,children:s}),a.jsx("div",{className:o().newsMeta,children:e.date}),e.image&&a.jsx("div",{className:o().featuredImage,children:a.jsx("div",{className:o().imageBox,style:{position:"relative",width:"100%",paddingTop:"56.25%",overflow:"hidden"},children:a.jsx(n.default,{src:e.image,alt:s,fill:!0,style:{objectFit:"cover"},priority:!0,sizes:"100vw"})})}),a.jsx(c.default,{className:o().richContent,html:d})]}),a.jsx("section",{className:o().section,style:{background:"#f8faff"},children:a.jsx(l.Z,{dict:r})})]})}},94470:e=>{e.exports={wrapper:"MobileMediaDetail_wrapper__hqJR2",banner:"MobileMediaDetail_banner__Qpl0u",bannerOverlay:"MobileMediaDetail_bannerOverlay__xCIfK",bannerContent:"MobileMediaDetail_bannerContent__7fDE5",breadcrumb:"MobileMediaDetail_breadcrumb__Jis57",breadcrumbActive:"MobileMediaDetail_breadcrumbActive__Nj_NT",breadcrumbSeparator:"MobileMediaDetail_breadcrumbSeparator__CrNQE",articleContainer:"MobileMediaDetail_articleContainer__zJf2I",newsTitle:"MobileMediaDetail_newsTitle__bZGB2",newsMeta:"MobileMediaDetail_newsMeta__gGJ_p",featuredImage:"MobileMediaDetail_featuredImage__peXyr",richContent:"MobileMediaDetail_richContent__gWq4X",section:"MobileMediaDetail_section__d3uqV"}},65458:(e,t)=>{"use strict";function r(e){return"("===e[0]&&e.endsWith(")")}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isGroupSegment:function(){return r},PAGE_SEGMENT_KEY:function(){return a},DEFAULT_SEGMENT_KEY:function(){return i}});let a="__PAGE__",i="__DEFAULT__"},38713:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,generateStaticParams:()=>p});var a=r(25036),i=r(40002),n=r(867),s=r(16274),o=r(2813),l=r(49550);let c=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/mobile/MobileMediaDetail.tsx`),{__esModule:d,$$typeof:T}=c,m=c.default;var E=r(58023),_=r(97803),u=r(76892);async function p(){return(await (0,E.SQ)()).map(e=>({id:e}))}async function x({id:e,locale:t}){let r=await (0,_.R)(t),i=await (0,E.jl)(e);i||(0,n.notFound)();let c=i[`title_${t}`]||i.title_en||i.title,d=i[`content_${t}`]||i.content_en||i.content;return(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:"pc_only",children:(0,a.jsxs)("div",{className:"news-detail-page",style:{paddingTop:"112px",backgroundColor:"#fff"},children:[a.jsx("div",{className:"product-breadcrumb-nav",style:{borderBottom:"1px solid #f0f0f0",padding:"15px 0"},children:a.jsx("div",{className:"container",children:(0,a.jsxs)("div",{className:"breadcrumb-path",style:{fontSize:"1.4rem",color:"#666"},children:[a.jsx(s.default,{href:`/${t}`,style:{color:"#315ba4",textDecoration:"none"},children:r.nav.home})," > ",a.jsx(s.default,{href:`/${t}/media`,style:{color:"#315ba4",textDecoration:"none"},children:r.nav.media})," > ",c]})})}),(0,a.jsxs)("section",{className:"product-banner",style:{height:"40vh",minHeight:"320px",maxHeight:"450px",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",borderBottom:"1px solid #e1e8f0"},children:[a.jsx(o.default,{src:"/media/media_banner.jpg",fill:!0,style:{objectFit:"cover"},priority:!0,alt:r.media.bannerTitle}),a.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.3)",zIndex:1}}),a.jsx("div",{className:"container",style:{position:"relative",zIndex:1},children:(0,a.jsxs)("div",{style:{maxWidth:"800px"},children:[a.jsx("h1",{style:{fontSize:"5.2rem",fontWeight:900,color:"#fff",marginBottom:"15px",lineHeight:1.1},children:r.media.bannerTitle}),a.jsx("p",{style:{fontSize:"2rem",color:"#fff",lineHeight:1.5,opacity:.95},children:r.media.bannerSubtitle})]})})]}),a.jsx("article",{style:{padding:"80px 0"},children:(0,a.jsxs)("div",{className:"container",style:{maxWidth:"1200px"},children:[(0,a.jsxs)("div",{style:{textAlign:"center",marginBottom:"60px"},children:[a.jsx("h1",{style:{fontSize:"4.8rem",fontWeight:900,color:"#333",lineHeight:"1.2",marginBottom:"30px"},children:c}),a.jsx("div",{style:{fontSize:"1.8rem",color:"#666",fontWeight:500},children:i.date})]}),a.jsx("div",{style:{marginBottom:"50px",position:"relative",height:"500px",width:"100%",backgroundColor:"#f5f5f5"},children:a.jsx(o.default,{src:i.image,alt:c,fill:!0,style:{objectFit:"cover",borderRadius:"8px"},sizes:"100vw"})}),a.jsx("div",{className:"news-rich-content",style:{fontSize:"1.8rem",lineHeight:"1.8",color:"#444"},children:a.jsx(u.ZP,{className:"rich-content",html:d})})]})}),a.jsx("section",{style:{padding:"100px 0",backgroundColor:"#f9f9f9",borderTop:"1px solid #eee"},children:a.jsx("div",{className:"container",style:{maxWidth:"1200px"},children:a.jsx(l.default,{dict:r})})})]})}),a.jsx("div",{className:"mobile_only",children:a.jsx(m,{news:i,locale:t,dict:r})})]})}async function h({params:e}){let{id:t,locale:r}=e;return(0,a.jsxs)(a.Fragment,{children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:`
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}}),a.jsx(i.Suspense,{fallback:(0,a.jsxs)("div",{style:{paddingTop:"112px",minHeight:"100vh",backgroundColor:"#fff"},children:[a.jsx("div",{style:{height:"35vh",backgroundColor:"#f5f5f5"}}),a.jsx("div",{className:"container",style:{padding:"60px 15px"},children:(0,a.jsxs)("div",{style:{maxWidth:"800px",margin:"0 auto",textAlign:"center"},children:[a.jsx("div",{style:{height:"40px",backgroundColor:"#f0f0f0",marginBottom:"30px"}}),a.jsx("div",{style:{height:"20px",backgroundColor:"#f5f5f5",width:"20%",margin:"0 auto 50px"}}),a.jsx("div",{style:{width:"100%",height:"400px",backgroundColor:"#f5f5f5",borderRadius:"8px"}})]})})]}),children:a.jsx(x,{id:t,locale:r})})]})}},76892:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>s});let a=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/common/OptimizedRichText.tsx`),{__esModule:i,$$typeof:n}=a,s=a.default},49550:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>s});let a=(0,r(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/components/products/InquiryForm.tsx`),{__esModule:i,$$typeof:n}=a,s=a.default},29976:(e,t,r)=>{"use strict";r.d(t,{Z:()=>m});let a=require("better-sqlite3");var i=r.n(a),n=r(71017),s=r.n(n),o=r(57147),l=r.n(o);let c=s().join(process.cwd(),"data");l().existsSync(c)||l().mkdirSync(c,{recursive:!0});let d=process.env.DATABASE_URL?s().resolve(process.cwd(),process.env.DATABASE_URL):s().join(c,"ntet.db"),T=new(i())(d,{verbose:void 0});T.exec(`
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
`);let m=T},58023:(e,t,r)=>{"use strict";r.d(t,{B8:()=>i,SQ:()=>n,jl:()=>s});var a=r(29976);async function i(){return a.Z.prepare("SELECT raw_json FROM media ORDER BY date DESC").all().map(e=>{try{return JSON.parse(e.raw_json)}catch(e){return null}}).filter(Boolean)}async function n(){return a.Z.prepare("SELECT id FROM media").all().map(e=>e.id)}async function s(e){let t=a.Z.prepare("SELECT raw_json FROM media WHERE id = ?").get(e);if(!t)return null;try{return JSON.parse(t.raw_json)}catch(t){return console.error("Error parsing media JSON for id:",e),null}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,554,6321,4300,867,2813,732,7931,1451],()=>r(48133));module.exports=a})();