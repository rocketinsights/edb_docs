.. _dba_role_privs:

***********************
`DBA_ROLE_PRIVS`:index:
***********************

The ``DBA_ROLE_PRIVS`` view provides information on all roles that have been
granted to users. A row is created for each role to which a user has
been granted.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

============ ==== ================================================================
Name         Type Description
grantee      TEXT User name to whom the role was granted.
granted_role TEXT Name of the role granted to the grantee.
admin_option TEXT YES if the role was granted with the admin option, NO otherwise.
default_role TEXT YES if the role is enabled when the grantee creates a session.
============ ==== ================================================================
