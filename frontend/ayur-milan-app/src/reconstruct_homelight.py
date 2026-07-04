import json
import re

transcript_path = 'C:/Users/Aksha/.gemini/antigravity/brain/0375584c-74c0-4df4-afc6-0bf19e187722/.system_generated/logs/transcript.jsonl'
home_path = 'src/pages/Home.jsx'
output_path = 'src/pages/HomeLight.jsx'

homelight_lines = {}
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        if 'content' in obj and obj['content'] and 'Showing lines 1 to 800' in obj['content'] and 'HomeLight.jsx' in obj['content']:
            content = obj['content']
            for l in content.split('\n'):
                m = re.match(r'^(\d+):\s(.*)$', l)
                if m:
                    line_num = int(m.group(1))
                    line_text = m.group(2)
                    homelight_lines[line_num] = line_text

print(f"Extracted {len(homelight_lines)} lines of HomeLight.jsx from transcript.")

with open(home_path, 'r', encoding='utf-8') as f:
    home_lines = f.readlines()

final_lines = []
for i in range(1, 801):
    if i in homelight_lines:
        final_lines.append(homelight_lines[i])
    else:
        final_lines.append(home_lines[i-1].rstrip('\r\n'))

for i in range(801, 1093):
    home_line_idx = i - 8
    if home_line_idx < len(home_lines):
        final_lines.append(home_lines[home_line_idx].rstrip('\r\n'))

with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(final_lines) + '\n')

print("Reconstructed HomeLight.jsx successfully.")
