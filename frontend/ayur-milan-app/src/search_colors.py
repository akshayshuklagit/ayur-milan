import os
import re

pages_dir = 'c:/Users/Aksha/Downloads/ayurmilan/frontend/ayur-milan-app/src/pages'
jsx_files = [f for f in os.listdir(pages_dir) if f.endswith('.jsx')]

light_colors = ['#fff', '#ffffff', 'white', '#e2e0ff', '#b9b6d6', '#ffe04b', '#FFE04B']

print(f"Scanning JSX files in {pages_dir}...")
for file in jsx_files:
    path = os.path.join(pages_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all inline style blocks
    matches = re.finditer(r'style=\{\{\s*([^}]*)\s*\}\}', content)
    found = []
    for m in matches:
        style_content = m.group(1)
        # Check if style contains color and any of the light colors
        if 'color:' in style_content:
            for color in light_colors:
                if color in style_content:
                    # Get line number of match
                    line_num = content[:m.start()].count('\n') + 1
                    found.append((line_num, m.group(0)))
                    break
    if found:
        print(f"\nFile: {file} ({len(found)} matches)")
        for line, snippet in found:  # print all matches
            # print single line representation of snippet
            single_line_snippet = " ".join(snippet.split())
            print(f"  Line {line}: {single_line_snippet}")
