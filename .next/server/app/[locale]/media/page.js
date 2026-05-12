(()=>{var e={};e.id=895,e.ids=[895],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},71017:e=>{"use strict";e.exports=require("path")},24720:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>T,pages:()=>d,routeModule:()=>m,tree:()=>l});var r=t(50482),s=t(69108),i=t(62563),n=t.n(i),c=t(68300),o={};for(let e in c)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>c[e]);t.d(a,o);let l=["",{children:["[locale]",{children:["media",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,76178)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/media/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,95045)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,21342)),"/Users/mattchyi/Documents/Project/fc/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,69361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mattchyi/Documents/Project/fc/src/app/[locale]/media/page.tsx"],T="/[locale]/media/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/[locale]/media/page",pathname:"/[locale]/media",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},77084:(e,a,t)=>{Promise.resolve().then(t.bind(t,35786))},35786:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>E});var r=t(95344),s=t(47983),i=t.n(s),n=t(3729),c=t.n(n),o=t(19374),l=t.n(o),d=t(97931),T=t(56506),p=t(89410);function m({newsData:e,locale:a,dict:t}){let[s,i]=(0,n.useState)("all"),[c,o]=(0,n.useState)(1),m=[{id:"all",label:t.media.categories.latest},{id:"corporate",label:t.media.categories.corporate},{id:"product",label:t.media.categories.product},{id:"industry",label:t.media.categories.industry}],x=(0,n.useMemo)(()=>e.filter(e=>"all"===s||e.category===s),[e,s]);(0,n.useEffect)(()=>{o(1)},[s]);let E=Math.ceil(x.length/8),_=x.slice((c-1)*8,8*c),u=e=>{o(e);let a=document.getElementById("news-grid-top");if(a){let e=document.body.getBoundingClientRect().top,t=a.getBoundingClientRect().top;window.scrollTo({top:t-e-210,behavior:"smooth"})}};return(0,r.jsxs)("div",{className:l().wrapper,children:[(0,r.jsxs)("section",{className:l().banner,children:[r.jsx("div",{className:l().bannerOverlay}),r.jsx("div",{className:l().bannerContent,children:r.jsx("h1",{children:t.media.bannerTitle})})]}),r.jsx("nav",{className:l().stickyNav,children:r.jsx("div",{className:l().tabTrack,children:m.map(e=>r.jsx("button",{className:`${l().tabItem} ${s===e.id?l().active:""}`,onClick:()=>i(e.id),children:e.label},e.id))})}),(0,r.jsxs)("div",{id:"news-grid-top",className:l().listContainer,children:[r.jsx("div",{className:l().grid,children:_.map(e=>{let t=e[`title_${a}`]||e.title_en||e.title;return(0,r.jsxs)(T.default,{href:`/${a}/media/${e.id}`,className:l().card,children:[r.jsx("div",{className:l().imageBox,style:{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden"},children:r.jsx(p.default,{src:e.image,alt:t,fill:!0,style:{objectFit:"cover"},sizes:"(max-width: 768px) 100vw, 50vw"})}),(0,r.jsxs)("div",{className:l().cardContent,children:[r.jsx("div",{className:l().date,children:e.date}),r.jsx("h3",{children:t})]})]},e.id)})}),E>1&&r.jsx("div",{className:l().pagination,children:Array.from({length:E},(e,a)=>a+1).map(e=>r.jsx("button",{className:`${l().pageBtn} ${e===c?l().active:""}`,onClick:()=>u(e),children:e},e))})]}),r.jsx(d.Z,{dict:t})]})}var x=t(91451);function E({newsData:e,locale:a,dict:t}){let[s,n]=c().useState("all"),[o,l]=c().useState(1),d={all:t.media.categories.latest,corporate:t.media.categories.corporate,product:t.media.categories.product,industry:t.media.categories.industry},E=e.filter(e=>"all"===s||e.category===s);c().useEffect(()=>{l(1)},[s]);let _=Math.ceil(E.length/6),u=E.slice((o-1)*6,6*o);return(0,r.jsxs)(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}}),r.jsx("div",{className:"jsx-1cbc92e9cbd39af7 pc_only",children:(0,r.jsxs)("div",{style:{paddingTop:"112px",backgroundColor:"#fff"},className:"jsx-1cbc92e9cbd39af7 media-page",children:[(0,r.jsxs)("section",{style:{height:"40vh",minHeight:"320px",maxHeight:"450px",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",borderBottom:"1px solid #e1e8f0"},className:"jsx-1cbc92e9cbd39af7 product-banner",children:[r.jsx(p.default,{src:"/media/media_banner.jpg",fill:!0,style:{objectFit:"cover"},priority:!0,alt:t.media.bannerTitle}),r.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.3)",zIndex:1},className:"jsx-1cbc92e9cbd39af7"}),r.jsx("div",{style:{position:"relative",zIndex:1},className:"jsx-1cbc92e9cbd39af7 container",children:(0,r.jsxs)("div",{style:{maxWidth:"800px"},className:"jsx-1cbc92e9cbd39af7",children:[r.jsx("h1",{style:{fontSize:"5.2rem",fontWeight:900,color:"#fff",marginBottom:"15px",lineHeight:1.1},className:"jsx-1cbc92e9cbd39af7",children:t.media.bannerTitle}),r.jsx("p",{style:{fontSize:"2rem",color:"#fff",lineHeight:1.5,opacity:.95},className:"jsx-1cbc92e9cbd39af7",children:t.media.bannerSubtitle})]})})]}),r.jsx("div",{className:"jsx-1cbc92e9cbd39af7 sticky-nav",children:r.jsx("div",{className:"jsx-1cbc92e9cbd39af7 container",children:r.jsx("ul",{style:{listStyle:"none",margin:0,padding:0},className:"jsx-1cbc92e9cbd39af7 nav-list",children:[{id:"all",label:t.media.categories.latest},{id:"corporate",label:t.media.categories.corporate},{id:"product",label:t.media.categories.product},{id:"industry",label:t.media.categories.industry}].map(e=>r.jsx("li",{onClick:()=>n(e.id),className:`jsx-1cbc92e9cbd39af7 nav-link-item ${s===e.id?"active":""}`,children:e.label},e.id))})})}),r.jsx("section",{style:{padding:"80px 0"},className:"jsx-1cbc92e9cbd39af7",children:(0,r.jsxs)("div",{className:"jsx-1cbc92e9cbd39af7 container",children:[(0,r.jsxs)("div",{style:{marginBottom:"60px",textAlign:"center",position:"relative"},className:"jsx-1cbc92e9cbd39af7 category-heading-wrap",children:[(0,r.jsxs)("h2",{style:{fontSize:"4.2rem",fontWeight:800,color:"#333",textTransform:"uppercase",margin:"0 auto 15px",letterSpacing:"2px",display:"inline-block",position:"relative"},className:"jsx-1cbc92e9cbd39af7",children:[d[s],r.jsx("div",{style:{width:"60px",height:"4px",background:"#315ba4",margin:"15px auto 0"},className:"jsx-1cbc92e9cbd39af7"})]}),(0,r.jsxs)("div",{style:{fontSize:"1.4rem",color:"#888",fontWeight:500,marginTop:"10px"},className:"jsx-1cbc92e9cbd39af7",children:[E.length," ",t.media.updatesFound||"updates found"]})]}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"40px"},className:"jsx-1cbc92e9cbd39af7 news-grid",children:u.map(e=>{let t=e[`title_${a}`]||e.title_en||e.title;return(0,r.jsxs)(T.default,{href:`/${a}/media/${e.id}`,className:"news-card-group",style:{cursor:"pointer",textDecoration:"none"},children:[r.jsx("div",{style:{height:"350px",overflow:"hidden",position:"relative",marginBottom:"0"},className:"jsx-1cbc92e9cbd39af7 news-image-wrapper",children:r.jsx(p.default,{src:e.image,alt:t,fill:!0,style:{objectFit:"cover",transition:"transform 0.5s ease"},className:"card-img",sizes:"(max-width: 1200px) 50vw, 600px"})}),(0,r.jsxs)("div",{style:{padding:"30px",border:"1px solid #eee",borderTop:"none",backgroundColor:"#fcfcfc",transition:"all 0.3s ease"},className:"jsx-1cbc92e9cbd39af7 news-text-content",children:[r.jsx("div",{style:{fontSize:"1.4rem",color:"#315ba4",fontWeight:600,marginBottom:"15px"},className:"jsx-1cbc92e9cbd39af7 news-date",children:e.date}),r.jsx("h3",{style:{fontSize:"2.2rem",fontWeight:700,color:"#333",lineHeight:"1.4",margin:0},className:"jsx-1cbc92e9cbd39af7",children:t})]})]},e.id)})}),_>=1&&r.jsx("div",{style:{marginTop:"80px",display:"flex",justifyContent:"center",gap:"10px"},className:"jsx-1cbc92e9cbd39af7 pagination-wrapper",children:Array.from({length:_},(e,a)=>a+1).map(e=>r.jsx("div",{onClick:()=>{l(e),window.scrollTo({top:300,behavior:"smooth"})},style:{width:"45px",height:"45px",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #ddd",fontSize:"1.6rem",fontWeight:600,color:e===o?"#fff":"#444",backgroundColor:e===o?"#315ba4":"transparent",cursor:"pointer",transition:"all 0.2s"},className:"jsx-1cbc92e9cbd39af7",children:e},e))})]})}),r.jsx("section",{id:"inquiry",style:{padding:"100px 0",background:"#f8f9fa",borderTop:"1px solid #eee"},className:"jsx-1cbc92e9cbd39af7",children:r.jsx("div",{style:{maxWidth:"1200px"},className:"jsx-1cbc92e9cbd39af7 container",children:r.jsx(x.default,{dict:t})})})]})}),r.jsx("div",{className:"jsx-1cbc92e9cbd39af7 mobile_only",children:r.jsx(m,{newsData:e,locale:a,dict:t})}),r.jsx(i(),{id:"1cbc92e9cbd39af7",children:".pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7{-webkit-transition:all.3s ease;-moz-transition:all.3s ease;-o-transition:all.3s ease;transition:all.3s ease}.pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7:hover{-webkit-transform:translatey(-10px);-moz-transform:translatey(-10px);-ms-transform:translatey(-10px);-o-transform:translatey(-10px);transform:translatey(-10px);-webkit-box-shadow:0 20px 40px rgba(0,0,0,.15);-moz-box-shadow:0 20px 40px rgba(0,0,0,.15);box-shadow:0 20px 40px rgba(0,0,0,.15)}.pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7:hover .news-text-content.jsx-1cbc92e9cbd39af7{background-color:#315ba4!important;border-color:#315ba4!important}.pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7:hover h3.jsx-1cbc92e9cbd39af7,.pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7:hover .news-date.jsx-1cbc92e9cbd39af7{color:#fff!important}.pc_only.jsx-1cbc92e9cbd39af7 .news-card-group.jsx-1cbc92e9cbd39af7:hover .card-img.jsx-1cbc92e9cbd39af7{-webkit-transform:scale(1.08);-moz-transform:scale(1.08);-ms-transform:scale(1.08);-o-transform:scale(1.08);transform:scale(1.08)}"})]})}},19374:e=>{e.exports={wrapper:"MobileMediaCenter_wrapper__hKaV9",banner:"MobileMediaCenter_banner__0Bezy",bannerOverlay:"MobileMediaCenter_bannerOverlay__oNkr0",bannerContent:"MobileMediaCenter_bannerContent__9MJwU",stickyNav:"MobileMediaCenter_stickyNav__oHkay",tabTrack:"MobileMediaCenter_tabTrack__kDLIC",tabItem:"MobileMediaCenter_tabItem__0gejp",active:"MobileMediaCenter_active__q2PYM",listContainer:"MobileMediaCenter_listContainer__aYp6n",grid:"MobileMediaCenter_grid__xF6cH",card:"MobileMediaCenter_card__kCm4v",imageBox:"MobileMediaCenter_imageBox__PSjB3",cardContent:"MobileMediaCenter_cardContent__G9mln",date:"MobileMediaCenter_date__qNQPv",pagination:"MobileMediaCenter_pagination__BLj7u",pageBtn:"MobileMediaCenter_pageBtn__AhfTI"}},76178:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>p});var r=t(25036),s=t(40002),i=t(58023);let n=(0,t(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/app/[locale]/media/MediaClient.tsx`),{__esModule:c,$$typeof:o}=n,l=n.default;var d=t(97803);async function T({locale:e,dict:a}){let t=await (0,i.B8)();return r.jsx(l,{newsData:t,locale:e,dict:a})}async function p({params:e}){let{locale:a}=e,t=await (0,d.R)(a);return r.jsx(s.Suspense,{fallback:(0,r.jsxs)("div",{style:{padding:"20px 15px"},children:[r.jsx("div",{style:{height:"120px",backgroundColor:"#f0f0f0",marginBottom:"30px"}}),[1,2,3].map(e=>(0,r.jsxs)("div",{style:{display:"flex",gap:"15px",marginBottom:"20px",borderBottom:"1px solid #eee",paddingBottom:"15px"},children:[r.jsx("div",{style:{width:"120px",height:"90px",backgroundColor:"#f5f5f5",flexShrink:0}}),(0,r.jsxs)("div",{style:{flex:1},children:[r.jsx("div",{style:{height:"16px",backgroundColor:"#f0f0f0",width:"90%",marginBottom:"10px"}}),r.jsx("div",{style:{height:"12px",backgroundColor:"#f5f5f5",width:"40%"}})]})]},e))]}),children:r.jsx(T,{locale:a,dict:t})})}},29976:(e,a,t)=>{"use strict";t.d(a,{Z:()=>p});let r=require("better-sqlite3");var s=t.n(r),i=t(71017),n=t.n(i),c=t(57147),o=t.n(c);let l=n().join(process.cwd(),"data");o().existsSync(l)||o().mkdirSync(l,{recursive:!0});let d=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(l,"ntet.db"),T=new(s())(d,{verbose:void 0});T.exec(`
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
`);let p=T},58023:(e,a,t)=>{"use strict";t.d(a,{B8:()=>s,SQ:()=>i,jl:()=>n});var r=t(29976);async function s(){return r.Z.prepare("SELECT raw_json FROM media ORDER BY date DESC").all().map(e=>{try{return JSON.parse(e.raw_json)}catch(e){return null}}).filter(Boolean)}async function i(){return r.Z.prepare("SELECT id FROM media").all().map(e=>e.id)}async function n(e){let a=r.Z.prepare("SELECT raw_json FROM media WHERE id = ?").get(e);if(!a)return null;try{return JSON.parse(a.raw_json)}catch(a){return console.error("Error parsing media JSON for id:",e),null}}}};var a=require("../../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),r=a.X(0,[1638,554,6321,4300,732,7931,1451],()=>t(24720));module.exports=r})();