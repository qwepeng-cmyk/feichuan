import json
import os
import glob

# Load Supabase data
with open("/Users/mattchyi/Documents/Project/fc/scratch/supabase_products.json", "r", encoding="utf-8") as f:
    supabase_data = json.load(f)

# Categories and their directories
base_dir = "/Users/mattchyi/Documents/Project/fc/网站资料"
all_json_files = glob.glob(os.path.join(base_dir, "**/*.json"), recursive=True)

# Find which main_images are present in the JSON files
used_images = set()
for fpath in all_json_files:
    if "checkpoint" in fpath or "temp" in fpath: continue
    with open(fpath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            if "main_image" in data:
                used_images.add(data["main_image"])
        except: continue

# 1. Supabase products not used
not_used_in_json = []
for p in supabase_data:
    if p.get("main_image") not in used_images:
        not_used_in_json.append(f"{p.get('id')}: {p.get('title_zh')} ({p.get('title_en')})")

# 2. Local JSON files without main_image
local_without_image = []
for fpath in all_json_files:
    if "checkpoint" in fpath or "temp" in fpath: continue
    with open(fpath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            if "main_image" not in data:
                local_without_image.append(fpath)
        except: continue

print("### Supabase products NOT matched to a local JSON:")
for item in not_used_in_json:
    print(f"- {item}")

print("\n### Local JSON files NOT matched to a Supabase product:")
for item in local_without_image:
    print(f"- {item}")
