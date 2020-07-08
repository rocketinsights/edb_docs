import React, { useState, useEffect, useCallback, createRef } from 'react';
import { Container, Navbar, Button, Form, Badge } from 'react-bootstrap';
import Icon, { iconNames } from '../components/icon/';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Index,
  Hits,
  connectSearchBox,
  Configure,
  connectHierarchicalMenu,
  connectStateResults,
  connectPagination,
  connectCurrentRefinements,
} from 'react-instantsearch-dom';
import {
  Footer,
  Layout,
  MainContent,
  SideNavigation,
  TopBar,
} from '../components';
import {
  SlashIndicator,
  ClearButton,
} from '../components/search/formComps';
import { AdvancedPageHit } from '../components/search/hitComps'
import { products } from '../constants/products'

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

const RadioInput = ({ labelText, badgeNumber, showBadge, id, name, onChange, checked }) => (
  <div className="form-check">
    <input
      type='radio'
      className='form-check-input'
      id={id}
      name={name}
      onChange={onChange}
      checked={checked}
      aria-label={id}
    />
    <label
      htmlFor={id}
      className="form-check-label"
    >
      {labelText}
      <Badge
        variant="secondary"
        className="ml-2 align-middle search-filter-badge"
      >
        {showBadge && badgeNumber}
      </Badge>
    </label>
  </div>
)

const IndexSelector = ({ filterIndex, setFilterIndex, learnTotal, docsTotal, queryActive }) => {
  const allTotal = learnTotal + docsTotal;
  const radioName = "index-selector";

  return (
    <div className="mb-4 pl-1">
      <div className='h5'>Content Area</div>
      <RadioInput
        id="index-selector-all"
        name={radioName}
        labelText='All'
        badgeNumber={allTotal}
        showBadge={queryActive}
        onChange={() => { setFilterIndex(null) }}
        checked={!filterIndex} 
      />
      <RadioInput
        id={`index-selector-${docsIndex.index}`}
        name={radioName}
        labelText={docsIndex.title}
        badgeNumber={docsTotal}
        showBadge={queryActive}
        onChange={() => { setFilterIndex(docsIndex) }}
        checked={filterIndex === docsIndex}
      />
      <RadioInput
        id={`index-selector-${learnIndex.index}`}
        name={radioName}
        labelText={learnIndex.title}
        badgeNumber={learnTotal}
        showBadge={queryActive}
        onChange={() => { setFilterIndex(learnIndex) }}
        checked={filterIndex === learnIndex}
      />
    </div>
  );
};



const RadioRefinement = ({ attribute, items, queryActive, refine, show }) => {
  const radioName = `radio-refinement-${attribute}`;
  const refinedItem = items.find((item) => item.isRefined);

  const capitalize = (s) => {
    return `${s[0].toUpperCase()}${s.slice(1)}`;
  }

  return (
    <div className={`mb-4 pl-1 ${!show && 'd-none'}`}>
      <div className='h5'>{capitalize(attribute)}</div>
      <RadioInput
        id={`radio-refinement-${attribute}-all`}
        name={radioName}
        labelText='All'
        badgeNumber={items.reduce((total, item) => total + item.count, 0)}
        showBadge={queryActive}
        onChange={() => { refine(refinedItem.value) }}
        checked={!refinedItem}
      />
      {items.map(item => (
        <RadioInput
          key={item.label}
          id={`radio-refinement-${attribute}-${item.label}`}
          name={radioName}
          labelText={products[item.label] ? products[item.label].name : capitalize(item.label)}
          badgeNumber={item.count}
          showBadge={queryActive}
          onChange={() => { refine(item.value) }}
          checked={refinedItem === item}
        />
      ))}
    </div>
  );
};

const ProductVersionRefinementUnconnected = ({ items, currentRefinement, refine, queryActive, show }) => {
  const refinedProduct = items.find((item) => item.isRefined);

  return (
    <>
      <RadioRefinement
        attribute='product'
        items={items}
        queryActive={queryActive}
        refine={refine}
        show={show}
      />
      {refinedProduct &&
        <RadioRefinement
          attribute='version'
          items={refinedProduct.items}
          queryActive={queryActive}
          refine={refine}
          show={show}
        />
      }
    </>
  );
}
const ProductVersionRefinement = connectHierarchicalMenu(ProductVersionRefinementUnconnected);

const ClearRefinementsUnconnected = ({ items, refine, filterIndex, setFilterIndex }) => {
  const clear = (e) => {
    setFilterIndex(null);
    refine(items);
    e.preventDefault();
  };

  return (
    <a
      href='/'
      className={`${(items.length === 0 && !filterIndex) && 'd-none'}`}
      onClick={clear}
    >
      Clear Filters
    </a>
  );
};
const ClearRefinements = connectCurrentRefinements(ClearRefinementsUnconnected);

