import json
with open('c:/Users/Bhaswati Sikdar/Documents/data/folklore_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for entry in data['entries']:
    print(f"{entry['id']} - {entry['title']}")
