(()=>{var e={};e.id=5914,e.ids=[5914],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},57147:e=>{"use strict";e.exports=require("fs")},71017:e=>{"use strict";e.exports=require("path")},57670:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>T,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c});var s=a(50482),i=a(69108),r=a(62563),n=a.n(r),o=a(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let c=["",{children:["[locale]",{children:["cases",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,83271)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/cases/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,95045)),"/Users/mattchyi/Documents/Project/fc/src/app/[locale]/layout.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,21342)),"/Users/mattchyi/Documents/Project/fc/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,69361,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/mattchyi/Documents/Project/fc/src/app/[locale]/cases/page.tsx"],p="/[locale]/cases/page",T={require:a,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/[locale]/cases/page",pathname:"/[locale]/cases",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},41913:(e,t,a)=>{Promise.resolve().then(a.bind(a,23891))},23891:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>T});var s=a(95344),i=a(3729),r=a(18331),n=a.n(r),o=a(97931),l=a(56506),c=a(89410);function d({allCases:e,locale:t,dict:a}){let[r,d]=(0,i.useState)("all"),[p,T]=(0,i.useState)("all"),[m,_]=(0,i.useState)(1),[u,g]=(0,i.useState)(!1),[E,x]=(0,i.useState)(!1),h=[{id:"all",name:a.cases.filters.allSolutions||"All Solutions"},{id:"01_BorderPatrol",name:a.solutions.categories.border},{id:"02_InfrastructureProtection",name:a.solutions.categories.infrastructure},{id:"03_KeyAreaSecurity",name:a.solutions.categories.security},{id:"04_EmergencyRescue",name:a.solutions.categories.emergency}],f=[{id:"all",name:a.cases.filters.allRegions||"All Regions"},{id:"china",name:a.cases.filters.regions.china},{id:"Asia",name:a.cases.filters.regions.asia},{id:"Africa",name:a.cases.filters.regions.africa},{id:"North America",name:a.cases.filters.regions.northAmerica},{id:"South America",name:a.cases.filters.regions.southAmerica},{id:"Europe",name:a.cases.filters.regions.europe},{id:"Oceania",name:a.cases.filters.regions.oceania}],y=(0,i.useMemo)(()=>e.filter(e=>{let t="all"===r||e.solution_category_id===r,a=!0;return a="all"===p||("china"===p?"China"===e.country_en:"Asia"===p?"Asia"===e.region_en&&"China"!==e.country_en:e.region_en===p),t&&a}),[e,r,p]);(0,i.useEffect)(()=>{_(1)},[r,p]);let N=Math.ceil(y.length/8),C=y.slice((m-1)*8,8*m),b=e=>{_(e);let t=document.getElementById("case-grid-top");if(t){let e=document.body.getBoundingClientRect().top,a=t.getBoundingClientRect().top;window.scrollTo({top:a-e-190,behavior:"smooth"})}};return(0,s.jsxs)("div",{className:n().wrapper,children:[(u||E)&&s.jsx("div",{className:n().backdrop,onClick:()=>{g(!1),x(!1)}}),(0,s.jsxs)("section",{className:n().banner,children:[s.jsx("div",{className:n().bannerOverlay}),s.jsx("div",{className:n().bannerContent,children:s.jsx("h1",{children:a.cases.bannerTitle})})]}),(0,s.jsxs)("section",{className:n().filterSection,children:[(0,s.jsxs)("div",{className:n().filterGroup,children:[s.jsx("label",{className:n().filterLabel,children:a.cases.filters.regionLabel||"Region"}),(0,s.jsxs)("div",{className:`${n().selectBox} ${u?n().dropdownActive:""}`,onClick:()=>{g(!u),x(!1)},children:[f.find(e=>e.id===p)?.name,u&&s.jsx("div",{className:n().dropdownList,children:f.map(e=>s.jsx("div",{className:`${n().dropdownItem} ${p===e.id?n().dropdownItemActive:""}`,onClick:t=>{t.stopPropagation(),T(e.id),g(!1)},children:e.name},e.id))})]})]}),(0,s.jsxs)("div",{className:n().filterGroup,children:[s.jsx("label",{className:n().filterLabel,children:a.cases.filters.solutionsLabel||"Solutions"}),(0,s.jsxs)("div",{className:`${n().selectBox} ${E?n().dropdownActive:""}`,onClick:()=>{x(!E),g(!1)},children:[h.find(e=>e.id===r)?.name,E&&s.jsx("div",{className:n().dropdownList,children:h.map(e=>s.jsx("div",{className:`${n().dropdownItem} ${r===e.id?n().dropdownItemActive:""}`,onClick:t=>{t.stopPropagation(),d(e.id),x(!1)},children:e.name},e.id))})]})]})]}),s.jsx("div",{id:"case-grid-top",className:n().listContainer,children:C.length>0?(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{className:n().grid,children:C.map((e,a)=>{let i=e[`title_${t}`]||e.title_en;return(0,s.jsxs)(l.default,{href:`/${t}/cases/${e.handle}`,className:n().card,children:[s.jsx("div",{className:n().imageBox,style:{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden",backgroundColor:"#f5f5f5"},children:s.jsx(c.default,{src:e.main_image||"/images/solutions/placeholder.jpg",alt:i,fill:!0,style:{objectFit:"cover"},sizes:"(max-width: 768px) 100vw, 50vw",priority:a<4})}),s.jsx("div",{className:n().cardContent,children:s.jsx("h3",{children:i})})]},a)})}),N>1&&s.jsx("div",{className:n().pagination,children:Array.from({length:N},(e,t)=>t+1).map(e=>s.jsx("button",{className:`${n().pageBtn} ${e===m?n().active:""}`,onClick:()=>b(e),children:e},e))})]}):(0,s.jsxs)("div",{className:n().emptyState,children:[s.jsx("div",{className:n().emptyIcon,children:"\uD83D\uDD0D"}),s.jsx("p",{children:a.cases.noResults||"No cases found matching your selection."})]})}),s.jsx(o.Z,{dict:a})]})}var p=a(91451);function T({allCases:e,locale:t,dict:a}){let[r,n]=(0,i.useState)("all"),[o,T]=(0,i.useState)("all"),[m,_]=(0,i.useState)(1),u=[{id:"all",name:a.cases.filters.all},{id:"01_BorderPatrol",name:a.solutions.categories.border},{id:"02_InfrastructureProtection",name:a.solutions.categories.infrastructure},{id:"03_KeyAreaSecurity",name:a.solutions.categories.security},{id:"04_EmergencyRescue",name:a.solutions.categories.emergency}],g=[{id:"all",name:a.cases.filters.all},{id:"china",name:a.cases.filters.regions.china},{id:"Asia",name:a.cases.filters.regions.asia},{id:"Africa",name:a.cases.filters.regions.africa},{id:"North America",name:a.cases.filters.regions.northAmerica},{id:"South America",name:a.cases.filters.regions.southAmerica},{id:"Europe",name:a.cases.filters.regions.europe},{id:"Oceania",name:a.cases.filters.regions.oceania}],E=(0,i.useMemo)(()=>e.filter(e=>{let t="all"===r||e.solution_category_id===r,a=!0;return a="all"===o||("china"===o?"China"===e.country_en:"Asia"===o?"Asia"===e.region_en&&"China"!==e.country_en:e.region_en===o),t&&a}),[e,r,o]);(0,i.useEffect)(()=>{_(1)},[r,o]);let x=Math.ceil(E.length/9),h=E.slice((m-1)*9,9*m),f=(e,t,i,r)=>(0,s.jsxs)("div",{className:"filter-row",style:{marginBottom:e===a.cases.filters.regionLabel?"25px":"0",display:"flex",alignItems:"center",gap:"20px"},children:[s.jsx("span",{style:{fontSize:"1.7rem",fontWeight:"800",color:"#333",minWidth:"90px"},children:e}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"5px",alignItems:"center"},children:t.map(e=>{let t=i===e.id;return s.jsx("div",{onClick:()=>r(e.id),style:{display:"flex",alignItems:"center",cursor:"pointer",marginRight:"25px",userSelect:"none"},children:"all"===e.id?s.jsx("button",{style:{padding:"5px 20px",backgroundColor:t?"#315ba4":"#fff",color:t?"#fff":"#333",border:t?"none":"1px solid #dcdcdc",borderRadius:"4px",fontSize:"1.5rem",fontWeight:"800",cursor:"pointer",marginRight:"15px",transition:"all 0.2s"},children:a.cases.filters.all}):(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{style:{width:"18px",height:"18px",borderRadius:"50%",border:"1.5px solid #ccc",marginRight:"8px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#fff",transition:"all 0.2s"},children:t&&s.jsx("div",{style:{width:"9px",height:"9px",borderRadius:"50%",backgroundColor:"#315ba4"}})}),s.jsx("span",{style:{fontSize:"1.6rem",color:t?"#315ba4":"#666",fontWeight:t?"700":"600",whiteSpace:"nowrap",transition:"all 0.2s"},children:e.name})]})},e.id)})})]});return(0,s.jsxs)(s.Fragment,{children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`
                .mobile_only { display: none !important; }
                .pc_only { display: block !important; }
                @media (max-width: 991px) {
                    .mobile_only { display: block !important; }
                    .pc_only { display: none !important; }
                }
            `}}),(0,s.jsxs)("div",{className:"pc_only product-page-new",style:{paddingTop:"112px"},children:[(0,s.jsxs)("section",{className:"product-banner",style:{height:"40vh",minHeight:"320px",maxHeight:"450px",position:"relative",overflow:"hidden",display:"flex",alignItems:"center"},children:[s.jsx(c.default,{src:"/cases/case_banner_final_副本2.png",fill:!0,style:{objectFit:"cover"},priority:!0,alt:a.cases.bannerTitle}),s.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.3)",zIndex:1}}),s.jsx("div",{className:"container",style:{position:"relative",zIndex:1},children:(0,s.jsxs)("div",{style:{maxWidth:"800px"},children:[s.jsx("h1",{style:{fontSize:"5.2rem",fontWeight:900,color:"#fff",marginBottom:"15px",lineHeight:1.1},children:a.cases.bannerTitle}),s.jsx("p",{style:{fontSize:"2rem",color:"#fff",lineHeight:1.5,opacity:.95},children:a.cases.bannerSubtitle})]})})]}),(0,s.jsxs)("div",{className:"cases-page-client",children:[s.jsx("section",{className:"filter-bar",style:{padding:"65px 0 40px 0",backgroundColor:"#fff",borderBottom:"1px solid #f0f3f7"},children:s.jsx("div",{className:"container",children:(0,s.jsxs)("div",{className:"filters-wrapper",style:{maxWidth:"1240px",margin:"0 auto"},children:[f(a.cases.filters.regionLabel,g,o,T),f(a.cases.filters.solutionsLabel,u,r,n)]})})}),s.jsx("div",{className:"product-lists-wrap",style:{padding:"25px 0 100px 0",backgroundColor:"#fcfdfe",minHeight:"600px"},children:s.jsx("div",{className:"container",children:h.length>0?(0,s.jsxs)(s.Fragment,{children:[s.jsx("div",{className:"solution-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"40px"},children:h.map((e,a)=>{let i=e[`title_${t}`]||e.title_en;return(0,s.jsxs)(l.default,{href:`/${t}/cases/${e.handle}`,className:"catalog-card-item",children:[s.jsx("div",{className:"card-image",style:{borderRadius:"0",overflow:"hidden",position:"relative",height:"240px"},children:s.jsx(c.default,{src:e.main_image||"/images/solutions/placeholder.jpg",alt:i,fill:!0,style:{objectFit:"cover"},sizes:"(max-width: 1200px) 33vw, 400px"})}),s.jsx("div",{className:"card-content",style:{padding:"25px",textAlign:"center"},children:s.jsx("h3",{style:{fontSize:"1.8rem",fontWeight:"700",color:"#333",margin:"0",lineHeight:"1.4"},children:i})})]},a)})}),x>=1&&s.jsx("div",{className:"pagination-wrapper",style:{marginTop:"60px",display:"flex",justifyContent:"center",gap:"10px"},children:Array.from({length:x},(e,t)=>t+1).map(e=>s.jsx("div",{onClick:()=>{_(e),window.scrollTo({top:300,behavior:"smooth"})},style:{width:"45px",height:"45px",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #ddd",fontSize:"1.6rem",fontWeight:600,color:e===m?"#fff":"#444",backgroundColor:e===m?"#315ba4":"transparent",cursor:"pointer",transition:"all 0.2s"},children:e},e))})]}):(0,s.jsxs)("div",{style:{textAlign:"center",padding:"120px 0",background:"#fff",borderRadius:"8px"},children:[s.jsx("div",{style:{fontSize:"5rem",marginBottom:"20px",opacity:.2},children:"\uD83D\uDD0D"}),s.jsx("div",{style:{fontSize:"1.8rem",color:"#999"},children:a.cases.noResults||"No cases found matching your criteria."})]})})})]}),s.jsx("section",{id:"inquiry",style:{padding:"100px 0",background:"#f8f9fa",borderTop:"1px solid #eee"},children:s.jsx("div",{className:"container",style:{maxWidth:"1200px"},children:s.jsx(p.default,{dict:a})})})]}),s.jsx("div",{className:"mobile_only",children:s.jsx(d,{allCases:e,locale:t,dict:a})})]})}},18331:e=>{e.exports={wrapper:"MobileCaseCenter_wrapper__K2ngm",banner:"MobileCaseCenter_banner__8BjYz",bannerOverlay:"MobileCaseCenter_bannerOverlay__DkXfc",bannerContent:"MobileCaseCenter_bannerContent__EDWvm",filterSection:"MobileCaseCenter_filterSection__qaMbo",filterGroup:"MobileCaseCenter_filterGroup__wzee0",filterLabel:"MobileCaseCenter_filterLabel__mlOZw",selectBox:"MobileCaseCenter_selectBox__tLMVF",dropdownActive:"MobileCaseCenter_dropdownActive__7FQCs",dropdownList:"MobileCaseCenter_dropdownList__EtS_0",slideDown:"MobileCaseCenter_slideDown__meKhd",dropdownItem:"MobileCaseCenter_dropdownItem__egM9J",dropdownItemActive:"MobileCaseCenter_dropdownItemActive__203TX",backdrop:"MobileCaseCenter_backdrop__VPd1P",listContainer:"MobileCaseCenter_listContainer__e_tPW",grid:"MobileCaseCenter_grid__06eD_",card:"MobileCaseCenter_card__kU9Tb",imageBox:"MobileCaseCenter_imageBox__IJODw",cardContent:"MobileCaseCenter_cardContent__6Jzmr",pagination:"MobileCaseCenter_pagination__pMWU9",pageBtn:"MobileCaseCenter_pageBtn__Ak1hw",active:"MobileCaseCenter_active__NQEtc",emptyState:"MobileCaseCenter_emptyState__vs8mN",emptyIcon:"MobileCaseCenter_emptyIcon__ifq70"}},83271:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>T});var s=a(25036),i=a(40002),r=a(66961);let n=(0,a(86843).createProxy)(String.raw`/Users/mattchyi/Documents/Project/fc/src/app/[locale]/cases/CasesPageClient.tsx`),{__esModule:o,$$typeof:l}=n,c=n.default;var d=a(97803);async function p({locale:e,dict:t}){let a=await (0,r.wL)();return s.jsx(c,{allCases:a,locale:e,dict:t})}async function T({params:e}){let{locale:t}=e,a=await (0,d.R)(t);return s.jsx("div",{className:"cases-page",style:{backgroundColor:"#fff"},children:s.jsx("main",{children:s.jsx(i.Suspense,{fallback:(0,s.jsxs)("div",{style:{padding:"20px 15px"},children:[s.jsx("div",{style:{height:"120px",backgroundColor:"#f0f0f0",marginBottom:"20px"}}),s.jsx("div",{style:{height:"40px",backgroundColor:"#f0f0f0",marginBottom:"20px",width:"60%"}}),s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px"},children:[1,2,3,4].map(e=>(0,s.jsxs)("div",{style:{backgroundColor:"#fff",border:"1px solid #f0f0f0"},children:[s.jsx("div",{style:{paddingTop:"75%",backgroundColor:"#f5f5f5"}}),s.jsx("div",{style:{padding:"10px"},children:s.jsx("div",{style:{height:"12px",backgroundColor:"#f0f0f0",width:"80%"}})})]},e))})]}),children:s.jsx(p,{locale:t,dict:a})})})})}},66961:(e,t,a)=>{"use strict";a.d(t,{BY:()=>o,oo:()=>n,wL:()=>r});var s=a(29976),i=a(66864);let r=(0,i.unstable_cache)(async()=>s.Z.prepare("SELECT * FROM cases").all().map(e=>{try{return{...JSON.parse(e.raw_json),...e}}catch(t){return e}}),["all-cases"],{revalidate:3600,tags:["cases"]}),n=(0,i.unstable_cache)(async()=>s.Z.prepare("SELECT handle FROM cases").all().map(e=>e.handle).filter(Boolean),["case-handles"],{revalidate:3600,tags:["cases"]}),o=(0,i.unstable_cache)(async e=>{let t=s.Z.prepare("SELECT * FROM cases WHERE handle = ?").get(e);if(!t)return null;try{return{...JSON.parse(t.raw_json),...t}}catch(e){return t}},["case-detail"],{revalidate:3600,tags:["cases"]})},29976:(e,t,a)=>{"use strict";a.d(t,{Z:()=>T});let s=require("better-sqlite3");var i=a.n(s),r=a(71017),n=a.n(r),o=a(57147),l=a.n(o);let c=n().join(process.cwd(),"data");l().existsSync(c)||l().mkdirSync(c,{recursive:!0});let d=process.env.DATABASE_URL?n().resolve(process.cwd(),process.env.DATABASE_URL):n().join(c,"ntet.db"),p=new(i())(d,{verbose:void 0});p.exec(`
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
`);let T=p}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[1638,554,6321,4300,6864,732,7931,1451],()=>a(57670));module.exports=s})();