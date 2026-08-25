import html
import json
import re
import shutil
import sqlite3
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "ntet.db"
EN_DICT = ROOT / "src" / "dictionaries" / "en.json"
AR_DICT = ROOT / "src" / "dictionaries" / "ar.json"
CASE_CORRECTIONS_PATH = ROOT / "data" / "content" / "case-editorial-corrections.json"
CASE_CORRECTIONS = (
    json.loads(CASE_CORRECTIONS_PATH.read_text(encoding="utf-8"))
    if CASE_CORRECTIONS_PATH.exists()
    else {}
)


ACCESSORY_ITEM_LABELS = {
    "fc-u10-pro": "وحدة تحكم بالطيران FC-U10-PRO",
    "fc-u12": "وحدة تحكم بالطيران FC-U12",
    "fc-u9-ag": "وحدة تحكم بالطيران الزراعي FC-U9-AG",
    "fc-max-5330": "محرك UAV FC-MAX 5330",
    "fc-rm10x": "محرك UAV FC-RM10X",
    "fc-rm30": "محرك UAV FC-RM30",
    "fc-u110": "محرك UAV FC-U110",
    "fc-u8013": "محرك UAV FC-U8013",
    "fc-x8030": "محرك UAV FC-X8030",
    "fc-xh14": "محرك UAV FC-XH14",
    "fc-c2d-propeller": "مروحة UAV FC-C2D",
    "fc-c2e-propeller": "مروحة UAV FC-C2E",
    "fc-c2t-propeller": "مروحة UAV FC-C2T",
    "fc-c2u-propeller": "مروحة UAV FC-C2U",
    "fc-c2ud-propeller": "مروحة UAV FC-C2UD",
    "fc-pab-propeller": "مروحة UAV FC-PAB",
    "fc-pad-propeller": "مروحة UAV FC-PAD",
    "fc-pae-propeller": "مروحة UAV FC-PAE",
    "fc-pbf-propeller": "مروحة UAV FC-PBF",
    "fc-w2u-propeller": "مروحة UAV FC-W2U",
    "fc-bt1": "بطارية UAV صلبة FC-BT1",
    "fc-bt2": "بطارية UAV صلبة FC-BT2",
    "fc-bt3": "بطارية UAV صلبة عالية الجهد FC-BT3",
    "fc-bt4": "بطارية UAV صلبة عالية الطاقة FC-BT4",
    "fc-btg": "بطارية UAV تدريبية صلبة FC-BTG",
    "fc-l10tr-three-light-gimbal": "حامل كهروبصري FC-L10TR",
    "fc-l40-smart-optical-pod": "حامل كهروبصري FC-L40",
    "fc-l40t-dual-light-gimbal": "حامل كهروبصري FC-L40T",
    "fc-l40tr-smart-optical-pod": "حامل كهروبصري FC-L40TR",
    "fc-l50-smart-optical-pod": "حامل كهروبصري FC-L50",
    "fc-ln100-dual-light-gimbal": "حامل كهروبصري FC-LN100",
    "fc-ln95-dual-light-gimbal": "حامل كهروبصري FC-LN95",
    "fc-mini-l10tr-smart-optical-pod": "حامل كهروبصري FC-MiniL10TR",
    "fc-fdj-111": "محرك UAV FC-FDJ-111",
    "fc-fdj-120": "محرك UAV FC-FDJ-120",
    "fc-fdj-120hd": "محرك UAV FC-FDJ-120HD",
    "fc-fdj-170": "محرك UAV FC-FDJ-170",
    "fc-fdj-200": "محرك UAV FC-FDJ-200",
    "fc-fdj-222": "محرك UAV FC-FDJ-222",
    "fc-fdj-430": "محرك UAV FC-FDJ-430",
    "fc-fdj-55": "محرك UAV FC-FDJ-55",
    "fc-fdj-60": "محرك UAV FC-FDJ-60",
    "fc-fdj-61": "محرك UAV FC-FDJ-61",
    "fc-fdj-70hd": "محرك UAV FC-FDJ-70HD",
    "fc-fdj-85": "محرك UAV FC-FDJ-85",
    "fc-mesh-100": "رابط بيانات UAV FC-Mesh-100",
    "fc-sjl-100": "رابط بيانات UAV FC-SJL-100",
    "fc-sjl-200": "رابط بيانات UAV FC-SJL-200",
    "fc-sjl-30": "رابط بيانات UAV FC-SJL-30",
    "fc-sjl-380": "رابط بيانات UAV FC-SJL-380",
    "fc-sjl-50": "رابط بيانات UAV FC-SJL-50",
    "fc-yk15-remote-controller": "وحدة تحكم عن بُعد UAV FC-YK15",
    "fc-yk24-remote-controller": "وحدة تحكم عن بُعد UAV FC-YK24",
    "fc-yk32-remote-controller": "وحدة تحكم عن بُعد UAV FC-YK32",
    "fc-ykrc7-remote-controller": "وحدة تحكم عن بُعد UAV FC-YKRC7",
}


COUNTRY_AR = {
    "China": "الصين",
    "UAE": "الإمارات العربية المتحدة",
    "Saudi Arabia": "السعودية",
    "Iran": "إيران",
    "Turkey": "تركيا",
    "Qatar": "قطر",
    "Oman": "عُمان",
    "Kuwait": "الكويت",
    "Iraq": "العراق",
    "India": "الهند",
    "Japan": "اليابان",
    "South Korea": "كوريا الجنوبية",
    "Singapore": "سنغافورة",
    "Malaysia": "ماليزيا",
    "Uzbekistan": "أوزبكستان",
    "Russia / Kazakhstan": "روسيا / كازاخستان",
    "Belarus": "بيلاروس",
    "United Kingdom": "المملكة المتحدة",
    "Germany": "ألمانيا",
    "France": "فرنسا",
    "Italy": "إيطاليا",
    "Spain": "إسبانيا",
    "Brazil": "البرازيل",
    "Argentina": "الأرجنتين",
    "Colombia": "كولومبيا",
    "Chile": "تشيلي",
    "Peru": "بيرو",
    "Ecuador": "الإكوادور",
    "Venezuela": "فنزويلا",
    "Egypt": "مصر",
    "Algeria": "الجزائر",
    "Morocco": "المغرب",
    "Nigeria": "نيجيريا",
    "South Africa": "جنوب أفريقيا",
    "Kenya": "كينيا",
    "Ethiopia": "إثيوبيا",
    "USA / Canada": "الولايات المتحدة / كندا",
    "Mexico": "المكسيك",
    "Australia": "أستراليا",
    "New Zealand": "نيوزيلندا",
    "Asia": "آسيا",
    "Africa": "أفريقيا",
    "North America": "أمريكا الشمالية",
    "South America": "أمريكا الجنوبية",
    "Europe": "أوروبا",
    "Oceania": "أوقيانوسيا",
    "Asia & Middle East": "آسيا والشرق الأوسط",
    "Europe & CIS": "أوروبا ورابطة الدول المستقلة",
    "North America & Oceania": "أمريكا الشمالية وأوقيانوسيا",
    "Other (Please add in message)": "أخرى (يرجى التوضيح في الرسالة)",
}

