.. _dba_types:

******************
`DBA_TYPES`:index:
******************

The ``DBA_TYPES`` view provides information about all object types in the
database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ======= ====================================================
Name        Type    Description
owner       TEXT    The owner of the object type.
schema_name TEXT    The name of the schema in which the type is defined.
type_name   TEXT    The name of the type.
type_oid    OID     The object identifier (OID) of the type.
typecode    TEXT    The typecode of the type. Possible values are:

                       OBJECT

                       COLLECTION

                       OTHER
attributes  INTEGER The number of attributes in the type.
=========== ======= ====================================================
