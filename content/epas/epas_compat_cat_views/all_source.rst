.. _all_source:

*******************
`ALL_SOURCE`:index:
*******************

The ``ALL_SOURCE`` view provides a source code listing of the following
program types: functions, procedures, triggers, package specifications,
and package bodies.

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
