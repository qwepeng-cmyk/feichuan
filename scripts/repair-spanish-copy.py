import concurrent.futures
import json
import re
import sqlite3
import sys
import threading
import time
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "ntet.db"
MEDIA_ARCHIVE_PATH = ROOT / "data" / "content" / "media-archive-2025-2026.json"
MEDIA_LOCALES_PATH = ROOT / "data" / "content" / "media-locales.json"
TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"
SPLIT_MARKER = "<ntet-split></ntet-split>"

MANUAL_TRANSLATIONS = {
    "Land-Based Maritime Surveillance & Early Warning": "Vigilancia marítima terrestre y alerta temprana",
    "Land-based Maritime Surveillance & Early Warning": "Vigilancia marítima terrestre y alerta temprana",
    "Ice and Snow Disaster Emergency UAV Inspection": "Inspección UAV de emergencia ante desastres de hielo y nieve",
    "C-UAS Case of a Power Plant in Pakistan": "Caso C-UAS de una central eléctrica en Pakistán",
    "C-UAS Case of a Refinery in Brazil": "Caso C-UAS de una refinería en Brasil",
    "Oil Production Base C-UAS Protection": "Protección C-UAS para bases de producción petrolera",
    "N-TET PV-Storage-Diesel Microgrid Solution": "Solución de microrred fotovoltaica, almacenamiento y diésel de N-TET",
    "Specification Table: 建帆科技培训类型号表": "Tabla de modelos para formación",
    "建帆科技培训类型号表": "Tabla de modelos para formación",
    "峰值速率52Mbps@20MHz，最高可选92Mbps": "Velocidad máxima de 52 Mbps a 20 MHz; opcional hasta 92 Mbps",
    "≥64个节点  >10跳": "≥64 nodos; más de 10 saltos",
    "Airport C-UAS Application": "Aplicación C-UAS para aeropuertos",
    "Airport C-UAS Security": "Seguridad C-UAS para aeropuertos",
    "Chemical Plant C-UAS Protection": "Protección C-UAS para plantas químicas",
    "Disaster-Site Search, Rescue & Reconnaissance": "Búsqueda, rescate y reconocimiento con UAV en zonas de desastre",
    "Emergency Communication UAV": "UAV de comunicación de emergencia",
    "Emergency Communication UAV Solution": "Solución UAV de comunicación de emergencia",
    "Emergency Lighting UAV": "UAV de iluminación de emergencia",
    "Emergency Reconnaissance UAV": "UAV de reconocimiento de emergencia",
    "Emergency Search & Rescue UAV Solution": "Solución UAV de búsqueda y rescate de emergencia",
    "High-Rise Firefighting UAV Solution": "Solución UAV para apoyo contra incendios en edificios de gran altura",
    "Hydroelectric Dam Protection": "Protección de presas hidroeléctricas",
    "Judicial Sector Security Protection": "Protección de instalaciones judiciales",
    "Night Emergency Lighting Support": "Apoyo de iluminación UAV para emergencias nocturnas",
    "Post-Disaster Emergency Communication Support": "Apoyo de comunicaciones UAV tras un desastre",
    "Power Generation Facility C-UAS": "Sistema C-UAS para instalaciones de generación eléctrica",
    "Power Line UAV Intelligent Inspection": "Inspección inteligente de líneas eléctricas con UAV",
    "Power Tower Inspection UAV Solution": "Solución UAV para inspección de torres eléctricas",
    "Smart Substation Autonomous UAV Inspection Solution": "Solución de inspección autónoma de subestaciones con UAV",
    "Substation Automatic Inspection Drone Solution": "Solución de inspección automática de subestaciones con drones",
    "Large Sports Event C-UAS Security": "Seguridad C-UAS para grandes eventos deportivos",
    "Tethered Lighting UAV Solution": "Solución UAV cautiva de iluminación",
    "UAV Maritime Emergency Rescue": "UAV para rescate de emergencia marítima",
    "Border Patrol & Coastal Monitoring": "Patrullaje fronterizo y monitoreo costero",
    "Urban High-Rise Firefighting & Rescue": "Apoyo UAV para incendios y rescate en edificios de gran altura",
    "Water Conservancy Monitoring UAV Solution": "Solución UAV para monitoreo de recursos hídricos",
    "Water Conservancy & River-Lake Monitoring": "Monitoreo de recursos hídricos, ríos y lagos",
    "Emergency Communication Tethered UAV": "UAV cautivo de comunicación de emergencia",
    "High-Rise Firefighting Tethered UAV": "UAV cautivo para apoyo contra incendios en edificios de gran altura",
    "Tethered Lighting UAV": "UAV cautivo de iluminación",
    "Power Tower Inspection UAV": "UAV para inspección de torres eléctricas",
    "Stationary RF Identification System": "Sistema fijo de identificación por RF",
    "Portable RF Identification System": "Sistema portátil de identificación por RF",
    "UAV Remote ID Recognition System": "Sistema de monitoreo de identificación remota de UAV",
    "FC-RDS500-4R Radar-Vision Fusion System": "Sistema de fusión radar-visión FC-RDS500-4R",
}

