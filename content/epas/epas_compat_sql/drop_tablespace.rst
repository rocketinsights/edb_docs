.. _drop_tablespace:

************************
`DROP TABLESPACE`:index:
************************

**Name**

``DROP TABLESPACE --`` remove a tablespace

**Synopsis**

.. code-block:: text

    DROP TABLESPACE tablespacename

**Description**

``DROP TABLESPACE`` removes a tablespace from the system.

A tablespace can only be dropped by its owner or a superuser. The
tablespace must be empty of all database objects before it can be
dropped. It is possible that objects in other databases may still reside
in the tablespace even if no objects in the current database are using
the tablespace.

**Parameters**

``tablespacename``

    The name of a tablespace.

**Examples**

To remove tablespace ``employee_space`` from the system:

.. code-block:: text

    DROP TABLESPACE employee_space;

**See Also**

:ref:`ALTER TABLESPACE <alter_tablespace>`
