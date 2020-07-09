import React, { useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
} from 'react-instantsearch-dom';
import queryString from 'query-string';
import {
  Footer,
  Layout,
  SideNavigation,
  TopBar,
} from '../components';
import {
  AdvancedSearchFiltering,
  AdvancedSearchResults,
  AdvancedSearchForm,
} from '../components/advanced-search';
import { docsIndex, learnIndex } from '../components/search/indices';

const searchClient = algoliasearch(
  'NQVJGNW933',
  '3c95fc5297e90a44b6467f3098a4e6ed',
);

const queryParamsToState = (query) => {
  const contentToIndex = { docs: docsIndex, guides: learnIndex };
  const params = new URLSearchParams(query);

  // const queryParams = queryString.parse(query);

  // return {
  //   query: queryParams.query,
  //   filterIndex: contentToIndex[queryParams.content],
  // };

  return {
    query: params.get('query'),
    filterIndex: contentToIndex[params.get('content')],
  };
};

export default data => {
  const queryState = queryParamsToState(data.location.search);

  const [query, setQuery] = useState(queryState.query || '');
  const [filterIndex, setFilterIndex] = useState(queryState.filterIndex || null);

  const [learnTotal, setLearnTotal] = useState(0);
  const [docsTotal, setDocsTotal] = useState(0);

  return (
    <Layout background='white'>
      <TopBar />
      <Container className="p-0 d-flex bg-white fixed-container">
        <InstantSearch
          searchClient={searchClient}
          indexName={docsIndex.index}
          onSearchStateChange={({ query }) => setQuery(query)}
          searchState={{ query: query }}
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
              <Button variant="link" className="text-nowrap mr-2 ml-3">
                Support
              </Button>
              <Button variant="link" className="text-nowrap mr-2">
                Sign In
              </Button>
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