EXACT = {
    "Home": "الرئيسية",
    "Products": "المنتجات",
    "Product": "المنتج",
    "Drone Accessories": "ملحقات الطائرات بدون طيار",
    "Access Control Turnstiles": "بوابات التحكم في الدخول",
    "Solutions": "الحلول",
    "Cases": "الحالات",
    "Media": "المركز الإعلامي",
    "About": "من نحن",
    "About us": "من نحن",
    "Contact": "اتصل بنا",
    "Contact us": "اتصل بنا",
    "Select Language": "اختر اللغة",
    "Industrial UAV Systems<br/>for Low-Altitude Operations": "أنظمة UAV صناعية<br/>لعمليات المجال منخفض الارتفاع",
    "Industrial UAV platforms, airspace situational awareness, event records, and compliant response procedures for infrastructure, utilities, and public operations.": "منصات UAV صناعية، ووعي ميداني بالمجال الجوي، وسجلات أحداث، وسير عمل متوافق للاستجابة في البنية التحتية والمرافق والعمليات العامة.",
    "Explore Solutions": "استكشف الحلول",
    "Our Solutions": "حلولنا",
    "Product Center": "مركز المنتجات",
    "Case Center": "مركز الحالات",
    "About Us": "من نحن",
    "Latest News": "آخر الأخبار",
    "ALL PRODUCTS": "كل المنتجات",
    "View All Cases": "عرض كل الحالات",
    "LEARN MORE": "اعرف المزيد",
    "View All News": "عرض كل الأخبار",
    "Deployment Evidence": "أمثلة تطبيق ميداني",
    "Technology & Equipment Center": "مركز التقنية والمعدات",
    "Browse industrial UAV platforms, airspace monitoring equipment, inspection systems, and screening tools for site operations.": "تصفح منصات UAV الصناعية، ومعدات مراقبة المجال الجوي، وأنظمة التفتيش، وأدوات الفحص الميداني لعمليات المواقع.",
    "Get Price": "اطلب السعر",
    "Get quotation": "اطلب عرض سعر",
    "Get a Quote": "اطلب عرض سعر",
    "View Specifications": "عرض المواصفات",
    "Overview": "نظرة عامة",
    "Technical Specifications": "المواصفات الفنية",
    "Get Solution & Quotation": "اطلب الحل وعرض السعر",
    "Parameter": "المعيار",
    "Description": "الوصف",
    "Features": "الميزات",
    "Core Advantages": "المزايا الرئيسية",
    "Related Equipment": "معدات ذات صلة",
    "UAV & Drone Systems": "أنظمة UAV والطائرات بدون طيار",
    "Low-Altitude Airspace Monitoring": "مراقبة المجال الجوي منخفض الارتفاع",
    "Security Screening": "الفحص الأمني",
    "Security Screening & Policing": "الفحص الأمني وإدارة الدخول",
    "Engineering Materials": "مواد هندسية",
    "Field Hospitals": "مستشفيات ميدانية",
    "Field & Mobile Hospitals": "مستشفيات ميدانية ومتنقلة",
    "Perimeter Intelligence": "ذكاء المحيط",
    "Perimeter Surveillance": "مراقبة المحيط",
    "Drone Accessories & UAV Components": "ملحقات ومكونات UAV",
    "Browse gimbals, propulsion modules, data links, batteries, controllers, and flight-control components for industrial UAV platforms.": "تصفح الحوامل الكهروبصرية، ووحدات الدفع، وروابط البيانات، والبطاريات، ووحدات التحكم، ومكونات التحكم بالطيران لمنصات UAV الصناعية.",
    "Electro-Optical Gimbals": "حوامل كهروبصرية",
    "UAV Engines": "محركات UAV",
    "UAV Data Links": "روابط بيانات UAV",
    "UAV Propellers": "مراوح UAV",
    "UAV Motors": "محركات UAV",
    "UAV Batteries": "بطاريات UAV",
    "UAV Remote Controllers": "وحدات تحكم UAV عن بُعد",
    "Flight Controllers": "وحدات التحكم بالطيران",
    "Industrial UAV Solutions": "حلول UAV صناعية",
    "UAV solutions for inspection, patrol, emergency support, and low-altitude airspace monitoring.": "حلول UAV للتفتيش والدوريات والدعم الطارئ ومراقبة المجال الجوي منخفض الارتفاع.",
    "Industry Needs": "احتياجات القطاع",
    "Application Scenes": "سيناريوهات التطبيق",
    "Recommended Products": "منتجات موصى بها",
    "View Product": "عرض المنتج",
    "EXPLORE ALL": "استكشف الكل",
    "VIEW DETAILS": "عرض التفاصيل",
    "Border Patrol": "دوريات الحدود",
    "Border Patrol & Security": "دوريات الحدود والأمن",
    "Border Patrol & Coastal Monitoring": "دوريات الحدود والمراقبة الساحلية",
    "Infrastructure Protection": "حماية البنية التحتية",
    "Critical Infrastructure Protection": "حماية البنية التحتية الحرجة",
    "Key Area Security": "أمن المناطق الحيوية",
    "Emergency & Disaster Rescue": "الطوارئ والإنقاذ من الكوارث",
    "UAV Deployment Cases": "حالات نشر UAV",
    "Deployment references for UAV inspection, patrol, emergency support, and low-altitude airspace monitoring.": "مراجع تطبيق ميداني لتفتيش UAV والدوريات والدعم الطارئ ومراقبة المجال الجوي منخفض الارتفاع.",
    "Region:": "المنطقة:",
    "Solutions:": "الحلول:",
    "All": "الكل",
    "No cases found matching your criteria.": "لا توجد حالات تطابق معاييرك.",
    "Equipment Used": "المعدات المستخدمة",
    "Project Overview": "نظرة عامة على المشروع",
    "Application": "التطبيق",
    "Location": "الموقع",
    "Mission Scale": "نطاق المهمة",
    "Key Capability": "القدرة الرئيسية",
    "Result": "النتيجة",
    "All Solutions": "كل الحلول",
    "All Regions": "كل المناطق",
    "Insights & Updates": "رؤى وتحديثات",
    "Company updates, technical notes, and industry perspectives on UAV operations and airspace monitoring.": "تحديثات الشركة، وملاحظات فنية، ورؤى قطاعية حول عمليات UAV ومراقبة المجال الجوي.",
    "Latest": "الأحدث",
    "Corporate News": "أخبار الشركة",
    "Product & Tech": "المنتجات والتقنية",
    "Industry Insights": "رؤى القطاع",
    "updates found": "تحديثات متاحة",
    "Company Profile": "نبذة عن الشركة",
    "Engineering UAV, airspace monitoring, and intelligent inspection systems for infrastructure operators.": "أنظمة UAV هندسية، ومراقبة المجال الجوي، والتفتيش الذكي لمشغلي البنية التحتية.",
    "R&D Team": "فريق البحث والتطوير",
    "R&D Team Ratio": "نسبة فريق البحث والتطوير",
    "R&D System": "نظام البحث والتطوير",
    "Core Capabilities": "القدرات الرئيسية",
    "UAV Reliability Design": "تصميم موثوقية UAV",
    "Intelligent Algorithms": "خوارزميات ذكية",
    "AI Recognition Technology": "تقنية التعرف بالذكاء الاصطناعي",
    "Contact Us": "اتصل بنا",
    "Talk with our team about UAV platforms, airspace monitoring equipment, inspection operations, and project-specific deployment needs.": "تحدث مع فريقنا حول منصات UAV ومعدات مراقبة المجال الجوي وسير عمل التفتيش واحتياجات النشر الخاصة بالمشروع.",
    "Direct Contact": "تواصل مباشر",
    "Consultation": "استشارة",
    "Email": "البريد الإلكتروني",
    "Sales Hotline": "خط المبيعات",
    "Company Address": "عنوان الشركة",
    "Quick Links": "روابط سريعة",
    "Contact Info": "معلومات الاتصال",
    "Industrial UAV Systems & Airspace Monitoring": "أنظمة UAV صناعية ومراقبة المجال الجوي",
    "(c) 2026 Beijing Non-traditional Equipment Technology Co., Ltd. All rights reserved.": "(c) 2026 Beijing Non-traditional Equipment Technology Co., Ltd. جميع الحقوق محفوظة.",
    "Name": "الاسم",
    "Company Name": "اسم الشركة",
    "E-mail": "البريد الإلكتروني",
    "Contact Method": "طريقة التواصل",
    "Country Code": "رمز الدولة",
    "Phone Number": "رقم الهاتف",
    "Inquiry Type:": "نوع الاستفسار:",
    "Project Details / Message": "تفاصيل المشروع / الرسالة",
    "SUBMIT INQUIRY": "إرسال الاستفسار",
    "SUBMITTING...": "جارٍ الإرسال...",
    "SUBMITTED SUCCESSFULLY!": "تم الإرسال بنجاح!",
    "Send Another Message": "إرسال رسالة أخرى",
    "Failed to submit. Please try again.": "تعذر الإرسال. يرجى المحاولة مرة أخرى.",
    "Product Pricing & Quotation": "تسعير المنتج وعرض السعر",
    "Request a Custom Solution": "طلب حل مخصص",
    "Product Brochures & Tech Specs": "كتيبات المنتجات والمواصفات الفنية",
    "Partnership / Distributor Application": "طلب شراكة أو توزيع",
    "Technical & After-Sales Support": "الدعم الفني وخدمة ما بعد البيع",
    "Select Code...": "اختر الرمز...",
    "Phone": "الهاتف",
    "WeChat": "WeChat",
    "WhatsApp": "WhatsApp",
    "Learn More": "اعرف المزيد",
    "Back to Top": "العودة إلى الأعلى",
    "HOME": "الرئيسية",
    "PRODUCT": "المنتجات",
    "ACCESSORIES": "الملحقات",
    "SOLUTIONS": "الحلول",
    "CASES": "الحالات",
}

