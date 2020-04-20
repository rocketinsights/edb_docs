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

const SubListContainer = styled('ul')`
  list-style-type: none;
  padding-left: 20px;
`;

const DisplayNone = styled('div')`
  display: none;
`;

const SubList = ({ children, collapsed }) => {
  if (collapsed) {
    return (
      <DisplayNone>
        <ul>{children}</ul>
      </DisplayNone>
    );
  } else {
    return <SubListContainer>{children}</SubListContainer>;
  }
};

const baseUrl = path => {
  return path
    .split('/')
    .slice(0, 3)
    .join('/');
};

const filterAndSort = (nodes, url) => {
  return nodes
    .map(node => ({
      title: node.frontmatter.title,
      path: node.fields.path,
      items: [],
    }))
    .filter(node => node.path.includes(url))
    .sort((a, b) => {
      if (a.path < b.path) {
        return -1;
      }
      if (a.path > b.path) {
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

const makeTree = edges => {
  const result = [];
  let idx = -1;
  for (let i = 1; i < edges.length; i++) {
    let { path } = edges[i];
    if (path.split('/').length === 5) {
      result.push(edges[i]);
      idx++;
    } else {
      result[idx].items.push(edges[i]);
    }
  }
  return result;
};

const LeftNav = ({ navLinks, path }) => {
  const newList = filterAndSort(navLinks, baseUrl(path));
  const tree = makeTree(newList);
  return (
    <FixedCol>
      <EdbLogo />
      <Link to="/">← Back</Link>
      <ProductTitle>{newList[0].title}</ProductTitle>
      <List>
        {tree.map(edge => {
          if (edge.items.length === 0) {
            return (
              <li key={edge.path}>
                <Link to={edge.path}>{edge.title}</Link>
              </li>
            );
          } else {
            return (
              <li key={edge.path}>
                <Link to={edge.path}>{edge.title}</Link>
                <SubList collapsed={!path.includes(edge.path)}>
                  {edge.items.map(item => (
                    <li key={item.path}>
                      <Link to={item.path}>{item.title}</Link>
                    </li>
                  ))}
                </SubList>
              </li>
            );
          }
        })}
      </List>
    </FixedCol>
  );
};

export default LeftNav;
