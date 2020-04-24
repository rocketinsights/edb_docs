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
  padding-top: 1.5rem;
`;

const List = styled('ul')`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled('li')`
  padding: 0.25rem 0;
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
      itemObj: {},
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
  let newEdges = edges;
  for (let i = 0; i < newEdges.length - 1; i++) {
    const { path } = newEdges[i];
    const tiers = path.split('/').length;
    for (let j = i + 1; j < newEdges.length; j++) {
      const innerPath = newEdges[j].path;
      const innerTiers = innerPath.split('/').length;
      if (innerPath.includes(path) && innerTiers - 1 === tiers) {
        newEdges[i].items.push(newEdges[j]);
      }
    }
  }
  return newEdges[0].items;
};

const TreeNode = ({ node, path }) => {
  if (node.items.length === 0) {
    return (
      <ListItem key={node.path}>
        <Link to={node.path} className={path === node.path ? 'active' : ''}>
          {node.title}
        </Link>
      </ListItem>
    );
  } else {
    return (
      <ListItem key={node.path}>
        <Link to={node.path} className={path === node.path ? 'active' : ''}>
          {node.title}
        </Link>
        <SubList collapsed={!path.includes(node.path)}>
          {node.items.map(subNode => (
            <TreeNode node={subNode} path={path} key={subNode.path} />
          ))}
        </SubList>
      </ListItem>
    );
  }
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
        {tree.map(node => (
          <TreeNode node={node} path={path} key={node.path} />
        ))}
      </List>
    </FixedCol>
  );
};

export default LeftNav;
