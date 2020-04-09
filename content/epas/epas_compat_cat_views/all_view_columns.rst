.. _all_view_columns:

*************************
`ALL_VIEW_COLUMNS`:index:
*************************

The ``ALL_VIEW_COLUMNS`` view provides information on all columns in all
user-defined views.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

============== ================= ====================================================================================================================
Name           Type              Description
owner          CHARACTER VARYING User name of the view’s owner.
schema_name    CHARACTER VARYING Name of the schema in which the view belongs.
view_name      CHARACTER VARYING Name of the view.
column_name    CHARACTER VARYING Name of the column.
data_type      CHARACTER VARYING Data type of the column.
data_length    NUMERIC           Length of text columns.
data_precision NUMERIC           Precision (number of digits) for NUMBER columns.
data_scale     NUMERIC           Scale of NUMBER columns.
nullable       CHARACTER(1)      Whether or not the column is nullable – possible values are: Y – column is nullable; N – column does not allow null.
column_id      NUMERIC           Relative position of the column within the view.
data_default   CHARACTER VARYING Default value assigned to the column.
============== ================= ====================================================================================================================
