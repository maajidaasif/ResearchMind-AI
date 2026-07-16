from llm.local_llm import ask_llm


class CrossComparisonEngine:

    def __init__(self):
        pass


    def clean_section(
        self,
        section_name,
        section_content
    ):
        """
        Remove invalid summaries before comparison.
        """

        cleaned_lines = []

        for line in section_content.splitlines():

            line = line.strip()

            if not line:
                continue

            if (
                "I could not find the answer" in line
                or
                "Not available in the provided context" in line
            ):
                continue

            cleaned_lines.append(line)

        return "\n".join(cleaned_lines)
    
    def compare_section(
        self,
        section_name,
        section_content
    ):

        section_content = self.clean_section(
            section_name,
            section_content
        )

        if section_content.strip() == "":

            return (
                "Insufficient information is available "
                "to compare this section."
            )

        prompt = f"""
You are an AI Research Paper Comparison Assistant.

Compare ONLY the research paper summaries provided below.

Rules:
1. Use ONLY the provided summaries.
2. Do NOT use outside knowledge.
3. Ignore missing papers.
4. Write under these headings:

Similarity:
- ...

Differences:
- ...

Key Insight:
- ...

Research Paper Summaries:

{section_content}
"""

        answer = ask_llm(
            question=prompt,
            context=section_content,
            max_tokens=220
        )

        return answer.strip()
    
    def generate_overall_conclusion(
        self,
        report_sections
    ):

        report_text = "\n\n".join(
            report_sections
        )

        prompt = f"""
You are an AI Research Assistant.

Based ONLY on the comparison results below, write a final conclusion.

Rules:
1. Use ONLY the provided comparison results.
2. Do NOT use outside knowledge.
3. Mention:
   - Overall Research Trend
   - Common Strengths
   - Common Limitations
   - Future Research Direction
4. Keep the answer under 10 sentences.

Comparison Results:

{report_text}

Overall Conclusion:
"""

        conclusion = ask_llm(
            question=prompt,
            context=report_text,
            max_tokens=250
        )

        return conclusion.strip()
    
    def generate_report(
        self,
        paper_comparison_output
    ):

        sections = [

            "Methodology Comparison",
            "Accuracy Comparison",
            "Dataset Comparison",
            "Advantages",
            "Limitations",
            "Future Work Comparison"

        ]

        report = []

        for i, section in enumerate(sections):

            start = paper_comparison_output.find(section)

            if start == -1:
                continue

            if i < len(sections) - 1:

                end = paper_comparison_output.find(
                    sections[i + 1]
                )

                section_text = paper_comparison_output[
                    start:end
                ]

            else:

                section_text = paper_comparison_output[
                    start:
                ]

            print("\n====================================")
            print("COMPARING:", section)
            print("====================================")

            comparison = self.compare_section(
                section_name=section,
                section_content=section_text
            )

            report.append(

                f"{section}\n\n{comparison}"

            )

        overall = self.generate_overall_conclusion(
            report
        )

        report.append(

            "Overall Conclusion\n\n"
            + overall

        )

        return (

            "\n\n"

            "========================================"

            "\n\n"

        ).join(report)


    def compare(
        self,
        paper_comparison_result
    ):

        if isinstance(
            paper_comparison_result,
            dict
        ):

            paper_comparison_result = (
                paper_comparison_result.get(
                    "comparison",
                    ""
                )
            )

        final_report = self.generate_report(
            paper_comparison_result
        )

        return {

            "success": True,

            "cross_comparison": final_report

        }