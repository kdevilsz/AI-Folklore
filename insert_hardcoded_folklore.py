import json

hardcoded_data = {
  "entries": [
    {
      "title": "Kachamali (কাচামালী)",
      "summary": "Kachamali was a kind-hearted girl who befriended a magical turtle. When her jealous stepmother killed the turtle, a beautiful plant grew from its shell, showering Kachamali with gold and jewels whenever she sang to it. The King heard of this miracle and married her.",
      "characters": ["Kachamali", "Magical Turtle", "Stepmother"],
      "themes": ["magic", "friendship", "stepmother", "reward"],
      "moral": "Kindness to all creatures brings unexpected blessings.",
      "cultural_significance": "A popular oral folktale emphasizing the sacred bond between humans and nature.",
      "source": "Oral Tradition",
      "image_prompt": "A beautiful Assamese village girl in traditional mekhela chador, singing gently to a glowing, magical plant sprouting from a turtle shell, surrounded by a rustic village courtyard, cinematic lighting, highly detailed, fantasy art style, Midjourney v6.",
      "type": "folktale"
    },
    {
      "title": "The Weaver Bird and the Elephant (টোকোৰা চৰাই আৰু হাতী)",
      "summary": "A mighty elephant mocked a tiny weaver bird for her fragile hanging nest. When a massive storm hit the forest, the elephant was drenched and shivering, while the weaver bird remained safe and dry inside her intricately woven home. The elephant learned to respect skill over brute size.",
      "characters": ["Weaver Bird", "Elephant"],
      "themes": ["arrogance", "skill", "nature", "humility"],
      "moral": "Skill and preparation are far more valuable than brute strength.",
      "cultural_significance": "A fable teaching children the value of hard work and craftsmanship.",
      "source": "Burhi Aair Sadhu",
      "image_prompt": "A tiny, intricate weaver bird nest hanging from a tall palm tree branch, glowing warmly inside, while a massive, soaking wet elephant stands below in a dark, raging rainstorm, dramatic lighting, highly detailed, folklore illustration.",
      "type": "folktale"
    },
    {
      "title": "The Ghost of the Bamboo Grove (বাঁহনিবাৰীৰ ভূত)",
      "summary": "A greedy merchant tried to cut down a sacred bamboo grove to build a mansion. The spirits of the grove, taking the form of glowing will-o'-the-wisps, led him in circles all night until he was hopelessly lost. He was only freed when he promised never to harm the sacred trees again.",
      "characters": ["Greedy Merchant", "Bamboo Spirits"],
      "themes": ["greed", "nature preservation", "spirits"],
      "moral": "Respect nature and its boundaries, for greed will lead you astray.",
      "cultural_significance": "A cautionary tale about the deep spiritual connection Assamese people have with their bamboo forests.",
      "source": "Oral Tradition",
      "image_prompt": "A terrified merchant lost in a dense, towering Assamese bamboo forest at midnight, surrounded by floating, glowing blue spiritual orbs, eerie mist, cinematic lighting, highly detailed fantasy.",
      "type": "folktale"
    },
    {
      "title": "The Golden Mongoose (সোণোৱালী নেউল)",
      "summary": "A poor farmer saved a mongoose from a snake. In return, the mongoose revealed itself to be a spirit of wealth and gifted the farmer a single golden coin every morning. When the farmer's greedy neighbor tried to capture the mongoose for himself, it vanished forever.",
      "characters": ["Poor Farmer", "Golden Mongoose", "Greedy Neighbor"],
      "themes": ["gratitude", "greed", "wealth", "magic"],
      "moral": "Gratitude brings prosperity, but greed destroys it.",
      "cultural_significance": "A tale reflecting the agricultural life and respect for helpful animals in Assam.",
      "source": "Oral Tradition",
      "image_prompt": "A glowing, magical golden mongoose sitting on the porch of a traditional Assamese mud house, dropping a shiny gold coin, a humble farmer looking on with gratitude, warm morning sunlight, highly detailed.",
      "type": "folktale"
    },
    {
      "proverb": "অধিক মাছে বগলী কণা",
      "translation": "Too many fishes make the heron blind.",
      "meaning": "Having too many choices or an overabundance can lead to confusion and poor decision-making.",
      "theme": ["confusion", "greed", "abundance"],
      "source": "Oral Tradition",
      "cultural_context": "Drawn from the riverine geography of Assam where herons fishing is a common sight.",
      "image_prompt": "A beautiful white heron standing in a shallow, sparkling Assamese river teeming with hundreds of glowing fish, looking confused and overwhelmed, vibrant colors, highly detailed nature photography style.",
      "type": "proverb"
    },
    {
      "proverb": "হাতীৰ দাঁত ওলালে আৰু নোসোমায়",
      "translation": "Once the elephant's tusks come out, they do not go back in.",
      "meaning": "Spoken words cannot be taken back; commitments made cannot be undone.",
      "theme": ["commitment", "consequences", "speech"],
      "source": "Oral Tradition",
      "cultural_context": "Elephants hold a majestic and powerful place in Assamese culture.",
      "image_prompt": "A close-up of a majestic Asian elephant's face with large, gleaming white tusks emerging from the jungle foliage, powerful and resolute, cinematic lighting, highly detailed.",
      "type": "proverb"
    },
    {
      "proverb": "যি মূলা বাঢ়িব তাৰ দুপাততে চিন",
      "translation": "The radish that will grow well shows its signs in its first two leaves.",
      "meaning": "Early signs indicate future potential or greatness.",
      "theme": ["potential", "foresight", "growth"],
      "source": "Oral Tradition",
      "cultural_context": "Rooted in the deeply agrarian lifestyle of the Assamese people.",
      "image_prompt": "A tiny, vibrant green radish seedling with two perfectly shaped leaves sprouting from rich, dark, moist soil, glowing softly with magical potential, macro photography, highly detailed.",
      "type": "proverb"
    },
    {
      "proverb": "ৰাইজে নখ জোকাৰিলে নৈ বয়",
      "translation": "If the public shakes their nails, a river flows.",
      "meaning": "Unity is immense power; when people work together, they can achieve impossible things.",
      "theme": ["unity", "community", "power"],
      "source": "Oral Tradition",
      "cultural_context": "Reflects the strong community bonds (Raij) in Assamese villages.",
      "image_prompt": "A massive, sweeping river formed magically from thousands of glowing water droplets, symbolizing the unified power of the people, epic landscape, vibrant, highly detailed.",
      "type": "proverb"
    }
  ]
}

try:
    ft_file = r"c:\Users\Bhaswati Sikdar\Documents\data\folktales.json"
    pr_file = r"c:\Users\Bhaswati Sikdar\Documents\data\proverbs.json"
    
    with open(ft_file, "r", encoding="utf-8") as f:
        folktales = json.load(f)
    with open(pr_file, "r", encoding="utf-8") as f:
        proverbs = json.load(f)
        
    for entry in hardcoded_data["entries"]:
        if entry["type"] == "folktale":
            new_id = f"ft_{len(folktales['entries']) + 1:03d}"
            entry["id"] = new_id
            del entry["type"]
            folktales["entries"].append(entry)
        elif entry["type"] == "proverb":
            new_id = f"pr_{len(proverbs['entries']) + 1:03d}"
            entry["id"] = new_id
            del entry["type"]
            proverbs["entries"].append(entry)
            
    with open(ft_file, "w", encoding="utf-8") as f:
        json.dump(folktales, f, indent=2, ensure_ascii=False)
        
    with open(pr_file, "w", encoding="utf-8") as f:
        json.dump(proverbs, f, indent=2, ensure_ascii=False)

    print("Successfully added 8 hardcoded entries to JSON files.")
except Exception as e:
    print(f"Error: {e}")
