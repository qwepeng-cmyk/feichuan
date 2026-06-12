from __future__ import annotations

import json
import shutil
import sqlite3
from dataclasses import dataclass, field
from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import Optional
from zipfile import ZipFile

from docx import Document
from docx.oxml.ns import qn
from PIL import Image

from uav_docx_content import apply_docx_content


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "网站资料" / "01大无人机"
PUBLIC_UAV_DIR = ROOT / "public" / "products" / "uav-systems"
DB_PATH = ROOT / "data" / "ntet.db"

UAV_CATEGORY = "uav-drone-systems"


@dataclass
class ProductRecord:
    handle: str
    product_name: str
    product_name_en: str
    product_name_ru: str
    summary: str
    summary_en: str
    summary_ru: str
    key_application: str
    key_application_en: str
    key_application_ru: str
    key_parameter_1: str
    key_parameter_1_en: str
    key_parameter_1_ru: str
    key_parameter_2: str
    key_parameter_2_en: str
    key_parameter_2_ru: str
    parameters: dict[str, str]
    parameters_en: dict[str, str]
    parameters_ru: dict[str, str]
    detail_html: str
    detail_html_en: str
    detail_html_ru: str
    main_image: str
    json_path: Path
    source_docx: Optional[Path] = None
    direct_image_source: Optional[Path] = None
    docx_image_index: int = 0
    category_by_flight_platform: str = ""
    category_by_mission_application: str = ""
    catalog_group: str = ""
    catalog_order: int = 0
    is_published: int = 1
    extra: dict[str, object] = field(default_factory=dict)

    def to_json(self) -> dict[str, object]:
        data: dict[str, object] = {
            "product_name": self.product_name,
            "product_name_en": self.product_name_en,
            "summary": self.summary,
            "summary_en": self.summary_en,
            "key_application": self.key_application,
            "key_application_en": self.key_application_en,
            "key_parameter_1": self.key_parameter_1,
            "key_parameter_1_en": self.key_parameter_1_en,
            "key_parameter_2": self.key_parameter_2,
            "key_parameter_2_en": self.key_parameter_2_en,
            "parameters": self.parameters,
            "parameters_en": self.parameters_en,
            "detail_html": self.detail_html,
            "detail_html_en": self.detail_html_en,
            "main_image": self.main_image,
            "handle": self.handle,
            "category_primary": UAV_CATEGORY,
            "category_by_flight_platform": self.category_by_flight_platform,
            "category_by_mission_application": self.category_by_mission_application,
            "catalog_group": self.catalog_group,
            "catalog_order": self.catalog_order,
            "product_name_ru": self.product_name_ru,
            "summary_ru": self.summary_ru,
            "key_application_ru": self.key_application_ru,
            "key_parameter_1_ru": self.key_parameter_1_ru,
            "key_parameter_2_ru": self.key_parameter_2_ru,
            "parameters_ru": self.parameters_ru,
            "detail_html_ru": self.detail_html_ru,
            "is_published": self.is_published,
        }

        if self.source_docx:
            data["source_docx"] = str(self.source_docx.relative_to(ROOT)).replace("\\", "/")

        data.update(self.extra)
        return data


def p(*parts: str) -> Path:
    return DATA_DIR.joinpath(*parts)


def public_path(file_name: str) -> str:
    return f"/products/uav-systems/{file_name}"


def image_path(file_name: str) -> Path:
    return PUBLIC_UAV_DIR / file_name


def details_en(features: list[str], image: str) -> str:
    items = "".join(f"<li>{item}</li>" for item in features)
    return (
        f"<h4>Features</h4><ul>{items}</ul>"
        f'<div class="product-images"><img src="{image}" alt="" style="max-width:100%;" /></div>'
    )


def details_cn(features: list[str], image: str) -> str:
    items = "".join(f"<li>{item}</li>" for item in features)
    return (
        f"<h4>功能特点</h4><ul>{items}</ul>"
        f'<div class="product-images"><img src="{image}" alt="" style="max-width:100%;" /></div>'
    )


def details_ru(features: list[str]) -> str:
    items = "".join(f"<li>{item}</li>" for item in features)
    return f"<h4>Особенности</h4><ul>{items}</ul>"


