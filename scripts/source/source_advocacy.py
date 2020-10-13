import os

console.log('sourcing advocacy_docs')
if os.path.exists('advocacy_docs/advocacy_docs'):
    os.remove('advocacy_docs')
    os.system('git clone https://github.com/rocketinsights/edb_docs_advocacy.git advocacy_docs')
