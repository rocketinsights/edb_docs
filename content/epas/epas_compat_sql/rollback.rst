.. _rollback:

*****************
`ROLLBACK`:index:
*****************

**Name**

``ROLLBACK --`` abort the current transaction

**Synopsis**

.. code-block:: text

    ROLLBACK [ WORK ]

**Description**

``ROLLBACK`` rolls back the current transaction and causes all the updates
made by the transaction to be discarded.

**Parameters**

``WORK``

    Optional key word - has no effect.

**Notes**

Use ``COMMIT`` to successfully terminate a transaction.

Issuing ``ROLLBACK`` when not inside a transaction does no harm.

Please note: Executing a ``ROLLBACK`` in a plpgsql procedure will throw an
error if there is an Oracle-style SPL procedure on the runtime stack.

**Examples**

To abort all changes:

.. code-block:: text

    ROLLBACK;

**See Also**

:ref:`COMMIT <commit>`, :ref:`ROLLBACK TO SAVEPOINT <rollback_to_savepoint>`, :ref:`SAVEPOINT <savepoint>`
