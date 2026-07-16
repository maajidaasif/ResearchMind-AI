from comparison.paper_comparison import PaperComparisonEngine


comparison_engine = PaperComparisonEngine()

result = comparison_engine.compare_papers()


if result["success"]:
    print("\n========== PAPER COMPARISON RESULT ==========\n")
    print(result["comparison"])
else:
    print(result["message"])