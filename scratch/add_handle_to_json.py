import json
import os
import glob
import re

# Load Supabase data 
with open("/Users/mattchyi/Documents/Project/fc/scratch/supabase_products.json", "r", encoding="utf-8") as f:
    supabase_data = json.load(f)

# Categories and their directories
base_dir = "/Users/mattchyi/Documents/Project/fc/网站资料"
all_json_files = glob.glob(os.path.join(base_dir, "**/*.json"), recursive=True)

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text

img_to_en = {p["main_image"]: p["title_en"] for p in supabase_data if p.get("main_image")}

special_cases = {
    "01工程补给产品贝雷桥.json": "Bailey Bridge",
    "18多频段侦干一体反制枪.json": "Multi-Frequency Detection and Jamming Gun",
    "FC-DMA型多波段光电转台.json": "FC-DMA Multi-Band Electro-Optical PTZ",
    "01非传FC-H智能手机探测门产品参数.json": "FC-H Smart Phone Detection Gate"
}

updated_count = 0

for fpath in all_json_files:
    if "checkpoint" in fpath or "temp" in fpath: continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except: continue
    
    title_en = None
    fname = os.path.basename(fpath)
    
    if fname in special_cases:
        title_en = special_cases[fname]
    elif "main_image" in data:
        title_en = img_to_en.get(data["main_image"])
        
    if not title_en:
        pname = data.get("product_name", "").strip()
        for p in supabase_data:
            if p.get("title_zh") == pname or (p.get("title_zh") and p.get("title_zh") in pname):
                title_en = p.get("title_en")
                break
                
    if title_en:
        handle = slugify(title_en)
        data["handle"] = handle
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Added handle '{handle}' to {fname}")
        updated_count += 1

print(f"\nSuccessfully added handles to {updated_count} files.")
