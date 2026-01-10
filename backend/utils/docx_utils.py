from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH

def docx_to_html(path: str) -> str:
    doc = Document(path)
    html = ""

    for para in doc.paragraphs:
        align = para.alignment

        style = ""
        if align == WD_ALIGN_PARAGRAPH.CENTER:
            style += "text-align:center;"
        elif align == WD_ALIGN_PARAGRAPH.RIGHT:
            style += "text-align:right;"
        elif align == WD_ALIGN_PARAGRAPH.JUSTIFY:
            style += "text-align:justify;"
        else:
            style += "text-align:left;"

        # Heading detection
        if para.style and para.style.name.startswith("Heading"):
            level = para.style.name.replace("Heading", "").strip()
            level = level if level.isdigit() else "2"
            html += f"<h{level} style='{style}'>{para.text}</h{level}>"
        else:
            html += f"<p style='{style}'>{para.text}</p>"

    return html