PHRASE_AR = {
    "Emergency Communication Tethered UAV": "منصة UAV مربوطة للاتصالات الطارئة",
    "High-Rise Firefighting Tethered UAV": "منصة UAV مربوطة لدعم إطفاء المباني العالية",
    "Tethered Lighting UAV": "منصة UAV مربوطة للإضاءة الطارئة",
    "Emergency Response Drone": "طائرة بدون طيار للاستجابة الطارئة",
    "Water Conservancy Monitoring UAV": "طائرة UAV لمراقبة المياه والأنهار",
    "Power Grid Inspection Drone": "طائرة UAV لتفتيش شبكة الكهرباء",
    "Oil & Gas Pipeline Inspection Drone": "طائرة UAV لتفتيش خطوط النفط والغاز",
    "Stationary RF Detection System": "نظام ثابت لكشف ترددات RF",
    "Hand-carried RF Detection System": "نظام محمول لكشف إشارات الترددات الراديوية (RF)",
    "Handheld RF Detection System": "جهاز يدوي لكشف ترددات RF",
    "Portable RF Detection Case": "حقيبة محمولة لكشف ترددات RF",
    "Electro-Optical (EO) Tracking System": "نظام تتبع كهروبصري EO",
    "UAV Remote ID Monitoring System": "نظام التعريف عن بُعد للطائرات بدون طيار",
    "Airport Security Protection": "حل أمني متكامل للمطارات",
    "Airport Airspace Monitoring Application": "تطبيق مراقبة المجال الجوي للمطارات",
    "Judicial Sector Security Protection": "حل أمني للمنشآت القضائية",
    "Large Sports Event Security Protection": "حل أمني للفعاليات الرياضية الكبرى",
    "Chemical Plant Protection": "حل مراقبة للمنشآت الكيميائية",
    "Hydroelectric Dam Protection": "حل مراقبة للسدود الكهرومائية",
    "Oil Production Base Protection": "حل مراقبة لقواعد إنتاج النفط",
    "Power Generation Facility Airspace Monitoring": "مراقبة المجال الجوي لمنشآت توليد الطاقة",
    "Land-based Maritime Surveillance & Early Warning": "مراقبة بحرية أرضية وإنذار مبكر",
    "UAV Maritime Emergency Rescue": "إنقاذ بحري طارئ باستخدام UAV",
    "Border Patrol & Coastal Monitoring": "دوريات الحدود والمراقبة الساحلية",
    "Smart Substation Autonomous Inspection": "تفتيش ذاتي للمحطات الفرعية الذكية",
    "Power Tower Inspection UAV": "طائرة UAV لتفتيش أبراج الطاقة",
    "Emergency Search & Rescue UAV": "طائرة UAV للبحث والإنقاذ الطارئ",
    "Emergency Communication UAV": "طائرة UAV للاتصالات الطارئة",
    "Emergency Lighting UAV": "طائرة UAV للإضاءة الطارئة",
    "High-Rise Firefighting UAV": "طائرة UAV لدعم إطفاء المباني العالية",
    "Aerial Firefighting": "دعم إطفاء جوي",
    "Power Line UAV Intelligent Inspection": "تفتيش ذكي لخطوط الطاقة باستخدام UAV",
    "Smart Substation Unattended Inspection": "تفتيش غير مأهول للمحطات الفرعية الذكية",
    "Water Conservancy & River-Lake Monitoring": "مراقبة المياه والأنهار والبحيرات",
    "Urban High-Rise Firefighting & Rescue": "إطفاء وإنقاذ المباني العالية في المدن",
    "Disaster-Site Search, Rescue & Reconnaissance": "البحث والإنقاذ والاستطلاع في مواقع الكوارث",
    "Post-Disaster Emergency Communication Support": "دعم الاتصالات الطارئة بعد الكوارث",
    "Night Emergency Lighting Support": "دعم الإضاءة الليلية الطارئة",
    "Asian Games Low-Altitude Security Application": "تطبيق أمني منخفض الارتفاع في دورة الألعاب الآسيوية",
    "Airspace Monitoring Case of a Group Factory in Nigeria": "حالة مراقبة المجال الجوي لمصنع صناعي في نيجيريا",
    "Airspace Monitoring Case of a Power Plant in Pakistan": "حالة مراقبة المجال الجوي لمحطة طاقة في باكستان",
    "Airspace Monitoring Case of a Refinery in Brazil": "حالة مراقبة المجال الجوي لمصفاة في البرازيل",
    "Airport Low-Altitude Security Application": "تطبيق أمني منخفض الارتفاع في مطار",
    "Water Conservancy Facility Low-Altitude Security": "أمن منخفض الارتفاع لمنشأة مائية",
    "Anhui Flood-Season Emergency UAV Patrol": "دوريات UAV طارئة خلال موسم الفيضانات في آنهوي",
    "Ice and Snow Disaster Emergency UAV Inspection": "تفتيش UAV طارئ أثناء كوارث الجليد والثلوج",
    "LiDAR Tree-Obstruction UAV Inspection": "تفتيش UAV بتقنية لايدار لعوائق الأشجار",
    "Southern Grid Wildfire Prevention UAV Inspection": "تفتيش UAV للوقاية من حرائق الغابات في شبكة الكهرباء الجنوبية",
    "Wildfire Emergency Transmission-Line UAV Patrol": "دوريات UAV طارئة لخطوط النقل أثناء حرائق الغابات",
    "Zhaoqing Long-Distance Power-Line UAV Inspection": "تفتيش UAV بعيد المدى لخطوط الطاقة في تشاوتشينغ",
    "Dual-Redundant Flight Control: How Industrial UAVs Achieve Mission-Grade Reliability": "التحكم المزدوج الاحتياطي في الطيران: كيف تحقق UAV الصناعية موثوقية تشغيلية عالية",
    "China's Low-Altitude Economy: 2026 Outlook on a Two-Trillion-RMB Trajectory": "اقتصاد المجال منخفض الارتفاع في الصين: توقعات 2026 لمسار نمو كبير",
    "Why Modern Airspace Monitoring Systems Need Three Sensor Layers, Not One": "لماذا تحتاج أنظمة مراقبة المجال الجوي الحديثة إلى ثلاث طبقات استشعار",
    "From Refineries to Substations: How Critical Infrastructure Is Adopting Airspace Monitoring in 2026": "من المصافي إلى المحطات الفرعية: اعتماد البنية التحتية الحرجة على مراقبة المجال الجوي في 2026",
    "Tethered UAVs: Continuous Aerial Monitoring for Events and Remote Sites": "UAV المربوطة: مراقبة جوية مستمرة للفعاليات والمواقع البعيدة",
    "UAV and EO/IR Networks Improve Remote Patrol Visibility": "شبكات UAV وEO/IR تعزز وضوح الدوريات عن بُعد",
}

