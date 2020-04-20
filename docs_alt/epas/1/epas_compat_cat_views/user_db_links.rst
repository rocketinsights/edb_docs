.. _user_db_links:

**********************
`USER_DB_LINKS`:index:
**********************

The ``USER_DB_LINKS`` view provides information about all database links
that are owned by the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

======== ================= ==========================================================
Name     Type              Description
db_link  TEXT              The name of the database link.
type     CHARACTER VARYING Type of remote server. Value will be either REDWOOD or EDB
username TEXT              User name of the user logging in.
password TEXT              Password used to authenticate on the remote server.
host     TEXT              Name or IP address of the remote server.
======== ================= ==========================================================
