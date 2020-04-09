.. _dba_profiles:

*********************
`DBA_PROFILES`:index:
*********************

The ``DBA_PROFILES`` view provides information about existing profiles. The
table includes a row for each profile/resource combination.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

============= ====================== =============================================================================================
Name          Type                   Description
profile       CHARACTER VARYING(128) The name of the profile.
resource_name CHARACTER VARYING(32)  The name of the resource associated with the profile.
resource_type CHARACTER VARYING(8)   The type of resource governed by the profile; currently PASSWORD for all supported resources.
limit         CHARACTER VARYING(128) The limit values of the resource.
common        CHARACTER VARYING(3)   YES for a user-created profile; NO for a system-defined profile.
============= ====================== =============================================================================================
