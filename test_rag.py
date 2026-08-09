import os
import json
import logging
from server.rag import RAGEngine

# Configure strict logging to prove the retrieval flow
logging.basicConfig(
    level=logging.INFO,
    format='[%(levelname)s] %(message)s'
)

def test_retrieval_flow(query: str):
    logging.info("="*50)
    logging.info(f"STARTING COMPLETE RETRIEVAL FLOW")
    logging.info("="*50)
    
    # 1. Initialize Engine (which connects to Pinecone & Gemini)
    engine = RAGEngine()
    
    # 2. Simulate User Query -> Pinecone Search -> Retrieve Context -> Gemini
    logging.info(f"User Query: '{query}'")
    
    response = engine.query(query)
    
    # 3. Output Response & Citations
    logging.info("="*50)
    logging.info(f"FINAL SYSTEM RESPONSE:")
    logging.info("="*50)
    print(f"\n{response['answer']}\n")
    
    logging.info("SOURCES CITED:")
    for src in response['sources']:
        print(f"- {src}")

if __name__ == "__main__":
    # Ensure env is loaded for standalone testing
    env_file = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v
                    
    test_query = "Tell me the story of Tejimola and its moral."
    test_retrieval_flow(test_query)
