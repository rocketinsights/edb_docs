import fileinput

for line in fileinput.input(inplace=1):
  if ":ref:" in line:
    line_segs = line.split(":ref:")
    print(line_segs[0])
    print(line_segs[1].replace(">`",">`_"))
  else:
    print(line.replace("\n", ""))