const AdvancedSearchFiltering = ({ filterIndex, setFilterIndex, learnTotal, docsTotal, queryActive }) => {
  const showProductVersionFilters = !filterIndex || filterIndex === docsIndex

  return (
    <>
      <IndexSelector
        filterIndex={filterIndex}
        setFilterIndex={setFilterIndex}
        learnTotal={learnTotal}
        docsTotal={docsTotal}
        queryActive={queryActive}
      />
      <ProductVersionRefinement
        attributes={['product', 'productVersion']}
        show={showProductVersionFilters}
        queryActive={queryActive}
      />
      <ClearRefinements filterIndex={filterIndex} setFilterIndex={setFilterIndex} />
    </>
  );
};

const ResultsSummary = connectStateResults(
  ({ searchResults: res, resultTotal }) => {
    const resultCount = resultTotal || (res && res.nbHits);
    const query = res && res.query;

    return (
      <p className="search-text-summary">
        {resultCount} result{resultCount !== 1 && 's'} for "{query}"
      </p>
    );
  }
);

// I don't like this, maybe there is a better solution?
class ResultTabulatorUnconnected extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.searchResults && this.props.searchResults !== prevProps.searchResults) {
      this.props.setResultTotal(this.props.searchResults.nbHits);
    }
  };

  render() {
    return null;
  };
}
const ResultTabulator = connectStateResults(ResultTabulatorUnconnected);

const PaginationUnconnected = ({ currentRefinement, nbPages, refine }) => {
  const showPrevious = currentRefinement > 1;
  const showNext = currentRefinement < nbPages;
  const goPrevious = (e) => {
    refine(currentRefinement - 1);
    e.preventDefault();
  };
  const goNext = (e) => {
    refine(currentRefinement + 1);
    e.preventDefault();
  };

  return (
    <>
      { (showPrevious || showNext) && <hr/> }
      <div className="d-flex justify-content-between mt-3">
        <div className="max-w-40">
          {showPrevious && (
            <a
              href="/"
              className="p-3 d-inline-block btn btn-outline-primary text-left"
              onClick={goPrevious}
            >
              <h5 className="m-0">&larr; Previous Page</h5>
            </a>
          )}
        </div>
        <div className="max-w-40">
          {showNext && (
            <a
              href="/"
              className="p-3 d-inline-block btn btn-outline-primary text-right"
              onClick={goNext}
            >
              <h5 className="m-0">Next Page &rarr;</h5>
            </a>
          )}
        </div>
      </div>
    </>
  );
};
const Pagination = connectPagination(PaginationUnconnected);

const ResultsContent = ({ children }) => (
  <>
    <div className="search-content mb-5">
      {children}
    </div>
    <Pagination/>
  </>
);

const AdvancedSearchResults = ({ query, filterIndex, learnTotal, setLearnTotal, docsTotal, setDocsTotal }) => {
  const queryLength = (query || '').length;

  if (queryLength === 0) {
    return (
      <p className="search-text-summary">Please enter a search query to begin.</p>
    );
  }

  if (!filterIndex) { // All results
    return (
      <ResultsContent>
        <ResultsSummary resultTotal={docsTotal + learnTotal}/>
        <Index key={learnIndex.index} indexName={learnIndex.index} >
          <ResultTabulator setResultTotal={setLearnTotal} />
          <Hits hitComponent={AdvancedPageHit} />
        </Index>
        <Index key={docsIndex.index} indexName={docsIndex.index} >
          <ResultTabulator setResultTotal={setDocsTotal} />
          <Hits hitComponent={AdvancedPageHit} />
        </Index>
      </ResultsContent>
    );
  }

  return ( // Filtered to specific index
    <ResultsContent>
      <Index key={filterIndex.index} indexName={filterIndex.index} >
        <ResultTabulator setResultTotal={filterIndex === docsIndex ? setDocsTotal : setLearnTotal} />
        <ResultsSummary filterIndex={filterIndex} />
        <Hits hitComponent={AdvancedPageHit} />
      </Index>
    </ResultsContent>
  );
};

const AdvancedSearchInput = ({currentRefinement, refine, query}) => {
  const queryLength = (query || '').length;

  const inputRef = createRef();
  const searchKeyboardShortcuts = useCallback((e) => {
    const inputFocused = inputRef.current.id === document.activeElement.id;

    if (e.key === '/' && !inputFocused) {
      inputRef.current.focus();
      e.preventDefault();
    }
    if (e.key === 'Escape' && inputFocused) {
      inputRef.current.blur();
      e.preventDefault();
    }
  }, [inputRef]);

  useEffect(() => {
    document.addEventListener("keydown", searchKeyboardShortcuts);
    return () => {
      document.removeEventListener("keydown", searchKeyboardShortcuts);
    };
  }, [searchKeyboardShortcuts]);


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
        ref={inputRef}
      />
      <ClearButton onClick={() => { refine('') }} className={`${queryLength === 0 && 'd-none'}`} />
      <SlashIndicator query={query} />
    </form>
  );
};
const AdvancedSearchBox = connectSearchBox(AdvancedSearchInput);

export default data => {
  const [query, setQuery] = useState(``);
  const [filterIndex, setFilterIndex] = useState(null);
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
              <AdvancedSearchBox query={query} />
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
