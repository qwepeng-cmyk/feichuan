from __future__ import annotations

import json
import re
import shutil
import sqlite3
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "网站资料" / "无人机配件" / "光电吊舱"
DB = ROOT / "data" / "ntet.db"

CATEGORY_PRIMARY = "uav-accessories"
ACCESSORY_CATEGORY = "electro-optical-gimbals"


SECTION = {
    "可见光": ("Visible Light", "Видимый свет", "Luz visible"),
    "变焦可见光": ("Zoom Visible Light", "Видимый свет с зумом", "Luz visible con zoom"),
    "定焦可见光": ("Fixed-Focus Visible Light", "Видимый свет с фиксированным фокусом", "Luz visible de foco fijo"),
    "短焦可见光": ("Short-Focus Visible Light", "Короткофокусный видимый свет", "Luz visible de foco corto"),
    "长焦可见光": ("Long-Focus Visible Light", "Длиннофокусный видимый свет", "Luz visible de foco largo"),
    "长波红外": ("Long-Wave Infrared", "Длинноволновый ИК", "Infrarrojo de onda larga"),
    "伺服控制": ("Servo Control", "Сервопривод", "Control servo"),
    "单目标跟踪": ("Single-Target Tracking", "Сопровождение одной цели", "Seguimiento de un objetivo"),
    "多目标跟踪": ("Multi-Target Tracking", "Сопровождение нескольких целей", "Seguimiento multiobjetivo"),
    "激光测距": ("Laser Ranging", "Лазерный дальномер", "Telemetria laser"),
    "热成像": ("Thermal Imaging", "Тепловизор", "Imagen termica"),
    "尺寸重量": ("Dimensions and Weight", "Габариты и вес", "Dimensiones y peso"),
    "环境适应性": ("Environmental Adaptability", "Условия эксплуатации", "Adaptabilidad ambiental"),
    "环境参数": ("Environmental Parameters", "Условия эксплуатации", "Parametros ambientales"),
    "视频与存储": ("Video and Storage", "Видео и хранение", "Video y almacenamiento"),
    "电源特性": ("Power Characteristics", "Питание", "Caracteristicas de alimentacion"),
    "电气接口": ("Electrical Interface", "Электрические интерфейсы", "Interfaz electrica"),
    "目标": ("Target", "Цель", "Objetivo"),
}

