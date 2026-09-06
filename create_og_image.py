import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630

# Create base canvas with dark luxury aesthetic (#080e0a to #0f1c14)
img = Image.new("RGBA", (W, H), (8, 14, 10, 255))
draw = ImageDraw.Draw(img)

# Subtle radial background glow centered around (950, 315) and (300, 315)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
gdraw.ellipse([700, 80, 1200, 550], fill=(200, 150, 12, 35))
gdraw.ellipse([80, 120, 600, 520], fill=(18, 55, 36, 45))
glow = glow.filter(ImageFilter.GaussianBlur(80))
img = Image.alpha_composite(img, glow)
draw = ImageDraw.Draw(img)

# Draw Gamosa border banners on top and bottom
gamosa_h_path = os.path.join("assets", "images", "gamosa-banner.png")
if os.path.exists(gamosa_h_path):
    gbanner = Image.open(gamosa_h_path).convert("RGBA")
    bw, bh = gbanner.size
    new_h = 28
    new_w = int(bw * (new_h / bh))
    gbanner_scaled = gbanner.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Paste top
    img.paste(gbanner_scaled.crop((0, 0, W, new_h)), (0, 0), gbanner_scaled.crop((0, 0, W, new_h)))
    # Paste bottom
    img.paste(gbanner_scaled.crop((0, 0, W, new_h)), (0, H - new_h), gbanner_scaled.crop((0, 0, W, new_h)))

# Gold accent lines just inside banners
draw.line([(0, 28), (W, 28)], fill=(200, 150, 12, 220), width=2)
draw.line([(0, H - 29), (W, H - 29)], fill=(200, 150, 12, 220), width=2)

# Paste Jappi image on the right side
jappi_path = os.path.join("assets", "images", "hero-jappi.png")
if os.path.exists(jappi_path):
    jappi = Image.open(jappi_path).convert("RGBA")
    jw, jh = 320, 320
    jappi = jappi.resize((jw, jh), Image.Resampling.LANCZOS)
    
    # Golden circular backdrop for Jappi
    j_x, j_y = 800, 155
    bg_circle = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bcdraw = ImageDraw.Draw(bg_circle)
    bcdraw.ellipse([j_x - 30, j_y - 30, j_x + jw + 30, j_y + jh + 30], fill=(200, 150, 12, 40), outline=(200, 150, 12, 120), width=2)
    bcdraw.ellipse([j_x - 10, j_y - 10, j_x + jw + 10, j_y + jh + 10], fill=(10, 25, 18, 160), outline=(200, 150, 12, 70), width=1)
    img = Image.alpha_composite(img, bg_circle)
    draw = ImageDraw.Draw(img)
    
    img.paste(jappi, (j_x, j_y), jappi)

# Load fonts
font_title = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 64)
font_subtitle = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 30)
font_kicker = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 16)
font_body = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 20)
font_tag = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 16)
font_url = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 18)

# Left Content Column
x = 90

# Kicker / Cultural Header
draw.text((x, 75), "DIGITAL ARCHIVE OF ASSAMESE FOLKLORE", fill=(212, 165, 38), font=font_kicker)

# Main Title: LoreBridge
draw.text((x, 115), "LoreBridge", fill=(248, 240, 222), font=font_title)

# Decorative Divider
draw.line([(x, 205), (x + 360, 205)], fill=(200, 150, 12, 220), width=2)
draw.polygon([(x + 360, 205), (x + 368, 201), (x + 376, 205), (x + 368, 209)], fill=(200, 150, 12))

# Subtitle
draw.text((x, 225), "Echoes of the Brahmaputra", fill=(212, 165, 38), font=font_subtitle)

# Description lines
desc1 = "Explore Assamese folktales, proverbs, and cultural heritage."
desc2 = "Discover stories of Lachit Borphukan, Tejeemola, Bodo legends & more."
draw.text((x, 290), desc1, fill=(210, 220, 215), font=font_body)
draw.text((x, 325), desc2, fill=(170, 185, 178), font=font_body)

# Tag pills
tags = ["Lachit Borphukan", "Tejeemola", "Bodo Legends", "Dakor Boson", "AI Oracle"]
tag_x = x
tag_y = 390
for tag in tags:
    bbox = font_tag.getbbox(tag)
    tw = bbox[2] - bbox[0] + 28
    th = 34
    
    # Draw pill box
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tw, tag_y + th], radius=6, fill=(16, 32, 24, 220), outline=(200, 150, 12, 160), width=1)
    draw.text((tag_x + 14, tag_y + 7), tag, fill=(235, 215, 165), font=font_tag)
    tag_x += tw + 12

# Bottom domain & branding
draw.rounded_rectangle([x, 480, x + 380, 525], radius=8, fill=(200, 150, 12, 35), outline=(200, 150, 12, 180), width=1)
draw.text((x + 20, 492), "lorebridge.vercel.app  •  AI Sanctuary", fill=(245, 235, 210), font=font_url)

# Save image
out_path = os.path.join("assets", "images", "og-preview.png")
rgb_img = img.convert("RGB")
rgb_img.save(out_path, "PNG", quality=95, optimize=True)
print(f"Generated OG Image successfully at: {out_path} ({rgb_img.size})")
