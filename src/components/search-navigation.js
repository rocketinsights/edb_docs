import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import SearchBar from './search/';

const SearchNavigation = ({ children }) => {
  return (
    <Navbar variant="light" className="flex-md-nowrap p-3 border-bottom">
      <SearchBar />
      <Button variant="link" className="text-nowrap mr-2">
        Support
      </Button>
      <Button variant="link" className="text-nowrap mr-2">
        Sign In
      </Button>
    </Navbar>
  );
};

export default SearchNavigation;
