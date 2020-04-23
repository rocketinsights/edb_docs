from pathlib import Path
import os
import shutil

for path in Path('content/**/result').rglob('index.mdx'):
    print(path.name)
    print(path.parent)
    idx = 1
    
