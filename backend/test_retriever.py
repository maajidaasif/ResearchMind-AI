from services.retriever import Retriever


retriever = Retriever()


question = (
    "What accuracy, performance score, evaluation result, "
    "or benchmark result is reported in this research paper?"
)


results = retriever.retrieve_by_paper(
    question=question,
    paper_name="paper 1.pdf",
    top_k=3
)


print("\nQuestion:")
print(question)

print("\nSelected Paper:")
print("paper 1.pdf")

print("\nRetrieved Chunks:\n")


for i, item in enumerate(results, start=1):

    print(f"Chunk {i}")
    print("-" * 50)

    print("Paper Name:")
    print(item["paper_name"])

    print("\nContent:")
    print(item["chunk"])

    print()