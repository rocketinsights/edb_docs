import React from 'react';
import SearchNavigation from './search-navigation';

const MainContent = ({ children, search = true }) => {
  return (
    <div className="flex-grow-1 border-right min-w-50">
      { search && <SearchNavigation /> }
      <main role="main" className={`mt-0 ${search ? 'p-5' : 'pt-4 pl-5 pr-5 pb-5'}`}>
        {children}
      </main>
    </div>
  );
};

export default MainContent;
