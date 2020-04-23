from pathlib import Path
import os
import shutil
import fileinput

for path in Path('content_build').rglob('*.mdx'):
  print(path.parent)
  levels = len(str(path.parent).split('/')) - 2
  for line in fileinput.input(files=[str(path)], inplace=1):
    print(line.replace("images", "../" * levels + "images"), end="")

# Return double of n 
# def get_absolute(n): 
#     return str(n)

# path_list = list(map(get_absolute, list(Path('content_build').rglob('*.mdx'))))

# with fileinput.input(files=path_list, inplace=True) as fp:
#     for line in fp:
#         print(line, end='')