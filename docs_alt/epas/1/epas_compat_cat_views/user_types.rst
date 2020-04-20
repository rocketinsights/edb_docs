.. _user_types:

*******************
`USER_TYPES`:index:
*******************

The ``USER_TYPES`` view provides information about all object types owned by
the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ======= ====================================================
Name        Type    Description
schema_name TEXT    The name of the schema in which the type is defined.
type_name   TEXT    The name of the type.
type_oid    OID     The object identifier (OID) of the type.
typecode    TEXT    The typecode of the type. Possible values are:

                       OBJECT

                       COLLECTION

                       OTHER
attributes  INTEGER The number of attributes in the type.
=========== ======= ====================================================
