import re

path = r'C:\Users\MUTHUPANDI M\.gemini\antigravity-ide\brain\2e509d10-d2a3-4cdc-b570-b7488878c1fe\.system_generated\steps\162\content.md'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'https?://[^\s",\'>\]]+', text)
unique_urls = set(urls)

with open('urls.txt', 'w', encoding='utf-8') as out:
    for url in unique_urls:
        out.write(url + '\n')
