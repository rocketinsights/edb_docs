.. _dba_queue_tables:

*************************
`DBA_QUEUE_TABLES`:index:
*************************

The ``DBA_QUEUE_TABLES`` view provides information about all of the queue
tables in the database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

================== ========= ============================================================================================
Name               Type      Description
owner              TEXT      Role name of the owner of the queue table.
queue_table        TEXT      The user-specified name of the queue table.
type               CHARACTER The type of data stored in the queue table.

                   VARYING
object_type        TEXT      The user-defined payload type.
sort_order         CHARACTER The order in which the queue table is sorted.

                   VARYING
recipients         CHARACTER Always SINGLE.

                   VARYING
message_grouping   CHARACTER Always NONE.

                   VARYING
compatible         CHARACTER The release number of the Advanced Server release with which this queue table is compatible.

                   VARYING
primary_instance   NUMERIC   Always 0.
secondary_instance NUMERIC   Always 0.
owner_instance     NUMERIC   The instance number of the instance that owns the queue table.
user_comment       CHARACTER The user comment provided when the table was created.

                   VARYING
secure             CHARACTER YES indicates that the queue table is secure; NO indicates that it is not.

                   VARYING
================== ========= ============================================================================================
