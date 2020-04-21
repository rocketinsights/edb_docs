.. _drop_sequence:

**********************
`DROP SEQUENCE`:index:
**********************

**Name**

``DROP SEQUENCE --`` remove a sequence

**Synopsis**

.. code-block:: text

    DROP SEQUENCE name [, ...]

**Description**

``DROP SEQUENCE`` removes sequence number generators. To execute this
command you must be a superuser or the owner of the sequence.

**Parameters**

``name``

    The name (optionally schema-qualified) of a sequence.

**Examples**

To remove the sequence, ``serial``:

.. code-block:: text

    DROP SEQUENCE serial;

**See Also**


`ALTER SEQUENCE <alter_sequence>`_, 
