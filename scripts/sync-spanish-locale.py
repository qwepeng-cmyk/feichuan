import html
import json
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "ntet.db"
EN_DICT = ROOT / "src" / "dictionaries" / "en.json"
ES_DICT = ROOT / "src" / "dictionaries" / "es.json"


EXACT = {
    "Home": "Inicio",
    "Products": "Productos",
    "Drone Accessories": "Accesorios para drones",
    "Solutions": "Soluciones",
    "Cases": "Casos",
    "Media": "Medios",
    "About": "Acerca de",
    "About us": "Acerca de nosotros",
    "Contact us": "Contáctenos",
    "Select Language": "Seleccionar idioma",
    "Industrial UAV Systems<br/>for Low-Altitude Operations": "Sistemas UAV industriales<br/>para operaciones de baja altitud",
    "Industrial UAV platforms, airspace situational awareness, event records, and compliant response workflows for infrastructure, utilities, and public operations.": "Plataformas UAV industriales, conciencia situacional del espacio aéreo, registros de eventos y flujos de respuesta para infraestructura, servicios públicos y operaciones públicas.",
    "Explore Solutions": "Explorar soluciones",
    "Our Solutions": "Nuestras soluciones",
    "Product Center": "Centro de productos",
    "Case Center": "Centro de casos",
    "About Us": "Acerca de nosotros",
    "Latest News": "Últimas noticias",
    "ALL PRODUCTS": "TODOS LOS PRODUCTOS",
    "View All Cases": "Ver todos los casos",
    "LEARN MORE": "CONOCER MÁS",
    "View All News": "Ver todas las noticias",
    "Deployment Evidence": "Evidencia de despliegue",
    "Technology & Equipment Center": "Centro de tecnología y equipos",
    "Browse industrial UAV platforms, airspace monitoring equipment, inspection systems, and screening tools for site operations.": "Explore plataformas UAV industriales, equipos de monitoreo aéreo, sistemas de inspección y herramientas de revisión para operaciones en sitio.",
    "Get Price": "Solicitar precio",
    "Get quotation": "Solicitar cotización",
    "Get a Quote": "Solicitar cotización",
    "View Specifications": "Ver especificaciones",
    "Overview": "Resumen",
    "Technical Specifications": "Especificaciones técnicas",
    "Get Solution & Quotation": "Solicitar solución y cotización",
    "Parameter": "Parámetro",
    "Description": "Descripción",
    "Features": "Características",
    "Core Advantages": "Ventajas principales",
    "Related Equipment": "Equipos relacionados",
    "UAV & Drone Systems": "Sistemas UAV y drones",
    "Low-Altitude Airspace Monitoring": "Monitoreo del espacio aéreo de baja altitud",
    "Security Screening": "Inspección de seguridad",
    "Security Screening & Policing": "Inspección de seguridad y control de acceso",
    "Engineering Materials": "Materiales de ingeniería",
    "Field Hospitals": "Hospitales de campo",
    "Perimeter Intelligence": "Inteligencia perimetral",
    "Drone Accessories & UAV Components": "Accesorios para drones y componentes UAV",
    "Browse gimbals, propulsion modules, data links, batteries, controllers, and flight-control components for industrial UAV platforms.": "Explore gimbals, módulos de propulsión, enlaces de datos, baterías, controles y componentes de control de vuelo para plataformas UAV industriales.",
    "Electro-Optical Gimbals": "Gimbals electro-ópticos",
    "UAV Engines": "Motores UAV",
    "UAV Data Links": "Enlaces de datos UAV",
    "UAV Propellers": "Hélices UAV",
    "UAV Motors": "Motores UAV",
    "UAV Batteries": "Baterías UAV",
    "UAV Remote Controllers": "Controles remotos UAV",
    "Flight Controllers": "Controladores de vuelo",
    "Industrial UAV Solutions": "Soluciones UAV industriales",
    "UAV solutions for inspection, patrol, emergency support, and low-altitude airspace monitoring.": "Soluciones UAV para inspección, patrullaje, apoyo de emergencia y monitoreo del espacio aéreo de baja altitud.",
    "Industry Needs": "Necesidades de la industria",
    "Application Scenes": "Escenarios de aplicación",
    "Recommended Products": "Productos recomendados",
    "View Product": "Ver producto",
    "EXPLORE ALL": "EXPLORAR TODO",
    "VIEW DETAILS": "VER DETALLES",
    "Border Patrol": "Patrullaje fronterizo",
    "Infrastructure Protection": "Protección de infraestructura",
    "Key Area Security": "Seguridad de áreas clave",
    "Emergency & Disaster Rescue": "Emergencia y rescate ante desastres",
    "UAV Deployment Cases": "Casos de despliegue UAV",
    "Deployment references for UAV inspection, patrol, emergency support, and low-altitude airspace monitoring.": "Referencias de despliegue para inspección UAV, patrullaje, apoyo de emergencia y monitoreo de baja altitud.",
    "Region:": "Región:",
    "Solutions:": "Soluciones:",
    "All": "Todos",
    "No cases found matching your criteria.": "No se encontraron casos que coincidan con sus criterios.",
    "Equipment Used": "Equipo utilizado",
    "All Solutions": "Todas las soluciones",
    "All Regions": "Todas las regiones",
    "China": "China",
    "Asia": "Asia",
    "Africa": "África",
    "North America": "Norteamérica",
    "South America": "Sudamérica",
    "Europe": "Europa",
    "Oceania": "Oceanía",
    "Insights & Updates": "Perspectivas y actualizaciones",
    "Company updates, technical notes, and industry perspectives on UAV operations and airspace monitoring.": "Actualizaciones de la empresa, notas técnicas y perspectivas de la industria sobre operaciones UAV y monitoreo aéreo.",
    "Latest": "Último",
    "Corporate News": "Noticias corporativas",
    "Product & Tech": "Producto y tecnología",
    "Industry Insights": "Perspectivas de la industria",
    "updates found": "actualizaciones encontradas",
    "Company Profile": "Perfil de la empresa",
    "Engineering UAV, airspace monitoring, and intelligent inspection systems for infrastructure operators.": "UAV de ingeniería, monitoreo aéreo y sistemas de inspección inteligente para operadores de infraestructura.",
    "R&D Team": "Equipo de I+D",
    "R&D Team Ratio": "Proporción del equipo de I+D",
    "R&D System": "Sistema de I+D",
    "Core Capabilities": "Capacidades principales",
    "UAV Reliability Design": "Diseño de confiabilidad UAV",
    "Intelligent Algorithms": "Algoritmos inteligentes",
    "AI Recognition Technology": "Tecnología de reconocimiento con IA",
    "Contact Us": "Contáctenos",
    "Talk with our team about UAV platforms, airspace monitoring equipment, inspection workflows, and project-specific deployment needs.": "Hable con nuestro equipo sobre plataformas UAV, equipos de monitoreo aéreo, flujos de inspección y necesidades específicas de despliegue.",
    "Direct Contact": "Contacto directo",
    "Consultation": "Consulta",
    "Email": "Correo electrónico",
    "Sales Hotline": "Línea de ventas",
    "Company Address": "Dirección de la empresa",
    "Quick Links": "Enlaces rápidos",
    "Contact Info": "Información de contacto",
    "Industrial UAV Systems & Airspace Monitoring": "Sistemas UAV industriales y monitoreo aéreo",
    "(c) 2026 Beijing Feichuan Equipment Technology Co., Ltd. All rights reserved.": "(c) 2026 Beijing Feichuan Equipment Technology Co., Ltd. Todos los derechos reservados.",
    "Name": "Nombre",
    "Company Name": "Empresa",
    "E-mail": "Correo electrónico",
    "Contact Method": "Método de contacto",
    "Country Code": "Código de país",
    "Phone Number": "Teléfono",
    "Inquiry Type:": "Tipo de consulta:",
    "Project Details / Message": "Detalles del proyecto / mensaje",
    "SUBMIT INQUIRY": "ENVIAR CONSULTA",
    "SUBMITTING...": "ENVIANDO...",
    "SUBMITTED SUCCESSFULLY!": "¡ENVIADO CORRECTAMENTE!",
    "Send Another Message": "Enviar otro mensaje",
    "Failed to submit. Please try again.": "No se pudo enviar. Inténtelo nuevamente.",
    "Product Pricing & Quotation": "Precio y cotización de producto",
    "Request a Custom Solution": "Solicitar una solución personalizada",
    "Product Brochures & Tech Specs": "Folletos y especificaciones técnicas",
    "Partnership / Distributor Application": "Solicitud de alianza o distribución",
    "Technical & After-Sales Support": "Soporte técnico y posventa",
    "Select Code...": "Seleccione código...",
    "Phone": "Teléfono",
    "Asia & Middle East": "Asia y Medio Oriente",
    "Europe & CIS": "Europa y CEI",
    "North America & Oceania": "Norteamérica y Oceanía",
    "Other (Please add in message)": "Otro (indíquelo en el mensaje)",
    "Learn More": "Conocer más",
    "Back to Top": "Volver arriba",
    "HOME": "INICIO",
    "PRODUCT": "PRODUCTOS",
    "ACCESSORIES": "ACCESORIOS",
    "SOLUTIONS": "SOLUCIONES",
    "CASES": "CASOS",
}

