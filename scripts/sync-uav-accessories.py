from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sqlite3
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "网站资料" / "无人机配件"
PUBLIC_DIR = ROOT / "public" / "products" / "uav-accessories"
DB_PATH = ROOT / "data" / "ntet.db"
ACCESSORY_CATEGORY = "uav-accessories"


@dataclass(frozen=True)
class CategoryMeta:
    slug: str
    en: str
    ru: str
    suffix_en: str
    suffix_ru: str
    application_en: str
    application_ru: str


CATEGORIES: dict[str, CategoryMeta] = {
    "光电吊舱": CategoryMeta(
        "electro-optical-gimbals",
        "Electro-Optical Gimbals",
        "Electro-Optical Gimbals",
        "Electro-Optical Gimbal",
        "Electro-Optical Gimbal",
        "Payload imaging, inspection, tracking, emergency survey, and field observation for industrial UAV platforms.",
        "Payload imaging, inspection, tracking, emergency survey, and field observation for industrial UAV platforms.",
    ),
    "无人机发动机": CategoryMeta(
        "uav-engines",
        "UAV Engines",
        "UAV Engines",
        "UAV Engine",
        "UAV Engine",
        "Power module for long-endurance fixed-wing and hybrid UAV aircraft.",
        "Power module for long-endurance fixed-wing and hybrid UAV aircraft.",
    ),
    "无人机数据链": CategoryMeta(
        "uav-data-links",
        "UAV Data Links",
        "UAV Data Links",
        "UAV Data Link",
        "UAV Data Link",
        "Command, telemetry, and video data transmission for UAV operations.",
        "Command, telemetry, and video data transmission for UAV operations.",
    ),
    "无人机桨叶": CategoryMeta(
        "uav-propellers",
        "UAV Propellers",
        "UAV Propellers",
        "UAV Propeller",
        "UAV Propeller",
        "Propulsion blade component for multi-rotor and industrial UAV lift systems.",
        "Propulsion blade component for multi-rotor and industrial UAV lift systems.",
    ),
    "无人机电机": CategoryMeta(
        "uav-motors",
        "UAV Motors",
        "UAV Motors",
        "UAV Motor",
        "UAV Motor",
        "Electric propulsion motor for professional UAV lift, endurance, and payload missions.",
        "Electric propulsion motor for professional UAV lift, endurance, and payload missions.",
    ),
    "无人机电池": CategoryMeta(
        "uav-batteries",
        "UAV Batteries",
        "UAV Batteries",
        "UAV Battery",
        "UAV Battery",
        "Flight battery module for industrial UAV energy storage and field replacement.",
        "Flight battery module for industrial UAV energy storage and field replacement.",
    ),
    "无人机遥控器": CategoryMeta(
        "uav-remote-controllers",
        "UAV Remote Controllers",
        "UAV Remote Controllers",
        "UAV Remote Controller",
        "UAV Remote Controller",
        "Ground-control unit for UAV piloting, data monitoring, and mission operation.",
        "Ground-control unit for UAV piloting, data monitoring, and mission operation.",
    ),
    "飞行控制器": CategoryMeta(
        "flight-controllers",
        "Flight Controllers",
        "Flight Controllers",
        "Flight Controller",
        "Flight Controller",
        "Autopilot and flight-control module for stable UAV platform integration.",
        "Autopilot and flight-control module for stable UAV platform integration.",
    ),
}


