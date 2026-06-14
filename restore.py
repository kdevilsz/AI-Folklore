import json
import os
import ast

log_path = r'C:\Users\Bhaswati Sikdar\.gemini\antigravity-ide\brain\656d5d44-f103-467a-89e0-33177176fb4e\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'tool_calls' in data:
                for tool in data['tool_calls']:
                    if tool['name'] == 'write_to_file':
                        args = tool.get('args', {})
                        content = args.get('CodeContent', '')
                        target = args.get('TargetFile', '')
                        if target and content:
                            if target.startswith('"'): target = ast.literal_eval(target)
                            if content.startswith('"'): content = ast.literal_eval(content)
                            if "restore.py" in target: continue
                            os.makedirs(os.path.dirname(target), exist_ok=True)
                            with open(target, 'w', encoding='utf-8') as out:
                                out.write(content)
                            print(f'Restored {target}')
        except Exception as e:
            pass
