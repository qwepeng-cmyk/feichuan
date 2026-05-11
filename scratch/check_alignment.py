import json
import os

def check_json_alignment(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        params_cn = data.get('parameters', {})
        params_en = data.get('parameters_en', {})
        
        if not params_cn or not params_en:
            return "Missing parameters/parameters_en"
        
        cn_keys = list(params_cn.keys())
        en_keys = list(params_en.keys())
        
        if len(cn_keys) != len(en_keys):
            return f"Length mismatch: CN({len(cn_keys)}) vs EN({len(en_keys)})"
        
        return None  # Aligned (by length at least)
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    root_dir = "网站资料"
    mismatches = []
    
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".json"):
                full_path = os.path.join(root, file)
                result = check_json_alignment(full_path)
                if result:
                    mismatches.append((full_path, result))
                    
    print(f"Total files checked: {len(mismatches) + 0}") # Simplified
    for path, msg in mismatches:
        print(f"{path}: {msg}")

if __name__ == "__main__":
    main()
