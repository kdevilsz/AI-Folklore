import math
from PIL import Image, ImageDraw

SCALE = 2  # 2x supersampling for razor-sharp rendering
FINAL_H = 72
FINAL_W = 2880  # 18 repeats of 160px
TILE_FINAL_W = 160

H = FINAL_H * SCALE  # 144px
TILE_H = H
TILE_W = TILE_FINAL_W * SCALE  # 320px
W = FINAL_W * SCALE  # 5760px

# Authentic Assamese Gamosa colors:
# Cream / bleached white handloom cotton base
BG_COLOR = (254, 252, 248, 255)
# Vibrant handloom Assamese red silk thread
RED_COLOR = (196, 30, 21, 255)
WHITE_COLOR = (254, 252, 248, 255)

# Exact 2px thick red stripe in 1x = 4px in 2x scale
STRIPE_2PX = 2 * SCALE

# Stripe vertical positions (at 2x scale):
# Outer edge margin = 2.5px (5px at 2x)
Y_S1 = 5            # 2.5px -> outer boundary stripe
Y_S2 = 19           # 9.5px -> second boundary stripe
Y_S3 = 35           # 17.5px -> inner guideline stripe

Y_S3_B = H - Y_S3 - STRIPE_2PX  # 105
Y_S2_B = H - Y_S2 - STRIPE_2PX  # 121
Y_S1_B = H - Y_S1 - STRIPE_2PX  # 135

def draw_diamond(draw, cx, cy, size, fill):
    h = size / 2.0
    draw.polygon([(cx, cy - h), (cx + h, cy), (cx, cy + h), (cx - h, cy)], fill=fill)

def draw_cross(draw, cx, cy, arm_len, thickness, fill):
    t = thickness / 2.0
    a = arm_len / 2.0
    draw.rectangle([cx - a, cy - t, cx + a, cy + t], fill=fill)
    draw.rectangle([cx - t, cy - a, cx + t, cy + a], fill=fill)

def draw_8petal_flower(draw, cx, cy, radius, fill_color, inner_color):
    """
    Authentic Assamese 8-Petal Woven Medallion (Kingkhap / Phulam Padum Phool)
    """
    petal_len = radius * 0.96
    
    # 8 radiating petals at 45 degree intervals
    for i in range(8):
        angle = i * (math.pi / 4.0)
        tip_x = cx + math.cos(angle) * petal_len
        tip_y = cy + math.sin(angle) * petal_len
        
        # Faceted diamond petal
        side_dist = petal_len * 0.52
        side_angle_left = angle - 0.26
        side_angle_right = angle + 0.26
        
        sl_x = cx + math.cos(side_angle_left) * side_dist
        sl_y = cy + math.sin(side_angle_left) * side_dist
        sr_x = cx + math.cos(side_angle_right) * side_dist
        sr_y = cy + math.sin(side_angle_right) * side_dist
        
        base_dist = radius * 0.20
        bx = cx + math.cos(angle) * base_dist
        by = cy + math.sin(angle) * base_dist
        
        # Outer petal body
        draw.polygon([(bx, by), (sl_x, sl_y), (tip_x, tip_y), (sr_x, sr_y)], fill=fill_color)
        
        # Inner fine needle vein
        in_tip_x = cx + math.cos(angle) * (petal_len * 0.76)
        in_tip_y = cy + math.sin(angle) * (petal_len * 0.76)
        in_base_x = cx + math.cos(angle) * (base_dist * 1.5)
        in_base_y = cy + math.sin(angle) * (base_dist * 1.5)
        draw.line([(in_base_x, in_base_y), (in_tip_x, in_tip_y)], fill=inner_color, width=max(1, int(1.4 * SCALE)))
        
        # Petal tip diamond pip (traditional Assamese phool finish)
        pip_dist = petal_len * 1.10
        px = cx + math.cos(angle) * pip_dist
        py = cy + math.sin(angle) * pip_dist
        draw_diamond(draw, px, py, radius * 0.22, fill_color)

    # Central Core Rosette
    core_r = radius * 0.36
    draw.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r], fill=fill_color)
    draw.ellipse([cx - core_r*0.62, cy - core_r*0.62, cx + core_r*0.62, cy + core_r*0.62], fill=inner_color)
    draw_diamond(draw, cx, cy, core_r * 0.9, fill_color)
    # Tiny white center dot
    draw.ellipse([cx - 1.5*SCALE, cy - 1.5*SCALE, cx + 1.5*SCALE, cy + 1.5*SCALE], fill=inner_color)

