import React from 'react';
import { Link } from 'gatsby';
import { filterAndSort } from '../constants/utils';

const getPrevAndNextLinks = (links, path) => {
  let result = { prevLink: null, nextLink: null };
  const idx = links.findIndex((element, index, array) => {
    return element.path === path;
  });
  console.log(idx);
  if (idx > 0) {
    result.prevLink = links[idx - 1];
  }
  if (idx < links.length - 2) {
    result.nextLink = links[idx + 1];
  }
  return result;
};

const PrevNext = ({ navLinks, path }) => {
  const baseUrl = path
    .split('/')
    .slice(0, 4)
    .join('/');
  const sortedLinks = filterAndSort(navLinks, baseUrl);
  const { prevLink, nextLink } = getPrevAndNextLinks(sortedLinks, path);

  return (
    <>
      <div>{prevLink && <Link to={prevLink.path}>{prevLink.title}</Link>}</div>
      <div>{nextLink && <Link to={nextLink.path}>{nextLink.title}</Link>}</div>
    </>
  );
};

export default PrevNext;
