.. _user_queues:

********************
`USER_QUEUES`:index:
********************

The ``USER_QUEUES`` view provides information about any queue on which the
current user has usage privileges.

.. tabularcolumns:: |\Y{0.3}|\Y{0.3}|\Y{0.4}|

=============== ========= ==============================================================================
Name            Type      Description
name            TEXT      The name of the queue.
queue_table     TEXT      The name of the queue table in which the queue resides.
qid             OID       The system-assigned object ID of the queue.
queue_type      CHARACTER The queue type; may be EXCEPTION_QUEUE, NON_PERSISTENT_QUEUE, or NORMAL_QUEUE.

                VARYING
max_retries     NUMERIC   The maximum number of dequeue attempts.
retrydelay      NUMERIC   The maximum time allowed between retries.
enqueue_enabled CHARACTER YES if the queue allows enqueuing; NO if the queue does not.

                VARYING
dequeue_enabled CHARACTER YES if the queue allows dequeuing; NO if the queue does not.

                VARYING
retention       CHARACTER The number of seconds that a processed message is retained in the queue.

                VARYING
user_comment    CHARACTER A user-specified comment.

                VARYING
network_name    CHARACTER The name of the network on which the queue resides.

                VARYING
sharded         CHARACTER YES if the queue resides on a sharded network; NO if the queue does not.

                VARYING
=============== ========= ==============================================================================
