.. _upgrading_pem_installation_windows:


*****************************************************
`Upgrading a PEM Installation on Windows host`:index:
*****************************************************

To upgrade PEM component software on Windows hosts, simply invoke a newer version of the PEM component installers in the following order:

1. Invoke the PEM agent installer on each monitored node *except* the
   PEM server node.

2. Invoke the PEM server installer; this installer will upgrade *both*
   the PEM server and the PEM agent that resides on the PEM server node.

During an installation, the component installer will automatically detect an existing installation, and perform an upgrade. After upgrading the PEM agent and server, you should upgrade SQL Profiler; this step is platform-specific.

The following sections will walk you through the upgrade process on a Windows host, step-by-step.

.. raw:: latex

   \newpage

Upgrading a PEM Agent on Windows host
-------------------------------------

To upgrade a system that is currently monitored by a PEM agent to a more-recent version of PEM agent, simply download and invoke a newer version of the platform-specific PEM agent installer on the system that the agent is monitoring.

You can invoke the installer by right-clicking on the downloaded installer's icon, and selecting ``Run as Administrator``. The ``PEM Agent Setup Wizard`` opens, welcoming you.

.. figure:: images/pem_upgrade_agent_welcome.png
    :alt: The PEM Agent installer welcome window
    :align: center
    :scale: 60%

    *The PEM Agent installer welcome window*

.. raw:: latex

   \newpage

Read and accept the ``License Agreement`` before clicking ``Next`` to continue.

.. figure:: images/pem_upgrade_agent_license.png
    :alt: The PEM license agreement
    :align: center
    :scale: 60%

    *The PEM license agreement*

.. raw:: latex

   \newpage

The setup wizard will automatically detect an existing agent, and upgrade the installed version. Click ``Next`` to continue.

.. figure:: images/pem_upgrade_agent_existing_installation.png
    :alt: The installer detects an existing installation
    :align: center
    :scale: 60%


    *The installer detects an existing installation*

.. raw:: latex

   \newpage

When the ``Ready to Install`` dialog informs you that the installation is about to begin, click ``Next`` to continue.

.. figure:: images/pem_upgrade_agent_ready_install.png
    :alt: The PEM Agent will perform the upgrade
    :align: center
    :scale: 60%

    *The PEM Agent will perform the upgrade*

.. raw:: latex

   \newpage

The setup wizard displays progress bars to inform you of each component that is being installed.

.. figure:: images/pem_upgrade_agent_installing.png
    :alt: Progress bars chart the installation process
    :align: center
    :scale: 60%

    *The PEM Agent will perform the upgrade*

.. raw:: latex

   \newpage

The ``PEM Agent Setup Wizard`` will inform you when the installation completes. Click ``Finish`` to exit the wizard and close the window.

.. figure:: images/pem_upgrade_agent_finish.png
    :alt: The PEM Agent Setup Wizard has finished the update.
    :align: center
    :scale: 60%

    *The PEM Agent Setup Wizard has finished the update*

.. raw:: latex

   \newpage

.. note :: If you have already configured or planning to configure any shell/batch script run by a Windows agent that is upgraded from any lower version to version 7.11, you must set the ``AllowBatchJobSteps`` parameter as ``True`` in the ``agent.cfg`` file. By default pemagent will not execute any batch/shell script.



Upgrading the PEM Server on a Windows host
------------------------------------------

The PEM server installer facilitates upgrading directly between major versions of the PEM server (for example, you can upgrade directly from version 5.0 to version 7.5 without first upgrading to version 6.0).

You can invoke the installer by right-clicking on the downloaded installer's icon, and selecting ``Run as Administrator``.

.. figure:: images/pem_upgrade_server_welcome.png
    :alt: The PEM Server Setup Wizard
    :align: center
    :scale: 60%

    *The PEM Server Setup Wizard*

The ``PEM Server Setup Wizard`` welcomes you, as shown in the image. Click ``Next`` to continue to the ``License Agreement``.

.. raw:: latex

   \newpage

The ``PEM server setup wizard`` will prompt you to accept the ``License Agreement``. After reviewing the license agreement,
check the radio button next to ``I accept the agreement``, and click ``Next`` to continue to the ``Existing installation dialog``.

.. figure:: images/pem_upgrade_server_license.png
    :alt: Accept the License Agreement to continue
    :align: center
    :scale: 60%

    *Accept the License Agreement to continue*

.. raw:: latex

   \newpage

The wizard will check the PEM server host for an existing PEM server installation; if the wizard locates an installation, it will perform an
upgrade. Click ``Next`` to continue.

.. figure:: images/pem_upgrade_server_existing_installation.png
    :alt: The PEM server installer detects an existing PEM server Installation
    :align: center
    :scale: 60%

    *The PEM server installer detects an existing PEM server Installation*

.. raw:: latex

   \newpage

