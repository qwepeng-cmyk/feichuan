import zipfile
import xml.etree.ElementTree as ET
import os

def peek_xml(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as docx:
            xml_content = docx.read('word/document.xml')
            print(f"Content length: {len(xml_content)}")
            # Print the first 500 chars to see namespaces
            print(xml_content[:500])
    except Exception as e:
        print(f"Error: {e}")

peek_xml("网站资料/08方案概括/边境巡逻.docx")
