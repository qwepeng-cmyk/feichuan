import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as docx:
            xml_content = docx.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        # The correct namespace for Word documents
        namespaces = {
            'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        }
        
        text_list = []
        # Find all paragraphs
        for paragraph in tree.findall('.//w:p', namespaces):
            para_text = ""
            for t in paragraph.findall('.//w:t', namespaces):
                if t.text:
                    para_text += t.text
            if para_text:
                text_list.append(para_text)
        
        return "\n\n".join(text_list)
    except Exception as e:
        return f"Error extracting {docx_path}: {str(e)}"

docs = [
    ("网站资料/08方案概括/边境巡逻.docx", "border_patrol.txt"),
    ("网站资料/08方案概括/关键设施防护.docx", "infrastructure.txt"),
    ("网站资料/08方案概括/要地安保.docx", "key_area.txt"),
    ("网站资料/08方案概括/应急救灾.docx", "emergency.txt")
]

output_dir = "网站资料/08方案概括/raw_text"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for doc_path, out_name in docs:
    print(f"Extracting {doc_path}...")
    content = extract_text(doc_path)
    with open(os.path.join(output_dir, out_name), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved to {out_name}")
