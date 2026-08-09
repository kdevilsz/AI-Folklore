from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import sys
import json
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv

# Load env variables for deployment
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

# Add current dir to path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from rag import engine

# Rate Limiter setup
limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import math

# Semantic Cache Registry
semantic_cache = []

def cosine_similarity(v1, v2):
    dot_product = sum(a * b for a, b in zip(v1, v2))
    magnitude1 = math.sqrt(sum(a * a for a in v1))
    magnitude2 = math.sqrt(sum(b * b for b in v2))
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    return dot_product / (magnitude1 * magnitude2)

class ChatRequest(BaseModel):
    query: str
    history: list[dict] | None = None

@app.post("/api/chat")
@limiter.limit("10/minute")
def chat(request: Request, chat_request: ChatRequest):
    print(f"Running RAG Pipeline for query: {chat_request.query}")
    response = engine.query(chat_request.query, history=chat_request.history)
    return response

from validate_data import validate_folktales, validate_proverbs, FOLKTALES_JSON, PROVERBS_JSON

@app.get("/api/admin/status")
def get_status():
    ft_ok = validate_folktales()
    pr_ok = validate_proverbs()
    # Pinecone status mockup/approximate
    pinecone_vectors = 24
    return {
        "folktales_valid": ft_ok,
        "proverbs_valid": pr_ok,
        "pinecone_synced": True,
        "vector_count": pinecone_vectors
    }

@app.get("/api/admin/data")
def get_data():
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f)
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f)
    return {
        "folktales": ft.get("entries", []),
        "proverbs": pr.get("entries", [])
    }

@app.post("/api/admin/folktale")
def add_folktale(data: dict):
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f)
    # Generate random id or sequence
    new_id = f"ft_{len(ft['entries']) + 1:03d}"
    data["id"] = new_id
    ft["entries"].append(data)
    with open(FOLKTALES_JSON, "w", encoding="utf-8") as f:
        json.dump(ft, f, indent=4, ensure_ascii=False)
    return {"status": "success", "id": new_id}

@app.put("/api/admin/folktale/{item_id}")
def update_folktale(item_id: str, data: dict):
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f)
    for i, item in enumerate(ft["entries"]):
        if item.get("id") == item_id:
            data["id"] = item_id # enforce
            ft["entries"][i] = data
            break
    with open(FOLKTALES_JSON, "w", encoding="utf-8") as f:
        json.dump(ft, f, indent=4, ensure_ascii=False)
    return {"status": "success"}

@app.delete("/api/admin/folktale/{item_id}")
def delete_folktale(item_id: str):
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f)
    ft["entries"] = [item for item in ft["entries"] if item.get("id") != item_id]
    with open(FOLKTALES_JSON, "w", encoding="utf-8") as f:
        json.dump(ft, f, indent=4, ensure_ascii=False)
    return {"status": "success"}

@app.post("/api/admin/proverb")
def add_proverb(data: dict):
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f)
    new_id = f"pr_{len(pr['entries']) + 1:03d}"
    data["id"] = new_id
    pr["entries"].append(data)
    with open(PROVERBS_JSON, "w", encoding="utf-8") as f:
        json.dump(pr, f, indent=4, ensure_ascii=False)
    return {"status": "success", "id": new_id}

@app.put("/api/admin/proverb/{item_id}")
def update_proverb(item_id: str, data: dict):
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f)
    for i, item in enumerate(pr["entries"]):
        if item.get("id") == item_id:
            data["id"] = item_id
            pr["entries"][i] = data
            break
    with open(PROVERBS_JSON, "w", encoding="utf-8") as f:
        json.dump(pr, f, indent=4, ensure_ascii=False)
    return {"status": "success"}

@app.delete("/api/admin/proverb/{item_id}")
def delete_proverb(item_id: str):
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f)
    pr["entries"] = [item for item in pr["entries"] if item.get("id") != item_id]
    with open(PROVERBS_JSON, "w", encoding="utf-8") as f:
        json.dump(pr, f, indent=4, ensure_ascii=False)
    return {"status": "success"}

DATA_DIR = os.path.dirname(FOLKTALES_JSON)
ANALYTICS_JSON = os.path.join(DATA_DIR, "analytics.json")

