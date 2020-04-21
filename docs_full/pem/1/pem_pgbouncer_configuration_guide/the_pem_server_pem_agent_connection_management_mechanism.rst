.. _the_pem_server_pem_agent_connection_management_mechanism:

*******************************************************************
`The PEM Server - PEM Agent Connection Management Mechanism`:index:
*******************************************************************

Each PEM agent connects to the PEM database server using the SSL
certificates for each individual user. For example, an agent with ``ID#1``
connects to the PEM database server using the ``agent1`` user.

.. figure:: images/pem_database_without_pgbouncer.png
     :alt: Connecting to the PEM database without pgBouncer
     :align: center
     :scale: 50%

     *Connecting to the PEM database without pgBouncer*

Prior to PEM version 7.5, the following limitations did not allow use of
the connection pooler between the PEM server and PEM agent:

-  The PEM agent uses an SSL Certificate to connect the PEM database
   server.

-  It uses an individual user identifier when connecting to the PEM
   database server.

EnterpriseDB has modified the PEM agent to allow the agent to use a
common database user (instead of the dedicated agent users) to connect
the PEM database server.

.. figure:: images/pem_database_with_pgbouncer.png
     :alt: Connecting to the PEM database with pgBouncer
     :align: center
     :scale: 50%

     *Connecting to pgBouncer.*

We recommend using PgBouncer versions equal to or later than version
1.9.0 as the connection pooler. Since versions 1.9.0 or later support
``cert`` authentication; PEM Agents can connect to pgBouncer using SSL
certificates.
