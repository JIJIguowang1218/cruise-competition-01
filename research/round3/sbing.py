# usage: python sbing.py "query" [outfile] -> search, save html, print parsed
import sys, re, html, base64, urllib.parse, subprocess
q = sys.argv[1]
extra = sys.argv[2] if len(sys.argv)>2 else "ensearch=1&mkt=en-US"
url = "https://cn.bing.com/search?q="+urllib.parse.quote(q)+"&"+extra
fn = sys.argv[3] if len(sys.argv)>3 else "/tmp/sb.html"
subprocess.run(["curl","-s","-L","-m","25","-A","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36","-H","Accept-Language: en-US,en;q=0.9",url,"-o",fn])
data=open(fn,encoding='utf-8',errors='ignore').read()
def dec(u):
    if 'bing.com/ck/a' in u:
        m=re.search(r'[?&]u=([^&]+)',u)
        if m:
            v=urllib.parse.unquote(m.group(1))
            if v.startswith('a1'):
                try: return base64.urlsafe_b64decode(v[2:]+'==' ).decode('utf-8','ignore')
                except Exception: return u
    return u
blocks=re.split(r'<li class="b_algo"',data)[1:]
out=[]
for b in blocks[:12]:
    b=b[:8000]
    m=re.search(r'<h2[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>',b,re.S)
    if m:
        url=dec(html.unescape(m.group(1))); title=html.unescape(re.sub(r'<[^>]+>','',m.group(2)))
    else:
        m=re.search(r'<a class="tilk"[^>]*href="([^"]+)"',b)
        if not m: continue
        url=dec(html.unescape(m.group(1))); title='(tilk)'
    mc=re.search(r'<p class="b_lineclamp[^"]*"[^>]*>(.*?)</p>',b,re.S) or re.search(r'<p[^>]*>(.*?)</p>',b,re.S)
    cap=html.unescape(re.sub(r'<[^>]+>','',mc.group(1)))[:280] if mc else ''
    out.append(title.strip()+"\n  "+url.strip()+"\n  "+cap.strip())
sys.stdout.buffer.write(('\n'.join(out)+'\n').encode('utf-8'))
