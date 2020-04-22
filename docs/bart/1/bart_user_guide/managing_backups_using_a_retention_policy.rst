
.. raw:: latex

    \newpage

.. _managing_backups_using_a_retention_policy:

**************************************************
`Managing Backups Using a Retention Policy`:index:
**************************************************

Over the course of time when using BART, the number of backups can grow
significantly. This ultimately leads to a large consumption of disk
space unless an administrator periodically performs the process of
deleting the oldest backups that are no longer needed. This process of
determining when a backup is old enough to be deleted and then actually
deleting such backups can be done and automated with the following basic
steps:

1. Determine and set a retention policy in the BART configuration file.
   A *retention policy* is a rule that determines when a backup is
   considered obsolete. The retention policy can be applied globally to
   all servers, but each server can override the global retention policy
   with its own (see the configuration section of the *EDB Postgres
   Backup and Recovery Installation and Upgrade Guide* for details).

2. Use the ``MANAGE`` subcommand to categorize and manage backups according
   to the retention policy.

3. Create a cron job to periodically run the ``MANAGE`` subcommand to
   evaluate the backups and then list and/or delete the obsolete
   backups.

   There is a difference on how retention policy management
   applies to incremental backups as compared to full backups. See 
`Section - Managing Incremental Backups <managing_incremental_backups>`_ for information about how retention policy management applied to

   full backups affects incremental backups.

   The following sections describe how retention policy management
   generally applies to backups, and its specific usage and effect on full
   backups:

-  
`Section - Overview - Managing Backups Using a Retention Policy <overview_managing_backups_using_a_retention_policy>`_ provides an overview of the terminology and types of

   retention policies.

-  
`Section - Marking the Backup Status <marking_the_backup_status>`_ describes the concept of marking the status of

   backups according to the retention policy.

-  
`Section - Setting the Retention Policy <setting_the_retention_policy>`_ describes setting the different types of retention

   policies.

-  
`Section - Managing the Backups Based on the Retention Policy <managing_the_backups_based_on_the_retention_policy>`_ describes the process of managing the backups such as

   marking the backup status, keeping selected backups indefinitely,
   listing obsolete backups, and deleting obsolete backups.

.. toctree::
   :maxdepth: 3

   overview_managing_backups_using_a_retention_policy
   marking_the_backup_status
   setting_the_retention_policy
   managing_the_backups_based_on_the_retention_policy
   managing_incremental_backups