COUNTRY = {
    "UAE": "EAU",
    "Saudi Arabia": "Arabia Saudita",
    "Iran": "Irán",
    "Turkey": "Turquía",
    "Qatar": "Catar",
    "Oman": "Omán",
    "Kuwait": "Kuwait",
    "Iraq": "Irak",
    "India": "India",
    "Japan": "Japón",
    "South Korea": "Corea del Sur",
    "Singapore": "Singapur",
    "Malaysia": "Malasia",
    "Uzbekistan": "Uzbekistán",
    "Russia / Kazakhstan": "Rusia / Kazajistán",
    "Belarus": "Bielorrusia",
    "United Kingdom": "Reino Unido",
    "Germany": "Alemania",
    "France": "Francia",
    "Italy": "Italia",
    "Spain": "España",
    "Brazil": "Brasil",
    "Argentina": "Argentina",
    "Colombia": "Colombia",
    "Chile": "Chile",
    "Peru": "Perú",
    "Ecuador": "Ecuador",
    "Venezuela": "Venezuela",
    "Egypt": "Egipto",
    "Algeria": "Argelia",
    "Morocco": "Marruecos",
    "Nigeria": "Nigeria",
    "South Africa": "Sudáfrica",
    "Kenya": "Kenia",
    "Ethiopia": "Etiopía",
    "USA / Canada": "EE. UU. / Canadá",
    "Mexico": "México",
    "Australia": "Australia",
    "New Zealand": "Nueva Zelanda",
}

