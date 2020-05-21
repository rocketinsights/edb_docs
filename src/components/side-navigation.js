import React from 'react';

const SideNavigation = ({ children }) => {
  return (
    <nav className="sidebar d-none d-md-block bg-light">
      <div className="sidebar-sticky d-none d-md-block bg-light border-right">
        <h1 className="h3">
          <a className="d-block py-4 text-dark" href="/">
            EDB Docs
          </a>
        </h1>
        {children}
      </div>
    </nav>
  );
};

export default SideNavigation;