LABEL = {
    "工作波段": ("Operating Band", "Рабочий диапазон", "Banda de operacion"),
    "分辨率": ("Resolution", "Разрешение", "Resolucion"),
    "焦距": ("Focal Length", "Фокусное расстояние", "Distancia focal"),
    "等效焦距": ("Equivalent Focal Length", "Эквивалентное фокусное расстояние", "Distancia focal equivalente"),
    "视场角": ("Field of View", "Угол обзора", "Campo de vision"),
    "水平视场角": ("Horizontal Field of View", "Горизонтальный угол обзора", "Campo de vision horizontal"),
    "探测器": ("Detector", "Детектор", "Detector"),
    "光学变焦": ("Optical Zoom", "Оптический зум", "Zoom optico"),
    "探测距离": ("Detection Distance", "Дальность обнаружения", "Distancia de deteccion"),
    "识别距离": ("Recognition Distance", "Дальность распознавания", "Distancia de reconocimiento"),
    "航向范围": ("Yaw Range", "Диапазон рыскания", "Rango de guinada"),
    "俯仰范围": ("Pitch Range", "Диапазон тангажа", "Rango de cabeceo"),
    "滚转范围": ("Roll Range", "Диапазон крена", "Rango de alabeo"),
    "目标类型": ("Target Type", "Тип цели", "Tipo de objetivo"),
    "跟踪速率": ("Tracking Rate", "Скорость сопровождения", "Velocidad de seguimiento"),
    "更新帧率": ("Update Frame Rate", "Частота обновления", "Frecuencia de actualizacion"),
    "波段": ("Band", "Диапазон", "Banda"),
    "工作波长": ("Operating Wavelength", "Рабочая длина волны", "Longitud de onda de operacion"),
    "测距范围": ("Ranging Range", "Диапазон измерения", "Rango de medicion"),
    "测距精度": ("Ranging Accuracy", "Точность измерения", "Precision de medicion"),
    "测距频率": ("Ranging Frequency", "Частота измерения", "Frecuencia de medicion"),
    "像元尺寸": ("Pixel Size", "Размер пикселя", "Tamano de pixel"),
    "测温": ("Temperature Measurement", "Измерение температуры", "Medicion de temperatura"),
    "尺寸": ("Dimensions", "Габариты", "Dimensiones"),
    "重量": ("Weight", "Вес", "Peso"),
    "工作温度": ("Operating Temperature", "Рабочая температура", "Temperatura de operacion"),
    "存储温度": ("Storage Temperature", "Температура хранения", "Temperatura de almacenamiento"),
    "冲击": ("Shock", "Удар", "Choque"),
    "召回率": ("Recall Rate", "Полнота", "Tasa de recuperacion"),
    "精确率": ("Precision Rate", "Точность", "Tasa de precision"),
    "目标尺寸": ("Target Size", "Размер цели", "Tamano de objetivo"),
    "最小目标尺寸": ("Minimum Target Size", "Минимальный размер цели", "Tamano minimo de objetivo"),
    "跟踪目标数量": ("Tracked Target Count", "Число сопровождаемых целей", "Cantidad de objetivos seguidos"),
    "跟踪跳变率": ("Tracking Jump Rate", "Частота скачков сопровождения", "Tasa de salto de seguimiento"),
    "照片格式": ("Photo Format", "Формат фото", "Formato de foto"),
    "视频格式": ("Video Format", "Формат видео", "Formato de video"),
    "编码格式": ("Encoding Format", "Формат кодирования", "Formato de codificacion"),
    "视频协议": ("Video Protocol", "Видеопротокол", "Protocolo de video"),
    "存储容量": ("Storage Capacity", "Емкость хранения", "Capacidad de almacenamiento"),
    "供电范围": ("Power Supply Range", "Диапазон питания", "Rango de alimentacion"),
    "平均功耗": ("Average Power Consumption", "Среднее энергопотребление", "Consumo medio"),
    "峰值功耗": ("Peak Power Consumption", "Пиковое энергопотребление", "Consumo pico"),
    "通讯接口": ("Communication Interface", "Интерфейс связи", "Interfaz de comunicacion"),
    "视频接口": ("Video Interface", "Видеоинтерфейс", "Interfaz de video"),
    "测角精度": ("Angle Measurement Accuracy", "Точность углового измерения", "Precision de medicion angular"),
    "最大角速度": ("Maximum Angular Velocity", "Макс. угловая скорость", "Velocidad angular maxima"),
    "最大角加速度": ("Maximum Angular Acceleration", "Макс. угловое ускорение", "Aceleracion angular maxima"),
    "角速度": ("Angular Velocity", "Угловая скорость", "Velocidad angular"),
    "角加速度": ("Angular Acceleration", "Угловое ускорение", "Aceleracion angular"),
    "目标识别": ("Target Recognition", "Распознавание целей", "Reconocimiento de objetivos"),
    "目标锁定": ("Target Lock", "Захват цели", "Bloqueo de objetivo"),
}