SOURCE_REPLACEMENTS = {
    "柱身": "column body",
    "5W/个": "5 W per unit",
    "Ємність акумулятора": "Battery capacity",
    "，": ", ",
    "（": "(",
    "）": ")",
    "：": ": ",
    "；": "; ",
}

BAD_SPANISH_RE = re.compile(
    r"\b(?:the|and|for|with|from|into|based|system|equipment|manufacturer|provide|browse|solution|solutions|monitoring|detection|security|warning|surveillance|inspection|disaster|rescue|mounted|vehicle|integrated|early|land|snow|power|plant|border|patrol|emergency|communication|lighting|protection)\b",
    re.I,
)
CJK_RE = re.compile(r"[\u3400-\u9fff]")
CYRILLIC_RE = re.compile(r"[\u0400-\u04ff]")
HTML_TEXT_RE = re.compile(r"(?<=>)([^<>]+)(?=<)")
HTML_ATTR_RE = re.compile(r"\b(alt|title)=(['\"])(.*?)\2", re.I | re.S)

_cache = dict(MANUAL_TRANSLATIONS)
_cache_lock = threading.Lock()
HANDLE_LABELS = {}


def clean_source(value):
    text = str(value or "")
    for source, replacement in SOURCE_REPLACEMENTS.items():
        text = text.replace(source, replacement)
    return text


def should_translate(value):
    text = str(value or "").strip()
    if not text or text in MANUAL_TRANSLATIONS:
        return bool(text)
    if text.startswith(("/", "http://", "https://", "mailto:")):
        return False
    if re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+){2,}", text):
        return False
    if not re.search(r"[A-Za-z\u3400-\u9fff]", text):
        return False
    if re.fullmatch(r"[A-Z0-9./+_@×*°%≤≥~:\-\s]+", text):
        return False
    return True


def translated_response(source):
    for attempt in range(5):
        try:
            session = requests.Session()
            session.trust_env = False
            response = session.post(
                TRANSLATE_URL,
                data={"client": "gtx", "sl": "en", "tl": "es", "dt": "t", "q": source},
                timeout=45,
            )
            response.raise_for_status()
            return "".join(part[0] for part in response.json()[0])
        except Exception:
            if attempt == 4:
                raise
            time.sleep(1.5 * (attempt + 1))


def translate_group(group):
    source = SPLIT_MARKER.join(clean_source(value) for value in group)
    translated = translated_response(source)
    parts = translated.split(SPLIT_MARKER)
    if len(parts) != len(group):
        return {value: translated_response(clean_source(value)) for value in group}
    return dict(zip(group, parts))


def build_translation_cache(strings):
    pending = []
    seen = set()
    for value in strings:
        text = str(value or "").strip()
        if not should_translate(text) or text in seen:
            continue
        with _cache_lock:
            if text in _cache:
                continue
        seen.add(text)
        pending.append(text)

    groups = []
    current = []
    current_length = 0
    for text in sorted(pending, key=len, reverse=True):
        projected = current_length + len(text) + len(SPLIT_MARKER)
        if current and (projected > 3800 or len(current) >= 30):
            groups.append(current)
            current = []
            current_length = 0
        current.append(text)
        current_length += len(text) + len(SPLIT_MARKER)
    if current:
        groups.append(current)

    print(f"Translating {len(pending)} unique text segments in {len(groups)} batches...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        for result in executor.map(translate_group, groups):
            with _cache_lock:
                _cache.update(result)


def translate_text(value):
    text = str(value or "")
    stripped = text.strip()
    if not stripped:
        return ""
    if stripped in MANUAL_TRANSLATIONS:
        translated = MANUAL_TRANSLATIONS[stripped]
    elif not should_translate(stripped):
        translated = clean_source(stripped)
    else:
        translated = _cache.get(stripped, stripped)
    translated = translated.replace(" / ", "/")
    translated = translated.replace("Power coverage range", "Rango de potencia")
    translated = translated.replace("N-TET's", "La propuesta de N-TET")
    return translated


def html_segments(value):
    html = str(value or "")
    segments = [match.group(1).strip() for match in HTML_TEXT_RE.finditer(html) if should_translate(match.group(1))]
    segments.extend(match.group(3).strip() for match in HTML_ATTR_RE.finditer(html) if should_translate(match.group(3)))
    return segments


def translate_html(value):
    html = clean_source(value)

    def replace_text(match):
        original = match.group(1)
        stripped = original.strip()
        if stripped in HANDLE_LABELS:
            translated = HANDLE_LABELS[stripped]
            leading = original[: len(original) - len(original.lstrip())]
            trailing = original[len(original.rstrip()) :]
            return f"{leading}{translated}{trailing}"
        if not should_translate(stripped):
            return original
        leading = original[: len(original) - len(original.lstrip())]
        trailing = original[len(original.rstrip()) :]
        return f"{leading}{translate_text(stripped)}{trailing}"

    def replace_attr(match):
        translated = translate_text(match.group(3)) if should_translate(match.group(3)) else match.group(3)
        return f"{match.group(1)}={match.group(2)}{translated}{match.group(2)}"

    html = HTML_TEXT_RE.sub(replace_text, html)
    html = HTML_ATTR_RE.sub(replace_attr, html)
    html = html.replace('href="/en/', 'href="/es/').replace("href='/en/", "href='/es/")
    return html.replace("N-TET's", "La propuesta de N-TET")


def json_segments(value, include_keys=True):
    output = []
    if isinstance(value, dict):
        for key, item in value.items():
            if include_keys and should_translate(key):
                output.append(key)
            output.extend(json_segments(item, include_keys))
    elif isinstance(value, list):
        for item in value:
            output.extend(json_segments(item, include_keys))
    elif isinstance(value, str) and should_translate(value):
        output.append(value)
    return output


def translate_json(value):
    if isinstance(value, dict):
        return {translate_text(key): translate_json(item) for key, item in value.items()}
    if isinstance(value, list):
        return [translate_json(item) for item in value]
    if isinstance(value, str):
        return translate_text(value)
    return value


def parse_json(value, fallback):
    if isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value or "")
    except Exception:
        return fallback