TERM_MAP: list[tuple[str, str]] = [
    ("主要应用于", "Used for "),
    ("应用领域", "Application"),
    ("核心参数", "Core parameters"),
    ("最大拉力", "Maximum thrust"),
    ("工作额定电压", "Rated operating voltage"),
    ("连续光学变焦", "continuous optical zoom"),
    ("光学变焦", "optical zoom"),
    ("热成像", "thermal imaging"),
    ("激光测距", "laser ranging"),
    ("重量", "weight"),
    ("尺寸", "dimensions"),
    ("工作温度", "operating temperature"),
    ("存储温度", "storage temperature"),
    ("供电范围", "power supply range"),
    ("平均功耗", "average power consumption"),
    ("峰值功耗", "peak power consumption"),
    ("分辨率", "resolution"),
    ("焦距", "focal length"),
    ("水平视场角", "horizontal field of view"),
    ("探测距离", "detection distance"),
    ("识别距离", "recognition distance"),
    ("工作波段", "operating band"),
    ("通讯接口", "communication interface"),
    ("视频接口", "video interface"),
    ("目标类型", "target type"),
    ("更新帧率", "update frame rate"),
    ("测距范围", "ranging range"),
    ("测距精度", "ranging accuracy"),
    ("测距频率", "ranging frequency"),
    ("照片格式", "photo format"),
    ("视频格式", "video format"),
    ("编码格式", "encoding format"),
    ("视频协议", "video protocol"),
    ("存储容量", "storage capacity"),
    ("电机型号", "motor model"),
    ("基本参数", "Basic Parameters"),
    ("技术参数", "Technical Parameters"),
    ("可见光", "Visible Light"),
    ("伺服控制", "Servo Control"),
    ("单目标跟踪", "Single-Target Tracking"),
    ("多目标跟踪", "Multi-Target Tracking"),
    ("视频与存储", "Video and Storage"),
    ("电源特性", "Power Characteristics"),
    ("电气接口", "Electrical Interface"),
    ("环境适应性", "Environmental Adaptability"),
    ("尺寸重量", "Dimensions and Weight"),
    ("支持", "Supported"),
    ("人", "person"),
    ("车", "vehicle"),
    ("船", "vessel"),
    ("飞机", "aircraft"),
    ("串口", "serial port"),
    ("百兆网", "100M Ethernet"),
    ("等", "and others"),
    ("线路巡检", "line inspection"),
    ("事故勘查", "incident survey"),
    ("应急救援", "emergency rescue"),
    ("测绘", "mapping"),
    ("勘探", "survey"),
    ("长航时", "long endurance"),
    ("专业航拍", "professional aerial imaging"),
]


SENSITIVE_TERMS = [
    "反恐",
    "防暴",
    "执法",
    "取证",
    "军用",
    "武器",
    "打击",
    "压制",
    "干扰",
]


def slugify(value: str) -> str:
    normalized = value.lower()
    normalized = normalized.replace("桨叶", " propeller").replace("遥控器", " remote controller")
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized)
    return normalized.strip("-") or "accessory"


def has_cjk(value: str) -> bool:
    return bool(re.search(r"[\u3400-\u9fff]", value))


