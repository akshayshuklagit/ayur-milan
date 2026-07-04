import re

with open('c:/Users/Aksha/Downloads/ayurmilan/frontend/ayur-milan-app/src/pages/About.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

img_re = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']')
sources = img_re.findall(code)

print("Image Sources in About.jsx:")
for src in sources:
    print("- " + src)
