from comparison.paper_comparison import PaperComparisonEngine
from comparison.cross_comparison import CrossComparisonEngine


# Module 8A
paper_engine = PaperComparisonEngine()

paper_result = paper_engine.compare_papers()


# Module 8B
cross_engine = CrossComparisonEngine()

final_result = cross_engine.compare(
    paper_result
)


print("\n========== CROSS PAPER COMPARISON ==========\n")

print(
    final_result["cross_comparison"]
)