def row_needs_product_repair(row):
    plain = " ".join(
        str(row[key] or "")
        for key in ["product_name_es", "summary_es", "key_application_es", "key_parameter_1_es", "key_parameter_2_es"]
    )
    detail = re.sub(r"<[^>]+>", " ", str(row["detail_html_es"] or ""))
    all_spanish = " ".join(str(row[key] or "") for key in row.keys() if key.endswith("_es"))
    return (
        "de N-TET para" in plain
        or BAD_SPANISH_RE.search(f"{plain} {detail}") is not None
        or CJK_RE.search(all_spanish) is not None
        or CYRILLIC_RE.search(all_spanish) is not None
        or not str(row["summary_es"] or "").strip()
        or not str(row["detail_html_es"] or "").strip()
    )


def row_needs_case_repair(row):
    text = " ".join(str(row[key] or "") for key in ["title_es", "description_es", "devices_es", "parameters_es"])
    return (
        "de N-TET para" in text
        or BAD_SPANISH_RE.search(text) is not None
        or CJK_RE.search(text) is not None
        or CYRILLIC_RE.search(text) is not None
        or not str(row["title_es"] or "").strip()
        or not str(row["description_es"] or "").strip()
    )


def prepare_records(connection):
    connection.row_factory = sqlite3.Row
    products = [dict(row) for row in connection.execute("SELECT * FROM products") if row_needs_product_repair(row)]
    solutions = [dict(row) for row in connection.execute("SELECT * FROM solutions")]
    cases = [dict(row) for row in connection.execute("SELECT * FROM cases") if row_needs_case_repair(row)]

    archive = {item["id"]: item for item in json.loads(MEDIA_ARCHIVE_PATH.read_text(encoding="utf-8"))}
    locales = json.loads(MEDIA_LOCALES_PATH.read_text(encoding="utf-8"))
    media = []
    for row in connection.execute("SELECT * FROM media"):
        item = dict(row)
        raw = parse_json(item.get("raw_json"), {})
        source = archive.get(item["id"], raw)
        locale = locales.setdefault(item["id"], {})
        if not locale.get("title_es") or not locale.get("summary_es") or not locale.get("content_es"):
            media.append((item, source, locale))
    return products, solutions, cases, media, locales


def collect_segments(products, solutions, cases, media):
    strings = []
    for row in products:
        for key in ["product_name_en", "summary_en", "key_application_en", "key_parameter_1_en", "key_parameter_2_en"]:
            if row.get(key):
                strings.append(row[key])
        parameters = parse_json(row.get("parameters_en"), {})
        strings.extend(json_segments(parameters))
        strings.extend(html_segments(row.get("detail_html_en")))

    for row in solutions:
        for key in ["product_name_en", "summary_en", "key_application_en"]:
            if row.get(key):
                strings.append(row[key])
        raw = parse_json(row.get("raw_json"), {})
        for key in ["key_parameter_1_en", "key_parameter_2_en"]:
            if raw.get(key):
                strings.append(raw[key])

    for row in cases:
        strings.extend(row.get(key) for key in ["title_en", "description_en"] if row.get(key))
        strings.extend(json_segments(parse_json(row.get("devices_en"), [])))
        strings.extend(json_segments(parse_json(row.get("parameters_en"), {})))

    for _, source, locale in media:
        source_title = source.get("title_en") or source.get("title")
        source_summary = source.get("summary_en") or source.get("summary")
        source_content = source.get("content_en") or source.get("content")
        if not locale.get("title_es") and source_title:
            strings.append(source_title)
        if not locale.get("summary_es") and source_summary:
            strings.append(source_summary)
        if not locale.get("content_es") and source_content:
            strings.extend(html_segments(source_content))
    return strings


