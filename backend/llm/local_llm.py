from llama_cpp import Llama

llm = Llama(
    model_path="models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",
    n_ctx=2048,
    verbose=False
)


def ask_llm(question, context):

    prompt = f"""
You are an AI Research Assistant.

Answer ONLY using the research paper context provided below.

If the answer is not available in the context, reply exactly:

I could not find the answer in the uploaded research papers.

Research Paper Context:
{context}

Question:
{question}

Answer:
"""

    response = llm(
        prompt,
        max_tokens=512,
        temperature=0.3,
        stop=["Question:"]
    )

    return response["choices"][0]["text"].strip()