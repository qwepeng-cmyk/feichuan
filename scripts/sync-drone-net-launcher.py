from __future__ import annotations

import json
import shutil
import sqlite3
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "网站资料" / "网捕器"
PUBLIC_DIR = ROOT / "public" / "products" / "handheld-drone-net-launcher"
DB_PATH = ROOT / "data" / "ntet.db"
SNAPSHOT_PATH = ROOT / "data" / "content" / "product-handheld-drone-net-launcher.json"
HANDLE = "handheld-drone-net-launcher"


IMAGE_SOURCES = {
    "handheld-drone-net-launcher.webp": SOURCE_DIR / "网捕器-手持支架.jpg",
    "net-launcher-module.webp": SOURCE_DIR / "网捕器 侧面.png",
    "deployed-capture-net.webp": SOURCE_DIR / "网.jpg",
    "handheld-net-launcher-field-check.webp": SOURCE_DIR / "车间现场-网捕器手持.jpg",
}

VIDEO_SOURCES = {
    "handheld-launch-demo.mp4": SOURCE_DIR / "网捕器手持发射视频.mp4",
    "multi-scenario-demo.mp4": SOURCE_DIR / "网捕器多场景发射演示视频.mp4",
}


def detail_html(locale: str) -> str:
    sections = {
        "en": {
            "what": "What is a handheld drone net launcher?",
            "answer": (
                "A handheld drone net launcher is a portable physical-capture device for trained site-security teams. "
                "This model uses an electronic, non-pressurized drive to deploy a high-strength nylon net at a published "
                "initial speed of 50 m/s. Its effective capture distance is 10–20 m, with a choice of 3.3 × 3.3 m or "
                "5 × 5 m net coverage. The net is intended to wrap the airframe and rotors of a small low-altitude drone "
                "without relying on the target's radio link. The complete net module weighs 370 g and mounts to the supplied "
                "handheld holder for close-range field use. It is a single-use module: after deployment, the net does not "
                "retract into the launcher and the discharged module is not reset in the field. Operators should confirm local "
                "rules, establish a controlled safety area and assess the target's path before use."
            ),
            "features": "Why choose the handheld configuration?",
            "items": [
                "Portable 370 g module for a single trained operator",
                "10–20 m published capture distance for close-range site response",
                "High-strength nylon net with 20 cm mesh",
                "Two selectable net sizes: 3.3 × 3.3 m or 5 × 5 m",
                "Electronic non-pressurized drive with PWM control and reserved safety timing",
            ],
            "limit": "Important operating limitation",
            "note": (
                "The handheld model launches the net outward only. It does not pull the net back, and the net module is not "
                "designed for a second launch after discharge. Replace the spent module before the next operation."
            ),
        },
        "ru": {
            "what": "Что представляет собой ручное устройство сетевого захвата дронов?",
            "answer": (
                "Ручное устройство сетевого захвата дронов — переносное средство физического захвата для подготовленных "
                "сотрудников охраны объекта. Электронный привод без предварительного давления раскрывает высокопрочную "
                "нейлоновую сеть с заявленной начальной скоростью 50 м/с. Рабочая дистанция захвата составляет 10–20 м; "
                "доступны сети 3,3 × 3,3 м и 5 × 5 м. Сеть оборачивается вокруг корпуса и роторов небольшого низколетящего "
                "дрона и не зависит от его радиоканала. Масса сетевого модуля — 370 г. Модуль предназначен для однократного "
                "применения: после раскрытия сеть не втягивается обратно, а сработавший модуль не перезаряжается на месте. "
                "Перед применением оператор должен проверить местные правила, выделить безопасную зону и оценить траекторию цели."
            ),
            "features": "Преимущества ручной конфигурации",
            "items": [
                "Переносной модуль массой 370 г для одного подготовленного оператора",
                "Заявленная дистанция физического захвата 10–20 м",
                "Высокопрочная нейлоновая сеть с ячейкой 20 см",
                "Два размера сети: 3,3 × 3,3 м или 5 × 5 м",
                "Электронный привод без предварительного давления и PWM-управление с защитной задержкой",
            ],
            "limit": "Важное эксплуатационное ограничение",
            "note": (
                "Ручная модель только выбрасывает сеть наружу. Обратное втягивание не предусмотрено, а сетевой модуль "
                "нельзя использовать для второго запуска после срабатывания. Перед следующей операцией установите новый модуль."
            ),
        },
        "es": {
            "what": "¿Qué es un lanzador de red portátil para drones?",
            "answer": (
                "Un lanzador de red portátil para drones es un dispositivo de captura física destinado a equipos de seguridad "
                "del sitio con formación. Este modelo utiliza un accionamiento electrónico sin presión almacenada para desplegar "
                "una red de nailon de alta resistencia a una velocidad inicial publicada de 50 m/s. La distancia efectiva de "
                "captura es de 10–20 m, con redes de 3,3 × 3,3 m o 5 × 5 m. La red envuelve el fuselaje y los rotores de un dron "
                "pequeño de baja altura sin depender de su enlace de radio. El módulo pesa 370 g y se instala en el soporte "
                "portátil suministrado. Es de un solo uso: después del despliegue, la red no vuelve al lanzador y el módulo usado "
                "no se rearma en campo. El operador debe comprobar la normativa local, delimitar una zona segura y evaluar la trayectoria."
            ),
            "features": "¿Por qué elegir la configuración portátil?",
            "items": [
                "Módulo portátil de 370 g para un operador formado",
                "Distancia de captura publicada de 10–20 m",
                "Red de nailon de alta resistencia con malla de 20 cm",
                "Dos tamaños de red: 3,3 × 3,3 m o 5 × 5 m",
                "Accionamiento electrónico sin presión almacenada y control PWM con temporización de seguridad",
            ],
            "limit": "Limitación operativa importante",
            "note": (
                "El modelo portátil solo lanza la red hacia el exterior. No retrae la red y el módulo descargado no permite "
                "un segundo lanzamiento. Instale un módulo nuevo antes de la siguiente operación."
            ),
        },
        "ar": {
            "what": "ما قاذف الشبكة المحمول لالتقاط الطائرات المسيّرة؟",
            "answer": (
                "قاذف الشبكة المحمول جهاز للالتقاط المادي مخصص لفرق أمن المواقع المدربة. يستخدم هذا الطراز مشغلاً إلكترونياً "
                "من دون ضغط مخزن لنشر شبكة نايلون عالية المتانة بسرعة ابتدائية معلنة تبلغ 50 م/ث. تتراوح مسافة الالتقاط "
                "الفعالة بين 10 و20 م، مع خيار شبكة بمقاس 3.3 × 3.3 م أو 5 × 5 م. تلتف الشبكة حول هيكل ومراوح الطائرة "
                "المسيّرة الصغيرة منخفضة الارتفاع من دون الاعتماد على وصلة التحكم اللاسلكية الخاصة بها. يبلغ وزن وحدة الشبكة "
                "370 جم وتثبت على الحامل المحمول المرفق. الوحدة أحادية الاستخدام؛ فبعد النشر لا تعود الشبكة إلى القاذف ولا "
                "تُعاد تهيئة الوحدة المستخدمة في الموقع. يجب على المشغل مراجعة اللوائح المحلية وتحديد منطقة آمنة وتقييم مسار الهدف قبل الاستخدام."
            ),
            "features": "لماذا تختار التهيئة المحمولة؟",
            "items": [
                "وحدة محمولة بوزن 370 جم لمشغل واحد مدرب",
                "مسافة التقاط معلنة من 10 إلى 20 م",
                "شبكة نايلون عالية المتانة بفتحات 20 سم",
                "مقاسان للشبكة: 3.3 × 3.3 م أو 5 × 5 م",
                "مشغل إلكتروني من دون ضغط مخزن وتحكم PWM مع توقيت أمان",
            ],
            "limit": "قيد تشغيلي مهم",
            "note": (
                "يطلق الطراز المحمول الشبكة إلى الخارج فقط. لا يسحب الشبكة مرة أخرى، ولا تسمح الوحدة المستخدمة بإطلاق ثانٍ. "
                "يجب تركيب وحدة جديدة قبل العملية التالية."
            ),
        },
    }
    data = sections[locale]
    items = "".join(f"<li>{item}</li>" for item in data["items"])
    return (
        f"<h2>{data['what']}</h2><p>{data['answer']}</p>"
        f"<h2>{data['features']}</h2><ul>{items}</ul>"
        f"<h2>{data['limit']}</h2><p><strong>{data['note']}</strong></p>"
    )


