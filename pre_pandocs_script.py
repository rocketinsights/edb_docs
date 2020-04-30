import fileinput

for line in fileinput.input(inplace=1):
  if ":ref:" in line:
    print(line.replace(">`",">`_"))
  elif "Y{0" not in line:
    print(line.replace("\n", "").replace("™", "").replace("®", ""))
  else:
    print(line, end="")
