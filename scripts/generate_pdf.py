import os
import re
import sys

'''
    For the given path, get the List of all files in the directory tree 
'''
class ToCItem:
    def __init__(self, filename, chapter):
        self.filename = filename
        self.chapter = chapter
        self.title = ""
        self.anchor = ""

def putIndexFirst(e):
    return e.filename.replace("index.mdx", "00_index.mdx")

def putIndexFirst2(e):
    return e.replace("index.mdx", "00_index.mdx")

def getFilename(file):
    return file.filename   

def filterList(filename):
    if '.png' in filename or 'images' in filename or '.DS_Store' in filename:
        return False
    else:
        return True


def getListOfFiles(dirName, parentChapter):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFiles = list(filter(filterList, os.listdir(dirName)))
    listOfFiles.sort(key=putIndexFirst2)
    allFiles = list()
    chapter = 0
    # print(listOfFiles)
    # Iterate over all the entries
    for entry in listOfFiles:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath, parentChapter + str(chapter) + ".")
        elif '.mdx' in entry or '.md' in entry:
            allFiles.append(ToCItem(fullPath, parentChapter + str(chapter)))
                
        chapter += 1
    return allFiles
    
def main():
    dirName = '' # docs/epas/12/05_epas_compat_bip_guide
    try:
        dirName = sys.argv[1]
    except:
        print('directory not passed in')
        print('if running from yarn use `yarn build-pdf directory/path/here`')
        sys.exit(1)

    openPdf = False
    try:
        openPdf = (sys.argv[2] == '--open')
    except:
        pass
    
    if not os.path.exists(dirName):
        raise Exception('directory does not exist')

    if os.path.exists(dirName + '/combined.mdx'):
        os.remove(dirName + '/combined.mdx')

    # Get the list of all files in directory tree at given path
    listOfFiles = getListOfFiles(dirName, "")
    toc = list()
    for elem in listOfFiles:
        g = open(elem.filename, "r")
        for line in g.readlines():
            if "title: " in line:
                elem.title = line[7:].replace('"', '').replace('\n','')
            pattern = re.compile('div id="(.*?)" class="registered_link"')

            tag = pattern.search(line)
            if tag and len(elem.anchor) == 0:
                elem.anchor = tag.group(1)
            
        # print(elem.filename)
        # print(elem.title)
        # print(elem.chapter)

    
    # Print the files
    with open(dirName + '/combined.mdx', 'w') as fp:
        for elem in listOfFiles:
            g = open(elem.filename, "r")
            frontmatterCount = 2
            for line in g.readlines():
                newLine = re.sub(r'(?is)..\/images\/(\w*\/)*', 'images/', line)
                if line[0:3] == "## ":
                    newLine = "#" + line
                if "toctree" in line:
                    frontmatterCount = 3
                if frontmatterCount == 0:
                    fp.write(newLine)
                if "title: " in line:
                    newLine = elem.chapter + " " + line[7:].replace('"', '')
                    fp.write(newLine)
                if "---" in line and frontmatterCount > 0:
                    frontmatterCount -= 1
                    fp.write(newLine)
            fp.write('\n')
            # print(elem)

    os.system(
    "pandoc {0}/combined.mdx " \
    "--toc " \
    "-f gfm " \
    "-H scripts/pdf-head.tex "\
    "-V linkcolor:blue " \
    "-V geometry:a4paper " \
    "-V geometry:margin=2cm " \
    '-V mainfont="Helvetica" ' \
    '-V monofont="Monaco" ' \
    '-V fontsize=8pt ' \
    '--highlight-style tango ' \
    "--pdf-engine=xelatex " \
    "-o {0}/complete.pdf ".format(dirName)
    )
    # https://learnbyexample.github.io/tutorial/ebook-generation/customizing-pandoc/

    if openPdf:
        os.system("open {0}/complete.pdf".format(dirName))

    os.remove(dirName + '/combined.mdx')

        
if __name__ == '__main__':
    main()
