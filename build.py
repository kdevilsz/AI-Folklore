import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")

def clean_dist():
    if os.path.exists(DIST_DIR):
        print("Cleaning old dist/ folder...")
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)

def build_frontend():
    print("Building frontend assets...")
    
    # Files to copy directly to dist
    root_files = ["index.html", "index.css", "mobile_styles.css", "folktales.json", "proverbs.json", "robots.txt", "sitemap.xml"]
    for f in root_files:
        src = os.path.join(BASE_DIR, f)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(DIST_DIR, f))
            
    # Directories to copy
    dirs_to_copy = ["js", "pages", "assets"]
    for d in dirs_to_copy:
        src_dir = os.path.join(BASE_DIR, d)
        if os.path.exists(src_dir):
            shutil.copytree(src_dir, os.path.join(DIST_DIR, d))
            
    print("Frontend build complete! Ready for static hosting (Vercel/Netlify/GH Pages).")
    print(f"Deployment folder: {DIST_DIR}")

if __name__ == "__main__":
    clean_dist()
    build_frontend()
