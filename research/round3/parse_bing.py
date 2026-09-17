import sys, re, html
data = open(sys.argv[1], encoding='utf-8', errors='ignore').read()
# split into b_algo blocks
blocks = re.split(r'<li class="b_algo"', data)[1:]
out=[]
for b in blocks:
    b = b[:6000]
    m = re.search(r'<h2[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', b, re.S)
    if not m:
        m = re.search(r'<a class="tilk"[^>]*href="([^"]+)"', b)
        if m:
            url=m.group(1); title='(tilk)'
        else: continue
    else:
        url=m.group(1)
        title=re.sub(r'<[^>]+>','',m.group(2))
    cap=''
    mc = re.search(r'<p class="b_lineclamp[^"]*"[^>]*>(.*?)</p>', b, re.S) or re.search(r'<p[^>]*>(.*?)</p>', b, re.S)
    if mc: cap=re.sub(r'<[^>]+>','',mc.group(1))
    url=html.unescape(url); title=html.unescape(title); cap=html.unescape(cap)
    if url.startswith('http'):
        out.append(f"{title}\n  {url}\n  {cap[:300]}")
print('\n'.join(out[:12]))
