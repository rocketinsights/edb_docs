import React from 'react';
import { Link } from 'gatsby';

const Logo = () => {
  return (
    <h1 className="h3">
      <Link className="d-block py-4 text-dark" to="/">
        EDB Docs
      </Link>
    </h1>
  );
}

const SideNavigation = ({ children }) => {
  return (
    <nav className="sidebar d-none d-md-block bg-light">
      <div className="sidebar-sticky d-none d-md-block bg-light border-right">
        <Logo />
        {children}
      </div>
    </nav>
  );
};

export default SideNavigation;
