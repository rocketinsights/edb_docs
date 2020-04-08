import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';
import styled from '@emotion/styled';

const ColoredGatsbyLink = styled(GatsbyLink)`
  color: #00adf2 !important;
`;

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <ColoredGatsbyLink to={to} {...props} />
  );

export default Link;
