import React from 'react';
// import Link from '../link';
import ProductGroup from './productGroup';
import styled from '@emotion/styled';

const FlexGroups = styled('div')`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const ProductGroups = ({ linkGroups }) => (
  <FlexGroups>
    {linkGroups.map(linkGroup => {
      return <ProductGroup key={linkGroup.name} name={linkGroup.name} links={linkGroup.links} />;
    })}
  </FlexGroups>
);

export default ProductGroups;