LOCALIZED = {
    "en": {
        "name": "Handheld Drone Net Launcher",
        "summary": (
            "A portable physical-capture device that deploys a high-strength nylon net across a published 10–20 m range. "
            "The 370 g electronic non-pressurized module is supplied for handheld use and is designed for one launch only; "
            "the net does not retract after deployment."
        ),
        "application": "Application: Close-range physical drone capture by trained site-security teams",
        "param1": "Capture distance: 10–20 m",
        "param2": "Net module: Single-use, non-retractable",
    },
    "ru": {
        "name": "Ручное устройство сетевого захвата дронов",
        "summary": (
            "Переносное устройство физического захвата, раскрывающее высокопрочную нейлоновую сеть на заявленной дистанции "
            "10–20 м. Электронный модуль без предварительного давления массой 370 г предназначен для ручного применения и "
            "одного запуска; после раскрытия сеть не втягивается обратно."
        ),
        "application": "Применение: Физический захват дронов на близкой дистанции подготовленной охраной объекта",
        "param1": "Дистанция захвата: 10–20 м",
        "param2": "Сетевой модуль: Однократный, без обратного втягивания",
    },
    "es": {
        "name": "Lanzador de red portátil para drones",
        "summary": (
            "Dispositivo portátil de captura física que despliega una red de nailon de alta resistencia a una distancia publicada "
            "de 10–20 m. El módulo electrónico sin presión almacenada pesa 370 g, se suministra para uso portátil y permite un "
            "solo lanzamiento; la red no se retrae después del despliegue."
        ),
        "application": "Aplicación: Captura física de drones a corta distancia por equipos de seguridad formados",
        "param1": "Distancia de captura: 10–20 m",
        "param2": "Módulo de red: Un solo uso, no retráctil",
    },
    "ar": {
        "name": "قاذف شبكة محمول لالتقاط الطائرات المسيّرة",
        "summary": (
            "جهاز محمول للالتقاط المادي ينشر شبكة نايلون عالية المتانة ضمن مسافة معلنة من 10 إلى 20 م. تزن الوحدة الإلكترونية "
            "من دون ضغط مخزن 370 جم، وهي مخصصة للاستخدام المحمول وإطلاق واحد فقط؛ ولا تعود الشبكة بعد نشرها."
        ),
        "application": "الاستخدام: التقاط مادي قريب المدى للطائرات المسيّرة بواسطة فرق أمن مواقع مدربة",
        "param1": "مسافة الالتقاط: 10–20 م",
        "param2": "وحدة الشبكة: استخدام واحد وغير قابلة للسحب",
    },
}


