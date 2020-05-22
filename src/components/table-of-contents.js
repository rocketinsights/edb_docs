import React from 'react';
import { Link } from 'gatsby';

const TableOfContents = ({ toc }) => (
  <ul className="list-unstyled border-left pl-4 lh-12 toc-sticky pt-3">
    <li className="mb-2 font-weight-bold text-muted text-uppercase small">
      On this page
    </li>
    {toc.map(item => (
      <li key={item.title}>
        <Link className="d-block py-2 align-middle" to={item.url}>
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default TableOfContents;
