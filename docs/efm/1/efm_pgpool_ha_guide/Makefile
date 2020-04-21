# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SPHINXPROJ    = EnterpriseDBDocumentation
SOURCEDIR     = .
BUILDDIR      = _build

all:	html epub latexpdf
	@echo finished

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

html: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O) 
	rm -rf _build/edb_ha_scalability
	mv _build/html _build/edb_ha_scalability
	chmod -R 777 _build

epub: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O) 
	rm -rf _build/edb_ha_guide.epub
	cp _build/epub/EDBHAScalability.epub _build/edb_ha_guide.epub
	chmod -R 777 _build

latexpdf: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O) 
	rm -rf _build/edb_ha_guide.pdf
	cp _build/latex/edb_ha_guide.pdf _build/edb_ha_guide.pdf
	chmod -R 777 _build


