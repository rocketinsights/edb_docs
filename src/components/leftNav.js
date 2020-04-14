import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const FixedCol = styled('div')`
  position: fixed;
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

const LeftNav = ({ edges, path }) => {
  const newList = FilterAndSort(edges, baseUrl(path));
  return (
    <FixedCol>
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
