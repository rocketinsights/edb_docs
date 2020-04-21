.. _managing_the_backups_based_on_the_retention_policy:

***********************************************************
`Managing the Backups Based on the Retention Policy`:index:
***********************************************************

The ``MANAGE`` subcommand is used to evaluate and categorize backups
according to the retention policy set in the BART configuration file.
When a backup is first created with the ``BACKUP`` subcommand, it is always
marked as active. By using the ``MANAGE`` subcommand, an active backup may
be marked as obsolete. Obsolete backups can then be deleted.

This section covers following aspects of backup management:

-  The rules for 
`deleting backups <deletions_permitted_under_retention_policy>`_ depending upon the backup status and the subcommand used.


-  The process to retain a backup indefinitely by 
`marking it as keep <marking_backups_for_indefinite_keep_status>`_. This section also provides information about

   resetting backups status (that are marked as ``obsolete`` and ``keep``) back to active status.

-  The general process for 
`evaluating, marking, and then deleting obsolete backups <evaluating_marking_and_deleting_obsolete_backups>`_.



.. _deletions_permitted_under_retention_policy:

Deletions Permitted Under a Retention Policy
============================================

.. index:: Deletions permitted under retention policy

This section describes how and under what conditions backups may be deleted under a retention policy.

You must use the ``MANAGE`` subcommand to delete obsolete backups. Use the ``DELETE`` subcommand only for special administrative purposes.

The deletion behavior of the ``MANAGE`` subcommand and the ``DELETE`` subcommand
are based on different aspects of the retention policy.

-  The ``MANAGE`` subcommand deletion relies solely upon how a backup status
   is currently marked (that is, internally recorded by BART). The
   current setting of the ``retention_policy`` parameter in the BART
   configuration file is ignored.

-  The ``DELETE`` subcommand relies solely upon the current setting of the
   ``retention_policy`` parameter in the BART configuration file. The
   current active, obsolete, or keep status of a backup is ignored.

The specific deletion rules for the ``MANAGE`` and ``DELETE`` subcommands are as
follows:

-  ``MANAGE`` subcommand: The ``MANAGE`` subcommand with the ``-d`` option can only
   delete backups marked as obsolete. This deletion occurs regardless of
   the current ``retention_policy`` setting in the BART configuration file.
   The deletion of backups relies on the last occasion when the backups
   have been marked.

-  ``DELETE`` subcommand:

   - Under a redundancy retention policy currently set with the
     ``retention_policy`` parameter in the BART configuration file, any
     backup regardless of its marked status, can be deleted with the
     ``DELETE`` subcommand when the backup identifier or name is specified
     with the ``-i`` option and if the current total number of backups for
     the specified database server is greater than the maximum number
     of redundancy backups currently specified with the
     ``retention_policy`` parameter.

     If the total number of backups is less than or equal to the
     specified, maximum number of redundancy backups, then no additional
     backups can be deleted using ``DELETE`` with the ``-i backup`` option.

   - Under a recovery window retention policy currently set with the
     ``retention_policy`` parameter in the BART configuration file, any
     backup regardless of its marked status, can be deleted with the
     ``DELETE`` subcommand when the backup identifier or name is specified
     with the ``-i`` option, and if the backup date/time is not within the
     recovery window currently specified with the ``retention_policy``
     parameter. If the backup date/time is within the recovery window,
     then it cannot be deleted using ``DELETE`` with the ``-i backup`` option.

   - Invoking the ``DELETE`` subcommand with the ``-i all`` option results in the
     deletion of all backups regardless of the retention policy and
     regardless of whether the status is marked as active, obsolete, or
     keep.

The following table summarizes the deletion rules of backups according
to their marked status. An entry of ``Yes`` indicates the backup may be
deleted under the specified circumstances. An entry of ``No`` indicates
that the backup may not be deleted.

Table 3‑1 Allowable Backup Deletion by Status

+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+
| Operation            | Redundancy Retention Policy                                                                       | Recovery Window Retention Policy                                                        |
+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+
|                      | Active                        | Obsolete                           | Keep                         | Active                     | Obsolete                      | Keep                       |
+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+
| MANAGE –d            | No                            | Yes                                | No                           | No                         | Yes                           | No                         |
+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+
| DELETE –i *backup*   | Yes                           | Yes                                | Yes                          | Yes                        | Yes                           | Yes                        |
|                      |                               |                                    |                              |                            |                               |                            |
|                      | (see 
`Note1 <note1>`_)    | (see 
+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+
| DELETE –i all        | Yes                           | Yes                                | Yes                          | Yes                        | Yes                           | Yes                        |
+----------------------+-------------------------------+------------------------------------+------------------------------+----------------------------+-------------------------------+----------------------------+

.. _note1:
.. note::

   Redundancy Retention Policy (Note1) : Deletion occurs only if the total number of backups for the
   specified database server is greater than the specified, maximum number
   of redundancy backups currently set with the ``redundancy_policy``
   parameter in the BART configuration file.

.. _note2:
.. note::

    Recovery Window Retention Policy (Note2): Deletion occurs only if the backup is not within the
    recovery window currently set with the ``redundancy_policy`` parameter in
    the BART configuration file.

.. _marking_backups_for_indefinite_keep_status:

Marking Backups for Indefinite Keep Status
==========================================

.. index:: Marking backups for indefinite keep status

There may be certain backups that you wish to keep for an indefinite
period of time and do not wish to delete based upon the retention policy
applied to the database server. Such backups can be marked as ``keep`` to
exclude them from being marked as obsolete. Use the ``MANAGE`` subcommand with the ``-c`` keep option to retain such backups
indefinitely.

.. _evaluating_marking_and_deleting_obsolete_backups:

Evaluating, Marking, and Deleting Obsolete Backups
==================================================

.. index:: Evaluating obsolete backups
.. index:: Marking obsolete backups
.. index:: Deleting obsolete backups

When the ``MANAGE`` subcommand is invoked, BART evaluates active backups:

-  If you include the ``-s`` option when invoking the ``MANAGE`` subcommand, BART evaluates backups for the database server.

-  If you include the ``-s all`` option when invoking the ``MANAGE`` subcommand, BART evaluates backups for all database servers.

-  If the ``-s`` option is omitted, the command evaluates the current number of backups for the database server based on the redundancy retention policy or the current date/time for a recovery window retention policy.

.. note::

   The status of backups currently marked as ``obsolete`` or ``keep`` is not changed. To re-evaluate such backups and then classify them, their status must first be reset to ``active`` with the ``MANAGE -c nokeep`` option. See 
`Marking the Backup Status <marking_the_backup_status>`_ for more information.


See the *EDB Postgres Backup and Recovery Reference Guide* to view an example of how to evaluate, mark, and delete backups using redundancy retention policy and recovery window retention policy, as well as view examples of ``MANAGE`` subcommand.
