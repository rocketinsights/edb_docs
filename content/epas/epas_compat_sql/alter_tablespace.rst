.. _alter_tablespace:

*************************
`ALTER TABLESPACE`:index:
*************************

**Name**

``ALTER TABLESPACE --`` change the definition of a tablespace

**Synopsis**

.. code-block:: text 

    ALTER TABLESPACE name RENAME TO newname

**Description**

``ALTER TABLESPACE`` changes the definition of a tablespace.

**Parameters**

``name``

    The name of an existing tablespace.

``newname``

    The new name of the tablespace. The new name cannot begin with ``pg_``, as
    such names are reserved for system tablespaces.

**Examples**

Rename tablespace ``empspace`` to ``employee_space``:

.. code-block:: text

    ALTER TABLESPACE empspace RENAME TO employee_space;

**See Also**


`DROP TABLESPACE <drop_tablespace>_`