def product_updates(row):
    name = translate_text(row.get("product_name_en"))
    summary = translate_text(row.get("summary_en"))
    p1 = translate_text(row.get("key_parameter_1_en"))
    p2 = translate_text(row.get("key_parameter_2_en"))
    if not summary:
        facts = "; ".join(part for part in [p1, p2] if part)
        summary = f"{name}. {facts}." if facts else name
    detail = translate_html(row.get("detail_html_en"))
    if not detail:
        detail = f"<h3>Descripción del producto</h3><p>{summary}</p>"
    updates = {
        "product_name_es": name,
        "summary_es": summary,
        "key_application_es": translate_text(row.get("key_application_en")),
        "key_parameter_1_es": p1,
        "key_parameter_2_es": p2,
        "parameters_es": translate_json(parse_json(row.get("parameters_en"), {})),
        "detail_html_es": detail,
    }
    english_name = str(row.get("product_name_en") or "")
    if english_name and english_name != name:
        for key, value in list(updates.items()):
            if isinstance(value, str):
                updates[key] = value.replace(english_name, name).replace("Power coverage range", "Rango de potencia")
    return updates


def solution_updates(row):
    raw = parse_json(row.get("raw_json"), {})
    name = translate_text(row.get("product_name_en"))
    summary = translate_text(row.get("summary_en")) or name
    current_detail = str(row.get("detail_html_es") or "")
    detail = translate_html(current_detail) if current_detail else translate_html(row.get("detail_html_en"))
    detail = detail or f"<h2>Resumen de la solución</h2><p>{summary}</p>"
    p1_source = raw.get("key_parameter_1_en") or row.get("key_application_en")
    p2_source = raw.get("key_parameter_2_en") or row.get("summary_en")
    return {
        "product_name_es": name,
        "summary_es": summary,
        "key_application_es": translate_text(row.get("key_application_en")),
        "key_parameter_1_es": translate_text(p1_source),
        "key_parameter_2_es": translate_text(p2_source),
        "parameters_es": parse_json(row.get("parameters_es"), {}) or translate_json(parse_json(row.get("parameters_en"), {})),
        "detail_html_es": detail,
    }


def case_updates(row):
    return {
        "title_es": translate_text(row.get("title_en")),
        "description_es": translate_text(row.get("description_en")),
        "devices_es": translate_json(parse_json(row.get("devices_en"), [])),
        "parameters_es": translate_json(parse_json(row.get("parameters_en"), {})),
        "region_es": translate_text(row.get("region_en")),
        "country_es": translate_text(row.get("country_en")),
    }


def update_database(connection, table, handle, updates):
    row = connection.execute(f"SELECT raw_json FROM {table} WHERE handle = ?", (handle,)).fetchone()
    raw = parse_json(row[0] if row else "{}", {})
    raw.update(updates)
    assignments = []
    values = []
    for key, value in updates.items():
        assignments.append(f"{key} = ?")
        values.append(json.dumps(value, ensure_ascii=False) if isinstance(value, (dict, list)) else value)
    assignments.extend(["raw_json = ?", "updated_at = CURRENT_TIMESTAMP"])
    values.extend([json.dumps(raw, ensure_ascii=False), handle])
    connection.execute(f"UPDATE {table} SET {', '.join(assignments)} WHERE handle = ?", values)


def update_source_json_files(updated_by_kind):
    changed = 0
    roots = [ROOT / "网站资料", ROOT / "public"]

    def visit(value):
        nonlocal changed
        if isinstance(value, dict):
            handle = value.get("handle")
            if handle:
                for kind in ["products", "solutions", "cases"]:
                    if handle in updated_by_kind[kind]:
                        value.update(updated_by_kind[kind][handle])
            for item in value.values():
                visit(item)
        elif isinstance(value, list):
            for item in value:
                visit(item)

    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*.json"):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except Exception:
                continue
            before = json.dumps(data, ensure_ascii=False, sort_keys=True)
            visit(data)
            after = json.dumps(data, ensure_ascii=False, sort_keys=True)
            if after != before:
                path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                changed += 1
    return changed


