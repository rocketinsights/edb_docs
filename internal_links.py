from pathlib import Path
import os
import shutil

links = {}

for path in Path('content_build').rglob('*.mdx'):
    root_path = str(path.parents[0]) + '/'
    content_path = str(path.parents[2]) + '/'
    print(root_path)

    f = path.open()
    for line in f.readlines():
      if "registered_link" in line:
        id = line.split('"')[1]
        links[id] = str(path.parent)
        print(line)


print(links)