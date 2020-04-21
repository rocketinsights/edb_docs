.. _uninstalling_pem_agent:

*********************************
`Uninstalling a PEM Agent`:index:
*********************************

Use the uninstaller provided in the PEM installation directory to remove PEM agent from a system. By default, the PEM agent uninstaller is located:

======================= ========================== ============================
Component                PEM agent                  Uninstaller name
======================= ========================== ============================
uninstall-pemagent       Default location            /usr/edb/pem/agent
======================= ========================== ============================

To remove an agent, assume superuser privileges, open a terminal window, and navigate into the directory in which the uninstaller resides; invoke the installer as follows:

   ``./uninstall-<agent_name>``

Where *agent_name* is the name of the agent that you wish to remove.


If the PEM installation resides on a Windows host, you can use the Windows
``Uninstall a Program`` applet to remove PEM components. To open the ``Uninstall a Program`` applet, navigate through the Programs submenu on the Windows ``Control Panel``, selecting ``Programs and Features``. When the ``Uninstall a Program`` window opens, highlight the name of the PEM component that you wish to remove, and click the ``Uninstall/Change`` button. A Windows popup will open, prompting you to confirm that you wish to remove the component; click ``Yes`` to remove the component.