def load_analytics():
    if not os.path.exists(ANALYTICS_JSON):
        return {"views": {}, "searches": [], "retrievals": {"success": 0, "failed": 0}}
    with open(ANALYTICS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def save_analytics(data):
    with open(ANALYTICS_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

@app.post("/api/analytics/view/{item_id}")
def log_view(item_id: str):
    data = load_analytics()
    data["views"][item_id] = data["views"].get(item_id, 0) + 1
    save_analytics(data)
    return {"status": "success"}

from collections import Counter

@app.get("/api/admin/analytics")
def get_analytics():
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f).get("entries", [])
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f).get("entries", [])
        
    total_stories = len(ft)
    total_proverbs = len(pr)
    
    sources = set()
    title_map = {}
    for item in ft:
        sources.add(item.get("source", "Oral Tradition"))
        title_map[item.get("id")] = item.get("title")
    for item in pr:
        sources.add(item.get("source", "Oral Tradition"))
        title_map[item.get("id")] = item.get("proverb")
        
    analytics = load_analytics()
    
    succ = analytics["retrievals"].get("success", 0)
    fail = analytics["retrievals"].get("failed", 0)
    total_retrievals = succ + fail
    success_rate = (succ / total_retrievals * 100) if total_retrievals > 0 else 0
    
    # Simple word counting from search queries to find themes
    stop_words = {"what", "is", "the", "a", "an", "of", "and", "in", "to", "for", "on", "with", "about", "tell", "me", "story", "proverb"}
    words = []
    for q in analytics.get("searches", []):
        for w in q.lower().split():
            clean_w = ''.join(e for e in w if e.isalnum())
            if clean_w and clean_w not in stop_words:
                words.append(clean_w)
    
    top_themes = [w[0] for w in Counter(words).most_common(5)]
    
    # Top viewed stories
    sorted_views = sorted(analytics.get("views", {}).items(), key=lambda x: x[1], reverse=True)
    top_viewed = []
    for item_id, count in sorted_views[:5]:
        top_viewed.append({"id": item_id, "title": title_map.get(item_id, item_id), "views": count})
        
    return {
        "total_stories": total_stories,
        "total_proverbs": total_proverbs,
        "total_sources": len(sources),
        "retrieval_success_rate": round(success_rate, 2),
        "most_searched_themes": top_themes,
        "most_viewed_stories": top_viewed
    }

@app.get("/api/graph")
def get_graph():
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f).get("entries", [])
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f).get("entries", [])
        
    nodes = []
    edges = []
    theme_set = set()
    
    # Process Folktales
    for item in ft:
        entry_id = item.get("id")
        nodes.append({
            "id": entry_id,
            "label": item.get("title", ""),
            "group": "folktale",
            "title": "Folktale: " + item.get("summary", "")[:100] + "..."
        })
        for theme in item.get("themes", []):
            t = theme.lower().strip()
            theme_set.add(t)
            edges.append({"from": entry_id, "to": f"theme_{t}"})
            
    # Process Proverbs
    for item in pr:
        entry_id = item.get("id")
        nodes.append({
            "id": entry_id,
            "label": item.get("proverb", ""),
            "group": "proverb",
            "title": "Proverb: " + item.get("translation", "")
        })
        for theme in item.get("theme", []):
            t = theme.lower().strip()
            theme_set.add(t)
            edges.append({"from": entry_id, "to": f"theme_{t}"})
            
    # Add theme nodes
    for t in theme_set:
        nodes.append({
            "id": f"theme_{t}",
            "label": t.title(),
            "group": "theme"
        })
        
    return {"nodes": nodes, "edges": edges}

def jaccard_similarity(s1, s2):
    s1_words = set(s1.lower().split())
    s2_words = set(s2.lower().split())
    if not s1_words or not s2_words: return 0.0
    return len(s1_words.intersection(s2_words)) / len(s1_words.union(s2_words))

