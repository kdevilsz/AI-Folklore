import json

with open('c:/Users/Bhaswati Sikdar/Documents/data/folklore_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

new_entries = [
    {
      'id': 'ft_010',
      'type': 'folktale',
      'title': 'The Elephant-Apple Princess',
      'assamese': 'ঔ-কুঁৱৰী',
      'english': 'A magical tale about a princess born inside an Ou-Tenga (elephant-apple). A prince discovers the fruit, and at night, the beautiful Ou-Kuwori emerges from it to do household chores. The prince eventually catches her, breaks the shell, and marries her, overcoming various magical obstacles.',
      'meaning': 'A whimsical story of hidden beauty and magical transformations.',
      'moral': 'True beauty and value are often hidden beneath hard exteriors.',
      'metadata': {
        'roots': 'Burhi Aair Sadhu',
        'themes': ['magic', 'transformation', 'romance', 'hidden beauty']
      }
    },
    {
      'id': 'ft_011',
      'type': 'folktale',
      'title': 'The Frog Prince',
      'assamese': 'ভেকুলী কোঁৱৰ',
      'english': 'A childless couple is blessed with a son who is born as a frog. Despite his appearance, the frog prince is incredibly intelligent and magically skilled. He undertakes difficult tasks for the king, eventually winning the princess\'s hand in marriage and transforming into a handsome prince.',
      'meaning': 'A classic transformation tale emphasizing inner worth over outward appearance.',
      'moral': 'Do not judge someone by their appearance; true worth lies within.',
      'metadata': {
        'roots': 'Burhi Aair Sadhu',
        'themes': ['transformation', 'inner beauty', 'magic', 'tasks']
      }
    },
    {
      'id': 'pr_012',
      'type': 'proverb',
      'title': 'Empty Boasts',
      'assamese': 'খোজত খৰ নাই, মুখত গৰগৰণি',
      'english': 'No swiftness in steps, but thunder in the mouth.',
      'meaning': 'Refers to someone who talks a lot and makes grand claims but takes no action or lacks the ability to back up their words.',
      'moral': 'Actions speak louder than empty boasts.',
      'metadata': {
        'roots': 'Oral Tradition',
        'themes': ['boasting', 'action', 'hypocrisy']
      }
    },
    {
      'id': 'pr_013',
      'type': 'proverb',
      'title': 'Pride and Poverty',
      'assamese': 'কৰি খাব নাজানে, মাগি খাবলৈ লাজ',
      'english': 'Does not know how to earn, but is ashamed to beg.',
      'meaning': 'Describes a person who lacks the skills or willingness to work for a living, yet has too much false pride to ask for help.',
      'moral': 'False pride combined with laziness is a path to ruin.',
      'metadata': {
        'roots': 'Oral Tradition',
        'themes': ['laziness', 'pride', 'poverty']
      }
    }
]

data['entries'].extend(new_entries)

with open('c:/Users/Bhaswati Sikdar/Documents/data/folklore_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Added 4 new extracted entries to folklore_data.json')
