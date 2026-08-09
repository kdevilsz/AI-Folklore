import os
import re

BASE = r'c:\Users\Bhaswati Sikdar\Documents\data'
pages_dir = os.path.join(BASE, 'pages')
js_dir = os.path.join(BASE, 'js')

files_ordered = [
    os.path.join(pages_dir, 'home.js'),
    os.path.join(pages_dir, 'folktales.js'),
    os.path.join(pages_dir, 'proverbs.js'),
    os.path.join(pages_dir, 'graph.js'),
    os.path.join(pages_dir, 'chat.js'),
    os.path.join(pages_dir, 'about.js'),
    os.path.join(pages_dir, 'admin.js'),
    os.path.join(pages_dir, 'quality.js'),
    os.path.join(pages_dir, 'eval.js'),
    os.path.join(pages_dir, 'ingest.js'),
    os.path.join(pages_dir, 'share.js'),
    os.path.join(js_dir, 'data.js'),
    os.path.join(js_dir, 'app.js'),
]

bundle_parts = []
for fpath in files_ordered:
    if not os.path.exists(fpath):
        print(f"SKIPPED (not found): {fpath}")
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove import lines
    content = re.sub(r'^import\s+.*?;\s*$', '', content, flags=re.MULTILINE)
    # Remove export keyword from function declarations
    content = re.sub(r'^export\s+(async\s+function)', r'\1', content, flags=re.MULTILINE)
    content = re.sub(r'^export\s+(function)', r'\1', content, flags=re.MULTILINE)
    # Remove export keyword from variable declarations
    content = re.sub(r'^export\s+(const|let|var)\s+', r'\1 ', content, flags=re.MULTILINE)
    # Remove export { ... } statements
    content = re.sub(r'^export\s*\{[^}]*\};\s*$', '', content, flags=re.MULTILINE)
    # Remove export default
    content = re.sub(r'^export\s+default\s+', '', content, flags=re.MULTILINE)

    bundle_parts.append(f'// === {os.path.basename(fpath)} ===')
    bundle_parts.append(content.strip())
    bundle_parts.append('')

bundle_content = '\n'.join(bundle_parts)
out_path = os.path.join(js_dir, 'bundle.js')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(bundle_content)

print(f'Bundle written: {len(bundle_content)} chars, {bundle_content.count(chr(10))} lines')
print('Done!')
