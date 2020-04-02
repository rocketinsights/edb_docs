.. _all_db_links:

*********************
`ALL_DB_LINKS`:index:
*********************

The ``ALL_DB_LINKS`` view provides information about the database links
accessible by the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

======== ================= ==========================================================
Name     Type              Description
Owner    TEXT              User name of the database link’s owner.
db_link  TEXT              The name of the database link.
Type     CHARACTER VARYING Type of remote server. Value will be either REDWOOD or EDB
username TEXT              User name of the user logging in.
Host     TEXT              Name or IP address of the remote server.
======== ================= ==========================================================
