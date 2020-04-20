.. raw:: latex

    \newpage

.. _installing_pgbouncer_on_a_sles_12_host:

***********************************************
`Installing PgBouncer on a SLES 12 Host`:index:
***********************************************

You can use the zypper package manager to install PgBouncer on an SLES
12 host. zypper will attempt to satisfy package dependencies as it
installs a package, but requires access to specific repositories that
are not hosted at EnterpriseDB.

Before installing PgBouncer, add the EnterpriseDB repository to your
SLES host. Use the command:

    ``zypper addrepo http://yum.enterprisedb.com/suse/epas96-sles.repo``

The command creates the ``edbas96suse.repo`` file in the ``/etc/zypp/repos.d``
directory. The file contains:

.. code-block:: text

  [edbas96suse]
  name=EDB Postgres Advanced Server 9.6 $releasever - $basearch
  enabled=1
  autorefresh=0
  baseurl=http://username:password@yum.enterprisedb.com/9.6/suse/suse-$releasever-$basearch
  type=rpm-md
  gpgcheck=1
  gpgkey=http://yum.enterprisedb.com/9.6/suse/suse-$releasever-$basearch/repodata/repomd.xml.key

Use your choice of editor to modify the file, replacing the ``username``
and ``password`` placeholders in the ``baseurl`` specification with your
EnterpriseDB user name and repository password.

Then, use the following command to refresh the metadata on your SLES
host to include the EnterpriseDB repository:

    ``zypper refresh``

.. code-block:: text

    Retrieving repository 'EDB Postgres Advanced Server 9.6 12 - x86_64'
    metadata[\]
    New repository or package signing key received:
    Repository: EDB Postgres Advanced Server 9.6 12 - x86_64
    Key Name: EnterpriseDB Inc. (EnterpriseDB Yum Repositories)
    &lt;packages@enterprisedb.com&gt;
    Key Fingerprint: CA409F7C 635F2AE5 6C9E8B34 E5EDE919 7E30651C
    Key Created: Wed Dec 31 11:37:58 2014
    Key Expires: (does not expire)
    Rpm Name: gpg-pubkey-7e30651c-54a3e016
    Do you want to reject the key, trust temporarily, or trustalways?
    [r/t/a/? shows all options] (r):

When prompted, specify ``a`` to ``always trust`` the provided key, and update
the metadata to include the EnterpriseDB repository.

Before installing PgBouncer, you must add SUSEConnect and the SUSE
Package Hub extension to the SLES host, and register the host with SUSE,
allowing access to SUSE repositories. Use the commands:

    ``zypper install SUSEConnect``

    ``SUSEConnect -p PackageHub/12/x86_64``

For detailed information about registering a SUSE host, click `here <https://www.suse.com/support/kb/doc/?id=7016626>`_.

Then, you can use the zypper utility to install PgBouncer:

    ``zypper install edb-pgbouncer17``
