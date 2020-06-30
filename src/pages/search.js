import React, { useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
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
  connectSearchBox,
  Configure,
} from 'react-instantsearch-dom';
import {
  Footer,
  IndexLinks,
  Layout,
  MainContent,
  SideNavigation,
  TopBar,
} from '../components';
import {
  AdvancedSearchTabLink,
  SearchTab,
  SlashIndicator,
  ClearButton,
  SearchPane,
} from '../components/search/formComps';
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

const AdvancedSearchFiltering = () => (
  <>
    <div>Content Area</div>
    <div>Product</div>
    <RefinementList attribute='product' />
    <div>Version</div>
    <RefinementList attribute='version' />
    <ClearRefinements />
  </>
);

const AdvancedSearchResults = () => (
  <>
    <Index key={learnIndex.index} indexName={learnIndex.index} >
      <Hits hitComponent={PageHit} />
    </Index>
    <Index key={docsIndex.index} indexName={docsIndex.index} >
      <Hits hitComponent={PageHit} />
    </Index>
    <hr/>
    <Pagination/>
  </>
);

const AdvancedSearchInput = ({currentRefinement, refine, query}) => {
  const queryLength = (query || '').length;

  return (
    <form noValidate action="" autoComplete="off" role="search" className={`w-100 search-form d-flex align-items-center`}>
      <Icon iconName={iconNames.SEARCH} className="fill-black ml-3 opacity-5 flex-shrink-0" width="22" height="22" />
      <input
        id='search-input'
        className="form-control form-control-lg border-0 pl-3"
        type="text"
        aria-label="search"
        placeholder="Search"
        value={currentRefinement}
        onChange={e => refine(e.currentTarget.value)}
      />
      <ClearButton onClick={() => { refine('') }} className={`${queryLength === 0 && 'd-none'}`} />
    </form>
  );
};
const AdvancedSearchBox = connectSearchBox(AdvancedSearchInput);

export default data => {
  const advocacyLinks =
    data.data.file.childAdvocacyDocsJson.advocacyLinks || [];
  const [query, setQuery] = useState(``);

  return (
    <Layout background='white'>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <InstantSearch
          searchClient={searchClient}
          indexName={docsIndex.index}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <Configure hitsPerPage={30} />

          <SideNavigation background='white' footer={false}>
            <AdvancedSearchFiltering />
          </SideNavigation>

          <div className="flex-grow-1 border-right min-w-50">
            <Navbar variant="light" className="flex-md-nowrap p-3">
              <AdvancedSearchBox query={query} />
              <Button variant="link" className="text-nowrap mr-2 ml-3">
                Support
              </Button>
              <Button variant="link" className="text-nowrap mr-2">
                Sign In
              </Button>
            </Navbar>

            <main role="main" className="mt-0 p-3">
              <AdvancedSearchResults />
              <Footer />
            </main>
          </div>
        </InstantSearch>
      </Container>
    </Layout>
  );
};
