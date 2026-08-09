import json
from collections import Counter

def check_missing(item, required_fields):
    return [f for f in required_fields if not item.get(f) or (isinstance(item.get(f), list) and len(item.get(f)) == 0)]

def audit_json(filepath, type_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f).get('entries', [])
    
    report = {"type": type_name, "total": len(data), "missing_fields": [], "missing_sources": [], "missing_themes": [], "weak_descriptions": [], "duplicates": []}
    
    titles = []
    
    for item in data:
        if type_name == 'Folktales':
            title = item.get('title', '')
            desc = item.get('summary', '')
            req_fields = ['title', 'summary', 'characters', 'themes', 'moral', 'cultural_significance', 'source']
        else:
            title = item.get('proverb', '')
            desc = item.get('meaning', '')
            req_fields = ['proverb', 'translation', 'meaning', 'theme', 'cultural_context', 'source']
        
        titles.append(title)
        
        missing = check_missing(item, req_fields)
        if missing:
            report["missing_fields"].append({"id": item.get("id"), "missing": missing})
            
        if 'source' in missing or not item.get('source'):
            report["missing_sources"].append(item.get('id'))
            
        if ('themes' in missing and type_name == 'Folktales') or ('theme' in missing and type_name == 'Proverbs'):
            report["missing_themes"].append(item.get('id'))
            
        if len(desc.split()) < 15:
            report["weak_descriptions"].append({"id": item.get("id"), "words": len(desc.split())})

    dupes = [title for title, count in Counter(titles).items() if count > 1]
    report["duplicates"] = dupes
    
    return report

r1 = audit_json('folktales.json', 'Folktales')
r2 = audit_json('proverbs.json', 'Proverbs')
with open('audit_report.json', 'w', encoding='utf-8') as f:
    json.dump([r1, r2], f, ensure_ascii=False, indent=2)
