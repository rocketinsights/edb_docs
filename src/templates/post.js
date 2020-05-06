import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/left-nav';
import ContentCol from '../components/content-col';
import PageTableOfContents from '../components/table-of-contents';
import VersionDropdown from '../components/version-dropdown';

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
      <Container fluid>
        <Row>
          <Col md={3}>
            <LeftNav navLinks={navLinks} path={mdx.fields.path} />
          </Col>
          <ContentCol md={7}>
            <h1>{mdx.frontmatter.title}</h1>
            {versionArray.length > 1 && (
              <VersionDropdown
                versionArray={versionArray}
                path={mdx.fields.path}
              />
            )}
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </ContentCol>
          <Col md={2}>
            {mdx.tableOfContents.items && (
              <PageTableOfContents toc={mdx.tableOfContents.items} />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DocTemplate;
