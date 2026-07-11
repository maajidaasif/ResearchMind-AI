import os
import pickle
import faiss
import numpy as np


class VectorDatabase:

    def __init__(self):

        self.index = None

        self.metadata = []

        self.dimension = 384


    def create_database(self, embeddings, metadata):

        vectors = np.array(embeddings).astype("float32")

        self.index = faiss.IndexFlatL2(self.dimension)

        self.index.add(vectors)

        self.metadata = metadata


    def save_database(self):

        os.makedirs("vector_db", exist_ok=True)

        faiss.write_index(
            self.index,
            "vector_db/faiss_index.bin"
        )

        with open(
            "vector_db/metadata.pkl",
            "wb"
        ) as file:

            pickle.dump(
                self.metadata,
                file
            )


    def load_database(self):

        self.index = faiss.read_index(
            "vector_db/faiss_index.bin"
        )

        with open(
            "vector_db/metadata.pkl",
            "rb"
        ) as file:

            self.metadata = pickle.load(file)