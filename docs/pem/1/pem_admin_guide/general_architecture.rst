.. _general_architecture:

.. index::
   PEM; architecture

*****************************
`General Architecture`:index:
*****************************

.. figure:: images/pem_architecture.png
   :alt: The Postgres Enterprise Manager general architecture
   :align: center
   :scale: 45%

   *The Postgres Enterprise Manager general architecture*

PEM is composed of three primary components:

**The PEM Server**

   The PEM server provides the functionality at the core of Postgres
   Enterprise Manager. The server is responsible for:

-  Performing administrative functions.

-  Processing information received from agents.

-  Maintaining information in its repository.


**The PEM Agent**

   The PEM agent is responsible for performing tasks on each managed
   machine and collecting statistics for the database server and
   operating system.


**The PEM Web Interface**

   Distributed with the PEM server, the PEM web interface allows you to
   connect to the server with your choice of browser to manage and
   monitor your Postgres servers.

.. raw:: latex

   \newpage
