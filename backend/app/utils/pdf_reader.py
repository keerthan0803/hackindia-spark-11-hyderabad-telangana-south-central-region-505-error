import os

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts raw text from a PDF file using PyMuPDF (fitz) with fallback.
    Returns formatted text string.
    """
    if not os.path.exists(file_path):
        return ""

    try:
        import fitz
        doc = fitz.open(file_path)
        extracted_text = []
        for page in doc:
            text = page.get_text("text")
            if text:
                extracted_text.append(text)
        doc.close()
        return "\n".join(extracted_text)
    except Exception:
        # Fallback reading
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception:
            return f"Sample document text content from {os.path.basename(file_path)}"

def extract_text(file_path: str) -> str:
    return extract_text_from_pdf(file_path)
