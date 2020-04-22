from pathlib import Path
import os
import shutil

def numberprefix(int):
  result = str(int) + "_"
  if int < 10:
    result = "0" + result
  return result

class Node:
    def __init__(self, filename):
        self.filename = filename
        self.items = []

def extractToc(readfile):
  appending = False
  toc = []
  tocItems = {}
  for line in readfile.readlines():
    if appending and len(line) > 4 and "::" not in line and "newpage" not in line:
      filename = line.replace(" ", "").replace("\n", "")
      if not filename in tocItems:
        toc.append(Node(filename))
        tocItems[filename] = "1"
    if "maxdepth" in line:
      appending = True
  return toc

def scanNode(path, root):
  g = open(path, "r")
  toc = extractToc(g)
  if len(toc) > 0:
    for idx, item in enumerate(toc):
      item_path = root + item.filename + ".rst"
      subToc = scanNode(item_path, root)
      if len(subToc) > 0:
        toc[idx].items = subToc
  return toc

def countItems(tree):
  total = len(tree.items)
  for leaf in tree.items:
    total += countItems(leaf)
  return total

def printItems(tree, depth):
  print(">" * depth + " " + tree.filename)
  for leaf in tree.items:
    printItems(leaf, depth + 1)

for path in Path('content').rglob('index.rst'):
    root_path = str(path.parents[0]) + '/'
    idx = 1
    f = path.open()
    toc = extractToc(f)
    for idx, item in enumerate(toc):
      item_path = root_path + item.filename + ".rst"
      subToc = scanNode(item_path, root_path)
      if len(subToc) > 0:
        toc[idx].items = subToc

    total = len(toc)
    for node in toc:
      printItems(node, 0)
      total += countItems(node)
    print(total)
    print(root_path)
    print(os.getcwd())
    result_path = root_path + "result"

    # clear out previous results, if any
    shutil.rmtree(result_path)
    try:
      os.mkdir(result_path)
    except OSError:
      print ("Creation of the directory %s failed" % result_path)
    else:
      print ("Successfully created the directory %s " % result_path)

    idx = 1
    for node in toc:
      if len(node.items) == 0:
        print(node.filename)
        os.rename(root_path + node.filename + ".mdx", result_path + "/" + numberprefix(idx) + node.filename + ".mdx")
      idx += 1
  
    # for item in len(toc:
    #   os.rename(str(path.parents[0]) + "/" + item + ".mdx", str(path.parents[0]) + "/" + numberprefix(idx) + item + ".mdx") 
    #   idx += 1
    # os.rename(str(path.parents[0]) + "/index.mdx", str(path.parents[1]) + "/" + path.parts[-2] + ".mdx") 
    