PARAMETERS = {
    "en": {
        "Module dimensions": "129 × 75 × 75 mm",
        "Module weight": "370 g",
        "Published net speed": "50 m/s",
        "Effective capture distance": "10–20 m",
        "Mesh opening": "20 cm",
        "Net coverage options": "3.3 × 3.3 m / 5 × 5 m",
        "Net material": "High-strength nylon cord with molded nylon housing",
        "Drive": "Electronic, non-pressurized",
        "Control": "PWM with reserved safety timing",
        "Reuse": "Single-use net module; no post-launch retraction",
    },
    "ru": {
        "Размеры модуля": "129 × 75 × 75 мм",
        "Масса модуля": "370 г",
        "Заявленная скорость сети": "50 м/с",
        "Эффективная дистанция захвата": "10–20 м",
        "Размер ячейки": "20 см",
        "Варианты площади сети": "3,3 × 3,3 м / 5 × 5 м",
        "Материал сети": "Высокопрочный нейлоновый шнур и литой нейлоновый корпус",
        "Привод": "Электронный, без предварительного давления",
        "Управление": "PWM с защитной задержкой",
        "Повторное использование": "Сетевой модуль однократный; обратного втягивания нет",
    },
    "es": {
        "Dimensiones del módulo": "129 × 75 × 75 mm",
        "Peso del módulo": "370 g",
        "Velocidad publicada de la red": "50 m/s",
        "Distancia efectiva de captura": "10–20 m",
        "Abertura de malla": "20 cm",
        "Opciones de cobertura": "3,3 × 3,3 m / 5 × 5 m",
        "Material de la red": "Cordón de nailon de alta resistencia y carcasa de nailon moldeado",
        "Accionamiento": "Electrónico, sin presión almacenada",
        "Control": "PWM con temporización de seguridad",
        "Reutilización": "Módulo de un solo uso; sin retracción posterior",
    },
    "ar": {
        "أبعاد الوحدة": "129 × 75 × 75 مم",
        "وزن الوحدة": "370 جم",
        "سرعة الشبكة المعلنة": "50 م/ث",
        "مسافة الالتقاط الفعالة": "10–20 م",
        "فتحة الشبكة": "20 سم",
        "خيارات مساحة الشبكة": "3.3 × 3.3 م / 5 × 5 م",
        "مادة الشبكة": "حبل نايلون عالي المتانة وهيكل نايلون مصبوب",
        "المشغل": "إلكتروني، من دون ضغط مخزن",
        "التحكم": "PWM مع توقيت أمان",
        "إعادة الاستخدام": "وحدة أحادية الاستخدام؛ لا يوجد سحب بعد الإطلاق",
    },
}