VALUE_MAP = {
    "en": {
        "人、车、船、飞机": "person, vehicle, vessel, aircraft",
        "通用目标": "general target",
        "支持": "supported",
        "最大2T": "up to 2 TB",
        "最小32x32@1080p": "minimum 32x32 @ 1080p",
        "串口、百兆网、SBUS": "serial port, 100M Ethernet, SBUS",
        "串口、百兆网": "serial port, 100M Ethernet",
        "百兆网": "100M Ethernet",
        "RTSP、UDP等": "RTSP, UDP, etc.",
    },
    "ru": {
        "人、车、船、飞机": "человек, машина, судно, самолет",
        "通用目标": "универсальная цель",
        "支持": "поддерживается",
        "最大2T": "до 2 ТБ",
        "最小32x32@1080p": "мин. 32x32 @ 1080p",
        "串口、百兆网、SBUS": "последовательный порт, 100M Ethernet, SBUS",
        "串口、百兆网": "последовательный порт, 100M Ethernet",
        "百兆网": "100M Ethernet",
        "RTSP、UDP等": "RTSP, UDP, etc.",
    },
    "es": {
        "人、车、船、飞机": "persona, vehiculo, embarcacion, aeronave",
        "通用目标": "objetivo general",
        "支持": "compatible",
        "最大2T": "hasta 2 TB",
        "最小32x32@1080p": "minimo 32x32 @ 1080p",
        "串口、百兆网、SBUS": "puerto serial, Ethernet 100M, SBUS",
        "串口、百兆网": "puerto serial, Ethernet 100M",
        "百兆网": "Ethernet 100M",
        "RTSP、UDP等": "RTSP, UDP, etc.",
    },
}

