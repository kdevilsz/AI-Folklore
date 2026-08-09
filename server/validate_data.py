import os
import json
from pydantic import BaseModel, ValidationError

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
FOLKTALES_JSON = os.path.join(DATA_DIR, "folktales.json")
PROVERBS_JSON = os.path.join(DATA_DIR, "proverbs.json")

class Folktale(BaseModel):
    id: str
    title: str
    summary: str
    characters: list[str]
    themes: list[str]
    moral: str
    cultural_significance: str
    source: str

class Proverb(BaseModel):
    id: str
    proverb: str
    translation: str
    meaning: str
    theme: list[str]
    cultural_context: str
    source: str

def validate_folktales():
    with open(FOLKTALES_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
    for item in data.get("entries", []):
        try:
            Folktale(**item)
        except ValidationError as e:
            print(f"Validation failed for folktale {item.get('id', 'Unknown')}:\n{e}")
            return False
    print("Folktales validation passed!")
    return True

def validate_proverbs():
    with open(PROVERBS_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)
    for item in data.get("entries", []):
        try:
            Proverb(**item)
        except ValidationError as e:
            print(f"Validation failed for proverb {item.get('id', 'Unknown')}:\n{e}")
            return False
    print("Proverbs validation passed!")
    return True

if __name__ == "__main__":
    if not os.path.exists(FOLKTALES_JSON) or not os.path.exists(PROVERBS_JSON):
        print("JSON files do not exist yet.")
    else:
        ft_ok = validate_folktales()
        pr_ok = validate_proverbs()
        if not (ft_ok and pr_ok):
            exit(1)