PRODUCT_AR_OVERRIDES = {
    "portable-rf-detection-case": {
        "product_name_ar": "نظام محمول لكشف إشارات الترددات الراديوية (RF)",
        "summary_ar": (
            "يوفر النظام المحمول لكشف إشارات الترددات الراديوية تغطية كاملة للنطاق من 300 ميجاهرتز "
            "إلى 6000 ميجاهرتز. ويتيح كشف الطائرات المسيّرة ضمن نطاقه وتحديد هويتها وموقعها وتتبعها، "
            "مع إصدار تنبيهات صوتية ومرئية. يدخل الجهاز وضع التشغيل تلقائياً بعد تشغيله، ويتميز بسهولة "
            "الحمل وسرعة الانتشار الميداني."
        ),
        "key_application_ar": (
            "التطبيق: كشف سلبي دون بث إشارات كهرومغناطيسية؛ تعرّف متعدد الأنماط عبر تحليل الطيف "
            "وفك ترميز البروتوكولات؛ مناسب للفرق المتنقلة والاستجابة السريعة."
        ),
        "key_parameter_1_ar": "نصف قطر الكشف: 5 كم",
        "key_parameter_2_ar": "نطاق تردد التشغيل: 300–6000 ميجاهرتز",
        "parameters_ar": {
            "نطاق التردد": "300–6000 ميجاهرتز",
            "وضع الكشف": "كشف سلبي، تحليل الطيف، فك ترميز البروتوكولات",
            "زاوية الكشف": "360° أفقياً",
            "نصف قطر الكشف": "5 كم",
            "دقة تحديد الاتجاه": "≤3° (RMS)",
            "زمن التعرّف": "≤3 ثوانٍ",
            "مقاس الشاشة": "13.3 بوصة",
            "مصدر الطاقة": "بطارية/محوّل طاقة",
            "درجة الحماية": "IP65",
            "القدرة القصوى": "80 واط",
            "مدة تشغيل البطارية": "5 ساعات",
            "الوزن": "16 كجم",
            "درجة حرارة التشغيل": "من ‎-20°م إلى ‎+55°م",
        },
        "detail_html_ar": (
            "<h4>الميزات والمزايا</h4><ul>"
            "<li><strong>تشغيل سلبي:</strong> يستقبل النظام الإشارات فقط ولا يبث إشارات كهرومغناطيسية.</li>"
            "<li><strong>تحليل تفصيلي:</strong> يتيح التعرّف على الرقم التسلسلي والطراز والسرعة والارتفاع "
            "والموقع ومسار الطائرة المسيّرة، إضافة إلى موقع وحدة التحكم.</li>"
            "<li><strong>إدارة قوائم السماح والحظر:</strong> يمكن تمييز الطائرات المصرّح بها لتقليل الإنذارات غير الضرورية.</li>"
            "<li><strong>تتبع عدة أهداف:</strong> يعرض مسارات عدة طائرات مسيّرة في الوقت نفسه بألوان مختلفة.</li>"
            "<li><strong>تكامل شبكي:</strong> يدعم إرسال بيانات الكشف إلى منصة قيادة خلفية.</li>"
            "<li><strong>سهولة الحمل:</strong> يتيح تصميم الحقيبة حمل النظام بواسطة شخص واحد ونشره سريعاً في الموقع.</li>"
            "</ul>"
        ),
    },
}

WORD_AR = {
    "industrial": "صناعية",
    "system": "نظام",
    "systems": "أنظمة",
    "solution": "حل",
    "solutions": "حلول",
    "monitoring": "مراقبة",
    "inspection": "تفتيش",
    "patrol": "دوريات",
    "emergency": "طوارئ",
    "communication": "اتصالات",
    "lighting": "إضاءة",
    "rescue": "إنقاذ",
    "search": "بحث",
    "reconnaissance": "استطلاع",
    "firefighting": "إطفاء",
    "tethered": "مربوط",
    "drone": "طائرة بدون طيار",
    "drones": "طائرات بدون طيار",
    "fixed": "ثابت",
    "stationary": "ثابت",
    "portable": "محمول",
    "handheld": "يدوي",
    "payload": "حمولة",
    "airspace": "المجال الجوي",
    "low": "منخفض",
    "altitude": "الارتفاع",
    "detection": "كشف",
    "tracking": "تتبع",
    "security": "أمن",
    "screening": "فحص",
    "perimeter": "المحيط",
    "surveillance": "مراقبة",
    "infrastructure": "البنية التحتية",
    "critical": "حرجة",
    "border": "الحدود",
    "coastal": "السواحل",
    "maritime": "بحري",
    "power": "الطاقة",
    "line": "خط",
    "grid": "الشبكة",
    "substation": "محطة فرعية",
    "water": "المياه",
    "conservancy": "إدارة المياه",
    "river": "نهر",
    "lake": "بحيرة",
    "chemical": "كيميائي",
    "plant": "منشأة",
    "oil": "نفط",
    "gas": "غاز",
    "pipeline": "خط أنابيب",
    "airport": "مطار",
    "judicial": "قضائي",
    "sports": "رياضية",
    "event": "فعالية",
    "accessories": "ملحقات",
    "components": "مكونات",
    "controller": "وحدة تحكم",
    "controllers": "وحدات تحكم",
    "battery": "بطارية",
    "batteries": "بطاريات",
    "propeller": "مروحة",
    "propellers": "مراوح",
    "motor": "محرك",
    "motors": "محركات",
    "engine": "محرك",
    "engines": "محركات",
    "gimbal": "حامل كهروبصري",
    "gimbals": "حوامل كهروبصرية",
    "data": "بيانات",
    "link": "رابط",
    "remote": "عن بُعد",
    "flight": "طيران",
    "smart": "ذكي",
    "intelligent": "ذكي",
    "radar": "رادار",
    "camera": "كاميرا",
    "cameras": "كاميرات",
    "thermal": "حراري",
    "laser": "ليزر",
    "metal": "معادن",
    "detectors": "كواشف",
    "detector": "كاشف",
    "baggage": "أمتعة",
    "parcel": "طرود",
    "scanner": "ماسح",
    "scanners": "ماسحات",
    "bridge": "جسر",
    "bridges": "جسور",
    "hospital": "مستشفى",
    "hospitals": "مستشفيات",
    "mobile": "متنقل",
    "cabin": "كابينة",
    "sentinels": "نقاط مراقبة",
    "support": "دعم",
    "application": "تطبيق",
    "applications": "تطبيقات",
    "protection": "حماية",
    "range": "مدى",
    "radius": "نصف قطر",
    "mode": "وضع",
    "modes": "أوضاع",
    "target": "هدف",
    "targets": "أهداف",
    "weight": "الوزن",
    "material": "المادة",
    "construction": "البنية",
    "display": "الشاشة",
    "sensitivity": "الحساسية",
    "penetration": "الاختراق",
    "technology": "التقنية",
    "response": "الاستجابة",
    "time": "الوقت",
    "speed": "السرعة",
    "rotation": "الدوران",
    "coverage": "التغطية",
    "sensor": "المستشعر",
    "detector": "الكاشف",
    "vessel": "وعاء",
    "alarm": "إنذار",
    "dose": "جرعة",
    "radiation": "إشعاع",
    "explosion": "انفجار",
    "containment": "احتواء",
    "blanket": "غطاء",
    "liquid": "سوائل",
    "narcotics": "مواد مخدرة",
    "explosives": "متفجرات",
}

