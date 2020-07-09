import { docsIndex, learnIndex } from '../search/indices';

export const queryParamsToState = (query) => {
  const contentToIndex = { docs: docsIndex, guides: learnIndex };
  const params = new URLSearchParams(query);

  const filterIndex = contentToIndex[params.get('content')];
  const searchState = {};
  if (params.get('query')) {
    searchState.query = params.get('query');
  }
  if (params.get('product')) {
    searchState.hierarchicalMenu = { product: params.get('product') };
  }
  if (params.get('page')) {
    searchState.page = params.get('page');
  }

  return [searchState, filterIndex];
};

export const writeStateToQueryParams = (searchState, filterIndex) => {
  const params = new URLSearchParams();

  if (searchState.query && searchState.query.length > 0) {
    params.set('query', searchState.query);
  }
  if (searchState.hierarchicalMenu) {
    params.set('product', searchState.hierarchicalMenu.product);
  }
  if (searchState.page > 1) {
    params.set('page', searchState.page);
  }
  if (filterIndex) {
    params.set('content', filterIndex.queryParam);
  }

  window.history.replaceState('', searchState.query, `?${params.toString()}`)
};
