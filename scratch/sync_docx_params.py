import os
import json
import zipfile
import xml.etree.ElementTree as ET
import re

DIR_PATH = '/Users/mattchyi/Documents/Project/fc/网站资料/06要地防护'

def get_docx_text_list(docx_path):
    text_list = []
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content); ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        for p in root.findall('.//w:p', ns):
            p_text = "".join([t.text for t in p.findall('.//w:t', ns) if t.text])
            if p_text.strip(): text_list.append(p_text.strip())
    return text_list

def sync():
    files = [f for f in os.listdir(DIR_PATH) if f.endswith('.docx')]
    for f_name in files:
        base_name = f_name.replace('.docx', ''); json_path = os.path.join(DIR_PATH, base_name + '.json'); docx_path = os.path.join(DIR_PATH, f_name)
        if not os.path.exists(json_path): continue
            
        print(f"Cleaning summary for {base_name}...")
        text_list = get_docx_text_list(docx_path)
        
        summary_lines = []
        features_lines = []
        params_lines = []
        current_section = "intro"
        
        # Keywords to skip in content
        skip_keywords = ["产品简介", "产品概况", "产品详情", "功能特点", "基本参数", "技术参数", "图1", "图2", base_name]
        
        for line in text_list:
            # Section detection
            if "功能特点" in line and len(line) < 15:
                current_section = "features"; continue
            elif any(h in line for h in ['基本参数', '技术参数', '产品参数']) and len(line) < 15:
                current_section = "params"; continue
            
            # Content filtering
            clean_line = line.strip()
            if clean_line in skip_keywords: continue
            
            if current_section == "intro":
                summary_lines.append(clean_line)
            elif current_section == "features":
                features_lines.append(clean_line.strip('。').strip())
            elif current_section == "params":
                params_lines.append(clean_line)

        # Build Clean Chinese Data
        summary = " ".join(summary_lines[:2]) # Usually first 1-2 paragraphs
        detail_html = "<h4>功能特点</h4><ul>" + "".join([f"<li>{l}</li>" for l in features_lines if l]) + "</ul>"
        
        # Parameters parsing
        zh_params = {}; current_zh_cat = "General"
        for line in params_lines:
            if len(line) < 15 and not re.match(r'^\d+\.', line) and not '：' in line and not ':' in line:
                current_zh_cat = line; zh_params[current_zh_cat] = []
            else:
                if current_zh_cat not in zh_params: zh_params[current_zh_cat] = []
                zh_params[current_zh_cat].append(line)

        with open(json_path, 'r', encoding='utf-8') as jf:
            data = json.load(jf)
            
        data['summary'] = summary
        data['detail_html'] = detail_html
        data['parameters'] = {k: "\n".join(v) for k, v in zh_params.items() if v}
        
        with open(json_path, 'w', encoding='utf-8') as jf:
            json.dump(data, jf, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    sync()
