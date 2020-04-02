.. raw:: latex

   \newpage

=========================================
`Invoking the Graphical Installer`:index:
=========================================

To perform an installation using the graphical installation wizard, you
must have superuser or administrator privileges. To start the
installation wizard, assume sufficient privileges and double-click the
installer icon; if prompted, provide a password.

Note that in some versions of Windows, you can invoke the installer with
``Administrator`` privileges by right clicking on the installer icon and
selecting ``Run as Administrator`` from the context menu.

The PostgreSQL setup wizard opens:

.. figure:: images/the_postgresql_setup_wizard_welcome.png
   :alt: The PostgreSQL setup wizard welcome dialog
   :align: center

   *The PostgreSQL setup wizard welcome dialog*

Click ``Next`` to continue. The ``Installation Directory`` window opens.

.. figure:: images/the_installation_directory_dialog.png
   :alt: The Installation Directory dialog
   :align: center

   *The Installation Directory dialog*

Accept the default installation directory, or specify an alternate
location and click ``Next`` to continue.

.. figure:: images/the_select_components_dialog.png
   :alt: The Select Components dialog
   :align: center

   *The Select Components dialog*

Use options on the ``Select Components`` dialog to select which software components will be installed; select:

-  ``PostgreSQL Server`` to install the PostgreSQL database server.

-  ``pgAdmin 4`` is available for PostgreSQL version 12.0.

-  ``Stack Builder`` to install the Stack Builder utility; for more information about the Stack Builder utility, see :ref:`Using Stackbuilder <using_stackbuilder>`.

-  ``Command Line Tools`` to install PostgreSQL tools such as:

    ``psql, pg_isready``, and ``pgbench``

    ``clusterdb, createdb``, and ``dropdb``

    ``createuser`` and ``dropuser``

    ``pg_basebackup, pg_dump, pg_dumpall``, and ``pg_restore``

    ``reindexdb, vacuumdb``, and ``vacuumlo``

    This is not a comprehensive list; the command line tools installed may vary by platform.

Click ``Next`` to continue. The ``Data Directory`` window opens.

.. figure:: images/the_data_directory_dialog.png
   :alt: The Data Directory dialog
   :align: center

   *The Data Directory dialog*

Accept the default location or specify the name of the alternate
directory in which you wish to store the data files, and click ``Next`` to
continue.

.. index:: password

The ``Password`` window opens.

.. figure:: images/the_password_dialog.png
   :alt: The Password dialog
   :align: center

   *The Password dialog*

PostgreSQL uses the password specified on the ``Password`` window for both
the database superuser and the PostgreSQL service account.

PostgreSQL runs as a service in the background; the PostgreSQL service
account is named ``postgres``. If you have already created a service account
with the name ``postgres``, you must specify same password as the existing
password for the ``postgres`` service account.

The specified password must conform to any security policies existing on
the PostgreSQL host. After entering a password in the ``Password`` field,
and confirming the password in the ``Retype Password`` field, click ``Next`` to
continue.

.. figure:: images/the_port_dialog.png
   :alt: The Port dialog
   :align: center

   *The Port dialog*

Use the ``Port`` field to specify the port number on which the server should
listen. The default listener port is ``5432``. Click ``Next`` to continue.

.. figure:: images/the_advanced_options_dialog.png
   :alt: The Advanced Options dialog
   :align: center

   *The Advanced Options dialog*

Use the ``Locale`` field to specify the locale that will be used by the new
database cluster. The ``Default locale`` is the operating system locale. Click ``Next`` to continue.

.. figure:: images/the_preinstallation_summary_dialog.png
   :alt: The Pre Installation Summary dialog
   :align: center

   *The Pre Installation Summary dialog*

The ``Pre Installation Summary`` dialog displays the
installation preferences that you have specified with the installation
wizard. Review the settings; you can use the ``Back`` button to return to a
previous dialog to modify a setting, or click ``Next`` to continue.

.. figure:: images/the_ready_to_install_dialog.png
   :alt: The Ready to Install dialog
   :align: center

   *The Ready to Install dialog*

The wizard will inform you that it has the information required to
install PostgreSQL; click ``Next`` to continue.

.. figure:: images/the_installing_dialog.png
   :alt: The Installing dialog
   :align: center

   *The Installing dialog*

During the installation, the setup wizard confirms the installation
progress of PostgreSQL via a series of progress bars.

.. figure:: images/the_installation_wizard_offers_to_launch_stack_builder.png
   :alt: The installation wizard offers to Launch Stack Builder at exit
   :align: center

   *The installation wizard offers to Launch Stack Builder at
   exit*

Before the setup wizard completes the PostgreSQL installation, it offers
to launch Stack Builder at exit.

The Stack Builder utility provides a graphical interface that downloads
and installs applications and drivers that work with PostgreSQL. You can
optionally uncheck the ``Stack Builder`` box and click ``Finish`` to complete
the PostgreSQL installation or accept the default and proceed to Stack
Builder.