def find_related_stories(story_id: str):
    # Load folklore_data.json
    filepath = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "folklore_data.json"))
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    entries = data.get("entries", [])
    
    # Find current story
    current = None
    for entry in entries:
        if entry.get("id") == story_id:
            current = entry
            break
            
    if not current:
        return []
        
    current_themes = set(t.lower().strip() for t in current.get("metadata", {}).get("themes", []))
    current_moral = current.get("moral", "").lower().strip()
    
    matches = []
    
    for entry in entries:
        if entry.get("id") == story_id or entry.get("type") != "folktale":
            continue
            
        themes = set(t.lower().strip() for t in entry.get("metadata", {}).get("themes", []))
        shared_themes = current_themes.intersection(themes)
        
        score = len(shared_themes)
        
        # Calculate moral overlap
        moral = entry.get("moral", "").lower().strip()
        moral_words = set(w for w in moral.split() if len(w) > 3)
        current_moral_words = set(w for w in current_moral.split() if len(w) > 3)
        shared_moral_words = current_moral_words.intersection(moral_words)
        
        matches.append({
            "entry": entry,
            "shared_themes_count": score,
            "shared_moral_count": len(shared_moral_words)
        })
        
    # Filter matches that share 2+ themes
    primary_matches = [m for m in matches if m["shared_themes_count"] >= 2]
    primary_matches.sort(key=lambda x: (x["shared_themes_count"], x["shared_moral_count"]), reverse=True)
    
    results = [m["entry"] for m in primary_matches]
    
    # If not enough results, fallback to 1 theme or moral match
    if len(results) < 3:
        remaining = 3 - len(results)
        fallback_candidates = [m for m in matches if m["entry"] not in results]
        fallback_candidates.sort(key=lambda x: (x["shared_moral_count"], x["shared_themes_count"]), reverse=True)
        results.extend([m["entry"] for m in fallback_candidates[:remaining]])
        
    ret = []
    for r in results[:3]:
        summary = r.get("english", "")
        # Get one-sentence or truncated summary
        if "." in summary:
            one_liner = summary.split(".")[0] + "."
        else:
            one_liner = summary[:100] + "..."
            
        ret.append({
            "id": r.get("id"),
            "title": r.get("title"),
            "summary": one_liner,
            "themes": r.get("metadata", {}).get("themes", []),
            "moral": r.get("moral")
        })
        
    return ret

@app.get("/api/related/{story_id}")
def get_related(story_id: str):
    return find_related_stories(story_id)

@app.get("/api/admin/quality")
def get_quality():
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        ft = json.load(f).get("entries", [])
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        pr = json.load(f).get("entries", [])

    missing_fields = []
    duplicates = []
    theme_dist = {}
    source_dist = {}
    total_verified = 0

    # 1. Process Folktales
    for i, item in enumerate(ft):
        # Missing Fields
        if not item.get("themes"): missing_fields.append({"id": item.get("id"), "type": "folktale", "issue": "Missing themes"})
        if not item.get("characters"): missing_fields.append({"id": item.get("id"), "type": "folktale", "issue": "Missing characters"})
        if not item.get("moral"): missing_fields.append({"id": item.get("id"), "type": "folktale", "issue": "Missing moral"})
        
        # Verification
        if item.get("verified") is True: total_verified += 1
        
        # Theme Distribution
        for t in item.get("themes", []):
            theme = t.lower().strip()
            theme_dist[theme] = theme_dist.get(theme, 0) + 1
            
        # Source Distribution
        src = item.get("source", "Oral Tradition").strip()
        source_dist[src] = source_dist.get(src, 0) + 1

        # Duplicate Check
        for j in range(i + 1, len(ft)):
            other = ft[j]
            # Exact title match
            if item.get("title", "").strip().lower() == other.get("title", "").strip().lower():
                duplicates.append({"id1": item.get("id"), "id2": other.get("id"), "type": "folktale", "reason": "Identical Title"})
            # Jaccard Summary Match
            elif jaccard_similarity(item.get("summary", ""), other.get("summary", "")) > 0.8:
                duplicates.append({"id1": item.get("id"), "id2": other.get("id"), "type": "folktale", "reason": "Highly Similar Summary"})

    # 2. Process Proverbs
    for i, item in enumerate(pr):
        # Missing Fields
        if not item.get("theme"): missing_fields.append({"id": item.get("id"), "type": "proverb", "issue": "Missing themes"})
        if not item.get("cultural_context"): missing_fields.append({"id": item.get("id"), "type": "proverb", "issue": "Missing cultural context"})
        
        # Verification
        if item.get("verified") is True: total_verified += 1
        
        # Theme Distribution
        for t in item.get("theme", []):
            theme = t.lower().strip()
            theme_dist[theme] = theme_dist.get(theme, 0) + 1
            
        # Source Distribution
        src = item.get("source", "Oral Tradition").strip()
        source_dist[src] = source_dist.get(src, 0) + 1

        # Duplicate Check
        for j in range(i + 1, len(pr)):
            other = pr[j]
            # Exact text match
            if item.get("proverb", "").strip().lower() == other.get("proverb", "").strip().lower():
                duplicates.append({"id1": item.get("id"), "id2": other.get("id"), "type": "proverb", "reason": "Identical Proverb"})
            # Jaccard Translation Match
            elif jaccard_similarity(item.get("translation", ""), other.get("translation", "")) > 0.8:
                duplicates.append({"id1": item.get("id"), "id2": other.get("id"), "type": "proverb", "reason": "Highly Similar Translation"})

    total_entries = len(ft) + len(pr)
    verification_rate = (total_verified / total_entries * 100) if total_entries > 0 else 0

    return {
        "missing_fields": missing_fields,
        "duplicates": duplicates,
        "theme_distribution": dict(sorted(theme_dist.items(), key=lambda item: item[1], reverse=True)),
        "source_distribution": dict(sorted(source_dist.items(), key=lambda item: item[1], reverse=True)),
        "verification_rate": round(verification_rate, 2),
        "total_verified": total_verified,
        "total_entries": total_entries
    }

