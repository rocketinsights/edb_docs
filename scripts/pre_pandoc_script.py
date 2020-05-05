import fileinput

def extract_target(line):
  target = line.replace(".. _", "").replace(":\n", "").replace("(", "").replace(")", "")
  if target[-1] == "_":
    target = target[0:-1]
  return target

for line in fileinput.input(inplace=1):
  if line.startswith('.. _'):
    target = extract_target(line)
    print('.. raw:: html\n\n<div id="' + target + '" class="registered_link"></div>\n')
  elif not line.startswith(".. tabularcolumns"):
    print(line.replace("™", "").replace("®", ""), end="")

