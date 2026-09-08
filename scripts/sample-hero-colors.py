#!/usr/bin/env python3
"""
Samples the average color of the region of each hero photo that the
"Evelyn Grace" overlay text will actually sit over on screen, then
picks cream or espresso (whichever contrasts more) at an opacity in
the 45-70% band, and reports the resulting WCAG contrast ratio.

Where the overlay sits, in source-image coordinates:
The overlay text is centered (inset-0 flex items-center justify-center)
on the *rendered, cropped* photo, not on the raw source file. Per
Hero.jsx's own comments, each photo is object-cover cropped to roughly
the center ~60% of its vertical extent (853x1280 source) before being
rotated 90deg to fill the container edge-to-edge, with object-position
choosing *which* 60% survives:
  - photo 1: object-top -> anchored to the top edge -> visible band is
    the top 60% of the source -> band center = 30% down.
  - photo 2: object-[50%_56%] -> anchored at 56% down (not near an
    edge, so the crop isn't clamped) -> visible band is centered on
    that anchor -> band center = 56% down.
Horizontally both are centered (50%).

Sample box: 30% of source width x 20% of source height, centered on
those points -- "roughly where the text will sit", not the whole photo.

Run from the repo root: python3 scripts/sample-hero-colors.py
(paths below are relative to src/assets/images/, not to this file).
"""
from PIL import Image

CREAM = (0xFB, 0xF8, 0xF4)      # #FBF8F4
ESPRESSO = (0x3A, 0x2E, 0x27)   # #3A2E27

PHOTOS = [
    ("hero-photo-1.jpg", 0.50, 0.30),  # object-top
    ("hero-photo-2.jpg", 0.50, 0.56),  # object-[50%_56%]
]

def relative_luminance(rgb):
    def chan(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (chan(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(fg, bg):
    l1, l2 = relative_luminance(fg), relative_luminance(bg)
    l1, l2 = max(l1, l2), min(l1, l2)
    return (l1 + 0.05) / (l2 + 0.05)

def blend(fg, bg, alpha):
    """Flatten fg-at-alpha over opaque bg -> the effective on-screen color."""
    return tuple(round(fg[i] * alpha + bg[i] * (1 - alpha)) for i in range(3))

def sample_region(path, cx, cy, w_frac=0.30, h_frac=0.20):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    bw, bh = w * w_frac, h * h_frac
    left = max(0, int(cx * w - bw / 2))
    top = max(0, int(cy * h - bh / 2))
    right = min(w, int(cx * w + bw / 2))
    bottom = min(h, int(cy * h + bh / 2))
    region = im.crop((left, top, right, bottom))
    pixels = list(region.getdata())
    n = len(pixels)
    avg = tuple(round(sum(p[i] for p in pixels) / n) for i in range(3))
    return avg, (left, top, right, bottom), im.size

# WCAG's floor is 3:1 for large text, but that number assumes flat,
# perfectly-rendered colors. Real rendering (JPEG source, subpixel/AA
# text edges, slight browser color management differences) can shave a
# few percent off a computed ratio, so target a safety-margined 3.3:1
# rather than shipping something that grades out at exactly 3.00:1 on
# paper and could measure under the real floor on screen. Step in
# round 5% increments (Tailwind-friendly arbitrary values, and easier
# to reason about than e.g. "48%").
def best_opacity(fg, bg, target=3.3, lo=0.45, hi=0.70, step=0.05):
    """Lowest opacity in [lo, hi] (5% steps) that clears `target` contrast
    against bg (flattening fg-at-alpha over bg first) -- walking lo -> hi
    so the result is the least amount of opacity needed, not the heaviest,
    per "legible without looking like a heavy watermark." If nothing
    in-range clears the target, returns hi (the strongest available) with
    its actual ratio."""
    best = None
    o = lo
    while o <= hi + 1e-9:
        blended = blend(fg, bg, o)
        cr = contrast_ratio(blended, bg)
        if best is None or cr > best[1]:
            best = (round(o, 2), cr, blended)
        if cr >= target:
            return round(o, 2), cr, blended
        o += step
    return best

for fname, cx, cy in PHOTOS:
    path = f"src/assets/images/{fname}"
    avg, box, size = sample_region(path, cx, cy)
    print(f"\n=== {fname} (source {size[0]}x{size[1]}) ===")
    print(f"sample box (px): {box}  center=({cx:.2f}, {cy:.2f}) of source")
    print(f"average sampled color: rgb{avg}  #{avg[0]:02X}{avg[1]:02X}{avg[2]:02X}")

    cr_cream_full = contrast_ratio(CREAM, avg)
    cr_espresso_full = contrast_ratio(ESPRESSO, avg)
    print(f"contrast @ full opacity -- cream: {cr_cream_full:.2f}:1   espresso: {cr_espresso_full:.2f}:1")

    if cr_cream_full >= cr_espresso_full:
        chosen_name, chosen_rgb = "cream", CREAM
    else:
        chosen_name, chosen_rgb = "espresso", ESPRESSO

    opacity, cr, blended = best_opacity(chosen_rgb, avg)
    passes = "PASS" if cr >= 3.0 else "FAIL"
    print(f"chosen: {chosen_name} #{chosen_rgb[0]:02X}{chosen_rgb[1]:02X}{chosen_rgb[2]:02X} @ {int(opacity*100)}% opacity")
    print(f"effective blended color over sampled bg: #{blended[0]:02X}{blended[1]:02X}{blended[2]:02X}")
    print(f"contrast ratio: {cr:.2f}:1  ({passes} vs 3:1 WCAG large-text threshold)")