@app.get("/api/admin/eval")
def get_eval():
    eval_file = os.path.join(DATA_DIR, "eval_results.json")
    if not os.path.exists(eval_file):
        return {"status": "error", "message": "No evaluation results found"}
        
    with open(eval_file, "r", encoding="utf-8") as f:
        results = json.load(f)
        
    if not results:
        return {"metrics": {}, "results": []}
        
    # Aggregate metrics
    metrics = {"retrieval": 0, "citation": 0, "hallucination": 0, "relevance": 0, "quality": 0}
    count = len(results)
    
    for r in results:
        scores = r.get("scores", {})
        metrics["retrieval"] += scores.get("retrieval", 0)
        metrics["citation"] += scores.get("citation", 0)
        metrics["hallucination"] += scores.get("hallucination", 0)
        metrics["relevance"] += scores.get("relevance", 0)
        metrics["quality"] += scores.get("quality", 0)
        
    for k in metrics:
        metrics[k] = round(metrics[k] / count, 1)
        
    return {
        "metrics": metrics,
        "results": results
    }

class IngestRequest(BaseModel):
    transcript: str
    interviewer: str
    speaker: str
    region: str

@app.post("/api/admin/ingest")
def ingest_folklore(req: IngestRequest):
    if not engine.gemini_client:
        return {"status": "error", "message": "Gemini client not initialized"}
        
    prompt = f"""You are a folklore processing pipeline. Your task is to analyze a raw transcript from a field interview and extract a structured folklore entry.
The transcript may contain a folktale or a proverb.

Output EXACTLY this JSON structure, nothing else:
{{
    "type": "folktale", // or "proverb"
    "title": "A short English title", // or "proverb_text" if proverb
    "summary": "A 2-3 sentence summary of the story", // or "meaning" if proverb
    "characters": ["character 1", "character 2"], // omit if proverb
    "themes": ["theme 1", "theme 2"], // use "theme" array if proverb
    "moral": "The moral of the story", // omit if proverb
    "confidence_score": 85 // An integer 1-100 indicating how clear and coherent the narrative is
}}

Raw Transcript from {req.speaker} in {req.region} (Interviewed by {req.interviewer}):
{req.transcript}
"""
    try:
        from google.genai import types
        res = engine.gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(temperature=0.2, response_mime_type="application/json")
        )
        extracted = json.loads(res.text)
        
        # Prepare metadata
        source_meta = f"Field Interview: {req.speaker} (Region: {req.region}, Interviewer: {req.interviewer})"
        
        is_folktale = extracted.get("type", "folktale").lower() == "folktale"
        
        if is_folktale:
            with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
                ft = json.load(f)
            new_id = f"ft_{len(ft['entries']) + 1:03d}"
            entry = {
                "id": new_id,
                "title": extracted.get("title", "Untitled Folktale"),
                "summary": extracted.get("summary", ""),
                "characters": extracted.get("characters", []),
                "themes": extracted.get("themes", []),
                "moral": extracted.get("moral", ""),
                "source": source_meta,
                "cultural_significance": f"Oral folklore collected from {req.region}.",
                "verified": False,
                "confidence_score": extracted.get("confidence_score", 0)
            }
            ft["entries"].append(entry)
            with open(FOLKTALES_JSON, "w", encoding="utf-8") as f:
                json.dump(ft, f, indent=4, ensure_ascii=False)
                
            return {"status": "success", "id": new_id, "type": "folktale", "confidence": entry["confidence_score"]}
        else:
            with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
                pr = json.load(f)
            new_id = f"pr_{len(pr['entries']) + 1:03d}"
            entry = {
                "id": new_id,
                "proverb": extracted.get("title", ""),
                "translation": extracted.get("summary", ""),
                "meaning": extracted.get("summary", ""),
                "theme": extracted.get("themes", []),
                "source": source_meta,
                "cultural_context": f"Oral proverb collected from {req.region}.",
                "verified": False,
                "confidence_score": extracted.get("confidence_score", 0)
            }
            pr["entries"].append(entry)
            with open(PROVERBS_JSON, "w", encoding="utf-8") as f:
                json.dump(pr, f, indent=4, ensure_ascii=False)
                
            return {"status": "success", "id": new_id, "type": "proverb", "confidence": entry["confidence_score"]}
            
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Serve frontend statically
app.mount("/", StaticFiles(directory=os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
