.. raw:: latex

   \newpage

`RECEIVE_MESSAGE`:index:
------------------------

The ``RECEIVE_MESSAGE`` function obtains a message from a specified pipe.

    ``<status> INTEGER RECEIVE_MESSAGE(<pipename> VARCHAR2``

        ``[, <timeout> INTEGER ])``

**Parameters**

``<pipename>``

    Name of the pipe.

``<timeout>``

    Wait time (seconds). Default is 86400000 (1000 days).

``<status>``

    Status code returned by the operation.

The possible status codes are:

.. tabularcolumns:: |\Y{0.5}|\Y{0.5}|

+---------------+-------------------------------------+
| Status Code   | Description                         |
+---------------+-------------------------------------+
| 0             | Success                             |
+---------------+-------------------------------------+
| 1             | Time out                            |
+---------------+-------------------------------------+
| 2             | Message too large .for the buffer   |
+---------------+-------------------------------------+
