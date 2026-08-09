import os
import logging
from google import genai
from google.genai import types
from pinecone import Pinecone

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

DATA_DIR = os.getenv("DATA_DIR", os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
INDEX_NAME = "assamese-folklore"

def _load_env():
    env_file = os.path.join(DATA_DIR, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v

class RAGEngine:
    def __init__(self):
        _load_env()
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY")
        self.pinecone_api_key = os.environ.get("PINECONE_API_KEY")
        
        self.gemini_client = None
        self.pinecone_index = None
        
        if self.gemini_api_key:
            self.gemini_client = genai.Client(api_key=self.gemini_api_key)
        else:
            print("Warning: GEMINI_API_KEY not set.")
            
        if self.pinecone_api_key:
            pc = Pinecone(api_key=self.pinecone_api_key)
            if INDEX_NAME in pc.list_indexes().names():
                self.pinecone_index = pc.Index(INDEX_NAME)
            else:
                print(f"Warning: Pinecone index {INDEX_NAME} not found. Run ingest_pinecone.py")
        else:
            print("Warning: PINECONE_API_KEY not set.")

    def _get_embedding(self, text):
        if not self.gemini_client:
            return []
        response = self.gemini_client.models.embed_content(
            model='gemini-embedding-2',
            contents=text
        )
        return response.embeddings[0].values

    def hybrid_retrieve(self, query: str, top_k: int = 12):
        if not self.pinecone_index or not self.gemini_client:
            return []
            
        query_embedding = self._get_embedding(query)
        
        # Over-fetch for re-ranking
        fetch_k = max(top_k * 2, 24)
        results = self.pinecone_index.query(
            vector=query_embedding,
            top_k=fetch_k,
            include_metadata=True
        )
        
        matches = results.get("matches", [])
        if not matches:
            return []
            
        # Convert matches to dict
        dict_matches = []
        for match in matches:
            semantic_score = match.score if hasattr(match, 'score') else match.get("score", 0.0)
            meta = match.metadata if hasattr(match, 'metadata') else match.get("metadata", {})
            
            dict_matches.append({
                "score": semantic_score,
                "metadata": meta
            })
            
        # Sort by the semantic score descending
        dict_matches.sort(key=lambda x: x.get("score", 0.0), reverse=True)
        
        return dict_matches[:top_k]

    def query(self, user_query: str, history: list[dict] = None):
        if not self.gemini_client or not self.pinecone_index:
            return {
                "answer": "Error: RAG Engine is missing API keys or Pinecone index.",
                "sources": []
            }
            
        search_query = user_query
        history_text = ""
        if history and len(history) > 0:
            history_text = "\n".join([f"{item['role'].capitalize()}: {item['text']}" for item in history])
            
            rewrite_prompt = f"""Given the following conversation history and the latest user query, rewrite the user query into a clear, standalone search query that includes all necessary context (like names or subjects mentioned previously).
Do not answer the query, just provide the rewritten standalone query text.

Conversation History:
{history_text}

Latest User Query:
{user_query}

Standalone Search Query:"""
            
            try:
                rewrite_res = self.gemini_client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=rewrite_prompt,
                    config=types.GenerateContentConfig(temperature=0.0)
                )
                search_query = rewrite_res.text.strip()
                print(f"Rewritten search query: {search_query}")
            except Exception as e:
                print(f"Query rewrite failed: {e}")
                # Fallback to appending
                last_user_queries = [item['text'] for item in history if item['role'] == 'user']
                if last_user_queries:
                    search_query = f"{last_user_queries[-1]} {user_query}"

        matches = self.hybrid_retrieve(search_query, top_k=12)
        
        try:
            import json
            analytics_path = os.path.join(DATA_DIR, "analytics.json")
            if os.path.exists(analytics_path):
                with open(analytics_path, "r", encoding="utf-8") as f:
                    analytics = json.load(f)
                analytics.setdefault("searches", []).append(user_query)
                if not analytics.get("retrievals"):
                    analytics["retrievals"] = {"success": 0, "failed": 0}
                if matches:
                    analytics["retrievals"]["success"] += 1
                else:
                    analytics["retrievals"]["failed"] += 1
                with open(analytics_path, "w", encoding="utf-8") as f:
                    json.dump(analytics, f, indent=4, ensure_ascii=False)
        except Exception as e:
            logging.error(f"Failed to track analytics: {e}")
        
        try:
            # Safe logging that won't crash on Windows with Assamese characters
            docs_info = [(m['metadata'].get('title', 'Unknown').encode('utf-8', 'replace').decode('utf-8'), round(m['score'], 4)) for m in matches]
            logging.info(f"Retrieved Documents: {docs_info}")
        except Exception:
            logging.info("Retrieved Documents: [Omitted due to encoding]")
        
        if not matches:
            return {
                "answer": "I couldn't find any relevant folklore information for your query.",
                "sources": [],
                "confidence": 0
            }
            
        top_score = matches[0].get("score", 0.0)
        confidence_percent = min(100, int(top_score * 100))
        
        context_parts = []
        sources = []
        source_map = {}
        for match in matches:
            meta = match.get("metadata", {})
            text = meta.get("text", "")
            title = meta.get("title", "Unknown")
            source_doc = meta.get("source", "Unknown Source")
            
            src_str = f"{title} ({source_doc})"
            if src_str not in source_map:
                sources.append(src_str)
                source_map[src_str] = len(sources) # 1-based index
                
            idx = source_map[src_str]
            context_parts.append(f"Source {idx} [{meta.get('type', 'folklore')} - {title}]:\n{text}")
                
        context = "\n\n".join(context_parts)
        logging.info(f"Context Sent to Gemini:\n{context}")
        
        prompt = f"""You are the LoreBridge Oracle Skill, an expert AI assistant specializing in Assamese folklore and proverbs.
Your task is to synthesize the data gracefully, translating cultural nuances correctly.
CRITICAL: You must ALWAYS provide a bilingual response (Assamese + English). If the context contains Assamese script, you MUST include it verbatim. Even if not, provide Assamese translations for key terms, titles, or morals. DO NOT output only English.
CRITICAL CONSTRAINT: You MUST base your entire answer ONLY on the provided Context below. Do not use outside knowledge. If the context does not contain the answer, say "I don't have enough information from the ancient texts to answer that."

You MUST format your output with these exact Markdown headers at the very beginning of your response so the frontend parser can map it instantly into UI elements:
**Title:** [Insert the Narrative Title or Metaphor here (Assamese + English)]
**Roots:** [Insert Cultural Roots here, e.g., Plains, Khasi, Garo, Mikir, Burhi Aair Sadhu, etc.]
**Moral:** [Insert Implied Moral or Theme here]

After providing these three headers, output the main story narrative or proverb explanation in clear, engaging paragraphs based ONLY on the provided context. Do not include the headers inside the narrative body again.

CRITICAL INLINE CITATIONS: Whenever you state a fact, event, or synthesize information from a source in the narrative body, you MUST append a bracketed numerical footnote mapping to the Source number provided in the context (e.g., [1] or [2]). 
Example: "The stepmother turned her into a pumpkin vine [1]."
Do not add citations inside the **Headers**, only in the narrative body.

AT THE END OF YOUR RESPONSE, you MUST include a "Retrieval Explanation" section formatted EXACTLY as follows:
**Retrieval Explanation:**
1. **Entries Retrieved:** [List the titles of the stories/proverbs you used]
2. **Why Selected:** [Briefly explain why these specific entries match the user's query]
3. **Sources Used:** [List the sources from the context]

Previous Conversation History:
{history_text}

Context:
{context}

Question:
{user_query}
"""

        import time
        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = self.gemini_client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.3
                    )
                )
                try:
                    logging.info(f"Gemini Response Generated")
                except:
                    pass
                return {
                    "answer": response.text,
                    "sources": sources,
                    "confidence": confidence_percent
                }
            except Exception as e:
                err_str = str(e)
                if "429" in err_str and attempt < max_retries - 1:
                    logging.warning(f"Rate limited (429). Retrying in 5 seconds... (Attempt {attempt+1}/{max_retries})")
                    time.sleep(5)
                else:
                    return {
                        "answer": "Error: The Oracle is currently meditating and unable to process requests (API Rate Limit Exceeded). Please wait a few moments and try again.",
                        "sources": sources,
                        "confidence": 0
                    }

# Global instance
engine = RAGEngine()
