.. _dba_objects:

********************
`DBA_OBJECTS`:index:
********************

The ``DBA_OBJECTS`` view provides information about all objects in the
database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ================= =========================================================================================================================================
Name        Type              Description
owner       TEXT              User name of the object’s owner.
schema_name TEXT              Name of the schema in which the object belongs.
object_name TEXT              Name of the object.
object_type TEXT              Type of the object – possible values are: INDEX, FUNCTION, PACKAGE, PACKAGE BODY, PROCEDURE, SEQUENCE, SYNONYM, TABLE, TRIGGER, and VIEW.
status      CHARACTER VARYING Included for compatibility only; always set to VALID.
temporary   TEXT              Y if the table is temporary; N if the table is permanent.
=========== ================= =========================================================================================================================================