TERM_REPLACEMENTS = [
    (r"\bIndustrial\b", "industrial"),
    (r"\bSystems\b", "sistemas"),
    (r"\bSystem\b", "sistema"),
    (r"\bSolutions\b", "soluciones"),
    (r"\bSolution\b", "solución"),
    (r"\bMonitoring\b", "monitoreo"),
    (r"\bInspection\b", "inspección"),
    (r"\bPatrol\b", "patrullaje"),
    (r"\bEmergency\b", "emergencia"),
    (r"\bCommunication\b", "comunicación"),
    (r"\bLighting\b", "iluminación"),
    (r"\bRescue\b", "rescate"),
    (r"\bSearch\b", "búsqueda"),
    (r"\bReconnaissance\b", "reconocimiento"),
    (r"\bFirefighting\b", "apoyo contra incendios"),
    (r"\bTethered\b", "cautivo"),
    (r"\bDrone\b", "dron"),
    (r"\bDrones\b", "drones"),
    (r"\bUAVs\b", "UAV"),
    (r"\bFixed-Wing\b", "ala fija"),
    (r"\bMulti-Rotor\b", "multirrotor"),
    (r"\bPayload\b", "carga útil"),
    (r"\bAirspace\b", "espacio aéreo"),
    (r"\bLow-Altitude\b", "baja altitud"),
    (r"\bDetection\b", "detección"),
    (r"\bTracking\b", "seguimiento"),
    (r"\bSecurity\b", "seguridad"),
    (r"\bScreening\b", "inspección"),
    (r"\bPerimeter\b", "perimetral"),
    (r"\bSurveillance\b", "vigilancia"),
    (r"\bInfrastructure\b", "infraestructura"),
    (r"\bCritical\b", "crítica"),
    (r"\bBorder\b", "fronterizo"),
    (r"\bCoastal\b", "costero"),
    (r"\bMaritime\b", "marítimo"),
    (r"\bPower\b", "eléctrica"),
    (r"\bLine\b", "línea"),
    (r"\bGrid\b", "red eléctrica"),
    (r"\bSubstation\b", "subestación"),
    (r"\bWater Conservancy\b", "gestión hídrica"),
    (r"\bRiver-Lake\b", "ríos y lagos"),
    (r"\bChemical Plant\b", "planta química"),
    (r"\bOil Production Base\b", "base de producción petrolera"),
    (r"\bHydroelectric Dam\b", "presa hidroeléctrica"),
    (r"\bAirport\b", "aeropuerto"),
    (r"\bJudicial Sector\b", "sector judicial"),
    (r"\bSports Event\b", "evento deportivo"),
    (r"\bAccessories\b", "accesorios"),
    (r"\bComponents\b", "componentes"),
    (r"\bController\b", "controlador"),
    (r"\bControllers\b", "controladores"),
    (r"\bBattery\b", "batería"),
    (r"\bBatteries\b", "baterías"),
    (r"\bPropeller\b", "hélice"),
    (r"\bPropellers\b", "hélices"),
    (r"\bMotor\b", "motor"),
    (r"\bMotors\b", "motores"),
    (r"\bEngine\b", "motor"),
    (r"\bEngines\b", "motores"),
    (r"\bGimbal\b", "gimbal"),
    (r"\bGimbals\b", "gimbals"),
    (r"\bData Link\b", "enlace de datos"),
    (r"\bRemote\b", "remoto"),
    (r"\bFlight\b", "vuelo"),
]


