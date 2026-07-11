from services.retriever import Retriever

retriever = Retriever()

question = "What is the Transformer model?"

results = retriever.retrieve(question)

print("\nQuestion:")
print(question)

print("\nRetrieved Chunks:\n")

for i, chunk in enumerate(results, start=1):
    print(f"Chunk {i}")
    print("-" * 50)
    print(chunk)
    print()