def sync_public_media(locales):
    path = ROOT / "public" / "media" / "news_data.json"
    records = json.loads(path.read_text(encoding="utf-8"))
    for item in records:
        item.update(locales.get(item.get("id"), {}))
    path.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalize_local_value(value, english_name="", spanish_name=""):
    if isinstance(value, dict):
        return {
            normalize_local_value(key, english_name, spanish_name): normalize_local_value(item, english_name, spanish_name)
            for key, item in value.items()
        }
    if isinstance(value, list):
        return [normalize_local_value(item, english_name, spanish_name) for item in value]
    if not isinstance(value, str):
        return value
    result = clean_source(value)
    if english_name and spanish_name:
        result = result.replace(english_name, spanish_name)
    result = (
        result.replace("Power coverage range", "Rango de potencia")
        .replace("N-TET's", "La propuesta de N-TET")
        .replace("N-TET?s", "La propuesta de N-TET")
    )
    replacements = {
        "Cómo Operaciones de actualización de vehículos aéreos no tripulados": "Cómo mejoran los UAV las operaciones",
        "Solución Módulos": "Módulos de la solución",
        "Relacionado Equipo": "Equipos relacionados",
        "Monitoreo costero y emergencia las 24 horas Respuesta": "Monitoreo costero y respuesta de emergencia las 24 horas",
        "Integrated Multi-Payload Detection": "Detección integrada con varias cargas útiles",
        "Fuerte adaptabilidad a complejos Entornos": "Adaptación a entornos complejos",
        "Trazable y cuantificable Datos": "Datos trazables y cuantificables",
        "FC-RM10X UAV Parámetros centrales del motor": "Parámetros principales del motor UAV FC-RM10X",
        "durante la noche operaciones": "durante las operaciones nocturnas",
        "plug-and-play": "de conexión directa",
        "Noche rescate": "Rescate nocturno",
        "UAV Plataforma": "Plataforma UAV",
        "Control remoto inteligente Controlador": "Controlador remoto inteligente",
        "Operación Método": "Método de operación",
        "Protección automática de temperatura Punto": "Umbral de protección térmica automática",
        "Vuelo Caja": "Caja de transporte",
        "Principal Parámetros": "Parámetros principales",
        "corredores. ambientes.": "entornos de corredores.",
        "Químico Las instalaciones": "Las instalaciones químicas",
        "Iluminación conectada UAV": "Iluminación mediante UAV cautivo",
        "UAV de iluminación atada": "UAV cautivo de iluminación",
        "Comunicación de emergencia UAV atada": "UAV cautivo de comunicación de emergencia",
        "Comunicación de emergencia UAV atado": "UAV cautivo de comunicación de emergencia",
        "Drone de búsqueda y rescate de emergencia": "Dron de búsqueda y rescate de emergencia",
        "Sistema atado": "Sistema cautivo",
        "Batería conectada": "Batería del sistema cautivo",
        "Batería de respaldo atada": "Batería de respaldo del sistema cautivo",
        "Caja de vuelo de transporte": "Caja de transporte",
        "carga útil máxima 5 kg; resistencia al viento >=Nivel 6": "carga útil máxima de 5 kg; resistencia al viento ≥ nivel 6",
        "Entrada AC220V, salida DC380-420V, longitud del cable >=100m": "Entrada de 220 V CA, salida de 380-420 V CC, longitud del cable ≥100 m",
        "12S litio batería, capacidad >=12000 mAh": "batería de litio 12S, capacidad ≥12 000 mAh",
        "madera resistente al fuego con bordes de aluminio, almacena el equipo de vuelo completo establezca": "madera resistente al fuego con bordes de aluminio; almacena el conjunto completo del equipo de vuelo",
        "Potencia nominal 18kW, 40L tanque de combustible": "potencia nominal de 18 kW; depósito de combustible de 40 L",
        "5 kg maximum payload; wind resistance >= Nivel 6": "Carga útil máxima de 5 kg; resistencia al viento ≥ nivel 6",
        "AC220V input, DC380-420V output; cable length >=100 m": "Entrada de 220 V CA, salida de 380-420 V CC; longitud del cable ≥100 m",
        "Built-in 7-inch touch display; >=16 canales de control remoto": "Pantalla táctil integrada de 7 pulgadas; ≥16 canales de control remoto",
        "Power >=500 W; luminous flux >=80000 lm": "Potencia ≥500 W; flujo luminoso ≥80 000 lm",
        "12S lithium battery; capacity >=12000mAh": "Batería de litio 12S; capacidad ≥12 000 mAh",
        "Operación Modo": "Modo de operación",
        "Operación Frecuencia": "Frecuencia de operación",
        "Dirección Precisión": "Precisión de radiogoniometría",
        "Identificación Tiempo": "Tiempo de identificación",
        "Pantalla Tamaño": "Tamaño de pantalla",
        "Estándar interfaces": "Interfaces estándar",
        "otros Equipo C-UAS": "otros equipos C-UAS",
        "fuerte estabilidad EMC capacidad": "buena compatibilidad electromagnética (EMC)",
        "dron intrusiones": "intrusiones de drones",
        "tipo/modelo de drone, control de vuelo. señales": "tipo y modelo de dron, señales de control de vuelo",
        "tipo/modelo de drone, señales": "tipo y modelo de dron, señales",
        "estado del vuelo del drone": "estado de vuelo del dron",
        "High throughput rate, >60 personas/minuto.": "Alto rendimiento de paso: más de 60 personas por minuto.",
        "Built-in large-capacity lithium battery, normal operation >24 horas.": "Batería de litio integrada de gran capacidad, con más de 24 horas de funcionamiento normal.",
        "ferromagnéticos material": "materiales ferromagnéticos",
        "electromagnéticos dañinos ondas": "ondas electromagnéticas nocivas",
        "nivel NT": "nivel de nanoteslas",
        "para detección ferromagnética elementos": "para localizar elementos ferromagnéticos",
        "advertencia jerárquica indicadores": "indicadores de advertencia jerárquica",
        "cuerpo de columna de 5,9 kg (ligero columna)": "cuerpo de columna ligero de 5,9 kg",
        "Soportes internos de batería de litio > 24 horas de funcionamiento; Carga tipo C": "Batería interna de litio con más de 24 horas de funcionamiento; carga mediante USB Type-C",
        "Edge Smart Box": "Unidad inteligente de borde",
        "ópticas o térmicas módulos": "módulos ópticos o térmicos",
        "video en tiempo real de la escena del incendio. retorno.": "video en tiempo real de la escena del incendio.",
        "desde cerca alcance.": "a corta distancia.",
        "el acceso. rutas.": "las rutas de acceso.",
        "área de rescate soporte de visibilidad": "apoyo visual para el área de rescate",
        "energía solar en el sitio recursos.": "recursos solares disponibles en el sitio.",
        "respaldo de emergencia energía": "energía de respaldo de emergencia",
        "fuera de la red operación": "operación fuera de la red",
        "Generador diésel Acceso": "Acceso al generador diésel",
        "Seguridad y mantenimiento Módulo": "Módulo de seguridad y mantenimiento",
        "centros comerciales y oficinas edificios": "centros comerciales y edificios de oficinas",
        "industrial y sin emisiones de carbono parques": "parques industriales y de cero emisiones de carbono",
        "menos de 10 ms conmutación": "conmutación en menos de 10 ms",
        "150kW grupo electrógeno": "grupo electrógeno de 150 kW",
        "Aprox. 199.5g (including battery)": "Aprox. 199,5 g (incluida la batería)",
        "Battery capacity": "Capacidad de la batería",
        "para soportar el funcionamiento normal y manejar equipos menores fallas": "para mantener el funcionamiento normal y resolver fallas menores del equipo",
        "para mantener la energía normal Suministra": "para mantener un suministro eléctrico estable",
        "Técnico Parámetros": "Parámetros técnicos",
        "Máx. Empuje": "Empuje máximo",
        "Peso del tren motriz (individual) unidad)": "Peso de una unidad del tren motriz",
        "Cable Longitud": "Longitud del cable",
        "Máximo permitido Voltaje": "Tensión máxima permitida",
        "Corriente máxima máxima": "Corriente máxima de pico",
        "FC-RM10X INDUSTRY PROFESSIONAL EDITION": "FC-RM10X, EDICIÓN PROFESIONAL INDUSTRIAL",
        "INDUSTRY PROFESSIONAL EDITION": "EDICIÓN PROFESIONAL INDUSTRIAL",
        "930g(with2810 Hélice plegable AW)": "930 g (con hélice plegable AW 2810)",
        "Producto Descripción general": "Descripción general del producto",
        "Desechos flotantes en ríos y lagos Detección": "Detección de residuos flotantes en ríos y lagos",
        "áreas de agua anormales cambios": "cambios anómalos en las masas de agua",
        "restauración resultados": "resultados de restauración",
        "Barrier Lake": "lago de barrera",
        "Puente Plataforma": "Configuración del puente",
        "Bailey tipo": "tipo Bailey",
        "componentes elevación": "elevación de componentes",
        "MONOPHASE": "MONOFÁSICO",
        "THREE-PHASE": "TRIFÁSICO",
        "Alimentación Factor": "Factor de potencia",
        "Esp ine": "Motor",
        "V-Twin, cuatro tiempos, aire forzado Refrigeración": "Bicilíndrico en V, cuatro tiempos, refrigeración por aire forzado",
        "Petróleo Volumen": "Capacidad de aceite",
        "E-Start/(interrupción opcional ATS Self-Start)": "Arranque eléctrico (ATS opcional para arranque automático)",
        "Eléctrico inicie": "Arranque eléctrico",
        "O allí": "Depósito de combustible",
        "Combustible Capacidad": "Capacidad",
        "Rendimiento máximo potencia": "Potencia máxima de salida",
        "N.W.": "Peso neto",
        "Vuelo máximo Velocidad": "Velocidad máxima de vuelo",
        "Focal de imágenes térmicas Longitud": "Distancia focal de imagen térmica",
        "Almacenamiento de imágenes Formato": "Formato de almacenamiento de imágenes",
        "Portador Ancho de banda": "Ancho de banda de la portadora",
        "Transmisión Sistema": "Sistema de transmisión",
        "Operación Entorno": "Entorno operativo",
        "Feed Método": "Método de alimentación",
        "Enlace descendente de celda única Tarifa": "Velocidad de enlace descendente de una sola celda",
        "Enfriamiento pasivo sin ventilador diseño": "Diseño de refrigeración pasiva sin ventilador",
        "control de velocidad y ángulo control": "control de velocidad y de ángulo",
        "Manguera de agua Longitud": "Longitud de la manguera de agua",
        "Boquilla Longitud": "Longitud de la boquilla",
        "Romper ventanas Capacidad": "Capacidad de rotura de ventanas",
        "Arranque eléctrico Parámetro": "Parámetro de encendido eléctrico",
        "Vuelo en modo atado Tiempo": "Tiempo de vuelo en modo cautivo",
        "Fuente de alimentación conectada": "Fuente de alimentación del sistema cautivo",
        "UAV atado": "UAV cautivo",
        "UAV atada": "UAV cautivo",
        "modo atado": "modo cautivo",
        "≥1 0km": "≥10 km",
        "max 15 m/s": "máx. 15 m/s",
        "0,3 m3 tanque": "tanque de 0,3 m³",
        "Multitud": "Capacidad de la cabina",
        "Salida Voltaje": "Tensión de salida",
        "> Voltaje<": ">Tensión<",
        "todo conjunto de carga útil": "el conjunto completo de cargas útiles",
    }
    for source, replacement in replacements.items():
        result = result.replace(source, replacement)
    return re.sub(r"</?g\b[^>]*>", "", result)


