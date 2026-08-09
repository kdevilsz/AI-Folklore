import os
import json
from pinecone import Pinecone, ServerlessSpec
from google import genai

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
FOLKTALES_JSON = os.path.join(DATA_DIR, "folktales.json")
PROVERBS_JSON = os.path.join(DATA_DIR, "proverbs.json")

INDEX_NAME = "assamese-folklore"
EMBEDDING_DIM = 3072  # For gemini-embedding-2

def _load_env():
    env_file = os.path.join(DATA_DIR, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v

_load_env()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")

if not GEMINI_API_KEY or not PINECONE_API_KEY:
    raise ValueError("GEMINI_API_KEY and PINECONE_API_KEY must be set in .env")

# Initialize Clients
gemini_client = genai.Client(api_key=GEMINI_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)

# Clear existing index to ingest fresh JSON data
if INDEX_NAME in pc.list_indexes().names():
    print(f"Deleting old Pinecone index '{INDEX_NAME}' to flush old vectors...")
    pc.delete_index(INDEX_NAME)

print(f"Creating Pinecone index '{INDEX_NAME}'...")
pc.create_index(
    name=INDEX_NAME,
    dimension=EMBEDDING_DIM,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)
index = pc.Index(INDEX_NAME)

import time

def get_embedding(text):
    time.sleep(1) # Sleep to avoid rate limits
    response = gemini_client.models.embed_content(
        model='gemini-embedding-2',
        contents=text
    )
    return response.embeddings[0].values

def ingest_file(filepath, item_type):
    print(f"Ingesting structured {item_type} data from {filepath}...")
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        return 0
        
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    entries = data.get("entries", [])
    chunks_to_upsert = []
    
    for i, item in enumerate(entries):
        item_id = item.get("id", f"{item_type}_{i}")
        
        if item_type == "folktale":
            title = item.get("title", "")
            summary = item.get("summary", "")
            characters = ", ".join(item.get("characters", []))
            themes = ", ".join(item.get("themes", []))
            moral = item.get("moral", "")
            cultural_significance = item.get("cultural_significance", "")
            source = item.get("source", "")
            
            semantic_text = f"Title: {title}\nType: Folktale\nSource: {source}\nCharacters: {characters}\nThemes: {themes}\nNarrative: {summary}\nMoral: {moral}\nCultural Significance: {cultural_significance}"
            
        elif item_type == "proverb":
            proverb = item.get("proverb", "")
            translation = item.get("translation", "")
            meaning = item.get("meaning", "")
            themes = ", ".join(item.get("theme", []))
            cultural_context = item.get("cultural_context", "")
            source = item.get("source", "")
            title = proverb
            
            semantic_text = f"Proverb: {proverb}\nTranslation: {translation}\nType: Proverb\nSource: {source}\nThemes: {themes}\nMeaning: {meaning}\nCultural Context: {cultural_context}"
            
        print(f"Embedding {item_id}...")
        embedding = get_embedding(semantic_text)
        
        chunks_to_upsert.append({
            "id": item_id,
            "values": embedding,
            "metadata": {
                "type": item_type,
                "text": semantic_text, # Save the rich text to be passed as context
                "source": source,
                "title": title
            }
        })
        
        # Batch upsert every 5 items to avoid large payloads
        if len(chunks_to_upsert) >= 5:
            index.upsert(vectors=chunks_to_upsert)
            chunks_to_upsert = []
            
    if chunks_to_upsert:
        index.upsert(vectors=chunks_to_upsert)
        
    return len(entries)

def main():
    total = 0
    total += ingest_file(FOLKTALES_JSON, "folktale")
    total += ingest_file(PROVERBS_JSON, "proverb")
    print(f"All ingestion complete! Total vectors upserted: {total}")

if __name__ == "__main__":
    main()
