The PEM Query Tool
==================
.. index:: PEM Query Tool

PEM contains a feature-rich Interactive Development Environment (IDE)
that allows you to issue ad-hoc SQL queries against Postgres servers.

You can access the Query Tool via the *Query Tool* menu option on the *Tools* menu, or through the
context menu of select nodes of the Browser tree control.  The Query Tool allows you to:

* Issue ad-hoc SQL queries.
* Execute arbitrary SQL commands.
* Edit the result set of a SELECT query if it is
  
`updatable <updatable-result-set>`_.

* Displays current connection and transaction status as configured by the user.
* Save the data displayed in the output panel to a CSV file.
* Review the execution plan of a SQL statement in either a text, a graphical
  format or a table format (similar to https://explain.depesz.com).
* View analytical information about a SQL statement.


.. figure:: images/query_tool.png
    :alt: Query tool window
    :align: center

    *The PEM Query Tool*

You can open multiple copies of the Query tool in individual tabs
simultaneously.  To close a copy of the Query tool, click the *X* in the
upper-right hand corner of the tab bar.

The Query Tool features two panels:

* The upper panel displays the *SQL Editor*. You can use the panel to enter,
  edit, or execute a query. It also shows the *History* tab which can be used
  to view the queries that have been executed in the session, and a *Scratch Pad*
  which can be used to hold text snippets during editing. If the Scratch Pad is
  closed, it can be re-opened (or additional ones opened) by right-clicking in
  the SQL Editor and other panels and adding a new panel.
* The lower panel displays the *Data Output* panel. The tabbed panel displays
  the result set returned by a query, information about a query's execution plan,
  server messages related to the query's execution and any asynchronous
  notifications received from the server.

**The Query Tool Toolbar**

The *Query Tool* toolbar uses context-sensitive icons that provide shortcuts to
frequently performed tasks. If an icon is highlighted, the option is enabled;
if the icon is grayed-out, the task is disabled.

.. figure:: images/query_toolbar.png
    :alt: Query tool toolbar
    :align: center

    *The Query Tool Toolbar*

Hover over an icon to display a tool-tip that describes the icon's functionality:

.. table::
   :class: longtable
   :widths: 1 4 1

   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | Icon                 | Behavior                                                                                          | Shortcut       |
   +======================+===================================================================================================+================+
   | *Open File*          | Click the *Open File* icon to display a previously saved query in the SQL Editor.                 | Accesskey + O  |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Save*               | Click the *Save* icon to perform a quick-save of a previously saved query, or to access the       | Accesskey + S  |
   |                      | *Save* menu:                                                                                      |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Save* to save the selected content of the SQL Editor panel in a  file.                 |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Save As* to open a new browser dialog and specify a new location to which to save the  |                |
   |                      |    selected content of the SQL Editor panel.                                                      |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Save Data Changes*  | Click the *Save Data Changes* icon to save the data changes (insert, update, or delete) in the    |                |
   |                      | Data Output Panel to the server.                                                                  | F6             |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Find*               | Use the *Find* menu to search, replace, or navigate the code displayed in the SQL Editor:         |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Find* to provide a search target, and search the SQL Editor contents.                  | Cmd+F          |
   |                      |                                                                                                   |                |
   |                      |  * Select *Find next* to locate the next occurrence of the search target.                         | Cmd+G          |
   |                      |                                                                                                   |                |
   |                      |  * Select *Find previous* to move to the last occurrence of the search target.                    | Cmd+Shift+G    |
   |                      |                                                                                                   |                |
   |                      |  * Select *Pesistent find* to identify all occurrences of the search target within the editor.    |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Replace* to locate and replace (with prompting) individual occurrences of the target.  | Cmd+Shift+F    |
   |                      |                                                                                                   |                |
   |                      |  * Select *Replace all* to locate and replace all occurrences of the target within the editor.    |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Jump* to navigate to the next occurrence of the search target.                         | Alt+G          |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Copy*               | Click the *Copy* icon to copy the content that is currently highlighted in the Data Output panel. | Accesskey + C  |
   |                      | when in View/Edit data mode.                                                                      |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Paste*              | Click the *Paste* icon to paste a previously row into a new row when in View/Edit data mode.      | Accesskey + P  |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Delete*             | Click the *Delete* icon to mark the selected rows for deletion. These marked rows get deleted     | Accesskey + D  |
   |                      | when you click the *Save Data Changes* icon.                                                      |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Edit*               | Use options on the *Edit* menu to access text editing tools; the options operate on the text      |                |
   |                      | displayed in the SQL Editor panel when in Query Tool mode:                                        |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Indent Selection* to indent the currently selected text.                               | Tab            |
   |                      |                                                                                                   |                |
   |                      |  * Select *Unindent Selection* to remove indentation from the currently selected text.            | Shift+Tab      |
   |                      |                                                                                                   |                |
   |                      |  * Select *Inline Comment Selection* to enclose any lines that contain the selection in           | Cmd+/          |
   |                      |    SQL style comment notation.                                                                    |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Inline Uncomment Selection* to remove SQL style comment notation from the              | Cmd+.          |
   |                      |    selected line.                                                                                 |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Block Comment* to enclose all lines that contain the selection in C style              | Shift+Cmd+/    |
   |                      |    comment notation.  This option acts as a toggle.                                               |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Filter*             | Click the *Filter* icon to set filtering and sorting criteria for the data when in View/Edit data | Accesskey + F  |
   |                      | mode. Click the down arrow to access other filtering and sorting options:                         |                |
   |                      |                                                                                                   |                |
   |                      |  * Click *Sort/Filter* to open the sorting and filtering dialogue.                                |                |
   |                      |                                                                                                   |                |
   |                      |  * Click *Filter by Selection* to show only the rows containing the values in the selected cells. |                |
   |                      |                                                                                                   |                |
   |                      |  * Click *Exclude by Selection* to show only the rows that do not contain the values in the       |                |
   |                      |    selected cells.                                                                                |                |
   |                      |                                                                                                   |                |
   |                      |  * Click *Remove Sort/Filter* to remove any previously selected sort or filtering options.        |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | Limit Selector       | Select a value in the *Limit Selector* to limit the size of the dataset to a number of rows.      | Accesskey + R  |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Stop*               | Click the *Stop* icon to cancel the execution of the currently running query.                     | Accesskey + Q  |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Execute/Refresh*    | Click the *Execute/Refresh* icon to either execute or refresh the query highlighted in the SQL    | F5             |
   |                      | editor panel. Click the down arrow to access other execution options:                             |                |
   |                      |                                                                                                   |                |
   |                      |  * Add a check next to *Auto-Rollback* to instruct the server to automatically roll back a        |                |
   |                      |    transaction if an error occurs during the transaction.                                         |                |
   |                      |                                                                                                   |                |
   |                      |  * Add a check next to *Auto-Commit* to instruct the server to automatically commit each          |                |
   |                      |    transaction.  Any changes made by the transaction will be visible to others, and               |                |
   |                      |    durable in the event of a crash.                                                               |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Explain*            | Click the *Explain* icon to view an explanation plan for the current query. The result of EXPLAIN | F7             |
   |                      | is displayed graphically on the *Explain* tab of the output panel, and in text form on the        |                |
   |                      | *Data Output* tab.                                                                                |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Explain analyze*    | Click the *Explain analyze* icon to invoke an EXPLAIN ANALYZE command on the current query.       | Shift+F7       |
   |                      |                                                                                                   |                |
   |                      | Navigate through the *Explain Options* menu to select options for the EXPLAIN command:            |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Verbose* to display additional information regarding the query plan.                   |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Costs* to include information on the estimated startup and total cost of each          |                |
   |                      |    plan node, as well as the estimated number of rows and the estimated width of each             |                |
   |                      |    row.                                                                                           |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Buffers* to include information on buffer usage.                                       |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Timing* to include information about the startup time and the amount of time           |                |
   |                      |    spent in each node of the query.                                                               |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Summary* to include the summary information about the query plan.                      |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Commit*             | Click the *Commit* icon to commit the transaction.                                                | Shift+CTRL+M   |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Rollback*           | Click the *Rollback* icon to rollback the transaction.                                            | Shift+CTRL+R   |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Clear*              | Use options on the *Clear* drop-down menu to erase display contents:                              | Accesskey + L  |
   |                      |                                                                                                   |                |
   |                      |  * Select *Clear Query Window* to erase the content of the SQL Editor panel.                      |                |
   |                      |                                                                                                   |                |
   |                      |  * Select *Clear History* to erase the content of the *History* tab.                              |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+
   | *Download as CSV*    | Click the *Download as CSV* icon to download the result set of the current query to a             | F8             |
   |                      | comma-separated list. You can specify the CSV settings through                                    |                |
   |                      | *Preferences -> SQL Editor -> CSV output* dialogue.                                               |                |
   +----------------------+---------------------------------------------------------------------------------------------------+----------------+

.. raw:: latex

     \newpage


The SQL Editor Panel
********************

The *SQL editor* panel is a workspace where you can manually provide a query,
copy a query from another source, or read a query from a file. The SQL editor
features syntax coloring and auto-completion.

.. figure:: images/query_sql_editor.png
   :alt: Query tool editor
   :align: center

   *The SQL Editor Panel*

To use auto-complete, begin typing your query; when you would like the Query
editor to suggest object names or commands that might be next in your query,
press the Control+Space key combination. For example, type "\*SELECT \* FROM\* "
(without quotes, but with a trailing space), and then press the Control+Space
key combination to select from a popup menu of auto-complete options.

.. figure:: images/query_autocomplete.png
   :alt: Query tool autocomplete feature
   :align: center

   *Using Auto-complete*

After entering a query, select the *Execute/Refresh* icon from the toolbar. The
complete contents of the SQL editor panel will be sent to the database server
for execution. To execute only a section of the code that is displayed in the
SQL editor, highlight the text that you want the server to execute, and click
the *Execute/Refresh* icon.

.. figure:: images/query_execute_section.png
   :alt: Query tool execute query section
   :align: center

   *Executing a command*

The message returned by the server when a command executes is displayed on the
*Messages* tab.  If the command is successful, the *Messages* tab displays
execution details.

.. figure:: images/query_tool_message.png
   :alt: Query tool message panel
   :align: center
 
   *The Messages Tab*

Options on the *Edit* menu offer functionality that helps with code formatting
and commenting:

* The auto-indent feature will automatically indent text to the same depth as
  the previous line when you press the Return key.
* Block indent text by selecting two or more lines and pressing the Tab key.
* Implement or remove SQL style or toggle C style comment notation within your
  code.

You can also **drag and drop** certain objects from the tree-view which
can save time in typing long object names. Text containing the object name will be
fully qualified with schema. Double quotes will be added if required.
For functions and procedures, the function name along with parameter names will
be pasted in the Query Tool.

.. raw:: latex

     \newpage


The Data Output Panel
*********************

The *Data Output* panel displays data and statistics generated by the most
recently executed query.

.. figure:: images/query_output_data.png
   :alt: Query tool output panel
   :align: center

   *The Data Output Panel*


Data Output Tab
---------------

The *Data Output* tab displays the result set of the query in a table format.
You can:

* Select and copy from the displayed result set.
* Use the *Execute/Refresh* options to retrieve query execution information and
  set query execution options.
* Use the *Download as CSV* icon to download the content of the *Data Output*
  tab as a comma-delimited file.
* Edit the data in the result set of a SELECT query if it is updatable.

.. _updatable-result-set:

A result set is updatable if:

* All columns are either selected directly from a single table, or
  they are not actually a table column (e.g. concatenation of 2 columns).
  Only columns that are selected directly from the table are
  editable, other columns are read-only.
* All the primary key columns or OIDs of the table are selected in the
  result set.

Any columns that are renamed or selected more than once are also read-only.

.. note:: To work with an updatable query result set, you must have ``psycopg2`` driver version 2.8 or above installed.

Editable and read-only columns are identified using pencil and lock icons (respectively) in the column headers.

.. figure:: images/query_tool_editable_columns.png
   :alt: Query tool editable and read-only columns
   :align: center

   *Query Tool Editable Columns*

An updatable result set is similar to the Data Grid in View/Edit Data mode, and can be modified in the same way.

If Auto-commit is off, the data changes are made as part of the ongoing
transaction, if no transaction is ongoing a new one is initiated. The data
changes are not committed to the database unless the transaction is committed.

If any errors occur during saving (for example, trying to save NULL into a
column with NOT NULL constraint) the data changes are rolled back to an
automatically created SAVEPOINT to ensure any previously executed queries in
the ongoing transaction are not rolled back.


All rowsets from previous queries or commands that are displayed in the *Data
Output* panel will be discarded when you invoke another query; open another
query tool browser tab to keep your previous results available.

Explain Tab
-----------

To generate the *Explain* or *Explain Analyze* plan of a query, click on
*Explain* or *Explain Analyze* button in the toolbar.

More options related to *Explain* and *Explain Analyze* can be selected from
the drop down on the right side of *Explain Analyze* button in the toolbar.

.. figure:: images/query_toolbar_explain.png
   :alt: Query tool toolbar explain button
   :align: center
 
   *The Explain Options*

Please note that pgAdmin generates the *Explain [Analyze]* plan in JSON format.

On successful generation of *Explain* plan, it will create three tabs/panels
under the Explain panel.

Graphical Tab
-------------

Hover over an icon on the *Graphical* tab to review information about that item; a 
popup window will display information about the selected object. For information on 
JIT statistics, triggers and a summary, hover over the icon on top-right corner; a 
similar popup window will be displayed when appropriate.

Please note that *EXPLAIN VERBOSE* cannot be displayed graphically. 

Use the download button on top left corner of the *Explain* canvas to download the 
plan as an SVG file.

  **Note:** Download as SVG is not supported on Internet Explorer.

.. figure:: images/query_output_explain_details.png
   :alt: Query tool graphical explain plan
   :align: center

   *A Graphical Explain*

Note that the query plan that accompanies the *Explain analyze* is available on 
the *Data Output* tab.

Analysis Tab
------------

The *Analysis* tab shows the plan details in table format, it generates a format similar 
to the format available at *explain.depsez.com*. Each row of the table represents the data 
for a *Explain Plan Node*. The output may contain the node information, exclusive timing, 
inclusive timing, actual vs. planned rows, actual rows, planned rows, or loops. 
When you select a row, the child rows of that selected row are marked with an orange dot.

If the percentage of the exclusive/inclusive timings of the total query time is:

  Greater than 90 --> Red 

  Greater than 50 --> Orange (between red and yellow) 

  Greater than 10 --> Yellow 

  If the planner has misestimated the number of rows (actual vs planned) by:

  10 times --> Yellow color

  100 times --> Orange (between Red and Yellow) color

  1000 times --> Red color

.. figure:: images/query_explain_analyze_table.png
   :alt: Query tool explain plan table
   :align: center

   *The Analysis Tab*

Statistics Tab
--------------

The *Statistics* tab displays information in two tables:

  * ``Statistics per Node Type`` tells you how many times each node type was referenced.
  * ``Statistics per Table`` tells you how many times each table was referenced by the query.

.. figure:: images/query_explain_analyze_statistics.png
   :alt: Query tool explain plan statistics
   :align: center

   *The Statistics Tab*

Messages Tab
------------

Use the *Messages* tab to view information about the most recently executed
query:

.. figure:: images/query_output_error.png
   :alt: Query tool output messages
   :align: center

   *The Messages Tab*

If the server returns an error, the error message will be displayed on the
*Messages* tab, and the syntax that caused the error will be underlined in the
SQL editor.  If a query succeeds, the *Messages* tab displays how long the
query took to complete and how many rows were retrieved:

.. figure:: images/query_output_messages.png
   :alt: Query tool output information
   :align: center

   *A successful query*

.. raw:: latex

    \newpage

Notifications Tab
-----------------

Use the *Notifications* tab to  view details of the asynchronous notifications that a client process may have sent:

.. figure:: images/query_output_notifications.png
   :alt: Query tool output messages
   :align: center

   *The Notifications Tab*


You can see details such as recorded time of the asynchronous notification event, name of the event or channel, process ID of the client process that has sent the notification, and the payload string that might have been sent along with the notification.

.. raw:: latex

     \newpage


Query History Panel
*******************

Use the *Query History* tab to review activity for the current session:

.. figure:: images/query_output_history.png
   :alt: Query tool history panel
   :align: center

   *The Query History Tab*

The Query History tab displays information about recent commands:

* The date and time that a query was invoked.
* The text of the query.
* The number of rows returned by the query.
* The amount of time it took the server to process the query and return a
  result set.
* Messages returned by the server (not noted on the *Messages* tab).
* The source of the query (indicated by icons corresponding to the toolbar).

You can show or hide the queries generated internally by pgAdmin (during
'View/Edit Data' or 'Save Data' operations).

To erase the content of the *Query History* tab, select *Clear history* from
the *Clear* drop-down menu.

Query History is maintained across sessions for each database on a per-user
basis when running in Query Tool mode. In View/Edit Data mode, history is not
retained. By default, the last 20 queries are stored for each database. This
can be adjusted in `config_local.py` by overriding the `MAX_QUERY_HIST_STORED`
value.

.. raw:: latex

     \newpage


Connection Status
*****************

Use the *Connection status* feature to view the current connection and
transaction status by clicking on the status icon in query tool:

.. figure:: images/query_tool_connection_status.png
   :alt: Query tool connection and transaction status
   :align: center

   *Checking the Connection Status*


If the server gets disconnected, the connection icon at the top left corner turns red and a tool tip is displayed. The icon turns green once you restore the server connection.

.. figure:: images/query_tool_connection_status_error.png
   :alt: Query tool connection and transaction status error
   :align: center

   *The connection check failed*
