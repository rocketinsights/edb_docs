import React from 'react';
import { Alert } from 'react-bootstrap';

const TopBar = () => {
  return (
    <Alert variant="primary" className="m-0 rounded-0 text-center align-middle">
      This is a beta of our redesigned docs site.
      <a href="/" className="font-weight-bold ml-2">
        Switch to the old design
      </a>
    </Alert>
  );
};

export default TopBar;
