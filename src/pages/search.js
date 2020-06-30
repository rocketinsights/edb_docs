import React from 'react';
import { Container } from 'react-bootstrap';
import { indexLinkList } from '../constants/index-link-list';
import Icon, { iconNames } from '../components/icon/';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Index,
  Hits,
  Pagination,
  RefinementList,
  ClearRefinements,
} from 'react-instantsearch-dom';
import {
  Footer,
  IndexLinks,
  Layout,
  MainContent,
  SideNavigation,
  TopBar,
} from '../components';
import { PageHit } from '../components/search/hitComps'

import { graphql } from 'gatsby';

const searchClient = algoliasearch(
  'NQVJGNW933',
  '3c95fc5297e90a44b6467f3098a4e6ed',
);

const docsIndex = { title: 'Documentation', index: 'edb-products' };
const learnIndex = { title: 'Guides', index: 'advocacy' };

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

export default data => {
  const advocacyLinks =
    data.data.file.childAdvocacyDocsJson.advocacyLinks || [];
  return (
    <Layout background='white'>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <InstantSearch
          searchClient={searchClient}
          indexName={docsIndex.index}
        >
          <SideNavigation background='white' footer={false}>
            <div>Content Area</div>
            <div>Product</div>
            <RefinementList attribute='product' />
            <div>Version</div>
            <RefinementList attribute='version' />
            <ClearRefinements />
          </SideNavigation>
          <MainContent search={false}>
            <SearchBox />
            <Index key={learnIndex.index} indexName={learnIndex.index} >
              <Hits hitComponent={PageHit} />
            </Index>
            <hr/>
            <Index key={docsIndex.index} indexName={docsIndex.index} >
              <Hits hitComponent={PageHit} />
            </Index>

            <Pagination/>
            <Footer />
          </MainContent>
        </InstantSearch>
      </Container>
    </Layout>
  );
};
