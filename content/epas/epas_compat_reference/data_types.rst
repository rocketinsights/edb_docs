.. _data_types:

.. raw:: latex

    \newpage

*******************
`Data Types`:index:
*******************

The following table shows the built-in general-purpose data types.

Table ‑ Data Types

================================== ============================================================= =================================================================================
Name                               Alias                                                         Description
BLOB                               LONG RAW, RAW(\ *n*), BYTEA                                   Binary data
BOOLEAN                                                                                          Logical Boolean (true/false)
CHAR [ (n) ]                       CHARACTER [ (n) ]                                             Fixed-length character string of n characters
CLOB                               LONG, LONG VARCHAR                                            Long character string
DATE                               TIMESTAMP                                                     Date and time to the second
DOUBLE PRECISION                   FLOAT,                                                        Double precision floating-point number

                                   FLOAT(25) – FLOAT(53)
INTEGER                            INT, BINARY_INTEGER, PLS_INTEGER                              Signed four-byte integer
NUMBER                             DEC, DECIMAL, NUMERIC                                         Exact numeric with optional decimal places
NUMBER(p [, s ])                   DEC(p [, s ]),                                                Exact numeric of maximum precision, p, and optional scale, s

                                   DECIMAL(p [, s ]),

                                   NUMERIC(p [, s ])
REAL                               FLOAT(1) – FLOAT(24)                                          Single precision floating-point number
TIMESTAMP [ (p) ]                                                                                Date and time with optional, fractional second precision, p
TIMESTAMP [ (p) ] WITH TIME ZONE                                                                 Date and time with optional, fractional second precision, p, and with time zone
VARCHAR2(n)                        CHAR VARYING(n), CHARACTER VARYING(n), VARCHAR(n)             Variable-length character string with a maximum length of n characters
XMLTYPE                                                                                          XML data
================================== ============================================================= =================================================================================

.. toctree::
   :maxdepth: 3

   numeric_types
   character_types
   binary_data
   date_time_types
   boolean_type
   xml_type
