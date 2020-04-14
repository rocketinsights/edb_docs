import React from 'react';
import styled from '@emotion/styled';

const FixedCol = styled('div')`
  position: fixed;
`;

const PageTableOfContents = ({ toc }) => {
  return (
    <FixedCol>
      {toc.map(item => (
        <div key={item.title}>
          <a href={item.url}>{item.title}</a>
        </div>
      ))}
    </FixedCol>
  );
};

export default PageTableOfContents;
