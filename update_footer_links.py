import os
import re

# List of files to update
files = """c:/yeservants/docs/contact/index.html
c:/yeservants/docs/donate/index.html
c:/yeservants/docs/download/index.html
c:/yeservants/docs/index.html
c:/yeservants/docs/join/index.html
c:/yeservants/docs/missionaries/index.html
c:/yeservants/docs/missionary/abernathy/index.html
c:/yeservants/docs/missionary/ahn/index.html
c:/yeservants/docs/missionary/Andres-Gonzalez/index.html
c:/yeservants/docs/missionary/anonymous/index.html
c:/yeservants/docs/missionary/batluck/index.html
c:/yeservants/docs/missionary/bernie-and-jean-latour/index.html
c:/yeservants/docs/missionary/boyle/index.html
c:/yeservants/docs/missionary/carolynn-hudson/index.html
c:/yeservants/docs/missionary/chinn/index.html
c:/yeservants/docs/missionary/chuck-and-ann-tompkins/index.html
c:/yeservants/docs/missionary/daniel-and-doris-matheus/index.html
c:/yeservants/docs/missionary/delmedico/index.html
c:/yeservants/docs/missionary/federico-raquel-ferrero/index.html
c:/yeservants/docs/missionary/gray/index.html
c:/yeservants/docs/missionary/hale/index.html
c:/yeservants/docs/missionary/heinsch/index.html
c:/yeservants/docs/missionary/hicks/index.html
c:/yeservants/docs/missionary/hsu/index.html
c:/yeservants/docs/missionary/johnson/index.html
c:/yeservants/docs/missionary/johnsons/index.html
c:/yeservants/docs/missionary/kathy-briner/index.html
c:/yeservants/docs/missionary/kawinzi/index.html
c:/yeservants/docs/missionary/lee/index.html
c:/yeservants/docs/missionary/lisa-espineli-chinn/index.html
c:/yeservants/docs/missionary/maier/index.html
c:/yeservants/docs/missionary/narvaez/index.html
c:/yeservants/docs/missionary/oscar/index.html
c:/yeservants/docs/missionary/pappa/index.html
c:/yeservants/docs/missionary/paul-timothy/index.html
c:/yeservants/docs/missionary/richard-and-catherine-weston/index.html
c:/yeservants/docs/missionary/Rupert-Henry-and-Judy-Henry/index.html
c:/yeservants/docs/missionary/Sheryl-and-Steve-Froehlich/index.html
c:/yeservants/docs/missionary/smith/index.html
c:/yeservants/docs/missionary/stewart/index.html
c:/yeservants/docs/missionary/tamercindy/index.html
c:/yeservants/docs/missionary/william-and-chantell-burgess/index.html
c:/yeservants/docs/privacy/index.html
c:/yeservants/docs/thanks/index.html""".strip().split('\n')

# Pattern to find the footer navigation ul
# Looking for variations of the navigation links
# GitHub Pages serves from docs/ as root, so paths should start with / (not /docs/)
patterns = [
    (r'<li><a href="/docs/index\.html">Home</a></li>', '<li><a href="/index.html">Home</a></li>'),
    (r'<li><a href="/">Home</a></li>', '<li><a href="/index.html">Home</a></li>'),
    (r'<li><a href="index\.html">Home</a></li>', '<li><a href="/index.html">Home</a></li>'),
    (r'<li><a href="/docs/about\.html">About</a></li>', '<li><a href="/about.html">About</a></li>'),
    (r'<li><a href="about\.html">About</a></li>', '<li><a href="/about.html">About</a></li>'),
    (r'<li><a href="/docs/missionaries\.html">Missionaries</a></li>', '<li><a href="/missionaries.html">Missionaries</a></li>'),
    (r'<li><a href="missionaries\.html">Missionaries</a></li>', '<li><a href="/missionaries.html">Missionaries</a></li>'),
    (r'<li><a href="/docs/donate/index\.html">Donate</a></li>', '<li><a href="/donate/index.html">Donate</a></li>'),
    (r'<li><a href="donate/">Donate</a></li>', '<li><a href="/donate/index.html">Donate</a></li>'),
    (r'<li><a href="donate/index\.html">Donate</a></li>', '<li><a href="/donate/index.html">Donate</a></li>'),
    (r'<li><a href="/docs/contact/index\.html">Contact</a></li>', '<li><a href="/contact/index.html">Contact</a></li>'),
    (r'<li><a href="contact/">Contact</a></li>', '<li><a href="/contact/index.html">Contact</a></li>'),
    (r'<li><a href="contact/index\.html">Contact</a></li>', '<li><a href="/contact/index.html">Contact</a></li>'),
    # Also handle relative paths from subdirectories
    (r'<li><a href="\.\./index\.html">Home</a></li>', '<li><a href="/index.html">Home</a></li>'),
    (r'<li><a href="\.\./\.\./index\.html">Home</a></li>', '<li><a href="/index.html">Home</a></li>'),
    (r'<li><a href="\.\./about\.html">About</a></li>', '<li><a href="/about.html">About</a></li>'),
    (r'<li><a href="\.\./\.\./about\.html">About</a></li>', '<li><a href="/about.html">About</a></li>'),
    (r'<li><a href="\.\./missionaries\.html">Missionaries</a></li>', '<li><a href="/missionaries.html">Missionaries</a></li>'),
    (r'<li><a href="\.\./\.\./missionaries\.html">Missionaries</a></li>', '<li><a href="/missionaries.html">Missionaries</a></li>'),
    (r'<li><a href="\.\./donate/">Donate</a></li>', '<li><a href="/donate/index.html">Donate</a></li>'),
    (r'<li><a href="\.\./\.\./donate/">Donate</a></li>', '<li><a href="/donate/index.html">Donate</a></li>'),
    (r'<li><a href="\.\./contact/">Contact</a></li>', '<li><a href="/contact/index.html">Contact</a></li>'),
    (r'<li><a href="\.\./\.\./contact/">Contact</a></li>', '<li><a href="/contact/index.html">Contact</a></li>'),
]

updated_count = 0
error_count = 0

for file_path in files:
    # Convert path format
    file_path = file_path.replace('/', os.sep)

    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        error_count += 1
        continue

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Apply all pattern replacements
        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content)

        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[OK] Updated: {file_path}")
            updated_count += 1
        else:
            print(f"[--] No changes needed: {file_path}")

    except Exception as e:
        print(f"[ERROR] Error processing {file_path}: {str(e)}")
        error_count += 1

print(f"\n{'='*60}")
print(f"Summary:")
print(f"  Updated: {updated_count} files")
print(f"  Errors: {error_count} files")
print(f"{'='*60}")
