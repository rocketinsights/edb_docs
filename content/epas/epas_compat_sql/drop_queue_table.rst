.. _drop_queue_table:

*************************
`DROP QUEUE TABLE`:index:
*************************

Advanced Server includes extra syntax (not offered by Oracle) with the
``DROP QUEUE TABLE SQL`` command. This syntax can be used in association
with ``DBMS_AQADM``.

**Name**

``DROP QUEUE TABLE--`` drop a queue table.

**Synopsis**

Use ``DROP QUEUE TABLE`` to delete a queue table:

.. code-block:: text

    DROP QUEUE TABLE [ IF EXISTS ] name [, ...]
    [CASCADE | RESTRICT]

**Description**

``DROP QUEUE TABLE`` allows a superuser or a user with the
``aq_administrator_role`` privilege to delete a queue table.

**Parameters**

``name``

    The name (possibly schema-qualified) of the queue table that will be
    deleted.

``IF EXISTS``

    Include the ``IF EXISTS`` clause to instruct the server to not return an
    error if the queue table does not exist. The server will issue a notice.

``CASCADE``

    Include the ``CASCADE`` keyword to automatically delete any objects that
    depend on the queue table.

``RESTRICT``

    Include the ``RESTRICT`` keyword to instruct the server to refuse to delete
    the queue table if any objects depend on it. This is the default.

**Example**

The following example deletes a queue table named ``work_order_table`` and
any objects that depend on it:

.. code-block:: text

    DROP QUEUE TABLE work_order_table CASCADE;

**See Also**

:ref:`CREATE QUEUE TABLE <create_queue_table>`, :ref:`ALTER QUEUE TABLE <alter_queue_table>`
