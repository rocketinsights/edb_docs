import React from 'react';
import {
  Index,
  connectHits,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import { Button, Nav, Tab } from 'react-bootstrap';
import Icon, { iconNames } from '../icon/';
import { PageHit } from './hitComps';

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
    <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
      { res && res.nbHits > 0 ? 'Not finding what you need?' : 'No results found.' }
      <Link to='search' className="ml-2">Try Advanced Search</Link>
    </div>
);

const Hits = ({ hits, arrowIndex }) => (
  <>
    {hits.map((hit, i) => (
      <PageHit
        key={i}
        hit={hit}
        className={arrowIndex === i && 'arrow-focus'}
      />
    ))}
  </>
);
const PageHits = connectHits(Hits);

const ResultGroup = ({ title, index, arrowIndex }) => (
  <div className="h-100 d-flex flex-column">
    <Index key={index} indexName={index} >
      <Results>
        <PageHits arrowIndex={arrowIndex} />
        <TryAdvancedSearch />
      </Results>
    </Index>
  </div>
);

export const SearchPane = ({ searchIndex, arrowIndex }) => (
  <Tab.Pane eventKey={searchIndex.index} className="h-100">
    <ResultGroup title={searchIndex.title} index={searchIndex.index} arrowIndex={arrowIndex} />
  </Tab.Pane>
);

export const AdvancedSearchTabLink = () => (
  <div className="flex-grow-1 d-flex align-items-center justify-content-flex-end mr-4">
    <Link to='search'>Advanced Search</Link>
  </div>
);

export const SearchTab = ({ searchIndex }) => (
  <Nav.Item className="search-tab">
    <Nav.Link eventKey={searchIndex.index} className="pl-4 pr-4 pb-0">
      <Index indexName={searchIndex.index}>
        <span className="h5">{searchIndex.title}</span>
        <div className="stats"><small className="opacity-7"><Stats /></small></div>
      </Index>
    </Nav.Link>
  </Nav.Item>
);

export const SlashIndicator = ({ query }) => (
  <span
    className={`slash-indicator text-orange text-center opacity-5 bg-white mr-3 ${(query || '').length > 0 && 'd-none'}`}
  >
    /
  </span>
);

export const ClearButton = ({ onClick, className }) => {
  const click = (e) => {
    e.preventDefault();
    onClick();
  }

  return (
    <Button variant="link" onClick={click} className={className}>
      <Icon iconName={iconNames.CLOSE} className="opacity-5" width="20" height="20" />
    </Button>
  );
};
