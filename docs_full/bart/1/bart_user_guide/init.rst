.. raw:: latex

    \newpage

.. _init:

.. index:: INIT Subcommand

****
INIT
****

The ``INIT`` subcommand is used to perform the following actions:

-  Create the BART backup catalog directory.

-  Rebuild the BART ``backupinfo`` file.

-  Set the ``archive_command`` in the PostgreSQL server based on the
   ``archive_command`` setting in the ``bart.cfg`` file.

.. note::

  If the ``archive_mode`` configuration parameter is set to ``off``,
  then the ``-o`` option must be used to set the Postgres ``archive_command``
  using the BART ``archive_command`` parameter in the BART configuration file
  even if the ``archive_command`` is not currently set in ``postgresql.conf`` nor
  in ``postgresql.auto.conf`` file.

To view examples of ``INIT`` subcommand, see the *EDB Postgres Backup and
Recovery Reference Guide* available at:

   `<https://www.enterprisedb.com/edb-docs/>`_

**Syntax:**

.. code-block:: text

    bart INIT [ –s { <server_name> | all } ] [ -o ]
      [ -r [ -i { <backup_id> | <backup_name> | all } ] ]
      [--no-configure]


Note that subcommand options are generally specified in lowercase.

**Options**

-  ``-s or --server {<server_name> | all }``

  ``server_name`` is the name of the database server to which the ``INIT``
  actions are to be applied. If ``all`` is specified or if the option is
  omitted, the actions are applied to all servers.

-  ``-o`` or ``–override``

  Overrides the existing, active Postgres ``archive_command``
  configuration parameter setting in the ``postgresql.conf`` file or the
  ``postgresql.auto.conf`` file using the BART ``archive_command`` parameter
  in the BART configuration file. The ``INIT`` generated archive command
  string is written to the ``postgresql.auto.conf`` file.

-  ``-r`` or ``–rebuild``

  Rebuilds the backupinfo file (a text file named ``backupinfo``) located
  in each backup subdirectory.

-  ``-i`` or ``--backupid { <backup_id> | <backup_name> | all }``

  ``<backup_id>`` is an integer, backup identifier and ``<backup_name>`` is
  the user-defined alphanumeric name for the backup. If ``all`` is
  specified or if the option is omitted, the backupinfo files of all
  backups for the database servers specified by the ``-s`` option are
  recreated. The ``-i`` option can only be used with the ``-r`` option.

**Archive Command Setting**

After the ``archive_command`` is set, you need to either restart the
PostgreSQL server or reload the configuration file in the PostgreSQL
server based on the following conditions. See the *EDB Postgres Backup
and Recovery Reference Guide* for examples of each of the following.

-  If the ``archive_mode`` is set to ``off`` and ``archive_command`` is not set in
   the PostgreSQL server, the ``archive_command`` is set based on the
   ``archive_command`` setting in the ``bart.cfg`` and also sets the
   ``archive_mode`` to on. In this case, you need to restart the PostgreSQL
   server using ``pg_ctl restart``

-  If the ``archive_mode`` is set to ``on`` and ``archive_command`` is not set in
   the PostgreSQL server, the ``archive_command`` is set based on the
   ``archive_command`` setting in the ``bart.cfg``. In this case, you need to
   reload the configuration in the PostgreSQL server using
   ``pg_reload_conf()`` or ``pg_ctl reload``.

-  If the ``archive_mode`` is set to off and ``archive_command`` is already
   set in the PostgreSQL server, the ``archive_mode`` is set to on. In this
   case, you need to restart the PostgreSQL server using ``pg_ctl
   restart``

-  If the ``archive_mode`` is set to on and ``archive_command`` is already set
   in the PostgreSQL server, then the ``archive_command`` is not set unless
   ``-o`` option is specified.
