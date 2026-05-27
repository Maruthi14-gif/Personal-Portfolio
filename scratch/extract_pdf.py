import os
import sys

def main():
    pdf_path = os.path.join("public", "P_Maruthi_Resume.pdf")
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return

    # Try importing common PDF parsing libraries
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        print("--- EXTRACTED TEXT (pypdf) ---")
        print(text)
        return
    except ImportError:
        pass

    try:
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
            print("--- EXTRACTED TEXT (pdfplumber) ---")
            print(text)
            return
    except ImportError:
        pass

    try:
        import fitz  # PyMuPDF
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        print("--- EXTRACTED TEXT (PyMuPDF) ---")
        print(text)
        return
    except ImportError:
        pass

    # If libraries are missing, try to install pypdf and run again
    print("PDF parsing libraries not found. Installing pypdf...")
    import subprocess
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        print("--- EXTRACTED TEXT (pypdf after install) ---")
        print(text)
    except Exception as e:
        print(f"Failed to install/use pypdf: {e}")

if __name__ == "__main__":
    main()
