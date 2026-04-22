from docx import Document
import sys

def read_doc(path):
    doc = Document(path)
    for para in doc.paragraphs:
        if para.text.strip():
            print(para.text)

read_doc(sys.argv[1])