PRODUCT = {
    "FC-L10TR": {
        "key_application_en": "Ground-target imaging, detection, tracking, and recognition for line inspection, incident survey, emergency response, and field documentation.",
        "key_application_ru": "Съемка, обнаружение, сопровождение и распознавание наземных целей для инспекции линий, анализа инцидентов, экстренного реагирования и полевой фиксации.",
        "key_application_es": "Imagen, deteccion, seguimiento y reconocimiento de objetivos terrestres para inspeccion de lineas, investigacion de incidentes, respuesta de emergencia y documentacion de campo.",
        "key_parameter_1_en": "10x continuous optical zoom + thermal imaging + 905nm laser ranging",
        "key_parameter_1_ru": "10x непрерывный оптический зум + тепловизор + лазерный дальномер 905nm",
        "key_parameter_1_es": "zoom optico continuo 10x + imagen termica + telemetria laser de 905nm",
        "key_parameter_2_en": "5m-1500m laser ranging, weight <=800g",
        "key_parameter_2_ru": "лазерное измерение 5m-1500m, вес <=800g",
        "key_parameter_2_es": "telemetria laser de 5m-1500m, peso <=800g",
    },
    "FC-L40": {
        "key_application_en": "Security, emergency response, inspection, and ecological monitoring with target search, situational awareness, image tracking, and target recognition.",
        "key_application_ru": "Безопасность, экстренное реагирование, инспекция и экологический мониторинг с поиском целей, оценкой обстановки, сопровождением изображения и распознаванием целей.",
        "key_application_es": "Seguridad, emergencia, inspeccion y monitoreo ecologico con busqueda de objetivos, conciencia situacional, seguimiento de imagen y reconocimiento de objetivos.",
        "key_parameter_1_en": "40x visible-light optical zoom",
        "key_parameter_1_ru": "40x оптический зум в видимом свете",
        "key_parameter_1_es": "zoom optico de luz visible 40x",
        "key_parameter_2_en": "Weight <=1kg, dimensions <=Phi115mm x 175mm",
        "key_parameter_2_ru": "вес <=1kg, габариты <=Phi115mm x 175mm",
        "key_parameter_2_es": "peso <=1kg, dimensiones <=Phi115mm x 175mm",
    },
    "FC-L40T": {
        "key_application_en": "Three-axis gyro-stabilized dual-light gimbal for visible-light and thermal target search, tracking, and recognition.",
        "key_application_ru": "Трехосевой гиростабилизированный двухканальный подвес для поиска, сопровождения и распознавания целей в видимом свете и тепловизионном канале.",
        "key_application_es": "Gimbal dual de tres ejes estabilizado por giroscopio para busqueda, seguimiento y reconocimiento con luz visible e imagen termica.",
        "key_parameter_1_en": "Visible light 1920x1080, 40x zoom range 4.25-170mm",
        "key_parameter_1_ru": "видимый свет 1920x1080, диапазон зума 40x 4.25-170mm",
        "key_parameter_1_es": "luz visible 1920x1080, rango de zoom 40x de 4.25-170mm",
        "key_parameter_2_en": "640x512 thermal imaging, weight <=1.1kg",
        "key_parameter_2_ru": "тепловизор 640x512, вес <=1.1kg",
        "key_parameter_2_es": "imagen termica 640x512, peso <=1.1kg",
    },
    "FC-L40TR": {
        "key_application_en": "All-weather observation, image tracking, target recognition, geographic coordinate positioning, and beyond-visual-range situational awareness.",
        "key_application_ru": "Всепогодное наблюдение, сопровождение изображения, распознавание целей, привязка геокоординат и ситуационная осведомленность за пределами прямой видимости.",
        "key_application_es": "Observacion todo tiempo, seguimiento de imagen, reconocimiento de objetivos, posicionamiento por coordenadas geograficas y conciencia situacional mas alla de la linea visual.",
        "key_parameter_1_en": "40x visible light + 640x512 thermal imaging + 1535nm laser ranging",
        "key_parameter_1_ru": "40x видимый свет + тепловизор 640x512 + лазерный дальномер 1535nm",
        "key_parameter_1_es": "luz visible 40x + imagen termica 640x512 + telemetria laser de 1535nm",
        "key_parameter_2_en": "20m-3000m laser ranging, weight <=1.3kg",
        "key_parameter_2_ru": "лазерное измерение 20m-3000m, вес <=1.3kg",
        "key_parameter_2_es": "telemetria laser de 20m-3000m, peso <=1.3kg",
    },
    "FC-L50": {
        "key_application_en": "Security, emergency response, inspection, and ecological monitoring with all-weather target search, situational awareness, image tracking, and target recognition.",
        "key_application_ru": "Безопасность, экстренное реагирование, инспекция и экологический мониторинг с всепогодным поиском целей, оценкой обстановки, сопровождением изображения и распознаванием целей.",
        "key_application_es": "Seguridad, emergencia, inspeccion y monitoreo ecologico con busqueda de objetivos todo tiempo, conciencia situacional, seguimiento de imagen y reconocimiento de objetivos.",
        "key_parameter_1_en": "1280 x 1024 uncooled infrared imaging module",
        "key_parameter_1_ru": "неохлаждаемый ИК-модуль 1280 x 1024",
        "key_parameter_1_es": "modulo infrarrojo no refrigerado de 1280 x 1024",
        "key_parameter_2_en": "50mm thermal focal length, weight <=1.5kg",
        "key_parameter_2_ru": "тепловизионное фокусное расстояние 50mm, вес <=1.5kg",
        "key_parameter_2_es": "distancia focal termica de 50mm, peso <=1.5kg",
    },
    "FC-LN100": {
        "key_application_en": "Ground-target imaging, detection, tracking, and recognition for line guidance and first-person-view requirements.",
        "key_application_ru": "Съемка, обнаружение, сопровождение и распознавание наземных целей для линейного наведения и режима первого лица.",
        "key_application_es": "Imagen, deteccion, seguimiento y reconocimiento de objetivos terrestres para guiado de linea y requisitos de primera persona.",
        "key_parameter_1_en": "4K fixed-focus visible light + 640x512 thermal imaging",
        "key_parameter_1_ru": "4K видимый свет с фиксированным фокусом + тепловизор 640x512",
        "key_parameter_1_es": "luz visible 4K de foco fijo + imagen termica 640x512",
        "key_parameter_2_en": "Weight <=260g, average power 10w",
        "key_parameter_2_ru": "вес <=260g, среднее энергопотребление 10w",
        "key_parameter_2_es": "peso <=260g, consumo medio 10w",
    },
    "FC-LN95": {
        "key_application_en": "Ground-target imaging, detection, tracking, and recognition for line inspection, incident observation, emergency response, and field documentation.",
        "key_application_ru": "Съемка, обнаружение, сопровождение и распознавание наземных целей для инспекции линий, наблюдения инцидентов, экстренного реагирования и полевой фиксации.",
        "key_application_es": "Imagen, deteccion, seguimiento y reconocimiento de objetivos terrestres para inspeccion de lineas, observacion de incidentes, respuesta de emergencia y documentacion de campo.",
        "key_parameter_1_en": "Fixed-focus dual visible-light cameras, 3840x2160 resolution",
        "key_parameter_1_ru": "две камеры видимого света с фиксированным фокусом, разрешение 3840x2160",
        "key_parameter_1_es": "camaras duales de luz visible de foco fijo, resolucion 3840x2160",
        "key_parameter_2_en": "Weight <=260g, dimensions <=Phi64mm x 90mm",
        "key_parameter_2_ru": "вес <=260g, габариты <=Phi64mm x 90mm",
        "key_parameter_2_es": "peso <=260g, dimensiones <=Phi64mm x 90mm",
    },
    "FC-MiniL10TR": {
        "key_application_en": "Broadly compatible with micro and small rotor UAVs for ground-target imaging, detection, tracking, and recognition.",
        "key_application_ru": "Широкая совместимость с микро- и малыми роторными БПЛА для съемки, обнаружения, сопровождения и распознавания наземных целей.",
        "key_application_es": "Amplia compatibilidad con UAV rotores micro y pequenos para imagen, deteccion, seguimiento y reconocimiento de objetivos terrestres.",
        "key_parameter_1_en": "48MP 10x hybrid zoom visible light + infrared + laser ranging",
        "key_parameter_1_ru": "48MP видимый свет с 10x гибридным зумом + ИК + лазерный дальномер",
        "key_parameter_1_es": "luz visible de 48MP con zoom hibrido 10x + infrarrojo + telemetria laser",
        "key_parameter_2_en": "Weight <=400g, dimensions <=95mm x 97mm x 147mm",
        "key_parameter_2_ru": "вес <=400g, габариты <=95mm x 97mm x 147mm",
        "key_parameter_2_es": "peso <=400g, dimensiones <=95mm x 97mm x 147mm",
    },
}


