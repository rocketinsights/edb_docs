import React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const HitTitle = styled('h4')`
  font-size: 1rem;
`;

const HitContainer = styled('div')`
  padding: 0.5rem 0;
`;

export const PageHit = ({ hit }) => (
  <HitContainer>
    <Link to={hit.path}>
      <HitTitle>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </HitTitle>
    </Link>
    {hit.product && (
      <div>
        {hit.product} v{hit.version}
      </div>
    )}
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </HitContainer>
);