def generate_tile():
    tile = Image.new('RGBA', (TILE_W, TILE_H), BG_COLOR)
    draw = ImageDraw.Draw(tile)
    
    # 1. Outer continuous horizontal red stripes (2px thick = 4px at 2x)
    for ys in [Y_S1, Y_S2, Y_S1_B, Y_S2_B]:
        draw.rectangle([0, ys, TILE_W, ys + STRIPE_2PX], fill=RED_COLOR)

    # Lane 1: Between S1 and S2 (top & bottom)
    l1_top_cy = (Y_S1 + STRIPE_2PX + Y_S2) / 2.0
    l1_bot_cy = (Y_S2_B + STRIPE_2PX + Y_S1_B) / 2.0

    step_l1 = 16 * SCALE  # 32px at 2x -> 16px in final
    for k in range(int(TILE_W / step_l1) + 1):
        x = k * step_l1
        if k % 2 == 0:
            # Small red diamond shape (◆)
            draw_diamond(draw, x, l1_top_cy, 5.5 * SCALE, RED_COLOR)
            draw_diamond(draw, x, l1_bot_cy, 5.5 * SCALE, RED_COLOR)
        else:
            # Small red cross/plus (+) motif
            draw_cross(draw, x, l1_top_cy, 5.5 * SCALE, 1.8 * SCALE, RED_COLOR)
            draw_cross(draw, x, l1_bot_cy, 5.5 * SCALE, 1.8 * SCALE, RED_COLOR)

    # Center flower position
    cx, cy = TILE_W / 2.0, TILE_H / 2.0
    fl_r = 21 * SCALE  # radius 21px in 1x, diameter 42px
    fl_margin = 25 * SCALE

    # 2. Inner horizontal guideline stripes (S3 and S3_B) outside flower zone
    draw.rectangle([0, Y_S3, cx - fl_margin, Y_S3 + STRIPE_2PX], fill=RED_COLOR)
    draw.rectangle([cx + fl_margin, Y_S3, TILE_W, Y_S3 + STRIPE_2PX], fill=RED_COLOR)
    draw.rectangle([0, Y_S3_B, cx - fl_margin, Y_S3_B + STRIPE_2PX], fill=RED_COLOR)
    draw.rectangle([cx + fl_margin, Y_S3_B, TILE_W, Y_S3_B + STRIPE_2PX], fill=RED_COLOR)

    # Lane 2: Between S2 and S3 (top & bottom)
    l2_top_cy = (Y_S2 + STRIPE_2PX + Y_S3) / 2.0
    l2_bot_cy = (Y_S3_B + STRIPE_2PX + Y_S2_B) / 2.0
    for k in range(int(TILE_W / step_l1) + 1):
        x = k * step_l1
        x_off = (x + 8 * SCALE) % TILE_W
        if abs(x_off - cx) > fl_margin - 4 * SCALE:
            if k % 2 == 0:
                draw_diamond(draw, x_off, l2_top_cy, 5.5 * SCALE, RED_COLOR)
                draw_diamond(draw, x_off, l2_bot_cy, 5.5 * SCALE, RED_COLOR)
            else:
                draw_cross(draw, x_off, l2_top_cy, 5.5 * SCALE, 1.8 * SCALE, RED_COLOR)
                draw_cross(draw, x_off, l2_bot_cy, 5.5 * SCALE, 1.8 * SCALE, RED_COLOR)

    # Center horizontal lane stripes running between flowers:
    draw.rectangle([0, cy - 8*SCALE, cx - fl_margin, cy - 8*SCALE + STRIPE_2PX], fill=RED_COLOR)
    draw.rectangle([cx + fl_margin, cy - 8*SCALE, TILE_W, cy - 8*SCALE + STRIPE_2PX], fill=RED_COLOR)
    draw.rectangle([0, cy + 8*SCALE - STRIPE_2PX, cx - fl_margin, cy + 8*SCALE], fill=RED_COLOR)
    draw.rectangle([cx + fl_margin, cy + 8*SCALE - STRIPE_2PX, TILE_W, cy + 8*SCALE], fill=RED_COLOR)

    # Center lane motifs between flowers (around x=0 and x=TILE_W):
    for mid_x in [0, TILE_W]:
        draw_diamond(draw, mid_x, cy, 13 * SCALE, RED_COLOR)
        draw_diamond(draw, mid_x, cy, 6 * SCALE, WHITE_COLOR)

    for off_x in [18 * SCALE, 36 * SCALE]:
        draw_cross(draw, off_x, cy, 7 * SCALE, 2 * SCALE, RED_COLOR)
        draw_diamond(draw, off_x + 9 * SCALE, cy, 5.5 * SCALE, RED_COLOR)
        draw_cross(draw, TILE_W - off_x, cy, 7 * SCALE, 2 * SCALE, RED_COLOR)
        draw_diamond(draw, TILE_W - off_x - 9 * SCALE, cy, 5.5 * SCALE, RED_COLOR)

    # Prominent 8-petal Assamese flower medallion at regular interval (center of tile)
    draw_8petal_flower(draw, cx, cy, radius=fl_r, fill_color=RED_COLOR, inner_color=WHITE_COLOR)
    
    return tile

