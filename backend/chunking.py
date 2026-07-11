from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)
def split_text(cleaned_text):
    chunks = text_splitter.split_text(cleaned_text)
    return chunks



if __name__ == "__main__":

    sample_text = """
    Artificial Intelligence is transforming healthcare.

    Machine learning helps doctors predict diseases.

    Deep learning improves medical image analysis.

    Natural Language Processing assists in clinical documentation.

    Researchers continue improving AI models every year.
    """

    chunks = split_text(sample_text)

    print("Total Chunks:", len(chunks))
    print()

    for i, chunk in enumerate(chunks, start=1):
        print(f"Chunk {i}")
        print("-" * 40)
        print(chunk)
        print()