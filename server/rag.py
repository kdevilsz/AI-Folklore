import pickle
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from google import genai
from google.genai import types

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
STORE_PATH = os.path.join(DATA_DIR, "server", "vector_store.pkl")

class RAGEngine:
    def __init__(self):
        self.chunks = []
        self.vectorizer = None
        self.tfidf_matrix = None
        self.client = None
        
        self.load_index()
        self._init_gemini()

    def load_index(self):
        if not os.path.exists(STORE_PATH):
            print("Vector store not found. Please run ingest.py first.")
            return
            
        with open(STORE_PATH, 'rb') as f:
            store = pickle.load(f)
            self.chunks = store["chunks"]
            self.vectorizer = store["vectorizer"]
            self.tfidf_matrix = store["tfidf_matrix"]
        print(f"Loaded {len(self.chunks)} chunks into RAG Engine.")

    def _init_gemini(self):
        env_file = os.path.join(DATA_DIR, ".env")
        if os.path.exists(env_file):
            with open(env_file, "r") as f:
                for line in f:
                    if line.strip().startswith("GEMINI_API_KEY="):
                        os.environ["GEMINI_API_KEY"] = line.strip().split("=", 1)[1]
                        break
        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key:
            self.client = genai.Client(api_key=api_key)
        else:
            print("Warning: GEMINI_API_KEY not set. Chat generation will fail or use mock.")

    def retrieve(self, query: str, top_k: int = 5):
        if not self.vectorizer or not self.tfidf_matrix is not None:
            return []
            
        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        top_indices = similarities.argsort()[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            if similarities[idx] > 0.0:  # Only include if there's some match
                results.append(self.chunks[idx])
        return results

    def query(self, user_query: str):
        relevant_chunks = self.retrieve(user_query, top_k=5)
        
        if not relevant_chunks:
            return {
                "answer": "I couldn't find any relevant folklore information for your query.",
                "sources": []
            }
            
        context_parts = []
        sources = []
        for i, chunk in enumerate(relevant_chunks):
            context_parts.append(f"Source {i+1} ({chunk['book']}, Page {chunk['page']}):\n{chunk['text']}")
            src_str = f"{chunk['book']} (Page {chunk['page']})"
            if src_str not in sources:
                sources.append(src_str)
                
        context = "\n\n".join(context_parts)
        
        prompt = f"""You are LoreBridge, an AI assistant specialized in Assamese folklore.
Answer the user's question based ONLY on the following context. If the context does not contain the answer, say "I don't have enough information from the folklore texts to answer that."

Context:
{context}

Question:
{user_query}

Answer in a clear, friendly tone.
"""

        if not self.client:
            return {
                "answer": f"[Mock Mode: No GEMINI_API_KEY]\n\nI found {len(relevant_chunks)} relevant passages. Based on them, the context mentions: {relevant_chunks[0]['text'][:100]}...",
                "sources": sources
            }
            
        try:
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3
                )
            )
            return {
                "answer": response.text,
                "sources": sources
            }
        except Exception as e:
            return {
                "answer": f"Error communicating with Gemini API: {str(e)}",
                "sources": sources
            }

# Global instance
engine = RAGEngine()
