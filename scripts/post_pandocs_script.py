import fileinput

copying = False
top_url_line = ""

for line in fileinput.input(inplace=1):
  if line.startswith('# '):
    title = line.replace("# ", "").replace("\n", "").replace("`", "").replace("\*", "*")
    print("---")
    print('title: "' + title + '"')
    print('---')
    print()
    print(top_url_line)
    copying = True
  elif not copying:
    if "registered\_link" in line:
      top_url_line = line.replace("\\", "")
    else:
      continue
  elif line.startswith('##'):
    print(line.replace("`", "").replace("\*", "*").replace("\_", "_"), end="")
  elif "registered\_link" in line:
    print(line.replace("\\",""), end="")
  else:
    print(line.replace("\_", "_").replace("\*", "*"), end="")
  



# for i in content/**/*.mdx ; do echo "$i" && python3 post_pandocs_script.py $i ; done


