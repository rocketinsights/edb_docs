.. _dba_roles:

******************
`DBA_ROLES`:index:
******************

The ``DBA_ROLES`` view provides information on all roles with the ``NOLOGIN``
attribute (groups).

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

================= ==== ============================================================
Name              Type Description
role              TEXT Name of a role having the NOLOGIN attribute – i.e., a group.
password_required TEXT Included for compatibility only; always N.
================= ==== ============================================================
