import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/use-sitemetadata';
import TextBalancer from '../components/text-balancer';

import '../styles/index.scss';

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <body className="bg-light" />
      </Helmet>
      {children}
      <TextBalancer />
    </>
  );
};

export default Layout;
