import os
import json
import shutil

DATA_FILE = 'migration_data_translated.json'
PRODUCT_DIR = 'public/products'

keyword_map = {
    "defense-eng": ["贝雷", "桥", "Deck", "Beam", "Transom", "Clamp", "Support", "Bearing", "Chord", "Frame", "End", "Brace", "端柱", "弦杆", "横梁"],
    "field-hospitals": ["方舱", "医疗", "救治", "Hospital", "Cabin", "Medical", "方舱医院"],
    "uav-systems": ["无人机", "UAV", "Drone", "机型", "系留", "多旋翼", "复合翼"],
    "anti-drone": ["反制", "干扰", "侦测", "Jammer", "C-UAS", "Radar", "Spoofing", "Detection", "诱骗", "主动防御", "察打一体", "盾"],
    "security": ["安检", "探测器", "辐射", "Dosimeter", "Detector", "Scanner", "Turnstile", "摆闸", "X-Ray", "防爆", "射线", "剂量", "检验仪", "手机探测门"],
    "surveillance": ["摄像机", "哨兵", "Camera", "PTZ", "Surveillance", "光电", "监控", "激光"]
}

def deep_fix_categories():
    with open(DATA_FILE, 'r', encoding='utf8') as f:
        products = json.load(f)

    new_products = []
    
    for p in products:
        title_zh = p['title_zh']
        title_en = p['title_en']
        combined_text = f"{title_zh} {title_en}".lower()
        
        target_cat = p['cat_slug']
        
        # Check all categories
        found = False
        for cat, keywords in keyword_map.items():
            for kw in keywords:
                if kw.lower() in combined_text:
                    target_cat = cat
                    found = True
                    break
            if found: break
            
        if target_cat != p['cat_slug']:
            # Physical migration
            old_dir = os.path.join(PRODUCT_DIR, p['cat_slug'])
            new_dir = os.path.join(PRODUCT_DIR, target_cat)
            os.makedirs(new_dir, exist_ok=True)
            
            file_name = os.path.basename(p['image'] if p['image'] else '')
            if file_name:
                old_path = os.path.join(old_dir, file_name)
                new_path = os.path.join(new_dir, file_name)
                if os.path.exists(old_path):
                    shutil.move(old_path, new_path)
                    p['image'] = f"/products/{target_cat}/{file_name}"
            p['cat_slug'] = target_cat
            
        new_products.append(p)

    with open('migration_data_translated.json', 'w', encoding='utf8') as f:
        json.dump(new_products, f, ensure_ascii=False, indent=2)

    # Aggressive cleanup of all folders NOT in target categories OR empty
    valid_cats = list(keyword_map.keys())
    for folder in os.listdir(PRODUCT_DIR):
        folder_path = os.path.join(PRODUCT_DIR, folder)
        if os.path.isdir(folder_path):
            if folder not in valid_cats or not os.listdir(folder_path):
                # Move any remaining files to a 'security' or 'other' fallback if needed? 
                # No, just let's check.
                if os.listdir(folder_path):
                    print(f"STILL HAS FILES: {folder}")
                else:
                    os.rmdir(folder_path)
                    print(f"Removed folder: {folder}")

    print("Deep category fix complete.")

if __name__ == "__main__":
    deep_fix_categories()