def generate_banner():
    tile = generate_tile()
    
    # Assemble full 2880px strip by tiling
    banner = Image.new('RGBA', (W, H), BG_COLOR)
    num_tiles = int(W / TILE_W)
    for i in range(num_tiles):
        banner.paste(tile, (i * TILE_W, 0))
        
    final_banner = banner.resize((FINAL_W, FINAL_H), Image.Resampling.LANCZOS)
    return final_banner

def generate_corner():
    C_SIZE = H  # 144px at 2x scale
    corner = Image.new('RGBA', (C_SIZE, C_SIZE), BG_COLOR)
    draw = ImageDraw.Draw(corner)
    
    # Outer continuous framing stripes matching banner strips exactly
    # Top & bottom lines
    for ys in [Y_S1, Y_S2, Y_S2_B, Y_S1_B]:
        draw.rectangle([0, ys, C_SIZE, ys + STRIPE_2PX], fill=RED_COLOR)
    # Left & right lines
    for xs in [Y_S1, Y_S2, Y_S2_B, Y_S1_B]:
        draw.rectangle([xs, 0, xs + STRIPE_2PX, C_SIZE], fill=RED_COLOR)
        
    # Corner diamonds at the grid intersections
    corner_intersections = [
        ((Y_S1 + Y_S2 + STRIPE_2PX)/2.0, (Y_S1 + Y_S2 + STRIPE_2PX)/2.0),
        (C_SIZE - (Y_S1 + Y_S2 + STRIPE_2PX)/2.0, (Y_S1 + Y_S2 + STRIPE_2PX)/2.0),
        ((Y_S1 + Y_S2 + STRIPE_2PX)/2.0, C_SIZE - (Y_S1 + Y_S2 + STRIPE_2PX)/2.0),
        (C_SIZE - (Y_S1 + Y_S2 + STRIPE_2PX)/2.0, C_SIZE - (Y_S1 + Y_S2 + STRIPE_2PX)/2.0)
    ]
    for px, py in corner_intersections:
        draw_diamond(draw, px, py, 6 * SCALE, RED_COLOR)
        
    # Center of Corner: Larger red medallion flower (8 petals)
    cx, cy = C_SIZE / 2.0, C_SIZE / 2.0
    # Prominent medallion in corner: radius 26px (52px diameter)
    draw_8petal_flower(draw, cx, cy, radius=26 * SCALE, fill_color=RED_COLOR, inner_color=WHITE_COLOR)
    
    # 4 diagonal corner mini-crosses / stepped diamond finials
    for angle_deg in [45, 135, 225, 315]:
        rad = math.radians(angle_deg)
        dist = 36 * SCALE
        mx = cx + math.cos(rad) * dist
        my = cy + math.sin(rad) * dist
        draw_diamond(draw, mx, my, 5.5 * SCALE, RED_COLOR)
        
    final_corner = corner.resize((FINAL_H, FINAL_H), Image.Resampling.LANCZOS)
    return final_corner

if __name__ == '__main__':
    banner = generate_banner()
    banner.save('assets/images/gamosa-banner.png')
    print('Generated assets/images/gamosa-banner.png (2880x72)')
    
    # Vertical strip: rotated 90 degrees
    banner_v = banner.rotate(90, expand=True)
    banner_v.save('assets/images/gamosa-banner-v.png')
    print('Generated assets/images/gamosa-banner-v.png (72x2880)')
    
    corner = generate_corner()
    corner.save('assets/images/gamosa-corner.png')
    print('Generated assets/images/gamosa-corner.png (72x72)')
