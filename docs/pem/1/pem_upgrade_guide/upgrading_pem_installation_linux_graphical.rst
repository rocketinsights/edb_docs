.. _upgrading_pem_installation_linux_graphical:

********************************************************************************************
`Upgrading PEM that was installed with a graphical installer on a Linux Host`:index:
********************************************************************************************

 The following section walks you through the process of upgrading a PEM installation that was performed via a graphical installer on a Linux host

.. index:: Upgrading PEM server installed with graphical installer

Upgrading a PEM Server that was Installed with a Graphical Installer
====================================================================

Prerequisites:

If you are using a version of Postgres or Advanced Server that is lower than version 10, then before the upgrade you need to install the libs package of version 10 or above on the system where PEM server is Installed. Use the following commands to install the libs version 10 or above:

- For Advanced Server:
   ``yum install edb-as<version>-server-libs``

- For Postgres:
   ``yum install postgresql<version>-libs``

Where, *version* is the Postgres or Advanced Server version whose libs package you want to install.

The default installation location for the PEM server when installed by
the graphical installer is ``/opt/edb/pem``. In the example that follows,
substitute your server installation location for
``<PEM_installation_path>``.

1. Logout from PEM.

2. Stop the PEMHTTPD service on PEM server. In case PEM server and web server are on two different systems, run the command on the web server:

   ``systemctl stop PEMHTTPD``

3. Install the ``epel-release`` package by running any one of the following commands:

-  ``yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm``

-  ``yum install epel-release``

  .. note::

   You may need to enable the ``[extras]`` repository definition in the ``CentOS-Base.repo`` file (located in ``/etc/yum.repos.d``).

4. You must also have credentials that allow access to the EnterpriseDB repository. For information about requesting credentials, visit:

    https://info.enterprisedb.com/rs/069-ALB-339/images/Repository%20Access%2004-09-2019.pdf

5. After receiving your repository credentials you can:

   1.	Create the repository configuration file.

   2.	Modify the file, providing your user name and password.

  **Creating a Repository Configuration File**

  To create the repository configuration file, assume superuser privileges, and invoke the following command:

    ``yum -y install https://yum.enterprisedb.com/edb-repo-rpms/edb-repo-latest.noarch.rpm``

  The repository configuration file is named ``edb.repo``. The file resides in ``/etc/yum.repos.d``.

  **Modifying the file, providing your user name and password**

  After creating the ``edb.repo`` file, use your choice of editor to ensure that the value of the enabled parameter is ``1``, and replace the ``username`` and ``password`` placeholders in the ``baseurl`` specification with the name and password of a registered EnterpriseDB user.

  .. code-block:: text

    [edb]
    name=EnterpriseDB RPMs $releasever - $basearch
    baseurl=https://<username>:<password>@yum.enterprisedb.com/edb/redhat/rhel-$releasever-$basearch
    enabled=1
    gpgcheck=1
    gpgkey=file:///etc/pki/rpm-gpg/ENTERPRISEDB-GPG-KEY


6. Use the ``yum makecache`` command to download the metadata for the currently
   enabled repositories; when the command completes, check the available
   packages to confirm that the list includes the latest PEM server:

   ``yum makecache``

  ``yum list edb-pem``

7. Install the PEM server RPM on PEM server. In case PEM server and web server are on two different systems, run the command on PEM server as well as web server. When the installation completes, use the ``yum info`` command to confirm the installation details:

   ``yum install edb-pem``

   ``yum info edb-pem``

8. After installation, copy the ``agent.cfg`` file from the current location
   (the location required by the graphical installer) to the location
   required by the RPM package:

   ``cp /<PEM_installation_path>/agent/etc/agent.cfg
   /usr/edb/pem/agent/etc/agent.cfg``

9. Open the agent configuration file located at:

   ``/usr/edb/pem/agent/etc/agent.cfg``

   Then, set the value of the ``ca_file`` parameter:

   ``ca_file=/usr/libexec/libcurl-pem/share/certs/ca-bundle.crt``

