.. raw:: latex

   \newpage

******************************************************************
`Using StackBuilder Plus to Perform a Minor Version Update`:index:
******************************************************************

The StackBuilder Plus utility provides a graphical interface that
simplifies the process of updating, downloading, and installing modules
that complement your Advanced Server installation. When you install a
module with StackBuilder Plus, StackBuilder Plus automatically resolves
any software dependencies.

.. Note:: StackBuilder Plus is supported only on Windows systems.

You can invoke StackBuilder Plus at any time after the installation has
completed by selecting the ``StackBuilder Plus`` menu option from the ``Apps``
menu. Enter your system password (if prompted), and the StackBuilder
Plus welcome window opens (shown in the following figure).

.. figure:: images/the_stackBuilder_plus_welcome_window.png
   :alt: The StackBuilder Plus welcome window
   :align: center

   *The StackBuilder Plus Welcome Window*

Use the drop-down listbox on the welcome window to select your Advanced
Server installation.

StackBuilder Plus requires Internet access; if your installation of
Advanced Server resides behind a firewall (with restricted Internet
access), StackBuilder Plus can download program installers through a
proxy server. The module provider determines if the module can be
accessed through an HTTP proxy or an FTP proxy; currently, all updates
are transferred via an HTTP proxy and the FTP proxy information is not
used.

If the selected Advanced Server installation has restricted Internet
access, use the ``Proxy Servers`` on the ``Welcome to StackBuilder Plus Window!`` to open the ``Proxy
servers`` dialog (shown in the following figure).

.. figure:: images/the_proxy_servers_dialog.png
   :alt: The Proxy servers dialog
   :align: center

   *The Proxy servers dialog*

Enter the IP address and port number of the proxy server in the ``HTTP
proxy`` on the ``Proxy servers`` dialog. Currently, all StackBuilder Plus
modules are distributed via HTTP proxy (FTP proxy information is
ignored). Click ``OK`` to continue.

.. figure:: images/the_stackBuilder_plus_module_selection_window.png
   :alt: The StackBuilder Plus module selection window
   :align: center

   *The StackBuilder Plus module selection window*

The tree control on the StackBuilder Plus module selection window (shown
in the following figure) displays a node for each module category. To perform an
Advanced Server update, expand the ``Database Server`` module in the tree
control and check the box to the left of the Advanced Server upgraded
version. Then, click ``Next``.

If prompted, enter your email address and password on the StackBuilder
Plus registration window (shown in the following figure).

.. figure:: images/the_stackBuilder_plus_registration_window.png
   :alt: The StackBuilder Plus registration window
   :align: center

   *The StackBuilder Plus registration window*

.. figure:: images/selected_packages_summary_window.png
   :alt: A summary window displays a list of selected packages
   :align: center
 
   *A summary window displays a list of selected packages*

StackBuilder Plus confirms the packages selected. The
``Selected packages`` dialog will display the name and version of the
installer; click ``Next`` to continue.

When the download completes, a window opens that confirms the
installation files have been downloaded and are ready for installation.

.. figure:: images/download_complete_confirmation.png
   :alt: Confirmation that the download process is complete
   :align: center

   *Confirmation that the download process is complete*

You can check the box next to ``Skip Installation``, and select ``Next`` to exit
StackBuilder Plus without installing the downloaded files, or leave the
box unchecked and click ``Next`` to start the installation process.

.. figure:: images/stackBuilder_plus_confirms_the_completed_installation.png
   :alt: StackBuilder Plus confirms the completed installation
   :align: center

   *StackBuilder Plus confirms the completed installation*

When the upgrade is complete, StackBuilder Plus will alert you to the
success or failure of the installation of the requested package. If you were prompted by an installer to restart your
computer, reboot now.

.. Note:: If the update fails to install, StackBuilder Plus will alert you to the installation error with a popup dialog and write a message to the log file at ``%TEMP%``.
