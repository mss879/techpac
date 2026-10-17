"""Collect the highest-resolution public logo variants from the research archive."""
import concurrent.futures
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen

ROOT=Path(__file__).resolve().parents[1]
RESEARCH=ROOT.parent/'research'
manifest=json.loads((RESEARCH/'crawl-manifest.json').read_text())
skip={'whatsapp.png','social_media_fb.png','social_media_link.png','lalindra.jpg','shyamalan.jpg',
      'chathurika-gunawardhene.png','vidunath-mathagaweera.jpg','samuel-sathiyadaran.png',
      'mangala.jpg','shivantha-perera.jpg','lalith-kulasinghe.jpg','rizan-jiffrey.jpg'}
items={}
for p in manifest['pages']:
    for im in p.get('images',[]):
        src=im.get('data-src') or im.get('src','')
        if not src or src.startswith('data:'): continue
        filename=src.split('/')[-1]
        if filename.lower() in skip: continue
        variants=[]
        for value in [im.get('srcset',''),im.get('data-srcset','')]:
            for v in value.split(','):
                bits=v.strip().split()
                if len(bits)==2 and bits[1].endswith('w'):
                    variants.append((int(bits[1][:-1]),bits[0]))
        width,url=max(variants,default=(0,src))
        key='ezuite.png' if im.get('alt')=='E-Zuite' else filename.lower().replace('_','-')
        old=items.get(key)
        if old is None or width>old['width']:
            items[key]={'filename':key,'url':urljoin(manifest['base_url'],url),'width':width,'source_page':p['url']}

# Portrait used with an attributed customer testimonial; preserve the original.
p=next(p for p in manifest['pages'] if p['url'].endswith('/about/'))
for im in p['images']:
    src=im.get('data-src') or im.get('src','')
    if src.endswith('/mangala.jpg'):
        variants=[(int(x.strip().split()[1][:-1]),x.strip().split()[0]) for x in (im.get('data-srcset') or im.get('srcset','')).split(',') if len(x.strip().split())==2]
        width,url=max(variants,default=(0,src))
        items['mangala.jpg']={'filename':'mangala.jpg','url':urljoin(manifest['base_url'],url),'width':width,'source_page':p['url']}

destination=ROOT/'public/brand/originals';destination.mkdir(parents=True,exist_ok=True)
def get(item):
    try:
        with urlopen(item['url'],timeout=35) as r:
            raw=r.read(); content_type=r.headers.get('Content-Type','')
        if not content_type.startswith('image/'): raise ValueError('Response is not an image')
        (destination/item['filename']).write_bytes(raw)
        return {**item,'bytes':len(raw),'content_type':content_type}
    except Exception as e:return {**item,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    result=list(pool.map(get,items.values()))
(ROOT/'public/brand/asset-provenance.json').write_text(json.dumps(result,indent=2))
print('ASSETS',len(result),'SAVED',sum('error' not in x for x in result),'ERRORS',[x for x in result if 'error' in x])