10. Copy the ``pem.db`` file (and other required files) to the RPM
    installation location and change the file ownership. In case PEM server and web server are on two different systems, run the below commands on the web server:

   ``cp -r /<PEM_installation_path>/server/share/pemhome/.pem/*
   /var/lib/pemhome/.pem/``

   ``chown -R pem:pem /var/lib/pemhome/.pem/``

11. Change the home directory in the ``passwd`` file from the location
    identified by the graphical installer to the RPM location. In case PEM server and web server are on two different systems, run the commands on PEM server as well as web server:

   ``usermod -m -d /var/lib/pemhome pem``

   ``cat /etc/passwd | grep pem``

12. Take a backup of the PEM service file and agent certificates:

   ``cp /usr/lib/systemd/system/pemagent.service
   /usr/lib/systemd/system/pemagent.service_bkp``

   ``mv /root/.pem/agent1.key /root/.pem/agent1.key.bkp``

   ``mv /root/.pem/agent1.crt /root/.pem/agent1.crt.bkp``

13. Uninstall the PEM server using the graphical uninstaller from PEM server and web server machines:

   ``/<PEM_installation_path> /server/uninstall-pemserver``

14. Execute the PEM RPM configuration script on PEM server and web server; when prompted, provide the backing database details: the script should run without generating errors:

   ``/usr/edb/pem/bin/configure-pem-server.sh``

15. Restore the service file backup and agent certificates to original
    location on PEM server.

   ``cp /usr/lib/systemd/system/pemagent.service_bkp
   /usr/lib/systemd/system/pemagent.service``

   ``mv /root/.pem/agent1.crt.bkp /root/.pem/agent1.crt``

   ``mv /root/.pem/agent1.key.bkp /root/.pem/agent1.key``

16. Enable the ``pemagent`` service on PEM server and web server. Start the ``pemagent`` and ``httpd`` services on the web server.

   ``systemctl enable pemagent``

   ``systemctl start pemagent``

   ``systemctl start httpd``

17. Launch the PEM web interface. Check the server and agent to confirm
    the PEM version, server status, and schema version. At this point,
    everything should be up and running. You can now uninstall PEMHTTD service from web server as it is no longer in use.

.. raw:: latex

    \newpage

.. index:: Upgrading PEM agent installed with graphical installer

Upgrading a PEM agent that was Installed with a Graphical Installer
===================================================================

The default installation location for the PEM server when installed by
the graphical installer is ``/opt/edb/pem``. In the example that follows,
substitute your server installation location for
``<PEM_installation_path>``.

1. Use the version specific command to stop the ``pemagent`` service.

  * On a RHEL or CentOS 7.x host:

   ``systemctl stop pemagent``

  * On a RHEL or CentOS 6.x host:

   ``/etc/init.d/pemagent stop (RHEL -6)``

2. Install the supporting ``epel`` packages:

   ``yum install epel-release``

3. Install the EDB repository configuration file:

   ``yum install
   http://yum.enterprisedb.com/edbrepos/edb-repo-latest.noarch.rpm``

4. When the repository configuration file installation completes, modify the ``dependencies`` and ``tools`` repository
definitions, ensuring that the repository definitions are enabled and providing the correct repository credentials. The location of the file is:

   ``/etc/yum.repos.d/edb.repo``

5. The ``yum makecache`` command downloads the metadata for the currently enabled repositories; when the command completes, check the available
packages to confirm that the list includes the latest PEM agent:

   ``yum makecache``

   ``yum list edb-pem-agent``

6. Install the PEM agent RPM; when the installation completes, you can use the ``yum info`` command to confirm installation information for the PEM agent:

   ``yum install edb-pem-agent``

   ``yum info edb-pem-agent``

7. After installation, copy the PEM agent configuration file (``agent.cfg``) from the previous location to the location required by the RPM
installer:

   ``cp /PEM_installation_path/agent/etc/agent.cfg
   /usr/edb/pem/agent/etc/agent.cfg``

8. Open the agent configuration file located at:

   ``/usr/edb/pem/agent/etc/agent.cfg``

   Then, set the value of the ``ca_file`` parameter:

   ``ca_file=/usr/libexec/libcurl-pem/share/certs/ca-bundle.crt``

9. Take a backup of the service file and agent certificates:

- On RHEL or CentOS 7.x, use the following command to back up the service file:

   ``cp /usr/lib/systemd/system/pemagent.service
   /usr/lib/systemd/system/pemagent.service_bkp``

- On RHEL or CentOS 6.x, use the following command to back up the service file:

   ``cp /etc/init.d/pemagent_bkp /etc/init.d/pemagent``

   Then, copy the agent certificates; in the following commands, ``<agent_id>`` should specify the agent identifier (for example, agent2 or agent3):

   ``mv /root/.pem/<agent_id>.key /root/.pem/<agent_id>.key.bkp``

   ``mv /root/.pem/<agent_id>.crt /root/.pem/<agent_id>.crt.bkp``

10. Uninstall the PEM agent using bitrock uninstaller:

   ``/PEM_installation_path/agent/uninstall-pemagent``

11. Use version specific commands to restore the service file backup and
    agent certificates to original location. For example:

  * On a RHEL or CentOS 7.x host:

   ``cp /usr/lib/systemd/system/pemagent.service_bkp
   /usr/lib/systemd/system/pemagent.service``

  * On a RHEL or CentOS 6.x host:

   ``cp /etc/init.d/pemagent /etc/init.d/pemagent_bkp``

   Then, move the agent certificate files; in the following commands, ``<agent_id>`` should specify the agent identifier (for example,
   agent2 or agent3):

   ``mv /root/.pem/<agent_id>.key.bkp /root/.pem/<agent_id>.key``

   ``mv /root/.pem/<agent_id>.crt.bkp /root/.pem/<agent_id>.crt``

12. Enable the pemagent service, and start ``pemagent`` and ``httpd``.

  * On a RHEL or CentOS 7.x host, use the commands:

   ``systemctl enable pemagent``

   ``systemctl start pemagent``

  * On a RHEL or CentOS 6.x host:

   ``/etc/init.d/pemagent start``

At this point, the PEM agent should be up and running; you can use the
PEM web interface to check the agent version and status.

.. note :: If you have already configured or planning to configure any shell/batch script run by a Linux agent that is upgraded from any lower version to version 7.11, you must modify the ``agent.cfg`` file and specify the user for the ``batch_script_user`` parameter. It is strongly recommended that you use a non-root user to run the scripts. Using root user for running a script may result in compromising the data security and operating system security. However, if you want to restore the earlier behavior of pemagent and use root user to run the scripts, then you need to set the value of ``batch_script_user`` parameter as ``root``.

.. raw:: latex

   \newpage

Upgrading SQL Profiler on a Linux host
======================================

To upgrade a SQL Profiler installation on a Linux host:

1. Delete the existing SQL Profiler query set on each node by invoking
   the ``uninstall-sql-profiler.sql`` script.

   By default, if you are using Advanced Server on a Linux host that was
   installed with a graphical installer, the script resides in the
   ``share/contrib`` directory under the Advanced Server installation.

   If you are using a PostgreSQL installation on a Linux host, the
   script resides in the ``share/postgresql/contrib`` directory under the
   PostgreSQL installation.

2. Then, use the following command on each node you wish to profile:
   ``yum install postgresql-<sql_version>-sqlprofiler-<sqlprofiler_version>``

Where, *sql_version* is the version of the postgres and <sqlprofiler_version> is the SQL Profiler version.

 After updating the PEM components, you are ready to update the backing database.

 .. raw:: latex

    \newpage