def clean_text(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def title_es(value):
    text = clean_text(value)
    if not text:
        return ""
    if text in EXACT:
        return EXACT[text]
    if text in COUNTRY:
        return COUNTRY[text]
    out = text
    for pattern, repl in TERM_REPLACEMENTS:
        out = re.sub(pattern, repl, out)
    out = re.sub(r"\b&\b", "y", out)
    out = re.sub(r"\s+", " ", out).strip()
    return out[:1].upper() + out[1:]


def sentence_es(value, subject=None):
    clean = clean_text(re.sub(r"<[^>]+>", " ", str(value or "")))
    name = title_es(subject or clean[:80] or "sistema N-TET")
    lower = clean.lower()
    themes = []
    for needle, label in [
        ("inspection", "inspección"),
        ("monitor", "monitoreo"),
        ("emergency", "respuesta de emergencia"),
        ("patrol", "patrullaje"),
        ("communication", "comunicación temporal"),
        ("lighting", "iluminación operativa"),
        ("security", "seguridad de sitio"),
        ("uav", "operaciones UAV"),
        ("drone", "operaciones UAV"),
        ("power", "infraestructura eléctrica"),
        ("water", "gestión hídrica"),
        ("border", "monitoreo fronterizo"),
        ("accessor", "integración de componentes UAV"),
    ]:
        if needle in lower and label not in themes:
            themes.append(label)
    if not themes:
        themes = ["operaciones industriales", "monitoreo de campo", "soporte de proyectos"]
    return f"{name} de N-TET para {', '.join(themes[:3])}, con integración práctica, registros operativos y soporte de despliegue para equipos técnicos."


def key_application_es(value):
    clean = clean_text(value)
    if not clean:
        return ""
    parts = [title_es(part.strip(" .;")) for part in re.split(r";|,", clean) if part.strip()]
    parts = [p for p in parts if p][:6]
    if not parts:
        return sentence_es(clean)
    return "Aplicaciones principales: " + "; ".join(parts) + "."


def key_parameter_es(value):
    text = clean_text(value)
    if ":" in text:
        key, val = text.split(":", 1)
        return f"{title_es(key)}: {val.strip()}"
    return title_es(text)


def parameters_es(value):
    if value is None or value == "":
        return value
    parsed = None
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
        except Exception:
            return title_es(value)
    else:
        parsed = value
    if isinstance(parsed, dict):
        return {title_es(k): title_es(v) if isinstance(v, str) and not re.search(r"\d", v) else v for k, v in parsed.items()}
    if isinstance(parsed, list):
        out = []
        for item in parsed:
            if isinstance(item, dict):
                out.append({title_es(k): title_es(v) if isinstance(v, str) and not re.search(r"\d", v) else v for k, v in item.items()})
            elif isinstance(item, str):
                out.append(title_es(item))
            else:
                out.append(item)
        return out
    return parsed


def detail_html_es(name, summary=""):
    safe_name = html.escape(title_es(name))
    safe_summary = html.escape(sentence_es(summary, name))
    return (
        "<h4>Características</h4>"
        "<ul>"
        f"<li>{safe_name} está diseñado para operaciones industriales con despliegue práctico en campo.</li>"
        f"<li>{safe_summary}</li>"
        "<li>La configuración puede integrarse con flujos de inspección, registro de eventos y soporte técnico del proyecto.</li>"
        "</ul>"
    )


def translate_dict_value(value):
    if isinstance(value, dict):
        return {k: translate_dict_value(v) for k, v in value.items()}
    if isinstance(value, list):
        return [translate_dict_value(v) for v in value]
    if not isinstance(value, str):
        return value
    if value in EXACT:
        return EXACT[value]
    if value in COUNTRY:
        return COUNTRY[value]
    if len(value) > 80 or "." in value:
        return sentence_es(value)
    return title_es(value)


def sync_dictionary():
    en = json.loads(EN_DICT.read_text(encoding="utf-8"))
    es = translate_dict_value(en)
    es["nav"]["accessories"] = "Accesorios UAV"
    es["home"]["about"]["content"] = (
        "Beijing Feichuan Equipment Technology Co., Ltd. desarrolla plataformas UAV industriales, "
        "equipos de monitoreo del espacio aéreo, flujos de inspección y sistemas inteligentes de revisión "
        "para infraestructura y operaciones públicas."
    )
    es["about"]["companyDesc1"] = (
        "Beijing Feichuan Equipment Technology Co., Ltd. tiene sede en Beijing y se enfoca en sistemas UAV "
        "industriales, monitoreo del espacio aéreo, inspección inteligente y tecnologías de revisión en sitio."
    )
    es["about"]["companyDesc2"] = (
        "La empresa conecta desarrollo de ingeniería, experiencia de despliegue en campo y recursos de socios "
        "para apoyar a operadores de infraestructura, servicios públicos, equipos de emergencia y gestores de sitios."
    )
    es["about"]["companyDesc3"] = (
        "Ayudamos a los clientes a convertir sensado, inspección, registros y coordinación de respuesta en flujos operativos prácticos."
    )
    es["contact"]["address"] = "Jujie Financial Building, Lize Road, Fengtai District, Beijing, China"
    es["inquiry"]["messagePlaceholder"] = (
        "Comparta detalles de su proyecto, requisitos o sistemas de interés, por ejemplo UAV de inspección, "
        "monitoreo de baja altitud o inspección de seguridad."
    )
    es["inquiry"]["submitted"]["subtitle"] = (
        "Gracias por su consulta. Nuestro equipo revisará sus requisitos y le responderá dentro de 24 horas."
    )
    ES_DICT.write_text(json.dumps(es, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


TABLE_COLUMNS = {
    "products": [
        "product_name_es", "summary_es", "key_application_es", "key_parameter_1_es", "key_parameter_2_es", "parameters_es", "detail_html_es",
    ],
    "solutions": [
        "product_name_es", "summary_es", "key_application_es", "key_parameter_1_es", "key_parameter_2_es", "parameters_es", "detail_html_es",
    ],
    "cases": ["title_es", "description_es", "devices_es", "parameters_es", "region_es", "country_es"],
    "media": ["title_es", "content_es"],
}


def ensure_columns(conn):
    for table, cols in TABLE_COLUMNS.items():
        existing = {row[1] for row in conn.execute(f"PRAGMA table_info({table})")}
        for col in cols:
            if col not in existing:
                conn.execute(f"ALTER TABLE {table} ADD COLUMN {col} TEXT")


def sync_raw(raw, kind):
    if not isinstance(raw, dict):
        return raw
    for key, value in list(raw.items()):
        if key.endswith("_en"):
            base = key[:-3]
            es_key = f"{base}_es"
            if base in {"product_name", "title", "name", "region", "country"}:
                raw[es_key] = title_es(value)
            elif base.startswith("key_parameter"):
                raw[es_key] = key_parameter_es(value)
            elif base == "key_application":
                raw[es_key] = key_application_es(value)
            elif base == "parameters":
                raw[es_key] = parameters_es(value)
            elif base == "detail_html":
                raw[es_key] = detail_html_es(raw.get("product_name_en") or raw.get("title_en") or raw.get("name_en"), raw.get("summary_en") or "")
            else:
                raw[es_key] = sentence_es(value, raw.get("product_name_en") or raw.get("title_en") or raw.get("name_en"))
    if kind == "media":
        raw["title_es"] = title_es(raw.get("title_en") or raw.get("title") or raw.get("id", ""))
        raw["content_es"] = media_content_es(raw)
    return raw


def media_content_es(raw):
    title = title_es(raw.get("title_en") or raw.get("title") or "")
    return (
        f"<p>{title} analiza tendencias y prácticas para operaciones UAV industriales, monitoreo de baja altitud e infraestructura.</p>"
        "<h3>Contexto operativo</h3>"
        "<p>El enfoque de N-TET prioriza despliegues verificables, integración con equipos de campo, registros de operación y soporte técnico para proyectos internacionales.</p>"
    )


def sync_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    ensure_columns(conn)

    for row in conn.execute("SELECT rowid AS _rowid, * FROM products").fetchall():
        name = title_es(row["product_name_en"])
        raw = sync_raw(json.loads(row["raw_json"] or "{}"), "product")
        raw.update({
            "product_name_es": name,
            "summary_es": sentence_es(row["summary_en"], name),
            "key_application_es": key_application_es(row["key_application_en"]),
            "key_parameter_1_es": key_parameter_es(row["key_parameter_1_en"]),
            "key_parameter_2_es": key_parameter_es(row["key_parameter_2_en"]),
            "parameters_es": parameters_es(row["parameters_en"]),
            "detail_html_es": detail_html_es(name, row["summary_en"]),
        })
        conn.execute(
            """UPDATE products SET product_name_es=?, summary_es=?, key_application_es=?, key_parameter_1_es=?,
               key_parameter_2_es=?, parameters_es=?, detail_html_es=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                raw["product_name_es"], raw["summary_es"], raw["key_application_es"], raw["key_parameter_1_es"],
                raw["key_parameter_2_es"], json.dumps(raw["parameters_es"], ensure_ascii=False), raw["detail_html_es"],
                json.dumps(raw, ensure_ascii=False), row["_rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS _rowid, * FROM solutions").fetchall():
        name = title_es(row["product_name_en"])
        raw = sync_raw(json.loads(row["raw_json"] or "{}"), "solution")
        raw.update({
            "product_name_es": name,
            "summary_es": sentence_es(row["summary_en"], name),
            "key_application_es": key_application_es(row["key_application_en"]),
            "key_parameter_1_es": key_parameter_es(row["key_parameter_1_ru"] or row["key_application_en"]),
            "key_parameter_2_es": key_parameter_es(row["key_parameter_2_ru"] or row["summary_en"]),
            "parameters_es": parameters_es(row["parameters_en"]),
            "detail_html_es": detail_html_es(name, row["summary_en"]),
        })
        conn.execute(
            """UPDATE solutions SET product_name_es=?, summary_es=?, key_application_es=?, key_parameter_1_es=?,
               key_parameter_2_es=?, parameters_es=?, detail_html_es=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                raw["product_name_es"], raw["summary_es"], raw["key_application_es"], raw["key_parameter_1_es"],
                raw["key_parameter_2_es"], json.dumps(raw["parameters_es"], ensure_ascii=False), raw["detail_html_es"],
                json.dumps(raw, ensure_ascii=False), row["_rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS _rowid, * FROM cases").fetchall():
        title = title_es(row["title_en"])
        raw = sync_raw(json.loads(row["raw_json"] or "{}"), "case")
        devices = parameters_es(row["devices_en"])
        params = parameters_es(row["parameters_en"])
        raw.update({
            "title_es": title,
            "description_es": sentence_es(row["description_en"], title),
            "devices_es": devices,
            "parameters_es": params,
            "region_es": title_es(row["region_en"]),
            "country_es": title_es(row["country_en"]),
        })
        conn.execute(
            """UPDATE cases SET title_es=?, description_es=?, devices_es=?, parameters_es=?, region_es=?, country_es=?,
               raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?""",
            (
                raw["title_es"], raw["description_es"], json.dumps(devices, ensure_ascii=False),
                json.dumps(params, ensure_ascii=False), raw["region_es"], raw["country_es"],
                json.dumps(raw, ensure_ascii=False), row["_rowid"],
            ),
        )

    for row in conn.execute("SELECT rowid AS _rowid, * FROM media").fetchall():
        raw = sync_raw(json.loads(row["raw_json"] or "{}"), "media")
        title = raw["title_es"]
        content = raw["content_es"]
        conn.execute(
            "UPDATE media SET title_es=?, content_es=?, raw_json=?, updated_at=CURRENT_TIMESTAMP WHERE rowid=?",
            (title, content, json.dumps(raw, ensure_ascii=False), row["_rowid"]),
        )

    conn.commit()
    conn.close()


def sync_source_json():
    roots = [ROOT / "网站资料", ROOT / "public" / "media"]
    changed = 0
    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*.json"):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except Exception:
                continue
            before = json.dumps(data, ensure_ascii=False, sort_keys=True)
            if isinstance(data, dict):
                kind = "media" if "media" in str(path).replace("\\", "/") else "content"
                sync_raw(data, kind)
                if "product_name_en" in data:
                    data["product_name_es"] = title_es(data["product_name_en"])
                    data["summary_es"] = sentence_es(data.get("summary_en"), data["product_name_es"])
                    data["key_application_es"] = key_application_es(data.get("key_application_en", ""))
                    data["detail_html_es"] = detail_html_es(data["product_name_es"], data.get("summary_en", ""))
                if "title_en" in data:
                    data["title_es"] = title_es(data["title_en"])
                    data["description_es"] = sentence_es(data.get("description_en"), data["title_es"])
            after = json.dumps(data, ensure_ascii=False, sort_keys=True)
            if after != before:
                path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                changed += 1
    return changed


if __name__ == "__main__":
    sync_dictionary()
    sync_db()
    changed = sync_source_json()
    print(f"Spanish locale synced. Source JSON files changed: {changed}")
