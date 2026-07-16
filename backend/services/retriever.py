import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer


class Retriever:

    def __init__(self):

        # Load embedding model
        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        # Load FAISS index
        self.index = faiss.read_index(
            "vector_db/faiss_index.bin"
        )

        # Load metadata
        with open(
            "vector_db/metadata.pkl",
            "rb"
        ) as file:

            self.metadata = pickle.load(file)


    def retrieve(
        self,
        question,
        top_k=3
    ):

        question_embedding = self.model.encode(
            question
        )

        question_embedding = np.array(
            [question_embedding],
            dtype="float32"
        )

        distances, indices = self.index.search(
            question_embedding,
            top_k
        )

        results = []

        for idx in indices[0]:

            results.append(
                self.metadata[idx]
            )

        return results


    def retrieve_by_paper(
        self,
        question,
        paper_name,
        top_k=3
    ):

        question_embedding = self.model.encode(
            question
        )

        question_embedding = np.array(
            [question_embedding],
            dtype="float32"
        )

        total_chunks = len(self.metadata)

        distances, indices = self.index.search(
            question_embedding,
            total_chunks
        )

        results = []

        for idx in indices[0]:

            item = self.metadata[idx]

            if item["paper_name"] == paper_name:

                results.append(item)

            if len(results) >= top_k:
                break

        return results


    # ---------------------------------------------------
    # NEW METHOD
    # Returns merged context from Top-K chunks
    # ---------------------------------------------------

    def retrieve_context_by_paper(
        self,
        question,
        paper_name,
        top_k=3
    ):

        chunks = self.retrieve_by_paper(
            question=question,
            paper_name=paper_name,
            top_k=top_k
        )

        if len(chunks) == 0:

            return None

        merged_context = []

        for item in chunks:

            chunk = item.get("chunk")

            if chunk:

                merged_context.append(
                    chunk.strip()
                )

        if len(merged_context) == 0:

            return None

        return "\n\n".join(
            merged_context
        )