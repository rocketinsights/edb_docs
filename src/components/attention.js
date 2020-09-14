import React from 'react';
import { Alert } from 'react-bootstrap';
import MDX from '@mdx-js/runtime';

const Attention = ({ children, ...otherProps }) => (
  <Alert variant="warning" {...otherProps}>
    <MDX components={{p: props => <p className='m-0' {...props} />}}>
      { children }
    </MDX>
  </Alert>
);

export default Attention;
