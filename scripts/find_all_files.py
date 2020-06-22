import os
'''
    For the given path, get the List of all files in the directory tree 
'''
def putIndexFirst(e):
  return e.replace("index.mdx", "00_index.mdx")

def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        elif '.mdx' in fullPath:
            allFiles.append(fullPath)
                
    return allFiles        
def main():
    
    dirName = 'docs/ark/1/ark_admin_guide';
    
    # Get the list of all files in directory tree at given path
    listOfFiles = getListOfFiles(dirName)
    listOfFiles.sort(key=putIndexFirst)
    
    # Print the files
    with open (dirName + '/combined.mdx', 'w') as fp: 
        for elem in listOfFiles:
            g = open(elem, "r")
            for line in g.readlines():
                fp.write(line) 

            print(elem)

        
        
        
        
if __name__ == '__main__':
    main()