def strip_cjk(value: str) -> str:
    value = re.sub(r"[\u3400-\u9fff]+", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip(" ,;:-")


def tidy_public_text(value: str) -> str:
    text = value
    replacements = {
        "≒": "≤",
        "㊣": "±",
        "≡": "≥",
        "米m": "um",
        "朴": "diameter ",
        "Environm ental": "Environmental",
        "dimensionsweight": "Dimensions and Weight",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    text = re.sub(r"(?i)(\d)\s*x\s+continuous optical zoom\b", r"\1x continuous optical zoom", text)
    text = re.sub(r"(?i)(nm)(?=[A-Za-z])", r"\1 ", text)
    text = re.sub(r"(?i)\b(ranging|weight|voltage|thrust|zoom)(?=[≤<>=0-9])", r"\1 ", text)
    text = re.sub(r"(?i)(?<=[A-Za-z0-9])and others\b", " and others", text)
    text = re.sub(r"(?<=\d)～(?=(?:x|X|C|$|[,;]))", "°", text)
    text = re.sub(r"(?<=\d)X(?=\d)", " x ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def translate_technical_text(value: Any, fallback: str = "") -> str:
    text = str(value or "").strip()
    if not text:
        return fallback
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    for sensitive in SENSITIVE_TERMS:
        text = text.replace(sensitive, "")
    for src, dst in TERM_MAP:
        text = text.replace(src, dst)
    text = text.replace("，", ", ").replace("；", "; ").replace("：", ": ")
    text = text.replace("。", ". ").replace("、", ", ").replace("（", " (").replace("）", ")")
    text = re.sub(r"(?i)(nm)(?=[A-Za-z])", r"\1 ", text)
    text = re.sub(r"\b(ranging|weight|voltage|thrust|zoom)(?=[≤<>=0-9])", r"\1 ", text, flags=re.I)
    text = re.sub(r"\b(\d+)\s+continuous optical zoom\b", r"\1x continuous optical zoom", text, flags=re.I)
    text = re.sub(r"\s+", " ", text).strip()
    if has_cjk(text):
        text = strip_cjk(text)
    text = re.sub(r"\b(\d+)\s+continuous optical zoom\b", r"\1x continuous optical zoom", text, flags=re.I)
    return tidy_public_text(text) or fallback


def model_code(model_dir: Path, data: dict[str, Any]) -> str:
    raw = str(data.get("product_name") or model_dir.name).strip()
    raw = raw.replace("桨叶", "").replace("遥控器", "").strip()
    return raw or model_dir.name


def display_name(model: str, meta: CategoryMeta, lang: str) -> str:
    suffix = meta.suffix_ru if lang == "ru" else meta.suffix_en
    compact = model.lower()
    if suffix.lower().replace("-", " ") in compact:
        return model
    return f"{model} {suffix}"


def source_main_image(model_dir: Path, data: dict[str, Any]) -> Path | None:
    candidates: list[Path] = []
    candidates.extend(
        item for item in sorted(model_dir.glob("*.webp"))
        if item.stem.lower() == "main" or "主图" in item.name
    )
    if data.get("main_image"):
        candidates.append(model_dir / str(data["main_image"]))
    candidates.extend(sorted(model_dir.glob("*主图*.*")))
    candidates.extend([model_dir / "main.png", model_dir / "original.png", model_dir / "original_download.png"])
    for candidate in candidates:
        if candidate.exists() and candidate.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
            return candidate
    return None


def image_candidates(model_dir: Path, main_source: Path | None) -> list[Path]:
    images = [
        item for item in sorted(model_dir.iterdir())
        if item.is_file() and item.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    ]
    result: list[Path] = []
    for image in images:
        if main_source and image.samefile(main_source):
            continue
        if image.stem.lower() == "main" or "主图" in image.name:
            continue
        result.append(image)
    return result[:4]


def save_webp(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix.lower() == ".webp":
        shutil.copy2(source, target)
        return
    with Image.open(source) as img:
        img = img.convert("RGB")
        img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
        img.save(target, "WEBP", quality=82, method=6)


def public_asset_path(path: Path) -> str:
    return "/" + str(path.relative_to(ROOT / "public")).replace("\\", "/")


def normalize_param_key(key: str, index: int) -> str:
    translated = translate_technical_text(key)
    if translated and not has_cjk(translated):
        return translated
    return f"Parameter {index}"


def normalize_param_value(value: Any) -> Any:
    if isinstance(value, dict):
        return normalize_parameters(value)
    if isinstance(value, list):
        if len(value) > 8 or any(isinstance(item, (dict, list)) for item in value):
            return ", ".join(translate_technical_text(item) for item in value[:4] if translate_technical_text(item))
        return ", ".join(translate_technical_text(item) for item in value if translate_technical_text(item))
    return translate_technical_text(value)


def normalize_parameters(params: Any) -> dict[str, Any]:
    if not isinstance(params, dict):
        return {}
    normalized: dict[str, Any] = {}
    for idx, (key, value) in enumerate(params.items(), 1):
        translated_key = normalize_param_key(str(key), idx)
        lowered = translated_key.lower()
        if "test data" in lowered or "table data" in lowered or "raw image" in lowered:
            continue
        translated_value = normalize_param_value(value)
        if translated_value in ("", {}, []):
            continue
        normalized[translated_key] = translated_value
        if len(normalized) >= 80:
            break
    return normalized


def detail_html(name: str, meta: CategoryMeta, highlights: list[str]) -> str:
    items = "".join(f"<li>{html.escape(item)}</li>" for item in highlights if item)
    article = "an" if meta.suffix_en.lower().startswith(("electro", "autopilot")) else "a"
    return (
        f"<p>{html.escape(name)} is {article} {html.escape(meta.suffix_en.lower())} for industrial UAV integration. "
        f"It is organized for field replacement, platform matching, and reliable operation in inspection and monitoring workflows.</p>"
        f"<h4>Key Capabilities</h4><ul>{items}</ul>"
    )


def make_record(category_name: str, model_dir: Path, dry_run: bool = False) -> dict[str, Any] | None:
    meta = CATEGORIES[category_name]
    json_files = [item for item in sorted(model_dir.glob("*.json")) if "型号对照表" not in item.name]
    if not json_files:
        return None

    data = json.loads(json_files[0].read_text(encoding="utf-8"))
    model = model_code(model_dir, data)
    handle = slugify(str(data.get("handle") or model))
    category_dir = PUBLIC_DIR / meta.slug / handle
    name_en = display_name(model, meta, "en")
    name_ru = display_name(model, meta, "ru")

    main_source = source_main_image(model_dir, data)
    main_public = ""
    product_images: list[str] = []
    if main_source:
        main_target = category_dir / f"{slugify(name_en)}.webp"
        if not dry_run:
            save_webp(main_source, main_target)
            old_main = category_dir / "main.webp"
            if old_main.exists() and old_main.resolve() != main_target.resolve():
                old_main.unlink()
        main_public = public_asset_path(main_target)

    for idx, image in enumerate(image_candidates(model_dir, main_source), 1):
        target = category_dir / f"gallery-{idx:02d}.webp"
        if not dry_run:
            save_webp(image, target)
        product_images.append(public_asset_path(target))

    key_1 = translate_technical_text(data.get("key_parameter_1"), f"Category: {meta.en}")
    key_2 = translate_technical_text(data.get("key_parameter_2"), "Designed for industrial UAV platform integration")
    params_en = normalize_parameters(data.get("parameters"))
    highlights = [key_1, key_2, meta.application_en]

    raw_json = {
        **data,
        "catalog_kind": "accessory",
        "accessory_category": meta.slug,
        "accessory_category_en": meta.en,
        "accessory_category_ru": meta.ru,
        "source_path": str(model_dir.relative_to(ROOT)).replace("\\", "/"),
        "product_images": product_images,
        "main_image": main_public,
        "category_primary": ACCESSORY_CATEGORY,
        "catalog_order": ACCESSORY_ORDER[category_name] * 1000 + MODEL_ORDER[model_dir],
    }

    return {
        "handle": handle,
        "product_name_en": name_en,
        "product_name_ru": name_ru,
        "category_primary": ACCESSORY_CATEGORY,
        "summary_en": f"{name_en} for industrial UAV accessory integration, matching {meta.en.lower()} requirements.",
        "summary_ru": f"{name_ru} for industrial UAV accessory integration, matching {meta.en.lower()} requirements.",
        "key_application_en": meta.application_en,
        "key_application_ru": meta.application_ru,
        "key_parameter_1_en": key_1,
        "key_parameter_1_ru": key_1,
        "key_parameter_2_en": key_2,
        "key_parameter_2_ru": key_2,
        "parameters_en": json.dumps(params_en, ensure_ascii=False),
        "parameters_ru": json.dumps(params_en, ensure_ascii=False),
        "detail_html_en": detail_html(name_en, meta, highlights),
        "detail_html_ru": detail_html(name_ru, meta, highlights),
        "main_image": main_public,
        "raw_json": json.dumps(raw_json, ensure_ascii=False),
        "is_published": 1,
    }


def sync_db(records: list[dict[str, Any]], dry_run: bool) -> Path | None:
    if dry_run:
        return None
    backup = DB_PATH.with_name(f"{DB_PATH.name}.bak.uav-accessories-{datetime.now().strftime('%Y%m%d%H%M%S')}")
    shutil.copy2(DB_PATH, backup)
    conn = sqlite3.connect(DB_PATH)
    try:
        sql = """
            INSERT INTO products (
                handle, product_name_en, product_name_ru, category_primary, summary_en, summary_ru,
                key_application_en, key_application_ru, key_parameter_1_en, key_parameter_1_ru,
                key_parameter_2_en, key_parameter_2_ru, parameters_en, parameters_ru,
                detail_html_en, detail_html_ru, main_image, raw_json, is_published, updated_at
            ) VALUES (
                :handle, :product_name_en, :product_name_ru, :category_primary, :summary_en, :summary_ru,
                :key_application_en, :key_application_ru, :key_parameter_1_en, :key_parameter_1_ru,
                :key_parameter_2_en, :key_parameter_2_ru, :parameters_en, :parameters_ru,
                :detail_html_en, :detail_html_ru, :main_image, :raw_json, :is_published, CURRENT_TIMESTAMP
            )
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
                raw_json = excluded.raw_json,
                is_published = excluded.is_published,
                updated_at = CURRENT_TIMESTAMP
        """
        conn.executemany(sql, records)
        conn.commit()
    finally:
        conn.close()
    return backup


def discover_records(dry_run: bool) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for category_name in CATEGORIES:
        category_dir = SOURCE_DIR / category_name
        for idx, model_dir in enumerate(sorted(item for item in category_dir.iterdir() if item.is_dir()), 1):
            MODEL_ORDER[model_dir] = idx
            record = make_record(category_name, model_dir, dry_run=dry_run)
            if record:
                records.append(record)
    return records


ACCESSORY_ORDER = {category: index for index, category in enumerate(CATEGORIES, 1)}
MODEL_ORDER: dict[Path, int] = {}


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync UAV accessories into public assets and ntet.db")
    parser.add_argument("--dry-run", action="store_true", help="Inspect records without writing images or database")
    args = parser.parse_args()

    records = discover_records(dry_run=args.dry_run)
    backup = sync_db(records, dry_run=args.dry_run)
    by_category: dict[str, int] = {}
    for record in records:
        raw = json.loads(record["raw_json"])
        by_category[raw["accessory_category_en"]] = by_category.get(raw["accessory_category_en"], 0) + 1

    print(f"records={len(records)} dry_run={args.dry_run}")
    for name, count in sorted(by_category.items()):
        print(f"{name}: {count}")
    if backup:
        print(f"backup={backup}")


if __name__ == "__main__":
    main()
