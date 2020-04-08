import React from 'react';
// import Link from '../link';
import ProductGroup from './productGroup';
import styled from '@emotion/styled';

const FlexGroups = styled('div')`
  display: flex;
  flex-wrap: wrap;
`;

const ProductGroups = ({ linkGroups }) => (
  <FlexGroups>
    {linkGroups.map(linkGroup => {
      return <ProductGroup key={linkGroup.name} name={linkGroup.name} links={linkGroup.links} />;
    })}
  </FlexGroups>
);

export default ProductGroups;
