from pathlib import Path
import os
import shutil
import re
import fileinput

links = {}

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
print(links)

for path in Path('content_build').rglob('*.mdx'):
    root_path = str(path.parents[0]) + '/'
    content_path = str(path.parents[2]) + '/'
    depth = len(str(path.parent).split('/')) - 2
    if path.name == 'index.mdx':
      depth -= 1
    if depth < 0:
      depth = 0
    depth_prefix = "../" * depth
    print(str(path.parent) + "/" + str(path.stem))
    print(depth)

    f = path.open()
    for line in fileinput.input(files=[str(path)], inplace=1):
      new_line = line
      internal_links = re.findall('(\`[a-zA-Z\s]*?) (\<.*?\>\`)', line)
      if len(internal_links) > 0:
        for link in internal_links:
          new_text = "[" + link[0][1:]
          new_url = "](#" + link[1][1:-2] + ")"
          new_line = new_line.replace(link[0], new_text).replace(link[1], new_url)
      if "](#" in new_line:
        tags = re.findall('(?<=\()(.*?)(?=\))', new_line)
        for tag in tags:
          if tag in links:
            new_line = new_line.replace(tag, depth_prefix + links[tag])
      print(new_line, end="")
      



