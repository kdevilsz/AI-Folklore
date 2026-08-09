import os
import json
from google import genai
from google.genai import types

def _load_env():
    env_file = r"c:\Users\Bhaswati Sikdar\Documents\data\.env"
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v

_load_env()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

PROMPT = """You are the Assamese Folklore Content Engine.
Generate exactly 8 new, unique, high-quality Assamese folklore entries.
Include 4 folktales and 4 proverbs.
Do NOT output markdown codeblocks around the JSON. ONLY output valid JSON.

For Folktales, use this exact schema:
{
  "title": "Title in English (Title in Assamese Script)",
  "summary": "Detailed English summary of the story",
  "characters": ["Char 1"],
  "themes": ["theme 1", "theme 2"],
  "moral": "Implied moral",
  "cultural_significance": "Cultural note",
  "source": "Oral Tradition or Burhi Aair Sadhu etc.",
  "image_prompt": "Midjourney style highly detailed image prompt",
  "type": "folktale"
}

For Proverbs, use this exact schema:
{
  "proverb": "Proverb in Assamese Script",
  "translation": "English translation",
  "meaning": "Meaning",
  "theme": ["theme 1", "theme 2"],
  "source": "Oral Tradition",
  "cultural_context": "Cultural context",
  "image_prompt": "Midjourney style highly detailed image prompt",
  "type": "proverb"
}

Output format:
{
  "entries": [ ... ]
}
"""

import time

max_retries = 3
data = None
for attempt in range(max_retries):
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=PROMPT,
            config=types.GenerateContentConfig(
                temperature=0.7,
                response_mime_type="application/json"
            )
        )
        data = json.loads(response.text)
        break
    except Exception as e:
        if "429" in str(e) and attempt < max_retries - 1:
            print(f"Rate limited (429). Retrying in 25 seconds... (Attempt {attempt+1}/{max_retries})")
            time.sleep(25)
        else:
            print(f"Error: {e}")
            raise e

try:
    if data:
        # Load existing data
        ft_file = r"c:\Users\Bhaswati Sikdar\Documents\data\folktales.json"
    pr_file = r"c:\Users\Bhaswati Sikdar\Documents\data\proverbs.json"
    
    with open(ft_file, "r", encoding="utf-8") as f:
        folktales = json.load(f)
    with open(pr_file, "r", encoding="utf-8") as f:
        proverbs = json.load(f)
        
    for entry in data.get("entries", []):
        if entry.get("type") == "folktale":
            new_id = f"ft_{len(folktales['entries']) + 1:03d}"
            entry["id"] = new_id
            del entry["type"]
            folktales["entries"].append(entry)
        elif entry.get("type") == "proverb":
            new_id = f"pr_{len(proverbs['entries']) + 1:03d}"
            entry["id"] = new_id
            del entry["type"]
            proverbs["entries"].append(entry)
            
    with open(ft_file, "w", encoding="utf-8") as f:
        json.dump(folktales, f, indent=2, ensure_ascii=False)
        
    with open(pr_file, "w", encoding="utf-8") as f:
        json.dump(proverbs, f, indent=2, ensure_ascii=False)

    print(f"Successfully added 8 new entries.")
except Exception as e:
    print(f"Error: {e}")
