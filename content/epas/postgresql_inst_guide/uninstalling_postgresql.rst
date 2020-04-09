********************************
`Uninstalling PostgreSQL`:index:
********************************

The PostgreSQL installer creates an uninstaller in the PostgreSQL
installation directory.

====================================================
`Uninstalling PostgreSQL on a Windows System`:index:
====================================================

You can use the graphical interface provided by Windows to uninstall
PostgreSQL. Navigate through the Windows ``Control Panel`` to open the
Windows ``Uninstall or change a program`` dialog.

.. figure:: images/the_uninstall_or_change_a_program_dialog.png
   :alt: The Uninstall or change a program dialog
   :align: center

   *The Uninstall or change a program dialog*

Right click on ``PostgreSQL 12``, and select ``Uninstall/Change`` from the
context menu.

.. figure:: images/uninstalling_postgreSQL_comfirmation.png
   :alt: Confirm that you wish to uninstall PostgreSQL
   :align: center

   *Confirm that you wish to uninstall PostgreSQL*

If you wish to remove the ``Entire application``, click ``Next`` to continue. If
you choose to remove ``Individual components``, a selection screen opens,
allowing you to select which components you wish to uninstall.

.. figure:: images/select_the_components_to_uninstall.png
   :alt: Select the components to uninstall
   :align: center

   *Select the components to uninstall*

Select the components you wish to uninstall, and click ``Next`` to start
uninstalling components.

.. figure:: images/uninstalling_postgreSQL.png
   :alt: Uninstalling PostgreSQL
   :align: center

   *Uninstalling PostgreSQL*

A progress bar will keep you informed as PostgreSQL is removed.

.. figure:: images/uninstallation_confirmation.png
   :alt: An Info dialog confirms the uninstallation
   :align: center

   *An Info dialog confirms the uninstallation*

When the uninstaller completes, an ``Info`` dialog opens to confirm. Click ``OK`` to exit.

================================================
`Uninstalling PostgreSQL on a Mac System`:index:
================================================

To uninstall PostgreSQL on a Mac system, assume the identity of an
operating system superuser, and navigate into the folder in which the
uninstaller resides:

    ``/Library/PostgreSQL/12``

Then, invoke the uninstaller with the command:

    ``open uninstall-postgres.app``

If prompted, provide a password that allows the uninstaller to make
changes to your system. The uninstaller will open, asking you if you
wish to uninstall the ``Entire application`` or ``Individual components``.

.. figure:: images/remove_the_entire_application_or_components.png
   :alt: Remove the entire application or components
   :align: center

   *Remove the entire application or components*

If you wish to remove the ``Entire application``, click ``Next`` to continue. If
you choose to remove ``Individual components``, a selection screen opens,
allowing you to select which components you wish to uninstall.

.. figure:: images/selecting_the_components_to_uninstall.png
   :alt: Selecting the components to uninstall
   :align: center

   *Selecting the components to uninstall*

Select the components you wish to uninstall, and click
``Next`` to start uninstalling components. Progress bars are displayed as
each component is removed; an ``Info`` popup informs you when the
uninstallation is complete.

.. figure:: images/uninstallation_completed.png
   :alt: The Uninstallation is completed
   :align: center

   *The Uninstallation is completed*

Click ``OK`` to exit the uninstaller.
