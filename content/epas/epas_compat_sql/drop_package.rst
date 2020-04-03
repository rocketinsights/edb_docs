.. _drop_package:

*********************
`DROP PACKAGE`:index:
*********************

**Name**

``DROP PACKAGE --`` remove a package

**Synopsis**

.. code-block:: text

    DROP PACKAGE [ BODY ] name

**Description**

``DROP PACKAGE`` drops an existing package. To execute this command you must
be a superuser or the owner of the package. If ``BODY`` is specified, only
the package body is removed – the package specification is not dropped.
If ``BODY`` is omitted, both the package specification and body are removed.

**Parameters**

``name``

    The name (optionally schema-qualified) of a package to remove.

**Examples**

This command will remove the ``emp_admin`` package:

.. code-block:: text

    DROP PACKAGE emp_admin;

**See Also**


`CREATE PACKAGE <create_package>_`, 
