import os
import re
import json
import shutil

SQL_FILE = '/Users/mattchyi/Documents/Project/fc/cn源代码/1776325807125_dbexport_307500228/db_dump.sql'
SOURCE_UPLOAD_DIR = '/Users/mattchyi/Documents/Project/fc/cn源代码/feichuan.feeyr.com_20260416_171449/uploadfile'
TARGET_PRODUCT_DIR = '/Users/mattchyi/Documents/Project/fc/public/products'

category_mapping = {
    '18': {'slug': 'uav-platform', 'name_zh': '按硬件平台找', 'name_en': 'By Flight Platform'},
    '17': {'slug': 'uav-mission', 'name_zh': '按行业任务找', 'name_en': 'By Mission & Application'},
    '7': {'slug': 'anti-drone', 'name_zh': '反无人机系统', 'name_en': 'Anti-Drone Systems'},
    '11': {'slug': 'surveillance', 'name_zh': '要地周边防护', 'name_en': 'Perimeter Surveillance'},
    '8': {'slug': 'security', 'name_zh': '安检与智慧警务', 'name_en': 'Security Screening'},
}

def parse_insert_line(line):
    match = re.match(r"INSERT INTO `(.+?)` \((.+?)\) VALUES (.+);", line)
    if not match: return None
    table_name = match.group(1)
    columns = [c.strip().replace("`", "") for c in match.group(2).split(",")]
    
    values_part = match.group(3)
    rows = []
    # Simplified regex for SQL values (handling quotes and commas)
    # This regex is broad but should work for standard SQL dumps
    items = re.findall(r"\((.*?)\)(?:,|$)", values_part)
    for item in items:
        # Split values by comma, but not inside quotes
        row_values = []
        in_quote = False
        val_start = 0
        for i, char in enumerate(item):
            if char == "'" and (i == 0 or item[i-1] != "\\"):
                in_quote = not in_quote
            if char == "," and not in_quote:
                val = item[val_start:i].strip()
                if val.startswith("'") and val.endswith("'"): val = val[1:-1]
                row_values.append(None if val == "NULL" else val)
                val_start = i + 1
        # Last value
        val = item[val_start:].strip()
        if val.startswith("'") and val.endswith("'"): val = val[1:-1]
        row_values.append(None if val == "NULL" else val)
        
        row_dict = dict(zip(columns, row_values))
        rows.append(row_dict)
    return table_name, rows

def migrate():
    print("Starting migration (Python)...")
    if not os.path.exists(SQL_FILE):
        print(f"Error: SQL file not found at {SQL_FILE}")
        return

    products = []
    product_data = {}
    attachments = {}

    with open(SQL_FILE, 'r', encoding='utf8', errors='ignore') as f:
        for line in f:
            if not line.startswith("INSERT INTO"): continue
            parsed = parse_insert_line(line)
            if not parsed: continue
            
            table_name, rows = parsed
            if table_name == 'dr_1_product': products.extend(rows)
            elif table_name == 'dr_1_product_data_0': 
                for r in rows: product_data[r['id']] = r
            elif table_name == 'dr_attachment_data':
                for r in rows: attachments[r['id']] = r['attachment']

    print(f"Parsed {len(products)} products, {len(attachments)} attachments.")
    
    os.makedirs(TARGET_PRODUCT_DIR, exist_ok=True)
    results = []
    
    for p in products:
        detail = product_data.get(p['id'], {})
        thumb_id = p.get('thumb')
        thumb_path = attachments.get(thumb_id)
        cat_info = category_mapping.get(p['catid'], {'slug': 'other', 'name_zh': '其他', 'name_en': 'Other'})
        
        target_cat_dir = os.path.join(TARGET_PRODUCT_DIR, cat_info['slug'])
        os.makedirs(target_cat_dir, exist_ok=True)
        
        new_path = None
        if thumb_path:
            source_file = os.path.join(SOURCE_UPLOAD_DIR, thumb_path)
            if os.path.exists(source_file):
                ext = os.path.splitext(thumb_path)[1]
                # Clean title for filename
                clean_title = re.sub(r'[\/\\?%*:|"<> ]', '-', p['title'])
                target_filename = f"{clean_title}{ext}"
                target_file = os.path.join(target_cat_dir, target_filename)
                
                shutil.copy2(source_file, target_file)
                new_path = f"/products/{cat_info['slug']}/{target_filename}"
            else:
                print(f"Warning: File not found: {source_file}")

        results.append({
            "id": p['id'],
            "model": p.get('xinghao', ''),
            "title_zh": p['title'],
            "cat_slug": cat_info['slug'],
            "image": new_path,
            "keywords": p.get('keywords', ''),
            "desc": p.get('description', ''),
            "content": detail.get('content', '')
        })

    with open('/Users/mattchyi/Documents/Project/fc/migration_data.json', 'w', encoding='utf8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"Migration complete. {len(results)} records processed.")

if __name__ == "__main__":
    migrate()
