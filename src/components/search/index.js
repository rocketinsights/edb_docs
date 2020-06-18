import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Index,
  Configure,
  connectHits,
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

const docsIndex = { title: 'Documentation', index: 'edb-products' };
const learnIndex = { title: 'Guides', index: 'advocacy' };

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res ? children : null,
);

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && `${res.nbHits} result${res.nbHits === 1 ? `` : `s`}`,
);

const TryAdvancedSearch = connectStateResults(
  ({ searchResults: res}) =>
    <div className="flex-grow-1 d-flex align-items-center justify-content-center m-4">
      { res && res.nbHits > 0 ? 'Not finding what you need?' : 'No results found.' }
      <Link to='#'className="ml-2">Try Advanced Search</Link>
    </div>
);

const Hits = ({ hits, arrowIndex, arrowIndexRef }) => (
  <>
    {hits.map((hit, i) => (
      <PageHit
        key={i}
        hit={hit}
        className={arrowIndex === i && 'hover'}
        arrowIndexRef={arrowIndex === i ? arrowIndexRef : null}
      />
    ))}
  </>
);
const PageHits = connectHits(Hits);

const ResultGroup = ({ title, index, arrowIndex, arrowIndexRef }) => (
  <div className="h-100 d-flex flex-column">
    <Index key={index} indexName={index} >
      <Results>
        <PageHits arrowIndex={arrowIndex} arrowIndexRef={arrowIndexRef} />
        <TryAdvancedSearch />
      </Results>
    </Index>
  </div>
);

const SearchTab = ({ index, title }) => (
  <Nav.Item className="search-tab">
    <Nav.Link eventKey={index} className="pl-4 pr-4 pb-0">
      <Index indexName={index}>
        <span className="h5">{title}</span>
        <div className="stats"><small className="opacity-7"><Stats /></small></div>
      </Index>
    </Nav.Link>
  </Nav.Item>
);

const SlashIndicator = ({ query }) => (
  <span
    className={`slash-indicator text-orange text-center opacity-5 bg-white mr-3 ${query.length > 0 && 'd-none'}`}
  >
    /
  </span>
);

const SearchForm = ({currentRefinement, refine, query, focus, onFocus, close}) => {
  const inputRef = createRef();
  const searchContentRef = useRef(null);

  const [docsArrowIndex, setDocsArrowIndex] = useState(0);

  const searchKeyboardShortcuts = useCallback((e) => {
    const inputFocused = inputRef.current.id === document.activeElement.id;

    if (e.key === '/' && !inputFocused) {
      inputRef.current.focus();
      e.preventDefault();
    } else if (e.key === "Escape" && inputFocused) {
      inputRef.current.blur();
      close();
      e.preventDefault();
    } else if (e.key === "ArrowDown" && inputFocused) {
      const dropdownItems = searchContentRef.current.querySelector('.tab-pane.active').querySelectorAll('.dropdown-item');
      setDocsArrowIndex(Math.min(docsArrowIndex + 1, dropdownItems.length - 1));
      if (dropdownItems[0].scrollHeight * (docsArrowIndex + 2) > (searchContentRef.current.clientHeight + searchContentRef.current.scrollTop)) {
        searchContentRef.current.scrollTop += dropdownItems[0].scrollHeight;
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp" && inputFocused) {
      const dropdownItems = searchContentRef.current.querySelector('.tab-pane.active').querySelectorAll('.dropdown-item');
      setDocsArrowIndex(Math.max(docsArrowIndex - 1, 0));
      if (dropdownItems[0].scrollHeight * (docsArrowIndex + 6) < (searchContentRef.current.clientHeight + searchContentRef.current.scrollTop)) {
        searchContentRef.current.scrollTop -= dropdownItems[0].scrollHeight;
      }
      e.preventDefault();
    } else if (e.key === 'Enter' && inputFocused) {
      const dropdownItems = searchContentRef.current.querySelector('.tab-pane.active').querySelectorAll('.dropdown-item');
      dropdownItems[docsArrowIndex].click();
      e.preventDefault();
    }
  }, [inputRef, close, searchContentRef, docsArrowIndex, setDocsArrowIndex]);

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
        <SlashIndicator query={query} />
      </form>

      <SearchContent
        query={query}
        focus={focus}
        docsArrowIndex={docsArrowIndex}
        searchContentRef={searchContentRef}
      />
    </div>
  );
};
const Search = connectSearchBox(SearchForm);

const SearchContent = ({ query, focus, docsArrowIndex, searchContentRef }) => (
  <div
    className={`dropdown-menu overflow-scroll w-100 pb-0 ${query.length > 0 && focus ? 'show' : ''}`}
  >
    <Tab.Container defaultActiveKey={docsIndex.index}>
      <Tab.Content className="search-content" ref={searchContentRef}>
        <Tab.Pane eventKey={docsIndex.index} className="h-100">
          <ResultGroup title={docsIndex.title} index={docsIndex.index} arrowIndex={docsArrowIndex} />
        </Tab.Pane>
        <Tab.Pane eventKey={learnIndex.index} className="h-100">
          <ResultGroup title={learnIndex.title} index={learnIndex.index} />
        </Tab.Pane>
      </Tab.Content>

      <Nav className="search-tabs">
        <SearchTab index={docsIndex.index} title={docsIndex.title} />
        <SearchTab index={learnIndex.index} title={learnIndex.title} />
        <div className="flex-grow-1 d-flex align-items-center justify-content-flex-end mr-4">
          <Link to='#'>Advanced Search</Link>
        </div>
      </Nav>
    </Tab.Container>
  </div>
);

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
        indexName={docsIndex.index}
        onSearchStateChange={({ query }) => setQuery(query)}
        className='dropdown'
      >
        <Configure
          hitsPerPage={30}
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
