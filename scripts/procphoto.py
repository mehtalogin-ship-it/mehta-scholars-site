import sys, colorsys
from PIL import Image
def framed(im):
    # sample a ring near the circle edge; detect saturated purple(#hiring) or green(#opentowork)
    w,h=im.size; cx,cy=w/2,h/2; R=0.47*min(w,h); hits=0; n=0
    import math
    for deg in range(0,360,6):
        a=math.radians(deg); x=int(cx+R*math.cos(a)); y=int(cy+R*math.sin(a))
        if 0<=x<w and 0<=y<h:
            r,g,b=im.getpixel((x,y))[:3]; hh,ss,vv=colorsys.rgb_to_hsv(r/255,g/255,b/255)
            n+=1
            if ss>0.35 and vv>0.3 and (0.72<hh<0.86 or 0.28<hh<0.45): hits+=1
    return n and hits/n>0.18
def process(src,dst):
    im=Image.open(src).convert("RGB"); w,h=im.size
    if framed(im):
        cw=int(w*0.60); ch=int(h*0.60); left=(w-cw)//2; top=int(h*0.09)
        im=im.crop((left,top,left+cw,top+ch))
    else:
        s=min(w,h); left=(w-s)//2; top=max(0,int(h*0.02)); im=im.crop((left,top,left+s,min(h,top+s)))
    im=im.resize((500,500),Image.LANCZOS); im.save(dst,quality=90)
    return "framed" if framed(Image.open(src).convert("RGB")) else "clean"
print(process(sys.argv[1],sys.argv[2]))
