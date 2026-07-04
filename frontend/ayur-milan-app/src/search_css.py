with open('c:/Users/Aksha/Downloads/ayurmilan/frontend/ayur-milan-app/src/index.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'hero-style--two' in line or '.hero ' in line:
        print(f"Line {idx+1}: {line.strip()}")
        # print next 5 lines
        for i in range(1, 6):
            if idx + i < len(lines):
                print(f"  + {lines[idx+i].strip()}")