def convert_direct_image(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as img:
        save_webp(img, target)


def extract_docx_image(docx: Path, target: Path, index: int = 0) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(docx) as zf:
        media = [
            name for name in zf.namelist()
            if name.startswith("word/media/") and not name.endswith("/")
        ]
        if not media:
            raise ValueError(f"No media images found in {docx}")
        selected = media[min(index, len(media) - 1)]
        with Image.open(BytesIO(zf.read(selected))) as img:
            save_webp(img, target)


def extract_docx_images(docx: Path, first_target: Path, handle: str) -> list[str]:
    doc = Document(docx)
    paths: list[str] = []
    seen_occurrences = 0
    for blip in doc.element.xpath(".//a:blip"):
        rel_id = blip.get(qn("r:embed"))
        if not rel_id:
            continue
        part = doc.part.related_parts[rel_id]
        target = first_target if seen_occurrences == 0 else PUBLIC_UAV_DIR / f"{handle}-{seen_occurrences + 1:02d}.webp"
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(BytesIO(part.blob)) as img:
            save_webp(img, target)
        paths.append("/" + str(target.relative_to(ROOT / "public")).replace("\\", "/"))
        seen_occurrences += 1
    return paths


def save_webp(img: Image.Image, target: Path) -> None:
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    else:
        img = img.convert("RGB")

    img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    img.save(target, "WEBP", quality=82, method=6)


def write_json(record: ProductRecord) -> None:
    record.json_path.parent.mkdir(parents=True, exist_ok=True)
    record.json_path.write_text(
        json.dumps(record.to_json(), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def sync_db(records: list[ProductRecord]) -> Path:
    backup = DB_PATH.with_name(
        f"{DB_PATH.name}.bak.uav-products-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )
    shutil.copy2(DB_PATH, backup)

    sql = """
        INSERT INTO products (
            handle, product_name_en, product_name_ru, category_primary,
            summary_en, summary_ru, key_application_en, key_application_ru,
            key_parameter_1_en, key_parameter_1_ru, key_parameter_2_en, key_parameter_2_ru,
            parameters_en, parameters_ru, detail_html_en, detail_html_ru,
            main_image, is_published, raw_json, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(handle) DO UPDATE SET
            product_name_en = excluded.product_name_en,
            product_name_ru = excluded.product_name_ru,
            category_primary = excluded.category_primary,
            summary_en = excluded.summary_en,
            summary_ru = excluded.summary_ru,
            key_application_en = excluded.key_application_en,
            key_application_ru = excluded.key_application_ru,
            key_parameter_1_en = excluded.key_parameter_1_en,
            key_parameter_1_ru = excluded.key_parameter_1_ru,
            key_parameter_2_en = excluded.key_parameter_2_en,
            key_parameter_2_ru = excluded.key_parameter_2_ru,
            parameters_en = excluded.parameters_en,
            parameters_ru = excluded.parameters_ru,
            detail_html_en = excluded.detail_html_en,
            detail_html_ru = excluded.detail_html_ru,
            main_image = excluded.main_image,
            is_published = excluded.is_published,
            raw_json = excluded.raw_json,
            updated_at = CURRENT_TIMESTAMP
    """

    conn = sqlite3.connect(DB_PATH)
    try:
        for record in records:
            data = record.to_json()
            conn.execute(
                sql,
                (
                    record.handle,
                    record.product_name_en,
                    record.product_name_ru,
                    UAV_CATEGORY,
                    record.summary_en,
                    record.summary_ru,
                    record.key_application_en,
                    record.key_application_ru,
                    record.key_parameter_1_en,
                    record.key_parameter_1_ru,
                    record.key_parameter_2_en,
                    record.key_parameter_2_ru,
                    json.dumps(record.parameters_en, ensure_ascii=False),
                    json.dumps(record.parameters_ru, ensure_ascii=False),
                    record.detail_html_en,
                    record.detail_html_ru,
                    record.main_image,
                    record.is_published,
                    json.dumps(data, ensure_ascii=False),
                ),
            )
        conn.commit()
    finally:
        conn.close()

    return backup


def platform_records() -> list[ProductRecord]:
    multi_dir = p("01多旋翼无人机")
    vtol_dir = p("02复合翼无人机")

    multi_specs = [
        ("multi-rotor-3kg-payload-uav", "3kg Payload Multi-Rotor UAV", "3 kg", "FC-X4", "60min", "15m/s", "4-axis / 4-prop", "4000m", "载重3kg无人机.jpg", "载重3kg无人机.json", 1),
        ("multi-rotor-8kg-payload-uav", "8kg Payload Multi-Rotor UAV", "8 kg", "FC-X6", "90min", "15m/s", "6-axis / 6-prop", "4000m", "载重8kg无人机.jpg", "载重8kg无人机.json", 2),
        ("multi-rotor-20kg-payload-uav", "20kg Payload Multi-Rotor UAV", "20 kg", "FC-Z20", "100min", "15m/s", "6-axis / 6-prop", "5000m", "载重20kg无人机.jpg", "载重20kg无人机.json", 3),
        ("multi-rotor-50kg-payload-uav", "50kg Payload Multi-Rotor UAV", "50 kg", "FC-Z50", "55min", "15m/s", "4-axis / 8-prop", "4000m", "载重50kg无人机.png", "载重50kg无人机.json", 4),
    ]

    records: list[ProductRecord] = []
    for handle, name_en, payload, model, endurance, speed, rotors, altitude, source_image, cn_json, order in multi_specs:
        image = public_path(f"{handle}.webp")
        records.append(ProductRecord(
            handle=handle,
            product_name=f"{payload.replace(' ', '')}载重多旋翼无人机",
            product_name_en=name_en,
            product_name_ru=f"Мультироторный БПЛА с нагрузкой {payload}",
            summary=f"{model} 是面向巡检、应急、测绘和载荷运输任务的工业级多旋翼无人机平台，强调快速部署、稳定悬停和模块化载荷适配。",
            summary_en=f"The {model} {name_en} is an industrial multi-rotor platform for inspection, emergency response, mapping, and payload delivery missions, designed for quick deployment and stable low-altitude operation.",
            summary_ru=f"{model} - промышленная мультироторная платформа для инспекции, аварийного реагирования, картографирования и перевозки полезной нагрузки.",
            key_application="应用领域：应急巡查、公共安全巡检、工程测绘、环境监测、物资投送和定点作业。",
            key_application_en="Emergency reconnaissance, public-safety inspection, engineering mapping, environmental monitoring, payload delivery, and point-based aerial operations.",
            key_application_ru="Аварийная разведка, инспекция объектов, инженерная съемка, экологический мониторинг и доставка полезной нагрузки.",
            key_parameter_1=f"空载续航: {endurance}",
            key_parameter_1_en=f"Endurance (No Load): {endurance}",
            key_parameter_1_ru=f"Время полета без нагрузки: {endurance}",
            key_parameter_2=f"标准载重: {payload}",
            key_parameter_2_en=f"Payload: {payload}",
            key_parameter_2_ru=f"Полезная нагрузка: {payload}",
            parameters={
                "型号": model,
                "平台类型": "多旋翼",
                "标准载重": payload,
                "空载续航": endurance,
                "最大飞行速度": speed,
                "旋翼数量": rotors.replace("axis", "轴").replace("prop", "桨"),
                "最大飞行海拔": altitude,
                "抗风等级": "6级",
                "定位系统": "GPS/北斗/伽利略/格洛纳斯",
            },
            parameters_en={
                "Model": model,
                "Platform Type": "Multi-Rotor",
                "Payload": payload,
                "Endurance (No Load)": endurance,
                "Max Flight Speed": speed,
                "Rotor Configuration": rotors,
                "Max Flight Altitude": altitude,
                "Wind Resistance": "Level 6",
                "Positioning System": "GPS / Beidou / Galileo / GLONASS",
            },
            parameters_ru={
                "Модель": model,
                "Тип платформы": "Мультиротор",
                "Полезная нагрузка": payload,
                "Время полета без нагрузки": endurance,
                "Макс. скорость": speed,
                "Конфигурация": rotors,
                "Макс. высота": altitude,
            },
            detail_html=details_cn([
                "模块化载荷接口，适配可见光、红外、喊话、探照、测绘和轻量投送载荷。",
                "多旋翼平台起降条件要求低，适合复杂场地快速部署。",
                "支持多卫星定位、失控返航、低电量返航降落和断点续飞。",
            ], image),
            detail_html_en=details_en([
                "Modular payload interface for visible-light cameras, thermal imaging, loudspeaker, lighting, mapping, and lightweight delivery payloads.",
                "Multi-rotor architecture supports fast deployment from constrained sites.",
                "Multi-constellation positioning with fail-safe return, low-battery landing, and mission resume support.",
            ], image),
            detail_html_ru=details_ru([
                "Модульный интерфейс полезной нагрузки для камер, тепловизоров, освещения и картографирования.",
                "Мультироторная схема подходит для быстрого развертывания на ограниченных площадках.",
                "Поддержка спутникового позиционирования и функций безопасного возврата.",
            ]),
            main_image=image,
            json_path=multi_dir / cn_json,
            source_docx=next(multi_dir.rglob(cn_json.replace(".json", ".docx")), None),
            direct_image_source=multi_dir / "图片素材" / source_image,
            category_by_flight_platform="Multi-Rotor UAVs (多旋翼无人机)",
            category_by_mission_application="Platform Payload Class (按载重级别)",
            catalog_group="by-flight-platform",
            catalog_order=order,
        ))

    vtol_specs = [
        ("vtol-14kg-mtow-uav", "14kg MTOW VTOL Fixed-Wing UAV", "14 kg", "2.5 kg", "FC-CQ14", "240min", "20m/s", "4800m", "起飞重量14kg垂起.jpg", "起飞重量14kg垂起.json", 11),
        ("vtol-26kg-mtow-uav", "26kg MTOW VTOL Fixed-Wing UAV", "26 kg", "5 kg", "FC-CQ26", "240min", "21m/s", "4200m", "起飞重量26kg垂起.png", "起飞重量26kg垂起.json", 12),
        ("vtol-40kg-mtow-uav", "40kg MTOW VTOL Fixed-Wing UAV", "40 kg", "10 kg @ 5h", "FC-CQ40", "480min", "20m/s", "6000m", "起飞重量40kg垂起 .jpg", "起飞重量40kg垂起.json", 13),
        ("vtol-64kg-mtow-uav", "64kg MTOW VTOL Fixed-Wing UAV", "64 kg", "15 kg @ 3h", "FC-CQ64", "780min", "37m/s", "6000m", "起飞重量64kg垂起.png", "起飞重量64kg垂起.json", 14),
        ("vtol-135kg-mtow-uav", "135kg MTOW VTOL Fixed-Wing UAV", "135 kg", "40 kg", "FC-CQ135", "16h", "30m/s", "5000m", "起飞重量135kg垂起.jpg", "起飞重量135kg垂起.json", 15),
    ]

    for handle, name_en, mtow, payload, model, endurance, speed, altitude, source_image, cn_json, order in vtol_specs:
        image = public_path(f"{handle}.webp")
        records.append(ProductRecord(
            handle=handle,
            product_name=f"{mtow.replace(' ', '')}起飞重量垂直起降固定翼无人机",
            product_name_en=name_en,
            product_name_ru=f"VTOL БПЛА с максимальной взлетной массой {mtow}",
            summary=f"{model} 垂直起降固定翼无人机兼顾多旋翼起降便利性与固定翼航程效率，适合长距离巡检、测绘、管线巡护和应急巡查。",
            summary_en=f"The {model} {name_en} combines vertical take-off convenience with fixed-wing cruise efficiency for long-range inspection, mapping, corridor patrol, and emergency survey missions.",
            summary_ru=f"{model} сочетает вертикальный взлет и посадку с эффективностью самолетного полета для дальних инспекций и картографирования.",
            key_application="应用领域：电力与管线巡检、长距离走廊巡护、地形测绘、灾害勘察和大范围监测。",
            key_application_en="Power-line and pipeline inspection, long corridor patrol, terrain mapping, disaster survey, and wide-area monitoring.",
            key_application_ru="Инспекция ЛЭП и трубопроводов, дальнее патрулирование коридоров, картографирование и мониторинг больших территорий.",
            key_parameter_1=f"空载航时: {endurance}",
            key_parameter_1_en=f"Endurance (No Load): {endurance}",
            key_parameter_1_ru=f"Время полета без нагрузки: {endurance}",
            key_parameter_2=f"最大起飞重量: {mtow}",
            key_parameter_2_en=f"MTOW: {mtow}",
            key_parameter_2_ru=f"Макс. взлетная масса: {mtow}",
            parameters={
                "型号": model,
                "平台类型": "垂直起降固定翼",
                "最大起飞重量": mtow,
                "最大载荷": payload,
                "空载航时": endurance,
                "巡航速度": speed,
                "最大海拔高度": altitude,
                "防护等级": "IP54",
            },
            parameters_en={
                "Model": model,
                "Platform Type": "VTOL Fixed-Wing",
                "MTOW": mtow,
                "Max Payload": payload,
                "Endurance (No Load)": endurance,
                "Cruise Speed": speed,
                "Max Altitude": altitude,
                "Ingress Protection": "IP54",
            },
            parameters_ru={
                "Модель": model,
                "Тип платформы": "VTOL с фиксированным крылом",
                "Макс. взлетная масса": mtow,
                "Макс. нагрузка": payload,
                "Время полета без нагрузки": endurance,
                "Крейсерская скорость": speed,
            },
            detail_html=details_cn([
                "无需跑道即可垂直起降，适合山地、林区、管廊和临时作业点。",
                "固定翼巡航效率高，可覆盖中远距离线路和大范围测区。",
                "机体采用模块化任务载荷设计，支持测绘、巡检、监测和应急载荷。",
            ], image),
            detail_html_en=details_en([
                "Runway-free vertical take-off and landing for mountains, forests, corridors, and temporary field sites.",
                "Fixed-wing cruise efficiency supports medium- and long-range routes and wide-area survey work.",
                "Modular payload architecture supports mapping, inspection, monitoring, and emergency response payloads.",
            ], image),
            detail_html_ru=details_ru([
                "Вертикальный взлет и посадка без взлетной полосы.",
                "Эффективный самолетный режим для средних и дальних маршрутов.",
                "Модульная архитектура полезной нагрузки для инспекции и мониторинга.",
            ]),
            main_image=image,
            json_path=vtol_dir / cn_json,
            source_docx=next(vtol_dir.rglob(cn_json.replace(".json", ".docx")), None),
            direct_image_source=vtol_dir / "垂起无人机图片素材" / source_image,
            category_by_flight_platform="VTOL Fixed-Wing UAVs (复合翼/垂直起降无人机)",
            category_by_mission_application="Platform MTOW Class (按起飞重量级别)",
            catalog_group="by-flight-platform",
            catalog_order=order,
        ))

    return records


def mission_records() -> list[ProductRecord]:
    mission_dir = p("05新整理无人机2")
    records = [
        ProductRecord(
            handle="medium-long-range-uav-inspection-system",
            product_name="中远距离无人机巡检系统",
            product_name_en="Medium/Long-Range UAV Inspection System",
            product_name_ru="Система средне- и дальнедистанционной инспекции БПЛА",
            summary="中远距离无人机巡检系统面向电网工程勘测、竣工验收、输电通道三维建模、日常巡检和灾害应急巡视，适合复杂地形和长距离线路场景。",
            summary_en="The medium/long-range UAV inspection system supports grid engineering survey, completion acceptance, transmission-corridor 3D modeling, routine inspection, and disaster-response patrols across complex terrain and long routes.",
            summary_ru="Система предназначена для обследования электросетей, 3D-моделирования коридоров, регулярной инспекции и аварийного патрулирования на протяженных маршрутах.",
            key_application="应用领域：电网工程地形勘测、竣工验收巡检、电网监理、输电通道三维建模、日常巡检、山火和冰雪灾害应急巡视。",
            key_application_en="Grid terrain survey, completion inspection, project supervision, transmission-corridor 3D modeling, routine inspection, wildfire response, and ice/snow emergency patrol.",
            key_application_ru="Съемка трасс ЛЭП, приемочная инспекция, 3D-моделирование коридоров, регулярные и аварийные обходы.",
            key_parameter_1="任务半径: 中远距离线路巡检",
            key_parameter_1_en="Mission Radius: Medium/Long-Range Routes",
            key_parameter_1_ru="Радиус задачи: средние и дальние маршруты",
            key_parameter_2="典型载荷: 激光雷达 / 正射相机 / 双光吊舱",
            key_parameter_2_en="Typical Payload: LiDAR / Ortho Camera / Dual-Sensor Pod",
            key_parameter_2_ru="Типовая нагрузка: LiDAR / ортофотокамера / двойной сенсор",
            parameters={"任务类型": "电力中远距离巡检", "平台类型": "垂直起降固定翼", "典型载荷": "激光雷达、正射相机、双光吊舱", "成果": "点云、正射影像、缺陷记录、巡检报告"},
            parameters_en={"Mission Type": "Medium/Long-Range Utility Inspection", "Platform": "VTOL Fixed-Wing", "Typical Payloads": "LiDAR, ortho camera, dual-sensor pod", "Outputs": "Point cloud, ortho imagery, defect records, inspection reports"},
            parameters_ru={"Тип задачи": "Дальняя инспекция ЛЭП", "Платформа": "VTOL", "Нагрузка": "LiDAR, ортофотокамера, двойной сенсор"},
            detail_html=details_cn(["覆盖规划勘测、施工验收、日常巡检和灾害巡视全流程。", "支持激光雷达树障分析、正射/倾斜影像采集和三维建模。", "适合山区、丘陵、林区等人工巡检难度高的线路环境。"], public_path("medium-long-range-uav-inspection-system.webp")),
            detail_html_en=details_en(["Covers planning survey, construction acceptance, routine inspection, and disaster-response patrol operations.", "Supports LiDAR tree-clearance analysis, ortho/oblique imagery, and 3D modeling.", "Designed for mountainous, hilly, and forested routes where manual inspection is slow or risky."], public_path("medium-long-range-uav-inspection-system.webp")),
            detail_html_ru=details_ru(["Поддержка полного процесса инспекции линий электропередачи.", "LiDAR-анализ растительности, ортофотосъемка и 3D-моделирование.", "Подходит для горных и лесных маршрутов."]),
            main_image=public_path("medium-long-range-uav-inspection-system.webp"),
            json_path=mission_dir / "中远距离无人机巡检.json",
            source_docx=DATA_DIR / "中远距离无人机巡检.docx",
            category_by_flight_platform="VTOL Fixed-Wing UAVs (复合翼/垂直起降无人机)",
            category_by_mission_application="Inspection & Monitoring (巡检与监测)",
            catalog_group="by-mission-application",
            catalog_order=101,
            docx_image_index=11,
        ),
        ProductRecord(
            handle="emergency-search-rescue-drone",
            product_name="应急搜救无人机",
            product_name_en="Emergency Search & Rescue Drone",
            product_name_ru="БПЛА для аварийного поиска и спасения",
            summary="应急搜救无人机集成高清可见光、红外热成像、智能目标识别、实时图传和物资投送能力，适配洪涝、地震、野外失联和水域遇险等救援场景。",
            summary_en="The Emergency Search & Rescue Drone integrates visible-light imaging, thermal imaging, target recognition, real-time video transmission, and payload delivery for floods, earthquakes, missing-person events, and water rescue scenarios.",
            summary_ru="БПЛА для поиска и спасения с видимой и тепловизионной съемкой, распознаванием целей, видеопередачей и доставкой аварийных грузов.",
            key_application="应用领域：山林搜救、洪涝救援、水域遇险、人员失联、灾害现场态势回传和应急物资定点投送。",
            key_application_en="Mountain and forest search, flood rescue, water rescue, missing-person response, disaster-site situational awareness, and emergency supply delivery.",
            key_application_ru="Поиск в лесу и горах, паводковое спасение, поиск на воде, мониторинг места ЧС и доставка аварийных комплектов.",
            key_parameter_1="空载续航: ≥75min",
            key_parameter_1_en="Endurance (No Load): ≥75min",
            key_parameter_1_ru="Время полета без нагрузки: ≥75 мин",
            key_parameter_2="整机最大载荷: 7kg",
            key_parameter_2_en="Max Payload: 7kg",
            key_parameter_2_ru="Макс. полезная нагрузка: 7 кг",
            parameters={"产品类型": "多旋翼应急搜救无人机", "搭载载荷": "可见光相机 + 红外热成像，可选喊话器/探照灯/抛投器", "控制通信半径": "≥10km", "搜救响应时间": "≤5min", "最大抗风等级": "6级", "最大起飞海拔": "4000m", "整机最大载荷": "7kg"},
            parameters_en={"Product Type": "Multi-Rotor Search & Rescue UAV", "Payloads": "Visible-light camera + thermal imaging; optional loudspeaker / searchlight / dropper", "Control Radius": "≥10km", "Response Time": "≤5min", "Wind Resistance": "Level 6", "Max Take-off Altitude": "4000m", "Max Payload": "7kg"},
            parameters_ru={"Тип": "Мультироторный поисково-спасательный БПЛА", "Нагрузка": "Видимая камера + тепловизор; опции: громкоговоритель / прожектор / сброс груза", "Радиус управления": "≥10 км", "Макс. нагрузка": "7 кг"},
            detail_html=details_cn(["昼夜搜救：可见光与红外热成像协同，适合夜间、林区和复杂地形。", "多任务载荷：支持喊话、强光照明、急救包或救生圈精准投送。", "空地协同：实时图传和定位数据可同步至指挥平台。"], public_path("emergency-search-rescue-drone.webp")),
            detail_html_en=details_en(["Day/night search capability through visible-light and thermal imaging.", "Supports loudspeaker, searchlight, emergency kit, or lifebuoy delivery payloads.", "Real-time video and positioning data support air-ground coordinated rescue operations."], public_path("emergency-search-rescue-drone.webp")),
            detail_html_ru=details_ru(["Дневной и ночной поиск с видимой камерой и тепловизором.", "Поддержка громкоговорителя, прожектора и доставки аварийных комплектов.", "Передача видео и координат для координации спасательных работ."]),
            main_image=public_path("emergency-search-rescue-drone.webp"),
            json_path=mission_dir / "应急搜救无人机.json",
            source_docx=mission_dir / "应急搜救无人机.docx",
            category_by_flight_platform="Multi-Rotor UAVs (多旋翼无人机)",
            category_by_mission_application="Emergency Response (应急响应)",
            catalog_group="by-mission-application",
            catalog_order=102,
            docx_image_index=1,
        ),
        ProductRecord(
            handle="fc-yjtx-01-emergency-communication-drone",
            product_name="应急通讯无人机",
            product_name_en="Emergency Communication Tethered UAV",
            product_name_ru="Привязной БПЛА для аварийной связи",
            summary="应急通讯无人机通过系留供电和高空通信载荷快速构建临时覆盖网络，适用于灾害现场、山区、矿区和无信号覆盖区域的应急通信恢复。",
            summary_en="The Emergency Communication Tethered UAV uses tethered power and airborne communication payloads to rapidly restore temporary coverage for disaster sites, mountains, mines, and areas without signal service.",
            summary_ru="Привязной БПЛА для аварийной связи быстро поднимает коммуникационную нагрузку и восстанавливает временное покрытие в районах ЧС.",
            key_application="应用领域：地震、水灾、台风等灾害现场通信中继；戈壁、矿山、山区等无信号区域临时组网。",
            key_application_en="Emergency relay after earthquakes, floods, typhoons, and temporary network coverage in deserts, mines, and mountainous areas.",
            key_application_ru="Аварийная ретрансляция после землетрясений, паводков, тайфунов и временное покрытие в удаленных районах.",
            key_parameter_1="升空高度: 100~200m",
            key_parameter_1_en="Operating Altitude: 100-200m",
            key_parameter_1_ru="Рабочая высота: 100-200 м",
            key_parameter_2="载荷能力: 20kg",
            key_parameter_2_en="Payload Capacity: 20kg",
            key_parameter_2_ru="Полезная нагрузка: 20 кг",
            parameters={"型号": "FC-YJTX-01", "升空高度": "100~200m", "载荷能力": "20kg", "抗风等级": "6级", "续航能力": "自主供电25分钟 / 地面供电12小时", "最大飞行速度": "15m/s"},
            parameters_en={"Model": "FC-YJTX-01", "Operating Altitude": "100-200m", "Payload Capacity": "20kg", "Wind Resistance": "Level 6", "Endurance": "25min onboard power / 12h ground power", "Max Flight Speed": "15m/s"},
            parameters_ru={"Модель": "FC-YJTX-01", "Рабочая высота": "100-200 м", "Полезная нагрузка": "20 кг", "Ветер": "Уровень 6", "Время работы": "25 мин автономно / 12 ч от земли"},
            detail_html=details_cn(["系留供电支持长时间空中驻留，适合持续通信保障。", "可搭载轻量化通信设备，快速恢复灾区局部网络。", "部署便捷，不受道路和地形条件强限制。"], public_path("FC-YJTX-01-Emergency-Communication-Drone.webp")),
            detail_html_en=details_en(["Tethered power supports long-duration airborne communication coverage.", "Compatible with lightweight communication payloads for rapid temporary network restoration.", "Fast deployment with reduced dependence on road and terrain conditions."], public_path("FC-YJTX-01-Emergency-Communication-Drone.webp")),
            detail_html_ru=details_ru(["Привязное питание обеспечивает длительное пребывание в воздухе.", "Поддержка легких коммуникационных нагрузок.", "Быстрое развертывание в сложной местности."]),
            main_image=public_path("FC-YJTX-01-Emergency-Communication-Drone.webp"),
            json_path=mission_dir / "应急通讯无人机.json",
            source_docx=mission_dir / "应急通讯无人机.docx",
            category_by_flight_platform="Tethered UAVs (系留无人机系统)",
            category_by_mission_application="Emergency Response (应急响应)",
            catalog_group="by-mission-application",
            catalog_order=103,
        ),
        ProductRecord(
            handle="smart-substation-autonomous-inspection-system",
            product_name="智慧变电站无人机全自动巡检系统",
            product_name_en="Smart Substation Autonomous UAV Inspection System",
            product_name_ru="Автономная система инспекции умной подстанции с БПЛА",
            summary="智慧变电站无人机全自动巡检系统由无人机机巢、工业无人机平台、多源任务载荷、AI 数据分析软件和综合管控平台组成，实现变电站无人值守全自动巡检。",
            summary_en="The Smart Substation Autonomous UAV Inspection System combines a drone dock, industrial UAV platform, multi-source payloads, AI analytics, and a management platform for unattended substation inspection.",
            summary_ru="Автономная система инспекции подстанций объединяет док-станцию, промышленный БПЛА, сенсоры, AI-анализ и платформу управления.",
            key_application="应用领域：变电站设备可见光巡检、红外测温、通道隐患排查、AI 缺陷识别、巡检工单闭环和多站点集群调度。",
            key_application_en="Visible-light inspection, infrared temperature measurement, corridor risk inspection, AI defect recognition, work-order closure, and multi-station fleet scheduling.",
            key_application_ru="Визуальная инспекция, тепловизионный контроль, AI-выявление дефектов и диспетчеризация нескольких станций.",
            key_parameter_1="系统启动时间: ＜90s",
            key_parameter_1_en="System Start Time: <90s",
            key_parameter_1_ru="Время запуска: <90 с",
            key_parameter_2="二次作业间隔: ≤5min",
            key_parameter_2_en="Second Mission Interval: ≤5min",
            key_parameter_2_ru="Интервал до повторной миссии: ≤5 мин",
            parameters={"机巢开合方式": "双开门", "整机防护等级": "IP55", "机巢补能方式": "自动换电", "系统启动时间": "＜90秒", "二次作业间隔": "≤5分钟", "机巢供电输入": "220V交流电", "通信链路": "宽带 / 4G / 5G"},
            parameters_en={"Dock Door": "Dual-door", "System Protection": "IP55", "Energy Replenishment": "Automatic battery swap", "System Start Time": "<90s", "Second Mission Interval": "≤5min", "Dock Power Input": "220V AC", "Communication Link": "Broadband / 4G / 5G"},
            parameters_ru={"Док": "Двойная дверь", "Защита": "IP55", "Пополнение энергии": "Автоматическая замена батареи", "Запуск": "<90 с", "Интервал миссии": "≤5 мин"},
            detail_html=details_cn(["无人机机巢支持自动存放、自主起降和自动换电。", "AI 缺陷识别覆盖绝缘子、螺栓、发热、表计和树障等典型隐患。", "巡检数据可自动生成报告，并进入隐患工单闭环。"], public_path("smart-substation-autonomous-inspection-system.webp")),
            detail_html_en=details_en(["Drone dock supports automatic storage, autonomous take-off/landing, and automatic battery swapping.", "AI defect recognition covers insulators, bolts, overheating, meters, tree obstruction, and typical substation risks.", "Inspection data can generate reports and support closed-loop work-order management."], public_path("smart-substation-autonomous-inspection-system.webp")),
            detail_html_ru=details_ru(["Док-станция поддерживает автономный взлет, посадку и замену батареи.", "AI распознает типовые дефекты оборудования и окружающей среды.", "Данные инспекции формируют отчеты и рабочие задания."]),
            main_image=public_path("smart-substation-autonomous-inspection-system.webp"),
            json_path=mission_dir / "智慧变电站无人机全自动巡检系统.json",
            source_docx=mission_dir / "智慧变电站无人机全自动巡检系统.docx",
            category_by_flight_platform="Multi-Rotor UAVs (多旋翼无人机)",
            category_by_mission_application="Inspection & Monitoring (巡检与监测)",
            catalog_group="by-mission-application",
            catalog_order=104,
            docx_image_index=1,
        ),
        ProductRecord(
            handle="fc-sljc-01-water-conservancy-monitoring-drone",
            product_name="水利监测无人机",
            product_name_en="Water Conservancy Monitoring UAV",
            product_name_ru="БПЛА для мониторинга водного хозяйства",
            summary="水利监测无人机由多旋翼飞行平台、高精度监测载荷和便携式地面站组成，可对水域状况、水利设施和防汛应急场景进行实时监测与数据采集。",
            summary_en="The Water Conservancy Monitoring UAV combines a multi-rotor platform, high-precision monitoring payloads, and a portable ground station for real-time water, hydraulic facility, and flood-response monitoring.",
            summary_ru="БПЛА для мониторинга водного хозяйства объединяет мультироторную платформу, сенсоры и наземную станцию для контроля водных объектов.",
            key_application="应用领域：汛期水文监测、险情勘察、水利设施智能巡检、河湖监管、水质监测、排污溯源和非法采砂巡查。",
            key_application_en="Flood-season hydrology, hazard inspection, hydraulic facility inspection, river/lake supervision, water-quality monitoring, discharge tracing, and sand-mining patrol.",
            key_application_ru="Паводковый мониторинг, инспекция гидросооружений, контроль рек и озер, мониторинг качества воды.",
            key_parameter_1="空载续航: 90min",
            key_parameter_1_en="Endurance (No Load): 90min",
            key_parameter_1_ru="Время полета без нагрузки: 90 мин",
            key_parameter_2="标准载重: 8kg",
            key_parameter_2_en="Standard Payload: 8kg",
            key_parameter_2_ru="Стандартная нагрузка: 8 кг",
            parameters={"型号": "FC-X6", "平台类型": "多旋翼", "最大飞行速度": "15m/s", "旋翼数量": "6轴6桨", "标准载重": "8kg", "空载续航": "90min", "整机轴距": "1600mm", "可抗风等级": "6级", "最大飞行海拔": "4000m"},
            parameters_en={"Model": "FC-X6", "Platform": "Multi-Rotor", "Max Flight Speed": "15m/s", "Rotor Configuration": "6-axis / 6-prop", "Standard Payload": "8kg", "Endurance (No Load)": "90min", "Wheelbase": "1600mm", "Wind Resistance": "Level 6", "Max Flight Altitude": "4000m"},
            parameters_ru={"Модель": "FC-X6", "Платформа": "Мультиротор", "Нагрузка": "8 кг", "Время полета": "90 мин", "Ветер": "Уровень 6"},
            detail_html=details_cn(["可搭载高清光学相机、热成像仪和多光谱传感器。", "适合水位、流速、淹没范围、坝体裂缝和渗漏隐患巡查。", "用于河湖监管、水质监测、排污溯源和防汛应急。"], public_path("FC-SLJC-01-Water-Conservancy-Monitoring-Drone.webp")),
            detail_html_en=details_en(["Supports HD optical cameras, thermal sensors, and multispectral payloads.", "Applicable to water level, flow, inundation area, dam crack, and seepage-risk inspection.", "Used for river/lake supervision, water-quality monitoring, discharge tracing, and flood response."], public_path("FC-SLJC-01-Water-Conservancy-Monitoring-Drone.webp")),
            detail_html_ru=details_ru(["Поддерживает оптические, тепловизионные и мультиспектральные сенсоры.", "Контроль уровня воды, затопления, трещин и утечек.", "Применяется для водного надзора и паводкового реагирования."]),
            main_image=public_path("FC-SLJC-01-Water-Conservancy-Monitoring-Drone.webp"),
            json_path=mission_dir / "水利监测无人机.json",
            source_docx=mission_dir / "水利监测无人机.docx",
            category_by_flight_platform="Multi-Rotor UAVs (多旋翼无人机)",
            category_by_mission_application="Inspection & Monitoring (巡检与监测)",
            catalog_group="by-mission-application",
            catalog_order=105,
        ),
        ProductRecord(
            handle="power-tower-inspection-drone",
            product_name="电塔巡检无人机",
            product_name_en="Power Tower Inspection UAV",
            product_name_ru="БПЛА для инспекции опор ЛЭП",
            summary="电塔巡检无人机面向输电线路、铁塔、金具、绝缘子和通道环境巡检，融合可见光、热红外和 AI 智能识别，替代高风险人工登塔巡检。",
            summary_en="The Power Tower Inspection UAV is designed for transmission lines, towers, fittings, insulators, and corridor environments, combining visible-light imaging, thermal detection, and AI recognition to reduce high-risk manual tower work.",
            summary_ru="БПЛА для инспекции опор ЛЭП контролирует линии, арматуру, изоляторы и коридоры, применяя видимую съемку, тепловизор и AI-анализ.",
            key_application="应用领域：输电线路常态化巡检、杆塔本体缺陷识别、温度异常检测、树障及外力施工隐患排查、故障定位和巡检报告生成。",
            key_application_en="Routine transmission-line inspection, tower defect recognition, thermal anomaly detection, tree-obstruction and construction-risk inspection, fault localization, and report generation.",
            key_application_ru="Регулярная инспекция ЛЭП, выявление дефектов опор, тепловых аномалий, растительности и внешних рисков.",
            key_parameter_1="最大续航: 66min",
            key_parameter_1_en="Max Endurance: 66min",
            key_parameter_1_ru="Макс. время полета: 66 мин",
            key_parameter_2="最大负载: ＞7kg",
            key_parameter_2_en="Max Payload: >7kg",
            key_parameter_2_ru="Макс. нагрузка: >7 кг",
            parameters={"机身工艺": "异型碳纤维一体成型", "空机重量": "6.5kg", "最大负载": "＞7kg", "防护等级": "IP55", "最大续航": "66min", "抗风等级": "6级", "抗干扰等级": "A 级抗强电磁干扰"},
            parameters_en={"Airframe": "Integrated carbon-fiber structure", "Empty Weight": "6.5kg", "Max Payload": ">7kg", "Protection": "IP55", "Max Endurance": "66min", "Wind Resistance": "Level 6", "EM Environment": "Class-A strong electromagnetic resilience"},
            parameters_ru={"Корпус": "Углеродное волокно", "Вес без нагрузки": "6.5 кг", "Макс. нагрузка": ">7 кг", "Защита": "IP55", "Время полета": "66 мин"},
            detail_html=details_cn(["多旋翼平台可近距离观察塔臂、绝缘子顶部和导线下方等人工难达位置。", "可见光与热红外载荷同步采集外观缺陷和温度异常。", "巡检照片、视频、点云和飞行轨迹可留存追溯。"], public_path("power-tower-inspection-drone.webp")),
            detail_html_en=details_en(["Multi-rotor mobility supports close inspection of tower arms, insulator tops, and cable underside positions.", "Visible-light and thermal payloads capture appearance defects and temperature anomalies in one process.", "Images, video, point clouds, and flight tracks can be archived for traceability."], public_path("power-tower-inspection-drone.webp")),
            detail_html_ru=details_ru(["Мультироторная маневренность для близкого осмотра труднодоступных зон опоры.", "Видимая и тепловая съемка фиксирует дефекты и температурные аномалии.", "Данные полета и материалы инспекции сохраняются для последующей проверки."]),
            main_image=public_path("power-tower-inspection-drone.webp"),
            json_path=mission_dir / "电塔巡检无人机.json",
            source_docx=mission_dir / "电塔巡检无人机.docx",
            category_by_flight_platform="Multi-Rotor UAVs (多旋翼无人机)",
            category_by_mission_application="Inspection & Monitoring (巡检与监测)",
            catalog_group="by-mission-application",
            catalog_order=106,
            docx_image_index=1,
        ),
        ProductRecord(
            handle="fc-yjzm-01-emergency-lighting-drone",
            product_name="系留照明无人机",
            product_name_en="Tethered Lighting UAV",
            product_name_ru="Привязной БПЛА для освещения",
            summary="系留照明无人机依托地面供电实现长时间空中驻留，可在 50-100 米高空形成高空光塔，为夜间抢险、救援、抢修和现场处置提供大范围照明。",
            summary_en="The Tethered Lighting UAV uses ground power for long-duration airborne lighting, forming an elevated light tower at 50-100 m for night rescue, emergency repair, and field response.",
            summary_ru="Привязной БПЛА для освещения работает от наземного питания и создает высокую световую башню для ночных аварийных работ.",
            key_application="应用领域：夜间抢险救灾、地质灾害处置、抢修现场照明、区域搜索照明和临时现场保障。",
            key_application_en="Night rescue, geological disaster response, emergency repair lighting, area search lighting, and temporary site support.",
            key_application_ru="Ночные спасательные работы, аварийный ремонт, поисковое освещение и временное освещение площадок.",
            key_parameter_1="升空高度: 50~100m",
            key_parameter_1_en="Operating Altitude: 50-100m",
            key_parameter_1_ru="Рабочая высота: 50-100 м",
            key_parameter_2="照亮范围: ≥8000m2",
            key_parameter_2_en="Illuminated Area: ≥8000m2",
            key_parameter_2_ru="Площадь освещения: ≥8000 м2",
            parameters={"型号": "FC-XLZM-01", "升空高度": "50~100m", "载荷能力": "5kg", "抗风等级": "6级", "续航能力": "自主供电20分钟 / 地面供电12小时", "照亮范围": "≥8000m2"},
            parameters_en={"Model": "FC-XLZM-01", "Operating Altitude": "50-100m", "Payload Capacity": "5kg", "Wind Resistance": "Level 6", "Endurance": "20min onboard power / 12h ground power", "Illuminated Area": "≥8000m2"},
            parameters_ru={"Модель": "FC-XLZM-01", "Рабочая высота": "50-100 м", "Нагрузка": "5 кг", "Ветер": "Уровень 6", "Освещаемая площадь": "≥8000 м2"},
            detail_html=details_cn(["地面供电支持长时间照明任务，减少频繁换电。", "高空光塔覆盖范围大，可消除复杂场地照明盲区。", "适配夜间救援、抢修、搜索和临时现场保障。"], public_path("FC-YJZM-01-Emergency-Lighting-Drone.webp")),
            detail_html_en=details_en(["Ground power supports long-duration lighting missions with reduced battery-swap interruption.", "Elevated lighting coverage reduces blind spots in complex sites.", "Suitable for night rescue, emergency repair, search, and temporary site support."], public_path("FC-YJZM-01-Emergency-Lighting-Drone.webp")),
            detail_html_ru=details_ru(["Наземное питание обеспечивает длительное освещение.", "Высотное освещение уменьшает слепые зоны на сложных площадках.", "Подходит для ночного спасения и аварийного ремонта."]),
            main_image=public_path("FC-YJZM-01-Emergency-Lighting-Drone.webp"),
            json_path=mission_dir / "系留照明无人机.json",
            source_docx=mission_dir / "系留照明无人机.docx",
            category_by_flight_platform="Tethered UAVs (系留无人机系统)",
            category_by_mission_application="Emergency Response (应急响应)",
            catalog_group="by-mission-application",
            catalog_order=107,
        ),
        ProductRecord(
            handle="fc-yjxf-01-aerial-firefighting-drone",
            product_name="高层消防无人机",
            product_name_en="High-Rise Firefighting Tethered UAV",
            product_name_ru="Привязной БПЛА для тушения высотных пожаров",
            summary="高层消防无人机面向超高层、城市密集建筑群和复杂火灾处置，可通过系留供电实现长时间高位作业，辅助远程喷淋、降温、排烟和救援通道构建。",
            summary_en="The High-Rise Firefighting Tethered UAV supports long-duration elevated operation for high-rise buildings, dense urban blocks, and complex fire scenes, assisting remote spraying, cooling, smoke ventilation, and rescue-access preparation.",
            summary_ru="Привязной БПЛА для высотного пожаротушения обеспечивает длительную работу на высоте и поддержку охлаждения, распыления и организации доступа.",
            key_application="应用领域：超高层建筑火灾、城市密集建筑群、化工园区冷却隔离、排烟辅助和高位应急处置。",
            key_application_en="High-rise building fires, dense urban blocks, chemical-park cooling/isolation, smoke ventilation support, and elevated emergency response.",
            key_application_ru="Высотные здания, плотная городская застройка, охлаждение промышленных площадок и поддержка аварийного доступа.",
            key_parameter_1="升空高度: 100~150m",
            key_parameter_1_en="Operating Altitude: 100-150m",
            key_parameter_1_ru="Рабочая высота: 100-150 м",
            key_parameter_2="有效载荷: 70kg",
            key_parameter_2_en="Effective Payload: 70kg",
            key_parameter_2_ru="Эффективная нагрузка: 70 кг",
            parameters={"型号": "FC-YJXF-01", "升空高度": "100~150m", "有效载荷": "70kg", "抗风能力": "6级", "续航时长": "自主供电20min / 地面供电12h", "飞行速度": "最大15m/s", "载车储液": "水箱2000L / A类泡沫液箱300L"},
            parameters_en={"Model": "FC-YJXF-01", "Operating Altitude": "100-150m", "Effective Payload": "70kg", "Wind Resistance": "Level 6", "Endurance": "20min onboard power / 12h ground power", "Max Speed": "15m/s", "Vehicle Liquid Storage": "2000L water / 300L Class-A foam"},
            parameters_ru={"Модель": "FC-YJXF-01", "Рабочая высота": "100-150 м", "Нагрузка": "70 кг", "Ветер": "Уровень 6", "Время работы": "20 мин автономно / 12 ч от земли"},
            detail_html=details_cn(["系留供电支持高位长时间处置，降低频繁返航换电。", "可辅助高层外立面喷淋、冷却隔离和排烟通道构建。", "与地面车辆和指挥系统配合，形成高位持续作业能力。"], public_path("FC-YJXF-01-Aerial-Firefighting-Drone.webp")),
            detail_html_en=details_en(["Tethered power supports long-duration elevated response without frequent battery returns.", "Assists facade spraying, cooling/isolation, and smoke-ventilation access preparation.", "Works with ground vehicles and command systems to provide sustained high-position operation."], public_path("FC-YJXF-01-Aerial-Firefighting-Drone.webp")),
            detail_html_ru=details_ru(["Привязное питание обеспечивает длительную работу на высоте.", "Поддержка охлаждения фасада и организации доступа для дымоудаления.", "Работа в связке с наземным автомобилем и командной системой."]),
            main_image=public_path("FC-YJXF-01-Aerial-Firefighting-Drone.webp"),
            json_path=mission_dir / "高层消防无人机.json",
            source_docx=mission_dir / "高层消防无人机.docx",
            category_by_flight_platform="Tethered UAVs (系留无人机系统)",
            category_by_mission_application="Emergency Response (应急响应)",
            catalog_group="by-mission-application",
            catalog_order=108,
        ),
    ]
    return records


def all_records() -> list[ProductRecord]:
    return platform_records() + mission_records()


def main() -> None:
    records = all_records()
    for record in records:
        target = ROOT / "public" / record.main_image.lstrip("/")
        if record.direct_image_source:
            convert_direct_image(record.direct_image_source, target)
            record.extra["docx_image_paths"] = [record.main_image]
        elif record.source_docx and record.source_docx.exists():
            record.extra["docx_image_paths"] = extract_docx_images(record.source_docx, target, record.handle)
            if not record.extra["docx_image_paths"]:
                extract_docx_image(record.source_docx, target, record.docx_image_index)
                record.extra["docx_image_paths"] = [record.main_image]
        elif record.source_docx and not target.exists():
            raise FileNotFoundError(record.source_docx)

    apply_docx_content(records)

    for record in records:
        write_json(record)

    backup = sync_db(records)

    print(f"synced {len(records)} UAV product records")
    print(f"db backup: {backup}")
    print("generated JSON files:")
    for record in records:
        print(f" - {record.json_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
