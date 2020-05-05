import fileinput

for line in fileinput.input(inplace=1):
  if line.startswith('.. _'):
    target = line.replace(".. _", "").replace(":\n", "").replace("(", "").replace(")", "")
    print('.. raw:: html\n\n<div id="' + target + '" class="registered_link"></div>\n')
  elif not line.startswith(".. tabularcolumns"):
    print(line.replace("™", "").replace("®", ""), end="")

