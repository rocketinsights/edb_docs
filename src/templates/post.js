import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import ReadLink from '../components/read-link';
import LeftNav from '../components/leftNav';
import PageTableOfContents from '../components/page-toc';
import { Container, Row, Col } from 'react-bootstrap';

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

const makeVersionArray = edges => {
  let result = [];
  edges.forEach(edge => {
    const edgeVersion = getEdgeVersion(edge);
    if (!result.includes(edgeVersion)) {
      result.push(edgeVersion);
    }
  });
  return result.sort();
};

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
          <Col md={8}>
            <h1>{mdx.frontmatter.title}</h1>
            <MDXRenderer>{mdx.body}</MDXRenderer>
            <ReadLink to="/">&larr; back to all posts</ReadLink>
          </Col>
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
