.. _dba_source:

*******************
`DBA_SOURCE`:index:
*******************

The ``DBA_SOURCE`` view provides the source code listing of all objects in
the database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ======= ===============================================================================================
Name        Type    Description
owner       TEXT    User name of the program’s owner.
schema_name TEXT    Name of the schema in which the program belongs.
name        TEXT    Name of the program.
type        TEXT    Type of program – possible values are: FUNCTION, PACKAGE, PACKAGE BODY, PROCEDURE, and TRIGGER.
line        INTEGER Source code line number relative to a given program.
text        TEXT    Line of source code text.
=========== ======= ===============================================================================================
