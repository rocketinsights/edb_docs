import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/leftNav';
import PageTableOfContents from '../components/page-toc';
import { Container, Row, Col } from 'react-bootstrap';
import VersionDropdown from '../components/versionDropdown';
import styled from '@emotion/styled';

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
    allMdx {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            path
          }
        }
      }
    }
  }
`;

const getEdgeVersion = edge => {
  return edge.node.fields.path.split('/')[2];
};

const getProductUrlBase = edge => {
  return edge.node.fields.path
    .split('/')
    .slice(0, 2)
    .join('/');
};

const makeVersionArray = edges => {
  let result = [];
  const productVersionUrlBase = getProductUrlBase(edges[0]);
  edges.forEach(edge => {
    const edgeVersion = getEdgeVersion(edge);
    if (!result.includes(edgeVersion)) {
      result.push(edgeVersion);
    }
  });
  return result
    .sort()
    .reverse()
    .map(version => ({
      version: version,
      url: `${productVersionUrlBase}/${version}`,
    }));
};

const Content = styled(Col)`
  background-color: white;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  z-index: 2;
`;

const DocTemplate = ({ data }) => {
  const { allMdx, mdx } = data;
  const versionArray = makeVersionArray(allMdx.edges);
  console.log(versionArray);
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2}>
            <LeftNav edges={allMdx.edges} path={mdx.fields.path} />
          </Col>
          <Content md={8}>
            <h1>{mdx.frontmatter.title}</h1>
            {versionArray.length > 1 && (
              <VersionDropdown
                versionArray={versionArray}
                path={mdx.fields.path}
              />
            )}
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Content>
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
