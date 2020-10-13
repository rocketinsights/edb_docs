import os
import shutil

print('sourcing advocacy_docs')
if os.path.exists('advocacy_docs/advocacy_docs'):
    shutil.rmtree('advocacy_docs')
os.system('git clone https://github.com/rocketinsights/edb_docs_advocacy.git advocacy_docs')
