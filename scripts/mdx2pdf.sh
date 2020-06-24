#!/bin/bash

pandoc "$1" \
    --toc \
    -f gfm \
    --include-in-header scripts/inline_code.tex \
    --highlight-style espresso \
    -V linkcolor:blue \
    -V geometry:a4paper \
    -V geometry:margin=2cm \
    -V mainfont="Helvetica" \
    -V monofont="Monaco" \
    --pdf-engine=xelatex \
    -o "$2" 