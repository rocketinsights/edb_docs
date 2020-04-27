from pathlib import Path
import os
import shutil
import fileinput

for path in Path('content_build').rglob('*.mdx'):
  levels = len(str(path.parent).split('/')) - 2
  for line in fileinput.input(files=[str(path)], inplace=1):
    print(line.replace("images", "../" * levels + "images"), end="")
