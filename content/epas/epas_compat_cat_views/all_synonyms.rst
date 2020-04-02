.. _all_synonyms:

*********************
`ALL_SYNONYMS`:index:
*********************

The ``ALL_SYNONYMS`` view provides information on all synonyms that may be
referenced by the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

================= ==== ====================================================
Name              Type Description
owner             TEXT User name of the synonym’s owner.
schema_name       TEXT The name of the schema in which the synonym resides.
synonym_name      TEXT Name of the synonym.
table_owner       TEXT User name of the object’s owner.
table_schema_name TEXT The name of the schema in which the table resides.
table_name        TEXT The name of the object that the synonym refers to.
db_link           TEXT The name of any associated database link.
================= ==== ====================================================
