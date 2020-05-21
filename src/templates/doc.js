import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/left-nav';
import PageTableOfContents from '../components/table-of-contents';
import VersionDropdown from '../components/version-dropdown';
import TopBar from '../components/top-bar';
import SideNavigation from '../components/side-navigation';
import MainContent from '../components/main-content';

export const query = graphql`
  query($path: String!) {
    mdx(fields: { path: { eq: $path } }) {
      frontmatter {
        title
      }
      fields {
        path
      }
      body
      tableOfContents
    }
  }
`;

const getProductUrlBase = path => {
  return path
    .split('/')
    .slice(0, 2)
    .join('/');
};

const makeVersionArray = (versions, path) => {
  return versions.map(version => ({
    version: version,
    url: `${getProductUrlBase(path)}/${version}`,
  }));
};

const DocTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { navLinks, versions } = pageContext;
  const versionArray = makeVersionArray(versions, mdx.fields.path);

  return (
    <Layout>
      <TopBar />
      <Container className="p-0 d-flex bg-white">
        <SideNavigation>
          <LeftNav
            navLinks={navLinks}
            path={mdx.fields.path}
            withVersions={true}
          />
        </SideNavigation>
        <MainContent>
          <Row>
            <Col md={10}>
              <h1>{mdx.frontmatter.title}</h1>
              {versionArray.length > 1 && (
                <VersionDropdown
                  versionArray={versionArray}
                  path={mdx.fields.path}
                />
              )}
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </Col>
            <Col md={2}>
              {mdx.tableOfContents.items && (
                <PageTableOfContents toc={mdx.tableOfContents.items} />
              )}
            </Col>
          </Row>
        </MainContent>
      </Container>
    </Layout>
  );
};

export default DocTemplate;
