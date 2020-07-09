import React from 'react';
import { Badge } from 'react-bootstrap';
import {
  connectHierarchicalMenu,
  connectCurrentRefinements,
  connectStateResults,
} from 'react-instantsearch-dom';
import { products } from '../../constants/products';
import { capitalize } from '../../constants/utils';
import { docsIndex, learnIndex } from '../search/indices';

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

  return (
    <div className={`mb-4 pl-1 ${!show && 'd-none'}`}>
      <div className='h5'>{capitalize(attribute)}</div>
      <RadioInput
        id={`radio-refinement-${attribute}-all`}
        name={radioName}
        labelText='All'
        badgeNumber={items.reduce((total, item) => total + item.count, 0)}
        showBadge={queryActive}
        onChange={() => refine(refinedItem.value)}
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
          onChange={() => refine(item.value)}
          checked={refinedItem === item}
        />
      ))}
    </div>
  );
};

const ProductVersionRefinement = connectHierarchicalMenu(
  ({ items, currentRefinement, refine, queryActive, show }) => {
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
);

const ClearRefinements = connectCurrentRefinements(
  ({ items, refine, filterIndex, setFilterIndex }) => {
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
  }
);

export const AdvancedSearchFiltering = ({ filterIndex, setFilterIndex, learnTotal, docsTotal, queryActive }) => {
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
export const ResultTabulator = connectStateResults(ResultTabulatorUnconnected);
