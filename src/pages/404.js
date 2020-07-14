import React from 'react';
import { Container } from 'react-bootstrap';
import { indexLinkList } from '../constants/index-link-list';
import {
  Footer,
  IndexLinks,
  Layout,
  MainContent,
  SideNavigation,
  TopBar,
} from '../components';
import Icon, { iconNames } from '../components/icon';
import { graphql } from 'gatsby';

export const query = graphql`
  query {
    file(name: { eq: "advocacy-index-nav" }) {
      childAdvocacyDocsJson {
        advocacyLinks {
          sectionName
          links {
            title
            url
          }
        }
      }
    }
  }
`;

const PageNotFound = ({ path }) => {
  return (
    <div>
      <div className="mb-3">
        The requested page could not be found:
      </div>
      <blockquote className="blockquote blockquote-bordered">
        {path}
      </blockquote>
    </div>
  );
};

export default data => {
  const advocacyLinks =
    data.data.file.childAdvocacyDocsJson.advocacyLinks || [];
  return (
    <Layout>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <SideNavigation>
          <IndexLinks indexLinkList={advocacyLinks.concat(indexLinkList)} />
        </SideNavigation>
        <MainContent>
          <Icon iconName={iconNames.NOT_FOUND} width={400} height={145} className="fill-green mb-5"/>
          <PageNotFound path={data.location.href} />
          <Footer />
        </MainContent>
      </Container>
    </Layout>
  );
};
