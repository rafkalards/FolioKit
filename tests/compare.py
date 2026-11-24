import sys,glob,os
from PIL import Image, ImageChops
A,B=sys.argv[1],sys.argv[2];bad=[]
for f in sorted(glob.glob(A+'/*.png')):
    g=os.path.join(B,os.path.basename(f))
    if not os.path.exists(g): bad.append((os.path.basename(f),'HILANG'));continue
    a=Image.open(f).convert('RGB');b=Image.open(g).convert('RGB')
    if a.size!=b.size: bad.append((os.path.basename(f),'ukuran beda'));continue
    d=ImageChops.difference(a,b).convert('L').point(lambda v:255 if v>12 else 0)
    bb=d.getbbox()
    if bb and sum(d.histogram()[255:])>=20:
        px=sum(d.histogram()[255:]);bad.append((os.path.basename(f),bb,px))
print('beda:',len(bad),'dari',len(glob.glob(A+'/*.png')))
for x in bad[:40]:print(' ',x)
