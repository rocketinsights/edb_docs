.. _drop_trigger:

*********************
`DROP TRIGGER`:index:
*********************

**Name**

``DROP TRIGGER --`` remove a trigger

**Synopsis**

.. code-block:: text

    DROP TRIGGER name

**Description**

``DROP TRIGGER`` removes a trigger from its associated table. The command
must be run by a superuser or the owner of the table on which the
trigger is defined.

**Parameters**

``name``

    The name of a trigger to remove.

**Examples**

Remove a trigger named ``emp_salary_trig``:

.. code-block:: text

    DROP TRIGGER emp_salary_trig;

**See Also**


`CREATE TRIGGER <create_trigger>`_

