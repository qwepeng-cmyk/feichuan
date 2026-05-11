import os
import json

def sanitize_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Keys to remove from parameters
        keys_to_remove = ["推荐产品", "推荐配套"]
        en_keys_to_remove = ["Recommended Product", "Recommended Support", "Support"]
        
        changed = False
        
        if "parameters" in data:
            for key in keys_to_remove:
                if key in data["parameters"]:
                    del data["parameters"][key]
                    changed = True
                    
        if "parameters_en" in data:
            for key in en_keys_to_remove:
                if key in data["parameters_en"]:
                    del data["parameters_en"][key]
                    changed = True
                # also check lowercase or variations
                to_del = []
                for k in data["parameters_en"].keys():
                    if "recommended" in k.lower():
                        to_del.append(k)
                for k in to_del:
                    del data["parameters_en"][k]
                    changed = True

        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Sanitized: {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

root_dir = "网站资料/08方案概括"
for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".json"):
            sanitize_json(os.path.join(root, file))
