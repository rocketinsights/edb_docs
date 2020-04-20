#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# EnterpriseDB Documentation documentation build configuration file, created by
# sphinx-quickstart on Tue Feb 12 13:11:20 2019.
#
# This file is execfile()d with the current directory set to its
# containing dir.
#
# Note that not all possible configuration values are present in this
# autogenerated file.
#
# All configuration values have a default; values that are commented out
# serve to show the default.

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
sys.path.insert(0, os.path.abspath('.'))

from variables import rst_epilog


# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#
# needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = []

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = '.rst'

# The master toctree document.
master_doc = 'index'


# General information about the project.
project = 'EDB Postgres Advanced Server Security Guide'
copyright = '2020, EnterpriseDB'
author = 'EnterpriseDB'
BUILDDIR= '_build'


# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
version = '13'
# The full version, including alpha/beta/rc tags.
release = '13'
#build_filename= 'EPAS_guide'+version+'.tex'

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = None

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This patterns also effect to html_static_path and html_extra_path
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = False

epub_basename = 'EPAS_'+version+'_guide'


# Variables defined





# -- Options for HTML output ----------------------------------------------

# If true, "Created using Sphinx" is shown in the HTML footer. Default is True.
# I added this section.
html_show_sphinx = False

# If true, "(C) Copyright ..." is shown in the HTML footer. Default is True.
# I added this section.
html_show_copyright = True

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'edb'
html_theme_path = ['../theme']

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
# html_theme_options = {
#     'collapsiblesidebar': True,
#     'relbarbgcolor': '#ed7323',
#     'sidebarbgcolor': '#ffffff',
#     'sidebarbtncolor': '#ed7325',
#     'sidebartextcolor': '#ed7325',
#     'sidebarlinkcolor': '#63584f',
#     'footerbgcolor': '#333',
#     'codebgcolor': '#bac1cd',
#     'textcolor': '#222222',
#     'headbgcolor': '#E2E2E2',
#     'headtextcolor': '#222222',
#     'bodyfont': '"Helvetica Neue", Helvetica, Arial, sans-serif',
#     'headfont': '"Helvetica Neue", Helvetica, Arial, sans-serif'
# }


# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# Custom sidebar templates, must be a dictionary that maps document names
# to template names.
#
# This is required for the alabaster theme
# refs: http://alabaster.readthedocs.io/en/latest/installation.html#sidebars
html_sidebars = {
    '**': [
        'relations.html',  # needs 'show_related': True theme option to display
        'searchbox.html',
        'globaltoc.html'
    ]
}


# -- Options for HTMLHelp output ------------------------------------------

# Output file base name for HTML help builder.
htmlhelp_basename = 'EnterpriseDBDocumentationdoc'

html_logo = 'images/edb_logo.svg'


# -- Options for LaTeX output ---------------------------------------------

latex_elements = {
# The paper size ('letter' or 'a4').
'papersize': 'letter',

# The font size ('10pt', '11pt' or '12pt').
'pointsize': '12pt',
 # Latex figure (float) alignment
'figure_align': 'H',
'extraclassoptions': 'openany,oneside',
'fncychap' : r'\usepackage[Sonny]{fncychap}',

# Additional stuff for the LaTeX preamble.
'preamble': r'''
  \usepackage{hyperref}
  \setcounter{tocdepth}{3}
'''

}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).


latex_documents = [
    (master_doc, 'EPAS_'+version+'_security_guide.tex', 'EDB Postgres Advanced Server',
     'Security Features Guide', 'manual'),
]

latex_logo = 'images/EDB_logo.png'

# -- Options for manual page output ---------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
# man_pages = [
#    (master_doc, 'enterprisedbdocumentation',
#     'EnterpriseDB Documentation',
#     [author], 1)
# ]


# -- Options for Texinfo output -------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
# texinfo_documents = [
#     (master_doc, 'EnterpriseDBDocumentation',
#      'EnterpriseDB Documentation',
#      author, 'EnterpriseDBDocumentation', 'One line description of project.',
#      'Miscellaneous'),
# ]