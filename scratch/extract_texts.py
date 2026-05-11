import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as docx:
            xml_content = docx.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        namespace = {'w': 'http://schemas.microsoft.com/office/word/2006/main'}
        
        text_elements = tree.findall('.//w:t', namespace)
        return "".join([t.text for t in text_elements if t.text])
    except Exception as e:
        return f"Error extracting {docx_path}: {str(e)}"

docs = [
    "网站资料/08方案概括/边境巡逻.docx",
    "网站资料/08方案概括/关键设施防护.docx",
    "网站资料/08方案概括/要地安保.docx",
    "网站资料/08方案概括/应急救灾.docx"
]

output_dir = "网站资料/08方案概括/raw_text"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for doc in docs:
    name = os.path.basename(doc).replace(".docx", ".txt")
    print(f"Extracting {doc}...")
    content = extract_text(doc)
    with open(os.path.join(output_dir, name), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved to {name}")
