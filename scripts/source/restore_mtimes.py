import os

print('restoring mtime for docs')
os.system('python3 scripts/source/git-restore-mtime.py')

if os.path.exists('advocacy_docs/advocacy_docs'):
    print('restoring mtime for advocacy_docs')
    os.system('cd advocacy_docs && python3 ../scripts/source/git-restore-mtime.py')
