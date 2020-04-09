.. _dba_cons_columns:

*************************
`DBA_CONS_COLUMNS`:index:
*************************

The ``DBA_CONS_COLUMNS`` view provides information about all columns that
are included in constraints that are specified in on all tables in the
database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=============== ======== ========================================================
Name            Type     Description
owner           TEXT     User name of the constraint’s owner.
schema_name     TEXT     Name of the schema in which the constraint belongs.
constraint_name TEXT     The name of the constraint.
table_name      TEXT     The name of the table to which the constraint belongs.
column_name     TEXT     The name of the column referenced in the constraint.
position        SMALLINT The position of the column within the object definition.
constraint_def  TEXT     The definition of the constraint.
=============== ======== ========================================================
