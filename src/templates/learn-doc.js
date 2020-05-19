import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/left-nav';
import PageTableOfContents from '../components/table-of-contents';
import styled from '@emotion/styled';
import SearchBar from '../components/search-bar';
import { navOrder } from '../constants/learn-nav-order';
import ContentCol from '../components/content-col';

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

const PaddedCol = styled(Col)`
  padding-top: 1.5rem;
  height: 100vh;
`;

const navStyles = {
  height: '65px',
};

const LearnDocTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { navLinks } = pageContext;
  return (
    <Layout>
      <Container fluid>
        <Row>
          <PaddedCol md={2}>
            <LeftNav
              navLinks={navLinks}
              path={mdx.fields.path}
              withVersions={false}
              navOrder={navOrder}
            />
          </PaddedCol>
          <ContentCol md={10}>
            <Navbar className="border-bottom fluid" style={navStyles}>
              <SearchBar />
            </Navbar>
            <Row>
              <Col md={10}>
                <h1>{mdx.frontmatter.title}</h1>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </Col>
              <Col md={2}>
                {mdx.tableOfContents.items && (
                  <PageTableOfContents toc={mdx.tableOfContents.items} />
                )}
              </Col>
            </Row>
          </ContentCol>
        </Row>
      </Container>
    </Layout>
  );
};

export default LearnDocTemplate;
