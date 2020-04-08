import React from 'react';
import Link from '../link';

const ProductGroup = ({ name, links }) => (
  <>
    {name}
    {links.map(link => {
      return (
        <div key={link.name}>
          <Link to={link.link}>{link.name}</Link>
        </div>
      );
    })}
  </>
);

export default ProductGroup;
