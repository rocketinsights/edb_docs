import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import LeftNav from '../components/left-nav';
import PageTableOfContents from '../components/table-of-contents';
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

const LearnDocTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { navLinks } = pageContext;
  console.log(navLinks);
  return (
    <Layout>
      <TopBar />
      <Container className="p-0 d-flex bg-white">
        <SideNavigation>
          <LeftNav
            navLinks={navLinks}
            path={mdx.fields.path}
            withVersions={false}
          />
        </SideNavigation>
        <MainContent>
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
        </MainContent>
      </Container>
    </Layout>
  );
};

export default LearnDocTemplate;
