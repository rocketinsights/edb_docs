To run this locally you will need to have Gatsby installed on your machine
`npm i -g gatsby-cli`

Install all the bits and bobs
`npm i`

Run the site locally
`gatsby develop`

Deploy the site to GH Pages
`npm run deploy`

To migrate RST files, place the folder in the `content` folder and run this script in the terminal
`for i in content/**/*.rst ; do python3 pre_pandocs_script.py ${i%}; echo "$i" && pandoc --wrap=none $i -f rst -t gfm -o ${i%.*}.mdx ; python3 post_pandocs_script.py ${i%.*}.mdx ;done; python3 sort_toc_nested.py`
