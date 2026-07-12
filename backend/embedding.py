import os

from sentence_transformers import SentenceTransformer

from chunking import split_text
from services.pdf_processing import process_pdf
from services.vector_database import VectorDatabase


embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):
    embeddings = embedding_model.encode(chunks)
    return embeddings


if __name__ == "__main__":

    all_chunks = []
    metadata = []

    uploads_folder = "uploads"

    pdf_files = [
        file for file in os.listdir(uploads_folder)
        if file.lower().endswith(".pdf")
    ]

    print(f"\nFound {len(pdf_files)} PDF(s).\n")

    for pdf_file in pdf_files:

        pdf_path = os.path.join(uploads_folder, pdf_file)

        print(f"Processing: {pdf_file}")

        cleaned_text = process_pdf(pdf_path)

        chunks = split_text(cleaned_text)

        all_chunks.extend(chunks)

        for chunk in chunks:
            metadata.append({
                "paper_name": pdf_file,
                "chunk": chunk
            })

    embeddings = generate_embeddings(all_chunks)

    db = VectorDatabase()

    db.create_database(embeddings, metadata)

    db.save_database()

    print("\n===================================")
    print("FAISS Database Created Successfully!")
    print("===================================")
    print(f"Total PDFs       : {len(pdf_files)}")
    print(f"Total Chunks     : {len(all_chunks)}")
    print(f"Total Embeddings : {len(embeddings)}")