import React from 'react';
import Layout from '../components/layout';
import ContentCol from '../components/contentCol';
import IndexLinks from '../components/IndexLinks';
import ProductGroups from '../components/ProductGroups';
import ArticleStubs from '../components/ArticleStubs';
import EdbLogo from '../components/edbLogo';
import { Container, Row, Col } from 'react-bootstrap';
import {
  indexLinkList,
  linkGroups,
  articles,
} from '../../constants/indexLinkList';
import styled from '@emotion/styled';

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
`;

const HeadlineWithStrap = ({ headline, strap }) => {
  return (
    <FlexColumn>
      <h2>{headline}</h2>
      <div>{strap}</div>
    </FlexColumn>
  );
};

export default () => {
  return (
    <>
      <Layout>
        <Container fluid>
          <Row>
            <PaddedCol md={3}>
              <EdbLogo />
              <IndexLinks indexLinkList={indexLinkList} />
            </PaddedCol>
            <ContentCol md={9}>
              <h1>Welcome To EDB Docs</h1>
              <ProductGroups linkGroups={linkGroups} />
              <HeadlineWithStrap
                headline=" Learn EDB Postgres"
                strap="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, asperiores!"
              />

              <ArticleStubs articles={articles} />
            </ContentCol>
          </Row>
        </Container>
      </Layout>
    </>
  );
};
