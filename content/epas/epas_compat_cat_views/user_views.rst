.. _user_views:

*******************
`USER_VIEWS`:index:
*******************

The ``USER_VIEWS`` view provides information about all views owned by the
current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=========== ==== =============================================
Name        Type Description
schema_name TEXT Name of the schema in which the view resides.
view_name   TEXT Name of the view.
text        TEXT The SELECT statement that defines the view.
=========== ==== =============================================
