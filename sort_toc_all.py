from pathlib import Path
import os

def numberprefix(int):
  result = str(int) + "_"
  if int < 10:
    result = "0" + result
  return result

for path in Path('content').rglob('index.rst'):
    print(path.name)
    print(path.parents[0])
    print(path.parents[1])
    idx = 1
    appending = False
    toc = []
    tocItems = {}
    with path.open() as f: 
      for line in f.readlines():
        if appending and len(line) > 4:
          item = line.replace(" ", "").replace("\n", "")
          if not item in tocItems:
            toc.append(item)
            tocItems[item] = "1"
        if "maxdepth" in line:
          appending = True
    print(toc)
    for item in toc:
      os.rename(str(path.parents[0]) + "/" + item + ".mdx", str(path.parents[0]) + "/" + numberprefix(idx) + item + ".mdx") 
      idx += 1
    # os.rename(str(path.parents[0]) + "/index.mdx", str(path.parents[1]) + "/" + path.parts[-2] + ".mdx") 
    


