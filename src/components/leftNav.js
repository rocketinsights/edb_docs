import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import EdbLogo from './edbLogo';

const FixedCol = styled('div')`
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const List = styled('ul')`
  list-style-type: none;
  padding: 0;
`;

const baseUrl = path => {
  return path
    .split('/')
    .slice(0, 3)
    .join('/');
};

const FilterAndSort = (edges, url) => {
  return edges
    .filter(edge => edge.node.fields.path.includes(url))
    .sort((a, b) => {
      if (a.node.fields.path < b.node.fields.path) {
        return -1;
      }
      if (a.node.fields.path > b.node.fields.path) {
        return 1;
      }
      return 0;
    });
};

const ProductTitle = styled('h3')`
  font-size: 1rem;
  font-weight: 700;
  padding-top: 1rem;
`;

const LeftNav = ({ edges, path }) => {
  const newList = FilterAndSort(edges, baseUrl(path));
  return (
    <FixedCol>
      <EdbLogo />
      <Link to="/">← Back</Link>
      <ProductTitle>{newList[0].node.frontmatter.title}</ProductTitle>
      <List>
        {newList.map(edge => (
          <li key={edge.node.title}>
            <Link to={edge.node.fields.path}>
              {edge.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </List>
    </FixedCol>
  );
};

export default LeftNav;
