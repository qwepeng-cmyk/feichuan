import os
import json
import shutil

DATA_FILE = 'migration_data_translated.json'
PRODUCT_DIR = 'public/products'

# Fix the categories for products that ended up in "other"
# or simply based on keywords
def fix_categories():
    with open(DATA_FILE, 'r', encoding='utf8') as f:
        products = json.load(f)

    new_products = []
    
    # Target Category slugs according to "产品中心.md"
    # 1. defense-eng (Defense Engineering)
    # 2. field-hospitals (Field & Mobile Hospitals)
    # 3. uav-systems (UAVs)
    
    for p in products:
        title_zh = p['title_zh']
        current_cat_slug = p['cat_slug']
        
        # New category logic
        new_cat_slug = current_cat_slug
        if "贝雷" in title_zh or "钢桥" in title_zh or "桥" in title_zh:
            new_cat_slug = "defense-eng"
        elif "方舱" in title_zh or "医疗" in title_zh or "救治" in title_zh:
            new_cat_slug = "field-hospitals"
        elif "无人机" in title_zh:
            new_cat_slug = "uav-systems"
        elif "防爆" in title_zh:
            new_cat_slug = "security"
            
        if new_cat_slug != current_cat_slug:
            # Physical migration
            old_dir = os.path.join(PRODUCT_DIR, current_cat_slug)
            new_dir = os.path.join(PRODUCT_DIR, new_cat_slug)
            
            os.makedirs(new_dir, exist_ok=True)
            
            # File name is already translated in the previous step
            file_name = os.path.basename(p['image'] if p['image'] else '')
            if file_name:
                old_path = os.path.join(old_dir, file_name)
                new_path = os.path.join(new_dir, file_name)
                
                if os.path.exists(old_path):
                    shutil.move(old_path, new_path)
                    p['image'] = f"/products/{new_cat_slug}/{file_name}"
            
            p['cat_slug'] = new_cat_slug
        
        new_products.append(p)

    with open('migration_data_translated.json', 'w', encoding='utf8') as f:
        json.dump(new_products, f, ensure_ascii=False, indent=2)

    # Clean up empty folders
    for folder in os.listdir(PRODUCT_DIR):
        folder_path = os.path.join(PRODUCT_DIR, folder)
        if os.path.isdir(folder_path) and not os.listdir(folder_path):
            os.rmdir(folder_path)
            print(f"Removed empty folder: {folder}")

    print("Category fix and file migration complete.")

if __name__ == "__main__":
    fix_categories()
