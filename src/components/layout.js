import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/use-sitemetadata';
import TextBalancer from '../components/text-balancer';
import { MDXProvider } from '@mdx-js/react';
import Icon from '../components/icon';

import '../styles/index.scss';

const Layout = ({ children, pageTitle }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle || title}</title>
        <meta name="description" content={description} />
        <body className="bg-light fixed-container" />
      </Helmet>
      <MDXProvider
        components={{
          table: props => <table {...props} className="table" />,
          pre: props => (
            <figure className="bg-dark p-3 m-0 mb-3 rounded">
              <pre className="m-0" {...props} />
            </figure>
          ),
          Icon,
        }}
      >
        {children}
      </MDXProvider>
      <TextBalancer />
    </>
  );
};

export default Layout;
