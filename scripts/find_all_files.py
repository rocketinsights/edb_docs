import os
import re

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

def filterPng(filename):
    if '.png' in filename:
        return False
    else:
        return True


def getListOfFiles(dirName, parentChapter):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFiles = list(filter(filterPng, os.listdir(dirName)))
    listOfFiles.sort(key=putIndexFirst2)
    allFiles = list()
    chapter = 1
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
    
    dirName = 'docs/epas/12/05_epas_compat_bip_guide'
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
            
        print(elem.filename)
        print(elem.title)
        print(elem.chapter)

    
    # Print the files
    with open(dirName + '/combined.mdx', 'w') as fp:
        for elem in listOfFiles:
            g = open(elem.filename, "r")
            for line in g.readlines():
                newLine = re.sub(r'(?is)..\/images\/(\w*\/)*', 'images/', line)
                if line[0:3] == "## ":
                    newLine = "#" + line
                if "title: " in line:
                    newLine = elem.chapter + " " + line[7:].replace('"', '')
                fp.write(newLine)
            fp.write('\n')
            print(elem)

        
if __name__ == '__main__':
    main()