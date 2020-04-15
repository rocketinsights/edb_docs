import React from 'react';
import Layout from '../components/layout';
import ContentCol from '../components/contentCol';
import IndexLinks from '../components/indexLinks';
import { Container, Row, Col } from 'react-bootstrap';
import indexLinkList from './indexLinkList';

export default () => {
  return (
    <>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={3}>
              <h2>edbdocs</h2>
              <IndexLinks indexLinkList={indexLinkList} />
            </Col>
            <ContentCol md={9}>
              <h1>welcome to docs</h1>
            </ContentCol>
          </Row>
        </Container>
      </Layout>
    </>
  );
};
