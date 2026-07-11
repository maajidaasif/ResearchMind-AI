import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer


class Retriever:

    def __init__(self):
        # Load the embedding model
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        # Load the FAISS index
        self.index = faiss.read_index("vector_db/faiss_index.bin")

        # Load metadata
        with open("vector_db/metadata.pkl", "rb") as file:
            self.metadata = pickle.load(file)

    def retrieve(self, question, top_k=3):
        # Convert the question into an embedding
        question_embedding = self.model.encode(question)

        # Convert to NumPy float32 array
        question_embedding = np.array([question_embedding]).astype("float32")

        # Search the FAISS index
        distances, indices = self.index.search(question_embedding, top_k)

        # Store retrieved results
        results = []

        # Retrieve metadata for each matching chunk
        for index in indices[0]:
            results.append(self.metadata[index])

        # Return the retrieved chunks
        return results