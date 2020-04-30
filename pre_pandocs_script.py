import fileinput

for line in fileinput.input(inplace=1):
  if ":ref:" in line:
    print(line.replace(">`",">`_"))
  elif line.startswith('.. _'):
    target = line.replace(".. _", "").replace(":\n", "")
    print('.. raw:: html\n\n<div id="' + target + '" class="registered_link"></div>\n')
  elif "Y{0" not in line:
    print(line.replace("\n", "").replace("™", "").replace("®", ""))
  else:
    print(line, end="")
