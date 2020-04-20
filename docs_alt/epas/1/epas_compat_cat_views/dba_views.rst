.. _dba_views:

******************
`DBA_VIEWS`:index:
******************

The ``DBA_VIEWS`` view provides information about all views in the database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ==== =======================================================
Name        Type Description
owner       TEXT User name of the view’s owner.
schema_name TEXT Name of the schema in which the view belongs.
view_name   TEXT Name of the view.
text        TEXT The text of the SELECT statement that defines the view.
=========== ==== =======================================================
