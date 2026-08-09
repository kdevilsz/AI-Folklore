import os
import json
import time
from google import genai
from google.genai import types

# Import the local RAG engine
from rag import engine, DATA_DIR

BENCHMARK_PATH = os.path.join(DATA_DIR, "server", "eval_benchmark.json")
RESULTS_PATH = os.path.join(DATA_DIR, "eval_results.json")

def evaluate_rag():
    if not os.path.exists(BENCHMARK_PATH):
        print(f"Benchmark file not found at {BENCHMARK_PATH}")
        return

    with open(BENCHMARK_PATH, "r", encoding="utf-8") as f:
        benchmarks = json.load(f)

    results = []
    
    # We will use Gemini to judge the responses
    client = engine.gemini_client
    if not client:
        print("Gemini client not initialized.")
        return

    for item in benchmarks:
        q_id = item.get("id")
        question = item.get("question")
        expected_ans = item.get("expected_answer")
        
        print(f"Running Eval for: {question}")
        
        # 1. Query RAG
        rag_response = engine.query(question)
        generated_ans = rag_response.get("answer", "")
        
        # 2. LLM-as-a-judge
        eval_prompt = f"""You are an impartial judge evaluating a RAG (Retrieval-Augmented Generation) system.
Please score the following Generated Answer against the Expected Answer based on these 5 dimensions. 
Rate each dimension on a scale of 1 to 5, where 5 is excellent and 1 is terrible.

Question: {question}
Expected Answer: {expected_ans}
Generated Answer: {generated_ans}

Evaluate on:
- Retrieval Accuracy: Did the system seem to retrieve the correct information?
- Citation Accuracy: Did the system provide inline citations as requested?
- Hallucination Rate: Is the system hallucinating facts not in the Expected Answer? (Score 5 if NO hallucinations, 1 if highly hallucinated).
- Context Relevance: How relevant is the generated answer to the question?
- Response Quality: How well written and formatted is the response?

Output EXACTLY this JSON structure, nothing else:
{{
  "retrieval": 0,
  "citation": 0,
  "hallucination": 0,
  "relevance": 0,
  "quality": 0,
  "critique": "Short explanation of the scores."
}}
"""
        
        try:
            judge_res = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=eval_prompt,
                config=types.GenerateContentConfig(
                    temperature=0.0,
                    response_mime_type="application/json"
                )
            )
            scores = json.loads(judge_res.text)
        except Exception as e:
            print(f"Error evaluating {q_id}: {e}")
            scores = {"retrieval": 0, "citation": 0, "hallucination": 0, "relevance": 0, "quality": 0, "critique": str(e)}

        results.append({
            "id": q_id,
            "question": question,
            "expected_answer": expected_ans,
            "generated_answer": generated_ans,
            "scores": scores
        })
        
        # Simple rate limiting to avoid 429 quota exhaustion on free tier
        time.sleep(4)

    # Save results
    with open(RESULTS_PATH, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)
        
    print(f"Evaluation complete. Results saved to {RESULTS_PATH}")

if __name__ == "__main__":
    evaluate_rag()
