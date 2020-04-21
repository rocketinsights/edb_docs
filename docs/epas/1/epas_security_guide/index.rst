

*******************************************
EDB Advanced Server Security Features Guide
*******************************************


This guide describes features that provide added security to EDB Postgres Advanced Server installations. It is not a comprehensive guide to the security functionality provided by PostgreSQL that is built into Advanced Server.  

  * :doc:`SQL/Protect <protecting_against_sql_injection_attacks>` provides protection from SQL injection attacks.

  * :doc:`Virtual Private Database <virtual_private_database>` provides fine-grained access control for sensitive data.

  * :doc:`sslutils <sslutils>` is a Postgres extension that allows you to generate SSL certificates.

  * :doc:`Data redaction <data_redaction>` functionality allows you to dynamically mask portions of data.

For information about Postgres authentication and security features, please consult the PostgreSQL core documentation, available at:

   https://www.enterprisedb.com/edb-docs/p/postgresql


.. toctree::
   :maxdepth: 3

   protecting_against_sql_injection_attacks
   virtual_private_database
   sslutils
   data_redaction
   conclusion