def translate_key(key: str, lang: str) -> str:
    index = {"en": 0, "ru": 1, "es": 2}[lang]
    section, _, label = key.partition(" - ")
    section_text = SECTION.get(section, (section, section, section))[index]
    if not label:
        return section_text
    label_text = LABEL.get(label, (label, label, label))[index]
    return f"{section_text} - {label_text}"


def translate_value(value: object, lang: str) -> str:
    text = str(value)
    if text in VALUE_MAP[lang]:
        return VALUE_MAP[lang][text]
    if "像素/帧" in text:
        unit = {"en": " pixels/frame", "ru": " пикселей/кадр", "es": " pixeles/fotograma"}[lang]
        return text.replace("像素/帧", unit)

    def person_vehicle(match: re.Match[str]) -> str:
        person, vehicle = match.group(1), match.group(2)
        if lang == "en":
            return f"person {person}, vehicle {vehicle}"
        if lang == "ru":
            return f"человек {person}, машина {vehicle}"
        return f"persona {person}, vehiculo {vehicle}"

    text = re.sub(r"人\s*([^，,]+)[，,]\s*车\s*([^，,]+)$", person_vehicle, text)
    text = text.replace("、", ", ").replace("，", ", ").replace("倍", "x").replace("X", "x")
    return re.sub(r"\s+", " ", text).strip()


def translate_params(params: dict[str, object], lang: str) -> dict[str, str]:
    return {translate_key(k, lang): translate_value(v, lang) for k, v in params.items()}