def offline_finalize(connection):
    connection.row_factory = sqlite3.Row
    global HANDLE_LABELS
    for handle, english, current in connection.execute(
        "SELECT handle, product_name_en, COALESCE(product_name_es, product_name_en) FROM products"
    ):
        HANDLE_LABELS[handle] = MANUAL_TRANSLATIONS.get(english, current)
    for handle, english, current in connection.execute(
        "SELECT handle, product_name_en, COALESCE(product_name_es, product_name_en) FROM solutions"
    ):
        HANDLE_LABELS[handle] = MANUAL_TRANSLATIONS.get(english, current)
    for handle, label in connection.execute("SELECT handle, COALESCE(title_es, title_en) FROM cases"):
        HANDLE_LABELS[handle] = label

    updated_by_kind = {"products": {}, "solutions": {}, "cases": {}}
    for row in connection.execute("SELECT * FROM products"):
        english_name = str(row["product_name_en"] or "")
        spanish_name = MANUAL_TRANSLATIONS.get(english_name, str(row["product_name_es"] or english_name))
        updates = {
            "product_name_es": spanish_name,
            "summary_es": normalize_local_value(row["summary_es"], english_name, spanish_name),
            "key_application_es": normalize_local_value(row["key_application_es"], english_name, spanish_name),
            "key_parameter_1_es": normalize_local_value(row["key_parameter_1_es"], english_name, spanish_name),
            "key_parameter_2_es": normalize_local_value(row["key_parameter_2_es"], english_name, spanish_name),
            "parameters_es": normalize_local_value(parse_json(row["parameters_es"], {}), english_name, spanish_name),
            "detail_html_es": normalize_local_value(row["detail_html_es"], english_name, spanish_name),
        }
        if not updates["key_parameter_1_es"]:
            updates["key_parameter_1_es"] = updates["key_application_es"]
        if not updates["key_parameter_2_es"]:
            updates["key_parameter_2_es"] = updates["summary_es"]
        updated_by_kind["products"][row["handle"]] = updates
        update_database(connection, "products", row["handle"], updates)

    for row in connection.execute("SELECT * FROM solutions"):
        english_name = str(row["product_name_en"] or "")
        spanish_name = MANUAL_TRANSLATIONS.get(english_name, str(row["product_name_es"] or english_name))
        detail = normalize_local_value(row["detail_html_es"], english_name, spanish_name)
        for handle, label in HANDLE_LABELS.items():
            detail = re.sub(rf"(?<![/\w-]){re.escape(handle)}(?![\w-])", label, detail)
        updates = {
            "product_name_es": spanish_name,
            "summary_es": normalize_local_value(row["summary_es"], english_name, spanish_name),
            "key_application_es": normalize_local_value(row["key_application_es"], english_name, spanish_name),
            "key_parameter_1_es": normalize_local_value(row["key_parameter_1_es"], english_name, spanish_name),
            "key_parameter_2_es": normalize_local_value(row["key_parameter_2_es"], english_name, spanish_name),
            "parameters_es": normalize_local_value(parse_json(row["parameters_es"], {}), english_name, spanish_name),
            "detail_html_es": detail,
        }
        if not updates["key_parameter_1_es"]:
            updates["key_parameter_1_es"] = updates["key_application_es"]
        if not updates["key_parameter_2_es"]:
            updates["key_parameter_2_es"] = updates["summary_es"]
        updated_by_kind["solutions"][row["handle"]] = updates
        update_database(connection, "solutions", row["handle"], updates)

    locales = json.loads(MEDIA_LOCALES_PATH.read_text(encoding="utf-8"))
    for row in connection.execute("SELECT id, raw_json FROM media"):
        locale = locales.get(row["id"], {})
        raw = parse_json(row["raw_json"], {})
        raw.update(locale)
        if raw.get("content_es"):
            raw["content_es"] = normalize_local_value(raw["content_es"])
            locale["content_es"] = raw["content_es"]
        connection.execute(
            "UPDATE media SET title_es = ?, content_es = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (locale.get("title_es", ""), locale.get("content_es", ""), json.dumps(raw, ensure_ascii=False), row["id"]),
        )

    connection.commit()
    MEDIA_LOCALES_PATH.write_text(json.dumps(locales, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    sync_public_media(locales)
    changed_sources = update_source_json_files(updated_by_kind)
    print(f"Offline Spanish finalization complete. Updated {changed_sources} source JSON files.")


def main():
    connection = sqlite3.connect(DB_PATH)
    if len(sys.argv) > 1 and sys.argv[1] == "--offline-finalize":
        offline_finalize(connection)
        connection.close()
        return
    products, solutions, cases, media, locales = prepare_records(connection)
    if len(sys.argv) > 1 and sys.argv[1] == "--sync-public-media":
        connection.close()
        sync_public_media(locales)
        print("Public media locale data synchronized.")
        return
    for handle, label in connection.execute("SELECT handle, COALESCE(product_name_es, product_name_en) FROM products"):
        HANDLE_LABELS[handle] = label
    for handle, label in connection.execute("SELECT handle, COALESCE(product_name_es, product_name_en) FROM solutions"):
        HANDLE_LABELS[handle] = label
    for handle, label in connection.execute("SELECT handle, COALESCE(title_es, title_en) FROM cases"):
        HANDLE_LABELS[handle] = label
    print(
        f"Repair targets: {len(products)} products, {len(solutions)} solutions, "
        f"{len(cases)} cases, {len(media)} media records"
    )
    build_translation_cache(collect_segments(products, solutions, cases, media))

    updated_by_kind = {"products": {}, "solutions": {}, "cases": {}}
    for row in products:
        updates = product_updates(row)
        updated_by_kind["products"][row["handle"]] = updates
        update_database(connection, "products", row["handle"], updates)

    for row in solutions:
        updates = solution_updates(row)
        updated_by_kind["solutions"][row["handle"]] = updates
        update_database(connection, "solutions", row["handle"], updates)

    for row in cases:
        updates = case_updates(row)
        updated_by_kind["cases"][row["handle"]] = updates
        update_database(connection, "cases", row["handle"], updates)

    for row, source, locale in media:
        source_title = source.get("title_en") or source.get("title")
        source_summary = source.get("summary_en") or source.get("summary")
        source_content = source.get("content_en") or source.get("content")
        if not locale.get("title_es"):
            locale["title_es"] = translate_text(source_title)
        if not locale.get("summary_es"):
            locale["summary_es"] = translate_text(source_summary)
        if not locale.get("content_es"):
            locale["content_es"] = translate_html(source_content)
        if not locale.get("summary_es") and locale.get("content_es"):
            plain = re.sub(r"<[^>]+>", " ", locale["content_es"])
            locale["summary_es"] = re.sub(r"\s+", " ", plain).strip()[:240].rstrip(" ,;:") + "."
        raw = parse_json(row.get("raw_json"), {})
        raw.update(locale)
        connection.execute(
            "UPDATE media SET title_es = ?, content_es = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (locale.get("title_es", ""), locale.get("content_es", ""), json.dumps(raw, ensure_ascii=False), row["id"]),
        )

    connection.commit()
    connection.close()
    MEDIA_LOCALES_PATH.write_text(json.dumps(locales, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    sync_public_media(locales)
    changed_sources = update_source_json_files(updated_by_kind)
    print(f"Spanish copy repaired. Updated {changed_sources} source JSON files.")


if __name__ == "__main__":
    main()
