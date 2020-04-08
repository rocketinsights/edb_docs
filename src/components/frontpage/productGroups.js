import React from 'react';
// import Link from '../link';
import ProductGroup from './productGroup';

const ProductGroups = ({ linkGroups }) => (
  <>
    {linkGroups.map(linkGroup => {
      return <ProductGroup key={linkGroup.name} name={linkGroup.name} links={linkGroup.links} />;
    })}
  </>
);

export default ProductGroups;
