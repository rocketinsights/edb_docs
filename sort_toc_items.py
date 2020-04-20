import os, fileinput
cwd = os.getcwd()
folder_name = cwd.split('/')[-1]
print(cwd)

def numberprefix(int):
  result = str(int) + "_"
  if int < 10:
    result = "0" + result
  return result

toc = []
appending = False
idx = 1

for line in fileinput.input():
  if appending and len(line) > 4:
    print(line)
    toc.append(line.replace(" ", "").replace("\n", ""))
  if "maxdepth" in line:
    appending = True

print(toc)

for item in toc:
  os.rename(item + ".mdx", numberprefix(idx) + item + ".mdx") 
  idx += 1

os.rename("index.mdx", "../" + folder_name + ".mdx") 

