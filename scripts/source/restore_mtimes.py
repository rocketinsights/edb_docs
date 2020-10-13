import os

# mtime restoration for base docs is in gatsby-node directly

if os.path.exists('advocacy_docs/advocacy_docs'):
    print('restoring mtime for advocacy_docs')
    os.system('cd advocacy_docs && python3 ../scripts/source/git-restore-mtime.py')