STOPWORDS = {"of", "the", "and", "for", "with", "to", "in", "by", "from", "on", "not", "one", "into"}
ALLOW_LATIN = {"N-TET", "UAV", "RF", "EO", "IR", "EO/IR", "AI", "AOA", "ID", "Remote ID", "LiDAR", "GPS", "LTE", "GHz", "MHz", "kg", "MTOW", "IP", "HD", "PTZ", "X-Ray", "WeChat", "WhatsApp"}


def clean_text(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def strip_html(value):
    return re.sub(r"<[^>]+>", " ", str(value or ""))


def rget(row, key, default=""):
    return row[key] if key in row.keys() else default


def is_preserved_token(token):
    cleaned = token.strip(".,:;()[]{}")
    if cleaned in ALLOW_LATIN:
        return True
    if re.fullmatch(r"[A-Z0-9][A-Z0-9/+\-.]*", cleaned):
        return True
    if re.search(r"\d", cleaned):
        return True
    return False


def normalize_title_source(value):
    text = clean_text(value)
    text = text.replace("&", " & ")
    text = re.sub(r"[-_/]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_accessory_model(value):
    text = clean_text(value)
    match = re.match(r"^(FC-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)(?:\s+(\d{3,5}))?", text)
    if not match:
        return ""
    model = match.group(1)
    if match.group(2) and model.upper() in {"FC-MAX"}:
        model = f"{model} {match.group(2)}"
    return model


def accessory_title_ar(value, handle=""):
    if handle in ACCESSORY_ITEM_LABELS:
        return ACCESSORY_ITEM_LABELS[handle]

    text = clean_text(value)
    if not text:
        return ""
    lowered = text.lower()
    model = extract_accessory_model(text)
    if not model:
        return ""

    if "solid-state battery" in lowered:
        if "high-voltage" in lowered:
            return f"بطارية UAV صلبة عالية الجهد {model}"
        if "high-energy" in lowered:
            return f"بطارية UAV صلبة عالية الطاقة {model}"
        if "training" in lowered:
            return f"بطارية UAV تدريبية صلبة {model}"
        return f"بطارية UAV صلبة {model}"
    if "battery" in lowered:
        return f"بطارية UAV {model}"
    if "propeller" in lowered:
        return f"مروحة UAV {model}"
    if "data link" in lowered:
        return f"رابط بيانات UAV {model}"
    if "remote controller" in lowered:
        return f"وحدة تحكم عن بُعد UAV {model}"
    if "agricultural flight controller" in lowered:
        return f"وحدة تحكم بالطيران الزراعي {model}"
    if "flight controller" in lowered:
        return f"وحدة تحكم بالطيران {model}"
    if "electro-optical" in lowered and "gimbal" in lowered:
        return f"حامل كهروبصري {model}"
    if "uav engine" in lowered or "uav motor" in lowered:
        return f"محرك UAV {model}"
    return ""


def title_ar(value):
    text = clean_text(value)
    if not text:
        return ""
    if text in EXACT:
        return EXACT[text]
    if text in COUNTRY_AR:
        return COUNTRY_AR[text]
    if text in PHRASE_AR:
        return PHRASE_AR[text]

    lowered = text.lower()
    accessory_title = accessory_title_ar(text)
    if accessory_title:
        return accessory_title

    if "rf" in lowered and "detection" in lowered:
        prefix = "نظام"
        if "handheld" in lowered:
            prefix = "جهاز يدوي"
        elif "portable" in lowered or "hand-carried" in lowered:
            prefix = "نظام محمول"
        elif "stationary" in lowered or "fixed" in lowered:
            prefix = "نظام ثابت"
        return f"{prefix} لكشف ترددات RF"
    if "electro-optical" in lowered or "eo tracking" in lowered:
        return "نظام تتبع كهروبصري EO"
    if "remote id" in lowered:
        return "نظام التعريف عن بُعد للطائرات بدون طيار"
    if "x-ray" in lowered or "baggage" in lowered or "parcel" in lowered:
        return "ماسح أمني بالأشعة X للأمتعة والطرود"
    if "explosion containment" in lowered:
        model = " ".join(re.findall(r"\b[A-Z0-9][A-Z0-9.\-]*\b", text))
        return clean_text(f"وعاء احتواء الانفجار {model}")
    if "explosion protection blanket" in lowered:
        model = " ".join(re.findall(r"\b[A-Z0-9][A-Z0-9.\-]*\b", text))
        return clean_text(f"غطاء حماية من الانفجار {model}")
    if "radiation dose alarm" in lowered:
        model = " ".join(re.findall(r"\b[A-Z0-9][A-Z0-9.\-]*\b", text))
        return clean_text(f"منبه جرعة إشعاع شخصية {model}")
    if "dose rate meter" in lowered:
        model = " ".join(re.findall(r"\b[A-Z0-9][A-Z0-9.\-]*\b", text))
        return clean_text(f"مقياس معدل الجرعة الإشعاعية {model}")
    if "optical turntable" in lowered or "ptz turret" in lowered:
        model = " ".join(re.findall(r"\b[A-Z0-9][A-Z0-9/\-.]*\b", text))
        return clean_text(f"برج PTZ كهروبصري متعدد الأطياف {model}")
    if "metal detector" in lowered:
        return "كاشف معادن أمني"
    if "phone detection" in lowered:
        return "بوابة ذكية لكشف الهواتف"
    if "bailey" in lowered or "steel bridge" in lowered:
        return "جسر بيلي فولاذي مسبق التجهيز"
    if "field hospital" in lowered or "medical" in lowered:
        return "نظام مستشفى ميداني متنقل"
    if "radar" in lowered and "vision" in lowered:
        return "نظام دمج الرادار والرؤية"
    if "uav" in lowered or "drone" in lowered:
        if "communication" in lowered:
            return "منصة UAV للاتصالات الطارئة"
        if "lighting" in lowered:
            return "منصة UAV للإضاءة الطارئة"
        if "firefighting" in lowered:
            return "منصة UAV لدعم الإطفاء والإنقاذ"
        if "inspection" in lowered:
            return "طائرة UAV للتفتيش الميداني"
        if "patrol" in lowered:
            return "طائرة UAV للدوريات والمراقبة"
        if "water" in lowered:
            return "طائرة UAV لمراقبة المياه"
        return "منصة UAV صناعية"

    words = []
    for token in re.split(r"(\s+|/)", normalize_title_source(text)):
        stripped = token.strip()
        if not stripped or stripped == "/":
            continue
        key = stripped.lower().strip(".,:;()[]{}")
        if key in STOPWORDS:
            continue
        if key in WORD_AR:
            words.append(WORD_AR[key])
        elif is_preserved_token(stripped):
            words.append(stripped.strip(".,:;()[]{}"))
    if words:
        return " ".join(words)
    return value.strip()


def classify_themes(value):
    text = f" {clean_text(strip_html(value)).lower()} "
    tests = [
        (("inspection", "inspect", "maintenance", "defect", "tower", "pipeline", "line"), "التفتيش الميداني والصيانة"),
        (("monitor", "airspace", "detection", "tracking", "radar", "rf", "remote id"), "مراقبة المجال الجوي وتوثيق الأحداث"),
        (("emergency", "rescue", "fire", "disaster", "lighting", "communication"), "الدعم الطارئ واستمرارية العمليات"),
        (("patrol", "border", "coastal", "maritime", "perimeter"), "الدوريات والمراقبة واسعة النطاق"),
        (("security", "screening", "airport", "judicial", "event", "baggage"), "الفحص الأمني وإدارة المواقع الحيوية"),
        (("water", "river", "lake", "dam", "flood"), "مراقبة المياه والمنشآت المائية"),
        (("power", "substation", "grid", "transmission"), "تشغيل مرافق الطاقة والبنية التحتية"),
        (("oil", "gas", "refinery", "chemical", "plant"), "مراقبة المنشآت الصناعية الحساسة"),
        (("accessor", "battery", "motor", "propeller", "controller", "gimbal", "data link"), "تكامل مكونات UAV ودعم المنصات"),
    ]
    themes = []
    for needles, label in tests:
        if any(needle in text for needle in needles) and label not in themes:
            themes.append(label)
    return themes[:3] or ["عمليات المواقع الصناعية", "المراقبة الميدانية", "توثيق الأحداث"]


def sentence_ar(value, subject=""):
    source = clean_text(strip_html(value))
    name = title_ar(subject) if subject else "هذا الحل"
    themes = classify_themes(f"{subject} {source}")
    if not source:
        return f"يدعم {name} {themes[0]} ضمن سير عمل ميداني واضح وقابل للتتبع."
    return (
        f"يُستخدم {name} في {themes[0]}، مع دعم {themes[1] if len(themes) > 1 else 'التحقق الميداني'} "
        f"وتنسيق فرق التشغيل حسب متطلبات الموقع. يساعد الحل على جمع المعلومات، وتوثيق الأحداث، "
        f"وتحويل بيانات المراقبة إلى إجراءات قابلة للمراجعة دون كشف تفاصيل تشغيلية حساسة."
    )


def key_application_ar(value, subject=""):
    source = clean_text(value)
    themes = classify_themes(f"{subject} {source}")
    return "تشمل التطبيقات: " + "؛ ".join(themes) + "."


def key_parameter_ar(value):
    text = clean_text(value)
    if not text:
        return ""
    if ":" in text:
        key, val = text.split(":", 1)
        label = title_ar(key)
        if not re.search(r"[\u0600-\u06ff]", label):
            label = key.strip()
        return f"{label}: {spec_text_ar(val.strip())}"
    if re.search(r"\d", text):
        translated = spec_text_ar(text)
        if not re.search(r"[\u0600-\u06ff]", translated):
            return translated
        return translated
    return title_ar(text)


SPEC_REPLACEMENTS = [
    (r"\bmax payload\b", "الحمولة القصوى"),
    (r"\bpayload\b", "الحمولة"),
    (r"\bflight time\b", "زمن الطيران"),
    (r"\bMTOW\b", "الوزن الأقصى للإقلاع"),
    (r"\bmaximum takeoff weight\b", "الوزن الأقصى للإقلاع"),
    (r"\btethered mode\b", "وضع الربط"),
    (r"\bwind resistance\b", "مقاومة الرياح"),
    (r"\binput\b", "الدخل"),
    (r"\boutput\b", "الخرج"),
    (r"\bcable length\b", "طول الكابل"),
    (r"\bbuilt-in\b", "مدمج"),
    (r"\btouch display\b", "شاشة لمس"),
    (r"\bremote-control channels\b", "قنوات تحكم عن بعد"),
    (r"\bdetection radius\b", "نصف قطر الكشف"),
    (r"\bdetection range\b", "مدى الكشف"),
    (r"\bfrequency range\b", "نطاق التردد"),
    (r"\boperation modes?\b", "أوضاع التشغيل"),
    (r"\bmonitoring radius\b", "نصف قطر المراقبة"),
    (r"\brefresh rate\b", "معدل التحديث"),
    (r"\btarget speed\b", "سرعة الهدف"),
    (r"\bbased on environment and target model\b", "حسب البيئة ونموذج الهدف"),
    (r"\bblind zone\b", "المنطقة العمياء"),
    (r"\bvisible tracking\b", "تتبع مرئي"),
    (r"\bthermal tracking\b", "تتبع حراري"),
    (r"\bidentification\b", "تعرف"),
    (r"\bvisible\b", "مرئي"),
    (r"\bthermal\b", "حراري"),
    (r"\btracking\b", "تتبع"),
    (r"\bsteel plate\b", "صفيحة فولاذية"),
    (r"\bstainless steel\b", "فولاذ مقاوم للصدأ"),
    (r"\bapprox\\.?\b", "حوالي"),
    (r"\bexcluding\b", "باستثناء"),
    (r"\bcontinuous\b", "مستمر"),
    (r"\bhours?\b", "ساعة"),
    (r"\bminutes?\b", "دقيقة"),
    (r"\bseconds?\b", "ثانية"),
    (r"\bdiameter\b", "القطر"),
    (r"\bglass\b", "زجاج"),
    (r"\bplastic\b", "بلاستيك"),
    (r"\bceramic\b", "سيراميك"),
    (r"\bmicrowave analysis\b", "تحليل بالموجات الدقيقة"),
    (r"\bmodular\b", "معياري"),
    (r"\bcontainerized architecture\b", "بنية حاويات"),
    (r"\bemergency relief\b", "الإغاثة الطارئة"),
    (r"\bindustrial logistics\b", "الخدمات اللوجستية الصناعية"),
    (r"\bheavy construction\b", "الإنشاءات الثقيلة"),
    (r"\boverlapping zones\b", "مناطق متداخلة"),
    (r"\bmulti-target\b", "متعدد الأهداف"),
    (r"\balarm\b", "إنذار"),
    (r"\badjustable\b", "قابل للضبط"),
    (r"\bvehicle\b", "مركبة"),
    (r"\bhuman\b", "إنسان"),
    (r"\bfire source\b", "مصدر حريق"),
    (r"\bfire\b", "حريق"),
    (r"\bresolution\b", "الدقة"),
    (r"\bdetector\b", "الكاشف"),
    (r"\bsensor\b", "المستشعر"),
    (r"\bcolor\b", "ألوان"),
    (r"\bzoom\b", "تكبير"),
    (r"\bat\b", "عند"),
    (r"\bin\b", "في"),
    (r"\bto\b", "إلى"),
    (r"\bon\b", "على"),
]


def spec_text_ar(value):
    text = clean_text(value)
    if not text:
        return ""
    for pattern, replacement in SPEC_REPLACEMENTS:
        text = re.sub(pattern, replacement, text, flags=re.I)

    def replace_word(match):
        word = match.group(0)
        low = word.lower()
        if is_preserved_token(word) or word in ALLOW_LATIN:
            return word
        if low in WORD_AR:
            return WORD_AR[low]
        if low in STOPWORDS:
            return ""
        return word if word.isupper() else ""

    text = re.sub(r"\b[A-Za-z]{3,}\b", replace_word, text)
    text = re.sub(r"\s{2,}", " ", text)
    text = re.sub(r"\(\s+", "(", text)
    text = re.sub(r"\s+\)", ")", text)
    text = text.replace(" ;", ";").replace(" :", ":").strip()
    if text and not re.search(r"[\u0600-\u06ff]", text) and re.search(r"\d", text):
        return text
    return text or value


def fallback_key_parameter(source, index):
    themes = classify_themes(source)
    if index == 1:
        return f"نطاق العمل: {themes[0]}"
    return "نمط النشر: قابل للتهيئة حسب متطلبات الموقع"


def convert_jsonish(value, root_key=""):
    if value is None or value == "":
        return value
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
        except Exception:
            return key_parameter_ar(value)
    else:
        parsed = value

    def convert(item):
        if isinstance(item, dict):
            out = {}
            for key, val in item.items():
                new_key = title_ar(key)
                if isinstance(val, str):
                    out[new_key] = spec_text_ar(val) if re.search(r"\d", val) else title_ar(val)
                else:
                    out[new_key] = convert(val)
            return out
        if isinstance(item, list):
            return [convert(v) for v in item]
        if isinstance(item, str):
            return spec_text_ar(item) if re.search(r"\d", item) else title_ar(item)
        return item

    return convert(parsed)


CASE_SNAPSHOT_LABEL_AR = {
    "Application": "التطبيق",
    "Location": "الموقع",
    "Mission Scale": "نطاق المهمة",
    "Key Capability": "القدرة الرئيسية",
    "Result": "النتيجة",
}


CASE_SNAPSHOT_VALUE_AR = {
    "Flood-season emergency power corridor patrol": "دوريات طارئة لممرات خطوط الطاقة خلال موسم الفيضانات",
    "Chizhou Jiuhua, Anhui, China": "تشيتشو جيوهوا، آنهوي، الصين",
    "150+ sorties": "أكثر من 150 طلعة",
    "Ultra-long-distance signal transmission": "نقل إشارات لمسافات طويلة جداً",
    "Completed flood-season patrol task on schedule": "اكتملت مهمة دوريات موسم الفيضانات وفق الجدول",
    "Emergency inspection of iced 500 kV transmission corridors": "تفتيش طارئ لممرات نقل بجهد 500 كيلوفولت متأثرة بالجليد",
    "Yanji City, Antu County and nearby staging areas, China": "مدينة يانجي ومقاطعة أنتو ومناطق تمركز قريبة في الصين",
    "400 km, 5 staging areas, 18 temporary takeoff and landing points": "400 كم، و5 مناطق تمركز، و18 نقطة مؤقتة للإقلاع والهبوط",
    "3D laser scanning in a -15 C environment": "مسح ليزري ثلاثي الأبعاد في بيئة بدرجة -15 مئوية",
    "12 severe icing defects identified and 12 rapid condition reports issued": "تم تحديد 12 عيباً شديداً بسبب الجليد وإصدار 12 تقرير حالة سريعاً",
    "Tree-obstruction risk inspection": "تفتيش مخاطر عوائق الأشجار",
    "Southern Grid operating area, China": "منطقة تشغيل Southern Grid في الصين",
    "Special inspection task in winter 2024": "مهمة تفتيش خاصة في شتاء 2024",
    "High-precision 3D point-cloud acquisition with LiDAR": "جمع سحابة نقاط ثلاثية الأبعاد عالية الدقة باستخدام LiDAR",
    "Core data delivered for hidden-risk analysis and reporting": "توفير بيانات أساسية لتحليل المخاطر الخفية وإعداد التقارير",
    "Wildfire prevention inspection for mountain transmission lines": "تفتيش وقائي من حرائق الغابات لخطوط النقل الجبلية",
    "Southern Grid mountain transmission corridor, China": "ممر نقل جبلي تابع لـ Southern Grid في الصين",
    "280 km, 4 days, 8 sorties": "280 كم خلال 4 أيام و8 طلعات",
    "Real-time risk reporting and rapid handling": "إبلاغ فوري بالمخاطر ومعالجة سريعة",
    "Nearly 10 wildfire-risk points identified and handled": "تحديد ومعالجة نحو 10 نقاط خطر مرتبطة بحرائق الغابات",
    "Daily transmission-corridor patrol for wildfire emergency inspection": "دوريات يومية لممرات النقل ضمن تفتيش طارئ لمخاطر حرائق الغابات",
    "Hunan, Shandong, Shanxi, Hebei, Anhui and 13 regions in China": "هونان وشاندونغ وشانشي وخبي وآنهوي و13 منطقة في الصين",
    "Tens of thousands of kilometers across 13 regions": "عشرات الآلاف من الكيلومترات عبر 13 منطقة",
    "Real-time overlay of patrol routes and tower attention points on inspection video": "عرض مسارات الدوريات ونقاط الانتباه على الأبراج فوق فيديو التفتيش في الوقت الفعلي",
    "Phased inspection targets completed": "اكتملت أهداف التفتيش المرحلية",
    "Long-distance 110 kV power-line inspection": "تفتيش طويل المسافة لخط طاقة بجهد 110 كيلوفولت",
    "Zhaoqing, Guangdong, China": "تشاوتشينغ، قوانغدونغ، الصين",
    "37.9 km, 112 towers, 10 sorties": "37.9 كم، و112 برجاً، و10 طلعات",
    "Immediate data processing and stitching after each sortie": "معالجة البيانات ودمجها فوراً بعد كل طلعة",
    "Complete standardized output with no turning-point duplication or stitching misalignment": "مخرجات معيارية كاملة دون تكرار نقاط الالتفاف أو اختلال في الدمج",
}


def case_snapshot_ar(value):
    if not value:
        return []
    if isinstance(value, str):
        try:
            source = json.loads(value)
        except Exception:
            return []
    else:
        source = value

    if not isinstance(source, list):
        return []

    out = []
    for item in source:
        if not isinstance(item, dict):
            continue
        label = clean_text(item.get("label"))
        val = clean_text(item.get("value"))
        if not label or not val:
            continue
        out.append({
            "label": CASE_SNAPSHOT_LABEL_AR.get(label, title_ar(label)),
            "value": CASE_SNAPSHOT_VALUE_AR.get(val) or (sentence_ar(val, label) if len(val) > 60 else title_ar(val)),
        })
    return out


def detail_html_ar(name, summary=""):
    safe_name = html.escape(title_ar(name))
    safe_summary = html.escape(sentence_ar(summary, name))
    return (
        f"<h3>نظرة عامة على {safe_name}</h3>"
        f"<p>{safe_summary}</p>"
        "<h4>نقاط تشغيلية</h4>"
        "<ul>"
        "<li>يدعم النشر الميداني في بيئات صناعية وبنية تحتية ومواقع عامة حسب تكوين المشروع.</li>"
        "<li>يركز على المراقبة، والتحقق البصري أو الفني، وتسجيل الأحداث، وتنسيق العمل بين الفرق.</li>"
        "<li>يمكن مواءمة التكوين مع متطلبات الموقع، وأنظمة الإدارة القائمة، وإجراءات السلامة المحلية.</li>"
        "</ul>"
    )


def media_content_ar(raw):
    title = title_ar(raw.get("title_en") or raw.get("title") or "")
    source = clean_text(strip_html(raw.get("content_en") or raw.get("content") or ""))
    themes = classify_themes(f"{title} {source}")
    return (
        f"<p>يتناول هذا المقال موضوع {html.escape(title)} من زاوية تشغيلية مرتبطة بـ {themes[0]}.</p>"
        f"<p>تركز N-TET على تحويل بيانات UAV والمراقبة منخفضة الارتفاع إلى معلومات قابلة للمراجعة، "
        f"مع دعم فرق البنية التحتية والأمن والطوارئ في التحقق الميداني وتوثيق الأحداث.</p>"
        f"<h3>ما الذي يعنيه ذلك للمشغلين؟</h3>"
        f"<p>بالنسبة للفرق الفنية، لا تكفي المعدات وحدها. الأهم هو تكامل المستشعرات، وضوح إجراءات التشغيل، "
        f"وتوفر سجلات تساعد على المتابعة بعد الحدث وتحسين القرار في المشاريع اللاحقة.</p>"
    )


def dictionary_value(value):
    if isinstance(value, dict):
        return {key: dictionary_value(item) for key, item in value.items()}
    if isinstance(value, list):
        return [dictionary_value(item) for item in value]
    if not isinstance(value, str):
        return value
    if value in EXACT:
        return EXACT[value]
    if value in COUNTRY_AR:
        return COUNTRY_AR[value]
    if value in PHRASE_AR:
        return PHRASE_AR[value]
    if len(value) > 80 or "." in value:
        return sentence_ar(value)
    return title_ar(value)


def sync_dictionary():
    en = json.loads(EN_DICT.read_text(encoding="utf-8"))
    ar = dictionary_value(en)
    ar.setdefault("accessories", {})
    ar["accessories"]["items"] = ACCESSORY_ITEM_LABELS
    ar["contact"]["address"] = "مبنى جوجي المالي، طريق ليزه، حي فنغتاي، بكين، الصين"
    ar["footer"]["companyName"] = "N-TET"
    ar["inquiry"]["messagePlaceholder"] = (
        "يرجى مشاركة تفاصيل المشروع أو المتطلبات أو الأنظمة التي تهمك، مثل UAV للتفتيش، "
        "أو مراقبة المجال منخفض الارتفاع، أو حلول الفحص الأمني."
    )
    ar["inquiry"]["subtitle"] = (
        "يرجى تعبئة النموذج أدناه. سيساعدنا ذلك على فهم احتياجاتك في اختيار المعدات، "
        "أو تصميم الحل، أو الدعم الفني، أو خدمة ما بعد البيع، وسيتواصل معك فريقنا في أقرب وقت."
    )
    ar["inquiry"]["submitted"]["subtitle"] = (
        "شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة المتطلبات والرد عليك خلال 24 ساعة."
    )
    AR_DICT.write_text(json.dumps(ar, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


TABLE_COLUMNS = {
    "products": ["product_name_ar", "summary_ar", "key_application_ar", "key_parameter_1_ar", "key_parameter_2_ar", "parameters_ar", "detail_html_ar"],
    "solutions": ["product_name_ar", "summary_ar", "key_application_ar", "key_parameter_1_ar", "key_parameter_2_ar", "parameters_ar", "detail_html_ar"],
    "cases": ["title_ar", "description_ar", "devices_ar", "parameters_ar", "region_ar", "country_ar"],
    "media": ["title_ar", "content_ar"],
}


def ensure_columns(conn):
    for table, names in TABLE_COLUMNS.items():
        existing = {row[1] for row in conn.execute(f"PRAGMA table_info({table})")}
        for name in names:
            if name not in existing:
                conn.execute(f"ALTER TABLE {table} ADD COLUMN {name} TEXT")


def load_raw(row):
    try:
        raw = json.loads(row["raw_json"] or "{}")
        return raw if isinstance(raw, dict) else {}
    except Exception:
        return {}


def sync_product_raw(raw, values):
    raw.update(values)
    return raw


def sync_database(conn):
    ensure_columns(conn)

    for row in conn.execute("SELECT rowid AS __rowid, * FROM products WHERE COALESCE(is_published, 1) = 1"):
        source_name = rget(row, "product_name_en")
        name = accessory_title_ar(source_name, rget(row, "handle")) if rget(row, "category_primary") == "uav-accessories" else title_ar(source_name)
        values = {
            "product_name_ar": name,
            "summary_ar": sentence_ar(rget(row, "summary_en"), source_name),
            "key_application_ar": key_application_ar(rget(row, "key_application_en"), source_name),
            "key_parameter_1_ar": key_parameter_ar(rget(row, "key_parameter_1_en")) or fallback_key_parameter(f"{source_name} {rget(row, 'summary_en')}", 1),
            "key_parameter_2_ar": key_parameter_ar(rget(row, "key_parameter_2_en")) or fallback_key_parameter(f"{source_name} {rget(row, 'summary_en')}", 2),
            "parameters_ar": convert_jsonish(rget(row, "parameters_en")),
            "detail_html_ar": detail_html_ar(source_name, rget(row, "summary_en")),
        }
        values.update(PRODUCT_AR_OVERRIDES.get(rget(row, "handle"), {}))
        raw = sync_product_raw(load_raw(row), values)
        conn.execute(
            """UPDATE products SET product_name_ar=?, summary_ar=?, key_application_ar=?, key_parameter_1_ar=?,
               key_parameter_2_ar=?, parameters_ar=?, detail_html_ar=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                values["product_name_ar"], values["summary_ar"], values["key_application_ar"], values["key_parameter_1_ar"],
                values["key_parameter_2_ar"], json.dumps(values["parameters_ar"], ensure_ascii=False), values["detail_html_ar"],
                json.dumps(raw, ensure_ascii=False), row["__rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS __rowid, * FROM solutions WHERE COALESCE(is_published, 1) = 1"):
        source_name = rget(row, "product_name_en")
        name = title_ar(source_name)
        values = {
            "product_name_ar": name,
            "summary_ar": sentence_ar(rget(row, "summary_en"), source_name),
            "key_application_ar": key_application_ar(rget(row, "key_application_en"), source_name),
            "key_parameter_1_ar": key_parameter_ar(rget(row, "key_parameter_1_en")) or fallback_key_parameter(f"{source_name} {rget(row, 'summary_en')}", 1),
            "key_parameter_2_ar": key_parameter_ar(rget(row, "key_parameter_2_en")) or fallback_key_parameter(f"{source_name} {rget(row, 'summary_en')}", 2),
            "parameters_ar": convert_jsonish(rget(row, "parameters_en")),
            "detail_html_ar": detail_html_ar(source_name, rget(row, "summary_en")),
        }
        raw = sync_product_raw(load_raw(row), values)
        conn.execute(
            """UPDATE solutions SET product_name_ar=?, summary_ar=?, key_application_ar=?, key_parameter_1_ar=?,
               key_parameter_2_ar=?, parameters_ar=?, detail_html_ar=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                values["product_name_ar"], values["summary_ar"], values["key_application_ar"], values["key_parameter_1_ar"],
                values["key_parameter_2_ar"], json.dumps(values["parameters_ar"], ensure_ascii=False), values["detail_html_ar"],
                json.dumps(raw, ensure_ascii=False), row["__rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS __rowid, * FROM cases WHERE COALESCE(is_published, 1) = 1"):
        source_title = rget(row, "title_en")
        override = CASE_CORRECTIONS.get(rget(row, "handle"), {})
        title = override.get("title_ar") or title_ar(source_title)
        values = {
            "title_ar": title,
            "description_ar": override.get("description_ar") or sentence_ar(rget(row, "description_en"), source_title),
            "devices_ar": override.get("devices_ar") or convert_jsonish(rget(row, "devices_en")),
            "parameters_ar": convert_jsonish(rget(row, "parameters_en")),
            "region_ar": title_ar(rget(row, "region_en")),
            "country_ar": title_ar(rget(row, "country_en")),
            "case_snapshot_ar": override.get("case_snapshot_ar") or case_snapshot_ar(load_raw(row).get("case_snapshot_en")),
        }
        raw = sync_product_raw(load_raw(row), values)
        conn.execute(
            """UPDATE cases SET title_ar=?, description_ar=?, devices_ar=?, parameters_ar=?, region_ar=?, country_ar=?,
               raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                values["title_ar"], values["description_ar"], json.dumps(values["devices_ar"], ensure_ascii=False),
                json.dumps(values["parameters_ar"], ensure_ascii=False), values["region_ar"], values["country_ar"],
                json.dumps(raw, ensure_ascii=False), row["__rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS __rowid, * FROM media WHERE COALESCE(is_published, 1) = 1"):
        raw = load_raw(row)
        title_source = raw.get("title_en") or rget(row, "title")
        values = {
            "title_ar": title_ar(title_source),
            "content_ar": media_content_ar(raw | {"title": title_source, "content": rget(row, "content")}),
        }
        raw = sync_product_raw(raw, values)
        conn.execute(
            "UPDATE media SET title_ar=?, content_ar=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?",
            (values["title_ar"], values["content_ar"], json.dumps(raw, ensure_ascii=False), row["__rowid"]),
        )


def main():
    if not DB_PATH.exists():
        raise SystemExit(f"Database not found: {DB_PATH}")
    backup = DB_PATH.with_name(f"ntet.db.bak.arabic-retranslate-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    shutil.copy2(DB_PATH, backup)

    sync_dictionary()

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        sync_database(conn)
        conn.commit()
    finally:
        conn.close()

    print(f"Arabic locale retranslated. Backup: {backup}")


if __name__ == "__main__":
    main()
