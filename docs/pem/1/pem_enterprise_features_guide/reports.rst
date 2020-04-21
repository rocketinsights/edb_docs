.. _reports:

****************
`Reports`:index:
****************

You can generate the System Configuration report and Core Usage report for all locally and remotely managed servers. To generate this report, select *Reports* from the *Management* Menu.

Reports has following options:

 * System Configuration Report (JSON)
 * System Configuration Report (HTML)
 * Core Usage Report (JSON)
 * Core Usage Report (HTML)

Please note that only superusers or the users with the pem_admin role permission can download the System Configuration or Core Usage reports.

Also note that information in these reports will reflect the latest probe run time.

.. raw:: latex

    \newpage

System Configuration Report
===========================

The System Configuration Report provides detailed information about the PEM Agents group, PEM Server directory group and custom groups listed under browser tree. These groups can contain Postgres Enterprise Manager, PEM Agents and Database servers. You can download this report in HTML as well as in JSON format.

The *Postgres Enterprise Manager Summary* provides details about:

 * The Postgres Enterprise Manager backend database server version
 * Application version
 * User name accessing the application
 * Python version
 * Flask version
 * Platform specific information

The *Summary* provides information about the number of agents and servers.

.. figure:: images/system_configuration_report_pem_summary_and_summary.png
   :alt: System Configuration Report PEM Summary and Summary
   :align: center

   *System Configuration Report - PEM Summary and Summary*

.. raw:: latex

    \newpage

The *Group: PEM Agents* panel provides details about the PEM agent, CPU cores, Disk Utilization, and Memory information.

.. figure:: images/system_configuration_report_pem_agents.png
   :alt: System Configuration Report PEM Agents
   :align: center

   *System Configuration Report - PEM Agents*

.. raw:: latex

    \newpage

The *Group: PEM Server Directory*, provides details about:

 * Database server version
 * Host
 * Port
 * Database name
 * Database size
 * Tablespace size

.. figure:: images/system_configuration_report_pem_server_directory.png
   :alt: System Configuration Report PEM Server Directory
   :align: center

   *System Configuration Report - Group Server Name*

Please note that here ``Group Server Name`` depends on the group name to which the server is added.

.. raw:: latex

    \newpage

Core Usage Report
=================

The Core Usage report provides detailed information about number of cores specific to:

 * The server type
 * Database version
 * Platform and group name

The report also gives detailed information about locally managed servers:

 * Type
 * Host
 * Port
 * Platform
 * Cores
 * RAM

.. figure:: images/core_usage_report.png
   :alt: Core Usage Report
   :align: center

   *Core Usage Report*
