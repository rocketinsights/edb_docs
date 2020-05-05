import fileinput
from pathlib import Path

# Cleaning up the MDX files after Pandoc has converted from RST to MDX
# The original files had the registered link (for internal links) at the top of the file
# These needed to be after the frontmatter so the if and elif take care of this
# The rest is removing lots of extra characters from conversion

for path in Path('content_build').rglob('*.mdx'):
  copying = False
  top_url_line = ""
  for line in fileinput.input(files=[str(path)], inplace=1):
    if line.startswith('# '):
      title = line.replace("# ", "").replace("\n", "").replace("`", "").replace("\*", "*")
      print("---")
      print('title: "' + title + '"')
      print('---')
      print()
      print(top_url_line)
      copying = True
    elif not copying:
      if "registered\_link" in line:
        top_url_line = line.replace("\\", "")
      else:
        continue
    elif line.startswith('##'):
      print(line.replace("`", "").replace("\*", "*").replace("\_", "_"), end="")
    elif "registered\_link" in line:
      print(line.replace("\\",""), end="")
    else:
      print(line.replace("\_", "_").replace("\*", "*"), end="")

exec(open('scripts/sort_toc_nested.py').read())
exec(open('scripts/fix_image_links.py').read())
exec(open('scripts/internal_links.py').read())