def apply_product_meta(model: str, data: dict[str, object]) -> None:
    meta = PRODUCT[model]
    data.update(meta)
    data["product_name_en"] = f"{model} Electro-Optical Gimbal"
    data["product_name_ru"] = f"{model} электрооптический подвес"
    data["product_name_es"] = f"{model} gimbal electro-optico"
    data["summary_en"] = f"{model} electro-optical gimbal: {meta['key_parameter_1_en']}; {meta['key_parameter_2_en']}."
    data["summary_ru"] = f"{model} электрооптический подвес: {meta['key_parameter_1_ru']}; {meta['key_parameter_2_ru']}."
    data["summary_es"] = f"{model} gimbal electro-optico: {meta['key_parameter_1_es']}; {meta['key_parameter_2_es']}."
    data["detail_html_en"] = (
        f"<p>{model} is an electro-optical gimbal for industrial UAV integration. "
        f"{meta['key_application_en']} Key configuration: {meta['key_parameter_1_en']}; {meta['key_parameter_2_en']}.</p>"
    )
    data["detail_html_ru"] = (
        f"<p>{model} - электрооптический подвес для промышленных БПЛА. "
        f"{meta['key_application_ru']} {meta['key_parameter_1_ru']}; {meta['key_parameter_2_ru']}.</p>"
    )
    data["detail_html_es"] = (
        f"<p>{model} es un gimbal electro-optico para integracion en UAV industriales. "
        f"{meta['key_application_es']} Configuracion clave: {meta['key_parameter_1_es']}; {meta['key_parameter_2_es']}.</p>"
    )