def build_record() -> dict[str, object]:
    record: dict[str, object] = {
        "handle": HANDLE,
        "category_primary": "drone-detection",
        "main_image": "/products/handheld-drone-net-launcher/handheld-drone-net-launcher.webp",
        "is_published": 1,
        "catalog_group": "Portable C-UAS Devices",
        "catalog_order": 45,
        "category_by_mission_application": "Physical Drone Capture",
        "gallery_images": [
            "/products/handheld-drone-net-launcher/handheld-drone-net-launcher.webp",
            "/products/handheld-drone-net-launcher/net-launcher-module.webp",
            "/products/handheld-drone-net-launcher/deployed-capture-net.webp",
            "/products/handheld-drone-net-launcher/handheld-net-launcher-field-check.webp",
        ],
        "videos": [
            {"src": "/products/handheld-drone-net-launcher/handheld-launch-demo.mp4", "kind": "handheld"},
            {"src": "/products/handheld-drone-net-launcher/multi-scenario-demo.mp4", "kind": "multi-scenario"},
        ],
        "source_notes": {
            "product_specification": "网站资料/网捕器/16网捕器.docx",
            "operating_instructions": "网站资料/网捕器/网捕器使用说明.docx",
            "supplier_reference": "https://www.hyuav.com/solutiondetails/49.html",
            "scope": "Handheld model only; dual-launch bracket, AI gimbal and multi-device configurations excluded.",
        },
    }
    for locale, data in LOCALIZED.items():
        record[f"product_name_{locale}"] = data["name"]
        record[f"summary_{locale}"] = data["summary"]
        record[f"key_application_{locale}"] = data["application"]
        record[f"key_parameter_1_{locale}"] = data["param1"]
        record[f"key_parameter_2_{locale}"] = data["param2"]
        record[f"parameters_{locale}"] = PARAMETERS[locale]
        record[f"detail_html_{locale}"] = detail_html(locale)
    return record


def sync_assets() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    for file_name, source in IMAGE_SOURCES.items():
        if not source.exists():
            raise FileNotFoundError(source)
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "RGBA"):
                image = image.convert("RGBA" if "transparency" in image.info else "RGB")
            image.save(PUBLIC_DIR / file_name, "WEBP", quality=84, method=6)

    for file_name, source in VIDEO_SOURCES.items():
        if not source.exists():
            raise FileNotFoundError(source)
        target = PUBLIC_DIR / file_name
        if target.exists():
            target.chmod(0o666)
        shutil.copyfile(source, target)


def sync_database(record: dict[str, object]) -> None:
    columns = [
        "handle", "product_name_en", "product_name_ru", "product_name_es", "product_name_ar",
        "category_primary", "summary_en", "summary_ru", "summary_es", "summary_ar",
        "key_application_en", "key_application_ru", "key_application_es", "key_application_ar",
        "key_parameter_1_en", "key_parameter_1_ru", "key_parameter_1_es", "key_parameter_1_ar",
        "key_parameter_2_en", "key_parameter_2_ru", "key_parameter_2_es", "key_parameter_2_ar",
        "parameters_en", "parameters_ru", "parameters_es", "parameters_ar",
        "detail_html_en", "detail_html_ru", "detail_html_es", "detail_html_ar",
        "main_image", "is_published", "raw_json",
    ]
    values: dict[str, object] = {}
    for column in columns:
        if column == "raw_json":
            continue
        value = record[column]
        if column.startswith("parameters_"):
            value = json.dumps(value, ensure_ascii=False)
        values[column] = value
    values["raw_json"] = json.dumps(record, ensure_ascii=False)

    placeholders = ", ".join(f":{column}" for column in columns)
    updates = ",\n            ".join(
        f"{column} = excluded.{column}" for column in columns if column != "handle"
    )
    sql = f"""
        INSERT INTO products ({', '.join(columns)})
        VALUES ({placeholders})
        ON CONFLICT(handle) DO UPDATE SET
            {updates},
            updated_at = CURRENT_TIMESTAMP
    """

    connection = sqlite3.connect(DB_PATH)
    try:
        with connection:
            connection.execute(sql, values)
            connection.execute(
                """
                INSERT INTO compliance_content_rules (content_type, handle, tier, note)
                VALUES ('product', ?, 'normal', ?)
                ON CONFLICT(content_type, handle) DO UPDATE SET
                    tier = excluded.tier,
                    note = excluded.note,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    HANDLE,
                    "A-layer physical net capture product. Handheld, single-use, non-retractable configuration only.",
                ),
            )
    finally:
        connection.close()


def main() -> None:
    record = build_record()
    sync_assets()
    sync_database(record)
    SNAPSHOT_PATH.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT_PATH.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {HANDLE}")


if __name__ == "__main__":
    main()
