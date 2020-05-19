import React from 'react';
import IndexLinks from '../components/index-links';
import ProductGroups from '../components/product-groups';
import ArticleStubs from '../components/article-stubs';
import SearchBar from '../components/search';
import EdbLogo from '../components/edb-logo';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import {
  indexLinkList,
  linkGroups,
  articles,
} from '../constants/index-link-list';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import ContentCol from '../components/content-col';

const FlexColumn = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 20px;
  h2 {
    font-size: 2rem;
  }
`;

const PaddedCol = styled(Col)`
  padding-top: 1.5rem;
  height: 100vh;
`;

const HeadlineWithStrap = ({ headline, strap }) => {
  return (
    <FlexColumn>
      <h2>{headline}</h2>
      <div>{strap}</div>
    </FlexColumn>
  );
};

const navStyles = {
  height: '65px',
};

export default () => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <PaddedCol md={3}>
            <EdbLogo />
            <IndexLinks indexLinkList={indexLinkList} />
          </PaddedCol>
          <ContentCol md={9}>
            <Navbar className="border-bottom fluid" style={navStyles}>
              <SearchBar />
            </Navbar>
            <Row>
              <Col md={12}>
                <h1>Welcome To EDB Docs</h1>
                <ProductGroups linkGroups={linkGroups} />
                <HeadlineWithStrap
                  headline=" Learn EDB Postgres"
                  strap="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, asperiores!"
                />
                <ArticleStubs articles={articles} />
              </Col>
            </Row>
          </ContentCol>
        </Row>
      </Container>
    </Layout>
  );
};
