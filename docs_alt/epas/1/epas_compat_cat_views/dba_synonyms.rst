.. _dba_synonyms:

*********************
`DBA_SYNONYMS`:index:
*********************

The ``DBA_SYNONYM`` view provides information about all synonyms in the
database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

================= ==== ===============================================================
Name              Type Description
owner             TEXT User name of the synonym’s owner.
schema_name       TEXT Name of the schema in which the synonym belongs.
synonym_name      TEXT Name of the synonym.
table_owner       TEXT User name of the table’s owner on which the synonym is defined.
table_schema_name TEXT The name of the schema in which the table resides.
table_name        TEXT Name of the table on which the synonym is defined.
db_link           TEXT Name of any associated database link.
================= ==== ===============================================================
