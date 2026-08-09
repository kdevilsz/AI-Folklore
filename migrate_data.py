import os
import json

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
INPUT_JSON = os.path.join(DATA_DIR, "folklore_data.json")
FOLKTALES_JSON = os.path.join(DATA_DIR, "folktales.json")
PROVERBS_JSON = os.path.join(DATA_DIR, "proverbs.json")

def migrate():
    with open(INPUT_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    entries = data.get("entries", [])
    folktales = []
    proverbs = []
    
    print(f"Migrating {len(entries)} entries...")
    for item in entries:
        item_type = item.get("type", "")
        item_id = item.get("id", "")
        
        if item_type == "folktale":
            # Infer basic characters from title or keep empty
            title_en = item.get("title", "")
            chars = [title_en] if title_en else []
            
            folktales.append({
                "id": item_id,
                "title": f"{item.get('title', '')} ({item.get('assamese', '')})",
                "summary": item.get("english", ""),
                "characters": chars,
                "themes": item.get("metadata", {}).get("themes", []),
                "moral": item.get("moral", ""),
                "cultural_significance": "A fundamental Assamese folktale passed down through oral tradition.",
                "source": item.get("metadata", {}).get("roots", "Oral Tradition"),
                "contributor": item.get("contributor"),
                "confidence": item.get("confidence", "interview")
            })
            
        elif item_type == "proverb":
            # Proverb migration
            themes = item.get("metadata", {}).get("themes", [])
            proverbs.append({
                "id": item_id,
                "proverb": item.get("assamese", ""),
                "translation": item.get("english", ""),
                "meaning": item.get("meaning", ""),
                "theme": themes,
                "cultural_context": "Used in traditional Assamese discourse to impart ancestral wisdom.",
                "source": item.get("metadata", {}).get("roots", "Oral Tradition"),
                "contributor": item.get("contributor"),
                "confidence": item.get("confidence", "interview")
            })

    with open(FOLKTALES_JSON, "w", encoding="utf-8") as f:
        json.dump({"entries": folktales}, f, ensure_ascii=False, indent=2)
        
    with open(PROVERBS_JSON, "w", encoding="utf-8") as f:
        json.dump({"entries": proverbs}, f, ensure_ascii=False, indent=2)
        
    print(f"Migration complete. Generated folktales.json ({len(folktales)}) and proverbs.json ({len(proverbs)}).")

if __name__ == "__main__":
    migrate()
