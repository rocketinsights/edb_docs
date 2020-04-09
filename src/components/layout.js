import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import ThemeProvider from './theme/themeProvider';
import mdxComponents from './mdxComponents';
import Sidebar from './sidebar';
import RightSidebar from './rightSidebar';
import config from '../../config.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <Container fluid>
        <Row>
          <Col md={4} lg={3} xl={3}>
            <Sidebar location={location} />
          </Col>
          <Col md={8} lg={9} xl={7}>
            {config.sidebar.title ? (
              <div
                className={'sidebarTitle sideBarShow'}
                dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
              />
            ) : null}
            {children}
          </Col>
          <Col sm={{ span: 0, order: 4 }} md={0} lg={0} xl={2}>
            <RightSidebar location={location} />
          </Col>
        </Row>
      </Container>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