def main() -> None:
    json_files = sorted(SOURCE.glob("*/*.json"))
    if len(json_files) != 8:
        raise SystemExit(f"expected 8 JSON files, found {len(json_files)}")

    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    existing = {}
    for row in conn.execute(
        "select handle, main_image, raw_json from products where category_primary = ?",
        (CATEGORY_PRIMARY,),
    ):
        try:
            raw_json = json.loads(row["raw_json"] or "{}")
        except json.JSONDecodeError:
            raw_json = {}
        existing[row["handle"]] = {"main_image": row["main_image"], "raw_json": raw_json}

    records = []
    for order, json_file in enumerate(json_files, 1):
        data = json.loads(json_file.read_text(encoding="utf-8"))
        model = str(data["product_name"])
        if model not in PRODUCT:
            raise SystemExit(f"missing translation metadata for {model}")

        handle = str(data["handle"])
        params = data.get("parameters") or {}
        if not isinstance(params, dict):
            raise SystemExit(f"{json_file} parameters must be an object")

        prior = existing.get(handle, {})
        prior_raw = prior.get("raw_json") or {}
        main_image = prior.get("main_image") or (
            f"/products/uav-accessories/electro-optical-gimbals/{handle}/{handle}.webp"
        )

        data["main_image"] = main_image
        apply_product_meta(model, data)
        data["parameters_en"] = translate_params(params, "en")
        data["parameters_ru"] = translate_params(params, "ru")
        data["parameters_es"] = translate_params(params, "es")

        raw_json = dict(data)
        raw_json.update(
            {
                "catalog_kind": "accessory",
                "accessory_category": ACCESSORY_CATEGORY,
                "accessory_category_en": "Electro-Optical Gimbals",
                "accessory_category_ru": "Electro-Optical Gimbals",
                "accessory_category_es": "Gimbals electro-opticos",
                "source_path": str(json_file.parent).replace("\\", "/"),
                "product_images": [],
                "category_primary": CATEGORY_PRIMARY,
                "catalog_order": prior_raw.get("catalog_order", 5000 + order),
            }
        )

        json_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        records.append(
            {
                "handle": handle,
                "category_primary": CATEGORY_PRIMARY,
                "main_image": main_image,
                "raw_json": json.dumps(raw_json, ensure_ascii=False),
                "is_published": 1,
                **{
                    key: data[key]
                    for key in (
                        "product_name_en",
                        "product_name_ru",
                        "product_name_es",
                        "summary_en",
                        "summary_ru",
                        "summary_es",
                        "key_application_en",
                        "key_application_ru",
                        "key_application_es",
                        "key_parameter_1_en",
                        "key_parameter_1_ru",
                        "key_parameter_1_es",
                        "key_parameter_2_en",
                        "key_parameter_2_ru",
                        "key_parameter_2_es",
                        "detail_html_en",
                        "detail_html_ru",
                        "detail_html_es",
                    )
                },
                "parameters_en": json.dumps(data["parameters_en"], ensure_ascii=False),
                "parameters_ru": json.dumps(data["parameters_ru"], ensure_ascii=False),
                "parameters_es": json.dumps(data["parameters_es"], ensure_ascii=False),
            }
        )

    backup = DB.with_name(f"{DB.name}.bak.gimbal-i18n-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    shutil.copy2(DB, backup)

    sql = """
        INSERT INTO products (
          handle, product_name_en, product_name_ru, product_name_es,
          category_primary, summary_en, summary_ru, summary_es,
          key_application_en, key_application_ru, key_application_es,
          key_parameter_1_en, key_parameter_1_ru, key_parameter_1_es,
          key_parameter_2_en, key_parameter_2_ru, key_parameter_2_es,
          parameters_en, parameters_ru, parameters_es,
          detail_html_en, detail_html_ru, detail_html_es,
          main_image, raw_json, is_published, updated_at
        ) VALUES (
          :handle, :product_name_en, :product_name_ru, :product_name_es,
          :category_primary, :summary_en, :summary_ru, :summary_es,
          :key_application_en, :key_application_ru, :key_application_es,
          :key_parameter_1_en, :key_parameter_1_ru, :key_parameter_1_es,
          :key_parameter_2_en, :key_parameter_2_ru, :key_parameter_2_es,
          :parameters_en, :parameters_ru, :parameters_es,
          :detail_html_en, :detail_html_ru, :detail_html_es,
          :main_image, :raw_json, :is_published, CURRENT_TIMESTAMP
        )
        ON CONFLICT(handle) DO UPDATE SET
          product_name_en = excluded.product_name_en,
          product_name_ru = excluded.product_name_ru,
          product_name_es = excluded.product_name_es,
          category_primary = excluded.category_primary,
          summary_en = excluded.summary_en,
          summary_ru = excluded.summary_ru,
          summary_es = excluded.summary_es,
          key_application_en = excluded.key_application_en,
          key_application_ru = excluded.key_application_ru,
          key_application_es = excluded.key_application_es,
          key_parameter_1_en = excluded.key_parameter_1_en,
          key_parameter_1_ru = excluded.key_parameter_1_ru,
          key_parameter_1_es = excluded.key_parameter_1_es,
          key_parameter_2_en = excluded.key_parameter_2_en,
          key_parameter_2_ru = excluded.key_parameter_2_ru,
          key_parameter_2_es = excluded.key_parameter_2_es,
          parameters_en = excluded.parameters_en,
          parameters_ru = excluded.parameters_ru,
          parameters_es = excluded.parameters_es,
          detail_html_en = excluded.detail_html_en,
          detail_html_ru = excluded.detail_html_ru,
          detail_html_es = excluded.detail_html_es,
          main_image = excluded.main_image,
          raw_json = excluded.raw_json,
          is_published = excluded.is_published,
          updated_at = CURRENT_TIMESTAMP
    """
    conn.executemany(sql, records)
    conn.commit()
    conn.close()

    print(f"updated_json={len(json_files)}")
    print(f"synced_db_rows={len(records)}")
    print(f"backup={backup}")
    for record in records:
        print(
            record["handle"],
            len(json.loads(record["parameters_en"])),
            len(json.loads(record["parameters_ru"])),
            len(json.loads(record["parameters_es"])),
        )


if __name__ == "__main__":
    main()
