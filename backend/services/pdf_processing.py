import os
import re
import fitz

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "processed"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)

    full_text = ""

    for page_number, page in enumerate(document):

        text = page.get_text()

        # Debug: Shows how many characters were extracted from each page
        print(f"{os.path.basename(pdf_path)} | Page {page_number + 1}: {len(text)} characters")

        full_text += text + "\n"

    document.close()

    return full_text


def clean_text(text):
    """
    Clean extracted PDF text.
    """

    # Remove multiple blank lines
    text = re.sub(r"\n\s*\n", "\n", text)

    # Remove multiple spaces and tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Remove page numbers like Page 1, PAGE 2, etc.
    text = re.sub(r"(?i)\bpage\s+\d+\b", "", text)

    # Remove arXiv header (if present)
    text = re.sub(r"arXiv:.*?\n", "", text)

    # Remove leading and trailing whitespace
    text = text.strip()

    return text


def process_pdf(pdf_path):

    # Extract text
    text = extract_text_from_pdf(pdf_path)

    # Clean text
    text = clean_text(text)

    # Output file name
    output_file = os.path.join(
        OUTPUT_FOLDER,
        os.path.basename(pdf_path).replace(".pdf", ".txt")
    )

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(text)

    print(f"{os.path.basename(pdf_path)} processed successfully.")

    # Return cleaned text to Module 5
    return text


def process_all_pdfs():

    for file_name in os.listdir(UPLOAD_FOLDER):

        if file_name.lower().endswith(".pdf"):

            pdf_path = os.path.join(UPLOAD_FOLDER, file_name)

            # Process PDF
            process_pdf(pdf_path)


if __name__ == "__main__":
    process_all_pdfs()