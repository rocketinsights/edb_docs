import React, { useState, useEffect, useCallback, createRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Index,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom';
import { PageHit } from './hitComps';
import Icon, { iconNames } from '../icon/';
import { Button } from 'react-bootstrap';

const searchClient = algoliasearch(
  'NQVJGNW933',
  '3c95fc5297e90a44b6467f3098a4e6ed',
);

const indexes = [
  { title: 'Learn', index: 'advocacy' },
  { title: 'EDB Products', index: 'edb-products' },
  { title: 'EDB Postgres Tools', index: 'edb-tools' },
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

const SearchDivider = connectStateResults(
  ({ allSearchResults: res, nextIndex }) => (
    res && nextIndex && res[nextIndex.index] && res[nextIndex.index].nbHits > 0 ? (
      <div className="dropdown-divider" />
    ) : null
  )
);

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`,
);

const ResultGroup = ({ title, index, nextIndex }) => (
  <Index key={index} indexName={index}>
    <Results>
      <h6 className="dropdown-header">
        {title}
        <small className="ml-1"><Stats /></small>
      </h6>
      <Hits hitComponent={PageHit} />
      <SearchDivider nextIndex={nextIndex} />
    </Results>
  </Index>
)

const SearchForm = ({currentRefinement, refine, query, focus, onFocus}) => {
  const inputRef = createRef();

  const focusSearchOnSlash = useCallback((e) => {
    if (e.key === '/' && inputRef.current.id !== document.activeElement.id) {
      inputRef.current.focus();
      e.preventDefault();
    }
  }, [inputRef]);

  useEffect(() => {
    document.addEventListener("keydown", focusSearchOnSlash);
    return () => {
      document.removeEventListener("keydown", focusSearchOnSlash);
    };
  }, [focusSearchOnSlash]);

  return (
    <>
      <form noValidate action="" role="search" className='search-form d-flex align-items-center mr-3'>
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
      <div
        className={`dropdown-menu overflow-scroll w-100 pb-2 shadow ${query.length > 0 && focus ? 'show' : ''}`}
      >
        {indexes.map(({ title, index }, i) => (
          <ResultGroup key={index} title={title} index={index} nextIndex={indexes[i + 1]} />
        ))}
        <NoResults />
      </div>
      </form>
    </>
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
    <div className="w-100" ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexes[0].index}
        onSearchStateChange={({ query }) => setQuery(query)}
        className='dropdown'
      >
        <Search query={query} focus={focus} onFocus={() => setFocus(true)}/>
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
