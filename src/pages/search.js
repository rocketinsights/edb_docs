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
  HitsPerPage,
  HierarchicalMenu,
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
    <Layout>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <SideNavigation>
          <IndexLinks indexLinkList={advocacyLinks.concat(indexLinkList)} />
        </SideNavigation>
        <MainContent>
          <h1 className="balance-text">Advanced Search</h1>

          <InstantSearch
            searchClient={searchClient}
            indexName={docsIndex.index}
          >
            <SearchBox />

            <HierarchicalMenu
              attributes={['product', 'productVersion']}
            />

            <hr/>
            <Index key={learnIndex.index} indexName={learnIndex.index} >
              <Hits hitComponent={PageHit} />
            </Index>
            <hr/>
            <Index key={docsIndex.index} indexName={docsIndex.index} >
              <Hits hitComponent={PageHit} />
            </Index>

            <Pagination/>
            <HitsPerPage
              defaultRefinement={50}
              items={[
                { value: 10, label: 'Show 10 hits' },
                { value: 25, label: 'Show 25 hits' },
                { value: 50, label: 'Show 50 hits' },
                { value: 100, label: 'Show 100 hits' },
                { value: 200, label: 'Show 200 hits' },
              ]}
            />
          </InstantSearch>

          <Footer />
        </MainContent>
      </Container>
    </Layout>
  );
};
