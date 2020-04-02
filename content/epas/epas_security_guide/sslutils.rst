.. _sslutils:

.. index:: sslutils

sslutils
--------

``sslutils`` is a Postgres extension that provides SSL certificate
generation functions to Advanced Server for use by the EDB Postgres
Enterprise Manager server. sslutils is installed by using the
``edb-as<xx>-server-sslutils`` RPM package where *xx* is the Advanced
Server version number.

The sslutils package provides the functions shown in the following
sections.

In these sections, each parameter in the function’s parameter list is described by ``parameter n`` under the ``Parameters`` subsection where *n* refers to the ``nth`` ordinal position (for example, first, second, third, etc.) within the function’s parameter list.

.. index:: openssl_rsa_generate_key

openssl_rsa_generate_key
~~~~~~~~~~~~~~~~~~~~~~~~

The ``openssl_rsa_generate_key`` function generates an RSA private key. The
function signature is:

     ``openssl_rsa_generate_key(<integer>) RETURNS <text>``

When invoking the function, pass the number of bits as an integer value;
the function returns the generated key.

.. index:: openssl_rsa_key_to_csr

openssl_rsa_key_to_csr
~~~~~~~~~~~~~~~~~~~~~~

The ``openssl_rsa_key_to_csr`` function generates a certificate signing
request (CSR). The signature is:

     ``openssl_rsa_key_to_csr(<text>, <text>, <text>, <text>, <text>, <text>, <text>) RETURNS <text>``

The function generates and returns the certificate signing request.

**Parameters**

=========== ==============================================================================================================
Parameter    Description

1            The name of the RSA key file.
2            The common name (e.g., agentN) of the agent that will use the signing request.
3            The name of the country in which the server resides.
4            The name of the state in which the server resides.
5            The location (city) within the state in which the server resides.
6            The name of the organization unit requesting the certificate.
7            The email address of the user requesting the certificate.

=========== ==============================================================================================================

.. index:: openssl_csr_to_crt

openssl_csr_to_crt
~~~~~~~~~~~~~~~~~~

The ``openssl_csr_to_crt`` function generates a self-signed certificate or a
certificate authority certificate. The signature is:

     ``openssl_csr_to_crt(<text>, <text>, <text>) RETURNS <text>``

The function returns the self-signed certificate or certificate
authority certificate.

**Parameters**

=========== ==============================================================================================================
Parameter   Description

1           The name of the certificate signing the request.
2           The path to the certificate authority certificate, or NULL if generating a certificate authority certificate.
3           The path to the certificate authority’s private key or (if argument 2 is NULL) the path to a private key.

=========== ==============================================================================================================

.. index:: openssl_rsa_generate_crl

openssl_rsa_generate_crl
~~~~~~~~~~~~~~~~~~~~~~~~

The ``openssl_rsa_generate_crl`` function generates a default certificate
revocation list. The signature is:

     ``openssl_rsa_generate_crl(<text>, <text>) RETURNS <text>``

The function returns the certificate revocation list.

**Parameters**

=========== ==============================================================================================================
Parameter   Description

1           The path to the certificate authority certificate.
2           The path to the certificate authority private key.

=========== ==============================================================================================================
