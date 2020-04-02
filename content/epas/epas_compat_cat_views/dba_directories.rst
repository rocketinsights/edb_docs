.. _dba_directories:

************************
`DBA_DIRECTORIES`:index:
************************

The ``DBA_DIRECTORIES`` view provides information about all directories
created with the ``CREATE DIRECTORY`` command.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

============== ======================= =========================================
Name           Type                    Description
owner          CHARACTER VARYING(30)   User name of the directory’s owner.
directory_name CHARACTER VARYING(30)   The alias name assigned to the directory.
directory_path CHARACTER VARYING(4000) The path to the directory.
============== ======================= =========================================
