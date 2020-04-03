import fileinput

for line in fileinput.input(inplace=1):
  if ":ref:" in line:
    line_segs = line.split(":ref:")
    print(line_segs[0])
    print(line_segs[1].replace(">",">_"))
  else:
    print(line.replace("\n", ""))
  


  # for i in content/**/*.rst ; do python3 pre_pandocs_script.py ${i%}; echo "$i" && pandoc $i -f rst -t gfm -o ${i%.*}.mdx ; python3 post_pandocs_script.py ${i%.*}.mdx ;done

