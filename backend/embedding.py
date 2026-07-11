import os
import pickle

from sentence_transformers import SentenceTransformer

from chunking import split_text
from services.pdf_processing import process_pdf
from services.vector_database import VectorDatabase


embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):
    embeddings = embedding_model.encode(chunks)
    return embeddings


if __name__ == "__main__":

    pdf_path = "uploads/Paper 1-Attention Is All You Need.pdf"

    cleaned_text = process_pdf(pdf_path)

    chunks = split_text(cleaned_text)

    embeddings = generate_embeddings(chunks)

    metadata = []

    for chunk in chunks:
        metadata.append(chunk)

    db = VectorDatabase()

    db.create_database(embeddings, metadata)

    db.save_database()

    print("\nFAISS Database Created Successfully!")

    print("Total Chunks :", len(chunks))

    print("Total Embeddings :", len(embeddings))