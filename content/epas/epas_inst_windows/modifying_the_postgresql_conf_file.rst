.. _modifying_the_postgresql_conf_file:

*******************************************
`Modifying the postgresql.conf File`:index:
*******************************************

Configuration parameters in the ``postgresql.conf`` file specify server behavior with regards to auditing, authentication, encryption, and other behaviors. The ``postgresql.conf`` file resides in the ``data`` directory under
your Advanced Server installation.

.. figure:: images/postgresql_conf_file.png
    :alt: The postgresql.conf file
    :align: center

    *The postgresql.conf file*

Parameters that are preceded by a pound sign (#) are set to their default value (as shown in the parameter setting). To change a parameter value, remove the pound sign and enter a new value. After setting or changing a parameter, you must either *reload* or *restart* the server for the new parameter value to take effect.

Within the ``postgresql.conf`` file, some parameters contain comments that
indicate ``change requires restart``. To view a list of the
parameters that require a server restart, execute the following query at the psql command line:

    ``SELECT name FROM pg_settings WHERE context = 'postmaster';``
