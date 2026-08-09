import pandas as pd
import json

def generate_json():
    try:
        df = pd.read_excel('Assamese_Folklore_Dataset (1).xlsx')
        df = df.fillna("")
    except Exception as e:
        print(f"Error reading Excel: {e}")
        df = pd.DataFrame()

    data = []
    
    for index, row in df.iterrows():
        themes = [t.strip() for t in str(row.get('Themes', '')).split(',') if t.strip()]
        data.append({
            "id": str(row.get('ID', f"ex_{index}")),
            "type": "proverb",
            "text_assamese": str(row.get('Assamese Text', '')),
            "transliteration": str(row.get('Transliteration', '')),
            "translation": str(row.get('English Translation', '')),
            "meaning_moral": str(row.get('Meaning / Moral', '')),
            "themes": themes,
            "source": str(row.get('Source', ''))
        })

    # Add 5-10 more high quality entries from knowledge
    new_entries = [
        {
            "id": "p_new_1",
            "type": "proverb",
            "text_assamese": "অধিক মাছত বগলী কণা",
            "transliteration": "Odhik masot bogoli kona",
            "translation": "A crane goes blind when there are too many fishes.",
            "meaning_moral": "Too many choices lead to confusion and indecision.",
            "themes": ["decision-making", "greed", "nature"],
            "source": "Traditional Oral Folklore"
        },
        {
            "id": "p_new_2",
            "type": "proverb",
            "text_assamese": "অতি ভক্তি চোৰৰ লক্ষণ",
            "transliteration": "Oti bhokti suror lokhyon",
            "translation": "Too much devotion is a sign of a thief.",
            "meaning_moral": "Excessive flattery or subservience often hides malicious intent.",
            "themes": ["deception", "human nature"],
            "source": "Traditional Oral Folklore"
        },
        {
            "id": "p_new_3",
            "type": "proverb",
            "text_assamese": "বিনা মেঘে বজ্ৰপাত",
            "transliteration": "Bina meghe bojropat",
            "translation": "Lightning without clouds.",
            "meaning_moral": "A sudden, unexpected disaster.",
            "themes": ["disaster", "surprise", "fate"],
            "source": "Traditional Oral Folklore"
        },
        {
            "id": "p_new_4",
            "type": "proverb",
            "text_assamese": "ৰাইজে নখ জোকাৰিলে নৈ বয়",
            "transliteration": "Raije nokh jokarile noi boy",
            "translation": "If the public shakes their nails, a river flows.",
            "meaning_moral": "Unity is strength; collective effort can achieve the impossible.",
            "themes": ["unity", "strength", "community"],
            "source": "Traditional Oral Folklore"
        },
        {
            "id": "p_new_5",
            "type": "proverb",
            "text_assamese": "যেনে কুকুৰ তেনে টাঙোন",
            "transliteration": "Jene kukur tene tangon",
            "translation": "As the dog, so the stick.",
            "meaning_moral": "Tit for tat; getting what one deserves.",
            "themes": ["justice", "karma", "retribution"],
            "source": "Traditional Oral Folklore"
        },
        {
            "id": "f_new_1",
            "type": "folktale",
            "title": "Tejimola",
            "text_assamese": "তেজীমলা",
            "transliteration": "Tejimola",
            "translation": "The story of Tejimola, a girl killed by her stepmother who reincarnated into various plants (a bottle gourd, a pomelo, a lotus) before regaining her human form when her father recognized her.",
            "meaning_moral": "Goodness and innocence eventually triumph over cruelty and malice.",
            "themes": ["magic", "reincarnation", "stepmother", "triumph of good"],
            "source": "Burhi Aair Sadhu"
        },
        {
            "id": "f_new_2",
            "type": "folktale",
            "title": "Kukuri Kona",
            "text_assamese": "কুকুৰীকণা",
            "transliteration": "Kukuri Kona",
            "translation": "The Night-Blind Son-in-law: A humorous tale of a man who goes blind at night and tries to hide this fact from his in-laws, leading to a series of comedic disasters.",
            "meaning_moral": "Hiding the truth leads to greater embarrassment.",
            "themes": ["humor", "deception", "family"],
            "source": "Burhi Aair Sadhu"
        },
        {
            "id": "f_new_3",
            "type": "folktale",
            "title": "Tula aru Teja",
            "text_assamese": "তুলা আৰু তেজা",
            "transliteration": "Tula aru Teja",
            "translation": "A tale of two step-sisters. Teja, the abused step-daughter, suffers but gets magical help and marries a king, while the wicked step-mother and her daughter face punishment.",
            "meaning_moral": "Virtue is rewarded and wickedness is punished.",
            "themes": ["magic", "step-sisters", "royalty", "justice"],
            "source": "Burhi Aair Sadhu"
        }
    ]

    data.extend(new_entries)

    with open("folklore_data.json", "w", encoding="utf-8") as f:
        json.dump({"entries": data}, f, ensure_ascii=False, indent=2)
    
    print("folklore_data.json created successfully.")

if __name__ == "__main__":
    generate_json()
