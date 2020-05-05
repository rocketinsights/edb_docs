from pathlib import Path
import re
import fileinput

links = {}

def clean_up_key(key):
  new_key = key.replace("(", "").replace(")", "")
  if key[-1] == "_":
    new_key = new_key[0:-1]
  return new_key

# Scan all of the files in the content_build folder to find any registered links
# If found, each tag is added as a key and the path is added as a value to the lnks object

for path in Path('content_build').rglob('*.mdx'):
    root_path_array = str(path.parent).split('/')[2:]
    root_path = "/".join(root_path_array)
    if len(root_path_array) > 0:
      root_path = root_path + "/"

    f = path.open()
    for line in f.readlines():
      if "registered_link" in line:
        id = "#" + line.split('"')[1]
        links[id] = root_path + str(path.stem) + id

# Now that all of the links in the object, scan all of the files again to replace the
# references with links

for path in Path('content_build').rglob('*.mdx'):

    # finding depth of link to know how far to back out to root

    depth = len(str(path.parent).split('/')) - 2
    if path.name == 'index.mdx':
      depth -= 1
    if depth < 0:
      depth = 0
    depth_prefix = "../" * depth

    f = path.open()
    for line in fileinput.input(files=[str(path)], inplace=1):
      new_line = line

      # convert all internal links in each line to MDX format
      internal_links = re.findall('(\`[.0-9a-zA-Z\s\-]*?) (\<.*?\>\`)', line)
      if len(internal_links) > 0:
        for link in internal_links:
          new_text = "[" + link[0][1:]
          new_url = "](#" + clean_up_key(link[1][1:-2]) + ")"
          new_line = new_line.replace(link[0], new_text).replace(link[1], new_url)

      # convert registered links to paths
      if "](#" in new_line:
        tags = re.findall('(?<=\()(.*?)(?=\))', new_line)
        for tag in tags:
          if tag in links:
            new_line = new_line.replace(tag, depth_prefix + links[tag])
      print(new_line, end="")
      



