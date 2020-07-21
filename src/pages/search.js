import React, { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
} from 'react-instantsearch-dom';
import {
  Footer,
  Layout,
  SideNavigation,
  TopBar,
  SearchNavigationLinks,
} from '../components';
import {
  AdvancedSearchFiltering,
  AdvancedSearchResults,
  AdvancedSearchForm,
  queryParamsToState,
  writeStateToQueryParams,
} from '../components/advanced-search';
import { docsIndex } from '../components/search/indices';

const searchClient = algoliasearch(
  'NQVJGNW933',
  '3c95fc5297e90a44b6467f3098a4e6ed',
);

export default data => {
  const [paramSearchState, paramFilterIndex] = queryParamsToState(data.location.search);

  const [query, setQuery] = useState(paramSearchState.query || '');
  const [filterIndex, setFilterIndex] = useState(paramFilterIndex || null);
  const [searchState, setSearchState] = useState(paramSearchState || {});

  const [learnTotal, setLearnTotal] = useState(0);
  const [docsTotal, setDocsTotal] = useState(0);

  useEffect(() => {
    writeStateToQueryParams(searchState, filterIndex);
  });

  return (
    <Layout background='white'>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <InstantSearch
          searchClient={searchClient}
          indexName={docsIndex.index}
          onSearchStateChange={(searchState) => {
            setQuery(searchState.query);
            setSearchState(searchState);
          }}
          searchState={searchState}
        >
          <Configure hitsPerPage={30} />

          <SideNavigation background='white' footer={false}>
            <AdvancedSearchFiltering
              filterIndex={filterIndex}
              setFilterIndex={setFilterIndex}
              learnTotal={learnTotal}
              docsTotal={docsTotal}
              queryActive={query && query.length > 0}
            />
          </SideNavigation>

          <div className="flex-grow-1 border-right min-w-50">
            <Navbar variant="light" className="flex-md-nowrap p-3">
              <AdvancedSearchForm query={query} />
              <SearchNavigationLinks />
            </Navbar>

            <main role="main" className="mt-0 p-3">
              <AdvancedSearchResults
                query={query}
                filterIndex={filterIndex}
                learnTotal={learnTotal}
                setLearnTotal={setLearnTotal}
                docsTotal={docsTotal}
                setDocsTotal={setDocsTotal}
              />
              <Footer />
            </main>
          </div>
        </InstantSearch>
      </Container>
    </Layout>
  );
};
