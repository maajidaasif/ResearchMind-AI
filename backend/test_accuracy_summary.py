from llm.local_llm import ask_llm
from comparison.paper_comparison import PaperComparisonEngine


engine = PaperComparisonEngine()

paper_name = "paper 1.pdf"

# Get the best chunk using the new method
chunk = engine.get_best_chunk(
    paper_name=paper_name,
    query=(
        "What accuracy, performance score, "
        "evaluation result, BLEU score, "
        "F1 score or benchmark result "
        "is reported in this research paper?"
    )
)

print("\n========== RETRIEVED EVIDENCE ==========\n")
print(chunk)


question = """
Read the context and report only the BLEU score values.

Return format:
BLEU scores: value1, value2

Do not explain anything.
"""

answer = ask_llm(
    question=question,
    context=chunk,
    max_tokens=40
)

print("\n========== LOCAL LLM ANSWER ==========\n")
print(answer)