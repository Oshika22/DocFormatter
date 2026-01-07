from docx import Document

def docx_to_html(path: str) -> str:
    doc = Document(path)
    html = ""

    for para in doc.paragraphs:
        html += f"<p>{para.text}</p>"

    return html
