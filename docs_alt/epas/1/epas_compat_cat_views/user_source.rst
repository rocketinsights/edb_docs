.. _user_source:

********************
`USER_SOURCE`:index:
********************

The ``USER_SOURCE`` view provides information about all programs owned by
the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ======= ===============================================================================================
Name        Type    Description
schema_name TEXT    Name of the schema in which the program belongs.
name        TEXT    Name of the program.
type        TEXT    Type of program – possible values are: FUNCTION, PACKAGE, PACKAGE BODY, PROCEDURE, and TRIGGER.
line        INTEGER Source code line number relative to a given program.
text        TEXT    Line of source code text.
=========== ======= ===============================================================================================
