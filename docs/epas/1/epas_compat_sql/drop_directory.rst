.. _drop_directory:

***********************
`DROP DIRECTORY`:index:
***********************

**Name**

``DROP DIRECTORY --`` remove a directory alias for a file system directory
path

**Synopsis**

.. code-block:: text

    DROP DIRECTORY name

**Description**

``DROP DIRECTORY`` drops an existing alias for a file system directory path
that was created with the ``CREATE DIRECTORY`` command. To execute this
command you must be a superuser.

When a directory alias is deleted, the corresponding physical file
system directory is not affected. The file system directory must be
deleted using the appropriate operating system commands.

**Parameters**

``name``

    The name of a directory alias to be removed.

**Examples**

Remove the directory alias named ``empdir``:

.. code-block:: text

    DROP DIRECTORY empdir;

**See Also**


`CREATE DIRECTORY <create_directory>`_

