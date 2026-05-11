import os
import json
try:
    import docx
except ImportError:
    os.system('pip install python-docx')
    import docx

base_dir = '/Users/mattchyi/Documents/Project/fc/public/cases'
cases = [
    '亚运会低空安防应用',
    '尼日利亚某集团工厂反无案例',
    '巴基斯坦某电厂反无案例',
    '巴西某炼油厂反无案例',
    '机场低空安防应用',
    '水利设施低空安保'
]

result = []

for case_name in cases:
    case_path = os.path.join(base_dir, case_name)
    docx_path = os.path.join(case_path, f'{case_name}.docx')
    
    description = ""
    if os.path.exists(docx_path):
        try:
            doc = docx.Document(docx_path)
            description = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
        except Exception as e:
            description = f"Error reading docx: {e}"
            
    case_images = []
    if os.path.exists(case_path):
        for f in os.listdir(case_path):
            if f.endswith(('.png', '.jpg', '.jpeg')) and f != 'main.png':
                case_images.append(f'/cases/{case_name}/{f}')
                
    result.append({
        "id": case_name,
        "title": case_name,
        "mainImage": f"/cases/{case_name}/main.png",
        "devices": ["设备待确认"],
        "description": description,
        "caseImages": case_images
    })

out_path = os.path.join(base_dir, 'cases_data.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"JSON data written to {out_path}")
