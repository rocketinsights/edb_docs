import React, { useState, useEffect, useCallback, createRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Index,
  Configure,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import { PageHit } from './hitComps';
import Icon, { iconNames } from '../icon/';
import { Button, Tab, Nav } from 'react-bootstrap';

const searchClient = algoliasearch(
  'NQVJGNW933',
  '3c95fc5297e90a44b6467f3098a4e6ed',
);

const indexes = [
  { title: 'Documentation', index: 'edb-products' },
  { title: 'Guides', index: 'advocacy' },
];

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : null,
);

const NoResults = connectStateResults(
  ({ allSearchResults: res }) => (
    res && indexes.reduce((total, index) => {
      return total + (res[index.index] ? res[index.index].nbHits : 0)
    }, 0) === 0 && (
      <div className="text-center">No Results</div>
    )
  )
);

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`,
);

const SeeMore = connectStateResults(
  ({ searchResults: res, threshold }) =>
    res && (res.nbHits > threshold) && (
      <Link to='#' className="d-block text-center">See more results</Link>
    )
);

const ResultGroup = ({ title, index }) => (
  <Index key={index} indexName={index}>
    <Results>
      <Hits hitComponent={PageHit} />
      <SeeMore threshold={5} />
    </Results>
  </Index>
)

const SearchForm = ({currentRefinement, refine, query, focus, onFocus, close}) => {
  const inputRef = createRef();

  const searchKeyboardShortcuts = useCallback((e) => {
    const inputFocused = inputRef.current.id === document.activeElement.id;

    if (e.key === '/' && !inputFocused) {
      inputRef.current.focus();
      e.preventDefault();
    } else if (e.key === "Escape" && inputFocused) {
      inputRef.current.blur();
      close();
    }
  }, [inputRef, close]);

  useEffect(() => {
    document.addEventListener("keydown", searchKeyboardShortcuts);
    return () => {
      document.removeEventListener("keydown", searchKeyboardShortcuts);
    };
  }, [searchKeyboardShortcuts]);

  return (
    <div className={`${query.length > 0 && focus && 'shadow'}`}>
      <form noValidate action="" autoComplete="off" role="search" className={`search-form d-flex align-items-center ${query.length > 0 && focus && 'open'}`}>
        <Icon iconName={iconNames.SEARCH} className="fill-black ml-3 opacity-5 flex-shrink-0" width="22" height="22" />
        <input
          id='search-input'
          className="form-control form-control-lg border-0 pl-3"
          type="text"
          aria-label="search"
          placeholder="Search"
          value={currentRefinement}
          onChange={e => refine(e.currentTarget.value)}
          onFocus={onFocus}
          ref={inputRef}
        />
        <Button
          variant="link"
          onClick={(e) => { e.preventDefault(); refine(''); }}
          className={`${query.length === 0 && 'd-none'}`}
        >
          <Icon iconName={iconNames.CLOSE} className="opacity-5" width="20" height="20" />
        </Button>
        <span
          className={`slash-indicator text-orange text-center opacity-5 bg-white mr-3 ${query.length > 0 && 'd-none'}`}
        >
          /
        </span>
      </form>

      <div
        className={`dropdown-menu overflow-scroll w-100 pb-2 ${query.length > 0 && focus ? 'show' : ''}`}
      >
        {/*<NoResults />*/}

        <Tab.Container defaultActiveKey="docs">
          <Tab.Content>
            <Tab.Pane eventKey="docs">
              <ResultGroup key={indexes[0].index} title={indexes[0].title} index={indexes[0].index} />
            </Tab.Pane>
            <Tab.Pane eventKey="learn">
              <ResultGroup key={indexes[1].index} title={indexes[1].title} index={indexes[1].index} />
            </Tab.Pane>
          </Tab.Content>

          <Nav className="search-tabs">
            <Nav.Item>
              <Nav.Link eventKey="docs">
                <Index indexName={indexes[0].index}>
                  Documentation
                  <div><small><Stats /></small></div>
                </Index>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="learn">
                <Index indexName={indexes[1].index}>
                  Guides
                  <div><small><Stats /></small></div>
                </Index>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
      </div>
    </div>
  );
};
const Search = connectSearchBox(SearchForm);

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
};

const SearchBar = () => {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState(false);
  useClickOutside(ref, () => setFocus(false));
  return (
    <div className="w-100 position-relative" ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexes[0].index}
        onSearchStateChange={({ query }) => setQuery(query)}
        className='dropdown'
      >
        <Configure
          hitsPerPage={5}
        />
        <Search
          query={query}
          focus={focus}
          onFocus={() => setFocus(true)}
          close={() => setFocus(false)}
        />
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
