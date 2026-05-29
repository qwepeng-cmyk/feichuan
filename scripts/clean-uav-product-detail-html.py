#!/usr/bin/env python3
"""Remove duplicated parameter tables from UAV product detail HTML and normalize feature lists."""

from __future__ import annotations

import json
import re
import shutil
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "ntet.db"
SOURCE_ROOT = ROOT / "\u7f51\u7ad9\u8d44\u6599"

TABLE_BLOCK_RE = re.compile(
    r"(?:<h[3-4]>\s*(?:Basic Parameters|UAV Parameters|Technical Indicator|Параметры БПЛА|Основные параметры|Технические показатели)\s*</h[3-4]>\s*)?"
    r"<div[^>]*class=\"[^\"]*table-wrap[^\"]*\"[^>]*>\s*<table[\s\S]*?</table>\s*</div>",
    re.IGNORECASE,
)
EMPTY_TECH_HEADING_RE = re.compile(
    r"<h[3-4]>\s*(?:Basic Parameters|UAV Parameters|Technical Indicator|Параметры БПЛА|Основные параметры|Технические показатели)\s*</h[3-4]>",
    re.IGNORECASE,
)
P_RE = re.compile(r"<p>([\s\S]*?)</p>")
FEATURE_SECTION_RE = re.compile(
    r"(<h[3-4]>\s*(?:Functional Characteristics|Functional Features|Core Features|Функциональные особенности|Ключевые особенности)\s*</h[3-4]>|<p>\s*(?:Functional Characteristics|Functional Features|Core Features):?\s*</p>)([\s\S]*?)(?=<h[3-5]>|$)",
    re.IGNORECASE,
)
LEADING_FEATURE_PARAGRAPH_RE = re.compile(
    r"(<p>\s*(?:Functional Characteristics|Functional Features|Core Features):?\s*</p>)\s*((?:<p>[\s\S]*?</p>\s*)+)<ul>",
    re.IGNORECASE,
)


def compact_html(html: str) -> str:
    html = TABLE_BLOCK_RE.sub("", html or "")
    html = EMPTY_TECH_HEADING_RE.sub("", html)
    html = re.sub(r"\s{2,}", " ", html)
    return html.strip()


def looks_like_feature_title(text: str) -> bool:
    plain = re.sub(r"<[^>]+>", "", text).strip()
    if not plain:
        return False
    if len(plain) > 90:
        return False
    return not re.search(r"[.:;。；：]$", plain)


def normalize_feature_section(html: str) -> str:
    def replace_section(match: re.Match[str]) -> str:
        heading = match.group(1)
        body = match.group(2)
        if "<ul" in body.lower():
            return heading + body

        paragraphs = [item.strip() for item in P_RE.findall(body) if item.strip()]
        other_body = P_RE.sub("", body).strip()
        if len(paragraphs) < 2:
            return heading + body

        intro = paragraphs[0]
        rest = paragraphs[1:]
        items: list[str] = []
        index = 0
        while index < len(rest):
            current = rest[index]
            next_item = rest[index + 1] if index + 1 < len(rest) else ""
            if next_item and looks_like_feature_title(current):
                items.append(f"<li><strong>{current}</strong><br />{next_item}</li>")
                index += 2
            else:
                items.append(f"<li>{current}</li>")
                index += 1

        if not items:
            return heading + body

        return f"{heading}<p>{intro}</p><ul>{''.join(items)}</ul>{other_body}"

    return FEATURE_SECTION_RE.sub(replace_section, html)


def fold_leading_feature_paragraphs(html: str) -> str:
    def replace_leading(match: re.Match[str]) -> str:
        heading = match.group(1)
        paragraphs = [item.strip() for item in P_RE.findall(match.group(2)) if item.strip()]
        if not paragraphs:
            return match.group(0)
        items = "".join(f"<li>{paragraph}</li>" for paragraph in paragraphs)
        return f"{heading}<ul>{items}"

    return LEADING_FEATURE_PARAGRAPH_RE.sub(replace_leading, html)


def clean_detail_html(html: str) -> str:
    return fold_leading_feature_paragraphs(normalize_feature_section(compact_html(html)))


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def dump_json(path: Path, data: dict[str, Any]) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def find_source_jsons() -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {}
    for path in SOURCE_ROOT.rglob("*.json"):
        try:
            data = load_json(path)
        except Exception:
            continue
        handle = data.get("handle")
        if handle:
            result.setdefault(str(handle), []).append(path)
    return result


def main() -> None:
    backup = DB_PATH.with_name(f"{DB_PATH.name}.bak.clean-uav-detail-html-{datetime.now():%Y%m%d%H%M%S}")
    shutil.copy2(DB_PATH, backup)

    source_by_handle = find_source_jsons()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute(
        """
        SELECT handle, raw_json, detail_html_en, detail_html_ru
        FROM products
        WHERE category_primary = 'uav-drone-systems'
          AND COALESCE(is_published, 1) = 1
        """
    ).fetchall()

    changed: list[str] = []
    json_changed: list[str] = []

    for row in rows:
        handle = row["handle"]
        raw = json.loads(row["raw_json"] or "{}")
        next_en = clean_detail_html(row["detail_html_en"] or raw.get("detail_html_en", ""))
        next_ru = clean_detail_html(row["detail_html_ru"] or raw.get("detail_html_ru", ""))

        if next_en != (row["detail_html_en"] or "") or next_ru != (row["detail_html_ru"] or ""):
            raw["detail_html_en"] = next_en
            raw["detail_html_ru"] = next_ru
            conn.execute(
                """
                UPDATE products
                SET detail_html_en = ?, detail_html_ru = ?, raw_json = ?, updated_at = CURRENT_TIMESTAMP
                WHERE handle = ?
                """,
                (next_en, next_ru, json.dumps(raw, ensure_ascii=False), handle),
            )
            changed.append(handle)

        for path in source_by_handle.get(handle, []):
            data = load_json(path)
            source_changed = False
            source_en = clean_detail_html(data.get("detail_html_en", ""))
            source_ru = clean_detail_html(data.get("detail_html_ru", ""))
            if source_en and source_en != data.get("detail_html_en", ""):
                data["detail_html_en"] = source_en
                source_changed = True
            if source_ru and source_ru != data.get("detail_html_ru", ""):
                data["detail_html_ru"] = source_ru
                source_changed = True
            if source_changed:
                dump_json(path, data)
                json_changed.append(str(path.relative_to(ROOT)))

    conn.commit()
    conn.close()

    print(f"Backed up DB to {backup}")
    print(f"Updated DB products: {len(changed)}")
    for handle in changed:
        print(f"  - {handle}")
    print(f"Updated source JSON files: {len(json_changed)}")
    for path in json_changed:
        print(f"  - {path}")


if __name__ == "__main__":
    main()
