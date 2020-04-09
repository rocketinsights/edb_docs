.. _user_triggers:

**********************
`USER_TRIGGERS`:index:
**********************

The ``USER_TRIGGERS`` view displays information about all triggers on tables
owned by the current user.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

================= ==== ========================================================================================
Name              Type Description
schema_name       TEXT The name of the schema in which the trigger resides.
trigger_name      TEXT The name of the trigger.
trigger_type      TEXT The type of the trigger. Possible values are:

                          BEFORE ROW

                          BEFORE STATEMENT

                          AFTER ROW

                          AFTER STATEMENT
triggering_event  TEXT The event that fires the trigger.
table_owner       TEXT The user name of the owner of the table on which the trigger is defined.
base_object_type  TEXT Included for compatibility only. Value will always be TABLE.
table_name        TEXT The name of the table on which the trigger is defined.
referencing_names TEXT Included for compatibility only. Value will always be REFERENCING NEW AS NEW OLD AS OLD.
status            TEXT Status indicates if the trigger is enabled (VALID) or disabled (NOTVALID).
description       TEXT Included for compatibility only.
trigger_body      TEXT The body of the trigger.
action_statement  TEXT The SQL command that executes when the trigger fires.
================= ==== ========================================================================================
