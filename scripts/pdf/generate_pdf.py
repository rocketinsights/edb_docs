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

    # Iterate over all the entries
    for entry in listOfFiles:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath, parentChapter + str(chapter) + ".")
        elif ('.mdx' in entry or '.md' in entry) and chapter > 0:
            allFiles.append(ToCItem(fullPath, parentChapter + str(chapter)))
                
        chapter += 1
    return allFiles
    
def main():
    dirName = ''
    try:
        dirName = sys.argv[1]
        dirName = re.sub(r'\/$', '', dirName)
    except:
        print('directory not passed in')
        print('if running from yarn use `yarn build-pdf directory/path/here`')
        sys.exit(1)

    openPdf = False
    html = False
    try:
        html = (sys.argv[2] == '--html')
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

    
    # Print the files
    with open(dirName + '/combined.mdx', 'w') as fp:
        for elem in listOfFiles:
            g = open(elem.filename, "r")

            baseImagePath = os.path.split(elem.filename)[0]
            splitPath = baseImagePath.split('/')
            if len(splitPath) >= 4: # limit folder depth, since images are in the sub-product root
                baseImagePath = '/'.join(splitPath[0:4])

            frontmatterCount = 2
            for line in g.readlines():
                newLine = re.sub(r'(?is)(..\/)+images\/(\w*\/)*', 'images/', line)
                newLine = re.sub(r'\(images\/', '(' + baseImagePath + '/images/', newLine)

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

    splitDirName = dirName.split('/')
    htmlFileName = "{0}_v{1}_documentation.html".format(splitDirName[1], splitDirName[2])
    coverFileName = "{0}_v{1}_documentation_cover.html".format(splitDirName[1], splitDirName[2])
    pdfFileName = "{0}_v{1}_documentation.pdf".format(splitDirName[1], splitDirName[2])
    title = "{0} v{1}".format(splitDirName[1], splitDirName[2])

    os.system(
    "pandoc {0}/combined.mdx " \
    "-f gfm " \
    "--self-contained " \
    '--highlight-style tango ' \
    "--css=scripts/pdf/pdf-styles.css " \
    "-o {0}/{1} ".format(dirName, htmlFileName)
    )

    if html:
        os.system("open {0}/{1}".format(dirName, htmlFileName))
    else:
        os.system(
        "sed " \
        "'s/\[TITLE\]/{2}/' " \
        "scripts/pdf/cover.html " \
        "> {0}/{1}" \
        "".format(dirName, coverFileName, title)
        )

        os.system(
        "wkhtmltopdf " \
        "--title '{4}' " \
        "--header-right [doctitle] " \
        "--header-font-name Signika " \
        "--header-font-size 8 " \
        "--header-spacing 3 " \
        "--footer-right [page] " \
        "--footer-left 'Copyright © 2009 - 2020 EnterpriseDB Corporation.  All rights reserved.' " \
        "--footer-font-name Signika " \
        "--footer-font-size 8 " \
        "--footer-spacing 3 " \
        "{0}/{3} " \
        "toc  --xsl-style-sheet scripts/pdf/toc-style.xsl " \
        "{0}/{1} " \
        "{0}/{2} " \
        "".format(dirName, htmlFileName, pdfFileName, coverFileName, title)
        )

    if openPdf:
        os.system("open {0}/{1}".format(dirName, pdfFileName))

    if os.path.exists(dirName + '/combined.mdx'):
        os.remove(dirName + '/combined.mdx')
    if not html:
        os.remove(dirName + '/' + htmlFileName)
        os.remove(dirName + '/' + coverFileName)

if __name__ == '__main__':
    main()