Before upgrading the PEM server, the wizard will confirm that the requirements of the new PEM server are present. If any supporting components are missing, or are a version that will not support the new PEM installation, the PEM installation wizard will inform you that it must upgrade the dependencies, and will invoke the required installers.

.. figure:: images/pem_upgrade_server_dependency_missing.png
    :alt: The installation requires dependency upgrades
    :align: center
    :scale: 60%

    *The installation requires dependency upgrades*

When the installation wizards complete the dependency upgrades, focus will return to the PEM server setup wizard.

.. raw:: latex

   \newpage



The wizard then opens the ``Database Server Installation Details`` dialog, prompting you for connection credentials for database superuser of the PEM backing database. Provide:

-  The name of the database superuser in the ``User`` field.

-  The password associated with the database superuser in the ``Password``
   field.

Click ``Next`` to continue.

.. figure:: images/pem_upgrade_server_DB_installation.png
    :alt: Provide connection information for the backing database
    :align: center
    :scale: 60%

    *Provide connection information for the backing database*

.. raw:: latex

   \newpage


The ``pemAgent service account`` dialog may prompt you for the password of the account under which the PEM agent service runs.

.. figure:: images/pem_upgrade_server_pemAgent_service_account.png
    :alt: pemAgent Service Account Password
    :align: center
    :scale: 60%

    *pemAgent Service Account password*

If prompted, provide the password, and click ``Next`` to continue.

.. figure:: images/pem_upgrade_server_ready_install.png
    :alt: The PEM Setup Wizard is ready to install the PEM server
    :align: center
    :scale: 60%

    *The PEM Setup Wizard is ready to install the PEM server*

.. raw:: latex

   \newpage

The ``Ready to Install`` dialog will inform you that the setup wizard is ready to perform the installation. Click ``Next`` to start the installation.

During the installation, progress bars will keep you informed of the progress of the update.

.. figure:: images/pem_upgrade_server_installing.png
    :alt: The PEM Server installation in progress
    :align: center
    :scale: 60%

    *The PEM Server installation in progress*

.. raw:: latex

   \newpage


After updating the PEM server (and the agent that resides on the same host as the PEM server) and configuring the webservice, the PEM setup wizard notifies you of the port on which the service is listening. Use this port number when connecting to the PEM Server with the PEM client.

.. figure:: images/pem_upgrade_server_webservice_configure.png
    :alt: The setup wizard configures the PEM webservice
    :align: center
    :scale: 60%

    *The setup wizard configures the PEM webservice*


.. raw:: latex

   \newpage

Click ``OK`` to close the ``Info`` popup. The PEM server setup wizard informs you that the installation is complete.

.. figure:: images/pem_upgrade_server_finish.png
    :alt: The PEM Server upgrade is complete
    :align: center
    :scale: 60%

    *The PEM Server upgrade is complete*

If you have installed the PEM backend database server and PEM-HTTPD on different hosts, then you must run the PEM server installer twice – once on each host. Extract the language pack installer, and install it on the host of PEM-HTTPD before invoking the PEM installer. Include the following keywords when invoking the installer to extract the language pack:

    ``--extract-languagepack <path>``

Where ``<path>`` specifies an existing path for extracting the language pack installer.

.. Note:: By default EDB Languagepack is installed in ``C:\edb\languagepack\v1``.

If you are upgrading the PEM Server via StackBuilder Plus then you might face the error shown below; after displaying the error, PEM will say that installation is completed. Please note that the installation is not done and you will need to do the installation by invoking the installer file from the location where it is downloaded.

.. figure:: images/pem_upgrade_server_error.png
    :alt: The PEM Server upgrade error
    :align: center
    :scale: 60%

    *The PEM Server upgrade error*

After upgrading the PEM server, you may wish to upgrade the backing database to a more recent version; for information about upgrading the
backing database, see 
`Upgrading the backing database <upgrading_backing_database>`_.


.. raw:: latex

   \newpage

Upgrading SQL Profiler on Windows host
--------------------------------------

If you are using SQL Profiler on a Windows host, Windows will lock any files that have been executed or loaded into memory. To release any locked files, you must stop the Postgres server before performing an upgrade.

On Windows, you can use the ``Services`` dialog to control the service. To open the ``Services`` dialog, navigate through the ``Control Panel`` to the
``System and Security menu``. Select ``Administrative Tools``, and then double-click the ``Services`` icon. When the ``Services`` dialog opens,
highlight the service name in the list, and use the option provided on the dialog to ``Stop`` the service.

After stopping the Postgres Server:

1. Delete the existing SQL Profiler query set on each node by invoking the ``uninstall-sql-profiler.sql`` script.

   By default, the script resides in the ``share\contrib`` directory under your Advanced Server or PostgreSQL installation.

2. Invoke the new SQL Profiler installer on each node you wish to profile.

Then, restart the Postgres Server, to resume profiling the node from a PEM client. After updating the PEM components, you are ready to update the backing database.

.. raw:: latex

   \newpage
