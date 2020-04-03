import fileinput

for line in fileinput.input(inplace=1):
  if line.startswith('# '):
    title = line.replace("# ", "").replace("\n", "").replace("`", "")
    print("---")
    print("title:", title, sep=" ")
    print("metaTitle:", title, sep=" ")
    print("metaDescription: description")
    print('---')
  elif line.startswith('##'):
    print(line.replace("\n", "").replace("`", "").replace("\*", "*").replace("\_", "_"))
  else:
    print(line.replace("\n", "").replace("\_", "_").replace("\*", "*"))
  



# for i in content/**/*.mdx ; do echo "$i" && python3 post_pandocs_script.py $i ; done


