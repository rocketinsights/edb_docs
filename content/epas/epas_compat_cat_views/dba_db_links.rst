.. _dba_db_links:

*********************
`DBA_DB_LINKS`:index:
*********************

The ``DBA_DB_LINKS`` view provides information about all database links in
the database.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

======== ================= ==========================================================
Name     Type              Description
owner    TEXT              User name of the database link’s owner.
db_link  TEXT              The name of the database link.
type     CHARACTER VARYING Type of remote server. Value will be either REDWOOD or EDB
username TEXT              User name of the user logging in.
host     TEXT              Name or IP address of the remote server.
======== ================= ==========================================================
