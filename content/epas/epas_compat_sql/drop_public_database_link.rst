.. _drop_public_database_link:

***************************
`DROP DATABASE LINK`:index:
***************************

**Name**

``DROP DATABASE LINK --`` remove a database link

**Synopsis**

.. code-block:: text

    DROP [ PUBLIC ] DATABASE LINK name

**Description**

``DROP DATABASE LINK`` drops existing database links. To execute this
command you must be a superuser or the owner of the database link.

**Parameters**

``name``

    The name of a database link to be removed.

``PUBLIC``

    Indicates that *name* is a public database link.

**Examples**

Remove the public database link named, ``oralink``:

.. code-block:: text

    DROP PUBLIC DATABASE LINK oralink;

Remove the private database link named, ``edblink``:

.. code-block:: text

    DROP DATABASE LINK edblink;

**See Also**


`CREATE PUBLIC DATABASE LINK <create_public_database_link>_`

